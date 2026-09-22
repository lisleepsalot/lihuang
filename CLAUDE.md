# lihuang — style guide for maintenance

Personal portfolio site for Li Huang. Static HTML/CSS/vanilla JS, hosted on
GitHub Pages (see `CNAME`), content sourced from Sanity CMS. No build step,
no framework, no bundler. Keep it that way — don't introduce React/Vite/etc.
for a page or two of new content.

## Page structure

Every page is its own `.html` file plus one dedicated CSS file layered on
top of the shared `general.css`:

- `general.css` — reset, font-face, body defaults, `.header`, `.clickable-text`,
  loading-overlay. Anything that appears on every page belongs here.
- `<page>.css` (`info.css`, `misc.css`, `project-view.css`, `display-view.css`)
  — everything specific to that one page/view.

`<head>` link order is always `general.css` then the page's own stylesheet.
`<body>` script order is always `page-transition.js`, then `loadheader.js`,
then any page-specific script(s) — `page-transition.js` goes first so the
loading overlay is up before anything else runs.

`<header class="header"></header>` is always empty in the markup — it's
populated at runtime by `loadheader.js`. Never hardcode header/nav links
into a page's HTML.

Use 4-space indentation in HTML. `<title>` is "Li Huang" everywhere except
`project.html`, which sets `document.title` per-project at runtime
(`"{webTitle} — Li Huang"`).

## CSS conventions

**Naming**: `block-name`, `block-name__part` is not used — this codebase
prefers flat BEM-ish dashes: `display-grid-container`, `display-grid-image`,
`misc-media-container`. Variants use a double-dash modifier:
`content-block--wide`, `content-block--full-bleed`, and a leading digit for
two-media layouts: `content-block--2-wide`, `content-block--2-full-bleed`.
Follow this pattern for new block types rather than inventing a new scheme.

**The signature hover treatment.** Nearly every clickable text element
(`.header-text`, `.clickable-text`, `.control-button`, `#controls-toggle`)
shares the same hover state — reuse it verbatim for new interactive text:
background flips to white (black on dark pages), a `1px dashed` border
appears, and padding drops from the resting `4px 8px` to `3px 7px` to
offset the new border so the element doesn't visually jump in size.

**Borders as decoration**: `1px dashed` marks interactive/hover borders,
`1px dotted` marks static dividers (`.pfp-text`, `.project-title`,
`.display-grid-textbox`, `.project-footer`). Keep that distinction — don't
use dashed for a static rule or dotted for a hover rule.

**Color**: the palette is almost entirely black/white/grayscale. Dark pages
(`misc.css`) define a single accent as a CSS custom property, `--lh`
(currently `#f7d580`), on `:root` and use `var(--lh)` everywhere instead of
repeating the hex value. If a new page needs a dark theme, follow that
pattern rather than hardcoding the color.

**Typography**: font is the custom `Heap` webfont, declared once via
`@font-face` in `general.css`. Base size is `12px` everywhere — there is no
type scale, so don't introduce one for a one-off element. Because some
selectors override `font-family`/`font-size` on inputs/buttons that don't
inherit body styles by default (`.menu-toggle`, `.control-button`), always
re-declare `font-family: 'Heap'; font-size: 12px;` explicitly on any new
`<button>` or form control.

**Motion**: reveal animations consistently pair `opacity` with either
`filter: blur(...)` or `transform: translateY(...)`, never opacity alone,
e.g. `.content-block` fade+slide-in, `.nav-arrow` fade+blur,
`.display-grid-textbox` fade+blur. Durations cluster around `0.3s–0.8s ease`
for micro-interactions and `1s ease-in-out` for full-page transitions. Match
these timings for new transitions instead of picking arbitrary values.

**Fixed/floating bars**: `.header` and `.bottom-controls` both use the same
"frosted glass" treatment — `background-color: rgba(255,255,255,0.7-0.8)` +
`backdrop-filter: blur(5px)`. Reuse this for any new fixed overlay bar.

**z-index scale**: `.header` / `.bottom-controls` sit at `1000`,
`.loading-overlay` sits at `9999` above everything. Keep new overlays
inside this scale rather than reaching for arbitrary large numbers.

**Responsive**: no unified breakpoint scale — each page picks its own
breakpoints based on its own layout's needs (`600px`, `680px`, `700px`,
`900px`, `1000px` are all used, in different files, for different reasons).
When adding a breakpoint, check what's already defined in that page's CSS
file first rather than inventing a new arbitrary number.

## JavaScript conventions

**Two coexisting styles, split by role — keep the split, don't unify it:**

- Classic `<script src="...">` files that run directly in the page
  (`loadheader.js`, `fun.js`, `page-transition.js`, `misc.js`,
  `display-view.js`) use semicolons.
- Data/build/module code (`Renderprojectclient.js` as an ES module,
  `fetchProjects.js`, `generate-project-index.js`, and inline
  `<script type="module">` blocks) drops semicolons and prefers single
  quotes throughout.

Both styles use `camelCase` for functions/variables and `const`/`let`, never
`var`. Config-like constants at the top of a file are `SCREAMING_SNAKE_CASE`
with a short trailing comment explaining non-obvious ones (see the
`FUN_*` constants in `fun.js`).

**Comments**: every function gets a one-to-few-line comment directly above
it, in plain prose, explaining *why* it exists or *why* it does something
non-obvious — not what the code literally does. No JSDoc blocks, no
per-parameter annotation. Look at `Renderprojectclient.js` and `fun.js` for
the calibration: short and skippable for obvious functions, longer only
when there's a real gotcha (e.g. the blur-up comment in `project.html`
explaining why it can't use Sanity's image resize pipeline).

**HTML building**: when generating markup from data (`Renderprojectclient.js`),
build it with template literals and always pass user/CMS content through
`escapeHtml()` first — never interpolate CMS fields into a template literal
unescaped.

## Data flow

Content lives in Sanity, not in this repo, with one exception:
`projects.json` is a static, committed snapshot generated by running
`node fetchProjects.js`. Pages fetch `./projects.json` at runtime — there is
no live API call in the browser. **Re-run `fetchProjects.js` and commit the
updated `projects.json` after editing project content in Sanity** for
changes to show up on the live site.

Similarly, because GitHub Pages can't list a directory, `project_render/index.json`
is a manifest of folder names generated by `node generate-project-index.js`.
**Re-run it any time a project folder is added or removed** under
`project_render/`.

## Adding a new page

Copy the `<head>`/`<body>` skeleton from an existing simple page (e.g.
`misc.html`), give it its own `<page>.css`, keep the standard script order,
and add a nav link inside `headerHTML` in `loadheader.js` if it should
appear in the header menu.

`niubi.html` is legacy/orphaned (inline styles, different font, `onclick`
handlers) and not linked from the header — don't use it as a style
reference for new work.
