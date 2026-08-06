export type Level = 'beginner' | 'intermediate' | 'advanced';
export type Format = 'online' | 'hybrid' | 'onsite';

export interface Category {
  slug: string;
  name: string;
  icon: string;
  courseCount: number;
}

export interface CurriculumModule {
  title: string;
  durationHours: number;
  lessons: string[];
}

export interface Bootcamp {
  slug: string;
  title: string;
  categorySlug: string;
  level: Level;
  format: Format;
  durationWeeks: number;
  languages: string[];
  priceEUR: number;
  rating: number;
  studentCount: number;
  shortDescription: string;
  description: string;
  heroImage: string;
  tags: string[];
  curriculum: CurriculumModule[];
  instructorSlug: string;
  featured: boolean;
=======
export interface Stat {
  id: string;
  value: number;
  suffix: string;
  label: string;
}
