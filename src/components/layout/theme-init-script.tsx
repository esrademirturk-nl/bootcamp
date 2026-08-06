/**
 * @file src/components/layout/theme-init-script.tsx
 * @description Tema (Light/Dark) başlangıç betiği.
 * 
 * Bu dosya ne iş yapar?
 * Sayfa henüz yüklenirken `localStorage` veya sistem temasını okuyarak 
 * `<html>` etiketine `dark` sınıfını ekler. `afterInteractive` stratejisi ile 
 * React client render script uyarısını önler.
 */

'use client';

import React from 'react';
import Script from 'next/script';

/**
 * @function ThemeInitScript
 * @description Tema ön yükleme script bileşeni.
 */
export function ThemeInitScript() {
  const code = `
    (function () {
      try {
        var stored = localStorage.getItem('theme');
        var isDark = stored ? stored === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      } catch (e) {}
    })();
  `.trim();

  return (
    <Script
      id="theme-init"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}

export default ThemeInitScript;