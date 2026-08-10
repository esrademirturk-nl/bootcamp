/**
 * @file src/app/[locale]/privacy/page.tsx
 * @description Gizlilik Politikası sayfası. Footer ve çerez banner'ındaki
 * "Gizlilik Politikası" linkleri buraya işaret ediyordu ama sayfa yoktu (404).
 *
 * generateStaticParams gerekmiyor — dinamik segmenti yok, [locale]/layout.tsx'in
 * kendi generateStaticParams'ı zaten bu sayfayı da statik üretiyor. getT'ye
 * `lng: locale` açıkça geçiliyor ki headers()/cookies() tabanlı algılamaya
 * düşülmesin (aksi halde sayfa dynamic render'a zorlanır).
 */

import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';

interface PrivacyPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: PrivacyPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });
  return { title: t('privacyPage.title') };
}

const SECTION_KEYS = [1, 2, 3, 4, 5, 6] as const;

export default async function PrivacyPage({ params }: PrivacyPageProps) {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:py-20">
      <header className="mb-10 space-y-2">
        <h1 className="font-heading text-3xl font-bold text-foreground sm:text-4xl">
          {t('privacyPage.title')}
        </h1>
        <p className="text-sm text-muted">{t('privacyPage.lastUpdated')}</p>
      </header>

      <p className="text-base leading-relaxed text-foreground">{t('privacyPage.intro')}</p>

      <div className="mt-10 flex flex-col gap-8">
        {SECTION_KEYS.map((n) => (
          <section key={n} className="border-t border-border pt-8">
            <h2 className="font-heading text-xl font-semibold text-foreground">
              {t(`privacyPage.section${n}Title`)}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
              {t(`privacyPage.section${n}Body`)}
            </p>
          </section>
        ))}

        <section className="border-t border-border pt-8">
          <h2 className="font-heading text-xl font-semibold text-foreground">
            {t('privacyPage.contactTitle')}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted sm:text-base">
            {t('privacyPage.contactBody')}
          </p>
        </section>
      </div>
    </div>
  );
}
