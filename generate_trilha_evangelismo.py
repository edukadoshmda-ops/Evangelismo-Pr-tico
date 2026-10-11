
from PIL import Image, ImageDraw, ImageFont

SCALE = 3
W = 683 * SCALE
H = 398 * SCALE

img = Image.new('RGB', (W, H), (255, 255, 255))
draw = ImageDraw.Draw(img)

def f(name, size, bold=True):
    fn = 'segoeuib.ttf' if bold else 'segoeui.ttf'
    try:
        return ImageFont.truetype(f'C:/Windows/Fonts/{fn}', int(size * SCALE))
    except:
        return ImageFont.load_default()

c_border = (45, 55, 72)
c_box_bg = (203, 213, 224)
c_hdr_bg = (247, 250, 252)
c_text_dark = (26, 32, 44)
c_text_hdr = (30, 41, 59)

# 1. Top Box
x1 = int(33 * SCALE)
x2 = int(659 * SCALE)
y1 = int(29 * SCALE)
y2 = int(84 * SCALE)
lw = int(1.5 * SCALE)

draw.rectangle([x1, y1, x2, y2], fill=c_box_bg, outline=c_border, width=lw)

# Title
f_title = f('segoeuib.ttf', 13.5, bold=True)
t_title = 'TRILHA DE EVANGELISMO'
bb = draw.textbbox((0, 0), t_title, font=f_title)
draw.text(((W - (bb[2]-bb[0]))/2, int(35 * SCALE)), t_title, fill=c_text_dark, font=f_title)

# Nome field
f_nome = f('segoeuib.ttf', 9.5, bold=True)
draw.text((x1 + int(10 * SCALE), int(60 * SCALE)), 'NOME:', fill=c_text_dark, font=f_nome)
line_x1 = x1 + int(60 * SCALE)
line_x2 = x2 - int(12 * SCALE)
line_y = int(72 * SCALE)
draw.line([(line_x1, line_y), (line_x2, line_y)], fill=c_border, width=int(1 * SCALE))

# 2. Main Table
ty1 = int(97 * SCALE)
ty_div = int(114 * SCALE)
ty_data = int(132 * SCALE)
ty2 = int(332 * SCALE)

cols = [
    ('no', int(30 * SCALE)),
    ('disc', int(126 * SCALE)),
    ('tel', int(80 * SCALE)),
    ('e_dia', int(20 * SCALE)),
    ('e_hora', int(20 * SCALE)),
    ('e_01', int(20 * SCALE)),
    ('ev_01', int(21 * SCALE)),
    ('ev_02', int(21 * SCALE)),
    ('ev_03', int(21 * SCALE)),
    ('ev_04', int(21 * SCALE)),
    ('ev_05', int(21 * SCALE)),
    ('ev_06', int(21 * SCALE)),
    ('ev_07', int(21 * SCALE)),
    ('ev_08', int(21 * SCALE)),
    ('dec', int(52 * SCALE)),
    ('est_bat', int(56 * SCALE)),
    ('bat', int(54 * SCALE)),
]

col_x = [x1]
for _, w in cols:
    col_x.append(col_x[-1] + w)
col_x[-1] = x2

# Fill header background
draw.rectangle([x1, ty1, x2, ty_data], fill=c_hdr_bg)

# Draw Table outer border
draw.rectangle([x1, ty1, x2, ty2], outline=c_border, width=lw)

# Horizontal lines
draw.line([(x1, ty_div), (x2, ty_div)], fill=c_border, width=int(1 * SCALE))
draw.line([(x1, ty_data), (x2, ty_data)], fill=c_border, width=lw)

row_h = (ty2 - ty_data) / 10.0
for i in range(1, 10):
    ry = int(ty_data + i * row_h)
    draw.line([(x1, ry), (x2, ry)], fill=c_border, width=int(1 * SCALE))

# Vertical lines
for i in range(1, len(cols)):
    cx = col_x[i]
    is_sub_div = i in [4, 5, 7, 8, 9, 10, 11, 12, 13]
    top_y = ty_div if is_sub_div else ty1
    draw.line([(cx, top_y), (cx, ty2)], fill=c_border, width=int(1 * SCALE))

