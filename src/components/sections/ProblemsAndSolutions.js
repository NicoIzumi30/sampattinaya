import React, { useState, useEffect } from 'react';

const ProblemsAndSolutions = ({ language = 'id' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Content for different languages
  const content = {
    id: {
      title: 'Masalah Umum, Solusi Praktis',
      subtitle: 'Kami mengatasi hambatan yang paling sering ditemui dalam pengelolaan keuangan',
      description: 'Dari masalah sehari-hari hingga solusi yang terbukti efektif untuk meningkatkan kesehatan finansial Anda.',
      problems: [
        {
          title: 'Budget Tidak Terstruktur',
          description: 'Sulit mengatur keuangan karena tidak ada sistem budgeting yang jelas.',
          solution: {
            title: 'Simulasi Budget 50/30/20',
            description: 'Kalkulator budget otomatis yang membagi penghasilan: 50% kebutuhan, 30% keinginan, 20% tabungan.',
            details: 'Dashboard menyediakan simulasi budget interaktif yang menghitung pembagian ideal penghasilan Anda. Dilengkapi dengan tracking progress, rekomendasi penyesuaian, dan analisis pengeluaran bulanan untuk membantu mencapai keseimbangan keuangan yang optimal.'
          }
        },
        {
          title: 'Kurang Pemahaman Finansial',
          description: 'Tidak tahu dari mana mulai belajar tentang pengelolaan keuangan yang benar.',
          solution: {
            title: 'Modul Pembelajaran Terstruktur',
            description: '12 modul pembelajaran dari pemula hingga mahir dengan progress tracking dan kuis interaktif.',
            details: 'Platform menyediakan learning path yang terstruktur mulai dari literasi finansial dasar hingga investasi lanjutan. Setiap modul dilengkapi video, artikel, dan kuis untuk mengukur pemahaman. Progress Anda akan tertrack secara real-time dengan sistem poin dan badge achievement.'
          }
        },
        {
          title: 'Butuh Konsultasi Keuangan',
          description: 'Perlu bantuan personal tapi tidak tahu harus bertanya ke siapa tentang keuangan.',
          solution: {
            title: 'AI Chat Assistant 24/7',
            description: 'Konsultasi keuangan personal dengan AI yang tersedia kapan saja untuk menjawab pertanyaan Anda.',
            details: 'AI Assistant telah dilatih dengan pengetahuan finansial yang comprehensive dan dapat memberikan saran personal sesuai kondisi keuangan Anda. Dilengkapi dengan chat history untuk melanjutkan diskusi sebelumnya dan kemampuan memahami konteks percakapan yang kompleks.'
          }
        },
        {
          title: 'Tidak Ada Motivasi Belajar',
          description: 'Sulit konsisten belajar keuangan karena tidak ada tracking progress yang jelas.',
          solution: {
            title: 'Gamifikasi & Progress Tracking',
            description: 'Sistem poin, achievement, dan leaderboard untuk memotivasi pembelajaran berkelanjutan.',
            details: 'Dashboard menyediakan sistem gamifikasi lengkap dengan total skor, progress bar untuk setiap modul, badge achievement, dan recent activities tracking. Anda dapat melihat perkembangan dari waktu ke waktu dan berkompetisi secara sehat dengan pengguna lain.'
          }
        }
      ]
    },
    en: {
      title: 'Common Problems, Practical Solutions',
      subtitle: 'We address the most common obstacles in financial management',
      description: 'From daily problems to proven effective solutions for improving your financial health.',
      problems: [
        {
          title: 'Running Out of Money',
          description: 'Uncontrolled spending and no clear budget plan.',
          solution: {
            title: 'Automatic Expense Control',
            description: 'Budget simulation to see where your money flows and how to control it.',
            details: 'With this feature, you can track every expense in real-time, categorize expenses by priority, and get notifications when budget is almost depleted. The system will provide automatic recommendations to optimize your monthly expenses.'
          }
        },
        {
          title: 'Difficulty Saving',
          description: 'Always have reasons not to set aside money for savings or emergency fund.',
          solution: {
            title: 'Realistic Savings Plan',
            description: 'Goal planner that calculates saving capacity according to actual financial condition.',
            details: 'This feature will analyze your income and routine expenses, then provide realistic saving amount suggestions. Complete with small achievable targets and reward system to motivate saving consistency.'
          }
        },
        {
          title: 'Unknown Safe Investments',
          description: 'Afraid to invest because unsure how to distinguish legal from fraudulent investments.',
          solution: {
            title: 'Safe Investment Education',
            description: 'Legal investment database and how to check legality before investing.',
            details: 'Platform provides complete database of OJK-registered investments, step-by-step guide to start investing, risk assessment tool, and investment simulator for practice without risk of losing real money.'
          }
        },
        {
          title: 'Trapped in Installments',
          description: 'Have many installments and BNPL that make finances increasingly tight.',
          solution: {
            title: 'Installment Risk Calculator',
            description: 'Tool to calculate total installments and payment capacity before taking credit.',
            details: 'This tool will help you calculate debt-to-income ratio, provide warnings if installments exceed 30% of income, and give strategies to pay off installments effectively through debt snowball or avalanche method.'
          }
        }
      ]
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

    const element = document.getElementById('problems-solutions-section');
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
      id="problems-solutions-section" 
      className="py-20 lg:py-32 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <div className={`transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}>
            <h2 className="text-4xl lg:text-5xl font-bold leading-tight mb-6">
              {currentContent.title}
            </h2>
          </div>
          
          <p className={`text-xl mb-4 transition-all duration-700 delay-100 text-sampattinaya-accent
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.subtitle}
          </p>
          
          <p className={`text-lg max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 text-muted-foreground
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
          `}>
            {currentContent.description}
          </p>
        </div>

        {/* Problems Section - Card Layout 1 Row 2 Column */}
        <div className={`transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {currentContent.problems.map((problem, index) => (
              <div 
                key={index}
                className={`h-full p-6 rounded-2xl bg-[#171717] border border-[#404040] flex flex-col transition-all duration-300 hover:border-[#15C26B]/50
                  ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                `}
                style={{ transitionDelay: `${400 + index * 100}ms` }}
              >
                <h4 className="text-xl font-semibold mb-4 text-white">
                  {problem.title}
                </h4>
                
                <p className="text-gray-400 leading-relaxed mb-4 flex-1">
                  {problem.description}
                </p>
                
                <button
                  onClick={() => {
                    setSelectedProblem(problem);
                    setIsModalOpen(true);
                  }}
                  className="w-full mt-auto px-4 py-3 bg-black text-white font-semibold rounded-lg border border-white hover:bg-gray-900 transition-all duration-300"
                >
                  Lihat Solusi
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Modal for Solution Details */}
        {isModalOpen && selectedProblem && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-[#171717] border border-[#404040] rounded-2xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Solusi untuk: {selectedProblem.title}
                  </h3>
                  <h4 className="text-xl font-semibold text-[#15C26B]">
                    {selectedProblem.solution.title}
                  </h4>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors p-2"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              {/* Problem Description */}
              <div className="mb-6 p-4 bg-red-950/20 border border-red-800/30 rounded-lg">
                <h5 className="text-red-400 font-semibold mb-2">Masalah:</h5>
                <p className="text-gray-300 leading-relaxed">
                  {selectedProblem.description}
                </p>
              </div>
              
              {/* Solution Description */}
              <div className="mb-6 p-4 bg-[#15C26B]/10 border border-[#15C26B]/20 rounded-lg">
                <h5 className="text-[#15C26B] font-semibold mb-2">Solusi:</h5>
                <p className="text-gray-300 leading-relaxed mb-3">
                  {selectedProblem.solution.description}
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {selectedProblem.solution.details}
                </p>
              </div>
              
              <div className="flex justify-center">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-6 py-3 bg-[#404040] text-white rounded-lg hover:bg-[#505050] transition-all duration-300"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProblemsAndSolutions;