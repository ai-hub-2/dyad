# Dyad Website (Cloudflare Pages)

Production website for dyad.sh, mobile-first and fully real (no mock data).

## Develop

- `npm i`
- `npm run dev`

## Build

- `npm run build`
- Output at `dist/`

## Deploy to Cloudflare Pages

- Create a Pages project (name: `dyad-website`) connected to your repo
- Build command: `npm run build`
- Output directory: `website/dist`
- Ensure the artifact contains `/_headers` and `/_redirects` from `website/public`.

### Required secrets for GitHub Action

- `CF_API_TOKEN` (Pages Write)
- `CF_ACCOUNT_ID`

## Notes

- Download buttons call GitHub Releases API to fetch latest real assets for macOS/Windows/Linux.
- The layout is dense on mobile while maintaining 40px tap targets.