import type { Enrollment } from '@/types';

/**
 * @file src/data/mock-enrollment.ts
 * @description Giriş yapmış öğrencinin kayıtlı olduğu bootcamp'leri ve
 * ilerleme durumunu simüle eden mock veri. Gerçek auth/backend yok,
 * dashboard UI'ını doldurmak için kullanılır.
 */

export const mockEnrollments: Enrollment[] = [
  {
    id: 'enr-1',
    bootcampSlug: 'react-nextjs-frontend-bootcamp',
    cohortId: 'coh-1',
    enrolledAt: '2026-08-20T10:00:00Z',
    progressPercent: 65,
    moduleProgress: [
      { moduleTitle: 'Modül 1: TypeScript ve Modern JS', completed: true },
      { moduleTitle: 'Modül 2: Advanced React', completed: true },
      { moduleTitle: 'Modül 3: Next.js App Router', completed: false },
    ],
  },
  {
    id: 'enr-2',
    bootcampSlug: 'zero-to-hero-javascript',
    cohortId: 'coh-5',
    enrolledAt: '2026-08-25T10:00:00Z',
    progressPercent: 20,
    moduleProgress: [
      { moduleTitle: 'Modül 1: Web Temelleri', completed: true },
      { moduleTitle: 'Modül 2: JavaScript Temelleri', completed: false },
    ],
  },
  {
    id: 'enr-3',
    bootcampSlug: 'node-js-microservices-backend',
    cohortId: 'coh-4',
    enrolledAt: '2026-06-15T10:00:00Z',
    progressPercent: 100,
    moduleProgress: [{ moduleTitle: 'Modül 1: REST API Design', completed: true }],
  },
];
