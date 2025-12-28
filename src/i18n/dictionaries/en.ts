import { get } from "http";

export const en = {
  hero: {
    greeting: "Hello, I'm",
    name: "Yevhenii Slivinskyi",
    title: "Full Stack Web Developer",
    description:
      "Full-stack developer with 5+ years of experience building scalable and high-quality web applications. Specialized in React and Node.js, with additional hands-on experience in Vue.js, Angular, PHP, and Python. I enjoy learning new technologies and creating clean, user-focused digital products.",
    location: "Icking, Germany",
    contact: "Contact",
    resume: "Download CV",
    available: "Available",
    remote: "Remote",
    getInTouch: "Get in touch",
  },
  global: {
    name: "Yevhenii Slivinskyi",
  },
  nav: {
    about: "About",
    skills: "Skills",
    languages: "Languages",
    projects: "Projects",
    experience: "Experience",
  },

  experience: {
    subtitle: "Experience",
    title: "Professional Experience",
    description:
      "Hands-on experience building scalable web applications and working with cross-functional teams.",
    techStack: "Tech Stack",
    items: [
      {
        id: "exp-1",
        role: "Frontend Developer",
        company: "Freelance / Remote",
        period: "2021 – Present",
        description:
          "Developed and maintained modern web applications with focus on performance and UX.",
        achievements: [
          "Built reusable UI components with React and TypeScript",
          "Improved application performance and accessibility",
          "Collaborated closely with designers and backend developers",
        ],
        stack: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        icon: "laptop",
        color: "from-cyan-500 to-orange-500",
        bgColor: "bg-gradient-to-br from-cyan-500 to-orange-500",
      },
    ],
  },

  about: {
    summary: {
      subtitle: "Get to know me",
      title: "About me",
      description:
        "I am a full-stack developer with 5+ years of experience. I focus on clean architecture and scalable solutions.",
    },
    full: {
      subtitle: "Get to know me",
      title: "About me",
      description:
        "I am a full-stack developer with more than 5 years of experience. I have worked with React, Node.js, and modern frontend tooling. I enjoy building maintainable and user-focused applications.",
      stats: [
        {
          id: "stat-1",
          icon: "projects",
          value: "30+",
          label: "Projects Delivered",
        },
        {
          id: "stat-2",
          icon: "experience",
          value: "5+",
          label: "Years Experience",
        },
        {
          id: "stat-3",
          icon: "location",
          value: "7+",
          label: "Countries Served",
        },
      ],
      approach: {
        title: "How I Work",
        items: [
          {
            id: "ownership",
            icon: "projects",
            title: "Ownership mindset",
            description:
              "I take end-to-end responsibility for features and products — from initial idea and technical design to production release and long-term maintenance.",
          },
          {
            id: "engineering",
            icon: "skills",
            title: "Engineering-first decisions",
            description:
              "I focus on clean architecture, maintainability, and performance, making decisions that scale well over time instead of short-term hacks.",
          },
          {
            id: "collaboration",
            icon: "experience",
            title: "Clear collaboration",
            description:
              "I work closely with product managers, designers, and stakeholders to align technical solutions with real business goals.",
          },
        ],
      },
    },
  },
  projects: {
    subtitle: "Selected work",
    title: "Projects",
    description:
      "A selection of projects where I solved real business and technical challenges.",
    items: [
      {
        id: 1,
        category: "Web Application",
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
        category: "Blog",
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
  },
  skills: {
    subtitle: "Skills",
    title: "Core Expertise",
    description:
      "Technologies and tools I use to design, build, and scale modern applications.",
    categories: [
      {
        id: "frontend",
        icon: "frontend",
        title: "Frontend",
        description: "Building accessible, scalable, and performant interfaces",
        skills: [
          "React",
          "Next.js",
          "TypeScript",
          "Tailwind CSS",
          "Framer Motion",
        ],
      },
      {
        id: "backend",
        icon: "backend",
        title: "Backend",
        description: "APIs, data modeling, and business logic",
        skills: ["Node.js", "REST APIs", "MongoDB", "PostgreSQL"],
      },
      {
        id: "architecture",
        icon: "architecture",
        title: "Architecture",
        description: "Maintainable and scalable system design",
        skills: ["Clean Architecture", "Modular Design", "SOLID"],
      },
      {
        id: "tooling",
        icon: "tools",
        title: "Tooling",
        description: "Development experience and code quality",
        skills: ["Git", "ESLint", "Prettier", "Vite", "Webpack"],
      },
    ],
  },
};
