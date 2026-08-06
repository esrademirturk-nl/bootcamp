/**
 * src/app/[locale]/bootcamps/[slug]/page.tsx
 * Bootcamp Detay Sayfası (R3).
 * Dynamic Routing, generateStaticParams, Sticky Sidebar, Müfredat,
 * Eğitmen Kartı, Yorumlar ve 404 kontrolünü içerir.
 */

import React from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { mockInstructors } from '@/data/instructors';
import { mockTestimonials } from '@/data/testimonials';
import { mockBootcamps } from '@/data/bootcamps';

import { BootcampCard } from '@/components/bootcamps/bootcamp-card';
import { BootcampCurriculum } from '@/components/bootcamps/bootcamp-curriculum';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface PageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

/**
 * generateStaticParams:
 * Next.js'in derleme (build) anında tüm bootcamp slug'larını statik olarak üretmesini sağlar.
 */
export async function generateStaticParams() {
  return mockBootcamps.map((bootcamp) => ({
    slug: bootcamp.slug,
  }));
}

export default async function BootcampDetailPage({ params }: PageProps) {
  const { locale, slug } = await params;

  // 1. Slug'a göre bootcamp verisini buluyoruz
  const bootcamp = mockBootcamps.find((item) => item.slug === slug);

  // Invalid slug triggers notFound() -> 404 page
  if (!bootcamp) {
    notFound();
  }

  // 2. İlgili Eğitmen Verisini Buluyoruz
  const instructor = mockInstructors.find((item) => item.slug === bootcamp.instructorSlug);

  // 3. İlgili Yorumları Buluyoruz
  const testimonials = mockTestimonials.filter((item) => item.bootcampSlug === bootcamp.slug);

  // 4. İlgili Diğer Bootcamp'ler (Aynı kategorideki diğer eğitimler)
  const relatedBootcamps = mockBootcamps
    .filter((item) => item.categorySlug === bootcamp.categorySlug && item.slug !== bootcamp.slug)
    .slice(0, 3);

  return (
    <div className="container mx-auto px-4 py-8 space-y-12">
      {/* 1. HERO BÖLÜMÜ */}
      <section className="space-y-6 bg-card p-6 md:p-8 rounded-2xl border border-border/60 shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          {/* Kategori için varsayılan Badge */}
          <Badge variant="default" className="uppercase tracking-wider">
            {bootcamp.categorySlug}
          </Badge>

          {/* Seviye (Level) için R1 varyantlarına uyumlu Badge */}
          <Badge variant="neutral" className="capitalize">
            {bootcamp.level}
          </Badge>

          {/* Format için R1 varyantlarına uyumlu Badge */}
          <Badge variant="warning" className="capitalize">
            {bootcamp.format}
          </Badge>
        </div>

        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-foreground">
          {bootcamp.title}
        </h1>

        <p className="text-lg text-muted-foreground max-w-3xl leading-relaxed">
          {bootcamp.description}
        </p>

        {/* Hero Meta Bilgileri */}
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pt-2 border-t border-border/40">
          <div className="flex items-center space-x-2">
            <span>
              ⭐ <strong className="text-foreground">{bootcamp.rating}</strong> (5.0)
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              👨‍🎓 <strong className="text-foreground">{bootcamp.studentCount}+</strong> Mezun
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              ⏱ <strong className="text-foreground">{bootcamp.durationWeeks} Hafta</strong> Süre
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span>
              🌐 Diller:{' '}
              <strong className="text-foreground">{bootcamp.languages.join(', ')}</strong>
            </span>
          </div>
        </div>
      </section>

      {/* 2. ANA İÇERİK & STICKY SIDEBAR DÜZENİ */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Sol Taraf: Detaylar, Müfredat, Eğitmen, Yorumlar */}
        <div className="lg:col-span-2 space-y-10">
          {/* Görsel */}
          <div className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden border border-border/40">
            <Image
              src={bootcamp.heroImage}
              alt={bootcamp.title}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Müfredat (Accordion Component) */}
          <BootcampCurriculum curriculum={bootcamp.curriculum} />

          {/* Eğitmen Kartı (Instructor Card) */}
          {instructor && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Eğitmeniniz</h2>
              <Card className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6 border-border/60">
                <div className="relative w-24 h-24 rounded-full overflow-hidden shrink-0 border-2 border-primary/20">
                  <Image
                    src={instructor.avatar}
                    alt={instructor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="space-y-2 text-center md:text-left">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{instructor.name}</h3>
                    <p className="text-sm font-medium text-primary">
                      {instructor.title} @ {instructor.company}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{instructor.bio}</p>
                </div>
              </Card>
            </div>
          )}

          {/* Öğrenci Yorumları (Testimonials) */}
          {testimonials.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-foreground">Mezun Yorumları</h2>
              <div className="grid grid-cols-1 gap-4">
                {testimonials.map((t) => (
                  <Card key={t.id} className="p-5 border-border/60 space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden">
                        <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-foreground">{t.name}</h4>
                        <p className="text-xs text-muted-foreground">
                          {t.role} @ {t.company}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground italic">&quot;{t.quote}&quot;</p>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sağ Taraf: Sticky Sidebar */}
        <aside className="lg:col-span-1 sticky top-20">
          <Card className="p-6 space-y-6 border-border/80 shadow-md">
            <div className="space-y-1">
              <span className="text-xs uppercase font-semibold text-muted-foreground">
                Eğitim Ücreti
              </span>
              <div className="text-3xl font-extrabold text-primary">€{bootcamp.priceEUR}</div>
            </div>

            <div className="space-y-3 text-sm text-muted-foreground border-t border-b border-border/40 py-4">
              <div className="flex justify-between">
                <span>Sonraki Kohort:</span>
                <strong className="text-foreground">15 Eylül 2026</strong>
              </div>
              <div className="flex justify-between">
                <span>Format:</span>
                <strong className="text-foreground capitalize">{bootcamp.format}</strong>
              </div>
              <div className="flex justify-between">
                <span>Süre:</span>
                <strong className="text-foreground">{bootcamp.durationWeeks} Hafta</strong>
              </div>
            </div>

            <Link href={`/${locale}/contact`} className="block w-full">
              <Button size="lg" className="w-full font-bold">
                Hemen Başvur / Kaydol
              </Button>
            </Link>
          </Card>
        </aside>
      </div>

      {/* 3. İLGİLİ BOOTCAMP'LER (Related Bootcamps) */}
      {relatedBootcamps.length > 0 && (
        <section className="space-y-6 pt-8 border-t border-border/40">
          <h2 className="text-2xl font-bold text-foreground">
            İlgini Çekebilecek Diğer Programlar
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBootcamps.map((item) => (
              <BootcampCard key={item.slug} bootcamp={item} locale={locale} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
