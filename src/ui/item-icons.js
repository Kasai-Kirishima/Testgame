/* Quiet Dream item icon kit — self-contained, no external assets or fonts. */
(() => {
  let serial = 0;
  const esc = value => String(value ?? '').replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  const kindFor = (name, info = {}) => {
    const n = String(name || '').toLowerCase();
    if (/фонар|ламп|свеч|свет|факел/.test(n)) return 'lamp';
    if (/вода|бутыл|фляг|сок|напит|термос|чай|энергетик|молок|пиво/.test(n)) return 'bottle';
    if (/аптеч|бинт|пластыр|антисеп|таблет|антибиот|шприц|лекар|уголь/.test(n) || info.category === 'medical') return 'medical';
    if (/консерв|туш[её]н|банка|кильк|равиол|сосиск/.test(n)) return 'tin';
    if (/компас|термометр|часы|будильник|калькулятор|фотоаппарат|камера|бинокл/.test(n)) return 'instrument';
    if (/блокнот|дневник|тетрад|книг|бумаг|картон/.test(n)) return 'book';
    if (/топор|молот|лопат|кирк|ножов|пила|шуруп|гвозд|вер[её]в|инструмент/.test(n)) return 'tool';
    if (/доска|древес|брев|дров|дерев|ткан|брезент|шифер|кирпич|камень|гвозд/.test(n)) return 'resource';
    if (/яблок|манго|лимон|помидор|огур|картоф|морков|банан|арбуз|ананас|виноград|хлеб|булоч|мяс|колбас|пельмен|еда|шоколад|батончик|сухар|чипс/.test(n) || info.category === 'food') return 'food';
    if (/рюкзак|сумк|мешок|контейнер|ящик|короб/.test(n)) return 'pack';
    if (info.category === 'drink') return 'bottle';
    if (info.category === 'tool') return 'tool';
    if (info.category === 'resource') return 'resource';
    return 'misc';
  };

  function render(name, info = {}, size = 'normal') {
    const kind = kindFor(name, info);
    const id = `qdi${++serial}`;
    const common = `class="qd-item-art ${size === 'small' ? 'qd-item-art-small' : ''}" viewBox="0 0 72 72" role="img" aria-label="${esc(name)}" focusable="false"`;
    const defs = `<defs>
      <linearGradient id="${id}a" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f1e5c5"/><stop offset=".42" stop-color="#b5a17b"/><stop offset="1" stop-color="#514a3c"/></linearGradient>
      <linearGradient id="${id}b" x1="0" y1="0" x2="0.9" y2="1"><stop stop-color="#aebbb0"/><stop offset=".48" stop-color="#62756a"/><stop offset="1" stop-color="#293a34"/></linearGradient>
      <linearGradient id="${id}c" x1="0" y1="0" x2="0" y2="1"><stop stop-color="#d59a4b"/><stop offset="1" stop-color="#754326"/></linearGradient>
      <linearGradient id="${id}d" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#fff4d6"/><stop offset="1" stop-color="#b9a47e"/></linearGradient>
      <filter id="${id}s" x="-40%" y="-40%" width="180%" height="190%"><feGaussianBlur stdDeviation="2.1"/></filter>
    </defs>`;
    const shadow = '<ellipse cx="36" cy="61" rx="21" ry="5" fill="#000" opacity=".32" filter="url(#'+id+'s)"/>';
    let art = '';
    if (kind === 'lamp') art = `${shadow}<path d="M22 26 Q18 10 36 10 Q54 10 50 26" fill="none" stroke="#c1a878" stroke-width="3.2"/><path d="M23 25 H49 L47 52 Q36 59 25 52Z" fill="url(#${id}b)" stroke="#c6b78f" stroke-width="1.7"/><path d="M28 28 H44 L43 48 Q36 52 29 48Z" fill="#e2ae61" opacity=".76"/><path d="M36 30 C28 39 36 45 36 46 C36 46 44 39 36 30Z" fill="#fff0b4"/><path d="M20 24 H52 M25 53 H47" stroke="#d5c49b" stroke-width="3" stroke-linecap="round"/><rect x="30" y="54" width="12" height="5" rx="1.5" fill="#29322e"/>`;
    else if (kind === 'bottle') art = `${shadow}<path d="M30 9 H42 V17 L47 23 Q51 28 50 36 L48 54 Q47 59 42 59 H30 Q25 59 24 54 L22 36 Q21 28 25 23 L30 17Z" fill="url(#${id}b)" stroke="#d2d7c6" stroke-width="1.6"/><path d="M30 9 H42 V17 H30Z" fill="#d8c69a"/><rect x="29" y="5" width="14" height="5" rx="1" fill="#9a7442" stroke="#d9bf8e"/><path d="M25 32 Q36 28 48 32 L46 50 Q36 54 27 50Z" fill="#b7c9b6" opacity=".18"/><path d="M29 37 H44" stroke="#e4d6b5" stroke-width="2" opacity=".7"/><path d="M27 24 Q30 21 32 21" stroke="#fff" stroke-width="2" opacity=".4"/>`;
    else if (kind === 'medical') art = `${shadow}<path d="M17 27 Q17 23 22 23 H50 Q55 23 55 28 V53 Q55 57 50 57 H22 Q17 57 17 53Z" fill="#ddd9c8" stroke="#f3edda" stroke-width="1.7"/><path d="M25 23 V18 Q25 15 29 15 H43 Q47 15 47 18 V23" fill="none" stroke="#a99a7d" stroke-width="3"/><path d="M32 29 H40 V37 H48 V45 H40 V53 H32 V45 H24 V37 H32Z" fill="#aa5144"/><path d="M20 27 H52" stroke="#fff" stroke-width="1.5" opacity=".55"/>`;
    else if (kind === 'tin') art = `${shadow}<ellipse cx="36" cy="17" rx="17" ry="6" fill="#b9c0b5" stroke="#e2e2d5"/><path d="M19 17 V51 Q36 62 53 51 V17 Q36 28 19 17Z" fill="url(#${id}b)" stroke="#d9d7c5" stroke-width="1.5"/><ellipse cx="36" cy="17" rx="17" ry="6" fill="#d3d0bf" stroke="#f2ead7" stroke-width="1.4"/><path d="M21 31 Q36 35 51 31 V43 Q36 48 21 43Z" fill="url(#${id}c)"/><path d="M28 35 H44 M30 39 H42" stroke="#f1d6a5" stroke-width="1.5" stroke-linecap="round"/><path d="M22 20 V47 M50 20 V47" stroke="#fff" opacity=".16" stroke-width="2"/>`;
    else if (kind === 'instrument') art = `${shadow}<circle cx="36" cy="34" r="22" fill="url(#${id}a)" stroke="#d5c7a5" stroke-width="2"/><circle cx="36" cy="34" r="17" fill="#263c38" stroke="#e4d3aa" stroke-width="1.4"/><circle cx="36" cy="34" r="2.5" fill="#e6d5aa"/><path d="M36 18 L40 37 L36 34 L32 49Z" fill="#c35c43" stroke="#e9d7b5" stroke-width=".8"/><path d="M36 19 V22 M51 34 H48 M36 49 V46 M21 34 H24" stroke="#efe2c6" stroke-width="1.7" stroke-linecap="round"/><path d="M25 12 Q36 5 47 12" fill="none" stroke="#fff" opacity=".32" stroke-width="2"/>`;
    else if (kind === 'book') art = `${shadow}<path d="M16 18 Q27 13 36 20 V55 Q26 48 16 53Z" fill="#776448" stroke="#d7c6a1" stroke-width="1.5"/><path d="M56 18 Q45 13 36 20 V55 Q46 48 56 53Z" fill="#a58a61" stroke="#e2d4b5" stroke-width="1.5"/><path d="M20 23 Q28 21 32 25 M20 29 Q28 27 32 31 M20 35 Q28 33 32 37 M52 23 Q44 21 40 25 M52 29 Q44 27 40 31 M52 35 Q44 33 40 37" stroke="#e4d8bd" stroke-width="1.4" opacity=".74"/><path d="M36 20 V55" stroke="#3a2f23" stroke-width="2"/><path d="M20 18 Q28 15 34 20" stroke="#fff" opacity=".25" stroke-width="2"/>`;
    else if (kind === 'tool' && /молот/.test(String(name).toLowerCase())) art = `${shadow}<path d="M33 20 L40 20 L39 57 Q36 61 32 57Z" fill="#845d3a" stroke="#d5b68c" stroke-width="1.4"/><path d="M15 12 Q15 8 20 8 H51 Q57 8 57 14 L54 26 H18Z" fill="url(#${id}a)" stroke="#eee0c1" stroke-width="1.7"/><path d="M18 12 H52 M35 27 V54" stroke="#fff" opacity=".35" stroke-width="2"/><path d="M32 54 L39 54" stroke="#473322" stroke-width="2"/>`;
    else if (kind === 'tool') art = `${shadow}<path d="M25 13 L31 10 L48 49 L42 53Z" fill="#8c6541" stroke="#d3b486" stroke-width="1.2"/><path d="M22 13 Q19 9 23 7 L45 9 Q52 10 50 17 L43 28 L31 26Z" fill="url(#${id}a)" stroke="#e0d6bf" stroke-width="1.5"/><path d="M25 12 L44 14" stroke="#fff" opacity=".38" stroke-width="2"/><path d="M38 45 L45 42" stroke="#3c3023" stroke-width="2"/>`;
    else if (kind === 'resource' && /доск|брев|дров/.test(String(name).toLowerCase())) art = `${shadow}<g stroke="#d8bd91" stroke-width="1.4"><path d="M15 41 L42 19 L55 24 L28 47Z" fill="#9d7549"/><path d="M19 48 L46 26 L59 31 L32 54Z" fill="#765437"/><path d="M12 33 L39 12 L52 17 L25 39Z" fill="#bd9562"/></g><path d="M22 33 L40 19 M29 43 L47 29" stroke="#f0d4a2" stroke-width="1.5" opacity=".5"/>`;
    else if (kind === 'resource') art = `${shadow}<path d="M15 28 L31 17 L57 24 L42 34Z" fill="#aa8657" stroke="#e0c69a" stroke-width="1.3"/><path d="M15 28 L42 34 V54 L15 47Z" fill="#6f573b" stroke="#c5a87a" stroke-width="1.3"/><path d="M42 34 L57 24 V44 L42 54Z" fill="#99774e" stroke="#d6b889" stroke-width="1.3"/><path d="M20 31 L37 36 M20 37 L37 42 M46 36 L53 32" stroke="#e6c99c" opacity=".4" stroke-width="1.4"/>`;
    else if (kind === 'food' && /пельмен|равиол/.test(String(name).toLowerCase())) art = `${shadow}<g fill="#d7c49e" stroke="#f2e5c5" stroke-width="1.7"><path d="M14 42 Q15 25 29 26 Q43 27 43 41 Q42 52 28 52 Q15 52 14 42Z"/><path d="M31 30 Q33 13 48 16 Q61 19 57 34 Q53 46 40 43Z"/><path d="M25 20 Q27 9 40 10 Q51 11 49 24 Q46 35 35 33Z"/></g><g fill="none" stroke="#9c835b" stroke-width="1.4"><path d="M17 40 Q28 46 40 39 M34 25 Q44 31 55 26 M28 18 Q38 22 48 18"/></g><path d="M20 33 Q26 29 30 34" stroke="#fff" stroke-width="2" opacity=".4"/>`;
    else if (kind === 'food' && /хлеб|батон|булоч/.test(String(name).toLowerCase())) art = `${shadow}<path d="M15 38 Q13 22 25 20 Q32 8 43 17 Q58 17 58 35 L55 49 Q36 61 17 49Z" fill="url(#${id}c)" stroke="#e3bf86" stroke-width="1.8"/><path d="M22 29 Q28 18 34 25 M38 24 Q45 16 49 27 M28 37 L25 46 M42 34 L45 45" fill="none" stroke="#f0d39f" stroke-width="2" opacity=".75" stroke-linecap="round"/><path d="M18 39 Q36 48 55 38" stroke="#70452b" stroke-width="2" opacity=".4"/>`;
    else if (kind === 'food' && /картоф|морков|лук|помидор|огур/.test(String(name).toLowerCase())) art = `${shadow}<path d="M18 39 Q12 28 24 22 Q36 13 50 22 Q61 31 51 45 Q40 58 25 50Z" fill="url(#${id}c)" stroke="#dfb780" stroke-width="1.6"/><path d="M25 28 Q34 22 45 26 M23 40 Q34 48 48 40" fill="none" stroke="#f0d2a2" stroke-width="2" opacity=".5"/><path d="M38 20 Q37 12 44 8" stroke="#637c4c" stroke-width="3" stroke-linecap="round"/>`;
    else if (kind === 'food') art = `${shadow}<path d="M36 20 C24 11 14 22 18 36 C21 48 30 56 36 56 C42 56 52 48 54 36 C58 22 47 11 36 20Z" fill="url(#${id}c)" stroke="#e1b47b" stroke-width="1.6"/><path d="M36 20 Q34 12 39 8 Q43 7 45 10 Q39 12 38 21" fill="#627d51" stroke="#a7b17a" stroke-width="1.3"/><path d="M26 25 Q22 36 29 44" stroke="#fff" opacity=".27" stroke-width="3" stroke-linecap="round"/><path d="M40 20 Q46 21 49 27" stroke="#f4d2a0" opacity=".35" stroke-width="2"/>`;
    else if (kind === 'pack') art = `${shadow}<path d="M27 19 Q27 12 36 12 Q45 12 45 19" fill="none" stroke="#b8a17a" stroke-width="4"/><path d="M20 23 Q20 18 26 18 H46 Q52 18 52 24 L55 49 Q55 56 48 57 H24 Q17 56 18 49Z" fill="url(#${id}b)" stroke="#c5b58e" stroke-width="1.7"/><path d="M25 31 H47 V47 H25Z" fill="#455a4b" stroke="#d0bd92" stroke-width="1.3"/><path d="M31 32 V44 M41 32 V44" stroke="#d4c39c" opacity=".55"/><rect x="31" y="47" width="10" height="5" rx="1" fill="#ba965d"/>`;
    else art = `${shadow}<path d="M20 25 L36 15 L53 25 V50 L36 59 L19 50Z" fill="url(#${id}b)" stroke="#c8b88f" stroke-width="1.5"/><path d="M20 25 L36 34 L53 25 M36 34 V58" fill="none" stroke="#e4d0a6" stroke-width="1.4"/><path d="M26 29 L36 23 L46 29" stroke="#fff" stroke-width="2" opacity=".32"/>`;
    return `<svg ${common}>${defs}<rect x="3" y="3" width="66" height="66" rx="12" fill="#202720" stroke="#9b8a65" stroke-opacity=".24"/>${art}</svg>`;
  }

  window.QDItemIcons = { render, kindFor };
})();
