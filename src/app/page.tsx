import React from 'react';
import type { Metadata } from 'next';
import { getDb } from '@/lib/db';
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
    title: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة | من الحرف البارز إلى تسليم المفتاح',
    description:
      '11 قسماً إعلانياً وهندسياً متكاملاً تحت إدارة واحدة بالسعودية: تصنيع وتركيب الأحرف البارزة المضيئة، واجهات الكلادينج ACP، الواجهات الزجاجية والسيكوريت، الجبس بورد والأسمنت بورد، تكسيات بديل الشيبورد، المظلات والسواتر، الاستيكرات، تسوير المشاريع، المعارض، والأمن والسلامة وكاميرات المراقبة. جوال: 0565467928',
    service: 'دعاية وإعلان ومقاولات عامة',
  },
  {
    title: 'شركة همم غيم للدعاية والإعلان | تصنيع وتركيب الأحرف البارزة وواجهات الكلادينج الفاخرة',
    description:
      'نصمم وننفذ واجهات المحلات والشركات بالأحرف البارزة المضيئة (زنكور، إكريليك، استيل، نيون)، وكلادينج معتمد مقاوم للحريق بضمان 10 سنوات ومطابقة لاشتراطات منصة بلدي والكود السعودي. معاينة وتصميم 3D مجاناً. اتصال: 0565467928',
    service: 'لوحات وأحرف بارزة وكلادينج',
  },
  {
    title: 'شركة همم غيم | أعمال الجبس بورد والأسمنت بورد وتكسيات بديل الشيبورد والزجاج السيكوريت',
    description:
      'تنفيذ هندسي متكامل لأسقف وقواطع الجبس بورد والأسمنت بورد، وتكسيات بديل الشيبورد وخلفيات التلفزيون والأبواب المخفية، وواجهات زجاج سيكوريت 12 ملم واستركشر بضمان معتمد. هاتف: 0565467928',
    service: 'جبس بورد وشيبورد وزجاج',
  },
  {
    title: 'شركة همم غيم للدعاية والإعلان والمقاولات | مظلات وسواتر عصرية وبرجولات حدائق وقص ليزر',
    description:
      'توريد وتركيب المظلات والسواتر الحديثة للفلل والمشاريع السكنية والتجارية، سواتر قص ليزر، وبرجولات حدائق مودرن بهياكل معالجة ضد الصدأ وأقمشة كورية وألمانية عالية المتانة بضمان شامل. هاتف: 0565467928',
    service: 'مظلات وسواتر وبرجولات',
  },
  {
    title: 'شركة همم غيم للدعاية والإعلان والمقاولات | تسوير المشاريع الإنشائية وتجهيز المعارض والمؤتمرات',
    description:
      'حلول متكاملة للمطورين العقاريين: تسوير المواقع الإنشائية بحواجز شينكو أمنية معتمدة، طباعة بوسترات دعائية عملاقة UV، وتصميم وتنفيذ بوثات المعارض والفعاليات في الرياض وكافة مناطق المملكة. جوال: 0565467928',
    service: 'تسوير مشاريع وبوثات معارض',
  },
  {
    title: 'شركة همم غيم للدعاية والإعلان | استيكرات وتغليف أساطيل السيارات وأنظمة الأمن والسلامة والكاميرات',
    description:
      'تغليف احترافي لمركبات وشاحنات الشركات بفينيل ألماني معتمد، بالإضافة إلى تمديد شبكات إطفاء وإنذار الحريق وكاميرات المراقبة IP CCTV المعتمدة. هاتف: 0565467928',
    service: 'استيكرات وأمن وسلامة وكاميرات',
  },
];

export async function generateMetadata(): Promise<Metadata> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

  const db = getDb();
  const ogSettings = db?.ogSettings;

  let activeTitle: string;
  let activeDescription: string;
  let ogImageUrl: string;

  const isCustomActive =
    ogSettings &&
    ((ogSettings.mode === 'custom' && ogSettings.customTitle) ||
      (ogSettings.mode === 'temporary_24h' &&
        ogSettings.customTitle &&
        ogSettings.pinnedUntil &&
        new Date(ogSettings.pinnedUntil).getTime() > Date.now()));

  if (isCustomActive && ogSettings) {
    activeTitle = ogSettings.customTitle || ROTATING_METADATA[0].title;
    activeDescription =
      ogSettings.customDescription || ROTATING_METADATA[0].description;
    ogImageUrl = `${siteUrl}/api/og?v=${Date.now()}`;
  } else {
    const slotIndex =
      Math.floor(Date.now() / (1000 * 60 * 60 * 6)) % ROTATING_METADATA.length;
    const current = ROTATING_METADATA[slotIndex];
    activeTitle = current.title;
    activeDescription = current.description;
    ogImageUrl = `${siteUrl}/api/og?slot=${slotIndex}`;
  }

  return {
    title: activeTitle,
    description: activeDescription,
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: activeTitle,
      description: activeDescription,
      type: 'website',
      locale: 'ar_SA',
      url: siteUrl,
      siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: activeTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: activeTitle,
      description: activeDescription,
      images: [ogImageUrl],
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
