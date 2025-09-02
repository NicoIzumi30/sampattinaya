import '../src/styles/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import PreloadResources from '../src/components/common/PreloadResources';
import { observePerformance, trackResourcePerformance } from '../src/lib/analytics';

function FinWiseApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    // Performance monitoring
    const handleRouteChangeStart = () => {
      // Start loading indicator if needed
      document.body.classList.add('page-loading');
    };

    const handleRouteChangeComplete = () => {
      // End loading indicator
      document.body.classList.remove('page-loading');
      
      // Scroll to top on route change
      window.scrollTo(0, 0);
    };

    const handleRouteChangeError = () => {
      document.body.classList.remove('page-loading');
    };

    router.events.on('routeChangeStart', handleRouteChangeStart);
    router.events.on('routeChangeComplete', handleRouteChangeComplete);
    router.events.on('routeChangeError', handleRouteChangeError);

    // Initialize performance monitoring
    observePerformance();
    trackResourcePerformance();

    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
      router.events.off('routeChangeComplete', handleRouteChangeComplete);
      router.events.off('routeChangeError', handleRouteChangeError);
    };
  }, [router]);

  return (
    <>
      <PreloadResources />
      <Component {...pageProps} />
    </>
  );
}

// Export reportWebVitals for Next.js Web Vitals
export { reportWebVitals } from '../src/lib/analytics';

export default FinWiseApp;
