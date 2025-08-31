import { Calendar, Clock, User } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import Image from 'next/image';

export function NewsCard({ article }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-[#171717] border-[#404040] hover:border-[#15C26B]">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={article.coverUrl}
          alt={article.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 left-3">
          <Badge variant="secondary" className="bg-background/90 backdrop-blur-sm">
            {article.category}
          </Badge>
        </div>
      </div>
      
      <CardHeader className="pb-3">
        <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-[#15C26B] transition-colors text-white">
          {article.title}
        </h3>
      </CardHeader>
      
      <CardContent className="pt-0">
        <p className="text-gray-400 text-sm line-clamp-3 mb-4">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <User className="h-3 w-3" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{article.readingTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </div>
        </div>
        
        <Link href={`/news/${article.slug}`} passHref>
          <Button variant="outline" className="w-full group-hover:bg-[#15C26B] group-hover:text-white transition-colors border-[#404040] text-gray-300 hover:border-[#15C26B]">
            Baca Selengkapnya
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}

export default function NewsCards({ articles }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {articles.map((article) => (
        <NewsCard key={article.id} article={article} />
      ))}
    </div>
  );
}
