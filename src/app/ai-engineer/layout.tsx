import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title = 'المهندس الذكي للاستشارات الفنية واللوحات | شركة همم غيم';
const description =
  'استشر المهندس الذكي 24/7 حول اشتراطات منصة بلدي، كود البناء السعودي، اختيار خامات اللوحات، وواجهات الكلادينج والمقاولات العامة.';

const ogUrl = new URL(`${siteUrl}/api/og`);
ogUrl.searchParams.set('category', 'المهندس الذكي للاستشارات الهندسية');
ogUrl.searchParams.set('title', 'استشارات فورية لاشتراطات بلدي وخامات اللوحات');
ogUrl.searchParams.set('subtitle', 'مساعد ذكي يعمل 24/7 للإجابة عن التراخيص والتسعير');
ogUrl.searchParams.set('warranty', 'استشارات فنية معتمدة');
ogUrl.searchParams.set('city', 'المملكة العربية السعودية');

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    type: 'website',
    url: `${siteUrl}/ai-engineer`,
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

export default function AiEngineerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
