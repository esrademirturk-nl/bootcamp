import { Card, CardContent } from '@/components/ui/card';
import { iconMap } from '@/lib/icon-map';
import type { Category } from '@/types';

interface CategoryCardProps {
  category: Category;
}

export function CategoryCard({ category }: CategoryCardProps) {
  const Icon = iconMap[category.icon];

  return (
    <Card className="flex flex-col items-center gap-2 p-6 text-center transition-shadow hover:shadow-md">
      <CardContent className="flex flex-col items-center gap-2 p-0">
        {Icon && <Icon className="h-8 w-8 text-primary" />}
        <p className="font-semibold">{category.name}</p>
        <p className="text-sm text-muted">{category.courseCount} program</p>
      </CardContent>
    </Card>
  );
}
