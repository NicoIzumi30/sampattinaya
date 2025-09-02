import React, { useState, useEffect, memo } from 'react';
import { BookOpen, Brain, Calculator, Target, Trophy, Shield, HelpCircle } from 'lucide-react';
import OptimizedImage from '@/components/common/OptimizedImage';
import LazyLoad from '@/components/common/LazyLoad';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Features = memo(({ language = 'id' }) => {
  const { targetRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px'
  });

  // Content for different languages
  const content = {
    id: {
      title: 'Fitur Lengkap SampattiNaya',
      subtitle: 'Platform all-in-one untuk menguasai literasi finansial',
      description: 'Dibangun dengan teknologi modern dan AI untuk memberikan pengalaman belajar yang personal dan efektif.',
      features: [
        {
          title: 'Pembelajaran Interaktif',
          description: 'Modul pembelajaran dengan simulasi real-time dan progress tracking otomatis.',
          image: '/images/learning.jpg',
          alt: 'Screenshot modul pembelajaran interaktif SampattiNaya',
          icon: BookOpen,
          size: 'large'
        },
        {
          title: 'AI Financial Mentor',
          description: 'Asisten pintar yang memberikan rekomendasi finansial berdasarkan profil dan tujuan Anda.',
          image: '/images/ai.jpg',
          alt: 'Screenshot AI Financial Mentor memberikan rekomendasi',
          icon: Brain,
          size: 'medium'
        },
        {
          title: 'Simulasi Budget',
          description: 'Simulasi strategi keuangan tanpa risiko untuk melatih pengambilan keputusan.',
          image: '/images/simulasi.png',
          alt: 'Screenshot simulasi budget dan analisis keuangan',
          icon: Calculator,
          size: 'medium'
        },
        {
          title: 'Kuis Finansial',
          description: 'Uji pemahaman dengan kuis interaktif dan dapatkan skor untuk mengukur progress.',
          image: '/images/ai.jpg',
          alt: 'Screenshot kuis finansial interaktif',
          icon: HelpCircle,
          size: 'small'
        },
        {
          title: 'Papan Peringkat',
          description: 'Kompetisi sehat dengan ranking dan sistem achievement untuk memotivasi belajar.',
          image: '/images/leaderboard.png',
          alt: 'Screenshot papan peringkat dan achievement system',
          icon: Trophy,
          size: 'small'
        }
      ]
    },
    en: {
      title: 'Complete SampattiNaya Features',
      subtitle: 'All-in-one platform to master financial literacy',
      description: 'Built with modern technology and AI to provide personalized and effective learning experience.',
      features: [
        {
          title: 'Interactive Learning',
          description: 'Learning modules with real-time simulation and automatic progress tracking.',
          image: '/images/learning.jpg',
          alt: 'Screenshot of interactive learning modules',
          icon: BookOpen,
          size: 'large'
        },
        {
          title: 'AI Financial Mentor',
          description: 'Smart assistant providing financial recommendations based on your profile and goals.',
          image: '/images/ai.jpg',
          alt: 'Screenshot of AI Financial Mentor recommendations',
          icon: Brain,
          size: 'medium'
        },
        {
          title: 'Budget Simulator',
          description: 'Risk-free financial strategy simulation for decision making practice.',
          image: '/images/simulasi.png',
          alt: 'Screenshot of budget simulation and analysis',
          icon: Calculator,
          size: 'medium'
        },
        {
          title: 'Financial Quiz',
          description: 'Test your understanding with interactive quizzes and get scores to measure progress.',
          image: '/images/ai.jpg',
          alt: 'Screenshot of interactive financial quiz',
          icon: HelpCircle,
          size: 'small'
        },
        {
          title: 'Leaderboard',
          description: 'Healthy competition with ranking and achievement system to motivate learning.',
          image: '/images/leaderboard.png',
          alt: 'Screenshot of leaderboard and achievement system',
          icon: Trophy,
          size: 'small'
        }
      ]
    }
  };

  const currentContent = content[language] || content.id;

      const getBentoClass = (index) => {
      const patterns = [
        'col-span-1 md:col-span-4 lg:col-span-4 row-span-2', // Large - top left (4/6 = 2/3 ≈ 3/5)
        'col-span-1 md:col-span-2 lg:col-span-2 row-span-2', // Medium - top right (2/6 = 1/3 ≈ 2/5)
        'col-span-1 md:col-span-2 lg:col-span-2 row-span-2', // Small - bottom left (2/6 = 1/3)
        'col-span-1 md:col-span-2 lg:col-span-2 row-span-2', // Small - bottom center (2/6 = 1/3)
        'col-span-1 md:col-span-2 lg:col-span-2 row-span-2'  // Small - bottom right (2/6 = 1/3)
      ];
      return patterns[index] || patterns[0];
    };

  // Use intersection observer for visibility
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (hasIntersected) {
      setIsVisible(true);
    }
  }, [hasIntersected]);

  return (
    <section 
      ref={targetRef}
      id="features-section" 
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6 text-white">
              {currentContent.title}
            </h2>
          </div>
          
          <p className={`text-xl mb-4 transition-all duration-700 delay-100 text-[#15C26B]
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.subtitle}
          </p>
          
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 text-gray-400
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.description}
          </p>
        </div>

                  <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-6 gap-6 max-w-7xl mx-auto auto-rows-[200px]">
          {currentContent.features.map((feature, index) => {
            const IconComponent = feature.icon;
            
            return (
              <div
                key={index}
                className={`
                  ${getBentoClass(index)}
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                  transition-all duration-700
                `}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="h-full p-5 rounded-2xl bg-[#171717] border border-[#404040] flex flex-col">
                  {/* Header */}
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-[#15C26B]/10 border border-[#15C26B]/20">
                      <IconComponent className="w-5 h-5 text-[#15C26B]" />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {feature.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm leading-relaxed mb-2">
                    {feature.description}
                  </p>

                  {/* Image - Optimized sizing for better proportions dengan height tambahan */}
                  <div className="rounded-lg border border-[#404040] overflow-hidden bg-[#121212] h-full">
                    <LazyLoad minHeight={index === 0 ? '240px' : index === 1 ? '192px' : '160px'}>
                      <OptimizedImage
                        src={feature.image}
                        alt={feature.alt}
                        width={index === 0 ? 600 : index === 1 ? 400 : 300}
                        height={index === 0 ? 240 : index === 1 ? 192 : 160}
                        quality={85}
                        priority={index === 0} // Priority for first image only
                        className={`w-full object-cover ${
                          index === 0 ? 'h-60 lg:h-full' : // Extra Large card - much bigger image
                          index === 1 ? 'h-48 lg:h-64' : // Medium card top right - bigger image
                          'h-40 lg:h-full' // Small cards bottom - increased height
                        }`}
                      />
                    </LazyLoad>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

export default Features;