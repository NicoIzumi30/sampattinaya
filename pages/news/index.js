import Head from 'next/head';
import { useState, useEffect, useMemo } from 'react';
import { Newspaper } from 'lucide-react';
import NewsCards from '@/components/sections/NewsCards';
import NewsSearch from '@/components/sections/NewsSearch';
import NewsTabs from '@/components/sections/NewsTabs';
import { useDebounce } from '@/hooks/useDebounce';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';

const CATEGORIES = [
  { value: 'all', label: 'Semua' },
  { value: 'tips', label: 'Tips' },
  { value: 'edukasi', label: 'Edukasi' },
  { value: 'umkm', label: 'UMKM' },
  { value: 'investasi', label: 'Investasi' }
];

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
  const [newsData, setNewsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [language, setLanguage] = useState('id');

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/data/news.json');
        const data = await response.json();
        
        // Sort by publishedAt descending (newest first)
        const sorted = data.sort((a, b) => 
          new Date(b.publishedAt) - new Date(a.publishedAt)
        );
        
        setNewsData(sorted);
      } catch (error) {
        console.error('Error fetching news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredNews = useMemo(() => {
    let filtered = newsData;

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(article => 
        article.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (debouncedSearchTerm) {
      const searchLower = debouncedSearchTerm.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchLower) ||
        article.excerpt.toLowerCase().includes(searchLower) ||
        article.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }

    return filtered;
  }, [newsData, activeCategory, debouncedSearchTerm]);

  const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
  const paginatedNews = filteredNews.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // Reset to page 1 when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, debouncedSearchTerm]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <MainLayout language={language} onLanguageChange={handleLanguageChange}>
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15C26B] mx-auto mb-4"></div>
            <p className="text-white">Memuat berita...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout language={language} onLanguageChange={handleLanguageChange}>
      <Head>
        <title>Berita - SampattiNaya</title>
        <meta name="description" content="Berita dan artikel terbaru tentang literasi finansial dan pengelolaan keuangan" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div className="min-h-screen bg-[#121212]">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Newspaper className="h-8 w-8 text-[#15C26B]" />
              <h1 className="text-3xl md:text-4xl font-bold text-white">
                Berita & Artikel
              </h1>
            </div>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Temukan tips, panduan, dan wawasan terbaru tentang literasi finansial 
              untuk meningkatkan kemampuan pengelolaan keuangan Anda
            </p>
          </div>

          {/* Search and Filters */}
          <div className="max-w-4xl mx-auto mb-8 space-y-6">
            <NewsSearch
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              placeholder="Cari berita, tips, atau topik..."
            />
            
            <NewsTabs
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              categories={CATEGORIES}
            />
          </div>

          {/* Results Info */}
          <div className="max-w-4xl mx-auto mb-6">
            <p className="text-sm text-gray-400">
              Menampilkan {filteredNews.length} artikel
              {activeCategory !== 'all' && (
                <span> dalam kategori &ldquo;{CATEGORIES.find(cat => cat.value === activeCategory)?.label}&rdquo;</span>
              )}
              {debouncedSearchTerm && (
                <span> untuk pencarian &ldquo;{debouncedSearchTerm}&rdquo;</span>
              )}
            </p>
          </div>

          {/* News Cards */}
          <div className="max-w-6xl mx-auto mb-8">
            {paginatedNews.length > 0 ? (
              <NewsCards articles={paginatedNews} />
            ) : (
              <div className="text-center py-12">
                <Newspaper className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2 text-white">Tidak ada artikel ditemukan</h3>
                <p className="text-gray-400 mb-4">
                  Coba ubah kriteria pencarian atau kategori
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setActiveCategory('all');
                  }}
                >
                  Reset Filter
                </Button>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 max-w-4xl mx-auto">
              <Button
                variant="outline"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                Sebelumnya
              </Button>
              
              <span className="text-sm text-gray-400">
                Halaman {currentPage} dari {totalPages}
              </span>
              
              <Button
                variant="outline"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                Selanjutnya
              </Button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
