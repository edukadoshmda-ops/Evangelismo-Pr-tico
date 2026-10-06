# -*- coding: utf-8 -*-
"""
generate_manual_oficial_pdf.py
Gera o Manual Oficial de Formação de Discípulos e Evangelismo Bíblico
com padrão editorial profissional, tipografia arejada, proporção harmônica
e leitura agradável e fluida.
"""

import os
import shutil
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, Image, HRFlowable
)
from reportlab.pdfgen import canvas

PAGE_WIDTH, PAGE_HEIGHT = A4

class NumberedCanvas(canvas.Canvas):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        # Cabeçalho superior (a partir da página 2)
        if self._pageNumber > 1:
            self.setFont("Helvetica-Bold", 7.5)
            self.setFillColor(colors.HexColor("#0f766e")) # Teal 700
            self.drawString(36, 810, "MINISTÉRIO DE EVANGELISMO PRÁTICO")
            self.setFont("Helvetica-Bold", 7.5)
            self.setFillColor(colors.HexColor("#475569")) # Slate 600
            self.drawRightString(559, 810, "PASTOR ROBERTO RODRIGUES CASAS")
            self.setStrokeColor(colors.HexColor("#cbd5e1"))
            self.setLineWidth(0.6)
            self.line(36, 804, 559, 804)

        # Linha inferior e rodapé numerado em TODAS as páginas (Página 1, 2, 3...)
        self.setStrokeColor(colors.HexColor("#cbd5e1"))
        self.setLineWidth(0.6)
        self.line(36, 38, 559, 38)
        self.setFont("Helvetica", 7.5)
        self.setFillColor(colors.HexColor("#64748b")) # Slate 500
        self.drawString(36, 28, "A Certeza da Salvação & Curso de Batismo e Discipulado")
        page_text = f"Página {self._pageNumber} de {page_count}"
        self.drawRightString(559, 28, page_text)
        self.restoreState()


def create_verse_box(verse_text: str, reference: str, base_width=523):
    """Cria uma caixinha com design moderno, arejado e refinado para versículos bíblicos."""
    style_text = ParagraphStyle(
        'VerseText',
        fontName='Helvetica-Oblique',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#0f766e')
    )
    style_ref = ParagraphStyle(
        'VerseRef',
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        alignment=2,
        textColor=colors.HexColor('#047857')
    )
    p_text = Paragraph(f'“{verse_text.strip("“”\"")}”', style_text)
    p_ref = Paragraph(f'— {reference}', style_ref)
    
    t = Table([[p_text], [p_ref]], colWidths=[base_width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdfa')),
        ('BOX', (0,0), (-1,-1), 0.7, colors.HexColor('#99f6e4')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    return t


def create_reason_box(num: int, title: str, text: str, verse: str, base_width=523):
    """Caixa destacada e arejada para cada uma das 8 Razões Bíblicas de Evangelizar."""
    style_title = ParagraphStyle(
        f'ReasonTitle_{num}',
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14.5,
        textColor=colors.HexColor('#0f766e')
    )
    style_verse = ParagraphStyle(
        f'ReasonVerse_{num}',
        fontName='Helvetica-Oblique',
        fontSize=9,
        leading=12.5,
        textColor=colors.HexColor('#0284c7')
    )
    style_body = ParagraphStyle(
        f'ReasonBody_{num}',
        fontName='Helvetica',
        fontSize=9.5,
        leading=13.5,
        textColor=colors.HexColor('#1e293b')
    )

    cell_content = [
        Paragraph(f"<b>{num}. {title}</b>", style_title),
        Spacer(1, 2),
        Paragraph(f"<i>{verse}</i>", style_verse),
        Spacer(1, 4),
        Paragraph(text, style_body)
    ]

    t = Table([[cell_content]], colWidths=[base_width])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 0.6, colors.HexColor('#cbd5e1')),
        ('LINELEFT', (0,0), (-1,-1), 3.5, colors.HexColor('#0d9488')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 10),
        ('RIGHTPADDING', (0,0), (-1,-1), 10),
    ]))
    return t


