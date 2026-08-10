export interface SiteStat {
  id: 'graduates' | 'employmentRate' | 'partners';
  targetValue: number;
  suffix: string;
}

// Site geneli istatistikler — dile göre değişmeyen "veri" (gerçek sayılar),
// sadece etiketleri (Mezun / Graduates / Afgestudeerden) i18n dosyalarında.
export const siteStats: SiteStat[] = [
  { id: 'graduates', targetValue: 500, suffix: '+' },
  { id: 'employmentRate', targetValue: 87, suffix: '%' },
  { id: 'partners', targetValue: 40, suffix: '+' },
];
