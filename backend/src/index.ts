import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { Parser } from 'json2csv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Armazenamento em arquivo local JSON para persistência
const DATA_DIR = path.join(__dirname, '..', 'data');
const DATA_FILE = path.join(DATA_DIR, 'cursos_respostas.json');
const VIDEOS_FILE = path.join(DATA_DIR, 'videos.json');

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

export interface VideoItem {
  id: string;
  title: string;
  theme: string;
  speaker: string;
  duration: string;
  youtubeUrl: string;
  youtubeId?: string;
  thumbnail: string;
  description: string;
  createdAt: string;
}

function loadVideos(): VideoItem[] {
  try {
    if (fs.existsSync(VIDEOS_FILE)) {
      const raw = fs.readFileSync(VIDEOS_FILE, 'utf-8');
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed) && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (err) {
    console.error('[Backend] Erro ao ler videos.json:', err);
  }
  return [];
}

function saveVideos(list: VideoItem[]) {
  try {
    fs.writeFileSync(VIDEOS_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Backend] Erro ao salvar videos.json:', err);
  }
}

interface RespostaAluno {
  id: string;
  alunoNome: string;
  igreja: string;
  pastor: string;
  telefone?: string;
  email?: string;
  cursoId: 'evangelismo' | 'discipulado';
  cursoTitulo: string;
  concluidoEm: string;
  respostas: Record<string, any>;
  testemunho?: string;
  certificadoCodigo?: string;
}

function loadRespostas(): RespostaAluno[] {
  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (err) {
    console.error('[Backend] Erro ao ler cursos_respostas.json:', err);
  }
  return [];
}

function saveRespostas(list: RespostaAluno[]) {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(list, null, 2), 'utf-8');
  } catch (err) {
    console.error('[Backend] Erro ao salvar cursos_respostas.json:', err);
  }
}

app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    app: 'Evangelismo Prático API',
    timestamp: new Date().toISOString(),
  });
});

// Listar todas as respostas de cursos
app.get('/api/cursos/respostas', (_req, res) => {
  const list = loadRespostas();
  res.json({ success: true, count: list.length, data: list });
});

