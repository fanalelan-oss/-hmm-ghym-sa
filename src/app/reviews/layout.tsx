import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title = 'آراء وتقييمات العملاء | شركة همم غيم للدعاية والإعلان والمقاولات';
const description =
  'اطلع على تقييمات وشهادات عملاء شركة همم غيم في تنفيذ الأحرف البارزة، واجهات الكلادينج، الزجاج السيكوريت، الجبس بورد، تكسيات بديل الشيبورد، والمظلات في الرياض وجدة.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/reviews`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/reviews`,
    title,
    description,
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
    images: [`${siteUrl}/api/og`],
  },
  twitter: {
    card: 'summary_large_image',
    title,
    description,
    images: [`${siteUrl}/api/og`],
  },
};

export default function ReviewsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
