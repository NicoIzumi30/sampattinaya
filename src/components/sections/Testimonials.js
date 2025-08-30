import React, { useState, useEffect } from 'react';

const Testimonials = ({ language = 'id' }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Content for different languages
  const content = {
    id: {
      title: 'Bergabung dengan Komunitas',
      subtitle: 'Discover what our community has to say about their sampattinaya experience.',
      testimonials: [
        // Row 1 - Left to Right
        [
          {
            name: 'Sarah K.',
            username: '@sarah_student',
            role: 'Mahasiswa',
            text: 'Simulasinya membuka mata soal kebocoran pengeluaran. Sekarang bisa nabung 500rb setiap bulan!',
            avatar: 'S'
          },
          {
            name: 'Ahmad M.',
            username: '@ahmad_worker',
            role: 'Pekerja',
            text: 'AI Mentornya membantu menyusun rencana 30 hari yang realistis. Dana darurat udah terkumpul 50%.',
            avatar: 'A'
          },
          {
            name: 'Rita S.',
            username: '@rita_mom',
            role: 'Ibu Rumah Tangga',
            text: 'Bagian keamanan digitalnya sangat bermanfaat. Hampir ketipu investasi bodong, untung cek dulu di sini.',
            avatar: 'R'
          },
          {
            name: 'Budi P.',
            username: '@budi_trader',
            role: 'Trader',
            text: 'Platform pembelajaran yang paling mudah dipahami. Cocok banget buat pemula kayak dulu.',
            avatar: 'B'
          },
          {
            name: 'Maya L.',
            username: '@maya_designer',
            role: 'Designer',
            text: 'Goal plannernya keren! Target liburan ke Jepang jadi lebih terarah dan realistis.',
            avatar: 'M'
          },
          {
            name: 'Andi T.',
            username: '@andi_dev',
            role: 'Developer',
            text: 'Fitur anti-scam checker menyelamatkan saya dari kerugian jutaan rupiah. Thanks sampattinaya!',
            avatar: 'A'
          }
        ],
        // Row 2 - Right to Left  
        [
          {
            name: 'Sari W.',
            username: '@sari_teacher',
            role: 'Guru',
            text: 'Setelah pakai sampattinaya, anak-anak jadi lebih paham konsep menabung dan investasi dasar.',
            avatar: 'S'
          },
          {
            name: 'Doni R.',
            username: '@doni_entrepreneur',
            role: 'Pengusaha',
            text: 'Kalkulator cicilan sangat membantu evaluasi cash flow bisnis. Highly recommended!',
            avatar: 'D'
          },
          {
            name: 'Lisa F.',
            username: '@lisa_freelancer',
            role: 'Freelancer',
            text: 'Income tidak tetap jadi tidak masalah lagi. AI Mentor bisa adjust planning sesuai kondisi.',
            avatar: 'L'
          },
          {
            name: 'Joko S.',
            username: '@joko_driver',
            role: 'Driver Online',
            text: 'Simulasi budgetnya simple tapi powerful. Sekarang pengeluaran bulanan terkontrol banget.',
            avatar: 'J'
          },
          {
            name: 'Nina K.',
            username: '@nina_nurse',
            role: 'Perawat',
            text: 'Platform ini mengubah mindset saya tentang uang. Dari boros jadi bisa investment oriented.',
            avatar: 'N'
          },
          {
            name: 'Agus M.',
            username: '@agus_mechanic',
            role: 'Mekanik',
            text: 'Gampang banget dipahami walau background saya bukan ekonomi. Thanks for making it simple!',
            avatar: 'A'
          }
        ]
      ]
    },
    en: {
      title: 'Join the Community',
      subtitle: 'Discover what our community has to say about their sampattinaya experience.',
      testimonials: [
        [
          {
            name: 'Sarah K.',
            username: '@sarah_student',
            role: 'Student',
            text: 'The simulation opened my eyes to spending leaks. Now I can save 500k every month!',
            avatar: 'S'
          },
          {
            name: 'Ahmad M.',
            username: '@ahmad_worker',
            role: 'Worker',
            text: 'AI Mentor helped create a realistic 30-day plan. Emergency fund is 50% collected.',
            avatar: 'A'
          },
          {
            name: 'Rita S.',
            username: '@rita_mom',
            role: 'Homemaker',
            text: 'Digital security section very helpful. Almost got scammed, lucky I checked here first.',
            avatar: 'R'
          },
          {
            name: 'Budi P.',
            username: '@budi_trader',
            role: 'Trader',
            text: 'Easiest learning platform to understand. Perfect for beginners like I used to be.',
            avatar: 'B'
          },
          {
            name: 'Maya L.',
            username: '@maya_designer',
            role: 'Designer',
            text: 'Goal planner is awesome! Japan vacation target became more focused and realistic.',
            avatar: 'M'
          },
          {
            name: 'Andi T.',
            username: '@andi_dev',
            role: 'Developer',
            text: 'Anti-scam checker saved me from millions of rupiah loss. Thanks sampattinaya!',
            avatar: 'A'
          }
        ],
        [
          {
            name: 'Sari W.',
            username: '@sari_teacher',
            role: 'Teacher',
            text: 'After using sampattinaya, students better understand saving concepts and basic investment.',
            avatar: 'S'
          },
          {
            name: 'Doni R.',
            username: '@doni_entrepreneur',
            role: 'Entrepreneur',
            text: 'Installment calculator very helpful for business cash flow evaluation. Highly recommended!',
            avatar: 'D'
          },
          {
            name: 'Lisa F.',
            username: '@lisa_freelancer',
            role: 'Freelancer',
            text: 'Irregular income no longer a problem. AI Mentor can adjust planning according to conditions.',
            avatar: 'L'
          },
          {
            name: 'Joko S.',
            username: '@joko_driver',
            role: 'Online Driver',
            text: 'Budget simulation is simple but powerful. Now monthly expenses are very controlled.',
            avatar: 'J'
          },
          {
            name: 'Nina K.',
            username: '@nina_nurse',
            role: 'Nurse',
            text: 'This platform changed my mindset about money. From wasteful to investment oriented.',
            avatar: 'N'
          },
          {
            name: 'Agus M.',
            username: '@agus_mechanic',
            role: 'Mechanic',
            text: 'Very easy to understand even though my background is not economics. Thanks for making it simple!',
            avatar: 'A'
          }
        ]
      ]
    }
  };

  const currentContent = content[language] || content.id;

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

    const element = document.getElementById('testimonials-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, []);

  // Testimonial Card Component
  const TestimonialCard = ({ testimonial }) => (
    <div className={`flex-shrink-0 w-96 p-8 mx-4 rounded-xl border transition-all duration-300 bg-gray-900 border-gray-800 hover:border-gray-700
      shadow-lg hover:shadow-xl
    `}>
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-10 h-10 rounded-full bg-sampattinaya-accent flex items-center justify-center text-white font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-white">
            {testimonial.name}
          </div>
          <div className="text-sm text-gray-400">
            {testimonial.username}
          </div>
        </div>
      </div>
      
      <p className="leading-relaxed mb-4 text-gray-300">
        "{testimonial.text}"
      </p>
      
      <div className="text-sm text-sampattinaya-accent font-medium">
        {testimonial.role}
      </div>
    </div>
  );

  return (
    <section 
      id="testimonials-section" 
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden"
    >
      {/* Radial Gradient Blur Effects */}
      <div className="absolute left-0 top-0 bottom-0 w-80 pointer-events-none">
        <div className="w-full h-full bg-gradient-radial from-sampattinaya-dark-bg via-sampattinaya-dark-bg to-transparent opacity-90"></div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-80 pointer-events-none">
        <div className="w-full h-full bg-gradient-radial from-sampattinaya-dark-bg via-sampattinaya-dark-bg to-transparent opacity-90"></div>
      </div>

      {/* Header */}
      <div className="max-w-7xl mx-auto mb-16 relative z-10">
        <div className="text-center">
          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {currentContent.title}
            </h2>
          </div>
          
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-100 text-muted-foreground
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.subtitle}
          </p>
        </div>
      </div>

      {/* Infinite Scrolling Testimonials Container */}
      <div className="relative max-full mx-auto">        
        <div className="space-y-8">
          {currentContent.testimonials.map((row, rowIndex) => (
            <div key={rowIndex} className="overflow-hidden">
              <div 
                className={`flex ${rowIndex % 2 === 0 ? 'animate-scroll-left' : 'animate-scroll-right'}`}
                style={{
                  width: 'fit-content',
                  animationDuration: '40s',
                  animationTimingFunction: 'linear',
                  animationIterationCount: 'infinite'
                }}
              >
                {/* First set of testimonials */}
                {row.map((testimonial, index) => (
                  <TestimonialCard key={`${rowIndex}-${index}-1`} testimonial={testimonial} />
                ))}
                
                {/* Duplicate set for seamless loop */}
                {row.map((testimonial, index) => (
                  <TestimonialCard key={`${rowIndex}-${index}-2`} testimonial={testimonial} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-gradient-radial {
          background: radial-gradient(ellipse at center, var(--color) 0%, transparent 70%);
        }
        
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        
        .animate-scroll-left {
          animation: scroll-left 40s linear infinite;
        }
        
        .animate-scroll-right {
          animation: scroll-right 40s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Testimonials;