export function ThemeScript() {
  const code = `
    (function () {
      try {
        var mode = localStorage.getItem('theme');
        var themeName = localStorage.getItem('theme-name') || 'default';
        if (mode === 'light' || mode === 'dark') {
          document.documentElement.classList.remove('light', 'dark');
          document.documentElement.classList.add(mode);
          document.documentElement.dataset.themeMode = mode;
        }
        document.documentElement.dataset.theme = themeName;
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
