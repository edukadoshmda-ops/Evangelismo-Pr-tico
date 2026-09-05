import asyncio
import os
import shutil
import edge_tts

# Vozes Oficiais Microsoft Neural
VOICE_FEM = "pt-BR-FranciscaNeural"
VOICE_MASC = "pt-BR-AntonioNeural"
RATE = "-2%"

LESSONS = [
    {
        "num": 1,
        "filename": "audio_licao_1",
        "text": """A Certeza da Salvação. Lição um: Primeira Resposta. A Bíblia Sagrada mostra que podemos ter absoluta certeza da vida eterna. Na Primeira Carta de João, capítulo cinco, versículo onze, a Palavra de Deus declara: E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho. Deus nos deu a vida eterna como uma dádiva, e ela está unicamente em Jesus Cristo. Ela não é conquistada por religião, boas obras ou méritos humanos, mas sim recebida pela fé viva em Cristo. Como está escrito em Primeira Coríntios, capítulo um, versículo dezoito: Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus. A vida eterna é uma certeza para o seu coração hoje."""
    },
    {
        "num": 2,
        "filename": "audio_licao_2",
        "text": """A Certeza da Salvação. Lição dois: Segunda Resposta. Deus ama você profundamente e deseja lhe conceder a vida eterna. No Evangelho de João, capítulo três, versículo dezesseis, encontramos a mais linda declaração do amor divino: Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna. O plano de Deus para a sua vida é vida abundante, comunhão e salvação eterna."""
    },
    {
        "num": 3,
        "filename": "audio_licao_3",
        "text": """A Certeza da Salvação. Lição três: Terceira Resposta. Todos nós somos pecadores e o pecado nos separa da presença santa de Deus. Na Carta aos Romanos, capítulo três, versículo vinte e três, a Bíblia afirma: Porque todos pecaram e estão separados da presença de Deus. Reconhecer que precisamos de salvação e que não podemos nos salvar a nós mesmos é o primeiro passo para encontrar a paz verdadeira e o perdão em Deus."""
    },
    {
        "num": 4,
        "filename": "audio_licao_4",
        "text": """A Certeza da Salvação. Lição quatro: Quarta Resposta. O pecado traz como consequência inevitável a morte e a separação espiritual de Deus. Na Carta aos Romanos, capítulo seis, versículo vinte e três, lemos: Porque o salário do pecado é a morte. A Bíblia apresenta a morte física como a transição para a eternidade, no céu com Deus ou na condenação eterna. O relato bíblico do homem rico e de Lázaro nos ensina que após a morte não há passagem de um lugar para o outro. Por isso, a decisão mais importante da sua vida precisa ser tomada agora, enquanto há tempo."""
    },
    {
        "num": 5,
        "filename": "audio_licao_5",
        "text": """A Certeza da Salvação. Lição cinco: Quinta Resposta. Deus providenciou a solução definitiva para a nossa condenação: Jesus Cristo morreu em nosso lugar. Na Carta aos Romanos, capítulo cinco, versículo oito, lemos com gratidão: Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores. Jesus entregou o seu próprio corpo e derramou o seu sangue precioso na cruz para o perdão de todos os nossos pecados. Como nos lembra Primeira Coríntios, capítulo cinco, versículo sete: Pois Cristo, o nosso cordeiro da Páscoa, já foi sacrificado por nós. A cruz foi o pagamento completo da nossa dívida."""
    },
    {
        "num": 6,
        "filename": "audio_licao_6",
        "text": """A Certeza da Salvação. Lição seis: Sexta Resposta. A vida eterna é recebida pela fé pessoal em Jesus Cristo. No Evangelho de João, capítulo um, versículo doze, está escrito: Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome. E na Carta aos Romanos, capítulo dez, versículo nove: Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo. Se você deseja receber a Cristo agora, faça com fé esta oração sincera: Senhor Deus, reconheço que sou pecador e que preciso de Ti. Creio que Jesus morreu na cruz por mim, pagando o preço da minha condenação, e que ressuscitou dos mortos. Pela fé, recebo Jesus Cristo como meu único Salvador e o Teu Santo Espírito em meu coração. Amém."""
    },
    {
        "num": 7,
        "filename": "audio_licao_7",
        "text": """A Certeza da Salvação. Lição sete: Sétima Resposta. Quando recebemos a Cristo, uma transformação real acontece em nosso ser. Em Segunda Coríntios, capítulo cinco, versículo dezessete, a Palavra nos ensina: Assim que, se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo. Ao receber a salvação, tornamo-nos filhos de Deus, temos os nossos pecados perdoados e passamos a desfrutar de paz e comunhão diária com o Pai celeste."""
    },
    {
        "num": 8,
        "filename": "audio_licao_8",
        "text": """A Certeza da Salvação. Lição oito: Oitava Resposta. Quem experimenta a salvação tem a maravilhosa missão de compartilhá-la com outras vidas. No Livro do profeta Isaías, capítulo cinquenta e dois, versículo sete, lemos: Quão formosos são sobre os montes os pés dos que anunciam as boas novas, dos que anunciam a salvação. E o próprio Senhor Jesus nos ordenou no Evangelho de Mateus, capítulo vinte e oito, versículos dezenove e vinte: Ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo. Há imensa alegria nos céus diante de cada pessoa que se volta para Deus, como diz o Evangelho de Lucas, capítulo quinze, versículo sete: Haverá mais alegria no céu por um pecador que se arrepende. Conclusão: A Bíblia ensina que todos somos pecadores, mas Deus, por infinito amor, enviou Jesus Cristo para morrer em nosso lugar. A salvação é recebida pela fé em Cristo e deve ser proclamada com amor e gratidão ao mundo inteiro."""
    }
]

