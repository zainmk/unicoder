const UNICODE_ALIASES = {
  
  // Arrows
  rarrow:   '→', // →
  larrow:   '←', // ←
  uarrow:   '↑', // ↑
  darrow:   '↓', // ↓
  lrarrow:  '↔', // ↔
  udarrow:  '↕', // ↕
  nearrow:  '↗', // ↗
  nwarrow:  '↖', // ↖
  searrow:  '↘', // ↘
  swarrow:  '↙', // ↙
  Rarrow:   '⇒', // ⇒
  Larrow:   '⇐', // ⇐
  Uarrow:   '⇑', // ⇑
  Darrow:   '⇓', // ⇓
  Lrarrow:  '⇔', // ⇔

  // Math
  inf:      '∞', // ∞
  pi:       'π', // π
  sum:      '∑', // ∑
  prod:     '∏', // ∏
  sqrt:     '√', // √
  pm:       '±', // ±
  times:    '×', // ×
  div:      '÷', // ÷
  neq:      '≠', // ≠
  leq:      '≤', // ≤
  geq:      '≥', // ≥
  approx:   '≈', // ≈
  equiv:    '≡', // ≡
  forall:   '∀', // ∀
  exists:   '∃', // ∃
  in:       '∈', // ∈
  notin:    '∉', // ∉
  subset:   '⊂', // ⊂
  supset:   '⊃', // ⊃
  union:    '∪', // ∪
  inter:    '∩', // ∩
  empty:    '∅', // ∅
  nabla:    '∇', // ∇
  partial:  '∂', // ∂
  int:      '∫', // ∫
  degree:   '°', // °

  // Greek lowercase
  alpha:    'α', // α
  beta:     'β', // β
  gamma:    'γ', // γ
  delta:    'δ', // δ
  epsilon:  'ε', // ε
  zeta:     'ζ', // ζ
  eta:      'η', // η
  theta:    'θ', // θ
  iota:     'ι', // ι
  kappa:    'κ', // κ
  lambda:   'λ', // λ
  mu:       'μ', // μ
  nu:       'ν', // ν
  xi:       'ξ', // ξ
  omicron:  'ο', // ο
  rho:      'ρ', // ρ
  sigma:    'σ', // σ
  tau:      'τ', // τ
  upsilon:  'υ', // υ
  phi:      'φ', // φ
  chi:      'χ', // χ
  psi:      'ψ', // ψ
  omega:    'ω', // ω

  // Greek uppercase
  Alpha:    'Α', // Α
  Beta:     'Β', // Β
  Gamma:    'Γ', // Γ
  Delta:    'Δ', // Δ
  Epsilon:  'Ε', // Ε
  Theta:    'Θ', // Θ
  Lambda:   'Λ', // Λ
  Mu:       'Μ', // Μ
  Pi:       'Π', // Π
  Sigma:    'Σ', // Σ
  Phi:      'Φ', // Φ
  Psi:      'Ψ', // Ψ
  Omega:    'Ω', // Ω

  // Punctuation & typography
  mdash:    '—', // —
  ndash:    '–', // –
  ellipsis: '…', // …
  lquote:   '“', // "
  rquote:   '”', // "
  lsquote:  '‘', // '
  rsquote:  '’', // '
  bullet:   '•', // •
  middot:   '·', // ·
  dagger:   '†', // †
  ddagger:  '‡', // ‡
  para:     '¶', // ¶
  sect:     '§', // §
  copy:     '©', // ©
  reg:      '®', // ®
  tm:       '™', // ™
  nbsp:     ' ', // non-breaking space

  // Symbols
  check:    '✓', // ✓
  xmark:    '✗', // ✗
  star:     '★', // ★
  ostar:    '☆', // ☆
  heart:    '♥', // ♥
  diamond:  '♦', // ♦
  club:     '♣', // ♣
  spade:    '♠', // ♠
  note:     '♪', // ♪
  sun:      '☀', // ☀
  cloud:    '☁', // ☁
  snow:     '☃', // ☃
  lightning:'⚡', // ⚡
  recycle:  '♻', // ♻
  flag:     '⚑', // ⚑

  // Superscripts
  sup0:     '⁰', // ⁰
  sup1:     '¹', // ¹
  sup2:     '²', // ²
  sup3:     '³', // ³
  sup4:     '⁴', // ⁴
  supn:     'ⁿ', // ⁿ

  // Fractions
  half:     '½', // ½
  third:    '⅓', // ⅓
  quarter:  '¼', // ¼
  threequarters: '¾', // ¾

  // Emoji
  '+1':     '👍', // thumbs up
  '-1':     '👎', // thumbs down
  smile:    '😀', // grinning face
  joy:      '😂', // tears of joy
  blush:    '😊', // smiling face
  think:    '🤔', // thinking face
  wow:      '😮', // open mouth
  cry:      '😢', // crying face
  cool:     '😎', // sunglasses
  love:     '❤️', // red heart
  fire:     '🔥', // fire
  rocket:   '🚀', // rocket
  tada:     '🎉', // party popper
  pray:     '🙏', // folded hands
  clap:     '👏', // clapping hands
  wave:     '👋', // waving hand
  eyes:     '👀', // eyes
  muscle:   '💪', // flexed bicep
  bulb:     '💡', // light bulb
  target:   '🎯', // bullseye
  tick:     '✅', // green check
  xred:     '❌', // red cross
  hundo:    '💯', // 100 points
  glowstar: '⭐', // glowing star

  // Spanish
  aacute: 'á',  eacute: 'é',  iacute: 'í',  oacute: 'ó',  uacute: 'ú',
  Aacute: 'Á',  Eacute: 'É',  Iacute: 'Í',  Oacute: 'Ó',  Uacute: 'Ú',
  ntilde: 'ñ',  Ntilde: 'Ñ',  uuml: 'ü',
  iquest: '¿',  iexcl: '¡',

  // Mandarin Chinese (pinyin aliases → hanzi)
  wo:    '我',  // I / me
  ni:    '你',  // you
  ta:    '他',  // he
  men:   '们',  // plural suffix
  shi:   '是',  // is / am / are
  bu:    '不',  // no / not
  hao:   '好',  // good
  de:    '的',  // possessive particle (most common character)
  zhong: '中',  // middle / China
  guo:   '国',  // country
  ren:   '人',  // person
  da:    '大',  // big

  // Arabic — all 28 letters (isolated form, standard transliteration names)
  arAlef: 'ا',  arBa:   'ب',  arTa:   'ت',  arTha:  'ث',
  arJim:  'ج',  arHa:   'ح',  arKha:  'خ',  arDal:  'د',
  arDhal: 'ذ',  arRa:   'ر',  arZay:  'ز',  arSin:  'س',
  arShin: 'ش',  arSad:  'ص',  arDad:  'ض',  arTah:  'ط',
  arZah:  'ظ',  arAin:  'ع',  arGhain:'غ',  arFa:   'ف',
  arQaf:  'ق',  arKaf:  'ك',  arLam:  'ل',  arMim:  'م',
  arNun:  'ن',  arHeh:  'ه',  arWaw:  'و',  arYa:   'ي',

  // Hindi — Devanagari vowels & common consonants
  hiA:   'अ',  hiAA:  'आ',  hiI:   'इ',  hiII:  'ई',
  hiU:   'उ',  hiUU:  'ऊ',  hiE:   'ए',  hiO:   'ओ',
  hiOM:  'ॐ',  hiKa:  'क',  hiGa:  'ग',  hiCa:  'च',
  hiTa:  'त',  hiDa:  'द',  hiNa:  'न',  hiPa:  'प',
  hiMa:  'म',  hiYa:  'य',  hiRa:  'र',  hiLa:  'ल',
  hiVa:  'व',  hiSa:  'स',  hiHa:  'ह',
};

