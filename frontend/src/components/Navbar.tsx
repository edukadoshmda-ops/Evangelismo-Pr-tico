import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Sun, Moon, Menu, X, User, LogOut, Sparkles, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Theme } from '../core/theme';

interface NavbarProps {
  theme: Theme;
  onToggleTheme: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ theme, onToggleTheme }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/60 dark:border-slate-800/80 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 rounded-2xl overflow-hidden bg-[#001869] flex items-center justify-center shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform duration-200 shrink-0 border border-white/10">
            <img src="/pwa-192x192.png" alt="Logo Oficial Evangelismo Prático" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="font-heading font-bold text-xl sm:text-2xl tracking-tight text-slate-900 dark:text-white">
              Evangelismo <span className="text-teal-600 dark:text-teal-400">Prático</span>
            </span>
            <span className="block text-[11px] font-medium text-slate-500 dark:text-slate-400">
              Pr. Roberto Casas
            </span>
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/" className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Início
          </Link>
          <a href="/#trajetoria" className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Trajetória
          </a>
          <a href="/#metodo" className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            8 Respostas
          </a>
          <a href="/#contato" className="text-slate-600 dark:text-slate-300 hover:text-teal-600 dark:hover:text-teal-400 transition-colors">
            Contato
          </a>
        </nav>

        {/* Right Action Icons & Auth CTA */}
        <div className="hidden md:flex items-center gap-3">
          {/* PWA Install Button */}
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-pwa-install'))}
            aria-label="Instalar Aplicativo"
            title="Instalar Aplicativo no Smartphone ou PC"
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-400 hover:bg-teal-100 dark:hover:bg-teal-900/60 border border-teal-200/60 dark:border-teal-800/60 transition-all duration-200"
          >
            <Smartphone size={15} />
            <span>Instalar App</span>
          </button>

          {/* Theme Toggle Button */}
          <button
            onClick={onToggleTheme}
            aria-label="Alternar tema"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 dark:hover:text-amber-400 flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <Link
                to="/app"
                className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-sm font-semibold py-2.5 px-5 rounded-xl shadow-md shadow-teal-600/20 hover:scale-105 transition-all duration-200"
              >
                <Sparkles size={16} />
                Plataforma
              </Link>
              <button
                onClick={handleLogout}
                title="Sair"
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 flex items-center justify-center transition-all duration-200"
              >
                <LogOut size={17} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white text-sm font-semibold py-2.5 px-6 rounded-xl shadow-md shadow-teal-500/20 hover:scale-105 transition-all duration-200 active:scale-95"
            >
              <User size={16} />
              Entrar
            </Link>
          )}
        </div>

        {/* Mobile menu button */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={onToggleTheme}
            aria-label="Alternar tema"
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center"
          >
            {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          </button>
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center"
            aria-label="Abrir menu"
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-5 space-y-4">
          <nav className="flex flex-col gap-3 font-medium text-slate-600 dark:text-slate-300">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-teal-600 transition-colors"
            >
              Início
            </Link>
            <a
              href="/#trajetoria"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-teal-600 transition-colors"
            >
              Trajetória
            </a>
            <a
              href="/#metodo"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-teal-600 transition-colors"
            >
              8 Respostas Bíblicas
            </a>
            <a
              href="/#contato"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 hover:text-teal-600 transition-colors"
            >
              Contato
            </a>
          </nav>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                window.dispatchEvent(new CustomEvent('open-pwa-install'));
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 font-semibold text-xs border border-teal-200/60 dark:border-teal-800/60"
            >
              <Smartphone size={16} />
              Instalar Aplicativo (PWA)
            </button>

            {user ? (
              <div className="space-y-2">
                <Link
                  to="/app"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-teal-600 text-white font-semibold shadow-md"
                >
                  <Sparkles size={18} />
                  Acessar Plataforma
                </Link>
                <button
                  onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/50 text-rose-600 dark:text-rose-400 font-semibold"
                >
                  <LogOut size={16} /> Sair
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-teal-600 text-white font-semibold shadow-md shadow-teal-500/20"
              >
                <User size={18} />
                Entrar / Criar Conta
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
