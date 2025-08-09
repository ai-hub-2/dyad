# dyad

Dyad is a local, open-source AI app builder. It's fast, private and fully under your control — like Lovable, v0, or Bolt, but running right on your machine.

![Image](https://github.com/user-attachments/assets/f6c83dfc-6ffd-4d32-93dd-4b9c46d17790)

More info at: [http://dyad.sh/](http://dyad.sh/)

## 🚀 Features

- ⚡️ **Local**: Fast, private and no lock-in.
- 🛠 **Bring your own keys**: Use your own AI API keys with no vendor lock-in.
- 🖥️ **Cross-platform**: Easy to run on Mac or Windows.

## 📦 Download

No sign-up required. Just download and go.

### [👉 Download for your platform](https://www.dyad.sh/#download)

**dyad** is open source (Apache 2.0-licensed).

If you're interested in contributing to dyad, please read our [contributing](./CONTRIBUTING.md) doc.

## 🌐 Website on Cloudflare Pages (real, production-ready)

A production website is included under `website/` and can be deployed to Cloudflare Pages without placeholders.

- Local dev:
  - `cd website && npm i && npm run dev`
- Build:
  - `npm run build` (outputs to `website/dist`)
- Cloudflare Pages:
  - Project name: `dyad-website`
  - Output directory: `website/dist`
  - Add `_headers` and `_redirects` from `website/public` via Pages settings or keep them in the artifact root.
- GitHub Actions:
  - Workflow at `.github/workflows/pages.yml` builds and deploys on pushes to `main`.
  - Requires secrets: `CF_API_TOKEN`, `CF_ACCOUNT_ID`.

Download buttons fetch the latest real release assets from GitHub and render platform-specific links automatically.
