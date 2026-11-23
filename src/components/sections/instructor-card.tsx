import Image from 'next/image';
import { Card } from '@/components/ui/card';
import type { ResolvedInstructor } from '@/types';

interface InstructorCardProps {
  instructor: ResolvedInstructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card className="group flex h-full flex-col items-center gap-3 border-border/60 p-6 text-center transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary-50 transition-all group-hover:ring-primary-100">
        <Image src={instructor.avatar} alt={instructor.name} fill className="object-cover" />
      </div>

      <div>
        <h3 className="font-heading font-semibold text-foreground">{instructor.name}</h3>
        <p className="text-sm font-medium text-primary-600">{instructor.title}</p>
        <p className="text-xs text-muted">{instructor.company}</p>
      </div>

      <p className="line-clamp-3 text-sm text-muted">{instructor.bio}</p>
    </Card>
  );
}
