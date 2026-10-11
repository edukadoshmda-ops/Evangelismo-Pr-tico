
from PIL import Image, ImageDraw, ImageFont

SCALE = 4
W = 750 * SCALE
H = 820 * SCALE

img = Image.new('RGBA', (W, H), (255, 255, 255, 255))
draw = ImageDraw.Draw(img)

def f(name, size):
    try:
        return ImageFont.truetype(f'C:/Windows/Fonts/{name}', int(size * SCALE))
    except:
        return ImageFont.load_default()

font_title = f('segoeuib.ttf', 20)
font_sub = f('segoeui.ttf', 13)
font_discipulador = f('segoeuib.ttf', 11.5)
font_discipulo = f('segoeuib.ttf', 11)
font_equipe_title = f('segoeuib.ttf', 8)
font_equipe_code = f('segoeuib.ttf', 9)

# 1. Title & Subtitle at top - beautifully placed ABOVE the circle
title_text = 'TRILHA DO DISCÍPULO MULTIPLICADOR'
sub_text = 'Árvore de Multiplicação Ministerial (3 Pernas)'

tb = draw.textbbox((0, 0), title_text, font=font_title)
tw = tb[2] - tb[0]
draw.text(((W - tw)/2, 38 * SCALE), title_text, fill=(24, 76, 120), font=font_title)

sb = draw.textbbox((0, 0), sub_text, font=font_sub)
sw = sb[2] - sb[0]
draw.text(((W - sw)/2, 68 * SCALE), sub_text, fill=(71, 85, 105), font=font_sub)

# 2. Big Outer Circle
circle_cx = W / 2
circle_cy = 455 * SCALE
circle_r = 330 * SCALE
circle_box = [circle_cx - circle_r, circle_cy - circle_r, circle_cx + circle_r, circle_cy + circle_r]
draw.ellipse(circle_box, outline=(27, 79, 114), width=int(2.2 * SCALE))

# Node positions
# Root: Discipulador
root_x = circle_cx
root_y = circle_cy + 235 * SCALE
root_r = 50 * SCALE

# Level 1: 3 Discipulos
d_y = circle_cy + 55 * SCALE
d_left_x = circle_cx - 190 * SCALE
d_mid_x = circle_cx
d_right_x = circle_cx + 190 * SCALE
d_r = 43 * SCALE

# Level 2: Equipes
eq_y = circle_cy - 125 * SCALE
eq_r = 28 * SCALE

eq_a1_x = d_left_x - 62 * SCALE
eq_a2_x = d_left_x
eq_a3_x = d_left_x + 62 * SCALE

eq_b1_x = d_mid_x

eq_c1_x = d_right_x - 62 * SCALE
eq_c2_x = d_right_x
eq_c3_x = d_right_x + 62 * SCALE

# Connecting Lines
line_color = (27, 79, 114)
lw = int(2.4 * SCALE)

# Root to Level 1
draw.line([(root_x, root_y), (d_left_x, d_y)], fill=line_color, width=lw)
draw.line([(root_x, root_y), (d_mid_x, d_y)], fill=line_color, width=lw)
draw.line([(root_x, root_y), (d_right_x, d_y)], fill=line_color, width=lw)

# Level 1 to Level 2
# Branch A
draw.line([(d_left_x, d_y), (eq_a1_x, eq_y)], fill=line_color, width=lw)
draw.line([(d_left_x, d_y), (eq_a2_x, eq_y)], fill=line_color, width=lw)
draw.line([(d_left_x, d_y), (eq_a3_x, eq_y)], fill=line_color, width=lw)

# Branch B
draw.line([(d_mid_x, d_y), (eq_b1_x, eq_y)], fill=line_color, width=lw)

# Branch C
draw.line([(d_right_x, d_y), (eq_c1_x, eq_y)], fill=line_color, width=lw)
draw.line([(d_right_x, d_y), (eq_c2_x, eq_y)], fill=line_color, width=lw)
draw.line([(d_right_x, d_y), (eq_c3_x, eq_y)], fill=line_color, width=lw)

def draw_circle_with_text(cx, cy, r, bg_color, lines, fonts):
    box = [cx - r, cy - r, cx + r, cy + r]
    draw.ellipse(box, fill=bg_color)
    total_h = sum(draw.textbbox((0, 0), line, font=font)[3] - draw.textbbox((0, 0), line, font=font)[1] for line, font in zip(lines, fonts))
    spacing = 2 * SCALE
    total_h += spacing * (len(lines) - 1)
    
    cur_y = cy - total_h / 2
    for line, font in zip(lines, fonts):
        b = draw.textbbox((0, 0), line, font=font)
        w = b[2] - b[0]
        h = b[3] - b[1]
        draw.text((cx - w/2, cur_y - b[1]), line, fill=(255, 255, 255), font=font)
        cur_y += h + spacing

# Draw Discipulador
draw_circle_with_text(root_x, root_y, root_r, (27, 79, 114), ['DISCIPULADOR'], [font_discipulador])

# Draw Discipulos
draw_circle_with_text(d_left_x, d_y, d_r, (33, 133, 197), ['DISCÍPULO'], [font_discipulo])
draw_circle_with_text(d_mid_x, d_y, d_r, (33, 133, 197), ['DISCÍPULO'], [font_discipulo])
draw_circle_with_text(d_right_x, d_y, d_r, (33, 133, 197), ['DISCÍPULO'], [font_discipulo])

# Draw Equipes
for x, code in [(eq_a1_x, 'A1'), (eq_a2_x, 'A2'), (eq_a3_x, 'A3'),
                (eq_b1_x, 'B1'),
                (eq_c1_x, 'C1'), (eq_c2_x, 'C2'), (eq_c3_x, 'C3')]:
    draw_circle_with_text(x, eq_y, eq_r, (41, 153, 225), ['EQUIPE', code], [font_equipe_title, font_equipe_code])

# Downscale with LANCZOS for silky smooth anti-aliasing
final_img = img.resize((750, 820), Image.LANCZOS)
final_img.save('frontend/public/images/arvore_discipulo_multiplicador.png', 'PNG')
print('Enhanced diagram generated successfully!')
