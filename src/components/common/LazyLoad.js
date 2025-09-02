import { useState, useEffect } from 'react';
import { useLazyLoad } from '@/hooks/useIntersectionObserver';

const LazyLoad = ({ 
  children, 
  fallback = null, 
  className = '',
  minHeight = 'auto',
  threshold = 0.1,
  rootMargin = '100px'
}) => {
  const { ref, shouldLoad } = useLazyLoad({ threshold, rootMargin });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (shouldLoad && !isLoaded) {
      // Small delay to ensure smooth loading
      const timer = setTimeout(() => {
        setIsLoaded(true);
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [shouldLoad, isLoaded]);

  return (
    <div 
      ref={ref} 
      className={className}
      style={{ minHeight }}
    >
      {isLoaded ? children : fallback || <LazyLoadSkeleton minHeight={minHeight} />}
    </div>
  );
};

const LazyLoadSkeleton = ({ minHeight }) => (
  <div 
    className="animate-pulse bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
    style={{ minHeight }}
  >
    <div className="text-gray-400">
      <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" clipRule="evenodd" />
      </svg>
    </div>
  </div>
);

export default LazyLoad;
