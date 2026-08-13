import type { Instructor } from '@/types';

/**
 * @file src/data/instructors.ts
 * @description Eğitmen mock verisi. `defaultBio` TR fallback'tir; gösterim
 * anında `t(\`instructors.${slug}.bio\`, { defaultValue: defaultBio })` ile
 * çözülür (bkz. timelineEvents.ts pattern'i). `name`/`title`/`company` özel
 * isim / sektör unvanı olduğu için bilinçli olarak çevrilmez.
 */
export const mockInstructors: Instructor[] = [
  {
    slug: 'ahmet-yilmaz',
    name: 'Ahmet Yılmaz',
    title: 'Principal Frontend Engineer',
    defaultBio: '10+ yıllık Web Teknolojileri tecrübesi, eski Spotify geliştiricisi.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400',
    company: 'TechCorp',
  },
  {
    slug: 'elena-rodriguez',
    name: 'Elena Rodriguez',
    title: 'Lead Cloud Architect',
    defaultBio: 'AWS Certified Solutions Architect ve DevOps tutkunu.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400',
    company: 'CloudScale',
  },
  {
    slug: 'can-ozkan',
    name: 'Can Özkan',
    title: 'Senior Backend Developer',
    defaultBio: 'Go ve Distributed Systems uzmanı.',
    avatar: 'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=400',
    company: 'FinTech Labs',
  },
  {
    slug: 'sarah-jenkins',
    name: 'Sarah Jenkins',
    title: 'Staff UI/UX Designer',
    defaultBio: 'Kullanıcı odaklı tasarım sistemleri uzmanı.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400',
    company: 'DesignWorks',
  },
  {
    slug: 'mehmet-kaya',
    name: 'Mehmet Kaya',
    title: 'AI & Data Specialist',
    defaultBio: 'Python ve Machine Learning konularında akademik ve sektörel deneyim.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400',
    company: 'AI Tech',
  },
  {
    slug: 'zeynep-iron',
    name: 'Zeynep Demir',
    title: 'Mobile App Developer',
    defaultBio: 'React Native ve iOS native uygulama geliştiricisi.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400',
    company: 'AppStudio',
  },
];
