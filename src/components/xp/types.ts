export type WindowId =
  | "about"
  | "resume"
  | "projects"
  | "experience"
  | "skills"
  | "contact"
  | "hobbies"
  | "media"
  | "pictures"
  | "notepad"
  | "recycle";

export type WinState = {
  id: WindowId;
  title: string;
  icon: string;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
  minimized: boolean;
  maximized: boolean;
};
