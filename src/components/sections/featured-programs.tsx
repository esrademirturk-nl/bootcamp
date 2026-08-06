import { bootcamps } from '@/data/bootcamps';
import { BootcampCard } from './bootcamp-card';

export function FeaturedPrograms() {
  const featured = bootcamps.filter((bootcamp) => bootcamp.featured);

  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-8 text-3xl font-bold">Öne Çıkan Programlar</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((bootcamp) => (
            <BootcampCard key={bootcamp.slug} bootcamp={bootcamp} />
          ))}
        </div>
      </div>
    </section>
  );
}
