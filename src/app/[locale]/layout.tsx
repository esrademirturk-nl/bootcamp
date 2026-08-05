import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import localFont from 'next/font/local';
import {
  initServerI18next,
  getT,
  getResources,
  generateI18nStaticParams,
} from 'next-i18next/server';
import { I18nProvider } from 'next-i18next/client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeInitScript } from '@/components/layout/theme-init-script';
import i18nConfig from '../../../i18n.config';
import './globals.css';

initServerI18next(i18nConfig);

const spaceGrotesk = localFont({
  src: '../../fonts/SpaceGrotesk-Variable.ttf',
  variable: '--font-heading',
  weight: '300 700',
});

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

export const metadata: Metadata = {
  title: 'Bootcamp Sitesi',
  description: 'Bootcamp platformu — R1/R2/R3 ekip projesi',
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const { i18n } = await getT();

  if (process.env.NODE_ENV === 'development') {
    await i18n.reloadResources(i18nConfig.supportedLngs, i18nConfig.ns);
  }

  const resources = getResources(i18n);

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans bg-background text-foreground">
        <ThemeInitScript />
        <I18nProvider fallbackLng={i18nConfig.fallbackLng} language={locale} resources={resources}>
          <Header />
          <div className="flex-1">{children}</div>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
