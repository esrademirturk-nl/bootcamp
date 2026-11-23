import type { TimelineEvent } from '@/types';
// Mock Şirket Zaman Çizelgesi
export const timelineEvents: TimelineEvent[] = [
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
