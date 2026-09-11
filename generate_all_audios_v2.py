# -*- coding: utf-8 -*-
import asyncio
import os
import shutil
import edge_tts

VOICE_FEM = "pt-BR-FranciscaNeural"
VOICE_MASC = "pt-BR-AntonioNeural"
RATE = "-2%"

LESSONS_EVANGELISMO = [
    {
        "id": 1,
        "filename": "audio_licao_1",
        "title": "Lição 1: Primeira Resposta - A Salvação Bíblica",
        "text": """Plataforma Evangelismo Prático.
Estudo Bíblico: A Pergunta Mais Importante da Sua Vida.
Lição Um: A Salvação Bíblica.

Começamos este estudo com a pergunta mais importante da sua vida:
Se você morresse agora, teria plena certeza da sua salvação?

Quem pode decidir se uma pessoa será salva ou não: Deus ou o homem?

A Primeira Resposta de Deus sobre a salvação está na Primeira Carta de João, capítulo cinco, versículo onze:
"E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho."

Deus nos deu a vida eterna como uma dádiva consumada, e ela está unicamente em Jesus Cristo. Ela não é conquistada por religião, boas obras ou méritos humanos, mas recebida pela fé em Cristo.
Como afirma o apóstolo Paulo na Primeira Carta aos Coríntios, capítulo um, versículo dezoito:
"Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus."

Na Primeira Carta de João, capítulo cinco, versículos doze e treze, a Escritura confirma:
"Aquele que tem o Filho tem a vida; aquele que não tem o Filho de Deus não tem a vida. Estas coisas vos escrevi, para que saibais que tendes a vida eterna e para que creiais no nome do Filho de Deus."

E no Evangelho de João, capítulo cinco, versículo vinte e quatro, o Senhor Jesus declara:
"Na verdade, na verdade vos digo que quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida."

A salvação é uma certeza dada por Deus hoje para quem crê em Jesus Cristo."""
    },
    {
        "id": 2,
        "filename": "audio_licao_2",
        "title": "Lição 2: Segunda Resposta - O Amor de Deus por Você",
        "text": """Plataforma Evangelismo Prático.
Lição Dois: O Amor de Deus por Você.

Pergunta para reflexão:
Quem determina o amor de Deus por você: Deus ou você?

No Evangelho de João, capítulo três, versículo dezesseis, encontramos a maior declaração de amor do universo:
"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna."

Se Deus amou o mundo de uma maneira inexplicável, e você está no mundo que Ele ama, o Seu amor alcança você pessoalmente hoje.
Na Carta aos Romanos, capítulo cinco, versículo oito, a Palavra declara:
"Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores."

Deus provou Seu amor na cruz há mais de dois mil anos. O sacrifício de Jesus é perfeito, completo e suficiente para salvar você."""
    },
    {
        "id": 3,
        "filename": "audio_licao_3",
        "title": "Lição 3: Terceira Resposta - A Condição do Homem Pecador",
        "text": """Plataforma Evangelismo Prático.
Lição Três: A Condição do Homem Pecador.

Pergunta para reflexão:
Quem define o que é pecado: a opinião humana ou a Palavra de Deus?

Na Carta aos Romanos, capítulo três, versículo vinte e três, a Bíblia afirma com clareza:
"Porque todos pecaram e destituídos estão da glória de Deus."

Todos nós pecamos em pensamentos, palavras e atitudes. O pecado não é apenas cometer grandes erros, mas errar o alvo da santidade do Criador.
Por causa do pecado, o homem ficou separado da comunhão com Deus. Reconhecer que somos pecadores e que não podemos nos salvar a nós mesmos é o passo essencial para receber o perdão e a graça divina."""
    },
    {
        "id": 4,
        "filename": "audio_licao_4",
        "title": "Lição 4: Quarta Resposta - A Morte Eterna e as Três Separações",
        "text": """Plataforma Evangelismo Prático.
Lição Quatro: A Morte Eterna.

Pergunta para reflexão:
Quem decide sobre o céu ou o inferno: Deus ou você?

Na Carta aos Romanos, capítulo seis, versículo vinte e três, está escrito:
"Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna, por Cristo Jesus nosso Senhor."

Preste muita atenção para não errar:
A pessoa que não entende o que é morte na Bíblia também terá dificuldade para entender o que é salvação. Na Bíblia, morte significa separação, e essa separação acontece em três etapas:

Primeira etapa: Morte espiritual.
Quando Adão pecou, seu corpo não caiu morto na mesma hora; continuou vivo fisicamente. Porém, sua comunhão e relacionamento com Deus foram rompidos. Por isso, todos os pecadores nascem espiritualmente mortos, separados de Deus.

Segunda etapa: Morte física.
Quando o corpo morre e vai para o cemitério, o relacionamento com este mundo físico é interrompido.

Terceira etapa: Morte eterna.
Se a pessoa morrer separada de Deus, continuará separada Dele por toda a eternidade.
No Evangelho de Lucas, capítulo dezesseis, Jesus revela o que aconteceu com o homem rico e Lázaro. O rico foi para o lugar de tormento e clamou: "Pai Abraão, tem misericórdia de mim, porque estou atormentado nesta chama." Abraão respondeu que entre eles havia um grande abismo, impossível de atravessar.
Por isso, a salvação bíblica deve ser decidida hoje, em vida, pela fé em Jesus Cristo."""
    },
    {
        "id": 5,
        "filename": "audio_licao_5",
        "title": "Lição 5: Quinta Resposta - A Solução de Deus para a Salvação",
        "text": """Plataforma Evangelismo Prático.
Lição Cinco: A Solução de Deus para a Salvação.

Pergunta de reflexão:
Quem tem a solução para salvar: Deus ou a religião?

Na Carta aos Romanos, capítulo cinco, versículo oito, a Bíblia ensina:
"Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores."

Se o salário do pecado é a morte eterna, somente outra morte pura e santa poderia pagar a nossa pena. Por isso, Cristo morreu em nosso lugar. A pena já foi paga!
Como afirma a Primeira Carta aos Coríntios, capítulo cinco, versículo sete:
"Porque Cristo, nossa páscoa, foi sacrificado por nós."

Para entender a diferença entre o corpo e o sangue de Cristo, guarde estas três ilustrações bíblicas:

Primeira ilustração: A doença.
Se alguém adoece por causa de um erro, ao se arrepender recebe o perdão, mas a consequência física permanece. Da mesma forma, morte só se paga com morte, e pecado só se apaga com sangue. O corpo de Cristo morreu para pagar a nossa pena de morte eterna; o sangue de Cristo foi derramado para perdoar os nossos pecados.

Segunda ilustração: A camisa.
Quando você compra uma camisa, você paga o preço dela uma única vez na loja, mas a lava muitas vezes quando ela se suja. A camisa pertence a você porque foi paga, e não porque foi lavada. Da mesma forma, Jesus pagou a sua pena de morte uma vez para sempre na cruz com Seu corpo, e nos purifica diariamente de todo pecado com Seu sangue.

Terceira ilustração: O primogênito no Egito.
O cordeiro da Páscoa morreu no dia quatorze para pagar a pena do primogênito. O sangue foi colocado nos umbrais da porta para proteção.
Jesus na ceia tomou o pão e disse: "Isto é o meu corpo oferecido por vós." E tomou o cálice e disse: "Este é o meu sangue derramado para remissão de pecados."
A dívida foi totalmente paga na cruz do Calvário!"""
    },
    {
        "id": 6,
        "filename": "audio_licao_6",
        "title": "Lição 6: Sexta Resposta - Como Receber a Salvação Bíblica",
        "text": """Plataforma Evangelismo Prático.
Lição Seis: Como Receber a Salvação Bíblica.

Pergunta para reflexão:
Qual é o momento exato em que a pessoa passa a ser salva: no momento em que crê e confessa a Cristo, ou no juízo final?

A Palavra de Deus responde na Carta aos Romanos, capítulo dez, versículos nove e dez:
"Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo. Visto que com o coração se crê para a justiça, e com a boca se faz confissão para a salvação."

E no Evangelho de João, capítulo um, versículo doze:
"Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome."

No momento em que você crê e confessa, a salvação passa a ser sua realidade presente.
Se você deseja firmar a sua certeza agora, faça de todo o coração esta Oração de Confissão:

"Senhor Deus, eu sei que o Senhor me ama. Reconheço que sou pecador e que estava condenado à morte eterna. Mas creio que o Senhor enviou Seu Filho Jesus Cristo para morrer na cruz em meu lugar.
Reconheço que Jesus tomou sobre Si a minha pena. Seu corpo morreu por mim, e Seu sangue precioso foi derramado para purificar todos os meus pecados.
Pela fé, eu Te entrego a minha vida, recebo a Jesus Cristo como meu único e suficiente Salvador, e recebo o Espírito Santo como o selo da minha salvação eterna. Amém."

Se você fez essa oração com sinceridade, Jesus Cristo salvou você hoje!"""
    },
    {
        "id": 7,
        "filename": "audio_licao_7",
        "title": "Lição 7: Sétima Resposta - A Avaliação da Salvação Bíblica",
        "text": """Plataforma Evangelismo Prático.
Lição Sete: A Avaliação da Salvação Bíblica.

Pergunta de reflexão:
É possível avaliar a salvação de uma pessoa para saber se ela realmente compreendeu a mensagem bíblica?

No Livro de Atos dos Apóstolos, capítulo dezenove, versículo dois, o apóstolo Paulo perguntou aos discípulos:
"Recebestes vós o Espírito Santo quando crestes?"

E em Atos, capítulo dezoito, versículos vinte e quatro a vinte e seis, vemos o exemplo de Apolo. Ele era eloquente e fervoroso, mas Priscila e Áquila o chamaram com amor e lhe declararam com mais exatidão o caminho de Deus sobre a salvação.
Além disso, no Evangelho de Mateus, capítulo sete, versículo vinte e um, Jesus advertiu:
"Nem todo o que me diz: Senhor, Senhor! entrará no reino dos céus, mas aquele que faz a vontade de meu Pai que está nos céus."

Por isso, avaliar o testemunho bíblico é um ato de sabedoria. O testemunho genuíno de salvação se resume em quatro pontos fundamentais:
Primeiro: Como era a minha vida antes de Cristo.
Segundo: O que me despertou para a necessidade de salvação.
Terceiro: Qual foi a minha decisão pessoal de fé.
Quarto: Como é a minha nova vida em Cristo agora.
Você tem plena certeza da sua salvação?"""
    },
    {
        "id": 8,
        "filename": "audio_licao_8",
        "title": "Lição 8: Oitava Resposta - O Privilégio de Compartilhar a Salvação",
        "text": """Plataforma Evangelismo Prático.
Lição Oito: O Privilégio de Compartilhar a Salvação Bíblica.

Toda pessoa que experimentou a graça da salvação tem o alto privilégio e o compromisso de compartilhá-la com o próximo.

No Livro de Isaías, capítulo cinquenta e dois, versículo sete, está escrito:
"Quão formosos sobre os montes são os pés dos que anunciam as boas-novas, dos que anunciam a salvação!"

Na Segunda Carta a Timóteo, capítulo dois, versículo dois, Paulo instrui:
"O que de minha parte ouviste, ensina a homens fiéis que sejam idôneos para também ensinarem a outros."

E o Senhor Jesus nos deu a Grande Comissão no Evangelho de Mateus, capítulo vinte e oito, versículos dezenove e vinte:
"Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo; ensinando-os a guardar todas as coisas que vos tenho ordenado. E eis que estou convosco todos os dias, até a consumação dos séculos."

No Evangelho de Lucas, capítulo quinze, versículo sete, Jesus revela:
"Haverá mais júbilo no céu por um pecador que se arrepende do que por noventa e nove justos que não necessitam de arrependimento."
Cada vez que você compartilha o Evangelho e uma pessoa se entrega a Jesus, você faz uma grande festa nos céus!

Quem recebeu graça, compartilha graça. Quem encontrou a Vida, anuncia a Vida!"""
    }
]

