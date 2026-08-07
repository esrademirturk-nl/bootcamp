/**
 * @file src/app/[locale]/about/page.tsx
 * @description E-01 - About (Hakkımızda) Sayfası (Tam i18n Uyumlu).
 */

'use client';

import React, { use, useEffect } from 'react';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AboutPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Mock Takım ve Eğitmen Verileri
const teamMembers = [
  {
    name: 'Dr. Ahmet Yılmaz',
    role: 'Lead Data Science Instructor',
    image:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    bioKey: 'ahmetBio',
    defaultBio: 'Ex-Google Senior Data Scientist, 10+ yıl sektör deneyimi.',
  },
  {
    name: 'Elif Demir',
    role: 'Full-Stack Web Lead',
    image:
      'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bioKey: 'elifBio',
    defaultBio: 'React ve Next.js ekosisteminde uzman, open-source katkıcısı.',
  },
  {
    name: 'Caner Şahin',
    role: 'DevOps & Cloud Architect',
    image:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    bioKey: 'canerBio',
    defaultBio: 'AWS Certified Solutions Architect & Kubernetes Topluluk Lideri.',
  },
  {
    name: 'Selin Kaya',
    role: 'UI/UX & Product Design',
    image:
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    bioKey: 'selinBio',
    defaultBio: 'Kullanıcı odaklı ürün tasarımı ve Design Systems uzmanı.',
  },
];

// Mock Şirket Zaman Çizelgesi
const timelineEvents = [
  {
    year: '2023',
    titleKey: 'event1Title',
    descKey: 'event1Desc',
    defaultTitle: 'Kuruluş & İlk Bootcamp',
    defaultDesc: 'Werhere IT çatısı altında ilk Full-Stack kohortumuzu başlattık.',
  },
  {
    year: '2024',
    titleKey: 'event2Title',
    descKey: 'event2Desc',
    defaultTitle: 'Avrupa Genişlemesi',
    defaultDesc: 'NL ve EN dil seçenekleri ile Hollanda ve AB pazarına açıldık.',
  },
  {
    year: '2025',
    titleKey: 'event3Title',
    descKey: 'event3Desc',
    defaultTitle: 'Yapay Zeka Müfredatı',
    defaultDesc: 'Data Science & AI müfredatlarımızı güncel sektör standartlarına çıkardık.',
  },
  {
    year: '2026',
    titleKey: 'event4Title',
    descKey: 'event4Desc',
    defaultTitle: 'Küresel Partnerlikler',
    defaultDesc: '50+ teknoloji devi ile doğrudan istihdam anlaşmaları imzaladık.',
  },
];

// Mock Partner Logoları
const partnerLogos = ['TechCorp', 'CloudScale', 'DataMind', 'NextGen', 'DevMatrix', 'CyberShield'];

