import type { Metadata } from 'next';
import { getT } from 'next-i18next/server';
import { AboutContent } from './about-content';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const { t } = await getT('common', { lng: locale });
  return {
    title: t('aboutPage.title', { defaultValue: 'Geleceğin Teknoloji Liderlerini Yetiştiriyoruz' }),
    description: t('aboutPage.missionText', {
      defaultValue:
        'Werhere IT olarak amacımız; teorik bilginin ötesine geçerek pratik, proje odaklı ve güncel müfredatlarla bireyleri küresel teknoloji pazarına tam donanımlı hazırlamaktır.',
    }),
  };
}

export default function AboutPage() {
  return <AboutContent />;
}
