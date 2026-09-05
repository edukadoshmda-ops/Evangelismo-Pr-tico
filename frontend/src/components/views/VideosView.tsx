import React, { useState, useEffect } from 'react';
import { 
  Video, Play, Plus, Youtube, ExternalLink, 
  Trash2, Pencil, X, Check, AlertCircle, 
  CheckCircle2, Film, Music
} from 'lucide-react';

export type VideoTheme = 
  | 'Evangelismo' 
  | 'Testemunho' 
  | 'Edificação' 
  | 'Estudo' 
  | 'Seminários' 
  | 'Família' 
  | 'Teologia';

export interface VideoItem {
  id: string;
  title: string;
  theme: VideoTheme;
  speaker: string;
  duration: string;
  youtubeUrl: string;
  youtubeId?: string;
  thumbnail: string;
  description: string;
  createdAt: string;
}

const STORAGE_KEY = 'pr_casas_videos_v2';

const THEMES: VideoTheme[] = [
  'Evangelismo',
  'Testemunho',
  'Edificação',
  'Estudo',
  'Seminários',
  'Família',
  'Teologia'
];

function extractYouTubeId(url: string): string | null {
  if (!url) return null;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : null;
}

const INITIAL_VIDEOS: VideoItem[] = [
  {
    id: '1',
    title: 'Como Quebrar o Gelo e Fazer a Abordagem Inicial no Evangelismo',
    theme: 'Evangelismo',
    speaker: 'Pr. Roberto Casas',
    duration: '18:40',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80',
    description: 'Técnicas práticas desenvolvidas pelo Pr. Roberto Casas para iniciar conversas espirituais de forma natural com pessoas desconhecidas.',
    createdAt: '2026-08-10'
  },
  {
    id: '2',
    title: 'Explicando a Graça de Deus sem Religiosidade nem Barreiras',
    theme: 'Teologia',
    speaker: 'Pr. Roberto Casas',
    duration: '24:15',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&auto=format&fit=crop&q=80',
    description: 'Como apresentar o dom gratuito da salvação através das 8 Respostas Bíblicas sem criar preconceitos denominacionais.',
    createdAt: '2026-08-15'
  },
  {
    id: '3',
    title: 'Testemunho Impactante de Conversão e Libertação no Acre',
    theme: 'Testemunho',
    speaker: 'Pr. Roberto Casas & Convidados',
    duration: '15:20',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&auto=format&fit=crop&q=80',
    description: 'Relatos de vidas transformadas pelo poder da Palavra em cruzadas de rua e visitas pastorais nos municípios do interior.',
    createdAt: '2026-08-20'
  },
  {
    id: '4',
    title: 'Edificação Espiritual da Família nos Dias Atuais',
    theme: 'Família',
    speaker: 'Pr. Roberto Casas',
    duration: '32:50',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1529070538774-1843cb3265df?w=800&auto=format&fit=crop&q=80',
    description: 'Princípios bíblicos fundamentais para a criação dos filhos, comunhão conjugal e o altar de Deus no lar.',
    createdAt: '2026-08-25'
  },
  {
    id: '5',
    title: 'Seminário de Formação de Discipuladores & Mestres Bíblicos',
    theme: 'Seminários',
    speaker: 'Pr. Roberto Casas',
    duration: '45:10',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    description: 'Capacitação teológica e metodológica para pastores e obreiros multiplicarem líderes em suas igrejas locais.',
    createdAt: '2026-08-28'
  },
  {
    id: '6',
    title: 'Estudo Profundo sobre a Certeza da Vida Eterna em 1 João',
    theme: 'Estudo',
    speaker: 'Pr. Roberto Casas',
    duration: '28:30',
    youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    youtubeId: 'dQw4w9WgXcQ',
    thumbnail: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    description: 'Exegese verso a verso de Primeira João 5:11-13 mostrando porque a salvação não depende de sentimentos, mas da fidelidade de Deus.',
    createdAt: '2026-09-01'
  }
];

