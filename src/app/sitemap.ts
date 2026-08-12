/**
 * @file src/app/sitemap.ts
 * @description G-01 kriteri: build-time /sitemap.xml üretimi (Next.js App Router konvansiyonu).
 *
 * Üç dil (TR prefixsiz varsayılan, EN/NL prefixli) için tüm statik sayfaları ve
 * her bootcamp'in detay sayfasını (12 bootcamp × 3 dil = 36 URL) listeler.
 * `/styleguide` bilinçli olarak dışarıda bırakıldı — iç kullanım için, arama
 * motorlarına açık olmaması gerekiyor (bkz. robots.ts).
 */

import type { MetadataRoute } from 'next';
import { mockBootcamps } from '@/data/bootcamps';
import i18nConfig from '../../i18n.config';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bootcamp-three-chi.vercel.app';

function localizedPath(path: string, locale: string): string {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path === '/' ? '' : path}`;
}

const STATIC_ROUTES: Array<{
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'];
  priority: number;
}> = [
  { path: '/', changeFrequency: 'daily', priority: 1 },
  { path: '/bootcamps', changeFrequency: 'daily', priority: 0.9 },
  { path: '/schedule', changeFrequency: 'daily', priority: 0.8 },
  { path: '/about', changeFrequency: 'monthly', priority: 0.6 },
  { path: '/contact', changeFrequency: 'monthly', priority: 0.5 },
  { path: '/auth/login', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/auth/register', changeFrequency: 'yearly', priority: 0.3 },
  { path: '/privacy', changeFrequency: 'yearly', priority: 0.2 },
  { path: '/terms', changeFrequency: 'yearly', priority: 0.2 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of i18nConfig.supportedLngs) {
    for (const route of STATIC_ROUTES) {
      entries.push({
        url: `${BASE_URL}${localizedPath(route.path, locale)}`,
        lastModified: now,
        changeFrequency: route.changeFrequency,
        priority: route.priority,
      });
    }

    for (const bootcamp of mockBootcamps) {
      entries.push({
        url: `${BASE_URL}${localizedPath(`/bootcamps/${bootcamp.slug}`, locale)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  return entries;
}
