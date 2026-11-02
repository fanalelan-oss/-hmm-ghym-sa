import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title = 'حاسبة التكلفة الفورية للوحات والواجهات | شركة همم غيم بالسعودية';
const description =
  'احسب تكلفة لوحتك الإعلانية أو واجهة متجرك فورياً: أحرف بارزة زنكور وإكريليك، واجهات كلادينج، ومظلات وسواتر مع مواصفات فنية دقيقة وضمان 10 سنوات.';

const ogUrl = new URL(`${siteUrl}/api/og`);
ogUrl.searchParams.set('category', 'أداة التسعير التقديري الفوري');
ogUrl.searchParams.set('title', 'احسب تكلفة لوحتك الإعلانية وواجهة متجرك فورياً');
ogUrl.searchParams.set('subtitle', 'حاسبة ذكية وفورية للأحرف البارزة والكلادينج والمظلات');
ogUrl.searchParams.set('warranty', 'تسليم مفتاح وضمان 10 سنوات');
ogUrl.searchParams.set('city', 'كافة مناطق المملكة');
ogUrl.searchParams.set(
  'image',
  'saudi-3d-signage-cladding-letters-black-stamp-cafe-sign-himam-ghaim.webp'
);

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${siteUrl}/calculator`,
    title,
    description,
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات',
    images: [
      {
        url: ogUrl.toString(),
        width: 1200,
        height: 630,
        alt: title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [ogUrl.toString()],
  },
};

export default function CalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
