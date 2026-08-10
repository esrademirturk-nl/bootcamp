import { mockInstructors } from '@/data/instructors';
import { getT } from 'next-i18next/server';
import { InstructorCarousel } from './instructor-carousel';

export async function Instructors() {
  const { t } = await getT('common');

  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-10 text-center">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
            {t('landing.instructors.eyebrow')}
          </span>
          <h2 className="mt-2 font-heading text-3xl font-bold text-foreground">
            {t('landing.instructors.title')}
          </h2>
        </div>
        <InstructorCarousel
          instructors={mockInstructors}
          prevLabel={t('landing.instructors.prev')}
          nextLabel={t('landing.instructors.next')}
        />
      </div>
    </section>
  );
}
