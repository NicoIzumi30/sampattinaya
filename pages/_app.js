import '../src/styles/globals.css';
import SplashCursor from '../src/components/ui/SplashCursor';

function FinWiseApp({ Component, pageProps }) {
  return (
    <>
      <SplashCursor />
      <Component {...pageProps} />
    </>
  );
}

export default FinWiseApp;
