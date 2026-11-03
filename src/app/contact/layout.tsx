import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title = 'اتصل بنا واطلب عرض سعر وتصميم 3D | شركة همم غيم';
const description =
  'تواصل مع فريق شركة همم غيم للدعاية والإعلان والمقاولات: معاينة ميدانية مجانية، استشارات هندسية، وعروض أسعار تنافسية. اتصال وواتساب: 0565467928.';

const ogUrl = new URL(`${siteUrl}/api/og`);
ogUrl.searchParams.set('category', 'طلب عرض سعر ومعاينة ميدانية');
ogUrl.searchParams.set('title', 'تواصل مع فريقنا الهندسي واحصل على معاينة وتصميم 3D');
ogUrl.searchParams.set('subtitle', 'نخدمك في الرياض، جدة، الدمام، وكافة مناطق المملكة');
ogUrl.searchParams.set('warranty', 'استجابة سريعة ومعاينة مجانية');
ogUrl.searchParams.set('city', 'جوال وواتساب: 0565467928');

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/contact`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/contact`,
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

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
