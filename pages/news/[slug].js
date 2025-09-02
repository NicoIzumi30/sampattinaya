import Head from 'next/head';
import { useState, useEffect } from 'react';
import { Calendar, Clock, User, ArrowLeft, Tag, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import NewsCards from '@/components/sections/NewsCards';
import MainLayout from '@/components/layout/MainLayout';

export default function NewsDetailPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [article, setArticle] = useState(null);
  const [relatedArticles, setRelatedArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [language, setLanguage] = useState('id');

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  useEffect(() => {
    if (!slug) return;

    const fetchArticle = async () => {
      try {
        const response = await fetch('/data/news.json');
        const newsData = await response.json();
        
        // Find the current article
        const currentArticle = newsData.find(article => article.slug === slug);
        
        if (currentArticle) {
          setArticle(currentArticle);
          
          // Find related articles (same category, different article, max 3)
          const related = newsData
            .filter(item => 
              item.id !== currentArticle.id && 
              item.category === currentArticle.category
            )
            .slice(0, 3);
          
          setRelatedArticles(related);
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [slug]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <MainLayout language={language} onLanguageChange={handleLanguageChange}>
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#15C26B] mx-auto mb-4"></div>
            <p className="text-white">Memuat artikel...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (!article) {
    return (
      <MainLayout language={language} onLanguageChange={handleLanguageChange}>
        <div className="min-h-screen bg-[#121212] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4 text-white">Artikel tidak ditemukan</h1>
            <p className="text-gray-400 mb-6">
              Artikel yang Anda cari tidak tersedia atau telah dihapus.
            </p>
            <Link href="/news">
              <Button className="bg-[#15C26B] hover:bg-[#10A558]">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Kembali ke Berita
              </Button>
            </Link>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout language={language} onLanguageChange={handleLanguageChange}>
      <Head>
        <title>{article.title} - SampattiNaya</title>
        <meta name="description" content={article.excerpt} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.coverUrl} />
        <meta property="og:type" content="article" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={article.coverUrl} />
      </Head>
      
      <div className="min-h-screen bg-[#121212]">
        {/* Article Layout */}
        <article className="max-w-4xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <nav className="mb-8">
            <Link href="/news" className="text-gray-400 hover:text-[#15C26B] transition-colors flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Berita
            </Link>
          </nav>

          {/* Article Header */}
          <header className="mb-8">
            {/* Category Badge */}
            <div className="mb-4">
              <Badge className="bg-[#15C26B] text-white hover:bg-[#10A558]">
                {article.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              {article.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-300 leading-relaxed mb-8">
              {article.excerpt}
            </p>

            {/* Meta Information */}
            <div className="flex flex-wrap items-center gap-6 text-gray-400 mb-8">
              <div className="flex items-center gap-2">
                <User className="h-4 w-4" />
                <span>{article.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(article.publishedAt)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{article.readingTime} menit baca</span>
              </div>
            </div>

            {/* Share Buttons */}
            <div className="flex items-center gap-4 mb-8">
              <span className="text-gray-400 text-sm">Bagikan:</span>
              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="border-[#404040] text-gray-300 hover:border-[#15C26B] hover:text-[#15C26B]">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-[#404040] text-gray-300 hover:border-[#15C26B] hover:text-[#15C26B]">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-[#404040] text-gray-300 hover:border-[#15C26B] hover:text-[#15C26B]">
                  <Linkedin className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="border-[#404040] text-gray-300 hover:border-[#15C26B] hover:text-[#15C26B]">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="relative h-64 md:h-96 overflow-hidden rounded-lg mb-12">
            <Image
              src={article.coverUrl}
              alt={article.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Article Content */}
          <div className="prose prose-lg prose-invert max-w-none mb-12">
            <div 
              className="text-gray-200 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: article.content }}
              style={{
                fontSize: '18px',
                lineHeight: '1.8'
              }}
            />
          </div>

          {/* Tags */}
          {article.tags && article.tags.length > 0 && (
            <div className="mb-12">
              <div className="flex items-center gap-3 flex-wrap">
                <Tag className="h-5 w-5 text-gray-400" />
                <span className="text-gray-400 font-medium">Tags:</span>
                <div className="flex gap-2 flex-wrap">
                  {article.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-[#404040] text-gray-300 hover:bg-[#171717]">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Related Articles */}
          {relatedArticles.length > 0 && (
            <div>
              <Separator className="mb-12 bg-[#404040]" />
              <section>
                <h2 className="text-2xl font-bold mb-8 text-white">Artikel Terkait</h2>
                <NewsCards articles={relatedArticles} />
              </section>
            </div>
          )}
        </article>
      </div>
    </MainLayout>
  );
}
