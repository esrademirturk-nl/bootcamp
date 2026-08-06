/**
 * src/app/[locale]/bootcamps/page.tsx
 * Bootcamp Liste Sayfası (R3).
 * Filtreleme, arama, sıralama, sonuç sayısı göstergesi, skeleton loading
 * ve empty state mantığını bir arada yürütür.
 */

import React, { Suspense } from 'react';
import { bootcamps } from '@/data/bootcamps';
import { categories } from '@/data/categories';
import { BootcampCard } from '@/components/bootcamps/bootcamp-card';
import { BootcampFilters } from '@/components/bootcamps/bootcamp-filters';
import { BootcampSearchBar } from '@/components/bootcamps/bootcamp-search-bar';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    q?: string;
    categories?: string;
    level?: string;
    sort?: string;
  }>;
}

/**
 * Yüklenme anında gösterilecek skeleton kart listesi.
 */
function BootcampSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex flex-col space-y-3 p-4 rounded-xl border border-border/40">
          <Skeleton className="h-48 w-full rounded-lg" />
          <Skeleton className="h-6 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-2/3" />
          <div className="flex justify-between items-center pt-4">
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      ))}
    </div>
  );
}

/**
 * Filtreleme, arama ve sıralama mantığını çalıştıran iç bileşen.
 */
async function BootcampListContent({
  locale,
  searchParams,
}: {
  locale: string;
  searchParams: { q?: string; categories?: string; level?: string; sort?: string };
}) {
  const query = searchParams.q?.toLowerCase() || '';
  const selectedCategories = searchParams.categories?.split(',').filter(Boolean) || [];
  const selectedLevel = searchParams.level || 'all';
  const selectedSort = searchParams.sort || 'popularity';

  // Filtre kombinasyon mantığı (Arama + Kategori + Seviye)
  let filtered = bootcamps.filter((bootcamp) => {
    const matchesSearch =
      !query ||
      bootcamp.title.toLowerCase().includes(query) ||
      bootcamp.shortDescription.toLowerCase().includes(query) ||
      bootcamp.tags.some((tag) => tag.toLowerCase().includes(query));

    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(bootcamp.categorySlug);

    const matchesLevel = selectedLevel === 'all' || bootcamp.level === selectedLevel;

    return matchesSearch && matchesCategory && matchesLevel;
  });

  // Sıralama mantığı (Popülerlik, Fiyat, Süre)
  filtered = [...filtered].sort((a, b) => {
    if (selectedSort === 'price-asc') return a.priceEUR - b.priceEUR;
    if (selectedSort === 'price-desc') return b.priceEUR - a.priceEUR;
    if (selectedSort === 'duration') return a.durationWeeks - b.durationWeeks;
    return b.rating - a.rating;
  });

  return (
    <div className="space-y-6">
      {/* Sonuç Sayısı Göstergesi */}
      <div className="flex items-center justify-between pb-2 border-b border-border/40">
        <h2 className="text-lg font-semibold text-foreground">
          {filtered.length} Bootcamp Bulundu
        </h2>
      </div>

      {/* Empty State */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center p-12 text-center rounded-xl border border-dashed border-border bg-card/50 space-y-4">
          <div className="text-4xl">🔍</div>
          <h3 className="text-xl font-bold text-foreground">
            Aramanıza Uygun Bootcamp Bulunamadı
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Farklı arama terimleri denemeyi veya seçili filtreleri temizlemeyi deneyebilirsiniz.
          </p>
          <Link href={`/${locale}/bootcamps`}>
            <Button variant="secondary" size="sm">
              Filtreleri Temizle
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((bootcamp) => (
            <BootcampCard key={bootcamp.slug} bootcamp={bootcamp} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
}

/**
 * Ana sayfa komponenti.
 */
export default async function BootcampsPage({ params, searchParams }: PageProps) {
  const { locale } = await params;
  const resolvedSearchParams = await searchParams;

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Başlık ve Arama Kutusu */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground md:text-4xl">
            Bootcamp Programları
          </h1>
          <p className="text-muted-foreground text-base max-w-2xl">
            Kariyerinize yön verecek modern teknoloji eğitimlerini keşfedin, filtreleyin ve hemen
            başvurun.
          </p>
        </div>
        <BootcampSearchBar />
      </div>

      {/* Filtre ve Kart Listesi Alanı */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        <aside className="lg:col-span-1 sticky top-20">
          <BootcampFilters categories={categories} />
        </aside>

        <main className="lg:col-span-3">
          <Suspense fallback={<BootcampSkeletonGrid />}>
            <BootcampListContent locale={locale} searchParams={resolvedSearchParams} />
          </Suspense>
        </main>
      </div>
    </div>
  );
}
