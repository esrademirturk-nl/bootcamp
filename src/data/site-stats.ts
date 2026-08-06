export interface SiteStat {
  id: 'graduates' | 'employmentRate' | 'partners';
  value: string;
}

// Site geneli istatistikler — dile göre değişmeyen "veri" (gerçek sayılar),
// sadece etiketleri (Mezun / Graduates / Afgestudeerden) i18n dosyalarında.
export const siteStats: SiteStat[] = [
  { id: 'graduates', value: '500+' },
  { id: 'employmentRate', value: '87%' },
  { id: 'partners', value: '40+' },
];
