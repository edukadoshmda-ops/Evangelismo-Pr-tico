import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { getInitialTheme, applyTheme, Theme } from './theme';

interface BaseLayoutProps {
  children: React.ReactNode;
  hideHeaderFooter?: boolean;
}

export const BaseLayout: React.FC<BaseLayoutProps> = ({ children, hideHeaderFooter = false }) => {
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-300">
      {!hideHeaderFooter && <Navbar theme={theme} onToggleTheme={toggleTheme} />}
      <main className="flex-1 w-full">
        {children}
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
};
