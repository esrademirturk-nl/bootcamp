/**
 * @file src/app/[locale]/auth/login/page.tsx
 * @description E-03 - Login sayfası kabuğu (server component).
 * generateMetadata burada tanımlanıyor; interaktif form login-content.tsx'te.
 */

import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';
import { LoginContent } from './login-content';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({ params }: LoginPageProps): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });
  return {
    title: t('authPage.loginTitle', { defaultValue: 'Hesabınıza Giriş Yapın' }),
  };
}

export default function LoginPage() {
  return <LoginContent />;
}
