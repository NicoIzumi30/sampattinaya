import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { BookOpen, Clock, Star, Play, CheckCircle, Lock, PlayCircle, Users, Award, Target, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardNav from '@/components/common/DashboardNav';
import { CourseDetailSkeleton } from '@/components/common/SkeletonLoading';

export default function CourseDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [course, setCourse] = useState(null);
  const [selectedEpisode, setSelectedEpisode] = useState(null);

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
    }, 800);
  }, [router]);

  useEffect(() => {
    if (id && !isLoading) {
      // Find the course based on id
      const foundCourse = courses.find(c => c.id === parseInt(id));
      if (foundCourse) {
        setCourse(foundCourse);
        setSelectedEpisode(foundCourse.episodes[0]); // Select first episode by default
      }
    }
  }, [id, isLoading]);

  const courses = [
    {
      id: 1,
      title: "Pengantar Literasi Finansial",
      description: "Memahami konsep dasar pengelolaan keuangan pribadi",
      duration: "30 min",
      difficulty: "Pemula",
      progress: 100,
      status: "completed",
      lessons: 5,
      rating: 4.8,
      videoUrl: "https://www.youtube.com/embed/a81bXkES-gg",
      instructor: "Dr. Sarah Johnson",
      students: 1250,
      fullDescription: "Course komprehensif yang akan mengajarkan Anda dasar-dasar literasi finansial. Mulai dari konsep dasar hingga aplikasi praktis dalam kehidupan sehari-hari. Anda akan belajar bagaimana mengelola keuangan pribadi dengan bijak dan membuat keputusan finansial yang tepat.",
      whatYouLearn: [
        "Memahami konsep dasar keuangan pribadi",
        "Mengidentifikasi komponen-komponen keuangan",
        "Menetapkan tujuan keuangan yang realistis",
        "Mengevaluasi kondisi finansial pribadi"
      ],
      episodes: [
        { 
          id: 1, 
          title: "Apa itu Literasi Finansial?", 
          duration: "5:24", 
          description: "Pengenalan konsep literasi finansial dan mengapa penting untuk kehidupan",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/hUKc-YbKv4tq3Ohd"
        },
        { 
          id: 2, 
          title: "Pentingnya Mengelola Keuangan", 
          duration: "6:15", 
          description: "Memahami dampak pengelolaan keuangan yang baik terhadap kehidupan",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/hUKc-YbKv4tq3Ohd"
        },
        { 
          id: 3, 
          title: "Komponen Keuangan Pribadi", 
          duration: "8:32", 
          description: "Mengenal berbagai komponen dalam keuangan pribadi",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/hUKc-YbKv4tq3Ohd"
        },
        { 
          id: 4, 
          title: "Tujuan Keuangan", 
          duration: "7:18", 
          description: "Cara menetapkan dan mencapai tujuan keuangan yang efektif",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/hUKc-YbKv4tq3Ohd"
        },
        { 
          id: 5, 
          title: "Kuis Evaluasi", 
          duration: "4:00", 
          description: "Menguji pemahaman Anda tentang literasi finansial",
          completed: true,
          isQuiz: true
        }
      ]
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
      rating: 4.9,
      videoUrl: "https://www.youtube.com/embed/ttuVo_t4XNI",
      instructor: "Prof. Michael Chen",
      students: 980,
      fullDescription: "Pelajari cara membuat dan mengelola anggaran yang efektif untuk mencapai tujuan keuangan Anda. Course ini akan mengajarkan berbagai metode budgeting, tools yang dapat digunakan, dan cara mengatasi tantangan dalam pengelolaan anggaran.",
      whatYouLearn: [
        "Menguasai prinsip anggaran 50/30/20",
        "Melacak dan menganalisis pengeluaran",
        "Membuat anggaran bulanan yang realistis",
        "Menggunakan tools dan aplikasi budgeting",
        "Melakukan evaluasi dan penyesuaian anggaran"
      ],
      episodes: [
        { 
          id: 1, 
          title: "Prinsip Anggaran 50/30/20", 
          duration: "8:45", 
          description: "Memahami konsep pembagian anggaran yang efektif dan mudah diterapkan",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/ttuVo_t4XNI"
        },
        { 
          id: 2, 
          title: "Melacak Pengeluaran", 
          duration: "7:32", 
          description: "Teknik dan strategi untuk melacak pengeluaran harian secara efektif",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/ttuVo_t4XNI"
        },
        { 
          id: 3, 
          title: "Membuat Anggaran Bulanan", 
          duration: "10:15", 
          description: "Langkah-langkah praktis membuat anggaran bulanan yang realistis",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/ttuVo_t4XNI"
        },
        { 
          id: 4, 
          title: "Tools dan Aplikasi Budgeting", 
          duration: "6:50", 
          description: "Review aplikasi dan tools terbaik untuk mengelola anggaran",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/ttuVo_t4XNI"
        },
        { 
          id: 5, 
          title: "Evaluasi dan Penyesuaian", 
          duration: "8:20", 
          description: "Cara mengevaluasi efektivitas anggaran dan melakukan penyesuaian",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/ttuVo_t4XNI"
        },
        { 
          id: 6, 
          title: "Studi Kasus Anggaran", 
          duration: "6:30", 
          description: "Analisis kasus nyata penerapan anggaran dalam berbagai situasi",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/ttuVo_t4XNI"
        }
      ]
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
      rating: 4.7,
      videoUrl: "https://www.youtube.com/embed/NPGgBjwE3L4",
      instructor: "Dr. Lisa Wong",
      students: 750,
      fullDescription: "Bangun kebiasaan menabung yang konsisten dan kuat. Course ini mengajarkan strategi efektif untuk menabung, membangun dana darurat, dan mencapai tujuan keuangan jangka pendek maupun panjang.",
      whatYouLearn: [
        "Membangun kebiasaan menabung yang konsisten",
        "Menentukan jumlah dana darurat yang ideal",
        "Memilih instrumen tabungan yang tepat",
        "Strategi menabung untuk tujuan spesifik"
      ],
      episodes: [
        { 
          id: 1, 
          title: "Psikologi Menabung", 
          duration: "7:30", 
          description: "Memahami mindset dan psikologi di balik kebiasaan menabung",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/NPGgBjwE3L4"
        },
        { 
          id: 2, 
          title: "Menentukan Target Dana Darurat", 
          duration: "8:15", 
          description: "Cara menghitung dan menentukan jumlah dana darurat yang ideal",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/NPGgBjwE3L4"
        },
        { 
          id: 3, 
          title: "Strategi Menabung Otomatis", 
          duration: "9:45", 
          description: "Implementasi sistem menabung otomatis yang efektif",
          completed: true,
          videoUrl: "https://www.youtube.com/embed/NPGgBjwE3L4"
        },
        { 
          id: 4, 
          title: "Pilihan Instrumen Tabungan", 
          duration: "8:00", 
          description: "Perbandingan berbagai produk tabungan dan deposito",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/NPGgBjwE3L4"
        },
        { 
          id: 5, 
          title: "Menabung untuk Tujuan Spesifik", 
          duration: "6:30", 
          description: "Strategi menabung untuk tujuan jangka pendek dan panjang",
          completed: false,
          videoUrl: "https://www.youtube.com/embed/NPGgBjwE3L4"
        }
      ]
    }
  ];

  useEffect(() => {
    if (id) {
      const foundCourse = courses.find(c => c.id === parseInt(id));
      if (foundCourse) {
        setCourse(foundCourse);
        setSelectedEpisode(foundCourse.episodes?.[0] || null);
      }
    }
  }, [id]);

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

  const handleEpisodeSelect = (episode) => {
    setSelectedEpisode(episode);
  };

  const handleBackToLearning = () => {
    router.push('/dashboard/learning');
  };

  if (isLoading || !user || !course) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <CourseDetailSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{course.title} - SampattiNaya</title>
        <meta name="description" content={course.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={handleBackToLearning}
              className="mb-6 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Learning
            </Button>

            {/* Course Header */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">{course.title}</h1>
              <p className="text-muted-foreground text-lg mb-6">{course.description}</p>
              
              <div className="flex flex-wrap items-center gap-6 text-sm">
                <Badge className={getDifficultyColor(course.difficulty)}>
                  {course.difficulty}
                </Badge>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{course.duration}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                  <span>{course.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{course.students} siswa</span>
                </div>
                <div className="flex items-center gap-1">
                  <Award className="h-4 w-4" />
                  <span>{course.instructor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              {/* Video Player & Description */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Video Player */}
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  {selectedEpisode?.videoUrl ? (
                    <iframe
                      src={selectedEpisode.videoUrl}
                      title={selectedEpisode.title}
                      className="w-full h-full"
                      allowFullScreen
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white">
                      <div className="text-center">
                        <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-50" />
                        <p>Pilih episode untuk memulai</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Current Episode Info */}
                {selectedEpisode && (
                  <Card>
                    <CardContent className="p-6">
                      <h3 className="font-semibold text-xl mb-2">{selectedEpisode.title}</h3>
                      <p className="text-muted-foreground mb-4">{selectedEpisode.description}</p>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4" />
                        <span>{selectedEpisode.duration}</span>
                        {selectedEpisode.completed && (
                          <>
                            <span>•</span>
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-green-600">Selesai</span>
                          </>
                        )}
                        {selectedEpisode.isQuiz && (
                          <>
                            <span>•</span>
                            <Badge variant="outline">Kuis</Badge>
                          </>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                )}

                {/* Course Description */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5" />
                      Tentang Course
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground leading-relaxed mb-6">
                      {course.fullDescription}
                    </p>
                    
                    <div>
                      <h4 className="font-semibold mb-4 flex items-center gap-2">
                        <Target className="h-5 w-5" />
                        Yang Akan Anda Pelajari
                      </h4>
                      <ul className="space-y-3">
                        {course.whatYouLearn?.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Episodes List & Progress */}
              <div className="space-y-6">
                
                {/* Progress */}
                <Card>
                  <CardHeader>
                    <CardTitle>Progress Course</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm">
                        <span>Diselesaikan</span>
                        <span className="font-medium">{course.progress}%</span>
                      </div>
                      <Progress value={course.progress} className="h-3" />
                      <div className="text-sm text-muted-foreground">
                        {course.episodes?.filter(ep => ep.completed).length || 0} dari {course.episodes?.length || 0} episode selesai
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Episodes List */}
                <Card>
                  <CardHeader>
                    <CardTitle>List Episode</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                      {course.episodes?.map((episode, index) => (
                        <div 
                          key={episode.id}
                          onClick={() => handleEpisodeSelect(episode)}
                          className={`p-4 rounded-lg border cursor-pointer transition-all hover:bg-muted/50 ${
                            selectedEpisode?.id === episode.id 
                              ? 'border-primary bg-primary/10 shadow-sm' 
                              : episode.completed 
                              ? 'border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-900/20' 
                              : 'border-muted hover:border-muted-foreground/50'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium flex-shrink-0 ${
                              episode.completed 
                                ? 'bg-green-600 text-white' 
                                : selectedEpisode?.id === episode.id
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                            }`}>
                              {episode.completed ? '✓' : episode.isQuiz ? '?' : index + 1}
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="font-medium line-clamp-1 mb-1">{episode.title}</h4>
                              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                                <Clock className="h-3 w-3" />
                                <span>{episode.duration}</span>
                                {episode.isQuiz && (
                                  <>
                                    <span>•</span>
                                    <span>Kuis</span>
                                  </>
                                )}
                              </div>
                            </div>
                            {selectedEpisode?.id === episode.id && (
                              <PlayCircle className="h-5 w-5 text-primary" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Action Button */}
                <Button 
                  className="w-full h-12 text-base font-semibold"
                  disabled={course.status === 'locked'}
                >
                  {course.status === 'completed' 
                    ? 'Ulangi Course' 
                    : course.status === 'in_progress' 
                    ? 'Lanjutkan Belajar' 
                    : 'Mulai Course'
                  }
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