# Audiobook completo integrando as 8 lições
AUDIOBOOK_COMPLETO = """A Certeza da Salvação. Estudo Bíblico Completo em oito lições.

Primeira Resposta. A Bíblia Sagrada mostra que podemos ter absoluta certeza da vida eterna. Na Primeira Carta de João, capítulo cinco, versículo onze: E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho. Deus nos deu a vida eterna como dádiva, e ela está unicamente em Jesus Cristo. Como está escrito em Primeira Coríntios, capítulo um, versículo dezoito: A palavra da cruz é o poder de Deus para nós que somos salvos.

Segunda Resposta. Deus ama você profundamente e deseja lhe conceder a vida eterna. Em João, capítulo três, versículo dezesseis: Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.

Terceira Resposta. Todos nós somos pecadores e o pecado nos separa de Deus. Em Romanos, capítulo três, versículo vinte e três: Porque todos pecaram e estão separados da presença de Deus. Reconhecer que precisamos de salvação é o primeiro passo para encontrar a verdadeira paz.

Quarta Resposta. O pecado traz como consequência a morte espiritual. Em Romanos, capítulo seis, versículo vinte e três: O salário do pecado é a morte. Por isso, a decisão mais importante da sua vida precisa ser tomada hoje.

Quinta Resposta. Deus providenciou a solução definitiva: Jesus Cristo morreu em nosso lugar. Em Romanos, capítulo cinco, versículo oito: Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores. Jesus pagou toda a nossa dívida na cruz.

Sexta Resposta. A vida eterna é recebida pela fé em Jesus Cristo. Em João, capítulo um, versículo doze: A todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus. Se deseja receber a Cristo, ore com fé: Senhor Deus, reconheço que sou pecador e preciso de Ti. Creio que Jesus morreu por mim e ressuscitou. Recebo Jesus como meu Salvador. Amém.

Sétima Resposta. Em Cristo, tornamo-nos nova criação. Em Segunda Coríntios, capítulo cinco, versículo dezessete: Se alguém está em Cristo, nova criatura é; as coisas velhas já passaram; eis que tudo se fez novo.

Oitava Resposta e Conclusão. Compartilhe a salvação com outras vidas. Como disse o Senhor Jesus em Mateus vinte e oito: Ide e fazei discípulos de todas as nações. A salvação é uma dádiva de Deus para você hoje."""

async def generate_file(text: str, voice: str, output_path: str):
    communicate = edge_tts.Communicate(text, voice, rate=RATE)
    await communicate.save(output_path)
    print(f"Gerado: {output_path} ({voice})")

async def main():
    public_dir = os.path.join(os.getcwd(), "frontend", "public", "audios")
    dist_dir = os.path.join(os.getcwd(), "frontend", "dist", "audios")
    os.makedirs(public_dir, exist_ok=True)
    os.makedirs(dist_dir, exist_ok=True)

    print("--- Iniciando Geração dos 18 Audiobooks com Fonética e Salvação Corrigidas ---")

    # 1. Gerar as 8 Lições (Feminino e Masculino)
    for licao in LESSONS:
        fem_file = os.path.join(public_dir, f"{licao['filename']}_fem.mp3")
        masc_file = os.path.join(public_dir, f"{licao['filename']}_masc.mp3")
        
        await generate_file(licao["text"], VOICE_FEM, fem_file)
        await generate_file(licao["text"], VOICE_MASC, masc_file)

    # 2. Gerar o Audiobook Completo (Feminino e Masculino)
    comp_fem = os.path.join(public_dir, "audiobook_completo_fem.mp3")
    comp_masc = os.path.join(public_dir, "audiobook_completo_masc.mp3")
    
    await generate_file(AUDIOBOOK_COMPLETO, VOICE_FEM, comp_fem)
    await generate_file(AUDIOBOOK_COMPLETO, VOICE_MASC, comp_masc)

    # Copiar todos para frontend/dist/audios
    for file in os.listdir(public_dir):
        if file.endswith(".mp3"):
            shutil.copy2(os.path.join(public_dir, file), os.path.join(dist_dir, file))

    print("--- Todos os 18 áudios foram gerados e sincronizados com sucesso! ---")

if __name__ == "__main__":
    asyncio.run(main())
