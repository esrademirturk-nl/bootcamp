'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { mockEnrollments } from '@/data/mock-enrollment';
import { mockBootcamps } from '@/data/bootcamps';
import { Skeleton } from '@/components/ui/skeleton';
import i18nConfig from '../../../../../i18n.config';

interface MyBootcampsPageProps {
  params: Promise<{ locale: string }>;
}

function localizedHref(path: string, locale: string) {
  if (locale === i18nConfig.fallbackLng) return path;
  return `/${locale}${path}`;
}

export default function MyBootcampsPage({ params }: MyBootcampsPageProps) {
  const { locale } = use(params);
  const { t } = useTranslation('common');

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const enrolledBootcamps = mockEnrollments
    .map((enr) => {
      const bootcamp = mockBootcamps.find((b) => b.slug === enr.bootcampSlug);
      return bootcamp ? { bootcamp, enrollment: enr } : null;
    })
    .filter((item): item is NonNullable<typeof item> => item !== null);

  if (isLoading) {
    return (
      <div className="flex flex-col gap-6">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
          <Skeleton className="h-64 w-full rounded-xl" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <h1 className="font-heading text-2xl font-bold">
        {t('dashboard.myBootcamps.title', { defaultValue: 'Bootcamplerim' })}
      </h1>

      {enrolledBootcamps.length === 0 ? (
        <div className="flex flex-col items-center gap-3 rounded-xl border border-dashed border-border p-12 text-center">
          <p className="text-muted">
            {t('dashboard.myBootcamps.empty', {
              defaultValue: 'Henüz kayıtlı olduğunuz bir bootcamp yok.',
            })}
          </p>
          <Link
            href={localizedHref('/bootcamps', locale)}
            className="text-sm font-medium text-primary hover:underline"
          >
            {t('dashboard.myBootcamps.browse', { defaultValue: "Bootcamp'leri Keşfet" })}
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {enrolledBootcamps.map(({ bootcamp, enrollment }) => (
            <Link
              key={bootcamp.slug}
              href={localizedHref(`/dashboard/my-bootcamps/${bootcamp.slug}`, locale)}
              className="block overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="relative h-40 w-full">
                <Image
                  src={bootcamp.heroImage}
                  alt={bootcamp.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-foreground line-clamp-1">{bootcamp.title}</h3>
                <div className="mt-3 h-2 w-full rounded-full bg-muted">
                  <div
                    className="h-2 rounded-full bg-primary transition-all"
                    style={{ width: `${enrollment.progressPercent}%` }}
                  />
                </div>
                <p className="mt-2 text-sm text-muted">
                  %{enrollment.progressPercent}{' '}
                  {t('dashboard.myBootcamps.completed', { defaultValue: 'tamamlandı' })}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
