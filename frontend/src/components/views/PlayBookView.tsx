import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  RotateCcw, Copy, Check, Heart, ArrowRight, Bookmark,
  Award, Flame, HelpCircle, Sparkles, CheckSquare,
  Printer, Download, PenTool
} from 'lucide-react';

// --- INTERFACES DO PLAYBOOK (SOMENTE TEXTO • ZERO ÁUDIO • SEM GABARITO DE RESPOSTAS) ---
interface BibleVerse {
  text: string;
  reference: string;
}

interface QuestionItem {
  question: string;
  ref?: string;
  linesCount?: number;
}

interface SpecialItem {
  label: string;
  text: string;
}

interface PageLesson {
  id: number;
  roman: string;
  title: string;
  badge: string;
  summary: string;
  reflectionQuestion?: string;
  verses: BibleVerse[];
  simNaoQuestions?: string[];
  specialContent?: {
    title: string;
    items: SpecialItem[];
  };
  prayer?: string;
  textBlocks?: string[];
  studyQuestions?: QuestionItem[];
  color: string;
}

// =========================================================================
// 1. PLAYBOOK: AS 8 RESPOSTAS BÍBLICAS (A CERTEZA DA SALVAÇÃO)
// TEXTO INTEGRAL DIVIDIDO POR LIÇÕES • SEM GABARITO • ZERO ÁUDIO
// =========================================================================
const LESSONS_SALVACAO: PageLesson[] = [
  {
    id: 1,
    roman: 'I',
    title: 'PRIMEIRA LIÇÃO',
    badge: 'A Salvação Bíblica',
    summary: 'Quem pode decidir se uma pessoa será salva ou não: Deus ou o homem?',
    reflectionQuestion: 'Quem pode decidir se uma pessoa será salva ou não: Deus ou o homem?',
    verses: [
      {
        text: '“E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho.”',
        reference: '1 João 5:11'
      },
      {
        text: '“Aquele que tem o Filho tem a vida; aquele que não tem o Filho de Deus não tem a vida.”',
        reference: '1 João 5:12'
      },
      {
        text: '“Estas coisas vos escrevi, para que saibais que tendes a vida eterna e para que creiais no nome do Filho de Deus.”',
        reference: '1 João 5:13'
      },
      {
        text: '“Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus.”',
        reference: '1 Coríntios 1:18'
      },
      {
        text: '“Na verdade, na verdade vos digo que quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida.”',
        reference: 'João 5:24'
      }
    ],
    simNaoQuestions: [
      'Se Deus deu a vida eterna, Ele está falando a verdade?',
      'Se a vida eterna vem de Deus, e Ele decidiu oferecê-la aos pecadores, você acha que existem pessoas dizendo que ninguém pode ser salvo por Deus?',
      'Se Deus já deu a vida eterna há mais de 2.000 anos, você acha que existem pessoas mal informadas que pensam que a salvação só será definida no juízo final?',
      'Se João estava vivo, e as pessoas para quem ele escreveu também estavam vivas, você acha que existem pessoas dizendo que só podemos saber se somos salvos depois da morte?',
      'Se Deus deu a vida eterna, fica claro que é das mãos de Deus que a recebemos. Você acha que existem muitas pessoas enganadas pensando que são salvas porque frequentam uma religião, fazem parte de uma igreja, foram batizadas quando crianças ou guardam mandamentos?',
      'Se Deus diz que a vida eterna é nossa por meio de Jesus, você acha que existem pessoas que podem ser salvas por outros meios (religião, boas obras, nunca fazer mal a ninguém ou reencarnação)?',
      'Se Deus diz que quem tem o Filho de Deus como seu Salvador tem a vida eterna, você acha que existem pessoas contradizendo Deus e dizendo que ninguém pode ter certeza da salvação?',
      'Se João escreveu para que saibamos que temos a vida eterna, você acha que existem pessoas dizendo que ele estava mentindo e que a Bíblia registra uma mentira?',
      'Se Jesus diz: "Quem ouve a minha Palavra e crê tem a vida eterna, não entra em condenação e passou da morte para a vida", você acha que existem pessoas que não acreditam em Jesus e continuam em dúvida?'
    ],
    color: 'from-amber-500 to-amber-700'
  },
  {
    id: 2,
    roman: 'II',
    title: 'SEGUNDA LIÇÃO',
    badge: 'O Amor de Deus por Você',
    summary: 'Quem determina o amor de Deus por você: Deus ou você?',
    reflectionQuestion: 'Quem determina o amor de Deus por você: Deus ou você?',
    verses: [
      {
        text: '“Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.”',
        reference: 'João 3:16'
      },
      {
        text: '“Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.”',
        reference: 'Romanos 5:8'
      }
    ],
    simNaoQuestions: [
      'Se Deus amou o mundo de uma maneira inexplicável, e você está no mundo que Ele ama, você acha que ainda existem pessoas pensando que Deus não as ama?',
      'Se Deus ama você e enviou Jesus para que você não pereça, isto é, não morra sem salvação, você acha que muitas pessoas estão morrendo sem salvação porque não acreditam que Deus as ama, apesar dos seus erros, imperfeições e pecados?',
      'Se João escreveu que Deus quer que você tenha a vida eterna mesmo sendo pecador, você acha que existem pessoas pensando: "Eu não mereço a salvação"?',
      'Se Deus prova que ama você ao permitir que Cristo morresse em seu lugar na cruz, pagando a sua pena com a própria morte — um fato consumado há mais de dois mil anos —, você acha que existem muitas pessoas dizendo que a morte de Jesus não é suficiente para salvá-las e pensando que essa prova não é para elas?'
    ],
    color: 'from-rose-500 to-rose-700'
  },
  {
    id: 3,
    roman: 'III',
    title: 'TERCEIRA LIÇÃO',
    badge: 'Todos Nós Somos Pecadores',
    summary: 'Quem define o pecado: a opinião humana ou Deus?',
    reflectionQuestion: 'Quem define o pecado: a opinião humana ou Deus?',
    verses: [
      {
        text: '“Porque todos pecaram e destituídos estão da glória de Deus.”',
        reference: 'Romanos 3:23'
      }
    ],
    simNaoQuestions: [
      'A Bíblia afirma com clareza que todos nós pecamos e que, por nós mesmos, estamos separados da glória de Deus?',
      'Você acha que existem pessoas dizendo que não cometeram um pecado tão grave e, por isso, não estão separadas de Deus?',
      'Você reconhece que, diante da santidade perfeita de Deus, nenhum ser humano pode se salvar por suas próprias forças?'
    ],
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 4,
    roman: 'IV',
    title: 'QUARTA LIÇÃO',
    badge: 'A Morte Eterna & As Três Separações',
    summary: 'Morte na Bíblia significa separação de Deus em três etapas: Espiritual, Física e Eterna.',
    reflectionQuestion: 'Quem decide sobre o céu ou o inferno: Deus ou você?',
    verses: [
      {
        text: '“Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus nosso Senhor.”',
        reference: 'Romanos 6:23'
      },
      {
        text: '“E foram todos os dias que Adão viveu, novecentos e trinta anos, e morreu.”',
        reference: 'Gênesis 5:5'
      },
      {
        text: '“E aconteceu que o mendigo morreu, e foi levado pelos anjos para o seio de Abraão; e morreu também o rico, e foi sepultado. E no inferno, o rico ergueu os olhos, estando em tormentos, e viu ao longe Abraão, e Lázaro no seu seio... está posto um grande abismo entre nós e vós...”',
        reference: 'Lucas 16:22-26'
      }
    ],
    specialContent: {
      title: 'AS TRÊS ETAPAS DA MORTE NA BÍBLIA',
      items: [
        {
          label: '1ª Etapa: Morte Espiritual (Separação Espiritual de Deus)',
          text: 'Quando Adão pecou, ele não caiu morto fisicamente no mesmo instante; continuou vivo. O que morreu então? O relacionamento e a comunhão íntima com Deus foram rompidos! Por isso, todos os pecadores estão espiritualmente mortos, separados de Deus e dominados pelo pecado.'
        },
        {
          label: '2ª Etapa: Morte Física (Separação Física)',
          text: 'Quando o homem morre fisicamente, seu corpo vai para o cemitério e seu relacionamento físico na terra é interrompido (Gênesis 5:5; Lucas 16:22).'
        },
        {
          label: '3ª Etapa: Morte Eterna (Separação Eterna no Inferno)',
          text: 'Se a pessoa morrer fisicamente sem Cristo, continuará eternamente separada de Deus em tormentos no inferno. Em Lucas 16, Jesus revela que há um grande abismo intransponível, não havendo segunda oportunidade após o falecimento. A decisão deve ser tomada hoje!'
        }
      ]
    },
    simNaoQuestions: [
      'Quando Adão pecou ele não caiu morto fisicamente, continuou vivo. O que morreu foi o relacionamento dele com Deus. Você entendeu com clareza o que é morte espiritual?',
      'Fica claro que, logo após a pessoa pecar, ela já está condenada à morte eterna, e que Jesus veio salvar os já condenados?',
      'Você já falou para os seus familiares sobre o Inferno, sabendo que o rico suplicou para que alguém avisasse seus irmãos?'
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 5,
    roman: 'V',
    title: 'QUINTA LIÇÃO',
    badge: 'A Solução de Deus para a Salvação',
    summary: 'Quem tem a Solução para salvar: Deus ou a religião?',
    reflectionQuestion: 'Quem tem a Solução para salvar: Deus ou a religião?',
    verses: [
      {
        text: '“Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.”',
        reference: 'Romanos 5:8'
      },
      {
        text: '“Purificai-vos, pois, do fermento velho, para que sejais uma nova massa, assim como estais sem fermento. Porque Cristo, nossa páscoa, foi sacrificado por nós.”',
        reference: '1 Coríntios 5:7'
      },
      {
        text: '“Porque eu recebi do Senhor o que também vos ensinei: que o Senhor Jesus, na noite em que foi traído, tomou o pão; e, havendo dado graças, o partiu e disse: Tomai, comei; isto é o meu corpo que é partido por vós... Este cálice é o novo testamento no meu sangue; fazei isto em memória de mim.”',
        reference: '1 Coríntios 11:23-25'
      }
    ],
    specialContent: {
      title: 'AS TRÊS ILUSTRAÇÕES QUE AJUDAM A ENTENDER O CORPO E O SANGUE',
      items: [
        {
          label: '1ª Ilustração: A Doença e a Pena',
          text: 'Se uma pessoa se prostituir e contrair uma doença grave, ao se arrepender e receber o perdão pelo pecado, ela é perdoada. Porém, o perdão não elimina automaticamente a consequência física. Da mesma forma, o perdão do pecado não deve ser confundido com o pagamento da pena de morte eterna. Morte só se paga com morte; pecado só se apaga com o sangue de Cristo!'
        },
        {
          label: '2ª Ilustração: A Camisa Paga e Lavada',
          text: 'Quando uma pessoa compra uma camisa, ela paga uma única vez, mas pode lavá-la muitas vezes. A camisa pertence a ela porque foi paga, não porque foi lavada. Da mesma maneira, Cristo pagou o preço total da salvação uma única vez com Sua morte na cruz, e continua nos purificando com Seu sangue a cada dia!'
        },
        {
          label: '3ª Ilustração: O Cordeiro Pascal e o Primogênito',
          text: 'No Egito, o cordeiro deveria ser morto no dia 14 ao entardecer para pagar a pena de morte do primogênito antes do anjo passar à meia-noite. Depois, o sangue era colocado nos umbrais da porta para identificar a casa. Por isso, na Ceia, Jesus tomou o pão e disse: "Este é o meu corpo partido por vós" (morrendo na cruz para pagar nossa pena de morte); e tomou o cálice: "Este é o meu sangue derramado para remissão dos pecados".'
        }
      ]
    },
    simNaoQuestions: [
      'Se o salário do pecado é a morte eterna, você compreende que somente outra morte poderia pagar a nossa pena, e por isso Cristo morreu por nós?',
      'Se Jesus Cristo é o nosso Cordeiro da Páscoa e já foi sacrificado em nosso lugar, a dívida já foi paga de uma vez por todas?',
      'Você consegue ver a diferença entre pecado e pagamento de pena de morte?',
      'Você compreendeu a diferença entre o corpo (pago na cruz) e o sangue de Cristo (que purifica os pecados)?'
    ],
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 6,
    roman: 'VI',
    title: 'SEXTA LIÇÃO',
    badge: 'Como Receber a Salvação Bíblica',
    summary: 'Qual é o momento exato em que a pessoa passa a ser salva: ao crer e confessar ou no juízo final?',
    reflectionQuestion: 'Qual é o momento exato em que a pessoa passa a ser salva: no momento em que crê e confessa ou no juízo final?',
    verses: [
      {
        text: '“A saber: se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo. Visto que com o coração se crê para a justiça, e com a boca se faz confissão para a salvação.”',
        reference: 'Romanos 10:9-10'
      },
      {
        text: '“Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome.”',
        reference: 'João 1:12'
      },
      {
        text: '“Na verdade, na verdade vos digo que quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida.”',
        reference: 'João 5:24'
      }
    ],
    simNaoQuestions: [
      'Se a Bíblia orienta confessar com a boca que Jesus é o Senhor e crer que Deus O ressuscitou, você crê que quem confessa e crê recebe a salvação imediatamente?',
      'Se Jesus disse que todos os que O receberam se tornam filhos de Deus, você acha que existem pessoas que ainda não compreendem o poder de Cristo para salvar pela fé?',
      'Se Jesus disse que quem crê NÃO ENTRA EM CONDENAÇÃO e JÁ PASSOU da morte para a vida, quem pode dizer que só saberemos no juízo final?'
    ],
    prayer: 'Senhor Deus, eu sei que o Senhor me ama, mas tenho consciência de que já pequei e que estou condenado à morte eterna. Reconheço que o Senhor enviou Jesus para me salvar. Por isso, reconheço que Jesus é o Teu Filho bendito, que foi levantado na cruz para morrer em meu lugar. Pela fé, entrego a Ti a minha vida e reconheço que Jesus tomou sobre Si a minha pena. Muito obrigado, porque, quando o Senhor morreu, pagou a minha pena; quando derramou o Seu sangue, providenciou a purificação dos meus pecados. Quando ressuscitou e se assentou à direita do Pai, o Senhor enviou o Espírito Santo. Por isso, pelas Tuas mãos, recebo o Espírito Santo como o selo da minha salvação eterna. Amém!',
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 7,
    roman: 'VII',
    title: 'SÉTIMA LIÇÃO',
    badge: 'A Avaliação da Salvação Bíblica',
    summary: 'É possível avaliar a salvação de uma pessoa para saber se ela realmente entendeu a salvação bíblica?',
    reflectionQuestion: 'É possível avaliar a salvação de uma pessoa para saber se ela realmente entendeu a salvação bíblica?',
    verses: [
      {
        text: '“Disse-lhes: Recebestes vós o Espírito Santo quando crestes? E eles disseram-lhe: Nós nem ainda ouvimos que haja Espírito Santo.”',
        reference: 'Atos 19:2'
      },
      {
        text: '“E chegou a Éfeso um certo judeu chamado Apolo... Este era instruído no caminho do Senhor e, fervoroso de espírito, falava e ensinava diligentemente as coisas do Senhor, conhecendo somente o batismo de João... quando o ouviram Priscila e Áquila, o levaram consigo e lhe declararam mais precisamente o caminho de Deus.”',
        reference: 'Atos 18:24-28'
      },
      {
        text: '“Nem todo o que me diz: Senhor, Senhor! entrará no reino dos céus, mas aquele que faz a vontade de meu Pai, que está nos céus. Muitos me dirão naquele dia: Senhor, Senhor, não profetizamos nós em teu nome? E em teu nome não expulsamos demônios? E em teu nome não fizemos muitas maravilhas?”',
        reference: 'Mateus 7:21-22'
      }
    ],
    simNaoQuestions: [
      'Se você morresse agora, você tem plena certeza da sua Salvação?',
      'Alguém já avaliou biblicamente a sua Salvação?',
      'Se Jesus disse que nem todo que diz "Senhor, Senhor" entrará no Reino, você concorda que é fundamental examinar a si mesmo à luz das Escrituras?'
    ],
    specialContent: {
      title: 'ROTEIRO PARA ESCREVER SEU TESTEMUNHO PESSOAL',
      items: [
        { label: '1. O Passado', text: 'Como era a sua vida antes de aceitar a Cristo?' },
        { label: '2. O Despertamento', text: 'O que despertou você para a necessidade da salvação?' },
        { label: '3. A Decisão', text: 'Qual foi a sua decisão de fé em Cristo Jesus?' },
        { label: '4. O Presente', text: 'Como é a sua vida agora com a certeza da vida eterna?' }
      ]
    },
    color: 'from-violet-600 to-violet-800'
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'OITAVA LIÇÃO',
    badge: 'O Privilégio de Compartilhar a Salvação',
    summary: 'A Bíblia comprova que a salvação deve ser compartilhada por todo aquele que foi alcançado pela graça.',
    reflectionQuestion: 'Quem você acha que pode e deve compartilhar a salvação: o salvo ou o perdido?',
    verses: [
      {
        text: '“Quão formosos sobre os montes são os pés dos que anunciam as boas-novas, dos que anunciam a salvação!”',
        reference: 'Isaías 52:7'
      },
      {
        text: '“E o que de mim, através de muitas testemunhas, ouviste, confia-o a homens fiéis, que sejam idôneos para também ensinarem os outros.”',
        reference: '2 Timóteo 2:2'
      },
      {
        text: '“Portanto, ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo; ensinando-os a guardar todas as coisas que eu vos tenho mandado; e eis que eu estou convosco todos os dias, até a consumação dos séculos.”',
        reference: 'Mateus 28:19-20'
      },
      {
        text: '“Digo-vos que assim haverá alegria no céu por um pecador que se arrepende, mais do que por noventa e nove justos que não necessitam de arrependimento.”',
        reference: 'Lucas 15:7'
      },
      {
        text: '“Pois que aproveitaria ao homem ganhar todo o mundo e perder a sua alma? Ou que daria o homem pelo resgate da sua alma?”',
        reference: 'Marcos 8:36-37'
      },
      {
        text: '“E aquele que não foi achado escrito no livro da vida foi lançado no lago de fogo.”',
        reference: 'Apocalipse 20:15'
      },
      {
        text: '“Assim será a minha palavra, que sair da minha boca; ela não voltará para mim vazia, antes fará o que me apraz, e prosperará naquilo para que a enviei.”',
        reference: 'Isaías 55:11'
      },
      {
        text: '“Mas, quando vos entregarem, não vos dê cuidado como, ou o que haveis de falar, porque naquela mesma hora vos será ministrado o que haveis de dizer.”',
        reference: 'Mateus 10:19'
      }
    ],
    simNaoQuestions: [
      'Se aquele que me salvou do inferno eterno disse que eu deveria levar de graça aquilo que recebi de graça, você decide dedicar seu tempo para livrar outras pessoas desse mesmo destino?',
      'Se Ele disse que há mais alegria no céu por um pecador que se arrepende, você quer fazer "festas no céu" ganhando almas para Cristo?',
      'Se Cristo deu a própria vida por você na cruz, será que é muito dar o melhor do seu tempo e testemunho para Ele?'
    ],
    color: 'from-teal-600 to-teal-800'
  }
];

// =========================================================================
// 2. PLAYBOOK: CURSO DE BATISMO & DISCIPULADO CRISTÃO
// (O QUE JESUS DESEJA QUE VOCÊ FAÇA • TEXTO INTEGRAL • SEM GABARITO • ZERO ÁUDIO)
// =========================================================================
const LESSONS_BATISMO: PageLesson[] = [
  {
    id: 1,
    roman: 'I',
    title: 'LIÇÃO 1',
    badge: 'Como Você Pode Se Tornar Um Crente em Cristo',
    summary: 'A decisão de convidar a Jesus Cristo para fazer parte da sua vida foi a mais importante que você já fez.',
    verses: [
      {
        text: '“Porque todos pecaram e destituídos estão da glória de Deus.”',
        reference: 'Romanos 3:23'
      },
      {
        text: '“Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna por Cristo Jesus nosso Senhor.”',
        reference: 'Romanos 6:23'
      },
      {
        text: '“Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.”',
        reference: 'Romanos 5:8'
      },
      {
        text: '“Porque todo aquele que invocar o nome do Senhor será salvo.”',
        reference: 'Romanos 10:13'
      }
    ],
    textBlocks: [
      'A decisão de convidar a Jesus Cristo para fazer parte de sua vida foi a mais importante que você já fez. Seus pecados estão perdoados. Você é filho de Deus. O céu é sua morada eterna, e Jesus Cristo é o seu Salvador Pessoal.',
      'Deus o ama e quer que sua vida tenha significado e que ela seja abundante no Espírito. Ele deseja lhe dar a vida eterna. Tendo como base o Seu grande amor, Ele providenciou um plano simples e maravilhoso, através do qual você pode alcançar a salvação em Cristo.',
      '1. TODOS PECARAM: Pecar significa violar ou transgredir a lei de Deus. O homem peca quando suas ações, palavras e pensamentos são contrários à Vontade de Deus. A Bíblia afirma que todos os homens, sem exceção, estão em pecado (Romanos 3:23).',
      '2. O PECADO TRAZ A MORTE: Neste versículo (Romanos 6:23) o significado de "morte" não é apenas no sentido físico, mas se refere principalmente à morte espiritual, que separa o homem de Deus. Mas Deus providenciou que o homem pudesse ser salvo através da fé em Jesus Cristo.',
      '3. CRISTO MORREU POR NOSSOS PECADOS: A morte de Cristo na cruz é o alto preço pelo qual são resgatados os pecados dos homens. No entanto, os seus pecados só serão perdoados se você pedir perdão ao Senhor, implorando que Ele venha habitar em sua vida.',
      'SOMENTE CRISTO PODE SALVAR! Todo esforço empreendido pelo homem é insuficiente para alcançar a salvação. Boas obras, honestidade, pertencer a uma igreja ou ser batizado não garantem salvação: somente Cristo pode salvar!',
      '4. SALVO POR CRISTO: Com uma simples oração ao Senhor você receberá a salvação. Suplique a Cristo o perdão e a Sua presença no seu viver diário.'
    ],
    prayer: 'Senhor, reconheço que sou pecador. Creio que morreste por meus pecados e agradeço por este sacrifício. Salva-me e venha habitar na minha vida. Eu quero Te receber como meu Salvador e Senhor para que possas guiar a minha vida. Ajuda-me a fazer a Tua Vontade. Amém.',
    color: 'from-teal-600 to-teal-800'
  },
  {
    id: 2,
    roman: 'II',
    title: 'LIÇÃO 2',
    badge: 'O Que Jesus Deseja Que Você Faça (8 Pontos de Fé)',
    summary: 'Para experimentar a vida abundante (João 10:10), Jesus convida você a segui-lO em amor e obediência (João 14:15).',
    verses: [
      {
        text: '“...eu vim para que tenham vida, e a tenham com abundância.”',
        reference: 'João 10:10'
      },
      {
        text: '“Se me amais, guardareis os meus mandamentos.”',
        reference: 'João 14:15'
      }
    ],
    specialContent: {
      title: 'OS 8 PONTOS QUE JESUS DESEJA QUE VOCÊ CUMPRA',
      items: [
        {
          label: '1. Jesus deseja que você tenha CERTEZA DA SALVAÇÃO (Decorar Romanos 10:13)',
          text: 'Pela promessa de Jesus (João 5:24), porque você invocou a Ele (Romanos 10:13) e pelo testemunho interior do Espírito Santo (Romanos 8:16).'
        },
        {
          label: '2. Jesus deseja que você SEJA BATIZADO (Decorar Mateus 28:19)',
          text: 'O batismo retrata a morte, o sepultamento e a ressurreição de Cristo. É a pública profissão de fé e o primeiro passo na obediência.'
        },
        {
          label: '3. Jesus deseja que você LEIA A BÍBLIA DIARIAMENTE (Decorar 2 Timóteo 3:16-17)',
          text: 'A Palavra de Deus é o seu alimento espiritual essencial para o crescimento (1 Pedro 2:2). Comece pelo Evangelho de João.'
        },
        {
          label: '4. Jesus deseja que você ORE DIARIAMENTE (Decorar Filipenses 4:6-7)',
          text: 'Você tem o privilégio de falar com o Pai em nome de Jesus (João 16:24). Separe um momento a cada dia para estar a sós com Deus.'
        },
        {
          label: '5. Jesus deseja que você seja uma TESTEMUNHA FIEL (Decorar Marcos 5:19)',
          text: 'Como discípulo você é chamado para falar do que Cristo fez em sua vida (Atos 1:8). Fale de Cristo naturalmente aos seus conhecidos.'
        },
        {
          label: '6. Jesus deseja que você CONTRIBUA (Decorar 2 Coríntios 9:7)',
          text: 'Participar no sustento do trabalho do Reino com alegria (1 Coríntios 16:2; Malaquias 3:10). Deus ama ao que dá com alegria!'
        },
        {
          label: '7. Jesus deseja que você DEIXE O ESPÍRITO SANTO GUIAR SUA VIDA (Decorar Efésios 5:18)',
          text: 'O Espírito Santo habita em você (João 14:16-17; Efésios 1:13). Deixe-O encher e conduzir seus pensamentos e atitudes.'
        },
        {
          label: '8. Jesus deseja que você FREQUENTE A IGREJA (Decorar Hebreus 10:24-25)',
          text: 'Não abandone as reuniões! Na igreja você ouve a Palavra, tem comunhão com os irmãos e serve a Cristo em boas obras (Efésios 2:10).'
        }
      ]
    },
    color: 'from-indigo-600 to-indigo-800'
  },
  {
    id: 3,
    roman: 'III',
    title: 'LIÇÃO 3',
    badge: 'Questionário Bíblico: Segurança da Salvação',
    summary: 'Estudo das Escrituras sobre a Certeza Eterna (Para Preenchimento do Aluno • Sem Gabarito).',
    verses: [
      {
        text: '“Crê no Senhor Jesus Cristo e serás salvo, tu e a tua casa.”',
        reference: 'Atos 16:31'
      },
      {
        text: '“As minhas ovelhas ouvem a minha voz; eu as conheço, e elas me seguem. Eu lhes dou a vida eterna, e jamais perecerão, e ninguém as arrebatará da minha mão.”',
        reference: 'João 10:27-28'
      }
    ],
    studyQuestions: [
      {
        question: '1. O que é necessário fazer para ser salvo?',
        ref: 'Atos 16:31',
        linesCount: 3
      },
      {
        question: '2. O que Jesus promete a todos os que o invocam?',
        ref: 'Romanos 10:13',
        linesCount: 2
      },
      {
        question: '3. Que tipo de vida é prometida àqueles que aceitam a Cristo como Salvador?',
        ref: 'João 3:16',
        linesCount: 2
      },
      {
        question: '4. Procure em um dicionário o significado da palavra "eterno" e dê uma breve definição para "vida eterna":',
        ref: 'Dicionário & Bíblia',
        linesCount: 3
      },
      {
        question: '5. O que Jesus promete sobre a sua segurança estando você sob os cuidados dele?',
        ref: 'João 10:27-29',
        linesCount: 3
      },
      {
        question: '6. Nenhum crente vive uma vida sem pecado. Quando você peca o que é preciso fazer para receber o perdão de Deus?',
        ref: '1 João 1:9',
        linesCount: 3
      },
      {
        question: '7. Quem testemunha, juntamente com o seu espírito de que você é filho de Deus?',
        ref: 'Romanos 8:16',
        linesCount: 2
      },
      {
        question: '8. Que promessa Cristo faz em Hebreus 13:5?',
        ref: 'Hebreus 13:5',
        linesCount: 2
      }
    ],
    color: 'from-teal-600 to-teal-800'
  },
  {
    id: 4,
    roman: 'IV',
    title: 'LIÇÃO 4',
    badge: 'Questionário Bíblico: O Batismo',
    summary: 'A ordenança bíblica e o testemunho público nas águas (Para Preenchimento do Aluno • Sem Gabarito).',
    verses: [
      {
        text: '“Então veio Jesus da Galileia ao Jordão ter com João, para ser batizado por ele.”',
        reference: 'Mateus 3:13'
      },
      {
        text: '“Portanto ide, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo...”',
        reference: 'Mateus 28:19'
      }
    ],
    studyQuestions: [
      {
        question: '1. Quem batizou Jesus e onde Ele foi batizado?',
        ref: 'Mateus 3:13-17',
        linesCount: 2
      },
      {
        question: '2. Como Deus Pai e o Espírito Santo mostraram sua aprovação ao batismo de Jesus?',
        ref: 'Mateus 3:16-17',
        linesCount: 3
      },
      {
        question: '3. O que qualifica alguém para o batismo segundo a Bíblia?',
        ref: 'Atos 2:41',
        linesCount: 2
      },
      {
        question: '4. Quando foram as pessoas batizadas, segundo Atos 2:41?',
        ref: 'Atos 2:41',
        linesCount: 2
      },
      {
        question: '5. Leia a conversão do eunuco etíope. O que ele quis fazer imediatamente após crer em Cristo?',
        ref: 'Atos 8:29-40',
        linesCount: 3
      },
      {
        question: '6. O carcereiro de Filipos e sua família foram salvos numa noite. Quando eles foram batizados?',
        ref: 'Atos 16:25-40',
        linesCount: 2
      },
      {
        question: '7. Em Mateus 28:19-20, quais as ordens que Jesus deu em relação a ganhar outros, batizar e ensinar?',
        ref: 'Mateus 28:19-20',
        linesCount: 3
      }
    ],
    color: 'from-sky-600 to-sky-800'
  },
  {
    id: 5,
    roman: 'V',
    title: 'LIÇÃO 5',
    badge: 'Questionário Bíblico: A Bíblia Sagrada',
    summary: 'A Palavra de Deus como regra de fé e prática diária (Para Preenchimento do Aluno • Sem Gabarito).',
    verses: [
      {
        text: '“Lâmpada para os meus pés é tua palavra e luz para o meu caminho.”',
        reference: 'Salmo 119:105'
      },
      {
        text: '“Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça.”',
        reference: '2 Timóteo 3:16'
      }
    ],
    studyQuestions: [
      {
        question: '1. Em que a Bíblia é diferente de todos os outros livros do mundo?',
        ref: '2 Pedro 1:20-21',
        linesCount: 2
      },
      {
        question: '2. Como pode a Palavra de Deus ajudar você em sua vida diária?',
        ref: 'Salmo 119:105',
        linesCount: 2
      },
      {
        question: '3. Como podemos saber que a Palavra de Deus é verdadeira e digna de confiança?',
        ref: '2 Timóteo 3:16',
        linesCount: 2
      },
      {
        question: '4. Por que você deve estudar as Escrituras diariamente?',
        ref: 'Atos 17:11 e 1 Pedro 2:2',
        linesCount: 2
      },
      {
        question: '5. Que instruções Deus dá a você no texto de 2 Timóteo 2:15?',
        ref: '2 Timóteo 2:15',
        linesCount: 2
      },
      {
        question: '6. Por quanto tempo a Palavra de Deus durará?',
        ref: '1 Pedro 1:25',
        linesCount: 2
      },
      {
        question: '7. Quais são as sérias advertências encontradas em Apocalipse 22:18-19 a respeito das Escrituras?',
        ref: 'Apocalipse 22:18-19',
        linesCount: 3
      }
    ],
    color: 'from-amber-600 to-amber-800'
  },
  {
    id: 6,
    roman: 'VI',
    title: 'LIÇÃO 6',
    badge: 'Questionário Bíblico: A Oração',
    summary: 'Comunhão diária com o Pai em nome de Jesus (Para Preenchimento do Aluno • Sem Gabarito).',
    verses: [
      {
        text: '“Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.”',
        reference: 'Filipenses 4:6'
      },
      {
        text: '“Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes.”',
        reference: 'Jeremias 33:3'
      }
    ],
    studyQuestions: [
      {
        question: '1. Qual é o privilégio que você possui agora como crente em Cristo?',
        ref: 'João 16:24',
        linesCount: 2
      },
      {
        question: '2. Que instruções Cristo deu a respeito da vida de oração pessoal no secreto?',
        ref: 'Mateus 6:6',
        linesCount: 2
      },
      {
        question: '3. Qual é a promessa divina para aquele que tem uma vida de oração sincera?',
        ref: 'Jeremias 33:3',
        linesCount: 2
      },
      {
        question: '4. Quando e com que frequência você deve orar?',
        ref: 'Lucas 18:1',
        linesCount: 2
      },
      {
        question: '5. A quem devemos dirigir a nossa oração?',
        ref: 'Lucas 11:2',
        linesCount: 2
      },
      {
        question: '6. Que tipos de necessidades você pode levar a Deus em oração?',
        ref: 'Filipenses 4:6',
        linesCount: 2
      },
      {
        question: '7. Qual a importância de manter um momento especial no início do dia dedicado à oração?',
        ref: 'Salmo 5:1-3',
        linesCount: 2
      },
      {
        question: '8. Por que você deve orar a Deus exclusivamente em nome de Jesus?',
        ref: 'João 14:6 e 1 Timóteo 2:5',
        linesCount: 2
      }
    ],
    color: 'from-rose-600 to-rose-800'
  },
  {
    id: 7,
    roman: 'VII',
    title: 'LIÇÃO 7',
    badge: 'Questionário: Testemunho & Contribuição',
    summary: 'Compartilhando a fé e sustentando a obra de Deus com alegria (Para Preenchimento do Aluno • Sem Gabarito).',
    verses: [
      {
        text: '“Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas...”',
        reference: 'Atos 1:8'
      },
      {
        text: '“Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria.”',
        reference: '2 Coríntios 9:7'
      }
    ],
    studyQuestions: [
      {
        question: '1. O que Jesus quer que cada crente seja no seu viver diário?',
        ref: 'Atos 1:8',
        linesCount: 2
      },
      {
        question: '2. Segundo 1 Pedro 3:15, devemos estar sempre prontos a fazer o quê?',
        ref: '1 Pedro 3:15',
        linesCount: 2
      },
      {
        question: '3. Qual foi a primeira atitude de André logo após encontrar Jesus?',
        ref: 'João 1:40-42',
        linesCount: 2
      },
      {
        question: '4. O que Jesus prometeu fazer por aqueles que O seguem fielmente?',
        ref: 'Mateus 4:19',
        linesCount: 2
      },
      {
        question: '5. A quem Deus deseja salvar segundo 2 Pedro 3:9?',
        ref: '2 Pedro 3:9',
        linesCount: 2
      },
      {
        question: '6. Que aviso solene é dado àqueles que não são fiéis no testemunho?',
        ref: 'Ezequiel 33:7-9',
        linesCount: 2
      },
      {
        question: '7. O que a Bíblia diz a respeito daquela pessoa que ganha almas?',
        ref: 'Provérbios 11:30',
        linesCount: 2
      },
      {
        question: '8. Como deve ser sustentado o trabalho da Igreja de Cristo?',
        ref: '1 Coríntios 16:2; Malaquias 3:10; 2 Coríntios 9:7',
        linesCount: 3
      }
    ],
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'LIÇÃO 8',
    badge: 'Questionário: O Espírito Santo & Seus Frutos',
    summary: 'A Pessoa do Espírito Santo habitando no crente e produzindo Seu Fruto (Para Preenchimento do Aluno • Sem Gabarito).',
    verses: [
      {
        text: '“E eu rogarei ao Pai, e ele vos dará outro Consolador, para que fique convosco para sempre.”',
        reference: 'João 14:16'
      },
      {
        text: '“Mas o fruto do Espírito é: amor, gozo, paz, longanimidade, benignidade, bondade, fé, mansidão, temperança.”',
        reference: 'Gálatas 5:22-23'
      }
    ],
    studyQuestions: [
      {
        question: '1. Depois de salvo, Quem passou a habitar dentro de você?',
        ref: 'Romanos 8:9',
        linesCount: 2
      },
      {
        question: '2. Por quanto tempo o Espírito Santo habitará em sua vida?',
        ref: 'João 14:16',
        linesCount: 2
      },
      {
        question: '3. Quem nos dá a plena certeza interior de que somos filhos de Deus?',
        ref: 'Romanos 8:16',
        linesCount: 2
      },
      {
        question: '4. O que Deus deseja para cada crente no texto de Efésios 5:18?',
        ref: 'Efésios 5:18',
        linesCount: 2
      },
      {
        question: '5. De que maneiras práticas podemos entristecer o Espírito Santo?',
        ref: 'Efésios 4:30-32',
        linesCount: 3
      },
      {
        question: '6. Se o Espírito Santo enche e controla a sua vida, quais são os 9 aspectos do Fruto que Ele produzirá em você?',
        ref: 'Gálatas 5:22-23',
        linesCount: 4
      },
      {
        question: '7. Quem concede poder e ousadia ao crente para testemunhar de Cristo?',
        ref: 'Atos 1:8',
        linesCount: 2
      }
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 9,
    roman: 'IX',
    title: 'LIÇÃO 9',
    badge: 'Questionário Bíblico: A Igreja Local',
    summary: 'O Corpo de Cristo, a família da fé e a Grande Comissão (Para Preenchimento do Aluno • Sem Gabarito).',
    verses: [
      {
        text: '“Ora, vós sois o corpo de Cristo, e seus membros em particular.”',
        reference: '1 Coríntios 12:27'
      },
      {
        text: '“Não deixando a nossa congregação, como é costume de alguns, antes admoestando-nos uns aos outros...”',
        reference: 'Hebreus 10:25'
      }
    ],
    studyQuestions: [
      {
        question: '1. Quem estabeleceu a Igreja e prometeu sustentá-la?',
        ref: 'Mateus 16:18',
        linesCount: 2
      },
      {
        question: '2. Quem é o único cabeça e líder supremo da Igreja?',
        ref: 'Efésios 5:23',
        linesCount: 2
      },
      {
        question: '3. Qual é a atitude de Cristo para com a Igreja?',
        ref: 'Efésios 5:25',
        linesCount: 2
      },
      {
        question: '4. Que alto preço Jesus pagou pela Igreja?',
        ref: 'Atos 20:28',
        linesCount: 2
      },
      {
        question: '5. Segundo Efésios 5:23-27, a relação entre Cristo e a Igreja é comparada a qual união sagrada?',
        ref: 'Efésios 5:23-27',
        linesCount: 2
      },
      {
        question: '6. Qual é a nossa responsabilidade pessoal em relação à frequência e assistência aos cultos?',
        ref: 'Hebreus 10:25',
        linesCount: 2
      },
      {
        question: '7. Como o apóstolo Paulo denomina a Igreja em 1 Coríntios 12:27?',
        ref: '1 Coríntios 12:27',
        linesCount: 2
      },
      {
        question: '8. Quais as maiores responsabilidades deixadas por Cristo à Sua Igreja na terra?',
        ref: 'Mateus 28:19-20',
        linesCount: 3
      }
    ],
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 10,
    roman: 'X',
    title: 'LIÇÃO 10',
    badge: 'Membresia, Testemunho & Vale a Pena Plantar',
    summary: 'Como se unir à igreja local, redigir seu testemunho de fé e o chamado à semeadura missionária.',
    verses: [
      {
        text: '“E Jesus dizia: O reino de Deus é assim como se um homem lançasse semente à terra... e a semente brotasse e crescesse... está chegada a ceifa.”',
        reference: 'Marcos 4:26-29'
      }
    ],
    specialContent: {
      title: 'COMO TORNAR-SE MEMBRO DA IGREJA LOCAL',
      items: [
        {
          label: 'Modo A: Pela Profissão de Fé e Batismo',
          text: 'Para novos convertidos que recebem a Cristo e são batizados por imersão na igreja local.'
        },
        {
          label: 'Modo B: Pela Transferência por Carta',
          text: 'Para crentes batizados procedentes de outra Igreja de mesma fé e ordem.'
        },
        {
          label: 'Modo C: Pela Declaração de Fé',
          text: 'Para irmãos que já foram batizados e cujas cartas não puderam ser obtidas por motivos justificados.'
        }
      ]
    },
    textBlocks: [
      'ESCREVA SEU TESTEMUNHO PESSOAL: O seu testemunho escrito reforçará sua experiência de conversão. Use palavras simples e sentenças curtas. Escreva como se estivesse conversando com alguém que ainda não é crente:\n\n1. Como era minha vida antes de me tornar um crente em Cristo.\n2. Como senti a necessidade de aceitar a Cristo como o meu Salvador.\n3. O que Cristo significa para mim hoje.',
      'VALE A PENA PLANTAR! “E Jesus dizia: O reino de Deus é assim como se um homem lançasse semente à terra... e a semente brotasse e crescesse... primeiro a erva, depois a espiga, e por último o grão cheio na espiga. E quando já o fruto se mostra... está chegada a ceifa” (Marcos 4:26-29).',
      'Os servos de Deus semeiam o ano inteiro por todo o Brasil e pelo mundo. São sementes lançadas nas terras secas do Nordeste, nos pantanais, na selva amazônica, nos pampas do Sul e nos grandes centros urbanos.',
      'São sementes que crescem e produzem frutos — vidas salvas e transformadas pelo amor de Cristo — que nos desafiam a plantar mais, para uma maior colheita. E a colheita é o prêmio, a prova de que no passado, hoje e sempre VALE A PENA PLANTAR!'
    ],
    studyQuestions: [
      {
        question: 'Espaço para Escrever o Seu Testemunho de Fé (Antes, Conversão e Vida com Cristo):',
        linesCount: 5
      }
    ],
    color: 'from-teal-600 to-teal-800'
  }
];

// =========================================================================
// COMPONENTE PRINCIPAL PLAYBOOK (SOMENTE TEXTO • ZERO ÁUDIO • SEM GABARITO)
// =========================================================================
export const PlayBookView: React.FC = () => {
  const [currentCourse, setCurrentCourse] = useState<'salvacao' | 'batismo'>('salvacao');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [copiedText, setCopiedText] = useState(false);
  const [copiedPrayer, setCopiedPrayer] = useState(false);

  const activeLessons = currentCourse === 'salvacao' ? LESSONS_SALVACAO : LESSONS_BATISMO;
  const totalPages = activeLessons.length + 2; // Capa (0) + Lições (1..N) + Conclusão (N+1)

  const currentLesson = currentPage >= 1 && currentPage <= activeLessons.length 
    ? activeLessons[currentPage - 1] 
    : null;

  const handleCourseChange = (course: 'salvacao' | 'batismo') => {
    setCurrentCourse(course);
    setCurrentPage(0);
  };

  // Navegação por teclado (Setas)
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

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  const handleCopyPrayer = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedPrayer(true);
    setTimeout(() => setCopiedPrayer(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'large':
        return 'text-base sm:text-lg';
      case 'xlarge':
        return 'text-lg sm:text-xl';
      default:
        return 'text-sm sm:text-base';
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn pb-16">
      
      {/* Top Banner do Playbook (Tema Claro com Fundo Branco • Sem Áudio) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <BookOpen size={14} className="text-teal-600 dark:text-teal-400" />
            Playbook de Campo & Leitura Integral
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {currentCourse === 'salvacao' ? 'Playbook: As 8 Lições da Certeza da Salvação' : 'Playbook: Curso de Batismo & Discipulado'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {currentCourse === 'salvacao' 
              ? 'Texto completo e integral dividido por lições com versículos, ilustrações teológicas, perguntas para reflexão e oração de entrega (sem respostas pré-escritas).'
              : 'Manual completo: O Que Jesus Deseja Que Você Faça, dividido em lições com os 8 pontos de fé, questionários bíblicos com linhas de preenchimento do aluno (sem respostas) e orientações de membresia.'}
          </p>
        </div>

        {/* Seletor de Curso / Playbook */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shrink-0">
          <button
            type="button"
            onClick={() => handleCourseChange('salvacao')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentCourse === 'salvacao'
                ? 'bg-teal-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Flame size={14} /> 8 Lições da Salvação
          </button>
          <button
            type="button"
            onClick={() => handleCourseChange('batismo')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
              currentCourse === 'batismo'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award size={14} /> Batismo & Discipulado (10 Lições)
          </button>
        </div>
      </div>

      {/* Barra de Ferramentas de Leitura (Navegação, Zoom, Tamanho de Fonte, Imprimir, Download) */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* Paginação Anterior / Próxima */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
            disabled={currentPage === 0}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-600 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-800 disabled:hover:text-slate-700 transition-colors"
            title="Página Anterior (Seta Esquerda)"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-xs sm:text-sm font-semibold text-slate-700 dark:text-slate-300 px-2">
            Página <span className="text-teal-600 dark:text-teal-400 font-bold">{currentPage + 1}</span> de {totalPages}
          </span>

          <button
            type="button"
            onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-600 hover:text-white disabled:opacity-40 disabled:hover:bg-slate-100 dark:disabled:hover:bg-slate-800 disabled:hover:text-slate-700 transition-colors"
            title="Próxima Página (Seta Direita)"
          >
            <ChevronRight size={18} />
          </button>
        </div>

        {/* Seletor Rápido de Lições (Pílulas Numéricas) */}
        <div className="flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none">
          <button
            type="button"
            onClick={() => setCurrentPage(0)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentPage === 0
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Capa
          </button>

          {activeLessons.map((l, idx) => (
            <button
              key={l.id}
              type="button"
              onClick={() => setCurrentPage(idx + 1)}
              className={`w-8 h-8 rounded-xl text-xs font-extrabold transition-all flex items-center justify-center ${
                currentPage === idx + 1
                  ? 'bg-teal-600 text-white shadow-sm scale-105'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
              title={l.title}
            >
              {l.roman}
            </button>
          ))}

          <button
            type="button"
            onClick={() => setCurrentPage(totalPages - 1)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              currentPage === totalPages - 1
                ? 'bg-teal-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Conclusão
          </button>
        </div>

        {/* Controles Visuais: Tamanho da Fonte, Zoom e Impressão */}
        <div className="flex items-center gap-3">
          {/* Tamanho da Fonte */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setFontSize('normal')}
              className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                fontSize === 'normal' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Fonte Normal"
            >
              A
            </button>
            <button
              type="button"
              onClick={() => setFontSize('large')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                fontSize === 'large' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Fonte Grande"
            >
              A+
            </button>
            <button
              type="button"
              onClick={() => setFontSize('xlarge')}
              className={`px-2.5 py-1 rounded-lg text-xs font-extrabold ${
                fontSize === 'xlarge' ? 'bg-white dark:bg-slate-900 text-teal-600 shadow-sm' : 'text-slate-500'
              }`}
              title="Fonte Muito Grande"
            >
              A++
            </button>
          </div>

          {/* Zoom */}
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.max(z - 10, 80))}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-600 transition-colors"
              title="Diminuir Zoom"
            >
              <ZoomOut size={16} />
            </button>
            <span className="text-xs font-mono text-slate-500 w-12 text-center">{zoomLevel}%</span>
            <button
              type="button"
              onClick={() => setZoomLevel((z) => Math.min(z + 10, 130))}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-600 transition-colors"
              title="Aumentar Zoom"
            >
              <ZoomIn size={16} />
            </button>
            <button
              type="button"
              onClick={() => setZoomLevel(100)}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-600 transition-colors"
              title="Redefinir Zoom"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          {/* Imprimir Página */}
          <button
            type="button"
            onClick={handlePrint}
            className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-teal-600 transition-colors"
            title="Imprimir Conteúdo"
          >
            <Printer size={16} />
          </button>

          {/* Baixar PDF Oficial Completo */}
          <a
            href="/downloads/Manual_Oficial_Evangelismo_e_Discipulado.pdf"
            download="Manual_Oficial_Evangelismo_e_Discipulado.pdf"
            className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
            title="Baixar Manual Oficial em PDF Completo"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Baixar PDF Completo</span>
          </a>
        </div>

      </div>

      {/* Área Central de Leitura do Playbook (Texto Integral • Sem Áudio) */}
      <div 
        className="max-w-4xl mx-auto transition-transform duration-200"
        style={{ transform: `scale(${zoomLevel / 100})`, transformOrigin: 'top center' }}
      >
        {/* =========================================================================
            PÁGINA 0: CAPA DO PLAYBOOK
            ========================================================================= */}
        {currentPage === 0 && (
          <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white rounded-3xl p-8 sm:p-14 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 text-center relative overflow-hidden animate-scaleUp">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold">
              <Sparkles size={14} className="text-amber-500" />
              {currentCourse === 'salvacao' ? 'Manual Oficial do Evangelizador' : 'Manual Oficial de Batismo & Discipulado'}
            </div>

            {/* Logo Oficial */}
            <div className="w-24 h-24 sm:w-32 sm:h-32 mx-auto rounded-3xl overflow-hidden shadow-xl bg-teal-700 p-1 flex items-center justify-center">
              <img
                src="/pwa-512x512.png"
                alt="Logo Oficial"
                className="w-full h-full object-cover rounded-2xl"
              />
            </div>

            <div className="space-y-4 max-w-2xl mx-auto">
              <h2 className="font-heading font-black text-3xl sm:text-5xl tracking-tight leading-tight text-slate-900 dark:text-white">
                {currentCourse === 'salvacao' ? (
                  <>A Certeza da <span className="text-teal-600 dark:text-teal-400">Salvação</span></>
                ) : (
                  <>Curso de Batismo & <span className="text-indigo-600 dark:text-indigo-400">Discipulado</span></>
                )}
              </h2>
              
              <div className="p-5 rounded-2xl bg-teal-50/70 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-800 text-teal-900 dark:text-teal-200 font-serif italic text-base sm:text-lg leading-relaxed">
                “COMEÇAMOS ESSE ESTUDO COM A PERGUNTA MAIS IMPORTANTE DA SUA VIDA: Se você morresse agora, teria plena certeza da sua salvação? Estas lições foram escritas para ajudar você a refletir e tirar suas próprias conclusões.”
              </div>

              <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300">
                Ministrado e estruturado pelo <strong className="text-slate-900 dark:text-white">Pr. Roberto Rodrigues Casas</strong>
              </p>
            </div>

            {/* Grid dos 3 Pilares */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 text-left">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400">1. Fundamento Bíblico</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">Texto completo e fiel às Escrituras, sem opiniões humanas.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">2. Reflexão do Aluno</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">Perguntas reflexivas e linhas para preenchimento do próprio leitor.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">3. Sem Gabarito</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">Sem respostas prévias: incentivo ao estudo pessoal e à pesquisa na Bíblia.</p>
              </div>
            </div>

            {/* Botões de Início e Download do PDF */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setCurrentPage(1)}
                className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm sm:text-base shadow-xl shadow-teal-600/30 transition-all hover:scale-105 active:scale-95"
              >
                Abrir Playbook & Iniciar Leitura <ArrowRight size={18} />
              </button>

              <a
                href="/downloads/Manual_Oficial_Evangelismo_e_Discipulado.pdf"
                download="Manual_Oficial_Evangelismo_e_Discipulado.pdf"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-bold text-sm sm:text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all hover:scale-105"
              >
                <Download size={18} className="text-teal-600" />
                Baixar Manual Completo em PDF
              </a>
            </div>

          </div>
        )}

        {/* =========================================================================
            PÁGINAS 1..N: LIÇÕES INTEGRAIS EM TEXTO PURO (SEM ÁUDIO • SEM RESPOSTAS)
            ========================================================================= */}
        {currentLesson && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 animate-fadeIn">
            
            {/* Cabeçalho da Lição */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2.5">
                  <span className={`px-3 py-1 rounded-full text-xs font-extrabold text-white bg-gradient-to-r ${currentLesson.color} shadow-sm`}>
                    {currentLesson.roman}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {currentLesson.title}
                  </span>
                </div>
                <h3 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
                  {currentLesson.badge}
                </h3>
              </div>

              {/* Botão Copiar Texto da Lição */}
              <button
                type="button"
                onClick={() => {
                  const versesText = currentLesson.verses.map(v => `${v.text} (${v.reference})`).join('\n');
                  const full = `${currentLesson.title} - ${currentLesson.badge}\n\nVERSÍCULOS:\n${versesText}`;
                  handleCopyText(full);
                }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-teal-600 hover:text-white text-xs font-bold transition-all shrink-0"
                title="Copiar texto da lição para área de transferência"
              >
                {copiedText ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
                <span>{copiedText ? 'Copiado!' : 'Copiar Lição'}</span>
              </button>
            </div>

            {/* Pergunta de Reflexão Inicial */}
            {currentLesson.reflectionQuestion && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 flex items-start gap-3">
                <HelpCircle size={20} className="text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-700 dark:text-amber-300 block">
                    Pergunta para Reflexão
                  </span>
                  <p className={`font-semibold text-slate-900 dark:text-amber-100 ${getFontSizeClass()}`}>
                    {currentLesson.reflectionQuestion}
                  </p>
                </div>
              </div>
            )}

            {/* Versículos Bíblicos */}
            {currentLesson.verses && currentLesson.verses.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                  <Bookmark size={14} /> Fundamento Bíblico & Versículos-Chave
                </h4>
                <div className="space-y-3">
                  {currentLesson.verses.map((v, i) => (
                    <div 
                      key={i}
                      className="p-4 sm:p-5 rounded-2xl bg-teal-50/60 dark:bg-teal-950/30 border-l-4 border-teal-500 border-t border-r border-b border-teal-200/60 dark:border-teal-900/40 space-y-2"
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
            )}

            {/* Blocos de Texto Explicativo Integral (Quando Houver) */}
            {currentLesson.textBlocks && currentLesson.textBlocks.length > 0 && (
              <div className="space-y-3">
                <div className="space-y-3">
                  {currentLesson.textBlocks.map((block, i) => (
                    <div 
                      key={i} 
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                    >
                      <p className={`text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-line ${getFontSizeClass()}`}>
                        {block}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Conteúdo Especial / Ilustrações teológicas */}
            {currentLesson.specialContent && (
              <div className="p-6 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-4">
                <div className="font-bold text-amber-800 dark:text-amber-300 text-xs uppercase tracking-wider flex items-center gap-2">
                  <Sparkles size={16} /> {currentLesson.specialContent.title}
                </div>
                <div className="space-y-4">
                  {currentLesson.specialContent.items.map((item, i) => (
                    <div key={i} className="p-4 rounded-xl bg-white dark:bg-slate-900/80 border border-amber-200/60 dark:border-amber-900/30 space-y-1.5">
                      <div className="font-bold text-sm text-amber-900 dark:text-amber-200">
                        {item.label}
                      </div>
                      <p className={`text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line ${getFontSizeClass()}`}>
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Perguntas de Reflexão Sim / Não (Formato do Estudo Bíblico Original • Sem Gabarito) */}
            {currentLesson.simNaoQuestions && currentLesson.simNaoQuestions.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
                  <CheckSquare size={14} /> Marque SIM (S) ou NÃO (N) para Reflexão
                </h4>
                <div className="space-y-2.5">
                  {currentLesson.simNaoQuestions.map((qText, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex items-start gap-3"
                    >
                      <span className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-mono text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                        {i + 1}
                      </span>
                      <div className="space-y-2 flex-1">
                        <p className={`text-slate-800 dark:text-slate-200 leading-relaxed font-medium ${getFontSizeClass()}`}>
                          {qText}
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                          <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                            ( &nbsp;&nbsp;&nbsp; ) SIM (S)
                          </span>
                          <span className="px-3 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300">
                            ( &nbsp;&nbsp;&nbsp; ) NÃO (N)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Questionário Bíblico para Estudo do Discípulo (SEM AS RESPOSTAS • LINHAS PARA PREENCHIMENTO) */}
            {currentLesson.studyQuestions && currentLesson.studyQuestions.length > 0 && (
              <div className="space-y-4 pt-2">
                <div className="flex items-center justify-between border-b border-indigo-100 dark:border-indigo-900/40 pb-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                    <PenTool size={14} /> Questionário de Fixação do Aluno (Pesquise na Bíblia e Preencha)
                  </h4>
                  <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
                    Sem gabarito pré-escrito
                  </span>
                </div>

                <div className="space-y-4">
                  {currentLesson.studyQuestions.map((sq, i) => (
                    <div 
                      key={i}
                      className="p-5 rounded-2xl bg-indigo-50/40 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        <h5 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                          {sq.question}
                        </h5>
                        {sq.ref && (
                          <span className="text-[11px] font-bold px-2.5 py-1 rounded-lg bg-indigo-100 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-200 font-mono shrink-0 self-start sm:self-auto">
                            {sq.ref}
                          </span>
                        )}
                      </div>

                      {/* Linhas Pontilhadas para o Aluno Escrever a Resposta */}
                      <div className="pt-2 space-y-3">
                        {Array.from({ length: sq.linesCount || 2 }).map((_, lineIdx) => (
                          <div key={lineIdx} className="flex items-center gap-2 text-xs text-slate-400">
                            {lineIdx === 0 && <span className="font-bold font-mono text-indigo-600 dark:text-indigo-400">R:</span>}
                            <div className="flex-1 border-b-2 border-dashed border-indigo-200 dark:border-indigo-800/80 h-3"></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Oração de Decisão / Confissão Completa */}
            {currentLesson.prayer && (
              <div className="p-6 rounded-2xl bg-teal-50/70 dark:bg-teal-950/40 border-2 border-teal-500/40 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-800 dark:text-teal-300 flex items-center gap-1.5">
                    <Heart size={16} className="text-rose-500" /> Oração de Confissão da Salvação
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopyPrayer(currentLesson.prayer!)}
                    className="flex items-center gap-1 text-xs font-bold text-teal-700 dark:text-teal-300 hover:text-teal-900 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-xl border border-teal-200 dark:border-teal-800 transition-colors shadow-xs"
                  >
                    {copiedPrayer ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                    <span>{copiedPrayer ? 'Copiada!' : 'Copiar Oração'}</span>
                  </button>
                </div>
                <p className="font-serif italic text-sm sm:text-base text-teal-950 dark:text-teal-100 leading-relaxed bg-white/80 dark:bg-slate-900/80 p-5 rounded-2xl border border-teal-200/80 dark:border-teal-900/60">
                  “{currentLesson.prayer}”
                </p>
              </div>
            )}

            {/* Navegação de Rodapé */}
            <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-800">
              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.max(p - 1, 0))}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              >
                <ChevronLeft size={16} /> Anterior
              </button>

              <button
                type="button"
                onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages - 1))}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md shadow-teal-600/20 transition-all hover:scale-105"
              >
                Próxima Lição <ChevronRight size={16} />
              </button>
            </div>

          </div>
        )}

        {/* =========================================================================
            PÁGINA FINAL: CONCLUSÃO DO PLAYBOOK
            ========================================================================= */}
        {currentPage === totalPages - 1 && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 sm:p-12 border border-slate-200 dark:border-slate-800 shadow-xl space-y-8 text-center animate-scaleUp">
            
            <div className="w-20 h-20 mx-auto rounded-3xl bg-teal-600 text-white flex items-center justify-center shadow-xl shadow-teal-600/30">
              <Award size={40} />
            </div>

            <div className="space-y-3 max-w-xl mx-auto">
              <h3 className="font-heading font-black text-2xl sm:text-4xl text-slate-900 dark:text-white leading-tight">
                Parabéns pelo Estudo Concluído!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentCourse === 'salvacao'
                  ? 'Você concluiu a leitura das 8 Lições da Certeza da Salvação. Agora você está apto e capacitado para evangelizar com firmeza, clareza e fidelidade às Sagradas Escrituras!'
                  : 'Você completou o Manual de Batismo & Discipulado Cristão (O Que Jesus Deseja Que Você Faça). Que a sua vida seja um testemunho vivo do amor de Cristo!'}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800 text-xs sm:text-sm text-teal-900 dark:text-teal-300 font-serif italic max-w-lg mx-auto">
              “Quão formosos sobre os montes são os pés dos que anunciam as boas-novas, dos que anunciam a salvação!” — Isaías 52:7
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setCurrentPage(0)}
                className="px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold text-xs hover:bg-slate-200 transition-colors"
              >
                Voltar à Capa
              </button>
              <button
                type="button"
                onClick={() => handleCourseChange(currentCourse === 'salvacao' ? 'batismo' : 'salvacao')}
                className="px-6 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs shadow-md transition-all hover:scale-105"
              >
                {currentCourse === 'salvacao' ? 'Ler Curso de Batismo →' : 'Ler 8 Lições da Salvação →'}
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
