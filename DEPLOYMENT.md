# Deploying to Vercel

Your portfolio is now optimized for Vercel deployment. Follow these steps to deploy:

## 1. Push to GitHub
Ensure all your changes (including `vercel.json` and `vite.config.js`) are pushed to your GitHub repository:
```bash
git add .
git commit -m "chore: prepare for vercel deployment"
git push origin main
```

## 2. Connect to Vercel
1. Go to [vercel.com](https://vercel.com) and sign in.
2. Click **Add New** > **Project**.
3. Import your `abishekhariharan076/Portfolio` repository.
4. Vercel should automatically detect **Vite** as the framework.
5. Click **Deploy**.

## Configuration Details
- **Rewrites**: Handled via `vercel.json` for SPA routing (all paths served by `index.html`).
- **Clean URLs**: Enabled to remove `.html` extensions.
- **Caching**: Assets are cached for 1 year; `resume.pdf` is cached for 1 hour.
- **Build Output**: Set to `dist` in `vite.config.js`.
