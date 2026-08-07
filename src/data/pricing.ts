import type { PricingPlan } from '@/types';

export const pricingPlans: PricingPlan[] = [
  {
    id: 'self-paced',
    name: 'Kendi Hızında',
    priceEUR: 49,
    period: 'month',
    description: 'Bireysel öğrenciler için esnek, kendi hızında ilerleme imkanı.',
    features: [
      'Tüm kurs içeriklerine erişim',
      'Topluluk forumuna katılım',
      'Aylık grup mentorluk oturumu',
      'Tamamlama sertifikası',
    ],
    highlighted: false,
  },
  {
    id: 'guided-bootcamp',
    name: 'Rehberli Bootcamp',
    priceEUR: 199,
    period: 'month',
    description: 'Canlı derslerle, eğitmen desteğiyle yapılandırılmış öğrenme deneyimi.',
    features: [
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
    name: 'Kurumsal',
    priceEUR: null,
    period: null,
    description: 'Ekipler ve şirketler için özelleştirilmiş eğitim çözümleri.',
    features: [
      'Rehberli Bootcamp planındaki her şey',
      'Özel kohort planlaması',
      'Şirkete özel müfredat',
      'Detaylı ilerleme raporlama',
    ],
    highlighted: false,
  },
];
