/**
 * @file src/components/bootcamps/bootcamp-search-bar.tsx
 * @description Ana arama çubuğu bileşeni.
 * 
 * Bu dosya ne iş yapar?
 * Kullanıcının aramak istediği bootcamp/teknoloji kelimesini alıp 
 * URL'deki `q` parametresini günceller. `useTranslation` ile placeholder dilye uyarlanır.
 */

'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { Input } from '@/components/ui/input';

/**
 * @function BootcampSearchBar
 * @description Üst alan arama barı bileşeni.
 */
export function BootcampSearchBar() {
  const { t } = useTranslation('common');
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentQuery = searchParams.get('q') || '';

  /**
   * @function handleSearch
   * @description Arama kutusu değiştikçe URL parametresini yeniler.
   */
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set('q', value);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="w-full">
      <Input
        type="text"
        value={currentQuery}
        onChange={handleSearch}
        placeholder={t('bootcampsPage.searchPlaceholder', {
          defaultValue: 'Hangi alanda uzmanlaşmak istiyorsunuz? (ör: React, Go, DevOps...)',
        })}
        className="w-full h-12 text-base px-4 rounded-xl border-border/80 shadow-sm"
      />
    </div>
  );
};

export default BootcampSearchBar;

