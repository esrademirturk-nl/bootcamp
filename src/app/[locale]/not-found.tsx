/**
 * @file src/app/[locale]/not-found.tsx
 * @description E-04 - 404 Page (Çökme Korumalı i18n Yapısı)
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import { useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export default function NotFound() {
  const params = useParams();
  const currentLocale = (params?.locale as string) || 'tr';

  // 'common' namespace'ini güvenli şekilde yükle
  const { t } = useTranslation('common');

  return (
    <div className="container mx-auto px-4 py-16 md:py-24 flex items-center justify-center min-h-[70vh]">
      <Card className="max-w-xl w-full text-center border-border/60 bg-card shadow-lg">
        <CardContent className="p-8 md:p-12 space-y-6">
          {/* Badge & Header */}
          <div className="space-y-2">
            <Badge variant="neutral" className="uppercase text-[10px] tracking-widest px-3 py-1">
              {t('notFoundPage.badge')}
            </Badge>
            <h1 className="text-7xl font-extrabold text-primary tracking-tight">404</h1>
          </div>

          {/* Description */}
          <div className="space-y-3">
            <h2 className="text-2xl font-bold text-foreground sm:text-3xl">
              {t('notFoundPage.title')}
            </h2>
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {t('notFoundPage.description')}
            </p>
          </div>

          {/* Return Home Button */}
          <div className="pt-2">
            <Link href={`/${currentLocale}`}>
              <Button size="lg" className="px-8 font-semibold">
                {t('notFoundPage.btnHome')}
              </Button>
            </Link>
          </div>

          {/* Popular Links */}
          <div className="pt-6 border-t border-border/60 space-y-3">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              {t('notFoundPage.popularLinksTitle')}
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-sm font-medium">
              <Link
                href={`/${currentLocale}/bootcamps`}
                className="px-3 py-1.5 rounded-md text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                {t('links.bootcamps')}
              </Link>
              <span className="text-border hidden sm:inline">•</span>
              <Link
                href={`/${currentLocale}/schedule`}
                className="px-3 py-1.5 rounded-md text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                {t('links.schedule')}
              </Link>
              <span className="text-border hidden sm:inline">•</span>
              <Link
                href={`/${currentLocale}/contact`}
                className="px-3 py-1.5 rounded-md text-foreground hover:text-primary hover:bg-accent transition-colors"
              >
                {t('links.contact')}
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
