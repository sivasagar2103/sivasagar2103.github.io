# Siva Sagar — Portfolio

A responsive, modular personal portfolio built with semantic HTML, CSS and vanilla JavaScript (ES modules). No framework, package install or build step is required.

## Run locally

```bash
python3 -m http.server 8000
```

Open <http://localhost:8000>.

## Structure

```text
├── index.html
├── assets/
│   ├── siva-sagar-original.jpg  # Original uploaded portrait, preserved at source dimensions
│   ├── siva-sagar-face.jpg      # Face-focused crop from the same photo
│   ├── resume.pdf
│   └── favicon.svg
├── src/
│   ├── data.js                 # Experience, skills, projects, blogs and resources
│   ├── main.js                 # Rendering, navigation and reveal animations
│   └── styles.css              # Theme, responsive layout and motion
└── .github/workflows/pages.yml # GitHub Pages deployment
```

## Add content later

Open `src/data.js` and append objects to the relevant array:

- `projects`: title, type, summary, highlights, stack, status and optional public link.
- `blogs`: title, date, category, excerpt, read time and optional article link.
- `resources`: title, kind, description and URL.

The page automatically renders new entries. The initial blog and project are starter examples; replace their text and add real public URLs when ready. Do not list private company source code, confidential architecture or customer information.

## Profile links

- GitHub: https://github.com/sivasagar2103
- LinkedIn: https://www.linkedin.com/in/siva-sagar-47127224b/

## Publish on GitHub Pages

1. Create a **public** repository named `siva-sagar-portfolio` under `sivasagar2103`.
2. Upload/push the contents of this folder to the repository root (not the parent folder).
3. Open **Settings → Pages** and set **Build and deployment → Source** to **GitHub Actions**.
4. The included workflow deploys on every push to `main`. Check the **Actions** tab for the deployment result.
5. Once deployment succeeds, the expected project-site URL is:
   `https://sivasagar2103.github.io/siva-sagar-portfolio/`

GitHub Pages sites are public. Review the repository contents before publishing and keep credentials, private work details and confidential files out of it.

## Recruiter-ready links

After the Pages deployment succeeds, use the verified live URL in:
- LinkedIn → Contact info / Featured section
- Resume header beside GitHub and LinkedIn
- Email signature and recruiter messages

The expected URL above is not live until the repository is created and the first deployment succeeds.
