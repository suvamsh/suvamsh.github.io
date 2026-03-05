# suvamsh.github.io

Personal website built with Next.js, React, and Tailwind CSS.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deployment

This site uses static export (`next build` with `output: "export"`) and deploys via GitHub Actions to GitHub Pages.

- Workflow file: `.github/workflows/deploy.yml`
- Artifact directory: `out/`
- Target URL: `https://suvamsh.github.io`
- Trigger branches: `main` and `master`

In GitHub repository settings, ensure **Pages** is set to **GitHub Actions** as the source.

## Content

- Home/About pages are in `app/`
- Blog posts live in `content/posts/*.md`
- Images and PDFs live in `public/`
