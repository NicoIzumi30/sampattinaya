#!/bin/bash

# sampattinaya Project Setup Script
# Run this after: npx create-next-app@latest sampattinaya-ai --no-typescript --tailwind --eslint --src-dir --pages

echo "🚀 Setting up sampattinaya project structure..."

# Create main directory structure
echo "📁 Creating directory structure..."

# Pages structure (pages router)
mkdir -p pages/api
mkdir -p pages/leaderboard  
mkdir -p pages/news

# Components structure
mkdir -p src/components/ui
mkdir -p src/components/sections
mkdir -p src/components/layout
mkdir -p src/components/common

# Hooks and utilities
mkdir -p src/hooks
mkdir -p src/lib
mkdir -p src/utils

# i18n structure
mkdir -p src/i18n

# Public assets structure
mkdir -p public/images
mkdir -p public/video
mkdir -p public/icons
mkdir -p public/logos

# Styles
mkdir -p src/styles

# Config files in root (not src)
mkdir -p config

echo "📄 Creating configuration files..."

# Next.js configuration
touch next.config.js

# Tailwind configuration (will be updated for v4)
touch tailwind.config.js
touch postcss.config.js

# ESLint configuration
touch .eslintrc.json

# Environment files
touch .env.local
touch .env.example

echo "🌐 Creating i18n files..."

# i18n JSON files
touch src/i18n/en.json
touch src/i18n/id.json
touch src/i18n/index.js

echo "📱 Creating page files..."

# Main pages
# Main pages
cat > pages/index.js << 'EOF'
import Head from 'next/head';

