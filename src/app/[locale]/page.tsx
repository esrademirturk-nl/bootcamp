import { Hero } from '@/components/landing/hero';
import { SocialProof } from '@/components/landing/social-proof';
import { Pricing } from '@/components/sections/pricing';
import { Newsletter } from '@/components/sections/newsletter';
import { ClosingCTA } from '@/components/sections/closing-cta';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Pricing />
      <Newsletter />
      <ClosingCTA />
    </main>
  );
}
