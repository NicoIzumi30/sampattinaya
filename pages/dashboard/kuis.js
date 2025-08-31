import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Brain, Play, Trophy, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardNav from '@/components/common/DashboardNav';

export default function KuisPage() {
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

  const quizzes = [
    {
      id: 1,
      title: "Dasar-dasar Literasi Finansial",
      description: "Tes pemahaman Anda tentang konsep dasar keuangan pribadi",
      questions: 10,
      duration: "15 menit",
      difficulty: "Pemula",
      status: "completed",
      score: 85,
      completedAt: "2024-01-15"
    },
    {
      id: 2,
      title: "Perencanaan Anggaran",
      description: "Evaluasi kemampuan Anda dalam membuat dan mengelola anggaran",
      questions: 8,
      duration: "12 menit",
      difficulty: "Pemula",
      status: "completed",
      score: 92,
      completedAt: "2024-01-18"
    },
    {
      id: 3,
      title: "Investasi untuk Pemula",
      description: "Ujian pengetahuan dasar tentang dunia investasi",
      questions: 12,
      duration: "18 menit",
      difficulty: "Menengah",
      status: "available",
      score: null,
      completedAt: null
    },
    {
      id: 4,
      title: "Manajemen Utang dan Kredit",
      description: "Tes pemahaman tentang pengelolaan utang yang sehat",
      questions: 10,
      duration: "15 menit",
      difficulty: "Menengah",
      status: "available",
      score: null,
      completedAt: null
    },
    {
      id: 5,
      title: "Perencanaan Pensiun",
      description: "Evaluasi strategi perencanaan keuangan jangka panjang",
      questions: 15,
      duration: "25 menit",
      difficulty: "Lanjutan",
      status: "locked",
      score: null,
      completedAt: null
    },
    {
      id: 6,
      title: "Analisis Investasi Lanjutan",
      description: "Tes mendalam tentang analisis dan strategi investasi",
      questions: 20,
      duration: "35 menit",
      difficulty: "Lanjutan",
      status: "locked",
      score: null,
      completedAt: null
    }
  ];

  const getStatusIcon = (status, score) => {
    if (status === 'completed') {
      return score >= 70 ? (
        <CheckCircle className="h-5 w-5 text-green-600" />
      ) : (
        <XCircle className="h-5 w-5 text-red-600" />
      );
    }
    return <Play className="h-5 w-5 text-blue-600" />;
  };

  const getStatusBadge = (status, score) => {
    if (status === 'completed') {
      if (score >= 90) return <Badge className="bg-green-600">Excellent</Badge>;
      if (score >= 80) return <Badge className="bg-blue-600">Good</Badge>;
      if (score >= 70) return <Badge className="bg-yellow-600">Fair</Badge>;
      return <Badge className="bg-red-600">Needs Improvement</Badge>;
    }
    if (status === 'locked') return <Badge variant="secondary">Locked</Badge>;
    return <Badge variant="outline">Available</Badge>;
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Pemula':
        return 'text-green-600';
      case 'Menengah':
        return 'text-yellow-600';
      case 'Lanjutan':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const handleStartQuiz = (quizId) => {
    alert(`Memulai kuis ${quizId}. Ini adalah demo mode.`);
  };

  const completedQuizzes = quizzes.filter(q => q.status === 'completed');
  const averageScore = completedQuizzes.length > 0 
    ? completedQuizzes.reduce((sum, q) => sum + q.score, 0) / completedQuizzes.length 
    : 0;

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
        <title>Kuis - SampattiNaya</title>
        <meta name="description" content="Tes kemampuan literasi finansial dengan kuis interaktif" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            {/* Header */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Kuis Literasi Finansial
              </h1>
              <p className="text-muted-foreground">
                Uji pemahaman Anda dengan berbagai kuis yang menantang
              </p>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
              <Card>
                <CardContent className="p-4 text-center">
                  <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{completedQuizzes.length}</div>
                  <div className="text-sm text-muted-foreground">Kuis Selesai</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Brain className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{averageScore.toFixed(0)}%</div>
                  <div className="text-sm text-muted-foreground">Rata-rata Skor</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{completedQuizzes.filter(q => q.score >= 70).length}</div>
                  <div className="text-sm text-muted-foreground">Lulus</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-4 text-center">
                  <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">{completedQuizzes.length * 15}</div>
                  <div className="text-sm text-muted-foreground">Menit Total</div>
                </CardContent>
              </Card>
            </div>

            {/* Progress Overview */}
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Progress Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Kuis Pemula</span>
                      <span>2/2 selesai</span>
                    </div>
                    <Progress value={100} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Kuis Menengah</span>
                      <span>0/2 selesai</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>Kuis Lanjutan</span>
                      <span>0/2 selesai</span>
                    </div>
                    <Progress value={0} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quiz List */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {quizzes.map((quiz) => (
                <Card key={quiz.id} className={`relative ${quiz.status === 'locked' ? 'opacity-60' : ''}`}>
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-2">
                      {getStatusIcon(quiz.status, quiz.score)}
                      {getStatusBadge(quiz.status, quiz.score)}
                    </div>
                    <CardTitle className="text-lg line-clamp-2">
                      {quiz.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {quiz.description}
                    </p>
                    
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between text-sm">
                        <span>Pertanyaan:</span>
                        <span>{quiz.questions}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Durasi:</span>
                        <span>{quiz.duration}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>Tingkat:</span>
                        <span className={getDifficultyColor(quiz.difficulty)}>
                          {quiz.difficulty}
                        </span>
                      </div>
                      {quiz.score && (
                        <div className="flex items-center justify-between text-sm">
                          <span>Skor:</span>
                          <span className="font-semibold">{quiz.score}%</span>
                        </div>
                      )}
                    </div>
                    
                    <Button 
                      className="w-full" 
                      onClick={() => handleStartQuiz(quiz.id)}
                      disabled={quiz.status === 'locked'}
                      variant={quiz.status === 'completed' ? 'outline' : 'default'}
                    >
                      {quiz.status === 'completed' 
                        ? 'Ulangi Kuis' 
                        : quiz.status === 'locked'
                        ? 'Terkunci'
                        : 'Mulai Kuis'
                      }
                    </Button>
                    
                    {quiz.completedAt && (
                      <p className="text-xs text-muted-foreground mt-2 text-center">
                        Selesai: {new Date(quiz.completedAt).toLocaleDateString('id-ID')}
                      </p>
                    )}
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
