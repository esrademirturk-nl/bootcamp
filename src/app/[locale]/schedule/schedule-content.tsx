/**
 * @file src/app/[locale]/schedule/schedule-content.tsx
 * @description D-04 Eğitim Takvimi (Schedule) ve Canlı Kohort Sayacı — client-side içerik.
 * page.tsx'ten ayrıldı ki page.tsx server component olarak generateMetadata
 * export edebilsin ('use client' dosyalar bunu export edemiyor).
 */

'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { mockCohorts } from '@/data/cohorts';
import { mockBootcamps as bootcamps } from '@/data/bootcamps';
import { Bootcamp } from '@/types';
import { CohortCountdown } from '@/components/schedule/cohort-countdown';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
export function ScheduleContent() {
  const routeParams = useParams();
  const currentLocale = (routeParams?.locale as string) || 'tr';

  const { t, i18n } = useTranslation('common');

  React.useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale);
    }
  }, [currentLocale, i18n]);

  const [selectedMonth, setSelectedMonth] = useState<string>('all');

  const getBootcamp = (slug: string): Bootcamp | undefined => {
    return bootcamps.find((b) => b.slug === slug);
  };

  const getBootcampTitle = (bootcamp: Bootcamp): string =>
    t(`bootcamps.${bootcamp.slug}.title`, { defaultValue: bootcamp.defaultTitle });

  // Gelecekteki en yakın kohortu buluyoruz
  const nextCohort = useMemo(() => {
    const now = new Date().getTime();
    const futureCohorts = mockCohorts
      .filter((c) => new Date(c.startDate).getTime() > now)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());

    return futureCohorts[0] || mockCohorts[0];
  }, []);

  const availableMonths = useMemo(() => {
    const monthsSet = new Set<string>();
    mockCohorts.forEach((cohort) => {
      const date = new Date(cohort.startDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      monthsSet.add(monthKey);
    });
    return Array.from(monthsSet).sort();
  }, []);

  const filteredCohorts = useMemo(() => {
    if (selectedMonth === 'all') return mockCohorts;
    return mockCohorts.filter((cohort) => {
      const date = new Date(cohort.startDate);
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return monthKey === selectedMonth;
    });
  }, [selectedMonth]);

  const formatMonthLabel = (monthKey: string) => {
    const [year, month] = monthKey.split('-');
    const date = new Date(parseInt(year), parseInt(month) - 1, 1);
    return date.toLocaleDateString(
      currentLocale === 'tr' ? 'tr-TR' : currentLocale === 'nl' ? 'nl-NL' : 'en-US',
      {
        month: 'long',
        year: 'numeric',
      }
    );
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(
      currentLocale === 'tr' ? 'tr-TR' : currentLocale === 'nl' ? 'nl-NL' : 'en-US',
      {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }
    );
  };

  const nextCohortBootcamp = getBootcamp(nextCohort.bootcampSlug);
  const countdownTitle = nextCohortBootcamp
    ? getBootcampTitle(nextCohortBootcamp)
    : nextCohort.bootcampSlug;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* 1. Sayfa Başlığı ve Açıklama */}
      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl text-foreground">
          {t('schedulePage.title', { defaultValue: 'Eğitim Takvimi & Kohortlar' })}
        </h1>
        <p className="text-muted-foreground text-base max-w-2xl">
          {t('schedulePage.subtitle', {
            defaultValue:
              'Gelecek dönem başlayacak bootcamp programlarımızı inceleyin, kontenjanlar dolmadan yerinizi ayırtın.',
          })}
        </p>
      </div>

      {/* 2. En Yakın Kohort İçin Canlı Sayaç */}
      <section>
        <CohortCountdown targetDate={nextCohort.startDate} bootcampTitle={countdownTitle} />
      </section>

      {/* 3. Aya Göre Filtreleme Butonları */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 border-b border-border pb-4">
          <span className="text-sm font-semibold text-muted-foreground mr-2">
            {t('schedulePage.filterByMonth', { defaultValue: 'Aya Göre Filtrele:' })}
          </span>
          <Button
            variant={selectedMonth === 'all' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setSelectedMonth('all')}
          >
            {t('schedulePage.allPeriods', { defaultValue: 'Tüm Dönemler' })}
          </Button>
          {availableMonths.map((monthKey) => (
            <Button
              key={monthKey}
              variant={selectedMonth === monthKey ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setSelectedMonth(monthKey)}
            >
              {formatMonthLabel(monthKey)}
            </Button>
          ))}
        </div>

        {/* 4. Tablo Görünümü */}
        {filteredCohorts.length === 0 ? (
          <div className="py-12 text-center text-muted-foreground">
            {t('schedulePage.noCohortFound', {
              defaultValue: 'Seçilen döneme ait aktif bir kohort bulunamadı.',
            })}
          </div>
        ) : (
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead className="bg-muted/50 text-xs font-semibold uppercase text-muted-foreground">
                  <tr>
                    <th className="px-6 py-4">Bootcamp</th>
                    <th className="px-6 py-4">Format</th>
                    <th className="px-6 py-4">
                      {t('schedulePage.dateRange', { defaultValue: 'Tarih Aralığı' })}
                    </th>
                    <th className="px-6 py-4">
                      {t('schedulePage.seats', { defaultValue: 'Kontenjan' })}
                    </th>
                    <th className="px-6 py-4">
                      {t('schedulePage.status', { defaultValue: 'Durum' })}
                    </th>
                    <th className="px-6 py-4 text-right">
                      {t('schedulePage.action', { defaultValue: 'Eylem' })}
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {filteredCohorts.map((cohort) => {
                    const bootcamp = getBootcamp(cohort.bootcampSlug);
                    const isPassed = new Date(cohort.startDate).getTime() < new Date().getTime();
                    const isFull = cohort.seatsLeft === 0;
                    const displayName = bootcamp ? getBootcampTitle(bootcamp) : cohort.bootcampSlug;

                    return (
                      <tr key={cohort.id} className="hover:bg-muted/30 transition-colors">
                        {/* Bootcamp Adı */}
                        <td className="px-6 py-4 font-semibold text-foreground">
                          {bootcamp ? (
                            <Link
                              href={`/${currentLocale}/bootcamps/${bootcamp.slug}`}
                              className="hover:text-primary transition-colors"
                            >
                              {displayName}
                            </Link>
                          ) : (
                            displayName
                          )}
                        </td>

                        {/* Format */}
                        <td className="px-6 py-4">
                          <Badge variant="neutral" className="capitalize">
                            {cohort.format}
                          </Badge>
                        </td>

                        {/* Tarih Aralığı */}
                        <td className="px-6 py-4 text-muted-foreground">
                          {formatDate(cohort.startDate)} - {formatDate(cohort.endDate)}
                        </td>

                        {/* Kalan Kontenjan */}
                        <td className="px-6 py-4">
                          {isPassed ? (
                            <span className="text-muted-foreground">-</span>
                          ) : isFull ? (
                            <span className="text-xs font-semibold text-destructive">
                              {t('schedulePage.seatsFull', { defaultValue: 'Kontenjan Doldu' })}
                            </span>
                          ) : (
                            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
                              {t('schedulePage.seatsLeft', {
                                count: cohort.seatsLeft,
                                defaultValue: `Son ${cohort.seatsLeft} Koltuk`,
                              })}
                            </span>
                          )}
                        </td>

                        {/* Durum */}
                        <td className="px-6 py-4">
                          {isPassed ? (
                            <Badge variant="neutral">
                              {t('schedulePage.statusStarted', {
                                defaultValue: 'Devam Ediyor / Başladı',
                              })}
                            </Badge>
                          ) : isFull ? (
                            <Badge variant="error">
                              {t('schedulePage.statusClosed', { defaultValue: 'Kayıtlar Kapalı' })}
                            </Badge>
                          ) : (
                            <Badge variant="success">
                              {t('schedulePage.statusOpen', { defaultValue: 'Kayıt Yapılabilir' })}
                            </Badge>
                          )}
                        </td>

                        {/* Detay / Kayıt Butonu */}
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/${currentLocale}/bootcamps/${bootcamp?.slug || cohort.bootcampSlug}`}
                          >
                            <Button
                              size="sm"
                              disabled={isPassed || isFull}
                              variant={isPassed || isFull ? 'ghost' : 'primary'}
                            >
                              {isPassed
                                ? t('schedulePage.btnInspect', { defaultValue: 'İncele' })
                                : isFull
                                  ? t('schedulePage.btnFull', { defaultValue: 'Dolu' })
                                  : t('schedulePage.btnApply', { defaultValue: 'Başvur' })}
                            </Button>
                          </Link>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
