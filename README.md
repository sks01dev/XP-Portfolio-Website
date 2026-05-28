# Shivam Kumar Swarnkar — Portfolio

A Windows XP–themed personal portfolio built with **TanStack Start**, **React 19**,
**Tailwind CSS v4**, and deployed on **Cloudflare Workers**.

Live: <https://sksdev.lovable.app>

---

## Quick edit guide

All content lives in two files. Edit, commit, push — Cloudflare auto-deploys.

| Change                        | File                              |
| ----------------------------- | --------------------------------- |
| Add a project                 | `src/data/resume.ts` → `projects` |
| Update experience / skills    | `src/data/resume.ts`              |
| Replace resume PDF            | `public/resume.pdf`               |
| Replace profile photo         | `src/assets/shivam.jpg`           |
| Add a desktop icon            | `src/data/desktopIcons.ts`        |

Full architecture and recipes: [`docs/ARCHITECTURE.md`](./docs/ARCHITECTURE.md).

---

## Local development (optional)

```bash
bun install
bun run dev      # http://localhost:5173
bun run build    # production build for Cloudflare Workers
```

---

## Deployment (Cloudflare Workers, free)

This repo is preconfigured for Cloudflare Workers via `wrangler.jsonc`.
Once connected, every `git push` to `main` redeploys automatically.

### One-time setup

1. **Push to GitHub** — create a new repo (public or private) and push this codebase.
2. **Sign in to Cloudflare** — <https://dash.cloudflare.com/sign-up> (free).
3. **Workers & Pages → Create → Workers → Import a repository**.
4. **Authorize GitHub** and select this repo.
5. **Build settings** (auto-detected; verify):
   - Build command: `bun run build`
   - Deploy command: `bunx wrangler deploy`
   - Root directory: `/`
6. Click **Save and Deploy**. First build takes ~2 minutes. You get a free
   `<project>.workers.dev` URL.

### Continuous deployment (already on)

Every push to `main` triggers a fresh Cloudflare build. Add a project to
`src/data/resume.ts`, commit, push — live in ~90 seconds. No manual deploy step.

```
edit src/data/resume.ts → git commit → git push → Cloudflare builds → live
```

### Custom domain (optional)

In Cloudflare dashboard → your Worker → **Settings → Domains & Routes → Add**.
Point a domain you own; Cloudflare handles TLS automatically.

---

## License

Personal portfolio. Code MIT, content © Shivam Kumar Swarnkar.
