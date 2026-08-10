import Image from 'next/image';
import { Quote, Star } from 'lucide-react';
import { Card } from '@/components/ui/card';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="flex h-full flex-col gap-4 border-border/60 p-6">
      <Quote className="h-7 w-7 text-primary-200" fill="currentColor" strokeWidth={0} />

      <p className="flex-1 text-sm italic leading-relaxed text-foreground">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, index) => (
          <Star
            key={index}
            className={
              index < testimonial.rating
                ? 'h-4 w-4 fill-warning text-warning'
                : 'h-4 w-4 text-border'
            }
          />
        ))}
      </div>

      <div className="flex items-center gap-3 border-t border-border/60 pt-4">
        <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full">
          <Image src={testimonial.avatar} alt={testimonial.name} fill className="object-cover" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">{testimonial.name}</p>
          <p className="text-xs text-muted">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
      </div>
    </Card>
  );
}
