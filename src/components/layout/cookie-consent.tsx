/**
 * @file src/components/layout/cookie-consent.tsx
 * @description Çerez onay banner'ı ve tercihler modalı (F-03).
 *
 * Bu dosya ne iş yapar?
 * 1. Kullanıcının daha önce bir karar verip vermediğini localStorage'dan kontrol eder.
 *    Karar yoksa ekranın altında bir banner gösterir: Kabul Et / Reddet / Tercihler.
 * 2. "Tercihler" seçilirse, kategori bazlı (Zorunlu — her zaman açık, Analitik,
 *    Pazarlama) bir tercihler paneli açılır (mobile-nav ile aynı portal + focus-trap
 *    deseni kullanılır — document.body'ye portal edilir, header'ın backdrop-blur'undan
 *    etkilenmez).
 * 3. Karar (Kabul Et / Reddet / Tercihleri Kaydet) localStorage'a yazılır ve
 *    kalıcı olur — sayfa yenilense/kapatılıp açılsa da banner tekrar gösterilmez.
 *
 * NOT: İlk render'da (sunucu ve client hydration anı) banner HER ZAMAN gizli
 * başlar — localStorage kontrolü sadece mount sonrası (useEffect) yapılır. Bu,
 * hydration mismatch'i önlemek için bilinçli bir tercih (theme-toggle.tsx'teki
 * `mounted` deseniyle aynı mantık).
 */

'use client';

import * as React from 'react';
import { createPortal } from 'react-dom';
import { useT } from 'next-i18next/client';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import i18nConfig from '../../../i18n.config';

const STORAGE_KEY = 'cookie-consent';

interface ConsentRecord {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
}

function readStoredConsent(): ConsentRecord | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed?.analytics === 'boolean' && typeof parsed?.marketing === 'boolean') {
      return { necessary: true, analytics: parsed.analytics, marketing: parsed.marketing };
    }
    return null;
  } catch {
    return null;
  }
}

function writeStoredConsent(record: ConsentRecord) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(record));
  } catch {
    // localStorage kullanılamıyorsa sessizce yut
  }
}

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

type ViewState = 'hidden' | 'banner' | 'preferences';

export function CookieConsent() {
  const { t, i18n } = useT('common');
  const locale = i18n.language;

  const [view, setView] = React.useState<ViewState>('hidden');
  const [draft, setDraft] = React.useState({ analytics: false, marketing: false });
  const panelRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const stored = readStoredConsent();
    if (!stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView('banner');
    }
  }, []);

  function persist(record: ConsentRecord) {
    writeStoredConsent(record);
    setView('hidden');
  }

  function handleAcceptAll() {
    persist({ necessary: true, analytics: true, marketing: true });
  }

  function handleRejectAll() {
    persist({ necessary: true, analytics: false, marketing: false });
  }

  function openPreferences() {
    const stored = readStoredConsent();
    setDraft({ analytics: stored?.analytics ?? false, marketing: stored?.marketing ?? false });
    setView('preferences');
  }

  function handleSavePreferences() {
    persist({ necessary: true, analytics: draft.analytics, marketing: draft.marketing });
  }

  function closePreferences() {
    setView('banner');
  }

  React.useEffect(() => {
    if (view !== 'preferences') return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        closePreferences();
      }
    }

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [view]);

  React.useEffect(() => {
    if (view !== 'preferences' || !panelRef.current) return;

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
  }, [view]);

  if (view === 'hidden') return null;
  if (typeof document === 'undefined') return null;

  if (view === 'banner') {
    return createPortal(
      <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-surface p-4 shadow-lg sm:p-6">
        <div className="mx-auto flex max-w-6xl flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted">
            {t('cookieConsent.message')}{' '}
            <a
              href={localizedHref('/privacy', locale)}
              className="font-medium text-primary-600 underline underline-offset-2 hover:text-primary-700"
            >
              {t('cookieConsent.privacyLink')}
            </a>
          </p>

          <div className="flex w-full flex-shrink-0 flex-wrap items-center gap-2 sm:w-auto">
            <Button variant="ghost" size="sm" onClick={openPreferences}>
              {t('cookieConsent.preferences')}
            </Button>
            <Button variant="secondary" size="sm" onClick={handleRejectAll}>
              {t('cookieConsent.reject')}
            </Button>
            <Button variant="primary" size="sm" onClick={handleAcceptAll}>
              {t('cookieConsent.accept')}
            </Button>
          </div>
        </div>
      </div>,
      document.body
    );
  }

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-neutral-950/50"
        onClick={closePreferences}
        aria-hidden="true"
      />

      <div className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col sm:inset-0 sm:m-auto sm:h-fit sm:max-w-lg sm:rounded-lg">
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label={t('cookieConsent.preferencesTitle')}
          className="flex max-h-[85vh] flex-col gap-5 overflow-y-auto rounded-t-2xl border border-border bg-surface p-6 shadow-lg sm:rounded-2xl"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h2 className="font-heading text-lg font-semibold text-foreground">
                {t('cookieConsent.preferencesTitle')}
              </h2>
              <p className="mt-1 text-sm text-muted">{t('cookieConsent.preferencesDescription')}</p>
            </div>
            <button
              type="button"
              onClick={closePreferences}
              aria-label={t('cookieConsent.close')}
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

          <div className="flex flex-col gap-4">
            <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 p-4">
              <div>
                <p className="text-sm font-semibold text-foreground">
                  {t('cookieConsent.necessaryLabel')}
                </p>
                <p className="mt-0.5 text-xs text-muted">
                  {t('cookieConsent.necessaryDescription')}
                </p>
              </div>
              <span className="mt-0.5 flex-shrink-0 rounded-full bg-surface-muted px-2.5 py-1 text-xs font-medium text-muted">
                {t('cookieConsent.alwaysOn')}
              </span>
            </div>

            <ConsentToggle
              label={t('cookieConsent.analyticsLabel')}
              description={t('cookieConsent.analyticsDescription')}
              checked={draft.analytics}
              onChange={(checked) => setDraft((prev) => ({ ...prev, analytics: checked }))}
            />

            <ConsentToggle
              label={t('cookieConsent.marketingLabel')}
              description={t('cookieConsent.marketingDescription')}
              checked={draft.marketing}
              onChange={(checked) => setDraft((prev) => ({ ...prev, marketing: checked }))}
            />
          </div>

          <Button variant="primary" size="md" onClick={handleSavePreferences} className="w-full">
            {t('cookieConsent.savePreferences')}
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}

interface ConsentToggleProps {
  label: string;
  description: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

function ConsentToggle({ label, description, checked, onChange }: ConsentToggleProps) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-lg border border-border/60 p-4">
      <div>
        <p className="text-sm font-semibold text-foreground">{label}</p>
        <p className="mt-0.5 text-xs text-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-0.5 h-6 w-11 flex-shrink-0 rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2',
          checked ? 'bg-primary-600' : 'bg-surface-muted'
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform',
            checked ? 'translate-x-[22px]' : 'translate-x-0.5'
          )}
        />
      </button>
    </div>
  );
}
