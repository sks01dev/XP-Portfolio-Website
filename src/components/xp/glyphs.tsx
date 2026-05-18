/**
 * Inline SVG glyphs used on the XP desktop where stock Windows icons don't apply
 * (brand logos, custom badges). Rendered at 36x36 in the desktop icon, 16x16 in
 * the start menu / taskbar. All shapes are designed to read at 32-48px.
 */

type IconProps = { size?: number };

export function GithubGlyph({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <circle cx="16" cy="16" r="15" fill="#ffffff" stroke="#1b1f23" strokeWidth="1" />
      <path
        fill="#1b1f23"
        d="M16 4C9.4 4 4 9.4 4 16c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2 1-.3 2-.4 3-.4s2 .1 3 .4c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6C24.6 25.8 28 21.3 28 16c0-6.6-5.4-12-12-12z"
      />
    </svg>
  );
}

export function LinkedinGlyph({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="4" fill="#0a66c2" />
      <path
        fill="#ffffff"
        d="M11.1 25H7V12.5h4.1V25zM9 10.6c-1.3 0-2.3-1-2.3-2.3S7.7 6 9 6s2.3 1 2.3 2.3-1 2.3-2.3 2.3zM25 25h-4.1v-6.4c0-1.5 0-3.5-2.1-3.5s-2.5 1.7-2.5 3.4V25h-4.1V12.5h4v1.7h.1c.6-1 1.9-2.1 4-2.1 4.3 0 5.1 2.8 5.1 6.5V25z"
      />
    </svg>
  );
}

export function AcrobatGlyph({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <path fill="#f1efe4" stroke="#7a7a7a" strokeWidth="0.5"
        d="M6 2h14l6 6v22H6z" />
      <path fill="#cfcdc1" d="M20 2v6h6z" />
      <rect x="3" y="14" width="22" height="11" rx="1.5" fill="#d3232a" />
      <text x="14" y="22.5" textAnchor="middle" fontFamily="Arial Black, sans-serif"
        fontSize="7" fontWeight="900" fill="#ffffff">PDF</text>
    </svg>
  );
}

export function MediumGlyph({ size = 36 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" aria-hidden>
      <rect width="32" height="32" rx="6" fill="#ffffff" stroke="#111" strokeWidth="1" />
      <circle cx="11" cy="16" r="6" fill="#111" />
      <ellipse cx="20" cy="16" rx="2.5" ry="6" fill="#111" />
      <ellipse cx="25" cy="16" rx="1" ry="6" fill="#111" />
    </svg>
  );
}

export function VolumeGlyph({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
      <path fill="#ffffff" d="M3 6h2l3-3v10L5 10H3z" />
      <path stroke="#ffffff" strokeWidth="1" fill="none" strokeLinecap="round"
        d="M10 6c1 1 1 3 0 4 M12 4c2 2 2 6 0 8" />
    </svg>
  );
}

export function ShieldGlyph({ size = 16 }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" aria-hidden>
      <path fill="#f8d878" stroke="#7a5a00" strokeWidth="0.5"
        d="M8 1l6 2v5c0 3.5-2.5 6-6 7-3.5-1-6-3.5-6-7V3z" />
      <path fill="#d33" d="M6 7l1.5 1.5L11 5l1 1-4.5 4.5L5 8z" transform="translate(0,0)" />
    </svg>
  );
}
