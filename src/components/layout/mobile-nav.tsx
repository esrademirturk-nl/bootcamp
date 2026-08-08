'use client';

import * as React from 'react';
import Link from 'next/link';
import { useT } from 'next-i18next/client';
import { buttonVariants } from '@/components/ui/button-variants';
import { cn } from '@/lib/utils';
import i18nConfig from '../../../i18n.config';

export interface NavLink {
  href: string;
  label: string;
}

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  links: NavLink[];
}

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

export function MobileNav({ isOpen, onClose, links }: MobileNavProps) {
  const { t, i18n } = useT('common');
  const locale = i18n.language;
  const panelRef = React.useRef<HTMLDivElement>(null);

  // Escape ile kapatma
  React.useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Panel açıkken body scroll'u kilitle
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Focus trap: panel açıldığında ilk odaklanabilir elemana odaklan,
  // Tab ile panel dışına çıkılmasını engelle
  React.useEffect(() => {
    if (!isOpen || !panelRef.current) return;

    const panel = panelRef.current;
    const focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';
    const focusableElements = panel.querySelectorAll<HTMLElement>(focusableSelector);
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    firstElement?.focus();

    function handleTab(event: KeyboardEvent) {
      if (event.key !== 'Tab') return;

      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement?.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement?.focus();
        }
      }
    }

    panel.addEventListener('keydown', handleTab);
    return () => panel.removeEventListener('keydown', handleTab);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-neutral-950/50" onClick={onClose} aria-hidden="true" />

      {/* Panel — küçük ekranlarda tam genişlik, sm ve üzerinde 320px'e sabitlenir */}
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={t('header.menu')}
        className="absolute right-0 top-0 flex h-full w-full max-w-xs flex-col gap-6 overflow-y-auto bg-surface p-6 shadow-lg"
      >
        <div className="flex items-center justify-between">
          <span className="font-heading text-lg font-semibold">{t('header.menu')}</span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('header.closeMenu')}
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-surface-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link
          href={localizedHref('/auth/login', locale)}
          onClick={onClose}
          className={cn(buttonVariants({ variant: 'primary', size: 'md' }), 'mt-auto w-full')}
        >
          {t('footer.login')}
        </Link>
      </div>
    </div>
  );
}
