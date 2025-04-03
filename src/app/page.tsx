'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import type { Location } from './components/Map';
import { FaPhone, FaMapMarkerAlt, FaTruck, FaClock, FaCheckCircle } from 'react-icons/fa';

// Map bileşenini dinamik olarak import ediyoruz ve SSR'ı devre dışı bırakıyoruz
const MapComponent = dynamic(() => import('./components/Map'), {
  ssr: false,
  loading: () => <div className="w-full h-[500px] bg-gray-100 animate-pulse flex items-center justify-center">
    <div className="text-gray-500">Harita yükleniyor...</div>
  </div>
});

export default function Home() {
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
      <section className="relative bg-gradient-to-b from-primary/5 to-white py-12 md:py-20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
            <div className="flex-1 space-y-6 text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                7/24 Çekici Hizmeti
              </h1>
              <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0">
                Türkiye'nin her yerinde profesyonel çekici hizmeti. Acil ve planlı taşımalarınız için yanınızdayız.
              </p>
              <button className="bg-red-600 text-white px-6 md:px-8 py-3 rounded-lg text-lg font-semibold hover:bg-red-700 transition-colors duration-200 inline-flex items-center gap-3 mx-auto lg:mx-0">
                <span className="animate-pulse bg-white rounded-full w-10 h-10 flex items-center justify-center text-xl">🚨</span>
                Acil Çekici Çağır
              </button>
            </div>

            <div className="flex-1 w-full max-w-2xl lg:max-w-none">
              <div className="bg-white p-4 rounded-2xl shadow-lg">
                <div className="w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden mb-4">
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
                <div className="space-y-3">
                  <div className="relative">
                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-blue-100 rounded-full">
                        <span className="text-blue-600 text-lg">📍</span>
                      </div>
                      <input
                        type="text"
                        value={pickupAddress}
                        onChange={(e) => {
                          setPickupAddress(e.target.value);
                          searchAddress(e.target.value);
                        }}
                        placeholder="Alınacak Adres"
                        className="flex-1 p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900"
                      />
                      <button
                        onClick={() => {
                          setIsSelectingPickup(true);
                          setIsSelectingDropoff(false);
                          setSearchResults([]);
                        }}
                        className="flex-shrink-0 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                      >
                        Haritadan Seç
                      </button>
                    </div>
                    {/* Arama Sonuçları Dropdown */}
                    {searchResults.length > 0 && pickupAddress.length >= 3 && (
                      <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
                        {searchResults.map((result, index) => (
                          <button
                            key={index}
                            onClick={() => handleAddressSelect(result, true)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-b-0 border-gray-100"
                          >
                            {formatAddressDetails(result.address)}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                  
                  <div className="relative">
                    <div className="flex items-center space-x-2 bg-gray-50 p-2 rounded-lg">
                      <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-red-100 rounded-full">
                        <span className="text-red-600 text-lg">📍</span>
                      </div>
                      <input
                        type="text"
                        value={dropoffAddress}
                        onChange={(e) => {
                          setDropoffAddress(e.target.value);
                          searchAddress(e.target.value);
                        }}
                        placeholder="Bırakılacak Adres"
                        className="flex-1 p-2 bg-transparent border-none focus:ring-0 focus:outline-none text-gray-900"
                      />
                      <button
                        onClick={() => {
                          setIsSelectingDropoff(true);
                          setIsSelectingPickup(false);
                          setSearchResults([]);
                        }}
                        className="flex-shrink-0 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                      >
                        Haritadan Seç
                      </button>
                    </div>
                    {/* Arama Sonuçları Dropdown */}
                    {searchResults.length > 0 && dropoffAddress.length >= 3 && (
                      <div className="absolute left-0 right-0 mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto z-50">
                        {searchResults.map((result, index) => (
                          <button
                            key={index}
                            onClick={() => handleAddressSelect(result, false)}
                            className="w-full text-left px-4 py-3 hover:bg-gray-50 focus:bg-gray-50 focus:outline-none border-b last:border-b-0 border-gray-100"
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
        </div>
      </section>

      {/* Hizmetler Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Hizmetlerimiz</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Acil Çekici */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🚨</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Acil Çekici</h3>
              <p className="text-gray-600 text-center">
                7/24 acil yol yardım hizmeti. Bulunduğunuz konuma en yakın çekiciyi yönlendiriyoruz.
              </p>
            </div>

            {/* Planlı Tekli Çekici */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🚛</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Planlı Tekli Çekici</h3>
              <p className="text-gray-600 text-center">
                Önceden planlanmış tekli araç taşıma hizmeti. İstediğiniz tarih ve saatte hizmetinizdeyiz.
              </p>
            </div>

            {/* Planlı Çoklu Çekici */}
            <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-200">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                <span className="text-3xl">🚛</span>
              </div>
              <h3 className="text-xl font-semibold text-center mb-4">Planlı Çoklu Çekici</h3>
              <p className="text-gray-600 text-center">
                Filo taşıma ve çoklu araç nakil hizmeti. Kurumsal çözümler için ideal seçim.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* İstatistikler Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">1000+</div>
              <div className="text-gray-600">Aktif Çekici</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">50.000+</div>
              <div className="text-gray-600">Tamamlanan Görev</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">81</div>
              <div className="text-gray-600">İl Kapsamı</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">7/24</div>
              <div className="text-gray-600">Hizmet</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24 bg-primary text-white">
        <div className="container mx-auto px-4 max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hemen Çekici Çağırın
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            7/24 profesyonel çekici hizmetimiz ile yanınızdayız. Tek tıkla en yakın çekiciyi çağırın.
          </p>
          <button className="bg-white text-primary px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors inline-flex items-center gap-3">
            <FaPhone className="text-xl" />
            Çekici Çağır
          </button>
        </div>
      </section>
    </main>
  );
}
