export const projects = {
  subtitle: "Ausgewählte Arbeiten",
  title: "Projekte",
  description:
    "Ausgewählte kommerzielle Projekte auf Basis realer Praxiserfahrung mit Fokus auf React-basierte Benutzeroberflächen und Backend-Integration.",
  filters: {
    all: "Alle",
    showMore: "Mehr anzeigen",
  },
  labels: {
    filteredBy: "Gefiltert nach",
    clear: "Zurücksetzen",
    viewCase: "Case ansehen",
    hideCase: "Case ausblenden",
    problem: "Problem",
    solution: "Lösung",
    result: "Ergebnis",
  },
  items: [
    {
      id: 5,
      meta: "2026",
      category: "Rechner",
      image: "/images/projects/german-net-salary-calculator.png",
      title: "German Net Salary Calculator (Angular)",
      description:
        "Statischer Offline-Rechner für Nettogehälter mit lokaler Steuerkonfiguration, optionalem Live-API-Modus und Diagrammen.",
      impact: [
        "Offline-First",
        "Wöchentliche Steuer-Updates",
        "Diagramm-Analyse",
      ],
      problem:
        "Nutzer brauchten einen schnellen Rechner, der offline funktioniert und mit aktuellen Steuerparametern arbeitet.",
      solution:
        "Statische Angular-App mit lokalem Tax-Config-Cache, optionalem Live-API-Modus und Chart-Auswertung.",
      result:
        "Funktioniert offline nach dem ersten Laden und aktualisiert Steuerdaten wöchentlich.",
      tags: ["Rechner", "Offline-First", "Angular"],
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
      meta: "Aug. 2022 – Juni 2025",
      category: "Enterprise-Webanwendung",
      image: "/images/projects/youscan-dashboard.png",
      title: "Social-Media-Analyseplattform",
      description:
        "Großskalige Analyseplattform, die von Enterprise-Kunden zur Überwachung und Analyse von Social-Media-Daten genutzt wird.",
      impact: [
        "Bessere Performance",
        "Schnellere Ladezeiten",
        "Skalierbares UI",
      ],
      problem:
        "Die Plattform erforderte skalierbare, leistungsstarke Benutzeroberflächen zur Verarbeitung großer Datenmengen und komplexer Visualisierungen.",
      solution:
        "Entwicklung React-basierter Oberflächen mit optimiertem Rendering, modularer Architektur und nahtloser Integration von Backend-APIs.",
      result:
        "Verbesserte UI-Performance, reduzierte Ladezeiten und erhöhte Wartbarkeit der Analyseplattform.",
      tags: ["Featured", "Enterprise", "Analytics"],
      stack: ["React", "TypeScript", "Vue", "PHP", "Docker", "REST APIs"],
      links: [],
    },
    {
      id: 2,
      meta: "Sep. 2021 – Apr. 2022",
      category: "B2B-Plattform",
      image: "/images/projects/b2b-platform.png",
      title: "Hochfrequentierte B2B-Webplattformen",
      description:
        "Eine Reihe von B2B-Produkten mit komplexer Geschäftslogik und hohem Nutzeraufkommen.",
      impact: ["Wiederverwendbare UI", "Schnellere Releases", "Konsistente UX"],
      problem:
        "Mehrere Produkte erforderten konsistente UI-Patterns und eine skalierbare Frontend-Architektur bei gleichzeitig schneller Auslieferung neuer Features.",
      solution:
        "Aufbau wiederverwendbarer React-Komponentensysteme sowie enge Zusammenarbeit mit Backend-Teams auf Basis von Laravel und PHP.",
      result:
        "Verbesserte UI-Konsistenz, schnellere Feature-Entwicklung und effizientere teamübergreifende Zusammenarbeit.",
      tags: ["B2B", "Web App"],
      stack: ["React", "TypeScript", "Laravel", "PHP", "MySQL", "Docker"],
      links: [],
    },
    {
      id: 3,
      meta: "Apr. 2021 – Sep. 2021",
      category: "FinTech",
      image: "/images/projects/payment-dashboard.png",
      title: "Payment- und Admin-Dashboards",
      description:
        "Frontend-Dashboards für Zahlungsabwicklung und administrative Werkzeuge.",
      impact: [
        "Stabile interne Tools",
        "Wiederverwendbare Komponenten",
        "Saubere Integrationen",
      ],
      problem:
        "Zahlungssysteme erforderten zuverlässige, wiederverwendbare UI-Komponenten sowie eine saubere Integration mit mehreren Backend-Services.",
      solution:
        "Implementierung React-basierter Dashboards und Integration mit Backend-Systemen in PHP und C#.",
      result:
        "Bereitstellung stabiler und skalierbarer Benutzeroberflächen für Finanzprozesse und interne Teams.",
      tags: ["FinTech", "Dashboard"],
      stack: ["React", "Vue", "PHP", "C#", "JavaScript"],
      links: [],
    },
    {
      id: 4,
      meta: "Sep. 2020 – Apr. 2021",
      category: "Logistik",
      image: "/images/projects/logistics-ui.png",
      title: "Benutzeroberflächen für Logistikmanagement",
      description:
        "Kundenseitige Weboberflächen für Logistik- und Flottenmanagementsysteme.",
      impact: ["Bessere Barrierefreiheit", "Responsives UI", "Verbesserte UX"],
      problem:
        "Bestehende Oberflächen waren nicht ausreichend responsiv, barrierefrei und performant auf unterschiedlichen Endgeräten.",
      solution:
        "Entwicklung responsiver React- und Vue-Oberflächen mit Fokus auf Barrierefreiheit und Performance-Optimierung.",
      result:
        "Verbesserte Benutzerfreundlichkeit, Responsivität und insgesamt höhere User Experience auf allen Geräten.",
      tags: ["Logistik", "UI"],
      stack: ["React", "Vue", "SCSS", "WordPress"],
      links: [],
    },
  ],
};
