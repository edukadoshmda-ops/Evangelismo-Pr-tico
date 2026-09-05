import React, { useState, useEffect } from 'react';
import { 
  Users, BookOpen, Headphones, Award, Sparkles, 
  Clock, TrendingUp, ArrowUpRight, CheckCircle2 
} from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip } from 'recharts';
import { TabType } from '../AppSidebar';
import { TRACKS } from '../AudioPlayer';
import { getAppLiveMetrics, AppMetrics } from '../../utils/appMetrics';

interface DashboardViewProps {
  onNavigate: (tab: TabType) => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({ onNavigate }) => {
  const [metrics, setMetrics] = useState<AppMetrics>(getAppLiveMetrics);

  useEffect(() => {
    const handleUpdate = () => {
      setMetrics(getAppLiveMetrics());
    };

    window.addEventListener('app-metrics-updated', handleUpdate);
    window.addEventListener('storage', handleUpdate);
    return () => {
      window.removeEventListener('app-metrics-updated', handleUpdate);
      window.removeEventListener('storage', handleUpdate);
    };
  }, []);

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Banner */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-10 text-slate-900 dark:text-white shadow-xl relative overflow-hidden border border-slate-200/90 dark:border-teal-500/20">
        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/20 border border-teal-200 dark:border-teal-400/30 text-teal-700 dark:text-teal-300 text-xs font-semibold">
            <Sparkles size={14} className="text-amber-500 dark:text-amber-400" />
            Visão Geral Ministerial
          </div>
          <h1 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
            Painel de Controle <span className="text-gradient">Evangelismo Prático</span>
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Acompanhe em tempo real o crescimento dos seus discípulos, o avanço nos estudos bíblicos, o tempo de áudio ouvido e gerencie as planilhas do IDE.
          </p>
          <div className="pt-2 flex flex-wrap gap-3">
            <button
              onClick={() => onNavigate('audiobook')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-teal-600 hover:from-amber-600 hover:to-teal-700 text-white font-semibold text-xs sm:text-sm shadow-md transition-all hover:scale-105"
            >
              <Headphones size={16} /> Ouvir Audiobook
            </button>
            <button
              onClick={() => onNavigate('relatorios')}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 text-slate-800 dark:text-white font-medium text-xs sm:text-sm border border-slate-300 dark:border-white/15 transition-all"
            >
              <Users size={16} /> Abrir Planilhas IDE
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Dinâmicos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-teal-600 dark:text-teal-400">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Discípulos Ativos</span>
            <Users size={20} />
          </div>
          <h3 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">{metrics.discipulosAtivos}</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-semibold">
            <TrendingUp size={14} /> +{metrics.crescimentoMes}% este mês
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-amber-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Estudos Concluídos</span>
            <BookOpen size={20} />
          </div>
          <h3 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">{metrics.estudosConcluidos}</h3>
          <p className="text-xs text-slate-400">Estudos & Playbooks concluídos</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-emerald-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Decisões por Cristo</span>
            <Award size={20} />
          </div>
          <h3 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">{metrics.decisoesPorCristo}</h3>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{metrics.taxaRetencao}% de retenção</p>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-2">
          <div className="flex items-center justify-between text-sky-500">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Tempo de Áudio Ouvido</span>
            <Clock size={20} />
          </div>
          <h3 className="font-heading font-bold text-3xl text-slate-900 dark:text-white">{metrics.horasOuvidasFormatada}</h3>
          <p className="text-xs text-slate-400">{TRACKS.length} faixas disponíveis</p>
        </div>
      </div>

      {/* Chart Section */}
      <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white">
              Crescimento de Evangelizações e Discipulado
            </h3>
            <p className="text-xs text-slate-400">Evolução em tempo real de vidas alcançadas e formadas</p>
          </div>
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
            Ano 2026
          </span>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={metrics.chartData}>
              <defs>
                <linearGradient id="colorEvang" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0D9488" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#0D9488" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorDisc" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.4}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="mes" stroke="#94A3B8" fontSize={12} />
              <YAxis stroke="#94A3B8" fontSize={12} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1E293B',
                  borderRadius: '16px',
                  border: 'none',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Area type="monotone" dataKey="evangelizados" name="Vidas Evangelizadas" stroke="#0D9488" strokeWidth={3} fillOpacity={1} fill="url(#colorEvang)" />
              <Area type="monotone" dataKey="discipulos" name="Discípulos em Formação" stroke="#D4AF37" strokeWidth={3} fillOpacity={1} fill="url(#colorDisc)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick Access Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          onClick={() => onNavigate('playbook')}
          className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-teal-500 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
            <BookOpen size={20} />
          </div>
          <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors flex items-center justify-between">
            Play Book de Campo <ArrowUpRight size={18} />
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Consulte o roteiro completo das 8 respostas bíblicas, quebra de objeções e oração de entrega.
          </p>
        </div>

        <div
          onClick={() => onNavigate('videos')}
          className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-teal-500 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <CheckCircle2 size={20} />
          </div>
          <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors flex items-center justify-between">
            Aulas em Vídeo <ArrowUpRight size={18} />
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Assista às aulas práticas e treinamentos gravados pelo Pr. Roberto Casas.
          </p>
        </div>

        <div
          onClick={() => onNavigate('testemunhos')}
          className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 hover:border-teal-500 transition-all cursor-pointer group space-y-3"
        >
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
            <Sparkles size={20} />
          </div>
          <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors flex items-center justify-between">
            Mural de Testemunhos <ArrowUpRight size={18} />
          </h4>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Veja relatos inspiradores de decisões, batismos e experiências missionárias.
          </p>
        </div>
      </div>
    </div>
  );
};
