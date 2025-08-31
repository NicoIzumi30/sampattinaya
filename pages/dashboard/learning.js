import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BookOpen, Clock, Star, Play, CheckCircle, Lock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardNav from '@/components/common/DashboardNav';

export default function LearningPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('sampattinaya_demo_user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    setUser(JSON.parse(userData));
  }, [router]);

  const modules = [
    {
      id: 1,
      title: "Pengantar Literasi Finansial",
      description: "Memahami konsep dasar pengelolaan keuangan pribadi",
      duration: "30 min",
      difficulty: "Pemula",
      progress: 100,
      status: "completed",
      lessons: 5,
      rating: 4.8
    },
    {
      id: 2,
      title: "Anggaran dan Perencanaan Keuangan",
      description: "Belajar membuat dan mengelola anggaran pribadi yang efektif",
      duration: "45 min",
      difficulty: "Pemula", 
      progress: 75,
      status: "in_progress",
      lessons: 6,
      rating: 4.9
    },
    {
      id: 3,
      title: "Tabungan dan Dana Darurat",
      description: "Strategi menabung dan membangun dana darurat yang solid",
      duration: "40 min",
      difficulty: "Pemula",
      progress: 60,
      status: "in_progress", 
      lessons: 5,
      rating: 4.7
    },
    {
      id: 4,
      title: "Investasi untuk Pemula",
      description: "Pengenalan dunia investasi dan instrumen investasi dasar",
      duration: "60 min",
      difficulty: "Menengah",
      progress: 0,
      status: "available",
      lessons: 8,
      rating: 4.8
    },
    {
      id: 5,
      title: "Manajemen Utang dan Kredit",
      description: "Cara mengelola utang dan membangun kredit yang baik",
      duration: "50 min", 
      difficulty: "Menengah",
      progress: 0,
      status: "available",
      lessons: 7,
      rating: 4.6
    },
    {
      id: 6,
      title: "Perencanaan Pensiun",
      description: "Strategi perencanaan keuangan untuk masa pensiun",
      duration: "55 min",
      difficulty: "Lanjutan",
      progress: 0,
      status: "locked",
      lessons: 9,
      rating: 4.9
    }
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in_progress':
        return <Play className="h-5 w-5 text-blue-600" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-400" />;
      default:
        return <BookOpen className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'completed':
        return 'Selesai';
      case 'in_progress':
        return 'Sedang Belajar';
      case 'locked':
        return 'Terkunci';
      default:
        return 'Tersedia';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Pemula':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100';
      case 'Menengah':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100';
      case 'Lanjutan':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100';
    }
  };

  const handleStartModule = (moduleId) => {
    alert(`Memulai modul ${moduleId}. Ini adalah demo mode.`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Learning - SampattiNaya</title>
        <meta name="description" content="Modul pembelajaran literasi finansial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Learning Modules
              </h1>
              <p className="text-muted-foreground">
                Tingkatkan literasi finansial Anda dengan modul pembelajaran yang terstruktur
              </p>
            </div>

            {/* Progress Summary */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Progress Pembelajaran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">1</div>
                    <div className="text-sm text-muted-foreground">Modul Selesai</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
                    <div className="text-sm text-muted-foreground">Sedang Belajar</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600 mb-1">235</div>
                    <div className="text-sm text-muted-foreground">Menit Belajar</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {modules.map((module) => (
                <Card key={module.id} className={`relative ${module.status === 'locked' ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(module.status)}
                        <Badge className={getDifficultyColor(module.difficulty)}>
                          {module.difficulty}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                        <span className="text-sm">{module.rating}</span>
                      </div>
                    </div>
                    <CardTitle className="text-lg line-clamp-2 mt-2">
                      {module.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {module.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>{module.duration}</span>
                      </div>
                      <span>{module.lessons} lessons</span>
                    </div>
                    
                    {module.progress > 0 && (
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Progress</span>
                          <span>{module.progress}%</span>
                        </div>
                        <Progress value={module.progress} className="h-2" />
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">
                        {getStatusText(module.status)}
                      </span>
                      <Button 
                        size="sm" 
                        onClick={() => handleStartModule(module.id)}
                        disabled={module.status === 'locked'}
                        variant={module.status === 'completed' ? 'outline' : 'default'}
                      >
                        {module.status === 'completed' 
                          ? 'Ulangi' 
                          : module.status === 'in_progress' 
                          ? 'Lanjutkan' 
                          : module.status === 'locked'
                          ? 'Terkunci'
                          : 'Mulai'
                        }
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
