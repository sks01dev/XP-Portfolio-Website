import type { WindowId } from "@/components/xp/types";
import type { ComponentType } from "react";
import {
  AcrobatGlyph,
  GithubGlyph,
  LinkedinGlyph,
  MediumGlyph,
} from "@/components/xp/glyphs";

/**
 * Authentic XP icon registry. PNGs under /public/xp/icons (from React95 icon set);
 * brand logos (GitHub, LinkedIn, etc.) are inline SVG components from glyphs.tsx.
 *
 * HOW TO EDIT
 * -----------
 * • Change which icon a desktop shortcut uses: edit DESKTOP_ICONS below.
 * • Add a new desktop shortcut: push an entry into DESKTOP_ICONS with a unique
 *   `id`, a `label`, an `icon` (PNG path) OR `glyph` (SVG component), and
 *   either `target` (WindowId to open) or `href` (external link).
 * • Add a new window: see docs/ARCHITECTURE.md "Adding a window".
 */

export const ICONS = {
  myComputer: "/xp/icons/Computer_32x32_4.png",
  recycleEmpty: "/xp/icons/RecycleEmpty_32x32_4.png",
  recycleFull: "/xp/icons/RecycleFull_32x32_4.png",
  folder: "/xp/icons/Folder_32x32_4.png",
  folderOpen: "/xp/icons/FolderOpen_32x32_4.png",
  folderShared: "/xp/icons/FolderShared_32x32_4.png",
  folderSettings: "/xp/icons/FolderSettings_32x32_4.png",
  notepad: "/xp/icons/Notepad_32x32_4.png",
  mediaPlayer: "/xp/icons/Mplayer113_32x32_4.png",
  pictures: "/xp/icons/Camera_32x32_4.png",
  paint: "/xp/icons/Mspaint_32x32_4.png",
  outlook: "/xp/icons/Mailnews14_32x32_4.png",
  ie: "/xp/icons/Jgdwmie101_32x32_4.png",
  globe: "/xp/icons/Globe_32x32_4.png",
  user: "/xp/icons/User_32x32_4.png",
  fileText: "/xp/icons/FileText_32x32_4.png",
  filePen: "/xp/icons/FilePen_32x32_4.png",
  key: "/xp/icons/Key_32x32_4.png",
  powerOff: "/xp/icons/PowerOff_32x32_4.png",
  helpBook: "/xp/icons/HelpBook_32x32_4.png",
  chart: "/xp/icons/WindowGraph_32x32_4.png",
  cmd: "/xp/icons/MsDos_32x32.png",
  cdMusic: "/xp/icons/CdMusic_32x32_4.png",
  network: "/xp/icons/Network_32x32_4.png",
};

export type DesktopIcon = {
  id: string;
  label: string;
  /** PNG file path. Ignored if `glyph` is set. */
  icon?: string;
  /** Inline SVG component (used for brand logos). Takes precedence over `icon`. */
  glyph?: ComponentType<{ size?: number }>;
  /** WindowId to open on double-click. */
  target?: WindowId;
  /** External URL — opens in new tab. */
  href?: string;
  /** Initial grid slot (column, row), 0-indexed from top-left. */
  col: number;
  row: number;
};

export const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "my-computer", label: "My Computer", icon: ICONS.myComputer, target: "about", col: 0, row: 0 },
  { id: "my-resume", label: "My Resume", glyph: AcrobatGlyph, target: "resume", col: 0, row: 1 },
  { id: "my-projects", label: "My Projects", icon: ICONS.folderShared, target: "projects", col: 0, row: 2 },
  { id: "experience", label: "Experience", icon: ICONS.chart, target: "experience", col: 0, row: 3 },
  { id: "skills", label: "Skills", icon: ICONS.key, target: "skills", col: 0, row: 4 },
  { id: "my-hobbies", label: "My Hobbies", icon: ICONS.folder, target: "hobbies", col: 0, row: 5 },
  { id: "contact", label: "Contact", icon: ICONS.outlook, target: "contact", col: 0, row: 6 },
  { id: "my-work", label: "My Work", icon: ICONS.cmd, target: "projects", col: 1, row: 0 },
  { id: "github", label: "My GitHub", glyph: GithubGlyph, href: "https://github.com/sks01dev", col: 1, row: 1 },
  { id: "linkedin", label: "My LinkedIn", glyph: LinkedinGlyph, href: "https://www.linkedin.com/in/shivam-kumar-swarnkar-363965326", col: 1, row: 2 },
  { id: "medium", label: "My Blog", glyph: MediumGlyph, href: "https://medium.com/@sswarnkar0001", col: 1, row: 3 },
  { id: "recycle", label: "Recycle Bin", icon: ICONS.recycleEmpty, target: "recycle", col: 0, row: 7 },
];

/** Icons used by windows (title bar / start menu / taskbar). */
export const WINDOW_ICONS: Record<WindowId, string> = {
  about: ICONS.myComputer,
  resume: ICONS.fileText,
  projects: ICONS.folderShared,
  experience: ICONS.chart,
  skills: ICONS.key,
  contact: ICONS.outlook,
  hobbies: ICONS.folder,
  media: ICONS.mediaPlayer,
  pictures: ICONS.pictures,
  notepad: ICONS.notepad,
  recycle: ICONS.recycleEmpty,
};
