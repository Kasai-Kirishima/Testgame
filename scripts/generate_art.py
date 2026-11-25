#!/usr/bin/env python3
"""Generate original, non-explicit character art variations for the local gallery."""
from pathlib import Path
from xml.sax.saxutils import escape

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'assets' / 'characters'

# Character-inspired hair palettes; all outfits stay fully clothed and age-appropriate.
CAST = {
    'anko': ('#4c293d','#b76f80','#c5a0b2'),
    'ayame': ('#684333','#cf8a67','#e1b7a1'),
    'buntan': ('#263d4b','#5a8794','#a9c0cb'),
    'ino': ('#ead18a','#c38b3d','#eedbb0'),
    'yodo': ('#d7d4d0','#8e9a9b','#c5cdd0'),
    'kaguya': ('#ece9e5','#9c91aa','#d8d2e3'),
    'karin': ('#9f3d48','#be6b70','#e2a1a0'),
    'konan': ('#454e79','#8592b2','#c5cce0'),
    'kurenai': ('#262b32','#b36c73','#d7a0a5'),
    'kurotsuchi': ('#55483f','#8c7555','#c6ae80'),
    'kushina': ('#b43843','#c66b62','#eaa1a1'),
    'mabui': ('#cbb17a','#a18a58','#ddd0a2'),
    'mei': ('#a65a57','#a76b80','#d6a4aa'),
    'mikoto': ('#292c38','#8f5c67','#c7a3a0'),
    'mirai': ('#272d3e','#657b91','#a9b9c5'),
    'mito': ('#a34e51','#98646a','#d7a3a1'),
    'rin': ('#594239','#9b7168','#d0aaa0'),
    'sakura': ('#d98c9f','#b46e88','#efc1cb'),
    'samui': ('#d7c38a','#9e9a84','#d8d1b7'),
    'sarada': ('#242832','#a94f64','#d4a0b0'),
    'tayuya': ('#98434e','#855769','#c99aa2'),
    'temari': ('#d4b46e','#b48d4a','#e5cb8f'),
    'tenten': ('#584238','#9e624c','#d1a38c'),
    'hanabi': ('#262c4b','#716f9c','#b8b9d7'),
    'hinata': ('#262b4d','#8675b1','#c5b4dc'),
    'tsunade': ('#d9b76a','#9a7650','#d7b783'),
    'haku': ('#343d56','#6c94aa','#b5cedc'),
    'shizune': ('#3c3435','#80675f','#baa39a'),
}

VARIANTS = {
    'daily': {'bg1':'#d6e8df','bg2':'#88ae9c','outfit':'#788e80','accent':'#e9d5ab','label':'Повседневный образ'},
    'shinobi': {'bg1':'#243d42','bg2':'#567b70','outfit':'#34474a','accent':'#b8c999','label':'Тренировка шиноби'},
    'festival': {'bg1':'#56405f','bg2':'#c17e85','outfit':'#f0d6d0','accent':'#efbf70','label':'Вечерний фестиваль'},
}


