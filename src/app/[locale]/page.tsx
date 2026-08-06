import { Hero } from '@/components/landing/hero';
import { SocialProof } from '@/components/landing/social-proof';
import { Features } from '@/components/sections/features';
import { HowItWorks } from '@/components/sections/how-it-works';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Features />
      <HowItWorks />
    </main>
  );
}
