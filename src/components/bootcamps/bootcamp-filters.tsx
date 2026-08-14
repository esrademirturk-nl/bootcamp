/**
 * @file src/components/bootcamps/bootcamp-filters.tsx
 * @description Arama, Kategori, Seviye ve Sıralama Filtreleme Paneli.
 *
 * Bu dosya ne iş yapar?
 * 1. URL parametrelerinden aktif dili (`locale`) okur.
 * 2. Merkezi next-i18next sistemi (`useT`) üzerinden filtre etiket ve
 *    seçeneklerini seçili dilde (TR/EN/NL) dinamik gösterir. Daha önce bu
 *    bileşen kendi lokal `dict` nesnesini kullanıyordu — proje genelindeki
 *    `common.json` dosyalarıyla içerik olarak neredeyse birebir çakışıyordu
 *    (bkz. `bootcampsPage.*`, `sortOptions.*`, `levelOptions.*`). Artık tek
 *    kaynaktan besleniyor.
 */

'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useT } from 'next-i18next/client';
import { Category } from '@/types';
import { mockBootcamps } from '@/data/bootcamps';
import { getCategoryCourseCount } from '@/lib/resolve-mock-data';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

interface BootcampFiltersProps {
  categories: Category[];
}

export const BootcampFilters: React.FC<BootcampFiltersProps> = ({ categories }) => {
  const { t } = useT('common');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('q') || '';
  const currentCategories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
  const currentLevel = searchParams.get('level') || 'all';
  const currentSort = searchParams.get('sort') || 'popularity';

  const updateQueryParams = (key: string, value: string | null) => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParams('q', e.target.value || null);
  };

  const handleCategoryChange = (slug: string, checked: boolean) => {
    let updated = [...currentCategories];
    if (checked) {
      updated.push(slug);
    } else {
      updated = updated.filter((item) => item !== slug);
    }
    updateQueryParams('categories', updated.length > 0 ? updated.join(',') : null);
  };

  const handleLevelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    updateQueryParams('level', val === 'all' ? null : val);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQueryParams('sort', e.target.value === 'popularity' ? null : e.target.value);
  };

  const handleClearFilters = () => {
    startTransition(() => {
      router.push(pathname, { scroll: false });
    });
  };

  const hasActiveFilters =
    currentSearch ||
    currentCategories.length > 0 ||
    currentLevel !== 'all' ||
    currentSort !== 'popularity';

  return (
    <div className="space-y-6 bg-card p-5 rounded-xl border border-border/60 shadow-sm">
      {/* 1. Arama Kutusu */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t('bootcampsPage.searchLabel', { defaultValue: 'Arama' })}
        </label>
        <Input
          type="text"
          placeholder={t('bootcampsPage.filterSearchPlaceholder', {
            defaultValue: 'Bootcamp veya teknoloji ara...',
          })}
          value={currentSearch}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      {/* 2. Sıralama Seçimi (Sort By) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t('bootcampsPage.sortLabel', { defaultValue: 'Sırala' })}
        </label>
        <Select value={currentSort} onChange={handleSortChange} className="w-full">
          <option value="popularity">
            {t('sortOptions.popularity', { defaultValue: 'Popülerlik' })}
          </option>
          <option value="price-asc">
            {t('sortOptions.priceAsc', { defaultValue: 'Fiyat: Düşükten Yükseğe' })}
          </option>
          <option value="price-desc">
            {t('sortOptions.priceDesc', { defaultValue: 'Fiyat: Yüksekten Düşüğe' })}
          </option>
          <option value="duration">
            {t('sortOptions.duration', { defaultValue: 'Süreye Göre' })}
          </option>
        </Select>
      </div>

      {/* 3. Seviye Filtresi (Level) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t('bootcampsPage.levelLabel', { defaultValue: 'Seviye' })}
        </label>
        <Select value={currentLevel} onChange={handleLevelChange} className="w-full">
          <option value="all">{t('levelOptions.all', { defaultValue: 'Tüm Seviyeler' })}</option>
          <option value="beginner">
            {t('levelOptions.beginner', { defaultValue: 'Başlangıç' })}
          </option>
          <option value="intermediate">
            {t('levelOptions.intermediate', { defaultValue: 'Orta Seviye' })}
          </option>
          <option value="advanced">
            {t('levelOptions.advanced', { defaultValue: 'İleri Seviye' })}
          </option>
        </Select>
      </div>

      {/* 4. Kategori Filtresi */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          {t('bootcampsPage.categoriesLabel', { defaultValue: 'Kategoriler' })}
        </label>
        <div className="space-y-2 max-h-48 overflow-y-auto pr-2">
          {categories.map((cat) => {
            const isChecked = currentCategories.includes(cat.slug);
            return (
              <div key={cat.slug} className="flex items-center space-x-2">
                <Checkbox
                  id={`cat-${cat.slug}`}
                  checked={isChecked}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleCategoryChange(cat.slug, e.target.checked)
                  }
                />
                <label
                  htmlFor={`cat-${cat.slug}`}
                  className="text-sm text-muted-foreground hover:text-foreground cursor-pointer select-none"
                >
                  {t(`categories.${cat.slug}.name`, { defaultValue: cat.defaultName })} (
                  {getCategoryCourseCount(cat.slug, mockBootcamps)})
                </label>
              </div>
            );
          })}
        </div>
      </div>

      {/* Filtreleri Temizle Butonu */}
      {hasActiveFilters && (
        <Button
          variant="secondary"
          size="sm"
          onClick={handleClearFilters}
          className="w-full text-xs"
        >
          {t('bootcampsPage.clearFilters', { defaultValue: 'Filtreleri Temizle' })}
        </Button>
      )}

      {isPending && <p className="text-xs text-muted-foreground animate-pulse text-center">...</p>}
    </div>
  );
};
