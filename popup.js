const searchEl     = document.getElementById('search');
const referenceEl  = document.getElementById('reference');
const addBtn       = document.getElementById('add-btn');
const addForm      = document.getElementById('add-form');
const aliasInput   = document.getElementById('alias-input');
const charInput    = document.getElementById('char-input');
const saveBtn      = document.getElementById('save-btn');
const addError     = document.getElementById('add-error');
const customList   = document.getElementById('custom-list');

let customAliases = {};

chrome.storage.sync.get('customAliases', result => {
  customAliases = result.customAliases || {};
  renderCustomList();
  render();
});

// ── Helpers ──────────────────────────────────────────────────────────────────

function codePointLabel(char) {
  const glyphs = [...char];
  const first = 'U+' + glyphs[0].codePointAt(0).toString(16).toUpperCase().padStart(4, '0');
  return glyphs.length > 1 ? `${first} +${glyphs.length - 1}` : first;
}

// Accepts a raw character (👍), a bare hex code point (1F44D), or U+1F44D.
function parseCharInput(raw) {
  const s = raw.trim();
  if (!s) return null;
  // Single glyph (including astral-plane emoji)
  if ([...s].length === 1) return s;
  // Space-separated hex code points: "1F44D 2192" → "👍→"
  const tokens = s.split(/\s+/);
  if (tokens.every(t => /^([Uu]\+)?[0-9a-fA-F]{1,6}$/.test(t))) {
    const chars = tokens.map(t => {
      const cp = parseInt(t.replace(/^[Uu]\+/i, ''), 16);
      return (cp >= 0 && cp <= 0x10ffff) ? String.fromCodePoint(cp) : null;
    });
    if (chars.every(Boolean)) return chars.join('');
    return null;
  }
  // Raw string — use exactly as typed ("¯\_(ツ)_/¯", "→→→", etc.)
  return s;
}

function buildRow(key, char) {
  const row = document.createElement('div');
  row.className = 'alias-row';
  row.title = `Click to copy /${key}`;
  row.innerHTML =
    `<span class="alias-glyph">${char}</span>` +
    `<div class="alias-info">` +
      `<div class="alias-name">/${key}</div>` +
      `<div class="alias-cp">${codePointLabel(char)}</div>` +
    `</div>`;
  row.addEventListener('click', () => {
    navigator.clipboard.writeText(char).then(() => {
      const g = row.querySelector('.alias-glyph');
      const orig = g.textContent;
      g.textContent = '✓';
      setTimeout(() => { g.textContent = orig; }, 900);
    });
  });
  return row;
}

// ── Custom section ────────────────────────────────────────────────────────────

function renderCustomList() {
  customList.innerHTML = '';
  Object.entries(customAliases).forEach(([key, char]) => {
    const item = document.createElement('div');
    item.className = 'custom-item';
    item.innerHTML =
      `<div class="alias-info">` +
        `<div class="alias-name">/${key}</div>` +
        `<div class="alias-cp">${codePointLabel(char)}</div>` +
      `</div>` +
      `<span class="alias-glyph">${char}</span>` +
      `<button class="delete-btn" title="Remove">×</button>`;

    item.querySelector('.alias-glyph').addEventListener('click', () => {
      navigator.clipboard.writeText(char);
    });

    item.querySelector('.delete-btn').addEventListener('click', () => {
      delete customAliases[key];
      chrome.storage.sync.set({ customAliases });
      renderCustomList();
      render(searchEl.value.trim());
    });

    customList.appendChild(item);
  });
}

function setError(msg) { addError.textContent = msg; }

function toggleForm(open) {
  addForm.classList.toggle('visible', open);
  addBtn.textContent = open ? '×' : '+';
  addBtn.classList.toggle('active', open);
  if (open) { setError(''); aliasInput.focus(); }
}

addBtn.addEventListener('click', () => toggleForm(!addForm.classList.contains('visible')));

function saveMapping() {
  const alias = aliasInput.value.trim().replace(/^\//, '');
  const char  = parseCharInput(charInput.value);

  if (!alias)             { setError('Alias cannot be empty'); return; }
  if (/\s/.test(alias))   { setError('Alias cannot contain spaces'); return; }
  if (!char)              { setError('Enter a character or hex code point (e.g. 1F44D)'); return; }

  customAliases[alias] = char;
  chrome.storage.sync.set({ customAliases });
  renderCustomList();
  render(searchEl.value.trim());

  aliasInput.value = '';
  charInput.value  = '';
  setError('');
  aliasInput.focus();
}

saveBtn.addEventListener('click', saveMapping);

[aliasInput, charInput].forEach(el => el.addEventListener('keydown', e => {
  if (e.key === 'Enter')  saveMapping();
  if (e.key === 'Escape') toggleForm(false);
}));

// ── Reference list ────────────────────────────────────────────────────────────

function render(filter = '') {
  referenceEl.innerHTML = '';
  const q = filter.toLowerCase().replace(/^\//, '');
  let anyVisible = false;

  // Custom aliases that match the search query (always shown in #custom-section
  // when unfiltered, so only appear here when actively searching)
  if (q) {
    const matches = Object.keys(customAliases).filter(k =>
      k.toLowerCase().includes(q) ||
      codePointLabel(customAliases[k]).toLowerCase().includes(q)
    );
    if (matches.length) {
      anyVisible = true;
      const header = document.createElement('div');
      header.className = 'category-header';
      header.textContent = 'Custom';
      referenceEl.appendChild(header);
      const grid = document.createElement('div');
      grid.className = 'alias-grid';
      matches.forEach(k => grid.appendChild(buildRow(k, customAliases[k])));
      referenceEl.appendChild(grid);
    }
  }

  // Built-in alias categories
  for (const cat of ALIAS_CATEGORIES) {
    const matches = cat.keys.filter(k => {
      if (!q) return true;
      return k.toLowerCase().includes(q) ||
             UNICODE_ALIASES[k] === q ||
             codePointLabel(UNICODE_ALIASES[k]).toLowerCase().includes(q);
    });
    if (!matches.length) continue;
    anyVisible = true;

    const header = document.createElement('div');
    header.className = 'category-header';
    header.textContent = cat.name;
    referenceEl.appendChild(header);

    const grid = document.createElement('div');
    grid.className = 'alias-grid';
    matches.forEach(k => grid.appendChild(buildRow(k, UNICODE_ALIASES[k])));
    referenceEl.appendChild(grid);
  }

  // Hex code point lookup
  if (q && /^[0-9a-f]{1,6}$/i.test(q)) {
    const cp = parseInt(q, 16);
    if (cp >= 0 && cp <= 0x10ffff) {
      const char    = String.fromCodePoint(cp);
      const section = document.createElement('div');
      section.innerHTML = '<div class="category-header">Hex code point</div>';
      referenceEl.insertBefore(section, referenceEl.firstChild);
      const grid = document.createElement('div');
      grid.className = 'alias-grid';
      grid.appendChild(buildRow(q.toUpperCase(), char));
      section.appendChild(grid);
      anyVisible = true;
    }
  }

  if (!anyVisible) {
    referenceEl.innerHTML = '<div class="no-results">No matches found</div>';
  }
}

searchEl.addEventListener('input', () => render(searchEl.value.trim()));
