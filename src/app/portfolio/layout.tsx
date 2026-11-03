import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title =
  'معرض الأعمال والمشاريع المنفذة (145+ مشروع موثق بالصور والفيديو) | شركة همم غيم';
const description =
  'استعرض أكثر من 145 مشروعاً منفذاً لشركة همم غيم في الرياض وجدة والمملكة: أحرف بارزة ولوحات محلات، واجهات كلادينج، زجاج سيكوريت، جبس بورد وأسمنت بورد، تكسيات بديل الشيبورد، مظلات وسواتر، تسوير مشاريع، ومعارض.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/portfolio`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/portfolio`,
    title,
    description,
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
    images: [
      {
        url: `${siteUrl}/api/og?category=${encodeURIComponent('سابقة الأعمال والمشاريع المنفذة')}&title=${encodeURIComponent('أكثر من 145 مشروعاً منفذاً في الرياض وجدة وكافة مدن المملكة')}`,
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
    images: [`${siteUrl}/api/og`],
  },
};

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
