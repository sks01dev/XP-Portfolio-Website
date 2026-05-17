import { resume } from "@/data/resume";
import shivam from "@/assets/shivam.jpg";
import { useState } from "react";
import type { WindowId } from "../types";
import { ICONS } from "@/data/desktopIcons";

export function AboutWindow() {
  return (
    <div style={{ display: "flex", gap: 16 }}>
      <img
        src={shivam}
        alt="Shivam Kumar Swarnkar"
        style={{ width: 140, height: 140, objectFit: "cover", border: "2px solid #7a96df", borderRadius: 4 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <h2 style={{ margin: "0 0 4px", fontSize: 18 }}>{resume.name}</h2>
        <div style={{ color: "#555", marginBottom: 8 }}>{resume.title}</div>
        <div style={{ fontSize: 11, color: "#777", marginBottom: 10 }}>📍 {resume.location}</div>
        <p style={{ margin: 0, lineHeight: 1.5 }}>{resume.bio}</p>
      </div>
    </div>
  );
}

export function ResumeWindow() {
  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", gap: 8 }}>
      <div style={{ display: "flex", gap: 8 }}>
        <a className="xp-btn" href={resume.resumePdf} download>⬇ Download PDF</a>
        <a className="xp-btn" href={resume.resumePdf} target="_blank" rel="noreferrer">↗ Open in new tab</a>
      </div>
      <iframe
        title="Resume"
        src={resume.resumePdf}
        style={{ flex: 1, minHeight: 400, border: "1px solid #aca899", background: "white" }}
      />
    </div>
  );
}

export function ProjectsWindow() {
  return (
    <div>
      {resume.projects.map((p) => (
        <fieldset key={p.name} className="xp-fieldset">
          <legend>{p.name}</legend>
          <p style={{ margin: "4px 0" }}>{p.description}</p>
          <div style={{ fontSize: 11, color: "#555", margin: "4px 0" }}>
            <b>Stack:</b> {p.stack.join(" · ")}
          </div>
          {p.link && (
            <a className="xp-link" href={p.link} target="_blank" rel="noreferrer">
              View →
            </a>
          )}
        </fieldset>
      ))}
    </div>
  );
}

export function ExperienceWindow() {
  return (
    <div>
      {resume.experience.map((e) => (
        <fieldset key={e.role + e.company} className="xp-fieldset">
          <legend>{e.role} — {e.company}</legend>
          <div style={{ fontSize: 11, color: "#666", marginBottom: 4 }}>{e.period}</div>
          <ul style={{ margin: "4px 0 0 18px", padding: 0 }}>
            {e.bullets.map((b, i) => <li key={i} style={{ marginBottom: 2 }}>{b}</li>)}
          </ul>
          {e.companyUrl && (
            <a className="xp-link" href={e.companyUrl} target="_blank" rel="noreferrer">
              Portfolio →
            </a>
          )}
        </fieldset>
      ))}
      <h3 style={{ marginTop: 16, marginBottom: 4 }}>Education</h3>
      {resume.education.map((ed) => (
        <fieldset key={ed.school} className="xp-fieldset">
          <legend>{ed.school}</legend>
          <div><b>{ed.degree}</b> · {ed.period}</div>
          <div style={{ marginTop: 4 }}>{ed.details}</div>
        </fieldset>
      ))}
      <h3 style={{ marginTop: 16, marginBottom: 4 }}>Certifications</h3>
      <ul style={{ margin: "0 0 0 18px" }}>
        {resume.certifications.map((c) => <li key={c}>{c}</li>)}
      </ul>
    </div>
  );
}

export function SkillsWindow() {
  return (
    <div>
      {resume.skills.map((s) => (
        <fieldset key={s.group} className="xp-fieldset">
          <legend>{s.group}</legend>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {s.items.map((i) => (
              <span
                key={i}
                style={{
                  background: "white",
                  border: "1px solid #aca899",
                  padding: "2px 8px",
                  borderRadius: 3,
                  fontSize: 11,
                }}
              >
                {i}
              </span>
            ))}
          </div>
        </fieldset>
      ))}
    </div>
  );
}

export function ContactWindow() {
  const c = resume.contact;
  const rows: [string, string, string][] = [
    ["✉", "Email", `mailto:${c.email}`],
    ["☎", "Phone", `tel:${c.phone}`],
    ["💼", "LinkedIn", c.linkedin],
    ["🐙", "GitHub", c.github],
    ["🧩", "LeetCode", c.leetcode],
    ["📊", "Kaggle", c.kaggle],
    ["✍", "Medium Blog", c.medium],
  ];
  const labels: Record<string, string> = {
    Email: c.email,
    Phone: c.phone,
    LinkedIn: c.linkedin,
    GitHub: c.github,
    LeetCode: c.leetcode,
    Kaggle: c.kaggle,
    "Medium Blog": c.medium,
  };
  return (
    <fieldset className="xp-fieldset">
      <legend>Get in touch</legend>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rows.map(([icon, label, href]) => (
            <tr key={label}>
              <td style={{ padding: 4, width: 24 }}>{icon}</td>
              <td style={{ padding: 4, fontWeight: "bold", width: 90 }}>{label}</td>
              <td style={{ padding: 4, wordBreak: "break-all" }}>
                <a className="xp-link" href={href} target="_blank" rel="noreferrer">
                  {labels[label]}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </fieldset>
  );
}

export function MediaPlayerWindow() {
  const [current, setCurrent] = useState(0);
  const song = resume.songs[current];
  return (
    <div style={{ background: "#1a1a1a", color: "#9cf", margin: -12, padding: 12, minHeight: 360 }}>
      <div
        style={{
          background: "linear-gradient(135deg, #0a1a3a, #1c4fae)",
          padding: 20,
          borderRadius: 4,
          textAlign: "center",
          marginBottom: 12,
          border: "1px solid #3b77de",
        }}
      >
        <div style={{ fontSize: 11, opacity: 0.7 }}>Now Playing</div>
        <div style={{ fontSize: 18, fontWeight: "bold", color: "white", margin: "6px 0" }}>
          {song.title}
        </div>
        <div style={{ fontSize: 12, color: "#cde" }}>{song.artist}</div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginTop: 12 }}>
          <a className="xp-btn" href={song.spotify} target="_blank" rel="noreferrer">▶ Spotify</a>
          <a className="xp-btn" href={song.youtube} target="_blank" rel="noreferrer">▶ YouTube</a>
        </div>
      </div>
      <div style={{ background: "#000", border: "1px solid #333", maxHeight: 200, overflow: "auto" }}>
        {resume.songs.map((s, i) => (
          <div
            key={s.title}
            onClick={() => setCurrent(i)}
            style={{
              padding: "6px 10px",
              cursor: "pointer",
              background: i === current ? "#1c4fae" : "transparent",
              color: i === current ? "white" : "#9cf",
              borderBottom: "1px solid #222",
              fontSize: 11,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <span>{i + 1}. {s.title}</span>
            <span style={{ opacity: 0.7 }}>{s.artist}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function PicturesWindow() {
  const [selected, setSelected] = useState<number | null>(null);
  const palette = ["#2a4d8f", "#7a3f8f", "#3f8f4a", "#8f6b3f", "#8f3f3f", "#3f7a8f"];
  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
        {resume.pictures.map((p, i) => (
          <div
            key={p.title}
            onClick={() => setSelected(i)}
            style={{
              background: "white",
              border: "1px solid #aca899",
              padding: 4,
              cursor: "pointer",
              fontSize: 10,
              textAlign: "center",
            }}
          >
            <div
              style={{
                aspectRatio: "2/3",
                background: `linear-gradient(135deg, ${palette[i % palette.length]}, #000)`,
                color: "white",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: 6,
                fontSize: 11,
                fontWeight: "bold",
                marginBottom: 4,
              }}
            >
              {p.title}
            </div>
            {p.title}
          </div>
        ))}
      </div>
      {selected !== null && (
        <div
          onClick={() => setSelected(null)}
          style={{
            position: "fixed", inset: 0, background: "rgba(0,0,0,0.7)",
            display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100000,
          }}
        >
          <div
            style={{
              background: "white", padding: 20, maxWidth: 400, textAlign: "center",
              border: "2px solid #0058e6",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div
              style={{
                aspectRatio: "2/3", maxHeight: 360, margin: "0 auto",
                background: `linear-gradient(135deg, ${palette[selected % palette.length]}, #000)`,
                color: "white", display: "flex", alignItems: "center", justifyContent: "center",
                padding: 20, fontWeight: "bold",
              }}
            >
              {resume.pictures[selected].title}
            </div>
            <p style={{ fontStyle: "italic", margin: "12px 0" }}>
              "{resume.pictures[selected].caption}"
            </p>
            <button className="xp-btn" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export function NotepadWindow() {
  const [text, setText] = useState(resume.notepadOpeningText);
  return (
    <div style={{ margin: -12, display: "flex", flexDirection: "column", height: "100%" }}>
      <div className="xp-menubar">
        <span>File</span><span>Edit</span><span>Format</span><span>View</span><span>Help</span>
      </div>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          flex: 1,
          width: "100%",
          border: "none",
          outline: "none",
          padding: 8,
          fontFamily: '"Lucida Console", Consolas, monospace',
          fontSize: 13,
          resize: "none",
          minHeight: 280,
          background: "white",
        }}
      />
    </div>
  );
}

export function HobbiesWindow({ open }: { open: (id: WindowId) => void }) {
  const items: { id: WindowId; icon: string; label: string }[] = [
    { id: "media", icon: ICONS.mediaPlayer, label: "Media Player" },
    { id: "pictures", icon: ICONS.pictures, label: "My Pictures" },
    { id: "notepad", icon: ICONS.notepad, label: "Notepad" },
  ];
  return (
    <div>
      <p style={{ margin: "0 0 12px" }}>A little bit of fun — pick one:</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(110px, 1fr))", gap: 10 }}>
        {items.map((it) => (
          <div
            key={it.id}
            style={{
              background: "white", border: "1px solid #aca899", padding: 10,
              display: "flex", flexDirection: "column", alignItems: "center", gap: 6,
              cursor: "pointer",
            }}
            onDoubleClick={() => open(it.id)}
            onClick={() => open(it.id)}
          >
            <img src={it.icon} alt="" style={{ width: 40, height: 40, imageRendering: "pixelated" }} />
            <div style={{ color: "#000", fontSize: 11 }}>{it.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecycleWindow() {
  return (
    <div style={{ textAlign: "center", padding: 30, color: "#555" }}>
      <img src={ICONS.recycleEmpty} alt="" style={{ width: 48, height: 48, imageRendering: "pixelated" }} />
      <p>The Recycle Bin is empty.</p>
    </div>
  );
}
