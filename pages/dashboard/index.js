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
import { DashboardSkeleton } from '@/components/common/SkeletonLoading';
import OnboardingTutorial from '@/components/common/OnboardingTutorial';
import Link from 'next/link';

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const userData = localStorage.getItem('sampattinaya_user');
    if (!userData) {
      router.push('/auth/login');
      return;
    }
    
    // Simulate loading delay
    setTimeout(() => {
      setUser(JSON.parse(userData));
      setIsLoading(false);
      
      // Check if this is user's first time
      const tutorialCompleted = localStorage.getItem('sampattinaya_tutorial_completed');
      if (!tutorialCompleted) {
        // Small delay to ensure DOM is ready
        setTimeout(() => {
          setShowOnboarding(true);
        }, 500);
      }
    }, 1000);
  }, [router]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
  };

  // Function to restart tutorial (for testing)
  const restartTutorial = () => {
    localStorage.removeItem('sampattinaya_tutorial_completed');
    setShowOnboarding(true);
  };

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

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-3 py-4 max-w-7xl">
            <DashboardSkeleton />
          </div>
        </main>
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
        <DashboardNav className="dashboard-nav" />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-3 py-4 max-w-7xl">
            {/* Welcome Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold mb-2">
                    Selamat datang, {user.name}! 👋
                  </h1>
                  <p className="text-muted-foreground">
                    Mari lanjutkan perjalanan literasi finansial Anda hari ini.
                  </p>
                </div>
                {/* Development: Tutorial restart button */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={restartTutorial}
                  className="text-xs"
                >
                  Tutorial
                </Button>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="dashboard-stats grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
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
              {/* Recommended Modules */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Recommended
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {recommendedModules.map((module, index) => (
                      <div key={index} className="border rounded-lg p-3 flex items-center gap-3">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 line-clamp-1">
                            {module.title}
                          </h4>
                          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
                            {module.description}
                          </p>
                          <div className="flex items-center gap-2 text-xs">
                            <span>{module.duration}</span>
                            <Badge variant="outline" className="text-xs">
                              {module.difficulty}
                            </Badge>
                          </div>
                          {module.progress > 0 && (
                            <Progress value={module.progress} className="h-1 mt-2" />
                          )}
                        </div>
                        <Button size="sm" variant="outline" className="text-xs px-3 flex-shrink-0">
                          {module.progress > 0 ? 'Lanjutkan' : 'Mulai'}
                        </Button>
                      </div>
                    ))}
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

                {/* Quick Actions */}
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="quick-actions grid grid-cols-2 md:grid-cols-4 gap-3">
                      <Link href="/dashboard/learning">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <BookOpen className="h-5 w-5" />
                          <span className="text-xs">Learning</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/simulasi">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <Calculator className="h-5 w-5" />
                          <span className="text-xs">Simulasi</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/kuis">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <Brain className="h-5 w-5" />
                          <span className="text-xs">Kuis</span>
                        </Button>
                      </Link>
                      <Link href="/dashboard/ai-chat">
                        <Button variant="outline" className="h-auto p-4 flex flex-col items-center gap-2 w-full">
                          <MessageCircle className="h-5 w-5" />
                          <span className="text-xs">AI Chat</span>
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              
              </div>
            </div>
          </div>
        </main>

        {/* Onboarding Tutorial */}
        {showOnboarding && (
          <OnboardingTutorial onComplete={handleOnboardingComplete} />
        )}
      </div>
    </>
  );
}

