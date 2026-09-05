import React, { useState, useEffect, useRef } from 'react';
import { 
  Globe2, MapPin, Target, HeartHandshake, Plus, 
  Upload, Download, UserCheck, Pencil, Trash2, X, 
  Check, AlertCircle, Sparkles, Image as ImageIcon,
  CheckCircle2, Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export interface Project {
  id: string;
  title: string;
  responsible: string;
  location: string;
  target: string;
  status: string;
  progress: number;
  description: string;
  image: string;
  createdAt: string;
}

const STORAGE_KEY = 'pr_casas_projetos_v1';

const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Cruzada de Evangelismo nos Municípios do Acre',
    responsible: 'Pr. Roberto Casas & Equipe Estadual',
    location: 'Acre, Brasil',
    target: '10.000 Vidas Alcançadas',
    status: 'Em Execução',
    progress: 68,
    description: 'Caravana missionária levando o Evangelismo Prático e o Audiobook da Salvação a cidades e comunidades ribeirinhas do Acre.',
    image: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-08-15'
  },
  {
    id: '2',
    title: 'Formação de 500 Discipuladores em Igrejas Locais',
    responsible: 'Pr. Roberto Casas & Coordenação Pedagógica',
    location: 'Nacional / Online',
    target: '500 Líderes Formados',
    status: 'Inscrições Abertas',
    progress: 45,
    description: 'Treinamento intensivo através da plataforma para capacitar discipuladores em cada estado com os roteiros do Playbook.',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-08-20'
  },
  {
    id: '3',
    title: 'Impressão e Distribuição do Livreto "8 Respostas"',
    responsible: 'Pr. Roberto Casas & Fundo Missionário',
    location: 'Brasil',
    target: '50.000 Exemplares',
    status: 'Fase de Apoio',
    progress: 80,
    description: 'Produção do material didático impresso com acabamento de alta qualidade para distribuição gratuita em ações evangelísticas.',
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=800&auto=format&fit=crop&q=80',
    createdAt: '2026-08-28'
  }
];

