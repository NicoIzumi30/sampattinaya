
# SampattiNaya - Financial Literacy Platform

[![Live Demo](https://img.shields.io/badge/-Live%20Demo-blue?style=for-the-badge)](https://sampattinaya.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15.5.0-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-18-blue?style=for-the-badge&logo=react)](https://reactjs.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3-38b2ac?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com)

> **Live Demo**: [https://sampattinaya.vercel.app/](https://sampattinaya.vercel.app/)

---

## 📑 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Development](#development)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgments](#acknowledgments)
- [Support](#support)

---

## 📖 About

**SampattiNaya** adalah platform pembelajaran literasi finansial modern yang membantu Anda mengelola keuangan dengan lebih baik. Dengan pendekatan interaktif dan desain yang user-friendly, platform ini menyediakan simulasi, kuis, dan panduan praktis untuk meningkatkan pemahaman finansial Anda.

**SampattiNaya** is a modern financial literacy learning platform that helps you manage your finances better. With an interactive approach and user-friendly design, this platform provides simulations, quizzes, and practical guides to improve your financial understanding.

### 🎯 Target Audience
- **Students** - Learn basic financial concepts  
- **Young Professionals** - Build financial planning skills  
- **Parents** - Manage family finances  
- **Small Business Owners** - Improve business financial literacy  

---

## 🚀 Features

### 🌐 Multi-Language Support
- Bahasa Indonesia - Full localization  
- English - Complete English version  
- Easy language switch anytime  

### 📚 Learning Modules
- Interactive Lessons - Engaging financial education  
- Budget Simulations - Practice with virtual scenarios  
- Goal Planner - Set and track financial targets  
- Anti-Scam Checker - Identify financial risks  

### 🎮 Gamification
- Leaderboard System - Compete with other learners  
- Achievement System - Earn points and badges  
- Progress Tracking - Monitor your learning journey  
- Interactive Quizzes - Test your knowledge  

### 🤖 AI-Powered Features
- AI Mentor - Personal financial assistant  
- Smart Recommendations - Tailored to your progress  
- Real-time Tips - Contextual financial advice  

### 🎨 Modern UI/UX
- Responsive Design - Works on all devices  
- Clean and intuitive interface  
- Fast Loading - Optimized performance  
- PWA Ready - Installable on mobile devices  

---

## 🛠 Tech Stack

### **Frontend**
- Next.js 15.5.0 - React framework for production  
- React 18 - UI library  
- Tailwind CSS - Utility-first CSS framework  
- Lucide Icons - SVG icon set  

### **UI Components**
- shadcn/ui - Reusable components  
- Radix UI - Accessible primitives  
- CSS Variables - Theming system  

### **Development Tools**
- npm / yarn - Package manager  
- ESLint - Code linting  
- TypeScript - Type checking  

### **Performance & SEO**
- Next.js Image - Optimized image loading  
- Static Generation - Pre-rendered pages  
- Core Web Vitals - Performance optimized  
- SEO Optimized - Meta tags & structured data  

---

## 📂 Project Structure

```bash
sampattinaya/
├── public/             # Static assets
│   ├── images/         # Images & graphics
│   ├── logo/           # Brand logos
│   └── data/           # JSON data files
├── pages/              # Next.js pages
│   ├── index.js        # Homepage
│   ├── _app.js         # App wrapper
│   ├── _document.js    # HTML document
│   ├── auth/           # Authentication pages
│   │   ├── login.js
│   │   └── register.js
│   ├── dashboard/      # Dashboard pages
│   │   ├── index.js
│   │   ├── kuis/
│   │   ├── learning/
│   │   └── simulasi.js
│   ├── leaderboard/    
│   ├── news/           
│   └── api/            # API routes
├── src/                # Source code
│   ├── components/     # Reusable components
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── sections/
│   │   └── common/
│   ├── hooks/          # Custom hooks
│   ├── lib/            # Utilities
│   ├── styles/         # Global styles
│   └── i18n/           # Internationalization
│       ├── en.json
│       └── id.json
├── tailwind.config.js
├── next.config.js
├── package.json
└── README.md
````

---

## ⚙️ Installation

### Prerequisites

* Node.js (>= 18)
* npm or yarn
* Git

### Steps

```bash
# 1. Clone repository
git clone https://github.com/your-username/sampattinaya.git
cd sampattinaya

# 2. Install dependencies
npm install
# or
yarn install

# 3. Setup environment
cp .env.example .env.local

# 4. Run development server
npm run dev
```

---

## 💻 Development

### Available Scripts

```bash
npm run dev        # Start dev server
npm run build      # Build for production
npm start          # Start production server
npm run lint       # Run ESLint
npm run export     # Export static site
```

### Guidelines

* Use **Tailwind CSS** for styling
* Create reusable components in `/src/components`
* Add translations in `/src/i18n`
* Follow mobile-first responsive design

---

## 🚢 Deployment

### Vercel (Recommended)

1. Connect your repo to Vercel
2. Deploy automatically on push to `main`
3. Manage env variables in Vercel dashboard

### Other Options

* Netlify
* AWS Amplify
* Railway
* Heroku

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push and open a PR

Commit convention:

* `feat:` new features
* `fix:` bug fixes
* `docs:` documentation
* `style:` formatting
* `refactor:` code changes
* `test:` add tests
* `chore:` maintenance

---

## 📜 License

This project is licensed under the **MIT License**. See [LICENSE](LICENSE) for details.

---

## 🙏 Acknowledgments

* UI Inspiration: Modern fintech apps
* Components: [shadcn/ui](https://ui.shadcn.com)
* Icons: [Lucide](https://lucide.dev)
* Design System: [Tailwind CSS](https://tailwindcss.com)

---

## 📬 Support

* **Email**: [info@sampattinaya.com](mailto:info@sampattinaya.com)
* **Website**: [sampattinaya.vercel.app](https://sampattinaya.vercel.app)
* **Issues**: [GitHub Issues](https://github.com/your-username/sampattinaya/issues)

---

<div align="center">

**Made with ❤️ for financial literacy**

[![Visit Demo](https://img.shields.io/badge/-Visit%20Demo-success?style=for-the-badge)](https://sampattinaya.vercel.app/)

</div>
```

---

