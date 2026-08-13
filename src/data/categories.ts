import type { Category } from '@/types';

/**
 * @file src/data/categories.ts
 * @description Kategori mock verisi. `defaultName` TR fallback'tir;
 * gösterim anında `t(\`categories.${slug}.name\`, { defaultValue: defaultName })`
 * ile çözülür (bkz. timelineEvents.ts pattern'i).
 */
export const mockCategories: Category[] = [
  { slug: 'frontend', defaultName: 'Frontend Geliştirme', icon: 'code', courseCount: 4 },
  { slug: 'backend', defaultName: 'Backend Geliştirme', icon: 'server', courseCount: 3 },
  { slug: 'fullstack', defaultName: 'Fullstack Geliştirme', icon: 'layers', courseCount: 2 },
  { slug: 'devops', defaultName: 'DevOps & Bulut', icon: 'cloud', courseCount: 1 },
  { slug: 'mobile', defaultName: 'Mobil Geliştirme', icon: 'smartphone', courseCount: 1 },
  { slug: 'data', defaultName: 'Veri Bilimi & Yapay Zeka', icon: 'database', courseCount: 1 },
  { slug: 'cybersecurity', defaultName: 'Siber Güvenlik', icon: 'shield', courseCount: 1 },
  { slug: 'uiux', defaultName: 'UI/UX Tasarım', icon: 'layout', courseCount: 1 },
];
