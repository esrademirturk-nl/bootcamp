/**
 * @file src/components/bootcamps/bootcamp-filters.tsx
 * @description Arama, Kategori, Seviye ve Sıralama Filtreleme Paneli.
 * 
 * Bu dosya ne iş yapar?
 * 1. URL parametrelerinden aktif dili (`locale`) okur.
 * 2. Dilden bağımsız olarak filtre etiket ve seçeneklerini anında seçili dilde (TR/EN/NL) dinamik gösterir.
 */

'use client';

import React, { useTransition } from 'react';
import { useRouter, useSearchParams, usePathname, useParams } from 'next/navigation';
import { Category } from '@/types';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Select } from '@/components/ui/select';

// Dinamik Dictionaries (Çeviri Sözlükleri)
const dict = {
  tr: {
    searchLabel: 'Arama',
    searchPlaceholder: 'Bootcamp veya teknoloji ara...',
    sortLabel: 'Sırala',
    levelLabel: 'Seviye',
    categoriesLabel: 'Kategoriler',
    clearFilters: 'Filtreleri Temizle',
    sortOptions: {
      popularity: 'Popülerlik',
      priceAsc: 'Fiyat: Düşükten Yükseğe',
      priceDesc: 'Fiyat: Yüksekten Düşüğe',
      duration: 'Süreye Göre',
    },
    levelOptions: {
      all: 'Tüm Seviyeler',
      beginner: 'Başlangıç (Beginner)',
      intermediate: 'Orta Seviye (Intermediate)',
      advanced: 'İleri Seviye (Advanced)',
    },
  },
  en: {
    searchLabel: 'Search',
    searchPlaceholder: 'Search bootcamp or technology...',
    sortLabel: 'Sort By',
    levelLabel: 'Level',
    categoriesLabel: 'Categories',
    clearFilters: 'Clear Filters',
    sortOptions: {
      popularity: 'Popularity',
      priceAsc: 'Price: Low to High',
      priceDesc: 'Price: High to Low',
      duration: 'Duration',
    },
    levelOptions: {
      all: 'All Levels',
      beginner: 'Beginner',
      intermediate: 'Intermediate',
      advanced: 'Advanced',
    },
  },
  nl: {
    searchLabel: 'Zoeken',
    searchPlaceholder: 'Zoek bootcamp of technologie...',
    sortLabel: 'Sorteren op',
    levelLabel: 'Niveau',
    categoriesLabel: 'Categorieën',
    clearFilters: 'Filters Wis',
    sortOptions: {
      popularity: 'Populariteit',
      priceAsc: 'Prijs: Laag naar Hoog',
      priceDesc: 'Prijs: Hoog naar Laag',
      duration: 'Duur',
    },
    levelOptions: {
      all: 'Alle Niveaus',
      beginner: 'Beginnersniveau',
      intermediate: 'Gemiddeld Niveau',
      advanced: 'Gevorderd Niveau',
    },
  },
};

interface BootcampFiltersProps {
  categories: Category[];
}

export const BootcampFilters: React.FC<BootcampFiltersProps> = ({ categories }) => {
  const params = useParams();
  const currentLocale = ((params?.locale as string) || 'tr') as 'tr' | 'en' | 'nl';
  const t = dict[currentLocale] || dict.tr;

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
          {t.searchLabel}
        </label>
        <Input
          type="text"
          placeholder={t.searchPlaceholder}
          value={currentSearch}
          onChange={handleSearchChange}
          className="w-full"
        />
      </div>

      {/* 2. Sıralama Seçimi (Sort By) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t.sortLabel}
        </label>
        <Select value={currentSort} onChange={handleSortChange} className="w-full">
          <option value="popularity">{t.sortOptions.popularity}</option>
          <option value="price-asc">{t.sortOptions.priceAsc}</option>
          <option value="price-desc">{t.sortOptions.priceDesc}</option>
          <option value="duration">{t.sortOptions.duration}</option>
        </Select>
      </div>

      {/* 3. Seviye Filtresi (Level) */}
      <div className="space-y-2">
        <label className="text-sm font-semibold text-foreground">
          {t.levelLabel}
        </label>
        <Select value={currentLevel} onChange={handleLevelChange} className="w-full">
          <option value="all">{t.levelOptions.all}</option>
          <option value="beginner">{t.levelOptions.beginner}</option>
          <option value="intermediate">{t.levelOptions.intermediate}</option>
          <option value="advanced">{t.levelOptions.advanced}</option>
        </Select>
      </div>

      {/* 4. Kategori Filtresi */}
      <div className="space-y-3">
        <label className="text-sm font-semibold text-foreground">
          {t.categoriesLabel}
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
          {t.clearFilters}
        </Button>
      )}

      {isPending && (
        <p className="text-xs text-muted-foreground animate-pulse text-center">
          ...
        </p>
      )}
    </div>
  );
};