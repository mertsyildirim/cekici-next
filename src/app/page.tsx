'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import type { LeafletMouseEvent } from 'leaflet';
import type { Location } from './components/Map';

// Leaflet varsayılan ikon hatası için düzeltme
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: '/marker-icon-2x.png',
  iconUrl: '/marker-icon.png',
  shadowUrl: '/marker-shadow.png',
});

// Leaflet bileşenlerini client-side olarak yükle
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

// Map bileşenini dinamik olarak import ediyoruz ve SSR'ı devre dışı bırakıyoruz
const MapComponent = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-100 animate-pulse" />
});

export default function Home() {
  const istanbulPosition: [number, number] = [41.0082, 28.9784];
  const [isMounted, setIsMounted] = useState(false);
  const [pickupAddress, setPickupAddress] = useState('');
  const [dropoffAddress, setDropoffAddress] = useState('');
  const [isSelectingPickup, setIsSelectingPickup] = useState(false);
  const [isSelectingDropoff, setIsSelectingDropoff] = useState(false);
  const [pickupLocation, setPickupLocation] = useState<Location | null>(null);
  const [dropoffLocation, setDropoffLocation] = useState<Location | null>(null);
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Adres araması yap
  const searchAddress = async (query: string) => {
    if (query.length < 3) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}, Türkiye&countrycodes=tr&addressdetails=1&limit=5`
      );
      const data = await response.json();
      // Sadece Türkiye'deki sonuçları filtrele
      const turkeyResults = data.filter((result: any) => 
        result.address.country === 'Türkiye' || 
        result.address.country === 'Turkey'
      );
      setSearchResults(turkeyResults);
    } catch (error) {
      console.error('Adres araması başarısız:', error);
    }
    setIsSearching(false);
  };

  // Adres seçildiğinde
  const handleAddressSelect = (result: any, isPickup: boolean) => {
    const location = {
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon)
    };

    if (isPickup) {
      setPickupLocation(location);
      setPickupAddress(formatAddressDetails(result.address));
    } else {
      setDropoffLocation(location);
      setDropoffAddress(formatAddressDetails(result.address));
    }
    setSearchResults([]);
  };

  // Adres detaylarını formatla
  const formatAddressDetails = (address: any) => {
    if (!address) return '';
    
    const parts = [];
    
    if (address.house_number) parts.push(address.house_number);
    if (address.road) parts.push(address.road);
    if (address.quarter || address.neighbourhood) parts.push(address.quarter || address.neighbourhood);
    if (address.suburb) parts.push(address.suburb);
    if (address.district || address.state_district) parts.push(address.district || address.state_district);
    if (address.city || address.state) parts.push(address.city || address.state);
    if (address.postcode) parts.push(address.postcode);

    return parts.length > 0 ? parts.join(', ') : 'Adres detayları bulunamadı';
  };

  const handleLocationSelect = (location: Location, address: any) => {
    const formattedAddress = formatAddressDetails(address);
    
    if (isSelectingPickup) {
      setPickupLocation(location);
      setPickupAddress(formattedAddress);
      setIsSelectingPickup(false);
    } else if (isSelectingDropoff) {
      setDropoffLocation(location);
      setDropoffAddress(formattedAddress);
      setIsSelectingDropoff(false);
    }
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            <div className="flex-1 space-y-6">
              <h1 className="text-5xl font-bold text-gray-900">
                7/24 Çekici Hizmeti
              </h1>
              <p className="text-xl text-gray-600">
                Türkiye'nin her yerinde profesyonel çekici hizmeti. Acil ve planlı taşımalarınız için yanınızdayız.
              </p>
              <button className="bg-red-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 inline-flex items-center gap-2">
                <span className="animate-pulse text-2xl bg-white rounded-full w-11 h-11 flex items-center justify-center">🚨</span>
                Acil Çekici Çağır
              </button>
            </div>
            <div className="flex-1">
              <div className="w-full h-[400px] rounded-xl shadow-lg overflow-hidden">
                {isMounted && (
                  <MapComponent 
                    pickupLocation={pickupLocation || undefined}
                    dropoffLocation={dropoffLocation || undefined}
                    onLocationSelect={handleLocationSelect}
                    isSelectingPickup={isSelectingPickup}
                    isSelectingDropoff={isSelectingDropoff}
                  />
                )}
              </div>
              {/* Adres Seçim Alanları */}
              <div className="mt-4 space-y-3">
                <div className="relative">
                  <input
                    type="text"
                    value={pickupAddress}
                    onChange={(e) => {
                      setPickupAddress(e.target.value);
                      searchAddress(e.target.value);
                    }}
                    placeholder="Alınacak Adres"
                    className="w-full p-3 border border-gray-300 rounded-lg pr-24"
                  />
                  <button
                    onClick={() => {
                      setIsSelectingPickup(true);
                      setIsSelectingDropoff(false);
                      setSearchResults([]);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Haritadan Seç
                  </button>
                  {/* Arama Sonuçları Dropdown */}
                  {searchResults.length > 0 && pickupAddress.length >= 3 && (
                    <div className="absolute left-0 right-24 top-1/2 mt-8 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddressSelect(result, true)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                          {formatAddressDetails(result.address)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type="text"
                    value={dropoffAddress}
                    onChange={(e) => {
                      setDropoffAddress(e.target.value);
                      searchAddress(e.target.value);
                    }}
                    placeholder="Bırakılacak Adres"
                    className="w-full p-3 border border-gray-300 rounded-lg pr-24"
                  />
                  <button
                    onClick={() => {
                      setIsSelectingDropoff(true);
                      setIsSelectingPickup(false);
                      setSearchResults([]);
                    }}
                    className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                  >
                    Haritadan Seç
                  </button>
                  {/* Arama Sonuçları Dropdown */}
                  {searchResults.length > 0 && dropoffAddress.length >= 3 && (
                    <div className="absolute left-0 right-24 top-1/2 mt-8 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
                      {searchResults.map((result, index) => (
                        <button
                          key={index}
                          onClick={() => handleAddressSelect(result, false)}
                          className="w-full text-left px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none"
                        >
                          {formatAddressDetails(result.address)}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hizmetler Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Hizmetlerimiz</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Acil Çekici */}
            <div className="bg-white rounded-xl shadow-sm p-6 border hover:border-primary transition-colors">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Acil Çekici</h3>
              <p className="text-gray-600">7/24 acil yol yardım hizmeti. Bulunduğunuz konuma en yakın çekiciyi yönlendiriyoruz.</p>
            </div>

            {/* Planlı Tekli Çekici */}
            <div className="bg-white rounded-xl shadow-sm p-6 border hover:border-primary transition-colors">
              <div className="mb-4">
                <span className="text-3xl">🚛</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Planlı Tekli Çekici</h3>
              <p className="text-gray-600">Önceden planlanmış tekli araç taşıma hizmeti. İstediğiniz tarih ve saatte hizmetinizdeyiz.</p>
            </div>

            {/* Planlı Çoklu Çekici */}
            <div className="bg-white rounded-xl shadow-sm p-6 border hover:border-primary transition-colors">
              <div className="mb-4">
                <span className="text-3xl">🚛</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Planlı Çoklu Çekici</h3>
              <p className="text-gray-600">Filo taşıma ve çoklu araç nakil hizmeti. Kurumsal çözümler için ideal seçim.</p>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler Section */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">Aktif Çekici</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50.000+</div>
              <div className="text-gray-600">Tamamlanan Görev</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">81</div>
              <div className="text-gray-600">İl Kapsamı</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">7/24</div>
              <div className="text-gray-600">Hizmet</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
