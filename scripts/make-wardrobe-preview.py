from pathlib import Path
from io import BytesIO
import cairosvg
from PIL import Image, ImageDraw, ImageFont
import re
ROOT=Path(__file__).resolve().parents[1]
LAY=ROOT/'assets/player/layers'
W,H=2200,1050
canvas=Image.new('RGB',(W,H),(24,18,34))
draw=ImageDraw.Draw(canvas)
font='/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf'
font_b='/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf'
Ftitle=ImageFont.truetype(font_b,54)
Fsub=ImageFont.truetype(font,23)
Flabel=ImageFont.truetype(font_b,24)
Fsmall=ImageFont.truetype(font,18)

def render_svg(path,size=(520,1040)):
    data=cairosvg.svg2png(url=str(path),output_width=size[0],output_height=size[1])
    return Image.open(BytesIO(data)).convert('RGBA')

def avatar(gender,hair,equip):
    body='base-body-female.svg' if gender=='female' else 'base-body.svg'
    order=['base',f'hair-{hair}','bottom','shoes','top','outer','accessory','head']
    mapping={'base':body, f'hair-{hair}':f'hair-{hair}.svg'}
    for slot,item in equip.items(): mapping[slot]=f'{item}.svg'
    out=Image.new('RGBA',(520,1040),(0,0,0,0))
    for key in order:
        file=mapping.get(key)
        if not file: continue
        layer=render_svg(LAY/file,(520,1040))
        out.alpha_composite(layer)
    return out

sets=[
 ('Повседневный','Мужской','male','short',{'head':'head-none','top':'top-basic','outer':'outer-jacket','bottom':'bottom-jeans','shoes':'shoes-high-top','accessory':'accessory-tote'}),
 ('На свидание','Женский','female','long',{'head':'head-flower-pin','top':'top-blouse','outer':'outer-short-haori','bottom':'bottom-pleated-skirt','shoes':'shoes-formal','accessory':'accessory-flower-clip'}),
 ('На работу','Мужской','male','medium',{'head':'head-none','top':'top-work','outer':'outer-vest','bottom':'bottom-cargo','shoes':'shoes-boots','accessory':'accessory-belt'}),
 ('Фестиваль','Женский','female','tied',{'head':'head-floral-ribbon','top':'top-festival','outer':'outer-haori','bottom':'bottom-festival-hakama','shoes':'shoes-formal','accessory':'accessory-brooch'}),
 ('Тренировка','Мужской','male','wild',{'head':'head-leaf-band','top':'top-shinobi','outer':'outer-vest','bottom':'bottom-shinobi','shoes':'shoes-sandals','accessory':'accessory-none'}),
 ('Прогулка','Женский','female','long',{'head':'head-beret','top':'top-knit','outer':'outer-wintercoat','bottom':'bottom-wide-pants','shoes':'shoes-winter','accessory':'accessory-scarf'}),
]
# Background cards
margin=45; gap=26; cols=3; card_w=(W-2*margin-2*gap)//3; card_h=430
for i,(title,gender,g,h,equip) in enumerate(sets):
    row=i//cols; col=i%cols
    x=margin+col*(card_w+gap); y=185+row*(card_h+gap)
    draw.rounded_rectangle((x,y,x+card_w,y+card_h),radius=24,fill=(38,29,51),outline=(127,83,133),width=3)
    draw.rounded_rectangle((x+18,y+18,x+card_w-18,y+card_h-18),radius=20,outline=(208,143,185),width=1)
    draw.text((x+34,y+28),title,font=Flabel,fill=(250,220,239))
    draw.text((x+34,y+66),gender+' · 6 независимых слоёв',font=Fsmall,fill=(193,169,198))
    av=avatar(g,h,equip)
    # fit avatar without clipping
    av.thumbnail((card_w-60,330),Image.Resampling.LANCZOS)
    canvas_rgba=canvas.convert('RGBA')
    px=x+(card_w-av.width)//2; py=y+90+(330-av.height)//2
    canvas_rgba.alpha_composite(av,(px,py))
    canvas=canvas_rgba.convert('RGB'); draw=ImageDraw.Draw(canvas)
    # small summary
    labels={'top-basic':'футболка','top-blouse':'блуза','top-work':'рабочая форма','top-festival':'праздничный верх','top-shinobi':'форма шиноби','top-knit':'свитер','outer-jacket':'куртка','outer-short-haori':'короткое хаори','outer-vest':'жилет','outer-haori':'хаори','outer-wintercoat':'зимнее пальто','bottom-jeans':'джинсы','bottom-pleated-skirt':'плиссированная юбка','bottom-cargo':'карго','bottom-festival-hakama':'праздничная хакама','bottom-shinobi':'брюки шиноби','bottom-wide-pants':'свободные брюки'}
    sub=' · '.join([labels.get(equip['top'],equip['top']),labels.get(equip['outer'],equip['outer']),labels.get(equip['bottom'],equip['bottom'])])
    draw.text((x+30,y+card_h-47),sub,font=Fsmall,fill=(207,184,210))
draw.text((50,42),'ГАРДЕРОБ · ПОСЛОЙНАЯ ПРИМЕРКА',font=Ftitle,fill=(251,226,242))
draw.text((55,116),'49 вещей в 6 слотах · стрелки меняют только выбранную категорию · вещи надеваются поверх модели',font=Fsub,fill=(198,177,205))
canvas.save(ROOT/'wardrobe-preview.jpg',quality=94,optimize=True)
