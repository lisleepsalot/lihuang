# lihuang

Li Huang's portfolio. Plain HTML/CSS/JS on GitHub Pages, content from Sanity.
No framework, no build step — keep it that way.

## Where things are

- Pages: `index.html`, `work.html`, `project.html`, `misc.html` (stay at root)
- `css/` `js/` `assets/` — styles, scripts, fonts/images
- `scripts/fetchProjects.js` — pulls Sanity content into `projects.json`
- `studio/` — Sanity Studio (React is fine here, not on the site)

## Rules

- Each page loads `general.css` + its own CSS file.
- Match the existing look: black/white, `Heap` font at 12px, dashed border on hover.
- Escape CMS text with `escapeHtml()` before putting it in HTML.
- Keep images under ~500 KB.

## Content updates

Publishing in Sanity triggers `.github/workflows/sync-sanity.yml`, which
refreshes `projects.json` and redeploys. Manual: `npm run fetch`.
