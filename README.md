# PromoteMe4Artist — React Website

This project is a Vite + React conversion of the supplied PromoteMe4Artist website source.

## Included routes
- `/`
- `/how-it-works`
- `/features`
- `/faq`
- `/contact`

The original visual styles are preserved by carrying over the supplied compiled CSS, images, page copy, layout classes, FAQ details, and contact form behavior.

## Run locally

```bash
npm install
npm run dev
```

Then open the local Vite URL.

## Production build

```bash
npm run build
npm run preview
```

## Deployment note

Because the app uses React Router with clean URLs, configure your hosting provider to serve `index.html` for unknown routes (SPA fallback). Vercel, Netlify and most modern static hosts support this with a small rewrite rule.

The legal/account-deletion URLs present in the original footer were not supplied as page source, so they remain outside the converted five supplied page routes rather than inventing policy content.
