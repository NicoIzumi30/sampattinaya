import React from 'react';

const CTA = ({ language = 'id' }) => {
  const content = {
    id: {
      headline: 'Siap memulai perjalanan finansial Anda?',
      description: 'Bergabunglah dengan ribuan pengguna yang telah meningkatkan literasi finansial mereka.',
      button: 'Mulai Sekarang'
    },
    en: {
      headline: 'Ready to start your financial journey?',
      description: 'Join thousands of users who have improved their financial literacy.',
      button: 'Get Started'
    }
  };

  const currentContent = content[language] || content.id;

  return (
    <section className={`
      py-16 lg:py-24 px-4 sm:px-6 lg:px-8 max-w-screen-xl mx-auto
      relative overflow-hidden
    `}>
      {/* Background Pattern */}
      <div className="relative text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          {currentContent.headline}
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          {currentContent.description}
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="px-8 py-3 bg-sampattinaya-accent text-white font-medium rounded-lg hover:opacity-90 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg">
            {currentContent.button}
          </button>
        </div>
      </div>
    </section>
  );
};

export default CTA;