import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import type { Instructor } from '@/types';

interface InstructorCardProps {
  instructor: Instructor;
}

export function InstructorCard({ instructor }: InstructorCardProps) {
  return (
    <Card className="overflow-hidden text-center">
      <Image
        src={instructor.avatar}
        alt={instructor.name}
        width={200}
        height={200}
        className="mx-auto h-32 w-32 rounded-full object-cover mt-6"
      />
      <CardContent className="flex flex-col gap-1">
        <h3 className="font-semibold">{instructor.name}</h3>
        <p className="text-sm text-primary">{instructor.title}</p>
        <p className="text-sm text-muted">{instructor.company}</p>
        <p className="mt-2 text-sm text-muted">{instructor.bio}</p>
      </CardContent>
    </Card>
  );
}
