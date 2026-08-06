import type { Category } from '@/types';

export const mockCategories: Category[] = [
  { slug: 'frontend', name: 'Frontend Development', icon: 'code', courseCount: 4 },
  { slug: 'backend', name: 'Backend Development', icon: 'server', courseCount: 3 },
  { slug: 'fullstack', name: 'Fullstack Development', icon: 'layers', courseCount: 2 },
  { slug: 'devops', name: 'DevOps & Cloud', icon: 'cloud', courseCount: 1 },
  { slug: 'mobile', name: 'Mobile Development', icon: 'smartphone', courseCount: 1 },
  { slug: 'data', name: 'Data Science & AI', icon: 'database', courseCount: 1 },
  { slug: 'cybersecurity', name: 'Cyber Security', icon: 'shield', courseCount: 1 },
  { slug: 'uiux', name: 'UI/UX Design', icon: 'layout', courseCount: 1 },
];
