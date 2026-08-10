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

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { locale } = await params;

  return (
    <main>
      <Hero locale={locale} />
      <SocialProof locale={locale} />
      <FeaturedPrograms locale={locale} />
      <CategoryGrid locale={locale} />
      <Features locale={locale} />
      <HowItWorks id="how-it-works" />
      <Instructors locale={locale} />
      <Testimonials locale={locale} />
      <Pricing locale={locale} />
      <Newsletter />
      <ClosingCTA locale={locale} />
    </main>
  );
}