export default function HomePage() {
  return (
    <>
      <Head>
        <title>sampattinaya - Belajar Keuangan Lebih Mudah</title>
        <meta name="description" content="Platform literasi finansial dengan modul ringkas, simulasi interaktif, dan pengalaman modern." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-light-bg dark:bg-sampattinaya-dark-bg text-sampattinaya-light-text dark:text-sampattinaya-dark-text">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Selamat datang di{' '}
              <span className="text-sampattinaya-accent">sampattinaya</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Platform literasi finansial yang membantu Anda memahami dan mengelola keuangan dengan lebih baik.
            </p>
            <div className="sampattinaya-gradient-bg rounded-lg p-8 max-w-md mx-auto">
              <p className="text-sampattinaya-accent font-semibold">
                🚧 Under Development
              </p>
              <p className="text-sm mt-2">
                Landing page sedang dalam tahap pengembangan
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
EOF

cat > pages/leaderboard/index.js << 'EOF'
import Head from 'next/head';

export default function LeaderboardPage() {
  return (
    <>
      <Head>
        <title>Peringkat - sampattinaya</title>
        <meta name="description" content="Lihat peringkat pengguna sampattinaya berdasarkan aktivitas pembelajaran" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-light-bg dark:bg-sampattinaya-dark-bg text-sampattinaya-light-text dark:text-sampattinaya-dark-text">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              🏆 <span className="text-sampattinaya-accent">Leaderboard</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Peringkat pengguna berdasarkan aktivitas pembelajaran
            </p>
            <div className="sampattinaya-gradient-bg rounded-lg p-8 max-w-md mx-auto">
              <p className="text-sampattinaya-accent font-semibold">
                🚧 Under Development
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
EOF

cat > pages/news/index.js << 'EOF'
import Head from 'next/head';

export default function NewsPage() {
  return (
    <>
      <Head>
        <title>Berita - sampattinaya</title>
        <meta name="description" content="Berita dan artikel terbaru tentang literasi finansial" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-light-bg dark:bg-sampattinaya-dark-bg text-sampattinaya-light-text dark:text-sampattinaya-dark-text">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">
              📰 <span className="text-sampattinaya-accent">News</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Berita dan artikel terbaru tentang literasi finansial
            </p>
            <div className="sampattinaya-gradient-bg rounded-lg p-8 max-w-md mx-auto">
              <p className="text-sampattinaya-accent font-semibold">
                🚧 Under Development
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
EOF

cat > pages/404.js << 'EOF'
import Head from 'next/head';
import Link from 'next/link';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan - sampattinaya</title>
        <meta name="description" content="Halaman yang Anda cari tidak ditemukan" />
      </Head>
      
      <main className="min-h-screen bg-sampattinaya-light-bg dark:bg-sampattinaya-dark-bg text-sampattinaya-light-text dark:text-sampattinaya-dark-text flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-sampattinaya-accent mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Halaman Tidak Ditemukan</h2>
          <p className="text-muted-foreground mb-8">
            Halaman yang Anda cari tidak ada atau telah dipindahkan.
          </p>
          <Link href="/" className="inline-block bg-sampattinaya-accent text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Kembali ke Beranda
          </Link>
        </div>
      </main>
    </>
  );
}
EOF

# API routes
cat > pages/api/hello.js << 'EOF'
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ 
    name: 'sampattinaya API',
    message: 'Welcome to sampattinaya API',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
}
EOF

echo "🧩 Creating component files..."

# Layout components  
touch src/components/layout/Layout.js
touch src/components/layout/Navbar.js
touch src/components/layout/Footer.js

# Landing page sections
touch src/components/sections/Hero.js
touch src/components/sections/ImpactMetrics.js
touch src/components/sections/Sponsors.js
touch src/components/sections/About.js
touch src/components/sections/PreviewVideo.js
touch src/components/sections/Features.js
touch src/components/sections/ProblemsAndSolutions.js
touch src/components/sections/Testimonials.js
touch src/components/sections/News.js
touch src/components/sections/FAQ.js
touch src/components/sections/FloatingChat.js

# Leaderboard page sections
touch src/components/sections/LeaderboardHero.js
touch src/components/sections/Top3Highlight.js
touch src/components/sections/Top10Table.js
touch src/components/sections/UserPosition.js

# News page sections  
touch src/components/sections/NewsHero.js
touch src/components/sections/NewsCards.js

# Common components
touch src/components/common/LanguageSwitcher.js
touch src/components/common/ThemeToggle.js
touch src/components/common/MobileMenu.js
touch src/components/common/ChatBot.js
touch src/components/common/LoadingSpinner.js

# shadcn/ui components (these will be installed via CLI later)
# Just creating the directory structure
touch src/components/ui/button.jsx
touch src/components/ui/card.jsx
touch src/components/ui/badge.jsx
touch src/components/ui/separator.jsx
touch src/components/ui/accordion.jsx
touch src/components/ui/dialog.jsx
touch src/components/ui/aspect-ratio.jsx
touch src/components/ui/scroll-area.jsx
touch src/components/ui/avatar.jsx
touch src/components/ui/textarea.jsx
touch src/components/ui/dropdown-menu.jsx
touch src/components/ui/tabs.jsx
touch src/components/ui/table.jsx
touch src/components/ui/progress.jsx
touch src/components/ui/switch.jsx

echo "🎣 Creating hooks..."

# Custom hooks
touch src/hooks/useI18n.js
touch src/hooks/useTheme.js
touch src/hooks/useLocalStorage.js
touch src/hooks/useScrollPosition.js

echo "🛠️ Creating utilities..."

# Utility files
touch src/lib/utils.js
touch src/lib/constants.js
touch src/lib/api.js

# Utils
touch src/utils/formatters.js
touch src/utils/validators.js
touch src/utils/helpers.js

echo "🎨 Creating style files..."

# Style files
touch src/styles/globals.css
touch src/styles/components.css

echo "📊 Creating public assets..."

# Placeholder files for assets
touch public/images/.gitkeep
touch public/video/.gitkeep  
touch public/icons/.gitkeep
touch public/logos/.gitkeep

# Essential public files
touch public/favicon.ico
touch public/robots.txt
touch public/sitemap.xml
touch public/manifest.json

echo "📋 Creating configuration content..."

# Create package.json scripts section (this will be merged with existing)
cat > config/additional-scripts.json << 'EOF'
{
  "scripts": {
    "build": "next build",
    "start": "next start", 
    "lint": "next lint",
    "type-check": "echo 'No TypeScript in this project'",
    "test": "echo 'Tests not configured yet'"
  }
}
EOF

# Create Next.js config
cat > next.config.js << 'EOF'
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wowtheme7.com',
        port: '',
        pathname: '/tf/payone/assets/images/**',
      },
    ],
  },
  i18n: {
    locales: ['id', 'en'],
    defaultLocale: 'id',
    localeDetection: false,
  },
}

