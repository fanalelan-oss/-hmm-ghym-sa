import type { Metadata } from 'next';
import { getDb } from '@/lib/db';

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const db = getDb();
  const slug = decodeURIComponent(params.slug);
  const project =
    db.portfolio.find((p) => p.slug === slug || p.id === slug) || db.portfolio[0];

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

  const title = `${project.title.ar} | مشاريع شركة همم غيم بالسعودية`;
  const description = `${project.summary.ar} — تم التنفيذ في ${project.city.ar} بضمان ${project.warranty.ar}. شركة همم غيم للدعاية والإعلان والمقاولات.`;

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set('category', 'سابقة أعمال ومشاريع منفذة');
  ogUrl.searchParams.set('title', project.title.ar);
  ogUrl.searchParams.set('subtitle', project.summary.ar);
  ogUrl.searchParams.set('warranty', project.warranty.ar || 'ضمان معتمد');
  ogUrl.searchParams.set('city', project.city.ar || 'المملكة العربية السعودية');
  if (project.src && !project.src.endsWith('.mp4')) {
    ogUrl.searchParams.set('image', project.src);
  } else if (project.poster) {
    ogUrl.searchParams.set('image', project.poster);
  }

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `${siteUrl}/portfolio/${project.slug}`,
      title,
      description,
      siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات',
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.title.ar,
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
}

export default function PortfolioSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
