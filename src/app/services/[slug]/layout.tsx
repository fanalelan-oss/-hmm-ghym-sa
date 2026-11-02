import type { Metadata } from 'next';
import { getDb } from '@/lib/db';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const db = getDb();
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const service =
    db.services.find((s) => s.slug === slug || s.id === slug) || db.services[0];

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

  const title = `${service.name.ar} | شركة همم غيم بالسعودية`;
  const description = `${service.description.ar} — ${service.tagline.ar}. تنفيذ هندسي معتمد وضمان حتى 10 سنوات مطابق لاشتراطات منصة بلدي.`;

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set('category', service.name.ar);
  ogUrl.searchParams.set('title', service.tagline.ar || service.name.ar);
  ogUrl.searchParams.set('subtitle', service.shortName.ar);
  ogUrl.searchParams.set('warranty', 'ضمان معتمد حتى 10 سنوات');
  ogUrl.searchParams.set('city', 'كافة مناطق المملكة');
  if (service.coverImage) {
    ogUrl.searchParams.set('image', service.coverImage);
  }

  return {
    title,
    description,
    openGraph: {
      type: 'website',
      url: `${siteUrl}/services/${service.slug}`,
      title,
      description,
      siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات',
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: service.name.ar,
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

export default function ServiceSlugLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