export default function AboutPage({ params }: AboutPageProps) {
  const { locale } = use(params);
  const routeParams = useParams();
  const currentLocale = (routeParams?.locale as string) || locale || 'tr';
  const { t, i18n } = useTranslation('common');

  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  // İstatistik Etiketleri ve Değerleri
  const stats = [
    { label: t('aboutPage.stats.graduates', { defaultValue: 'Mezun Öğrenci' }), value: '1,500+' },
    {
      label: t('aboutPage.stats.employmentRate', { defaultValue: 'İşe Yerleşme Oranı' }),
      value: '%94',
    },
    { label: t('aboutPage.stats.partners', { defaultValue: 'Partner Şirket' }), value: '50+' },
    { label: t('aboutPage.stats.instructors', { defaultValue: 'Eğitmen Kadrosu' }), value: '25+' },
  ];

  return (
    <div className="container mx-auto px-4 py-8 md:py-12 space-y-16 max-w-7xl">
      {/* 1. SECTION: Misyon (Mission Section) */}
      <section className="text-center space-y-4 max-w-3xl mx-auto">
        <Badge variant="neutral" className="uppercase tracking-widest text-xs px-3 py-1">
          {t('aboutPage.badge', { defaultValue: 'Misyonumuz & Vizyonumuz' })}
        </Badge>
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {t('aboutPage.title', { defaultValue: 'Geleceğin Teknoloji Liderlerini Yetiştiriyoruz' })}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
          {t('aboutPage.missionText', {
            defaultValue:
              'Werhere IT olarak amacımız; teorik bilginin ötesine geçerek pratik, proje odaklı ve güncel müfredatlarla bireyleri küresel teknoloji pazarına tam donanımlı hazırlamaktır.',
          })}
        </p>
      </section>

      {/* 2. SECTION: İstatistikler (Stats Grid) */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, i) => (
          <Card key={i} className="border-border/60 bg-card/50 text-center p-6 shadow-xs">
            <CardContent className="p-0 space-y-1">
              <div className="text-3xl sm:text-4xl font-extrabold text-primary">{stat.value}</div>
              <div className="text-xs sm:text-sm text-muted-foreground font-medium">
                {stat.label}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      {/* 3. SECTION: Takım ve Eğitmen Kadrosu (Team/Instructor Grid) */}
      <section className="space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t('aboutPage.teamTitle', { defaultValue: 'Eğitmen ve Uzman Kadromuz' })}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
            {t('aboutPage.teamSubtitle', {
              defaultValue:
                'Sektörün mutfağından gelen tecrübeli mühendisler ve liderlerle çalışın.',
            })}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {teamMembers.map((member, i) => (
            <Card
              key={i}
              className="overflow-hidden border-border/50 bg-card group hover:shadow-md transition-all"
            >
              <div className="relative h-56 w-full bg-muted overflow-hidden">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardContent className="p-5 space-y-2">
                <h3 className="font-bold text-lg text-foreground leading-snug">{member.name}</h3>
                <p className="text-xs font-semibold text-primary">{member.role}</p>
                <p className="text-xs text-muted-foreground leading-relaxed pt-1">
                  {t(`aboutPage.bios.${member.bioKey}`, { defaultValue: member.defaultBio })}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* 4. SECTION: Şirket Zaman Çizelgesi (Company Timeline) */}
      <section className="space-y-8 max-w-4xl mx-auto">
        <div className="text-center space-y-2">
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground">
            {t('aboutPage.timelineTitle', { defaultValue: 'Yolculuğumuz' })}
          </h2>
          <p className="text-sm text-muted-foreground">
            {t('aboutPage.timelineSubtitle', {
              defaultValue: 'Kuruluşumuzdan bu yana attığımız kilometre taşları.',
            })}
          </p>
        </div>

        <div className="relative border-l-2 border-primary/30 ml-4 sm:ml-32 space-y-8 py-2">
          {timelineEvents.map((event, i) => (
            <div key={i} className="relative pl-6 sm:pl-8 group">
              <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary transition-colors" />

              <div className="sm:absolute sm:-left-32 sm:top-0 sm:w-24 sm:text-right font-bold text-primary text-sm sm:text-base mb-1 sm:mb-0">
                {event.year}
              </div>

              <div className="bg-card border border-border/50 p-4 rounded-xl shadow-xs space-y-1">
                <h4 className="font-bold text-base text-foreground">
                  {t(`aboutPage.timeline.${event.titleKey}`, { defaultValue: event.defaultTitle })}
                </h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  {t(`aboutPage.timeline.${event.descKey}`, { defaultValue: event.defaultDesc })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. SECTION: Partner Logoları (Partner Logos Grid) */}
      <section className="space-y-6 pt-6 border-t border-border/40">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {t('aboutPage.partnersTitle', {
              defaultValue: 'Mezunlarımızın Çalıştığı ve Güvendiği Şirketler',
            })}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 items-center">
          {partnerLogos.map((logo, i) => (
            <div
              key={i}
              className="flex items-center justify-center p-4 rounded-lg bg-card/60 border border-border/40 text-muted-foreground font-bold text-sm hover:text-foreground hover:border-border transition-colors select-none"
            >
              {logo}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
