import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title =
  'المدونة والموسوعة الهندسية (أدلة الأحرف البارزة، الكلادينج، الشيبورد، والجبس بورد) | شركة همم غيم';
const description =
  'اقرأ مقالات وأدلة مهندسي شركة همم غيم حول اختيار الأحرف البارزة، مواصفات الكلادينج المقاوم للحريق، الواجهات الزجاجية، الجبس بورد والأسمنت بورد، تكسيات بديل الشيبورد، المظلات، واشتراطات البلدية.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/blog`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/blog`,
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

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
