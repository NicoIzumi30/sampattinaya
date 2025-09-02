// Web Vitals and Performance Analytics
export function reportWebVitals(metric) {
  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Web Vital:', metric);
  }

  // Send to analytics service in production
  if (process.env.NODE_ENV === 'production') {
    // Example: Send to Google Analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }

    // Example: Send to custom analytics endpoint
    fetch('/api/analytics', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
      }),
    }).catch(() => {
      // Fail silently
    });
  }
}

// Performance observer for additional metrics
export function observePerformance() {
  if (typeof window === 'undefined') return;

  // Observe long tasks
  if ('PerformanceObserver' in window) {
    try {
      const longTaskObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn('Long task detected:', entry.duration + 'ms');
          }
        });
      });
      longTaskObserver.observe({ entryTypes: ['longtask'] });

      // Observe layout shifts
      const clsObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.hadRecentInput) return;
          console.log('Layout shift:', entry.value);
        });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });
    } catch (error) {
      console.warn('Performance observer not supported:', error);
    }
  }
}

// Resource loading performance
export function trackResourcePerformance() {
  if (typeof window === 'undefined') return;

  window.addEventListener('load', () => {
    const navigation = performance.getEntriesByType('navigation')[0];
    const resources = performance.getEntriesByType('resource');

    // Log slow resources
    resources.forEach((resource) => {
      if (resource.duration > 1000) {
        console.warn('Slow resource:', resource.name, resource.duration + 'ms');
      }
    });

    // Log page load metrics
    console.log('Page Load Metrics:', {
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalTime: navigation.loadEventEnd - navigation.fetchStart,
    });
  });
}

// Image loading performance
export function trackImagePerformance() {
  if (typeof window === 'undefined') return;

  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        const startTime = performance.now();
        
        img.addEventListener('load', () => {
          const loadTime = performance.now() - startTime;
          if (loadTime > 500) {
            console.warn('Slow image load:', img.src, loadTime + 'ms');
          }
        });
      }
    });
  });

  // Observe all images
  document.querySelectorAll('img').forEach((img) => {
    imageObserver.observe(img);
  });
}

// Bundle size tracking
export function trackBundleSize() {
  if (typeof window === 'undefined') return;

  const scripts = document.querySelectorAll('script[src]');
  let totalSize = 0;

  scripts.forEach(async (script) => {
    try {
      const response = await fetch(script.src, { method: 'HEAD' });
      const size = parseInt(response.headers.get('content-length') || '0');
      totalSize += size;
    } catch (error) {
      // Ignore errors
    }
  });

  console.log('Estimated bundle size:', totalSize / 1024 + 'KB');
}
