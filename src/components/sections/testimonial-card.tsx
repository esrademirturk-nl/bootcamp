import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Testimonial } from '@/types';

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="p-6">
      <CardContent className="flex flex-col gap-3 p-0">
        <div className="flex items-center gap-3">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            width={48}
            height={48}
            className="h-12 w-12 rounded-full object-cover"
          />
          <div>
            <p className="font-semibold">{testimonial.name}</p>
            <p className="text-sm text-muted">
              {testimonial.role} · {testimonial.company}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted">&ldquo;{testimonial.quote}&rdquo;</p>
        <p className="text-sm text-primary">{'⭐'.repeat(testimonial.rating)}</p>
      </CardContent>
    </Card>
  );
}
