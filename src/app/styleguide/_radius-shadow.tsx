// Radius ve shadow skalasını gösteren bölüm.
// page.tsx içinde <RadiusShadowSection /> olarak çağrılır.

const radiusScale: { className: string; label: string }[] = [
  { className: 'rounded-sm', label: 'radius-sm (4px)' },
  { className: 'rounded-md', label: 'radius-md (8px)' },
  { className: 'rounded-lg', label: 'radius-lg (14px)' },
  { className: 'rounded-xl', label: 'radius-xl (20px)' },
];

const shadowScale: { className: string; label: string }[] = [
  { className: 'shadow-sm', label: 'shadow-sm' },
  { className: 'shadow-md', label: 'shadow-md' },
  { className: 'shadow-lg', label: 'shadow-lg' },
];

export function RadiusShadowSection() {
  return (
    <section className="flex flex-col gap-8">
      <h2 className="font-heading text-2xl font-semibold">Radius &amp; Shadow</h2>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Radius</h3>
        <div className="flex gap-6">
          {radiusScale.map((item) => (
            <div key={item.className} className="flex flex-col items-center gap-2">
              <div className={`h-16 w-16 bg-primary-500 ${item.className}`} />
              <span className="text-xs text-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-3 text-sm font-medium text-muted">Shadow</h3>
        <div className="flex gap-6">
          {shadowScale.map((item) => (
            <div key={item.className} className="flex flex-col items-center gap-2">
              <div className={`h-16 w-16 rounded-md bg-surface ${item.className}`} />
              <span className="text-xs text-muted">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
