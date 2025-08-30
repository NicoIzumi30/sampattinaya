import React from 'react';
import { Instagram, Github, ExternalLink } from 'lucide-react';

const Footer = ({ language = 'id' }) => {
  const content = {
    id: {
      note: 'sampattinaya adalah proyek edukasi non-komersial untuk meningkatkan literasi keuangan masyarakat.',
      columns: {
        'Produk': [
          { name: 'Fitur Utama', href: '#' },
          { name: 'Modul Pembelajaran', href: '#' },
          { name: 'Dashboard', href: '#' },
          { name: 'AI Mentor', href: '#' }
        ],
        'Resource': [
          { name: 'FAQ', href: '#' },
          { name: 'Berita & Artikel', href: '#' },
          { name: 'Kebijakan Privasi', href: '#' },
          { name: 'Syarat & Ketentuan', href: '#' }
        ],
        'Tentang': [
          { name: 'Visi & Misi', href: '#' },
          { name: 'Tim Kami', href: '#' },
          { name: 'Kontak', href: '#' },
          { name: 'Karir', href: '#' }
        ],
        'Komunitas': [
          { name: 'Instagram', href: '#', icon: Instagram },
          { name: 'GitHub', href: '#', icon: Github },
          { name: 'Blog', href: '#', icon: ExternalLink }
        ]
      }
    },
    en: {
      note: 'sampattinaya is a non-commercial educational project to improve financial literacy in society.',
      columns: {
        'Product': [
          { name: 'Main Features', href: '#' },
          { name: 'Learning Modules', href: '#' },
          { name: 'Dashboard', href: '#' },
          { name: 'AI Mentor', href: '#' }
        ],
        'Resources': [
          { name: 'FAQ', href: '#' },
          { name: 'News & Articles', href: '#' },
          { name: 'Privacy Policy', href: '#' },
          { name: 'Terms & Conditions', href: '#' }
        ],
        'About': [
          { name: 'Vision & Mission', href: '#' },
          { name: 'Our Team', href: '#' },
          { name: 'Contact', href: '#' },
          { name: 'Careers', href: '#' }
        ],
        'Community': [
          { name: 'Instagram', href: '#', icon: Instagram },
          { name: 'GitHub', href: '#', icon: Github },
          { name: 'Blog', href: '#', icon: ExternalLink }
        ]
      }
    }
  };

  const currentContent = content[language] || content.id;

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="py-16 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {Object.entries(currentContent.columns).map(([title, links]) => (
            <div key={title} className="space-y-4">
              <h4 className="font-semibold text-sm uppercase tracking-wider opacity-75">
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <li key={index}>
                      <a
                        href={link.href}
                        className="flex items-center space-x-2 text-sm transition-colors duration-200 text-gray-400 hover:text-white hover:text-sampattinaya-accent"
                      >
                        {Icon && <Icon className="w-4 h-4" />}
                        <span>{link.name}</span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="border-t pt-8 border-gray-800">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            {/* Logo & Social */}
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-sampattinaya-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">F</span>
                </div>
                <span className="text-xl font-bold">sampattinaya</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200 bg-gray-800 hover:bg-gray-700 text-gray-400 hover:text-white"
                >
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Copyright & Note */}
            <div className="text-center lg:text-right space-y-2">
              <p className="text-sm text-muted-foreground max-w-md">
                {currentContent.note}
              </p>
              <p className="text-xs text-muted-foreground">
                © {new Date().getFullYear()} sampattinaya. {language === 'id' ? 'Hak cipta dilindungi.' : 'All rights reserved.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;