export const VideosView: React.FC = () => {
  const [videos, setVideos] = useState<VideoItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Erro ao ler vídeos do localStorage:', e);
    }
    return INITIAL_VIDEOS;
  });

  const [selectedTheme, setSelectedTheme] = useState<string>('Todos');
  const [activeVideo, setActiveVideo] = useState<VideoItem | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [editingVideo, setEditingVideo] = useState<VideoItem | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [theme, setTheme] = useState<VideoTheme>('Evangelismo');
  const [speaker, setSpeaker] = useState('Pr. Roberto Casas');
  const [duration, setDuration] = useState('20:00');
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [description, setDescription] = useState('');
  const [customThumbnail, setCustomThumbnail] = useState('');

  // Persist videos to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(videos));
    } catch (e) {
      console.error('Erro ao salvar vídeos no localStorage:', e);
    }
  }, [videos]);

  // Open Create Modal
  const openCreateModal = () => {
    setEditingVideo(null);
    setTitle('');
    setTheme('Evangelismo');
    setSpeaker('Pr. Roberto Casas');
    setDuration('20:00');
    setYoutubeUrl('');
    setDescription('');
    setCustomThumbnail('');
    setShowModal(true);
  };

  // Open Edit Modal
  const openEditModal = (video: VideoItem) => {
    setEditingVideo(video);
    setTitle(video.title);
    setTheme(video.theme);
    setSpeaker(video.speaker || 'Pr. Roberto Casas');
    setDuration(video.duration);
    setYoutubeUrl(video.youtubeUrl);
    setDescription(video.description);
    setCustomThumbnail(video.thumbnail);
    setShowModal(true);
  };

  // Handle Submit Video
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !youtubeUrl.trim()) return;

    const ytId = extractYouTubeId(youtubeUrl);
    const autoThumbnail = ytId 
      ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg`
      : 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800&auto=format&fit=crop&q=80';
    
    const finalThumbnail = customThumbnail.trim() || autoThumbnail;

    if (editingVideo) {
      // Update
      setVideos(videos.map(v => 
        v.id === editingVideo.id 
          ? {
              ...v,
              title: title.trim(),
              theme,
              speaker: speaker.trim() || 'Pr. Roberto Casas',
              duration: duration.trim() || '15:00',
              youtubeUrl: youtubeUrl.trim(),
              youtubeId: ytId || undefined,
              thumbnail: finalThumbnail,
              description: description.trim()
            }
          : v
      ));
    } else {
      // Create
      const newVideo: VideoItem = {
        id: Date.now().toString(),
        title: title.trim(),
        theme,
        speaker: speaker.trim() || 'Pr. Roberto Casas',
        duration: duration.trim() || '15:00',
        youtubeUrl: youtubeUrl.trim(),
        youtubeId: ytId || undefined,
        thumbnail: finalThumbnail,
        description: description.trim(),
        createdAt: new Date().toISOString().split('T')[0]
      };
      setVideos([newVideo, ...videos]);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowModal(false);
    }, 1200);
  };

  // Delete Video
  const handleDelete = (id: string) => {
    setVideos(videos.filter(v => v.id !== id));
    setDeleteConfirmId(null);
  };

  // Filtered Videos by Theme
  const filtered = selectedTheme === 'Todos' 
    ? videos 
    : videos.filter(v => v.theme === selectedTheme);

  // Helper to open direct YouTube Downloader helper
  const handleOpenDownloader = (video: VideoItem, type: 'video' | 'audio') => {
    const ytId = video.youtubeId || extractYouTubeId(video.youtubeUrl);
    if (ytId) {
      // Open YouTube download portal with video
      const downloadServiceUrl = type === 'audio'
        ? `https://y2meta.tube/en/youtube-to-mp3?q=https://www.youtube.com/watch?v=${ytId}`
        : `https://y2meta.tube/en/youtube-to-mp4?q=https://www.youtube.com/watch?v=${ytId}`;
      window.open(downloadServiceUrl, '_blank', 'noopener,noreferrer');
    } else {
      window.open(video.youtubeUrl, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <Video size={14} className="text-teal-500" />
            Galeria em Vídeo & Treinamentos
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Vídeos & Treinamentos
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Aulas, pregações e seminários do Pr. Roberto Casas organizados por temas bíblicos.
          </p>
        </div>

        {/* Action Button: Add YouTube Video */}
        <button
          onClick={openCreateModal}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-600/25 transition-all hover:scale-105 active:scale-95"
        >
          <Plus size={18} /> Adicionar / Baixar Vídeo do YouTube
        </button>
      </div>

      {/* Filter Tabs by Theme */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <button
          onClick={() => setSelectedTheme('Todos')}
          className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 ${
            selectedTheme === 'Todos'
              ? 'bg-teal-600 text-white shadow-md'
              : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
          }`}
        >
          Todos ({videos.length})
        </button>

        {THEMES.map(themeName => {
          const count = videos.filter(v => v.theme === themeName).length;
          return (
            <button
              key={themeName}
              onClick={() => setSelectedTheme(themeName)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all shrink-0 flex items-center gap-1.5 ${
                selectedTheme === themeName
                  ? 'bg-teal-600 text-white shadow-md'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span>{themeName}</span>
              <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-black/10 dark:bg-white/10 font-mono">
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(video => (
          <div
            key={video.id}
            className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-lg hover:shadow-2xl hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between"
          >
              <div>
                {/* Video Thumbnail Area */}
                <div 
                  onClick={() => setActiveVideo(video)}
                  className="relative aspect-video overflow-hidden bg-slate-950 cursor-pointer"
                >
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-slate-950/40 group-hover:bg-slate-950/20 transition-colors flex items-center justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-teal-600 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform">
                      <Play size={24} className="ml-1 fill-white" />
                    </div>
                  </div>

                  {/* Theme Badge */}
                  <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-teal-600/90 text-white text-[11px] font-bold backdrop-blur-sm shadow-md">
                    {video.theme}
                  </span>

                  {/* Duration */}
                  <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/80 text-white text-xs font-mono font-bold backdrop-blur-sm">
                    {video.duration}
                  </span>

                  {/* Edit / Delete Icons */}
                  <div 
                    onClick={(e) => e.stopPropagation()}
                    className="absolute top-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity"
                  >
                    <button
                      onClick={() => openEditModal(video)}
                      className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-teal-500 text-white backdrop-blur-md shadow-md transition-all hover:scale-105"
                      title="Editar Vídeo"
                    >
                      <Pencil size={12} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(video.id)}
                      className="p-1.5 rounded-xl bg-slate-900/80 hover:bg-rose-500 text-white backdrop-blur-md shadow-md transition-all hover:scale-105"
                      title="Excluir Vídeo"
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-semibold text-teal-600 dark:text-teal-400 truncate max-w-[180px]">
                      {video.speaker}
                    </span>
                    <span className="text-[11px] font-mono">
                      {video.createdAt}
                    </span>
                  </div>

                  <h3 
                    onClick={() => setActiveVideo(video)}
                    className="font-heading font-bold text-base text-slate-900 dark:text-white group-hover:text-teal-600 transition-colors line-clamp-2 cursor-pointer"
                  >
                    {video.title}
                  </h3>

                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {video.description}
                  </p>
                </div>
              </div>

              {/* Bottom Download Options */}
              <div className="p-6 pt-0 space-y-2 border-t border-slate-100 dark:border-slate-800 mt-2">
                <div className="grid grid-cols-2 gap-2 pt-3">
                  {/* Baixar MP4 */}
                  <button
                    onClick={() => handleOpenDownloader(video, 'video')}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all shadow-sm"
                    title="Baixar Vídeo em MP4 (Full HD)"
                  >
                    <Film size={13} /> Baixar Vídeo (MP4)
                  </button>

                  {/* Baixar MP3 */}
                  <button
                    onClick={() => handleOpenDownloader(video, 'audio')}
                    className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-amber-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all shadow-sm"
                    title="Baixar Áudio do Vídeo em MP3"
                  >
                    <Music size={13} /> Baixar Áudio (MP3)
                  </button>
                </div>

                {/* Assistir Direto no YouTube */}
                <a
                  href={video.youtubeUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full flex items-center justify-center gap-1.5 py-2 rounded-xl text-[11px] font-semibold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  <Youtube size={14} className="text-rose-500" /> Abrir no YouTube Oficial <ExternalLink size={11} />
                </a>
              </div>
            </div>
          ))}
      </div>

      {/* =========================================================================
          MODAL PLAYER DE VÍDEO DO YOUTUBE (EMBEDDED)
          ========================================================================= */}
      {activeVideo && (
        <div
          onClick={() => setActiveVideo(null)}
          className="fixed inset-0 z-50 bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl overflow-hidden max-w-4xl w-full border border-slate-700 shadow-2xl space-y-4 p-6 text-white animate-scaleUp"
          >
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-teal-600 text-xs font-bold">
                  {activeVideo.theme}
                </span>
                <h3 className="font-bold text-base truncate max-w-lg">{activeVideo.title}</h3>
              </div>
              <button
                onClick={() => setActiveVideo(null)}
                className="p-1.5 rounded-xl hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Iframe or Video Player */}
            <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl">
              {activeVideo.youtubeId ? (
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=1&rel=0`}
                  title={activeVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              ) : (
                <iframe
                  src={activeVideo.youtubeUrl}
                  title={activeVideo.title}
                  allowFullScreen
                  className="w-full h-full border-0"
                ></iframe>
              )}
            </div>

            {/* Video Meta & Download Options inside Modal */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
              <div>
                <p className="text-xs text-slate-400">{activeVideo.speaker} • Duração: {activeVideo.duration}</p>
                <p className="text-xs text-slate-300 mt-1 max-w-xl">{activeVideo.description}</p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={() => handleOpenDownloader(activeVideo, 'video')}
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Film size={14} /> Baixar Vídeo (MP4)
                </button>
                <button
                  onClick={() => handleOpenDownloader(activeVideo, 'audio')}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Music size={14} /> Baixar Áudio (MP3)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE ADICIONAR / BAIXAR VÍDEO DO YOUTUBE
          ========================================================================= */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-xl my-8 p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-2xl space-y-5 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-rose-50 dark:bg-rose-950/70 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Youtube size={22} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                    {editingVideo ? 'Editar Vídeo do YouTube' : 'Adicionar Vídeo & Download do YouTube'}
                  </h3>
                  <p className="text-xs text-slate-400">Insira o link do YouTube e selecione o tema bíblico</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Success Alert */}
            {savedSuccess ? (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center font-semibold text-xs flex items-center justify-center gap-2">
                <CheckCircle2 size={18} className="text-emerald-500" />
                {editingVideo ? 'Vídeo atualizado com sucesso!' : 'Vídeo adicionado e pronto para download!'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* 1. Link do YouTube */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5 flex items-center gap-1.5">
                    <Youtube size={14} className="text-rose-500" /> Link do Vídeo no YouTube *
                  </label>
                  <input
                    type="url"
                    required
                    placeholder="Ex: https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                  {youtubeUrl && extractYouTubeId(youtubeUrl) && (
                    <div className="mt-2 flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700">
                      <img
                        src={`https://img.youtube.com/vi/${extractYouTubeId(youtubeUrl)}/hqdefault.jpg`}
                        alt="Capa Detectada"
                        className="w-16 h-10 object-cover rounded-lg"
                      />
                      <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
                        <CheckCircle2 size={13} /> Vídeo do YouTube identificado com capa automática!
                      </span>
                    </div>
                  )}
                </div>

                {/* 2. Título do Vídeo */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Título do Vídeo / Treinamento *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Como Quebrar o Gelo no Evangelismo"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {/* 3. Tema & Preletor */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Tema do Vídeo *
                    </label>
                    <select
                      value={theme}
                      onChange={(e) => setTheme(e.target.value as VideoTheme)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-semibold"
                    >
                      {THEMES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Preletor / Responsável
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Pr. Roberto Casas"
                      value={speaker}
                      onChange={(e) => setSpeaker(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 4. Duração & Imagem personalizada */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Duração (min:seg)
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 24:15"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Capa Alternativa (Opcional)
                    </label>
                    <input
                      type="url"
                      placeholder="URL de imagem (caso queira substituir a do YouTube)"
                      value={customThumbnail}
                      onChange={(e) => setCustomThumbnail(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 5. Descrição */}
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Descrição do Vídeo & Tópicos Abordados
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Descreva o conteúdo do vídeo, versículos chaves e orientações..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs font-semibold shadow-md shadow-teal-600/20 transition-all hover:scale-105 active:scale-95"
                  >
                    <Check size={16} />
                    {editingVideo ? 'Salvar Alterações' : 'Salvar Vídeo & Habilitar Download'}
                  </button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE CONFIRMAÇÃO DE EXCLUSÃO
          ========================================================================= */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn">
          <div className="w-full max-w-sm p-6 rounded-3xl bg-white dark:bg-slate-900 border border-rose-500/40 shadow-2xl space-y-4 text-center animate-scaleUp">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-500 mx-auto flex items-center justify-center">
              <AlertCircle size={24} />
            </div>
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Excluir este Vídeo?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Esta ação removerá este vídeo da galeria de treinamentos.
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

    </div>
  );
};
