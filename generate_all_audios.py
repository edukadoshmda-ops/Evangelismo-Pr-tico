#file: generate_all_audios.py
import asyncio
import os
import edge_tts

LESSONS_TTS = [
    {
        "id": 1,
        "title": "Primeira Resposta â€” A Certeza da Vida Eterna",
        "text": """A Certeza da SalvaÃ§Ã£o. LiÃ§Ã£o um: Primeira Resposta.
A BÃ­blia Sagrada mostra que nÃ³s podemos ter absoluta certeza da vida eterna.
No livro de Primeira JoÃ£o, capÃ­tulo cinco, versÃ­culo onze, a Palavra de Deus declara:
"E o testemunho Ã© este: que Deus nos deu a vida eterna; e esta vida estÃ¡ no seu Filho."
Deus nos deu a vida eterna como uma dÃ¡diva, e ela estÃ¡ unicamente em Jesus Cristo. Ela nÃ£o Ã© conquistada por religiÃ£o, boas obras ou mÃ©ritos humanos, mas sim recebida pela fÃ© viva em Cristo.
Como estÃ¡ escrito em Primeira CorÃ­ntios, capitulo um, versÃ­culo dezoito:
"Porque a palavra da cruz Ã© loucura para os que perecem; mas para nÃ³s, que somos salvos, Ã© o poder de Deus."
A vida eterna Ã© uma certeza para o seu coraÃ§Ã£o hoje."""
    },
    {
        "id": 2,
        "title": "Segunda Resposta â€” O Amor Incondicional de Deus",
        "text": """A Certeza da SalvaÃ§Ã£o. LiÃ§Ã£o dois: Segunda Resposta.
Deus ama vocÃª de maneira profunda e incondicional, e deseja lhe conceder a vida eterna.
No Evangelho de JoÃ£o, capitulo trÃªs, versÃ­culo dezesseis, estÃ¡ registrado:
"Porque Deus amou o mundo de tal maneira que deu o seu Filho unigÃªnito, para que todo aquele que nele crÃª nÃ£o pereÃ§a, mas tenha a vida eterna."
O amor de Deus tomou a iniciativa. Ele nÃ£o esperou que fÃ·ssemos perfeitos. Ele entregou o Seu bem mais precioso para que vocÃª tivesse comunhÃ£o com Ele por toda a eternidade."""
    },
    {
        "id": 3,
        "title": "Terceira Resposta â€” A CondiÃ§Ã£o do Homem Pecador",
        "text": """A Certeza da SalvaÃ§Ã£o. LiÃ§Ã£o trÃªs: Terceira Resposta.
Todos nÃ³s somos pecadores e o pecado nos separa da presenÃ§a santa de Deus.
Na Carta aos Romanos, capÃ­tulo trÃªs, versÃ­culo vinte e trÃªs, a BÃ­blia afirma:
"Porque todos pecaram e estÃ£o separados da presenÃ§a de Deus."
Reconhecer que precisamos de salvacÃ£o e que nÃ£o podemos nos salvar a nÃ³s mesmos Ã© o primeiro passo para encontrar a verdadeira paz e o perdÃ£o em Deus."""
    },
    {
        "id": 4,
        "title": "Quarta Resposta â€” A ConsequÃªncia do Pecado e a Eternidade",
        "text": """A Certeza da SalvacÃ£o. LiÃ§Ã£o quatro: Quarta Resposta.
O pecado traz como consequÃªncia inevitÃ¡vel a morte e a separaÃ§Ã£o espiritual de Deus.
Na Carta aos Romanos, capÃ­tulo seis, versÃ­culo vinte e trÃªs, lemos:
"Porque o salÃ¡rio do pecado Ã© a morte."
A BÃ­blia apresenta a morte fÃ­sica como a transiÃ§Ã£o para a eternidade, no cÃ©u com Deus ou na condenaÃ§Ã£o eterna.
O conto bÃ­blico do homem rico e de LÃ¡zaro nos ensina que, apÃ³s a morte, nÃ£o hÃ¡ passagem de um lugar para o outro. Por isso, a decisÃ£o mais importante da sua vida precisa ser tomada agora, enquanto hÃ¡ tempo."""
    },
    {
        "id": 5,
        "title": "Quinta Resposta â€” A SoluÃ§Ã£o Perfeita em Jesus Cristo",
        "text": """A Certeza da SalvacÃ£o. LiÃ§Ã£o cinco: Quinta Resposta.
Deus providenciou a soluÃ§Ã£o definitiva para a nossa condenaÃ§Ã£o: Jesus Cristo morreu em nosso lugar.
Na Carta aos Romanos, capitulo cinco, versÃ­culo oito, lemos com gratidÃ£o:
"Mas Deus prova o seu prÃ³prio amor para conosco pelo fato de ter Cristo morrido por nos, sendo nÃ³s ainda pecadores."
Jesus entregou o seu prÃ³prio corpo e derramou o seu sangue precioso na cruz para o perdÃ£o de todos os nossos pecados.
Como nos lembra Primeira CorÃ­ntios, capitulo cinco, versÃ­culo sete:
"Pois Cristo, o nosso cordeiro da PÁscoa, jÃ¡ foi sacrificado por nÃ³s."
A cruz foi o pagamento completo da nossa dÃ­vida."""
    },
    {
        "id": 6,
        "title": "Sexta Resposta â€” Recebendo pela FÃ© e OraÃ§Ã£o de DecisÃ£o",
        "text": """A Certeza da SalvacÃ£o. LiÃ§Ã£o seis: Sexta Resposta.
A vida eterna Ã© recebida pela fÃ© pessoal em Jesus Cristo.
No Evangelho de JoÃ£o, capitulo um, versÃ­culo doze, estÃ¡ escrito:
"Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome."
E na Carta aos Romanos, capÃ­tulo dez, versÃ­culo nove:
"Se com a tua boca confessares ao Senhor Jesus, e em teu coraÃ§Ã£o creres que Deus o ressuscitou dentre os mortos, serÃ¡s salvo."
Se vocÃª deseja receber a Cristo agora, faÃ§a com fÃ© esta oraÃ§Ã£o sincera:
Senhor Deus, reconheÃ§o que sou pecador e que preciso de Ti. Creio que Jesus morreu na cruz por mim, pagando o preÃ§o da minha condenaÃ§Ã£o, e que ressuscitou dos mortos. Pela fÃ©, recebo Jesus Cristo como meu Ãºnico Salvador e o Teu Santo EspÃ­rito em meu coraÃ§Ã£o. AmÃ©m."""
    },
    {
        "id": 7,
        "title": "SÃ©tima Resposta â€” O Novo Nascimento e o Exame Sincero",
        "text": """A Certeza da SalvaÃ§Ã£o. LiÃ§Ã£o sete: SÃ©tima Resposta.
A nossa decisÃ£o por Cristo deve ser examinada com sinceridade de coraÃ§Ã£o.
No Livro de Atos dos AppìÜİÛÜËØ\0ë][È^™[›İ™K™\œğëXİ[ÈÚ\Ë][È\™İ[İN‚ˆ”™XÙX™\İ\È°ìÜÈÈ\Ü0ë\š]ÈØ[È]X[™ÈÜ™\İ\ÏÈ‚H™\™YZ\˜HXÚ\ğèÛÈ°èÛÈÙ\˜H\[˜\È[HÛÛšXÚ[Y[ÈpìÜšXÛËX\È[H›İ›È˜\ØÚ[Y[È\Ü\š]X[‚“›È]˜[™Ù[ÈH›ğèÛËØ\][È°êœË™\œğëXİ[ÜÈÙZ\ÈHÙ]K™\İ\ÈXÛ\›İN‚ˆ“È]YH0êH˜\ØÚYÈHØ\›™H0êHØ\›™KHÈ]YH0êH˜\ØÚYÈÈ\Ü0ë\š]È0êH\Ü0ë\š]Ëˆ™XÙ\Üğè\š[È›ÜÈ0êH˜\ØÙ\ˆH›İ›Ëˆ‚‘˜péØHYÛÜ˜H\İH\™İ[HHÚHY\Û[Î‚”ÙH›Øğêˆ\\ÜÙH\İH][™ÈÚ™K\šXHÙ\^˜HXœÛÛ]HH]YH\İ0èHØ[›ÏÂ”ÙH›Øğêˆ[™YÛİHİXHšYHHÜš\İË\ÜØHÙ\^˜HXš]H[HÙ]HÛÜ˜péğèÛÈ[È\Ü0ë\š]ÈØ[Ëˆˆˆ‚ˆKˆÂˆšYˆˆ]Hˆ“Ú]]˜H™\ÜÜİH8 %ÛÛ\\[[™ÈHØ[˜péğèÛÈHÛÛ˜Û\ğèÛÈ‹ˆ^ˆˆˆHÙ\^˜HHØ[˜péğèÛËˆpéğèÛÈÚ]ÎˆÚ]]˜H™\ÜÜİK‚”]Y[H^\š[Y[HHØ[˜péğèÛÈ[HHX\˜]š[ÜØHZ\ÜğèÛÈHÛÛ\\[0èK[HÛÛHİ]˜\ÈšY\Ë‚“›È]œ›ÈÈ›Ù™]H\ØZX\ËØ\][ÈÚ[œ]Y[HHÚ\Ë™\œğëXİ[ÈÙ]K[[ÜÎ‚ˆ”]pèÛÈ›Ü›[ÜÛÜÈğèÛÈÛØœ™HÜÈ[Û\ÈÛÛ[ÈÜÈ0ê\ÈÜÈ]YH[[˜ÚX[H\È›Ø\È›İ˜\ËÜÈ]YH[[˜ÚX[HHØ[˜XpéğèÛËˆ‚‘HÈ°ìÜš[ÈÙ[šÜˆ™\İ\È›ÜÈÜ™[›İH›È]˜[™Ù[ÈHX]]\ËØ\][Èš[HHÚ]Ë™\œğëXİ[ÜÈ^™[›İ™HHš[N‚ˆ’YHH˜^™ZH\Øğë\[ÜÈHÙX\È\È˜péğíY\Ë˜]^˜[™Ë[ÜÈ[H›ÛYHÈZKHÈš[ËHÈ\Ü0ë\š]ÈØ[Ëˆ‚˜Z°[Y[œØH[YÜšXH›ÜÈğê]\ÈX[HHØYH\ÜÛØH]YHÙH›ÛH\˜H]\ËÛÛ[È^ˆÈ]˜[™Ù[ÈHXØ\ËØ\][È]Z[™K™\œğëXİ[ÈÙ]N‚ˆš]™\°èHXZ\È[YÜšXH›Èğê]HÜˆ[HXØYÜˆ]YHÙH\œ™\[™Kˆ‚ÛÛ˜Û\ğèÛÎˆH°ëX›XH[œÚ[˜H]YHÙÜÈÛÛ[ÜÈXØYÜ™\ËX\È]\ËÜˆ[™š[š]È[[Ü‹[š[İH™\İ\ÈÜš\İÈ\˜H[Üœ™\ˆ[H›ÜÜÛÈYØ\‹ˆHØ[˜XğèÛÈ0êH™XÙXšYH[H°êH[HÜš\İÈH]™HÙ\ˆ›ØÛ[XYHÛÛH[[ÜˆHÙ\ˆ[È][™È[Z\›Ëˆˆˆ‚ˆB—B‚•“ÒPÑTÈHÂˆ™™[HˆÈ›˜[YHˆœP”‹Qœ˜[˜Ú\ØØS™]\˜[‹›X™[ˆ•›Şˆ™[Z[š[˜H
œ˜[˜Ú\ØØJHŸKˆ›X\ØÈˆÈ›˜[YHˆœP”‹P[Ûš[Ó™]\˜[‹›X™[ˆ•›ŞˆX\Øİ[[˜H
[Ûš[ÊHŸBŸB‚“ÕUUÑT”ÈHÂˆÜËœ]š›Ú[Š™œ›Û[™‹œX›XÈ‹˜]Y[ÜÈŠKˆÜËœ]š›Ú[Š™œ›Û[™‹™\İ‹˜]Y[ÜÈŠB—B‚˜\Ş[˜ÈYˆÙ[™\˜]J
N‚ˆ›Üˆ[ˆÕUUÑT”Î‚ˆÜË›XZÙY\œÊ^\İÛÚÏUYJBˆˆš[
’[šXÚX[™ÈÙ\˜XØ[ÈÜÈ]Y[ÜÈ[H›Şˆ™[Z[š[˜HHX\Øİ[[˜K‹‹ˆŠBˆ›Üˆ\ÜÛÛˆ[ˆTÔÓÓ”×ÕÎ‚ˆYH\ÜÛÛ–ÈšY—Bˆ›Üˆ—ÚÙ^K—Ú[™›È[ˆ“ÒPÑTËš][\Ê
N‚ˆš[[˜[YHHˆ˜]Y[×ÛXØ[×ŞÛYWŞİ—ÚÙ^_K›\È‚ˆš[
ˆ‹OˆÙ\˜[™ÈXØ[ÈÛYHHİ—Ú[™›ÖÉÛX™[	×_HŠBˆÛÛ[][šXØ]HHYÙWİËÛÛ[][šXØ]Jˆ^[\ÜÛÛ–È^—Kˆ›ÚXÙO]—Ú[™›ÖÈ›˜[YH—Kˆ˜]OH‹Lˆˆ
È‰H‹ˆ]ÚHŠÌˆ‚ˆ
Bˆ\İÜš[X\HHÜËœ]š›Ú[ŠÕUUÑT”ÖÌKš[[˜[YJBˆ]ØZ]ÛÛ[][šXØ]KœØ]™J\İÜš[X\JBˆ\İÙ\İHÜËœ]š›Ú[ŠÕUUÑT”ÖÌWKš[[˜[YJBˆÚ]Ü[Š\İÜš[X\Kœ˜ˆŠH\È—ÜÜ˜Î‚ˆÚ]Ü[Š\İÙ\İØˆŠH\È—Ùİ‚ˆ—ÙİÜš]J—ÜÜ˜Ëœ™XY

JBˆš[
ˆˆØ[›ÎˆÙš[[˜[Y_HŠB‚ˆš[
‘Ù\˜[™È]Y[Ø›ÛÚÜÈÛÛ\]ÜË‹‹ˆŠBˆ[İ^H——ˆ‹š›Ú[ŠÛÈ]H—H
È‹—ˆˆ
ÈÈ^—H›Üˆ[ˆTÔÓÓ”×Õ×JBˆ›Üˆ—ÚÙ^K—Ú[™›È[ˆ“ÒPÑTËš][\Ê
N‚ˆš[[˜[YHHˆ˜]Y[Ø›ÛÚ×ØÛÛ\]×Şİ—ÚÙ^_K›\È‚ˆš[
ˆ‹OˆÙ\˜[™È]Y[Ø›ÛÚÈÛÛ\]ÈHİ—Ú[™›ÖÉÛX™[	×_HŠBˆÛÛ[][šXØ]HHYÙWİËÛÛ[][šXØ]Jˆ^Y[İ^ˆ›ÚXÙO]—Ú[™›ÖÈ›˜[YH—Kˆ˜]OH‹Lˆˆ
È‰H‹ˆ]ÚHŠÌˆ‚ˆ
Bˆ\İÜš[X\HHÜËœ]š›Ú[ŠÕUUÑT”ÖÌKš[[˜[YJBˆ]ØZ]ÛÛ[][šXØ]KœØ]™J\İÜš[X\JBˆ\İÙ\İHÜËœ]š›Ú[ŠÕUUÑT”ÖÌWKš[[˜[YJBˆÚ]Ü[Š\İÜš[X\Kœ˜ˆŠH\È—ÜÜ˜Î‚ˆÚ]Ü[Š\İÙ\İØˆŠH\È—Ùİ‚ˆ—ÙİÜš]J—ÜÜ˜Ëœ™XY

JBˆš[
ˆˆØ[›ÎˆÙš[[˜[Y_HŠB‚ˆš[
”ÕPÑTÔÓ×ÕÕSĞUQSÔÈŠB‚šYˆ×Û˜[YW×OH—×ÛXZ[—×È‚ˆ\Ş[˜Ú[Ëœ[ŠÙ[™\˜]J
JB