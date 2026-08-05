import Script from 'next/script';

export function ThemeInitScript() {
  const script = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) {
      document.documentElement.classList.add('dark');
    }
  } catch (e) {}
})();
`.trim();

  return (
    // Bu kural Pages Router döneminden kalma ve App Router'da beforeInteractive'in
    // root layout'ta kullanılmasını resmi olarak desteklediğini henüz yansıtmıyor
    // (bkz. Next.js next/script dokümantasyonu, App Router örneği).
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: script }}
    />
  );
}
