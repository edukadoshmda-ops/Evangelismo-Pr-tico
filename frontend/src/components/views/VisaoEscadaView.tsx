import React, { useState } from 'react';
import {
  Compass, Target, Users, Flame, HeartHandshake, BookOpen, Send, Eye, CheckCircle2, Sparkles
} from 'lucide-react';

type TrilhoId = 'ganhar' | 'consolidar' | 'discipular' | 'enviar';

interface TrilhoData {
  id: TrilhoId;
  numero: string;
  titulo: string;
  ministerio: string;
  verbo: string;
  corBg: string;
  corBorder: string;
  corBadge: string;
  elo: string;
  objetivo: string;
  textoBase: string;
  encontros: string[];
  pratica: string;
  marco: string;
}

const TRILHOS: TrilhoData[] = [
  {
    id: 'ganhar',
    numero: '1',
    titulo: 'Trilho 1: Ganhar',
    ministerio: 'Evangelista',
    verbo: 'Alcança',
    corBg: 'bg-emerald-50 dark:bg-emerald-950/30',
    corBorder: 'border-emerald-500',
    corBadge: 'bg-emerald-600 text-white',
    elo: 'O “ide” de Mateus 28.19. Ninguém é discípulo sem antes ser alcançado.',
    objetivo: 'Capacitar cada membro a compartilhar sua fé e a trazer pessoas para a célula.',
    textoBase: 'Mateus 28.18-20 • 1 João 5.11-13 • João 5.24 • Romanos 10.9-10',
    encontros: [
      'Lição 1 — A salvação bíblica: quem decide se a pessoa será salva, Deus ou o homem?',
      'Lição 2 — O amor de Deus por você: quem determina o amor de Deus, Deus ou você?',
      'Lição 3 — A condição do homem pecador: quem define o pecado, a opinião humana ou Deus?',
      'Lição 4 — A morte eterna e as três separações: morte espiritual, física e eterna.',
      'Lição 5 — A solução de Deus: a doença, a camisa comprada e o cordeiro da Páscoa.',
      'Lição 6 — Como receber a salvação: crer, confessar e a oração de decisão.',
      'Lição 7 — A avaliação da salvação: examinar se tem plena certeza (Atos 19.2).',
      'Lição 8 — Discipulado e Grande Comissão: as oito razões para levar o evangelho.',
    ],
    pratica:
      'Estratégia Oikós: cada membro lista 3 a 5 pessoas (família, trabalho, vizinhos) para orar semanalmente e convidar. Cada lição é estudada com pergunta de reflexão, texto bíblico e perguntas Sim/Não, registrando na Ficha de Evangelismo.',
    marco:
      'A pessoa fez a oração de decisão, respondeu com certeza à pergunta da lição 7 e a data da decisão foi registrada. Em seguida, é conduzida ao estudo de batismo.',
  },
  {
    id: 'consolidar',
    numero: '2',
    titulo: 'Trilho 2: Consolidar',
    ministerio: 'Pastor',
    verbo: 'Cuida',
    corBg: 'bg-teal-50 dark:bg-teal-950/30',
    corBorder: 'border-teal-500',
    corBadge: 'bg-teal-600 text-white',
    elo: 'A missão pede “batizando”. Quem decide por Jesus precisa ser acompanhado até firmar os primeiros passos.',
    objetivo: 'Guardar o novo convertido, ligá-lo à célula e ao corpo da igreja e levá-lo ao batismo.',
    textoBase: 'Atos 2.41-47 • Mateus 28.19 • 1 Tessalonicenses 2.7-12',
    encontros: [
      '1. Certeza da salvação e nova identidade em Cristo.',
      '2. Batismo: significado e decisão.',
      '3. Oração e leitura da Bíblia: hábitos básicos.',
      '4. Perdão, libertação e novos relacionamentos.',
      '5. Pertencer: célula, culto e comunhão.',
    ],
    pratica:
      'Visita ou contato do líder em até 48 horas depois da decisão, acompanhamento semanal e integração nos marcos de consolidação (Pré-Encontro, Encontro com Deus e Classe de Batismo).',
    marco:
      'Batizado, presente na célula e no culto com regularidade, com hábito básico de oração e Bíblia.',
  },
  {
    id: 'discipular',
    numero: '3',
    titulo: 'Trilho 3: Discipular',
    ministerio: 'Mestre',
    verbo: 'Ensina',
    corBg: 'bg-blue-50 dark:bg-blue-950/30',
    corBorder: 'border-blue-500',
    corBadge: 'bg-blue-600 text-white',
    elo: 'A missão ordena “ensinando-os a guardar todas as coisas que vos tenho mandado”. É aqui que o convertido vira discípulo.',
    objetivo: 'Formar caráter, doutrina e serviço, até o discípulo reproduzir o que recebeu.',
    textoBase: 'Mateus 28.19-20 • 2 Timóteo 2.2 • Atos 2.41-47 • Hebreus 10.24-25',
    encontros: [
      '1. O batismo bíblico: ordem de Jesus, simbolismo, quem deve ser batizado e o exemplo do Senhor.',
      '2. A Bíblia Sagrada: por que é diferente de todos os outros livros e frequência de meditação.',
      '3. A oração: orar no secreto, em nome de Jesus, com perseverança.',
      '4. A contribuição bíblica: dízimos e ofertas como gratidão e consagração, com alegria.',
      '5. A Igreja de Jesus Cristo e a membresia: quem estabeleceu, quem é o cabeça e o papel de cada membro.',
      '6. Discípulo que discipula: o discipulado de um a um e a árvore de multiplicação em três pernas.',
    ],
    pratica:
      'O discipulador acompanha até 12 discípulos (Discipulado Coletivo no mínimo de 15 em 15 dias focado na Visão e Missão + Discipulado Individual para temas pessoais e familiares).',
    marco:
      'Concluiu os cursos da trilha, respondeu o questionário bíblico, foi batizado e já está discipulando alguém.',
  },
  {
    id: 'enviar',
    numero: '4',
    titulo: 'Trilho 4: Enviar',
    ministerio: 'Apóstolo',
    verbo: 'Envia',
    corBg: 'bg-amber-50 dark:bg-amber-950/30',
    corBorder: 'border-amber-500',
    corBadge: 'bg-amber-600 text-white',
    elo: 'O “todas as nações”. O discípulo maduro não guarda o que recebeu: é enviado e multiplica.',
    objetivo: 'Levantar líderes de célula e enviar equipes para abrir novas células, para que a visão se multiplique.',
    textoBase: 'Atos 13.1-3 • Efésios 4.11-13 • Mateus 28.19',
    encontros: [
      '1. Chamado e envio: o modelo de Antioquia.',
      '2. Liderança de célula: dinâmica (1 hora), estrutura e cuidado.',
      '3. Multiplicar: como abrir uma nova célula ao chegar a 12 pessoas.',
      '4. Prestar contas e ser acompanhado pela liderança.',
      '5. Visão apostólica: gerar filhos e líderes que gerem outros.',
    ],
    pratica:
      'O líder em formação conduz parte da célula com supervisão e, quando a célula atinge 12 pessoas, parte com uma equipe para abrir outra.',
    marco:
      'Conduziu ou abriu uma célula e já está formando novos líderes. O ciclo recomeça no Trilho 1 com novas pessoas.',
  },
];

