import { useEffect, useMemo, useState } from "react";
import bliss from "@/assets/bliss.jpg";
import shivam from "@/assets/shivam.jpg";
import { resume } from "@/data/resume";
import { DESKTOP_ICONS, ICONS, WINDOW_ICONS } from "@/data/desktopIcons";
import type { WinState, WindowId } from "./types";
import { XPWindow } from "./XPWindow";
import { XPIcon } from "./XPIcon";
import { VolumeGlyph, ShieldGlyph } from "./glyphs";
import {
  AboutWindow,
  ContactWindow,
  ExperienceWindow,
  HobbiesWindow,
  MediaPlayerWindow,
  NotepadWindow,
  PicturesWindow,
  ProjectsWindow,
  RecycleWindow,
  ResumeWindow,
  SkillsWindow,
} from "./windows/AllWindows";

type Def = { id: WindowId; title: string; w: number; h: number };

const DEFS: Record<WindowId, Def> = {
  about: { id: "about", title: "About Me", w: 520, h: 320 },
  resume: { id: "resume", title: "Resume — Shivam Kumar Swarnkar.pdf", w: 720, h: 560 },
  projects: { id: "projects", title: "My Projects", w: 560, h: 480 },
  experience: { id: "experience", title: "Experience & Education", w: 600, h: 540 },
  skills: { id: "skills", title: "Skills", w: 500, h: 460 },
  contact: { id: "contact", title: "Contact", w: 520, h: 360 },
  hobbies: { id: "hobbies", title: "My Hobbies", w: 460, h: 280 },
  media: { id: "media", title: "Windows Media Player", w: 480, h: 480 },
  pictures: { id: "pictures", title: "My Pictures", w: 540, h: 460 },
  notepad: { id: "notepad", title: "Welcome — Notepad", w: 480, h: 360 },
  recycle: { id: "recycle", title: "Recycle Bin", w: 360, h: 220 },
};

const COL_W = 88;
const ROW_H = 86;
const LS_KEY = "xp:icon-positions:v1";

function initialPositions() {
  const out: Record<string, { x: number; y: number }> = {};
  for (const ic of DESKTOP_ICONS) {
    out[ic.id] = { x: 16 + ic.col * COL_W, y: 14 + ic.row * ROW_H };
  }
  return out;
}

