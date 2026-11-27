from pathlib import Path
root=Path(__file__).resolve().parents[1]/'assets/player/layers'
root.mkdir(parents=True,exist_ok=True)

def svg(content):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 520">{content}</svg>'''

def write(name,content):
    (root/f'{name}.svg').write_text(svg(content),encoding='utf-8')

# Head slot
write('head-none','')
write('head-leaf-band','''<path d="M91 57 Q130 45 169 57 L167 75 Q130 65 93 75Z" fill="#273b37" stroke="#121d1c" stroke-width="3"/><rect x="118" y="55" width="24" height="20" rx="3" fill="#aeb7ae" stroke="#34413d" stroke-width="2"/><path d="M123 62 q7 -7 13 0 q-7 7 -13 0Z" fill="none" stroke="#36443d" stroke-width="2"/>''')
write('head-cloth-band','''<path d="M92 59 Q130 47 168 59 L166 75 Q130 67 94 75Z" fill="#772f43" stroke="#311c2a" stroke-width="3"/><path d="M111 60 L149 60" stroke="#d48b9a" stroke-width="3" stroke-linecap="round"/>''')
write('head-flower-pin','''<path d="M151 43 Q167 38 174 51" fill="none" stroke="#231b29" stroke-width="7" stroke-linecap="round"/><g transform="translate(170 49)"><circle r="5" fill="#f4c5da"/><path d="M0 -15 Q10 -9 3 -2 Q15 2 6 8 Q2 16 -4 8 Q-15 12 -10 2 Q-17 -7 -5 -8Z" fill="#e99ec8" stroke="#8e557f" stroke-width="2"/><circle r="3" fill="#f8d985"/></g>''')

# Tops
shape='''<path d="M101 137 L85 144 L68 164 L81 186 L96 173 L93 272 Q130 286 167 272 L164 173 L179 186 L192 164 L175 144 L159 137 L145 149 L115 149Z"'''
styles={
'top-basic':('#e7e2e7','#554858','''<path d="M115 149 L130 166 L145 149" fill="none" stroke="#c5b8c8" stroke-width="4"/>'''),
'top-shinobi':('#394f4b','#172a2a','''<path d="M114 149 L130 165 L146 149" fill="none" stroke="#a8b59f" stroke-width="4"/><rect x="148" y="194" width="12" height="18" rx="3" fill="#8a9b84"/>'''),
'top-work':('#c8b9a7','#675346','''<path d="M113 149 L130 167 L147 149 M130 168 L130 267" fill="none" stroke="#6e584f" stroke-width="3"/><path d="M145 198 h15 v20 h-15Z" fill="#a28b72"/>'''),
'top-formal':('#26344a','#111a2c','''<path d="M114 149 L130 170 L146 149 L137 183 L130 196 L123 183Z" fill="#eee4e1"/><path d="M130 195 L130 270" stroke="#b8a6a8" stroke-width="2"/>'''),
'top-knit':('#576b7c','#283a4c','''<path d="M105 148 Q130 164 155 148" fill="none" stroke="#b7c8d0" stroke-width="5"/><path d="M101 185 L159 185" stroke="#7e93a1" stroke-width="3"/>'''),
'top-kimono':('#55406b','#241d3c','''<path d="M110 147 L130 173 L151 147 L136 212 L130 220 L123 212Z" fill="#ead5c6"/><path d="M130 218 L130 270" stroke="#e2bad0" stroke-width="2"/>''')}
for name,(fill,stroke,extra) in styles.items():
    write(name,f'''{shape} fill="{fill}" stroke="{stroke}" stroke-width="4" stroke-linejoin="round"/><path d="M95 175 L103 174 L104 261 M165 175 L157 174 L156 261" fill="none" stroke="{stroke}" stroke-width="3"/>{extra}''')