// Salvar conclusão de curso por aluno
app.post('/api/cursos/respostas', (req, res) => {
  try {
    const body = req.body;
    if (!body.alunoNome || !body.cursoId) {
      return res.status(400).json({ success: false, message: 'Nome do aluno e ID do curso são obrigatórios.' });
    }

    const list = loadRespostas();
    const novoRegistro: RespostaAluno = {
      id: body.id || `CURSO-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      alunoNome: String(body.alunoNome).trim(),
      igreja: String(body.igreja || 'Não informada').trim(),
      pastor: String(body.pastor || 'Não informado').trim(),
      telefone: body.telefone ? String(body.telefone).trim() : '',
      email: body.email ? String(body.email).trim() : '',
      cursoId: body.cursoId,
      cursoTitulo: body.cursoTitulo || (body.cursoId === 'evangelismo' ? 'Evangelismo Bíblico - A Certeza da Salvação' : 'Curso para Batismo & Discipulado Cristão'),
      concluidoEm: body.concluidoEm || new Date().toLocaleDateString('pt-BR'),
      respostas: body.respostas || {},
      testemunho: body.testemunho || '',
      certificadoCodigo: body.certificadoCodigo || `CERT-${Date.now().toString(36).toUpperCase()}`,
    };

    // Prevenir duplicatas exatas ou atualizar se já existir o mesmo id
    const existingIndex = list.findIndex(item => item.id === novoRegistro.id);
    if (existingIndex >= 0) {
      list[existingIndex] = novoRegistro;
    } else {
      list.unshift(novoRegistro);
    }

    saveRespostas(list);

    res.status(201).json({
      success: true,
      message: 'Conclusão de curso e respostas registradas com sucesso!',
      data: novoRegistro,
    });
  } catch (error: any) {
    console.error('[Backend] Erro ao salvar resposta:', error);
    res.status(500).json({ success: false, message: 'Erro interno ao salvar resposta.' });
  }
});

// Excluir registro
app.delete('/api/cursos/respostas/:id', (req, res) => {
  const { id } = req.params;
  let list = loadRespostas();
  list = list.filter(item => item.id !== id);
  saveRespostas(list);
  res.json({ success: true, message: 'Registro excluído com sucesso.' });
});

// Exportar respostas para CSV com json2csv (Padrão Arquitetura Cérebro)
app.get('/api/export/cursos-csv', (_req, res) => {
  try {
    const list = loadRespostas();
    const rows = list.map(item => ({
      ID: item.id,
      Aluno: item.alunoNome,
      Igreja: item.igreja,
      Pastor: item.pastor,
      Telefone: item.telefone || '',
      Email: item.email || '',
      Curso: item.cursoTitulo,
      Data_Conclusao: item.concluidoEm,
      Codigo_Certificado: item.certificadoCodigo || '',
      Testemunho: item.testemunho || '',
      Total_Respostas: Object.keys(item.respostas || {}).length,
    }));

    const parser = new Parser({ withBOM: true });
    const csv = parser.parse(rows);

    res.header('Content-Type', 'text/csv; charset=utf-8');
    res.attachment(`relatorio-alunos-cursos-${Date.now()}.csv`);
    return res.send(csv);
  } catch (err: any) {
    console.error('[Backend] Erro ao exportar CSV:', err);
    return res.status(500).json({ success: false, message: 'Erro ao gerar planilha CSV.' });
  }
});

// ==========================================
// ENDPOINTS DE VÍDEOS (Persistência Permanente)
// ==========================================

function extractYtId(url: string): string | undefined {
  if (!url) return undefined;
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[2].length === 11 ? match[2] : undefined;
}

// Listar todos os vídeos salvos
app.get('/api/videos', (_req, res) => {
  try {
    const list = loadVideos();
    res.json({ success: true, count: list.length, data: list });
  } catch (err: any) {
    console.error('[Backend] Erro ao listar vídeos:', err);
    res.status(500).json({ success: false, message: 'Erro ao listar vídeos.' });
  }
});

// Adicionar ou atualizar um vídeo
app.post('/api/videos', (req, res) => {
  try {
    const body = req.body;
    if (!body.title || !body.youtubeUrl) {
      return res.status(400).json({ success: false, message: 'Título e URL do YouTube são obrigatórios.' });
    }

    const list = loadVideos();
    const ytId = body.youtubeId || extractYtId(body.youtubeUrl);
    const thumbnail = body.thumbnail || (ytId ? `https://img.youtube.com/vi/${ytId}/hqdefault.jpg` : '');

    const videoItem: VideoItem = {
      id: body.id ? String(body.id) : Date.now().toString(),
      title: String(body.title).trim(),
      theme: body.theme || 'Evangelismo',
      speaker: body.speaker ? String(body.speaker).trim() : 'Pr. Roberto Casas',
      duration: body.duration ? String(body.duration).trim() : '15:00',
      youtubeUrl: String(body.youtubeUrl).trim(),
      youtubeId: ytId,
      thumbnail: thumbnail,
      description: body.description ? String(body.description).trim() : '',
      createdAt: body.createdAt || new Date().toISOString().split('T')[0],
    };

    const existingIndex = list.findIndex(v => v.id === videoItem.id);
    if (existingIndex >= 0) {
      list[existingIndex] = videoItem;
    } else {
      list.unshift(videoItem);
    }

    saveVideos(list);

    res.status(201).json({
      success: true,
      message: 'Vídeo gravado e persistido com sucesso na plataforma!',
      data: videoItem,
    });
  } catch (err: any) {
    console.error('[Backend] Erro ao salvar vídeo:', err);
    res.status(500).json({ success: false, message: 'Erro interno ao salvar vídeo.' });
  }
});

// Atualizar vídeo existente
app.put('/api/videos/:id', (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const list = loadVideos();
    const idx = list.findIndex(v => v.id === id);

    if (idx === -1) {
      return res.status(404).json({ success: false, message: 'Vídeo não encontrado.' });
    }

    const current = list[idx];
    const ytId = body.youtubeId || (body.youtubeUrl ? extractYtId(body.youtubeUrl) : current.youtubeId);
    const updated: VideoItem = {
      ...current,
      title: body.title !== undefined ? String(body.title).trim() : current.title,
      theme: body.theme !== undefined ? body.theme : current.theme,
      speaker: body.speaker !== undefined ? String(body.speaker).trim() : current.speaker,
      duration: body.duration !== undefined ? String(body.duration).trim() : current.duration,
      youtubeUrl: body.youtubeUrl !== undefined ? String(body.youtubeUrl).trim() : current.youtubeUrl,
      youtubeId: ytId,
      thumbnail: body.thumbnail !== undefined ? body.thumbnail : current.thumbnail,
      description: body.description !== undefined ? String(body.description).trim() : current.description,
    };

    list[idx] = updated;
    saveVideos(list);

    res.json({
      success: true,
      message: 'Vídeo atualizado com sucesso!',
      data: updated,
    });
  } catch (err: any) {
    console.error('[Backend] Erro ao atualizar vídeo:', err);
    res.status(500).json({ success: false, message: 'Erro interno ao atualizar vídeo.' });
  }
});

// Excluir vídeo
app.delete('/api/videos/:id', (req, res) => {
  try {
    const { id } = req.params;
    let list = loadVideos();
    list = list.filter(v => v.id !== id);
    saveVideos(list);

    res.json({ success: true, message: 'Vídeo excluído com sucesso.' });
  } catch (err: any) {
    console.error('[Backend] Erro ao excluir vídeo:', err);
    res.status(500).json({ success: false, message: 'Erro interno ao excluir vídeo.' });
  }
});

// Sincronizar lote de vídeos (Merge bidirecional)
app.post('/api/videos/sync', (req, res) => {
  try {
    const incomingVideos = Array.isArray(req.body.videos) ? req.body.videos : [];
    const list = loadVideos();
    const map = new Map<string, VideoItem>();

    // Primeiro insere os locais
    for (const v of list) {
      map.set(v.id, v);
    }

    // Depois insere/atualiza com os que vieram do cliente
    for (const v of incomingVideos) {
      if (v && v.id) {
        if (!map.has(v.id)) {
          map.set(v.id, v);
        }
      }
    }

    const merged = Array.from(map.values());
    saveVideos(merged);

    res.json({
      success: true,
      count: merged.length,
      data: merged,
      message: 'Vídeos sincronizados e consolidados com sucesso!',
    });
  } catch (err: any) {
    console.error('[Backend] Erro ao sincronizar vídeos:', err);
    res.status(500).json({ success: false, message: 'Erro interno ao sincronizar vídeos.' });
  }
});

app.listen(PORT, () => {
  console.log(`[Backend] Servidor rodando na porta ${PORT}`);
});

