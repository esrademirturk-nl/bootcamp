/**
 * src/components/bootcamps/bootcamp-card.tsx
 */

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Bootcamp } from '@/types';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BootcampCardProps {
  bootcamp: Bootcamp;
  locale?: string;
}

/**
 * R1'in badge.tsx bileşenindeki variant tiplerine uygun eşleştirme yapıyoruz:
 * 'default' | 'success' | 'warning' | 'error' | 'neutral'
 */
const getLevelBadge = (level: Bootcamp['level']) => {
  switch (level) {
    case 'beginner':
      // Başlangıç seviyesi için yeşil/başarı rengi
      return { label: 'Başlangıç', variant: 'success' as const };
    case 'intermediate':
      // Orta seviye için varsayılan renk
      return { label: 'Orta Seviye', variant: 'default' as const };
    case 'advanced':
      // İleri seviye için uyarı/kırmızı rengi
      return { label: 'İleri Seviye', variant: 'error' as const };
    default:
      // Diğer durumlar için nötr renk
      return { label: level, variant: 'neutral' as const };
  }
};

export const BootcampCard: React.FC<BootcampCardProps> = ({ bootcamp, locale = 'tr' }) => {
  const levelInfo = getLevelBadge(bootcamp.level);

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50">
      {/* Görsel ve Üst Rozetler Alanı */}
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        <Image
          src={bootcamp.heroImage}
          alt={bootcamp.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />

        {/* Öne Çıkan Rozeti - R1'in warning variant'ı kullanıldı */}
        {bootcamp.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="warning">★ Öne Çıkan</Badge>
          </div>
        )}

        {/* Seviye Rozeti */}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant={levelInfo.variant}>{levelInfo.label}</Badge>
        </div>
      </div>

      {/* Kart İçerik Başlığı ve Detayları */}
      <CardHeader className="p-5 pb-2 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="uppercase font-semibold tracking-wider text-primary">
            {bootcamp.categorySlug}
          </span>
          <span className="capitalize px-2 py-0.5 rounded bg-muted">{bootcamp.format}</span>
        </div>

        <h3 className="font-bold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors">
          {bootcamp.title}
        </h3>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1 space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">{bootcamp.shortDescription}</p>

        <div className="flex flex-wrap gap-1">
          {bootcamp.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-0.5 rounded-full bg-secondary/50 text-secondary-foreground"
            >
              #{tag}
            </span>
          ))}
        </div>
      </CardContent>

      <CardFooter className="p-5 pt-0 border-t border-border/40 mt-auto flex items-center justify-between gap-2">
        <div className="flex flex-col text-xs text-muted-foreground pt-3">
          <div className="flex items-center gap-2">
            <span>⏱ {bootcamp.durationWeeks} Hafta</span>
            <span>•</span>
            <span className="font-semibold text-foreground">★ {bootcamp.rating}</span>
          </div>
          <span className="text-lg font-bold text-primary mt-1">€{bootcamp.priceEUR}</span>
        </div>

        <Link href={`/${locale}/bootcamps/${bootcamp.slug}`} className="pt-3">
          <Button size="sm" className="font-medium">
            İncele
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};