module.exports = nextConfig
EOF

# Create PostCSS config for Tailwind 4
cat > postcss.config.js << 'EOF'
module.exports = {
  plugins: {
    '@tailwindcss/postcss': {},
  },
}
EOF

# Create minimal tailwind.config.js (optional for Tailwind 4)
cat > tailwind.config.js << 'EOF'
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
  ],
}
EOF

# Create globals.css with Tailwind 4 @theme directive (following user's reference)
cat > src/styles/globals.css << 'EOF'
@import "tailwindcss";

:root {
  --font-inter: 'Inter', Helvetica, sans-serif;
  --font-albert-sans: 'Albert Sans', Helvetica, sans-serif;
}

@theme {
  /* sampattinaya Brand Colors */
  --color-sampattinaya-accent: #15C26B;
  --color-sampattinaya-dark-bg: #0F1413;
  --color-sampattinaya-dark-muted: #1B2421;
  --color-sampattinaya-light-bg: #FFFFFF;
  --color-sampattinaya-light-muted: #F3F5F4;
  --color-sampattinaya-dark-text: #E6F0EC;
  --color-sampattinaya-light-text: #0C1010;

  /* shadcn/ui compatible colors */
  --color-background: #FFFFFF;
  --color-foreground: #0C1010;
  --color-muted: #F3F5F4;
  --color-muted-foreground: #6B7280;
  --color-card: #FFFFFF;
  --color-border: #E5E7EB;
  --color-primary: #15C26B;
  --color-secondary: #F3F5F4;
  --color-accent: #15C26B;

  /* Typography */
  --font-inter: "Inter", Helvetica, sans-serif;
  --font-albert-sans: "Albert Sans", Helvetica, sans-serif;

  /* Spacing extensions for sampattinaya */
  --spacing-18: 4.5rem;
  --spacing-22: 5.5rem;
  --spacing-88: 22rem;
  --spacing-96: 24rem;

  /* Z-index values */
  --index-60: 60;
  --index-70: 70;

  /* Custom breakpoints */
  --breakpoint-xs: 475px;
}

* {
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
}

html,
body {
  margin: 0px;
  height: 100%;
  font-family: var(--font-albert-sans);
  transition: background-color 0.2s ease, color 0.2s ease;
}

/* Dark mode styles */
.dark {
  --color-background: var(--color-sampattinaya-dark-bg);
  --color-foreground: var(--color-sampattinaya-dark-text);
  --color-muted: var(--color-sampattinaya-dark-muted);
  --color-card: var(--color-sampattinaya-dark-muted);
  --color-border: #374151;
}

button:focus-visible {
  @apply outline-2 outline-blue-500 outline-offset-2;
}

a {
  @apply no-underline;
}

