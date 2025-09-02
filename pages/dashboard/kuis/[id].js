import Head from 'next/head';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { Brain, Clock, Star, ArrowLeft, ArrowRight, CheckCircle, XCircle, RotateCcw, Trophy } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import DashboardNav from '@/components/common/DashboardNav';
import { QuizDetailSkeleton } from '@/components/common/SkeletonLoading';

export default function QuizDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [quiz, setQuiz] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(600); // 10 menit
  const [showResults, setShowResults] = useState(false);

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
    }, 700);
  }, [router]);

  useEffect(() => {
    if (id && !isLoading) {
      // Find the quiz based on id
      const foundQuiz = quizzes.find(q => q.id === parseInt(id));
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    }
  }, [id, isLoading]);

  const quizzes = [
    {
      id: 1,
      title: "Dasar-dasar Literasi Finansial",
      description: "Tes pemahaman Anda tentang konsep dasar keuangan pribadi",
      difficulty: "Pemula",
      duration: "10 menit",
      totalQuestions: 10,
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: "Apa yang dimaksud dengan literasi finansial?",
          options: [
            "Kemampuan membaca buku tentang keuangan",
            "Kemampuan memahami dan menggunakan berbagai keterampilan keuangan",
            "Kemampuan menghitung bunga bank",
            "Kemampuan berinvestasi di saham"
          ],
          correctAnswer: 1,
          explanation: "Literasi finansial adalah kemampuan memahami dan menggunakan berbagai keterampilan keuangan untuk membuat keputusan keuangan yang efektif."
        },
        {
          id: 2,
          question: "Berapa persen dari pendapatan yang sebaiknya dialokasikan untuk dana darurat?",
          options: [
            "10-15%",
            "20-30%",
            "3-6 bulan pengeluaran",
            "50% dari gaji"
          ],
          correctAnswer: 2,
          explanation: "Dana darurat sebaiknya setara dengan 3-6 bulan pengeluaran rutin untuk menghadapi situasi darurat."
        },
        {
          id: 3,
          question: "Apa prinsip dasar dari aturan 50/30/20?",
          options: [
            "50% tabungan, 30% investasi, 20% pengeluaran",
            "50% kebutuhan, 30% keinginan, 20% tabungan",
            "50% gaji, 30% bonus, 20% tunjangan",
            "50% belanja, 30% makan, 20% transport"
          ],
          correctAnswer: 1,
          explanation: "Aturan 50/30/20 mengalokasikan 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan dan investasi."
        },
        {
          id: 4,
          question: "Manakah yang termasuk dalam pengeluaran tetap (fixed expenses)?",
          options: [
            "Biaya makan di restoran",
            "Sewa rumah atau cicilan KPR",
            "Belanja pakaian",
            "Biaya hiburan"
          ],
          correctAnswer: 1,
          explanation: "Pengeluaran tetap adalah biaya yang jumlahnya sama setiap bulan, seperti sewa rumah, cicilan KPR, atau asuransi."
        },
        {
          id: 5,
          question: "Apa yang dimaksud dengan bunga majemuk (compound interest)?",
          options: [
            "Bunga yang dihitung hanya dari pokok",
            "Bunga yang dihitung dari pokok plus bunga sebelumnya",
            "Bunga yang berubah setiap hari",
            "Bunga yang hanya berlaku untuk deposito"
          ],
          correctAnswer: 1,
          explanation: "Bunga majemuk adalah bunga yang dihitung dari jumlah pokok ditambah bunga yang telah diperoleh sebelumnya."
        },
        {
          id: 6,
          question: "Kapan waktu yang tepat untuk mulai berinvestasi?",
          options: [
            "Setelah usia 40 tahun",
            "Setelah memiliki rumah",
            "Sesegera mungkin setelah memiliki dana darurat",
            "Setelah pensiun"
          ],
          correctAnswer: 2,
          explanation: "Waktu terbaik untuk mulai berinvestasi adalah sesegera mungkin setelah memiliki dana darurat, karena waktu adalah faktor penting dalam investasi."
        },
        {
          id: 7,
          question: "Apa yang dimaksud dengan inflasi?",
          options: [
            "Penurunan harga barang secara umum",
            "Kenaikan harga barang dan jasa secara umum",
            "Fluktuasi nilai tukar rupiah",
            "Perubahan suku bunga bank"
          ],
          correctAnswer: 1,
          explanation: "Inflasi adalah kenaikan harga barang dan jasa secara umum dalam periode tertentu, yang mengurangi daya beli uang."
        },
        {
          id: 8,
          question: "Manakah yang merupakan investasi dengan risiko rendah?",
          options: [
            "Saham individu",
            "Cryptocurrency",
            "Deposito bank",
            "Forex trading"
          ],
          correctAnswer: 2,
          explanation: "Deposito bank merupakan investasi dengan risiko rendah karena dijamin oleh LPS (Lembaga Penjamin Simpanan)."
        },
        {
          id: 9,
          question: "Apa fungsi utama dari asuransi?",
          options: [
            "Untuk mendapat keuntungan investasi",
            "Untuk melindungi dari risiko finansial",
            "Untuk menghindari pajak",
            "Untuk mendapat diskon belanja"
          ],
          correctAnswer: 1,
          explanation: "Fungsi utama asuransi adalah melindungi dari risiko finansial yang tidak terduga, seperti sakit, kecelakaan, atau kehilangan."
        },
        {
          id: 10,
          question: "Mengapa penting memiliki tujuan keuangan yang jelas?",
          options: [
            "Agar terlihat kaya di mata orang lain",
            "Untuk membantu fokus dan mengukur progres keuangan",
            "Untuk bisa meminjam uang lebih banyak",
            "Untuk menghindari membayar pajak"
          ],
          correctAnswer: 1,
          explanation: "Tujuan keuangan yang jelas membantu kita fokus dalam mengelola uang dan mengukur progres pencapaian target finansial."
        }
      ]
    },
    {
      id: 2,
      title: "Pengelolaan Anggaran",
      description: "Uji kemampuan Anda dalam merencanakan dan mengelola anggaran",
      difficulty: "Menengah",
      duration: "15 menit",
      totalQuestions: 10,
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: "Langkah pertama dalam membuat anggaran adalah?",
          options: [
            "Menentukan target tabungan",
            "Mencatat semua pendapatan dan pengeluaran",
            "Membeli aplikasi budgeting",
            "Konsultasi dengan financial planner"
          ],
          correctAnswer: 1,
          explanation: "Langkah pertama adalah mencatat semua pendapatan dan pengeluaran untuk mengetahui kondisi keuangan saat ini."
        },
        {
          id: 2,
          question: "Dalam metode envelope budgeting, uang untuk setiap kategori pengeluaran:",
          options: [
            "Dicampur dalam satu rekening",
            "Dipisahkan secara fisik atau virtual",
            "Diinvestasikan terlebih dahulu",
            "Disimpan dalam bentuk emas"
          ],
          correctAnswer: 1,
          explanation: "Metode envelope budgeting memisahkan uang untuk setiap kategori pengeluaran agar tidak tercampur dan lebih terkontrol."
        },
        {
          id: 3,
          question: "Apa yang sebaiknya dilakukan jika pengeluaran melebihi anggaran?",
          options: [
            "Mengabaikannya dan berharap bulan depan lebih baik",
            "Meminjam uang untuk menutupi kekurangan",
            "Mengevaluasi dan menyesuaikan anggaran",
            "Berhenti membuat anggaran"
          ],
          correctAnswer: 2,
          explanation: "Jika pengeluaran melebihi anggaran, sebaiknya evaluasi penyebabnya dan sesuaikan anggaran untuk periode berikutnya."
        },
        {
          id: 4,
          question: "Berapa sering sebaiknya anggaran direview dan disesuaikan?",
          options: [
            "Setiap hari",
            "Setiap bulan",
            "Setiap tahun",
            "Tidak perlu direview"
          ],
          correctAnswer: 1,
          explanation: "Anggaran sebaiknya direview setiap bulan untuk memastikan masih relevan dan dapat disesuaikan jika diperlukan."
        },
        {
          id: 5,
          question: "Apa keuntungan menggunakan aplikasi budgeting?",
          options: [
            "Otomatis membuat kita kaya",
            "Memudahkan tracking pengeluaran secara real-time",
            "Menghilangkan kebutuhan untuk disiplin",
            "Menjamin tidak akan pernah boros"
          ],
          correctAnswer: 1,
          explanation: "Aplikasi budgeting memudahkan tracking pengeluaran secara real-time dan memberikan insight tentang pola pengeluaran."
        },
        {
          id: 6,
          question: "Dalam anggaran, pos 'sinking fund' digunakan untuk:",
          options: [
            "Dana darurat",
            "Pengeluaran tak terduga yang besar",
            "Investasi saham",
            "Biaya hiburan"
          ],
          correctAnswer: 1,
          explanation: "Sinking fund adalah dana yang disisihkan untuk pengeluaran besar yang sudah direncanakan, seperti liburan atau renovasi rumah."
        },
        {
          id: 7,
          question: "Bagaimana cara mengatasi 'budget creep' (anggaran yang terus membengkak)?",
          options: [
            "Mengabaikannya",
            "Menaikkan target pendapatan",
            "Review dan potong pengeluaran yang tidak perlu",
            "Berhenti membuat anggaran"
          ],
          correctAnswer: 2,
          explanation: "Budget creep diatasi dengan review berkala dan memotong pengeluaran yang tidak esensial untuk kembali ke target anggaran."
        },
        {
          id: 8,
          question: "Apa itu 'pay yourself first' dalam konteks budgeting?",
          options: [
            "Membayar gaji sendiri terlebih dahulu",
            "Menyisihkan uang untuk tabungan sebelum pengeluaran lain",
            "Membeli yang diinginkan sebelum yang dibutuhkan",
            "Melunasi utang terakhir"
          ],
          correctAnswer: 1,
          explanation: "'Pay yourself first' berarti menyisihkan uang untuk tabungan dan investasi sebelum mengalokasikan untuk pengeluaran lain."
        },
        {
          id: 9,
          question: "Mengapa penting memisahkan rekening untuk kategori anggaran yang berbeda?",
          options: [
            "Agar terlihat memiliki banyak rekening",
            "Untuk mendapat bunga lebih banyak",
            "Memudahkan kontrol dan tracking pengeluaran",
            "Menghindari pajak"
          ],
          correctAnswer: 2,
          explanation: "Memisahkan rekening memudahkan kontrol dan tracking pengeluaran untuk setiap kategori anggaran."
        },
        {
          id: 10,
          question: "Apa yang sebaiknya dilakukan dengan uang 'sisa' di akhir bulan?",
          options: [
            "Dihabiskan untuk belanja",
            "Ditambahkan ke dana darurat atau investasi",
            "Disimpan dalam bentuk cash",
            "Dipinjamkan ke teman"
          ],
          correctAnswer: 1,
          explanation: "Uang sisa sebaiknya ditambahkan ke dana darurat atau dialokasikan untuk investasi untuk memaksimalkan pertumbuhan keuangan."
        }
      ]
    },
    {
      id: 3,
      title: "Investasi untuk Pemula",
      description: "Tes pengetahuan Anda tentang dasar-dasar investasi",
      difficulty: "Menengah",
      duration: "15 menit",
      totalQuestions: 10,
      passingScore: 70,
      questions: [
        {
          id: 1,
          question: "Apa prinsip utama dari diversifikasi dalam investasi?",
          options: [
            "Menempatkan semua uang di satu investasi terbaik",
            "Menyebar investasi di berbagai instrumen untuk mengurangi risiko",
            "Hanya berinvestasi di saham blue chip",
            "Menunggu waktu yang sempurna untuk berinvestasi"
          ],
          correctAnswer: 1,
          explanation: "Diversifikasi adalah strategi menyebar investasi di berbagai instrumen untuk mengurangi risiko dan mengoptimalkan return."
        },
        {
          id: 2,
          question: "Apa yang dimaksud dengan 'risk tolerance' dalam investasi?",
          options: [
            "Jumlah maksimum uang yang bisa diinvestasikan",
            "Kemampuan dan kemauan seseorang menghadapi risiko investasi",
            "Waktu yang dibutuhkan untuk mendapat keuntungan",
            "Biaya yang harus dibayar untuk berinvestasi"
          ],
          correctAnswer: 1,
          explanation: "Risk tolerance adalah kemampuan dan kemauan seseorang dalam menghadapi fluktuasi nilai investasi."
        },
        {
          id: 3,
          question: "Manakah yang merupakan investasi jangka panjang yang paling cocok untuk pemula?",
          options: [
            "Day trading saham",
            "Reksa dana indeks",
            "Forex trading",
            "Cryptocurrency"
          ],
          correctAnswer: 1,
          explanation: "Reksa dana indeks cocok untuk pemula karena sudah terdiversifikasi, dikelola profesional, dan cocok untuk investasi jangka panjang."
        },
        {
          id: 4,
          question: "Apa itu 'Dollar Cost Averaging' (DCA)?",
          options: [
            "Membeli investasi sekaligus dengan jumlah besar",
            "Investasi rutin dengan jumlah tetap secara berkala",
            "Menjual investasi saat harga tinggi",
            "Menukar mata uang dollar ke rupiah"
          ],
          correctAnswer: 1,
          explanation: "Dollar Cost Averaging adalah strategi investasi rutin dengan nominal tetap secara berkala, terlepas dari kondisi pasar."
        },
        {
          id: 5,
          question: "Mengapa inflasi penting dipertimbangkan dalam investasi?",
          options: [
            "Inflasi tidak mempengaruhi investasi",
            "Inflasi mengurangi daya beli uang dari waktu ke waktu",
            "Inflasi selalu menguntungkan investor",
            "Inflasi hanya mempengaruhi tabungan, bukan investasi"
          ],
          correctAnswer: 1,
          explanation: "Inflasi mengurangi daya beli uang, sehingga return investasi harus bisa mengalahkan tingkat inflasi untuk pertumbuhan riil."
        },
        {
          id: 6,
          question: "Apa yang sebaiknya dilakukan saat pasar saham mengalami koreksi (turun)?",
          options: [
            "Panik dan menjual semua investasi",
            "Tetap tenang dan stick to plan jangka panjang",
            "Meminjam uang untuk membeli lebih banyak",
            "Berhenti berinvestasi selamanya"
          ],
          correctAnswer: 1,
          explanation: "Saat koreksi pasar, investor jangka panjang sebaiknya tetap tenang dan konsisten dengan rencana investasi."
        },
        {
          id: 7,
          question: "Apa keuntungan utama investasi reksa dana dibanding saham individual?",
          options: [
            "Return yang lebih tinggi dijamin",
            "Tidak ada risiko sama sekali",
            "Diversifikasi instant dan dikelola profesional",
            "Bisa ditarik kapan saja tanpa biaya"
          ],
          correctAnswer: 2,
          explanation: "Reksa dana memberikan diversifikasi instant dan dikelola oleh manajer investasi profesional."
        },
        {
          id: 8,
          question: "Berapa persentase dari portofolio yang sebaiknya dialokasikan untuk investasi berisiko tinggi bagi investor muda?",
          options: [
            "0% - terlalu berisiko",
            "20-30%",
            "50-70%",
            "100% - masih muda"
          ],
          correctAnswer: 2,
          explanation: "Investor muda dengan horizon investasi panjang bisa mengalokasikan 50-70% untuk investasi berisiko tinggi seperti saham."
        },
        {
          id: 9,
          question: "Apa yang dimaksud dengan 'emergency fund' sebelum mulai berinvestasi?",
          options: [
            "Dana untuk membeli saham saat crash",
            "Dana cadangan 3-6 bulan pengeluaran untuk situasi darurat",
            "Dana untuk biaya broker dan fees",
            "Dana untuk diversifikasi investasi"
          ],
          correctAnswer: 1,
          explanation: "Emergency fund adalah dana cadangan 3-6 bulan pengeluaran yang harus dimiliki sebelum mulai berinvestasi."
        },
        {
          id: 10,
          question: "Mengapa 'time in the market' lebih penting daripada 'timing the market'?",
          options: [
            "Karena pasar selalu naik",
            "Karena compound interest bekerja optimal dalam jangka panjang",
            "Karena tidak perlu riset",
            "Karena lebih mudah dilakukan"
          ],
          correctAnswer: 1,
          explanation: "Time in the market memungkinkan compound interest bekerja optimal, sedangkan timing the market sangat sulit dan berisiko."
        }
      ]
    }
  ];

  useEffect(() => {
    if (id) {
      const foundQuiz = quizzes.find(q => q.id === parseInt(id));
      if (foundQuiz) {
        setQuiz(foundQuiz);
      }
    }
  }, [id]);

  // Timer countdown
  useEffect(() => {
    let timer;
    if (quizStarted && !quizCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimeUp();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizStarted, quizCompleted, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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

  const handleStartQuiz = () => {
    setQuizStarted(true);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setTimeLeft(quiz.duration === "10 menit" ? 600 : 900);
  };

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quiz.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(prev => prev - 1);
    }
  };

  const handleFinishQuiz = () => {
    calculateScore();
    setQuizCompleted(true);
    setShowResults(true);
  };

  const handleTimeUp = () => {
    calculateScore();
    setQuizCompleted(true);
    setShowResults(true);
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const calculatedScore = Math.round((correctAnswers / quiz.questions.length) * 100);
    setScore(calculatedScore);
  };

  const handleRestartQuiz = () => {
    setQuizStarted(false);
    setCurrentQuestion(0);
    setSelectedAnswers({});
    setQuizCompleted(false);
    setShowResults(false);
    setScore(0);
  };

  const handleBackToQuiz = () => {
    router.push('/dashboard/kuis');
  };

  if (isLoading || !user || !quiz) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardNav />
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6">
            <QuizDetailSkeleton />
          </div>
        </main>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{quiz.title} - SampattiNaya</title>
        <meta name="description" content={quiz.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className="min-h-screen bg-background">
        <DashboardNav />
        
        <main className="md:ml-64 pt-16 pb-20 md:pb-8">
          <div className="container mx-auto px-4 py-6 max-w-4xl">
            
            {/* Back Button */}
            <Button 
              variant="ghost" 
              onClick={handleBackToQuiz}
              className="mb-6 flex items-center gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Kembali ke Kuis
            </Button>

            {!quizStarted && !showResults && (
              // Quiz Introduction
              <Card>
                <CardHeader className="text-center">
                  <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Brain className="h-8 w-8 text-primary" />
                  </div>
                  <CardTitle className="text-2xl mb-2">{quiz.title}</CardTitle>
                  <p className="text-muted-foreground">{quiz.description}</p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Durasi</div>
                      <div className="text-xs text-muted-foreground">{quiz.duration}</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Brain className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Soal</div>
                      <div className="text-xs text-muted-foreground">{quiz.totalQuestions} pertanyaan</div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg">
                      <Star className="h-6 w-6 mx-auto mb-2 text-primary" />
                      <div className="text-sm font-medium">Passing Score</div>
                      <div className="text-xs text-muted-foreground">{quiz.passingScore}%</div>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <Badge className={getDifficultyColor(quiz.difficulty)}>
                      {quiz.difficulty}
                    </Badge>
                  </div>

                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">Petunjuk:</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Pilih satu jawaban untuk setiap pertanyaan</li>
                      <li>• Anda dapat kembali ke pertanyaan sebelumnya</li>
                      <li>• Kuis akan otomatis berakhir saat waktu habis</li>
                      <li>• Skor minimum untuk lulus adalah {quiz.passingScore}%</li>
                    </ul>
                  </div>

                  <Button 
                    onClick={handleStartQuiz}
                    className="w-full h-12 text-base font-semibold"
                  >
                    Mulai Kuis
                  </Button>
                </CardContent>
              </Card>
            )}

            {quizStarted && !showResults && (
              // Quiz Interface
              <div className="space-y-6">
                {/* Header */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <Badge variant="outline">
                          Soal {currentQuestion + 1} dari {quiz.questions.length}
                        </Badge>
                        <div className="text-sm text-muted-foreground">
                          {Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}% selesai
                        </div>
                      </div>
                      <div className={`flex items-center gap-2 ${timeLeft <= 60 ? 'text-red-600' : 'text-muted-foreground'}`}>
                        <Clock className="h-4 w-4" />
                        <span className="font-mono font-medium">{formatTime(timeLeft)}</span>
                      </div>
                    </div>
                    <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="mt-3" />
                  </CardContent>
                </Card>

                {/* Question */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-xl">
                      {quiz.questions[currentQuestion]?.question}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {quiz.questions[currentQuestion]?.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(currentQuestion, index)}
                        className={`w-full p-4 text-left rounded-lg border transition-all hover:bg-muted/50 ${
                          selectedAnswers[currentQuestion] === index
                            ? 'border-primary bg-primary/10'
                            : 'border-muted'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                            selectedAnswers[currentQuestion] === index
                              ? 'border-primary bg-primary text-primary-foreground'
                              : 'border-muted-foreground'
                          }`}>
                            {selectedAnswers[currentQuestion] === index && (
                              <div className="w-2 h-2 bg-primary-foreground rounded-full" />
                            )}
                          </div>
                          <span>{option}</span>
                        </div>
                      </button>
                    ))}
                  </CardContent>
                </Card>

                {/* Navigation */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex justify-between">
                      <Button 
                        variant="outline"
                        onClick={handlePrevQuestion}
                        disabled={currentQuestion === 0}
                      >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Sebelumnya
                      </Button>
                      
                      {currentQuestion === quiz.questions.length - 1 ? (
                        <Button 
                          onClick={handleFinishQuiz}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          Selesai Kuis
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleNextQuestion}
                          disabled={selectedAnswers[currentQuestion] === undefined}
                        >
                          Selanjutnya
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {showResults && (
              // Results Page
              <Card>
                <CardHeader className="text-center">
                  <div className={`mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
                    score >= quiz.passingScore ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                  }`}>
                    {score >= quiz.passingScore ? (
                      <Trophy className="h-8 w-8" />
                    ) : (
                      <XCircle className="h-8 w-8" />
                    )}
                  </div>
                  <CardTitle className="text-2xl mb-2">
                    {score >= quiz.passingScore ? 'Selamat!' : 'Coba Lagi!'}
                  </CardTitle>
                  <p className="text-muted-foreground">
                    {score >= quiz.passingScore 
                      ? 'Anda telah menyelesaikan kuis dengan baik'
                      : 'Jangan menyerah, terus belajar dan coba lagi'
                    }
                  </p>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  <div className="text-center">
                    <div className="text-4xl font-bold mb-2">{score}%</div>
                    <div className="text-sm text-muted-foreground">
                      {quiz.questions.filter((_, index) => selectedAnswers[index] === quiz.questions[index].correctAnswer).length} dari {quiz.questions.length} jawaban benar
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-lg font-semibold">Waktu Pengerjaan</div>
                      <div className="text-sm text-muted-foreground">
                        {formatTime((quiz.duration === "10 menit" ? 600 : 900) - timeLeft)}
                      </div>
                    </div>
                    <div className="p-4 bg-muted/30 rounded-lg text-center">
                      <div className="text-lg font-semibold">Status</div>
                      <div className={`text-sm font-medium ${
                        score >= quiz.passingScore ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {score >= quiz.passingScore ? 'LULUS' : 'TIDAK LULUS'}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      variant="outline"
                      onClick={handleBackToQuiz}
                      className="flex-1"
                    >
                      Kembali ke Daftar Kuis
                    </Button>
                    <Button 
                      onClick={handleRestartQuiz}
                      className="flex-1"
                    >
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Ulangi Kuis
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </>
  );
}