export const ProjetosView: React.FC = () => {
  const { isSuperAdmin } = useAuth();
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error('Erro ao recuperar projetos do localStorage:', e);
    }
    return INITIAL_PROJECTS;
  });

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Form States
  const [title, setTitle] = useState('');
  const [responsible, setResponsible] = useState('');
  const [location, setLocation] = useState('');
  const [target, setTarget] = useState('');
  const [status, setStatus] = useState('Em Execução');
  const [progress, setProgress] = useState<number>(50);
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Persist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
    } catch (e) {
      console.error('Erro ao salvar projetos no localStorage:', e);
    }
  }, [projects]);

  // Handle local image file upload & convert to base64 DataURL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const base64 = event.target?.result as string;
        setImagePreview(base64);
        setImageUrl(base64);
      };
      reader.readAsDataURL(file);
    }
  };

  // Open Create Modal
  const openCreateModal = () => {
    if (!isSuperAdmin) {
      alert('Acesso restrito: Apenas os Super Administradores podem criar projetos.');
      return;
    }
    setEditingProject(null);
    setTitle('');
    setResponsible('Pr. Roberto Casas');
    setLocation('Brasil');
    setTarget('1.000 Vidas Alcançadas');
    setStatus('Em Execução');
    setProgress(50);
    setDescription('');
    setImageUrl('');
    setImagePreview('');
    setShowCreateModal(true);
  };

  // Open Edit Modal
  const openEditModal = (proj: Project) => {
    if (!isSuperAdmin) {
      alert('Acesso restrito: Apenas os Super Administradores podem editar projetos.');
      return;
    }
    setEditingProject(proj);
    setTitle(proj.title);
    setResponsible(proj.responsible || 'Pr. Roberto Casas');
    setLocation(proj.location);
    setTarget(proj.target);
    setStatus(proj.status);
    setProgress(proj.progress);
    setDescription(proj.description);
    setImageUrl(proj.image);
    setImagePreview(proj.image);
    setShowCreateModal(true);
  };

  // Submit Create or Edit Form
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isSuperAdmin) {
      alert('Acesso restrito: Apenas os Super Administradores podem salvar projetos.');
      return;
    }
    if (!title.trim() || !description.trim()) return;

    const defaultImage = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80';
    const finalImage = imagePreview || imageUrl.trim() || defaultImage;

    if (editingProject) {
      // Update existing
      setProjects(projects.map(p => 
        p.id === editingProject.id 
          ? {
              ...p,
              title: title.trim(),
              responsible: responsible.trim() || 'Pr. Roberto Casas',
              location: location.trim() || 'Brasil',
              target: target.trim() || 'Meta em definição',
              status,
              progress,
              description: description.trim(),
              image: finalImage,
            }
          : p
      ));
    } else {
      // Create new
      const newProj: Project = {
        id: Date.now().toString(),
        title: title.trim(),
        responsible: responsible.trim() || 'Pr. Roberto Casas',
        location: location.trim() || 'Brasil',
        target: target.trim() || 'Meta em definição',
        status,
        progress,
        description: description.trim(),
        image: finalImage,
        createdAt: new Date().toISOString().split('T')[0]
      };
      setProjects([newProj, ...projects]);
    }

    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setShowCreateModal(false);
    }, 1200);
  };

  // Delete Project
  const handleDelete = (id: string) => {
    if (!isSuperAdmin) {
      alert('Acesso restrito: Apenas os Super Administradores podem excluir projetos.');
      return;
    }
    setProjects(projects.filter(p => p.id !== id));
    setDeleteConfirmId(null);
  };

  // Helper for direct PNG fallback download
  const downloadDirectPngFallback = async (imageUrl: string, filename: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();
      // Ensure PNG mime blob if needed
      const pngBlob = blob.type === 'image/png' ? blob : new Blob([blob], { type: 'image/png' });
      const blobUrl = window.URL.createObjectURL(pngBlob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = filename.endsWith('.png') ? filename : `${filename}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(blobUrl);
    } catch {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.target = '_blank';
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  // Download project photo in PNG format
  const handleDownloadPhoto = async (e: React.MouseEvent, project: Project) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cleanName = `Foto_Projeto_${project.title.replace(/[^a-zA-Z0-9]/g, '_')}.png`;

    try {
      // Convert image to true PNG using offscreen Canvas
      const img = new Image();
      img.crossOrigin = 'anonymous';

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = img.naturalWidth || img.width;
          canvas.height = img.naturalHeight || img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                const blobUrl = window.URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.href = blobUrl;
                link.download = cleanName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                window.URL.revokeObjectURL(blobUrl);
              } else {
                const pngData = canvas.toDataURL('image/png');
                const link = document.createElement('a');
                link.href = pngData;
                link.download = cleanName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }
            }, 'image/png');
          } else {
            downloadDirectPngFallback(project.image, cleanName);
          }
        } catch {
          // Fallback if canvas is tainted by external CORS
          downloadDirectPngFallback(project.image, cleanName);
        }
      };

      img.onerror = () => {
        downloadDirectPngFallback(project.image, cleanName);
      };

      img.src = project.image;
    } catch {
      downloadDirectPngFallback(project.image, cleanName);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn relative">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <Globe2 size={14} className="text-teal-500" />
            Ações Missionárias & Expansão do Reino
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Projetos de Evangelização
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Iniciativas estratégicas lideradas pelo Pr. Roberto Casas para impactar cidades e treinar líderes.
          </p>
        </div>

        {/* Create Project Button / Admin Badge */}
        {isSuperAdmin ? (
          <button
            onClick={openCreateModal}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-teal-600/25 transition-all hover:scale-105 active:scale-95"
          >
            <Plus size={18} /> Criar Novo Projeto
          </button>
        ) : (
          <div className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs font-medium">
            <Lock size={14} className="text-slate-400" />
            <span>Postagem e gestão restrita aos Super Admins</span>
          </div>
        )}
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200/80 dark:border-slate-800 shadow-lg flex flex-col justify-between hover:shadow-2xl hover:border-teal-500/50 transition-all duration-300 group"
          >
            <div>
              {/* Photo Area with Download & Edit/Delete Overlay */}
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Status Badge */}
                <span className="absolute top-3 right-3 px-3 py-1 rounded-full bg-teal-600/90 text-white text-[11px] font-bold backdrop-blur-sm shadow-md">
                  {proj.status}
                </span>

                {/* Top Left: Quick Photo Download Button */}
                <button
                  onClick={(e) => handleDownloadPhoto(e, proj)}
                  className="absolute top-3 left-3 p-2 rounded-xl bg-slate-900/80 hover:bg-teal-600 text-white backdrop-blur-md text-xs font-semibold flex items-center gap-1.5 shadow-lg transition-all hover:scale-105"
                  title="Baixar Foto do Projeto em formato PNG"
                >
                  <Download size={14} />
                  <span className="text-[10px] hidden sm:inline">Baixar Foto (PNG)</span>
                </button>

                {/* Bottom Right Floating Action Bar for Edit / Delete (Super Admin only) */}
                {isSuperAdmin && (
                  <div className="absolute bottom-3 right-3 flex items-center gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openEditModal(proj)}
                      className="p-2 rounded-xl bg-slate-900/80 hover:bg-teal-500 text-white backdrop-blur-md shadow-md transition-all hover:scale-105"
                      title="Editar Projeto"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDeleteConfirmId(proj.id)}
                      className="p-2 rounded-xl bg-slate-900/80 hover:bg-rose-500 text-white backdrop-blur-md shadow-md transition-all hover:scale-105"
                      title="Excluir Projeto"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-1.5 text-teal-600 dark:text-teal-400 font-semibold">
                    <MapPin size={14} />
                    <span>{proj.location}</span>
                  </div>
                  
                  {proj.responsible && (
                    <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-[11px]">
                      <UserCheck size={13} className="text-amber-500" />
                      <span className="truncate max-w-[140px]">{proj.responsible}</span>
                    </div>
                  )}
                </div>

                <h3 className="font-heading font-bold text-base sm:text-lg text-slate-900 dark:text-white leading-snug">
                  {proj.title}
                </h3>

                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {proj.description}
                </p>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                    <span className="flex items-center gap-1 text-[11px]"><Target size={13} className="text-amber-500" /> {proj.target}</span>
                    <span className="text-teal-600 dark:text-teal-400 font-mono">{proj.progress}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-amber-500 to-teal-500 rounded-full transition-all duration-500"
                      style={{ width: `${proj.progress}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Support CTA */}
            <div className="p-6 pt-0 space-y-2">
              <a
                href={`https://wa.me/5568992393910?text=Olá,%20gostaria%20de%20apoiar%20o%20projeto:%20${encodeURIComponent(proj.title)}`}
                target="_blank"
                rel="noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-teal-600 hover:text-white text-slate-700 dark:text-slate-300 font-semibold text-xs transition-all duration-200"
              >
                <HeartHandshake size={15} /> Apoiar este Projeto
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
          MODAL DE CRIAÇÃO / EDIÇÃO DE PROJETO COM UPLOAD DE FOTO
          ========================================================================= */}
      {/* =========================================================================
          MODAL DE CRIAÇÃO / EDIÇÃO DE PROJETO COM UPLOAD DE FOTO
          ========================================================================= */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/75 backdrop-blur-sm animate-fadeIn overflow-y-auto">
          <div className="w-full max-w-[460px] my-6 p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-teal-500/40 shadow-2xl space-y-3.5 animate-scaleUp">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-2.5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/70 text-teal-600 dark:text-teal-400 flex items-center justify-center">
                  <Sparkles size={16} />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-sm text-slate-900 dark:text-white">
                    {editingProject ? 'Editar Projeto Missionário' : 'Novo Projeto de Evangelização'}
                  </h3>
                  <p className="text-[11px] text-slate-400">Preencha os dados e anexe a imagem do projeto</p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            {/* Success alert */}
            {savedSuccess ? (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center font-semibold text-xs flex items-center justify-center gap-1.5">
                <CheckCircle2 size={16} className="text-emerald-500" />
                {editingProject ? 'Projeto atualizado com sucesso!' : 'Projeto criado e publicado com sucesso!'}
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2.5">
                {/* 1. Nome do Projeto */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Nome do Projeto *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ex: Cruzada de Evangelismo nos Municípios"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  />
                </div>

                {/* 2. Responsável pelo Projeto & Localização */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Responsável pelo Projeto *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Ex: Pr. Roberto Casas / Equipe"
                      value={responsible}
                      onChange={(e) => setResponsible(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Localização / Alcance
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: Acre, Brasil ou Nacional"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>
                </div>

                {/* 3. Meta do Projeto, Status & Progresso */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Meta / Alvo
                    </label>
                    <input
                      type="text"
                      placeholder="Ex: 50.000 Exemplares"
                      value={target}
                      onChange={(e) => setTarget(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Status
                    </label>
                    <select
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-teal-500 focus:outline-none"
                    >
                      <option value="Em Planejamento">Em Planejamento</option>
                      <option value="Em Execução">Em Execução</option>
                      <option value="Inscrições Abertas">Inscrições Abertas</option>
                      <option value="Fase de Apoio">Fase de Apoio</option>
                      <option value="Concluído">Concluído</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Progresso: {progress}%
                    </label>
                    <input
                      type="range"
                      min={0}
                      max={100}
                      value={progress}
                      onChange={(e) => setProgress(Number(e.target.value))}
                      className="w-full accent-teal-500 mt-1 cursor-pointer"
                    />
                  </div>
                </div>

                {/* 4. Descrição do Projeto */}
                <div>
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Descrição Detalhada do Projeto *
                  </label>
                  <textarea
                    required
                    rows={2}
                    placeholder="Descreva o propósito, o impacto esperado e as atividades da ação missionária..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full px-3 py-1.5 rounded-lg text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white resize-none focus:ring-2 focus:ring-teal-500 focus:outline-none"
                  ></textarea>
                </div>

                {/* 5. Upload & Foto do Projeto */}
                <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                  <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300">
                    Foto / Imagem do Projeto
                  </label>
                  
                  <div className="flex flex-col sm:flex-row items-center gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-dashed border-slate-300 dark:border-slate-700">
                    {/* Image Preview */}
                    <div className="w-16 h-14 rounded-lg overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 flex items-center justify-center relative shadow-inner">
                      {imagePreview ? (
                        <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <ImageIcon size={20} className="text-slate-400" />
                      )}
                    </div>

                    {/* Upload Controls */}
                    <div className="flex-1 space-y-1.5 text-center sm:text-left w-full">
                      <input
                        type="file"
                        accept="image/*"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      
                      <div className="flex flex-wrap gap-1.5 justify-center sm:justify-start">
                        <button
                          type="button"
                          onClick={() => fileInputRef.current?.click()}
                          className="px-3 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-[11px] font-semibold flex items-center gap-1 shadow-sm transition-all"
                        >
                          <Upload size={13} /> Carregar Foto do Computador
                        </button>
                        
                        {imagePreview && (
                          <button
                            type="button"
                            onClick={() => {
                              setImagePreview('');
                              setImageUrl('');
                            }}
                            className="px-2.5 py-1.5 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-[11px] font-semibold hover:bg-rose-500 hover:text-white transition-colors"
                          >
                            Remover
                          </button>
                        )}
                      </div>

                      <div className="flex items-center gap-1.5 pt-0.5">
                        <span className="text-[10px] text-slate-400 shrink-0">ou insira link URL:</span>
                        <input
                          type="url"
                          placeholder="https://images.unsplash.com/..."
                          value={imageUrl.startsWith('data:') ? '' : imageUrl}
                          onChange={(e) => {
                            setImageUrl(e.target.value);
                            setImagePreview(e.target.value);
                          }}
                          className="flex-1 px-2.5 py-1 rounded-md text-[10px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-2 pt-2.5 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setShowCreateModal(false)}
                    className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-md shadow-teal-600/20 transition-all hover:scale-102 active:scale-98"
                  >
                    <Check size={14} />
                    {editingProject ? 'Salvar Alterações' : 'Criar e Publicar Projeto'}
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
              Excluir este Projeto?
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Esta ação removerá este projeto e suas metas missionárias permanentemente.
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
