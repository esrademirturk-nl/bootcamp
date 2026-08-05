import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Skeleton } from '@/components/ui/skeleton';
import { Spinner } from '@/components/ui/spinner';

export function ComponentsSection() {
  return (
    <section className="flex flex-col gap-10">
      <h2 className="font-heading text-2xl font-semibold">Komponentler</h2>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Button</h3>
        <div className="flex flex-wrap items-center gap-3">
          <Button variant="primary" size="sm">
            Primary SM
          </Button>
          <Button variant="primary" size="md">
            Primary MD
          </Button>
          <Button variant="primary" size="lg">
            Primary LG
          </Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button isLoading>Loading</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Badge</h3>
        <div className="flex flex-wrap gap-2">
          <Badge>Default</Badge>
          <Badge variant="success">Success</Badge>
          <Badge variant="warning">Warning</Badge>
          <Badge variant="error">Error</Badge>
          <Badge variant="neutral">Neutral</Badge>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Card</h3>
        <Card className="max-w-sm">
          <CardHeader>
            <CardTitle>Full-Stack Web Development</CardTitle>
            <CardDescription>12 hafta · Beginner seviye</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-foreground">
              Next.js, TypeScript ve React ile modern web geliştirme.
            </p>
          </CardContent>
        </Card>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Form Elemanları</h3>
        <div className="flex max-w-sm flex-col gap-4">
          <Input placeholder="Ad Soyad" />
          <Input placeholder="Hatalı alan" error />
          <Textarea placeholder="Mesajınız" />
          <Select defaultValue="">
            <option value="" disabled>
              Kategori seç
            </option>
            <option value="frontend">Frontend</option>
            <option value="backend">Backend</option>
          </Select>
          <Checkbox label="Kullanım koşullarını kabul ediyorum" />
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Skeleton &amp; Spinner</h3>
        <div className="flex items-center gap-6">
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-20 w-48" />
          </div>
          <div className="flex items-center gap-3">
            <Spinner size="sm" />
            <Spinner size="md" />
            <Spinner size="lg" />
          </div>
        </div>
      </div>
    </section>
  );
}
