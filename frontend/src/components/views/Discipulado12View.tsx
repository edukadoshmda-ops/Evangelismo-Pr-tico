import React, { useState, useEffect } from 'react';
import { Users, Calendar, UserCheck, Plus, MessageSquare, ShieldCheck, AlertCircle } from 'lucide-react';

interface Discipulo12 {
  id: string;
  nome: string;
  degrau: '1. Ganhar' | '2. Consolidar' | '3. Discipular' | '4. Enviar';
  batizado: boolean;
  ultimoIndividual: string;
  notaIndividual: string;
}

interface ReuniaoColetiva {
  id: string;
  data: string;
  tema: string;
  presentes: number;
}

const DEFAULT_DISCIPULOS: Discipulo12[] = [
  {
    id: 'd-1',
    nome: 'Lucas Ferreira',
    degrau: '3. Discipular',
    batizado: true,
    ultimoIndividual: '2026-11-10',
    notaIndividual: 'Acompanhamento familiar e preparação para liderar equipe.',
  },
  {
    id: 'd-2',
    nome: 'Mariana Costa',
    degrau: '2. Consolidar',
    batizado: false,
    ultimoIndividual: '2026-11-14',
    notaIndividual: 'Contato em 48h realizado; agendada para Classe de Batismo.',
  },
];

const DEFAULT_COLETIVAS: ReuniaoColetiva[] = [
  {
    id: 'rc-1',
    data: '2026-11-05',
    tema: 'Visão e Missão da Igreja Local (Mateus 28:19)',
    presentes: 8,
  },
];

