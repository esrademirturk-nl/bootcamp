/**
 * @file src/app/robots.ts
 * @description G-01 kriteri: build-time /robots.txt üretimi (Next.js App Router konvansiyonu).
 *
 * `/styleguide` (iç kullanım için, tasarım sistemi referansı — son kullanıcıya
 * yönelik değil) üç dilde de arama motorlarına kapatılıyor.
 */

import type { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://bootcamp-three-chi.vercel.app';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/styleguide', '/en/styleguide', '/nl/styleguide'],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
