import React, { useState, useEffect } from 'react';
import { 
  GraduationCap, BookOpen, User, 
  Send, Award, Sparkles, Headphones, Play, Pause,
  CheckSquare, ChevronLeft, ChevronRight, 
  FileCheck, ShieldCheck
} from 'lucide-react';
import confetti from 'canvas-confetti';
import axios from 'axios';
import { AlunoCursoRegistro, STORAGE_ALUNOS_CURSOS_KEY } from '../../types/cursos';

export interface QuestaoLicao {
  id: string;
  tipo: string;
  texto: string;
}

export interface LicaoCurso {
  id: number;
  titulo: string;
  subtitulo: string;
  versiculos: string[];
  audioFem: string;
  audioMasc: string;
  conteudoEspecial?: string;
  oracao?: string;
  questoes: QuestaoLicao[];
}

interface CursosViewProps {
  onNavigateToCertificado?: (alunoData?: Partial<AlunoCursoRegistro>) => void;
}

export const CursosView: React.FC<CursosViewProps> = ({ onNavigateToCertificado }) => {
  const [cursoAtivo, setCursoAtivo] = useState<'evangelismo' | 'discipulado'>('evangelismo');

  // Dados Cadastrais do Aluno
  const [nome, setNome] = useState('');
  const [igreja, setIgreja] = useState('');
  const [pastor, setPastor] = useState('');
  const [telefone, setTelefone] = useState('');
  const [email, setEmail] = useState('');

  // Respostas Interativas
  const [respostas, setRespostas] = useState<Record<string, any>>({});


  // Áudio Player da Lição
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);
  const [audioVoice, setAudioVoice] = useState<'fem' | 'masc'>('fem');
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioRef, setAudioRef] = useState<HTMLAudioElement | null>(null);

  // Status de envio
  const [enviando, setEnviando] = useState(false);
  const [cursoConcluido, setCursoConcluido] = useState<AlunoCursoRegistro | null>(null);

  // Navegação de lição
  const [activeLessonIndex, setActiveLessonIndex] = useState<number>(0);

  useEffect(() => {
    // Parar áudio ao trocar lição ou curso
    if (audioRef) {
      audioRef.pause();
      setIsPlaying(false);
    }
  }, [cursoAtivo, activeLessonIndex]);

  const handlePlayAudio = (src: string) => {
    if (currentAudio === src && isPlaying && audioRef) {
      audioRef.pause();
      setIsPlaying(false);
      return;
    }

    if (audioRef) {
      audioRef.pause();
    }

    const audio = new Audio(src);
    audio.onended = () => setIsPlaying(false);
    audio.play().then(() => {
      setAudioRef(audio);
      setCurrentAudio(src);
      setIsPlaying(true);
    }).catch(err => {
      console.error('Erro ao reproduzir áudio:', err);
    });
  };

  const handleAnswerChange = (questionId: string, value: any) => {
    setRespostas(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  // Concluir Curso e Salvar
  const handleFinalizarCurso = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nome.trim()) {
      alert('Por favor, informe seu Nome Completo para a emissão do certificado.');
      return;
    }
    if (!igreja.trim()) {
      alert('Por favor, informe o nome da sua Igreja.');
      return;
    }
    if (!pastor.trim()) {
      alert('Por favor, informe o nome do seu Pastor ou Líder.');
      return;
    }

    setEnviando(true);

    const cursoTitulo = cursoAtivo === 'evangelismo'
      ? 'Evangelismo Bíblico - A Certeza da Salvação'
      : 'Curso para Batismo nas Águas & Discipulado Cristão';

    const codigoCert = `EP-${cursoAtivo === 'evangelismo' ? 'SALV' : 'DISC'}-${Date.now().toString(36).toUpperCase()}`;

    const registro: AlunoCursoRegistro = {
      id: `ALUNO-${Date.now()}`,
      alunoNome: nome.trim(),
      igreja: igreja.trim(),
      pastor: pastor.trim(),
      telefone: telefone.trim(),
      email: email.trim(),
      cursoId: cursoAtivo,
      cursoTitulo,
      concluidoEm: new Date().toLocaleDateString('pt-BR'),
      respostas,
      testemunho: respostas['testemunho_agora'] || respostas['d1_q3'] || '',
      certificadoCodigo: codigoCert,
    };

    // 1. Salvar no LocalStorage (offline-first garantido)
    try {
      const saved = localStorage.getItem(STORAGE_ALUNOS_CURSOS_KEY);
      const list: AlunoCursoRegistro[] = saved ? JSON.parse(saved) : [];
      list.unshift(registro);
      localStorage.setItem(STORAGE_ALUNOS_CURSOS_KEY, JSON.stringify(list));
      window.dispatchEvent(new CustomEvent('app-alunos-cursos-updated'));
    } catch (err) {
      console.error('Erro ao salvar localmente:', err);
    }

    // 2. Enviar para Backend Express
    try {
      await axios.post('/api/cursos/respostas', registro);
    } catch (apiErr) {
      console.warn('API backend indisponível temporariamente, salvo localmente:', apiErr);
    }

    setEnviando(false);
    setCursoConcluido(registro);

    // Efeito Festivo de Vitória
    confetti({
      particleCount: 150,
      spread: 80,
      origin: { y: 0.6 }
    });
  };

  // Lições do Curso 1: Evangelismo Bíblico
  const licoesEvangelismo: LicaoCurso[] = [
    {
      id: 1,
      titulo: 'Lição 1: A Salvação Bíblica',
      subtitulo: 'Quem pode decidir se uma pessoa será salva: Deus ou o homem?',
      versiculos: [
        '1 João 5:11 — "E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho."',
        '1 Coríntios 1:18 — "Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus."',
        '1 João 5:12-13 — "Aquele que tem o Filho tem a vida; aquele que não tem o Filho de Deus não tem a vida. Estas coisas vos escrevi, para que saibais que tendes a vida eterna..."',
        'João 5:24 — "Quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida."'
      ],
      audioFem: '/audios/audio_licao_1_fem.mp3',
      audioMasc: '/audios/audio_licao_1_masc.mp3',
      questoes: [
        { id: 'c1_q1', tipo: 'sim_nao', texto: 'Se Deus deu a vida eterna, Ele está falando a verdade?' },
        { id: 'c1_q2', tipo: 'sim_nao', texto: 'Se a vida eterna vem de Deus e Ele decidiu oferecê-la aos pecadores, você acha que existem pessoas dizendo erradamente que ninguém pode ser salvo por Deus?' },
        { id: 'c1_q3', tipo: 'sim_nao', texto: 'Se Deus já deu a vida eterna há mais de 2.000 anos na cruz, você acha que existem pessoas mal informadas que pensam que a salvação só será definida no juízo final?' },
        { id: 'c1_q4', tipo: 'sim_nao', texto: 'Se João estava vivo e as pessoas para quem ele escreveu também estavam vivas, você acha que existem pessoas dizendo que só podemos saber se somos salvos após a morte?' },
        { id: 'c1_q5', tipo: 'texto', texto: 'Se Deus deu a vida eterna, fica claro que é das Suas mãos que a recebemos. Você acha que existem pessoas enganadas pensando que são salvas por religião, boas obras ou por terem sido batizadas crianças? Escreva sua reflexão sincera:' }
      ]
    },
    {
      id: 2,
      titulo: 'Lição 2: O Amor de Deus por Você',
      subtitulo: 'Quem determina o amor de Deus por você: Deus ou você?',
      versiculos: [
        'João 3:16 — "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."',
        'Romanos 5:8 — "Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores."'
      ],
      audioFem: '/audios/audio_licao_2_fem.mp3',
      audioMasc: '/audios/audio_licao_2_masc.mp3',
      questoes: [
        { id: 'c2_q1', tipo: 'sim_nao', texto: 'Se Deus amou o mundo de uma maneira inexplicável e você está no mundo que Ele ama, você acha que existem pessoas pensando erroneamente que Deus não as ama?' },
        { id: 'c2_q2', tipo: 'sim_nao', texto: 'Se Deus ama você e enviou Jesus para que você não pereça, você acha que pessoas estão morrendo sem salvação por não acreditarem no amor de Deus apesar de seus pecados?' },
        { id: 'c2_q3', tipo: 'sim_nao', texto: 'Se a Bíblia afirma que Deus quer que você tenha a vida eterna mesmo sendo pecador, você acha que existem pessoas que dizem: "Eu não mereço a salvação"?' }
      ]
    },
    {
      id: 3,
      titulo: 'Lição 3: A Condição do Homem Pecador',
      subtitulo: 'Quem define o pecado: a opinião humana ou Deus?',
      versiculos: [
        'Romanos 3:23 — "Porque todos pecaram e destituídos estão da glória de Deus."'
      ],
      audioFem: '/audios/audio_licao_3_fem.mp3',
      audioMasc: '/audios/audio_licao_3_masc.mp3',
      questoes: [
        { id: 'c3_q1', tipo: 'sim_nao', texto: 'A Bíblia afirma com clareza que todos nós pecamos e que por nós mesmos estamos separados da glória de Deus?' },
        { id: 'c3_q2', tipo: 'sim_nao', texto: 'Você acha que existem pessoas dizendo que não cometeram um pecado tão grave e, por isso, não precisam de salvação?' }
      ]
    },
    {
      id: 4,
      titulo: 'Lição 4: A Morte Eterna & As Três Separações',
      subtitulo: 'Morte na Bíblia significa separação: Espiritual, Física e Eterna',
      versiculos: [
        'Romanos 6:23 — "Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus nosso Senhor."',
        'Gênesis 5:5 — "E foram todos os dias que Adão viveu, novecentos e trinta anos, e morreu."',
        'Lucas 16:22-26 — "E no inferno, o rico ergueu os olhos, estando em tormentos, e viu ao longe Abraão, e Lázaro no seu seio... está posto um grande abismo entre nós e vós..."'
      ],
      audioFem: '/audios/audio_licao_4_fem.mp3',
      audioMasc: '/audios/audio_licao_4_masc.mp3',
      conteudoEspecial: `1ª Etapa - Morte Espiritual: Adão não caiu morto fisicamente ao pecar; o relacionamento e comunhão com Deus foram rompidos. Todos os pecadores nascem espiritualmente mortos.\n\n2ª Etapa - Morte Física: O corpo cessa a vida, vai para o cemitério e a comunhão física terrena é interrompida.\n\n3ª Etapa - Morte Eterna: A separação definitiva no inferno. Em Lucas 16, o rico percebeu que após a morte existe um abismo intransponível. Por isso, a decisão da salvação deve ser tomada hoje, em vida!`,
      questoes: [
        { id: 'c4_q1', tipo: 'sim_nao', texto: 'Você entendeu com clareza o que é morte espiritual (separação da comunhão com Deus logo após o pecado)?' },
        { id: 'c4_q2', tipo: 'sim_nao', texto: 'Se Jesus mostra que quem morre salvo vai direto para o lugar dos salvos, você acha que existem pessoas que pensam erroneamente que precisam aguardar o juízo final para saber se serão salvas?' },
        { id: 'c4_q3', tipo: 'sim_nao', texto: 'Você já falou para os seus familiares e pessoas próximas sobre a realidade do inferno e da salvação eterna?' }
      ]
    },
    {
      id: 5,
      titulo: 'Lição 5: A Solução de Deus para a Salvação',
      subtitulo: 'As 3 Ilustrações Chave: A Doença, A Camisa Comprada e o Cordeiro da Páscoa',
      versiculos: [
        'Romanos 5:8 — "Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores."',
        '1 Coríntios 5:7 — "Porque Cristo, nossa páscoa, foi sacrificado por nós."'
      ],
      audioFem: '/audios/audio_licao_5_fem.mp3',
      audioMasc: '/audios/audio_licao_5_masc.mp3',
      conteudoEspecial: `• 1ª Ilustração (A Doença): O perdão restaura a alma, mas morte só se paga com morte! O corpo de Cristo morreu na cruz para pagar a nossa pena; o sangue de Cristo foi derramado para perdoar os nossos pecados.\n\n• 2ª Ilustração (A Camisa): A camisa pertence a você porque foi paga na loja uma única vez, e não porque é lavada todos os dias. Da mesma forma, Jesus pagou nossa pena uma vez para sempre, e nos purifica continuamente com Seu sangue.\n\n• 3ª Ilustração (O Cordeiro da Páscoa): O primogênito no Egito foi salvo pela morte do cordeiro em seu lugar, e o sangue nos umbrais garantia a proteção do anjo da morte. Jesus é a nossa Páscoa definitiva!`,
      questoes: [
        { id: 'c5_q1', tipo: 'sim_nao', texto: 'Você consegue ver a diferença bíblica entre pecado (perdoado pelo sangue) e pena de morte (paga pelo corpo de Jesus na cruz)?' },
        { id: 'c5_q2', tipo: 'sim_nao', texto: 'Você compreendeu a ilustração da camisa comprada uma vez e lavada muitas vezes em relação ao sacrifício de Cristo?' },
        { id: 'c5_q3', tipo: 'sim_nao', texto: 'Você compreendeu o papel do Cordeiro da Páscoa que morreu no lugar do primogênito?' }
      ]
    },
    {
      id: 6,
      titulo: 'Lição 6: Como Receber a Salvação Bíblica',
      subtitulo: 'A confissão de fé com a boca e a crença com o coração',
      versiculos: [
        'Romanos 10:9-10 — "Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo."',
        'João 1:12 — "Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome."'
      ],
      audioFem: '/audios/audio_licao_6_fem.mp3',
      audioMasc: '/audios/audio_licao_6_masc.mp3',
      oracao: `"Senhor Deus, eu sei que o Senhor me ama, mas tenho consciência de que já pequei e que estava condenado à morte eterna. Reconheço que o Senhor enviou Jesus para me salvar. Por isso, reconheço que Jesus é o Teu Filho bendito, que morreu na cruz em meu lugar.\n\nPela fé, entrego a Ti a minha vida e reconheço que Jesus tomou sobre Si a minha pena. Quando morreu na cruz, pagou a minha dívida; quando derramou Seu sangue, providenciou o perdão dos meus pecados.\n\nRecebo Jesus como meu Salvador e recebo o Espírito Santo como o selo da minha salvação eterna. Amém!"`,
      questoes: [
        { id: 'c6_q1', tipo: 'sim_nao', texto: 'Você concorda que no momento em que a pessoa crê no coração e confessa Jesus com a boca, ela passa da morte para a vida?' },
        { id: 'c6_q2', tipo: 'sim_nao', texto: 'Você fez essa oração de confissão de coração sincero e crê que Jesus te salvou?' }
      ]
    },
    {
      id: 7,
      titulo: 'Lição 7: A Avaliação da Salvação Bíblica',
      subtitulo: 'Examinando a própria fé e estruturando o seu testemunho bíblico',
      versiculos: [
        'Atos 19:2 — "Recebestes vós o Espírito Santo quando crestes?"',
        'Atos 18:24-28 — "Áquila e Priscila declararam a Apolo mais precisamente o caminho de Deus."',
        'Mateus 7:21-22 — "Nem todo o que me diz: Senhor, Senhor! entrará no reino dos céus, mas aquele que faz a vontade de meu Pai..."'
      ],
      audioFem: '/audios/audio_licao_7_fem.mp3',
      audioMasc: '/audios/audio_licao_7_masc.mp3',
      questoes: [
        { id: 'c7_q1', tipo: 'sim_nao', texto: 'Se você morresse agora, você tem plena e absoluta certeza da sua salvação?' },
        { id: 'c7_q2', tipo: 'sim_nao', texto: 'Alguém já avaliou biblicamente a sua compreensão sobre a salvação?' },
        { id: 'c7_testemunho', tipo: 'testemunho_4p', texto: 'Escreva o seu Testemunho de Salvação em 4 partes fundamentais:' }
      ]
    },
    {
      id: 8,
      titulo: 'Lição 8: O Privilégio de Compartilhar a Salvação',
      subtitulo: 'Quem recebeu graça, compartilha graça! O Ide de Jesus',
      versiculos: [
        'Isaías 52:7 — "Quão formosos sobre os montes são os pés dos que anunciam as boas-novas, dos que anunciam a salvação!"',
        '2 Timóteo 2:2 — "O que de minha parte ouviste... ensina a homens fiéis que sejam idôneos para também ensinarem a outros."',
        'Mateus 28:19-20 — "Ide, portanto, fazei discípulos de todas as nações..."',
        'Lucas 15:7 — "Haverá mais júbilo no céu por um pecador que se arrepende do que por noventa e nove justos..."'
      ],
      audioFem: '/audios/audio_licao_8_fem.mp3',
      audioMasc: '/audios/audio_licao_8_masc.mp3',
      questoes: [
        { id: 'c8_q1', tipo: 'sim_nao', texto: 'Se aquele que te salvou do inferno disse para levar de graça o que recebeu de graça, você decide dedicar do seu tempo para levar outras pessoas ao Reino dos Céus?' },
        { id: 'c8_q2', tipo: 'sim_nao', texto: 'Você deseja fazer "festas no céu" evangelizando almas para Cristo?' },
        { id: 'c8_q3', tipo: 'sim_nao', texto: 'Se Cristo deu a vida por você na cruz, você decide entregar a Ele o melhor do seu coração e do seu serviço na terra?' }
      ]
    }
  ];

  // Lições do Curso 2: Batismo & Discipulado
  const licoesDiscipulado: LicaoCurso[] = [
    {
      id: 1,
      titulo: 'Lição 1: Como se Tornar um Crente em Cristo',
      subtitulo: 'Os 4 Pilares: Todos pecaram, o pecado traz a morte, Cristo morreu por nós, Salvo por Cristo',
      versiculos: [
        'Romanos 3:23 — "Porque todos pecaram e destituídos estão da glória de Deus."',
        'Romanos 6:23 — "O salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus."',
        'Romanos 5:8 — "Mas Deus prova o seu amor em que Cristo morreu por nós, sendo nós ainda pecadores."',
        'Romanos 10:13 — "Porque qualquer que invocar o nome do Senhor será salvo."'
      ],
      audioFem: '/audios/discipulado_1_fem.mp3',
      audioMasc: '/audios/discipulado_1_masc.mp3',
      questoes: [
        { id: 'd1_q1', tipo: 'sim_nao', texto: 'Você compreendeu que boas obras, religião ou esforço humano não podem salvar, e que somente Cristo pode salvar?' },
        { id: 'd1_q2', tipo: 'sim_nao', texto: 'Você já invocou sinceramente o nome do Senhor Jesus pedindo perdão e salvação para a sua vida?' },
        { id: 'd1_q3', tipo: 'texto', texto: 'Descreva como foi a sua experiência pessoal ao receber Jesus Cristo como seu Salvador pessoal:' }
      ]
    },
    {
      id: 2,
      titulo: 'Lição 2: Os 8 Desejos de Jesus para Você',
      subtitulo: 'Vida abundante e crescimento contínuo no discipulado (João 10:10)',
      versiculos: [
        '1. Certeza da Salvação (Decorar Romanos 10:13 e João 5:24)',
        '2. O Santo Batismo (Decorar Mateus 28:19)',
        '3. Leitura Bíblica Diária (Decorar 2 Timóteo 3:16-17 e Salmos 119:105)',
        '4. Oração Diária (Decorar Filipenses 4:6-7 e João 16:24)',
        '5. Testemunha Fiel (Decorar Marcos 5:19 e Atos 1:8)',
        '6. Contribuir com Alegria (Decorar 2 Coríntios 9:7 e Malaquias 3:10)',
        '7. Ser Cheio do Espírito Santo (Decorar Efésios 5:18 e Gálatas 5:22-23)',
        '8. Frequentar a Igreja Local (Decorar Hebreus 10:24-25)'
      ],
      audioFem: '/audios/discipulado_2_fem.mp3',
      audioMasc: '/audios/discipulado_2_masc.mp3',
      questoes: [
        { id: 'd2_q1', tipo: 'sim_nao', texto: 'Você deseja obedecer ao mandamento de Jesus e dar o testemunho público do Santo Batismo nas águas?' },
        { id: 'd2_q2', tipo: 'sim_nao', texto: 'Você assume o compromisso de reservar um tempo diário para leitura da Bíblia e oração?' },
        { id: 'd2_q3', tipo: 'sim_nao', texto: 'Você está disposto a ser membro ativo, fiel e frutífero na sua igreja local?' }
      ]
    },
    {
      id: 3,
      titulo: 'Lição 3: Questionários Bíblicos de Segurança & Batismo',
      subtitulo: 'Aprofundamento nas Escrituras sobre Salvação e a Ordenança Batismal',
      versiculos: [
        'Atos 16:31 — "Crê no Senhor Jesus Cristo e serás salvo, tu e a tua casa."',
        'João 10:27-29 — "As minhas ovelhas ouvem a minha voz... e ninguém as arrebatará da minha mão."',
        'Mateus 3:13-17 — "O batismo de Jesus por João Batista no Rio Jordão."',
        'Atos 8:36-38 — "O batismo imediato do eunuco etíope após crer de todo coração."'
      ],
      audioFem: '/audios/discipulado_3_fem.mp3',
      audioMasc: '/audios/discipulado_3_masc.mp3',
      questoes: [
        { id: 'd3_q1', tipo: 'texto', texto: 'O que é necessário fazer para ser salvo segundo Atos 16:31 e Romanos 10:13?' },
        { id: 'd3_q2', tipo: 'texto', texto: 'O que qualifica alguém para o batismo e quando as pessoas eram batizadas segundo Atos 2:41 e Atos 8:36-38?' },
        { id: 'd3_q3', tipo: 'sim_nao', texto: 'Você compreendeu que o batismo não salva, mas é o testemunho público e primeiro passo de obediência de quem já foi salvo?' }
      ]
    },
    {
      id: 4,
      titulo: 'Lição 4: A Palavra de Deus e a Vida de Oração',
      subtitulo: 'O alimento espiritual diário e a comunhão íntima com o Pai',
      versiculos: [
        'Salmo 119:105 — "Lâmpada para os meus pés é tua palavra, e luz para o meu caminho."',
        '2 Timóteo 3:16-17 — "Toda a Escritura é divinamente inspirada..."',
        'Jeremias 33:3 — "Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes."',
        'Mateus 6:6 — "Tu, porém, quando orares, entra no teu quarto e, fechada a porta, ora a teu Pai..."'
      ],
      audioFem: '/audios/discipulado_4_fem.mp3',
      audioMasc: '/audios/discipulado_4_masc.mp3',
      questoes: [
        { id: 'd4_q1', tipo: 'texto', texto: 'Em que a Bíblia é diferente de todos os outros livros da humanidade segundo 2 Pedro 1:20-21?' },
        { id: 'd4_q2', tipo: 'texto', texto: 'Por que devemos sempre orar em nome do Senhor Jesus Cristo (João 14:6 e 1 Timóteo 2:5)?' }
      ]
    },
    {
      id: 5,
      titulo: 'Lição 5: Testemunho, Fruto do Espírito & A Igreja Local',
      subtitulo: 'Os 9 Frutos de Gálatas 5:22-23 e o Corpo de Cristo',
      versiculos: [
        'Atos 1:8 — "Mas recebereis poder ao descer sobre vós o Espírito Santo, e ser-me-eis testemunhas..."',
        'Gálatas 5:22-23 — "Mas o fruto do Espírito é: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão, domínio próprio."',
        'Hebreus 10:25 — "Não deixando a nossa congregação, como é costume de alguns..."',
        '1 Coríntios 12:27 — "Ora, vós sois o corpo de Cristo, e seus membros em particular."'
      ],
      audioFem: '/audios/discipulado_5_fem.mp3',
      audioMasc: '/audios/discipulado_5_masc.mp3',
      questoes: [
        { id: 'd5_q1', tipo: 'texto', texto: 'Cite os nove aspectos do Fruto do Espírito descritos em Gálatas 5:22-23 que o Espírito Santo quer produzir em você:' },
        { id: 'd5_q2', tipo: 'texto', texto: 'Qual preço o Senhor Jesus pagou pela Sua Igreja segundo Atos 20:28?' },
        { id: 'd5_q3', tipo: 'sim_nao', texto: 'Você reconhece a importância vital de participar fielmente dos cultos e da Escola Bíblica da sua igreja?' }
      ]
    },
    {
      id: 6,
      titulo: 'Lição 6: Vale a Pena Plantar & Entrada na Igreja',
      subtitulo: 'As 3 formas de se tornar membro da Igreja e a semeadura de fé',
      versiculos: [
        'Marcos 4:26-29 — "O reino de Deus é assim como se um homem lançasse semente à terra... e a semente brotasse e crescesse... Vale a pena plantar!"'
      ],
      audioFem: '/audios/discipulado_6_fem.mp3',
      audioMasc: '/audios/discipulado_6_masc.mp3',
      conteudoEspecial: `Modos de união à Igreja Local:\n1. Pela profissão de fé e santo batismo.\n2. Por transferência através de carta de recomendação.\n3. Por declaração de fé.\n\nVale a pena plantar! A semente da Palavra de Deus lançada nos corações produz frutos eternos.`,
      questoes: [
        { id: 'd6_q1', tipo: 'sim_nao', texto: 'Você crê que a semente da Palavra de Deus plantada por você e pela sua igreja produzirá frutos eternos?' },
        { id: 'd6_q2', tipo: 'texto', texto: 'Qual é o seu compromisso missionário e ministerial para a expansão do Reino de Deus a partir de hoje?' }
      ]
    }
  ];

  const currentLessons = cursoAtivo === 'evangelismo' ? licoesEvangelismo : licoesDiscipulado;
  const currentLesson = currentLessons[activeLessonIndex] || currentLessons[0];

  // Percentual de progresso
  const totalPerguntas = currentLessons.reduce((acc, l) => acc + l.questoes.length, 0);
  const perguntasRespondidas = Object.keys(respostas).filter(k => respostas[k] !== undefined && respostas[k] !== '').length;
  const progressoPercent = Math.min(100, Math.round((perguntasRespondidas / Math.max(1, totalPerguntas)) * 100));

  return (
    <div className="space-y-8 animate-fadeIn pb-16">
      
      {/* Top Banner de Apresentação */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 text-slate-900 dark:text-white shadow-sm relative overflow-hidden border border-slate-200 dark:border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap size={16} />
            Centro de Capacitação Bíblica
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-black tracking-tight text-slate-900 dark:text-white mb-3">
            Fazer Cursos: Evangelismo & Discipulado
          </h1>
          <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
            Estude as lições bíblicas completas, ouça a narração em áudio profissional com voz feminina e masculina, responda às reflexões no seu ritmo e receba seu <strong className="text-teal-600 dark:text-teal-400">Certificado Oficial de Conclusão com o Selo do App</strong>!
          </p>
        </div>

        {/* Seletor de Curso */}
        <div className="mt-8 flex flex-wrap gap-3 relative z-10">
          <button
            type="button"
            onClick={() => { setCursoAtivo('evangelismo'); setActiveLessonIndex(0); }}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center gap-2.5 ${
              cursoAtivo === 'evangelismo'
                ? 'bg-teal-600 text-white shadow-lg shadow-teal-600/30 scale-105'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <BookOpen size={18} />
            1. Evangelismo: A Certeza da Salvação (8 Lições)
          </button>

          <button
            type="button"
            onClick={() => { setCursoAtivo('discipulado'); setActiveLessonIndex(0); }}
            className={`px-6 py-3.5 rounded-2xl font-bold text-sm transition-all duration-200 flex items-center gap-2.5 ${
              cursoAtivo === 'discipulado'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 scale-105'
                : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            <ShieldCheck size={18} />
            2. Curso para Batismo & Discipulado (6 Lições)
          </button>
        </div>
      </div>

      {/* Modal / Card de Conclusão e Certificado */}
      {cursoConcluido && (
        <div className="bg-gradient-to-r from-emerald-500/10 via-teal-500/10 to-emerald-500/10 border-2 border-emerald-500/40 rounded-3xl p-6 sm:p-8 text-center space-y-4 animate-bounce-short">
          <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
            <Sparkles size={32} />
          </div>
          <h2 className="text-2xl font-heading font-black text-emerald-800 dark:text-emerald-300">
            Parabéns, {cursoConcluido.alunoNome}! Curso Concluído com Sucesso!
          </h2>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto text-sm">
            Suas respostas foram registradas no sistema da igreja e o seu resultado já está disponível nos relatórios pastorais.
          </p>
          <div className="inline-block bg-white dark:bg-slate-900 px-4 py-2 rounded-xl text-xs font-mono text-slate-500 border border-slate-200 dark:border-slate-800">
            Código do Certificado: <strong>{cursoConcluido.certificadoCodigo}</strong>
          </div>
          <div className="pt-2 flex justify-center gap-4">
            <button
              type="button"
              onClick={() => {
                if (onNavigateToCertificado) {
                  onNavigateToCertificado(cursoConcluido);
                } else {
                  alert('Acesse a aba "Certificados" no menu lateral para visualizar e imprimir!');
                }
              }}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-bold py-3 px-8 rounded-2xl shadow-lg shadow-emerald-600/30 hover:scale-105 transition-all flex items-center gap-2"
            >
              <Award size={20} />
              Ver e Baixar Meu Certificado Oficial
            </button>
          </div>
        </div>
      )}

      {/* Form Cadastro do Aluno (Fixo e Visível) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 dark:border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
              <User size={20} />
            </div>
            <div>
              <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
                Identificação do Aluno Concluinte
              </h3>
              <p className="text-xs text-slate-500">
                Esses dados serão impressos no seu Certificado de Conclusão e enviados aos Relatórios da Igreja.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="text-xs text-slate-400 block font-medium">Progresso de Respostas</span>
            <span className="font-heading font-black text-lg text-teal-600 dark:text-teal-400">
              {progressoPercent}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Nome Completo do Aluno *
            </label>
            <input
              type="text"
              required
              value={nome}
              onChange={e => setNome(e.target.value)}
              placeholder="Ex: João da Silva Santos"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Nome da sua Igreja *
            </label>
            <input
              type="text"
              required
              value={igreja}
              onChange={e => setIgreja(e.target.value)}
              placeholder="Ex: Primeira Igreja Batista"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              Nome do seu Pastor / Líder *
            </label>
            <input
              type="text"
              required
              value={pastor}
              onChange={e => setPastor(e.target.value)}
              placeholder="Ex: Pr. Roberto Casas"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              WhatsApp / Celular (Opcional)
            </label>
            <input
              type="tel"
              value={telefone}
              onChange={e => setTelefone(e.target.value)}
              placeholder="(00) 00000-0000"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
              E-mail (Opcional)
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Navegador de Lições (Tabs / Pill buttons) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {currentLessons.map((lesson, idx) => {
          const isActive = idx === activeLessonIndex;
          return (
            <button
              key={lesson.id}
              onClick={() => setActiveLessonIndex(idx)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all duration-200 flex items-center gap-2 ${
                isActive
                  ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 shadow-md scale-105'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px]">
                {idx + 1}
              </span>
              {lesson.titulo.split(':')[0]}
            </button>
          );
        })}
      </div>

      {/* Card da Lição Atual com Estudo, Áudio e Perguntas */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 shadow-lg border border-slate-200 dark:border-slate-800 space-y-8">
        
        {/* Cabeçalho da Lição */}
        <div className="space-y-3 border-b border-slate-100 dark:border-slate-800 pb-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="px-3.5 py-1.5 rounded-full bg-teal-500/10 text-teal-600 dark:text-teal-400 font-bold text-xs">
              Módulo {activeLessonIndex + 1} de {currentLessons.length}
            </span>

            {/* Controle de Áudio Voz Feminina / Masculina com Pronúncia Perfeita */}
            <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl">
              <span className="text-xs text-slate-500 font-medium pl-2 flex items-center gap-1">
                <Headphones size={14} /> Áudio:
              </span>
              <button
                type="button"
                onClick={() => setAudioVoice('fem')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  audioVoice === 'fem'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-teal-600'
                }`}
              >
                Feminina
              </button>
              <button
                type="button"
                onClick={() => setAudioVoice('masc')}
                className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                  audioVoice === 'masc'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-indigo-600'
                }`}
              >
                Masculina
              </button>

              <button
                type="button"
                onClick={() => {
                  const src = audioVoice === 'fem' ? currentLesson.audioFem : currentLesson.audioMasc;
                  handlePlayAudio(src);
                }}
                className="ml-1 w-8 h-8 rounded-xl bg-teal-500 hover:bg-teal-600 text-white flex items-center justify-center transition-transform hover:scale-105"
                title={isPlaying ? 'Pausar áudio' : 'Ouvir narração da lição'}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
              </button>
            </div>
          </div>

          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-slate-900 dark:text-white">
            {currentLesson.titulo}
          </h2>
          <p className="text-slate-600 dark:text-slate-300 text-sm font-medium">
            {currentLesson.subtitulo}
          </p>
        </div>

        {/* Textos Bíblicos da Lição */}
        <div className="space-y-3">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Fundamento Bíblico da Lição
          </h4>
          <div className="grid grid-cols-1 gap-3">
            {currentLesson.versiculos.map((v, i) => (
              <div key={i} className="p-4 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200/60 dark:border-teal-900/40 text-sm text-teal-950 dark:text-teal-200 italic font-serif leading-relaxed">
                {v}
              </div>
            ))}
          </div>
        </div>

        {/* Conteúdo Especial / Ilustrações teológicas */}
        {currentLesson.conteudoEspecial && (
          <div className="p-5 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-slate-800 dark:text-amber-100 text-sm leading-relaxed whitespace-pre-line">
            <div className="font-bold text-amber-700 dark:text-amber-300 text-xs uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <Sparkles size={14} /> Ilustrações & Explicações Centrais
            </div>
            {currentLesson.conteudoEspecial}
          </div>
        )}

        {/* Oração de Confissão Especial */}
        {currentLesson.oracao && (
          <div className="p-6 rounded-2xl bg-teal-50/80 dark:bg-slate-800/80 text-slate-900 dark:text-white shadow-sm border border-teal-200 dark:border-slate-700 space-y-3">
            <h4 className="font-heading font-bold text-teal-700 dark:text-teal-300 text-sm uppercase tracking-wider flex items-center gap-2">
              <FileCheck size={18} /> Oração de Confissão da Salvação
            </h4>
            <p className="text-sm italic text-slate-700 dark:text-slate-200 leading-relaxed whitespace-pre-line">
              {currentLesson.oracao}
            </p>
          </div>
        )}

        {/* Bloco de Perguntas e Respostas do Aluno */}
        <div className="space-y-6 pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <CheckSquare size={20} className="text-teal-600 dark:text-teal-400" />
            <h3 className="font-heading font-bold text-lg text-slate-900 dark:text-white">
              Responda às Perguntas desta Lição
            </h3>
          </div>

          <div className="space-y-6">
            {currentLesson.questoes.map((q, qIndex) => {
              const valorAtual = respostas[q.id];

              return (
                <div key={q.id} className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/70 dark:border-slate-800 space-y-3">
                  <p className="font-medium text-sm text-slate-800 dark:text-slate-200">
                    <span className="font-bold text-teal-600 dark:text-teal-400 mr-2">
                      {qIndex + 1}.
                    </span>
                    {q.texto}
                  </p>

                  {/* Resposta Sim / Não */}
                  {q.tipo === 'sim_nao' && (
                    <div className="flex items-center gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => handleAnswerChange(q.id, 'SIM')}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          valorAtual === 'SIM'
                            ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-105'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        SIM (S)
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAnswerChange(q.id, 'NÃO')}
                        className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                          valorAtual === 'NÃO'
                            ? 'bg-rose-600 text-white shadow-md shadow-rose-600/20 scale-105'
                            : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 border border-slate-200 dark:border-slate-600'
                        }`}
                      >
                        NÃO (N)
                      </button>
                    </div>
                  )}

                  {/* Resposta Dissertativa / Opinião */}
                  {q.tipo === 'texto' && (
                    <textarea
                      rows={3}
                      value={valorAtual || ''}
                      onChange={e => handleAnswerChange(q.id, e.target.value)}
                      placeholder="Escreva sua resposta e reflexão sincera aqui..."
                      className="w-full px-4 py-3 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500"
                    />
                  )}

                  {/* Testemunho em 4 Pontos */}
                  {q.tipo === 'testemunho_4p' && (
                    <div className="space-y-3 pt-2">
                      <div>
                        <span className="text-xs font-semibold text-slate-500 block mb-1">
                          1. Como era a sua vida antes de aceitar a Cristo?
                        </span>
                        <input
                          type="text"
                          value={respostas['testemunho_antes'] || ''}
                          onChange={e => handleAnswerChange('testemunho_antes', e.target.value)}
                          placeholder="Ex: Vazia, sem paz, longe dos caminhos do Senhor..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-500 block mb-1">
                          2. O que despertou você para a salvação?
                        </span>
                        <input
                          type="text"
                          value={respostas['testemunho_despertar'] || ''}
                          onChange={e => handleAnswerChange('testemunho_despertar', e.target.value)}
                          placeholder="Ex: Ouvir a pregação da cruz, o amor de Cristo..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-500 block mb-1">
                          3. Qual foi a sua decisão pessoal de fé?
                        </span>
                        <input
                          type="text"
                          value={respostas['testemunho_decisao'] || ''}
                          onChange={e => handleAnswerChange('testemunho_decisao', e.target.value)}
                          placeholder="Ex: Entreguei minha vida e confessei a Jesus como Senhor..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                        />
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-slate-500 block mb-1">
                          4. Como é a sua vida agora em Cristo?
                        </span>
                        <input
                          type="text"
                          value={respostas['testemunho_agora'] || ''}
                          onChange={e => handleAnswerChange('testemunho_agora', e.target.value)}
                          placeholder="Ex: Plena certeza da vida eterna, paz e alegria no Espírito..."
                          className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm"
                        />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Botões de Navegação Anterior / Próxima / Finalizar */}
        <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-100 dark:border-slate-800">
          <button
            type="button"
            disabled={activeLessonIndex === 0}
            onClick={() => setActiveLessonIndex(prev => Math.max(0, prev - 1))}
            className="px-5 py-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm disabled:opacity-40 flex items-center gap-2 hover:bg-slate-200 transition-colors"
          >
            <ChevronLeft size={18} /> Lição Anterior
          </button>

          {activeLessonIndex < currentLessons.length - 1 ? (
            <button
              type="button"
              onClick={() => setActiveLessonIndex(prev => prev + 1)}
              className="px-6 py-3 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm shadow-md shadow-teal-600/20 hover:scale-105 transition-all flex items-center gap-2"
            >
              Próxima Lição <ChevronRight size={18} />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleFinalizarCurso}
              disabled={enviando}
              className="px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-black text-sm shadow-xl shadow-emerald-600/30 hover:scale-105 transition-all flex items-center gap-2.5"
            >
              <Send size={18} />
              {enviando ? 'Enviando Respostas...' : 'Finalizar Curso & Emitir Certificado'}
            </button>
          )}
        </div>

      </div>

    </div>
  );
};