AUDIOBOOK_COMPLETO_EVANGELISMO = """Plataforma Evangelismo Prático. Apresenta: O Audiobook Oficial: A Pergunta Mais Importante da Sua Vida. A Certeza da Salvação Bíblica em Oito Lições com Pr. Roberto Rodrigues Casas.

Começamos este estudo com a pergunta mais decisiva da sua existência: Se você morresse agora, teria plena certeza da sua salvação?

Primeira Lição: A Salvação Bíblica.
A Bíblia mostra que podemos ter absoluta certeza da vida eterna. Na Primeira Carta de João, capítulo cinco, versículo onze, a Palavra declara: E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho. A salvação não é conquistada por religião, méritos ou boas obras, mas recebida pela fé em Cristo Jesus.

Segunda Lição: O Amor de Deus por Você.
No Evangelho de João, capítulo três, versículo dezesseis: Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. E na Carta aos Romanos, capítulo cinco, versículo oito: Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.

Terceira Lição: A Condição do Homem Pecador.
Na Carta aos Romanos, capítulo três, versículo vinte e três: Porque todos pecaram e destituídos estão da glória de Deus. O pecado rompeu a nossa comunhão com Deus, e reconhecer nossa necessidade de perdão é o caminho para a reconciliação.

Quarta Lição: A Morte Eterna.
Na Carta aos Romanos, capítulo seis, versículo vinte e três: O salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna. Morte na Bíblia significa separação em três fases: morte espiritual, morte física e morte eterna. No Evangelho de Lucas, capítulo dezesseis, o rico em tormentos compreendeu tarde demais que após a morte existe um abismo intransponível. Por isso, a decisão deve ser tomada em vida.

Quinta Lição: A Solução de Deus para a Salvação.
Cristo morreu em nosso lugar. Ele é a nossa Páscoa sacrificada. O corpo de Cristo morreu na cruz para pagar a nossa pena de morte eterna; o sangue de Cristo foi derramado para perdoar todos os nossos pecados. Como uma roupa comprada uma vez e lavada continuamente, Jesus pagou a nossa pena uma vez para sempre, e nos purifica a cada dia com Seu sangue.

Sexta Lição: Como Receber a Salvação.
Na Carta aos Romanos, capítulo dez, versículo nove: Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo. Ao crer e orar, entregando seu coração a Cristo, você passa da morte para a vida e torna-se filho de Deus.

Sétima Lição: A Avaliação da Salvação.
A Palavra de Deus nos convida a examinar nossa fé. Em Mateus, capítulo sete, Jesus lembra que as palavras devem corresponder à verdadeira fé interior. O testemunho cristão expressa quem éramos antes, como fomos despertados, a nossa decisão e a nova vida que agora desfrutamos.

Oitava Lição: O Privilégio de Compartilhar a Salvação.
Mateus vinte e oito: Ide e fazei discípulos de todas as nações. Há festa no céu por cada pecador que se arrepende. Viva essa missão com alegria. Quem encontrou a Vida, anuncia a Vida!"""

