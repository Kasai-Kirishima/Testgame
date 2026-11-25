#!/usr/bin/env python3
"""Slice generated contact sheets into optimized standalone game assets."""
from pathlib import Path
from PIL import Image
import json

ROOT = Path(__file__).resolve().parents[1]
DATA = Path('/mnt/data')
BG = ROOT / 'assets' / 'backgrounds'
EN = ROOT / 'assets' / 'enemies'
BG.mkdir(parents=True, exist_ok=True)
EN.mkdir(parents=True, exist_ok=True)

# Each 1536x1024 sheet has a 3x2 grid separated by dark gutters.
def crops_3x2(path):
    im = Image.open(path).convert('RGB')
    w, h = im.size
    if (w, h) == (1536, 1024):
        xs = [(0, 510), (515, 1022), (1027, 1536)]
        ys = [(0, 510), (515, 1024)]
    elif (w, h) == (1672, 941):
        xs = [(0, 554), (559, 1112), (1118, 1672)]
        ys = [(0, 468), (473, 941)]
    else:
        raise ValueError(f'Unexpected contact sheet size {im.size} for {path}')
    return [im.crop((x0, y0, x1, y1)) for y0, y1 in ys for x0, x1 in xs]

def save_webp(image, path, size=(960, 960), quality=84):
    image.thumbnail(size, Image.Resampling.LANCZOS)
    image.save(path, 'WEBP', quality=quality, method=6)

sheets = [
    (DATA/'a_single_composite_image_divided_into_six_panels.png', [
        'konoha-main', 'training-ground', 'ichiraku', 'tatami-home', 'river-sunset', 'festival-street'
    ]),
    (DATA/'a_clean_high_detail_anime_background_compilation.png', [
        'clinic', 'library', 'flower-shop', 'hokage-office', 'village-gate', 'memorial-garden'
    ]),
    (DATA/'a_single_image_collage_grid_of_six_anime_style_b.png', [
        'market-street', 'academy-courtyard', 'bathhouse-garden', 'rainy-alley', 'mountain-trail', 'campsite'
    ]),
]
background_manifest = {}
for source, names in sheets:
    panels = crops_3x2(source)
    for name, panel in zip(names, panels):
        out = BG / f'{name}.webp'
        save_webp(panel, out, (1000, 1000), 84)
        background_manifest[name] = f'assets/backgrounds/{name}.webp'

enemy_names = [
    ('masked-scout', 'Маскированный разведчик', 'Разведчик, который пытается проверить границы деревни.', '⚔️'),
    ('road-rogue', 'Дорожный налётчик', 'Промышляет мелкими нападениями на торговые караваны.', '🗡️'),
    ('armored-guard', 'Наёмный страж', 'Защищает заброшенный склад и не любит переговоры.', '🛡️'),
    ('forest-ambusher', 'Лесной засадник', 'Прячется у тропы и старается застать путников врасплох.', '🌲'),
    ('chakra-adept', 'Бродячий техник', 'Использует простые приёмы чакры и держит дистанцию.', '🌀'),
    ('stone-guardian', 'Каменный страж', 'Старинный тренировочный голем, активирующийся возле руин.', '🗿'),
]
enemy_panels = crops_3x2(DATA/'a_clean_high_detail_anime_illustration_in_a_comic.png')
enemy_manifest = []
for (slug, name, desc, icon), panel in zip(enemy_names, enemy_panels):
    out = EN / f'{slug}.webp'
    save_webp(panel, out, (900, 900), 83)
    enemy_manifest.append({'id':slug,'name':name,'desc':desc,'icon':icon,'image':f'assets/enemies/{slug}.webp'})

(ROOT/'assets'/'scene-manifest.json').write_text(json.dumps({'backgrounds':background_manifest,'enemies':enemy_manifest}, ensure_ascii=False, indent=2), encoding='utf-8')
print(f'Created {len(background_manifest)} backgrounds and {len(enemy_manifest)} enemy illustrations.')
