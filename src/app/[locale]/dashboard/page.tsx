'use client';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { mockEnrollments } from '@/data/mock-enrollment';
import { mockBootcamps } from '@/data/bootcamps';
import { mockCohorts } from '@/data/cohorts';
import { CohortCountdown } from '@/components/schedule/cohort-countdown';
import { Skeleton } from '@/components/ui/skeleton';

export default function DashboardOverviewPage() {
  const { t } = useTranslation('common');

  // Gerçek bir API çağrısı olmadığı için, veri "yükleniyormuş" hissi vermek adına
  // kısa bir mock loading state simüle ediyoruz.
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const upcomingCohort = mockEnrollments
    .map((enr) => {
      const cohort = mockCohorts.find((c) => c.id === enr.cohortId);
      const bootcamp = mockBootcamps.find((b) => b.slug === enr.bootcampSlug);
      return { enrollment: enr, cohort, bootcamp };
    })
    .filter((item) => item.cohort && new Date(item.cohort.startDate) > new Date())
    .sort(
      (a, b) => new Date(a.cohort!.startDate).getTime() - new Date(b.cohort!.startDate).getTime()
    )[0];

  if (isLoading) {
    return (
      <div className="flex flex-col gap-8">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-28 w-full rounded-xl" />
        <div>
          <Skeleton className="mb-4 h-6 w-40" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
            <Skeleton className="h-28 w-full rounded-xl" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      <h1 className="font-heading text-2xl font-bold">
        {t('dashboard.overview.title', { defaultValue: 'Genel Bakış' })}
      </h1>

      {upcomingCohort?.cohort && upcomingCohort.bootcamp && (
        <CohortCountdown
          targetDate={upcomingCohort.cohort.startDate}
          bootcampTitle={upcomingCohort.bootcamp.title}
        />
      )}

      <section>
        <h2 className="mb-4 font-heading text-xl font-semibold">
          {t('dashboard.overview.myProgress', { defaultValue: 'İlerleme Durumum' })}
        </h2>

        {mockEnrollments.length === 0 ? (
          <p className="text-muted">
            {t('dashboard.overview.empty', {
              defaultValue: 'Henüz kayıtlı olduğunuz bir bootcamp yok.',
            })}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {mockEnrollments.map((enrollment) => {
              const bootcamp = mockBootcamps.find((b) => b.slug === enrollment.bootcampSlug);
              if (!bootcamp) return null;

              return (
                <div
                  key={enrollment.id}
                  className="rounded-xl border border-border bg-card p-5 shadow-sm"
                >
                  <h3 className="font-semibold text-foreground line-clamp-1">{bootcamp.title}</h3>
                  <div className="mt-3 h-2 w-full rounded-full bg-muted">
                    <div
                      className="h-2 rounded-full bg-primary transition-all"
                      style={{ width: `${enrollment.progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-2 text-sm text-muted">
                    %{enrollment.progressPercent} tamamlandı
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
