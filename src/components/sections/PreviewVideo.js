import React, { useState, useEffect, useRef } from 'react';

const PreviewVideo = ({ language = 'id' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef(null);

  // Content for different languages
  const content = {
    id: {
      title: 'Lihat sampattinaya Beraksi',
      subtitle: 'dalam 1 menit',
      description: 'Daripada hanya membaca teori, lihat bagaimana sampattinaya bekerja: dashboard intuitif, simulasi interaktif, dan alur belajar yang jelas.',
      features: [
        'Dashboard yang mudah dipahami',
        'Simulasi real-time',
        'Progress tracking otomatis'
      ]
    },
    en: {
      title: 'See sampattinaya in Action',
      subtitle: 'in 1 minute',
      description: 'Instead of just reading theory, see how sampattinaya works: intuitive dashboard, interactive simulations, and clear learning flow.',
      features: [
        'Easy-to-understand dashboard',
        'Real-time simulations',
        'Automatic progress tracking'
      ]
    }
  };

  const currentContent = content[language] || content.id;

  // Intersection Observer for animations and video control
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Play video when in view
          if (videoRef.current && !hasError) {
            videoRef.current.play().catch(() => {
              // Handle autoplay restrictions
              console.log('Autoplay prevented by browser');
            });
          }
        } else {
          // Pause video when out of view for performance
          if (videoRef.current && !hasError) {
            videoRef.current.pause();
          }
        }
      },
      { threshold: 0.3 }
    );

    const element = document.getElementById('preview-video-section');
    if (element) {
      observer.observe(element);
    }

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [hasError]);

  const handleVideoLoad = () => {
    setIsLoading(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <section 
      id="preview-video-section" 
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-4">
              {currentContent.title}
              <span className="text-sampattinaya-accent"> {currentContent.subtitle}</span>
            </h2>
          </div>
          
          <p className={`text-lg max-w-2xl mx-auto mb-8 transition-all duration-700 delay-100
            text-gray-300
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.description}
          </p>

          {/* Features List */}
          <div className={`flex flex-wrap justify-center gap-6 transition-all duration-700 delay-200
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.features.map((feature, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-2 text-sm
                  text-gray-400
                `}
              >
                <div className="w-2 h-2 bg-sampattinaya-accent rounded-full"></div>
                <span>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Video Container */}
        <div className={`relative max-w-4xl mx-auto transition-all duration-1000 delay-300
          ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-8 opacity-0 scale-95'}
        `}>
          {/* Video wrapper with border and shadow */}
          <div className={`relative rounded-2xl overflow-hidden border-2 transition-all duration-500 border-gray-800 bg-gray-900 shadow-2xl shadow-gray-900/50
            ${isVisible ? 'hover:shadow-3xl hover:scale-[1.02]' : ''}
          `}>
            
            {/* Loading State */}
            {isLoading && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sampattinaya-accent/10 to-sampattinaya-accent/5 z-10">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-12 h-12 border-4 border-sampattinaya-accent border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm text-gray-400">
                    Loading preview...
                  </p>
                </div>
              </div>
            )}

            {/* Error State */}
            {hasError && (
              <div className="aspect-video flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900">
                <div className="text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center bg-gray-700">
                    <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400">
                    Video preview not available
                  </p>
                </div>
              </div>
            )}

            {/* Video Element */}
            {!hasError && (
              <video
                ref={videoRef}
                className="w-full h-auto aspect-video"
                autoPlay
                muted
                loop
                playsInline
                onLoadedData={handleVideoLoad}
                onError={handleVideoError}
                poster=""
              >
                <source 
                  src="https://xguihxuzqibwxjnimxev.supabase.co/storage/v1/object/public/videos/marketing/website/supabase-table-editor.webm" 
                  type="video/webm" 
                />
                Your browser does not support the video tag.
              </video>
            )}

            {/* Video Overlay Effect */}
            <div className="absolute inset-0 pointer-events-none">
              <div className={`absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent
                ${isVisible ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-1000 delay-500
              `}></div>
            </div>
          </div>

          {/* Video Caption */}
          <div className={`text-center mt-6 transition-all duration-700 delay-500
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}
          `}>
            <p className="text-sm text-gray-500">
              Video preview - Actual SampattiNaya interface
            </p>
          </div>
        </div>

        {/* Bottom Decoration */}
        <div className={`mt-16 flex justify-center transition-all duration-1000 delay-700
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}>
          <div className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-sampattinaya-accent rounded-full animate-pulse"></div>
            <span className="text-xs uppercase tracking-wide text-gray-500">
              Interactive Demo
            </span>
            <div className="w-2 h-2 bg-sampattinaya-accent/60 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PreviewVideo;