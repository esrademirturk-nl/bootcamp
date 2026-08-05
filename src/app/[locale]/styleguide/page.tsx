import { ColorPaletteSection } from './_color-palette';
import { TypographySection } from './_typography';
import { RadiusShadowSection } from './_radius-shadow';
import { ComponentsSection } from './_components';
import { ThemeToggle } from '@/components/layout/theme-toggle';

export default function StyleguidePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-12">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="font-heading text-4xl font-bold">Style Guide</h1>
        <ThemeToggle label="Dark/Light Toggle" />
      </div>
      <div className="flex flex-col gap-16">
        <ColorPaletteSection />
        <TypographySection />
        <RadiusShadowSection />
        <ComponentsSection />
      </div>
    </main>
  );
}