LESSONS_DISCIPULADO = [
    {
        "id": 101,
        "filename": "discipulado_1",
        "title": "Discipulado 1: Como se Tornar um Crente em Cristo",
        "text": """Plataforma Evangelismo Prático.
Curso de Batismo e Discipulado Cristão.
Lição Um: Como Você Pode se Tornar um Crente em Cristo.

A decisão de convidar a Jesus Cristo para fazer parte da sua vida é a mais importante que você já fez.
Seus pecados estão perdoados, você é filho de Deus, o céu é a sua morada eterna e Jesus Cristo é o seu Salvador pessoal.

Vejamos os quatro fundamentos bíblicos:
Primeiro: Todos pecaram. Romanos capítulo três, versículo vinte e três ensina que todos pecaram e destituídos estão da glória de Deus. Pecar significa transgredir a vontade do Criador.
Segundo: O pecado traz a morte. Romanos seis, versículo vinte e três diz que o salário do pecado é a morte espiritual e a separação de Deus.
Terceiro: Cristo morreu por nossos pecados. Romanos cinco, versículo oito declara que Deus prova Seu amor em que Cristo morreu por nós sendo nós ainda pecadores. Somente Cristo pode salvar!
Quarto: Salvo por Cristo. Romanos dez, versículo treze afirma: Qualquer que invocar o nome do Senhor será salvo.

Se você invocou sinceramente o Senhor, você está salvo. A partir de agora, Jesus convida você a crescer espiritualmente!"""
    },
    {
        "id": 102,
        "filename": "discipulado_2",
        "title": "Discipulado 2: Certeza da Salvação e o Santo Batismo",
        "text": """Plataforma Evangelismo Prático.
Curso de Batismo e Discipulado.
Lição Dois: Certeza da Salvação e o Santo Batismo.

Jesus deseja que você experimente vida abundante, como Ele prometeu no Evangelho de João, capítulo dez, versículo dez.
Ele deseja que você cumpra Seus mandamentos por amor.

Primeiro: Jesus deseja que você tenha certeza da salvação.
Decorar Romanos dez, versículo treze. Temos três garantias: a promessa de Jesus em João cinco, versículo vinte e quatro; a nossa oração sincera ao Senhor; e o testemunho interior do Espírito Santo em Romanos oito, versículo dezesseis.

Segundo: Jesus deseja que você seja batizado nas águas.
Decorar Mateus vinte e oito, versículo dezenove.
O batismo é uma ordenança sagrada deixada por Jesus. Ele simboliza a morte para a velha vida e a ressurreição para uma nova vida em Cristo. É a pública profissão da sua fé.
Jesus foi batizado por João Batista no rio Jordão, e todos os que criam nos tempos dos apóstolos desciam às águas batismais. Você deseja ser batizado?"""
    },
    {
        "id": 103,
        "filename": "discipulado_3",
        "title": "Discipulado 3: A Palavra de Deus e a Oração Diária",
        "text": """Plataforma Evangelismo Prático.
Curso de Batismo e Discipulado.
Lição Três: A Palavra de Deus e a Vida de Oração.

Terceiro: Jesus deseja que você leia a Bíblia diariamente.
Decorar Segunda Carta a Timóteo, capítulo três, versículos dezesseis e dezessete.
A Palavra de Deus é o seu alimento espiritual. O Salmo cento e dezenove, versículo cento e cinco diz: Lâmpada para os meus pés é a tua palavra, e luz para o meu caminho. Comece pelo Evangelho de João e participe da Escola Bíblica Dominical.

Quarto: Jesus deseja que você ore diariamente.
Decorar Carta aos Filipenses, capítulo quatro, versículos seis e sete.
Em João capítulo dezesseis, versículo vinte e quatro, Jesus nos ensina: Pedi e recebereis, para que a vossa alegria seja completa. Fale com Deus todos os dias, compartilhando suas alegrias, gratidão e necessidades em nome de Jesus."""
    },
    {
        "id": 104,
        "filename": "discipulado_4",
        "title": "Discipulado 4: Testemunho Fiel e Contribuição Bíblica",
        "text": """Plataforma Evangelismo Prático.
Curso de Batismo e Discipulado.
Lição Quatro: Testemunho Fiel e Contribuição com Alegria.

Quinto: Jesus deseja que você seja uma testemunha fiel.
Decorar Evangelho de Marcos, capítulo cinco, versículo dezenove.
Em Atos capítulo um, versículo oito, Jesus declarou: E ser-me-eis testemunhas. Conte de forma natural e amorosa aos seus amigos e familiares o que Jesus fez em sua vida.

Sexto: Jesus deseja que você contribua no sustento da obra de Deus.
Decorar Segunda Carta aos Coríntios, capítulo nove, versículo sete: Deus ama a quem dá com alegria.
A Bíblia ensina a prática do dízimo e das ofertas voluntárias para o sustento da igreja local e dos campos missionários. Em Malaquias, capítulo três, versículo dez, o Senhor promete derramar bênçãos sem medida sobre os que são fiéis."""
    },
    {
        "id": 105,
        "filename": "discipulado_5",
        "title": "Discipulado 5: O Espírito Santo e a Igreja Local",
        "text": """Plataforma Evangelismo Prático.
Curso de Batismo e Discipulado.
Lição Cinco: O Espírito Santo e a Igreja Local.

Sétimo: Jesus deseja que você deixe o Espírito Santo guiar a sua vida.
Decorar Carta aos Efésios, capítulo cinco, versículo dezoito: Sede cheios do Espírito.
O Consolador prometido em João quatorze habita em você desde o momento da salvação. Ele produz em seu caráter o fruto do Espírito descrito em Gálatas capítulo cinco: amor, alegria, paz, longanimidade, benignidade, bondade, fidelidade, mansidão e domínio próprio.

Oitavo: Jesus deseja que você frequente a igreja local.
Decorar Carta aos Hebreus, capítulo dez, versículos vinte e quatro e vinte e cinco: Não deixemos de congregar, como é costume de alguns.
Na igreja você aprende a Palavra, fortalece sua fé em comunhão com os irmãos e encontra um lugar especial para servir a Deus e ao próximo com alegria."""
    },
    {
        "id": 106,
        "filename": "discipulado_6",
        "title": "Discipulado 6: Vale a Pena Plantar",
        "text": """Plataforma Evangelismo Prático.
Curso de Batismo e Discipulado.
Lição Seis: Vale a Pena Plantar.

No Evangelho de Marcos, capítulo quatro, versículos vinte e seis a vinte e nove, Jesus ensina:
O Reino de Deus é como um homem que lança a semente à terra. A semente brota e cresce, primeiro a erva, depois a espiga, e por último o grão cheio. E quando o fruto amadurece, logo se lança a foice, porque é chegada a ceifa.

A semente da Palavra de Deus semeada nos corações nunca volta vazia.
Você pode se unir à igreja local por profissão de fé e batismo, por transferência através de carta, ou por declaração de fé.
Continue firme plantando o Evangelho de Cristo. No passado, no presente e no futuro, vale a pena plantar!"""
    }
]

