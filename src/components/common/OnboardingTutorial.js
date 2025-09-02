import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Play, Users, BookOpen, Calculator, MessageCircle, Trophy, Target, TrendingUp, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const OnboardingTutorial = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  // Add highlighting effect to target elements
  useEffect(() => {
    const currentTarget = tutorialSteps[currentStep]?.target;
    
    // Remove previous highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => {
      el.classList.remove('tutorial-highlight');
      el.style.removeProperty('position');
      el.style.removeProperty('z-index');
      el.style.removeProperty('box-shadow');
      el.style.removeProperty('border-radius');
      el.style.removeProperty('transition');
    });

    // Add highlight to current target
    if (currentTarget) {
      const targetElement = document.querySelector(currentTarget);
      if (targetElement) {
        targetElement.classList.add('tutorial-highlight');
        targetElement.style.position = 'relative';
        targetElement.style.zIndex = '45';
        targetElement.style.boxShadow = '0 0 0 4px rgba(var(--primary-rgb, 59 130 246), 0.3), 0 0 0 8px rgba(var(--primary-rgb, 59 130 246), 0.1)';
        targetElement.style.borderRadius = '12px';
        targetElement.style.transition = 'all 0.3s ease-in-out';
      }
    }

    // Cleanup function
    return () => {
      document.querySelectorAll('.tutorial-highlight').forEach(el => {
        el.classList.remove('tutorial-highlight');
        el.style.removeProperty('position');
        el.style.removeProperty('z-index');
        el.style.removeProperty('box-shadow');
        el.style.removeProperty('border-radius');
        el.style.removeProperty('transition');
      });
    };
  }, [currentStep]);

  const tutorialSteps = [
    {
      id: 'welcome',
      title: 'Selamat Datang di SampattiNaya',
      description: 'Mari kami tunjukkan fitur-fitur yang dapat membantu Anda mengelola keuangan dengan lebih baik.',
      content: (
        <div className="space-y-4 md:space-y-6">
          <div className="text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4">
              <Target className="h-6 w-6 md:h-8 md:w-8 text-primary" />
            </div>
            <h3 className="text-lg md:text-xl font-bold mb-2">Platform Literasi Finansial</h3>
            <p className="text-sm md:text-base text-muted-foreground">
              SampattiNaya menyediakan tools lengkap untuk pembelajaran keuangan
            </p>
          </div>
          <div className="grid grid-cols-1 gap-2 md:gap-3">
            <div className="flex items-center gap-3 p-3 md:p-4 border rounded-lg">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-50 dark:bg-blue-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <BookOpen className="h-4 w-4 md:h-5 md:w-5 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">Modul Pembelajaran</p>
                <p className="text-xs md:text-sm text-muted-foreground">Belajar dari dasar hingga mahir</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 md:p-4 border rounded-lg">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-green-50 dark:bg-green-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Calculator className="h-4 w-4 md:h-5 md:w-5 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">Simulasi Budget</p>
                <p className="text-xs md:text-sm text-muted-foreground">Rencanakan keuangan dengan smart tools</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 md:p-4 border rounded-lg">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-50 dark:bg-purple-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <Trophy className="h-4 w-4 md:h-5 md:w-5 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">Kuis Interaktif</p>
                <p className="text-xs md:text-sm text-muted-foreground">Uji pemahaman dengan soal-soal praktis</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 md:p-4 border rounded-lg">
              <div className="w-8 h-8 md:w-10 md:h-10 bg-orange-50 dark:bg-orange-900/20 rounded-lg flex items-center justify-center flex-shrink-0">
                <MessageCircle className="h-4 w-4 md:h-5 md:w-5 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-sm md:text-base">AI Assistant</p>
                <p className="text-xs md:text-sm text-muted-foreground">Konsultasi keuangan dengan AI</p>
              </div>
            </div>
          </div>
        </div>
      ),
      target: null,
      position: 'center'
    },
    {
      id: 'navigation',
      title: 'Navigasi Dashboard',
      description: 'Gunakan sidebar kiri untuk mengakses semua fitur SampattiNaya dengan mudah.',
      content: (
        <div className="space-y-4">
          <div className="text-center mb-4">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Target className="h-6 w-6 text-primary" />
            </div>
            <p className="text-sm text-muted-foreground">
              Menu utama untuk navigasi ke berbagai fitur
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg bg-blue-50/50 dark:bg-blue-900/10">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center">
                <BookOpen className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Learning</p>
                <p className="text-xs text-muted-foreground">Modul pembelajaran terstruktur</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center">
                <Trophy className="h-4 w-4 text-purple-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Kuis</p>
                <p className="text-xs text-muted-foreground">Uji pemahaman dengan soal</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center">
                <Calculator className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-medium text-sm">Simulasi</p>
                <p className="text-xs text-muted-foreground">Tools perencanaan keuangan</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-8 h-8 bg-orange-100 dark:bg-orange-900/30 rounded-lg flex items-center justify-center">
                <MessageCircle className="h-4 w-4 text-orange-600" />
              </div>
              <div>
                <p className="font-medium text-sm">AI Chat</p>
                <p className="text-xs text-muted-foreground">Konsultasi dengan AI assistant</p>
              </div>
            </div>
          </div>
        </div>
      ),
      target: '.dashboard-nav',
      position: 'right'
    },
    {
      id: 'learning-feature',
      title: 'Fitur Pembelajaran',
      description: 'Akses modul pembelajaran terstruktur dari dasar hingga lanjutan dengan progress tracking.',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
            <h4 className="font-semibold">Pembelajaran Terstruktur</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Kurikulum lengkap dari dasar hingga mahir
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">Pemula</Badge>
              <span className="text-sm">Literasi Finansial Dasar</span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">Menengah</Badge>
              <span className="text-sm">Pengelolaan Budget</span>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">Lanjutan</Badge>
              <span className="text-sm">Investasi & Portfolio</span>
            </div>
          </div>
          <div className="bg-primary/5 p-3 rounded-lg border">
            <p className="text-sm">
              <strong>Rekomendasi:</strong> Mulai dari level pemula dan ikuti urutan modul secara berurutan untuk hasil pembelajaran yang optimal.
            </p>
          </div>
        </div>
      ),
      target: '.quick-actions',
      position: 'top'
    },
    {
      id: 'simulation-feature',
      title: 'Simulasi Budget',
      description: 'Gunakan kalkulator cerdas untuk merencanakan budget bulanan berdasarkan aturan 50/30/20.',
      content: (
        <div className="space-y-4">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-50 dark:bg-green-900/20 rounded-xl flex items-center justify-center mx-auto mb-3">
              <Calculator className="h-6 w-6 text-green-600" />
            </div>
            <h4 className="font-semibold">Kalkulator Budget 50/30/20</h4>
            <p className="text-sm text-muted-foreground mt-1">
              Rencanakan keuangan dengan aturan yang terbukti efektif
            </p>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-4 h-4 bg-blue-600 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm">50% Kebutuhan Pokok</p>
                <p className="text-xs text-muted-foreground">Sewa, makanan, transportasi, listrik</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-4 h-4 bg-purple-600 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm">30% Keinginan</p>
                <p className="text-xs text-muted-foreground">Hiburan, makan luar, hobi, shopping</p>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 border rounded-lg">
              <div className="w-4 h-4 bg-green-600 rounded-full flex-shrink-0"></div>
              <div>
                <p className="font-medium text-sm">20% Tabungan</p>
                <p className="text-xs text-muted-foreground">Dana darurat, investasi, tabungan goals</p>
              </div>
            </div>
          </div>
        </div>
      ),
      target: '.quick-actions',
      position: 'top'
    },
    {
      id: 'get-started',
      title: 'Siap Memulai',
      description: 'Anda sudah siap menggunakan SampattiNaya. Mari mulai perjalanan literasi finansial Anda!',
      content: (
        <div className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Play className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-bold mb-2">Tutorial Selesai</h3>
            <p className="text-muted-foreground">
              Anda sudah mengenal semua fitur utama SampattiNaya
            </p>
          </div>
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 p-4 rounded-lg border">
            <div className="space-y-3">
              <p className="font-medium text-center">Tips untuk Memulai:</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Mulai dengan modul pembelajaran dasar untuk membangun fondasi yang kuat</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Gunakan simulasi budget untuk merencanakan keuangan bulanan Anda</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Ikuti kuis secara berkala untuk mengukur progress pembelajaran</p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                  <p>Manfaatkan AI assistant untuk mendapat saran keuangan personal</p>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Konsistensi adalah kunci sukses dalam literasi finansial
            </p>
          </div>
        </div>
      ),
      target: null,
      position: 'center'
    }
  ];

  const currentStepData = tutorialSteps[currentStep];
  const isLastStep = currentStep === tutorialSteps.length - 1;
  const isFirstStep = currentStep === 0;

  const handleNext = () => {
    if (isLastStep) {
      handleComplete();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleComplete = () => {
    setIsVisible(false);
    // Mark tutorial as completed in localStorage
    localStorage.setItem('sampattinaya_tutorial_completed', 'true');
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  const getModalPosition = () => {
    const baseClasses = "fixed z-50 bg-white dark:bg-gray-900 border shadow-2xl rounded-2xl";
    const mobileClasses = "w-[calc(100vw-2rem)] max-w-sm    ";
    const desktopClasses = "max-w-md";
    
    switch (currentStepData.position) {
      case 'center':
        return `${baseClasses} ${mobileClasses} md:${desktopClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
      case 'top':
        return `${baseClasses} ${mobileClasses} md:${desktopClasses} top-20 md:top-24 left-1/2 transform -translate-x-1/2`;
      case 'bottom':
        // For mobile, place higher to avoid collision with stats cards
        return `${baseClasses} ${mobileClasses} md:${desktopClasses} bottom-32 md:bottom-24 left-1/2 transform -translate-x-1/2`;
      case 'left':
        // For mobile, center it instead of left positioning
        return `${baseClasses} ${mobileClasses} md:${desktopClasses} top-1/2 left-1/2 md:left-4 transform -translate-x-1/2 -translate-y-1/2 md:-translate-x-0`;
      case 'right':
        // For mobile, center it instead of right positioning  
        return `${baseClasses} ${mobileClasses} md:${desktopClasses} top-1/2 left-1/2 md:left-auto md:right-4 lg:right-8 transform -translate-x-1/2 -translate-y-1/2 md:-translate-x-0`;
      default:
        return `${baseClasses} ${mobileClasses} md:${desktopClasses} top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`;
    }
  };

  const getArrowClasses = () => {
    const arrowBase = "absolute w-3 h-3 bg-white dark:bg-gray-900 border transform rotate-45";
    
    switch (currentStepData.position) {
      case 'top':
        return `${arrowBase} -bottom-1.5 left-1/2 -translate-x-1/2 border-r-0 border-b-0`;
      case 'bottom':
        return `${arrowBase} -top-1.5 left-1/2 -translate-x-1/2 border-l-0 border-t-0`;
      case 'left':
        // Hide arrow on mobile since modal is centered, show only on desktop
        return `${arrowBase} -right-1.5 top-1/2 -translate-y-1/2 border-l-0 border-b-0 hidden md:block`;
      case 'right':
        // Hide arrow on mobile since modal is centered, show only on desktop
        return `${arrowBase} -left-1.5 top-1/2 -translate-y-1/2 border-r-0 border-t-0 hidden md:block`;
      default:
        return '';
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* Tutorial Modal */}
      <div className={getModalPosition()}>
        {/* Arrow pointer */}
        {currentStepData.target && (
          <div className={getArrowClasses()}></div>
        )}
        <Card className="border-0 shadow-2xl relative">
          <CardContent className="p-4 md:p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {currentStep + 1} of {tutorialSteps.length}
                </Badge>
                <div className="flex gap-1">
                  {tutorialSteps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                        index <= currentStep ? 'bg-primary' : 'bg-gray-200'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Content */}
            <div className="space-y-3 md:space-y-4">
              <div>
                <h2 className="text-base md:text-lg font-bold mb-1.5 md:mb-2">{currentStepData.title}</h2>
                <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
                  {currentStepData.description}
                </p>
              </div>
              
              <div>{currentStepData.content}</div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-4 md:mt-6 pt-3 md:pt-4 border-t">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={isFirstStep}
                className="flex items-center gap-1.5 text-xs md:text-sm"
              >
                <ChevronLeft className="h-3 w-3 md:h-4 md:w-4" />
                <span className="hidden sm:inline">Sebelumnya</span>
                <span className="sm:hidden">Back</span>
              </Button>

              <div className="flex gap-2">
                {!isLastStep && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleSkip}
                    className="text-muted-foreground text-xs md:text-sm"
                  >
                    Lewati
                  </Button>
                )}
                <Button 
                  onClick={handleNext} 
                  size="sm"
                  className="flex items-center gap-1.5 text-xs md:text-sm"
                >
                  {isLastStep ? (
                    <>
                      <Play className="h-3 w-3 md:h-4 md:w-4" />
                      <span className="hidden sm:inline">Mulai Sekarang</span>
                      <span className="sm:hidden">Mulai</span>
                    </>
                  ) : (
                    <>
                      <span className="hidden sm:inline">Selanjutnya</span>
                      <span className="sm:hidden">Next</span>
                      <ChevronRight className="h-3 w-3 md:h-4 md:w-4" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OnboardingTutorial;
