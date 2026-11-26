#!/usr/bin/env python3
"""Create clean portrait crops from already bundled Library-derived character art.
No new artwork is generated; only the overlay-caption margins are cropped away.
Requires Pillow. Run from the project root: python scripts/clean-library-portraits.py
"""
from pathlib import Path
from PIL import Image, ImageOps
ROOT = Path(__file__).resolve().parents[1] / "assets" / "characters"
CROPS = {
    'haku': (78, 18, 360, 348),
    'hanabi': (78, 18, 360, 348),
    'hinata': (78, 18, 360, 348),
    'kurenai': (116, 18, 360, 303),
    'kurotsuchi': (145, 18, 360, 269),
    'kushina': (78, 18, 360, 348),
    'mabui': (78, 18, 360, 348),
    'mikoto': (78, 18, 360, 348),
    'mito': (78, 18, 360, 348),
    'mirai': (110, 18, 360, 311),
    'rin': (78, 18, 360, 348),
    'sakura': (78, 18, 360, 348),
    'samui': (78, 18, 360, 348),
    'sarada': (78, 18, 360, 348),
    'shizune': (78, 18, 360, 348),
    'temari': (78, 18, 360, 348),
    'tenten': (78, 18, 360, 348),
    'tsunade': (78, 18, 360, 348),
 }
for character, box in CROPS.items():
    source = ROOT / character / "portrait.webp"
    image = Image.open(source).convert("RGB")
    crop = ImageOps.fit(image.crop(box), (360, 420), method=Image.Resampling.LANCZOS, centering=(0.5, 0.43))
    crop.save(ROOT / character / "portrait-clean.webp", "WEBP", quality=90, method=6)
    print(f"cleaned {character}")
