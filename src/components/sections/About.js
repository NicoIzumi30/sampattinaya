import React, { useState, useEffect } from 'react';

const About = ({ language = 'id' }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Content for different languages
  const content = {
    id: {
      title: 'Mengapa SampattiNaya Hadir?',
      subtitle: 'Membangun literasi finansial untuk masa depan yang lebih baik',
      mainText: 'SampattiNaya lahir dari satu kenyataan: banyak orang ingin mengatur uang, tetapi bingung harus mulai dari mana. Visi kami sederhana namun kuat—menciptakan platform yang ramah bagi pemula dan tetap relevan bagi yang berpengalaman.',
      sections: [
        {
          title: 'Misi Kami',
          content: 'Menyediakan pendidikan finansial yang dapat diakses oleh semua kalangan, mulai dari pelajar hingga pelaku usaha. Kami percaya bahwa setiap orang berhak mendapatkan pengetahuan finansial yang berkualitas tanpa hambatan.'
        },
        {
          title: 'Pendekatan Kami',
          content: 'Dengan menggabungkan teknologi AI, simulasi interaktif, dan desain yang intuitif, kami membantu Anda mengambil langkah kecil yang konsisten menuju kondisi finansial yang lebih sehat.'
        },
        {
          title: 'Komitmen Kami',
          content: 'Sebagai platform edukasi non-komersial, kami berkomitmen untuk terus mengembangkan fitur yang bermanfaat dan menjaga kepercayaan pengguna melalui transparansi dan keamanan data.'
        }
      ],
      stats: [
        { number: '2024', label: 'Tahun didirikan' },
        { number: '100%', label: 'Gratis untuk akses dasar' },
        { number: '24/7', label: 'Dukungan AI mentor' }
      ],
      cta: {
        text: 'Mulai perjalanan finansial Anda',
        button: 'Coba Sekarang'
      }
    },
    en: {
      title: 'Why SampattiNaya Exists?',
      subtitle: 'Building financial literacy for a better future',
      mainText: 'SampattiNaya was born from one simple truth: many people want to manage their money, but don\'t know where to start. Our vision is simple yet powerful—creating a platform that\'s beginner-friendly while remaining relevant for the experienced.',
      sections: [
        {
          title: 'Our Mission',
          content: 'To provide accessible financial education for all demographics, from students to business owners. We believe everyone deserves quality financial knowledge without barriers.'
        },
        {
          title: 'Our Approach',
          content: 'By combining AI technology, interactive simulations, and intuitive design, we help you take small, consistent steps toward better financial health.'
        },
        {
          title: 'Our Commitment',
          content: 'As a non-commercial educational platform, we\'re committed to continuously developing beneficial features and maintaining user trust through transparency and data security.'
        }
      ],
      stats: [
        { number: '2024', label: 'Year founded' },
        { number: '100%', label: 'Free basic access' },
        { number: '24/7', label: 'AI mentor support' }
      ],
      cta: {
        text: 'Start your financial journey',
        button: 'Try Now'
      }
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

    const element = document.getElementById('about-section');
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
      id="about-section" 
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <h2 className={`text-4xl lg:text-5xl font-bold leading-tight mb-6 transition-all duration-700 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.title}
          </h2>
          
          <p className={`text-xl text-sampattinaya-accent mb-8 transition-all duration-700 delay-100
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.subtitle}
          </p>
          
          <p className={`text-lg leading-relaxed transition-all duration-700 delay-200
            text-gray-300
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.mainText}
          </p>
        </div>

        {/* Three Columns Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-20">
          {currentContent.sections.map((section, index) => (
            <div 
              key={index}
              className={`space-y-4 transition-all duration-700
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}
              `}
              style={{ transitionDelay: `${300 + index * 100}ms` }}
            >
              <h3 className="text-xl font-semibold text-sampattinaya-accent">
                {section.title}
              </h3>
              <p className="leading-relaxed text-gray-400">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {currentContent.stats.map((stat, index) => (
            <div 
              key={index}
              className={`text-center transition-all duration-700
                ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
              `}
              style={{ transitionDelay: `${600 + index * 100}ms` }}
            >
              <div className="text-3xl lg:text-4xl font-bold text-sampattinaya-accent mb-2">
                {stat.number}
              </div>
              <p className="text-sm uppercase tracking-wide text-gray-400">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className={`text-center transition-all duration-700 delay-700
          ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
        `}>
          <p className="text-lg mb-8 text-gray-300">
            {currentContent.cta.text}
          </p>
          
          <button className={`inline-flex items-center px-8 py-4 rounded-lg font-semibold transition-all duration-300
            bg-sampattinaya-accent text-white hover:opacity-90 hover:scale-105 active:scale-95
            shadow-lg hover:shadow-xl
          `}>
            {currentContent.cta.button}
            <svg 
              className="ml-2 w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>

        {/* Bottom decoration */}
        <div className={`mt-20 flex justify-center transition-all duration-1000 delay-1000
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-sampattinaya-accent rounded-full animate-pulse"></div>
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-sampattinaya-accent to-transparent"></div>
            <div className="w-2 h-2 bg-sampattinaya-accent/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;