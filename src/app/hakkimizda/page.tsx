'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Hakkımızda</h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mb-8">
            Türkiye'nin en büyük çekici ağına sahip mobil uygulama platformu olarak, 7/24 yanınızdayız.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Hikayemiz</h2>
              <div className="space-y-4">
                <p className="text-gray-600">
                  2024 yılında kurulan ÇekiciApp, yolda kalan sürücülerin en büyük yardımcısı olmak amacıyla yola çıktı. 
                  Türkiye'nin dört bir yanındaki profesyonel çekici hizmetlerini tek bir platformda buluşturarak, 
                  sürücülere hızlı ve güvenilir çözümler sunuyoruz.
                </p>
                <p className="text-gray-600">
                  Misyonumuz, yolda kalan hiçbir sürücünün çaresiz kalmaması. Bu amaçla geliştirdiğimiz teknoloji sayesinde, 
                  size en yakın çekiciyi en kısa sürede ulaştırıyoruz.
                </p>
              </div>
            </div>
            <div className="bg-gray-100 rounded-xl p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">500+</div>
                  <p className="text-gray-600">Aktif Çekici</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">81</div>
                  <p className="text-gray-600">İl Kapsamı</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">10K+</div>
                  <p className="text-gray-600">Mutlu Müşteri</p>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-primary mb-2">15dk</div>
                  <p className="text-gray-600">Ortalama Varış</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Değerlerimiz</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Güvenilirlik</h3>
              <p className="text-gray-600">
                Tüm çekici ortaklarımız özenle seçilir ve düzenli olarak denetlenir. Güvenliğiniz bizim için her şeyden önemli.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Hız</h3>
              <p className="text-gray-600">
                Gelişmiş teknolojimiz sayesinde en yakın çekiciyi bulur ve hızlıca yardımınıza göndeririz.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-6">
                <span className="text-primary text-2xl">💎</span>
              </div>
              <h3 className="text-xl font-semibold mb-4">Şeffaflık</h3>
              <p className="text-gray-600">
                Fiyatlandırma ve hizmet süreçlerimiz tamamen şeffaftır. Sürpriz maliyetlerle karşılaşmazsınız.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Ekibimiz</h2>
          <div className="grid gap-8 md:grid-cols-4">
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Ahmet Yılmaz</h3>
              <p className="text-gray-600">Kurucu & CEO</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Ayşe Kaya</h3>
              <p className="text-gray-600">Operasyon Müdürü</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Mehmet Demir</h3>
              <p className="text-gray-600">Teknoloji Direktörü</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full mx-auto mb-4"></div>
              <h3 className="text-xl font-semibold">Zeynep Şahin</h3>
              <p className="text-gray-600">Müşteri İlişkileri</p>
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