'use client';

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-white">
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-4">Profilim</h1>
          <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-sm p-8 mt-8">
            <div className="flex items-center space-x-4 mb-8">
              <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl font-semibold">Kullanıcı Adı</h2>
                <p className="text-gray-600">kullanici@email.com</p>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Kişisel Bilgiler</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
                    <input type="text" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Telefon</label>
                    <input type="tel" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary" />
                  </div>
                </div>
              </div>
              <button className="w-full bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90">
                Bilgileri Güncelle
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 