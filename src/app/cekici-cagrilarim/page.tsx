'use client';

export default function TowCallsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Çekici Çağrılarım</h1>
          <div className="max-w-5xl mx-auto bg-white rounded-xl shadow-sm p-8 mt-8">
            <div className="space-y-6">
              {/* Aktif Çağrı */}
              <div className="border rounded-lg p-6 bg-primary/5">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-sm mb-3">
                      Aktif Çağrı
                    </span>
                    <h3 className="text-lg font-semibold">Çağrı #123456</h3>
                    <p className="text-gray-600 mt-2">Konum: İstanbul, Kadıköy</p>
                    <p className="text-gray-600">Tarih: 15 Mart 2024, 14:30</p>
                  </div>
                  <button className="text-red-600 hover:text-red-700">
                    İptal Et
                  </button>
                </div>
              </div>

              {/* Geçmiş Çağrılar */}
              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm mb-3">
                      Tamamlandı
                    </span>
                    <h3 className="text-lg font-semibold">Çağrı #123455</h3>
                    <p className="text-gray-600 mt-2">Konum: İstanbul, Beşiktaş</p>
                    <p className="text-gray-600">Tarih: 14 Mart 2024, 10:15</p>
                  </div>
                  <button className="text-primary hover:text-primary/80">
                    Detaylar
                  </button>
                </div>
              </div>

              <div className="border rounded-lg p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <span className="inline-block px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm mb-3">
                      İptal Edildi
                    </span>
                    <h3 className="text-lg font-semibold">Çağrı #123454</h3>
                    <p className="text-gray-600 mt-2">Konum: İstanbul, Şişli</p>
                    <p className="text-gray-600">Tarih: 13 Mart 2024, 16:45</p>
                  </div>
                  <button className="text-primary hover:text-primary/80">
                    Detaylar
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 