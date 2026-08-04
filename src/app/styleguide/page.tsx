'use client';

import { ColorPaletteSection } from './_color-palette';
import { TypographySection } from './_typography';
import { RadiusShadowSection } from './_radius-shadow';

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Style Guide</h1>
        <button
          type="button"
          onClick={() => document.documentElement.classList.toggle('dark')}
          className="rounded-md border border-border px-4 py-2 text-sm hover:bg-surface-muted"
        >
          Dark/Light Toggle (geçici test)
        </button>
      </div>
      <div className="flex flex-col gap-16">
        <ColorPaletteSection />
        <TypographySection />
        <RadiusShadowSection />
      </div>
    </main>
  );
}
