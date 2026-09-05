import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { 
  FileSpreadsheet, Plus, Search, 
  CheckCircle2, DollarSign, Users, Award, 
  Edit3, Trash2, QrCode, Copy, Check, Heart, 
  CreditCard, Building2, X, Smartphone, MessageCircle, Image as ImageIcon,
  FileText
} from 'lucide-react';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { generatePixPayload } from '../../utils/pix';
import { STORAGE_KEYS } from '../../utils/appMetrics';

// ==========================================
// 1. INTERFACES DE DADOS
// ==========================================

// Planilha 1: Trilha do Discípulo Multiplicador
export interface MultiplicadorRow {
  id: number;
  num: string;
  name: string;
  m: string; // S ou N
  // Discipular
  d1: boolean;
  d2: boolean;
  d3: boolean;
  c1: boolean;
  c2: boolean;
  c3: boolean;
  // Evangelizar
  e1: boolean;
  e2: boolean;
  e3: boolean;
  e4: boolean;
  e5: boolean;
  vis: boolean;
  batiz: boolean;
}

// Planilha 2: Trilha de Evangelismo
export interface TrilhaEvangelismoRow {
  id: number;
  num: string;
  name: string;
  telefone: string;
  diaHora: string;
  ep: boolean;
  e1: boolean;
  e2: boolean;
  e3: boolean;
  e4: boolean;
  e5: boolean;
  decisao: boolean;
  dataDecisao: string;
  estudoBatismo: boolean;
  dataEstudoBatismo: string;
  batismo: boolean;
  dataBatismo: string;
}

// Planilha 3: Relatório Financeiro
export interface FinancialRow {
  id: number;
  num: string;
  name: string;
  doc: string;
  telefone: string;
  valor: number;
  data: string;
  forma: string;
  status: 'Confirmado' | 'Pendente';
}

// ==========================================
// 2. DADOS INICIAIS
// ==========================================

const INITIAL_MULTIPLICADOR: MultiplicadorRow[] = [
  { id: 1, num: '01', name: 'Carlos Eduardo Santos', m: 'S', d1: true, d2: true, d3: true, c1: true, c2: true, c3: false, e1: true, e2: true, e3: true, e4: true, e5: true, vis: true, batiz: true },
  { id: 2, num: '02', name: 'Marcos Vinicius Lima', m: 'S', d1: true, d2: true, d3: false, c1: true, c2: false, c3: false, e1: true, e2: true, e3: false, e4: false, e5: false, vis: false, batiz: false },
  { id: 3, num: '03', name: 'Ana Paula Rodrigues', m: 'N', d1: true, d2: true, d3: true, c1: true, c2: true, c3: true, e1: true, e2: true, e3: true, e4: true, e5: true, vis: true, batiz: true },
  { id: 4, num: '04', name: 'Lucas Gabriel Oliveira', m: 'S', d1: true, d2: false, d3: false, c1: true, c2: false, c3: false, e1: true, e2: false, e3: false, e4: false, e5: false, vis: false, batiz: false },
  { id: 5, num: '05', name: 'Juliana Mendes Costa', m: 'N', d1: true, d2: true, d3: true, c1: true, c2: true, c3: false, e1: true, e2: true, e3: true, e4: true, e5: false, vis: true, batiz: false },
  { id: 6, num: '06', name: 'Fernando Henrique Silva', m: 'S', d1: true, d2: true, d3: false, c1: true, c2: false, c3: false, e1: true, e2: true, e3: true, e4: false, e5: false, vis: true, batiz: false },
  { id: 7, num: '07', name: 'Beatriz Vasconcelos', m: 'N', d1: true, d2: true, d3: true, c1: true, c2: true, c3: true, e1: true, e2: true, e3: true, e4: true, e5: true, vis: true, batiz: true },
  { id: 8, num: '08', name: 'Rodrigo Antunes Prado', m: 'S', d1: true, d2: false, d3: false, c1: false, c2: false, c3: false, e1: true, e2: true, e3: false, e4: false, e5: false, vis: false, batiz: false },
  { id: 9, num: '09', name: 'Priscila Nogueira Lima', m: 'N', d1: true, d2: true, d3: true, c1: true, c2: true, c3: false, e1: true, e2: true, e3: true, e4: true, e5: true, vis: true, batiz: false },
  { id: 10, num: '10', name: 'Samuel Dantas Ferreira', m: 'S', d1: true, d2: true, d3: true, c1: true, c2: true, c3: true, e1: true, e2: true, e3: true, e4: true, e5: true, vis: true, batiz: true },
];

const INITIAL_EVANGELISMO: TrilhaEvangelismoRow[] = [
  { id: 1, num: '01', name: 'Carlos Eduardo Santos', telefone: '(68) 99981-4421', diaHora: 'Terça 19h30', ep: true, e1: true, e2: true, e3: true, e4: true, e5: true, decisao: true, dataDecisao: '12/08/2026', estudoBatismo: true, dataEstudoBatismo: '19/08/2026', batismo: true, dataBatismo: '30/08/2026' },
  { id: 2, num: '02', name: 'Marcos Vinicius Lima', telefone: '(68) 99214-7788', diaHora: 'Quinta 20h00', ep: true, e1: true, e2: true, e3: false, e4: false, e5: false, decisao: true, dataDecisao: '22/08/2026', estudoBatismo: false, dataEstudoBatismo: '', batismo: false, dataBatismo: '' },
  { id: 3, num: '03', name: 'Ana Paula Rodrigues', telefone: '(68) 98402-1133', diaHora: 'Sábado 16h00', ep: true, e1: true, e2: true, e3: true, e4: true, e5: true, decisao: true, dataDecisao: '05/08/2026', estudoBatismo: true, dataEstudoBatismo: '12/08/2026', batismo: true, dataBatismo: '23/08/2026' },
  { id: 4, num: '04', name: 'Lucas Gabriel Oliveira', telefone: '(68) 99912-3456', diaHora: 'Quarta 19h00', ep: true, e1: true, e2: false, e3: false, e4: false, e5: false, decisao: false, dataDecisao: '', estudoBatismo: false, dataEstudoBatismo: '', batismo: false, dataBatismo: '' },
  { id: 5, num: '05', name: 'Juliana Mendes Costa', telefone: '(68) 99233-8899', diaHora: 'Segunda 18h30', ep: true, e1: true, e2: true, e3: true, e4: true, e5: false, decisao: true, dataDecisao: '18/08/2026', estudoBatismo: true, dataEstudoBatismo: '25/08/2026', batismo: false, dataBatismo: '' },
];

const INITIAL_FINANCES: FinancialRow[] = [
  { id: 1, num: '001', name: 'Carlos Eduardo Santos', doc: '***.452.128-**', telefone: '(68) 99981-4421', valor: 50.00, data: '02/09/2026', forma: 'PIX', status: 'Confirmado' },
  { id: 2, num: '002', name: 'Igreja Batista Monte Sião', doc: '14.285.***/0001-**', telefone: '(68) 3224-5500', valor: 500.00, data: '01/09/2026', forma: 'Transferência', status: 'Confirmado' },
  { id: 3, num: '003', name: 'Ana Paula Rodrigues', doc: '***.891.332-**', telefone: '(68) 98402-1133', valor: 100.00, data: '28/08/2026', forma: 'PIX', status: 'Confirmado' },
  { id: 4, num: '004', name: 'Comunidade Vida Plena', doc: '08.192.***/0001-**', telefone: '(68) 3221-9988', valor: 250.00, data: '25/08/2026', forma: 'Boleto', status: 'Confirmado' },
  { id: 5, num: '005', name: 'Marcos Vinicius Lima', doc: '***.103.948-**', telefone: '(68) 99214-7788', valor: 20.00, data: '24/08/2026', forma: 'PIX', status: 'Confirmado' },
];

