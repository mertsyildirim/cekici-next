'use client';

import { useState } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="border-b sticky top-0 h-16 md:h-20 relative z-50 bg-white/95 backdrop-blur-sm">
      <div className="container mx-auto px-4 h-full max-w-7xl">
        <div className="flex items-center justify-between h-full">
          <a href="/" className="flex items-center h-full py-2">
            <img 
              src="/header_logo.png" 
              alt="ÇekiciApp Logo" 
              className="h-full w-auto object-contain" 
            />
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="/" className="text-gray-600 hover:text-primary transition-colors">Ana Sayfa</a>
            <a href="/hakkimizda" className="text-gray-600 hover:text-primary transition-colors">Hakkımızda</a>
            <a href="/nasil-calisir" className="text-gray-600 hover:text-primary transition-colors">Nasıl Çalışır?</a>
            <a href="/iletisim" className="text-gray-600 hover:text-primary transition-colors">İletişim</a>
            <a href="#" className="text-gray-600 hover:text-primary transition-colors">Blog</a>
            <div className="relative group">
              <button className="flex items-center space-x-1 text-gray-700 hover:text-primary transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span>Hesabım</span>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white shadow-lg border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform origin-top scale-95 group-hover:scale-100">
                <div className="py-1">
                  <a href="/profil" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Profilim
                  </a>
                  <a href="/cekici-cagrilarim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Çekici Çağrılarım
                  </a>
                  <a href="/odemelerim" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Ödemelerim
                  </a>
                  <a href="/ayarlar" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                    Ayarlar
                  </a>
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50">
                    Çıkış Yap
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Navigation */}
          <div className={`md:hidden fixed inset-0 bg-gray-800/50 backdrop-blur-sm transition-opacity ${isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`} onClick={() => setIsMobileMenuOpen(false)}>
            <div className={`fixed right-0 top-0 h-full w-64 bg-white shadow-xl transition-transform transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`} onClick={e => e.stopPropagation()}>
              <div className="p-4 space-y-4">
                <a href="/" className="block py-2 text-gray-600">Ana Sayfa</a>
                <a href="/hakkimizda" className="block py-2 text-gray-600">Hakkımızda</a>
                <a href="/nasil-calisir" className="block py-2 text-gray-600">Nasıl Çalışır?</a>
                <a href="/iletisim" className="block py-2 text-gray-600">İletişim</a>
                <a href="#" className="block py-2 text-gray-600">Blog</a>
                <hr className="my-4" />
                <div className="space-y-2">
                  <a href="/profil" className="block py-2 text-gray-600">Profilim</a>
                  <a href="/cekici-cagrilarim" className="block py-2 text-gray-600">Çekici Çağrılarım</a>
                  <a href="/odemelerim" className="block py-2 text-gray-600">Ödemelerim</a>
                  <a href="/ayarlar" className="block py-2 text-gray-600">Ayarlar</a>
                </div>
                <hr className="my-4" />
                <button className="w-full text-left py-2 text-red-600">
                  Çıkış Yap
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
} 