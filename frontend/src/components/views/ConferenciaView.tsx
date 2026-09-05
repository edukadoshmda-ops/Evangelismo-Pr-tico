import React, { useState, useEffect } from 'react';
import { 
  Flame, Calendar, Clock, MapPin, User, Mail, Phone, 
  Church, Send, CheckCircle2, Shield, 
  MessageSquare, Users
} from 'lucide-react';

interface ConferenciaBooking {
  id: string;
  pastorName: string;
  churchName: string;
  state: string;
  city: string;
  phone: string;
  email: string;
  proposedDate: string;
  estimatedMembers: string;
  notes?: string;
  createdAt: string;
}

const STORAGE_KEY = 'pr_casas_conferencias_v1';
const CONTACT_EMAIL = 'edukdadoshma@gmail.com';
const WHATSAPP_1 = '5591993837093'; // (91) 99383-7093
const WHATSAPP_2 = '5568992393910'; // (68) 99239-3910

export const ConferenciaView: React.FC = () => {
  const [pastorName, setPastorName] = useState('');
  const [churchName, setChurchName] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [proposedDate, setProposedDate] = useState('');
  const [estimatedMembers, setEstimatedMembers] = useState('100 a 300 pessoas');
  const [notes, setNotes] = useState('');
  
  const [bookings, setBookings] = useState<ConferenciaBooking[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error('Erro ao ler agendamentos do localStorage:', e);
    }
    return [];
  });

  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookings));
    } catch (e) {
      console.error('Erro ao salvar agendamentos:', e);
    }
  }, [bookings]);

  // Format message text for WhatsApp and Email
  const getFormattedMessage = () => {
    return `*SOLICITAÇÃO DE AGENDAMENTO - CONFERÊNCIA EVANGELISMO PRÁTICO*

👤 *Pastor Responsável:* ${pastorName.trim()}
🏛️ *Igreja / Denominação:* ${churchName.trim()}
📍 *Cidade / Estado:* ${city.trim()} - ${state.trim()}
📱 *Telefone / WhatsApp:* ${phone.trim()}
✉️ *E-mail:* ${email.trim()}
🗓️ *Data Pretendida:* ${proposedDate.trim()}
👥 *Público Estimado:* ${estimatedMembers}
${notes.trim() ? `📝 *Observações:* ${notes.trim()}` : ''}

*Compromisso do Projeto:*
• 2 Meses prévios de Jejum, Oração e conscientização liderados pelo Pastor Local.
• Realização no Fim de Semana (Sexta à noite, Sábado manhã/tarde/noite, Domingo manhã/noite).

_Solicitação enviada através da Plataforma Evangelismo Prático (Pr. Roberto Casas)._`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pastorName.trim() || !churchName.trim() || !phone.trim()) return;

    const newBooking: ConferenciaBooking = {
      id: Date.now().toString(),
      pastorName: pastorName.trim(),
      churchName: churchName.trim(),
      state: state.trim(),
      city: city.trim(),
      phone: phone.trim(),
      email: email.trim(),
      proposedDate: proposedDate.trim(),
      estimatedMembers,
      notes: notes.trim(),
      createdAt: new Date().toLocaleDateString('pt-BR')
    };

    setBookings([newBooking, ...bookings]);
    setSubmittedSuccess(true);
  };

  const sendViaWhatsApp = (number: string) => {
    const text = getFormattedMessage();
    const encoded = encodeURIComponent(text);
    window.open(`https://wa.me/${number}?text=${encoded}`, '_blank', 'noopener,noreferrer');
  };

  const sendViaEmail = () => {
    const subject = encodeURIComponent(`Agendamento de Conferência: ${churchName} - Pr. ${pastorName}`);
    const body = encodeURIComponent(getFormattedMessage());
    window.open(`mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`, '_blank');
  };

  return (
    <div className="space-y-10 animate-fadeIn relative">
      {/* Top Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg space-y-4">
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold">
            <Flame size={14} className="text-amber-500" />
            Despertamento & Impacto Missionário
          </div>
          
          <h1 className="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-slate-900 dark:text-white leading-tight">
            Conferência Evangelismo Prático
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            Uma convocação espiritual e prática ministrada pelo <strong className="text-slate-900 dark:text-white font-bold">Pr. Roberto Casas</strong> para avivar a sua igreja local, capacitar cada membro no método das 8 Respostas Bíblicas e promover uma colheita de almas transformadora.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <Shield size={14} className="text-teal-600 dark:text-teal-400" /> 2 Meses de Jejum & Oração
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <Calendar size={14} className="text-teal-600 dark:text-teal-400" /> Imersão no Fim de Semana
            </span>
            <span className="flex items-center gap-1.5 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
              <Users size={14} className="text-teal-600 dark:text-teal-400" /> Treinamento com a Liderança
            </span>
          </div>
        </div>
      </div>

      {/* 2 Main Project Pillars: 1. O Projeto (2 Meses) | 2. A Realização (Fim de Semana) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Pilar 1: O Projeto (Preparação Espiritual) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-amber-500/30 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
                ETAPA 1
              </span>
              <span className="text-xs font-semibold text-slate-400">Preparação Prévia</span>
            </div>

            <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              <Flame size={22} className="text-amber-500" />
              1. O Projeto: 2 Meses de Jejum & Oração
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              O sucesso e o poder espiritual da conferência residem na intercessão contínua que antecede os dias do evento.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/50 space-y-1.5">
                <h4 className="font-bold text-xs text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                  <Church size={15} /> Conscientização da Igreja sobre o IDE
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Sensibilizar cada membro sobre o mandato de Jesus em Marcos 16:15 e a urgência da salvação de almas.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <User size={15} className="text-teal-500" /> Liderança Ativa do Pastor Local
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  O Pastor da Igreja Local é o líder central que faz a divulgação no púlpito e encoraja ativamente todos os membros e departamentos a jejuarem e orarem.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1.5">
                <h4 className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                  <Clock size={15} className="text-teal-500" /> Agendamento dos Períodos de Oração
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Os turnos de clamor, vigílias e dias de consagração serão agendados e coordenados diretamente pelo Pastor da igreja local.
                </p>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800/60 text-xs text-teal-800 dark:text-teal-300 font-medium flex items-center gap-2">
            <CheckCircle2 size={16} className="text-teal-600 shrink-0" />
            Igreja em oração = Colheita abundante e convertidos firmes na fé!
          </div>
        </div>

        {/* Pilar 2: A Realização do Projeto (Cronograma do Fim de Semana) */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-teal-500/30 shadow-xl space-y-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                ETAPA 2
              </span>
              <span className="text-xs font-semibold text-slate-400">Execução no Fim de Semana</span>
            </div>

            <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar size={22} className="text-teal-500" />
              2. Realização do Projeto: Cronograma
            </h3>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Uma imersão completa estruturada para impactar a congregação e as ruas da cidade:
            </p>

            <div className="space-y-2.5 pt-1">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold text-[11px] shrink-0">
                  SEXTA NOITE
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Abertura & Despertamento</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Culto de abertura e conscientização missionária com toda a congregação.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold text-[11px] shrink-0">
                  SÁBADO MANHÃ
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Treinamento Teológico & Prático</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Capacitação aprofundada nas 8 Respostas Bíblicas e uso do Playbook.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="px-2.5 py-1 rounded-lg bg-amber-600 text-white font-bold text-[11px] shrink-0">
                  SÁBADO TARDE
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Evangelismo Prático de Rua</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Saída em duplas e caravana nos bairros, praças e residências da cidade.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="px-2.5 py-1 rounded-lg bg-teal-600 text-white font-bold text-[11px] shrink-0">
                  SÁBADO NOITE
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Culto de Celebração & Testemunhos</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Reunião de gratidão e colheita de testemunhos dos novos convertidos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] shrink-0">
                  DOMINGO MANHÃ
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Escola de Discipulado Contínuo</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Orientações para consolidar as vidas ganhas e integrar aos pequenos grupos.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700">
                <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px] shrink-0">
                  DOMINGO NOITE
                </span>
                <div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-white">Grande Culto de Encerramento & Envio</h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Mensagem evangelística com apelo e oração de envio de toda a igreja.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* =========================================================================
          FORMULÁRIO DE AGENDAMENTO DA CONFERÊNCIA NA SUA IGREJA
          ========================================================================= */}
      <div className="p-6 sm:p-10 rounded-3xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-2xl space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 dark:border-slate-800 pb-5">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400">
              <Church size={16} />
              Formulário Oficial de Convite & Agendamento
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">
              Agende a Conferência de Evangelismo na sua Igreja
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              Preencha os dados abaixo para enviar o convite ministerial diretamente à coordenação do Pr. Roberto Casas.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs sm:text-right space-y-1.5 shrink-0">
            <span className="text-[11px] font-bold text-teal-600 dark:text-teal-400 block uppercase tracking-wider">
              Destinatários da Coordenação
            </span>
            <div className="space-y-1 text-slate-600 dark:text-slate-300 font-medium">
              <div className="flex items-center sm:justify-end gap-1.5 whitespace-nowrap">
                <Mail size={13} className="text-teal-500 shrink-0" />
                <span>{CONTACT_EMAIL}</span>
              </div>
              <div className="flex flex-wrap items-center sm:justify-end gap-x-2.5 gap-y-1">
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Phone size={13} className="text-emerald-500 shrink-0" /> (91) 99383-7093
                </span>
                <span className="text-slate-300 dark:text-slate-600 hidden sm:inline">•</span>
                <span className="flex items-center gap-1 whitespace-nowrap">
                  <Phone size={13} className="text-emerald-500 shrink-0" /> (68) 99239-3910
                </span>
              </div>
            </div>
          </div>
        </div>

        {submittedSuccess ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 space-y-4 animate-scaleUp">
            <div className="flex items-center gap-3 text-emerald-800 dark:text-emerald-200">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <h4 className="font-bold text-base">Solicitação de Agendamento Gerada com Sucesso!</h4>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Os dados foram preparados. Clique abaixo para enviar agora mesmo via WhatsApp ou E-mail.
                </p>
              </div>
            </div>

            {/* Quick Direct Send Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <button
                type="button"
                onClick={() => sendViaWhatsApp(WHATSAPP_1)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                <MessageSquare size={16} /> WhatsApp (91) 99383-7093
              </button>

              <button
                type="button"
                onClick={() => sendViaWhatsApp(WHATSAPP_2)}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                <MessageSquare size={16} /> WhatsApp (68) 99239-3910
              </button>

              <button
                type="button"
                onClick={sendViaEmail}
                className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                <Mail size={16} /> Enviar via E-mail
              </button>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSubmittedSuccess(false)}
                className="text-xs text-slate-500 hover:text-slate-800 dark:hover:text-white underline"
              >
                ← Preencher outro formulário
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleFormSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 1. Nome do Pastor */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <User size={13} className="text-teal-500" /> Nome do Pastor Responsável *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Pr. João da Silva"
                  value={pastorName}
                  onChange={(e) => setPastorName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* 2. Nome da Igreja */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Church size={13} className="text-teal-500" /> Nome da Igreja / Denominação *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Igreja Batista Central"
                  value={churchName}
                  onChange={(e) => setChurchName(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* 3. Estado & Cidade */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin size={13} className="text-teal-500" /> Estado (UF) *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: AC, PA, RO, SP, AM..."
                  value={state}
                  onChange={(e) => setState(e.target.value.toUpperCase())}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none uppercase"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <MapPin size={13} className="text-teal-500" /> Cidade *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Rio Branco, Belém, Manaus..."
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* 4. Telefone / WhatsApp */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Phone size={13} className="text-teal-500" /> Telefone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  placeholder="Ex: (91) 99999-9999"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* 5. E-mail */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Mail size={13} className="text-teal-500" /> E-mail de Contato *
                </label>
                <input
                  type="email"
                  required
                  placeholder="pastor@igreja.com.br"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              {/* 6. Data Pretendida */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Calendar size={13} className="text-teal-500" /> Data Pretendida / Mês *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ex: Novembro / 2026 ou 15 a 17/11"
                  value={proposedDate}
                  onChange={(e) => setProposedDate(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* 7. Quantidade de Membros Estimada & Observações */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                  <Users size={13} className="text-teal-500" /> Público / Membros Estimados
                </label>
                <select
                  value={estimatedMembers}
                  onChange={(e) => setEstimatedMembers(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold"
                >
                  <option value="Até 50 pessoas">Até 50 pessoas</option>
                  <option value="50 a 150 pessoas">50 a 150 pessoas</option>
                  <option value="150 a 300 pessoas">150 a 300 pessoas</option>
                  <option value="300 a 600 pessoas">300 a 600 pessoas</option>
                  <option value="Mais de 600 pessoas">Mais de 600 pessoas (Cruzada / Regional)</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Observações / Detalhes Adicionais (Opcional)
                </label>
                <input
                  type="text"
                  placeholder="Ex: Igreja sede com congregações no interior, evento de aniversário..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Submit Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div className="text-[11px] text-slate-400">
                Ao clicar em prosseguir, você poderá disparar a mensagem direta para os telefones e e-mail da coordenação.
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-600 to-emerald-600 hover:from-amber-600 hover:to-teal-700 text-white font-bold text-xs sm:text-sm shadow-xl shadow-teal-500/20 transition-all hover:scale-105 active:scale-95 shrink-0"
              >
                <Send size={16} />
                Solicitar Agendamento da Conferência
              </button>
            </div>

          </form>
        )}

      </div>

      {/* Histórico Local de Agendamentos */}
      {bookings.length > 0 && (
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 space-y-4 shadow-lg">
          <h4 className="font-heading font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar size={18} className="text-teal-500" />
            Agendamentos Solicitados na Plataforma ({bookings.length})
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {bookings.map((b) => (
              <div 
                key={b.id}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-teal-600 dark:text-teal-400">{b.churchName}</span>
                  <span className="text-[10px] text-slate-400">{b.createdAt}</span>
                </div>
                <p className="text-slate-700 dark:text-slate-300"><strong>Pastor:</strong> {b.pastorName}</p>
                <p className="text-slate-500"><strong>Local:</strong> {b.city} - {b.state}</p>
                <p className="text-slate-500"><strong>Data:</strong> {b.proposedDate}</p>
                <p className="text-slate-500"><strong>Contato:</strong> {b.phone} • {b.email}</p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
