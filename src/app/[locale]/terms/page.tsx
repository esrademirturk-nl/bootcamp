/**
 * @file src/app/[locale]/terms/page.tsx
 * @description Kullanım Koşulları sayfası. Footer'daki "Kullanım Koşulları"
 * linki buraya işaret ediyordu ama sayfa yoktu (404) — privacy/page.tsx ile
 * aynı desen: generateStaticParams gerekmiyor, getT'ye `lng: locale` açıkça
 * geçiliyor (headers()/cookies() tabanlı algılamaya düşülmesin diye).
 */

import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: TermsPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });
  return { title: t('termsPage.title') };
}

const SECTION_KEYS = [1, 2, 3, 4, 5, 6, 7] as const;

export default async function TermsPage({ params }: TermsPageProps) {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <header className="mb-10 space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t('termsPage.title')}
        </h1>
        <p className="text-sm text-muted">{t('termsPage.lastUpdated')}</p>
      </header>

      <p className="text-base leading-relaxed text-foreground">{t('termsPage.intro')}</p>

      <div className="mt-10 flex flex-col gap-8">
        {SECTION_KEYS.map((n) => (
          <section key={n} className="border-t border-border pt-8">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {t(`termsPage.section${n}Title`)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {t(`termsPage.section${n}Body`)}
            </p>
          </section>
        ))}

        <section className="border-t border-border pt-8">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {t('termsPage.contactTitle')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {t('termsPage.contactBody')}
          </p>
        </section>
      </div>
    </div>
  );
}
