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

if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
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

app.listen(PORT, () => {
  console.log(`[Backend] Servidor rodando na porta ${PORT}`);
});

