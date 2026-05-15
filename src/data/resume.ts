/**
 * ============================================================
 *  EDIT YOUR RESUME HERE
 * ============================================================
 *  This is the ONLY file you need to edit to fill in your
 *  personal details. Every field marked with `// EDIT:` is a
 *  placeholder — replace the string with your own info.
 *
 *  Anything you don't have yet, just leave the placeholder —
 *  the site will still render correctly.
 * ============================================================
 */

export const resume = {
  // EDIT: Your basic identity
  name: "Your Name",
  username: "yourname", // shown on the XP login screen (e.g. "yourname")
  title: "Software Engineer", // your role / tagline
  location: "City, Country",
  bio: "Short one–two sentence bio that introduces you. Talk about what you do, what you love building, and what you're looking for.",

  // EDIT: Avatar shown on the login screen + About window.
  // Replace with a URL or import an image from src/assets and use its URL.
  avatar: "https://api.dicebear.com/9.x/pixel-art/svg?seed=you",

  // EDIT: Contact + social links. Leave "" to hide a row.
  contact: {
    email: "you@example.com",
    phone: "", // optional
    github: "https://github.com/yourhandle",
    linkedin: "https://linkedin.com/in/yourhandle",
    twitter: "", // optional
    website: "", // optional
  },

  // EDIT: Resume PDF link. Drop your CV in /public and put the path here,
  // e.g. "/resume.pdf". Leave "" to hide the download button.
  resumePdf: "",

  // EDIT: Skills grouped by category. Add/remove categories freely.
  skills: [
    { group: "Languages", items: ["TypeScript", "Python", "Go"] },
    { group: "Frontend", items: ["React", "Next.js", "Tailwind CSS"] },
    { group: "Backend", items: ["Node.js", "PostgreSQL", "Redis"] },
    { group: "Tools", items: ["Git", "Docker", "AWS"] },
  ],

  // EDIT: Work experience. Add as many entries as you need.
  experience: [
    {
      role: "Software Engineer",
      company: "Company Name",
      companyUrl: "", // optional
      period: "Jan 2024 — Present",
      location: "Remote",
      bullets: [
        "What you built / shipped — keep it punchy.",
        "Impact you had, with numbers if possible.",
        "A second project or responsibility worth mentioning.",
      ],
    },
    {
      role: "Intern",
      company: "Previous Company",
      companyUrl: "",
      period: "Jun 2023 — Dec 2023",
      location: "City, Country",
      bullets: ["Describe what you did here.", "Another bullet."],
    },
  ],

  // EDIT: Education entries.
  education: [
    {
      school: "Your University",
      degree: "B.Sc. in Computer Science",
      period: "2021 — 2025",
      details: "GPA, honors, relevant coursework, clubs — anything notable.",
    },
  ],

  // EDIT: Projects. `link` is optional.
  projects: [
    {
      name: "Project One",
      description: "One sentence describing what the project does and why it's cool.",
      stack: ["React", "TypeScript", "Tailwind"],
      link: "https://github.com/yourhandle/project-one",
    },
    {
      name: "Project Two",
      description: "Another short description.",
      stack: ["Next.js", "Postgres"],
      link: "",
    },
  ],
};

export type Resume = typeof resume;