# Helper to center text in a box
def center_text(bx1, by1, bx2, by2, text, font, fill=c_text_hdr):
    bb = draw.textbbox((0, 0), text, font=font)
    tw = bb[2] - bb[0]
    th = bb[3] - bb[1]
    tx = bx1 + (bx2 - bx1 - tw) / 2
    ty = by1 + (by2 - by1 - th) / 2 - bb[1]
    draw.text((tx, ty), text, fill=fill, font=font)

def center_multiline(bx1, by1, bx2, by2, lines, font, fill=c_text_hdr):
    bbs = [draw.textbbox((0, 0), l, font=font) for l in lines]
    ths = [b[3] - b[1] for b in bbs]
    tws = [b[2] - b[0] for b in bbs]
    spacing = int(2 * SCALE)
    tot_h = sum(ths) + spacing * (len(lines) - 1)
    cur_y = by1 + (by2 - by1 - tot_h) / 2
    for l, tw, th, b in zip(lines, tws, ths, bbs):
        tx = bx1 + (bx2 - bx1 - tw) / 2
        draw.text((tx, cur_y - b[1]), l, fill=fill, font=font)
        cur_y += th + spacing

f_hdr = f('segoeuib.ttf', 7.5, bold=True)
f_sub = f('segoeuib.ttf', 6.8, bold=True)
f_grp = f('segoeuib.ttf', 7.0, bold=True)
f_data = f('segoeuib.ttf', 7.5, bold=True)

# Headers spanning both rows
center_text(col_x[0], ty1, col_x[1], ty_data, 'Nº', f_hdr)
center_text(col_x[1], ty1, col_x[2], ty_data, 'DISCÍPULOS', f_hdr)
center_text(col_x[2], ty1, col_x[3], ty_data, 'TELEFONE', f_hdr)

# Group: ESTUDO (cols 3 to 6)
center_text(col_x[3], ty1, col_x[6], ty_div, 'ESTUDO', f_grp)
center_text(col_x[3], ty_div, col_x[4], ty_data, 'DIA', f_sub)
center_text(col_x[4], ty_div, col_x[5], ty_data, 'HORA', f_sub)
center_text(col_x[5], ty_div, col_x[6], ty_data, '01', f_sub)

# Group: ESTUDO EVANGELISMO (cols 6 to 14) -> 8 lições!
center_text(col_x[6], ty1, col_x[14], ty_div, 'ESTUDO EVANGELISMO', f_grp)
for idx in range(8):
    center_text(col_x[6+idx], ty_div, col_x[7+idx], ty_data, f'0{idx+1}', f_sub)

# Group: DECISÃO
center_text(col_x[14], ty1, col_x[15], ty_div, 'DECISÃO', f_sub)
center_text(col_x[14], ty_div, col_x[15], ty_data, 'DATA', f_sub)

# Group: ESTUDO BATISMO
center_multiline(col_x[15], ty1, col_x[16], ty_div, ['ESTUDO', 'BATISMO'], f('segoeuib.ttf', 6.0, bold=True))
center_text(col_x[15], ty_div, col_x[16], ty_data, 'DATA', f_sub)

# Group: BATISMO
center_text(col_x[16], ty1, col_x[17], ty_div, 'BATISMO', f_sub)
center_text(col_x[16], ty_div, col_x[17], ty_data, 'DATA', f_sub)

# Data row numbers: 01 to 10
for i in range(10):
    ry1 = int(ty_data + i * row_h)
    ry2 = int(ty_data + (i+1) * row_h)
    center_text(col_x[0], ry1, col_x[1], ry2, f'{i+1:02d}', f_data)

# 3. Bottom Banner
by1 = int(345 * SCALE)
by2 = int(370 * SCALE)
draw.rectangle([x1, by1, x2, by2], fill=c_box_bg, outline=c_border, width=lw)
f_bot = f('segoeuib.ttf', 9.5, bold=True)
center_text(x1, by1, x2, by2, 'A NOSSA MISSÃO É FAZER DISCÍPULOS', f_bot, fill=c_text_dark)

# Downscale to 683x398 with Lanczos
final = img.resize((683, 398), Image.LANCZOS)
final.save('test_trilha_evangelismo.png')
print('Evangelismo generated successfully!')
