/**
 * @file src/app/[locale]/schedule/page.tsx
 * @description D-04 Eğitim Takvimi sayfası kabuğu (server component).
 * generateMetadata burada tanımlanıyor; interaktif takvim schedule-content.tsx'te.
 */

import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';
import { ScheduleContent } from './schedule-content';

interface SchedulePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: SchedulePageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });
  const title = t('schedulePage.title', { defaultValue: 'Eğitim Takvimi & Kohortlar' });
  const description = t('schedulePage.subtitle', {
    defaultValue:
      'Gelecek dönem başlayacak bootcamp programlarımızı inceleyin, kontenjanlar dolmadan yerinizi ayırtın.',
  });
  return {
    title,
    description,
    openGraph: { title, description, locale },
  };
}

export default function SchedulePage() {
  return <ScheduleContent />;
}
