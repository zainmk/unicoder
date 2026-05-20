let customAliases = {};

chrome.storage.sync.get('customAliases', r => { customAliases = r.customAliases || {}; });
chrome.storage.onChanged.addListener((changes, area) => {
  if (area === 'sync' && changes.customAliases) {
    customAliases = changes.customAliases.newValue || {};
  }
});

function parseCode(raw) {
  const text = raw.trim();
  if (!text.startsWith('/')) return null;
  const token = text.slice(1);

  // Custom aliases take priority so users can override built-ins.
  if (token in customAliases) return customAliases[token];

  if (/^[0-9a-fA-F]{1,6}$/.test(token)) {
    const cp = parseInt(token, 16);
    if (cp >= 0 && cp <= 0x10ffff) return String.fromCodePoint(cp);
    return null;
  }

  return token in UNICODE_ALIASES ? UNICODE_ALIASES[token] : null;
}

function isEditable(el) {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'INPUT' || tag === 'TEXTAREA') return !el.readOnly && !el.disabled;
  return el.isContentEditable;
}

function replaceInEditableInput(el, char) {
  el.setRangeText(char, el.selectionStart, el.selectionEnd, 'end');
  el.dispatchEvent(new Event('input', { bubbles: true }));
  el.dispatchEvent(new Event('change', { bubbles: true }));
}

function replaceInContentEditable(char) {
  // execCommand is deprecated but remains the most reliable cross-site approach
  // for replacing a selection inside contenteditable without clobbering undo history.
  document.execCommand('insertText', false, char);
}

// ── Caret position ───────────────────────────────────────────────────────────

// Measures caret pixel position inside an input/textarea via a hidden mirror element.
function getCaretXY(el) {
  const cs = window.getComputedStyle(el);
  const rect = el.getBoundingClientRect();

  const mirror = document.createElement('div');
  mirror.setAttribute('aria-hidden', 'true');
  Object.assign(mirror.style, {
    position: 'fixed',
    top: rect.top + 'px', left: rect.left + 'px',
    width: rect.width + 'px', height: rect.height + 'px',
    overflow: 'hidden', visibility: 'hidden',
    whiteSpace: el.tagName === 'INPUT' ? 'pre' : 'pre-wrap',
    wordWrap: 'break-word',
    boxSizing: cs.boxSizing,
    paddingTop: cs.paddingTop, paddingRight: cs.paddingRight,
    paddingBottom: cs.paddingBottom, paddingLeft: cs.paddingLeft,
    borderTopWidth: cs.borderTopWidth, borderRightWidth: cs.borderRightWidth,
    borderBottomWidth: cs.borderBottomWidth, borderLeftWidth: cs.borderLeftWidth,
    fontFamily: cs.fontFamily, fontSize: cs.fontSize,
    fontWeight: cs.fontWeight, fontStyle: cs.fontStyle,
    letterSpacing: cs.letterSpacing, lineHeight: cs.lineHeight,
  });

  const pos = el.selectionEnd ?? 0;
  const marker = document.createElement('span');
  marker.textContent = '​'; // zero-width space as caret anchor

  mirror.appendChild(document.createTextNode(el.value.slice(0, pos)));
  mirror.appendChild(marker);
  mirror.appendChild(document.createTextNode(el.value.slice(pos)));
  document.body.appendChild(mirror);

  mirror.scrollTop = el.scrollTop;
  mirror.scrollLeft = el.scrollLeft;
  const mr = marker.getBoundingClientRect();
  document.body.removeChild(mirror);

  return { x: mr.left, y: mr.top };
}

function getCaretXYFromSelection() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0).cloneRange();
  range.collapse(false);
  const rect = range.getBoundingClientRect();
  if (!rect.width && !rect.height) return null;
  return { x: rect.left, y: rect.top };
}



// ── Word extraction ──────────────────────────────────────────────────────────

function getWordInInput(el) {
  const pos = el.selectionStart;
  if (pos === null) return null;
  const match = el.value.slice(0, pos).match(/(\S+)$/);
  if (!match) return null;
  return { word: match[1], start: pos - match[1].length, end: pos };
}

