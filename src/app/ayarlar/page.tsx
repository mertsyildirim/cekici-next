'use client';

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Ayarlar</h1>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 mt-8">
            <div className="space-y-8">
              {/* Bildirim Ayarları */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Bildirim Ayarları</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">E-posta Bildirimleri</h3>
                      <p className="text-sm text-gray-600">Çekici çağrıları ve ödemeler hakkında e-posta al</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">SMS Bildirimleri</h3>
                      <p className="text-sm text-gray-600">Önemli güncellemeler için SMS al</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Güvenlik Ayarları */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Güvenlik</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Şifre Değiştir</label>
                    <input type="password" placeholder="Mevcut şifre" className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary mb-2" />
                    <input type="password" placeholder="Yeni şifre" className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary mb-2" />
                    <input type="password" placeholder="Yeni şifre tekrar" className="w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                  <button className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                    Şifreyi Güncelle
                  </button>
                </div>
              </div>

              {/* Hesap Ayarları */}
              <div>
                <h2 className="text-xl font-semibold mb-4">Hesap</h2>
                <div className="space-y-4">
                  <button className="w-full border border-red-600 text-red-600 px-6 py-2 rounded-lg hover:bg-red-50">
                    Hesabımı Sil
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