const EQUIPADORES = [
  {
    nome: 'Apóstolo',
    papel: 'Envia e Protege a Multiplicação',
    desc: 'Protege a cultura de multiplicação, envia líderes e expande novas frentes e células.',
    cor: 'border-amber-500 bg-amber-50/70 dark:bg-amber-950/20 text-amber-800 dark:text-amber-300',
    icon: Send,
  },
  {
    nome: 'Profeta',
    papel: 'Orienta (Transversal)',
    desc: 'Guarda a atmosfera espiritual, o quebrantamento e o alinhamento de rota na Visão.',
    cor: 'border-purple-500 bg-purple-50/70 dark:bg-purple-950/20 text-purple-800 dark:text-purple-300',
    icon: Eye,
  },
  {
    nome: 'Evangelista',
    papel: 'Alcança e Treina Pescadores',
    desc: 'Treina os membros da célula a pescar vidas no dia a dia através do seu Oikós.',
    cor: 'border-emerald-500 bg-emerald-50/70 dark:bg-emerald-950/20 text-emerald-800 dark:text-emerald-300',
    icon: Flame,
  },
  {
    nome: 'Pastor',
    papel: 'Cuida e Descentraliza',
    desc: 'Descentraliza o cuidado, treinando e curando líderes para pastorearem suas 12 ovelhas.',
    cor: 'border-teal-500 bg-teal-50/70 dark:bg-teal-950/20 text-teal-800 dark:text-teal-300',
    icon: HeartHandshake,
  },
  {
    nome: 'Mestre',
    papel: 'Ensina com Solidez',
    desc: 'Garante saúde doutrinária e solidez bíblica para que a multiplicação seja saudável.',
    cor: 'border-blue-500 bg-blue-50/70 dark:bg-blue-950/20 text-blue-800 dark:text-blue-300',
    icon: BookOpen,
  },
];

