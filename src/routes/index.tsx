import { createFileRoute } from "@tanstack/react-router";
import { XPDesktop } from "@/components/xp/XPDesktop";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Shivam Kumar Swarnkar | Machine Learning Engineer" },
      {
        name: "description",
        content:
          "Personal Windows XP–themed portfolio of Shivam Kumar Swarnkar — ML engineer, data science undergrad, projects, resume, and contact.",
      },
      { property: "og:title", content: "Shivam Kumar Swarnkar — ML Engineer" },
      {
        property: "og:description",
        content: "A Windows XP desktop portfolio with resume, projects, and more.",
      },
    ],
  }),
});

function Index() {
  return <XPDesktop />;
}
