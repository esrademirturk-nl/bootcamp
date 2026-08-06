import { Hero } from '@/components/landing/hero';
import { SocialProof } from '@/components/landing/social-proof';
import { Instructors } from '@/components/sections/instructors';
import { Testimonials } from '@/components/sections/testimonials';

export default function HomePage() {
  return (
    <main>
      <Hero />
      <SocialProof />
      <Instructors />
      <Testimonials />
    </main>
  );
}
