/**
 * @file src/app/[locale]/contact/page.tsx
 * @description E-02 - Contact sayfası kabuğu (server component).
 * generateMetadata burada tanımlanıyor; interaktif form contact-content.tsx'te.
 */

import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';
import { ContactContent } from './contact-content';

interface ContactPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: ContactPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });
  const title = t('contactPage.title', { defaultValue: 'Bizimle İletişime Geçin' });
  const description = t('contactPage.subtitle', {
    defaultValue:
      'Sorularınız, eğitim programları ve kayıt süreçleri için formu doldurabilirsiniz.',
  });
  return {
    title,
    description,
    openGraph: { title, description, locale },
  };
}

export default function ContactPage() {
  return <ContactContent />;
}
