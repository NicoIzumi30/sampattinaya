import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = ({ language = 'id', onLanguageChange }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  
  // Content translations
  const content = {
    id: {
      nav: {
        links: ['Beranda', 'Tentang', 'Fitur', 'Testimoni', 'Peringkat', 'Berita'],
        cta: 'Coba Sekarang'
      }
    },
    en: {
      nav: {
        links: ['Home', 'About', 'Features', 'Testimonials', 'Leaderboard', 'News'],
        cta: 'Try Now'
      }
    }
  };

  const currentContent = content[language] || content.id;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { name: currentContent.nav.links[0], href: '/' },
    { name: currentContent.nav.links[1], href: '/#about' },
    { name: currentContent.nav.links[2], href: '/#features' },
    { name: currentContent.nav.links[3], href: '/#testimonials' },
    { name: currentContent.nav.links[4], href: '/leaderboard' },
    { name: currentContent.nav.links[5], href: '/news' },
  ];

  return (
    <header className={`fixed top-0 z-50 w-full transition-all duration-300 ${
      scrolled 
        ? 'bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40' 
        : 'bg-transparent'
    }`}>
      <div className="container flex h-16 max-w-screen-2xl items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className={`font-bold text-xl ${scrolled ? 'text-sampattinaya-accent' : 'text-white'}`}>
            SampattiNaya
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium ml-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`transition-colors hover:text-foreground/80 ${
                scrolled ? 'text-foreground/60' : 'text-white/80'
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Language switcher and CTA */}
        <div className="flex flex-1 items-center justify-end space-x-2">
          {/* Language switcher */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className={`w-9 px-0 ${scrolled ? '' : 'text-white/80'}`}
              >
                <Globe className="h-4 w-4" />
                <span className="sr-only">Ganti bahasa</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onLanguageChange('id')}>
                Indonesia
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => onLanguageChange('en')}>
                English
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* CTA Button */}
          <Link href="/auth/register">
            <Button 
              size="sm" 
              className="bg-sampattinaya-accent hover:bg-sampattinaya-accent/90 text-white"
            >
              {currentContent.nav.cta}
            </Button>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-white"
            onClick={toggleMenu}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            <span className="sr-only">Toggle menu</span>
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-background border-t border-border/40">
          <div className="container py-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="block px-2 py-3 text-sm font-medium text-foreground/60 hover:text-foreground transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;