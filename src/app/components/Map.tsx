import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine';
import { useEffect, useRef } from 'react';

// Leaflet varsayılan ikonunu düzeltmek için
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  shadowSize: [41, 41]
});

interface Location {
  lat: number;
  lng: number;
}

interface Address {
  house_number?: string;
  road?: string;
  neighbourhood?: string;
  suburb?: string;
  district?: string;
  city?: string;
  state?: string;
  postcode?: string;
  country?: string;
}

interface MapProps {
  pickupLocation?: Location;
  dropoffLocation?: Location;
  onLocationSelect: (location: Location, address: Address) => void;
  isSelectingPickup: boolean;
  isSelectingDropoff: boolean;
}

// Nominatim API'den adres bilgilerini al
async function getAddressDetails(lat: number, lng: number): Promise<Address> {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&addressdetails=1`
    );
    const data = await response.json();
    return data.address;
  } catch (error) {
    console.error('Adres bilgileri alınamadı:', error);
    return {};
  }
}

// Adresi formatla
function formatAddress(address: Address): string {
  const parts = [
    address.house_number,
    address.road,
    address.neighbourhood,
    address.district,
    address.city
  ].filter(Boolean);

  return parts.join(', ');
}

function MapEvents({ onClick }: { onClick: (e: L.LeafletMouseEvent) => void }) {
  useMapEvents({
    click: onClick,
  });
  return null;
}

function RoutingMachine({ pickupLocation, dropoffLocation }: { pickupLocation: Location, dropoffLocation: Location }) {
  const map = useMap();

  useEffect(() => {
    if (!pickupLocation || !dropoffLocation) return;

    const routingControl = L.Routing.control({
      waypoints: [
        L.latLng(pickupLocation.lat, pickupLocation.lng),
        L.latLng(dropoffLocation.lat, dropoffLocation.lng)
      ],
      routeWhileDragging: false,
      addWaypoints: false,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      lineOptions: {
        styles: [{ color: '#3B82F6', weight: 4 }]
      },
      createMarker: () => { return null; }
    }).addTo(map);

    routingControl.on('routesfound', function(e: any) {
      const routes = e.routes;
      const summary = routes[0].summary;
      const duration = Math.round(summary.totalTime / 60);
      
      const durationDiv = L.DomUtil.create('div', 'duration-info');
      durationDiv.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: white;
        padding: 8px 16px;
        border-radius: 8px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        z-index: 1000;
        font-weight: 500;
      `;
      
      let durationText = '';
      if (duration >= 60) {
        const hours = Math.floor(duration / 60);
        const minutes = duration % 60;
        durationText = `Tahmini Süre: ${hours} saat ${minutes} dakika`;
      } else {
        durationText = `Tahmini Süre: ${duration} dakika`;
      }
      
      durationDiv.innerHTML = durationText;
      map.getContainer().appendChild(durationDiv);
    });

    return () => {
      map.removeControl(routingControl);
      const durationInfo = map.getContainer().querySelector('.duration-info');
      if (durationInfo) {
        durationInfo.remove();
      }
    };
  }, [map, pickupLocation, dropoffLocation]);

  return null;
}

function AddressHandler({ onClick, onAddressFound }: { onClick: (e: L.LeafletMouseEvent) => void, onAddressFound: (address: Address) => void }) {
  const handleClick = async (e: L.LeafletMouseEvent) => {
    onClick(e);
    const address = await getAddressDetails(e.latlng.lat, e.latlng.lng);
    onAddressFound(address);
  };

  return <MapEvents onClick={handleClick} />;
}

