import type { Feature } from '@/types';

/**
 * @file src/data/features.ts
 * @description Özellik (feature) mock verisi. Başlık/açıklama artık i18n
 * key + defaultValue mantığıyla çözülüyor (bkz. timelineEvents.ts pattern'i).
 * `titleKey`/`descriptionKey` -> public/locales/{lng}/common.json içindeki
 * `features.<id>.title` / `features.<id>.description` anahtarlarına karşılık
 * gelir. `defaultTitle`/`defaultDescription` sadece TR fallback amaçlıdır.
 */
export const features: Feature[] = [
  {
    id: 'expert-instructors',
    icon: 'users',
    titleKey: 'expertInstructors.title',
    descriptionKey: 'expertInstructors.description',
    defaultTitle: 'Uzman Eğitmenler',
    defaultDescription: 'Sektörde aktif çalışan deneyimli profesyonellerden birebir öğrenin.',
  },
  {
    id: 'hands-on-projects',
    icon: 'code-2',
    titleKey: 'handsOnProjects.title',
    descriptionKey: 'handsOnProjects.description',
    defaultTitle: 'Uygulamalı Projeler',
    defaultDescription: 'Gerçek dünya senaryolarına dayalı projelerle portföyünüzü güçlendirin.',
  },
  {
    id: 'flexible-schedule',
    icon: 'calendar',
    titleKey: 'flexibleSchedule.title',
    descriptionKey: 'flexibleSchedule.description',
    defaultTitle: 'Esnek Program',
    defaultDescription: 'Online, hibrit veya yüz yüze seçenekleriyle kendi temponuzda ilerleyin.',
  },
  {
    id: 'career-support',
    icon: 'briefcase',
    titleKey: 'careerSupport.title',
    descriptionKey: 'careerSupport.description',
    defaultTitle: 'Kariyer Desteği',
    defaultDescription: 'CV danışmanlığı, mülakat hazırlığı ve iş görüşmesi eşleştirmesi.',
  },
  {
    id: 'community',
    icon: 'users-round',
    titleKey: 'community.title',
    descriptionKey: 'community.description',
    defaultTitle: 'Güçlü Topluluk',
    defaultDescription: 'Mezunlar ve öğrencilerden oluşan aktif bir networke katılın.',
  },
  {
    id: 'certification',
    icon: 'award',
    titleKey: 'certification.title',
    descriptionKey: 'certification.description',
    defaultTitle: 'Sertifikasyon',
    defaultDescription: 'Program sonunda sektörde tanınan bir tamamlama sertifikası kazanın.',
  },
];
