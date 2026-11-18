import React, { useState, useEffect } from 'react';
import { GitFork, CheckCircle2, Circle, Layers } from 'lucide-react';

interface FaseTransicao {
  id: string;
  fase: string;
  titulo: string;
  desc: string;
}

const FASES_TRANSICAO: FaseTransicao[] = [
  {
    id: 'f1',
    fase: 'Fase 1',
    titulo: 'Imersão da Liderança e Quebra de Paradigmas',
    desc: 'Seminários e séries bíblicas (Atos 5:42 — no templo e nas casas) para alinhar liderança principal, pastores, obreiros e departamentos no mesmo DNA.',
  },
  {
    id: 'f2',
    fase: 'Fase 2',
    titulo: 'Formação dos Primeiros 12 (Embrião)',
    desc: 'O Pastor Principal treina, cuida e discipula diretamente seus até 12 líderes, transmitindo Visão, Missão e caráter antes de abrir novas frentes.',
  },
  {
    id: 'f3',
    fase: 'Fase 3',
    titulo: 'Fase Piloto Interna',
    desc: 'Abertura das primeiras células com membros já existentes para ajustar o roteiro de 1h30, os registros e a cultura de pequenos grupos.',
  },
  {
    id: 'f4',
    fase: 'Fase 4',
    titulo: 'Alinhamento Templo + Casas',
    desc: 'O culto no templo torna-se a grande celebração e alinhamento da Visão; o cuidado pastoral próximo e o discipulado acontecem nas células e no 1 a 1.',
  },
  {
    id: 'f5',
    fase: 'Fase 5',
    titulo: 'Multiplicação Contínua (Regra dos 12)',
    desc: 'Sempre que uma célula atinge 12 pessoas, ela multiplica gerando novas células e novos líderes treinados para fazer discípulos de todas as nações.',
  },
];

export const ArvoreTransicaoView: React.FC = () => {
  const [doneFases, setDoneFases] = useState<string[]>(() => {
    const saved = localStorage.getItem('vc_fases_transicao_v1');
    return saved ? JSON.parse(saved) : ['f1'];
  });

  useEffect(() => {
    localStorage.setItem('vc_fases_transicao_v1', JSON.stringify(doneFases));
  }, [doneFases]);

  const toggleFase = (id: string) => {
    setDoneFases((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-teal-900 via-emerald-800 to-slate-900 text-white p-6 shadow-lg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-bold uppercase mb-2">
          <GitFork size={14} /> Anexo IV • Árvore de Multiplicação &amp; Transição
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold">
          Árvore de Multiplicação Ministerial &amp; Transição em 5 Fases
        </h1>
        <p className="text-emerald-100 text-sm mt-1">
          Toda a estrutura da igreja local treinada com a Visão e Missão para que todos os discípulos multipliquem dando muitos frutos.
        </p>
      </div>

      {/* Árvore SVG */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3">
          Modelo de Multiplicação em 3 Pernas (Crescimento até 12 por Líder)
        </h2>
        <div className="w-full overflow-x-auto">
          <svg viewBox="0 0 760 265" className="w-full max-w-3xl mx-auto h-auto" fontFamily="Segoe UI, Arial, sans-serif">
            <ellipse cx="380" cy="132" rx="295" ry="122" fill="#F8FAFC" stroke="#0F294A" strokeWidth="2.5" />
            <line x1="380" y1="212" x2="215" y2="132" stroke="#0F294A" strokeWidth="2.5" />
            <line x1="380" y1="212" x2="380" y2="132" stroke="#0F294A" strokeWidth="2.5" />
            <line x1="380" y1="212" x2="545" y2="132" stroke="#0F294A" strokeWidth="2.5" />

            <line x1="215" y1="132" x2="130" y2="58" stroke="#0D9488" strokeWidth="2" />
            <line x1="215" y1="132" x2="195" y2="58" stroke="#0D9488" strokeWidth="2" />
            <line x1="215" y1="132" x2="260" y2="58" stroke="#0D9488" strokeWidth="2" />
            <line x1="380" y1="132" x2="380" y2="58" stroke="#0D9488" strokeWidth="2" />
            <line x1="545" y1="132" x2="500" y2="58" stroke="#0D9488" strokeWidth="2" />
            <line x1="545" y1="132" x2="565" y2="58" stroke="#0D9488" strokeWidth="2" />
            <line x1="545" y1="132" x2="630" y2="58" stroke="#0D9488" strokeWidth="2" />

            <g fill="#0D9488" stroke="#065F46" strokeWidth="1.5">
              <circle cx="130" cy="58" r="22" /><circle cx="195" cy="58" r="22" /><circle cx="260" cy="58" r="22" />
              <circle cx="380" cy="58" r="22" />
              <circle cx="500" cy="58" r="22" /><circle cx="565" cy="58" r="22" /><circle cx="630" cy="58" r="22" />
            </g>
            <g fill="#FFFFFF" fontSize="8.5" fontWeight="700" textAnchor="middle">
              <text x="130" y="55">EQUIPE</text><text x="130" y="66">A1</text>
              <text x="195" y="55">EQUIPE</text><text x="195" y="66">A2</text>
              <text x="260" y="55">EQUIPE</text><text x="260" y="66">A3</text>
              <text x="380" y="55">EQUIPE</text><text x="380" y="66">B1</text>
              <text x="500" y="55">EQUIPE</text><text x="500" y="66">C1</text>
              <text x="565" y="55">EQUIPE</text><text x="565" y="66">C2</text>
              <text x="630" y="55">EQUIPE</text><text x="630" y="66">C3</text>
            </g>

            <g fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.2">
              <circle cx="215" cy="132" r="28" />
              <circle cx="380" cy="132" r="28" />
              <circle cx="545" cy="132" r="28" />
            </g>
            <g fill="#FFFFFF" fontSize="9.5" fontWeight="800" textAnchor="middle">
              <text x="215" y="136">DISCÍPULO</text>
              <text x="380" y="136">DISCÍPULO</text>
              <text x="545" y="136">DISCÍPULO</text>
            </g>

            <circle cx="380" cy="212" r="34" fill="#0F294A" stroke="#D97706" strokeWidth="3.2" />
            <text x="380" y="216" textAnchor="middle" fill="#FDE68A" fontSize="9" fontWeight="800">DISCIPULADOR</text>
          </svg>
        </div>
      </div>

      {/* Checklist das 5 Fases de Transição */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
          <div className="flex items-center gap-2">
            <Layers className="text-amber-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Cronograma de Transição da Igreja Local (5 Fases)
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-300 text-xs font-extrabold">
            {doneFases.length} / {FASES_TRANSICAO.length} Fases Concluídas
          </span>
        </div>

        <div className="space-y-3">
          {FASES_TRANSICAO.map((f) => {
            const checked = doneFases.includes(f.id);
            return (
              <div
                key={f.id}
                onClick={() => toggleFase(f.id)}
                className={`cursor-pointer rounded-xl border-2 p-4 transition-all flex items-start gap-3 ${
                  checked
                    ? 'border-emerald-500 bg-emerald-50/60 dark:bg-emerald-950/20'
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                }`}
              >
                {checked ? (
                  <CheckCircle2 className="text-emerald-600 shrink-0 mt-0.5" size={20} />
                ) : (
                  <Circle className="text-slate-400 shrink-0 mt-0.5" size={20} />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[11px] font-bold">
                      {f.fase}
                    </span>
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">{f.titulo}</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1">{f.desc}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
