export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Nasıl Çalışır?</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            ÇekiciApp ile yolda kaldığınızda size en yakın çekiciyi bulmanız çok kolay. İşte adım adım nasıl çalıştığını anlatalım.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Step 1 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-xl font-bold">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Uygulamayı İndirin</h3>
              <p className="text-gray-600">
                App Store veya Google Play'den ÇekiciApp'i indirin ve hesabınızı oluşturun. Sadece birkaç dakikanızı alacak.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-xl font-bold">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Konumunuzu Paylaşın</h3>
              <p className="text-gray-600">
                Yolda kaldığınızda uygulamayı açın ve konumunuzu paylaşın. Sistem otomatik olarak size en yakın çekicileri bulacaktır.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-xl font-bold">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Çekiciyi Seçin</h3>
              <p className="text-gray-600">
                Size en yakın çekiciler arasından fiyat ve kullanıcı değerlendirmelerine göre size en uygun olanı seçin.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-xl font-bold">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Hizmeti Onaylayın</h3>
              <p className="text-gray-600">
                Seçtiğiniz çekicinin fiyat teklifini onaylayın. Ödemeyi uygulama üzerinden güvenle yapabilirsiniz.
              </p>
            </div>

            {/* Step 5 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-xl font-bold">5</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Çekiciyi Takip Edin</h3>
              <p className="text-gray-600">
                Çekicinin size olan mesafesini ve tahmini varış süresini uygulama üzerinden canlı olarak takip edin.
              </p>
            </div>

            {/* Step 6 */}
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-xl font-bold">6</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Değerlendirme Yapın</h3>
              <p className="text-gray-600">
                Hizmet tamamlandıktan sonra deneyiminizi puanlayın ve yorumunuzu paylaşın. Bu sayede sistemin kalitesini artırmamıza yardımcı olun.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Neden ÇekiciApp?</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡️</div>
              <h3 className="text-xl font-semibold mb-2">Hızlı Hizmet</h3>
              <p className="text-gray-600">Ortalama 15 dakika içinde size en yakın çekici yola çıkar.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-semibold mb-2">Güvenli Ödeme</h3>
              <p className="text-gray-600">Ödemelerinizi uygulama üzerinden güvenle yapın.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">⭐️</div>
              <h3 className="text-xl font-semibold mb-2">Kaliteli Hizmet</h3>
              <p className="text-gray-600">Tüm çekiciler özenle seçilir ve düzenli olarak denetlenir.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-50">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2024 ÇekiciApp. Tüm hakları saklıdır.</p>
        </div>
      </footer>
    </main>
  );
} 