AUDIOBOOK_COMPLETO_DISCIPULADO = """Plataforma Evangelismo Prático. Apresenta: O Curso Completo de Batismo e Discipulado Cristão: O Que Jesus Deseja Que Você Faça.

Parabéns por sua bendita decisão de seguir a Jesus Cristo. Seus pecados foram perdoados, você é uma nova criatura e cidadão dos céus.

Jesus deseja que você viva em abundância e guarde Seus mandamentos por amor.
Primeiro: Tenha plena certeza da salvação firmada nas promessas infalíveis da Bíblia Sagrada.
Segundo: Dê o passo público de obediência descendo às águas do batismo, testemunhando a morte da velha vida e a ressurreição em Cristo.
Terceiro: Alimente sua alma todos os dias com a leitura da Bíblia Sagrada.
Quarto: Mantenha comunhão diária com o Pai através da oração sincera em nome de Jesus.
Quinto: Seja uma testemunha fiel e corajosa, compartilhando o amor de Deus com seus familiares e vizinhos.
Sexto: Participe alegremente da manutenção do trabalho do Senhor com dízimos e ofertas voluntárias.
Sétimo: Viva sob a direção e o poder do Espírito Santo, cultivando o fruto do amor, da paz e da mansidão.
Oitavo: Una-se ativamente à igreja local, congregando com fidelidade e servindo com seus dons.

Semeie a semente da fé por onde você passar. Vale a pena plantar para a glória de Deus!"""

