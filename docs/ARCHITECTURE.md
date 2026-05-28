# Architecture

Single-page Windows XP–themed portfolio. All content lives in **one data file**;
all desktop icons live in **one registry**. Updating the site = editing 1–2 files.

## Diagram

```
                  ┌──────────────────────────────────────────┐
                  │           src/routes/index.tsx           │
                  │   TanStack route "/" → <XPDesktop />     │
                  └────────────────────┬─────────────────────┘
                                       │
                          ┌────────────▼────────────┐
                          │     XPDesktop.tsx       │
                          │  window stack · icons   │
                          │  start menu · taskbar   │
                          │  localStorage persist   │
                          └─────┬───────┬───────┬───┘
                                │       │       │
              ┌─────────────────┘       │       └─────────────────┐
              ▼                         ▼                         ▼
     ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
     │  XPIcon.tsx     │       │  XPWindow.tsx   │       │ windows/        │
     │  draggable icon │       │  Luna chrome    │       │ AllWindows.tsx  │
     └────────┬────────┘       └────────┬────────┘       └────────┬────────┘
              │                         │                         │
              ▼                         ▼                         ▼
     ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
     │ data/           │       │ glyphs.tsx      │       │ data/resume.ts  │
     │ desktopIcons.ts │       │ inline SVG      │       │ single source   │
     │ (icon registry) │       │ brand logos     │       │ of all content  │
     └─────────────────┘       └─────────────────┘       └─────────────────┘

  Assets:  public/xp/icons/*.png    XP icon PNGs
           public/resume.pdf        downloadable resume
           src/assets/bliss.jpg     desktop wallpaper
           src/assets/shivam.jpg    profile photo

  Styles:  src/styles.css           Luna theme + CRT overlay
```

## Where to make changes

| You want to update…              | Edit this file                                    |
| -------------------------------- | ------------------------------------------------- |
| Resume text / projects / skills  | `src/data/resume.ts`                              |
| Songs in Media Player            | `src/data/resume.ts` → `songs[]`                  |
| Movie quotes in My Pictures      | `src/data/resume.ts` → `pictures[]`               |
| Welcome notepad text             | `src/data/resume.ts` → `notepadOpeningText`       |
| Contact links                    | `src/data/resume.ts` → `contact`                  |
| Profile picture                  | replace `src/assets/shivam.jpg` (keep filename)   |
| Resume PDF                       | replace `public/resume.pdf` (keep filename)       |
| Which icons sit on the desktop   | `src/data/desktopIcons.ts` → `DESKTOP_ICONS`      |
| Add a brand SVG icon             | add component to `src/components/xp/glyphs.tsx`   |
| Theme colors / window chrome     | `src/styles.css` (search `.xp-`)                  |

## Adding a new project

Open `src/data/resume.ts`, append to `projects`:

```ts
{
  name: "My new project",
  description: "What it does.",
  stack: ["Python", "FastAPI"],
  link: "https://github.com/sks01dev/repo",
},
```

Save → commit → push. Cloudflare auto-deploys in ~90s.

## Adding a new desktop icon

Edit `src/data/desktopIcons.ts`:

```ts
// external link
{ id: "twitter", label: "My Twitter", glyph: TwitterGlyph,
  href: "https://twitter.com/you", col: 1, row: 4 },

// opens an internal window
{ id: "blog", label: "Blog", icon: ICONS.filePen, target: "notepad", col: 0, row: 8 },
```

## Adding a brand-new window

1. Add the id to `WindowId` in `src/components/xp/types.ts`.
2. Render component in `src/components/xp/windows/AllWindows.tsx`.
3. In `XPDesktop.tsx`: add to `DEFS` + case in `renderContent`.
4. In `desktopIcons.ts`: add to `WINDOW_ICONS` and (optionally) `DESKTOP_ICONS`.

## Persisted state

`localStorage["xp:icon-positions:v1"]` — `{ [iconId]: { x, y } }`. Delete the
key to reset to the default grid. No backend, no database, no auth — pure static.
