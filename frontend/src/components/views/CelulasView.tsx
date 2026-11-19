import React, { useState, useEffect } from 'react';
import {
  Home, Users, Clock, AlertTriangle, Plus, Trash2, Play, Pause, RotateCcw, Heart, CheckCircle2
} from 'lucide-react';

interface Celula {
  id: string;
  nome: string;
  lider: string;
  diaHorario: string;
  membros: string[];
}

interface OikosContato {
  id: string;
  nome: string;
  vinculo: string;
  status: 'Orando' | 'Convidado' | 'Na Célula' | 'Decisão';
}

const ROTEIRO_1H = [
  { etapa: '1. Comunhão e Quebra-gelo', minutos: 10, desc: 'Recepção calorosa aos convidados, lanche leve ou dinâmica rápida.', cor: 'bg-emerald-600' },
  { etapa: '2. Momentos de Adoração', minutos: 15, desc: '2 a 3 louvores direcionados à presença de Deus e unidade.', cor: 'bg-teal-600' },
  { etapa: '3. Ministração da Palavra', minutos: 20, desc: 'Tema central: Visão e Missão da igreja local (aplicação prática).', cor: 'bg-blue-600' },
  { etapa: '4. Oração e Intercessão', minutos: 10, desc: 'Clamor pelas famílias, enfermos e lista Oikós.', cor: 'bg-purple-600' },
  { etapa: '5. Avisos da Visão & Envio', minutos: 5, desc: 'Reforço dos cultos, batismo, discipulado quinzenal e multiplicação.', cor: 'bg-amber-600' },
];

const DEFAULT_CELULAS: Celula[] = [
  {
    id: 'cel-1',
    nome: 'Célula Boas Novas',
    lider: 'Líder Exemplo',
    diaHorario: 'Quinta-feira • 19h30',
    membros: ['João Silva', 'Maria Souza', 'Pedro Santos', 'Ana Oliveira', 'Lucas Lima'],
  },
];

const DEFAULT_OIKOS: OikosContato[] = [
  { id: 'oik-1', nome: 'Carlos (Vizinho)', vinculo: 'Vizinho', status: 'Orando' },
  { id: 'oik-2', nome: 'Fernanda (Trabalho)', vinculo: 'Colega', status: 'Convidado' },
];

