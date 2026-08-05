// Tipografi skalasını gösteren bölüm.
// page.tsx içinde <TypographySection /> olarak çağrılır.

const sizeScale: { className: string; label: string; sample: string }[] = [
  { className: 'text-xs', label: 'text-xs (12px)', sample: 'Bootcamp platformu' },
  { className: 'text-sm', label: 'text-sm (14px)', sample: 'Bootcamp platformu' },
  { className: 'text-base', label: 'text-base (16px)', sample: 'Bootcamp platformu' },
  { className: 'text-lg', label: 'text-lg (18px)', sample: 'Bootcamp platformu' },
  { className: 'text-xl', label: 'text-xl (20px)', sample: 'Bootcamp platformu' },
  { className: 'text-2xl', label: 'text-2xl (24px)', sample: 'Bootcamp platformu' },
  { className: 'text-3xl', label: 'text-3xl (30px)', sample: 'Bootcamp platformu' },
  { className: 'text-4xl', label: 'text-4xl (36px)', sample: 'Bootcamp platformu' },
  { className: 'text-5xl', label: 'text-5xl (48px)', sample: 'Bootcamp platformu' },
];

export function TypographySection() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="font-heading text-2xl font-semibold">Tipografi</h2>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Font Aileleri</h3>
        <div className="flex flex-col gap-4">
          <div>
            <p className="font-sans text-2xl">Geist Sans — gövde metni (font-sans)</p>
            <span className="text-xs text-muted">font-sans</span>
          </div>
          <div>
            <p className="font-heading text-2xl">Space Grotesk — başlık metni (font-heading)</p>
            <span className="text-xs text-muted">font-heading</span>
          </div>
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Boyut Skalası</h3>
        <div className="flex flex-col gap-4">
          {sizeScale.map((item) => (
            <div key={item.className} className="flex items-baseline gap-4">
              <p className={`${item.className} font-sans`}>{item.sample}</p>
              <span className="text-xs text-muted whitespace-nowrap">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
