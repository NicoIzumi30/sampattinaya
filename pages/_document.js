import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id" className="dark">
      <Head>
        {/* Performance optimizations */}
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        
        {/* Optimized font loading */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Albert+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
          media="print"
          onLoad="this.media='all'"
        />
        <noscript>
          <link
            href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Albert+Sans:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          />
        </noscript>
        
        {/* Critical CSS inlining hint */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical loading styles */
            .page-loading {
              cursor: wait;
            }
            .page-loading * {
              pointer-events: none;
            }
            
            /* Prevent FOUC */
            html {
              visibility: visible;
              opacity: 1;
            }
          `
        }} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
