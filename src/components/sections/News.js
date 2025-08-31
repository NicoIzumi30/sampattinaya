import React, { useState, useEffect } from 'react';
import { Calendar, Clock } from 'lucide-react';

const News = ({ language = 'id' }) => {
  const [visibleItems, setVisibleItems] = useState([]);

  const content = {
    id: {
      title: 'Berita & Artikel Terbaru',
      lead: 'Ikuti update literasi finansial dan kabar terbaru dari SampattiNaya.',
      readMore: 'Baca Selengkapnya',
      category: 'Literasi',
      newsItems: [
        {
          id: 1,
          title: 'Strategi Mengelola Keuangan di Era Digital',
          excerpt: 'Pelajari cara memanfaatkan teknologi untuk mengelola keuangan pribadi dengan lebih efektif dan aman.',
          image: 'https://awsimages.detik.net.id/visual/2024/09/30/dok-agung-sedayu-grup_43.jpeg?w=200&q=90',
          date: '30 September 2024',
          readTime: '5 menit'
        },
        {
          id: 2,
          title: 'Tips Belanja Hemat Tanpa Mengurangi Kualitas',
          excerpt: 'Strategi belanja cerdas yang membantu menghemat pengeluaran bulanan tanpa mengorbankan kebutuhan penting.',
          image: 'https://awsimages.detik.net.id/visual/2024/03/24/pesta-diskon-koper-murah-di-transmart-fullday-sale-transmart-graha-raya-bintaro-minggu-2432024_43.jpeg?w=200&q=90',
          date: '24 Maret 2024',
          readTime: '7 menit'
        },
        {
          id: 3,
          title: 'Sejarah dan Evolusi Sistem Keuangan Indonesia',
          excerpt: 'Memahami perkembangan sistem finansial Indonesia dari masa ke masa untuk perspektif yang lebih luas.',
          image: 'https://awsimages.detik.net.id/visual/2023/12/01/jacobus-hubertus-menten-1833-1920-dok-jph-poleyeroica_43.jpeg?w=200&q=90',
          date: '1 Desember 2023',
          readTime: '10 menit'
        }
      ]
    },
    en: {
      title: 'Latest News & Articles',
      lead: 'Stay updated with financial literacy insights and latest news from SampattiNaya.',
      readMore: 'Read More',
      category: 'Literacy',
      newsItems: [
        {
          id: 1,
          title: 'Digital Era Financial Management Strategies',
          excerpt: 'Learn how to leverage technology to manage personal finances more effectively and securely.',
          image: 'https://awsimages.detik.net.id/visual/2024/09/30/dok-agung-sedayu-grup_43.jpeg?w=200&q=90',
          date: 'September 30, 2024',
          readTime: '5 min'
        },
        {
          id: 2,
          title: 'Smart Shopping Tips Without Compromising Quality',
          excerpt: 'Smart shopping strategies that help save monthly expenses without sacrificing important needs.',
          image: 'https://awsimages.detik.net.id/visual/2024/03/24/pesta-diskon-koper-murah-di-transmart-fullday-sale-transmart-graha-raya-bintaro-minggu-2432024_43.jpeg?w=200&q=90',
          date: 'March 24, 2024',
          readTime: '7 min'
        },
        {
          id: 3,
          title: 'History and Evolution of Indonesian Financial System',
          excerpt: 'Understanding the development of Indonesia\'s financial system over time for broader perspective.',
          image: 'https://awsimages.detik.net.id/visual/2023/12/01/jacobus-hubertus-menten-1833-1920-dok-jph-poleyeroica_43.jpeg?w=200&q=90',
          date: 'December 1, 2023',
          readTime: '10 min'
        }
      ]
    }
  };

  const currentContent = content[language] || content.id;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = parseInt(entry.target.dataset.id);
            setVisibleItems(prev => [...new Set([...prev, id])]);
          }
        });
      },
      { threshold: 0.1 }
    );

    const newsItems = document.querySelectorAll('[data-news-item]');
    newsItems.forEach((item) => observer.observe(item));

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl lg:text-4xl font-bold mb-4">
          {currentContent.title}
        </h2>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          {currentContent.lead}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentContent.newsItems.map((item, index) => (
          <div
            key={item.id}
            data-id={item.id}
            data-news-item
            className={`group cursor-pointer transform transition-all duration-500 h-full ${
              visibleItems.includes(item.id)
                ? 'translate-y-0 opacity-100'
                : 'translate-y-8 opacity-0'
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <div
              className={`
                rounded-xl overflow-hidden transition-all duration-300 h-full flex flex-col
                bg-[#171717] border border-[#404040] hover:border-[#15C26B]
                shadow-sm hover:shadow-lg group-hover:-translate-y-1
              `}
            >
              {/* Image Container */}
              <div className="relative overflow-hidden">
                <div className="aspect-[16/9] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div
                    className="absolute inset-0 hidden items-center justify-center bg-[#171717]"
                  >
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-2 rounded-lg bg-[#404040]"></div>
                      <p className="text-sm text-gray-400">Image</p>
                    </div>
                  </div>
                </div>
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className={`
                    px-3 py-1 text-xs font-medium rounded-full
                    bg-[#15C26B]/20 text-[#15C26B] border border-[#15C26B]/30
                  `}>
                    {currentContent.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-semibold leading-tight group-hover:text-[#15C26B] transition-colors duration-200 mb-3 min-h-[3.5rem] line-clamp-2 text-white">
                  {item.title}
                </h3>
                
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 flex-1 mb-4">
                  {item.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between mt-auto pt-2">
                  <div className="flex items-center space-x-4 text-xs text-gray-400">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3" />
                      <span>{item.date}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3" />
                      <span>{item.readTime}</span>
                    </div>
                  </div>
                  
                  <button className="text-[#15C26B] hover:text-[#15C26B]/80 text-sm font-medium transition-colors duration-200 whitespace-nowrap">
                    {currentContent.readMore} →
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Optional "View All" Button */}
      <div className="text-center mt-12">
        <button 
          className={`
            px-6 py-3 rounded-lg font-medium transition-all duration-200
            bg-[#171717] border border-[#404040] hover:border-[#15C26B] text-white
            hover:shadow-md hover:-translate-y-0.5
          `}
        >
          {language === 'id' ? 'Lihat Semua Artikel' : 'View All Articles'}
        </button>
      </div>
    </section>
  );
};

export default News;