export function XPDesktop() {
  const [windows, setWindows] = useState<WinState[]>([]);
  const [zTop, setZTop] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [clock, setClock] = useState("");
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null);
  const [iconPos, setIconPos] = useState<Record<string, { x: number; y: number }>>(initialPositions);
  const [isMobile, setIsMobile] = useState(false);

  // Mobile detection
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Load saved positions
  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, { x: number; y: number }>;
        setIconPos((prev) => ({ ...prev, ...parsed }));
      }
    } catch {/* ignore */}
  }, []);

  // Persist positions
  useEffect(() => {
    try { localStorage.setItem(LS_KEY, JSON.stringify(iconPos)); } catch {/* ignore */}
  }, [iconPos]);

  // Clock
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes().toString().padStart(2, "0");
      const ap = h >= 12 ? "PM" : "AM";
      const h12 = ((h + 11) % 12) + 1;
      setClock(`${h12}:${m} ${ap}`);
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // Auto-open Welcome Notepad
  useEffect(() => {
    const t = setTimeout(() => openWin("notepad"), 350);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openWin = (id: WindowId) => {
    setStartOpen(false);
    setWindows((ws) => {
      const existing = ws.find((w) => w.id === id);
      const newZ = zTop + 1;
      setZTop(newZ);
      if (existing) {
        return ws.map((w) => (w.id === id ? { ...w, minimized: false, z: newZ } : w));
      }
      const def = DEFS[id];
      const count = ws.length;
      const w: WinState = {
        id,
        title: def.title,
        icon: WINDOW_ICONS[id],
        x: 60 + count * 28,
        y: 40 + count * 28,
        w: def.w,
        h: def.h,
        z: newZ,
        minimized: false,
        maximized: false,
      };
      return [...ws, w];
    });
  };

  const closeWin = (id: WindowId) => setWindows((ws) => ws.filter((w) => w.id !== id));
  const focusWin = (id: WindowId) => {
    const newZ = zTop + 1;
    setZTop(newZ);
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, z: newZ, minimized: false } : w)));
  };
  const toggleMin = (id: WindowId) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, minimized: !w.minimized } : w)));
  const toggleMax = (id: WindowId) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, maximized: !w.maximized } : w)));
  const moveWin = (id: WindowId, x: number, y: number) =>
    setWindows((ws) => ws.map((w) => (w.id === id ? { ...w, x, y } : w)));

  const activeId = useMemo(() => {
    const visible = windows.filter((w) => !w.minimized);
    if (!visible.length) return null;
    return visible.reduce((a, b) => (a.z > b.z ? a : b)).id;
  }, [windows]);

  const renderContent = (id: WindowId) => {
    switch (id) {
      case "about": return <AboutWindow />;
      case "resume": return <ResumeWindow />;
      case "projects": return <ProjectsWindow />;
      case "experience": return <ExperienceWindow />;
      case "skills": return <SkillsWindow />;
      case "contact": return <ContactWindow />;
      case "hobbies": return <HobbiesWindow open={openWin} />;
      case "media": return <MediaPlayerWindow />;
      case "pictures": return <PicturesWindow />;
      case "notepad": return <NotepadWindow />;
      case "recycle": return <RecycleWindow />;
    }
  };

  if (shutdown) {
    return (
      <div className="xp-shutdown">
        <h1>It is now safe to turn off your computer.</h1>
        <p>(Thanks for visiting!)</p>
        <button className="xp-btn" style={{ marginTop: 24 }} onClick={() => setShutdown(false)}>
          ↻ Turn back on
        </button>
      </div>
    );
  }

  return (
    <div
      className="xp-desktop"
      onPointerDown={() => { setStartOpen(false); setSelectedIcon(null); }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url(${bliss})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Desktop icons (draggable) */}
      {DESKTOP_ICONS.map((ic) => {
        const pos = iconPos[ic.id] ?? { x: 16, y: 14 };
        return (
          <XPIcon
            key={ic.id}
            icon={ic}
            x={pos.x}
            y={pos.y}
            selected={selectedIcon === ic.id}
            draggable={!isMobile}
            onSelect={() => setSelectedIcon(ic.id)}
            onMove={(x, y) => setIconPos((p) => ({ ...p, [ic.id]: { x, y } }))}
            onOpen={() => {
              if (ic.href) window.open(ic.href, "_blank", "noopener");
              else if (ic.target) openWin(ic.target);
            }}
          />
        );
      })}

      {/* Windows */}
      {windows.map((w) => (
        <XPWindow
          key={w.id}
          win={w}
          active={activeId === w.id}
          onClose={() => closeWin(w.id)}
          onMinimize={() => toggleMin(w.id)}
          onMaximize={() => toggleMax(w.id)}
          onFocus={() => focusWin(w.id)}
          onMove={(x, y) => moveWin(w.id, x, y)}
        >
          {renderContent(w.id)}
        </XPWindow>
      ))}

      {/* Start menu */}
      {startOpen && (
        <div className="xp-start-menu" onPointerDown={(e) => e.stopPropagation()}>
          <div className="xp-sm-header">
            <img src={shivam} alt="" />
            <span>{resume.name}</span>
          </div>
          <div className="xp-sm-body">
            <div className="xp-sm-col">
              <SMItem icon={ICONS.myComputer} label="My Computer" onClick={() => openWin("about")} bold />
              <SMItem icon={ICONS.fileText} label="My Resume" onClick={() => openWin("resume")} bold />
              <div className="xp-sm-sep" />
              <SMItem icon={ICONS.folderShared} label="My Projects" onClick={() => openWin("projects")} />
              <SMItem icon={ICONS.chart} label="Experience" onClick={() => openWin("experience")} />
              <SMItem icon={ICONS.key} label="Skills" onClick={() => openWin("skills")} />
              <SMItem icon={ICONS.outlook} label="Contact" onClick={() => openWin("contact")} />
            </div>
            <div className="xp-sm-col right">
              <SMItem icon={ICONS.folder} label="My Hobbies" onClick={() => openWin("hobbies")} />
              <SMItem icon={ICONS.mediaPlayer} label="Media Player" onClick={() => openWin("media")} />
              <SMItem icon={ICONS.pictures} label="My Pictures" onClick={() => openWin("pictures")} />
              <SMItem icon={ICONS.notepad} label="Notepad" onClick={() => openWin("notepad")} />
              <div className="xp-sm-sep" />
              <SMItem icon={ICONS.ie} label="GitHub" onClick={() => window.open(resume.contact.github, "_blank")} />
              <SMItem icon={ICONS.globe} label="LinkedIn" onClick={() => window.open(resume.contact.linkedin, "_blank")} />
              <SMItem icon={ICONS.filePen} label="Medium Blog" onClick={() => window.open(resume.contact.medium, "_blank")} />
            </div>
          </div>
          <div className="xp-sm-footer">
            <button onClick={() => setShutdown(true)}>
              <img src={ICONS.powerOff} alt="" /> Turn Off Computer
            </button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="xp-taskbar" onPointerDown={(e) => e.stopPropagation()}>
        <button
          className={`xp-start-btn ${startOpen ? "active" : ""}`}
          onClick={(e) => { e.stopPropagation(); setStartOpen((s) => !s); }}
        >
          <WindowsFlag />
          <span className="xp-start-text">start</span>
        </button>
        <div className="xp-tasks">
          {windows.map((w) => (
            <button
              key={w.id}
              className={`xp-task ${activeId === w.id && !w.minimized ? "active" : ""}`}
              onClick={() => {
                if (activeId === w.id && !w.minimized) toggleMin(w.id);
                else focusWin(w.id);
              }}
            >
              <img src={w.icon} alt="" />
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{w.title}</span>
            </button>
          ))}
        </div>
        <div className="xp-tray">
          <VolumeGlyph size={16} />
          <ShieldGlyph size={16} />
          <span className="xp-tray-clock">{clock}</span>
        </div>
      </div>
    </div>
  );
}

function SMItem({ icon, label, onClick, bold }: { icon: string; label: string; onClick: () => void; bold?: boolean }) {
  return (
    <div className="xp-sm-item" onClick={onClick}>
      <img src={icon} alt="" />
      <span style={{ fontWeight: bold ? 700 : 400 }}>{label}</span>
    </div>
  );
}

function WindowsFlag() {
  return (
    <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden>
      <g>
        <path d="M3 4l7-1.4v8.2H3z" fill="#f8412c" />
        <path d="M11 2.4L19 1v9.8h-8z" fill="#7cc242" />
        <path d="M3 11.2h7v8.2L3 18z" fill="#00a4ef" />
        <path d="M11 11.2h8V21l-8-1.5z" fill="#ffbb1c" />
      </g>
    </svg>
  );
}
