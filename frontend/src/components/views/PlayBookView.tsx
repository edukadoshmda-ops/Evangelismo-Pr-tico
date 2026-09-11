import React, { useState, useEffect } from 'react';
import { 
  BookOpen, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  RotateCcw, Copy, Check, Heart, 
  CheckCircle2, ArrowRight, Bookmark,
  Award, Flame, HelpCircle, Sparkles, CheckSquare,
  Printer, Download
} from 'lucide-react';

// --- INTERFACES DO PLAYBOOK (TEXTO INTEGRAL SEM ÁUDIO) ---
interface BibleVerse {
  text: string;
  reference: string;
}

interface SectionItem {
  subtitle: string;
  content: string[];
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
  explanation: string[];
  specialContent?: {
    title: string;
    items: { label: string; text: string }[];
  };
  prayer?: string;
  questionsAndAnswers?: { question: string; ref: string; answer: string }[];
  personalApplications?: string[];
  sections?: SectionItem[];
  color: string;
}

// =========================================================================
// 1. PLAYBOOK: AS 8 RESPOSTAS BÍBLICAS (A CERTEZA DA SALVAÇÃO)
// TEXTO COMPLETO E INTEGRAL CONFORME ENVIADO PELO USUÁRIO
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
      'Se a vida eterna vem de Deus e Ele decidiu oferecê-la aos pecadores, você acha que existem pessoas dizendo que ninguém pode ser salvo por Deus?',
      'Se Deus já deu a vida eterna há mais de 2.000 anos, você acha que existem pessoas mal informadas que pensam que a salvação só será definida no juízo final?',
      'Se João estava vivo, e as pessoas para quem ele escreveu também estavam vivas, você acha que existem pessoas dizendo que só podemos saber se somos salvos depois da morte?',
      'Se Deus deu a vida eterna, fica claro que é das mãos de Deus que a recebemos. Você acha que existem muitas pessoas enganadas pensando que são salvas porque frequentam uma religião, fazem parte de uma igreja, foram batizadas quando crianças ou guardam mandamentos?',
      'Se Deus diz que a vida eterna é nossa por meio de Jesus, você acha que existem pessoas que podem ser salvas por outros meios (religião, boas obras, nunca fazer mal a ninguém ou reencarnação)?',
      'Se Deus diz que quem tem o Filho de Deus como seu Salvador tem a vida eterna, você acha que existem pessoas contradizendo Deus e dizendo que ninguém pode ter certeza da salvação?',
      'Se João escreveu para que saibamos que temos a vida eterna, você acha que existem pessoas dizendo que ele estava mentindo e que a Bíblia registra uma mentira?',
      'Se Jesus diz: "Quem ouve a minha Palavra e crê tem a vida eterna, não entra em condenação e passou da morte para a vida", você acha que existem pessoas que não acreditam em Jesus e continuam em dúvida?'
    ],
    explanation: [
      '1ª Resposta de Deus: A salvação foi concedida por iniciativa de Deus e está exclusivamente no Seu Filho Jesus Cristo (1 João 5:11).',
      '2ª Resposta de Deus: Quem tem o Filho tem a vida agora. A salvação não é uma conquista humana, mas uma herança garantida em Cristo (1 João 5:12).',
      '3ª Resposta de Deus: A Bíblia foi escrita para que nós TENHAMOS PLENA CERTEZA hoje, e não vivamos em dúvida até a morte (1 João 5:13).',
      '4ª Resposta de Deus: A pregação da cruz é poder de Deus para nós que somos salvos. Não é loucura, é a verdade eterna (1 Coríntios 1:18).',
      '5ª Resposta de Deus: No momento exato em que a pessoa crê em Jesus, ela não entra em juízo futuro, pois Cristo já pagou todo o preço na cruz (João 5:24).'
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
      'Se Deus ama você e enviou Jesus para que você não pereça, você acha que muitas pessoas estão morrendo sem salvação porque não acreditam que Deus as ama, apesar dos seus erros e pecados?',
      'Se a Bíblia afirma que Deus quer que você tenha a vida eterna mesmo sendo pecador, você acha que existem pessoas pensando: "Eu não mereço a salvação"?',
      'Se Deus prova que ama você ao permitir que Cristo morresse em seu lugar na cruz há mais de 2.000 anos, você acha que existem pessoas dizendo que a morte de Jesus não é suficiente para salvá-las?'
    ],
    explanation: [
      'O amor de Deus tomou a iniciativa antes de qualquer atitude nossa. Deus não nos ama porque somos bons; Ele nos ama porque Ele é amor.',
      'Deus ofereceu o Seu maior tesouro — Seu Filho unigênito — para morrer em nosso lugar.',
      'A prova definitiva do amor de Deus não é um sentimento, mas um fato histórico consumado na cruz do Calvário.'
    ],
    color: 'from-rose-500 to-rose-700'
  },
  {
    id: 3,
    roman: 'III',
    title: 'TERCEIRA LIÇÃO',
    badge: 'A Condição do Homem Pecador',
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
      'Você acha que existem pessoas dizendo que não cometeram um pecado tão grave e, por isso, acham que não precisam de salvação?',
      'Você reconhece que, diante da santidade perfeita de Deus, nenhum ser humano pode se salvar por suas próprias forças?'
    ],
    explanation: [
      'Pecado significa errar o alvo da santidade e justiça de Deus.',
      'Não existe "pecadinho" ou "pecadão" que não nos separe de Deus: todos nós necessitamos desesperadamente da graça redentora.',
      'Reconhecer que somos pecadores é a chave que abre a porta para a salvação em Jesus.'
    ],
    color: 'from-orange-500 to-orange-700'
  },
  {
    id: 4,
    roman: 'IV',
    title: 'QUARTA LIÇÃO',
    badge: 'A Morte Eterna & As Três Separações',
    summary: 'Morte na Bíblia significa separação: Espiritual, Física e Eterna.',
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
      title: 'PRESTE ATENÇÃO PARA NÃO ERRAR — AS TRÊS ETAPAS DA MORTE',
      items: [
        {
          label: '1ª Etapa: Morte Espiritual (Separação Espiritual)',
          text: 'Quando Adão pecou, ele não caiu morto fisicamente no mesmo instante; continuou vivo. O que morreu então? A comunhão e o relacionamento íntimo com Deus foram rompidos! Por isso, todos os pecadores nascem espiritualmente mortos, separados de Deus e dominados pelo pecado.'
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
      'Você entendeu com clareza o que é morte espiritual (separação da comunhão com Deus logo após o pecado)?',
      'Se Jesus mostra que aquele que morre salvo vai direto para junto de Deus sem aguardar o juízo final para saber seu destino, você acha que pessoas pensam erradamente que só saberão se foram salvas no juízo?',
      'Você já falou para os seus familiares e entes queridos sobre a realidade do inferno e da salvação eterna?'
    ],
    explanation: [
      'A pessoa que não entende o que é morte na Bíblia também terá dificuldade para entender a salvação.',
      'O rico em Lucas 16 suplicou a Abraão que enviasse alguém à casa de seu pai para avisar seus irmãos para não irem àquele lugar de dor.',
      'Todo salvo que entende a morte eterna não perde tempo: aproveita cada dia para anunciar o Evangelho à sua família e amigos!'
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 5,
    roman: 'V',
    title: 'QUINTA LIÇÃO',
    badge: 'A Solução de Deus para a Salvação',
    summary: 'As 3 Ilustrações Teológicas Centrais: A AIDS, A Camisa e o Cordeiro da Páscoa.',
    reflectionQuestion: 'Quem tem a solução para salvar: Deus ou a religião?',
    verses: [
      {
        text: '“Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.”',
        reference: 'Romanos 5:8'
      },
      {
        text: '“Porque Cristo, nossa páscoa, foi sacrificado por nós.”',
        reference: '1 Coríntios 5:7'
      }
    ],
    specialContent: {
      title: 'AS TRÊS ILUSTRAÇÕES QUE EXPLICAM O PAPEL DO CORPO E DO SANGUE',
      items: [
        {
          label: '1ª Ilustração: A AIDS (Pecado perdoado vs Pena paga)',
          text: 'Se uma pessoa contrair uma doença grave como a AIDS em decorrência de um pecado, ao se arrepender ela recebe o perdão da sua alma, mas a consequência física permanece. Da mesma forma, morte só se paga com morte! O pecado é purificado pelo sangue de Cristo, mas a pena de morte eterna teve que ser paga pelo corpo de Jesus morto na cruz em nosso lugar!'
        },
        {
          label: '2ª Ilustração: A Camisa (Paga uma vez, lavada muitas vezes)',
          text: 'Quando você compra uma camisa na loja, você paga por ela uma única vez, mas a lava muitas vezes. A camisa pertence a você porque foi paga, e não porque foi lavada! Assim também: Cristo pagou a nossa pena de morte uma vez para sempre na cruz, e continua nos purificando dia a dia com Seu sangue.'
        },
        {
          label: '3ª Ilustração: O Cordeiro da Páscoa (Substituição e Sangue Protetor)',
          text: 'No Egito, o primogênito estava condenado à morte, mas Deus providenciou um cordeiro que morreu no lugar dele ao entardecer do dia 14. O sangue foi passado nos umbrais das portas e o anjo da morte não pôde tocar no primogênito. Na Ceia, Jesus tomou o pão e disse: "Este é o meu corpo oferecido por vós" (pagou a pena). Tomou o cálice: "Este é o meu sangue derramado para remissão de pecados" (perdoou a culpa).'
        }
      ]
    },
    simNaoQuestions: [
      'Você consegue ver a diferença bíblica entre pecado (perdoado pelo sangue) e pena de morte (paga pelo corpo de Jesus na cruz)?',
      'Você compreendeu a ilustração da camisa comprada uma vez e lavada muitas vezes em relação ao sacrifício de Cristo?',
      'Você compreendeu o papel do Cordeiro da Páscoa que morreu no lugar do primogênito para livrá-lo da morte?',
      'Você entende que na Ceia o pão representa o corpo de Cristo sacrificado e o cálice representa o sangue que purifica os nossos pecados?'
    ],
    explanation: [
      'Somente uma vida pura e inocente poderia pagar a pena de morte da humanidade condenada.',
      'A cruz de Cristo resolveu tanto a condenação da pena quanto a culpa do pecado.',
      'Nenhum ritual, esforço próprio ou religião pode pagar o que Jesus já pagou de forma perfeita e completa!'
    ],
    color: 'from-teal-600 to-teal-800'
  },
  {
    id: 6,
    roman: 'VI',
    title: 'SEXTA LIÇÃO',
    badge: 'Como Receber a Salvação Bíblica',
    summary: 'A confissão de fé com a boca, a crença sincera com o coração e a oração de entrega.',
    reflectionQuestion: 'Qual é o momento exato em que a pessoa passa a ser salva: no momento em que confessa ou no juízo final?',
    verses: [
      {
        text: '“A saber: Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo. Visto que com o coração se crê para a justiça, e com a boca se faz confissão para a salvação.”',
        reference: 'Romanos 10:9-10'
      },
      {
        text: '“Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome.”',
        reference: 'João 1:12'
      },
      {
        text: '“Quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida.”',
        reference: 'João 5:24'
      }
    ],
    simNaoQuestions: [
      'Se a Bíblia orienta que devemos crer com o coração e confessar com a boca que Jesus morreu em nosso lugar e ressuscitou, você concorda que a salvação é recebida no momento da fé sincera?',
      'Se Jesus disse que todos os que O recebem se tornam filhos de Deus, você acha que existem pessoas que ainda não compreendem esse poder?',
      'Se Jesus garante que quem crê NÃO entra em condenação e já passou da morte para a vida, você crê que Ele te salvou?'
    ],
    prayer: 'Senhor Deus, eu sei que o Senhor me ama, mas tenho consciência de que já pequei e que estou condenado à morte eterna. Reconheço que o Senhor enviou Jesus para me salvar. Por isso, reconheço que Jesus é o Teu Filho bendito, que foi levantado na cruz para morrer em meu lugar. Pela fé, entrego a Ti a minha vida e reconheço que Jesus tomou sobre Si a minha pena. Muito obrigado, porque, quando o Senhor morreu, pagou a minha pena; quando derramou o Seu sangue, providenciou a purificação dos meus pecados. Quando ressuscitou e se assentou à direita do Pai, o Senhor enviou o Espírito Santo. Por isso, pelas Tuas mãos, recebo o Espírito Santo como o selo da minha salvação eterna. Amém!',
    explanation: [
      'Cristo morreu como nosso Cordeiro na cruz e ressuscitou como nosso Sumo Sacerdote diante do Pai.',
      'A salvação é instantânea na conversão sincera e eterna na segurança da graça divina.',
      'Faça a oração com sinceridade de coração e Deus cumprirá com fidelidade cada uma de Suas promessas!'
    ],
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 7,
    roman: 'VII',
    title: 'SÉTIMA LIÇÃO',
    badge: 'A Avaliação da Salvação Bíblica',
    summary: 'Apolo em Éfeso e a importância de declarar perfeitamente o Evangelho.',
    reflectionQuestion: 'É possível avaliar a salvação de uma pessoa para saber se ela realmente entendeu a salvação?',
    verses: [
      {
        text: '“Recebestes vós o Espírito Santo quando crestes?”',
        reference: 'Atos 19:2'
      },
      {
        text: '“Chegou a Éfeso um judeu chamado Apolo, eloquente e poderoso nas Escrituras. Este era instruído no caminho do Senhor e falava com fervor, conhecendo somente o batismo de João. Mas Priscila e Áquila o ouviram e lhe declararam mais precisamente o caminho de Deus.”',
        reference: 'Atos 18:24-26'
      }
    ],
    simNaoQuestions: [
      'Se você morresse agora, você teria plena certeza da sua salvação?',
      'Alguém já avaliou biblicamente a sua salvação com base nas Escrituras?',
      'Você compreende o exemplo de Apolo, que era instruído e zeloso, mas precisou que Priscila e Áquila lhe ensinassem com mais precisão a salvação em Cristo?'
    ],
    explanation: [
      'Muitas pessoas religiosas são sinceras, mas nunca ouviram a explicação bíblica completa da cruz de Cristo.',
      'Avaliar a fé não é condenar ninguém, mas ajudar a pessoa a fundamentar a certeza do seu destino eterno.',
      'Priscila e Áquila mostraram a Apolo o caminho com exatidão — e esse mesmo ensino transforma vidas hoje.'
    ],
    color: 'from-sky-600 to-sky-800'
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'OITAVA LIÇÃO',
    badge: 'Discipulado & A Grande Comissão',
    summary: 'Fazer discípulos de todas as nações e multiplicar as Boas Novas da Salvação.',
    reflectionQuestion: 'Qual é o chamado de todo aquele que foi salvo por Jesus?',
    verses: [
      {
        text: '“Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo; ensinando-os a guardar todas as coisas que vos tenho ordenado.”',
        reference: 'Mateus 28:19-20'
      },
      {
        text: '“Quão formosos sobre os montes são os pés dos que anunciam as boas-novas, dos que anunciam a salvação!”',
        reference: 'Isaías 52:7'
      },
      {
        text: '“E disse-lhes: Ide por todo o mundo e pregai o evangelho a toda criatura.”',
        reference: 'Marcos 16:15'
      }
    ],
    simNaoQuestions: [
      'Você aceita a missão que Jesus deu de compartilhar este estudo bíblico com outras pessoas?',
      'Você deseja ver sua família, parentes e amigos alcançados pela certeza da salvação?',
      'Você está pronto para avançar no discipulado e se preparar para o batismo e serviço na igreja?'
    ],
    explanation: [
      'Somos salvos para servir e fomos alcançados para alcançar outros.',
      'Fazer discípulos é ensinar o que Jesus ensinou, acompanhando o novo crente com amor e compromisso.',
      'A colheita é grande e o Senhor da seara conta com cada um de nós para semear a semente da Palavra!'
    ],
    color: 'from-indigo-600 to-indigo-800'
  }
];

// =========================================================================
// 2. PLAYBOOK: CURSO DE BATISMO & DISCIPULADO CRISTÃO
// (O QUE JESUS DESEJA QUE VOCÊ FAÇA — TEXTO COMPLETO E INTEGRAL)
// =========================================================================
const LESSONS_BATISMO: PageLesson[] = [
  {
    id: 1,
    roman: 'I',
    title: 'MÓDULO I',
    badge: 'Segurança da Salvação',
    summary: 'O Que Jesus Deseja Que Você Faça — A Base Inabalável da Vida Cristã.',
    verses: [
      {
        text: '“Crê no Senhor Jesus Cristo e serás salvo, tu e a tua casa.”',
        reference: 'Atos 16:31'
      },
      {
        text: '“Porque todo aquele que invocar o nome do Senhor será salvo.”',
        reference: 'Romanos 10:13'
      },
      {
        text: '“Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.”',
        reference: 'João 3:16'
      },
      {
        text: '“As minhas ovelhas ouvem a minha voz; eu as conheço, e elas me seguem. Eu lhes dou a vida eterna, e jamais perecerão, e ninguém as arrebatará da minha mão.”',
        reference: 'João 10:27-29'
      },
      {
        text: '“Se confessarmos os nossos pecados, ele é fiel e justo para nos perdoar os pecados e nos purificar de toda injustiça.”',
        reference: '1 João 1:9'
      },
      {
        text: '“O próprio Espírito testifica com o nosso espírito que somos filhos de Deus.”',
        reference: 'Romanos 8:16'
      },
      {
        text: '“De maneira alguma te deixarei, nunca, jamais te desampararei.”',
        reference: 'Hebreus 13:5'
      }
    ],
    explanation: [
      '1. O que é necessário fazer para ser salvo? Crer de todo coração no Senhor Jesus Cristo (Atos 16:31).',
      '2. A promessa de Jesus: Ele promete salvação a todos os que O invocam sinceramente (Romanos 10:13).',
      '3. A vida eterna não é temporária: dura para sempre e ninguém pode arrancar você das mãos de Cristo (João 10:28-29).',
      '4. Quando pecamos: devemos confessar de imediato a Deus, pois Ele é fiel e justo para nos perdoar e purificar (1 João 1:9).',
      '5. O Espírito Santo confirma dentro de nós que somos filhos de Deus (Romanos 8:16).'
    ],
    questionsAndAnswers: [
      {
        question: 'O que é necessário fazer para ser salvo?',
        ref: 'Atos 16:31',
        answer: 'Crer no Senhor Jesus Cristo com o coração e recebê-lO como único Salvador.'
      },
      {
        question: 'O que Jesus promete sobre a sua segurança estando você sob os cuidados dEle?',
        ref: 'João 10:27-29',
        answer: 'Que jamais pereceremos e que ninguém pode nos arrebatar da Sua mão e da mão do Pai.'
      },
      {
        question: 'Quando um crente peca, o que é preciso fazer para receber o perdão de Deus?',
        ref: '1 João 1:9',
        answer: 'Confessar sinceramente o pecado a Deus, que nos perdoa e nos purifica de toda injustiça.'
      },
      {
        question: 'Quem testemunha juntamente com o seu espírito que você é filho de Deus?',
        ref: 'Romanos 8:16',
        answer: 'O próprio Espírito Santo de Deus que habita em nós.'
      }
    ],
    color: 'from-teal-600 to-teal-800'
  },
  {
    id: 2,
    roman: 'II',
    title: 'MÓDULO II',
    badge: 'O Batismo Bíblico',
    summary: 'A Ordenança do Mestre e o Testemunho Público da Fé.',
    verses: [
      {
        text: '“Então veio Jesus da Galileia ao Jordão ter com João, para ser batizado por ele... e eis que uma voz dos céus dizia: Este é o meu Filho amado, em quem me comprazo.”',
        reference: 'Mateus 3:13-17'
      },
      {
        text: '“De sorte que foram batizados os que de bom grado receberam a sua palavra; e naquele dia agregaram-se quase três mil almas.”',
        reference: 'Atos 2:41'
      },
      {
        text: '“Indo eles pelo caminho, chegaram a certo lugar onde havia água, e disse o eunuco: Eis aqui água; que impede que eu seja batizado? Disse Filipe: É lícito, se crês de todo o coração.”',
        reference: 'Atos 8:36-37'
      },
      {
        text: '“Naquela mesma hora da noite, lavou-lhes as feridas e logo foi batizado, ele e todos os seus.”',
        reference: 'Atos 16:33'
      },
      {
        text: '“Ide, ensinai a todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo.”',
        reference: 'Mateus 28:19'
      }
    ],
    explanation: [
      '1. Quem batizou Jesus e onde? João Batista, nas águas do Rio Jordão (Mateus 3:13-17). Deus confirmou com o Espírito em forma de pomba e Sua voz audível.',
      '2. O que qualifica alguém para o batismo? Receber de bom grado a Palavra de Deus e crer de todo coração em Jesus Cristo (Atos 2:41; Atos 8:37).',
      '3. Quando as pessoas eram batizadas no Novo Testamento? Imediatamente após crerem! Tanto o eunuco etíope quanto o carcereiro de Filipos foram batizados sem demora.',
      '4. O Batismo é uma declaração pública de que morremos para o mundo e renascemos para uma nova vida com Cristo.'
    ],
    questionsAndAnswers: [
      {
        question: 'Quem batizou Jesus e como Deus mostrou Sua aprovação?',
        ref: 'Mateus 3:13-17',
        answer: 'João Batista no Rio Jordão. O Espírito desceu como pomba e a voz do Pai declarou: "Este é o meu Filho amado".'
      },
      {
        question: 'O que qualifica alguém para ser batizado?',
        ref: 'Atos 2:41; Atos 8:37',
        answer: 'Crer de todo o coração em Jesus Cristo como seu Salvador pessoal.'
      },
      {
        question: 'Qual é a ordem de Jesus em Mateus 28:19-20?',
        ref: 'Mateus 28:19-20',
        answer: 'Ir por todo o mundo, fazer discípulos, batizá-los e ensiná-los a guardar a Palavra de Deus.'
      }
    ],
    color: 'from-blue-600 to-blue-800'
  },
  {
    id: 3,
    roman: 'III',
    title: 'MÓDULO III',
    badge: 'A Bíblia Sagrada',
    summary: 'A Palavra de Deus: A Lâmpada para os Nossos Pés e o Alimento da Alma.',
    verses: [
      {
        text: '“Homens santos de Deus falaram inspirados pelo Espírito Santo.”',
        reference: '2 Pedro 1:20-21'
      },
      {
        text: '“Lâmpada para os meus pés é tua palavra e luz para o meu caminho.”',
        reference: 'Salmo 119:105'
      },
      {
        text: '“Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça.”',
        reference: '2 Timóteo 3:16'
      },
      {
        text: '“Estes de Beréia foram mais nobres do que os de Tessalônica, porque de bom grado receberam a palavra, examinando cada dia nas Escrituras se estas coisas eram assim.”',
        reference: 'Atos 17:11'
      },
      {
        text: '“Procura apresentar-te a Deus aprovado, como obreiro que não tem de que se envergonhar, que maneja bem a palavra da verdade.”',
        reference: '2 Timóteo 2:15'
      },
      {
        text: '“Mas a palavra do Senhor permanece para sempre.”',
        reference: '1 Pedro 1:25'
      },
      {
        text: '“Se alguém acrescentar a estas coisas, Deus fará vir sobre ele as pragas... e se alguém tirar, Deus tirará a sua parte do livro da vida.”',
        reference: 'Apocalipse 22:18-19'
      }
    ],
    explanation: [
      '1. Em que a Bíblia é diferente dos outros livros? Ela é a infalível e inspirada Palavra de Deus, escrita por homens santos movidos pelo Espírito Santo.',
      '2. Como ela ajuda em nosso dia a dia? É lâmpada que ilumina as decisões diárias e protege os nossos passos do tropeço.',
      '3. Por que estudar a Bíblia sempre? Para crescermos espiritualmente (1 Pedro 2:2) e não sermos enganados por falsos ensinos (Atos 17:11).',
      '4. A durabilidade da Palavra: Os céus e a terra passarão, mas a Palavra de Deus permanece para sempre!'
    ],
    questionsAndAnswers: [
      {
        question: 'Como podemos saber que a Palavra de Deus é confiável?',
        ref: '2 Timóteo 3:16',
        answer: 'Porque toda ela é divinamente inspirada por Deus e útil para edificar a nossa vida com verdade absoluta.'
      },
      {
        question: 'Que instrução Deus nos dá em 2 Timóteo 2:15?',
        ref: '2 Timóteo 2:15',
        answer: 'Procurar apresentar-se a Deus aprovado, como obreiro que maneja bem a Palavra da Verdade.'
      },
      {
        question: 'Por quanto tempo a Palavra de Deus durará?',
        ref: '1 Pedro 1:25',
        answer: 'A Palavra do Senhor permanece para sempre por todas as gerações.'
      }
    ],
    color: 'from-amber-600 to-amber-800'
  },
  {
    id: 4,
    roman: 'IV',
    title: 'MÓDULO IV',
    badge: 'A Oração Diária',
    summary: 'O Privilégio de Conversar com o Pai Celestial.',
    verses: [
      {
        text: '“Até agora nada pedistes em meu nome; pedi, e recebereis, para que a vossa alegria se cumpra.”',
        reference: 'João 16:24'
      },
      {
        text: '“Mas tu, quando orares, entra no teu aposento e, fechando a tua porta, ora a teu Pai que está em secreto; e teu Pai, que vê em secreto, te recompensará publicamente.”',
        reference: 'Mateus 6:6'
      },
      {
        text: '“Clama a mim, e responder-te-ei, e anunciar-te-ei coisas grandes e firmes que não sabes.”',
        reference: 'Jeremias 33:3'
      },
      {
        text: '“E contou-lhes também uma parábola sobre o dever de orar sempre e nunca desfalecer.”',
        reference: 'Lucas 18:1'
      },
      {
        text: '“Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.”',
        reference: 'Filipenses 4:6'
      },
      {
        text: '“Pela manhã ouvirás a minha voz, ó Senhor; pela manhã apresentarei a ti a minha oração, e vigiarei.”',
        reference: 'Salmo 5:3'
      },
      {
        text: '“Porque há um só Deus, e um só Mediador entre Deus e os homens, Jesus Cristo homem.”',
        reference: '1 Timóteo 2:5'
      }
    ],
    explanation: [
      '1. O maior privilégio do crente: Ter acesso direto a Deus Pai através dos méritos de Jesus Cristo (João 16:24).',
      '2. Onde orar? Jesus nos ensina a intimidade do quarto secreto, fechando a porta e abrindo o coração sem fingimento.',
      '3. A promessa divina para quem ora: Clame a Mim e Eu responderei, anunciando coisas grandes e que você não sabe (Jeremias 33:3).',
      '4. Por que oramos em nome de Jesus? Porque há um só Mediador entre Deus e a humanidade: Jesus Cristo (1 Timóteo 2:5; João 14:6).'
    ],
    questionsAndAnswers: [
      {
        question: 'Qual é o dever do cristão quanto à frequência da oração?',
        ref: 'Lucas 18:1',
        answer: 'Orar sempre e nunca desfalecer, mantendo comunhão contínua com o Senhor.'
      },
      {
        question: 'Que necessidades podemos levar a Deus em oração?',
        ref: 'Filipenses 4:6',
        answer: 'Todas as nossas necessidades, preocupações e súplicas, sempre acompanhadas de ações de graças.'
      },
      {
        question: 'Qual o melhor momento do dia para nos consagrarmos em oração?',
        ref: 'Salmo 5:1-3',
        answer: 'Logo pela manhã, entregando o novo dia nas mãos de Deus antes de qualquer afazer.'
      }
    ],
    color: 'from-sky-600 to-sky-800'
  },
  {
    id: 5,
    roman: 'V',
    title: 'MÓDULO V',
    badge: 'O Testemunho Cristão',
    summary: 'Compartilhando a Salvação e Ganhando Almas para o Reino.',
    verses: [
      {
        text: '“Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas, tanto em Jerusalém como em toda a Judeia e Samaria, e até aos confins da terra.”',
        reference: 'Atos 1:8'
      },
      {
        text: '“Estai sempre preparados para responder com mansidão e temor a qualquer que vos pedir a razão da esperança que há em vós.”',
        reference: '1 Pedro 3:15'
      },
      {
        text: '“Este achou primeiro a seu irmão Simão, e disse-lhe: Achamos o Messias... E levou-o a Jesus.”',
        reference: 'João 1:40-42'
      },
      {
        text: '“Vinde após mim, e eu vos farei pescadores de homens.”',
        reference: 'Mateus 4:19'
      },
      {
        text: '“O Senhor não retarda a sua promessa... mas é longânimo para convosco, não querendo que alguns se percam, senão que todos venham a arrepender-se.”',
        reference: '2 Pedro 3:9'
      },
      {
        text: '“O fruto do justo é árvore de vida, e o que ganha almas é sábio.”',
        reference: 'Provérbios 11:30'
      }
    ],
    explanation: [
      '1. O que Jesus quer que sejamos? Suas testemunhas vivas, revestidas do poder do Espírito Santo (Atos 1:8).',
      '2. O exemplo de André: Assim que conheceu a Jesus, procurou seu irmão Simão Pedro e o trouxe para o Mestre (João 1:40-42).',
      '3. A quem Deus deseja salvar? Deus não quer que ninguém se perca, mas que todos venham ao arrependimento (2 Pedro 3:9).',
      '4. Ganhar almas é sabedoria: Provérbios 11:30 declara que o crente que conduz pessoas a Cristo é sábio aos olhos de Deus.'
    ],
    questionsAndAnswers: [
      {
        question: 'O que Jesus prometeu fazer por aqueles que O seguem?',
        ref: 'Mateus 4:19',
        answer: 'Fazer de nós pescadores de almas para o Seu Reino eterno.'
      },
      {
        question: 'Qual a advertência de Ezequiel 33:7-9 para quem se cala diante do pecador?',
        ref: 'Ezequiel 33:7-9',
        answer: 'O atalaia tem o dever solene de avisar o pecador; se avisar, estará livre da responsabilidade perante Deus.'
      },
      {
        question: 'Que promessa Jesus faz a quem é fiel no testemunho?',
        ref: 'Mateus 28:20',
        answer: '“Eis que eu estou convosco todos os dias, até a consumação dos séculos”.'
      }
    ],
    color: 'from-emerald-600 to-emerald-800'
  },
  {
    id: 6,
    roman: 'VI',
    title: 'MÓDULO VI',
    badge: 'A Contribuição Bíblica',
    summary: 'Fidelidade e Gratidão na Casa do Senhor.',
    verses: [
      {
        text: '“No primeiro dia da semana cada um de vós ponha de parte o que puder ajuntar, conforme a sua prosperidade.”',
        reference: '1 Coríntios 16:2'
      },
      {
        text: '“Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria.”',
        reference: '2 Coríntios 9:7'
      },
      {
        text: '“Trazei todos os dízimos à casa do tesouro, para que haja mantimento na minha casa; e provai-me nisto, diz o Senhor dos Exércitos, se eu não vos abrir as janelas do céu.”',
        reference: 'Malaquias 3:10'
      },
      {
        text: '“O meu Deus, segundo as suas riquezas, suprirá todas as vossas necessidades em glória, por Cristo Jesus.”',
        reference: 'Filipenses 4:19'
      }
    ],
    explanation: [
      '1. Como deve ser sustentado o trabalho da Igreja? Pela fidelidade dos membros em seus dízimos e ofertas entregues no altar.',
      '2. Atitude do coração: Não com avareza ou constrangimento, mas com genuína alegria de quem reconhece que tudo vem de Deus.',
      '3. A promessa aos fiéis: Deus desafia o crente a prová-lO e promete abrir as janelas do céu e repreender o devorador.'
    ],
    questionsAndAnswers: [
      {
        question: 'Qual é a proporção e frequência bíblica para contribuir?',
        ref: '1 Coríntios 16:2',
        answer: 'Regularmente, no primeiro dia da semana, de acordo com as bênçãos e a prosperidade concedida por Deus.'
      },
      {
        question: 'Por que Deus se agrada do contribuinte alegre?',
        ref: '2 Coríntios 9:7',
        answer: 'Porque a contribuição alegre reflete fé, gratidão e generosidade sincera no coração.'
      }
    ],
    color: 'from-purple-600 to-purple-800'
  },
  {
    id: 7,
    roman: 'VII',
    title: 'MÓDULO VII',
    badge: 'O Espírito Santo em Nós',
    summary: 'O Consolador, Guia e os 9 Frutos da Nova Vida.',
    verses: [
      {
        text: '“Mas vós não estais na carne, mas no Espírito, se é que o Espírito de Deus habita em vós.”',
        reference: 'Romanos 8:9'
      },
      {
        text: '“E eu rogarei ao Pai, e ele vos dará outro Consolador, para que fique convosco para sempre.”',
        reference: 'João 14:16-17'
      },
      {
        text: '“E não vos embriagueis com vinho, em que há contenda, mas enchei-vos do Espírito.”',
        reference: 'Efésios 5:18'
      },
      {
        text: '“E não entristeçais o Espírito Santo de Deus, no qual estais selados para o dia da redenção.”',
        reference: 'Efésios 4:30'
      },
      {
        text: '“Mas o fruto do Espírito é: amor, gozo (alegria), paz, longanimidade (paciência), benignidade, bondade, fé (fidelidade), mansidão, temperança (domínio próprio).”',
        reference: 'Gálatas 5:22-23'
      }
    ],
    explanation: [
      '1. Quem passou a habitar em você logo após ser salvo? O Espírito Santo de Deus (Romanos 8:9).',
      '2. Por quanto tempo Ele habitará em você? Para sempre! Ele é o nosso Consolador e Selo eterno da redenção (João 14:16).',
      '3. A ordem de Deus para todo cristão: “Enchei-vos do Espírito” (Efésios 5:18).',
      '4. As 9 qualidades que o Espírito produz em nós: Amor, Alegria, Paz, Paciência, Benignidade, Bondade, Fidelidade, Mansidão e Domínio Próprio.'
    ],
    questionsAndAnswers: [
      {
        question: 'Quem dá ao crente a certeza absoluta da salvação?',
        ref: 'Romanos 8:16',
        answer: 'O Espírito Santo que testifica em nosso coração que somos filhos amados de Deus.'
      },
      {
        question: 'De que maneira podemos entristecer o Espírito Santo?',
        ref: 'Efésios 4:30-32',
        answer: 'Com amargura, ira, cólera, gritaria, maledicência e qualquer prática do velho homem.'
      },
      {
        question: 'Quem nos concede poder e coragem para pregar a Palavra?',
        ref: 'Atos 1:8',
        answer: 'O Espírito Santo quando vem sobre as nossas vidas.'
      }
    ],
    color: 'from-rose-600 to-rose-800'
  },
  {
    id: 8,
    roman: 'VIII',
    title: 'MÓDULO VIII',
    badge: 'A Igreja de Jesus Cristo',
    summary: 'Corpo Vivo, Comunhão Fraternal e Membresia Ativa.',
    verses: [
      {
        text: '“Pois também eu te digo que tu és Pedro, e sobre esta pedra edificarei a minha igreja, e as portas do inferno não prevalecerão contra ela.”',
        reference: 'Mateus 16:18'
      },
      {
        text: '“Porque o marido é a cabeça da mulher, como também Cristo é a cabeça da igreja, sendo ele próprio o salvador do corpo.”',
        reference: 'Efésios 5:23'
      },
      {
        text: '“Cristo amou a igreja, e a si mesmo se entregou por ela... para a apresentar a si mesmo igreja gloriosa, sem mácula, nem ruga.”',
        reference: 'Efésios 5:25-27'
      },
      {
        text: '“A igreja de Deus, que ele resgatou com seu próprio sangue.”',
        reference: 'Atos 20:28'
      },
      {
        text: '“Não deixando a nossa congregação, como é costume de alguns, antes admoestando-nos uns aos outros; e tanto mais, quanto vedes que se vai aproximando aquele dia.”',
        reference: 'Hebreus 10:25'
      },
      {
        text: '“Ora, vós sois o corpo de Cristo, e seus membros em particular.”',
        reference: '1 Coríntios 12:27'
      }
    ],
    specialContent: {
      title: 'COMO TORNAR-SE MEMBRO DA IGREJA LOCAL & TESTEMUNHO',
      items: [
        {
          label: '1. As 3 Formas de Unir-se à Igreja',
          text: 'a) Pela Profissão de Fé e Batismo nas Águas;\nb) Por Carta de Transferência de outra igreja da mesma fé e ordem;\nc) Por Declaração de Fé / Aclamação.'
        },
        {
          label: '2. Os 3 Passos para Escrever o Seu Testemunho',
          text: '1. Como era a minha vida antes de receber a Cristo;\n2. Como senti a necessidade pessoal de aceitar Jesus;\n3. O que Cristo significa hoje no meu dia a dia.'
        },
        {
          label: '3. Vale a Pena Plantar (Marcos 4:26-29)',
          text: '“O reino de Deus é como um homem que lança a semente à terra... e a semente cresce: primeiro a erva, depois a espiga e por último o grão cheio. Quando o fruto se mostra, está chegada a ceifa!” Os batistas e evangelizadores semeiam o ano inteiro por todo o Brasil — no Nordeste, no Pantanal, na Amazônia, no Sul e nas grandes capitais. Vale a pena plantar a semente do Evangelho!'
        }
      ]
    },
    explanation: [
      '1. Quem estabeleceu a Igreja? Jesus Cristo, e Ele prometeu que as portas do inferno jamais prevalecerão contra ela (Mateus 16:18).',
      '2. Quem é o cabeça da Igreja? Jesus Cristo é o cabeça e Senhor absoluto da Sua Igreja (Efésios 5:23).',
      '3. Que preço Jesus pagou pela Igreja? Ele a resgatou e comprou com o Seu próprio sangue na cruz (Atos 20:28).',
      '4. Por que congregar com fidelidade? Porque a comunhão nos fortalece, nos protege e nos capacita para as boas obras até o retorno de Cristo (Hebreus 10:25).'
    ],
    questionsAndAnswers: [
      {
        question: 'Como o apóstolo Paulo denomina a igreja em 1 Coríntios 12:27?',
        ref: '1 Coríntios 12:27',
        answer: 'Nós somos o Corpo de Cristo, e cada crente é membro individual desse corpo santo.'
      },
      {
        question: 'Quais as maiores responsabilidades dadas por Cristo à Igreja?',
        ref: 'Mateus 28:19-20',
        answer: 'Fazer discípulos em todas as nações, batizá-los e ensiná-los a obedecer a tudo o que Jesus ordenou.'
      }
    ],
    color: 'from-indigo-600 to-indigo-800'
  }
];

// =========================================================================
// COMPONENTE PRINCIPAL PLAYBOOK (SOMENTE TEXTO / SEM ÁUDIO)
// =========================================================================
export const PlayBookView: React.FC = () => {
  // Seletor de Curso: 'salvacao' | 'batismo'
  const [currentCourse, setCurrentCourse] = useState<'salvacao' | 'batismo'>('salvacao');

  // Controle de Página: 0 = Capa, 1..N = Lições, N+1 = Conclusão
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
      
      {/* Top Banner do Playbook (Tema Claro com Fundo Branco) */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 dark:bg-teal-950/60 border border-teal-200 dark:border-teal-800 text-teal-700 dark:text-teal-300 text-xs font-semibold mb-2">
            <BookOpen size={14} className="text-teal-600 dark:text-teal-400" />
            Playbook & Manual de Leitura Integral
          </div>
          <h1 className="font-heading font-black text-2xl sm:text-3xl text-slate-900 dark:text-white">
            {currentCourse === 'salvacao' ? 'Playbook: As 8 Respostas Bíblicas da Salvação' : 'Playbook: Curso para Batismo & Discipulado'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 max-w-2xl">
            {currentCourse === 'salvacao' 
              ? 'Texto completo e integral com todos os versículos, reflexões bíblicas, as 3 etapas da morte, as 3 ilustrações da salvação e a oração de entrega.'
              : 'Manual completo: O Que Jesus Deseja Que Você Faça, incluindo os 8 módulos, perguntas bíblicas, frutos do Espírito e orientações de membresia.'}
          </p>
        </div>

        {/* Seletor de Livro / Playbook */}
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
            <Flame size={14} /> 8 Respostas da Salvação
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
            <Award size={14} /> Curso de Batismo (8 Módulos)
          </button>
        </div>
      </div>

      {/* Barra de Ferramentas de Leitura (Navegação, Zoom, Tamanho de Fonte, Imprimir) */}
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
            title="Baixar Manual Oficial em PDF com a Logo e as Fichas de Evangelismo"
          >
            <Download size={15} />
            <span className="hidden sm:inline">Baixar PDF Completo</span>
          </a>
        </div>

      </div>

      {/* Área Central de Leitura do Playbook (Texto Integral Limpo) */}
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
                <p className="text-xs text-slate-600 dark:text-slate-300">Passagens bíblicas centrais sem rodeios ou opiniões humanas.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-bold text-teal-600 dark:text-teal-400">2. Reflexão Prática</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">Perguntas diretas Sim/Não e reflexões com base nas Escrituras.</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">3. Estudo Integral</span>
                <p className="text-xs text-slate-600 dark:text-slate-300">Texto completo para leitura meditativa, discipulado e compartilhamento.</p>
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
            PÁGINAS 1..N: LIÇÕES INTEGRAIS EM TEXTO PURO (SEM ÁUDIO)
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
                  const expText = currentLesson.explanation.join('\n');
                  const full = `${currentLesson.title} - ${currentLesson.badge}\n\nVERSÍCULOS:\n${versesText}\n\nEXPLICAÇÃO:\n${expText}`;
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

            {/* Conteúdo Especial / Ilustrações teológicas centrais */}
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

            {/* Perguntas de Reflexão Sim / Não (Formato do Estudo Bíblico Original) */}
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
                          ( &nbsp; ) {qText}
                        </p>
                        <div className="flex items-center gap-2 pt-1 text-xs font-bold text-slate-500 dark:text-slate-400">
                          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                            [ &nbsp; ] SIM (S)
                          </span>
                          <span className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600">
                            [ &nbsp; ] NÃO (N)
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Explicação Teológica & Fundamentos */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                <CheckCircle2 size={14} className="text-teal-500" /> Explicação & Resposta de Deus
              </h4>
              <div className="space-y-2.5">
                {currentLesson.explanation.map((exp, i) => (
                  <div 
                    key={i}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="w-6 h-6 rounded-lg bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      ✓
                    </div>
                    <p className={`text-slate-700 dark:text-slate-300 leading-relaxed ${getFontSizeClass()}`}>
                      {exp}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Questionário Bíblico para Estudo do Discípulo (Sem Gabarito / Para Preenchimento) */}
            {currentLesson.questionsAndAnswers && currentLesson.questionsAndAnswers.length > 0 && (
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                  <HelpCircle size={14} /> Questionário Bíblico de Estudo & Fixação (Para Preenchimento do Aluno)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {currentLesson.questionsAndAnswers.map((qa, i) => (
                    <div 
                      key={i}
                      className="p-4 rounded-2xl bg-indigo-50/50 dark:bg-indigo-950/20 border border-indigo-200/60 dark:border-indigo-900/40 space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-200/80 dark:bg-indigo-900 text-indigo-900 dark:text-indigo-200 font-mono">
                            {qa.ref}
                          </span>
                        </div>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          {qa.question}
                        </h5>
                      </div>

                      {/* Linhas para o Aluno Preencher a Resposta (Sem Gabarito) */}
                      <div className="pt-2 border-t border-indigo-200/50 dark:border-indigo-900/30 space-y-2">
                        <div className="flex items-center gap-2 text-xs text-slate-400">
                          <strong className="text-indigo-600 dark:text-indigo-400 font-mono">R:</strong>
                          <div className="flex-1 border-b border-dashed border-slate-300 dark:border-slate-700 h-2"></div>
                        </div>
                        <div className="border-b border-dashed border-slate-300 dark:border-slate-700 h-2"></div>
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
                  ? 'Você concluiu o estudo das 8 Respostas Bíblicas da Salvação. Agora você está apto e capacitado para evangelizar com firmeza, clareza e fidelidade às Sagradas Escrituras!'
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
                {currentCourse === 'salvacao' ? 'Ler Curso de Batismo →' : 'Ler 8 Respostas da Salvação →'}
              </button>
            </div>

          </div>
        )}

      </div>

    </div>
  );
};