export const VisaoEscadaView: React.FC = () => {
  const [selectedTrilho, setSelectedTrilho] = useState<TrilhoId>('ganhar');
  const trilho = TRILHOS.find((t) => t.id === selectedTrilho) || TRILHOS[0];

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header Banner */}
      <div className="rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-teal-900 text-white p-6 shadow-lg border border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider mb-2">
              <Compass size={14} /> Visão de Crescimento de Igreja
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Escada do Sucesso &amp; Os 5 Ministérios
            </h1>
            <p className="text-teal-200 text-sm sm:text-base mt-1 font-medium">
              Missão: fazer discípulos de todas as nações (Mateus 28:19) • Células: o coração
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3 border border-white/15 text-right">
            <div className="text-xs text-slate-300 uppercase font-semibold">Fluxo Contínuo</div>
            <div className="text-sm sm:text-base font-bold text-amber-300">
              Ganhar → Consolidar → Discipular → Enviar
            </div>
          </div>
        </div>
      </div>

      {/* Mapa Estratégico Resumido */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="text-xs font-bold uppercase text-blue-600 dark:text-blue-400">Visão Apostólica</div>
          <div className="font-bold text-slate-900 dark:text-white mt-1">Gerar e enviar líderes</div>
          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
            Liderança principal e demais lideranças alinhadas no mesmo DNA, com limite de até 12 pessoas por líder.
          </p>
        </div>
        <div className="bg-orange-50 dark:bg-orange-950/20 rounded-xl p-4 border-2 border-orange-400 dark:border-orange-700 shadow-sm">
          <div className="text-xs font-bold uppercase text-orange-700 dark:text-orange-400">Células: o coração</div>
          <div className="font-bold text-slate-900 dark:text-white mt-1">Onde tudo acontece e se multiplica</div>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
            Reuniões de 1 hora com Comunhão, Adoração, Oração e Palavra (Visão e Missão). Multiplica ao chegar a 12.
          </p>
        </div>
        <div className="bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4 border border-emerald-300 dark:border-emerald-800 shadow-sm">
          <div className="text-xs font-bold uppercase text-emerald-700 dark:text-emerald-400">Resultado Final</div>
          <div className="font-bold text-slate-900 dark:text-white mt-1">Discípulos enviados e células multiplicadas</div>
          <p className="text-xs text-slate-700 dark:text-slate-300 mt-1">
            Toda a estrutura da igreja local treinada dando muitos frutos para o Reino de Deus.
          </p>
        </div>
      </div>

      {/* Seletor Interativo dos 4 Trilhos */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-4">
          <Target className="text-teal-600" size={20} />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Trilhos de Ensino da Escada do Sucesso
          </h2>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
          {TRILHOS.map((item) => {
            const active = item.id === selectedTrilho;
            return (
              <button
                key={item.id}
                onClick={() => setSelectedTrilho(item.id)}
                className={`text-left p-3.5 rounded-xl border-2 transition-all ${
                  active
                    ? `${item.corBorder} ${item.corBg} shadow-md scale-[1.01]`
                    : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <span className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-bold mb-1.5 ${item.corBadge}`}>
                  {item.numero}. {item.id.charAt(0).toUpperCase() + item.id.slice(1)}
                </span>
                <div className="font-bold text-sm text-slate-900 dark:text-white">
                  {item.ministerio} ({item.verbo})
                </div>
              </button>
            );
          })}
        </div>

        {/* Detalhe do Trilho Selecionado */}
        <div className={`rounded-xl border-l-4 ${trilho.corBorder} ${trilho.corBg} p-5 space-y-4`}>
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">{trilho.titulo}</h3>
            <span className={`px-3 py-1 rounded-full text-xs font-bold ${trilho.corBadge}`}>
              Ministério responsável: {trilho.ministerio}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white/80 dark:bg-slate-900/70 rounded-lg p-3 border border-slate-200/70 dark:border-slate-800">
              <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Elo com a Missão</div>
              <p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5">{trilho.elo}</p>
            </div>
            <div className="bg-white/80 dark:bg-slate-900/70 rounded-lg p-3 border border-slate-200/70 dark:border-slate-800">
              <div className="text-xs font-bold uppercase text-slate-500 dark:text-slate-400">Objetivo</div>
              <p className="text-sm text-slate-800 dark:text-slate-200 mt-0.5">{trilho.objetivo}</p>
            </div>
          </div>

          <div className="bg-white/90 dark:bg-slate-900/80 rounded-lg p-3 border border-slate-200 dark:border-slate-800 text-sm">
            <strong className="text-slate-900 dark:text-white">Texto-base:</strong>{' '}
            <span className="text-teal-700 dark:text-teal-300 font-medium">{trilho.textoBase}</span>
          </div>

          <div>
            <div className="text-xs font-bold uppercase text-slate-600 dark:text-slate-300 mb-2">
              Encontros do Trilho
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {trilho.encontros.map((enc, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-2 bg-white/80 dark:bg-slate-900/70 rounded-lg px-3 py-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 border border-slate-200/60 dark:border-slate-800"
                >
                  <CheckCircle2 size={15} className="text-teal-600 shrink-0 mt-0.5" />
                  <span>{enc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="bg-white dark:bg-slate-900 rounded-lg p-3 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm">
              <strong className="text-slate-900 dark:text-white block mb-1">Prática na Célula:</strong>
              <span className="text-slate-700 dark:text-slate-300">{trilho.pratica}</span>
            </div>
            <div className="bg-amber-50 dark:bg-amber-950/30 rounded-lg p-3 border border-amber-300 dark:border-amber-700 text-xs sm:text-sm">
              <strong className="text-amber-900 dark:text-amber-300 block mb-1">Marco de Passagem:</strong>
              <span className="text-amber-950 dark:text-amber-100">{trilho.marco}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Os 5 Ministérios como Equipadores */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="text-purple-600" size={20} />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Os 5 Ministérios como “Equipadores” (Efésios 4:11-12)
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4">
          Os cinco ministérios não fazem a obra sozinhos — eles equipam toda a igreja local para multiplicar nas células.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {EQUIPADORES.map((eq) => {
            const Icon = eq.icon;
            return (
              <div key={eq.nome} className={`rounded-xl border-l-4 p-3.5 ${eq.cor}`}>
                <div className="flex items-center gap-2 font-extrabold text-sm mb-1">
                  <Icon size={16} />
                  <span>{eq.nome}</span>
                </div>
                <div className="text-xs font-bold opacity-80 mb-1.5">{eq.papel}</div>
                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{eq.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Papel Transversal do Profeta */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center gap-2 mb-3">
          <Users className="text-purple-600" size={20} />
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            O Papel Transversal do Profeta em Todos os Trilhos
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs sm:text-sm">
            <thead>
              <tr className="bg-purple-900 text-white">
                <th className="p-2.5 rounded-tl-lg">Degrau</th>
                <th className="p-2.5">Direção que o Profeta dá</th>
                <th className="p-2.5 rounded-tr-lg">Apoio que o Profeta oferece</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
              <tr>
                <td className="p-2.5 font-bold text-emerald-700 dark:text-emerald-400">1. Ganhar</td>
                <td className="p-2.5">Aponta o campo e as pessoas que a igreja local deve alcançar</td>
                <td className="p-2.5">Intercede pela colheita e respalda as estratégias de evangelismo</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-teal-700 dark:text-teal-400">2. Consolidar</td>
                <td className="p-2.5">Discerne as necessidades de quem chega e orienta o cuidado</td>
                <td className="p-2.5">Sustenta pastores e líderes no acompanhamento e na restauração</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-blue-700 dark:text-blue-400">3. Discipular</td>
                <td className="p-2.5">Confirma dons e chamados e alinha o ensino à Palavra e à visão</td>
                <td className="p-2.5">Exorta e corrige com amor, guardando a doutrina e o caráter</td>
              </tr>
              <tr>
                <td className="p-2.5 font-bold text-amber-700 dark:text-amber-400">4. Enviar</td>
                <td className="p-2.5">Discerne quem, quando e para onde enviar</td>
                <td className="p-2.5">Confirma e respalda os enviados e a abertura de novas células</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
