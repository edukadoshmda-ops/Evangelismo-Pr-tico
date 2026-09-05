import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  RotateCcw, Copy, Check, Heart, 
  CheckCircle2, ArrowRight, Bookmark, Play, Pause,
  Headphones, Download, Award, Flame, HelpCircle, Sparkles, CheckSquare
} from 'lucide-react';
import { downloadAudioFile } from '../../utils/audioDownloader';

// --- DEFINIÇÃO DE INTERFACES ---
interface PageLesson {
  id: number;
  roman: string;
  title: string;
  badge: string;
  summary: string;
  audioFem: string;
  audioMasc: string;
  duration: string;
  verses: { text: string; reference: string }[];
  explanation: string[];
  prayer?: string;
  question?: string;
  questionsAndAnswers?: { question: string; ref: string; answer: string }[];
  personalApplications?: string[];
  color: string;
}

// 1. PLAYBOOK: AS 8 RESPOSTAS BÍBLICAS (A CERTEZA DA SALVAÇÃO)
const LESSONS_SALVACAO: PageLesson[] = [
  {
    id: 1,
    roman: 'I',
    title: 'PRIMEIRA RESPOSTA',
    badge: 'A Certeza da Vida Eterna',
    summary: 'A Bíblia mostra com clareza que podemos ter certeza absoluta da salvação em Jesus Cristo.',
    audioFem: '/audios/audio_licao_1_fem.mp3',
    audioMasc: '/audios/audio_licao_1_masc.mp3',
    duration: '00:35',
    verses: [
      {
        text: '“E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho.”',
        reference: 'I João 5.11'
      },
      {
        text: '“Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus.”',
        reference: 'I Coríntios 1.18'
      }
    ],
    explanation: [
      'Deus deu a vida eterna, e ela está em Jesus Cristo.',
      'Ela não é conquistada por religião, boas obras ou méritos humanos, mas recebida pela fé viva em Cristo.',
      'A vida eterna é uma dádiva já consumada pelo amor de Deus para ser recebida hoje.'
    ],
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 2,
    roman: 'II',
    title: 'SEGUNDA RESPOSTA',
    badge: 'O Amor Incondicional de Deus',
    summary: 'Deus ama você profundamente e deseja lhe conceder a vida eterna.',
    audioFem: '/audios/audio_licao_2_fem.mp3',
    audioMasc: '/audios/audio_licao_2_masc.mp3',
    duration: '00:27',
    verses: [
      {
        text: '“Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.”',
        reference: 'João 3.16'
      }
    ],
    explanation: [
      'O amor de Deus tomou a iniciativa antes mesmo de qualquer atitude nossa.',
      'O Criador ofereceu o Seu bem mais precioso — o Seu próprio Filho — para nos resgatar.',
      'A promessa é universal e infalível: todo aquele que crê tem a vida eterna garantida.'
    ],
    color: 'from-rose-500 to-rose-700'
  },
  {
    id: 3,
    roman: 'III',
    title: 'TERCEIRA RESPOSTA',
    badge: 'A Condição do Homem Pecador',
    summary: 'Todos nós somos pecadores e o pecado nos separa da presença santa de Deus.',
    audioFem: '/audios/audio_licao_3_fem.mp3',
    audioMasc: '/audios/audio_licao_3_masc.mp3',
    duration: '00:21',
    verses: [
      {
        text: '“Porque todos pecaram e estão separados da presença de Deus.”',
        reference: 'Romanos 3.23'
      }
    ],
    explanation: [
      'O pecado não é apenas uma infração moral, mas errar o alvo da santidade de Deus.',
      'Nenhum ser humano pode justificar a si mesmo diante de um Deus perfeito.',
      'Reconhecer que precisamos de salvação é o primeiro passo para a reconciliação com o Pai.'
    ],
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 4,
    roman: 'IV',
    title: 'QUARTA RESPOSTA',
    badge: 'A Consequência do Pecado & A Eternidade',
    summary: 'O salário do pecado é a morte espiritual, mas o dom gratuito de Deus é a vida eterna.',
    audioFem: '/audios/audio_licao_4_fem.mp3',
    audioMasc: '/audios/audio_licao_4_masc.mp3',
    duration: '00:28',
    verses: [
      {
        text: '“Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus, nosso Senhor.”',
        reference: 'Romanos 6.23'
      }
    ],
    explanation: [
      'Existe uma penalidade eterna para o pecado da qual não podemos escapar por nós mesmos.',
      'A salvação não é uma recompensa comprada, mas um presente gratuito oferecido por Deus.'
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 5,
    roman: 'V',
    title: 'QUINTA RESPOSTA',
    badge: 'A Solução Perfeita em Jesus Cristo',
    summary: 'Deus demonstrou Seu amor quando Cristo morreu em nosso lugar na cruz.',
    audioFem: '/audios/audio_licao_5_fem.mp3',
    audioMasc: '/audios/audio_licao_5_masc.mp3',
    duration: '00:32',
    verses: [
      {
        text: '“Mas Deus prova o seu amor para conosco, em que Cristo morreu por nós, sendo nós ainda pecadores.”',
        reference: 'Romanos 5.8'
      },
      {
        text: '“Porque Cristo, nossa Páscoa, foi sacrificado por nós.”',
        reference: 'I Coríntios 5.7'
      }
    ],
    explanation: [
      'Jesus tomou o nosso lugar e levou sobre Si toda a nossa culpa e condenação.',
      'A cruz é o ponto culminante da justiça e da misericórdia de Deus.'
    ],
    color: 'from-teal-600 to-teal-800'
  },
  {
    id: 6,
    roman: 'VI',
    title: 'SEXTA RESPOSTA',
    badge: 'Recebendo pela Fé & Oração de Decisão',
    summary: 'A vida eterna pode ser recebida agora pela fé pessoal no Senhor Jesus Cristo.',
    audioFem: '/audios/audio_licao_6_fem.mp3',
    audioMasc: '/audios/audio_licao_6_masc.mp3',
    duration: '00:41',
    verses: [
      {
        text: '“Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome.”',
        reference: 'João 1.12'
      },
      {
        text: '“Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo.”',
        reference: 'Romanos 10.9'
      }
    ],
    explanation: [
      'Não basta ter uma concordância intelectual; é preciso receber a Cristo no coração pela fé.',
      'A salvação acontece no momento da confissão sincera e entrega total da vida a Deus.'
    ],
    prayer: 'Senhor Deus, reconheço que sou pecador e que preciso de Ti. Creio que Jesus morreu na cruz por mim, pagando o preço da minha condenação, e que ressuscitou. Pela fé, recebo Jesus Cristo e o teu Espírito Santo em meu coração. Amém.',
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 7,
    roman: 'VII',
    title: 'SÉTIMA RESPOSTA',
    badge: 'O Novo Nascimento & Exame Sincero',
    summary: 'A decisão por Cristo deve ser examinada com sinceridade para produzir o novo nascimento no Espírito.',
    audioFem: '/audios/audio_licao_7_fem.mp3',
    audioMasc: '/audios/audio_licao_7_masc.mp3',
    duration: '00:38',
    verses: [
      {
        text: '“Recebeste vós o Espírito Santo quando crestes?”',
        reference: 'Atos 19.2'
      },
      {
        text: '“O que é nascido da carne é carne, e o que é nascido do Espírito é espírito. Necessário é nascer de novo.”',
        reference: 'João 3.6-7'
      }
    ],
    explanation: [
      'A verdadeira decisão não produz apenas conhecimento exterior, mas uma transformação real de dentro para fora.',
      'O Espírito Santo passa a habitar no crente como penhor e certeza da vida eterna.'
    ],
    question: 'Se você morresse agora, teria certeza de que está salvo?',
    color: 'from-sky-600 to-sky-800'
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'OITAVA RESPOSTA',
    badge: 'Compartilhando a Salvação & Grande Comissão',
    summary: 'Quem experimenta a salvação deve compartilhá-la com o mundo e fazer novos discípulos.',
    audioFem: '/audios/audio_licao_8_fem.mp3',
    audioMasc: '/audios/audio_licao_8_masc.mp3',
    duration: '00:48',
    verses: [
      {
        text: '“Quão formosos são os pés dos que anunciam as boas novas, dos que anunciam a salvação.”',
        reference: 'Isaías 52.7'
      },
      {
        text: '“Vão e façam discípulos de todas as nações, batizando-os em nome do Pai e do Filho e do Espírito Santo...”',
        reference: 'Mateus 28.19-20'
      }
    ],
    explanation: [
      'Jesus nos ordenou o IDE: cada salvo é chamado a ser um multiplicador das Boas Novas.',
      'Há festa e júbilo no céu diante de cada pecador que encontra a salvação.',
      'O discipulado é o estilo de vida que perpetua o Reino de Deus na terra!'
    ],
    color: 'from-indigo-600 to-indigo-800'
  }
];

// 2. PLAYBOOK: CURSO DE BATISMO & DISCIPULADO (O QUE JESUS DESEJA QUE VOCÊ FAÇA)
const LESSONS_BATISMO: PageLesson[] = [
  {
    id: 1,
    roman: 'I',
    title: 'DISCIPULADO I',
    badge: 'O Que Jesus Deseja que Eu Faça (Certeza da Salvação)',
    summary: 'Aceitar Jesus Cristo como Salvador é o primeiro passo de uma jornada emocionante e transformadora para viver a vida abundante.',
    audioFem: '/audios/discipulado_1_fem.mp3',
    audioMasc: '/audios/discipulado_1_masc.mp3',
    duration: '01:10',
    verses: [
      {
        text: '“Eu vim para que tenham vida e a tenham em abundância.”',
        reference: 'João 10.10'
      },
      {
        text: '“Se vocês me amam, obedecerão aos meus mandamentos.”',
        reference: 'João 14.15'
      },
      {
        text: '“Porque todo aquele que invocar o nome do Senhor será salvo.”',
        reference: 'Romanos 10.13'
      }
    ],
    explanation: [
      '1. A Promessa de Jesus: Quem ouve as palavras de Cristo e crê nAquele que O enviou tem a vida eterna (João 5:24).',
      '2. A Atitude de Fé: A salvação não é conquistada por méritos, mas recebida pela graça mediante um clamor sincero.',
      '3. A Presença do Espírito Santo: Ele habita em nós e testifica que somos filhos de Deus (Romanos 8:16).'
    ],
    questionsAndAnswers: [
      {
        question: 'O que é necessário fazer para ser salvo?',
        ref: 'Atos 16:31',
        answer: 'Crer no Senhor Jesus Cristo. A salvação vem pela fé, não por obras.'
      },
      {
        question: 'O que Jesus promete a todos que O invocam?',
        ref: 'Romanos 10:13',
        answer: 'Ele promete salvação para todo aquele que clamar por Ele com sinceridade.'
      },
      {
        question: 'Que tipo de vida é prometida a quem aceita a Cristo?',
        ref: 'João 3:16',
        answer: 'A vida eterna, que começa agora e continua para sempre, com paz e propósito.'
      },
      {
        question: 'O que devemos fazer quando pecamos?',
        ref: '1 João 1:9',
        answer: 'Confessar nossos pecados a Deus. Ele é fiel e justo para perdoar e nos purificar.'
      }
    ],
    personalApplications: [
      'O que entendi sobre minha nova vida em Cristo?',
      'Quais atitudes eu preciso mudar para obedecer aos mandamentos de Jesus?',
      'Há alguém com quem preciso compartilhar o plano da salvação?',
      'Que verdade mais impactou meu coração neste discipulado?'
    ],
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 2,
    roman: 'II',
    title: 'DISCIPULADO II',
    badge: 'Leitura Diária da Bíblia',
    summary: 'A Bíblia é o alimento espiritual indispensável que fortalece nossa alma, nos direciona e alinha nosso interior com a vontade de Deus.',
    audioFem: '/audios/discipulado_2_fem.mp3',
    audioMasc: '/audios/discipulado_2_masc.mp3',
    duration: '00:55',
    verses: [
      {
        text: '“Toda a Escritura é inspirada por Deus e é útil para o ensino, para a repreensão, para a correção e para a instrução na justiça...”',
        reference: '2 Timóteo 3.16-17'
      },
      {
        text: '“A tua palavra é lâmpada para os meus pés e luz para o meu caminho.”',
        reference: 'Salmos 119.105'
      }
    ],
    explanation: [
      '1. Valor da Palavra: A Bíblia é a fonte infalível da verdade que nos guia em todas as decisões e dúvidas da vida.',
      '2. Poder Transformador: Ela corrige, confronta, cura o nosso interior e renova a nossa mente.',
      '3. Alimento Diário: Assim como o corpo precisa de alimento físico diário, a alma necessita da Palavra para perseverar na fé.'
    ],
    questionsAndAnswers: [
      {
        question: 'O que torna a Bíblia diferente de qualquer outro livro?',
        ref: '2 Pedro 1:20-21',
        answer: 'Ela é inspirada pelo Espírito Santo e revela a vontade viva de Deus para nós.'
      },
      {
        question: 'Como a Palavra de Deus nos ajuda no dia a dia?',
        ref: 'Salmos 119:105',
        answer: 'Ela nos guia com sabedoria, ilumina nossos caminhos e protege nossos passos.'
      },
      {
        question: 'Por que devemos estudá-la com frequência?',
        ref: 'Atos 17:11; 1 Pedro 2:2',
        answer: 'Porque o estudo da Bíblia fortalece a fé, aprofunda nosso relacionamento com Deus e nos prepara para toda boa obra.'
      }
    ],
    personalApplications: [
      'Como está meu hábito de leitura bíblica atualmente?',
      'O que posso fazer para incluir a Palavra de Deus em minha rotina diária?',
      'Qual versículo lido hoje falou mais forte ao meu coração?',
      'Quais mudanças posso esperar se eu for fiel à leitura bíblica?'
    ],
    color: 'from-teal-600 to-teal-800'
  },
  {
    id: 3,
    roman: 'III',
    title: 'DISCIPULADO III',
    badge: 'Oração Diária & Comunhão Íntima',
    summary: 'A oração é o maior privilégio da vida cristã: o momento em que falamos diretamente com Deus e recebemos Sua paz que excede o entendimento.',
    audioFem: '/audios/discipulado_3_fem.mp3',
    audioMasc: '/audios/discipulado_3_masc.mp3',
    duration: '00:58',
    verses: [
      {
        text: '“Não andeis ansiosos por coisa alguma, mas em tudo, pela oração e súplica, com ações de graças, sejam as vossas petições conhecidas diante de Deus.”',
        reference: 'Filipenses 4.6-7'
      },
      {
        text: '“Mas tu, quando orares, entra no teu quarto e, fechando a porta, ora a teu Pai, que está em secreto...”',
        reference: 'Mateus 6.6'
      }
    ],
    explanation: [
      '1. Privilégio de Falar com Deus: Por meio de Jesus, temos acesso direto ao trono da graça (João 16:24).',
      '2. Instrução de Jesus: A oração deve ser sincera, íntima e sem hipocrisia, buscando um relacionamento real.',
      '3. A Paz Sobrenatural: A oração acalma o coração e renova nossa confiança nas promessas divinas (Jeremias 33:3).'
    ],
    questionsAndAnswers: [
      {
        question: 'Qual é o privilégio que temos em Cristo?',
        ref: 'João 16:24',
        answer: 'Podemos orar em nome de Jesus, com a confiança de que Deus nos ouve e responde.'
      },
      {
        question: 'Como Jesus nos ensinou a orar?',
        ref: 'Mateus 6:6',
        answer: 'Com sinceridade e intimidade, em secreto, com um coração totalmente voltado a Deus.'
      },
      {
        question: 'O que Deus promete àqueles que oram?',
        ref: 'Jeremias 33:3',
        answer: 'Que ouvirá nossas orações e nos revelará coisas grandiosas e ocultas.'
      },
      {
        question: 'Por que oramos em nome de Jesus?',
        ref: 'João 14:6; 1 Timóteo 2:5',
        answer: 'Porque Ele é o único Mediador entre Deus e os seres humanos.'
      }
    ],
    personalApplications: [
      'Que lugar a oração ocupa hoje em minha vida?',
      'Quais áreas da minha vida preciso entregar a Deus em oração?',
      'Como posso tornar minha oração mais sincera e constante?',
      'Qual promessa bíblica me inspira a orar com fé e perseverança?'
    ],
    color: 'from-sky-600 to-sky-800'
  },
  {
    id: 4,
    roman: 'IV',
    title: 'DISCIPULADO IV',
    badge: 'Contribuição com Alegria & Fidelidade',
    summary: 'Contribuir para a obra de Deus é um ato de fé, gratidão e adoração, reconhecendo que tudo pertence ao Senhor.',
    audioFem: '/audios/discipulado_4_fem.mp3',
    audioMasc: '/audios/discipulado_4_masc.mp3',
    duration: '00:52',
    verses: [
      {
        text: '“Cada um contribua segundo propôs no coração, não com tristeza ou por necessidade; porque Deus ama a quem dá com alegria.”',
        reference: '2 Coríntios 9.7'
      },
      {
        text: '“Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa; e provai-me nisto...”',
        reference: 'Malaquias 3.10'
      }
    ],
    explanation: [
      '1. Privilégio da Contribuição: Sustentar a obra missionária com dízimos, ofertas e talentos (1 Coríntios 16:2).',
      '2. Plano Divino: Deus estabeleceu a fidelidade financeira para a manutenção da igreja e alcance de vidas.',
      '3. Alegria e Fé: Ofertar é adoração. Deus valoriza a generosidade voluntária do coração.'
    ],
    questionsAndAnswers: [
      {
        question: 'Como deve ser sustentada a obra de Deus?',
        ref: '1 Coríntios 16:2',
        answer: 'Por meio da contribuição fiel e proporcional de cada crente, conforme a sua prosperidade.'
      },
      {
        question: 'Qual deve ser a atitude ao contribuir?',
        ref: '2 Coríntios 9:7',
        answer: 'Com alegria, generosidade e voluntariedade, sem peso ou obrigação.'
      },
      {
        question: 'A quem pertence o dízimo e onde deve ser entregue?',
        ref: 'Levítico 27:30; Malaquias 3:10',
        answer: 'Pertence ao Senhor e deve ser entregue na casa do tesouro (igreja local).'
      },
      {
        question: 'O que Deus promete aos que confiam e contribuem?',
        ref: 'Filipenses 4:19',
        answer: 'Que suprirá todas as nossas necessidades conforme as Suas riquezas em glória.'
      }
    ],
    personalApplications: [
      'Como tenho encarado minha contribuição à obra de Deus?',
      'Preciso ajustar minha fidelidade nos dízimos e ofertas?',
      'O que posso entregar além do financeiro (tempo, dons, talentos)?',
      'Que promessas de Deus me encorajam a ser mais generoso?'
    ],
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 5,
    roman: 'V',
    title: 'DISCIPULADO V',
    badge: 'Ser Guiado pelo Espírito Santo',
    summary: 'O Espírito Santo habita em nós como Consolador, Conselheiro e Guia, nos transformando e capacitando para testemunhar.',
    audioFem: '/audios/discipulado_5_fem.mp3',
    audioMasc: '/audios/discipulado_5_masc.mp3',
    duration: '00:55',
    verses: [
      {
        text: '“E não vos embriagueis com vinho, no qual há dissolução, mas enchei-vos do Espírito.”',
        reference: 'Efésios 5.18'
      },
      {
        text: '“Mas o fruto do Espírito é: amor, alegria, paz, paciência, benignidade, bondade, fidelidade, mansidão e domínio próprio...”',
        reference: 'Gálatas 5.22-23'
      },
      {
        text: '“Mas recebereis poder, ao descer sobre vós o Espírito Santo, e sereis minhas testemunhas...”',
        reference: 'Atos 1.8'
      }
    ],
    explanation: [
      '1. O Espírito como Guia: Ele nos ensina todas as coisas e lembra dos ensinamentos de Jesus (João 14:26).',
      '2. Fruto do Espírito: A presença do Espírito Santo forja em nós o verdadeiro caráter de Cristo.',
      '3. Poder para Testemunhar: Ele concede autoridade, intrepidez e unção para proclamar o Evangelho.'
    ],
    questionsAndAnswers: [
      {
        question: 'Quem habita em nós após a salvação?',
        ref: 'Romanos 8:9',
        answer: 'O Espírito Santo, confirmando e selando que pertencemos a Deus.'
      },
      {
        question: 'Quais frutos o Espírito desenvolve em nós?',
        ref: 'Gálatas 5:22-23',
        answer: 'Amor, alegria, paz, paciência, benignidade, bondade, fidelidade, mansidão e domínio próprio.'
      },
      {
        question: 'Como podemos ser cheios do Espírito Santo?',
        ref: 'Efésios 5:18',
        answer: 'Rendendo-nos diariamente a Deus, orando e permitindo que o Espírito conduza nossas decisões.'
      }
    ],
    personalApplications: [
      'Tenho permitido que o Espírito Santo me guie em minhas decisões diárias?',
      'Quais frutos do Espírito mais preciso desenvolver em minha vida?',
      'Em quais áreas da minha vida preciso ser mais sensível à voz do Espírito?',
      'O que posso fazer hoje para me encher mais do Espírito Santo?'
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 6,
    roman: 'VI',
    title: 'DISCIPULADO VI',
    badge: 'A Importância de Congregarmos na Igreja',
    summary: 'Fazer parte ativa da igreja local é mandamento bíblico essencial para a comunhão, crescimento espiritual e cumprimento da missão.',
    audioFem: '/audios/discipulado_6_fem.mp3',
    audioMasc: '/audios/discipulado_6_masc.mp3',
    duration: '00:58',
    verses: [
      {
        text: '“Não deixemos de congregar-nos, como é costume de alguns, antes façamos admoestações, e tanto mais quanto vedes que o dia se aproxima.”',
        reference: 'Hebreus 10.24-25'
      },
      {
        text: '“Ora, vós sois corpo de Cristo, e individualmente membros desse corpo.”',
        reference: '1 Coríntios 12.27'
      }
    ],
    explanation: [
      '1. A Igreja como Corpo de Cristo: Cada crente é membro indispensável e co-responsável no avanço do Reino.',
      '2. Comunhão que Edifica: A vida cristã foi planejada para ser compartilhada em amor fraternal (Romanos 12:15).',
      '3. Ensino e Fortalecimento: A igreja local é o ambiente onde somos alimentados e guardados na doutrina (Atos 2:42).'
    ],
    questionsAndAnswers: [
      {
        question: 'Quem é a cabeça da igreja?',
        ref: 'Efésios 5:23',
        answer: 'Jesus Cristo é a cabeça suprema da Igreja, e nós somos os Seus membros.'
      },
      {
        question: 'Por que devemos participar ativamente das reuniões da igreja?',
        ref: 'Hebreus 10:24-25',
        answer: 'Para sermos encorajados, instruídos na Palavra e fortalecidos na fé mútua.'
      },
      {
        question: 'Como a igreja contribui para o nosso crescimento espiritual?',
        ref: 'Atos 2:42',
        answer: 'Por meio do ensino apostólico, comunhão genuína, celebração da Ceia e oração unânime.'
      }
    ],
    personalApplications: [
      'Qual tem sido meu compromisso e dedicação com a igreja local?',
      'Em quais departamentos ou ministérios posso me envolver mais ativamente?',
      'O que Deus tem falado comigo através da comunhão com os irmãos?',
      'Como posso acolher e discipular novas pessoas na igreja?'
    ],
    color: 'from-rose-600 to-rose-800'
  }
];

export const PlayBookView: React.FC = () => {
  // Course Selector: 'salvacao' | 'batismo'
  const [currentCourse, setCurrentCourse] = useState<'salvacao' | 'batismo'>('salvacao');

  // Page state: 0 = Capa, 1..N = Lições, N+1 = Conclusão
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedPrayer, setCopiedPrayer] = useState(false);

  // Audio Player State inside PlayBook
  const [voice, setVoice] = useState<'fem' | 'masc'>('fem');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [audioProgress, setAudioProgress] = useState<number>(0);
  const [audioDuration, setAudioDuration] = useState<number>(0);
  const [audioSpeed, setAudioSpeed] = useState<number>(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const activeLessons = currentCourse === 'salvacao' ? LESSONS_SALVACAO : LESSONS_BATISMO;
  const totalPages = activeLessons.length + 2; // Capa (0) + Lições (1..N) + Conclusão (N+1)

  const currentLesson = currentPage >= 1 && currentPage <= activeLessons.length 
    ? activeLessons[currentPage - 1] 
    : null;

  // Active audio URL based on current lesson and selected voice
  const activeAudioSrc = currentLesson
    ? (voice === 'fem' ? currentLesson.audioFem : currentLesson.audioMasc)
    : '';

  // Switch courses and reset page
  const handleCourseChange = (course: 'salvacao' | 'batismo') => {
    setCurrentCourse(course);
    setCurrentPage(0);
    setIsAudioPlaying(false);
  };

  // Reset audio when page or voice changes
  useEffect(() => {
    setIsAudioPlaying(false);
    setAudioProgress(0);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [currentPage, voice, currentCourse]);

  // Audio event handlers
  const handlePlayPauseAudio = () => {
    if (!audioRef.current || !activeAudioSrc) return;
    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsAudioPlaying(true);
      }).catch(err => {
        console.error('Playback failed:', err);
        setIsAudioPlaying(false);
      });
    }
  };

  const handleAudioTimeUpdate = () => {
    if (audioRef.current) {
      setAudioProgress(audioRef.current.currentTime);
      setAudioDuration(audioRef.current.duration || 0);
    }
  };

  const handleAudioSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setAudioProgress(val);
    if (audioRef.current) {
      audioRef.current.currentTime = val;
    }
  };

  const toggleAudioSpeed = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const currIdx = speeds.indexOf(audioSpeed);
    const next = speeds[(currIdx + 1) % speeds.length];
    setAudioSpeed(next);
    if (audioRef.current) {
      audioRef.current.playbackRate = next;
    }
  };

  const formatSecs = (secs: number) => {
    if (isNaN(secs)) return '00:00';
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages - 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        setCurrentPage((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages]);

  const handleCopyPrayer = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-lg';
      case 'xlarge':
        return 'text-xl';
      default:
        return 'text-sm sm:text-base';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-12">
      {/* Hidden Audio Player instance for current lesson */}
      {activeAudioSrc && (
        <audio
          ref={audioRef}
          src={activeAudioSrc}
          onTimeUpdate={handleAudioTimeUpdate}
          onLoadedMetadata={handleAudioTimeUpdate}
          onEnded={() => setIsAudioPlaying(false)}
        />
      )}

      {/* Top Header & Course Selector */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 shadow-lg">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <BookOpen size={14} className="text-teal-500" />
            Playbooks & Manuais de Estudo Bíblico
          </div>
          <h1 className="font-heading font-bold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {currentCourse === 'salvacao' ? 'Playbook: As 8 Respostas Bíblicas' : 'Playbook: Curso de Batismo & Discipulado'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            {currentCourse === 'salvacao' 
              ? 'Guia interativo da Certeza da Salvação desenvolvido pelo Pr. Roberto Casas.'
              : 'O Que Jesus Deseja que Você Faça — 6 Lições fundamentais para novos crentes.'}
          </p>
        </div>

        {/* Course Switch Buttons */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => handleCourseChange('salvacao')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentCourse === 'salvacao'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flame size={14} /> 8 Respostas da Salvação
          </button>
          <button
            onClick={() => handleCourseChange('batismo')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              currentCourse === 'batismo'
                ? 'bg-amber-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award size={14} /> Curso de Batismo (6 Lições)
          </button>
        </div>
      </div>

      {/* Reader Controls Toolbar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200/80 dark:border-slate-800 shadow-md flex flex-wrap items-center justify-between gap-4">
        
        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-500 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-800 disabled:hover:text-slate-700 transition-colors"
            title="Página Anterior (Seta Esquerda)"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 px-2">
            Página <span className="text-teal-600 dark:text-teal-400 font-bold">{currentPage + 1}</span> de {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-500 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-800 disabled:hover:text-slate-700 transition-colors"
            title="Próxima Página (Seta Direita)"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Quick Page Jump Buttons */}
        <div className="hidden xl:flex items-center gap-1.5 overflow-x-auto py-1">
          <button
            onClick={() => setCurrentPage(0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPage === 0
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Capa
          </button>

          {activeLessons.map((l, idx) => (
            <button
              key={l.id}
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 rounded-xl text-xs font-bold transition-all ${
                currentPage === idx + 1
                  ? 'bg-teal-600 text-white shadow-sm scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
              title={l.title}
            >
              {l.roman}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage(totalPages - 1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              currentPage === totalPages - 1
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            Conclusão
          </button>
        </div>

        {/* Visual Settings: Font Size & Zoom */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                fontSize === 'normal' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                fontSize === 'large' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              A+
            </button>
            <button
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                fontSize === 'xlarge' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
            >
              A++
            </button>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-mono text-slate-500 w-12 text-center">{zoomLevel}%</span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(z + 10, 130))}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={() => setZoomLevel(100)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-500 transition-colors"
              title="Redefinir Zoom"
            >
              <RotateCcw size={16} />
            </button>
          </div>
        </div>

      </div>

      {/* Main Playbook Page Display Area */}
      <div 
        className="max-w-4xl mx-auto transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
      >
        {/* =========================================================================
            PÁGINA 0: CAPA DO PLAYBOOK
            ========================================================================= */}
        {currentPage === 0 && (
          <div className="bg-gradient-to-br from-slate-900 via-[#001869] to-slate-950 text-white rounded-3xl p-8 sm:p-14 border border-white/10 shadow-2xl space-y-8 text-center relative overflow-hidden animate-scaleUp">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-teal-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-400" />
              {currentCourse === 'salvacao' ? 'Manual do Evangelizador' : 'Discipulado Inicial para Novos Crentes'}
            </div>

            {/* Large Official Logo */}
            <div className="w-28 h-28 sm:w-36 sm:h-36 mx-auto rounded-3xl overflow-hidden shadow-2xl bg-[#001869] border-2 border-white/20 p-1 flex items-center justify-center">
              <img
                src="/pwa-512x512.png"
                alt="Logo Oficial"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="space-y-3 max-w-2xl mx-auto">
              <h2 className="font-heading font-extrabold text-3xl sm:text-5xl tracking-tight leading-tight">
                {currentCourse === 'salvacao' ? (
                  <>A Certeza da <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-teal-300">Salvação</span></>
                ) : (
                  <>Curso de Batismo & <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-teal-300">Discipulado</span></>
                )}
              </h2>
              <p className="text-base sm:text-xl text-slate-300 font-medium">
                {currentCourse === 'salvacao' 
                  ? 'As 8 Respostas Bíblicas para o Evangelismo Pessoal • O Que Jesus Deseja que Você Faça' 
                  : 'O Que Jesus Deseja que Você Faça — Manual Oficial de Discipulado'}
              </p>
              <p className="text-xs sm:text-sm text-slate-400">
                Ministrado e estruturado pelo <strong className="text-white">Pr. Roberto Rodrigues Casas</strong>
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <span className="text-xs font-bold text-amber-400">1. Fundamento</span>
                <p className="text-xs text-slate-300">Passagens bíblicas centrais sem rodeios ou tradições humanas.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <span className="text-xs font-bold text-teal-400">2. Prática</span>
                <p className="text-xs text-slate-300">Perguntas, respostas e aplicações práticas para cada módulo.</p>
              </div>
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm space-y-1">
                <span className="text-xs font-bold text-sky-400">3. Áudio Integrado</span>
                <p className="text-xs text-slate-300">Ouça e baixe a narração em áudio de cada lição.</p>
              </div>
            </div>

            {/* Start Button */}
            <div className="pt-4">
              <button
                onClick={() => setCurrentPage(1)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-amber-500 via-teal-500 to-emerald-600 hover:from-amber-600 hover:to-emerald-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-500/25 transition-all hover:scale-105 active:scale-95"
              >
                Abrir Playbook & Iniciar Módulo I <ArrowRight size={18} />
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            PÁGINAS 1..N: LIÇÕES INTERATIVAS COM ÁUDIO
            ========================================================================= */}
        {currentLesson && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-8 animate-fadeIn">
            
            {/* Header of Lesson */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold text-white bg-gradient-to-r ${currentLesson.color} shadow-sm`}>
                    {currentLesson.roman}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    {currentLesson.title}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-xl sm:text-2xl text-slate-900 dark:text-white">
                  {currentLesson.badge}
                </h3>
              </div>

              {/* Audio Play Mini Bar */}
              <div className="p-2 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex items-center gap-3 shrink-0">
                {/* Voice Gender */}
                <div className="flex rounded-xl bg-slate-200 dark:bg-slate-700 p-0.5 text-[11px] font-semibold">
                  <button
                    onClick={() => setVoice('fem')}
                    className={`px-2 py-1 rounded-lg transition-colors ${voice === 'fem' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs' : 'text-slate-500'}`}
                  >
                    Voz Fem
                  </button>
                  <button
                    onClick={() => setVoice('masc')}
                    className={`px-2 py-1 rounded-lg transition-colors ${voice === 'masc' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-xs' : 'text-slate-500'}`}
                  >
                    Voz Masc
                  </button>
                </div>

                {/* Play / Pause */}
                <button
                  onClick={handlePlayPauseAudio}
                  className="w-10 h-10 rounded-xl bg-teal-600 hover:bg-teal-700 text-white flex items-center justify-center shadow-md transition-transform hover:scale-105"
                  title={isAudioPlaying ? 'Pausar Áudio' : 'Ouvir Lição em Áudio'}
                >
                  {isAudioPlaying ? <Pause size={18} /> : <Play size={18} className="ml-0.5" />}
                </button>

                {/* Speed */}
                <button
                  onClick={toggleAudioSpeed}
                  className="px-2 py-1.5 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 text-[11px] font-mono font-bold hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
                  title="Velocidade de Reprodução"
                >
                  {audioSpeed}x
                </button>

                {/* Download MP3 */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    const gender = voice === 'fem' ? 'Voz_Feminina' : 'Voz_Masculina';
                    const filename = currentCourse === 'salvacao'
                      ? `A_Certeza_da_Salvacao_Licao_${currentLesson.id}_${gender}.mp3`
                      : `Curso_Batismo_Discipulado_${currentLesson.id}_${gender}.mp3`;
                    downloadAudioFile(activeAudioSrc, filename);
                  }}
                  className="p-2 rounded-xl bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 hover:bg-teal-500 hover:text-white transition-colors"
                  title="Baixar Áudio MP3 da Lição"
                >
                  <Download size={16} />
                </button>
              </div>
            </div>

            {/* Audio Progress Slider if playing or loaded */}
            <div className="space-y-1 p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60">
              <div className="flex items-center justify-between text-[11px] font-medium text-slate-500">
                <span className="flex items-center gap-1">
                  <Headphones size={12} className="text-teal-500" />
                  Narração em Português ({voice === 'fem' ? 'Francisca' : 'Antonio'})
                </span>
                <span className="font-mono">{formatSecs(audioProgress)} / {formatSecs(audioDuration)}</span>
              </div>
              <input
                type="range"
                min={0}
                max={audioDuration || 100}
                value={audioProgress}
                onChange={handleAudioSeek}
                className="w-full accent-teal-500 cursor-pointer h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />
            </div>

            {/* Verses Section */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                <Bookmark size={14} /> Texto Sagrado & Versículos-Chave
              </h4>
              <div className="space-y-2.5">
                {currentLesson.verses.map((v, i) => (
                  <div 
                    key={i}
                    className="p-4 sm:p-5 rounded-2xl bg-teal-50/50 dark:bg-teal-950/30 border-l-4 border-teal-500 border-t border-r border-b border-teal-100 dark:border-teal-900/40 space-y-1.5"
                  >
                    <p className={`font-serif italic text-slate-800 dark:text-slate-200 leading-relaxed ${getFontSizeClass()}`}>
                      {v.text}
                    </p>
                    <span className="block text-right text-xs font-bold text-teal-700 dark:text-teal-400">
                      — {v.reference}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Theological Explanation / 3 Fundamentos */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-teal-500" /> Fundamentos & Explicação Teológica
              </h4>
              <div className="space-y-2.5">
                {currentLesson.explanation.map((exp, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700"
                  >
                    <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {i + 1}
                    </div>
                    <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${getFontSizeClass()}`}>
                      {exp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Questions and Answers (Reflexão e Prática) for Discipulado */}
            {currentLesson.questionsAndAnswers && currentLesson.questionsAndAnswers.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                  <HelpCircle size={14} /> Reflexão e Prática Bíblica
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLesson.questionsAndAnswers.map((qa, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-200/80 dark:bg-amber-900 text-amber-900 dark:text-amber-200">
                          {qa.ref}
                        </span>
                      </div>
                      <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                        {qa.question}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed pt-1 border-t border-amber-200/50 dark:border-amber-900/30">
                        <strong className="text-teal-600 dark:text-teal-400">R:</strong> {qa.answer}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Personal Application for Discipulado */}
            {currentLesson.personalApplications && currentLesson.personalApplications.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                  <CheckSquare size={14} /> Aplicação Pessoal & Exame de Consciência
                </h4>
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2.5">
                  {currentLesson.personalApplications.map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium">
                      <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-[10px] font-bold shrink-0">
                        ✓
                      </span>
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Prayer Box (Lição 6 de Salvação) */}
            {currentLesson.prayer && (
              <div className="p-6 rounded-2xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/50 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 flex items-center gap-1.5">
                    <Heart size={14} className="text-rose-500" /> Oração de Decisão & Confissão
                  </span>
                  <button
                    onClick={() => handleCopyPrayer(currentLesson.prayer!)}
                    className="flex items-center gap-1 text-xs font-semibold text-emerald-700 dark:text-emerald-300 hover:text-emerald-900 bg-white/80 dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-emerald-200 dark:border-emerald-800 transition-colors"
                  >
                    {copiedPrayer ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copiedPrayer ? 'Copiada!' : 'Copiar Oração'}</span>
                  </button>
                </div>
                <p className="font-serif italic text-sm sm:text-base text-emerald-950 dark:text-emerald-100 leading-relaxed bg-white/60 dark:bg-slate-900/60 p-4 rounded-xl border border-emerald-200 dark:border-emerald-900">
                  “{currentLesson.prayer}”
                </p>
              </div>
            )}

            {/* Bottom Page Nav */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft size={16} /> Anterior
              </button>

              <button
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-105"
              >
                Próxima Lição <ChevronRight size={16} />
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            PÁGINA FINAL: CONCLUSÃO & CERTIFICADO DE CONCLUSÃO
            ========================================================================= */}
        {currentPage === totalPages - 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200/80 dark:border-slate-800 shadow-2xl space-y-8 text-center animate-scaleUp">
            
            <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-tr from-amber-500 to-teal-500 text-white flex items-center justify-center shadow-xl shadow-teal-500/25">
              <Award size={40} />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                Parabéns pela Conclusão!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentCourse === 'salvacao'
                  ? 'Você concluiu o estudo das 8 Respostas Bíblicas da Salvação. Agora você está apto e capacitado para evangelizar com firmeza e clareza apostólica!'
                  : 'Você completou os 6 Módulos do Curso de Batismo & Discipulado. Que a sua vida seja um testemunho vivo da graça e do amor de Jesus Cristo!'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-teal-800 dark:text-teal-300 font-serif italic max-w-lg mx-auto">
              “Vão pelo mundo todo e preguem o evangelho a todas as pessoas.” — Marcos 16:15
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setCurrentPage(0)}
                className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-xs hover:bg-slate-200 transition-colors"
              >
                Voltar à Capa
              </button>
              <button
                onClick={() => handleCourseChange(currentCourse === 'salvacao' ? 'batismo' : 'salvacao')}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs shadow-md transition-all hover:scale-105"
              >
                {currentCourse === 'salvacao' ? 'Estudar Curso de Batismo →' : 'Estudar 8 Respostas da Salvação →'}
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
