import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BaseLayout } from '../core/BaseLayout';
import { 
  BookOpen, Heart, AlertTriangle, Cross, ShieldCheck, CheckCircle2, 
  Send, Sparkles, Award, GraduationCap, Users, ArrowRight, Check
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  // Typewriter effect phrases
  const phrases = [
    "Quem tem o Filho de Deus, tem a vida eterna.",
    "Quase 50 anos dedicados à pregação do Evangelho.",
    "Um método prático, bíblico e transformador.",
    "A certeza da salvação para cada coração."
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const timer = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, text.length + 1));
        if (text.length === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentPhrase.substring(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
      }
    }, isDeleting ? 30 : 60);

    return () => clearTimeout(timer);
  }, [text, isDeleting, phraseIndex]);

  // Method Cards Data
  const METHOD_CARDS = [
    {
      num: '1',
      title: 'A Certeza da Vida Eterna',
      icon: ShieldCheck,
      verse: '"E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho." — 1 João 5:11',
      description: 'A vida eterna não é merecida, é dada. Já foi concedida no passado e precisa ser recebida agora pela fé. Não provém de ritos, mas da pessoa de Jesus Cristo.'
    },
    {
      num: '2',
      title: 'O Amor Incondicional de Deus',
      icon: Heart,
      verse: '"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito..." — João 3:16',
      description: 'Deus ama o ser humano e deseja conceder a plena garantia da eternidade. Esse amor alcança o pecador exatamente onde ele está.'
    },
    {
      num: '3',
      title: 'Todos Somos Pecadores',
      icon: AlertTriangle,
      verse: '"...porque todos pecaram e destituídos estão da glória de Deus." — Romanos 3:23',
      description: 'O pecado nos separou do Criador. Reconhecer nossa fragilidade e carência é o primeiro passo para o arrependimento genuíno.'
    },
    {
      num: '4',
      title: 'O Preço do Pecado',
      icon: AlertTriangle,
      verse: '"Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna..." — Romanos 6:23',
      description: 'A morte espiritual é o resultado da separação. Nenhum esforço próprio pode anular a sentença, senão a dádiva da graça divina.'
    },
    {
      num: '5',
      title: 'Jesus Pagou a Nossa Dívida',
      icon: Cross,
      verse: '"Mas Deus prova o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores." — Romanos 5:8',
      description: 'Na cruz do Calvário, o Filho de Deus assumiu a condenação em nosso lugar. A dívida foi cancelada por completo.'
    },
    {
      num: '6',
      title: 'Fé Genuína vs. Fé Intelectual',
      icon: BookOpen,
      verse: '"Porque pela graça sois salvos, por meio da fé; e isto não vem de vós, é dom de Deus." — Efésios 2:8',
      description: 'Não basta concordar intelectualmente com fatos sobre Jesus; é necessário confiar de todo o coração a vida e a eternidade em Suas mãos.'
    },
    {
      num: '7',
      title: 'A Decisão Pessoal',
      icon: CheckCircle2,
      verse: '"Eis que estou à porta, e bato; se alguém ouvir a minha voz, e abrir a porta, entrarei..." — Apocalipse 3:20',
      description: 'A salvação requer um ato voluntário: abrir a porta do coração e confessar a Cristo como Salvador e Senhor supremo.'
    },
    {
      num: '8',
      title: 'A Plena Certeza Bíblica',
      icon: CheckCircle2,
      verse: '"Estas coisas vos escrevi... para que saibais que tendes a vida eterna." — 1 João 5:13',
      description: 'Não é presunção; é confiança na fidelidade da Palavra de Deus. Quem tem o Filho de Deus tem a vida para sempre.'
    }
  ];

  // Contact form submission state
  const [formSent, setFormSent] = useState(false);
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSent(true);
    setTimeout(() => setFormSent(false), 5000);
  };

  return (
    <BaseLayout>
      {/* 1. Hero Section */}
      <section id="inicio" className="relative overflow-hidden py-16 sm:py-24 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Pastor Photo Column - Circular Seal */}
            <div className="lg:col-span-5 flex justify-center order-2 lg:order-1">
              <div className="relative w-72 sm:w-80 md:w-96 aspect-square flex items-center justify-center transition-transform duration-300 hover:scale-105">
                <img
                  src="/Imagem/Gemini_Generated_Image_gjfs5ugjfs5ugjfs__1_-removebg.png"
                  alt="Pr. Roberto Rodrigues Casas - Quem Sou Eu?"
                  className="w-full h-full object-contain select-none"
                />
              </div>
            </div>

            {/* Hero Text Column */}
            <div className="lg:col-span-7 space-y-6 order-1 lg:order-2 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800/80 text-teal-700 dark:text-teal-300 text-xs sm:text-sm font-semibold">
                <Sparkles size={16} className="text-amber-500" />
                Método Eficaz de Evangelismo Pessoal
              </div>

              <h1 className="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                A Certeza da <span className="text-gradient">Vida Eterna</span>
              </h1>

              {/* Typewriter Display */}
              <div className="h-14 flex items-center justify-center lg:justify-start">
                <p className="font-mono text-base sm:text-xl font-medium text-amber-600 dark:text-amber-400 border-r-2 border-amber-500 pr-1 animate-pulse">
                  {text}
                </p>
              </div>

              <p className="text-slate-600 dark:text-slate-300 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Descubra o método prático e bíblico desenvolvido pelo <strong>Pr. Roberto Casas</strong> ao longo de quase cinco décadas de ministério, capacitando líderes e alcançando milhares de almas para o Reino de Deus.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <a
                  href="#metodo"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold py-3.5 px-8 rounded-2xl shadow-lg shadow-teal-600/25 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <BookOpen size={18} />
                  Conhecer o Método
                </a>

                <Link
                  to="/login"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-800 text-slate-800 dark:text-white font-semibold py-3.5 px-8 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-teal-500 dark:hover:border-teal-400 shadow-sm transition-all duration-200 hover:scale-105"
                >
                  Área do Aluno <ArrowRight size={18} />
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. Stats Section */}
      <section className="py-12 bg-white dark:bg-slate-900 border-y border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
            
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-500 mx-auto flex items-center justify-center mb-3">
                <Award size={26} />
              </div>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-gradient">+50 Anos</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">De Ministério Pastoral Ativo</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-500 mx-auto flex items-center justify-center mb-3">
                <GraduationCap size={26} />
              </div>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-gradient">55+ Cursos</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">Especializações e Treinamentos</p>
            </div>

            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 hover:scale-105 transition-transform duration-200">
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-500 mx-auto flex items-center justify-center mb-3">
                <Users size={26} />
              </div>
              <h3 className="font-heading font-bold text-3xl sm:text-4xl text-gradient">Milhares</h3>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400 mt-1">De Vidas Impactadas pelo Evangelho</p>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Trajetória Section */}
      <section id="trajetoria" className="py-20 bg-slate-50 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
              Trajetória e <span className="text-gradient">Formação Ministerial</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Preparação teológica sólida e dedicação ininterrupta junto às principais convenções e seminários do país.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3 hover:border-teal-500/50 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                1976
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">Início Ministerial</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Consagrado ao ministério pastoral, dando início às campanhas de evangelização e plantação de congregações.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3 hover:border-teal-500/50 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
                STBE
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">STBE Belém</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Bacharel em Teologia pela prestigiada Convenção Batista Brasileira, sedimentando raízes bíblicas e exegéticas.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3 hover:border-teal-500/50 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
                55+
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">Capacitação Contínua</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Participação em conferências internacionais, liderança de discipulado e treinamentos de capelania.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-md space-y-3 hover:border-teal-500/50 transition-all duration-200">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
                Hoje
              </div>
              <h3 className="font-heading font-bold text-lg text-slate-800 dark:text-white">Evangelismo Prático</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Difusão online e presencial de metodologia lógica e bíblica para equipar crentes com a certeza da salvação.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. Section: 8 Respostas Bíblicas que Garantem a sua Salvação */}
      <section id="metodo" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
            <h2 className="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl text-slate-900 dark:text-white">
              8 Respostas Bíblicas que <span className="text-gradient">Garantem a sua Salvação</span>
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Um roteiro bíblico, lógico e eficaz para compreender e compartilhar a certeza da vida eterna em Jesus Cristo.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {METHOD_CARDS.map((card) => {
              const IconComp = card.icon;
              return (
                <div
                  key={card.num}
                  className="bg-slate-50 dark:bg-slate-800/70 rounded-2xl p-6 border border-slate-200 dark:border-slate-700/80 hover:border-teal-500 dark:hover:border-teal-400 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-teal-500 text-white flex items-center justify-center font-heading font-bold text-sm shadow-md">
                        {card.num}
                      </div>
                      <IconComp size={20} className="text-teal-600 dark:text-teal-400 opacity-75 group-hover:scale-110 transition-transform" />
                    </div>

                    <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white pt-1">
                      {card.title}
                    </h3>

                    <div className="text-xs italic bg-teal-50 dark:bg-teal-950/50 text-teal-800 dark:text-teal-300 p-3 rounded-xl border border-teal-200/60 dark:border-teal-800/40">
                      {card.verse}
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                      {card.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-700 flex items-center gap-1 text-[11px] font-semibold text-teal-600 dark:text-teal-400">
                    <Check size={14} /> Passo Essencial do Roteiro
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. Contact Section */}
      <section id="contato" className="py-24 bg-white dark:bg-slate-900 border-t border-slate-200/80 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Contact Info */}
            <div className="lg:col-span-5 space-y-6">
              <h2 className="font-heading font-bold text-3xl sm:text-4xl text-slate-900 dark:text-white">
                Fale com a <span className="text-gradient">Coordenação</span>
              </h2>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
                Deseja convidar o Pr. Roberto Casas para palestras, seminários de evangelismo em sua igreja ou receber orientações personalizadas? Entre em contato.
              </p>

              <div className="space-y-4 pt-2">
                <a
                  href="https://wa.me/5568992393910"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-500 transition-all duration-200 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-emerald-500 text-white flex items-center justify-center text-xl shadow-md group-hover:scale-105 transition-transform">
                    <i className="fab fa-whatsapp"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">WhatsApp Direto</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">(68) 99239-3910</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-12 h-12 rounded-xl bg-teal-500 text-white flex items-center justify-center text-xl shadow-md">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 dark:text-white text-sm">E-mail Oficial</h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400">edukdadoshma@gmail.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-slate-50 dark:bg-slate-800/80 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-xl">
                <h3 className="font-heading font-bold text-xl text-slate-900 dark:text-white mb-2">
                  Envie uma Mensagem
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">
                  Preencha o formulário abaixo e entraremos em contato com brevidade.
                </p>

                {formSent ? (
                  <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center space-y-2 animate-fadeIn">
                    <CheckCircle2 size={32} className="mx-auto text-emerald-600" />
                    <h4 className="font-bold">Mensagem Enviada!</h4>
                    <p className="text-xs">Obrigado pelo seu contato. Responderemos o mais breve possível.</p>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Seu Nome
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Ex: João da Silva"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Seu E-mail
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="seuemail@exemplo.com"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                        Mensagem ou Solicitação
                      </label>
                      <textarea
                        required
                        rows={4}
                        placeholder="Como podemos te ajudar?"
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all resize-none"
                      ></textarea>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white font-semibold shadow-md shadow-teal-600/25 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                      <Send size={18} />
                      Enviar Mensagem
                    </button>
                  </form>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </BaseLayout>
  );
};
