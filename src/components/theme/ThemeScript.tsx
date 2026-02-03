export function ThemeScript() {
  const code = `
    (function () {
      try {
        var theme = localStorage.getItem('theme');
        if (theme !== 'light' && theme !== 'dark') return;
        document.documentElement.classList.remove('light', 'dark');
        document.documentElement.classList.add(theme);
      } catch (e) {}
    })();
  `;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}
