import React, { useState, useEffect } from 'react';
import { 
  MessageSquareQuote, Plus, Heart, Sparkles, Send, 
  CheckCircle2, Pencil, Trash2, X, Check, AlertCircle 
} from 'lucide-react';

export interface Testimony {
  id: string;
  name: string;
  city: string;
  text: string;
  date: string;
  likes: number;
}

const STORAGE_KEY = 'pr_casas_testemunhos_v1';

const INITIAL_TESTIMONIES: Testimony[] = [
  {
    id: '1',
    name: 'Pr. Manoel Silva',
    city: 'Rio Branco - AC',
    text: 'Aplicamos o método das 8 Respostas Bíblicas do Pr. Roberto Casas em nossa congregação e vimos mais de 40 pessoas aceitarem a Cristo em um único fim de semana de evangelismo de rua!',
    date: '28/08/2026',
    likes: 34
  },
  {
    id: '2',
    name: 'Irmã Maria Luiza',
    city: 'Cruzeiro do Sul - AC',
    text: 'Eu tinha muito medo de falar de Jesus para os meus vizinhos. O audiobook e o roteiro do Playbook me deram a clareza e a coragem que eu precisava. Glória a Deus!',
    date: '15/08/2026',
    likes: 27
  },
  {
    id: '3',
    name: 'Diácono Roberto Alves',
    city: 'Porto Velho - RO',
    text: 'A simplicidade de 1 João 5:11-13 transformou a forma como discipulamos os novos convertidos. Todos têm a certeza da salvação gravada no coração.',
    date: '02/08/2026',
    likes: 19
  }
];

export const TestemunhosView: React.FC = () => {
  const [testimonies, setTestimonies] = useState<Testimony[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Erro ao ler testemunhos do localStorage:', e);
    }
    return INITIAL_TESTIMONIES;
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTestimony, setEditingTestimony] = useState<Testimony | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Form fields for new testimony
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [text, setText] = useState('');
  const [sentSuccess, setSentSuccess] = useState(false);

  // Form fields for editing testimony
  const [editName, setEditName] = useState('');
  const [editCity, setEditCity] = useState('');
  const [editText, setEditText] = useState('');

  // Persist whenever testimonies list changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(testimonies));
    } catch (e) {
      console.error('Erro ao salvar no localStorage:', e);
    }
  }, [testimonies]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !text.trim()) return;

    const newTestimony: Testimony = {
      id: Date.now().toString(),
      name: name.trim(),
      city: city.trim() || 'Brasil',
      text: text.trim(),
      date: new Date().toLocaleDateString('pt-BR'),
      likes: 1,
    };

    setTestimonies([newTestimony, ...testimonies]);
    setName('');
    setCity('');
    setText('');
    setSentSuccess(true);
    setTimeout(() => {
      setSentSuccess(false);
      setShowForm(false);
    }, 2000);
  };

  const handleStartEdit = (t: Testimony) => {
    setEditingTestimony(t);
    setEditName(t.name);
    setEditCity(t.city);
    setEditText(t.text);
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingTestimony || !editName.trim() || !editText.trim()) return;

    setTestimonies(testimonies.map(t => 
      t.id === editingTestimony.id 
        ? { 
            ...t, 
            name: editName.trim(), 
            city: editCity.trim() || 'Brasil', 
            text: editText.trim() 
          } 
        : t
    ));
    setEditingTestimony(null);
  };

  const handleDelete = (id: string) => {
    setTestimonies(testimonies.filter(t => t.id !== id));
    setDeleteConfirmId(null);
  };

  const handleLike = (id: string) => {
    setTestimonies(testimonies.map(t => t.id === id ? { ...t, likes: t.likes + 1 } : t));
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold mb-2">
            <Sparkles size={14} className="text-emerald-500" />
            Vidas Transformadas
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Mural de Testemunhos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Relatos de vidas salvas, batismos e impacto missionário do Evangelismo Prático.
          </p>
        </div>

        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditingTestimony(null);
          }}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-teal-600/20 transition-all hover:scale-105"
        >
          <Plus size={16} /> Compartilhar Testemunho
        </button>
      </div>

      {/* New Testimony Form */}
      {showForm && (
        <form onSubmit={handleSubmit} className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-xl space-y-4 animate-scaleUp">
          <div className="flex items-center justify-between">
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Enviar Meu Testemunho
            </h3>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {sentSuccess ? (
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center font-semibold text-xs flex items-center justify-center gap-2">
              <CheckCircle2 size={16} className="text-emerald-500" /> Testemunho publicado no mural com sucesso!
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  required
                  placeholder="Seu Nome Completo"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
                <input
                  type="text"
                  placeholder="Sua Cidade / Igreja"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                />
              </div>

              <textarea
                required
                rows={3}
                placeholder="Conte como o método ou mensagem abençoou sua vida..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
              ></textarea>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-2 rounded-xl bg-teal-600 text-white text-xs font-semibold hover:bg-teal-700 shadow-md transition-all"
                >
                  <Send size={14} /> Publicar
                </button>
              </div>
            </>
          )}
        </form>
      )}

      {/* Edit Testimony Modal */}
      {editingTestimony && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-lg p-6 rounded-3xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white flex items-center gap-2">
                <Pencil size={18} className="text-teal-500" />
                Editar Testemunho
              </h3>
              <button
                onClick={() => setEditingTestimony(null)}
                className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Nome / Autor
                  </label>
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Cidade / Igreja
                  </label>
                  <input
                    type="text"
                    value={editCity}
                    onChange={(e) => setEditCity(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                  Relato do Testemunho
                </label>
                <textarea
                  required
                  rows={4}
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setEditingTestimony(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-md transition-all"
                >
                  <Check size={15} /> Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4 text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Excluir Testemunho?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Esta ação removerá este testemunho permanentemente do mural.
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={() => handleDelete(deleteConfirmId)}
                className="inline-flex items-center gap-1.5 px-5 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-md transition-all"
              >
                <Trash2 size={14} /> Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Testimonies Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonies.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col justify-between space-y-4 hover:border-teal-500/50 transition-all group relative"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <MessageSquareQuote size={20} />
                </div>

                {/* Edit & Delete Action Buttons */}
                <div className="flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleStartEdit(t)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-500 hover:text-white text-slate-500 dark:text-slate-400 transition-all hover:scale-105"
                    title="Editar testemunho"
                  >
                    <Pencil size={13} />
                  </button>
                  <button
                    onClick={() => setDeleteConfirmId(t.id)}
                    className="p-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-rose-500 hover:text-white text-slate-500 dark:text-slate-400 transition-all hover:scale-105"
                    title="Excluir testemunho"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                "{t.text}"
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">{t.name}</h4>
                <p className="text-[10px] text-slate-400">{t.city} • {t.date}</p>
              </div>

              <button
                onClick={() => handleLike(t.id)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold hover:scale-105 transition-transform"
                title="Abençoado / Curtir"
              >
                <Heart size={14} className="fill-rose-500 text-rose-500" />
                {t.likes}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
