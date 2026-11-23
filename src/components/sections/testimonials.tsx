import { mockTestimonials } from '@/data/testimonials';
import { TestimonialCard } from './testimonial-card';
import { getT } from 'next-i18next/server';

interface TestimonialsProps {
  locale: string;
}

export async function Testimonials({ locale }: TestimonialsProps) {
  const { t } = await getT('common', { lng: locale });

  const translatedTestimonials = mockTestimonials.map((testimonial) => ({
    ...testimonial,
    quote: t(`testimonials.${testimonial.id}.quote`, { defaultValue: testimonial.defaultQuote }),
  }));

  return (
    <section className="bg-surface-muted py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t('landing.testimonials.eyebrow')}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {t('landing.testimonials.title')}
          </h2>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {translatedTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
