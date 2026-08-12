/**
 * @file src/app/[locale]/auth/register/page.tsx
 * @description E-03 - Register sayfası kabuğu (server component).
 * generateMetadata burada tanımlanıyor; interaktif form register-content.tsx'te.
 */

import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';
import { RegisterContent } from './register-content';

interface RegisterPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: RegisterPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });
  return {
    title: t('authPage.registerTitle', { defaultValue: 'Yeni Hesap Oluşturun' }),
  };
}

export default function RegisterPage() {
  return <RegisterContent />;
}
