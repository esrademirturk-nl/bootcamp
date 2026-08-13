import type { HowItWorksStep } from '@/types';

/**
 * @file src/data/how-it-works.ts
 * @description Süreç adımları mock verisi. Başlık/açıklama i18n key +
 * defaultValue mantığıyla çözülüyor (bkz. timelineEvents.ts pattern'i).
 * Anahtarlar -> public/locales/{lng}/common.json içindeki
 * `landing.howItWorks.steps.step<N>.title|description`.
 */
export const howItWorksSteps: HowItWorksStep[] = [
  {
    step: 1,
    titleKey: 'step1.title',
    descriptionKey: 'step1.description',
    defaultTitle: 'Başvur',
    defaultDescription:
      "İlgilendiğiniz bootcamp'i seçin ve birkaç dakikada online başvurunuzu tamamlayın.",
  },
  {
    step: 2,
    titleKey: 'step2.title',
    descriptionKey: 'step2.description',
    defaultTitle: 'Görüşme',
    defaultDescription:
      'Ekibimizle kısa bir görüşme yaparak hedeflerinizi ve seviyenizi birlikte değerlendirin.',
  },
  {
    step: 3,
    titleKey: 'step3.title',
    descriptionKey: 'step3.description',
    defaultTitle: 'Kayıt Ol',
    defaultDescription:
      'Size uygun kohortu seçin, ödemenizi tamamlayın ve yerinizi garanti altına alın.',
  },
  {
    step: 4,
    titleKey: 'step4.title',
    descriptionKey: 'step4.description',
    defaultTitle: 'Öğrenmeye Başla',
    defaultDescription:
      'Eğitmenleriniz ve topluluğunuzla birlikte bootcamp yolculuğunuza başlayın.',
  },
];
