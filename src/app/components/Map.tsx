'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';

export interface Location {
  lat: number;
  lng: number;
}

interface MapProps {
  pickupLocation?: Location;
  dropoffLocation?: Location;
  onLocationSelect?: (location: Location, address: any) => void;
  isSelectingPickup?: boolean;
  isSelectingDropoff?: boolean;
}

const Map: React.FC<MapProps> = ({
  pickupLocation,
  dropoffLocation,
  onLocationSelect,
  isSelectingPickup,
  isSelectingDropoff
}) => {
  const routingControlRef = useRef<any>(null);
  const istanbulPosition: [number, number] = [41.0082, 28.9784];

  useEffect(() => {
    // Leaflet CSS'i dinamik olarak yükle
    import('leaflet').then((L) => {
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: '/marker-icon-2x.png',
        iconUrl: '/marker-icon.png',
        shadowUrl: '/marker-shadow.png',
      });
    });
  }, []);

  // Harita tıklamalarını yönet
  const MapEvents = () => {
    const map = useMap();

    useEffect(() => {
      const handleClick = async (e: any) => {
        if (!isSelectingPickup && !isSelectingDropoff) return;

        const { lat, lng } = e.latlng;
        
        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`
          );
          const data = await response.json();
          
          if (onLocationSelect) {
            onLocationSelect({ lat, lng }, data.address);
          }
        } catch (error) {
          console.error('Adres bulunamadı:', error);
        }
      };

      map.on('click', handleClick);
      return () => {
        map.off('click', handleClick);
      };
    }, [map, isSelectingPickup, isSelectingDropoff]);

    return null;
  };

  // Rota kontrolünü yönet
  useEffect(() => {
    if (!pickupLocation || !dropoffLocation) return;

    import('leaflet-routing-machine').then((Routing) => {
      if (routingControlRef.current) {
        routingControlRef.current.remove();
      }

      routingControlRef.current = (Routing as any).control({
        waypoints: [
          [pickupLocation.lat, pickupLocation.lng],
          [dropoffLocation.lat, dropoffLocation.lng]
        ],
        routeWhileDragging: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        showAlternatives: false,
        lineOptions: {
          styles: [{ color: '#0066CC', weight: 6 }]
        }
      });

      routingControlRef.current.addTo(map);
    });
  }, [pickupLocation, dropoffLocation]);

  return (
    <MapContainer
      center={istanbulPosition}
      zoom={10}
      style={{ height: '100%', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <MapEvents />
      {pickupLocation && (
        <Marker position={[pickupLocation.lat, pickupLocation.lng]} />
      )}
      {dropoffLocation && (
        <Marker position={[dropoffLocation.lat, dropoffLocation.lng]} />
      )}
    </MapContainer>
  );
};

export default Map; 