# Outerwear layers (transparent centre to allow top to show)
write('outer-none','')
write('outer-vest','''<path d="M99 139 L83 148 L72 169 L88 186 L101 175 L100 273 L120 281 L130 252 L140 281 L160 273 L159 175 L172 186 L188 169 L177 148 L161 139 L147 151 L139 182 L130 190 L121 182 L113 151Z" fill="#667766" stroke="#283b36" stroke-width="4" stroke-linejoin="round"/><path d="M105 156 L115 182 L109 260 M155 156 L145 182 L151 260" fill="none" stroke="#b3c1a5" stroke-width="3"/><rect x="103" y="197" width="19" height="27" rx="3" fill="#465d52" stroke="#243a34" stroke-width="2"/><rect x="138" y="197" width="19" height="27" rx="3" fill="#465d52" stroke="#243a34" stroke-width="2"/>''')
write('outer-jacket','''<path d="M98 137 L82 147 L64 169 L81 190 L97 175 L94 288 L115 288 L130 260 L145 288 L166 288 L163 175 L179 190 L196 169 L178 147 L162 137 L145 148 L139 174 L130 185 L121 174 L115 148Z" fill="#222a3c" stroke="#111825" stroke-width="4" stroke-linejoin="round"/><path d="M115 150 L130 177 L145 150 M130 179 L130 285" fill="none" stroke="#a15b75" stroke-width="3"/><path d="M98 175 L109 178 L108 270 M162 175 L151 178 L152 270" fill="none" stroke="#576177" stroke-width="3"/>''')
write('outer-haori','''<path d="M99 137 L80 147 L64 171 L82 190 L98 175 L91 337 L111 341 L130 289 L149 341 L169 337 L162 175 L178 190 L196 171 L180 147 L161 137 L145 150 L139 179 L130 196 L121 179 L115 150Z" fill="#3d3155" stroke="#17162a" stroke-width="4" stroke-linejoin="round"/><path d="M115 150 L130 184 L145 150 M130 184 L130 330" fill="none" stroke="#d7b2cf" stroke-width="3"/><path d="M95 311 Q130 324 165 311" fill="none" stroke="#e6c2d9" stroke-width="5"/>''')
write('outer-raincoat','''<path d="M97 136 L80 146 L63 168 L81 190 L98 174 L87 390 L112 396 L130 330 L148 396 L173 390 L162 174 L179 190 L197 168 L180 146 L163 136 L145 151 L139 178 L130 193 L121 178 L115 151Z" fill="#40586a" stroke="#1e3242" stroke-width="4" stroke-linejoin="round"/><path d="M115 151 L130 181 L145 151 M130 182 L130 390" fill="none" stroke="#b9d6de" stroke-width="3"/><path d="M91 354 Q130 368 169 354" fill="none" stroke="#8daab9" stroke-width="4"/>''')
write('outer-travel','''<path d="M98 136 L80 146 L62 171 L81 191 L98 174 L91 374 L114 380 L130 319 L146 380 L169 374 L162 174 L179 191 L198 171 L180 146 L162 136 L145 150 L139 179 L130 193 L121 179 L115 150Z" fill="#292b3b" stroke="#111625" stroke-width="4" stroke-linejoin="round"/><path d="M115 150 L130 181 L145 150 M130 182 L130 374" fill="none" stroke="#8f526a" stroke-width="3"/><path d="M92 333 L108 338 M168 333 L152 338" stroke="#c1a5a5" stroke-width="4"/>''')

# Bottoms
pants={
'bottom-trousers':('#34384a','#171d2d',''),
'bottom-shinobi':('#202b35','#111a24','''<path d="M104 373 L124 376 M136 376 L156 373" stroke="#c6cbd0" stroke-width="8"/><path d="M105 395 L123 398 M137 398 L155 395" stroke="#c6cbd0" stroke-width="5"/>'''),
'bottom-cargo':('#424c4b','#1d2b2b','''<rect x="89" y="318" width="22" height="34" rx="3" fill="#56645b" stroke="#1d2b2b" stroke-width="2"/><rect x="149" y="318" width="22" height="34" rx="3" fill="#56645b" stroke="#1d2b2b" stroke-width="2"/>'''),
'bottom-formal':('#303449','#171a2a','''<path d="M130 300 L130 440" stroke="#77778d" stroke-width="2"/>'''),
'bottom-hakama':('#4b3d5f','#1d182f','''<path d="M100 312 L124 440 M160 312 L136 440" stroke="#9580a9" stroke-width="3"/>''')}
for name,(fill,stroke,extra) in pants.items():
    write(name,f'''<path d="M91 269 Q130 282 169 269 L177 305 L158 310 L153 438 L137 448 L130 316 L123 448 L107 438 L102 310 L83 305Z" fill="{fill}" stroke="{stroke}" stroke-width="4" stroke-linejoin="round"/><path d="M92 282 Q130 294 168 282" fill="none" stroke="#b8a6a5" stroke-width="3"/>{extra}''')
