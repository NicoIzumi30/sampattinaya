import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { 
  TrendingUp, 
  BookOpen, 
  Calculator, 
  Brain, 
  MessageCircle,
  Star,
  Clock,
  Target
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import DashboardNav from '@/components/common/DashboardNav';
import Link from 'next/link';

export default function DashboardPage() {
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

  const stats = [
    {
      title: "Total Skor",
      value: "2,450",
      change: "+12%",
      icon: TrendingUp,
      color: "text-green-600"
    },
    {
      title: "Modul Selesai",
      value: "8/12",
      change: "67%",
      icon: BookOpen,
      color: "text-blue-600"
    },
    {
      title: "Simulasi",
      value: "5",
      change: "Completed",
      icon: Calculator,
      color: "text-purple-600"
    },
    {
      title: "Kuis Passed",
      value: "15/18",
      change: "83%",
      icon: Brain,
      color: "text-orange-600"
    }
  ];

  const recentActivities = [
    {
      title: "Menyelesaikan kuis 'Anggaran Dasar'",
      time: "2 jam yang lalu",
      score: "+150 poin",
      type: "quiz"
    },
    {
      title: "Membaca artikel 'Tips Investasi'",
      time: "1 hari yang lalu",
      score: "+50 poin",
      type: "learning"
    },
    {
      title: "Simulasi Budget Bulanan",
      time: "2 hari yang lalu",
      score: "+200 poin",
      type: "simulation"
    }
  ];

  const recommendedModules = [
    {
      title: "Investasi untuk Pemula",
      description: "Pelajari dasar-dasar investasi",
      progress: 0,
      duration: "45 min",
      difficulty: "Pemula"
    },
    {
      title: "Perencanaan Pensiun",
      description: "Strategi menyiapkan dana pensiun",
      progress: 25,
      duration: "60 min",
      difficulty: "Menengah"
    },
    {
      title: "Analisis Laporan Keuangan",
      description: "Memahami laporan keuangan perusahaan",
      progress: 0,
      duration: "90 min",
      difficulty: "Lanjutan"
    }
  ];

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
        <title>Dashboard - SampattiNaya</title>
        <meta name="description" content="Dashboard pembelajaran literasi finansial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {/* Welcome Section */}
            <div className="mb-8">
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Selamat datang, {user.name}! 👋
              </h1>
              <p className="text-muted-foreground">
                Mari lanjutkan perjalanan literasi finansial Anda hari ini.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {stat.title}
                          </p>
                          <p className="text-xl font-bold">{stat.value}</p>
                          <p className={`text-xs ${stat.color}`}>
                            {stat.change}
                          </p>
                        </div>
                        <Icon className={`h-8 w-8 ${stat.color}`} />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
              {/* Progress Overview */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Progress Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Learning Progress</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Quiz Completion</span>
                        <span>83%</span>
                      </div>
                      <Progress value={83} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Monthly Goal</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      <Link href="/dashboard/learning">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2">
                          <BookOpen className="h-6 w-6" />
                          <span className="text-xs">Learning</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/simulasi">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2">
                          <Calculator className="h-6 w-6" />
                          <span className="text-xs">Simulasi</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/kuis">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2">
                          <Brain className="h-6 w-6" />
                          <span className="text-xs">Kuis</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/ai-chat">
                        <Button variant="outline" className="w-full h-20 flex-col gap-2">
                          <MessageCircle className="h-6 w-6" />
                          <span className="text-xs">AI Chat</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activities */}
              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Activities
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium line-clamp-2">
                            {activity.title}
                          </p>
                          <div className="flex items-center justify-between mt-1">
                            <p className="text-xs text-muted-foreground">
                              {activity.time}
                            </p>
                            <Badge variant="secondary" className="text-xs">
                              {activity.score}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Recommended Modules */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Recommended
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {recommendedModules.map((module, index) => (
                      <div key={index} className="border rounded-lg p-3">
                        <h4 className="font-medium text-sm mb-1">
                          {module.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mb-2">
                          {module.description}
                        </p>
                        <div className="flex items-center justify-between text-xs mb-2">
                          <span>{module.duration}</span>
                          <Badge variant="outline" className="text-xs">
                            {module.difficulty}
                          </Badge>
                        </div>
                        {module.progress > 0 && (
                          <Progress value={module.progress} className="h-1 mb-2" />
                        )}
                        <Button size="sm" variant="outline" className="w-full text-xs">
                          {module.progress > 0 ? 'Lanjutkan' : 'Mulai'}
                        </Button>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
