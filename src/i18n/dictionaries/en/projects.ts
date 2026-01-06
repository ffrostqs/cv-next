import { image } from "framer-motion/client";

export const projects = {
  subtitle: "Selected work",
  title: "Projects",
  description:
    "A selection of projects where I solved real business and technical challenges.",
  items: [
    {
      id: 1,
      meta: "Jan 2023 - Jun 2023",
      category: "Web Application",
      image: "/images/projects/project-1.png",
      title: "Analytics Dashboard",
      description: "Internal analytics platform for business teams.",
      problem: "Data was fragmented across multiple tools.",
      solution:
        "Designed a unified dashboard with role-based access and real-time updates.",
      result: "Reduced reporting time by 60%.",
      tags: ["Featured", "Web App"],
      stack: ["React", "Node.js", "PostgreSQL"],
      links: [{ label: "Code", url: "https://github.com/…", icon: "github" }],
    },
    {
      id: 2,
      meta: "Jan 2023 - Jun 2023",
      category: "Blog",
      image: "/images/projects/project-2.png",
      title: "Analytics",
      description: "Internal ",
      problem: "Data ",
      solution:
        "Designed a unified dashboard with role-based access and real-time updates.",
      result: "Reduced reporting time by 60%.",
      tags: ["Testing", "Analytics"],
      stack: ["React", "Node.js", "PostgreSQL", "Docker"],
      links: [
        { label: "Code", url: "https://github.com/…", icon: "github" },
        { label: "Live Demo", url: "https://github.com/…", icon: "demo" },
      ],
    },
  ],
};
