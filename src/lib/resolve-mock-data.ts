/**
 * @file src/lib/resolve-mock-data.ts
 * @description Mock data dosyalarındaki (key + defaultValue) çiftlerini
 * gerçek çevrilmiş metinlere dönüştüren yardımcı fonksiyonlar. Bootcamp ve
 * kategori verisi birden fazla yerde (featured-programs, bootcamps listesi,
 * bootcamp detay sayfası, filtreler) tüketildiği için çözümleme mantığı
 * burada tek yerde tutulur (bkz. features/pricing/instructors/
 * testimonials'daki inline çözümleme pattern'i).
 */

import type { TFunction } from 'i18next';
import type { Bootcamp, Category, ResolvedBootcamp } from '@/types';

export function resolveCategoryName(category: Category, t: TFunction): string {
  return t(`categories.${category.slug}.name`, { defaultValue: category.defaultName });
}

/**
 * Bir kategoriye ait bootcamp sayısını gerçek zamanlı hesaplar. categories.ts
 * eskiden bu sayıyı elle (courseCount alanı olarak) tutuyordu; bootcamps.ts
 * değiştikçe bu sayı senkron dışı kalıyordu (örn. 'frontend' için 4 yazıyordu,
 * gerçek sayı 3'tü). Artık tek doğruluk kaynağı mockBootcamps'in kendisi.
 */
export function getCategoryCourseCount(categorySlug: string, bootcamps: Bootcamp[]): number {
  return bootcamps.filter((bootcamp) => bootcamp.categorySlug === categorySlug).length;
}

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
