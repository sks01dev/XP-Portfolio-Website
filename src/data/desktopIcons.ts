import type { WindowId } from "@/components/xp/types";

/**
 * Authentic XP icon registry. All PNGs in /public/xp/icons/ from React95 icon set.
 * To add a new icon: add an entry here and (if it opens a window) wire the WindowId.
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
};

export type DesktopIcon = {
  id: string;
  label: string;
  icon: string;
  /** WindowId to open on double-click. If absent, action() is used. */
  target?: WindowId;
  /** Optional custom action (e.g. open external link). */
  href?: string;
  /** Initial grid slot (column, row), 0-indexed from top-left. */
  col: number;
  row: number;
};

export const DESKTOP_ICONS: DesktopIcon[] = [
  { id: "my-computer", label: "My Computer", icon: ICONS.myComputer, target: "about", col: 0, row: 0 },
  { id: "my-resume", label: "My Resume", icon: ICONS.fileText, target: "resume", col: 0, row: 1 },
  { id: "my-projects", label: "My Projects", icon: ICONS.folderShared, target: "projects", col: 0, row: 2 },
  { id: "experience", label: "Experience", icon: ICONS.chart, target: "experience", col: 0, row: 3 },
  { id: "skills", label: "Skills", icon: ICONS.key, target: "skills", col: 0, row: 4 },
  { id: "my-hobbies", label: "My Hobbies", icon: ICONS.folder, target: "hobbies", col: 0, row: 5 },
  { id: "contact", label: "Contact", icon: ICONS.outlook, target: "contact", col: 0, row: 6 },
  { id: "github", label: "My GitHub", icon: ICONS.ie, href: "https://github.com/sks01dev", col: 1, row: 0 },
  { id: "linkedin", label: "My LinkedIn", icon: ICONS.globe, href: "https://www.linkedin.com/in/shivam-kumar-swarnkar-363965326", col: 1, row: 1 },
  { id: "medium", label: "My Blog", icon: ICONS.filePen, href: "https://medium.com/@sswarnkar0001", col: 1, row: 2 },
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
