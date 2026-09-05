import React, { useState, useRef, useEffect } from 'react';
import { 
  Play, Pause, SkipForward, SkipBack, Volume2, VolumeX, 
  Headphones, BookOpen, Download, Award, Flame 
} from 'lucide-react';
import { downloadAudioFile } from '../utils/audioDownloader';

export type VoiceGender = 'fem' | 'masc';

export interface Track {
  id: string;
  category: 'salvacao' | 'batismo';
  lessonId: number;
  title: string;
  subtitle: string;
  duration: string;
  srcFem: string;
  srcMasc: string;
  textFile?: string;
}

export const TRACKS: Track[] = [
  // --- CURSO 1: A CERTEZA DA SALVAÇÃO (8 RESPOSTAS) ---
  {
    id: 'audiobook-completo',
    category: 'salvacao',
    lessonId: 0,
    title: 'Audiobook Completo: A Certeza da Salvação',
    subtitle: 'As 8 Respostas Bíblicas Integradas (Edição Oficial)',
    duration: '04:30',
    srcFem: '/audios/audiobook_completo_fem.mp3',
    srcMasc: '/audios/audiobook_completo_masc.mp3',
    textFile: '/texto_audio.txt'
  },
  {
    id: 'licao1',
    category: 'salvacao',
    lessonId: 1,
    title: 'Lição 1: Primeira Resposta',
    subtitle: 'A Certeza da Vida Eterna (1 João 5:11; 1 Coríntios 1:18)',
    duration: '00:35',
    srcFem: '/audios/audio_licao_1_fem.mp3',
    srcMasc: '/audios/audio_licao_1_masc.mp3',
    textFile: '/texto_audio.txt'
  },
  {
    id: 'licao2',
    category: 'salvacao',
    lessonId: 2,
    title: 'Lição 2: Segunda Resposta',
    subtitle: 'O Amor Incondicional de Deus (João 3:16)',
    duration: '00:27',
    srcFem: '/audios/audio_licao_2_fem.mp3',
    srcMasc: '/audios/audio_licao_2_masc.mp3',
    textFile: '/texto_estudo2.txt'
  },
  {
    id: 'licao3',
    category: 'salvacao',
    lessonId: 3,
    title: 'Lição 3: Terceira Resposta',
    subtitle: 'A Condição do Homem Pecador (Romanos 3:23)',
    duration: '00:21',
    srcFem: '/audios/audio_licao_3_fem.mp3',
    srcMasc: '/audios/audio_licao_3_masc.mp3',
    textFile: '/texto_estudo3.txt'
  },
  {
    id: 'licao4',
    category: 'salvacao',
    lessonId: 4,
    title: 'Lição 4: Quarta Resposta',
    subtitle: 'A Consequência do Pecado & A Eternidade (Romanos 6:23)',
    duration: '00:28',
    srcFem: '/audios/audio_licao_4_fem.mp3',
    srcMasc: '/audios/audio_licao_4_masc.mp3',
    textFile: '/texto_estudo4.txt'
  },
  {
    id: 'licao5',
    category: 'salvacao',
    lessonId: 5,
    title: 'Lição 5: Quinta Resposta',
    subtitle: 'A Solução Perfeita em Jesus Cristo (Romanos 5:8; 1 Cor 5:7)',
    duration: '00:32',
    srcFem: '/audios/audio_licao_5_fem.mp3',
    srcMasc: '/audios/audio_licao_5_masc.mp3'
  },
  {
    id: 'licao6',
    category: 'salvacao',
    lessonId: 6,
    title: 'Lição 6: Sexta Resposta',
    subtitle: 'Recebendo pela Fé & Oração de Decisão (João 1:12; Rom 10:9)',
    duration: '00:41',
    srcFem: '/audios/audio_licao_6_fem.mp3',
    srcMasc: '/audios/audio_licao_6_masc.mp3'
  },
  {
    id: 'licao7',
    category: 'salvacao',
    lessonId: 7,
    title: 'Lição 7: Sétima Resposta',
    subtitle: 'O Novo Nascimento & Exame Sincero (Atos 19:2; João 3:6-7)',
    duration: '00:38',
    srcFem: '/audios/audio_licao_7_fem.mp3',
    srcMasc: '/audios/audio_licao_7_masc.mp3'
  },
  {
    id: 'licao8',
    category: 'salvacao',
    lessonId: 8,
    title: 'Lição 8: Oitava Resposta',
    subtitle: 'Compartilhando a Salvação & Conclusão (Isaías 52:7; Mat 28:19)',
    duration: '00:48',
    srcFem: '/audios/audio_licao_8_fem.mp3',
    srcMasc: '/audios/audio_licao_8_masc.mp3'
  },
  {
    id: 'pastor-original',
    category: 'salvacao',
    lessonId: 99,
    title: 'Podcast: A Certeza da Salvação',
    subtitle: 'Mensagem Pastoral Completa com Pr. Roberto Casas (48 min)',
    duration: '48:15',
    srcFem: '/A_salvação_eterna.m4a',
    srcMasc: '/A_salvação_eterna.m4a',
    textFile: '/texto_audio.txt'
  },

  // --- CURSO 2: CURSO DE BATISMO & DISCIPULADO (O QUE JESUS DESEJA QUE VOCÊ FAÇA) ---
  {
    id: 'batismo-completo',
    category: 'batismo',
    lessonId: 100,
    title: 'Audiobook Completo: Curso de Batismo & Discipulado',
    subtitle: 'O Que Jesus Deseja que Você Faça (6 Módulos Integrados)',
    duration: '06:15',
    srcFem: '/audios/discipulado_completo_fem.mp3',
    srcMasc: '/audios/discipulado_completo_masc.mp3'
  },
  {
    id: 'batismo-1',
    category: 'batismo',
    lessonId: 101,
    title: 'Discipulado I: O Que Jesus Deseja que Eu Faça',
    subtitle: 'Certeza da Salvação & Nova Vida (João 10:10; Romanos 10:13)',
    duration: '01:10',
    srcFem: '/audios/discipulado_1_fem.mp3',
    srcMasc: '/audios/discipulado_1_masc.mp3'
  },
  {
    id: 'batismo-2',
    category: 'batismo',
    lessonId: 102,
    title: 'Discipulado II: Leitura Diária da Bíblia',
    subtitle: 'Alimento Espiritual & Direção (2 Timóteo 3:16-17; Salmos 119:105)',
    duration: '00:55',
    srcFem: '/audios/discipulado_2_fem.mp3',
    srcMasc: '/audios/discipulado_2_masc.mp3'
  },
  {
    id: 'batismo-3',
    category: 'batismo',
    lessonId: 103,
    title: 'Discipulado III: Oração Diária',
    subtitle: 'Comunhão Íntima & Paz Sobrenatural (Filipenses 4:6-7; Mateus 6:6)',
    duration: '00:58',
    srcFem: '/audios/discipulado_3_fem.mp3',
    srcMasc: '/audios/discipulado_3_masc.mp3'
  },
  {
    id: 'batismo-4',
    category: 'batismo',
    lessonId: 104,
    title: 'Discipulado IV: Contribuição com Alegria',
    subtitle: 'Fé, Fidelidade & Generosidade (2 Coríntios 9:7; Malaquias 3:10)',
    duration: '00:52',
    srcFem: '/audios/discipulado_4_fem.mp3',
    srcMasc: '/audios/discipulado_4_masc.mp3'
  },
  {
    id: 'batismo-5',
    category: 'batismo',
    lessonId: 105,
    title: 'Discipulado V: Ser Guiado pelo Espírito Santo',
    subtitle: 'Consolador, Fruto do Espírito & Poder (Efésios 5:18; Gálatas 5:22)',
    duration: '00:55',
    srcFem: '/audios/discipulado_5_fem.mp3',
    srcMasc: '/audios/discipulado_5_masc.mp3'
  },
  {
    id: 'batismo-6',
    category: 'batismo',
    lessonId: 106,
    title: 'Discipulado VI: A Importância de Congregarmos',
    subtitle: 'Corpo de Cristo, Comunhão & Crescimento (Hebreus 10:24-25; 1 Cor 12:27)',
    duration: '00:58',
    srcFem: '/audios/discipulado_6_fem.mp3',
    srcMasc: '/audios/discipulado_6_masc.mp3'
  }
];

