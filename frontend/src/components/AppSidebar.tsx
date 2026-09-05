import React from 'react';
import { 
  LayoutDashboard, Headphones, BookOpen, Video, 
  MessageSquareQuote, Globe2, FileSpreadsheet, 
  LogOut, ExternalLink, ChevronLeft, ChevronRight, Flame,
  Smartphone
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { TRACKS } from './AudioPlayer';

export type TabType = 
  | 'dashboard' 
  | 'audiobook' 
  | 'playbook' 
  | 'videos' 
  | 'testemunhos' 
  | 'projetos' 
  | 'relatorios'
  | 'conferencia';

interface AppSidebarProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export const AppSidebar: React.FC<AppSidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
}) => {
  const { user, logout } = useAuth();

  const menuItems = [
    {
      id: 'dashboard' as TabType,
      label: 'Painel Dashboard',
      icon: LayoutDashboard,
      badge: 'Geral',
    },
    {
      id: 'audiobook' as TabType,
      label: 'Audio Book',
      icon: Headphones,
      badge: `${TRACKS.length} Faixas`,
    },
    {
      id: 'playbook' as TabType,
      label: 'Play Book',
      icon: BookOpen,
      badge: 'Roteiros',
    },
    {
      id: 'videos' as TabType,
      label: 'Vídeos',
      icon: Video,
      badge: 'Aulas',
    },
    {
      id: 'testemunhos' as TabType,
      label: 'Testemunhos',
      icon: MessageSquareQuote,
      badge: 'Mural',
    },
    {
      id: 'projetos' as TabType,
      label: 'Projetos',
      icon: Globe2,
      badge: 'Missões',
    },
    {
      id: 'conferencia' as TabType,
      label: 'Conferência Evangelismo',
      icon: Flame,
      badge: 'Agendar',
    },
    {
      id: 'relatorios' as TabType,
      label: 'Relatórios',
      icon: FileSpreadsheet,
      badge: 'Planilhas IDE',
    },
  ];

  const handleSelect = (id: TabType) => {
    setActiveTab(id);
    if (mobileOpen) setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm z-40 lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 flex flex-col justify-between bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 ${
          collapsed ? 'w-20' : 'w-72'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Header / Brand */}
        <div>
          <div className="h-20 px-4 flex items-center justify-between border-b border-slate-200/80 dark:border-slate-800">
            <Link to="/" className="flex items-center gap-3 overflow-hidden group">
              <div className="w-11 h-11 rounded-2xl overflow-hidden shadow-md shadow-teal-500/20 group-hover:scale-105 transition-transform bg-[#001869] shrink-0 border border-white/10 flex items-center justify-center">
                <img src="/pwa-192x192.png" alt="Logo Oficial Evangelismo Prático" className="w-full h-full object-cover" />
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <h2 className="font-heading font-bold text-base truncate leading-tight text-slate-900 dark:text-white">
                    Evangelismo <span className="text-teal-600 dark:text-teal-400">Prático</span>
                  </h2>
                  <p className="text-[11px] text-slate-400 truncate">Pr. Roberto Casas</p>
                </div>
              )}
            </Link>

            <button
              onClick={() => setCollapsed(!collapsed)}
              className="hidden lg:flex w-8 h-8 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-teal-600 items-center justify-center transition-colors"
              title={collapsed ? 'Expandir Menu' : 'Recolher Menu'}
            >
              {collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
            </button>
          </div>

          {/* Navigation Links */}
          <div className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-170px)]">
            {menuItems.map((item) => {
              const IconComp = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  title={collapsed ? item.label : undefined}
                  className={`w-full flex items-center gap-3.5 px-3.5 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 group relative ${
                    isActive
                      ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md shadow-teal-600/20 scale-[1.02]'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800/70 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <IconComp
                    size={20}
                    className={`shrink-0 transition-transform group-hover:scale-110 ${
                      isActive ? 'text-white' : 'text-slate-400 dark:text-slate-400 group-hover:text-teal-500'
                    }`}
                  />
                  {!collapsed && (
                    <div className="flex-1 flex items-center justify-between text-left truncate">
                      <span className="truncate">{item.label}</span>
                      {item.badge && (
                        <span
                          className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider shrink-0 ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover:bg-teal-50 dark:group-hover:bg-teal-950/60 group-hover:text-teal-600'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Bottom User & Actions Section */}
        <div className="p-3 border-t border-slate-200 dark:border-slate-800 space-y-2">
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('open-pwa-install'))}
            className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-teal-700 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 dark:hover:bg-teal-900/60 transition-colors"
            title="Instalar Aplicativo no Smartphone ou Computador"
          >
            <Smartphone size={16} className="shrink-0 text-teal-600 dark:text-teal-400" />
            {!collapsed && <span className="truncate">Instalar Aplicativo</span>}
          </button>

          <Link
            to="/"
            className="w-full flex items-center gap-3 px-3.5 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <ExternalLink size={16} className="shrink-0" />
            {!collapsed && <span className="truncate">Ver Apresentação</span>}
          </Link>

          <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center font-bold text-xs shrink-0">
                {user?.name ? user.name[0].toUpperCase() : 'U'}
              </div>
              {!collapsed && (
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-white truncate">
                    {user?.name || 'Discípulo'}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                </div>
              )}
            </div>

            <button
              onClick={logout}
              title="Sair"
              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors shrink-0"
            >
              <LogOut size={16} />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
