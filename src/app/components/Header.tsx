export default function Header() {
  return (
    <header className="border-b h-24 relative z-50 bg-white">
      <div className="container mx-auto px-4 h-full">
        <div className="flex items-center justify-between h-full">
          <a href="/" className="flex items-center h-full py-0">
            <img 
              src="/header_logo.png" 
              alt="ÇekiciApp Logo" 
              className="h-2/5 w-auto object-contain" 
            />
          </a>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-primary">Ana Sayfa</a>
            <a href="/hakkimizda" className="text-gray-600 hover:text-primary">Hakkımızda</a>
            <a href="/nasil-calisir" className="text-gray-600 hover:text-primary">Nasıl Çalışır?</a>
            <a href="/iletisim" className="text-gray-600 hover:text-primary">İletişim</a>
            <a href="#" className="text-gray-600 hover:text-primary">Blog</a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Hesabım</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="fixed right-4 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200" style={{ zIndex: 99999, top: '4rem' }}>
                <div className="py-2">
                  <a href="/profil" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Profilim
                  </a>
                  <a href="/cekici-cagrilarim" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Çekici Çağrılarım
                  </a>
                  <a href="/odemelerim" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Ödemelerim
                  </a>
                  <a href="/ayarlar" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Ayarlar
                  </a>
                  <hr className="my-2" />
                  <button className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100">
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
} 