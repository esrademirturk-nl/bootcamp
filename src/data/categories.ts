import type { Category } from '@/types';

/**
 * @file src/data/categories.ts
 * @description Kategori mock verisi. `defaultName` TR fallback'tir;
 * gösterim anında `t(\`categories.${slug}.name\`, { defaultValue: defaultName })`
 * ile çözülür (bkz. timelineEvents.ts pattern'i).
 */
export const mockCategories: Category[] = [
  { slug: 'frontend', defaultName: 'Frontend Geliştirme', icon: 'code' },
  { slug: 'backend', defaultName: 'Backend Geliştirme', icon: 'server' },
  { slug: 'fullstack', defaultName: 'Fullstack Geliştirme', icon: 'layers' },
  { slug: 'devops', defaultName: 'DevOps & Bulut', icon: 'cloud' },
  { slug: 'mobile', defaultName: 'Mobil Geliştirme', icon: 'smartphone' },
  { slug: 'data', defaultName: 'Veri Bilimi & Yapay Zeka', icon: 'database' },
  { slug: 'cybersecurity', defaultName: 'Siber Güvenlik', icon: 'shield' },
  { slug: 'uiux', defaultName: 'UI/UX Tasarım', icon: 'layout' },
];