export const CelulasView: React.FC = () => {
  const [celulas, setCelulas] = useState<Celula[]>(() => {
    const saved = localStorage.getItem('vc_celulas_v1');
    return saved ? JSON.parse(saved) : DEFAULT_CELULAS;
  });

  const [oikos, setOikos] = useState<OikosContato[]>(() => {
    const saved = localStorage.getItem('vc_oikos_v1');
    return saved ? JSON.parse(saved) : DEFAULT_OIKOS;
  });

  const [novaCelulaNome, setNovaCelulaNome] = useState('');
  const [novaCelulaLider, setNovaCelulaLider] = useState('');
  const [novaCelulaDia, setNovaCelulaDia] = useState('');
  const [novoMembro, setNovoMembro] = useState<Record<string, string>>({});

  const [novoOikosNome, setNovoOikosNome] = useState('');
  const [novoOikosVinculo, setNovoOikosVinculo] = useState('');

  // Cronômetro 1 Hora (3600 segundos)
  const [secondsLeft, setSecondsLeft] = useState(3600);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    localStorage.setItem('vc_celulas_v1', JSON.stringify(celulas));
  }, [celulas]);

  useEffect(() => {
    localStorage.setItem('vc_oikos_v1', JSON.stringify(oikos));
  }, [oikos]);

  useEffect(() => {
    if (!running) return;
    const timer = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [running]);

  const formatTime = (totalSec: number) => {
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const adicionarCelula = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novaCelulaNome.trim()) return;
    setCelulas([
      ...celulas,
      {
        id: `cel-${Date.now()}`,
        nome: novaCelulaNome.trim(),
        lider: novaCelulaLider.trim() || 'A definir',
        diaHorario: novaCelulaDia.trim() || 'Semanal • 1 Hora',
        membros: [],
      },
    ]);
    setNovaCelulaNome('');
    setNovaCelulaLider('');
    setNovaCelulaDia('');
  };

  const adicionarMembro = (celId: string) => {
    const nome = (novoMembro[celId] || '').trim();
    if (!nome) return;
    setCelulas((prev) =>
      prev.map((c) => {
        if (c.id !== celId) return c;
        if (c.membros.length >= 12) return c;
        return { ...c, membros: [...c.membros, nome] };
      })
    );
    setNovoMembro((prev) => ({ ...prev, [celId]: '' }));
  };

  const removerMembro = (celId: string, idx: number) => {
    setCelulas((prev) =>
      prev.map((c) => (c.id === celId ? { ...c, membros: c.membros.filter((_, i) => i !== idx) } : c))
    );
  };

  const adicionarOikos = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoOikosNome.trim()) return;
    setOikos([
      ...oikos,
      {
        id: `oik-${Date.now()}`,
        nome: novoOikosNome.trim(),
        vinculo: novoOikosVinculo.trim() || 'Relacionamento',
        status: 'Orando',
      },
    ]);
    setNovoOikosNome('');
    setNovoOikosVinculo('');
  };

  const cycleOikosStatus = (id: string) => {
    const order: OikosContato['status'][] = ['Orando', 'Convidado', 'Na Célula', 'Decisão'];
    setOikos((prev) =>
      prev.map((o) => {
        if (o.id !== id) return o;
        const nextIdx = (order.indexOf(o.status) + 1) % order.length;
        return { ...o, status: order[nextIdx] };
      })
    );
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-orange-700 via-amber-600 to-teal-700 text-white p-6 shadow-lg">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-amber-100 text-xs font-bold uppercase mb-2">
          <Home size={14} /> Células: O Coração da Igreja
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold">Gestão de Células (1 Hora) &amp; Multiplicação aos 12</h1>
        <p className="text-orange-50 text-sm mt-1">
          Comunhão, Adoração, Oração e Ministração da Palavra (Visão e Missão da igreja local). Multiplique sempre que chegar a 12 pessoas!
        </p>
      </div>

      {/* Roteiro & Cronômetro 1 Hora */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Clock className="text-teal-600" size={22} />
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Cronômetro &amp; Roteiro da Reunião (1 Hora)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Controle exato do tempo para manter todas as células dinâmicas
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 px-4 py-2 rounded-xl">
            <span className="font-mono text-xl font-extrabold text-slate-900 dark:text-white mr-2">
              {formatTime(secondsLeft)}
            </span>
            <button
              onClick={() => setRunning(!running)}
              className="p-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white transition"
              title={running ? 'Pausar' : 'Iniciar'}
            >
              {running ? <Pause size={16} /> : <Play size={16} />}
            </button>
            <button
              onClick={() => {
                setRunning(false);
                setSecondsLeft(3600);
              }}
              className="p-2 rounded-lg bg-slate-300 dark:bg-slate-700 hover:bg-slate-400 text-slate-800 dark:text-white transition"
              title="Reiniciar 1 Hora"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {ROTEIRO_1H.map((r) => (
            <div
              key={r.etapa}
              className="rounded-xl border border-slate-200 dark:border-slate-800 p-3.5 bg-slate-50 dark:bg-slate-950/40"
            >
              <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold text-white mb-2 ${r.cor}`}>
                {r.minutos} min
              </span>
              <div className="font-bold text-sm text-slate-900 dark:text-white mb-1">{r.etapa}</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{r.desc}</p>
            </div>
          ))}
        </div>

        {/* Funcionamento da Célula Apostólica: 30 min + 30 min */}
        <div className="mt-5 rounded-xl border-2 border-amber-300 dark:border-amber-700/70 bg-amber-50/70 dark:bg-amber-950/20 p-4">
          <div className="text-center text-xs font-extrabold uppercase tracking-wider text-amber-900 dark:text-amber-300 mb-3">
            Funcionamento da Célula Apostólica (1 Hora = 30 min + 30 min)
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 p-3.5 flex items-center gap-4">
              <svg viewBox="0 0 110 90" className="w-20 h-16 shrink-0" aria-hidden="true">
                <line x1="55" y1="68" x2="22" y2="42" stroke="#1E3A8A" strokeWidth="2.5" />
                <line x1="55" y1="68" x2="55" y2="42" stroke="#1E3A8A" strokeWidth="2.5" />
                <line x1="55" y1="68" x2="88" y2="42" stroke="#1E3A8A" strokeWidth="2.5" />
                <line x1="22" y1="42" x2="10" y2="18" stroke="#0D9488" strokeWidth="2" />
                <line x1="22" y1="42" x2="22" y2="18" stroke="#0D9488" strokeWidth="2" />
                <line x1="22" y1="42" x2="34" y2="18" stroke="#0D9488" strokeWidth="2" />
                <line x1="55" y1="42" x2="55" y2="18" stroke="#0D9488" strokeWidth="2" />
                <line x1="88" y1="42" x2="76" y2="18" stroke="#0D9488" strokeWidth="2" />
                <line x1="88" y1="42" x2="88" y2="18" stroke="#0D9488" strokeWidth="2" />
                <line x1="88" y1="42" x2="100" y2="18" stroke="#0D9488" strokeWidth="2" />
                <circle cx="10" cy="18" r="5" fill="#0D9488" />
                <circle cx="22" cy="18" r="5" fill="#0D9488" />
                <circle cx="34" cy="18" r="5" fill="#0D9488" />
                <circle cx="55" cy="18" r="5" fill="#0D9488" />
                <circle cx="76" cy="18" r="5" fill="#0D9488" />
                <circle cx="88" cy="18" r="5" fill="#0D9488" />
                <circle cx="100" cy="18" r="5" fill="#0D9488" />
                <circle cx="22" cy="42" r="7" fill="#2563EB" />
                <circle cx="55" cy="42" r="7" fill="#2563EB" />
                <circle cx="88" cy="42" r="7" fill="#2563EB" />
                <circle cx="55" cy="68" r="9.5" fill="#DC2626" stroke="#1E293B" strokeWidth="2" />
              </svg>
              <div>
                <div className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200">
                  1ª Parte • 30 Minutos
                </div>
                <div className="text-sm font-bold text-teal-700 dark:text-teal-400">
                  Líder com todos
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Comunhão, adoração e ministração geral conduzida pelo líder da célula com todo o grupo reunido.
                </p>
              </div>
            </div>

            <div className="rounded-xl bg-white dark:bg-slate-900 border border-amber-200 dark:border-amber-800/60 p-3.5 flex items-center gap-4">
              <svg viewBox="0 0 110 90" className="w-20 h-16 shrink-0" aria-hidden="true">
                <line x1="55" y1="68" x2="24" y2="24" stroke="#0D9488" strokeWidth="3" />
                <line x1="55" y1="68" x2="55" y2="20" stroke="#0D9488" strokeWidth="3" />
                <line x1="55" y1="68" x2="86" y2="24" stroke="#0D9488" strokeWidth="3" />
                <circle cx="24" cy="24" r="9" fill="#0D9488" />
                <circle cx="55" cy="20" r="9" fill="#0D9488" />
                <circle cx="86" cy="24" r="9" fill="#0D9488" />
                <circle cx="55" cy="68" r="11" fill="#2563EB" />
              </svg>
              <div>
                <div className="text-xs font-extrabold uppercase text-slate-800 dark:text-slate-200">
                  2ª Parte • 30 Minutos
                </div>
                <div className="text-sm font-bold text-blue-600 dark:text-blue-400">
                  3 Líderes com seus liderados
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                  Divisão em pequenos grupos de cuidado, oração, aplicação prática e acompanhamento próximo (até 3 por líder).
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Células & Regra dos 12 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Users className="text-blue-600" size={20} /> Minhas Células (Limite: 12 Pessoas)
            </h2>

            <form onSubmit={adicionarCelula} className="grid grid-cols-1 sm:grid-cols-4 gap-2 mb-5">
              <input
                type="text"
                placeholder="Nome da célula"
                value={novaCelulaNome}
                onChange={(e) => setNovaCelulaNome(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
              <input
                type="text"
                placeholder="Líder"
                value={novaCelulaLider}
                onChange={(e) => setNovaCelulaLider(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
              <input
                type="text"
                placeholder="Dia e hora"
                value={novaCelulaDia}
                onChange={(e) => setNovaCelulaDia(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm flex items-center justify-center gap-1"
              >
                <Plus size={16} /> Nova Célula
              </button>
            </form>

            <div className="space-y-4">
              {celulas.map((cel) => {
                const count = cel.membros.length;
                const pertoDeMultiplicar = count >= 10;
                const atingiu12 = count >= 12;

                return (
                  <div
                    key={cel.id}
                    className={`rounded-xl border-2 p-4 ${
                      atingiu12
                        ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/20'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/30'
                    }`}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div>
                        <h3 className="font-extrabold text-base text-slate-900 dark:text-white">{cel.nome}</h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          Líder: <strong>{cel.lider}</strong> • {cel.diaHorario}
                        </p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-extrabold ${
                          atingiu12
                            ? 'bg-amber-600 text-white'
                            : pertoDeMultiplicar
                            ? 'bg-orange-500 text-white'
                            : 'bg-teal-600 text-white'
                        }`}
                      >
                        {count} / 12 pessoas
                      </span>
                    </div>

                    {pertoDeMultiplicar && (
                      <div className="mb-3 flex items-center gap-2 rounded-lg bg-amber-100 dark:bg-amber-900/40 border border-amber-400 px-3 py-2 text-xs font-semibold text-amber-900 dark:text-amber-200">
                        <AlertTriangle size={16} className="shrink-0" />
                        {atingiu12
                          ? 'A célula atingiu 12 pessoas! Multiplique agora formando uma nova equipe e abrindo uma nova célula.'
                          : 'A célula está próxima de 12 pessoas. Prepare o líder em treinamento para multiplicar!'}
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {cel.membros.map((m, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
                        >
                          {m}
                          <button
                            onClick={() => removerMembro(cel.id, idx)}
                            className="text-slate-400 hover:text-red-500"
                            title="Remover"
                          >
                            <Trash2 size={12} />
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        placeholder={atingiu12 ? 'Limite de 12 atingido — multiplique!' : 'Adicionar participante...'}
                        disabled={atingiu12}
                        value={novoMembro[cel.id] || ''}
                        onChange={(e) => setNovoMembro((prev) => ({ ...prev, [cel.id]: e.target.value }))}
                        className="flex-1 px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs disabled:opacity-50"
                      />
                      <button
                        type="button"
                        disabled={atingiu12}
                        onClick={() => adicionarMembro(cel.id)}
                        className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold disabled:opacity-50"
                      >
                        + Adicionar
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Lista Oikós */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm h-fit">
          <div className="flex items-center gap-2 mb-2">
            <Heart className="text-rose-500" size={20} />
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Meu Oikós (3 a 5 Pessoas)</h2>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Liste pessoas da família, trabalho ou vizinhança para orar e convidar para a célula. Clique no status para avançar!
          </p>

          <form onSubmit={adicionarOikos} className="space-y-2 mb-4">
            <input
              type="text"
              placeholder="Nome da pessoa"
              value={novoOikosNome}
              onChange={(e) => setNovoOikosNome(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
            />
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Vínculo (ex: Vizinho)"
                value={novoOikosVinculo}
                onChange={(e) => setNovoOikosVinculo(e.target.value)}
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
              />
              <button
                type="submit"
                className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold"
              >
                + Oikós
              </button>
            </div>
          </form>

          <div className="space-y-2">
            {oikos.map((o) => (
              <div
                key={o.id}
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900 dark:text-white">{o.nome}</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">{o.vinculo}</div>
                </div>
                <button
                  onClick={() => cycleOikosStatus(o.id)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold bg-teal-600 text-white hover:bg-teal-700 transition"
                >
                  <CheckCircle2 size={12} /> {o.status}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
