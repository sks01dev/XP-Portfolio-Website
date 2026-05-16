# Windows XP Personal Site — Final Build Plan

A single-page, fully static Windows XP desktop for Shivam Kumar Swarnkar. Real Bliss wallpaper, draggable Luna-style windows, taskbar with live clock, Start menu. No backend.

## Assets to copy in
- `user-uploads://windows-xp-3840x2160-17062.jpg` → `src/assets/bliss.jpg` (desktop wallpaper)
- `user-uploads://IMG-20260110-WA0196.jpg` → `src/assets/shivam.jpg` (profile photo, About + Start menu)
- `user-uploads://ML_Engineer_Shivam_Kumar_Swarnkar.pdf` → `public/resume.pdf` (download + open-in-tab)

## Desktop icons (left column)
1. My Computer → About Me
2. My Resume → Resume window (embedded PDF + Download button)
3. My Projects → Projects window
4. My Experience → Experience + Education window
5. My Skills → Skills window
6. My Hobbies (folder) → opens a sub-window with shortcuts to Media Player, My Pictures, Notepad
7. Contact → Contact card (email, phone, LinkedIn, GitHub, LeetCode, Kaggle, Medium)
8. Recycle Bin (cosmetic, shows empty dialog)

## Auto-opens on load
**"Welcome.txt" (Notepad)** with the Shawshank quote + "type anything, nothing is saved" — single fun first impression, no big tutorial modal.

## Windows (all draggable, min/max/close)
- **About Me** — photo, name, role (ML/Data Science undergrad), location (India), bio from resume objective
- **Resume** — `<iframe src="/resume.pdf">` + Download button
- **Projects** — Mobile Price Classification, Clickbait Detection (DeBERTa), Project Navigator Pro (link to lovable project), plus GitHub link
- **Experience** — Deep Thought, WorldQuant DS Lab, McKinsey Forward
- **Education** — MAKAUT B.Tech IT, GPA 8.6, coursework + Certifications (Andrew Ng ML, DL, AI For Everyone)
- **Skills** — grouped exactly as resume table
- **Contact** — email, phone, all links incl. Medium blog
- **Media Player** — XP-style WMP skin, list of 5 songs + 2 special mentions, click → opens Spotify/YouTube in new tab (no actual audio embedding — keeps it light)
- **My Pictures** — thumbnail grid of 4–6 movie/quote posters generated as simple SVG cards (Shawshank quote as one), click to enlarge. *(No user-supplied pics; can be swapped later — clearly marked in data file.)*
- **Notepad** — editable textarea with the Shawshank quote pre-filled

## Taskbar
- Start button (green Luna gradient) → Start menu with profile photo, username "Shivam Kumar Swarnkar", quick links to all windows, "Shut Down" (shows polite dialog)
- Running window buttons in middle
- System tray: volume/network icons (cosmetic) + live clock

## Fun touches (cheap, no overhead)
1. **Live clock** in system tray
2. **Bouncing cursor + small "ding" no-sound dialog** when clicking Shut Down ("It is now safe to turn off your computer" XP-style screen as overlay, with Cancel)

## Tech / files
- Single route `src/routes/index.tsx`
- Components in `src/components/xp/`: `XPDesktop`, `XPIcon`, `XPWindow`, `XPTaskbar`, `XPStartMenu`, `XPShutdown`
- Window content components in `src/components/xp/windows/`: `AboutWindow`, `ResumeWindow`, `ProjectsWindow`, `ExperienceWindow`, `SkillsWindow`, `ContactWindow`, `MediaPlayerWindow`, `PicturesWindow`, `NotepadWindow`, `HobbiesWindow`
- All resume data in `src/data/resume.ts` — populated from your PDF + links. Every field commented for easy edits.
- XP styling in `src/styles.css`: Luna blue title bars, Tahoma font stack, beveled buttons, green Start gradient, taskbar gradient. Pure CSS — no extra packages.
- Drag implemented with plain `mousedown/mousemove/mouseup` (no dnd lib). Window stack via single `useState`.
- Mobile (your viewport is 393px): windows auto-fullscreen, icons reflow to a 2-col grid, taskbar stays. Drag disabled <768px.

## SEO / head
Title: "Shivam Kumar Swarnkar — ML Engineer", description from objective, og:image = profile photo.

## Out of scope (kept lean as agreed)
- No boot/login animation
- No window resize/snap
- No right-click menus
- No file explorer tree
- No real audio playback
- No persistence (refresh = clean desktop)

## How to scale later
- Add a window: create component in `windows/`, add an entry to `windowsRegistry.ts`, add icon in `desktopIcons.ts`. Everything else (drag, taskbar, z-index) works automatically.
- Swap resume content: edit `src/data/resume.ts` only.
- Replace pictures: drop files in `src/assets/pictures/` and update the `pictures` array.
- Add real audio: swap Media Player link-out for `<audio>` element with a `url` field per song.
- Add blog feed: fetch Medium RSS in a server function and render in a new "Blog" window.

Ready to build on approval.