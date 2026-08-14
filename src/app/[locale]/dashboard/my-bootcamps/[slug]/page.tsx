'use client';

import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { mockEnrollments } from '@/data/mock-enrollment';
import { mockBootcamps } from '@/data/bootcamps';
import { mockCohorts } from '@/data/cohorts';
import { CohortCountdown } from '@/components/schedule/cohort-countdown';
import { BootcampCurriculum } from '@/components/bootcamps/bootcamp-curriculum';
import { Skeleton } from '@/components/ui/skeleton';

interface MyBootcampDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export default function MyBootcampDetailPage({ params }: MyBootcampDetailPageProps) {
  const { slug } = use(params);
  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const enrollment = mockEnrollments.find((enr) => enr.bootcampSlug === slug);
  const bootcamp = mockBootcamps.find((b) => b.slug === slug);
  const cohort = enrollment ? mockCohorts.find((c) => c.id === enrollment.cohortId) : undefined;

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <div>
          <Skeleton className="h-8 w-72" />
          <Skeleton className="mt-2 h-4 w-32" />
          <Skeleton className="mt-2 h-2 w-full max-w-md rounded-full" />
        </div>
        <Skeleton className="h-28 w-full rounded-xl" />
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  // Kayıtlı olmadığın ya da bootcamp bulunamadığı bir slug'a girmeye çalışırsan 404
  if (!enrollment || !bootcamp) {
    notFound();
  }

  const curriculumWithProgress = bootcamp.curriculum.map((module) => {
    const progress = enrollment.moduleProgress.find((mp) => mp.moduleTitle === module.title);
    return { ...module, completed: progress?.completed ?? false };
  });

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-heading text-2xl font-bold">{bootcamp.title}</h1>
        <p className="mt-1 text-muted">
          {t('dashboard.bootcampDetail.progress', { defaultValue: 'İlerlemeniz' })}: %
          {enrollment.progressPercent}
        </p>
        <div className="mt-2 h-2 w-full max-w-md rounded-full bg-muted">
          <div
            className="h-2 rounded-full bg-primary transition-all"
            style={{ width: `${enrollment.progressPercent}%` }}
          />
        </div>
      </div>

      {cohort && <CohortCountdown targetDate={cohort.startDate} bootcampTitle={bootcamp.title} />}

      <BootcampCurriculum curriculum={curriculumWithProgress} />
    </div>
  );
}
