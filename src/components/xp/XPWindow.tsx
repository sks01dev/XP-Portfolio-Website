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
  win,
  active,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  onMove,
  children,
}: Props) {
  const dragOrigin = useRef<{ mx: number; my: number; wx: number; wy: number } | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    if (!dragOrigin.current) return;
    const onMM = (e: MouseEvent) => {
      if (!dragOrigin.current) return;
      const dx = e.clientX - dragOrigin.current.mx;
      const dy = e.clientY - dragOrigin.current.my;
      onMove(dragOrigin.current.wx + dx, Math.max(0, dragOrigin.current.wy + dy));
    };
    const onMU = () => (dragOrigin.current = null);
    window.addEventListener("mousemove", onMM);
    window.addEventListener("mouseup", onMU);
    return () => {
      window.removeEventListener("mousemove", onMM);
      window.removeEventListener("mouseup", onMU);
    };
  });

  if (win.minimized) return null;

  const fullscreen = win.maximized || isMobile;
  const style: React.CSSProperties = fullscreen
    ? { left: 0, top: 0, width: "100vw", height: "calc(100vh - 30px)", position: "fixed", zIndex: win.z }
    : {
        left: win.x,
        top: win.y,
        width: win.w,
        height: win.h,
        position: "fixed",
        zIndex: win.z,
      };

  return (
    <div className="xp-window" style={style} onMouseDown={onFocus}>
      <div
        className={`xp-titlebar ${active ? "" : "inactive"}`}
        onMouseDown={(e) => {
          if (fullscreen) return;
          dragOrigin.current = { mx: e.clientX, my: e.clientY, wx: win.x, wy: win.y };
        }}
        onDoubleClick={onMaximize}
      >
        <span>{win.icon}</span>
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {win.title}
        </span>
        <div className="xp-titlebar-buttons">
          <button className="xp-tb-btn" onClick={onMinimize} aria-label="Minimize">_</button>
          <button className="xp-tb-btn" onClick={onMaximize} aria-label="Maximize">▢</button>
          <button className="xp-tb-btn close" onClick={onClose} aria-label="Close">✕</button>
        </div>
      </div>
      <div className="xp-window-body">{children}</div>
    </div>
  );
}
