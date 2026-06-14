# Julius Gunawan — Portfolio

> Automating the Boring. Optimizing the Important.

A single-page portfolio website positioning **Julius Gunawan** as a career switcher from
**Economics (IPB)** into **AI Automation**. Dark navy theme, subtle grid pattern, parallax scroll.

## Stack
- Pure **HTML + CSS + vanilla JavaScript** (no build step, no dependencies)
- Parallax via `requestAnimationFrame` + scroll transforms
- Reveal-on-scroll via `IntersectionObserver`
- Fully responsive (desktop / mobile), respects `prefers-reduced-motion`

## Structure
`index.html` · `styles.css` · `script.js`

Sections: Hero → About → Career Transition → Experience → Projects (Flagship / Applied) →
Skills → Education & Certifications → Fun Facts → Contact.

## Local preview
Just open `index.html` in a browser, or serve the folder:

```bash
# Python
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy — GitHub Pages
1. Create a public repo named `portfolio-linkedin-julius.github.io`.
2. Push these files to the `main` branch.
3. In the repo: **Settings → Pages → Source: Deploy from branch → `main` / root**.
4. Site goes live at `https://<username>.github.io/` (or the repo's Pages URL).

## Configuration
Edit the top of [`script.js`](script.js):

```js
var EMAIL_USER   = 'juliusgunawan1307'; // contact email (assembled at runtime, anti-scrape)
var EMAIL_DOMAIN = 'gmail.com';
var GITHUB_USER  = 'portfolio-linkedin-julius'; // set to your real GitHub username
```

## Notes on data & privacy
- No API keys, tokens, `.env` files, or credentials are committed (`.gitignore` enforces this).
- The contact email is **assembled in JS at runtime** rather than hardcoded as plain text, to reduce scraping.
- Project descriptions intentionally show **architecture and dummy/redacted data only** —
  no real positions, private financial figures, or non-public organization data.

---
© Julius Gunawan
