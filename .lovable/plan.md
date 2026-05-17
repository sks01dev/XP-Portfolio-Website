# Authentic Windows XP Desktop — Refinement Plan

Goal: make the existing XP portfolio pixel-faithful to real Windows XP (Luna Blue theme) shown in your screenshot, and make every desktop icon freely draggable. No new content/data changes — purely visual + interaction fidelity.

## 1. Authentic XP assets (replace all emoji/placeholder glyphs)

Source: real XP icon PNGs from the public `win98icons` / `windows-xp-icons` CDN (free, MIT-licensed, used by every "XP in browser" project). Files saved under `public/xp/icons/` so they're served directly:

- `my-computer.png` — My Computer
- `recycle-bin-empty.png` / `recycle-bin-full.png` — Recycle Bin
- `folder-closed.png` / `folder-open.png` — My Hobbies, generic folders
- `notepad.png` — Notepad
- `wmp.png` — Windows Media Player
- `pictures-folder.png` — My Pictures
- `ie.png` — Internet (used for LinkedIn/GitHub/Medium link icons)
- `outlook.png` — E-mail (Contact)
- `acrobat.png` — My Resume (PDF)
- `cmd.png` — My Work / Projects
- `user.png` — fallback Start menu user
- `start-button.png` — the real green Luna Start button (left-rounded, italic "start" with flag)
- `taskbar-bg.png` — repeatable blue gradient strip (or recreate with exact CSS gradient stops from Luna spec)
- `titlebar-left.png` / `titlebar-right.png` — exact title bar caps (optional; CSS gradient already close)
- `tb-min.png` / `tb-max.png` / `tb-restore.png` / `tb-close.png` — title bar buttons

Fetched once via `curl` in build prep, committed to repo. All icons referenced as `<img src="/xp/icons/...png">` so no bundler import churn.

## 2. Start button + taskbar (pixel-accurate)

- Replace CSS-only Start button with a real `start-button.png` background (hover state = brightness filter; active state = `start-button-pressed.png`).
- Taskbar: keep current blue gradient but match exact Luna stops (`#245edb → #3f8cf3 → #245edb`), add the 2px highlight line on top, and the embossed grab-handle dots on the left of running-task area.
- System tray: white-on-blue clock with the inner sunken border, plus authentic volume + network tray icons (`tray-volume.png`, `tray-network.png`).

## 3. Window chrome (Luna Blue, pixel-faithful)

- Title bar: switch from pure CSS to a 3-slice background (left cap + repeatable middle + right cap with buttons) so corners are perfectly rounded like XP. Active vs inactive states use different image sets.
- Title bar buttons: real `_` `▢` `✕` PNGs (XP's exact red-gradient close).
- Window body: `#ECE9D8` (already correct), 3D beveled border using `border-top: 1px #fff; border-left: 1px #fff; border-right: 1px #404040; border-bottom: 1px #404040` to match XP's outset look.
- Menu bar: standard XP "File Edit View Favorites Tools Help" with underlined access keys, on every window that historically had one (Notepad, My Pictures, Media Player).

## 4. Draggable desktop icons (the main interaction fix)

Right now icons sit in a fixed left column. New behavior:

- Each icon has its own `{ x, y }` in `useState`, initial values laid out in a grid (top-left, 80px spacing) just like XP.
- Pointer events (`pointerdown` / `pointermove` / `pointerup`) on the icon itself — same drag pattern as windows, no library.
- Drag threshold of 4px so a tap still counts as a single-click select / double-click open.
- Single click = select (blue translucent box around icon). Double click (or Enter) = open the window.
- Drag snaps to a 4px grid on release (XP-style auto-arrange OFF by default).
- Positions persisted to `localStorage` under `xp:icon-positions` so refresh keeps your layout (small, no backend).
- Disabled on viewports < 640px (mobile keeps the current 2-col fixed grid; windows still auto-fullscreen).

## 5. Other authenticity polish (cheap)

- Selection rectangle: click-drag on empty desktop draws the classic dashed translucent-blue marquee and selects icons under it.
- Right-click on desktop → XP context menu (Arrange Icons By, Refresh, Paste, Properties — Properties opens a fake Display Properties dialog as a fun touch). Right-click on icon → Open / Rename / Delete (Delete just plays the recycle animation, doesn't really remove).
- Bliss wallpaper: ensure `object-fit: cover` and `image-rendering: auto` so it looks crisp.
- Tahoma font: load the real `Tahoma` web font (or `Trebuchet MS` fallback already in place) — XP uses Tahoma 11px everywhere; bump base font to exactly that.
- Cursor: use the standard XP arrow cursor PNG via `cursor: url(/xp/cursors/arrow.cur), auto` for the full-desktop feel.

## 6. Files touched

- `public/xp/icons/*` — NEW (all PNG assets, fetched once)
- `public/xp/cursors/*` — NEW (optional)
- `src/components/xp/XPDesktop.tsx` — icon positions state, drag handlers, marquee select, context menu, localStorage persistence
- `src/components/xp/XPIcon.tsx` — NEW, extracted draggable icon component using `<img>` glyph
- `src/components/xp/XPTaskbar.tsx` / `XPStartMenu.tsx` — swap CSS gradients for real PNG backgrounds where useful
- `src/components/xp/XPWindow.tsx` — title bar 3-slice + real button PNGs, beveled border
- `src/styles.css` — Luna-exact gradient stops, Tahoma load, cursor, marquee styles
- `src/data/desktopIcons.ts` — NEW, central icon registry (label, glyph path, target window, default grid position)

## 7. Out of scope (still)

- Real window resize/snap, real audio in Media Player, real file system, boot/login screen, sound effects. Can be added later — registry-based icon list makes it trivial to wire new windows.

## 8. What I need from you before building

Nothing new — all icons are open-source XP recreations I can pull directly. Approve this plan and I'll build it end-to-end in one go and publish-ready.
