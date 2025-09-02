import React, { useState } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const MainLayout = ({ children, language = 'id', onLanguageChange }) => {
  const [currentLanguage, setCurrentLanguage] = useState(language);

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
    if (onLanguageChange) {
      onLanguageChange(newLanguage);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar language={currentLanguage} onLanguageChange={handleLanguageChange} />
      <main className="flex-grow pt-16">{children}</main>
      <Footer language={currentLanguage} />
    </div>
  );
};

export default MainLayout;