def build_manual_pdf(output_path: str):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=36,
        rightMargin=36,
        topMargin=46,
        bottomMargin=46,
        title="Pr Roberto Casas - Evangelismo Prático",
        author="Pr. Roberto Rodrigues Casas",
        subject="A Certeza da Salvação & Curso de Batismo e Discipulado",
        creator="Evangelismo Prático"
    )

    # =========================================================================
    # HIERARQUIA TIPOGRÁFICA EDITORIAL E CONFORTÁVEL
    # =========================================================================
    part_header = ParagraphStyle('PartHeader', fontName='Helvetica-Bold', fontSize=15, leading=19, textColor=colors.HexColor('#b45309'), keepWithNext=True)
    part_sub = ParagraphStyle('PartSub', fontName='Helvetica', fontSize=9.5, leading=13.5, textColor=colors.HexColor('#0d9488'), keepWithNext=True)
    lesson_title = ParagraphStyle('LessonTitle', fontName='Helvetica-Bold', fontSize=12.5, leading=16, textColor=colors.HexColor('#002b66'), keepWithNext=True)
    refl_style = ParagraphStyle('ReflQuestion', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=colors.HexColor('#0d9488'), keepWithNext=True)
    sub_topic = ParagraphStyle('SubTopic', fontName='Helvetica-Bold', fontSize=10, leading=14, textColor=colors.HexColor('#b45309'), keepWithNext=True)

    body_style = ParagraphStyle('DocBody', fontName='Helvetica', fontSize=9.5, leading=13.5, textColor=colors.HexColor('#1e293b'))
    body_bold = ParagraphStyle('DocBodyBold', fontName='Helvetica-Bold', fontSize=9.5, leading=13.5, textColor=colors.HexColor('#0f172a'))
    qa_check = ParagraphStyle('QACheck', fontName='Helvetica', fontSize=9, leading=13.0, textColor=colors.HexColor('#1e293b'))
    qa_write = ParagraphStyle('QAWrite', fontName='Helvetica', fontSize=9.5, leading=13.5, textColor=colors.HexColor('#1e293b'))
    line_fill = ParagraphStyle('LineFill', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#94a3b8'))

    story = []

    # =========================================================================
    # PÁGINA 1: CAPA OFICIAL (DISTRIBUÍDA NA PÁGINA INTEIRA COM ELEGÂNCIA)
    # =========================================================================
    cover_img_path = os.path.join(os.path.dirname(__file__), "frontend", "public", "capa_playbook.png")
    if os.path.exists(cover_img_path):
        # Dimensões da capa oficial harmoniosas (250 x 176 pt)
        img_w = 250
        img_h = 250 * (444 / 630) # ~176.2pt
        img_cover = Image(cover_img_path, width=img_w, height=img_h)
        img_cover.hAlign = 'CENTER'
        story.append(img_cover)
        story.append(Spacer(1, 14))
    else:
        story.append(Spacer(1, 20))

    # 1. Selo Institucional em Pill Badge Elegante
    p_badge = Paragraph("<font color='#0f766e'><b>MINISTÉRIO DE EVANGELISMO PRÁTICO</b></font>", 
                        ParagraphStyle('PillBadge', fontName='Helvetica-Bold', fontSize=8.5, leading=11, alignment=1))
    t_badge = Table([[p_badge]], colWidths=[260])
    t_badge.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdfa')),
        ('BOX', (0,0), (-1,-1), 0.6, colors.HexColor('#99f6e4')),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    t_badge.hAlign = 'CENTER'
    story.append(t_badge)
    story.append(Spacer(1, 12))

    # 2. Título Principal em Hierarquia Nobre
    title_text = """<font size="18" color="#002b66"><b>A CERTEZA DA SALVAÇÃO</b></font><br/>
<font size="13" color="#0f766e"><b>& CURSO DE BATISMO E DISCIPULADO</b></font>"""
    story.append(Paragraph(title_text, ParagraphStyle('MainTitleCover', fontName='Helvetica-Bold', leading=22, alignment=1)))
    story.append(Spacer(1, 8))

    # 3. Subtítulo Descritivo
    story.append(Paragraph("Manual Oficial de Formação de Discípulos e Evangelismo Bíblico", 
                           ParagraphStyle('SubCoverStyle', fontName='Helvetica', fontSize=10.5, leading=14.5, alignment=1, textColor=colors.HexColor('#475569'))))
    story.append(Spacer(1, 6))

    # 4. Crédito Pastoral
    auth_text = "<b>Coordenação e Autoria:</b> <font color='#0f766e'><b>Pastor Roberto Rodrigues Casas</b></font>"
    story.append(Paragraph(auth_text, ParagraphStyle('AuthCoverStyle', fontName='Helvetica', fontSize=9.5, leading=13.5, alignment=1, textColor=colors.HexColor('#334155'))))
    story.append(Spacer(1, 18))

    # 5. Box da Pergunta Mais Importante da Sua Vida
    box_p1_text = """<b>COMEÇAMOS ESTE ESTUDO COM A PERGUNTA MAIS IMPORTANTE DA SUA VIDA:</b><br/>
    <font color="#0f766e"><b>“Pode uma pessoa ter certeza da salvação?”</b></font><br/><br/>
    Estas oito lições de evangelismo e os módulos de discipulado cristão foram cuidadosamente estruturados nas Sagradas Escrituras para ajudar você a refletir, fundamentar a sua fé e tirar suas próprias conclusões com plena certeza bíblica."""
    p_box_p1 = Paragraph(box_p1_text, ParagraphStyle('BoxP1', fontName='Helvetica', fontSize=9.5, leading=14, alignment=1, textColor=colors.HexColor('#1e293b')))
    t_box_p1 = Table([[p_box_p1]], colWidths=[523])
    t_box_p1.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f8fafc')),
        ('BOX', (0,0), (-1,-1), 0.8, colors.HexColor('#cbd5e1')),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_box_p1)
    story.append(Spacer(1, 16))

    # 6. Grid dos 3 Pilares
    c1 = [Paragraph("<b>1. Fundamento Bíblico</b>", ParagraphStyle('P1', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.HexColor('#0f766e'))),
          Paragraph("Passagens bíblicas centrais sem rodeios ou tradições humanas.", ParagraphStyle('P1b', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#475569')))]
    c2 = [Paragraph("<b>2. Reflexão Prática</b>", ParagraphStyle('P2', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.HexColor('#0f766e'))),
          Paragraph("Perguntas objetivas Sim/Não para exame sincero do coração.", ParagraphStyle('P2b', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#475569')))]
    c3 = [Paragraph("<b>3. Discipulado Multiplicador</b>", ParagraphStyle('P3', fontName='Helvetica-Bold', fontSize=9.5, textColor=colors.HexColor('#0f766e'))),
          Paragraph("Questionário para estudo bíblico pessoal e fichas práticas de trilha.", ParagraphStyle('P3b', fontName='Helvetica', fontSize=8.5, leading=11.5, textColor=colors.HexColor('#475569')))]

    t_pilares = Table([[c1, c2, c3]], colWidths=[167, 168, 168])
    t_pilares.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdfa')),
        ('BOX', (0,0), (-1,-1), 0.6, colors.HexColor('#99f6e4')),
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('PADDING', (0,0), (-1,-1), 10),
    ]))
    story.append(t_pilares)
    story.append(Spacer(1, 18))

    # 7. Versículo da Capa
    verse_cover = "“Porque não me envergonho do evangelho de Cristo, pois é o poder de Deus para salvação de todo aquele que crê.” — Romanos 1:16"
    story.append(Paragraph(f"<i>{verse_cover}</i>", ParagraphStyle('VLead', fontName='Helvetica-Oblique', fontSize=9, leading=13, alignment=1, textColor=colors.HexColor('#64748b'))))

    # =========================================================================
    # PARTE I — AS 8 RESPOSTAS BÍBLICAS DA SALVAÇÃO
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("PARTE I — AS 8 RESPOSTAS BÍBLICAS DA SALVAÇÃO", part_header))
    story.append(Paragraph("Guia de Estudo Pessoal e Roteiro de Evangelismo Pessoal", part_sub))
    story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor('#0d9488'), spaceBefore=6, spaceAfter=12))

    # I — PRIMEIRA LIÇÃO
    story.append(Paragraph("I — PRIMEIRA LIÇÃO — A SALVAÇÃO BÍBLICA", lesson_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Pergunta para Reflexão: Quem pode decidir se uma pessoa será salva ou não: Deus ou o homem?", refl_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("1ª Resposta de Deus sobre a Salvação:", sub_topic))
    story.append(create_verse_box("E o testemunho é este: que Deus nos deu a vida eterna; e esta vida está no seu Filho.", "1 João 5:11"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Se Deus deu a vida eterna, Ele está falando a verdade?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se a vida eterna vem de Deus, e Ele decidiu oferecê-la aos pecadores, você acha que existem pessoas dizendo que ninguém pode ser salvo por Deus?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se Deus já deu a vida eterna há mais de 2.000 anos, você acha que existem pessoas mal informadas que pensam que a salvação só será definida no juízo final?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se João estava vivo, e as pessoas para quem ele escreveu também estavam vivas, você acha que existem pessoas dizendo que só podemos saber se somos salvos depois da morte?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se Deus deu a vida eterna, fica claro que é das mãos de Deus que a recebemos. Você acha que existem muitas pessoas enganadas pensando que são salvas por frequentarem religião, guardarem o sábado ou terem sido batizadas quando crianças?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se Deus diz que a vida eterna é nossa por meio de Jesus, você acha que existem pessoas que podem ser salvas por outros meios (boas obras, reencarnação, etc.)?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 10))

    story.append(Paragraph("2ª Resposta de Deus sobre a Salvação:", sub_topic))
    story.append(create_verse_box("Aquele que tem o Filho tem a vida; aquele que não tem o Filho de Deus não tem a vida.", "1 João 5:12"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Se Deus diz que quem tem o Filho de Deus como seu Salvador tem a vida eterna, você acha que existem pessoas contradizendo a Deus e dizendo que ninguém pode ter certeza da salvação?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se a Bíblia diz que quem não tem o Filho de Deus não tem a vida, você acha que existem pessoas afirmando que ninguém pode dizer que uma pessoa sem Cristo está perdida?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 10))

    story.append(Paragraph("3ª Resposta de Deus sobre a Salvação:", sub_topic))
    story.append(create_verse_box("Estas coisas vos escrevi, para que saibais que tendes a vida eterna e para que creiais no nome do Filho de Deus.", "1 João 5:13"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Se João, que aprendeu com Jesus, está dizendo que escreveu para que nós também SAIBAMOS que temos a vida eterna, você acha que existem pessoas dizendo que ele mentiu e que a Bíblia registra uma mentira?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 10))

    story.append(Paragraph("4ª Resposta de Deus sobre a Salvação:", sub_topic))
    story.append(create_verse_box("Porque a palavra da cruz é loucura para os que perecem; mas para nós, que somos salvos, é o poder de Deus.", "1 Coríntios 1:18"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Se Paulo afirma categoricamente 'para nós que somos salvos', por que tantas pessoas religiosas acham isso loucura ou escândalo?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 10))

    story.append(Paragraph("5ª Resposta de Deus sobre a Salvação:", sub_topic))
    story.append(create_verse_box("Na verdade, na verdade vos digo que quem ouve a minha palavra e crê naquele que me enviou tem a vida eterna e não entrará em condenação, mas passou da morte para a vida.", "João 5:24"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Jesus diz: quem crê TEM a vida eterna, NÃO ENTRARÁ em condenação (juízo) e PASSOU da morte para a vida. Você acha que pessoas deixam de acreditar na Palavra direta de Jesus por pura tradição?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # II — SEGUNDA LIÇÃO
    story.append(Paragraph("II — SEGUNDA LIÇÃO — O AMOR DE DEUS POR VOCÊ", lesson_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Pergunta para Reflexão: Quem determina o amor de Deus por você: Deus ou você?", refl_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.", "João 3:16"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Se Deus amou o mundo de uma maneira inexplicável, e você está no mundo que Ele ama, você acha que ainda existem pessoas pensando que Deus não as ama?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se Deus ama você e enviou Jesus para que você não pereça, você acha que muitas pessoas morrem sem salvação porque duvidam desse amor por causa de suas falhas?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Você já ouviu alguém dizer: 'Eu não mereço a salvação'? (A verdade é que ninguém merece; a salvação é pela pura graça!).    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 8))
    story.append(create_verse_box("Mas Deus prova o seu próprio amor para conosco pelo fato de ter Cristo morrido por nós, sendo nós ainda pecadores.", "Romanos 5:8"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Se Deus provou Seu amor consumando a morte de Jesus na cruz há 2.000 anos, pagando a pena pelos nossos pecados enquanto éramos pecadores, essa prova é válida para você hoje?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # III — TERCEIRA LIÇÃO
    story.append(Paragraph("III — TERCEIRA LIÇÃO — A CONDIÇÃO DO HOMEM PECADOR", lesson_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Pergunta para Reflexão: Quem define o pecado: a opinião humana ou Deus?", refl_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Porque todos pecaram e destituídos estão da glória de Deus.", "Romanos 3:23"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) A Bíblia declara que TODOS pecaram e estão separados de Deus. Você acha que existem pessoas dizendo que não cometeram pecados tão graves e por isso não precisam de salvação?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Você reconhece com sinceridade que também é pecador e depende exclusivamente de Jesus para ser reconciliado com o Pai?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # IV — QUARTA LIÇÃO
    story.append(Paragraph("IV — QUARTA LIÇÃO — A MORTE ETERNA & AS TRÊS SEPARAÇÕES", lesson_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Pergunta para Reflexão: Quem decide sobre o céu ou o inferno: Deus ou você?", refl_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Porque o salário do pecado é a morte, mas o dom gratuito de Deus é a vida eterna em Cristo Jesus nosso Senhor.", "Romanos 6:23"))
    story.append(Spacer(1, 6))

    story.append(Paragraph("<b>PRESTE MUITA ATENÇÃO PARA NÃO ERRAR:</b> A pessoa que não entende o que é morte na Bíblia não consegue compreender o que é a salvação. Na Bíblia, morte significa <b>SEPARAÇÃO</b> em 3 etapas sucessivas:", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1ª Etapa: Morte Espiritual (Separação Espiritual de Deus):</b> Quando Adão pecou, ele não caiu morto fisicamente na hora; continuou vivo! O que morreu então? A comunhão e o relacionamento dele com Deus foram rompidos. Por isso, todos os seres humanos nascem espiritualmente mortos, separados de Deus.", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>2ª Etapa: Morte Física (Separação Física da Família e Terra):</b> Quando Adão faleceu aos 930 anos (Gênesis 5:5), seu corpo foi para a sepultura e o convívio físico cessou. Em Lucas 16:22 lemos que tanto o mendigo quanto o rico morreram fisicamente.", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>3ª Etapa: Morte Eterna (Separação Eterna no Inferno):</b> Acontece se a pessoa morrer fisicamente separada de Deus. Lucas 16:23-26 revela: <i>'E no inferno, o rico ergueu os olhos, estando em tormentos, e viu Abraão ao longe e Lázaro em seu seio... está posto um grande abismo entre nós e vós, de modo que ninguém pode passar de um lado para o outro.'</i> Não existe purgatório, reencarnação ou segunda chance após a morte física!", body_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("(   ) Você entendeu o que é morte espiritual (ruptura da comunhão com Deus no momento do pecado)?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se aquele que morre salvo vai direto para junto de Deus (como Lázaro foi ao seio de Abraão), você acha que pessoas pensam erradamente que precisarão aguardar o juízo final para saber se serão salvas?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Você já falou para os seus familiares sobre o inferno? O homem rico suplicou a Abraão que mandasse alguém à casa de seu pai para pregar aos seus cinco irmãos para que não fossem àquele lugar de tormento! Todo crente salvo tem o dever de evangelizar sua família enquanto há tempo.    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # V — QUINTA LIÇÃO
    story.append(Paragraph("V — QUINTA LIÇÃO — A SOLUÇÃO DE DEUS PARA A SALVAÇÃO", lesson_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Pergunta de Reflexão: Quem tem a Solução para salvar: Deus ou a religião?", refl_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Porque Cristo, nossa páscoa, foi sacrificado por nós.", "1 Coríntios 5:7"))
    story.append(Spacer(1, 8))

    story.append(Paragraph("AS TRÊS ILUSTRAÇÕES FUNDAMENTAIS SOBRE O CORPO E O SANGUE DE CRISTO:", sub_topic))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>1ª Ilustração — A Doença / Enfermidade Grave:</b> Se uma pessoa quebrar os mandamentos e contrair uma enfermidade grave, ao se arrepender ela é perdoada do pecado diante de Deus. Porém, o perdão espiritual não remove a consequência física no corpo. Da mesma forma: Pecado se purifica com sangue, mas pena de morte só se paga com outra morte! Por isso o corpo de Jesus teve que morrer na cruz para pagar a nossa pena judicial diante de Deus.", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>2ª Ilustração — A Camisa Comprada:</b> Quando você compra uma camisa em uma loja, você paga por ela uma única vez no caixa. Depois você a lava muitas vezes em casa. A camisa pertence a você porque foi PAGA, e não porque foi lavada! Da mesma maneira: Cristo pagou a nossa pena de morte uma vez para sempre na cruz, e nos purifica continuamente pelo Seu sangue.", body_style))
    story.append(Spacer(1, 4))
    story.append(Paragraph("<b>3ª Ilustração — O Cordeiro da Páscoa (Êxodo 12):</b> No Egito, o primogênito estava condenado à morte. Mas Deus providenciou um cordeiro que foi sacrificado ao entardecer no dia 14, morrendo no lugar do primogênito. O sangue foi colocado nos umbrais das portas, e o anjo da morte passou por cima. Na Ceia, Jesus tomou o pão: <i>'Este é o meu corpo partido por vós'</i> (pagamento da pena de morte). Tomou o cálice: <i>'Este é o meu sangue derramado para remissão de pecados'</i> (perdão e purificação).", body_style))
    story.append(Spacer(1, 6))

    story.append(Paragraph("(   ) Você consegue ver a diferença bíblica entre pecado (purificado pelo sangue) e pena de morte (paga pelo corpo de Jesus na cruz)?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Você compreendeu a ilustração da camisa comprada uma vez e lavada muitas vezes em relação ao sacrifício de Cristo?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Você compreendeu que Jesus é o Cordeiro da Páscoa que morreu em seu lugar para você nunca perecer?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # VI — SEXTA LIÇÃO
    story.append(Paragraph("VI — SEXTA LIÇÃO — COMO RECEBER A SALVAÇÃO BÍBLICA", lesson_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Pergunta para Reflexão: Qual é o momento exato em que a pessoa passa a ser salva: no momento em que crê e confessa ou no juízo final?", refl_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("A saber: Se com a tua boca confessares ao Senhor Jesus, e em teu coração creres que Deus o ressuscitou dentre os mortos, serás salvo. Visto que com o coração se crê para a justiça, e com a boca se faz confissão para a salvação.", "Romanos 10:9-10"))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Mas, a todos quantos o receberam, deu-lhes o poder de serem feitos filhos de Deus, a saber, aos que creem no seu nome.", "João 1:12"))
    story.append(Spacer(1, 8))

    story.append(Paragraph("ORAÇÃO DE CONFISSÃO DA SALVAÇÃO (Faça esta oração com fé sincera):", sub_topic))
    story.append(Spacer(1, 4))
    oracao_text = """“Senhor Deus, eu sei que o Senhor me ama, mas tenho plena consciência de que já pequei e que estava condenado à morte eterna. Reconheço que o Senhor enviou Jesus para me salvar. Por isso, reconheço e confesso que Jesus é o Teu Filho bendito, que foi levantado na cruz para morrer em meu lugar. Pela fé, entrego a Ti a minha vida e reconheço que Jesus tomou sobre Si a minha pena. Muito obrigado, porque, quando o Senhor morreu, pagou a minha pena de morte; quando derramou o Seu sangue, providenciou a purificação total dos meus pecados. Quando ressuscitou e se assentou à direita do Pai, o Senhor enviou o Espírito Santo. Por isso, pelas Tuas mãos, recebo agora o Espírito Santo como o selo da minha salvação eterna. Amém!”"""
    
    p_oracao = Paragraph(f"<i>{oracao_text}</i>", ParagraphStyle('OracaoP', fontName='Helvetica-Oblique', fontSize=9.5, leading=14, textColor=colors.HexColor('#0f766e')))
    t_oracao = Table([[p_oracao]], colWidths=[523])
    t_oracao.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdfa')),
        ('BOX', (0,0), (-1,-1), 1.0, colors.HexColor('#5eead4')),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_oracao)
    story.append(Spacer(1, 6))
    story.append(Paragraph("Você crê com todo o seu coração que Jesus te salvou?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # VII — SÉTIMA LIÇÃO
    story.append(Paragraph("VII — SÉTIMA LIÇÃO — A AVALIAÇÃO DA SALVAÇÃO BÍBLICA", lesson_title))
    story.append(Spacer(1, 4))
    story.append(create_verse_box("Recebestes vós o Espírito Santo quando crestes?", "Atos 19:2"))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("E chegou a Éfeso um certo judeu chamado Apolo, eloquente e poderoso nas Escrituras... Mas Priscila e Áquila o ouviram e lhe declararam mais precisamente o caminho de Deus.", "Atos 18:24-26"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("(   ) Se você morresse hoje, tem plena certeza da sua salvação em Jesus?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Veja o exemplo de Apolo: homem dedicado, mas precisou ser instruído na exatidão do sacrifício de Cristo. Isso mostra a importância de fundamentar a salvação na Bíblia!    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # VIII — OITAVA LIÇÃO
    story.append(Paragraph("VIII — OITAVA LIÇÃO — DISCIPULADO & A GRANDE COMISSÃO", lesson_title))
    story.append(Spacer(1, 4))
    story.append(Paragraph("Pergunta para Reflexão: Quem você acha que pode e deve compartilhar a salvação: o salvo ou o perdido?", refl_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Ide, portanto, fazei discípulos de todas as nações, batizando-os em nome do Pai, e do Filho, e do Espírito Santo; ensinando-os a guardar todas as coisas que vos tenho ordenado.", "Mateus 28:19-20"))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Quão formosos sobre os montes são os pés dos que anunciam as boas-novas, dos que anunciam a salvação!", "Isaías 52:7"))
    story.append(Spacer(1, 14))

    # =========================================================================
    # MINISTRAÇÃO ESPECIAL: AS 8 RAZÕES BÍBLICAS PARA LEVAR O EVANGELHO
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("AS 8 RAZÕES BÍBLICAS PARA LEVAR O EVANGELHO & FAZER DISCÍPULOS", ParagraphStyle('RTitle', fontName='Helvetica-Bold', fontSize=13.5, leading=17.5, textColor=colors.HexColor('#0f766e'))))
    story.append(Paragraph("Ministração Especial e Fundamento Pastoral com o Pastor Roberto Rodrigues Casas", ParagraphStyle('RSub', fontName='Helvetica-Oblique', fontSize=9.5, leading=13, textColor=colors.HexColor('#475569'))))
    story.append(HRFlowable(width="100%", thickness=1.0, color=colors.HexColor('#0f766e'), spaceBefore=5, spaceAfter=10))

    r1_text = "Jesus nos deu a ordem soberana de fazer discípulos e ensiná-los. Essa não é uma sugestão para poucos, mas o maior mandamento para toda a Igreja, com a promessa fiel de que Ele estará conosco todos os dias!"
    story.append(create_reason_box(1, "A Grande Comissão Soberana", r1_text, "Mateus 28:19-20"))
    story.append(Spacer(1, 8))

    r2_text = "Veja o elogio de Deus aí para você! Ele diz: 'Os seus pés são formosos, porque você anuncia a salvação.' É exatamente assim que o Criador do universo te vê quando você se levanta para proclamar a mensagem da cruz."
    story.append(create_reason_box(2, "Os Pés Formosos e o Elogio de Deus", r2_text, "Isaías 52:7"))
    story.append(Spacer(1, 8))

    r3_text = "Paulo revela o maior segredo do seu ministério: o discipulado de um a um. Uma pessoa que você treina e desafia para discipular outra, e assim sucessivamente. Foi esse encadeamento que muitos deixaram quebrar. Onde está o discípulo que você cuidou e que agora está cuidando de outro? A multiplicação bíblica precisa continuar através de você!"
    story.append(create_reason_box(3, "O Segredo de Paulo: Discipulado Um a Um", r3_text, "2 Timóteo 2:2"))
    story.append(Spacer(1, 8))

    r4_text = "Nós sabemos que quem infligiu dor e morte em Jesus foi o nosso pecado. Mas agora, salvos pela Sua graça, nós que fizemos o Mestre sofrer no Calvário podemos promover uma festa no céu! Deus se alegra, Jesus pula do trono, os anjos, arcanjos, Paulo e Moisés celebram cada pecador que se arrepende. O Salvador merece essa alegria!"
    story.append(create_reason_box(4, "Fazer uma Grande Festa no Céu", r4_text, "Lucas 15:7"))
    story.append(Spacer(1, 8))

    r5_text = "Jesus declarou: Que aproveitaria ao homem ganhar o mundo inteiro e perder a sua alma? Uma única vida vale mais do que todo o ouro e impérios deste planeta. O maior investimento da história humana está em salvar pessoas e transportá-las das trevas para o Reino da Luz!"
    story.append(create_reason_box(5, "Uma Vida Vale Mais do que o Mundo Inteiro", r5_text, "Marcos 8:36-37"))
    story.append(Spacer(1, 8))

    r6_text = "Aquele que não foi achado no Livro da Vida foi lançado no lago de fogo, onde o verme não morre e o fogo nunca se apaga. Evangelizar é antecipar esse resgate eterno, garantindo que essa alma entre na Cidade Celestial louvando a Deus por toda a eternidade."
    story.append(create_reason_box(6, "Livrar Vidas do Maior Sofrimento Eterno", r6_text, "Apocalipse 20:15"))
    story.append(Spacer(1, 8))

    r7_text = "A Palavra de Deus nunca volta vazia; ela prosperará naquilo para que foi enviada. A nossa missão é semear! O Espírito Santo converte, a pessoa crê, mas a sua parte é pregar. George Müller orou e pregou para um amigo que se converteu 58 anos depois. Nicodemos se converteu 3 anos e meio depois. Noé pregou por 100 anos. Continue semeando!"
    story.append(create_reason_box(7, "A Palavra Nunca Volta Vazia: A Missão é Semear", r7_text, "Isaías 55:11"))
    story.append(Spacer(1, 8))

    r8_text = "Jesus disse: 'Não vos preocupeis com o que haveis de falar; na mesma hora vos será ministrado o que dizer.' O medo vai embora! O Espírito Santo diz: 'Eu sou Deus, Eu vou te usar'. O Pastor Roberto Casas testemunha: 'Aos 18 anos cri que o Espírito Santo daria a palavra; faz mais de 51 anos de ministério e Ele nunca falhou!' Deus jamais falhará com você!"
    story.append(create_reason_box(8, "O Espírito Santo Falará por Você na Hora Certa", r8_text, "Mateus 10:19"))
    story.append(Spacer(1, 10))

    story.append(Paragraph("COMPROMISSO PESSOAL COM A EVANGELIZAÇÃO E O DISCIPULADO:", sub_topic))
    story.append(Spacer(1, 4))
    story.append(Paragraph("(   ) Você aceita o chamado de Jesus para não guardar essa bênção só para você, mas ser um anunciador da salvação?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se aquele que me salvou do inferno eterno disse que eu deveria levar de graça aquilo que recebi de graça, você decide dedicar seu tempo para livrar outras pessoas desse mesmo destino?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se Ele disse que há mais alegria no céu por um pecador que se arrepende, você quer fazer 'festas no céu' ganhando almas para Cristo?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 3))
    story.append(Paragraph("(   ) Se Cristo deu a própria vida por você na cruz, será que é muito dar o melhor do seu tempo e testemunho para Ele?    [   ] SIM    [   ] NÃO", qa_check))
    story.append(Spacer(1, 14))

    # =========================================================================
    # PARTE II — CURSO DA DECISÃO AO BATISMO
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("PARTE II — CURSO DA DECISÃO AO BATISMO", part_header))
    story.append(Paragraph("O Que Jesus Deseja Que Você Faça — Questionário Bíblico para Preenchimento do Aluno", part_sub))
    story.append(HRFlowable(width="100%", thickness=1.2, color=colors.HexColor('#0d9488'), spaceBefore=6, spaceAfter=12))

    # Módulo 1
    story.append(Paragraph("1. SEGURANÇA DA SALVAÇÃO", ParagraphStyle('ModTitle1', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Ao aceitar a Jesus como Salvador, você tem a garantia da vida eterna. Pesquise nas Escrituras e responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Crê no Senhor Jesus Cristo e serás salvo, tu e a tua casa.", "Atos 16:31"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. O que é necessário fazer para ser salvo? (Atos 16:31)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. O que Jesus promete a todos os que O invocam? (Romanos 10:13)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Que tipo de vida é prometida àqueles que aceitam a Cristo? (João 3:16)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("4. O que Jesus promete sobre a sua segurança sob os cuidados dEle? (João 10:27-29)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("5. Quando um crente peca, o que é preciso fazer para receber o perdão de Deus? (1 João 1:9)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("6. Quem testemunha juntamente com o seu espírito de que você é filho de Deus? (Romanos 8:16)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("7. Que promessa Cristo faz a você em Hebreus 13:5?", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 14))

    # Módulo 2
    story.append(Paragraph("2. O BATISMO BÍBLICO", ParagraphStyle('ModTitle2', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("O batismo nas águas é mandamento expresso de Jesus para todo aquele que crê. Responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("De sorte que foram batizados os que de bom grado receberam a sua palavra.", "Atos 2:41"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. Qual é a ordem expressa dada por Jesus aos discípulos em Mateus 28:19?", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. O que o batismo nas águas simboliza publicamente? (Romanos 6:3-4)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Quem pode e deve ser batizado segundo as Escrituras? (Atos 8:36-38)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("4. Qual foi o exemplo deixado pelo próprio Senhor Jesus Cristo? (Marcos 1:9-10)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 14))

    # Módulo 3
    story.append(Paragraph("3. A BÍBLIA SAGRADA", ParagraphStyle('ModTitle3', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("A Bíblia é a infalível Palavra de Deus e a lâmpada que ilumina os nossos passos. Responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Toda a Escritura é divinamente inspirada, e proveitosa para ensinar, para redarguir, para corrigir, para instruir em justiça.", "2 Timóteo 3:16"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. Em que a Bíblia é diferente de todos os outros livros do mundo? (2 Pedro 1:21)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Para que serve a Palavra de Deus na vida diária do cristão? (Salmo 119:105)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Com que frequência devemos meditar e ler a Palavra de Deus? (Josué 1:8)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 14))

    # Módulo 4
    story.append(Paragraph("4. A ORAÇÃO DIÁRIA", ParagraphStyle('ModTitle4', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Orar é manter comunhão íntima e constante com o nosso Pai celeste. Responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Não estejais inquietos por coisa alguma; antes as vossas petições sejam em tudo conhecidas diante de Deus pela oração e súplica, com ação de graças.", "Filipenses 4:6"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. Como Jesus nos ensinou a nos recolher para orar ao Pai? (Mateus 6:6)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Em nome de quem devemos apresentar todas as nossas orações a Deus? (João 16:24)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Com que atitude de coração devemos orar continuamente? (1 Tessalonicenses 5:17)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 14))

    # Módulo 5
    story.append(Paragraph("5. O TESTEMUNHO CRISTÃO", ParagraphStyle('ModTitle5', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("Todo aquele que foi salvo por Cristo é chamado para ser testemunha viva de Sua graça. Responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Mas recebereis a virtude do Espírito Santo, que há de vir sobre vós; e ser-me-eis testemunhas.", "Atos 1:8"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. O que Jesus quer que cada discípulo seja no seu dia a dia? (Atos 1:8)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Segundo 1 Pedro 3:15, a que devemos estar sempre prontos a responder?", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Qual foi a primeira atitude de André após se encontrar com Jesus? (João 1:40-42)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("4. O que a Bíblia diz a respeito daquela pessoa que ganha almas? (Provérbios 11:30)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 14))

    # Módulo 6
    story.append(Paragraph("6. A CONTRIBUIÇÃO BÍBLICA", ParagraphStyle('ModTitle6', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("A fidelidade nos dízimos e ofertas é sinal de gratidão e consagração ao Reino de Deus. Responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Cada um contribua segundo propôs no seu coração; não com tristeza, ou por necessidade; porque Deus ama ao que dá com alegria.", "2 Coríntios 9:7"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. Como deve ser sustentado o trabalho da Igreja de Deus? (1 Coríntios 16:2; Malaquias 3:10)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Que bênção o Senhor promete derramar sobre os que são fiéis em Malaquias 3:10?", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 14))

    # Módulo 7
    story.append(Paragraph("7. O ESPÍRITO SANTO EM NÓS", ParagraphStyle('ModTitle7', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("O Espírito Santo habita no crente como Consolador e produz os frutos da santificação. Responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("E não vos embriagueis com vinho, em que há contenda, mas enchei-vos do Espírito.", "Efésios 5:18"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. Quem passou a habitar em você logo após a sua conversão? (Romanos 8:9)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Escreva as 9 qualidades do fruto do Espírito Santo produzidas em você (Gálatas 5:22-23):", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 14))

    # Módulo 8
    story.append(Paragraph("8. A IGREJA DE JESUS CRISTO & MEMBRESIA", ParagraphStyle('ModTitle8', fontName='Helvetica-Bold', fontSize=12, leading=15, textColor=colors.HexColor('#002b66'))))
    story.append(Spacer(1, 2))
    story.append(Paragraph("A igreja é o corpo visível de Cristo, a família da fé onde crescemos e servimos. Responda:", body_style))
    story.append(Spacer(1, 6))
    story.append(create_verse_box("Não deixando a nossa congregação, como é costume de alguns... tanto mais quanto vedes que se vai aproximando aquele dia.", "Hebreus 10:25"))
    story.append(Spacer(1, 6))
    story.append(Paragraph("1. Quem estabeleceu a Igreja e prometeu sustentá-la contra as portas do inferno? (Mateus 16:18)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("2. Quem é o cabeça da Igreja? (Efésios 5:23)", qa_write))
    story.append(Paragraph("R: __________________________________________________________________________________________", line_fill))
    story.append(Spacer(1, 4))
    story.append(Paragraph("3. Como tornar-se membro da igreja local: a) Por profissão de fé e batismo; b) Por carta de transferência; c) Por declaração de fé pública perante a assembleia.", body_style))
    story.append(Spacer(1, 12))

    # Box Vale a Pena Plantar
    box_plantar = """<b>VALE A PENA PLANTAR!</b><br/>
    <i>“E Jesus dizia: O reino de Deus é assim como se um homem lançasse semente à terra... e a semente brotasse e crescesse... primeiro a erva, depois a espiga, e por último o grão cheio na espiga. E quando já o fruto se mostra... está chegada a ceifa!”</i> (Marcos 4:26-29).<br/><br/>
    Os batistas brasileiros e evangelizadores de todo o país semeiam o ano inteiro por todo o Brasil — nas terras secas do Nordeste, nos pantanais do Centro-Oeste, nas florestas da Amazônia, nos pampas do Sul e no coração das grandes capitais. São sementes que brotam, crescem e produzem frutos abundantes de vidas transformadas pelo amor de Jesus Cristo. E a colheita farta de almas para a glória de Deus é o prêmio e a prova incontestável de que <b>VALE A PENA PLANTAR!</b>"""
    
    p_plantar = Paragraph(box_plantar, ParagraphStyle('PlantarP', fontName='Helvetica', fontSize=9, leading=13, textColor=colors.HexColor('#1e293b')))
    t_plantar = Table([[p_plantar]], colWidths=[523])
    t_plantar.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#f0fdf4')),
        ('BOX', (0,0), (-1,-1), 1.0, colors.HexColor('#86efac')),
        ('PADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(t_plantar)

    # =========================================================================
    # ANEXO I — FICHA DE ACOMPANHAMENTO DE DISCIPULADO
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ANEXO I — FICHA DE ACOMPANHAMENTO DE DISCIPULADO", ParagraphStyle('AnexoT1', fontName='Helvetica-Bold', fontSize=14, leading=17.5, textColor=colors.HexColor('#b45309'))))
    story.append(Paragraph("Trilha do Discípulo Multiplicador • Fator de Sucesso do Discípulo", ParagraphStyle('AnexoSub1', fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor('#0d9488'))))
    story.append(HRFlowable(width="100%", thickness=1.0, color=colors.HexColor('#0d9488'), spaceBefore=4, spaceAfter=8))

    img_anexo1 = os.path.join(os.getcwd(), "frontend", "public", "images", "trilha_discipulo_multiplicador.png")
    if os.path.exists(img_anexo1):
        story.append(Image(img_anexo1, width=523, height=680))
    else:
        story.append(Paragraph("<i>[Imagem da Trilha do Discípulo Multiplicador]</i>", body_style))

    # =========================================================================
    # ANEXO II — FICHA PRÁTICA DE REGISTRO DE EVANGELISMO
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ANEXO II — FICHA PRÁTICA DE REGISTRO DE EVANGELISMO", ParagraphStyle('AnexoT2', fontName='Helvetica-Bold', fontSize=14, leading=17.5, textColor=colors.HexColor('#b45309'))))
    story.append(Paragraph("Trilha de Evangelismo • Fator de Sucesso do Discípulo", ParagraphStyle('AnexoSub2', fontName='Helvetica-Bold', fontSize=9.5, leading=13, textColor=colors.HexColor('#0d9488'))))
    story.append(HRFlowable(width="100%", thickness=1.0, color=colors.HexColor('#0d9488'), spaceBefore=4, spaceAfter=8))

    orientacoes_evang = """<b>ORIENTAÇÕES PARA O MINISTÉRIO DE EVANGELISMO LOCAL:</b><br/>
    1. Preencha o nome de cada pessoa evangelizada com seu número de telefone e data do contato.<br/>
    2. Acompanhe os estudos bíblicos (Lições 1 a 5) até a oração de decisão e a certeza da salvação.<br/>
    3. Conduza o novo crente ao Estudo Bíblico do Discipulado e prepare-o para o batismo nas águas.<br/>
    4. Multiplique este método em sua igreja local formando novos discipuladores!"""
    story.append(Paragraph(orientacoes_evang, ParagraphStyle('OrEvang', fontName='Helvetica', fontSize=8.5, leading=12, textColor=colors.HexColor('#334155'))))
    story.append(Spacer(1, 8))

    img_anexo2 = os.path.join(os.getcwd(), "frontend", "public", "images", "trilha_evangelismo.png")
    if os.path.exists(img_anexo2):
        story.append(Image(img_anexo2, width=523, height=630))
    else:
        story.append(Paragraph("<i>[Imagem da Trilha de Evangelismo]</i>", body_style))

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"[OK] Manual gerado com hierarquia impecável em: {output_path}")


def main():
    public_pdf = os.path.join(os.getcwd(), "frontend", "public", "downloads", "Manual_Oficial_Evangelismo_e_Discipulado.pdf")
    dist_pdf = os.path.join(os.getcwd(), "frontend", "dist", "downloads", "Manual_Oficial_Evangelismo_e_Discipulado.pdf")
    
    os.makedirs(os.path.dirname(public_pdf), exist_ok=True)
    build_manual_pdf(public_pdf)
    
    if os.path.exists(os.path.dirname(dist_pdf)):
        shutil.copy2(public_pdf, dist_pdf)
        print(f"[OK] Sincronizado para dist: {dist_pdf}")

if __name__ == "__main__":
    main()