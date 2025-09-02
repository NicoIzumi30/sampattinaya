import Link from 'next/link';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Footer({ language = 'id' }) {
  const currentYear = new Date().getFullYear();

  const quickLinks = language === 'en' ? [
    { href: '/', label: 'Home' },
    { href: '#about-section', label: 'About' },
    { href: '#features-section', label: 'Features' },
    { href: '/leaderboard', label: 'Leaderboard' },
    { href: '/news', label: 'News' },
  ] : [
    { href: '/', label: 'Beranda' },
    { href: '#about-section', label: 'Tentang' },
    { href: '#features-section', label: 'Fitur' },
    { href: '/leaderboard', label: 'Peringkat' },
    { href: '/news', label: 'Berita' },
  ];

  const legalLinks = language === 'en' ? [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms & Conditions' },
    { href: '/help', label: 'Help' },
    { href: '/contact', label: 'Contact' },
  ] : [
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
                {language === 'en' 
                  ? 'A financial literacy learning platform that helps you manage your finances better through simulations, quizzes, and practical guides.'
                  : 'Platform pembelajaran literasi finansial yang membantu Anda mengelola keuangan dengan lebih baik melalui simulasi, kuis, dan panduan praktis.'
                }
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
            <h4 className="text-lg font-semibold text-white mb-4">{language === 'en' ? 'Navigation' : 'Navigasi'}</h4>
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
            <h4 className="text-lg font-semibold text-white mb-4">{language === 'en' ? 'Legal' : 'Legal'}</h4>
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
            <h4 className="text-lg font-semibold text-white mb-4">{language === 'en' ? 'Contact' : 'Kontak'}</h4>
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