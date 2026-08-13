/**
 * @file src/lib/resolve-mock-data.ts
 * @description Mock data dosyalarındaki (key + defaultValue) çiftlerini
 * gerçek çevrilmiş metinlere dönüştüren yardımcı fonksiyonlar. Bootcamp
 * verisi birden fazla yerde (featured-programs, bootcamps listesi, bootcamp
 * detay sayfası) tüketildiği için çözümleme mantığı burada tek yerde
 * tutulur (bkz. features/pricing/instructors/testimonials'daki inline
 * çözümleme pattern'i).
 */

import type { TFunction } from 'i18next';
import type { Bootcamp, ResolvedBootcamp } from '@/types';

export function resolveBootcamp(bootcamp: Bootcamp, t: TFunction): ResolvedBootcamp {
  return {
    ...bootcamp,
    title: t(`bootcamps.${bootcamp.slug}.title`, { defaultValue: bootcamp.defaultTitle }),
    shortDescription: t(`bootcamps.${bootcamp.slug}.shortDescription`, {
      defaultValue: bootcamp.defaultShortDescription,
    }),
    description: t(`bootcamps.${bootcamp.slug}.description`, {
      defaultValue: bootcamp.defaultDescription,
    }),
    curriculum: bootcamp.curriculum.map((module) => ({
      ...module,
      title: t(`bootcamps.${bootcamp.slug}.curriculum.${module.titleKey}`, {
        defaultValue: module.defaultTitle,
      }),
    })),
  };
}
