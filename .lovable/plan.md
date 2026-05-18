# Windows XP Portfolio — Architecture & Update Guide

This is a single-page Windows XP–themed personal portfolio. All resume content
lives in **one data file**; all desktop icons live in **one registry**; the rest
is presentation. Updating the site = editing 1–2 files.

---

## 1. Architecture diagram

```
                ┌────────────────────────────────────────────┐
                │              src/routes/index.tsx          │
                │  TanStack route "/" → renders <XPDesktop/> │
                └─────────────────────┬──────────────────────┘
                                      │
                          ┌───────────▼───────────┐
                          │  XPDesktop.tsx        │
                          │  ─ window stack       │
                          │  ─ icon positions     │
                          │  ─ start menu         │
                          │  ─ taskbar + tray     │
                          │  ─ localStorage       │
                          └─────┬─────┬─────┬─────┘
                                │     │     │
            ┌───────────────────┘     │     └────────────────────┐
            ▼                         ▼                          ▼
   ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
   │  XPIcon.tsx     │      │  XPWindow.tsx   │      │ windows/        │
   │  draggable      │      │  Luna title bar │      │ AllWindows.tsx  │
   │  desktop icon   │      │  + body         │      │ (About, Resume, │
   └────────┬────────┘      └────────┬────────┘      │  Projects, ...) │
            │                        │               └────────┬────────┘
            ▼                        ▼                        ▼
   ┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
   │ data/           │      │ glyphs.tsx      │      │ data/resume.ts  │
   │ desktopIcons.ts │      │ SVG logos       │      │ ALL content     │
   │ (registry)      │      │ (GitHub, etc.)  │      │ (single source) │
   └─────────────────┘      └─────────────────┘      └─────────────────┘

   Assets:  public/xp/icons/*.png   (XP-style PNGs, React95 set)
            public/resume.pdf       (your downloadable resume)
            src/assets/bliss.jpg    (XP wallpaper)
            src/assets/shivam.jpg   (profile photo)

   Styles:  src/styles.css   (.xp-* Luna theme classes)
```

---

## 2. Where to make changes (the only files you'll ever touch)

| You want to update…              | Edit this file                                    |
| -------------------------------- | ------------------------------------------------- |
| Resume text / projects / skills  | `src/data/resume.ts`                              |
| Songs in Media Player            | `src/data/resume.ts` → `songs[]`                  |
| Movie quotes in My Pictures      | `src/data/resume.ts` → `pictures[]`               |
| Welcome notepad text             | `src/data/resume.ts` → `notepadOpeningText`       |
| Contact links (email, socials)   | `src/data/resume.ts` → `contact`                  |
| Profile picture                  | replace `src/assets/shivam.jpg` (keep filename)   |
| Resume PDF                       | replace `public/resume.pdf` (keep filename)       |
| Which icons sit on the desktop   | `src/data/desktopIcons.ts` → `DESKTOP_ICONS`      |
| Add a brand SVG icon (X, Discord…) | add component to `src/components/xp/glyphs.tsx` |
| Theme colors / window chrome     | `src/styles.css` (search for `.xp-`)              |

---

## 3. Common recipes

### Add a new project
Open `src/data/resume.ts`, append to `projects`:
```ts
{
  name: "My new project",
  description: "What it does.",
  stack: ["Python", "FastAPI"],
  link: "https://github.com/sks01dev/repo",
},
```
The Projects window picks it up automatically.

### Update the resume PDF
Drop the new file at `public/resume.pdf` (same name). The Resume window iframes it.

### Add a new desktop icon (link or window)
Open `src/data/desktopIcons.ts` and add an entry to `DESKTOP_ICONS`:
```ts
// external link
{ id: "twitter", label: "My Twitter", glyph: TwitterGlyph,
  href: "https://twitter.com/you", col: 1, row: 4 },

// opens an internal window
{ id: "blog", label: "Blog", icon: ICONS.filePen, target: "notepad", col: 0, row: 8 },
```
- `col`/`row` are the starting grid slot. Users can drag the icon anywhere;
  positions are saved in `localStorage` under `xp:icon-positions:v1`.
- `icon` = path to a PNG under `public/xp/icons/`.
- `glyph` = inline SVG React component from `src/components/xp/glyphs.tsx`.

### Add a brand-logo icon (e.g. Discord, Stack Overflow)
1. In `src/components/xp/glyphs.tsx` add a new component:
   ```tsx
   export function DiscordGlyph({ size = 36 }) {
     return <svg width={size} height={size} viewBox="0 0 32 32">…</svg>;
   }
   ```
2. Import it in `src/data/desktopIcons.ts` and use `glyph: DiscordGlyph`.

### Add a brand-new window (e.g. "Achievements")
1. Add the new id to `WindowId` in `src/components/xp/types.ts`.
2. Add a render component in `src/components/xp/windows/AllWindows.tsx`.
3. In `src/components/xp/XPDesktop.tsx`:
   - add an entry to `DEFS` (title, default width/height),
   - add a case in `renderContent`,
4. In `src/data/desktopIcons.ts`:
   - add the window's icon to `WINDOW_ICONS`,
   - (optional) add a `DESKTOP_ICONS` entry so it appears on the desktop.

### Change the wallpaper
Replace `src/assets/bliss.jpg` (keep filename) or update the import in
`src/components/xp/XPDesktop.tsx`.

---

## 4. Component responsibilities

- **`XPDesktop.tsx`** — the "OS". Owns window stack, icon positions, start menu,
  taskbar, tray, clock. Persists icon positions to `localStorage`.
- **`XPIcon.tsx`** — one desktop icon. Handles click-select, double-click-open,
  and pointer-based drag with a 4px move threshold (so a tap still counts).
- **`XPWindow.tsx`** — Luna-blue window chrome (title bar + min/max/close
  buttons + body). Draggable by the title bar, maximizes to fullscreen, auto
  fullscreen on viewports < 768px.
- **`windows/AllWindows.tsx`** — the body for every window (About, Resume,
  Projects, Experience, Skills, Contact, Hobbies, Media Player, Pictures,
  Notepad, Recycle Bin). One component per window, all reading from `resume.ts`.
- **`glyphs.tsx`** — inline SVG logos for things Windows didn't ship with
  (GitHub, LinkedIn, PDF badge, Medium, tray volume, tray shield).
- **`data/desktopIcons.ts`** — registry of every icon path and every shortcut
  on the desktop.
- **`data/resume.ts`** — single source of truth for content.

---

## 5. Persisted state (small, no backend)

- `localStorage["xp:icon-positions:v1"]` — `{ [iconId]: { x, y } }`
  Users dragging icons writes here. Delete the key to reset to the default grid.

No database, no auth, no server functions. Pure static site.

---

## 6. Out of scope (deliberately)

- Real window resize handles, real audio in Media Player, real file system,
  XP boot/login screen, sound effects.
- These can be added later — the registry pattern (`DESKTOP_ICONS` + `WINDOW_ICONS`)
  means wiring a new window is always the same three small edits.
