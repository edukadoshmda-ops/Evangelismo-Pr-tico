import React, { useState } from 'react';
import { AudioPlayer } from '../AudioPlayer';
import { Headphones, BookOpen, Sparkles, Heart, Award, Flame, CheckCircle2, HelpCircle, ArrowRight } from 'lucide-react';

export const AudioBookView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<'salvacao' | 'batismo'>('salvacao');
  const [selectedTextTab, setSelectedTextTab] = useState<string>('todos');

  // Handle course switch and reset tab to 'todos'
  const handleCourseChange = (course: 'salvacao' | 'batismo') => {
    setSelectedCourse(course);
    setSelectedTextTab('todos');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Top Study Mode Selector */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 sm:p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">Estudo em Destaque</span>
          <h2 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
            Selecione o Curso para Ouvir e Acompanhar
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleCourseChange('salvacao')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              selectedCourse === 'salvacao'
                ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-[1.02]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Flame size={16} className={selectedCourse === 'salvacao' ? 'text-amber-300' : 'text-slate-400'} />
            <span>A Certeza da Salvação</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20 text-white font-normal">8 Lições</span>
          </button>

          <button
            onClick={() => handleCourseChange('batismo')}
            className={`flex-1 sm:flex-initial px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 ${
              selectedCourse === 'batismo'
                ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20 scale-[1.02]'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            <Award size={16} className={selectedCourse === 'batismo' ? 'text-amber-200' : 'text-slate-400'} />
            <span>Curso de Batismo</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-black/20 text-white font-normal">6 Módulos</span>
          </button>
        </div>
      </div>

      {/* Header Info */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold mb-2">
          <Headphones size={14} className="text-amber-500" />
          {selectedCourse === 'salvacao' 
            ? 'Acervo de 8 Audiobooks & Edição Completa' 
            : 'Curso de Batismo & Discipulado Oficial (6 Módulos)'}
        </div>
        <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
          {selectedCourse === 'salvacao' 
            ? 'A Certeza da Salvação — As 8 Respostas Bíblicas' 
            : 'Curso de Batismo: O Que Jesus Deseja que Você Faça'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          {selectedCourse === 'salvacao'
            ? 'As 8 Respostas Bíblicas para o Evangelismo Pessoal • O Que Jesus Deseja que Você Faça — Ministrado e estruturado pelo Pr. Roberto Rodrigues Casas.'
            : 'Manual completo de Discipulado Bíblico em 6 Módulos — Ministrado e estruturado pelo Pr. Roberto Rodrigues Casas.'}
        </p>
      </div>

      {/* Main Player Component Synchronized with selectedCourse */}
      <AudioPlayer 
        categoryFilter={selectedCourse} 
        onCategoryFilterChange={(cat) => {
          if (cat === 'salvacao' || cat === 'batismo') {
            setSelectedCourse(cat);
            setSelectedTextTab('todos');
          }
        }} 
        onTrackChange={(track) => {
          if (track.category && track.category !== selectedCourse) {
            setSelectedCourse(track.category);
            setSelectedTextTab('todos');
          }
        }}
      />

      {/* Synchronized Transcripts & Reading Section */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h3 className="font-heading font-bold text-lg sm:text-xl text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen size={20} className={selectedCourse === 'salvacao' ? 'text-teal-600 dark:text-teal-400' : 'text-amber-600 dark:text-amber-400'} />
              {selectedCourse === 'salvacao'
                ? 'Roteiros & Transcrição das 8 Lições'
                : 'Roteiros & Transcrição do Curso de Batismo (6 Módulos)'}
            </h3>
            <p className="text-xs text-slate-400">
              {selectedCourse === 'salvacao'
                ? 'Acompanhe a leitura bíblica sincronizada com a narração em áudio'
                : 'Acompanhe o conteúdo integral dos 6 módulos de Discipulado e Batismo'}
            </p>
          </div>

          {/* Dynamic Text Switcher Tabs based on Selected Course */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setSelectedTextTab('todos')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedTextTab === 'todos'
                  ? (selectedCourse === 'salvacao' ? 'bg-teal-600 text-white shadow-sm' : 'bg-amber-600 text-white shadow-sm')
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              Visão Geral
            </button>

            {selectedCourse === 'salvacao' ? (
              [1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedTextTab(`licao${num}`)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedTextTab === `licao${num}`
                      ? 'bg-teal-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Lição {num}
                </button>
              ))
            ) : (
              [1, 2, 3, 4, 5, 6].map((num) => (
                <button
                  key={num}
                  onClick={() => setSelectedTextTab(`discipulado${num}`)}
                  className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                    selectedTextTab === `discipulado${num}`
                      ? 'bg-amber-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  Discipulado {num}
                </button>
              ))
            )}
          </div>
        </div>

        {/* Text Content Box */}
        <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-700/60 text-sm leading-relaxed text-slate-700 dark:text-slate-300 max-h-[480px] overflow-y-auto space-y-6">
          
          {/* ============================================================ */}
          {/* 1. CURSO 1: A CERTEZA DA SALVAÇÃO                           */}
          {/* ============================================================ */}
          {selectedCourse === 'salvacao' && (
            <>
              {selectedTextTab === 'todos' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-teal-500/10 to-emerald-500/10 border border-teal-500/20">
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-500" />
                      Roteiro Completo: As 8 Respostas da Certeza da Salvação
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Selecione uma lição específica acima para focar no estudo ou leia abaixo o panorama geral.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => setSelectedTextTab('licao1')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">I. PRIMEIRA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">A Certeza da Vida Eterna</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">1 João 5:11 • A vida eterna é uma dádiva em Cristo.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('licao2')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">II. SEGUNDA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">O Amor de Deus</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">João 3:16 • Deus tomou a iniciativa de dar Seu Filho.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('licao3')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-orange-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-orange-600 dark:text-orange-400">III. TERCEIRA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-orange-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">O Homem é Pecador</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Romanos 3:23 • Todos pecaram e estão separados de Deus.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('licao4')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-red-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-red-600 dark:text-red-400">IV. QUARTA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-red-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">A Consequência do Pecado</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Romanos 6:23 • O salário do pecado é a morte e separação eterna.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('licao5')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">V. QUINTA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">A Solução em Cristo</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Romanos 5:8 • Cristo morreu em nosso lugar na cruz.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('licao6')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">VI. SEXTA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">Recebendo pela Fé & Oração</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">João 1:12; Rom 10:9 • Confissão de boca e fé no coração.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('licao7')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">VII. SÉTIMA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">O Novo Nascimento</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Atos 19:2; João 3:6-7 • Exame sincero da decisão.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('licao8')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-indigo-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400">VIII. OITAVA RESPOSTA</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">Compartilhando a Salvação</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Isaías 52:7; Mateus 28:19 • O IDE e a multiplicação de discípulos.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTextTab === 'licao1' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-teal-600 dark:text-teal-400 text-base">I – PRIMEIRA RESPOSTA: A Certeza da Vida Eterna</h4>
                  <p>A Bíblia mostra que podemos ter certeza da vida eterna:</p>
                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 italic text-teal-900 dark:text-teal-200">
                    "E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho." — I João 5.11
                  </div>
                  <p>Deus <em>deu</em> a vida eterna, e ela está em <em>Jesus Cristo</em>. Ela não é conquistada por religião, boas obras ou méritos humanos, mas recebida pela fé em Cristo.</p>
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 italic text-slate-800 dark:text-slate-200">
                    "Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus." — I Coríntios 1.18
                  </div>
                </div>
              )}

              {selectedTextTab === 'licao2' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-rose-600 dark:text-rose-400 text-base">II – SEGUNDA RESPOSTA: O Amor de Deus</h4>
                  <p>Deus ama você e deseja lhe dar a vida eterna:</p>
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 italic text-rose-900 dark:text-rose-200">
                    "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna." — João 3.16
                  </div>
                  <p>O amor de Deus tomou a iniciativa de alcançar a humanidade oferecendo o Seu próprio Filho para que tivéssemos vida plena e abundante.</p>
                </div>
              )}

              {selectedTextTab === 'licao3' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-orange-600 dark:text-orange-400 text-base">III – TERCEIRA RESPOSTA: O Homem é Pecador</h4>
                  <p>Todos nós somos pecadores e o pecado nos separa de Deus:</p>
                  <div className="p-4 rounded-xl bg-orange-50 dark:bg-orange-950/40 border border-orange-200 dark:border-orange-800 italic text-orange-900 dark:text-orange-200">
                    "Porque todos pecaram e estão separados da presença de Deus." — Romanos 3.23
                  </div>
                  <p>Reconhecer que somos pecadores e necessitados da graça divina é a porta de entrada para a salvação.</p>
                </div>
              )}

              {selectedTextTab === 'licao4' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-red-600 dark:text-red-400 text-base">IV – QUARTA RESPOSTA: A Consequência do Pecado</h4>
                  <p>O pecado traz como consequência a morte e a separação de Deus:</p>
                  <div className="p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 italic text-red-900 dark:text-red-200">
                    "Porque o salário do pecado é a morte..." — Romanos 6.23
                  </div>
                  <p>A Bíblia apresenta a morte como separação de Deus. Após a morte, a pessoa enfrentará a eternidade, no céu ou no inferno.</p>
                </div>
              )}

              {selectedTextTab === 'licao5' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-teal-600 dark:text-teal-400 text-base">V – QUINTA RESPOSTA: A Solução de Deus</h4>
                  <p>Deus providenciou a solução para a condenação: <em>Jesus Cristo morreu em nosso lugar.</em></p>
                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 italic text-teal-900 dark:text-teal-200">
                    "Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores." — Romanos 5.8
                  </div>
                  <p>Jesus entregou seu corpo e derramou seu sangue para o perdão dos pecados.</p>
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 italic text-slate-800 dark:text-slate-200">
                    "Pois Cristo, o nosso cordeiro da Páscoa, já foi sacrificado por nós." — I Coríntios 5.7
                  </div>
                </div>
              )}

              {selectedTextTab === 'licao6' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-emerald-600 dark:text-emerald-400 text-base">VI – SEXTA RESPOSTA: Recebendo pela Fé</h4>
                  <p>A vida eterna pode ser recebida pela fé em Jesus Cristo:</p>
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 italic text-emerald-900 dark:text-emerald-200">
                    "Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome." — João 1.12
                  </div>
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 italic text-slate-800 dark:text-slate-200">
                    "Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo." — Romanos 10.9
                  </div>
                  
                  <div className="p-5 rounded-2xl bg-gradient-to-br from-teal-900 to-slate-950 text-white space-y-2">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                      <Heart size={14} className="text-rose-400 fill-rose-400" /> Oração de Decisão:
                    </span>
                    <p className="italic text-sm sm:text-base border-l-2 border-amber-400 pl-3">
                      "Senhor Deus, reconheço que sou pecador e que preciso de Ti. Creio que Jesus morreu na cruz por mim, pagando o preço da minha condenação, e que ressuscitou. Pela fé, recebo Jesus Cristo e o teu Espírito Santo em meu coração. Amém."
                    </p>
                  </div>
                </div>
              )}

              {selectedTextTab === 'licao7' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-sky-600 dark:text-sky-400 text-base">VII – SÉTIMA RESPOSTA: O Novo Nascimento</h4>
                  <p>A decisão deve ser examinada com sinceridade:</p>
                  <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 italic text-sky-900 dark:text-sky-200">
                    "Recebeste vós o Espírito Santo quando crestes?" — Atos 19.2
                  </div>
                  <p>A verdadeira decisão não produz apenas conhecimento, mas um <em>novo nascimento</em>.</p>
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 italic text-slate-800 dark:text-slate-200">
                    "O que é nascido da carne é carne, e o que é nascido do Espírito é espírito. Necessário é nascer de novo." — João 3.6-7
                  </div>
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-center font-bold">
                    Pergunta: "Se você morresse agora, teria certeza de que está salvo?"
                  </div>
                </div>
              )}

              {selectedTextTab === 'licao8' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-indigo-600 dark:text-indigo-400 text-base">VIII – OITAVA RESPOSTA: Compartilhando a Salvação & Conclusão</h4>
                  <p>Quem experimenta a salvação deve compartilhá-la com outras pessoas:</p>
                  <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 italic text-indigo-900 dark:text-indigo-200">
                    "Quão formosos são os pés dos que anunciam as boas novas, dos que anunciam a salvação." — Isaías 52.7
                  </div>
                  <p>Jesus também ordenou:</p>
                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800 italic text-slate-800 dark:text-slate-200">
                    "Vão e façam discípulos de todas as nações..." — Mateus 28.19-20
                  </div>
                  <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 space-y-2">
                    <span className="font-bold text-xs uppercase tracking-wider block">Conclusão:</span>
                    <p className="text-sm">
                      A Bíblia ensina que todos somos pecadores, que o pecado traz condenação, mas que Deus, por amor, enviou Jesus Cristo para morrer em nosso lugar. A salvação é recebida pela fé em Cristo e deve ser compartilhada com outras pessoas.
                    </p>
                  </div>
                </div>
              )}
            </>
          )}

          {/* ============================================================ */}
          {/* 2. CURSO 2: CURSO DE BATISMO & DISCIPULADO                   */}
          {/* ============================================================ */}
          {selectedCourse === 'batismo' && (
            <>
              {selectedTextTab === 'todos' && (
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-gradient-to-r from-amber-500/10 via-orange-500/10 to-yellow-500/10 border border-amber-500/20">
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-base flex items-center gap-2">
                      <Sparkles size={16} className="text-amber-500" />
                      Manual Completo: Os 6 Módulos de Discipulado & Batismo
                    </h4>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                      Selecione um módulo acima para ver versículos, fundamentos práticos e questões de reflexão e aplicação.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div 
                      onClick={() => setSelectedTextTab('discipulado1')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-amber-600 dark:text-amber-400">DISCIPULADO I</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-amber-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">O Que Jesus Deseja que Eu Faça</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">João 10:10 • Vida abundante e compromisso com o Senhor.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('discipulado2')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-teal-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400">DISCIPULADO II</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-teal-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">Leitura Diária da Bíblia</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">2 Timóteo 3:16-17; Sl 119:105 • Alimento espiritual para a alma.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('discipulado3')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-sky-600 dark:text-sky-400">DISCIPULADO III</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-sky-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">Oração Diária</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Filipenses 4:6-7; Mt 6:6 • Intimidade e dependência de Deus.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('discipulado4')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">DISCIPULADO IV</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">Contribuição com Alegria</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">2 Coríntios 9:7; Ml 3:10 • Generosidade e honra ao Reino.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('discipulado5')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-purple-600 dark:text-purple-400">DISCIPULADO V</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-purple-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">Ser Guiado pelo Espírito Santo</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Efésios 5:18; Gl 5:22 • Plenitude, dons e fruto do Espírito.</p>
                    </div>

                    <div 
                      onClick={() => setSelectedTextTab('discipulado6')}
                      className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-rose-500 hover:shadow-md cursor-pointer transition-all space-y-1.5 group"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-rose-600 dark:text-rose-400">DISCIPULADO VI</span>
                        <ArrowRight size={13} className="text-slate-300 group-hover:text-rose-500 transition-colors" />
                      </div>
                      <h5 className="font-bold text-xs text-slate-900 dark:text-white">A Importância de Congregarmos</h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400">Hebreus 10:24-25; 1 Co 12:27 • Comunhão e corpo de Cristo.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTextTab === 'discipulado1' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-amber-600 dark:text-amber-400 text-base">
                    Discipulado I – O Que Jesus Deseja que Eu Faça
                  </h4>
                  <p>
                    Aceitar Jesus Cristo como Salvador é o primeiro passo de uma jornada emocionante e transformadora. A partir deste momento, você inicia uma caminhada de crescimento espiritual. Jesus deseja que você viva plenamente essa nova vida, alcançando o melhor que Ele tem para oferecer:
                  </p>
                  <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 italic text-amber-900 dark:text-amber-200 space-y-2">
                    <p>"Eu vim para que tenham vida e a tenham em abundância." — João 10:10</p>
                    <p>"Se vocês me amam, obedecerão aos meus mandamentos." — João 14:15</p>
                    <p>"Porque todo aquele que invocar o nome do Senhor será salvo." — Romanos 10:13</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-amber-500" /> Os 3 Fundamentos Práticos:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li><strong>A Promessa de Jesus:</strong> Quem ouve as palavras de Cristo e crê nAquele que O enviou tem a vida eterna (João 5:24).</li>
                      <li><strong>A Atitude de Fé:</strong> A salvação não é conquistada por méritos, mas recebida pela graça mediante um clamor sincero.</li>
                      <li><strong>A Presença do Espírito Santo:</strong> Ele habita em nós e testifica que somos filhos de Deus (Romanos 8:16).</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-teal-500" /> Questões para Reflexão & Estudo Bíblico:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <p><strong>1. O que é necessário fazer para ser salvo? (Atos 16:31)</strong><br /><em>Resposta:</em> Crer no Senhor Jesus Cristo. A salvação vem pela fé, não por obras.</p>
                      <p><strong>2. O que Jesus promete a todos que O invocam? (Romanos 10:13)</strong><br /><em>Resposta:</em> Ele promete salvação para todo aquele que clamar por Ele com sinceridade.</p>
                      <p><strong>3. Que tipo de vida é prometida a quem aceita a Cristo? (João 3:16)</strong><br /><em>Resposta:</em> A vida eterna, que começa agora e continua para sempre, com paz e propósito.</p>
                      <p><strong>4. O que devemos fazer quando pecamos? (1 João 1:9)</strong><br /><em>Resposta:</em> Confessar nossos pecados a Deus. Ele é fiel e justo para perdoar e nos purificar.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTextTab === 'discipulado2' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-teal-600 dark:text-teal-400 text-base">
                    Discipulado II – Leitura Diária da Bíblia
                  </h4>
                  <p>
                    A Bíblia é a carta de amor de Deus e o mapa para a nossa jornada. Assim como nosso corpo físico necessita de alimento diário para se manter forte, nossa vida espiritual precisa da Palavra de Deus todos os dias:
                  </p>
                  <div className="p-4 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 italic text-teal-900 dark:text-teal-200 space-y-2">
                    <p>"Toda a Escritura é inspirada por Deus e é útil para o ensino, para a repreensão, para a correção e para a instrução na justiça..." — 2 Timóteo 3:16-17</p>
                    <p>"A tua palavra é lâmpada para os meus pés e luz para o meu caminho." — Salmos 119:105</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-teal-500" /> Os 3 Fundamentos Práticos:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li><strong>Valor da Palavra:</strong> A Bíblia é a fonte infalível da verdade que nos guia em todas as decisões da vida.</li>
                      <li><strong>Poder Transformador:</strong> Ela corrige, confronta, cura o nosso interior e renova a nossa mente.</li>
                      <li><strong>Alimento Diário:</strong> A alma necessita da Palavra para perseverar e crescer com firmeza na fé.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-teal-500" /> Questões para Reflexão & Estudo Bíblico:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <p><strong>1. O que torna a Bíblia diferente de qualquer outro livro? (2 Pedro 1:20-21)</strong><br /><em>Resposta:</em> Ela é inspirada pelo Espírito Santo e revela a vontade viva de Deus.</p>
                      <p><strong>2. Como a Palavra nos ajuda no dia a dia? (Salmos 119:105)</strong><br /><em>Resposta:</em> Ela nos guia com sabedoria, ilumina nossos caminhos e protege nossos passos.</p>
                      <p><strong>3. O que acontece quando meditamos continuamente na Palavra? (Salmos 1:2-3)</strong><br /><em>Resposta:</em> Somos como árvores plantadas junto a ribeiros, frutíferas e prósperas.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTextTab === 'discipulado3' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-sky-600 dark:text-sky-400 text-base">
                    Discipulado III – Oração Diária
                  </h4>
                  <p>
                    Orar é simplesmente conversar com Deus como um filho conversa com seu pai amoroso. Não requer fórmulas complicadas, mas sinceridade de coração:
                  </p>
                  <div className="p-4 rounded-xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-800 italic text-sky-900 dark:text-sky-200 space-y-2">
                    <p>"Não andem ansiosos por coisa alguma, mas em tudo, pela oração e súplicas, e com ação de graças, apresentem seus pedidos a Deus. E a paz de Deus... guardará o coração e a mente de vocês em Cristo Jesus." — Filipenses 4:6-7</p>
                    <p>"Mas, quando você orar, vá para seu quarto, feche a porta e ore a seu Pai, que está em secreto." — Mateus 6:6</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-sky-500" /> Os 3 Fundamentos Práticos:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li><strong>Acesso Direto ao Pai:</strong> Em Cristo, temos livre acesso ao trono da graça em qualquer momento e lugar.</li>
                      <li><strong>Paz que Excede Todo Entendimento:</strong> A oração dissipa a ansiedade e enche a alma de serenidade sobrenatural.</li>
                      <li><strong>Estilo de Vida:</strong> Orar sem cessar é manter uma comunhão viva e contínua com o Senhor ao longo do dia.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-sky-500" /> Questões para Reflexão & Estudo Bíblico:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <p><strong>1. Como devemos nos aproximar de Deus em oração? (Filipenses 4:6)</strong><br /><em>Resposta:</em> Com confiança, gratidão e sinceridade, sem ansiedade.</p>
                      <p><strong>2. O que Jesus ensina sobre a oração secreta? (Mateus 6:6)</strong><br /><em>Resposta:</em> Que Deus vê o secreto e nos recompensa publicamente.</p>
                      <p><strong>3. Como o Espírito Santo nos auxilia quando não sabemos orar? (Romanos 8:26)</strong><br /><em>Resposta:</em> Ele intercede por nós com gemidos inexprimíveis.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTextTab === 'discipulado4' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-emerald-600 dark:text-emerald-400 text-base">
                    Discipulado IV – Contribuição com Alegria
                  </h4>
                  <p>
                    A generosidade reflete o próprio caráter de Deus, que nos deu o que tinha de mais precioso. Contribuir com dízimos e ofertas é um ato de adoração, fé e gratidão:
                  </p>
                  <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 italic text-emerald-900 dark:text-emerald-200 space-y-2">
                    <p>"Cada um dê conforme determinou em seu coração, não com pesar ou por obrigação, pois Deus ama quem dá com alegria." — 2 Coríntios 9:7</p>
                    <p>"Tragam todos os dízimos à casa do tesouro... e façam prova de mim nisto, diz o Senhor dos Exércitos, se eu não vos abrir as janelas do céu..." — Malaquias 3:10</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-emerald-500" /> Os 3 Fundamentos Práticos:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li><strong>Princípio do Coração:</strong> Onde estiver o seu tesouro, aí estará também o seu coração (Mateus 6:21).</li>
                      <li><strong>Sustento da Obra & Missões:</strong> Os recursos mantêm a pregação do Evangelho, a estrutura da igreja e a assistência social.</li>
                      <li><strong>Semeadura e Colheita:</strong> Quem semeia com fartura e generosidade, colherá bênçãos abundantes.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-emerald-500" /> Questões para Reflexão & Estudo Bíblico:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <p><strong>1. Com que atitude de coração devemos contribuir? (2 Coríntios 9:7)</strong><br /><em>Resposta:</em> Com alegria e liberdade voluntária, nunca por obrigação ou peso.</p>
                      <p><strong>2. O que a Bíblia ensina sobre honrar ao Senhor com os nossos bens? (Provérbios 3:9-10)</strong><br /><em>Resposta:</em> Que nossos celeiros se encherão fartamente de bênçãos.</p>
                      <p><strong>3. Como a generosidade afeta a nossa caminhada cristã? (Lucas 6:38)</strong><br /><em>Resposta:</em> A medida que usamos com os outros será a mesma medida que Deus usará conosco.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTextTab === 'discipulado5' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-purple-600 dark:text-purple-400 text-base">
                    Discipulado V – Ser Guiado pelo Espírito Santo
                  </h4>
                  <p>
                    O Espírito Santo é a terceira pessoa da Trindade que habita em cada pessoa que aceita a Jesus Cristo. Ele é nosso Consolador, Guia, Mestre e fonte de poder espiritual:
                  </p>
                  <div className="p-4 rounded-xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 italic text-purple-900 dark:text-purple-200 space-y-2">
                    <p>"E não se embriaguem com vinho, que é uma vida desregrada, mas encham-se do Espírito..." — Efésios 5:18</p>
                    <p>"Mas o fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão e domínio próprio." — Gálatas 5:22-23</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-purple-500" /> Os 3 Fundamentos Práticos:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li><strong>O Consolador & Mestre Interior:</strong> Ele nos ensina todas as verdades e nos faz lembrar os ensinamentos de Jesus (João 14:26).</li>
                      <li><strong>Andar no Espírito:</strong> Ser sensível à Sua voz diária para não ceder aos desejos da natureza carnal.</li>
                      <li><strong>O Fruto do Espírito:</strong> O caráter de Cristo desenvolvido continuamente em nossas atitudes e relacionamentos.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-purple-500" /> Questões para Reflexão & Estudo Bíblico:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <p><strong>1. Qual é a missão do Espírito Santo em nossas vidas? (João 14:26)</strong><br /><em>Resposta:</em> Ensinar todas as coisas, consolar e glorificar a Jesus.</p>
                      <p><strong>2. Quem são os verdadeiros filhos de Deus segundo Paulo? (Romanos 8:14)</strong><br /><em>Resposta:</em> Todos os que são guiados pelo Espírito de Deus.</p>
                      <p><strong>3. Para que recebemos o poder do Espírito Santo? (Atos 1:8)</strong><br /><em>Resposta:</em> Para sermos testemunhas vivas de Cristo até os confins da terra.</p>
                    </div>
                  </div>
                </div>
              )}

              {selectedTextTab === 'discipulado6' && (
                <div className="space-y-4">
                  <h4 className="font-heading font-bold text-rose-600 dark:text-rose-400 text-base">
                    Discipulado VI – A Importância de Congregarmos
                  </h4>
                  <p>
                    Nenhum cristão foi chamado para viver isolado. A igreja local é a família da fé, o corpo visível de Cristo onde somos acolhidos, cuidados, discipulados e fortalecidos:
                  </p>
                  <div className="p-4 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 italic text-rose-900 dark:text-rose-200 space-y-2">
                    <p>"E consideremo-nos uns aos outros, para nos estimularmos ao amor e às boas obras, não deixando a nossa congregação, como é costume de alguns, antes admoestando-nos uns aos outros..." — Hebreus 10:24-25</p>
                    <p>"Ora, vocês são o corpo de Cristo, e cada um de vocês, individualmente, é membro desse corpo." — 1 Coríntios 12:27</p>
                  </div>

                  <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2">
                    <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 size={15} className="text-rose-500" /> Os 3 Fundamentos Práticos:
                    </span>
                    <ul className="text-xs space-y-1 text-slate-600 dark:text-slate-400 list-disc list-inside">
                      <li><strong>O Corpo Vivo de Cristo:</strong> Cada membro tem dons únicos e é essencial para o funcionamento saudável da igreja.</li>
                      <li><strong>Encorajamento Mútuo & Comunhão:</strong> Juntos superamos lutas, oramos uns pelos outros e celebramos vitórias.</li>
                      <li><strong>Crescimento & Maturidade:</strong> Na igreja recebemos a cobertura espiritual dos pastores e líderes para amadurecer na fé.</li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 space-y-2">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-1.5">
                      <HelpCircle size={15} className="text-rose-500" /> Questões para Reflexão & Estudo Bíblico:
                    </span>
                    <div className="space-y-1.5 text-xs">
                      <p><strong>1. Por que a Bíblia adverte a não deixarmos de congregar? (Hebreus 10:25)</strong><br /><em>Resposta:</em> Porque na comunhão somos estimulados ao amor e perseverança na fé.</p>
                      <p><strong>2. O que Jesus promete quando dois ou mais se reúnem em Seu nome? (Mateus 18:20)</strong><br /><em>Resposta:</em> Ele promete estar presente no meio deles com Sua autoridade e graça.</p>
                      <p><strong>3. Como o salmista descreve a bênção da união entre os irmãos? (Salmos 133:1)</strong><br /><em>Resposta:</em> "Oh! Quão bom e quão suave é que os irmãos vivam em união! Ali o Senhor derrama a Sua bênção e vida para sempre."</p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

        </div>
      </div>
    </div>
  );
};
