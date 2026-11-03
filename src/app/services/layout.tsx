import type { Metadata } from 'next';
import { getDb } from '@/lib/db';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title =
  'أقسامنا الهندسية الـ 11 (الأحرف البارزة، الكلادينج، الزجاج، الجبس بورد، الشيبورد، المظلات، الأمن والسلامة) | شركة همم غيم';
const description =
  'تصفح أقسام شركة همم غيم الـ 11 في الرياض وجدة والمملكة: الأحرف البارزة واللوحات الإعلانية، واجهات الكلادينج، الواجهات الزجاجية والسيكوريت، الجبس بورد والأسمنت بورد، تكسيات بديل الشيبورد، المظلات والسواتر، الاستيكرات، تسوير المشاريع، تجهيز المعارض، الأمن والسلامة، وكاميرات المراقبة.';

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/services`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/services`,
    title,
    description,
    siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
    images: [
      {
        url: `${siteUrl}/api/og?category=${encodeURIComponent('أقسامنا الهندسية الـ 11')}&title=${encodeURIComponent('كل ما يحتاجه مشروعك من الحرف البارز والكلادينج إلى الشيبورد والجبس بورد')}`,
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

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const db = getDb();
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'أقسام شركة همم غيم الهندسية والإعلانية الـ 11',
    numberOfItems: db.services.length,
    itemListElement: db.services.map((srv, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `${siteUrl}/services/${srv.slug}`,
      name: srv.name.ar,
      description: srv.tagline.ar,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      {children}
    </>
  );
}