const Map = ({ pickupLocation, dropoffLocation, onLocationSelect, isSelectingPickup, isSelectingDropoff }: MapProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const routingControlRef = useRef<L.Routing.Control | null>(null);

  useEffect(() => {
    if (!mapRef.current) {
      // Haritayı Türkiye'nin merkezine odakla
      const map = L.map('map').setView([39.9334, 32.8597], 6);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      mapRef.current = map;

      // Harita tıklama olayını dinle
      map.on('click', async (e: L.LeafletMouseEvent) => {
        if (isSelectingPickup || isSelectingDropoff) {
          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${e.latlng.lat}&lon=${e.latlng.lng}&addressdetails=1`
            );
            const data = await response.json();
            const location = { lat: e.latlng.lat, lng: e.latlng.lng };
            onLocationSelect(location, data.address);
          } catch (error) {
            console.error('Adres bilgileri alınamadı:', error);
            onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng }, {});
          }
        }
      });
    }

    // Fare imlecini değiştir
    if (mapRef.current && (isSelectingPickup || isSelectingDropoff)) {
      mapRef.current.getContainer().style.cursor = 'crosshair';
    } else if (mapRef.current) {
      mapRef.current.getContainer().style.cursor = '';
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isSelectingPickup, isSelectingDropoff, onLocationSelect]);

  useEffect(() => {
    if (!mapRef.current) return;

    // Önceki işaretçileri ve rotayı temizle
    mapRef.current.eachLayer((layer) => {
      if (layer instanceof L.Marker || layer instanceof L.Routing.Control) {
        mapRef.current?.removeLayer(layer);
      }
    });

    if (routingControlRef.current) {
      mapRef.current.removeControl(routingControlRef.current);
      routingControlRef.current = null;
    }

    // Alış ve bırakış noktalarını işaretle
    if (pickupLocation) {
      L.marker([pickupLocation.lat, pickupLocation.lng], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: '<div class="marker-pin bg-green-500"></div>',
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      }).addTo(mapRef.current);
    }

    if (dropoffLocation) {
      L.marker([dropoffLocation.lat, dropoffLocation.lng], {
        icon: L.divIcon({
          className: 'custom-div-icon',
          html: '<div class="marker-pin bg-red-500"></div>',
          iconSize: [30, 42],
          iconAnchor: [15, 42]
        })
      }).addTo(mapRef.current);
    }

    // Her iki konum da varsa rota çiz
    if (pickupLocation && dropoffLocation) {
      const routingControl = L.Routing.control({
        waypoints: [
          L.latLng(pickupLocation.lat, pickupLocation.lng),
          L.latLng(dropoffLocation.lat, dropoffLocation.lng)
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        show: false, // Rota talimatları panelini gizle
        lineOptions: {
          styles: [{ color: '#3B82F6', weight: 6 }],
          extendToWaypoints: true,
          missingRouteTolerance: 0
        },
        createMarker: () => null
      }).addTo(mapRef.current);

      // Rota talimatları panelini gizle
      const container = routingControl.getContainer();
      if (container) {
        container.style.display = 'none';
      }

      routingControl.on('routesfound', function(e: any) {
        const routes = e.routes;
        const summary = routes[0].summary;
        const duration = Math.round(summary.totalTime / 60);
        const distance = Math.round(summary.totalDistance / 1000);
        
        // Önceki bilgilendirme kutusunu kaldır
        const existingInfo = document.querySelector('.route-info');
        if (existingInfo) {
          existingInfo.remove();
        }
        
        const infoDiv = document.createElement('div');
        infoDiv.className = 'route-info';
        infoDiv.style.cssText = `
          position: absolute;
          top: 10px;
          left: 50%;
          transform: translateX(-50%);
          background: white;
          padding: 8px 16px;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          z-index: 1000;
          font-weight: 500;
          font-size: 14px;
          border: 1px solid rgba(0,0,0,0.1);
        `;
        
        let durationText = '';
        if (duration >= 60) {
          const hours = Math.floor(duration / 60);
          const minutes = duration % 60;
          durationText = `${hours} saat ${minutes} dakika`;
        } else {
          durationText = `${duration} dakika`;
        }
        
        infoDiv.innerHTML = `
          <div class="flex items-center gap-2">
            <span>🚗 Mesafe: ${distance} km</span>
            <span class="text-gray-300">|</span>
            <span>⏱️ Süre: ${durationText}</span>
          </div>
        `;
        
        mapRef.current?.getContainer().appendChild(infoDiv);
      });

      routingControlRef.current = routingControl;
    }
  }, [pickupLocation, dropoffLocation]);

  return <div id="map" className="w-full h-full rounded-lg" />;
};

export default Map; 