/**
 * @file src/components/sections/bootcamp-card.tsx
 * @description Landing / Section Alanları İçin Bootcamp Kart Bileşeni.
 */

'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { Bootcamp } from '@/types';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface BootcampCardProps {
  bootcamp: Bootcamp;
  locale?: string;
}

export function BootcampCard({ bootcamp, locale = 'tr' }: BootcampCardProps) {
  const { t } = useTranslation('common');

  const description = t(`bootcampsData.${bootcamp.slug}.shortDescription`, {
    defaultValue: bootcamp.shortDescription,
  });

  return (
    <Card className="group flex flex-col h-full overflow-hidden transition-all duration-300 hover:shadow-lg border-border/50">
      <div className="relative w-full h-48 overflow-hidden bg-muted">
        {bootcamp.heroImage && (
          <Image
            src={bootcamp.heroImage}
            alt={bootcamp.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        )}
        {bootcamp.featured && (
          <div className="absolute top-3 left-3 z-10">
            <Badge variant="warning">
              ★ {t('bootcampsPage.featured', { defaultValue: 'Aanbevolen' })}
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 z-10">
          <Badge variant="neutral" className="capitalize">
            {t(`levelOptions.${bootcamp.level}`, { defaultValue: bootcamp.level })}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-5 pb-2 space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="uppercase font-semibold tracking-wider text-primary">
            {bootcamp.categorySlug}
          </span>
          <span className="capitalize px-2 py-0.5 rounded bg-muted">
            {bootcamp.format}
          </span>
        </div>
        <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
          {bootcamp.title}
        </CardTitle>
        <CardDescription className="line-clamp-2">
          {description}
        </CardDescription>
      </CardHeader>

      <CardContent className="p-5 pt-0 flex-1 space-y-4">
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
            <span>⏱ {bootcamp.durationWeeks} {t('bootcampsPage.weeksLabel', { defaultValue: 'Hafta' })}</span>
            <span>•</span>
            <span className="font-semibold text-foreground">★ {bootcamp.rating}</span>
          </div>
          <span className="text-lg font-bold text-primary mt-1">
            €{bootcamp.priceEUR}
          </span>
        </div>

        <Link href={`/${locale}/bootcamps/${bootcamp.slug}`} className="pt-3">
          <Button size="sm" className="font-medium">
            {t('bootcampsPage.inspect', { defaultValue: 'Bekijken' })}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}