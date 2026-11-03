import type { Metadata } from 'next';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

const title = 'شركاء النجاح والجهات المعتمدة | شركة همم غيم بالسعودية';
const description =
  'نعتز بثقة كبرى الجهات الحكومية والشركات في المملكة: المديرية العامة لمكافحة المخدرات، بترومين، البيك، استدامة، صيدليات أستر، التنفيذي، وأمانة الرياض.';

const ogUrl = new URL(`${siteUrl}/api/og`);
ogUrl.searchParams.set('category', 'شركاء النجاح والجهات الكبرى');
ogUrl.searchParams.set('title', 'شركاؤنا في النجاح: جهات حكومية وكبرى الشركات');
ogUrl.searchParams.set('subtitle', 'ثقة مستمرة ومشاريع نوعية منفذة في كافة مدن المملكة');
ogUrl.searchParams.set('warranty', 'تنفيذ معتمد ومطابق للاشتراطات');
ogUrl.searchParams.set('city', 'الرياض · جدة · كافة مناطق المملكة');

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${siteUrl}/partners`,
  },
  openGraph: {
    type: 'website',
    url: `${siteUrl}/partners`,
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

export default function PartnersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
