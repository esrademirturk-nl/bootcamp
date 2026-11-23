/**
 * @file src/components/layout/theme-init-script.tsx
 * @description Tema (Light/Dark) başlangıç betiği.
 *
 * Bu dosya ne iş yapar?
 * Sayfa henüz HTML parse edilirken (hydration'dan önce) `localStorage`
 * veya sistem temasını okuyarak `<html>` etiketine `dark` sınıfını ekler.
 * `beforeInteractive` stratejisi ile ilk boyama (paint) doğru temada
 * gerçekleşir — `afterInteractive` kullanılsaydı sayfa önce yanlış temada
 * boyanır, sonra script çalışınca aniden değişirdi (FOUC/flash). Layout'ta
 * `<html suppressHydrationWarning>` bu pattern'e eşlik ediyor: server render
 * ile client'ın erken enjekte ettiği class arasındaki farkı React'in hata
 * olarak işaretlememesi için gerekli.
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
    // Next.js'in bu kuralı Pages Router'ın pages/_document.js kontrolünden
    // miras kalmış; App Router'da beforeInteractive'in root layout'ta
    // kullanılması Next.js'in kendi dokümantasyonunda resmi olarak
    // desteklenen bir pattern'dir: https://nextjs.org/docs/app/api-reference/components/script#beforeinteractive
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="theme-init"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: code }}
    />
  );
}

export default ThemeInitScript;
