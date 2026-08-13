import type { PricingPlan } from '@/types';

/**
 * @file src/data/pricing.ts
 * @description Fiyatlandırma planı mock verisi. name/description/features
 * artık i18n key + defaultValue mantığıyla çözülüyor (bkz. timelineEvents.ts
 * pattern'i). Anahtarlar -> public/locales/{lng}/common.json içindeki
 * `pricingPlans.<id>.name|description|features[]`.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: 'self-paced',
    priceEUR: 49,
    period: 'month',
    defaultName: 'Kendi Hızında',
    defaultDescription: 'Bireysel öğrenciler için esnek, kendi hızında ilerleme imkanı.',
    defaultFeatures: [
      'Tüm kurs içeriklerine erişim',
      'Topluluk forumuna katılım',
      'Aylık grup mentorluk oturumu',
      'Tamamlama sertifikası',
    ],
    highlighted: false,
  },
  {
    id: 'guided-bootcamp',
    priceEUR: 199,
    period: 'month',
    defaultName: 'Rehberli Bootcamp',
    defaultDescription: 'Canlı derslerle, eğitmen desteğiyle yapılandırılmış öğrenme deneyimi.',
    defaultFeatures: [
      'Kendi Hızında planındaki her şey',
      'Haftalık canlı dersler',
      'Birebir eğitmen mentorluğu',
      'Kariyer danışmanlığı ve CV desteği',
      'İş görüşmesi eşleştirmesi',
    ],
    highlighted: true,
  },
  {
    id: 'enterprise',
    priceEUR: null,
    period: null,
    defaultName: 'Kurumsal',
    defaultDescription: 'Ekipler ve şirketler için özelleştirilmiş eğitim çözümleri.',
    defaultFeatures: [
      'Rehberli Bootcamp planındaki her şey',
      'Özel kohort planlaması',
      'Şirkete özel müfredat',
      'Detaylı ilerleme raporlama',
    ],
    highlighted: false,
  },
];