@layer utilities {
  .font-inter {
    font-family: var(--font-inter);
  }

  .font-albert-sans {
    font-family: var(--font-albert-sans);
  }
  
  /* sampattinaya brand text sizes */
  .text-sampattinaya-lg {
    font-size: 18px;
    line-height: 27px;
  }
  
  .text-sampattinaya-base {
    font-size: 16px;
    line-height: 24px;
  }
  
  .text-sampattinaya-sm {
    font-size: 14px;
    line-height: 20px;
  }

  .text-sampattinaya-xs {
    font-size: 12px;
    line-height: 16px;
  }

  /* sampattinaya specific utilities */
  .sampattinaya-gradient-bg {
    background: linear-gradient(135deg, #15C26B20 0%, #15C26B40 100%);
  }

  .sampattinaya-shadow {
    box-shadow: 0 8px 28px rgba(0, 0, 0, 0.25);
  }

  .sampattinaya-gradient-text {
    background: linear-gradient(135deg, #15C26B 0%, #10A558 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
}

/* Smooth scrolling */
html {
  scroll-behavior: smooth;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-muted);
}

::-webkit-scrollbar-thumb {
  background: var(--color-sampattinaya-accent);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #10A558;
}
EOF

# Create basic i18n structure
cat > src/i18n/id.json << 'EOF'
{
  "nav": {
    "links": ["Home", "Tentang", "Fitur", "Solusi", "Testimoni", "FAQ", "Peringkat", "News"],
    "cta": "Coba Sekarang"
  },
  "hero": {
    "kicker": "Platform Literasi Finansial",
    "headline": "Satu platform, ribuan peluang: tingkatkan literasi finansialmu mulai hari ini.",
    "subcopy": "Apakah Anda seorang pelajar, pekerja muda, orang tua, atau pelaku usaha kecil? sampattinaya membantu memahami dasar finansial, menyusun rencana yang jelas, dan mempraktikkan lewat simulasi interaktif.",
    "ctas": ["Mulai Belajar", "Lihat Peringkat"],
    "trust": ["Gratis", "Login aman", "Cek kesehatan finansial < 30 detik"]
  }
}
EOF

cat > src/i18n/en.json << 'EOF'
{
  "nav": {
    "links": ["Home", "About", "Features", "Solutions", "Testimonials", "FAQ", "Leaderboard", "News"],
    "cta": "Try Now"
  },
  "hero": {
    "kicker": "Financial Literacy Platform", 
    "headline": "One platform, countless opportunities improve your financial literacy today.",
    "subcopy": "Student, young professional, parent, or small business owner? sampattinaya helps you grasp the basics, plan clearly, and practice through interactive simulations.",
    "ctas": ["Start Learning", "View Leaderboard"],
    "trust": ["Free", "Secure login", "Financial health check < 30s"]
  }
}
EOF

# Create i18n hook
cat > src/i18n/index.js << 'EOF'
import { useRouter } from 'next/router';
import en from './en.json';
import id from './id.json';

const messages = {
  en,
  id,
};

export const useTranslation = () => {
  const { locale } = useRouter();
  
  return {
    t: (key) => {
      const keys = key.split('.');
      let value = messages[locale || 'id'];
      
      for (const k of keys) {
        value = value?.[k];
      }
      
      return value || key;
    },
    locale: locale || 'id',
  };
};

export default messages;
EOF

# Create environment example
cat > .env.example << 'EOF'
# sampattinaya Environment Variables

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=sampattinaya

# API Configuration  
NEXT_PUBLIC_API_URL=http://localhost:3000/api

# Feature Flags
NEXT_PUBLIC_ENABLE_CHAT=true
NEXT_PUBLIC_ENABLE_ANALYTICS=false

# Database (if needed later)
# DATABASE_URL=

# Authentication (if needed later)
# NEXTAUTH_URL=http://localhost:3000
# NEXTAUTH_SECRET=

# External APIs (if needed later)
# OPENAI_API_KEY=
EOF

# Create basic _app.js
cat > pages/_app.js << 'EOF'
import '../src/styles/globals.css';

function FinWiseApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default FinWiseApp;
EOF

# Create _document.js for custom HTML structure
cat > pages/_document.js << 'EOF'
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="id" className="dark">
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Albert+Sans:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
EOF

# Create utils
cat > src/lib/utils.js << 'EOF'
import { clsx } from "clsx";

// For Tailwind 4, we might not need twMerge, but keeping for compatibility
export function cn(...inputs) {
  return clsx(inputs);
}

export const FINWISE_COLORS = {
  accent: '#15C26B',
  darkBg: '#0F1413',
  darkMuted: '#1B2421',
  darkText: '#E6F0EC',
  lightBg: '#FFFFFF', 
  lightMuted: '#F3F5F4',
  lightText: '#0C1010',
};

export const FINWISE_THEME = {
  colors: FINWISE_COLORS,
  spacing: {
    18: '4.5rem',
    22: '5.5rem',
    88: '22rem',
    96: '24rem',
  },
  radius: {
    sampattinaya: '0.75rem',
  },
  shadows: {
    sampattinaya: '0 8px 28px rgba(0, 0, 0, 0.25)',
    finwiseDark: '0 8px 28px rgba(0, 0, 0, 0.5)',
  },
};

export const formatCurrency = (amount, locale = 'id-ID') => {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: locale === 'id-ID' ? 'IDR' : 'USD',
  }).format(amount);
};