write('bottom-skirt-long','''<path d="M94 269 Q130 285 166 269 L183 431 Q130 450 77 431Z" fill="#564462" stroke="#241a35" stroke-width="4"/><path d="M130 289 L130 438 M92 304 L104 431 M168 304 L156 431" stroke="#ad91b9" stroke-width="3" fill="none"/><path d="M92 287 Q130 300 168 287" stroke="#d8b9c9" stroke-width="4" fill="none"/>''')

# Shoes
write('shoes-sandals','''<path d="M91 445 Q105 438 121 448 L124 469 Q104 478 84 466Z M139 448 Q155 438 169 445 L176 466 Q156 478 136 469Z" fill="#3b2a29" stroke="#17121c" stroke-width="4"/><path d="M95 451 L113 466 M165 451 L147 466" stroke="#d1b39a" stroke-width="4" stroke-linecap="round"/>''')
write('shoes-sneakers','''<path d="M90 445 Q108 437 122 450 L125 467 Q116 478 82 470 Q78 460 90 445Z M138 450 Q152 437 170 445 L178 470 Q144 478 135 467Z" fill="#e8e2e8" stroke="#343144" stroke-width="4"/><path d="M84 467 Q104 473 125 466 M135 466 Q157 473 176 467" fill="none" stroke="#9c719d" stroke-width="4"/><path d="M94 451 L114 461 M166 451 L146 461" stroke="#6f6680" stroke-width="3"/>''')
write('shoes-boots','''<path d="M99 410 L122 413 L126 465 Q112 480 82 471 L85 451 L95 442Z M138 413 L161 410 L165 442 L175 451 L178 471 Q148 480 134 465Z" fill="#333447" stroke="#171725" stroke-width="4"/><path d="M88 451 L119 451 M141 451 L172 451" stroke="#9b829c" stroke-width="3"/>''')
write('shoes-formal','''<path d="M96 444 Q111 438 123 449 L126 466 Q113 476 83 468 Q82 457 96 444Z M137 449 Q149 438 164 444 Q178 457 177 468 Q147 476 134 466Z" fill="#2b2632" stroke="#120f19" stroke-width="4"/><path d="M87 466 Q106 471 125 464 M135 464 Q154 471 173 466" stroke="#c49c62" stroke-width="3"/>''')

# Accessories
write('accessory-none','')
write('accessory-scarf','''<path d="M107 127 Q130 147 153 127 L163 148 Q130 170 97 148Z" fill="#80384f" stroke="#401d32" stroke-width="3"/><path d="M145 145 L157 145 L165 224 L149 233 L143 220Z" fill="#8e4058" stroke="#401d32" stroke-width="3"/><path d="M151 157 L158 216" stroke="#d69aa8" stroke-width="3"/>''')
write('accessory-belt','''<path d="M95 270 Q130 282 165 270 L165 286 Q130 300 95 286Z" fill="#6f513c" stroke="#2e211d" stroke-width="3"/><rect x="121" y="272" width="18" height="15" rx="2" fill="#d4b06e" stroke="#4b3a2a" stroke-width="2"/><rect x="165" y="280" width="20" height="33" rx="4" fill="#4b3a37" stroke="#221a20" stroke-width="3"/>''')
write('accessory-brooch','''<path d="M130 154 L130 178" stroke="#d4b28b" stroke-width="3"/><g transform="translate(130 176)"><path d="M0 -12 Q9 -8 4 -1 Q14 4 5 9 Q0 14 -4 7 Q-14 10 -9 0 Q-14 -8 -4 -8Z" fill="#e7a7c8" stroke="#8c5a87" stroke-width="2"/><circle r="3" fill="#f5d77e"/></g>''')
write('accessory-shoulderbag','''<path d="M156 158 Q184 195 177 259" fill="none" stroke="#33283a" stroke-width="7"/><path d="M159 224 Q177 214 193 229 L190 274 Q172 286 154 270Z" fill="#68506f" stroke="#271b32" stroke-width="3"/><path d="M163 236 L183 236 M162 263 L185 263" stroke="#d5adcf" stroke-width="3"/>''')

print('created',len(list(root.glob('*.svg'))),'SVG clothing layers in',root)
