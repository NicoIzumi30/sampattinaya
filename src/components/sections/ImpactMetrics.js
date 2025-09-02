import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';

const ImpactMetrics = ({ language = 'id' }) => {
  const [animatedValues, setAnimatedValues] = useState({});
  const [isVisible, setIsVisible] = useState(false);

  // Content for different languages
  const content = {
    id: {
      stats: [
        { 
          id: 'users',
          value: 2450, 
          suffix: '+',
          label: 'total skor pembelajaran yang telah dicapai pengguna'
        },
        { 
          id: 'modules',
          value: 12, 
          suffix: ' modul',
          label: 'pembelajaran terstruktur dari pemula hingga mahir'
        },
        { 
          id: 'success',
          value: 85, 
          suffix: '%',
          label: 'pengguna berhasil menyelesaikan kuis dan simulasi'
        }
      ]
    },
    en: {
      stats: [
        { 
          id: 'users',
          value: 2450, 
          suffix: '+',
          label: 'total learning score achieved by users'
        },
        { 
          id: 'modules',
          value: 12, 
          suffix: ' modules',
          label: 'structured learning from beginner to advanced'
        },
        { 
          id: 'success',
          value: 85, 
          suffix: '%',
          label: 'users successfully completed quizzes and simulations'
        }
      ]
    }
  };

  const currentContent = content[language] || content.id;

  // Animation function for counting up numbers
  const animateValue = (start, end, duration, callback) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeOut * (end - start) + start);
      callback(currentValue);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Intersection Observer for triggering animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          
          // Animate each stat with staggered timing
          currentContent.stats.forEach((stat, index) => {
            setTimeout(() => {
              animateValue(0, stat.value, 1800, (value) => {
                setAnimatedValues(prev => ({
                  ...prev,
                  [stat.id]: value
                }));
              });
            }, index * 150);
          });
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('impact-metrics');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [currentContent.stats, isVisible]);

  return (
    <section 
      id="impact-metrics" 
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >     <h1 className="text-4xl md:text-4xl lg:text-5xl font-bold leading-tight text-center mb-12">
                  Statistik Platform
                </h1>
      <div className="max-w-6xl mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {currentContent.stats.map((stat, index) => {
            const currentValue = animatedValues[stat.id] || 0;
            
            return (
              <div 
                key={stat.id}
                className={`text-center transform transition-all duration-700 ease-out
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
                `}
                style={{ 
                  transitionDelay: `${index * 100}ms`
                }}
              >
                {/* Large Number */}
                <div className="mb-4">
                  <div className="text-5xl lg:text-6xl xl:text-7xl font-bold text-sampattinaya-accent leading-none">
                    {currentValue.toLocaleString()}{stat.suffix}
                  </div>
                  
                  {/* Subtle underline animation */}
                  <div className="mt-2 flex justify-center">
                    <div 
                      className="h-1 bg-gradient-to-r from-sampattinaya-accent/0 via-sampattinaya-accent to-sampattinaya-accent/0 transition-all duration-1000 ease-out"
                      style={{ 
                        width: isVisible ? '60px' : '0px',
                        transitionDelay: `${index * 150 + 500}ms`
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className={`text-lg leading-relaxed max-w-xs mx-auto
                  text-gray-400
                `}>
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Bottom section with subtle branding */}
        <div className="mt-20 text-center">
          <div className={`inline-flex items-center space-x-3 px-4 py-2 rounded-full border transition-all duration-300 border-gray-800 bg-gray-900/50 hover:border-sampattinaya-accent/20`}>
            <div className="w-2 h-2 bg-sampattinaya-accent rounded-full animate-pulse" />
            <span className="text-sm font-medium text-gray-400">
              Live metrics
            </span>
            <div className="w-2 h-2 bg-sampattinaya-accent/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ImpactMetrics;