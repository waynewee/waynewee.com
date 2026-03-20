# waynewee.com

## GitHub Pages deployment

This repo now includes a GitHub Actions workflow that builds the Vite app and deploys the `dist` output to GitHub Pages on every push to `main`.

### Included setup

- GitHub Actions workflow: `.github/workflows/deploy.yml`
- Vite `base` set to `./` so built assets resolve correctly on GitHub Pages without hardcoding a repository path

### One-time GitHub setup

1. Push this repository to GitHub.
2. Open the repository settings.
3. Go to Pages.
4. Set Source to GitHub Actions.
5. Push or rerun the `Deploy to GitHub Pages` workflow.

### Local commands

```bash
npm install
npm run build
npm run preview
```

### Notes

- The app now uses clean browser URLs like `/about` instead of `/#/about`.
- GitHub Pages does not natively rewrite SPA routes, so `public/404.html` redirects unknown paths back into the app and preserves the original route.
- This setup works for both the default GitHub Pages domain and a custom domain pointed at Pages.
