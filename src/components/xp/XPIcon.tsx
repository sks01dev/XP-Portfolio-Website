import { useRef } from "react";
import type { DesktopIcon } from "@/data/desktopIcons";

type Props = {
  icon: DesktopIcon;
  x: number;
  y: number;
  selected: boolean;
  onSelect: () => void;
  onOpen: () => void;
  onMove: (x: number, y: number) => void;
  draggable: boolean;
};

export function XPIcon({ icon, x, y, selected, onSelect, onOpen, onMove, draggable }: Props) {
  const origin = useRef<{ mx: number; my: number; ix: number; iy: number; moved: boolean } | null>(null);

  const onPointerDown = (e: React.PointerEvent) => {
    e.stopPropagation();
    onSelect();
    if (!draggable) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    origin.current = { mx: e.clientX, my: e.clientY, ix: x, iy: y, moved: false };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    if (!origin.current) return;
    const dx = e.clientX - origin.current.mx;
    const dy = e.clientY - origin.current.my;
    if (!origin.current.moved && Math.hypot(dx, dy) < 4) return;
    origin.current.moved = true;
    onMove(Math.max(0, origin.current.ix + dx), Math.max(0, origin.current.iy + dy));
  };
  const onPointerUp = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLDivElement).releasePointerCapture?.(e.pointerId);
    origin.current = null;
  };

  return (
    <div
      className={`xp-icon ${selected ? "selected" : ""}`}
      style={{ position: "absolute", left: x, top: y, touchAction: "none" }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(); }}
    >
      <img
        src={icon.icon}
        alt=""
        draggable={false}
        className="xp-icon-img"
      />
      <div className="xp-icon-label">{icon.label}</div>
    </div>
  );
}
