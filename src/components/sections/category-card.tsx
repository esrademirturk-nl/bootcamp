import { getT } from 'next-i18next/server';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { iconMap } from '@/lib/icon-map';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
  locale: string;
}

export async function CategoryCard({ category, locale }: CategoryCardProps) {
  const { t } = await getT('common', { lng: locale });
  const Icon = iconMap[category.icon];

  return (
    <Card className="flex flex-col items-center gap-3 border-border/60 p-8 text-center transition-shadow hover:shadow-md">
      {Icon && <Icon className="h-8 w-8 text-foreground" strokeWidth={1.75} />}

      <h3 className="font-heading text-lg font-bold text-foreground">{category.name}</h3>

      <p className="text-sm text-muted">
        {t('landing.categories.programCount', { count: category.courseCount })}
      </p>
      <Link
        href={`/bootcamps?categories=${category.slug}`}
        className="mt-1 inline-flex items-center gap-1 text-sm font-semibold text-primary-600 hover:text-primary-700"
      >
        {t('landing.categories.explore')}
        <span aria-hidden="true">→</span>
      </Link>
    </Card>
  );
}
