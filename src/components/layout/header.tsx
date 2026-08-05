'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MobileNav, type NavLink } from './mobile-nav';

const navLinks: NavLink[] = [
  { href: '/', label: 'Ana Sayfa' },
  { href: '/bootcamps', label: "Bootcamp'ler" },
  { href: '/schedule', label: 'Program' },
  { href: '/about', label: 'Hakkımızda' },
  { href: '/contact', label: 'İletişim' },
];

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);

  function toggleTheme() {
    document.documentElement.classList.toggle('dark');
  }

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Logo */}
        <Link href="/" className="font-heading text-lg font-bold text-foreground">
          Bootcamp<span className="text-primary-600">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground hover:text-primary-600"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Sağ taraf: dil seçici, tema toggle, CTA, mobil hamburger */}
        <div className="flex items-center gap-3">
          {/* Dil seçici — B-01'de gerçek işlevine kavuşacak, şimdilik görsel yer tutucu */}
          <button
            type="button"
            className="hidden rounded-md px-2 py-1 text-sm font-medium text-muted hover:bg-surface-muted md:block"
            aria-label="Dil seç"
          >
            TR
          </button>

          {/* Tema toggle — B-02'de localStorage + sistem tercihi ile tamamlanacak */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Tema değiştir"
            className="rounded-md p-2 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500"
          >
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
          </button>

          <Button variant="primary" size="sm" className="hidden md:inline-flex">
            Kayıt Ol
          </Button>

          {/* Mobil hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label="Menüyü aç"
            className="rounded-md p-2 hover:bg-surface-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      <MobileNav
        isOpen={isMobileNavOpen}
        onClose={() => setIsMobileNavOpen(false)}
        links={navLinks}
      />
    </header>
  );
}
