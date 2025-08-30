import React, { useState, useEffect } from 'react';
import MagicBento from '../ui/MagicBento';

const Features = ({ language = 'id' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredFeature, setHoveredFeature] = useState(null);

  // Content for different languages
  const content = {
    id: {
      title: 'Fitur Lengkap SampattiNaya',
      subtitle: 'Platform all-in-one untuk menguasai literasi finansial',
      description: 'Dibangun dengan teknologi modern dan AI untuk memberikan pengalaman belajar yang personal dan efektif.',
      features: [
         {
          title: 'Papan Peringkat',
          description: 'Kompetisi sehat dengan ranking dan sistem achievement untuk memotivasi belajar.',
          image: '/images/leaderboard.png',
          alt: 'Screenshot papan peringkat dan achievement system',
          icon: 'hexagon'
        },
       
        {
          title: 'AI Financial Mentor',
          description: 'Asisten pintar yang memberikan rekomendasi finansial berdasarkan profil dan tujuan Anda.',
          image: '/images/ai.png',
          alt: 'Screenshot AI Financial Mentor memberikan rekomendasi',
          icon: 'triangle'
        },
        {
          title: 'Simulasi Budget',
          description: 'Simulasi strategi keuangan tanpa risiko untuk melatih pengambilan keputusan.',
          image: '/images/simulasi.png',
          alt: 'Screenshot simulasi budget dan analisis keuangan',
          icon: 'square'
        }, {
          title: 'Pembelajaran Interaktif',
          description: 'Modul pembelajaran dengan simulasi real-time dan progress tracking otomatis.',
          image: '/images/learning.png',
          alt: 'Screenshot modul pembelajaran interaktif SampattiNaya',
          icon: 'circle'
        }
       
      ]
    },
    en: {
      title: 'Complete SampattiNaya Features',
      subtitle: 'All-in-one platform to master financial literacy',
      description: 'Built with modern technology and AI to provide personalized and effective learning experience.',
      features: [
        {
          title: 'Leaderboard',
          description: 'Healthy competition with ranking and achievement system to motivate learning.',
          image: '/images/leaderboard.png',
          alt: 'Screenshot of leaderboard and achievement system',
          icon: 'hexagon'
        }
        ,
        {
          title: 'AI Financial Mentor',
          description: 'Smart assistant providing financial recommendations based on your profile and goals.',
          image: '/images/ai.png',
          alt: 'Screenshot of AI Financial Mentor recommendations',
          icon: 'triangle'
        },
        {
          title: 'Budget Simulator',
          description: 'Risk-free financial strategy simulation for decision making practice.',
          image: '/images/simulasi.png',
          alt: 'Screenshot of budget simulation and analysis',
          icon: 'square'
        },{
          title: 'Interactive Learning',
          description: 'Learning modules with real-time simulation and automatic progress tracking.',
          image: '/images/learning.png',
          alt: 'Screenshot of interactive learning modules',
          icon: 'circle'
        }
        
      ]
    }
  };

  const currentContent = content[language] || content.id;

  // Geometric Icons Component
  const GeometricIcon = ({ type, className }) => {
    const icons = {
      circle: (
        <div className={`w-12 h-12 rounded-full bg-sampattinaya-dark-muted ${className}`}>
          <div className={`w-8 h-8 rounded-full bg-sampattinaya-accent absolute top-2 left-2`}></div>
        </div>
      ),
      triangle: (
        <div className={`w-12 h-12 relative ${className}`}>
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-transparent border-b-sampattinaya-accent"></div>
          <div className="absolute top-4 left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-6 border-r-6 border-b-6 border-transparent border-b-sampattinaya-dark-muted"></div>
        </div>
      ),
      square: (
        <div className={`w-12 h-12 relative ${className}`}>
          <div className="w-8 h-8 bg-sampattinaya-dark-muted rounded"></div>
          <div className="absolute top-2 left-2 w-4 h-4 bg-sampattinaya-accent rounded"></div>
        </div>
      ),
      diamond: (
        <div className={`w-12 h-12 relative ${className}`}>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-6 h-6 bg-sampattinaya-dark-muted"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 w-4 h-4 bg-sampattinaya-accent"></div>
        </div>
      ),
      hexagon: (
        <div className={`w-12 h-12 relative ${className}`}>
          <div className="absolute inset-0 bg-sampattinaya-dark-muted" style={{ clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)' }}></div>
          <div className="absolute inset-2 bg-sampattinaya-accent" style={{ clipPath: 'polygon(25% 6.7%, 75% 6.7%, 100% 50%, 75% 93.3%, 25% 93.3%, 0% 50%)' }}></div>
        </div>
      ),
      shield: (
        <div className={`w-12 h-12 relative ${className}`}>
          <div className="absolute inset-0 bg-sampattinaya-dark-muted" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 82% 100%, 18% 100%, 0% 25%)' }}></div>
          <div className="absolute inset-2 bg-sampattinaya-accent" style={{ clipPath: 'polygon(50% 0%, 100% 25%, 82% 100%, 18% 100%, 0% 25%)' }}></div>
        </div>
      )
    };
    
    return icons[type] || icons.circle;
  };

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('features-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  return (
    <section 
      id="features-section" 
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {currentContent.title}
            </h2>
          </div>
          
          <p className={`text-xl mb-4 transition-all duration-700 delay-100 text-sampattinaya-accent
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.subtitle}
          </p>
          
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 text-muted-foreground
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.description}
          </p>
        </div>

        {/* Magic Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {currentContent.features.map((feature, index) => {
            // Define bento grid patterns for 4 features - cleaner layout
            const bentoPatterns = [
              'md:col-span-1 lg:col-span-2 md:row-span-2',
              'md:col-span-1 lg:col-span-2 md:row-span-1',
              'md:col-span-1 lg:col-span-2 md:row-span-1', 
              'md:col-span-1 lg:col-span-4 md:row-span-1', 
            ];

            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ${bentoPatterns[index]}
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <MagicBento
                  textAutoHide={true}
                  enableStars={true}
                  enableSpotlight={true}
                  enableBorderGlow={true}
                  enableTilt={true}
                  enableMagnetism={false}
                  clickEffect={true}
                  spotlightRadius={300}
                  particleCount={12}
                  glowColor="132, 204, 22"
                  className="h-full p-6 lg:p-8 rounded-2xl bg-gradient-to-br from-sampattinaya-dark-muted to-sampattinaya-dark-bg border border-sampattinaya-dark-muted/50 backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  {/* Icon Section */}
                  <div className="flex items-center space-x-4 mb-4 lg:mb-6">
                    <GeometricIcon type={feature.icon} />
                    <div>
                      <h3 className="text-lg lg:text-xl font-bold text-sampattinaya-accent">
                        {feature.title}
                      </h3>
                    </div>
                  </div>

                  <p className="leading-relaxed mb-4 lg:mb-6 text-muted-foreground text-sm lg:text-base">
                    {feature.description}
                  </p>

                  <div className={`rounded-xl border overflow-hidden
                    bg-sampattinaya-dark-bg/80 border-sampattinaya-dark-muted/30 backdrop-blur-sm
                    ${index === 0 ? 'h-40 lg:h-[40rem]' : index === 3 ? 'h-[20rem]' : 'h-28 lg:h-48'}`}>
                    <img
                      src={feature.image}
                      alt={feature.alt}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      onError={(e) => {
                        // Fallback to placeholder if image doesn't exist
                        e.target.src = `https://via.placeholder.com/400x240/1a1a1a/84cc16?text=${encodeURIComponent(feature.title)}`;
                      }}
                    />
                  </div>
                </MagicBento>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;