export const RelatoriosView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'multiplicador' | 'trilhaEvang' | 'oferta' | 'financeiro'>('multiplicador');
  const [search, setSearch] = useState('');

  // Estados das Planilhas com sincronização LocalStorage
  const [multiplicadorList, setMultiplicadorList] = useState<MultiplicadorRow[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MULTIPLICADORES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_MULTIPLICADOR;
  });

  const [evangelismoList, setEvangelismoList] = useState<TrilhaEvangelismoRow[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EVANGELISMO);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return INITIAL_EVANGELISMO;
  });

  const [financesList, setFinancesList] = useState<FinancialRow[]>(INITIAL_FINANCES);
  const [discipuladorNome, setDiscipuladorNome] = useState('Pr. Roberto Rodrigues Casas');

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.MULTIPLICADORES, JSON.stringify(multiplicadorList));
      localStorage.setItem(STORAGE_KEYS.EVANGELISMO, JSON.stringify(evangelismoList));
      window.dispatchEvent(new CustomEvent('app-metrics-updated'));
    } catch (e) {
      console.error(e);
    }
  }, [multiplicadorList, evangelismoList]);

  // Modais de Edição
  const [editingMulti, setEditingMulti] = useState<MultiplicadorRow | null>(null);
  const [editingEvang, setEditingEvang] = useState<TrilhaEvangelismoRow | null>(null);

  // Form de Inserção Rápida
  const [quickName, setQuickName] = useState('');
  const [quickPhone, setQuickPhone] = useState('');
  const [quickDiaHora, setQuickDiaHora] = useState('');

  // Form 1 Real por um Ideal
  const [ofertaNome, setOfertaNome] = useState('');
  const [ofertaDoc, setOfertaDoc] = useState('');
  const [ofertaTel, setOfertaTel] = useState('');
  const [ofertaValor, setOfertaValor] = useState<number>(10);
  const [ofertaForma, setOfertaForma] = useState<'PIX' | 'CAIXA' | 'CARTAO' | 'BOLETO'>('PIX');
  const [copiedPix, setCopiedPix] = useState(false);
  const [copiedPixFormatted, setCopiedPixFormatted] = useState(false);
  const [copiedPayload, setCopiedPayload] = useState(false);
  const [pixViewMode, setPixViewMode] = useState<'qrValid' | 'originalImage'>('qrValid');
  const [ofertaSucesso, setOfertaSucesso] = useState(false);

  const CHAVE_PIX_NUM = '68992393910';
  const CHAVE_PIX_INTERNACIONAL = '+5568992393910';
  const CHAVE_PIX_FORMATADA = '(68) 99239-3910';

  // Gerar o Payload Oficial BACEN com CRC-16
  const currentPixPayload = generatePixPayload({
    key: CHAVE_PIX_INTERNACIONAL,
    name: 'ROBERTO RODRIGUES CASAS',
    city: 'RIO BRANCO',
    amount: ofertaValor > 0 ? ofertaValor : undefined,
    txid: '***'
  });

  // Copiar chave simples
  const handleCopyPix = (mode: 'num' | 'intl' | 'payload') => {
    if (mode === 'num') {
      navigator.clipboard.writeText(CHAVE_PIX_NUM);
      setCopiedPix(true);
      setTimeout(() => setCopiedPix(false), 3000);
    } else if (mode === 'intl') {
      navigator.clipboard.writeText(CHAVE_PIX_INTERNACIONAL);
      setCopiedPixFormatted(true);
      setTimeout(() => setCopiedPixFormatted(false), 3000);
    } else {
      navigator.clipboard.writeText(currentPixPayload);
      setCopiedPayload(true);
      setTimeout(() => setCopiedPayload(false), 3000);
    }
  };

  // Registrar Oferta no Relatório Financeiro
  const handleRegistrarOferta = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ofertaNome.trim()) return;

    const nextNum = (financesList.length + 1).toString().padStart(3, '0');
    const novaOferta: FinancialRow = {
      id: Date.now(),
      num: nextNum,
      name: ofertaNome.trim(),
      doc: ofertaDoc.trim() || '***.***.***-**',
      telefone: ofertaTel.trim() || '(68) 99239-3910',
      valor: Number(ofertaValor) || 1,
      data: new Date().toLocaleDateString('pt-BR'),
      forma: ofertaForma,
      status: 'Confirmado'
    };

    setFinancesList([novaOferta, ...financesList]);
    setOfertaSucesso(true);
    setTimeout(() => {
      setOfertaSucesso(false);
      setOfertaNome('');
      setOfertaDoc('');
      setOfertaTel('');
    }, 4000);
  };

  // ==========================================
  // FUNÇÕES DE AÇÃO NAS PLANILHAS (EDITAR / DELETAR)
  // ==========================================

  // Multiplicador Actions
  const handleAddMultiplicador = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim()) return;
    const nextNum = (multiplicadorList.length + 1).toString().padStart(2, '0');
    const newRow: MultiplicadorRow = {
      id: Date.now(),
      num: nextNum,
      name: quickName.trim(),
      m: 'S',
      d1: true,
      d2: false,
      d3: false,
      c1: true,
      c2: false,
      c3: false,
      e1: true,
      e2: false,
      e3: false,
      e4: false,
      e5: false,
      vis: false,
      batiz: false,
    };
    setMultiplicadorList([...multiplicadorList, newRow]);
    setQuickName('');
  };

  const handleDeleteMulti = (id: number) => {
    if (confirm('Deseja realmente excluir este discípulo da planilha?')) {
      setMultiplicadorList(multiplicadorList.filter(item => item.id !== id));
    }
  };

  const handleSaveEditMulti = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMulti) return;
    setMultiplicadorList(multiplicadorList.map(item => item.id === editingMulti.id ? editingMulti : item));
    setEditingMulti(null);
  };

  const toggleMultiCheck = (id: number, field: keyof MultiplicadorRow) => {
    setMultiplicadorList(multiplicadorList.map(item => {
      if (item.id === id) {
        return { ...item, [field]: !item[field] };
      }
      return item;
    }));
  };

  // Trilha Evangelismo Actions
  const handleAddEvangelismo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickName.trim()) return;
    const nextNum = (evangelismoList.length + 1).toString().padStart(2, '0');
    const newRow: TrilhaEvangelismoRow = {
      id: Date.now(),
      num: nextNum,
      name: quickName.trim(),
      telefone: quickPhone.trim() || '(68) 9____-____',
      diaHora: quickDiaHora.trim() || 'A Definir',
      ep: true,
      e1: true,
      e2: false,
      e3: false,
      e4: false,
      e5: false,
      decisao: false,
      dataDecisao: '',
      estudoBatismo: false,
      dataEstudoBatismo: '',
      batismo: false,
      dataBatismo: '',
    };
    setEvangelismoList([...evangelismoList, newRow]);
    setQuickName('');
    setQuickPhone('');
    setQuickDiaHora('');
  };

  const handleDeleteEvang = (id: number) => {
    if (confirm('Deseja realmente excluir esta pessoa da trilha de evangelismo?')) {
      setEvangelismoList(evangelismoList.filter(item => item.id !== id));
    }
  };

  const handleSaveEditEvang = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEvang) return;
    setEvangelismoList(evangelismoList.map(item => item.id === editingEvang.id ? editingEvang : item));
    setEditingEvang(null);
  };

  const toggleEvangCheck = (id: number, field: keyof TrilhaEvangelismoRow) => {
    setEvangelismoList(evangelismoList.map(item => {
      if (item.id === id) {
        const nextVal = !item[field];
        const updateData: any = { [field]: nextVal };
        if (field === 'decisao' && nextVal && !item.dataDecisao) {
          updateData.dataDecisao = new Date().toLocaleDateString('pt-BR');
        }
        if (field === 'estudoBatismo' && nextVal && !item.dataEstudoBatismo) {
          updateData.dataEstudoBatismo = new Date().toLocaleDateString('pt-BR');
        }
        if (field === 'batismo' && nextVal && !item.dataBatismo) {
          updateData.dataBatismo = new Date().toLocaleDateString('pt-BR');
        }
        return { ...item, ...updateData };
      }
      return item;
    }));
  };

  // Helper infalível com Base64 Data URI (garante o nome exato e a extensão no Chrome/Edge)
  const downloadDataUri = (dataUri: string, filename: string) => {
    const link = document.createElement('a');
    link.href = dataUri;
    link.setAttribute('download', filename);
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    setTimeout(() => {
      document.body.removeChild(link);
    }, 400);
  };

  // Exportar para XLSX com Base64 Data URI
  const exportToExcel = () => {
    const wb = XLSX.utils.book_new();
    let filename = 'Trilha_Do_Discipulo_Multiplicador.xlsx';

    if (activeTab === 'multiplicador') {
      const data = multiplicadorList.map(d => ({
        'Nº': d.num,
        'DISCÍPULOS': d.name,
        'M': d.m,
        'DISCIPULAR - 1º C': d.d1 ? 'OK' : '',
        'DISCIPULAR - 2º C': d.d2 ? 'OK' : '',
        'DISCIPULAR - 3º C': d.d3 ? 'OK' : '',
        'DISCIPULAR - Total': [d.d1, d.d2, d.d3].filter(Boolean).length,
        'DISCIPULAR - Curso 1': d.c1 ? 'OK' : '',
        'DISCIPULAR - Curso 2': d.c2 ? 'OK' : '',
        'DISCIPULAR - Curso 3': d.c3 ? 'OK' : '',
        'EVANGELIZAR - 1º S': d.e1 ? 'OK' : '',
        'EVANGELIZAR - 2º S': d.e2 ? 'OK' : '',
        'EVANGELIZAR - 3º S': d.e3 ? 'OK' : '',
        'EVANGELIZAR - 4º S': d.e4 ? 'OK' : '',
        'EVANGELIZAR - 5º S': d.e5 ? 'OK' : '',
        'EVANGELIZAR - Total': [d.e1, d.e2, d.e3, d.e4, d.e5].filter(Boolean).length,
        'EVANGELIZAR - Visitas': d.vis ? 'OK' : '',
        'EVANGELIZAR - Batismo': d.batiz ? 'OK' : '',
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Trilha Multiplicador');
      filename = 'Trilha_Do_Discipulo_Multiplicador.xlsx';
    } else if (activeTab === 'trilhaEvang') {
      const data = evangelismoList.map(e => ({
        'N': e.num,
        'DISCÍPULOS': e.name,
        'TELEFONE': e.telefone,
        'ESTUDO DIA / HORA': e.diaHora,
        'EP': e.ep ? 'OK' : '',
        'ESTUDO 01': e.e1 ? 'OK' : '',
        'ESTUDO 02': e.e2 ? 'OK' : '',
        'ESTUDO 03': e.e3 ? 'OK' : '',
        'ESTUDO 04': e.e4 ? 'OK' : '',
        'ESTUDO 05': e.e5 ? 'OK' : '',
        'DECISÃO': e.decisao ? 'OK' : '',
        'DATA DECISÃO': e.dataDecisao,
        'ESTUDO BATISMO': e.estudoBatismo ? 'OK' : '',
        'DATA ESTUDO BATISMO': e.dataEstudoBatismo,
        'BATISMO': e.batismo ? 'OK' : '',
        'DATA BATISMO': e.dataBatismo,
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Trilha de Evangelismo');
      filename = 'Trilha_De_Evangelismo.xlsx';
    } else {
      const data = financesList.map(f => ({
        'Nº': f.num,
        'Nome do Contribuinte': f.name,
        'CPF/CNPJ': f.doc,
        'Telefone': f.telefone,
        'Valor Ofertado (R$)': f.valor,
        'Data': f.data,
        'Forma de Pagamento': f.forma,
        'Status': f.status,
      }));
      const ws = XLSX.utils.json_to_sheet(data);
      XLSX.utils.book_append_sheet(wb, ws, 'Relatório Financeiro');
      filename = 'Relatorio_Financeiro_Ofertas.xlsx';
    }

    const base64 = XLSX.write(wb, { bookType: 'xlsx', type: 'base64' });
    const dataUri = `data:application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;base64,${base64}`;
    downloadDataUri(dataUri, filename);
  };

  // Exportar para PDF com Base64 Data URI
  const exportToPDF = () => {
    const doc = new jsPDF({
      orientation: 'landscape',
      unit: 'mm',
      format: 'a4'
    });

    const currentDate = new Date().toLocaleDateString('pt-BR');
    let filename = 'Trilha_Do_Discipulo_Multiplicador.pdf';

    if (activeTab === 'multiplicador') {
      filename = 'Trilha_Do_Discipulo_Multiplicador.pdf';
      doc.setFillColor(31, 56, 100); // #1F3864
      doc.rect(14, 10, 269, 14, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('TRILHA DO DISCÍPULO MULTIPLICADOR — EVANGELISMO PRÁTICO', 148.5, 19, { align: 'center' });

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Discipulador: ${discipuladorNome} | Data: ${currentDate} | Total de Discípulos: ${multiplicadorList.length}`, 14, 30);

      const tableData = multiplicadorList.map(d => [
        d.num,
        d.name,
        d.m,
        d.d1 ? 'X' : '-',
        d.d2 ? 'X' : '-',
        d.d3 ? 'X' : '-',
        [d.d1, d.d2, d.d3].filter(Boolean).length.toString(),
        d.c1 ? 'X' : '-',
        d.c2 ? 'X' : '-',
        d.c3 ? 'X' : '-',
        d.e1 ? 'X' : '-',
        d.e2 ? 'X' : '-',
        d.e3 ? 'X' : '-',
        d.e4 ? 'X' : '-',
        d.e5 ? 'X' : '-',
        [d.e1, d.e2, d.e3, d.e4, d.e5].filter(Boolean).length.toString(),
        d.vis ? 'X' : '-',
        d.batiz ? 'X' : '-'
      ]);

      autoTable(doc, {
        startY: 34,
        head: [
          [
            { content: 'DISCÍPULOS', colSpan: 3, styles: { fillColor: [192, 0, 0], halign: 'center' } },
            { content: 'DISCIPULAR', colSpan: 7, styles: { fillColor: [131, 60, 12], halign: 'center' } },
            { content: 'EVANGELIZAR', colSpan: 8, styles: { fillColor: [0, 176, 80], halign: 'center' } }
          ],
          [
            'Nº', 'NOME DO DISCÍPULO', 'M',
            '1º C', '2º C', '3º C', 'Total', 'C1', 'C2', 'C3',
            '1º S', '2º S', '3º S', '4º S', '5º S', 'Total', 'Vis', 'Batiz'
          ]
        ],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [31, 56, 100],
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 8,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 8,
          halign: 'center'
        },
        columnStyles: {
          1: { halign: 'left', minCellWidth: 40 }
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        }
      });
    } else if (activeTab === 'trilhaEvang') {
      filename = 'Trilha_De_Evangelismo.pdf';
      doc.setFillColor(31, 56, 100);
      doc.rect(14, 10, 269, 14, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('TRILHA DE EVANGELISMO — A NOSSA MISSÃO É FAZER DISCÍPULOS', 148.5, 19, { align: 'center' });

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Coordenação: Pr. Roberto Casas | Data: ${currentDate} | Total: ${evangelismoList.length} pessoas`, 14, 30);

      const tableData = evangelismoList.map(e => [
        e.num,
        e.name,
        e.telefone,
        e.diaHora,
        e.ep ? 'X' : '-',
        e.e1 ? 'X' : '-',
        e.e2 ? 'X' : '-',
        e.e3 ? 'X' : '-',
        e.e4 ? 'X' : '-',
        e.e5 ? 'X' : '-',
        e.decisao ? 'SIM' : '-',
        e.dataDecisao || '-',
        e.estudoBatismo ? 'SIM' : '-',
        e.dataEstudoBatismo || '-',
        e.batismo ? 'SIM' : '-',
        e.dataBatismo || '-'
      ]);

      autoTable(doc, {
        startY: 34,
        head: [[
          'N', 'DISCÍPULOS', 'TELEFONE', 'DIA / HORA', 'EP',
          'E1', 'E2', 'E3', 'E4', 'E5',
          'DECISÃO', 'DATA DEC.', 'EST. BAT.', 'DATA EST.', 'BATISMO', 'DATA BAT.'
        ]],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [31, 56, 100],
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 7.5,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 7.5,
          halign: 'center'
        },
        columnStyles: {
          1: { halign: 'left', minCellWidth: 35 },
          2: { halign: 'center', minCellWidth: 22 }
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        }
      });
    } else {
      filename = 'Relatorio_Financeiro_Ofertas.pdf';
      doc.setFillColor(31, 56, 100);
      doc.rect(14, 10, 269, 14, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(13);
      doc.setFont('helvetica', 'bold');
      doc.text('RELATÓRIO FINANCEIRO DE CONTRIBUIÇÕES — 1 REAL POR UM IDEAL', 148.5, 19, { align: 'center' });

      doc.setTextColor(50, 50, 50);
      doc.setFontSize(9);
      doc.setFont('helvetica', 'normal');
      doc.text(`Data: ${currentDate} | Total de Ofertas: R$ ${totalArrecadado.toFixed(2)}`, 14, 30);

      const tableData = financesList.map(f => [
        f.num,
        f.name,
        f.doc,
        f.telefone,
        `R$ ${f.valor.toFixed(2)}`,
        f.data,
        f.forma,
        f.status
      ]);

      autoTable(doc, {
        startY: 34,
        head: [[
          'Nº', 'NOME DO CONTRIBUINTE', 'CPF/CNPJ', 'TELEFONE', 'VALOR', 'DATA', 'FORMA', 'STATUS'
        ]],
        body: tableData,
        theme: 'grid',
        headStyles: {
          fillColor: [31, 56, 100],
          textColor: 255,
          fontStyle: 'bold',
          fontSize: 8.5,
          halign: 'center'
        },
        bodyStyles: {
          fontSize: 8.5,
          halign: 'center'
        },
        columnStyles: {
          1: { halign: 'left', minCellWidth: 45 }
        },
        alternateRowStyles: {
          fillColor: [245, 247, 250]
        }
      });
    }

    const pdfDataUri = doc.output('datauristring', { filename });
    downloadDataUri(pdfDataUri, filename);
  };

  // Filtros de Busca
  const filteredMulti = multiplicadorList.filter(d => d.name.toLowerCase().includes(search.toLowerCase()));
  const filteredEvang = evangelismoList.filter(e => e.name.toLowerCase().includes(search.toLowerCase()) || e.telefone.includes(search));
  const filteredFinances = financesList.filter(f => f.name.toLowerCase().includes(search.toLowerCase()));

  // Totais Multiplicador
  const totalMultiDiscipulos = multiplicadorList.length;
  const totalBatizados = multiplicadorList.filter(d => d.batiz).length;
  const totalArrecadado = financesList.reduce((acc, curr) => acc + curr.valor, 0);

  return (
    <div className="space-y-8 animate-fadeIn">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <FileSpreadsheet size={14} className="text-teal-500" />
            Sistema de Gestão & Planilhas do IDE
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Planilhas Editáveis & Gestão Ministerial
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Painéis com congelamento vertical/horizontal, edição em tempo real, exportação Excel/PDF e formulário oficial de ofertas.
          </p>
        </div>

        {/* Action Buttons (Excel & PDF) */}
        <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
          <button
            onClick={exportToExcel}
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-emerald-600/20 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Baixar planilha formatada em Excel (.xlsx)"
          >
            <FileSpreadsheet size={16} />
            Baixar Excel (.xlsx)
          </button>

          <button
            onClick={exportToPDF}
            className="flex-1 lg:flex-none inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-rose-600/20 transition-all duration-200 hover:scale-105 active:scale-95"
            title="Gerar e baixar relatório em PDF pronto para impressão (.pdf)"
          >
            <FileText size={16} />
            Baixar PDF (.pdf)
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
            <Users size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Total de Discípulos</p>
            <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">{totalMultiDiscipulos} Registrados</h3>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
            <Award size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Batizados / Confirmados</p>
            <h3 className="font-heading font-bold text-2xl text-slate-900 dark:text-white">{totalBatizados} Vidas</h3>
          </div>
        </div>

        <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-lg flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <DollarSign size={24} />
          </div>
          <div>
            <p className="text-xs font-medium text-slate-400">Ofertas "1 Real por um Ideal"</p>
            <h3 className="font-heading font-bold text-2xl text-emerald-600 dark:text-emerald-400">
              R$ {totalArrecadado.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </h3>
          </div>
        </div>
      </div>

      {/* Main Tab Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div className="flex flex-wrap rounded-2xl bg-slate-100 dark:bg-slate-800/80 p-1.5 border border-slate-200 dark:border-slate-700 gap-1">
          <button
            onClick={() => setActiveTab('multiplicador')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'multiplicador'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            1. Trilha Discípulo Multiplicador
          </button>
          <button
            onClick={() => setActiveTab('trilhaEvang')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'trilhaEvang'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            2. Trilha de Evangelismo
          </button>
          <button
            onClick={() => setActiveTab('oferta')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'oferta'
                ? 'bg-gradient-to-r from-amber-500 to-teal-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            💰 1 Real por um Ideal (PIX/QR)
          </button>
          <button
            onClick={() => setActiveTab('financeiro')}
            className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
              activeTab === 'financeiro'
                ? 'bg-white dark:bg-slate-900 text-teal-600 dark:text-teal-400 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            3. Relatório Financeiro
          </button>
        </div>

        {/* Search */}
        {activeTab !== 'oferta' && (
          <div className="relative w-full sm:w-64">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar pelo nome..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        )}
      </div>

      {/* =========================================================================
          TAB 1: TRILHA DO DISCÍPULO MULTIPLICADOR (IMAGEM 1)
          Com congelamento vertical (sticky header) e horizontal (sticky colunas)
          ========================================================================= */}
      {activeTab === 'multiplicador' && (
        <div className="space-y-6">
          {/* Header Discipulador & Inserção Rápida */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase text-teal-600 dark:text-teal-400">DISCIPULADOR:</span>
                <input
                  type="text"
                  value={discipuladorNome}
                  onChange={(e) => setDiscipuladorNome(e.target.value)}
                  className="px-3 py-1 rounded-lg text-sm font-semibold bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* Download Buttons inside Tab 1 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportToExcel}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                  title="Baixar Trilha do Discípulo Multiplicador em Excel"
                >
                  <FileSpreadsheet size={14} />
                  Excel (.xlsx)
                </button>
                <button
                  type="button"
                  onClick={exportToPDF}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                  title="Baixar Trilha do Discípulo Multiplicador em PDF"
                >
                  <FileText size={14} />
                  PDF (.pdf)
                </button>
              </div>
            </div>

            <form onSubmit={handleAddMultiplicador} className="flex flex-col sm:flex-row items-center gap-3">
              <input
                type="text"
                placeholder="Nome do Novo Discípulo para Adicionar..."
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                className="flex-1 w-full px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-teal-600/20"
              >
                <Plus size={16} /> Adicionar Discípulo
              </button>
            </form>
          </div>

          {/* Planilha com Congelamento Vertical e Horizontal */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden">
            <div className="overflow-auto max-h-[520px] relative">
              <table className="w-full text-xs text-center border-collapse">
                
                {/* Header Fixo (Sticky Top) */}
                <thead className="sticky top-0 z-30 shadow-md">
                  {/* Linha 1: Título Oficial */}
                  <tr className="bg-[#1F3864] text-white font-heading font-bold text-sm tracking-wider">
                    <th colSpan={20} className="py-3 px-4 text-center">
                      TRILHA DO DISCÍPULO MULTIPLICADOR
                    </th>
                  </tr>

                  {/* Linha 2: Seções Principais */}
                  <tr className="font-bold text-white text-xs uppercase tracking-wider">
                    <th colSpan={2} className="sticky left-0 z-40 bg-[#C00000] py-2.5 px-3 border border-slate-700 shadow-[2px_0_5px_rgba(0,0,0,0.15)]">
                      DISCÍPULOS
                    </th>
                    <th className="bg-[#C00000] py-2.5 px-2 border border-slate-700">M</th>
                    <th colSpan={7} className="bg-[#833C0C] py-2.5 px-3 border border-slate-700">
                      DISCÍPULAR
                    </th>
                    <th colSpan={8} className="bg-[#00B050] py-2.5 px-3 border border-slate-700">
                      EVANGELIZAR
                    </th>
                    <th className="bg-[#1F3864] py-2.5 px-3 border border-slate-700">AÇÕES</th>
                  </tr>

                  {/* Linha 3: Sub-cabeçalhos */}
                  <tr className="font-bold text-[11px] text-white">
                    <th className="sticky left-0 z-40 bg-[#00B050] py-2 px-2 border border-slate-400 w-12 text-center shadow-[2px_0_5px_rgba(0,0,0,0.15)]">Nº</th>
                    <th className="sticky left-12 z-40 bg-[#00B050] py-2 px-4 text-left border border-slate-400 min-w-[200px] shadow-[2px_0_5px_rgba(0,0,0,0.15)]">NOME DO DISCÍPULO</th>
                    <th className="bg-[#375623] py-2 px-2 border border-slate-400 w-10">M</th>

                    {/* Discipular */}
                    <th className="bg-[#FF6600] py-2 px-2 border border-slate-400">1º C</th>
                    <th className="bg-[#92D050] py-2 px-2 border border-slate-400">2º C</th>
                    <th className="bg-[#00B0F0] py-2 px-2 border border-slate-400">3º C</th>
                    <th className="bg-[#404040] py-2 px-2 border border-slate-400 font-bold">Total</th>
                    <th className="bg-[#FF6600] py-2 px-2 border border-slate-400">Curso 1</th>
                    <th className="bg-[#92D050] py-2 px-2 border border-slate-400">Curso 2</th>
                    <th className="bg-[#00B0F0] py-2 px-2 border border-slate-400">Curso 3</th>

                    {/* Evangelizar */}
                    <th className="bg-[#FF6600] py-2 px-2 border border-slate-400">1º S</th>
                    <th className="bg-[#FFFF00] text-black py-2 px-2 border border-slate-400">2º S</th>
                    <th className="bg-[#00B0F0] py-2 px-2 border border-slate-400">3º S</th>
                    <th className="bg-[#7030A0] py-2 px-2 border border-slate-400">4º S</th>
                    <th className="bg-[#1F3864] py-2 px-2 border border-slate-400">5º S</th>
                    <th className="bg-[#404040] py-2 px-2 border border-slate-400 font-bold">Total</th>
                    <th className="bg-[#375623] py-2 px-2 border border-slate-400">Vis</th>
                    <th className="bg-[#00B050] py-2 px-2 border border-slate-400">Batiz</th>
                    <th className="bg-[#1F3864] py-2 px-3 border border-slate-400 min-w-[80px]">Opções</th>
                  </tr>
                </thead>

                {/* Corpo de Dados com Colunas da Esquerda Fixas */}
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredMulti.map((d, index) => {
                    const totalDiscipular = [d.d1, d.d2, d.d3].filter(Boolean).length;
                    const totalEvangelizar = [d.e1, d.e2, d.e3, d.e4, d.e5].filter(Boolean).length;

                    return (
                      <tr key={d.id} className={`hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-colors ${
                        index % 2 === 0 ? 'bg-slate-50/60 dark:bg-slate-900/60' : 'bg-white dark:bg-slate-900'
                      }`}>
                        {/* Coluna 1 Fixa: Nº */}
                        <td className="sticky left-0 z-20 py-2.5 px-2 font-mono font-bold text-slate-600 dark:text-slate-400 bg-inherit border border-slate-300 dark:border-slate-700 shadow-[2px_0_5px_rgba(0,0,0,0.08)]">
                          {d.num}
                        </td>

                        {/* Coluna 2 Fixa: Nome do Discípulo */}
                        <td className="sticky left-12 z-20 py-2.5 px-4 text-left font-semibold text-slate-800 dark:text-slate-200 bg-inherit border border-slate-300 dark:border-slate-700 shadow-[2px_0_5px_rgba(0,0,0,0.08)]">
                          {d.name}
                        </td>

                        {/* Coluna M */}
                        <td className="py-2.5 px-2 border border-slate-300 dark:border-slate-700 font-bold text-teal-600">
                          {d.m}
                        </td>

                        {/* Discipular Checkboxes */}
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'd1')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.d1 ? 'bg-[#FF6600] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.d1 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'd2')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.d2 ? 'bg-[#92D050] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.d2 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'd3')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.d3 ? 'bg-[#00B0F0] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.d3 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-2 font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                          {totalDiscipular}/3
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'c1')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.c1 ? 'bg-[#FF6600] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.c1 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'c2')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.c2 ? 'bg-[#92D050] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.c2 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'c3')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.c3 ? 'bg-[#00B0F0] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.c3 ? '✓' : ''}</span>
                        </td>

                        {/* Evangelizar Checkboxes */}
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'e1')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.e1 ? 'bg-[#FF6600] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.e1 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'e2')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.e2 ? 'bg-[#FFFF00] text-black shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.e2 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'e3')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.e3 ? 'bg-[#00B0F0] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.e3 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'e4')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.e4 ? 'bg-[#7030A0] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.e4 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'e5')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.e5 ? 'bg-[#1F3864] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.e5 ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-2 font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700">
                          {totalEvangelizar}/5
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'vis')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.vis ? 'bg-[#375623] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.vis ? '✓' : ''}</span>
                        </td>
                        <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleMultiCheck(d.id, 'batiz')}>
                          <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${d.batiz ? 'bg-[#00B050] text-white shadow-sm' : 'bg-slate-200 dark:bg-slate-700'}`}>{d.batiz ? '✓' : ''}</span>
                        </td>

                        {/* Ações (Editar / Deletar) */}
                        <td className="py-2 px-2 border border-slate-300 dark:border-slate-700">
                          <div className="flex items-center justify-center gap-1.5">
                            <button
                              onClick={() => setEditingMulti(d)}
                              title="Editar Discípulo"
                              className="p-1 rounded-lg text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            >
                              <Edit3 size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteMulti(d.id)}
                              title="Excluir Linha"
                              className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>

                {/* Rodapé TOTAL */}
                <tfoot className="bg-slate-100 dark:bg-slate-800/90 font-bold border-t-2 border-slate-400">
                  <tr>
                    <td colSpan={2} className="sticky left-0 z-20 py-3 px-4 text-left font-bold text-slate-900 dark:text-white bg-slate-200 dark:bg-slate-800 shadow-[2px_0_5px_rgba(0,0,0,0.1)]">
                      TOTAL GERAL: {multiplicadorList.length} Discípulos
                    </td>
                    <td>-</td>
                    <td>{multiplicadorList.filter(d => d.d1).length}</td>
                    <td>{multiplicadorList.filter(d => d.d2).length}</td>
                    <td>{multiplicadorList.filter(d => d.d3).length}</td>
                    <td>-</td>
                    <td>{multiplicadorList.filter(d => d.c1).length}</td>
                    <td>{multiplicadorList.filter(d => d.c2).length}</td>
                    <td>{multiplicadorList.filter(d => d.c3).length}</td>
                    <td>{multiplicadorList.filter(d => d.e1).length}</td>
                    <td>{multiplicadorList.filter(d => d.e2).length}</td>
                    <td>{multiplicadorList.filter(d => d.e3).length}</td>
                    <td>{multiplicadorList.filter(d => d.e4).length}</td>
                    <td>{multiplicadorList.filter(d => d.e5).length}</td>
                    <td>-</td>
                    <td>{multiplicadorList.filter(d => d.vis).length}</td>
                    <td>{multiplicadorList.filter(d => d.batiz).length}</td>
                    <td>-</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 2: TRILHA DE EVANGELISMO (IMAGEM 2)
          Com congelamento vertical (sticky header) e horizontal (sticky colunas)
          ========================================================================= */}
      {activeTab === 'trilhaEvang' && (
        <div className="space-y-6">
          {/* Header & Inserção Rápida */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-lg space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
              <span className="text-xs font-bold text-teal-600 dark:text-teal-400 uppercase">
                A NOSSA MISSÃO É FAZER DISCÍPULOS
              </span>
              
              {/* Download Buttons inside Tab 2 */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={exportToExcel}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                  title="Baixar Trilha de Evangelismo em Excel"
                >
                  <FileSpreadsheet size={14} />
                  Excel (.xlsx)
                </button>
                <button
                  type="button"
                  onClick={exportToPDF}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                  title="Baixar Trilha de Evangelismo em PDF"
                >
                  <FileText size={14} />
                  PDF (.pdf)
                </button>
              </div>
            </div>

            <form onSubmit={handleAddEvangelismo} className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <input
                type="text"
                placeholder="Nome da Pessoa..."
                value={quickName}
                onChange={(e) => setQuickName(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Nº Telefone (WhatsApp)"
                value={quickPhone}
                onChange={(e) => setQuickPhone(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <input
                type="text"
                placeholder="Estudo Dia / Hora (Ex: Quarta 19h)"
                value={quickDiaHora}
                onChange={(e) => setQuickDiaHora(e.target.value)}
                className="px-4 py-2.5 rounded-xl text-xs sm:text-sm bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs sm:text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-md shadow-teal-600/20"
              >
                <Plus size={16} /> Cadastrar na Trilha
              </button>
            </form>
          </div>

          {/* Planilha Trilha de Evangelismo */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-2xl overflow-hidden">
            <div className="overflow-auto max-h-[520px] relative">
              <table className="w-full text-xs text-center border-collapse">
                
                {/* Header Fixo */}
                <thead className="sticky top-0 z-30 shadow-md">
                  <tr className="bg-slate-800 text-white font-heading font-bold text-sm tracking-wider">
                    <th colSpan={16} className="py-3 px-4 text-center">
                      TRILHA DE EVANGELISMO
                    </th>
                  </tr>

                  <tr className="bg-slate-700 text-white font-bold text-[11px] uppercase">
                    <th className="sticky left-0 z-40 bg-slate-700 py-2.5 px-2 border border-slate-500 w-12 text-center shadow-[2px_0_5px_rgba(0,0,0,0.15)]">N</th>
                    <th className="sticky left-12 z-40 bg-slate-700 py-2.5 px-4 text-left border border-slate-500 min-w-[180px] shadow-[2px_0_5px_rgba(0,0,0,0.15)]">DISCÍPULOS</th>
                    <th className="py-2.5 px-3 border border-slate-500 min-w-[130px]">Nº TELEFONE</th>
                    <th className="py-2.5 px-3 border border-slate-500 min-w-[130px]">ESTUDO DIA / HORA</th>
                    <th className="py-2.5 px-2 border border-slate-500 bg-amber-700">EP</th>
                    
                    {/* Estudo Evangelismo 01 a 05 */}
                    <th className="py-2.5 px-2 border border-slate-500 bg-teal-800">01</th>
                    <th className="py-2.5 px-2 border border-slate-500 bg-teal-800">02</th>
                    <th className="py-2.5 px-2 border border-slate-500 bg-teal-800">03</th>
                    <th className="py-2.5 px-2 border border-slate-500 bg-teal-800">04</th>
                    <th className="py-2.5 px-2 border border-slate-500 bg-teal-800">05</th>

                    {/* Decisão, Estudo Batismo e Batismo */}
                    <th className="py-2.5 px-2 border border-slate-500 bg-emerald-800">DECISÃO</th>
                    <th className="py-2.5 px-3 border border-slate-500 min-w-[90px]">DATA</th>
                    <th className="py-2.5 px-2 border border-slate-500 bg-sky-800">EST. BATISMO</th>
                    <th className="py-2.5 px-3 border border-slate-500 min-w-[90px]">DATA</th>
                    <th className="py-2.5 px-2 border border-slate-500 bg-indigo-800">BATISMO</th>
                    <th className="py-2.5 px-3 border border-slate-500 min-w-[90px]">AÇÕES</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredEvang.map((e, index) => (
                    <tr key={e.id} className={`hover:bg-teal-50/40 dark:hover:bg-teal-950/20 transition-colors ${
                      index % 2 === 0 ? 'bg-slate-50/60 dark:bg-slate-900/60' : 'bg-white dark:bg-slate-900'
                    }`}>
                      {/* Coluna 1 Fixa */}
                      <td className="sticky left-0 z-20 py-2.5 px-2 font-mono font-bold text-slate-600 dark:text-slate-400 bg-inherit border border-slate-300 dark:border-slate-700 shadow-[2px_0_5px_rgba(0,0,0,0.08)]">
                        {e.num}
                      </td>

                      {/* Coluna 2 Fixa */}
                      <td className="sticky left-12 z-20 py-2.5 px-4 text-left font-semibold text-slate-800 dark:text-slate-200 bg-inherit border border-slate-300 dark:border-slate-700 shadow-[2px_0_5px_rgba(0,0,0,0.08)]">
                        {e.name}
                      </td>

                      <td className="py-2.5 px-3 border border-slate-300 dark:border-slate-700 font-mono text-slate-600 dark:text-slate-300">
                        {e.telefone}
                      </td>

                      <td className="py-2.5 px-3 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        {e.diaHora}
                      </td>

                      {/* EP */}
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'ep')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.ep ? 'bg-amber-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.ep ? '✓' : ''}</span>
                      </td>

                      {/* Estudos 01 a 05 */}
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'e1')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.e1 ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.e1 ? '✓' : ''}</span>
                      </td>
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'e2')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.e2 ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.e2 ? '✓' : ''}</span>
                      </td>
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'e3')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.e3 ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.e3 ? '✓' : ''}</span>
                      </td>
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'e4')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.e4 ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.e4 ? '✓' : ''}</span>
                      </td>
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'e5')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.e5 ? 'bg-teal-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.e5 ? '✓' : ''}</span>
                      </td>

                      {/* Decisão + Data */}
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'decisao')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.decisao ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.decisao ? '✓' : ''}</span>
                      </td>
                      <td className="py-2.5 px-2 border border-slate-300 dark:border-slate-700 font-mono text-[11px] text-slate-500">
                        {e.dataDecisao || '-'}
                      </td>

                      {/* Estudo Batismo + Data */}
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'estudoBatismo')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.estudoBatismo ? 'bg-sky-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.estudoBatismo ? '✓' : ''}</span>
                      </td>
                      <td className="py-2.5 px-2 border border-slate-300 dark:border-slate-700 font-mono text-[11px] text-slate-500">
                        {e.dataEstudoBatismo || '-'}
                      </td>

                      {/* Batismo */}
                      <td className="py-2 px-1 border border-slate-300 dark:border-slate-700 cursor-pointer" onClick={() => toggleEvangCheck(e.id, 'batismo')}>
                        <span className={`inline-flex items-center justify-center w-5 h-5 rounded-md text-xs font-bold ${e.batismo ? 'bg-indigo-600 text-white' : 'bg-slate-200 dark:bg-slate-700'}`}>{e.batismo ? '✓' : ''}</span>
                      </td>

                      {/* Ações */}
                      <td className="py-2 px-2 border border-slate-300 dark:border-slate-700">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            onClick={() => setEditingEvang(e)}
                            title="Editar Contato / Datas"
                            className="p-1 rounded-lg text-slate-500 hover:text-teal-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                          >
                            <Edit3 size={15} />
                          </button>
                          <button
                            onClick={() => handleDeleteEvang(e.id)}
                            title="Excluir da Trilha"
                            className="p-1 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                          >
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 3: CARNÊ / FORMULÁRIO "1 REAL POR UM IDEAL" (IMAGEM 3)
          Com QR Code PIX, Chave 68 99239-3910, Dados Caixa e Registro
          ========================================================================= */}
      {activeTab === 'oferta' && (
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          
          {/* Card Carnê Oficial estilo Imagem 3 */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border-2 border-dashed border-slate-300 dark:border-slate-700 p-8 sm:p-10 shadow-2xl space-y-8 relative overflow-hidden">
            
            {/* Cabeçalho do Carnê */}
            <div className="text-center space-y-2 border-b border-slate-200 dark:border-slate-800 pb-6">
              <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white tracking-tight">
                1 REAL POR UM IDEAL
              </h2>
              <p className="text-sm sm:text-base font-semibold text-teal-600 dark:text-teal-400">
                Faça uma grande obra missionária com uma pequena oferta de amor.
              </p>
            </div>

            {/* Sucesso Feedback */}
            {ofertaSucesso && (
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 text-center space-y-2 animate-fadeIn">
                <CheckCircle2 size={36} className="mx-auto text-emerald-600" />
                <h4 className="font-bold text-base">Oferta Registrada com Sucesso!</h4>
                <p className="text-xs">Que Deus multiplique a sementeira do seu coração no Reino.</p>
              </div>
            )}

            <form onSubmit={handleRegistrarOferta} className="space-y-6">
              
              {/* 1. Informações Pessoais */}
              <div className="space-y-4">
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-600 text-white flex items-center justify-center text-xs">1</span>
                  INFORMAÇÕES PESSOAIS
                </h3>

                <div className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                      NOME COMPLETO:
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Digite seu nome completo"
                      value={ofertaNome}
                      onChange={(e) => setOfertaNome(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        CPF / CNPJ:
                      </label>
                      <input
                        type="text"
                        placeholder="000.000.000-00"
                        value={ofertaDoc}
                        onChange={(e) => setOfertaDoc(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                        TELEFONE (DDD) XXXXX-XXXX:
                      </label>
                      <input
                        type="text"
                        placeholder="(68) 99239-3910"
                        value={ofertaTel}
                        onChange={(e) => setOfertaTel(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Valor da Oferta */}
              <div className="space-y-3 pt-2">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400">
                  VALOR DA OFERTA MISSIONÁRIA:
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                  {[1, 10, 30, 50, 100].map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => setOfertaValor(v)}
                      className={`py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold border transition-all ${
                        ofertaValor === v
                          ? 'bg-teal-600 text-white border-teal-600 shadow-md scale-105'
                          : 'bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-teal-500'
                      }`}
                    >
                      R$ {v},00
                    </button>
                  ))}
                </div>
              </div>

              {/* 2. Formas de Pagamento (Conforme Imagem 3) */}
              <div className="space-y-4 pt-2">
                <h3 className="font-heading font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center text-xs font-extrabold">2</span>
                  FORMA DE PAGAMENTO
                </h3>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setOfertaForma('PIX')}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-2 ${
                      ofertaForma === 'PIX'
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-700 dark:text-teal-300 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <QrCode size={20} className="text-teal-600 dark:text-teal-400" />
                    PIX (Chave Celular)
                  </button>

                  <button
                    type="button"
                    onClick={() => setOfertaForma('CAIXA')}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-2 ${
                      ofertaForma === 'CAIXA'
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-700 dark:text-teal-300 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <Building2 size={20} className="text-teal-600 dark:text-teal-400" />
                    POUPANÇA CAIXA
                  </button>

                  <button
                    type="button"
                    onClick={() => setOfertaForma('BOLETO')}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-2 ${
                      ofertaForma === 'BOLETO'
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-700 dark:text-teal-300 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <CreditCard size={20} className="text-teal-600 dark:text-teal-400" />
                    BOLETO
                  </button>

                  <button
                    type="button"
                    onClick={() => setOfertaForma('CARTAO')}
                    className={`p-3.5 rounded-2xl border text-center font-bold text-xs transition-all flex flex-col items-center gap-2 ${
                      ofertaForma === 'CARTAO'
                        ? 'bg-teal-50 dark:bg-teal-950/60 border-teal-500 text-teal-700 dark:text-teal-300 shadow-md'
                        : 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <CreditCard size={20} className="text-teal-600 dark:text-teal-400" />
                    CARTÃO DE DÍZIMO
                  </button>
                </div>

                {/* Bloco Detalhado: PIX */}
                {ofertaForma === 'PIX' && (
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white space-y-6 border border-teal-500/30 dark:border-teal-500/40 shadow-xl">
                    
                    {/* Switch Mode: QR Válido vs Imagem do Carnê */}
                    <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <QrCode size={16} className="text-teal-600 dark:text-teal-400" />
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                          Visualização do QR Code PIX:
                        </span>
                      </div>
                      <div className="flex items-center bg-white dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
                        <button
                          type="button"
                          onClick={() => setPixViewMode('qrValid')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                            pixViewMode === 'qrValid'
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          QR Válido (Apps de Bancos)
                        </button>
                        <button
                          type="button"
                          onClick={() => setPixViewMode('originalImage')}
                          className={`px-3 py-1 rounded-lg text-xs font-bold transition-all flex items-center gap-1 ${
                            pixViewMode === 'originalImage'
                              ? 'bg-teal-600 text-white shadow-sm'
                              : 'text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <ImageIcon size={12} />
                          Carnê Original
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                      
                      {/* QR Code Container */}
                      <div className="p-3.5 bg-white rounded-2xl shadow-xl shrink-0 flex flex-col items-center justify-center border-2 border-amber-400/50">
                        {pixViewMode === 'qrValid' ? (
                          <img
                            src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(currentPixPayload)}`}
                            alt="QR Code PIX Válido"
                            className="w-40 h-40 rounded-lg object-contain"
                          />
                        ) : (
                          <img
                            src="/Imagem/qrcode_pix.png"
                            alt="QR Code Carnê Original"
                            className="w-40 h-40 rounded-lg object-contain"
                          />
                        )}
                        <span className="text-[10px] text-slate-900 font-extrabold mt-2 uppercase tracking-wider">
                          {pixViewMode === 'qrValid' ? 'APONTE A CÂMERA DO BANCO' : 'CARNÊ MISSIONÁRIO'}
                        </span>
                      </div>

                      {/* Chave e Dados */}
                      <div className="space-y-4 text-center md:text-left flex-1">
                        <div>
                          <span className="text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold flex items-center justify-center md:justify-start gap-1.5">
                            <Smartphone size={14} /> CHAVE PIX (TELEFONE / CELULAR):
                          </span>
                          <h4 className="font-mono font-extrabold text-2xl sm:text-3xl text-teal-800 dark:text-white tracking-wide mt-0.5">
                            {CHAVE_PIX_FORMATADA}
                          </h4>
                        </div>

                        <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1 bg-white dark:bg-slate-800/70 p-3 rounded-xl border border-slate-200 dark:border-slate-700">
                          <p>Favorecido: <strong className="text-slate-900 dark:text-white">Pr. Roberto Rodrigues Casas</strong></p>
                          <p>Cidade: <strong className="text-slate-900 dark:text-white">Rio Branco - AC</strong></p>
                          <p>Finalidade: <em className="text-teal-700 dark:text-amber-300">Evangelismo Prático — 1 Real por um Ideal</em></p>
                          {ofertaValor > 0 && (
                            <p>Valor Configurado: <strong className="text-emerald-600 dark:text-emerald-400">R$ {ofertaValor.toFixed(2)}</strong></p>
                          )}
                        </div>

                        {/* Botões de Cópia e Ação */}
                        <div className="flex flex-wrap items-center gap-2 pt-1 justify-center md:justify-start">
                          <button
                            type="button"
                            onClick={() => handleCopyPix('num')}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-md shadow-teal-600/30"
                            title="Copiar número de telefone (68) 99239-3910"
                          >
                            {copiedPix ? <Check size={15} className="text-amber-300" /> : <Copy size={15} />}
                            {copiedPix ? 'Copiado (68) 99239-3910!' : 'Copiar Chave Celular'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyPix('intl')}
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-teal-700 dark:text-teal-300 border border-teal-500/40 font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-sm"
                            title="Copiar com formato internacional +5568992393910"
                          >
                            {copiedPixFormatted ? <Check size={15} className="text-teal-600" /> : <Copy size={15} />}
                            {copiedPixFormatted ? '+55 Copiado!' : 'Copiar +55'}
                          </button>

                          <button
                            type="button"
                            onClick={() => handleCopyPix('payload')}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-amber-300 border border-slate-300 dark:border-amber-400/40 font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-sm"
                            title="Copiar código Pix Copia e Cola completo com CRC-16 para colar no banco"
                          >
                            {copiedPayload ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
                            {copiedPayload ? 'Código Copiado!' : 'Pix Copia e Cola'}
                          </button>

                          <a
                            href={`https://wa.me/5568992393910?text=${encodeURIComponent(`Olá Pastor Roberto Casas, acabei de realizar uma oferta missionária de R$ ${ofertaValor},00 para o projeto 1 Real por um Ideal.`)}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all hover:scale-105 active:scale-95 shadow-md shadow-emerald-600/30"
                          >
                            <MessageCircle size={15} />
                            Enviar Comprovante WhatsApp
                          </a>
                        </div>

                      </div>

                    </div>
                  </div>
                )}

                {/* Bloco Detalhado: CONTA CAIXA */}
                {ofertaForma === 'CAIXA' && (
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white space-y-3 border border-slate-200 dark:border-slate-700 shadow-xl">
                    <h4 className="font-heading font-bold text-teal-800 dark:text-amber-400 text-base">DADOS DA CONTA POUPANÇA CAIXA:</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-mono bg-white dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-white">
                      <div><span className="text-slate-500 dark:text-slate-400 text-xs">AGÊNCIA:</span> <strong>2278</strong></div>
                      <div><span className="text-slate-500 dark:text-slate-400 text-xs">CONTA POUPANÇA:</span> <strong>000798087312-3</strong></div>
                      <div><span className="text-slate-500 dark:text-slate-400 text-xs">BANCO:</span> <strong>104 - Caixa Econômica Federal</strong></div>
                      <div><span className="text-slate-500 dark:text-slate-400 text-xs">TITULAR:</span> <strong>Pr. Roberto Rodrigues Casas</strong></div>
                    </div>
                  </div>
                )}

                {/* Bloco Detalhado: BOLETO / CARTÃO */}
                {(ofertaForma === 'BOLETO' || ofertaForma === 'CARTAO') && (
                  <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white space-y-2 border border-slate-200 dark:border-slate-700 text-center">
                    <h4 className="font-bold text-teal-800 dark:text-amber-400">Cartão de Dízimo / Boleto Bancário</h4>
                    <p className="text-xs text-slate-600 dark:text-slate-300">Entre em contato direto pelo WhatsApp (68) 99239-3910 para emissão do boleto ou link de pagamento seguro.</p>
                  </div>
                )}
              </div>

              {/* Botão Registrar */}
              <button
                type="submit"
                className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-600 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-heading font-bold text-base shadow-xl shadow-teal-500/25 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <Heart size={20} className="fill-white" />
                Confirmar e Registrar Oferta no Relatório
              </button>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          TAB 4: RELATÓRIO FINANCEIRO DE CONTRIBUIÇÕES
          ========================================================================= */}
      {activeTab === 'financeiro' && (
        <div className="space-y-6">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md flex items-center justify-between gap-4">
            <span className="text-xs font-bold uppercase text-teal-600 dark:text-teal-400">
              Extrato Consolidado das Ofertas Missionárias
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={exportToExcel}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                title="Baixar Relatório Financeiro em Excel"
              >
                <FileSpreadsheet size={14} />
                Excel (.xlsx)
              </button>
              <button
                type="button"
                onClick={exportToPDF}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold shadow-sm transition-all hover:scale-105 active:scale-95"
                title="Baixar Relatório Financeiro em PDF"
              >
                <FileText size={14} />
                PDF (.pdf)
              </button>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-300 dark:border-slate-700 shadow-xl overflow-hidden">
            <div className="overflow-auto max-h-[520px]">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="sticky top-0 z-30 shadow-md">
                  <tr className="bg-[#1F3864] text-white font-heading font-bold text-sm">
                    <th colSpan={8} className="py-3 px-6 text-center">
                      RELATÓRIO FINANCEIRO DE CONTRIBUIÇÕES — 1 REAL POR UM IDEAL
                    </th>
                  </tr>
                  <tr className="bg-[#8B7931] text-white font-bold text-xs uppercase tracking-wider">
                    <th className="py-3 px-4">Nº</th>
                    <th className="py-3 px-6">Nome do Contribuinte</th>
                    <th className="py-3 px-4">CPF/CNPJ</th>
                    <th className="py-3 px-4">Telefone</th>
                    <th className="py-3 px-4 text-right">Valor Ofertado</th>
                    <th className="py-3 px-4 text-center">Data</th>
                    <th className="py-3 px-4">Forma</th>
                    <th className="py-3 px-4 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                  {filteredFinances.map((f, idx) => (
                    <tr key={f.id} className={idx % 2 === 0 ? 'bg-slate-50/70 dark:bg-slate-900/50' : 'bg-white dark:bg-slate-900'}>
                      <td className="py-3 px-4 font-mono font-bold text-slate-500">{f.num}</td>
                      <td className="py-3 px-6 font-semibold text-slate-900 dark:text-white">{f.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-400">{f.doc}</td>
                      <td className="py-3 px-4 font-mono text-slate-500">{f.telefone}</td>
                      <td className="py-3 px-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                        R$ {f.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </td>
                      <td className="py-3 px-4 text-center text-slate-500">{f.data}</td>
                      <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">{f.forma}</td>
                      <td className="py-3 px-4 text-center">
                        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                          <CheckCircle2 size={12} /> {f.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE EDIÇÃO: MULTIPLICADOR
          ========================================================================= */}
      {editingMulti && (
        <div
          onClick={() => setEditingMulti(null)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Editar Discípulo #{editingMulti.num}
              </h3>
              <button onClick={() => setEditingMulti(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditMulti} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nome Completo:
                </label>
                <input
                  type="text"
                  required
                  value={editingMulti.name}
                  onChange={(e) => setEditingMulti({ ...editingMulti, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Membro Ativo (M):
                </label>
                <select
                  value={editingMulti.m}
                  onChange={(e) => setEditingMulti({ ...editingMulti, m: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="S">S (Sim)</option>
                  <option value="N">N (Não)</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingMulti(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-md"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* =========================================================================
          MODAL DE EDIÇÃO: TRILHA EVANGELISMO
          ========================================================================= */}
      {editingEvang && (
        <div
          onClick={() => setEditingEvang(null)}
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Editar Contato #{editingEvang.num}
              </h3>
              <button onClick={() => setEditingEvang(null)} className="p-1 text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveEditEvang} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Nome:
                </label>
                <input
                  type="text"
                  required
                  value={editingEvang.name}
                  onChange={(e) => setEditingEvang({ ...editingEvang, name: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Telefone / WhatsApp:
                </label>
                <input
                  type="text"
                  value={editingEvang.telefone}
                  onChange={(e) => setEditingEvang({ ...editingEvang, telefone: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Estudo Dia / Hora:
                </label>
                <input
                  type="text"
                  value={editingEvang.diaHora}
                  onChange={(e) => setEditingEvang({ ...editingEvang, diaHora: e.target.value })}
                  className="w-full px-4 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Data Decisão:
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={editingEvang.dataDecisao}
                    onChange={(e) => setEditingEvang({ ...editingEvang, dataDecisao: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                    Data Batismo:
                  </label>
                  <input
                    type="text"
                    placeholder="DD/MM/AAAA"
                    value={editingEvang.dataBatismo}
                    onChange={(e) => setEditingEvang({ ...editingEvang, dataBatismo: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingEvang(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold shadow-md"
                >
                  Salvar Alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
