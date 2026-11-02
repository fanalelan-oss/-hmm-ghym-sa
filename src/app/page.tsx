import React from 'react';
import type { Metadata } from 'next';
import HeroSection from '@/components/home/HeroSection';
import WhyUsSection from '@/components/home/WhyUsSection';
import ServicesGridSection from '@/components/home/ServicesGridSection';
import SignageSimulatorSection from '@/components/home/SignageSimulatorSection';
import PortfolioShowcaseSection from '@/components/home/PortfolioShowcaseSection';
import ProcessSection from '@/components/home/ProcessSection';
import PartnersMarqueeSection from '@/components/home/PartnersMarqueeSection';
import ReviewsHighlightSection from '@/components/home/ReviewsHighlightSection';
import SeoHashtagsCtaSection from '@/components/home/SeoHashtagsCtaSection';

const ROTATING_METADATA = [
  {
    title: 'شركة همم غيم | أحرف بارزة وواجهات كلادينج فاخرة — ضمان 10 سنوات ومعاينة مجانية',
    description:
      'نصمم وننفذ واجهات الكلادينج والأحرف البارزة المضيئة والمقاولات العامة في السعودية. إشراف هندسي وضمان 10 سنوات ومعاينة 3D مجانية. اتصل: 0565467928',
    service: 'كلادينج وأحرف بارزة',
  },
  {
    title: 'شركة همم غيم | تصنيع وتركيب مظلات وسواتر عصرية وبرجولات حدائق ليزر',
    description:
      'توريد وتركيب المظلات والسواتر الحديثة للفلل والمشاريع السكنية والتجارية بهياكل معالجة ضد الصدأ وأقمشة كورية وألمانية عالية المتانة. هاتف: 0565467928',
    service: 'مظلات وسواتر',
  },
  {
    title: 'شركة همم غيم | تسوير المشاريع الإنشائية وتجهيز المعارض والمؤتمرات الكبرى',
    description:
      'حلول متكاملة لتسوير المواقع الإنشائية بالشنكو وطباعة البوسترات العملاقة وتجهيز بوثات المعارض والفعاليات في الرياض وكافة مناطق المملكة.',
    service: 'تسوير مشاريع ومعارض',
  },
  {
    title: 'شركة همم غيم | مقاولات عامة وتشطيبات وديكورات داخلية وزجاج سيكوريت',
    description:
      'تصميم وتنفيذ الديكورات المعمارية وتشطيبات الصالات والمكاتب، قواطع زجاج سيكوريت، وشبكات الأمن والسلامة المعتمدة. استشارة فورية: 0565467928',
    service: 'مقاولات عامة وتشطيبات',
  },
  {
    title: 'شركة همم غيم | استيكرات وتغليف أساطيل السيارات والطباعة الرقمية المتقدمة',
    description:
      'تغليف احترافي لسيارات وشاحنات الشركات بفينيل ألماني 3M و Orafol المقاوم للشمس والغسيل، وطباعة رقمية رولاند يابانية بأعلى دقة.',
    service: 'تغليف سيارات واستيكرات',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const slotIndex =
    Math.floor(Date.now() / (1000 * 60 * 60 * 6)) % ROTATING_METADATA.length;
  const current = ROTATING_METADATA[slotIndex];

  return {
    title: current.title,
    description: current.description,
    openGraph: {
      title: current.title,
      description: current.description,
      type: 'website',
      locale: 'ar_SA',
      siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات',
      images: [
        {
          url: `/api/og?slot=${slotIndex}`,
          width: 1200,
          height: 630,
          alt: current.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: current.title,
      description: current.description,
      images: [`/api/og?slot=${slotIndex}`],
    },
  };
}

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
