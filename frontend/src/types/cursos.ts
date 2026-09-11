export interface AlunoCursoRegistro {
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
  certificadoCodigo: string;
}

export const STORAGE_ALUNOS_CURSOS_KEY = 'ep_alunos_cursos_respostas_v1';
