import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { href: '/', label: 'Beranda' },
    { href: '#about-section', label: 'Tentang' },
    { href: '#features-section', label: 'Fitur' },
    { href: '/leaderboard', label: 'Peringkat' },
    { href: '/news', label: 'Berita' },
  ];

  const legalLinks = [
    { href: '/privacy', label: 'Kebijakan Privasi' },
    { href: '/terms', label: 'Syarat & Ketentuan' },
    { href: '/help', label: 'Bantuan' },
    { href: '/contact', label: 'Kontak' },
  ];

  const socialLinks = [
    { href: '#', icon: Facebook, label: 'Facebook' },
    { href: '#', icon: Twitter, label: 'Twitter' },
    { href: '#', icon: Instagram, label: 'Instagram' },
    { href: '#', icon: Linkedin, label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#171717] border-t border-[#404040] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-4">
              <h3 className="text-xl font-bold text-white mb-2">SampattiNaya</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Platform pembelajaran literasi finansial yang membantu Anda mengelola keuangan 
                dengan lebih baik melalui simulasi, kuis, dan panduan praktis.
              </p>
            </div>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="text-gray-400 hover:text-[#15C26B] transition-colors duration-200"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5" />
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Navigasi</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#15C26B] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-3">
              {legalLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#15C26B] transition-colors duration-200 text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Kontak</h4>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                <span className="text-gray-400 text-sm">
                  Jakarta, Indonesia
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <a
                  href="mailto:info@sampattinaya.com"
                  className="text-gray-400 hover:text-[#15C26B] transition-colors duration-200 text-sm"
                >
                  info@sampattinaya.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <a
                  href="tel:+628123456789"
                  className="text-gray-400 hover:text-[#15C26B] transition-colors duration-200 text-sm"
                >
                  +62 812-3456-789
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-8 border-t border-[#404040]">
          <div className="max-w-md mx-auto text-center">
            <h4 className="text-lg font-semibold text-white mb-2">Dapatkan Update Terbaru</h4>
            <p className="text-gray-400 text-sm mb-4">
              Berlangganan untuk mendapatkan tips finansial dan update fitur terbaru
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Masukkan email Anda"
                className="flex-1 px-4 py-2 bg-[#121212] border border-[#404040] rounded-lg text-white placeholder:text-gray-400 focus:border-[#15C26B] focus:ring-1 focus:ring-[#15C26B] focus:outline-none"
              />
              <Button className="bg-[#15C26B] hover:bg-[#10A558] text-white">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-[#404040]">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} SampattiNaya. All rights reserved.
            </div>
            <div className="text-gray-400 text-sm">
              Made with ❤️ for financial literacy
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
