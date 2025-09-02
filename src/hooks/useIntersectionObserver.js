import { useEffect, useRef, useState } from 'react';

export const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const targetRef = useRef(null);

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '50px',
    triggerOnce: true,
    ...options,
  };

  useEffect(() => {
    const target = targetRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting;
        setIsIntersecting(isVisible);
        
        if (isVisible && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: defaultOptions.threshold,
        rootMargin: defaultOptions.rootMargin,
      }
    );

    observer.observe(target);

    return () => {
      observer.unobserve(target);
    };
  }, [defaultOptions.threshold, defaultOptions.rootMargin, hasIntersected]);

  return {
    targetRef,
    isIntersecting,
    hasIntersected: defaultOptions.triggerOnce ? hasIntersected : isIntersecting,
  };
};

export const useLazyLoad = (options = {}) => {
  const { targetRef, hasIntersected } = useIntersectionObserver(options);
  return { ref: targetRef, shouldLoad: hasIntersected };
};

export default useIntersectionObserver;
