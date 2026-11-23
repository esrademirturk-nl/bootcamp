'use client';

import * as React from 'react';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
import { useT } from 'next-i18next/client';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import { MobileNav, type NavLink } from './mobile-nav';
import { LanguageSwitcher } from './language-switcher';
import { ThemeToggle } from './theme-toggle';
import i18nConfig from '../../../i18n.config';

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

export function Header() {
  const [isMobileNavOpen, setIsMobileNavOpen] = React.useState(false);
  const { t, i18n } = useT('common');
  const locale = i18n.language;

  const navLinks: NavLink[] = [
    { href: localizedHref('/', locale), label: t('nav.home') },
    { href: localizedHref('/bootcamps', locale), label: t('nav.bootcamps') },
    { href: localizedHref('/schedule', locale), label: t('nav.schedule') },
    { href: localizedHref('/about', locale), label: t('nav.about') },
    { href: localizedHref('/contact', locale), label: t('nav.contact') },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6">
        {/* Logo */}
        <Link
          href={localizedHref('/', locale)}
          className="flex flex-shrink-0 items-center gap-2.5 whitespace-nowrap font-heading text-base font-bold text-foreground sm:text-lg"
        >
          <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary-600 text-white">
            <Rocket className="h-4 w-4" strokeWidth={2} />
          </span>
          <span>
            <span className="text-primary-600">NextGen</span> IT Academy
          </span>
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
        <div className="flex flex-shrink-0 items-center gap-3">
          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Tema toggle — localStorage'da kalıcı, FOUC'suz (ThemeInitScript ile) */}
          <ThemeToggle label={t('header.themeToggle')} />

          <Link
            href={localizedHref('/auth/login', locale)}
            className={cn(
              buttonVariants({ variant: 'primary', size: 'sm' }),
              'hidden md:inline-flex'
            )}
          >
            {t('footer.login')}
          </Link>

          {/* Mobil hamburger */}
          <button
            type="button"
            onClick={() => setIsMobileNavOpen(true)}
            aria-label={t('header.openMenu')}
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