def make_svg(cid, hair, shadow, shine, variant):
    v = VARIANTS[variant]
    # Distinct hair silhouette lengths are keyed to the cast, not gendered body features.
    long_hair = cid not in {'ino','yodo','karin','buntan','tenten','sarada'}
    side = 'M118 238 Q70 55 300 52 Q525 45 482 258 L455 500 Q420 548 390 450 L382 228 Q300 190 220 230 L205 460 Q165 540 132 465 Z' if long_hair else 'M124 232 Q94 65 300 60 Q510 65 476 245 L450 340 Q430 375 400 310 L380 220 Q300 180 220 220 L195 320 Q155 365 132 320 Z'
    bangs = {
        'ino':'M128 205 Q210 90 300 135 Q382 76 470 200 Q408 175 370 224 Q325 174 283 224 Q230 178 180 232 Z',
        'yodo':'M126 200 Q200 92 300 125 Q405 78 470 194 Q408 178 365 218 Q310 170 267 218 Q210 175 165 224 Z',
        'karin':'M125 195 Q210 83 300 126 Q388 80 475 190 Q414 200 380 245 Q322 193 275 243 Q220 195 165 238 Z',
        'default':'M126 205 Q210 85 300 125 Q398 79 474 200 Q408 172 370 230 Q315 180 274 231 Q220 175 165 232 Z',
    }.get(cid, 'M126 205 Q210 85 300 125 Q398 79 474 200 Q408 172 370 230 Q315 180 274 231 Q220 175 165 232 Z')
    outfit = v['outfit']
    if variant == 'shinobi':
        clothing = f'''<path d="M95 760 Q110 550 190 490 L245 455 L355 455 L410 490 Q490 550 505 760Z" fill="{outfit}"/>
        <path d="M220 478 L300 570 L380 478 L350 760 L250 760Z" fill="#202c34"/>
        <path d="M220 475 L300 560 L380 475" fill="none" stroke="{v['accent']}" stroke-width="10"/>
        <path d="M170 550 L230 530 M430 550 L370 530" stroke="#9aaf9d" stroke-width="12" stroke-linecap="round"/>'''
    elif variant == 'festival':
        clothing = f'''<path d="M82 760 Q100 555 190 490 L245 460 L355 460 L410 490 Q500 560 518 760Z" fill="{outfit}"/>
        <path d="M236 470 L300 585 L365 470 L402 760 L198 760Z" fill="#fff0e6"/>
        <path d="M150 610 Q300 675 450 610 L445 670 Q300 732 155 670Z" fill="{v['accent']}"/>
        <path d="M250 492 L300 555 L350 492" fill="none" stroke="#bd8794" stroke-width="8"/>'''
    else:
        clothing = f'''<path d="M86 760 Q100 560 192 490 L245 460 L355 460 L408 490 Q500 560 514 760Z" fill="{outfit}"/>
        <path d="M238 470 L300 565 L362 470 L405 760 L195 760Z" fill="#e6e4d8"/>
        <path d="M195 540 Q300 585 405 540" fill="none" stroke="{v['accent']}" stroke-width="12"/>'''
    if variant == 'daily':
        scene = '''<g opacity=".42"><path d="M0 420 L110 330 L210 420V780H0Z" fill="#6d9285"/><path d="M390 390L495 300L600 390V780H390Z" fill="#628575"/><path d="M0 600 Q300 560 600 600" stroke="#e9eedb" stroke-width="8" fill="none"/></g><g fill="#fff0d8" opacity=".8"><circle cx="74" cy="130" r="12"/><circle cx="515" cy="195" r="8"/><circle cx="435" cy="105" r="6"/></g>'''
    elif variant == 'shinobi':
        scene = '''<g opacity=".6" fill="#152a2a"><path d="M0 0H130L65 210Z"/><path d="M420 0H600L510 250Z"/><path d="M0 220L90 125L175 230Z"/><path d="M450 270L535 155L600 280Z"/></g><g fill="#a9c78d" opacity=".6"><circle cx="80" cy="120" r="6"/><circle cx="520" cy="110" r="7"/><circle cx="470" cy="340" r="5"/></g>'''
    else:
        scene = '''<g opacity=".9"><path d="M70 80 Q120 115 70 170 Q20 115 70 80Z" fill="#f5bb73"/><path d="M520 120 Q570 155 520 210 Q470 155 520 120Z" fill="#f5bb73"/><path d="M500 0V120 M50 0V80" stroke="#403047" stroke-width="10"/></g><g fill="#ffdb98" opacity=".7"><circle cx="180" cy="130" r="4"/><circle cx="420" cy="240" r="6"/><circle cx="105" cy="330" r="5"/></g>'''
    headband = '<path d="M174 175 Q300 132 426 175 L418 207 Q300 174 182 207Z" fill="#354b52" stroke="#b9c2ad" stroke-width="5"/><path d="M285 166L315 166L320 192L280 192Z" fill="#b7c4b0"/>' if variant == 'shinobi' else ''
    kimono_detail = '<path d="M205 535Q300 600 395 535" stroke="#a85f75" stroke-width="7" fill="none"/>' if variant == 'festival' else ''
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 780" role="img" aria-label="Иллюстрация персонажа {escape(cid)} — {v['label']}">
    <defs><linearGradient id="bg" x2="0" y2="1"><stop stop-color="{v['bg1']}"/><stop offset="1" stop-color="{v['bg2']}"/></linearGradient><linearGradient id="hair" x2="1" y2="1"><stop stop-color="{hair}"/><stop offset=".55" stop-color="{shadow}"/><stop offset="1" stop-color="{shine}"/></linearGradient><radialGradient id="skin"><stop stop-color="#ffe3d2"/><stop offset="1" stop-color="#d99f8b"/></radialGradient></defs>
    <rect width="600" height="780" fill="url(#bg)"/>{scene}<circle cx="300" cy="255" r="215" fill="#fff" opacity=".1"/>
    <path d="{side}" fill="url(#hair)" stroke="{shadow}" stroke-width="7"/>
    {clothing}{kimono_detail}
    <path d="M255 410 L255 475 Q300 515 345 475 L345 410Z" fill="url(#skin)"/>
    <ellipse cx="300" cy="275" rx="130" ry="165" fill="url(#skin)" stroke="#bb8275" stroke-width="4"/>
    <path d="{bangs}" fill="url(#hair)" stroke="{shadow}" stroke-width="5"/>
    {headband}
    <path d="M214 292 Q245 270 270 292 M330 292 Q355 270 386 292" fill="none" stroke="#453c43" stroke-width="8" stroke-linecap="round"/>
    <ellipse cx="245" cy="313" rx="17" ry="12" fill="#f9f2e8"/><ellipse cx="355" cy="313" rx="17" ry="12" fill="#f9f2e8"/>
    <ellipse cx="247" cy="314" rx="7" ry="10" fill="#78869d"/><ellipse cx="353" cy="314" rx="7" ry="10" fill="#78869d"/>
    <circle cx="249" cy="311" r="3" fill="#20262d"/><circle cx="355" cy="311" r="3" fill="#20262d"/>
    <path d="M300 322 L292 356 Q300 362 308 356" fill="none" stroke="#bd8276" stroke-width="4" stroke-linecap="round"/>
    <path d="M270 390 Q300 410 330 390" fill="none" stroke="#9d5e68" stroke-width="5" stroke-linecap="round"/>
    <path d="M190 255 Q150 350 180 470 M410 255 Q450 350 420 470" stroke="{shine}" stroke-width="12" fill="none" opacity=".8"/>
    <g fill="{v['accent']}" opacity=".95"><circle cx="130" cy="520" r="9"/><circle cx="470" cy="470" r="7"/><circle cx="90" cy="680" r="5"/><circle cx="520" cy="680" r="5"/></g>
    </svg>'''

for cid, palette in CAST.items():
    if cid in {'anko', 'ayame', 'konan', 'sakura', 'hanabi', 'hinata'}:  # Preserve detailed generated WebP panels.
        continue
    hair, shadow, shine = palette
    folder = OUT / cid
    folder.mkdir(parents=True, exist_ok=True)
    for variant in VARIANTS:
        (folder / f'{variant}.svg').write_text(make_svg(cid, hair, shadow, shine, variant), encoding='utf-8')

print(f'Generated {len(CAST) * len(VARIANTS)} local character illustrations in {OUT}')
