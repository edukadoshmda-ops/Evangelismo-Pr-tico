import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, Download, Printer, ShieldCheck, 
  Sparkles, Copy, Check, Share2
} from 'lucide-react';
import jsPDF from 'jspdf';
import { AlunoCursoRegistro, STORAGE_ALUNOS_CURSOS_KEY } from '../../types/cursos';


interface CertificadosViewProps {
  initialAluno?: Partial<AlunoCursoRegistro>;
}

export const CertificadosView: React.FC<CertificadosViewProps> = ({ initialAluno }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Lista de alunos concluintes registrados
  const [alunosList, setAlunosList] = useState<AlunoCursoRegistro[]>([]);
  const [selectedAlunoId, setSelectedAlunoId] = useState<string>('');

  // Dados do Certificado Atual
  const [alunoNome, setAlunoNome] = useState(initialAluno?.alunoNome || 'Carlos Eduardo Santos');
  const [igreja, setIgreja] = useState(initialAluno?.igreja || 'Igreja Batista Monte Sião');
  const [pastor, setPastor] = useState(initialAluno?.pastor || 'Pr. Roberto Rodrigues Casas');
  const [curso, setCurso] = useState<'evangelismo' | 'discipulado'>(
    initialAluno?.cursoId || 'evangelismo'
  );
  const [dataConclusao, setDataConclusao] = useState(
    initialAluno?.concluidoEm || new Date().toLocaleDateString('pt-BR')
  );
  const [codigoCert, setCodigoCert] = useState(
    initialAluno?.certificadoCodigo || `EP-CERT-${Date.now().toString(36).toUpperCase()}`
  );

  const [copiedCode, setCopiedCode] = useState(false);

  // Carregar histórico de alunos concluintes
  useEffect(() => {
    const loadAlunos = () => {
      try {
        const saved = localStorage.getItem(STORAGE_ALUNOS_CURSOS_KEY);
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setAlunosList(parsed);
            if (!initialAluno && parsed[0]) {
              setSelectedAlunoId(parsed[0].id);
              setAlunoNome(parsed[0].alunoNome);
              setIgreja(parsed[0].igreja);
              setPastor(parsed[0].pastor);
              setCurso(parsed[0].cursoId);
              setDataConclusao(parsed[0].concluidoEm);
              setCodigoCert(parsed[0].certificadoCodigo);
            }
          }
        }
      } catch (e) {
        console.error('Erro ao carregar alunos:', e);
      }
    };

    loadAlunos();
    window.addEventListener('app-alunos-cursos-updated', loadAlunos);
    return () => window.removeEventListener('app-alunos-cursos-updated', loadAlunos);
  }, [initialAluno]);

  // Se o usuário selecionar outro aluno na lista
  const handleSelectAluno = (id: string) => {
    setSelectedAlunoId(id);
    const found = alunosList.find(a => a.id === id);
    if (found) {
      setAlunoNome(found.alunoNome);
      setIgreja(found.igreja);
      setPastor(found.pastor);
      setCurso(found.cursoId);
      setDataConclusao(found.concluidoEm);
      setCodigoCert(found.certificadoCodigo);
    }
  };

  // Renderizar o Certificado no HTML5 Canvas (Alta Resolução: 1600 x 1131 px)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = 1600;
    const height = 1131;
    canvas.width = width;
    canvas.height = height;

    // 1. Fundo Branco Puro e Impecável (Próprio para Impressão e Visualização Oficial)
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, width, height);

    // 2. Fundo Interior em Branco Nobre
    const innerMargin = 28;
    const innerWidth = width - innerMargin * 2;
    const innerHeight = height - innerMargin * 2;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.roundRect(innerMargin, innerMargin, innerWidth, innerHeight, 28);
    ctx.fill();
    ctx.restore();

    // 3. Moldura Dourada Nobre com Cantos Arredondados
    ctx.save();
    ctx.lineWidth = 6;
    ctx.strokeStyle = '#d4af37'; // Ouro
    ctx.beginPath();
    ctx.roundRect(innerMargin + 12, innerMargin + 12, innerWidth - 24, innerHeight - 24, 22);
    ctx.stroke();

    // Filete Dourado Fino Interno
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#f59e0b';
    ctx.beginPath();
    ctx.roundRect(innerMargin + 24, innerMargin + 24, innerWidth - 48, innerHeight - 48, 16);
    ctx.stroke();
    ctx.restore();

    // 4. Detalhes Decorativos nos Cantos
    const drawCornerOrnament = (cx: number, cy: number) => {
      ctx.save();
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(cx, cy, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };
    drawCornerOrnament(innerMargin + 24, innerMargin + 24);
    drawCornerOrnament(width - innerMargin - 24, innerMargin + 24);
    drawCornerOrnament(innerMargin + 24, height - innerMargin - 24);
    drawCornerOrnament(width - innerMargin - 24, height - innerMargin - 24);

    // 5. Cabeçalho Oficial
    ctx.textAlign = 'center';
    ctx.fillStyle = '#0f766e'; // Teal 700
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.letterSpacing = '3px';
    ctx.fillText('MINISTÉRIO DE EVANGELISMO PRÁTICO & FORMAÇÃO DE DISCÍPULOS', width / 2, 135);

    // Linha divisória fina dourada
    ctx.strokeStyle = '#d4af37';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(width / 2 - 250, 155);
    ctx.lineTo(width / 2 + 250, 155);
    ctx.stroke();

    // Título Principal do Certificado
    ctx.fillStyle = '#0f172a';
    ctx.font = '900 56px "Playfair Display", Georgia, serif';
    ctx.fillText('CERTIFICADO DE CONCLUSÃO', width / 2, 235);

    // Texto de Abertura
    ctx.fillStyle = '#64748b';
    ctx.font = 'normal 24px Inter, sans-serif';
    ctx.fillText('Certificamos para os devidos fins bíblicos e eclesiásticos que', width / 2, 305);

    // Nome do Aluno em Destaque Especial Dourado / Azul Marinho
    ctx.fillStyle = '#0b2447';
    ctx.font = 'bold 52px "Playfair Display", Georgia, serif';
    ctx.fillText(alunoNome || 'Nome do Aluno Concluinte', width / 2, 385);

    // Linha decorativa sob o nome
    const nameWidth = ctx.measureText(alunoNome || 'Nome do Aluno Concluinte').width;
    ctx.strokeStyle = '#0d9488';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(width / 2 - (nameWidth / 2) - 30, 405);
    ctx.lineTo(width / 2 + (nameWidth / 2) + 30, 405);
    ctx.stroke();

    // Texto de Conclusão e Nome do Curso
    ctx.fillStyle = '#475569';
    ctx.font = 'normal 25px Inter, sans-serif';
    ctx.fillText('concluiu com louvor, fidelidade e pleno aproveitamento o curso oficial:', width / 2, 465);

    const cursoNome = curso === 'evangelismo' 
      ? 'Evangelismo Bíblico: A Certeza da Salvação (8 Lições)' 
      : 'Curso para Batismo nas Águas & Discipulado Cristão (O Que Jesus Deseja Que Você Faça)';

    ctx.fillStyle = '#0f766e';
    ctx.font = 'bold 36px "Playfair Display", Georgia, serif';
    ctx.fillText(cursoNome, width / 2, 530);

    // Informações da Igreja e Pastor
    ctx.fillStyle = '#334155';
    ctx.font = '500 23px Inter, sans-serif';
    ctx.fillText(
      `Membro da: ${igreja || 'Igreja Local'} • Sob a liderança do ${pastor || 'Pastor'}`,
      width / 2, 
      590
    );

    // Texto de Fundamento Bíblico
    ctx.fillStyle = '#64748b';
    ctx.font = 'italic 20px Georgia, serif';
    ctx.fillText(
      '“Quão formosos sobre os montes são os pés dos que anunciam as boas-novas, dos que anunciam a salvação!” — Isaías 52:7',
      width / 2, 
      655
    );

    // 6. Bloco Inferior: Assinaturas e Selo Oficial com a LOGO DO APP
    const bottomY = 870;

    // Assinatura 1: Pr. Roberto Rodrigues Casas
    ctx.strokeStyle = '#94a3b8';
    ctx.lineWidth = 1.5;
    ctx.beginPath();
    ctx.moveTo(180, bottomY);
    ctx.lineTo(520, bottomY);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText('Pr. Roberto Rodrigues Casas', 350, bottomY + 35);
    ctx.fillStyle = '#64748b';
    ctx.font = 'normal 17px Inter, sans-serif';
    ctx.fillText('Coordenador Geral de Evangelismo', 350, bottomY + 60);

    // Assinatura 2: Pastor Local / Líder
    ctx.beginPath();
    ctx.moveTo(width - 520, bottomY);
    ctx.lineTo(width - 180, bottomY);
    ctx.stroke();

    ctx.fillStyle = '#0f172a';
    ctx.font = 'bold 22px Inter, sans-serif';
    ctx.fillText(pastor || 'Pastor Local', width - 350, bottomY + 35);
    ctx.fillStyle = '#64748b';
    ctx.font = 'normal 17px Inter, sans-serif';
    ctx.fillText(igreja || 'Igreja Local', width - 350, bottomY + 60);

    // Selo Central com a LOGO DO APP
    const sealX = width / 2;
    const sealY = bottomY - 10;
    const sealRadius = 75;

    // Círculo Dourado com Sombra do Selo
    ctx.save();
    ctx.shadowColor = 'rgba(212, 175, 55, 0.4)';
    ctx.shadowBlur = 15;
    const sealGrad = ctx.createLinearGradient(sealX - sealRadius, sealY - sealRadius, sealX + sealRadius, sealY + sealRadius);
    sealGrad.addColorStop(0, '#fef08a');
    sealGrad.addColorStop(0.5, '#eab308');
    sealGrad.addColorStop(1, '#ca8a04');
    ctx.fillStyle = sealGrad;
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius, 0, Math.PI * 2);
    ctx.fill();

    // Borda dentada / dupla do selo
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#ffffff';
    ctx.beginPath();
    ctx.arc(sealX, sealY, sealRadius - 6, 0, Math.PI * 2);
    ctx.stroke();
    ctx.restore();

    // Desenhar Logo Oficial no Centro do Selo
    const logoImg = new Image();
    logoImg.src = '/pwa-192x192.png';
    logoImg.onload = () => {
      ctx.save();
      ctx.beginPath();
      ctx.arc(sealX, sealY, sealRadius - 12, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(logoImg, sealX - 60, sealY - 60, 120, 120);
      ctx.restore();
    };

    // Rodapé de Autenticidade e Data
    ctx.fillStyle = '#475569';
    ctx.font = 'bold 16px Inter, sans-serif';
    ctx.fillText(`Carga Horária: 20 Horas • Data de Emissão: ${dataConclusao}`, width / 2, height - 95);

    ctx.fillStyle = '#94a3b8';
    ctx.font = 'mono 15px monospace';
    ctx.fillText(`Chave de Autenticidade: ${codigoCert}`, width / 2, height - 70);

  }, [alunoNome, igreja, pastor, curso, dataConclusao, codigoCert]);

  // Baixar Certificado em Imagem PNG de Alta Definição
  const handleDownloadPNG = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `Certificado-${alunoNome.replace(/\s+/g, '_')}-${curso}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  // Baixar / Imprimir em PDF formato A4 Paisagem (jsPDF)
  const handleDownloadPDF = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4',
    });

    // Dimensões A4 em mm: 297 x 210
    pdf.addImage(imgData, 'PNG', 0, 0, 297, 210);
    pdf.save(`Certificado-${alunoNome.replace(/\s+/g, '_')}-${curso}.pdf`);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codigoCert);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const cursoTitulo = curso === 'evangelismo' 
      ? 'Evangelismo Bíblico: A Certeza da Salvação (8 Lições)' 
      : 'Curso para Batismo nas Águas & Discipulado Cristão';

    const msg = `🎓 *CERTIFICADO OFICIAL DE CONCLUSÃO*\n\n` +
      `Paz do Senhor! Venho compartilhar a conclusão do curso oficial no *Ministério de Evangelismo Prático*:\n\n` +
      `📖 *Curso:* ${cursoTitulo}\n` +
      `👤 *Aluno Concluinte:* ${alunoNome}\n` +
      `🏛️ *Igreja:* ${igreja}\n` +
      `✝️ *Liderança:* ${pastor}\n` +
      `🔑 *Código Autenticado:* ${codigoCert}\n\n` +
      `_Coordenador Geral: Pr. Roberto Rodrigues Casas_\n` +
      `Acesse a plataforma para emitir ou validar!`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(msg)}`, '_blank');
  };

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Top Header */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 text-slate-900 dark:text-white shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6 border border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <Award size={14} className="text-teal-600" /> Emissão Oficial Estilo Canva
          </div>
          <h1 className="text-3xl font-heading font-black text-slate-900 dark:text-white">
            Certificados de Conclusão com o Selo do App
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm max-w-2xl mt-1">
            Gere, visualize e imprima os certificados oficiais de Evangelismo Bíblico e Curso de Batismo & Discipulado para seus alunos e membros.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleShareWhatsApp}
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-lg shadow-emerald-600/30 flex items-center gap-2 transition-all hover:scale-105"
            title="Compartilhar Conclusão no WhatsApp"
          >
            <Share2 size={18} /> WhatsApp
          </button>
          <button
            type="button"
            onClick={handleDownloadPNG}
            className="px-5 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-lg shadow-teal-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Download size={18} /> Imagem (PNG)
          </button>
          <button
            type="button"
            onClick={handleDownloadPDF}
            className="px-5 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-600/30 flex items-center gap-2 transition-all hover:scale-105"
          >
            <Printer size={18} /> Imprimir / PDF
          </button>
        </div>
      </div>

      {/* Seletor de Aluno Concluinte Registrado */}
      {alunosList.length > 0 && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <ShieldCheck size={20} className="text-teal-600 dark:text-teal-400" />
            <h3 className="font-heading font-bold text-base text-slate-900 dark:text-white">
              Selecionar Aluno Concluinte do Banco de Dados ({alunosList.length} Registrados)
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {alunosList.map(item => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectAluno(item.id)}
                className={`p-3.5 rounded-2xl text-left border transition-all ${
                  selectedAlunoId === item.id
                    ? 'border-teal-500 bg-teal-50/50 dark:bg-teal-950/30 shadow-md shadow-teal-500/10'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                }`}
              >
                <div className="font-bold text-sm text-slate-900 dark:text-white truncate">
                  {item.alunoNome}
                </div>
                <div className="text-xs text-slate-500 truncate mt-0.5">
                  {item.igreja} • {item.cursoTitulo.split(':')[0]}
                </div>
                <div className="text-[11px] text-teal-600 dark:text-teal-400 font-mono mt-1">
                  Concluído em: {item.concluidoEm}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controles de Personalização do Certificado */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
          Personalizar Dados do Certificado
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Nome do Aluno
            </label>
            <input
              type="text"
              value={alunoNome}
              onChange={e => setAlunoNome(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Nome da Igreja
            </label>
            <input
              type="text"
              value={igreja}
              onChange={e => setIgreja(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Nome do Pastor / Líder
            </label>
            <input
              type="text"
              value={pastor}
              onChange={e => setPastor(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Curso Concluído
            </label>
            <select
              value={curso}
              onChange={e => setCurso(e.target.value as any)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm font-semibold"
            >
              <option value="evangelismo">Evangelismo Bíblico: A Certeza da Salvação (8 Lições)</option>
              <option value="discipulado">Curso para Batismo & Discipulado Cristão</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Data de Conclusão
            </label>
            <input
              type="text"
              value={dataConclusao}
              onChange={e => setDataConclusao(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Código de Autenticidade
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={codigoCert}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 text-xs font-mono text-slate-600 dark:text-slate-300"
              />
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-600"
                title="Copiar Código"
              >
                {copiedCode ? <Check size={16} className="text-emerald-500" /> : <Copy size={16} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Prévia Interativa do Certificado Estilo Canva (HTML5 Canvas) */}
      <div className="bg-white dark:bg-slate-900/80 p-4 sm:p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center">
        <div className="flex items-center justify-between w-full mb-4 px-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
            <Sparkles size={14} className="text-teal-600 dark:text-teal-400" /> Prévia Oficial de Impressão (A4 Paisagem)
          </span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            Resolução: 1600 × 1131 px com Logo Oficial no Selo
          </span>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border-2 border-slate-200 dark:border-slate-700 shadow-xl bg-white">
          <canvas
            ref={canvasRef}
            className="w-full h-auto rounded-xl block"
          />
        </div>
      </div>

    </div>
  );
};
