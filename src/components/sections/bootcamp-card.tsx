import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { Bootcamp } from '@/types';

interface BootcampCardProps {
  bootcamp: Bootcamp;
}

export function BootcampCard({ bootcamp }: BootcampCardProps) {
  return (
    <Card className="overflow-hidden">
      <Image
        src={bootcamp.heroImage}
        alt={bootcamp.title}
        width={400}
        height={160}
        className="h-40 w-full object-cover"
      />
      <CardHeader>
        <div className="flex items-center gap-2">
          <Badge>{bootcamp.level}</Badge>
          <Badge>{bootcamp.format}</Badge>
        </div>
        <CardTitle>{bootcamp.title}</CardTitle>
        <CardDescription>{bootcamp.shortDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted">
          {bootcamp.durationWeeks} hafta · {bootcamp.priceEUR}€
        </p>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted">
          ⭐ {bootcamp.rating} · {bootcamp.studentCount} öğrenci
        </p>
      </CardFooter>
    </Card>
  );
}