// Categories for the popup reference UI
const ALIAS_CATEGORIES = [
  {
    name: 'Arrows',
    keys: ['rarrow','larrow','uarrow','darrow','lrarrow','udarrow',
           'nearrow','nwarrow','searrow','swarrow','Rarrow','Larrow','Uarrow','Darrow','Lrarrow'],
  },
  {
    name: 'Math',
    keys: ['inf','pi','sum','prod','sqrt','pm','times','div','neq','leq','geq',
           'approx','equiv','forall','exists','in','notin','subset','supset',
           'union','inter','empty','nabla','partial','int','degree'],
  },
  {
    name: 'Greek',
    keys: ['alpha','beta','gamma','delta','epsilon','zeta','eta','theta','iota',
           'kappa','lambda','mu','nu','xi','omicron','rho','sigma','tau','upsilon',
           'phi','chi','psi','omega','Alpha','Beta','Gamma','Delta','Epsilon',
           'Theta','Lambda','Mu','Pi','Sigma','Phi','Psi','Omega'],
  },
  {
    name: 'Punctuation',
    keys: ['mdash','ndash','ellipsis','lquote','rquote','lsquote','rsquote',
           'bullet','middot','dagger','ddagger','para','sect','copy','reg','tm','nbsp'],
  },
  {
    name: 'Symbols',
    keys: ['check','xmark','star','ostar','heart','diamond','club','spade',
           'note','sun','cloud','snow','lightning','recycle','flag'],
  },
  {
    name: 'Superscripts & Fractions',
    keys: ['sup0','sup1','sup2','sup3','sup4','supn','half','third','quarter','threequarters'],
  },
  {
    name: 'Arabic',
    keys: ['arAlef','arBa','arTa','arTha','arJim','arHa','arKha','arDal',
           'arDhal','arRa','arZay','arSin','arShin','arSad','arDad','arTah',
           'arZah','arAin','arGhain','arFa','arQaf','arKaf','arLam','arMim',
           'arNun','arHeh','arWaw','arYa'],
  },
  {
    name: 'Spanish',
    keys: ['aacute','eacute','iacute','oacute','uacute',
           'Aacute','Eacute','Iacute','Oacute','Uacute',
           'ntilde','Ntilde','uuml','iquest','iexcl'],
  },
  {
    name: 'Chinese',
    keys: ['wo','ni','ta','men','shi','bu','hao','de','zhong','guo','ren','da'],
  },
  {
    name: 'Hindi',
    keys: ['hiA','hiAA','hiI','hiII','hiU','hiUU','hiE','hiO','hiOM',
           'hiKa','hiGa','hiCa','hiTa','hiDa','hiNa','hiPa',
           'hiMa','hiYa','hiRa','hiLa','hiVa','hiSa','hiHa'],
  },
  {
    name: 'Emoji',
    keys: ['+1','-1','smile','joy','blush','think','wow','cry','cool','love',
           'fire','rocket','tada','pray','clap','wave','eyes','muscle',
           'bulb','target','tick','xred','hundo','glowstar'],
  },
];
