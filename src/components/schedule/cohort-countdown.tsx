/**
 * @file src/components/schedule/cohort-countdown.tsx
 * @description Yaklaşan en yakın kohort için canlı geri sayım sayacı (Live Countdown) bileşeni.
 * Sayfa açık olduğu sürece her saniye güncellenir.
 * Hedef tarih geçmişse "Başladı" durumunu gösterir (Negative countdown vermez).
 */

'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * @interface CohortCountdownProps
 * @property {string} targetDate - Hedef başlangıç tarihi (ISO formatında string, örn: "2026-09-01T09:00:00Z")
 * @property {string} bootcampTitle - İlgili kohortun bağlandığı bootcamp başlığı
 */
interface CohortCountdownProps {
  targetDate: string;
  bootcampTitle: string;
}

/**
 * @interface TimeLeft
 * @description Kalan zaman değerlerini tutar.
 */
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPassed: boolean;
}

/**
 * @function calculateTimeLeft
 * @description Verilen ISO tarihine kadar olan süreyi gün, saat, dakika ve saniye olarak hesaplar.
 * Tarih geçmişse `isPassed: true` döner.
 */
function calculateTimeLeft(dateStr: string): TimeLeft {
  const difference = +new Date(dateStr) - +new Date();

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPassed: true };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
    isPassed: false,
  };
}

/**
 * @function CohortCountdown
 * @description Canlı geri sayım sayacı bileşeni.
 */
export const CohortCountdown: React.FC<CohortCountdownProps> = ({ targetDate, bootcampTitle }) => {
  const { t } = useTranslation('common');

  // SSR / Client hydration uyumsuzluğunu önlemek için mount kontrolü
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate));

  useEffect(() => {
    setIsMounted(true);

    // Her 1 saniyede (1000ms) kalan süreyi hesaplayan zamanlayıcı
    const timer = setInterval(() => {
      const updated = calculateTimeLeft(targetDate);
      setTimeLeft(updated);

      if (updated.isPassed) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!isMounted) {
    return (
      <div className="w-full rounded-xl border border-border bg-card p-6 shadow-sm">
        <div className="h-20 animate-pulse bg-muted rounded-md" />
      </div>
    );
  }

  return (
    <div className="w-full rounded-xl border border-primary/20 bg-gradient-to-r from-primary/10 via-background to-secondary/10 p-6 shadow-md dark:border-primary/30">
      <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
        {/* Sol Taraf: Bilgilendirme Metni */}
        <div className="text-center md:text-left">
          <span className="inline-block rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
            🚀 {t('countdown.nextCohortTag', { defaultValue: 'En Yakın Kohort' })}
          </span>
          <h2 className="mt-1 text-xl font-bold text-foreground md:text-2xl">{bootcampTitle}</h2>
          <p className="text-sm text-muted-foreground">
            {timeLeft.isPassed
              ? t('countdown.startedDesc', {
                  defaultValue: 'Bu kohort için kayıtlar tamamlandı ve eğitim başladı.',
                })
              : t('countdown.remainingDesc', { defaultValue: 'Eğitimin başlamasına kalan süre:' })}
          </p>
        </div>

        {/* Sağ Taraf: Canlı Sayaç Kutusu */}
        {timeLeft.isPassed ? (
          /* Tarih geçmişse gösterilecek durum (Started state) */
          <div className="rounded-lg bg-amber-500/10 px-6 py-3 text-amber-600 dark:text-amber-400 font-bold border border-amber-500/20">
            ▶️ {t('countdown.startedBadge', { defaultValue: 'Program Başladı' })}
          </div>
        ) : (
          /* Aktif Canlı Sayı Kutucukları (Days / Hours / Minutes / Seconds) */
          <div className="grid grid-cols-4 gap-2 text-center md:gap-4">
            {/* Gün */}
            <div className="flex flex-col rounded-lg bg-card p-2 min-w-[65px] border border-border shadow-xs">
              <span className="text-2xl font-extrabold text-primary md:text-3xl">
                {String(timeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground">
                {t('countdown.days', { defaultValue: 'Gün' })}
              </span>
            </div>

            {/* Saat */}
            <div className="flex flex-col rounded-lg bg-card p-2 min-w-[65px] border border-border shadow-xs">
              <span className="text-2xl font-extrabold text-primary md:text-3xl">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground">
                {t('countdown.hours', { defaultValue: 'Saat' })}
              </span>
            </div>

            {/* Dakika */}
            <div className="flex flex-col rounded-lg bg-card p-2 min-w-[65px] border border-border shadow-xs">
              <span className="text-2xl font-extrabold text-primary md:text-3xl">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground">
                {t('countdown.minutes', { defaultValue: 'Dakika' })}
              </span>
            </div>

            {/* Saniye */}
            <div className="flex flex-col rounded-lg bg-card p-2 min-w-[65px] border border-border shadow-xs">
              <span className="text-2xl font-extrabold text-primary md:text-3xl animate-pulse">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] font-medium uppercase text-muted-foreground">
                {t('countdown.seconds', { defaultValue: 'Saniye' })}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