function getWordInContentEditable() {
  const sel = window.getSelection();
  if (!sel || sel.rangeCount === 0) return null;
  const range = sel.getRangeAt(0);
  const node = range.startContainer;
  if (node.nodeType !== Node.TEXT_NODE) return null;
  const pos = range.endOffset;
  const match = node.textContent.slice(0, pos).match(/(\S+)$/);
  if (!match) return null;
  return { word: match[1], start: pos - match[1].length, end: pos, node };
}



// ── Hover tooltip ────────────────────────────────────────────────────────────

let hoverEl = null;
let hoverState = null;

function ensureStyles() {
  if (document.getElementById('__unicoder_styles__')) return;
  const s = document.createElement('style');
  s.id = '__unicoder_styles__';
  s.textContent = `
    @keyframes __unicoder_pop__ {
      from { opacity:0; transform:translateY(4px) scale(0.96); }
      to   { opacity:1; transform:translateY(0)  scale(1);    }
    }
  `;
  (document.head || document.documentElement).appendChild(s);
}

function hideHover() {
  hoverEl?.remove();
  hoverEl = null;
  hoverState = null;
}

function showHover(x, y, unicodeChar, wordInfo, el) {
  ensureStyles();
  hoverEl?.remove();

  const tip = document.createElement('div');
  tip.id = '__unicoder_hover__';

  const TIP_W = 190;
  const TIP_H = 36;
  const left = Math.max(4, Math.min(x, window.innerWidth - TIP_W - 8));
  const top = y - TIP_H - 10 >= 4 ? y - TIP_H - 10 : y + 22;

  const glyphs  = [...unicodeChar];
  const cpHex   = glyphs[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
  const cpLabel = glyphs.length > 1 ? `U+${cpHex} +${glyphs.length - 1}` : `U+${cpHex}`;

  Object.assign(tip.style, {
    position: 'fixed',
    left: left + 'px', top: top + 'px',
    zIndex: '2147483647',
    background: '#1a1a2e', color: '#fff',
    padding: '5px 12px',
    borderRadius: '8px',
    font: '13px/1.6 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',
    boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
    display: 'flex', alignItems: 'center', gap: '8px',
    cursor: 'pointer', userSelect: 'none', whiteSpace: 'nowrap',
    animation: '__unicoder_pop__ 0.12s ease',
    pointerEvents: 'all',
  });

  tip.innerHTML =
    `<span style="font-size:17px;line-height:1">${unicodeChar}</span>` +
    `<span style="opacity:0.6;font-size:11px">${cpLabel} &nbsp;·&nbsp; Tab</span>`;

  tip.addEventListener('mousedown', e => e.preventDefault());
  tip.addEventListener('click', insertHoverChar);

  document.body.appendChild(tip);
  hoverEl = tip;
  hoverState = { el, unicodeChar, ...wordInfo };
}

function insertHoverChar() {
  if (!hoverState) return;
  const { el, unicodeChar, start, end, node } = hoverState;
  hideHover();

  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    el.focus();
    el.selectionStart = start;
    el.selectionEnd = end;
    replaceInEditableInput(el, unicodeChar);
  } else if (el.isContentEditable && node) {
    const range = document.createRange();
    range.setStart(node, start);
    range.setEnd(node, end);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    replaceInContentEditable(unicodeChar);
  }
}



// ── Listeners ────────────────────────────────────────────────────────────────

function onInput(e) {
  const el = e.target;
  if (!isEditable(el)) { hideHover(); return; }

  let wordInfo, xy;

  if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
    wordInfo = getWordInInput(el);
    if (!wordInfo) { hideHover(); return; }
    xy = getCaretXY(el);
  } else {
    wordInfo = getWordInContentEditable();
    if (!wordInfo) { hideHover(); return; }
    xy = getCaretXYFromSelection();
    if (!xy) { hideHover(); return; }
  }

  const char = parseCode(wordInfo.word);
  if (!char) { hideHover(); return; }

  showHover(xy.x, xy.y, char, wordInfo, el);
}

function onKeyDown(e) {
  if (!hoverEl) return;
  if (e.key === 'Escape') { e.stopPropagation(); hideHover(); }
  if (e.key === 'Tab')    { e.preventDefault(); e.stopPropagation(); insertHoverChar(); }
}

document.addEventListener('input',   onInput,   true);
document.addEventListener('keydown', onKeyDown, true);
document.addEventListener('blur', e => {
  if (hoverEl && isEditable(e.target)) setTimeout(hideHover, 120);
}, true);
