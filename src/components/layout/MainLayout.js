import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Menu, X, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import Footer from './Footer';

export default function MainLayout({ children }) {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [language, setLanguage] = useState('id');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '#about-section', label: 'Tentang' },
    { href: '#features-section', label: 'Fitur' },
    { href: '/leaderboard', label: 'Peringkat' },
    { href: '/news', label: 'News' }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#121212]/95 backdrop-blur-xl border-b border-[#404040]' 
          : 'bg-transparent'
      }`}>
        <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? 'h-16 py-3' : 'h-20 py-4'
          }`}>
            {/* Logo */}
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 flex items-center space-x-2">
                <span className={`font-bold text-white transition-all duration-500 ${
                  isScrolled ? 'text-lg' : 'text-xl'
                }`}>
                  SampattiNaya
                </span>
              </Link>
            </div>

            {/* Center Navigation Links */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className={`flex items-center transition-all duration-500 ${
                isScrolled ? 'space-x-6' : 'space-x-8'
              }`}>
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    className={`hover:text-[#15C26B] transition-all duration-300 font-medium ${
                      isScrolled ? 'text-sm' : 'text-base'
                    } ${router.pathname === link.href ? 'text-[#15C26B]' : 'text-white'}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right Side Actions */}
            <div className={`flex items-center transition-all duration-500 ${
              isScrolled ? 'space-x-2' : 'space-x-3'
            }`}>
              {/* Language Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="transition-all duration-500 hidden sm:flex text-white hover:text-[#15C26B] hover:bg-transparent">
                    <Globe className={`mr-1 transition-all duration-500 ${
                      isScrolled ? 'w-3 h-3' : 'w-4 h-4'
                    }`} />
                    <span className={`transition-all duration-500 ${
                      isScrolled ? 'text-xs' : 'text-sm'
                    }`}>
                      {language.toUpperCase()}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-[#171717] border-[#404040]">
                  <DropdownMenuItem onClick={() => setLanguage('id')} className="text-white hover:bg-[#404040]">
                    Indonesian
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setLanguage('en')} className="text-white hover:bg-[#404040]">
                    English
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Link href="/auth/register">
                <Button
                  className={`bg-[#15C26B] hover:bg-[#10A558] text-white transition-all duration-500 rounded-full border-0 ${
                    isScrolled ? 'text-xs px-4 py-2 h-8' : 'text-sm px-6 py-2 h-10'
                  }`}
                >
                  Coba Sekarang
                </Button>
              </Link>

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-white hover:text-[#15C26B] hover:bg-transparent"
                >
                  {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed top-16 left-0 right-0 bg-[#121212]/95 backdrop-blur-xl border-b border-[#404040] z-40">
          <div className="px-4 py-6 space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="block text-base font-medium hover:text-[#15C26B] transition-colors text-white"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4 border-t border-[#404040]">
              <Link href="/auth/register" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full bg-[#15C26B] hover:bg-[#10A558] text-white">
                  Coba Sekarang
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <main className="pt-20">
        {children}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
