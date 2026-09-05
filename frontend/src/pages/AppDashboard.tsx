import React, { useState } from 'react';
import { AppSidebar, TabType } from '../components/AppSidebar';
import { DashboardView } from '../components/views/DashboardView';
import { AudioBookView } from '../components/views/AudioBookView';
import { PlayBookView } from '../components/views/PlayBookView';
import { VideosView } from '../components/views/VideosView';
import { TestemunhosView } from '../components/views/TestemunhosView';
import { ProjetosView } from '../components/views/ProjetosView';
import { ConferenciaView } from '../components/views/ConferenciaView';
import { RelatoriosView } from '../components/views/RelatoriosView';
import { Menu, Sun, Moon } from 'lucide-react';
import { getInitialTheme, applyTheme, Theme } from '../core/theme';

export const AppDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    applyTheme(next);
  };

  return (
    <div className="min-h-screen flex bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 transition-colors duration-300">
      
      {/* Sidebar Navigation */}
      <AppSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <header className="h-20 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
              aria-label="Abrir Menu"
            >
              <Menu size={20} />
            </button>

            <div>
              <span className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider">
                Plataforma Evangelismo Prático
              </span>
              <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white capitalize">
                {activeTab === 'dashboard' && 'Painel Dashboard'}
                {activeTab === 'audiobook' && 'Audio Book & Estudos'}
                {activeTab === 'playbook' && 'Play Book de Campo'}
                {activeTab === 'videos' && 'Vídeos & Treinamentos'}
                {activeTab === 'testemunhos' && 'Mural de Testemunhos'}
                {activeTab === 'projetos' && 'Projetos Missionários'}
                {activeTab === 'conferencia' && 'Conferência Evangelismo Prático'}
                {activeTab === 'relatorios' && 'Relatórios e Planilhas IDE'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-500 flex items-center justify-center transition-all hover:scale-105"
              title="Alternar Tema"
            >
              {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
            </button>
          </div>
        </header>

        {/* Dynamic View Body */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
          {activeTab === 'dashboard' && <DashboardView onNavigate={setActiveTab} />}
          {activeTab === 'audiobook' && <AudioBookView />}
          {activeTab === 'playbook' && <PlayBookView />}
          {activeTab === 'videos' && <VideosView />}
          {activeTab === 'testemunhos' && <TestemunhosView />}
          {activeTab === 'projetos' && <ProjetosView />}
          {activeTab === 'conferencia' && <ConferenciaView />}
          {activeTab === 'relatorios' && <RelatoriosView />}
        </main>

      </div>
    </div>
  );
};
