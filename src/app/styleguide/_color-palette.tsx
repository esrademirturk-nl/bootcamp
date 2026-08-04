// Bu, styleguide sayfasının SADECE renk paleti bölümü.
// page.tsx'in içine bir <section> olarak yerleştir, altına
// tipografi ve radius/shadow bölümlerini kendin ekleyeceksin.
//
// ÖNEMLİ: Class isimleri template literal ile ("bg-primary-" + shade) DEĞİL,
// tam yazılmış string olarak tutuluyor. Tailwind, hangi class'ların CSS'e
// üretileceğini kaynak kodundaki LİTERAL string'leri tarayarak bulur — çalışma
// zamanında birleştirilen string'leri (`bg-primary-${shade}` gibi) tanıyamaz,
// o class hiç üretilmez ve swatch renksiz kalır.

const primaryShades: { className: string; label: string }[] = [
  { className: 'bg-primary-50', label: 'primary-50' },
  { className: 'bg-primary-100', label: 'primary-100' },
  { className: 'bg-primary-200', label: 'primary-200' },
  { className: 'bg-primary-300', label: 'primary-300' },
  { className: 'bg-primary-400', label: 'primary-400' },
  { className: 'bg-primary-500', label: 'primary-500' },
  { className: 'bg-primary-600', label: 'primary-600' },
  { className: 'bg-primary-700', label: 'primary-700' },
  { className: 'bg-primary-800', label: 'primary-800' },
  { className: 'bg-primary-900', label: 'primary-900' },
  { className: 'bg-primary-950', label: 'primary-950' },
];

const neutralShades: { className: string; label: string }[] = [
  { className: 'bg-neutral-50', label: 'neutral-50' },
  { className: 'bg-neutral-100', label: 'neutral-100' },
  { className: 'bg-neutral-200', label: 'neutral-200' },
  { className: 'bg-neutral-300', label: 'neutral-300' },
  { className: 'bg-neutral-400', label: 'neutral-400' },
  { className: 'bg-neutral-500', label: 'neutral-500' },
  { className: 'bg-neutral-600', label: 'neutral-600' },
  { className: 'bg-neutral-700', label: 'neutral-700' },
  { className: 'bg-neutral-800', label: 'neutral-800' },
  { className: 'bg-neutral-900', label: 'neutral-900' },
  { className: 'bg-neutral-950', label: 'neutral-950' },
];

const accentShades: { className: string; label: string }[] = [
  { className: 'bg-accent-400', label: 'accent-400' },
  { className: 'bg-accent-500', label: 'accent-500' },
  { className: 'bg-accent-600', label: 'accent-600' },
];

const semanticColors: { className: string; label: string }[] = [
  { className: 'bg-success', label: 'success' },
  { className: 'bg-warning', label: 'warning' },
  { className: 'bg-error', label: 'error' },
  { className: 'bg-info', label: 'info' },
];

function ColorSwatch({ className, label }: { className: string; label: string }) {
  return (
    <div className="flex flex-col gap-2">
      <div className={`h-16 w-full rounded-md border border-border ${className}`} />
      <span className="text-xs text-muted">{label}</span>
    </div>
  );
}

function ColorSwatchGrid({
  items,
  columns,
}: {
  items: { className: string; label: string }[];
  columns: string;
}) {
  return (
    <div className={`grid gap-2 ${columns}`}>
      {items.map((item) => (
        <ColorSwatch key={item.label} className={item.className} label={item.label} />
      ))}
    </div>
  );
}

export function ColorPaletteSection() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="font-heading text-2xl font-semibold">Renkler</h2>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Primary</h3>
        <ColorSwatchGrid items={primaryShades} columns="grid-cols-11" />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Neutral</h3>
        <ColorSwatchGrid items={neutralShades} columns="grid-cols-11" />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Accent</h3>
        <ColorSwatchGrid items={accentShades} columns="grid-cols-3 max-w-xs" />
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Semantic</h3>
        <ColorSwatchGrid items={semanticColors} columns="grid-cols-4 max-w-md" />
      </div>
    </section>
  );
}
