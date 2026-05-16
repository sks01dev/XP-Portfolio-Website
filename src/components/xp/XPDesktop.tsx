import { useEffect, useMemo, useState } from "react";
import bliss from "@/assets/bliss.jpg";
import shivam from "@/assets/shivam.jpg";
import { resume } from "@/data/resume";
import type { WinState, WindowId } from "./types";
import { XPWindow } from "./XPWindow";
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

type Def = { id: WindowId; title: string; icon: string; w: number; h: number };

const DEFS: Record<WindowId, Def> = {
  about: { id: "about", title: "About Me", icon: "👤", w: 520, h: 320 },
  resume: { id: "resume", title: "Resume — Shivam Kumar Swarnkar.pdf", icon: "📄", w: 720, h: 560 },
  projects: { id: "projects", title: "My Projects", icon: "📁", w: 560, h: 480 },
  experience: { id: "experience", title: "Experience & Education", icon: "💼", w: 600, h: 540 },
  skills: { id: "skills", title: "Skills", icon: "🧠", w: 500, h: 460 },
  contact: { id: "contact", title: "Contact", icon: "✉", w: 520, h: 360 },
  hobbies: { id: "hobbies", title: "My Hobbies", icon: "🎮", w: 460, h: 280 },
  media: { id: "media", title: "Windows Media Player", icon: "🎵", w: 480, h: 480 },
  pictures: { id: "pictures", title: "My Pictures", icon: "🖼", w: 540, h: 460 },
  notepad: { id: "notepad", title: "Welcome — Notepad", icon: "📝", w: 480, h: 360 },
  recycle: { id: "recycle", title: "Recycle Bin", icon: "🗑", w: 360, h: 220 },
};

const DESKTOP_ICONS: { id: WindowId; label: string; icon: string }[] = [
  { id: "about", label: "My Computer", icon: "🖥" },
  { id: "resume", label: "My Resume", icon: "📄" },
  { id: "projects", label: "My Projects", icon: "📁" },
  { id: "experience", label: "Experience", icon: "💼" },
  { id: "skills", label: "Skills", icon: "🧠" },
  { id: "hobbies", label: "My Hobbies", icon: "🎮" },
  { id: "contact", label: "Contact", icon: "✉" },
  { id: "recycle", label: "Recycle Bin", icon: "🗑" },
];

export function XPDesktop() {
  const [windows, setWindows] = useState<WinState[]>([]);
  const [zTop, setZTop] = useState(10);
  const [startOpen, setStartOpen] = useState(false);
  const [shutdown, setShutdown] = useState(false);
  const [clock, setClock] = useState("");
  const [selected, setSelected] = useState<WindowId | null>(null);

  useEffect(() => {
    const tick = () => {
      const d = new Date();
      setClock(
        d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }).toLowerCase()
      );
    };
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  // auto-open notepad welcome
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
        return ws.map((w) =>
          w.id === id ? { ...w, minimized: false, z: newZ } : w
        );
      }
      const def = DEFS[id];
      const count = ws.length;
      const baseX = 60 + count * 28;
      const baseY = 40 + count * 28;
      const w: WinState = {
        id,
        title: def.title,
        icon: def.icon,
        x: baseX,
        y: baseY,
        w: def.w,
        h: def.h,
        z: newZ,
        minimized: false,
        maximized: false,
      };
      return [...ws, w];
    });
  };

  const closeWin = (id: WindowId) =>
    setWindows((ws) => ws.filter((w) => w.id !== id));
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
      <div
        style={{
          position: "fixed", inset: 0, background: "#3b6ea5", color: "white",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", fontFamily: "Tahoma, sans-serif", textAlign: "center", padding: 20,
        }}
      >
        <h1 style={{ fontWeight: "normal" }}>It is now safe to turn off your computer.</h1>
        <p style={{ opacity: 0.8, marginTop: 20 }}>(Thanks for visiting!)</p>
        <button className="xp-btn" style={{ marginTop: 24 }} onClick={() => setShutdown(false)}>
          ↻ Turn back on
        </button>
      </div>
    );
  }

  return (
    <div
      className="xp-desktop"
      onClick={() => { setStartOpen(false); setSelected(null); }}
      style={{
        position: "fixed",
        inset: 0,
        backgroundImage: `url(${bliss})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      {/* Desktop icons */}
      <div
        style={{
          position: "absolute",
          top: 12,
          left: 12,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 80px)",
          gap: 6,
          maxWidth: "calc(100vw - 24px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {DESKTOP_ICONS.map((ic) => (
          <div
            key={ic.id}
            className={`xp-icon ${selected === ic.id ? "selected" : ""}`}
            onClick={(e) => { e.stopPropagation(); setSelected(ic.id); }}
            onDoubleClick={() => openWin(ic.id)}
          >
            <div className="xp-icon-glyph">{ic.icon}</div>
            <div className="xp-icon-label">{ic.label}</div>
          </div>
        ))}
      </div>

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
        <div className="xp-start-menu" onClick={(e) => e.stopPropagation()}>
          <div className="xp-sm-header">
            <img src={shivam} alt="" />
            <span>{resume.name}</span>
          </div>
          <div className="xp-sm-body">
            <div className="xp-sm-col">
              <div className="xp-sm-item" onClick={() => openWin("about")}>👤 About Me</div>
              <div className="xp-sm-item" onClick={() => openWin("resume")}>📄 Resume</div>
              <div className="xp-sm-item" onClick={() => openWin("projects")}>📁 Projects</div>
              <div className="xp-sm-item" onClick={() => openWin("experience")}>💼 Experience</div>
              <div className="xp-sm-item" onClick={() => openWin("skills")}>🧠 Skills</div>
              <div className="xp-sm-item" onClick={() => openWin("contact")}>✉ Contact</div>
            </div>
            <div className="xp-sm-col right">
              <div className="xp-sm-item" onClick={() => openWin("hobbies")}>🎮 My Hobbies</div>
              <div className="xp-sm-item" onClick={() => openWin("media")}>🎵 Media Player</div>
              <div className="xp-sm-item" onClick={() => openWin("pictures")}>🖼 My Pictures</div>
              <div className="xp-sm-item" onClick={() => openWin("notepad")}>📝 Notepad</div>
              <a className="xp-sm-item" href={resume.contact.medium} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>✍ Medium Blog</a>
              <a className="xp-sm-item" href={resume.contact.github} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>🐙 GitHub</a>
            </div>
          </div>
          <div className="xp-sm-footer">
            <button onClick={() => setShutdown(true)}>⏻ Shut Down…</button>
          </div>
        </div>
      )}

      {/* Taskbar */}
      <div className="xp-taskbar" onClick={(e) => e.stopPropagation()}>
        <button className="xp-start-btn" onClick={() => setStartOpen((s) => !s)}>
          <span style={{ fontSize: 18 }}>⊞</span> start
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
              <span>{w.icon}</span>
              <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>{w.title}</span>
            </button>
          ))}
        </div>
        <div className="xp-tray">
          <span>🔊</span>
          <span>📶</span>
          <span>{clock}</span>
        </div>
      </div>
    </div>
  );
}
