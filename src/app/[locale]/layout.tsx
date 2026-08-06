/**
 * @file src/app/[locale]/layout.tsx
 * @description Tüm uygulamanın kök düzen (Root Layout) bileşenidir.
 * 
 * Bu dosya ne iş yapar?
 * 1. Uygulamanın temel HTML ve BODY yapısını kurar.
 * 2. Uygulanacak font değişkenlerini (Geist, Space Grotesk) CSS sınıfı olarak hazırlar.
 * 3. Sunucu taraflı i18n (çoklu dil) yapılandırmasını başlatır ve dil kaynaklarını (resources) yükler.
 * 4. Tema (Light/Dark) çakışmasını ve ekran parlamasını önleyen `ThemeInitScript` bileşenini <head> içine yerleştirir.
 * 5. Tüm sayfaları saracak olan Header, Footer ve I18nProvider yapılarını oluşturur.
 */

import type { Metadata } from 'next';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import localFont from 'next/font/local';
import { initServerI18next, getT, getResources } from 'next-i18next/server';
import { I18nProvider } from 'next-i18next/client';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { ThemeInitScript } from '@/components/layout/theme-init-script';
import i18nConfig from '../../../i18n.config.server';
import './globals.css';

// 1. Sunucu tarafı i18next yapılandırmasını verilen konfigürasyon ile başlatıyoruz.
initServerI18next(i18nConfig);

/**
 * @variable spaceGrotesk
 * @description Yerel (local) SpaceGrotesk font dosyasını yükler ve CSS değişkeni (`--font-heading`) olarak tanımlar.
 */
const spaceGrotesk = localFont({
  src: '../../fonts/SpaceGrotesk-Variable.ttf',
  variable: '--font-heading',
  weight: '300 700',
});

/**
 * @variable metadata
 * @description Uygulamanın arama motorları (SEO) ve sekme başlığı için varsayılan meta verilerini tanımlar.
 */
export const metadata: Metadata = {
  title: 'Bootcamp Sitesi',
  description: 'Bootcamp platformu — R1/R2/R3 ekip projesi',
};

/**
 * @interface RootLayoutProps
 * @property {React.ReactNode} children - Düzenin içine render edilecek olan sayfa bileşenleri.
 * @property {Promise<{ locale: string }>} params - URL'den gelen dinamik dil parametresi (ör: 'tr', 'en', 'nl').
 */
interface RootLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

/**
 * @function RootLayout
 * @description Kök yerleşim düzenini oluşturan asenkron sunucu bileşeni (Async Server Component).
 * 
 * @param {RootLayoutProps} props - Sayfa içeriği ve URL parametreleri.
 * @returns {JSX.Element} Bütünsel HTML sayfa yapısı.
 */
export default async function RootLayout({ children, params }: RootLayoutProps) {
  // 1. Dinamik olarak gelen `params` sözünü (Promise) çözümleyip aktif dili alıyoruz.
  const { locale } = await params;

  // 2. Sunucu tarafı i18n çeviri fonksiyonunu (getT) çağırarak aktif i18n örneğini alıyoruz.
  const { i18n } = await getT();

  // 3. Geliştirme (development) ortamındaysak çeviri dosyalarının anlık güncellenmesini sağlıyoruz.
  if (process.env.NODE_ENV === 'development') {
    await i18n.reloadResources(i18nConfig.supportedLngs, i18nConfig.ns);
  }

  // 4. İstemci (Client) tarafındaki I18nProvider'a aktarılmak üzere çeviri verilerini çekiyoruz.
  const resources = getResources(i18n);

  return (
    <html
      lang={locale}
      className={`${GeistSans.variable} ${GeistMono.variable} ${spaceGrotesk.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        {/* Tema ön ayar betiği: Sayfa yüklenmeden önce çalışıp karanlık/aydınlık temayı ayarlar */}
        <ThemeInitScript />
      </head>
      <body 
        className="min-h-full flex flex-col font-sans bg-background text-foreground" 
        suppressHydrationWarning
      >
        {/* İstemci tarafı i18n bağlamı (Context Provider) */}
        <I18nProvider fallbackLng={i18nConfig.fallbackLng} language={locale} resources={resources}>
          {/* Üst Navigasyon / Header */}
          <Header />

          {/* Sayfa İçeriklerinin Render Edildiği Ana Alan */}
          <div className="flex-1">{children}</div>

          {/* Alt Bilgi / Footer */}
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}