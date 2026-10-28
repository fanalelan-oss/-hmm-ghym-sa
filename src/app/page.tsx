import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ServicesGridSection from '@/components/home/ServicesGridSection';
import SignageSimulatorSection from '@/components/home/SignageSimulatorSection';
import PortfolioShowcaseSection from '@/components/home/PortfolioShowcaseSection';
import ProcessSection from '@/components/home/ProcessSection';
import PartnersMarqueeSection from '@/components/home/PartnersMarqueeSection';
import ReviewsHighlightSection from '@/components/home/ReviewsHighlightSection';
import SeoHashtagsCtaSection from '@/components/home/SeoHashtagsCtaSection';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyUsSection />
      <ServicesGridSection />
      <SignageSimulatorSection />
      <PortfolioShowcaseSection />
      <ProcessSection />
      <PartnersMarqueeSection />
      <ReviewsHighlightSection />
      <SeoHashtagsCtaSection />
    </>
  );
}