export const Discipulado12View: React.FC = () => {
  const [discipulos, setDiscipulos] = useState<Discipulo12[]>(() => {
    const saved = localStorage.getItem('vc_discipulos_12_v1');
    return saved ? JSON.parse(saved) : DEFAULT_DISCIPULOS;
  });

  const [coletivas, setColetivas] = useState<ReuniaoColetiva[]>(() => {
    const saved = localStorage.getItem('vc_coletivas_v1');
    return saved ? JSON.parse(saved) : DEFAULT_COLETIVAS;
  });

  const [novoNome, setNovoNome] = useState('');
  const [novoDegrau, setNovoDegrau] = useState<Discipulo12['degrau']>('1. Ganhar');

  const [novaDataColetiva, setNovaDataColetiva] = useState('');
  const [novoTemaColetiva, setNovoTemaColetiva] = useState('Visão e Missão da Igreja Local');
  const [novosPresentes, setNovosPresentes] = useState(1);

  const [selectedDiscipulo, setSelectedDiscipulo] = useState<string | null>(null);
  const [notaTexto, setNotaTexto] = useState('');

  useEffect(() => {
    localStorage.setItem('vc_discipulos_12_v1', JSON.stringify(discipulos));
  }, [discipulos]);

  useEffect(() => {
    localStorage.setItem('vc_coletivas_v1', JSON.stringify(coletivas));
  }, [coletivas]);

  const adicionarDiscipulo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim() || discipulos.length >= 12) return;
    setDiscipulos([
      ...discipulos,
      {
        id: `d-${Date.now()}`,
        nome: novoNome.trim(),
        degrau: novoDegrau,
        batizado: false,
        ultimoIndividual: new Date().toISOString().slice(0, 10),
        notaIndividual: 'Iniciando acompanhamento pessoal e familiar.',
      },
    ]);
    setNovoNome('');
  };

  const registrarColetiva = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaDataColetiva || !novoTemaColetiva.trim()) return;
    setColetivas([
      {
        id: `rc-${Date.now()}`,
        data: novaDataColetiva,
        tema: novoTemaColetiva.trim(),
        presentes: novosPresentes,
      },
      ...coletivas,
    ]);
    setNovaDataColetiva('');
  };

  const salvarNotaIndividual = (id: string) => {
    if (!notaTexto.trim()) return;
    setDiscipulos((prev) =>
      prev.map((d) =>
        d.id === id
          ? {
              ...d,
              notaIndividual: notaTexto.trim(),
              ultimoIndividual: new Date().toISOString().slice(0, 10),
            }
          : d
      )
    );
    setSelectedDiscipulo(null);
    setNotaTexto('');
  };

  const toggleBatizado = (id: string) => {
    setDiscipulos((prev) => prev.map((d) => (d.id === id ? { ...d, batizado: !d.batizado } : d)));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="rounded-2xl bg-gradient-to-r from-indigo-900 via-blue-900 to-purple-900 text-white p-6 shadow-lg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-300 text-xs font-bold uppercase mb-2">
          <ShieldCheck size={14} /> Governo dos 12 • DNA, Visão e Missão
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Discipulado Coletivo (15 em 15 dias) &amp; Individual</h1>
        <p className="text-blue-100 text-sm mt-1">
          O Pastor Principal e cada líder cuidam de no máximo 12 pessoas. Coletivo transmite a Visão e Missão; Individual cuida de temas pessoais e familiares.
        </p>
      </div>

      {/* Comparativo Rápido */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-950/30 border-l-4 border-blue-600 rounded-xl p-4">
          <div className="font-extrabold text-blue-900 dark:text-blue-300 text-sm uppercase">
            Discipulado Coletivo (Mínimo de 15 em 15 dias)
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
            Reunião quinzenal com sua equipe de até 12 discípulos. Conteúdo central: <strong>Visão e Missão da igreja local</strong>, DNA e estratégia de multiplicação.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/30 border-l-4 border-emerald-600 rounded-xl p-4">
          <div className="font-extrabold text-emerald-900 dark:text-emerald-300 text-sm uppercase">
            Discipulado Individual (1 a 1)
          </div>
          <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1">
            Acompanhamento reservado e próximo para cuidar de <strong>temas pessoais, familiares, casamento, caráter</strong> e primeiros passos na fé.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lista dos até 12 Discípulos */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Users className="text-blue-600" size={20} /> Meus Discípulos Diretos
            </h2>
            <span
              className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                discipulos.length >= 12 ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
              }`}
            >
              {discipulos.length} / 12 Pessoas (Limite Bíblico)
            </span>
          </div>

          {discipulos.length >= 12 && (
            <div className="mb-3 flex items-center gap-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 border border-amber-400 px-3 py-2 text-xs font-semibold text-amber-900 dark:text-amber-200">
              <AlertCircle size={16} /> Limite máximo de 12 discípulos atingido! Forme e envie esses líderes para multiplicarem.
            </div>
          )}

          <form onSubmit={adicionarDiscipulo} className="flex flex-wrap gap-2 mb-4">
            <input
              type="text"
              placeholder="Nome do discípulo"
              disabled={discipulos.length >= 12}
              value={novoNome}
              onChange={(e) => setNovoNome(e.target.value)}
              className="flex-1 min-w-[160px] px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm disabled:opacity-50"
            />
            <select
              value={novoDegrau}
              onChange={(e) => setNovoDegrau(e.target.value as Discipulo12['degrau'])}
              className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
            >
              <option value="1. Ganhar">1. Ganhar</option>
              <option value="2. Consolidar">2. Consolidar</option>
              <option value="3. Discipular">3. Discipular</option>
              <option value="4. Enviar">4. Enviar</option>
            </select>
            <button
              type="submit"
              disabled={discipulos.length >= 12}
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold flex items-center gap-1 disabled:opacity-50"
            >
              <Plus size={16} /> Adicionar
            </button>
          </form>

          <div className="space-y-3">
            {discipulos.map((d) => (
              <div
                key={d.id}
                className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50 dark:bg-slate-950/40"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <div className="font-bold text-sm text-slate-900 dark:text-white">{d.nome}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      Degrau: <strong className="text-teal-600 dark:text-teal-400">{d.degrau}</strong> • Último individual: {d.ultimoIndividual}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleBatizado(d.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                        d.batizado ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      <UserCheck size={12} className="inline mr-1" />
                      {d.batizado ? 'Batizado' : 'Não Batizado'}
                    </button>
                    <button
                      onClick={() => {
                        setSelectedDiscipulo(selectedDiscipulo === d.id ? null : d.id);
                        setNotaTexto(d.notaIndividual);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 text-xs font-bold flex items-center gap-1"
                    >
                      <MessageSquare size={12} /> Individual
                    </button>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 italic">
                  <strong>Nota Individual (Pessoal/Familiar):</strong> {d.notaIndividual}
                </p>

                {selectedDiscipulo === d.id && (
                  <div className="mt-3 flex gap-2">
                    <input
                      type="text"
                      value={notaTexto}
                      onChange={(e) => setNotaTexto(e.target.value)}
                      placeholder="Registrar acompanhamento pessoal, familiar ou espiritual..."
                      className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                    />
                    <button
                      onClick={() => salvarNotaIndividual(d.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold"
                    >
                      Salvar
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Registro de Discipulado Coletivo (15 em 15 dias) */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="text-purple-600" size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Discipulado Coletivo</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Frequência mínima: <strong>15 em 15 dias</strong>. Conteúdo: <strong>Visão e Missão da igreja local</strong>.
          </p>

          <form onSubmit={registrarColetiva} className="space-y-2 mb-4">
            <input
              type="date"
              value={novaDataColetiva}
              onChange={(e) => setNovaDataColetiva(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
            <input
              type="text"
              placeholder="Tema (Visão e Missão)"
              value={novoTemaColetiva}
              onChange={(e) => setNovoTemaColetiva(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              required
            />
            <div className="flex items-center gap-2">
              <label className="text-xs text-slate-600 dark:text-slate-400">Presentes:</label>
              <input
                type="number"
                min={1}
                max={12}
                value={novosPresentes}
                onChange={(e) => setNovosPresentes(Number(e.target.value))}
                className="w-20 px-2 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              />
              <button
                type="submit"
                className="flex-1 px-3 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-white text-xs font-bold"
              >
                Registrar Encontro
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {coletivas.map((rc) => (
              <div
                key={rc.id}
                className="p-2.5 rounded-xl bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800"
              >
                <div className="flex justify-between text-xs font-bold text-purple-900 dark:text-purple-200">
                  <span>{rc.data}</span>
                  <span>{rc.presentes} / 12 presentes</span>
                </div>
                <div className="text-xs text-slate-700 dark:text-slate-300 mt-1">{rc.tema}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
