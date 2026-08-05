/**
 * src/components/bootcamps/bootcamp-filters.tsx
 * Arama, Kategori Çoklu Seçim, Seviye Seçimi ve Sıralama Kontrolleri.
 * R1'in UI bileşen prop'ları ile tam uyumlu hale getirilmiştir.
 */

'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

interface BootcampFiltersProps {
  categories: Category[];
}

export const BootcampFilters: React.FC<BootcampFiltersProps> = ({ categories }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const currentSearch = searchParams.get('q') || '';
  const currentCategories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
  const currentLevel = searchParams.get('level') || 'all';
  const currentSort = searchParams.get('sort') || 'popularity';

  const updateQueryParams = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
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
        <label className="text-sm font-semibold text-foreground">Arama</label>
        <Input
          type="text"
          placeholder="Bootcamp veya teknoloji ara..."
          value={currentSearch}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      {/* 2. Sıralama Seçimi */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">Sırala</label>
        <Select value={currentSort} onChange={handleSortChange} className="w-full">
          <option value="popularity">Popülerlik</option>
          <option value="price-asc">Fiyat: Düşükten Yükseğe</option>
          <option value="price-desc">Fiyat: Yüksekten Düşüğe</option>
          <option value="duration">Süreye Göre</option>
        </Select>
      </div>

      {/* 3. Seviye Filtresi */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">Seviye</label>
        <Select value={currentLevel} onChange={handleLevelChange} className="w-full">
          <option value="all">Tüm Seviyeler</option>
          <option value="beginner">Başlangıç (Beginner)</option>
          <option value="intermediate">Orta Seviye (Intermediate)</option>
          <option value="advanced">İleri Seviye (Advanced)</option>
        </Select>
      </div>

      {/* 4. Kategori Filtresi (Standard HTML Checkbox uyumu) */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">Kategoriler</label>
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
                  {cat.name} ({cat.courseCount})
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
          Filtreleri Temizle
        </Button>
      )}

      {isPending && (
        <p className="text-xs text-muted-foreground animate-pulse text-center">
          Güncelleniyor...
        </p>
      )}
    </div>
  );
};