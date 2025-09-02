import React from 'react';
import Link from 'next/link';
import { Instagram, Github, Globe } from 'lucide-react';

const Footer = ({ language = 'id' }) => {
  // Content translations
  const content = {
    id: {
      footer: {
        note: 'SampattiNaya adalah proyek edukasi non-komersial untuk meningkatkan literasi keuangan masyarakat.',
        columns: {
          'Produk': ['Fitur', 'Modul', 'Dashboard'],
          'Resource': ['FAQ', 'Berita', 'Kebijakan'],
          'Tentang': ['Visi & Misi', 'Kontak'],
          'Social': ['Instagram', 'GitHub']
        }
      }
    },
    en: {
      footer: {
        note: 'SampattiNaya is a non-commercial educational project to improve financial literacy in the community.',
        columns: {
          'Product': ['Features', 'Modules', 'Dashboard'],
          'Resources': ['FAQ', 'News', 'Policy'],
          'About': ['Vision & Mission', 'Contact'],
          'Social': ['Instagram', 'GitHub']
        }
      }
    }
  };

  const currentContent = content[language] || content.id;

  const footerLinks = [
    {
      title: Object.keys(currentContent.footer.columns)[0],
      items: currentContent.footer.columns[Object.keys(currentContent.footer.columns)[0]]
    },
    {
      title: Object.keys(currentContent.footer.columns)[1],
      items: currentContent.footer.columns[Object.keys(currentContent.footer.columns)[1]]
    },
    {
      title: Object.keys(currentContent.footer.columns)[2],
      items: currentContent.footer.columns[Object.keys(currentContent.footer.columns)[2]]
    }
  ];

  return (
    <footer className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 mt-auto">
      <div className="container max-w-screen-2xl py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand and description */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <span className="font-bold text-xl text-sampattinaya-accent">SampattiNaya</span>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              {currentContent.footer.note}
            </p>
            <div className="flex space-x-4">
              <Link href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="https://github.com" target="_blank" rel="noopener noreferrer">
                <Github className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
              <Link href="https://sampattinaya.example" target="_blank" rel="noopener noreferrer">
                <Globe className="h-5 w-5 text-muted-foreground hover:text-foreground" />
              </Link>
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-sm font-semibold mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link 
                      href="#" 
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Social links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">
              {Object.keys(currentContent.footer.columns)[3]}
            </h3>
            <ul className="space-y-3">
              {currentContent.footer.columns[Object.keys(currentContent.footer.columns)[3]].map((item, index) => (
                <li key={index}>
                  <Link 
                    href="#" 
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-border/40 mt-12 pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} SampattiNaya. Hak Cipta Dilindungi.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;