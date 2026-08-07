import { Hero } from '@/components/landing/hero';
import { SocialProof } from '@/components/landing/social-proof';
import { Pricing } from '@/components/sections/pricing';
import { Newsletter } from '@/components/sections/newsletter';
import { ClosingCTA } from '@/components/sections/closing-cta';
import { Instructors } from '@/components/sections/instructors';
import { Testimonials } from '@/components/sections/testimonials';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Instructors />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <ClosingCTA />
    </main>
  );
}
