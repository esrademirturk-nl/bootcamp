import { mockInstructors } from '@/data/instructors';
import { InstructorCard } from './instructor-card';

export function Instructors() {
  const featured = mockInstructors.slice(0, 4);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Eğitmenler</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {featured.map((instructor) => (
            <InstructorCard key={instructor.slug} instructor={instructor} />
          ))}
        </div>
      </div>
    </section>
  );
}
