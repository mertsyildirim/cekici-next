'use client';

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Ödemelerim</h1>
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm p-8 mt-8">
            <div className="mb-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold">Ödeme Geçmişi</h2>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Toplam Harcama</p>
                  <p className="text-2xl font-bold text-primary">2.450 ₺</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              {/* Ödeme Kayıtları */}
              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Çekici Hizmeti #123456</h3>
                    <p className="text-sm text-gray-600">15 Mart 2024, 14:30</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">850 ₺</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Ödendi
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Çekici Hizmeti #123455</h3>
                    <p className="text-sm text-gray-600">14 Mart 2024, 10:15</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">800 ₺</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Ödendi
                    </span>
                  </div>
                </div>
              </div>

              <div className="border rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">Çekici Hizmeti #123454</h3>
                    <p className="text-sm text-gray-600">13 Mart 2024, 16:45</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">800 ₺</p>
                    <span className="inline-block px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                      Ödendi
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 