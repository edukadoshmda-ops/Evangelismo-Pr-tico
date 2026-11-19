import React, { useState } from 'react';
import {
  FileText,
  Download,
  ExternalLink,
  BookOpen,
  Compass,
  Users,
  Layers,
  CheckCircle2,
  Sparkles,
  Clock,
  Target,
} from 'lucide-react';

const PDF_URL = '/Visao_Crescimento_Igreja_Completo.pdf';

type ViewMode = 'pdf' | 'resumo';

const BLOCOS_PDF = [
  {
    paginas: 'Páginas 1 a 9',
    titulo: 'Trilhos de Ensino da Escada do Sucesso',
    cor: 'from-teal-600 to-emerald-600',
    borda: 'border-teal-500/30',
    itens: [
      'Visão Apostólica: Gerar e enviar líderes — Células: o coração (onde tudo acontece e se multiplica)',
      'Apóstolo: toca em todos os trilhos (direção, cobertura e alinhamento)',
      '4 Degraus: 1. Ganhar (Evangelista) • 2. Consolidar (Pastor) • 3. Discipular (Mestre) • 4. Enviar (Profeta)',
      'Estrutura Ministerial da Célula Apostólica, Anexos I, II e IV (Árvore de Multiplicação em 3 Pernas)',
      'Roteiro de 1 hora da Célula, Regra dos 12, Cronograma em 5 Fases e Discipulado Coletivo vs. Individual',
    ],
  },
  {
    paginas: 'Páginas 10 e 11',
    titulo: 'Planejamento — Visão Apostólica & Célula',
    cor: 'from-amber-500 to-orange-600',
    borda: 'border-amber-500/30',
    itens: [
      '1. Visão Apostólica (Efésios 4:11-12) e 2. Missão (Mateus 28:19)',
      'Escada Ministerial: 1º Ganhar (Evangelista) • 2º Consolidar (Pastor/Batismo) • 3º Treinar (Mestre) • 4º Enviar (Profetas)',
      '3. Currículo Apostólico: 1. Evangelismo • 2. Consolidação/Pastor • 3. Crescimento Espiritual/Mestre • 4. Dons/Oração/Profeta',
      'Funcionamento da Célula Apostólica: 30 minutos Líder com todos | 30 minutos 3 Líderes com seus liderados',
      'Célula Apostólica & DNA — Conexão com Culto, Rede, E.A.D., Oração, Ministérios, Escolas e Testemunho',
    ],
  },
  {
    paginas: 'Páginas 12 a 14',
    titulo: 'Apostila de Planejamento Estratégico (Texto Integral)',
    cor: 'from-indigo-600 to-sky-600',
    borda: 'border-indigo-500/30',
    itens: [
      '1. Planejamento Estratégico • 2. Ciclo do Planejamento Estratégico • 3. Ferramentas Estratégicas',
      '4. Construção da Missão (Propósito) • 5. Construção da Visão (Futuro) • 6. Construção dos Valores (Conduta)',
      '7. Canvas Estratégico (9 blocos integrados) • 8. Análise SWOT (FOFA)',
      '9. Ferramenta 5W2H • 10. Mapa da Empatia • 11. Considerações Finais',
    ],
  },
];

export const VisaoApostolicaCelularView: React.FC = () => {
  const [viewMode, setViewMode] = useState<ViewMode>('pdf');

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Cabeçalho Principal */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/90 dark:border-slate-800 shadow-xl relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-500/15 border border-teal-200 dark:border-teal-400/30 text-teal-700 dark:text-teal-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-500" />
              Material Oficial Completo • 14 Páginas
            </div>
            <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
              VISÃO APOSTÓLICA &amp; CÉLULAR
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Documento unificado com os <strong>Trilhos da Escada do Sucesso</strong>, o{' '}
              <strong>Planejamento da Célula Apostólica</strong> (30 min líder com todos + 30 min 3 líderes com seus liderados) e a{' '}
              <strong>Apostila de Planejamento Estratégico</strong> na íntegra.
            </p>
          </div>

          {/* Botões de Ação */}
          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={PDF_URL}
              download="Visao_Crescimento_Igreja_Completo.pdf"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold text-sm shadow-lg shadow-teal-500/20 transition-all hover:scale-[1.02]"
            >
              <Download size={18} />
              Baixar PDF (14 pág.)
            </a>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-sm border border-slate-200 dark:border-slate-700 transition-all"
            >
              <ExternalLink size={17} />
              Abrir em Nova Aba
            </a>
          </div>
        </div>

        {/* Seletor de Visualização */}
        <div className="mt-6 pt-5 border-t border-slate-200/80 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => setViewMode('pdf')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'pdf'
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <FileText size={16} />
              Leitor do PDF Completo
            </button>
            <button
              onClick={() => setViewMode('resumo')}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                viewMode === 'resumo'
                  ? 'bg-white dark:bg-slate-900 text-teal-700 dark:text-teal-300 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Layers size={16} />
              Estrutura &amp; Conteúdo (14 Páginas)
            </button>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 dark:text-slate-400">
            <span className="inline-flex items-center gap-1.5">
              <Compass size={14} className="text-teal-500" /> 5 Ministérios
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock size={14} className="text-amber-500" /> Célula 1h (30+30 min)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Users size={14} className="text-emerald-500" /> Regra dos 12
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Target size={14} className="text-indigo-500" /> Planejamento Estratégico
            </span>
          </div>
        </div>
      </div>

      {/* Área de Conteúdo */}
      {viewMode === 'pdf' ? (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200/90 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200/80 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span className="font-medium flex items-center gap-2">
              <BookOpen size={15} className="text-teal-600 dark:text-teal-400" />
              Visao_Crescimento_Igreja_Completo.pdf
            </span>
            <span>Use os controles acima para baixar ou abrir em tela cheia</span>
          </div>
          <div className="w-full h-[78vh] min-h-[620px] bg-slate-100 dark:bg-slate-950">
            <iframe
              src={`${PDF_URL}#view=FitH`}
              title="PDF Visão Apostólica e Célular"
              className="w-full h-full border-0"
            />
          </div>
          <div className="p-4 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <span>
              No celular ou caso o navegador não exiba o PDF embutido, utilize o botão ao lado para abrir diretamente.
            </span>
            <a
              href={PDF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold transition-colors"
            >
              <ExternalLink size={14} /> Abrir PDF no Navegador
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6">
          {BLOCOS_PDF.map((bloco) => (
            <div
              key={bloco.titulo}
              className={`bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-7 border ${bloco.borda} shadow-lg space-y-4`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-full bg-gradient-to-r ${bloco.cor} text-white text-xs font-bold`}
                  >
                    {bloco.paginas}
                  </span>
                  <h2 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white">
                    {bloco.titulo}
                  </h2>
                </div>
              </div>

              <ul className="space-y-2.5">
                {bloco.itens.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300"
                  >
                    <CheckCircle2 size={17} className="text-teal-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
