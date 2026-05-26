# unicoder &nbsp;![logo](https://github.com/zainmk/unicoder/blob/main/icon48.png)

> Inline Unicode autocomplete for any text field in your browser.

Type `/` followed by an alias or hex code point in **any** text field — a tooltip appears above your cursor. Click it or press **Tab** to instantly insert the character and replace the trigger text.

---

## How it works

1. Type `/alias` or `/hexcode` in any input field, textarea, or contenteditable element
2. A tooltip appears above your cursor showing the mapped character
3. Press **Tab** or click the tooltip to insert — the `/alias` text is replaced in place
4. Press **Escape** to dismiss without inserting

```
/rarrow   →   →
/pi       →   π
/alpha    →   α
/2192     →   →   (hex code point)
/1F44D    →   👍  (emoji via hex)
/zhong    →   中  (Chinese)
/hiOM     →   ॐ   (Hindi)
/arShin   →   ش   (Arabic)
```

---

## Features

- **Works everywhere** — any text field on any website, including iframes (Gmail compose, Notion, Linear, etc.)
- **Named aliases** — 170+ built-in shortcuts across arrows, math, Greek, punctuation, symbols, emoji, and language characters
- **Hex code points** — type any valid Unicode hex directly (e.g. `/1F680` → 🚀)
- **Multi-character output** — an alias can map to a sequence of characters (e.g. `¯\_(ツ)_/¯`)
- **Custom aliases** — add your own `/alias → character` mappings via the popup
- **Synced across devices** — custom aliases are stored in `chrome.storage.sync` and follow your Chrome profile
- **No network requests** — fully local, zero telemetry, zero backend

---

## Built-in alias categories

| Category | Examples |
|---|---|
| Arrows | `/rarrow` → →, `/Rarrow` → ⇒, `/nearrow` → ↗ |
| Math | `/pi` → π, `/sum` → ∑, `/inf` → ∞, `/approx` → ≈ |
| Greek | `/alpha` → α, `/Omega` → Ω, `/theta` → θ |
| Punctuation | `/mdash` → —, `/ellipsis` → …, `/copy` → © |
| Symbols | `/check` → ✓, `/star` → ★, `/bullet` → • |
| Emoji | `/+1` → 👍, `/fire` → 🔥, `/tada` → 🎉 |
| Spanish | `/ntilde` → ñ, `/iquest` → ¿ |
| Chinese | `/zhong` → 中, `/hao` → 好 |
| Arabic | `/arShin` → ش, `/arMim` → م |
| Hindi | `/hiOM` → ॐ, `/hiKa` → क |

---

## Custom aliases

Open the extension popup and use the **Custom** section to define your own mappings:

- `/alias` → any Unicode character, emoji, hex code point, or raw string
- Custom aliases take priority over built-ins, so you can override defaults
- Entries sync automatically across all your Chrome devices

---

## Stack

- Vanilla JS, HTML, CSS
- Chrome Extension Manifest V3
- `chrome.storage.sync` for cross-device alias persistence
- No build step, no dependencies

---

## Privacy

Unicoder collects no user data. Custom aliases are stored solely in your own Chrome sync storage — the same infrastructure as bookmarks. No data is ever transmitted to any external server.

Full privacy policy: [zainmk.github.io/unicoder/privacy.html](https://zainmk.github.io/unicoder/privacy.html)

---

## Demo

[![demo](https://img.youtube.com/vi/ASBkAhrceDQ/0.jpg)](https://www.youtube.com/watch?v=ASBkAhrceDQ)