async def generate_file(text: str, voice: str, output_path: str):
    try:
        communicate = edge_tts.Communicate(text, voice, rate=RATE)
        await communicate.save(output_path)
        print(f"[OK] Gerado: {os.path.basename(output_path)} ({voice})")
    except Exception as e:
        print(f"[ERRO] Falha ao gerar {output_path}: {e}")

async def main():
    public_audios = os.path.join(os.getcwd(), "frontend", "public", "audios")
    os.makedirs(public_audios, exist_ok=True)

    print("=== Iniciando Geracao dos Audiobooks com Pronuncia e Fonetica Impecaveis ===")
    
    # 1. Licoes de Evangelismo (8 licoes x 2 vozes)
    for licao in LESSONS_EVANGELISMO:
        fem_path = os.path.join(public_audios, f"{licao['filename']}_fem.mp3")
        masc_path = os.path.join(public_audios, f"{licao['filename']}_masc.mp3")
        await generate_file(licao["text"], VOICE_FEM, fem_path)
        await generate_file(licao["text"], VOICE_MASC, masc_path)

    # 2. Audiobook Completo de Evangelismo (2 vozes)
    comp_evang_fem = os.path.join(public_audios, "audiobook_completo_fem.mp3")
    comp_evang_masc = os.path.join(public_audios, "audiobook_completo_masc.mp3")
    await generate_file(AUDIOBOOK_COMPLETO_EVANGELISMO, VOICE_FEM, comp_evang_fem)
    await generate_file(AUDIOBOOK_COMPLETO_EVANGELISMO, VOICE_MASC, comp_evang_masc)

    # 3. Licoes de Discipulado (6 licoes x 2 vozes)
    for disc in LESSONS_DISCIPULADO:
        fem_path = os.path.join(public_audios, f"{disc['filename']}_fem.mp3")
        masc_path = os.path.join(public_audios, f"{disc['filename']}_masc.mp3")
        await generate_file(disc["text"], VOICE_FEM, fem_path)
        await generate_file(disc["text"], VOICE_MASC, masc_path)

    # 4. Audiobook Completo de Discipulado (2 vozes)
    comp_disc_fem = os.path.join(public_audios, "discipulado_completo_fem.mp3")
    comp_disc_masc = os.path.join(public_audios, "discipulado_completo_masc.mp3")
    await generate_file(AUDIOBOOK_COMPLETO_DISCIPULADO, VOICE_FEM, comp_disc_fem)
    await generate_file(AUDIOBOOK_COMPLETO_DISCIPULADO, VOICE_MASC, comp_disc_masc)

    print("=== Concluido! Todos os audios foram gerados com pronuncia brasileira perfeita! ===")

if __name__ == "__main__":
    asyncio.run(main())
