import { Hero } from '@/components/landing/hero';
import { SocialProof } from '@/components/landing/social-proof';
import { FeaturedPrograms } from '@/components/sections/featured-programs';
import { CategoryGrid } from '@/components/sections/category-grid';
import { Features } from '@/components/sections/features';
import { HowItWorks } from '@/components/sections/how-it-works';
import { Instructors } from '@/components/sections/instructors';
import { Testimonials } from '@/components/sections/testimonials';
import { Pricing } from '@/components/sections/pricing';
import { Newsletter } from '@/components/sections/newsletter';
import { ClosingCTA } from '@/components/sections/closing-cta';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <FeaturedPrograms />
      <CategoryGrid />
      <Features />
      <HowItWorks id="how-it-works" />
      <Instructors />
      <Testimonials />
      <Pricing />
      <Newsletter />
      <ClosingCTA />
    </main>
  );
}
