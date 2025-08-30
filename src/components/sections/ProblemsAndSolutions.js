import React, { useState, useEffect } from 'react';

const ProblemsAndSolutions = ({ language = 'id' }) => {
  const [isVisible, setIsVisible] = useState(false);

  // Content for different languages
  const content = {
    id: {
      title: 'Masalah Umum, Solusi Praktis',
      subtitle: 'Kami mengatasi hambatan yang paling sering ditemui dalam pengelolaan keuangan',
      description: 'Dari masalah sehari-hari hingga solusi yang terbukti efektif untuk meningkatkan kesehatan finansial Anda.',
      problems: [
        {
          title: 'Uang Habis Sebelum Gajian',
          description: 'Pengeluaran tidak terkontrol dan tidak ada rencana budget yang jelas.'
        },
        {
          title: 'Sulit Menabung',
          description: 'Selalu ada alasan untuk tidak menyisihkan uang untuk tabungan atau dana darurat.'
        },
        {
          title: 'Tidak Tahu Investasi Aman',
          description: 'Takut investasi karena tidak paham cara membedakan yang legal dan penipuan.'
        },
        {
          title: 'Terjebak Cicilan',
          description: 'Punya banyak cicilan dan BNPL yang membuat keuangan semakin sesak.'
        }
      ],
      solutions: [
        {
          title: 'Kontrol Pengeluaran Otomatis',
          description: 'Simulasi budget untuk melihat kemana saja uang Anda mengalir dan cara mengontrolnya.'
        },
        {
          title: 'Rencana Tabungan Realistis',
          description: 'Goal planner yang menghitung kemampuan menabung sesuai kondisi finansial actual.'
        },
        {
          title: 'Edukasi Investasi Aman',
          description: 'Database investasi legal dan cara cek legalitas sebelum berinvestasi.'
        },
        {
          title: 'Kalkulator Risiko Cicilan',
          description: 'Alat untuk menghitung total cicilan dan kemampuan bayar sebelum mengambil kredit.'
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
          description: 'Uncontrolled spending and no clear budget plan.'
        },
        {
          title: 'Difficulty Saving',
          description: 'Always have reasons not to set aside money for savings or emergency fund.'
        },
        {
          title: 'Unknown Safe Investments',
          description: 'Afraid to invest because unsure how to distinguish legal from fraudulent investments.'
        },
        {
          title: 'Trapped in Installments',
          description: 'Have many installments and BNPL that make finances increasingly tight.'
        }
      ],
      solutions: [
        {
          title: 'Automatic Expense Control',
          description: 'Budget simulation to see where your money flows and how to control it.'
        },
        {
          title: 'Realistic Savings Plan',
          description: 'Goal planner that calculates saving capacity according to actual financial condition.'
        },
        {
          title: 'Safe Investment Education',
          description: 'Legal investment database and how to check legality before investing.'
        },
        {
          title: 'Installment Risk Calculator',
          description: 'Tool to calculate total installments and payment capacity before taking credit.'
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

        {/* Problems and Solutions Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* Problems Section */}
          <div className={`transition-all duration-700 delay-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-red-500">Masalah Umum</h3>
              <div className="w-16 h-1 bg-red-500 rounded"></div>
            </div>
            
            <div className="space-y-6">
              {currentContent.problems.map((problem, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg
                    bg-red-950/20 border-red-800/30 hover:border-red-700/50
                  `}
                >
                  <h4 className="text-lg font-semibold mb-3 text-red-500">
                    {problem.title}
                  </h4>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Solutions Section */}
          <div className={`transition-all duration-700 delay-500 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-2 text-sampattinaya-accent">Solusi Praktis</h3>
              <div className="w-16 h-1 bg-sampattinaya-accent rounded"></div>
            </div>
            
            <div className="space-y-6">
              {currentContent.solutions.map((solution, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-xl border transition-all duration-300 hover:shadow-lg
                    bg-green-950/20 border-green-800/30 hover:border-green-700/50
                  `}
                >
                  <h4 className="text-lg font-semibold mb-3 text-sampattinaya-accent">
                    {solution.title}
                  </h4>
                  
                  <p className="text-muted-foreground leading-relaxed">
                    {solution.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsAndSolutions;