/**
 * src/components/bootcamps/bootcamp-search-bar.tsx
 * Sayfa başlığının altında yer alan ana arama kutusu bileşeni.
 * URL query parametrelerini anlık günceller.
 */

'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Input } from '@/components/ui/input';

export const BootcampSearchBar: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [, startTransition] = useTransition();

  const currentSearch = searchParams.get('q') || '';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (val) {
      params.set('q', val);
    } else {
      params.delete('q');
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    });
  };

  return (
    <div className="relative w-full max-w-2xl">
      <Input
        type="text"
        placeholder="Hangi alanda uzmanlaşmak istiyorsunuz? (ör: React, Go, DevOps...)"
        value={currentSearch}
        onChange={handleSearchChange}
        className="w-full h-12 pl-4 pr-10 text-base rounded-xl shadow-sm border-border/80 focus:border-primary"
      />
    </div>
  );
};

export default BootcampSearchBar;