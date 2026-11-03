import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title = 'من نحن | البروفايل التعريفي لشركة همم غيم للدعاية والإعلان والمقاولات';
const description =
  'تعرف على شركة همم غيم للدعاية والإعلان والمقاولات العامة في المملكة العربية السعودية: 11 قسماً هندسياً متكاملاً، مصنع أحرف بارزة وكلادينج بالرياض، وضمان رسمي حتى 10 سنوات.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/about`,
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

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
