import { getT } from 'next-i18next/server';
import { mockCategories } from '@/data/categories';
import { CategoryCard } from './category-card';

interface CategoryGridProps {
  locale: string;
}

export async function CategoryGrid({ locale }: CategoryGridProps) {
  const { t } = await getT('common', { lng: locale });

  return (
    <section className="bg-surface-muted py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t('landing.categories.eyebrow')}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {t('landing.categories.title')}
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-4">
          {mockCategories.map((category) => (
            <CategoryCard key={category.slug} category={category} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
