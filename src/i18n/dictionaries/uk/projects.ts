export const projects = {
  subtitle: "Selected work",
  title: "Projects",
  description:
    "A selection of projects where I solved real business and technical challenges.",
  filters: {
    all: "All",
    showMore: "Показати ще",
  },
  labels: {
    filteredBy: "Фільтр",
    clear: "Очистити",
    viewCase: "Деталі кейсу",
    hideCase: "Сховати кейс",
    problem: "Проблема",
    solution: "Рішення",
    result: "Результат",
  },
  items: [
    {
      id: 5,
      meta: "2026",
      category: "Calculator",
      image: "/images/projects/german-net-salary-calculator.png",
      title: "German Net Salary Calculator (Angular)",
      description:
        "Static, offline-first net salary calculator with local tax config, optional live API mode, and chart breakdowns.",
      impact: ["Offline-first", "Weekly tax updates", "Chart breakdowns"],
      problem:
        "Users needed a fast, reliable calculator that works offline and stays up to date with tax parameters.",
      solution:
        "Built a static Angular app that caches tax data locally, supports a live API toggle, and visualizes results with charts.",
      result:
        "Works offline after first load, supports weekly tax data refresh, and keeps calculations transparent.",
      tags: ["Calculator", "Offline-First", "Angular"],
      stack: ["Angular 19", "TypeScript", "RxJS", "Signals", "Chart.js"],
      links: [
        {
          label: "Live Demo",
          url: "https://ffrostqs.github.io/ffrostqs-German-Net-Salary-Calculator/",
          icon: "demo",
        },
        {
          label: "GitHub",
          url: "https://github.com/ffrostqs/ffrostqs-German-Net-Salary-Calculator",
          icon: "github",
        },
      ],
    },
    {
      id: 1,
      category: "Web Application",
      image: "/images/projects/project-1.png",
      title: "Analytics Dashboard",
      description: "Internal analytics platform for business teams.",
      impact: ["Unified reporting", "Faster insights", "Role-based access"],
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
      image: "/images/projects/project-2.png",
      title: "Analytics",
      description: "Internal ",
      impact: ["Improved delivery", "Reusable UI", "Faster reporting"],
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
