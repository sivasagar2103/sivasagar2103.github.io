# Siva Sagar — Portfolio

Static HTML, CSS and JavaScript, with Markdown content. No backend or API keys required.

## 1. Run locally

Install Node.js 22+ and Python 3, then run from this folder:

```bash
npm ci
npm run preview
```

Open http://localhost:8000. After edits, stop with `Ctrl+C`, run `npm run preview` again, and refresh. Preview serves the generated `dist/` folder; edit source files, not `dist/`.

## 2. Update content

1. Open the relevant file below.
2. Edit an existing file. To add a challenge, project or article, copy its folder and update the new `README.md`. For experience and skills, copy an object in the data array.
3. Run `npm run preview` and check the result.

| Content | Edit here |
| --- | --- |
| Intro, about, education, contact | `index.html` |
| Experience | `src/sections/experience/data.js` |
| Projects | `content/projects/<project-name>/README.md` |
| Challenges and timelines | `content/challenges/<challenge-name>/README.md` |
| Writing | `content/blog/<article-name>/README.md` |
| Skills | `src/sections/toolkit/data.js` |
| Resume | Replace `assets/resume.pdf` (keep the filename) |
| Colors | `src/styles.css` |
| Global spacing, headings and alignment | `src/layout.css` (tokens at the top) |
| About animation | Copy in `index.html`; timing in `src/layout.css`; behavior in `src/principles.js` |
| Favicon | `assets/favicon.svg` |

**Challenges currently contains an illustrative example. Replace its scenario, timeline, actions and result with your real story.**

The header’s Resume link opens `resume.html`, with an embedded PDF and a browser fallback. Portfolio search uses the section data and Markdown stories. Edit introductory search summaries in `src/search.js` when changing static profile copy.

## 3. Add a challenge, project or article

1. Create a folder inside `content/challenges/`, `content/projects/` or `content/blog/`.
2. Add a `README.md` inside it (for example, `content/challenges/my-story/README.md` becomes `challenges/my-story/`).
3. Use this format:

```markdown
---
title: "My article"
date: "2026-11-01"
category: "Engineering"
excerpt: "One sentence about the article."
---

Write your article here using Markdown.
```

4. Rebuild with `npm run preview`. Story pages, cards, search and sitemap update automatically. Use `draft: true` to hide a draft.

Writing requires `date`; projects and challenges may omit it. They also support `timeline: "2 weeks"`, `status`, and `stack: [Python, MCP]`. Each content folder has a short editing guide. Its top-level README is not published. Do not edit `posts.generated.js` or the section data wrappers; the Markdown files are the content source.

## 4. Publish with GitHub Pages

1. Create a GitHub repository named `siva-sagar-portfolio` under `sivasagar2103`.
2. Push **this folder's contents** to its `main` branch; `package.json` and `.github/` must be at the repository root.
3. In GitHub, open **Settings → Pages → Source → GitHub Actions**.
4. Open **Actions** and wait for **Deploy portfolio** to succeed.
5. Visit https://sivasagar2103.github.io/siva-sagar-portfolio/.
6. For later updates, edit, preview, commit and push to `main`; the workflow redeploys automatically.

For a different repository name or domain, update `siteUrl` in `scripts/build.mjs`, page canonical/social URLs, and `robots.txt`. The build generates `dist/sitemap.xml`. Never commit credentials or private work details.

## 5. Verify before pushing

```bash
npm run build
npm run check
```

Also preview on desktop and mobile: check navigation, search (`Ctrl+K` / `⌘K`), resume PDF, article links and contact links. Browser PDF support varies; the resume page includes an open-PDF link.

`dist/` and `node_modules/` are generated and ignored. Both portrait files are used by the site and are retained.
