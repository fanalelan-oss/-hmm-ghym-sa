import type { Metadata } from 'next';
import { getDb } from '@/lib/db';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const db = getDb();
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const project =
    db.portfolio.find((p) => p.slug === slug || p.id === slug) || db.portfolio[0];

  const canonicalUrl = `${siteUrl}/portfolio/${project.slug}`;
  const title = `${project.title.ar} | مشاريع شركة همم غيم في ${project.city?.ar || 'السعودية'}`;
  const description = `${project.summary.ar} — تم التنفيذ في ${project.city?.ar || 'المملكة العربية السعودية'} بضمان ${project.warranty?.ar || 'معتمد'}. ${project.alt?.ar || ''}`;

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set('category', 'سابقة أعمال ومشاريع منفذة');
  ogUrl.searchParams.set('title', project.title.ar);
  ogUrl.searchParams.set('subtitle', project.summary.ar);
  ogUrl.searchParams.set('warranty', project.warranty?.ar || 'ضمان معتمد');
  ogUrl.searchParams.set('city', project.city?.ar || 'المملكة العربية السعودية');
  if (project.src && !project.src.endsWith('.mp4')) {
    ogUrl.searchParams.set('image', project.src);
  } else if (project.poster) {
    ogUrl.searchParams.set('image', project.poster);
  }

  const seoAr = (project as any).seoNames?.ar || [];
  const seoEn = (project as any).seoNames?.en || [];

  return {
    title,
    description,
    keywords: [
      project.title.ar,
      project.title.en,
      ...seoAr,
      ...seoEn,
      ...(project.hashtags || []).map((h) => h.replace(/^#/, '').replace(/_/g, ' ')),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title,
      description,
      siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: project.alt?.ar || project.title.ar,
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

export default async function PortfolioSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const db = getDb();
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const project =
    db.portfolio.find((p) => p.slug === slug || p.id === slug) || db.portfolio[0];

  const canonicalUrl = `${siteUrl}/portfolio/${project.slug}`;
  const seoAr = (project as any).seoNames?.ar || [];
  const seoEn = (project as any).seoNames?.en || [];

  const rawImg = project.type === 'video' ? project.poster || project.src : project.src;
  const fullImgUrl = rawImg?.startsWith('http')
    ? rawImg
    : `${siteUrl}${encodeURI(rawImg?.startsWith('/') ? rawImg : `/${rawImg || ''}`)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CreativeWork',
        '@id': `${canonicalUrl}#project`,
        name: project.title.ar,
        alternateName: [project.title.en, ...seoAr, ...seoEn],
        description: project.description?.ar || project.summary.ar,
        url: canonicalUrl,
        locationCreated: {
          '@type': 'Place',
          name: project.city?.ar || 'الرياض، المملكة العربية السعودية',
        },
        creator: {
          '@id': `${siteUrl}/#organization`,
        },
        image: {
          '@type': 'ImageObject',
          contentUrl: fullImgUrl,
          url: fullImgUrl,
          name: seoAr[0] || project.title.ar,
          alternateName: [...seoAr.slice(1), ...seoEn],
          caption: project.alt?.ar || project.title.ar,
          description: project.alt?.en || project.title.en,
        },
        keywords: (project.hashtags || []).join(', '),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'الرئيسية',
            item: siteUrl,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: 'معرض الأعمال والمشاريع',
            item: `${siteUrl}/portfolio`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: project.title.ar,
            item: canonicalUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