export interface AudioPlayerProps {
  categoryFilter?: 'all' | 'salvacao' | 'batismo';
  onCategoryFilterChange?: (cat: 'all' | 'salvacao' | 'batismo') => void;
  onTrackChange?: (track: Track) => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ 
  categoryFilter, 
  onCategoryFilterChange,
  onTrackChange 
}) => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'salvacao' | 'batismo'>(categoryFilter || 'all');
  const [voice, setVoice] = useState<VoiceGender>('fem');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (categoryFilter !== undefined && categoryFilter !== selectedCategory) {
      setSelectedCategory(categoryFilter);
      const firstMatching = TRACKS.findIndex(t => categoryFilter === 'all' || t.category === categoryFilter);
      if (firstMatching !== -1 && (categoryFilter !== 'all' && TRACKS[currentTrackIndex]?.category !== categoryFilter)) {
        setCurrentTrackIndex(firstMatching);
      }
    }
  }, [categoryFilter]);

  useEffect(() => {
    const track = TRACKS[currentTrackIndex];
    if (track && onTrackChange) {
      onTrackChange(track);
    }
  }, [currentTrackIndex]);

  const handleCategorySelect = (cat: 'all' | 'salvacao' | 'batismo') => {
    setSelectedCategory(cat);
    onCategoryFilterChange?.(cat);
    const firstMatching = TRACKS.findIndex(t => cat === 'all' || t.category === cat);
    if (firstMatching !== -1 && (cat !== 'all' && TRACKS[currentTrackIndex]?.category !== cat)) {
      setCurrentTrackIndex(firstMatching);
    }
  };

  const currentTrack = TRACKS[currentTrackIndex];
  const currentSrc = voice === 'fem' ? currentTrack.srcFem : currentTrack.srcMasc;

  const filteredTracks = selectedCategory === 'all' 
    ? TRACKS 
    : TRACKS.filter(t => t.category === selectedCategory);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.playbackRate = playbackSpeed;
      if (isPlaying) {
        audioRef.current.play().catch(() => setIsPlaying(false));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex, voice, playbackSpeed]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const handlePrev = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setTotalDuration(audioRef.current.duration || 0);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = Number(e.target.value);
    setCurrentTime(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  };

  const toggleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const currentIndex = speeds.indexOf(playbackSpeed);
    const nextSpeed = speeds[(currentIndex + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
  };

  const formatTime = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const getDownloadFilename = (track: Track, voiceGender: VoiceGender) => {
    const genderName = voiceGender === 'fem' ? 'Voz_Feminina' : 'Voz_Masculina';
    if (track.lessonId === 99) return 'Podcast_A_Certeza_da_Salvacao_Pr_Roberto_Casas.m4a';
    if (track.lessonId === 0) return `Audiobook_Completo_A_Certeza_da_Salvacao_${genderName}.mp3`;
    if (track.lessonId === 100) return `Audiobook_Completo_Curso_Batismo_${genderName}.mp3`;
    if (track.lessonId > 100) return `Curso_Batismo_Discipulado_${track.lessonId - 100}_${genderName}.mp3`;
    return `A_Certeza_da_Salvacao_Licao_${track.lessonId}_${genderName}.mp3`;
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800 shadow-xl space-y-6 animate-fadeIn">
      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={currentSrc}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleNext}
        onLoadedMetadata={handleTimeUpdate}
      />

      {/* Top Banner: Voice Selector & Course Tabs */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-1">
            <Headphones size={13} className="text-teal-500" />
            Audiobooks & Discipulado Oficial
          </div>
          <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
            Player de Áudio & Estudos Bíblicos
          </h3>
        </div>

        {/* Voice Gender Switch */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setVoice('fem')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              voice === 'fem'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Voz Feminina (Francisca)
          </button>
          <button
            onClick={() => setVoice('masc')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              voice === 'masc'
                ? 'bg-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Voz Masculina (Antonio)
          </button>
        </div>
      </div>

      {/* Course Categories Selector */}
      <div className="flex flex-wrap items-center gap-2 pt-1">
        <button
          onClick={() => handleCategorySelect('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
            selectedCategory === 'all'
              ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          Todas as Faixas ({TRACKS.length})
        </button>
        <button
          onClick={() => handleCategorySelect('salvacao')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedCategory === 'salvacao'
              ? 'bg-teal-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Flame size={13} /> A Certeza da Salvação (10)
        </button>
        <button
          onClick={() => handleCategorySelect('batismo')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
            selectedCategory === 'batismo'
              ? 'bg-amber-600 text-white shadow-sm'
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
          }`}
        >
          <Award size={13} /> Curso de Batismo: O Que Jesus Deseja (7)
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: Active Audio Player Card */}
        <div className="lg:col-span-5 bg-gradient-to-b from-slate-50 to-slate-100/70 dark:from-slate-800/80 dark:to-slate-800/40 rounded-3xl p-6 border border-slate-200/80 dark:border-slate-700/60 shadow-inner flex flex-col justify-between space-y-6">
          
          {/* Active Album Art & Info */}
          <div className="text-center space-y-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto rounded-3xl overflow-hidden shadow-xl bg-[#001869] border-2 border-teal-500/40 flex items-center justify-center relative group">
              <img
                src="/pwa-192x192.png"
                alt="Logo Evangelismo"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              {isPlaying && (
                <div className="absolute inset-0 bg-teal-950/40 backdrop-blur-[2px] flex items-center justify-center">
                  <div className="flex gap-1 items-end h-5">
                    <span className="w-1.5 bg-teal-400 rounded-full animate-bounce h-3"></span>
                    <span className="w-1.5 bg-teal-400 rounded-full animate-bounce h-5 delay-75"></span>
                    <span className="w-1.5 bg-teal-400 rounded-full animate-bounce h-2 delay-150"></span>
                  </div>
                </div>
              )}
            </div>

            <div>
              <span className={`inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full mb-1.5 ${
                currentTrack.category === 'batismo'
                  ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-300 dark:border-amber-800'
                  : 'bg-teal-100 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-300 dark:border-teal-800'
              }`}>
                {currentTrack.category === 'batismo' ? 'Curso de Batismo & Discipulado' : 'A Certeza da Salvação'}
              </span>

              <h4 className="font-heading font-bold text-lg text-slate-900 dark:text-white leading-snug">
                {currentTrack.title}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {currentTrack.subtitle}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-1.5">
            <input
              type="range"
              min={0}
              max={totalDuration || 100}
              value={currentTime}
              onChange={handleSeek}
              className="w-full accent-teal-500 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(totalDuration)}</span>
            </div>
          </div>

          {/* Controls Bar */}
          <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-200 dark:border-slate-700/60">
            <button
              onClick={toggleSpeed}
              className="px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold font-mono text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors"
              title="Velocidade de Reprodução"
            >
              {playbackSpeed}x
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                title="Faixa Anterior"
              >
                <SkipBack size={16} />
              </button>

              <button
                onClick={handlePlayPause}
                className="w-13 h-13 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-600 text-white flex items-center justify-center shadow-lg shadow-teal-500/25 hover:scale-105 active:scale-95 transition-all"
                title={isPlaying ? 'Pausar' : 'Reproduzir'}
              >
                {isPlaying ? <Pause size={22} /> : <Play size={22} className="ml-0.5" />}
              </button>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-500 flex items-center justify-center transition-all hover:scale-105 active:scale-95"
                title="Próxima Faixa"
              >
                <SkipForward size={16} />
              </button>
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => {
                  if (audioRef.current) {
                    audioRef.current.muted = !isMuted;
                    setIsMuted(!isMuted);
                  }
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors"
                title={isMuted ? 'Desmutar' : 'Mutar'}
              >
                {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
              </button>

              <button
                onClick={(e) => {
                  e.preventDefault();
                  downloadAudioFile(currentSrc, getDownloadFilename(currentTrack, voice));
                }}
                className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors"
                title="Baixar Áudio em MP3"
              >
                <Download size={16} />
              </button>
            </div>
          </div>

        </div>

        {/* Right: Interactive Playlist Selection */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-heading font-bold text-slate-800 dark:text-white text-base flex items-center gap-2">
              <BookOpen size={18} className="text-teal-500" />
              Faixas Disponíveis ({filteredTracks.length})
            </h4>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {voice === 'fem' ? 'Narradora Francisca' : 'Narrador Antonio'}
            </span>
          </div>

          <div className="space-y-2 max-h-[420px] overflow-y-auto pr-1">
            {filteredTracks.map((track) => {
              const globalIndex = TRACKS.findIndex(t => t.id === track.id);
              const isSelected = globalIndex === currentTrackIndex;
              const trackSrc = voice === 'fem' ? track.srcFem : track.srcMasc;

              return (
                <div
                  key={track.id}
                  onClick={() => {
                    setCurrentTrackIndex(globalIndex);
                    setIsPlaying(true);
                  }}
                  className={`p-3.5 rounded-2xl border transition-all duration-200 cursor-pointer flex items-center justify-between gap-4 ${
                    isSelected
                      ? 'bg-teal-50/90 dark:bg-teal-950/50 border-teal-500 shadow-sm'
                      : 'bg-slate-50 dark:bg-slate-800/60 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 hover:scale-[1.01]'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <div
                      className={`w-9 h-9 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                        isSelected
                          ? 'bg-teal-600 text-white shadow-md shadow-teal-500/30'
                          : track.category === 'batismo'
                          ? 'bg-amber-100 dark:bg-amber-900/50 text-amber-700 dark:text-amber-300'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isSelected && isPlaying ? (
                        <span className="flex gap-0.5 items-end h-3">
                          <span className="w-1 bg-white animate-bounce h-2"></span>
                          <span className="w-1 bg-white animate-bounce h-3 delay-75"></span>
                          <span className="w-1 bg-white animate-bounce h-1.5 delay-150"></span>
                        </span>
                      ) : (
                        track.lessonId === 0 || track.lessonId === 100 ? '★' : track.lessonId === 99 ? '🎙️' : (track.lessonId > 100 ? track.lessonId - 100 : track.lessonId)
                      )}
                    </div>
                    <div>
                      <h5 className={`text-sm font-semibold leading-tight ${
                        isSelected ? 'text-teal-700 dark:text-teal-300' : 'text-slate-700 dark:text-slate-200'
                      }`}>
                        {track.title}
                      </h5>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
                        {track.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2.5 shrink-0">
                    <span className="text-xs font-mono text-slate-400 dark:text-slate-500">
                      {track.duration}
                    </span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadAudioFile(trackSrc, getDownloadFilename(track, voice));
                      }}
                      className="p-1.5 rounded-lg bg-slate-200/70 dark:bg-slate-700/70 hover:bg-teal-500 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                      title={`Baixar ${track.title} em MP3`}
                    >
                      <Download size={14} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};
