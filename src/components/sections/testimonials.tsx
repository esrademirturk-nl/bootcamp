import { mockTestimonials } from '@/data/testimonials';
import { TestimonialCard } from './testimonial-card';

export function Testimonials() {
  return (
    <section className="bg-surface py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Öğrenci Yorumları</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {mockTestimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
