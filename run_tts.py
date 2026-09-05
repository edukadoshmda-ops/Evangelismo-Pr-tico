import json
import asyncio
import os
import edge_tts
lessons = [
  {
    "id": 1,
    "title": "Primeira Resposta - A Certeza da Vida Eterna",
    "text": "A Certeza da Salvacão. Lição um: Primeira Resposta. A Bíblia Sagrada mostra que nós podemos ter absoluta certeza da vida eterna. No livro de Primeira João, capítulo cinco, versículo onze, a Palavra de Deus declara: E o testemunho é este: que Deus nos deu a vida eterna; esta vida está no seu Filho. Deus nos deu a vida eterna como uma dáidiva, e ela está unicamente em Jesus Cristo. Ela não é conquistada por religião, boas obras ou méritos humanos, mas sim recebida pela fé viva em Cristo. Como está escrito em Primeira Coríntios, capitulo um, versículo dezoito: Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus. A vida eterna é uma certeza para o seu coração hoje."
  },
  {
    "id": 2,
    "title": "Segunda Resposta - O Amor Incondicional de Deus",
    "text": "A Certeza da Salvação. Lição dois: Segunda Resposta. Deus ama você de maneira profunda e incondicional, e deseja lhe conceder a vida eterna. No Evangelho de João, capitulo três, versículo dezesseis, está registrado: Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereca, mas tenha a vida eterna. O amor de Deus tomou a iniciativa. Ele não esperou que f÷ssemos perfeitos. Ele entregou o Seu bem mais precioso para que você tivesse comunhão com Ele por toda a eternidade."
  },
  {
    "id": 3,
    "title": "Terceira Resposta - A Condição do Homem Pecador",
    "text": "A Certeza da Salvacão. Lição três: Terceira Resposta. Todos nós somos pecadores e o pecado nos separa da presença santa de Deus. Na Carta aos Romanos, capítulo três, versículo vinte e três, a Bíblia afirma: Porque todos pecaram e estão separados da presença de Deus. Reconhecer que precisamos de salvação e que não podemos nos salvar a nós mesmos, é o primeiro passo para encontrar a paz verdadeira e o perdão em Deus."
  },
  {
    "id": 4,
    "title": "Quarta Resposta - A Consequência do Pecado e a Eternidade",
    "text": "A Certeza da Salvacão. Lição quatro: Quarta Resposta. O pecado traz como consequência inevitável a morte e a separação espiritual de Deus. Na Carta aos Romanos, capítulo seis, versículo vinte e três, lemos: Porque o salário do pecado é a morte. A Bíblia apresenta a morte física como a transição para a eternidade, no céu com Deus ou na condenação eterna. O relato bíblico do homem rico e de Lázaro nos ensina que, após a morte, não há passagem de um lugar para o outro. Por isso, a decisão mais importante da sua vida precisa ser tomada agora, enquanto há tempo."
  },
  {
    "id": 5,
    "title": "Quinta Resposta - ASolução Perfeita em Jesus Cristo",
    "text": "A Certeza da Salvacão. Lição cinco: Quinta Resposta. Deus providenciou a solução definitiva para a nossa condenação: Jesus Cristo morreu em nosso lugar. Na Carta aos Romanos, capitulo cinco, versículo oito, lemos com gratidão: Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores. Jesus entregou o seu próprio corpo e derramou o seu sangue precioso na cruz para o perdão de todos os nossos pecados. Como nos lembra Primeira Corítios, capítulo cinco, versículo sete: Pois Cristo, o nosso cordeiro da Páscoa, já foi sacrificado por nós. A cruz foi o pagamento completo da nossa dívida."
  },
  {
    "id": 6,
    "title": "Sexta Resposta - Recebendo pela Fé e Oração de Decisão",
    "text": "A Certeza da Salvacão. Lição seis: Sexta Resposta. A vida eterna é recebida pela fé pessoal em Jesus Cristo. No Evangelho de João, capitulo um, versículo doze, está escrito: Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome. E na Carta aos Romanos, capítulo dez, versículo nove: Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo. Se você deseja receber a Cristo agora, faça com fé esta oração sincera: Senhor Deus, reconheço que sou pecador e que preciso de Ti. Creio que Jesus morreu na cruz por mim, pagando o preço da minha condenação, e que ressuscitou dos mortos. Pela fé, recebo Jesus Cristo como meu único Salvador e o Teu Santo Espírito em meu coração. Amêm."
  },
  {
    "id": 7,
    "title": "Sétima Resposta - O Novo Nascimento e o Exame Sincero",
    "text": "A Certeza da Salvação. Lição sete: Sétima Resposta. A nossa decisão por Cristo deve ser examinada com sinceridade de coração. No Livro de Atos dos Apóstolos, capítulo dezenove, versículo dois, Paulo perguntou: Recebestes vós o Espírito Santo quando crestes? A verdadeira decisão não gera apenas um conhecimento teórico, mas um novo nascimento espiritual. No Evangelho de João, capítulo três, versículos seis e sete, Jesus declarou: O que é nascido da carne é carne, e o que é nascido do Espírito é espírito. Necessário vos é nascer de novo. Faca agora esta pergunta a si mesmo: Se você partisse deste mundo hoje, teria certeza absoluta de que está salvo? Se você entregou sua vida a Cristo, essa certeza habita em seu coração pelo Espírito Santo."
  },
  {
    "id": 8,
    "title": "Oitava Resposta - Compartilhando a Salvação e Conclusão",
    "text": "A Certeza da Salvacão. Lição oito: Oitava Resposta. Quem experimenta a salvação tem a maravilhosa missão de compartilhá-la com outras vidas. No Livro do profeta Isaias, capitulo cinquenta e dois, versículo sete, lemos: Quão formosos são sobre os montes os pés dos que anunciam as boas novas, dos que anunciam a salvaação. E o próprio Senhor Jesus nos ordenou no Evangelho de Mateus, capítulo vinte e oito, versículos dezenove e vinte: Ide e fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo. Há imensa alegria nos céus diante de cada pessoa que se volta para Deus, como diz o Evangelho de Lucas, capítulo quinze, versículo sete: Haverá mais alegria no céu por um pecador que se arrepende. Conclusão: A Bíblia ensina que todos somos pecadores, mas Deus, por infinito amor, enviou Jesus Cristo para morrer em nosso lugar. A salvacão é recebida pela fé em Cristo e deve ser proclamada com amor e poder ao mundo inteiro."
  }
]
VOICES = {
  "fem": {"name": "pt-BR-FranciscaNeural", "label": "Voz Feminina (Francisca)"},
  "masc": {"name": "pt-BR-AntonioNeural", "label": "Voz Masculina (Antonio)"}
}
OUTPUT_DIRS = [
  os.path.join("frontend", "public", "audios"),
  os.path.join("frontend", "dist", "audios")
]
async def run():
  for d in OUTPUT_DIRS:
    os.makedirs(d, exist_ok=True)
  print("Iniciando geracao dos 8 audios em voz Feminina e Masculina...")
  for lesson in lessons:
    lid = lesson["id"]
    for v_key, v_info in VOICES.items():
      filename = f"audio_licao_{lid}_{v_key}.mp3"
      print(f"-> Gerando Licao {lid} (){v_info['label']})...")
      communicate = edge_tts.Communicate(text=lesson["text"], voice=v_info["name"], rate="-2%", pitch="+0Hz")
      dest_primary = os.path.join(OUTPUT_DIRS[0], filename)
      await communicate.save(dest_primary)
      dest_dist = os.path.join(OUTPUT_DIRS[1], filename)
      with open(dest_primary, "rb") as f_src:
        with open(dest_dist, "wb") as f_dst:
          f_dst.write(f_src.read())
      print(f"   Salvo: {filename}")
  print("Gerando Audiobooks Completos Integrados...")
  full_text = "\n\n".join([l["title"] + ".\n" + l["text"] for l in lessons])
  for v_key, v_info in VOICES.items():
    filename = f"audiobook_completo_{v_key}.mp3"
    print(f"-> Gerando Audiobook Completo ({v_info['label']})...")
    communicate = edge_tts.Communicate(text=full_text, voice=v_info["name"], rate="-2%", pitch="+0Hz")
    dest_primary = os.path.join(OUTPUT_DIRS[0], filename)
    await communicate.save(dest_primary)
    dest_dist = os.path.join(OUTPUT_DIRS[1], filename)
    with open(dest_primary, "rb") as f_src:
      with open(dest_dist, "wb") as f_dst:
        f_dst.write(f_src.read())
    print(f"   Salvo: {filename}")
  print("GERACAO_FINAL_COMPLETA")
if __name__ == "__main__":
  asyncio.run(run())
