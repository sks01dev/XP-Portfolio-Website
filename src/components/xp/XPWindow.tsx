import { useEffect, useRef, useState } from "react";
import type { WinState } from "./types";

type Props = {
  win: WinState;
  active: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onFocus: () => void;
  onMove: (x: number, y: number) => void;
  children: React.ReactNode;
};

export function XPWindow({
  win, active, onClose, onMinimize, onMaximize, onFocus, onMove, children,
}: Props) {
  const [isMobile, setIsMobile] = useState(false);
  const drag = useRef<{ mx: number; my: number; wx: number; wy: number } | null>(null);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    const onMM = (e: PointerEvent) => {
      if (!drag.current) return;
      const dx = e.clientX - drag.current.mx;
      const dy = e.clientY - drag.current.my;
      onMove(drag.current.wx + dx, Math.max(0, drag.current.wy + dy));
    };
    const onMU = () => (drag.current = null);
    window.addEventListener("pointermove", onMM);
    window.addEventListener("pointerup", onMU);
    return () => {
      window.removeEventListener("pointermove", onMM);
      window.removeEventListener("pointerup", onMU);
    };
  }, [onMove]);

  if (win.minimized) return null;

  const fullscreen = win.maximized || isMobile;
  const style: React.CSSProperties = fullscreen
    ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 30px)", position: "fixed", zIndex: win.z }
    : { left: win.x, top: win.y, width: win.w, height: win.h, position: "fixed", zIndex: win.z };

  return (
    <div className={`xp-window ${active ? "active" : ""}`} style={style} onPointerDown={onFocus}>
      <div
        className={`xp-titlebar ${active ? "" : "inactive"}`}
        onPointerDown={(e) => {
          if (fullscreen) return;
          drag.current = { mx: e.clientX, my: e.clientY, wx: win.x, wy: win.y };
        }}
        onDoubleClick={onMaximize}
      >
        <img className="xp-titlebar-icon" src={win.icon} alt="" draggable={false} />
        <span className="xp-titlebar-text">{win.title}</span>
        <div className="xp-titlebar-buttons">
          <button className="xp-tb-btn min" onClick={onMinimize} aria-label="Minimize">
            <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="7" width="8" height="2" fill="#fff"/></svg>
          </button>
          <button className="xp-tb-btn max" onClick={onMaximize} aria-label="Maximize">
            <svg width="10" height="10" viewBox="0 0 10 10"><rect x="1" y="1" width="8" height="8" fill="none" stroke="#fff" strokeWidth="1.5"/><rect x="1" y="1" width="8" height="2" fill="#fff"/></svg>
          </button>
          <button className="xp-tb-btn close" onClick={onClose} aria-label="Close">
            <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 1 L9 9 M9 1 L1 9" stroke="#fff" strokeWidth="1.5" strokeLinecap="round"/></svg>
          </button>
        </div>
      </div>
      <div className="xp-window-body">{children}</div>
    </div>
  );
}
