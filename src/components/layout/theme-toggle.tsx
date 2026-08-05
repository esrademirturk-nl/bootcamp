'use client';

import * as React from 'react';

export interface ThemeToggleProps {
  label: string;
}

function SunIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>
  );
}

export function ThemeToggle({ label }: ThemeToggleProps) {
  // İlk render'da her zaman { mounted: false, isDark: false } (server ile
  // client hydration mismatch'ini önlemek için) — mount sonrası gerçek DOM
  // durumunu (ThemeInitScript'in senkron uyguladığı .dark class'ını) okuyup
  // güncelliyoruz. Bu, dış bir kaynaktan (DOM) ilk okuma yapan, kaçınılmaz
  // bir effect kullanım şekli — next-themes gibi kütüphaneler de aynı deseni
  // kullanır.
  const [state, setState] = React.useState({ mounted: false, isDark: false });

  React.useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState({
      mounted: true,
      isDark: document.documentElement.classList.contains('dark'),
    });
  }, []);

  function toggleTheme() {
    const next = !state.isDark;
    setState({ mounted: true, isDark: next });
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // localStorage kullanılamıyorsa (gizli mod vb.) sessizce yut,
      // tema yine de o oturum için değişmeye devam eder.
    }
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={label}
      className="rounded-md p-2 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
    >
      {state.mounted && state.isDark ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}