export const formatNumber = (num, locale = 'id-ID') => {
  return new Intl.NumberFormat(locale).format(num);
};

export const truncateText = (text, maxLength = 100) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
};

export const slugify = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};
EOF

echo "📦 Creating component imports reference..."

# Create a components index file for easier imports
cat > src/components/index.js << 'EOF'
// Layout Components
export { default as Layout } from './layout/Layout';
export { default as Navbar } from './layout/Navbar';
export { default as Footer } from './layout/Footer';

// Section Components
export { default as Hero } from './sections/Hero';
export { default as ImpactMetrics } from './sections/ImpactMetrics';
export { default as Sponsors } from './sections/Sponsors';
export { default as About } from './sections/About';
export { default as PreviewVideo } from './sections/PreviewVideo';
export { default as Features } from './sections/Features';
export { default as ProblemsAndSolutions } from './sections/ProblemsAndSolutions';
export { default as Testimonials } from './sections/Testimonials';
export { default as News } from './sections/News';
export { default as FAQ } from './sections/FAQ';
export { default as FloatingChat } from './sections/FloatingChat';

// Leaderboard Components
export { default as LeaderboardHero } from './sections/LeaderboardHero';
export { default as Top3Highlight } from './sections/Top3Highlight';
export { default as Top10Table } from './sections/Top10Table';
export { default as UserPosition } from './sections/UserPosition';

// News Components  
export { default as NewsHero } from './sections/NewsHero';
export { default as NewsCards } from './sections/NewsCards';

// Common Components
export { default as LanguageSwitcher } from './common/LanguageSwitcher';
export { default as ThemeToggle } from './common/ThemeToggle';
export { default as MobileMenu } from './common/MobileMenu';
export { default as ChatBot } from './common/ChatBot';
export { default as LoadingSpinner } from './common/LoadingSpinner';
EOF

echo "✅ Project structure created successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. cd into your project directory"
echo "2. Run this script: chmod +x setup-sampattinaya.sh && ./setup-sampattinaya.sh"
echo "3. Install Tailwind CSS 4 and dependencies:"
echo "   npm install @tailwindcss/postcss@next tailwindcss@next"
echo "4. Install shadcn/ui: npx shadcn@latest init"
echo "5. Install required shadcn components:"
echo "   npx shadcn@latest add button card badge separator accordion dialog"
echo "   npx shadcn@latest add aspect-ratio scroll-area avatar textarea dropdown-menu"
echo "   npx shadcn@latest add tabs table progress switch"
echo "6. Install additional dependencies:"
echo "   npm install lucide-react clsx"
echo "7. Run development server: npm run dev"
echo ""
echo "🎯 Project structure follows sampattinaya brief specifications:"
echo "   ✅ Next.js 15 with pages router"
echo "   ✅ No TypeScript"
echo "   ✅ src/ directory structure" 
echo "   ✅ Tailwind CSS 4 with @theme directive"
echo "   ✅ shadcn/ui components structure"
echo "   ✅ i18n setup (ID/EN)"
echo "   ✅ Dark/Light theme support"
echo "   ✅ All page routes (/,/leaderboard,/news)"
echo "   ✅ All section components"
echo "   ✅ sampattinaya design system (#15C26B accent)"
echo "   ✅ Custom utilities and components"
echo ""
echo "🎨 Tailwind 4 Features Included:"
echo "   ✅ @theme directive configuration"
echo "   ✅ Custom CSS properties for design tokens"
echo "   ✅ Dark/Light mode support"
echo "   ✅ sampattinaya brand colors and gradients"
echo "   ✅ Custom utility classes"
echo "   ✅ shadcn/ui compatible color system"
echo ""
echo "🚀 Happy coding with sampattinaya!"