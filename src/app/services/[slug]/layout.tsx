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
  const service =
    db.services.find((s) => s.slug === slug || s.id === slug) || db.services[0];

  const canonicalUrl = `${siteUrl}/services/${service.slug}`;
  const title = `${service.name.ar} | الأسعار والمواصفات والأعمال المنفذة | شركة همم غيم`;
  const description = `${service.tagline.ar} — ${service.description.ar.slice(0, 180)}... تسعير تقديري: ${service.priceRange.ar}. ضمان رسمي معتمد.`;

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set('category', service.name.ar);
  ogUrl.searchParams.set('title', service.tagline.ar || service.name.ar);
  ogUrl.searchParams.set('subtitle', service.shortName.ar);
  ogUrl.searchParams.set('warranty', 'ضمان معتمد حتى 10 سنوات');
  ogUrl.searchParams.set('city', 'الرياض · جدة · كافة مناطق المملكة');
  if (service.coverImage) {
    ogUrl.searchParams.set('image', service.coverImage);
  } else if (service.gallery?.[0]?.src) {
    ogUrl.searchParams.set('image', service.gallery[0].src);
  }

  return {
    title,
    description,
    keywords: [
      service.name.ar,
      service.shortName.ar,
      service.name.en,
      ...(service.hashtags || []).map((h) => h.replace(/^#/, '').replace(/_/g, ' ')),
    ],
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'website',
      url: canonicalUrl,
      title,
      description,
      siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
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

export default async function ServiceSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const db = getDb();
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const service =
    db.services.find((s) => s.slug === slug || s.id === slug) || db.services[0];

  const canonicalUrl = `${siteUrl}/services/${service.slug}`;

  // Build Rich JSON-LD: Service + FAQPage + BreadcrumbList + ImageObjects with 6 SEO names
  const imageObjects = (service.gallery || []).map((g: any) => {
    const arNames = g.seoNames?.ar || [];
    const enNames = g.seoNames?.en || [];
    const rawSrc = g.src || '';
    const fullImgUrl = rawSrc.startsWith('http')
      ? rawSrc
      : `${siteUrl}${encodeURI(rawSrc.startsWith('/') ? rawSrc : `/${rawSrc}`)}`;
    return {
      '@type': 'ImageObject',
      contentUrl: fullImgUrl,
      url: fullImgUrl,
      name: arNames[0] || service.name.ar,
      alternateName: [...arNames.slice(1), ...enNames],
      caption: g.alt?.ar || service.name.ar,
      description: g.alt?.en || service.name.en,
    };
  });

  const graph: any[] = [
    {
      '@type': 'Service',
      '@id': `${canonicalUrl}#service`,
      name: service.name.ar,
      alternateName: [service.shortName.ar, service.name.en, service.shortName.en],
      description: service.description.ar,
      url: canonicalUrl,
      provider: {
        '@id': `${siteUrl}/#organization`,
      },
      areaServed: ['الرياض', 'جدة', 'الدمام', 'المملكة العربية السعودية'],
      image: imageObjects,
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
          name: 'الأقسام الهندسية والخدمات',
          item: `${siteUrl}/services`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: service.name.ar,
          item: canonicalUrl,
        },
      ],
    },
  ];

  if (service.faqs && service.faqs.length > 0) {
    graph.push({
      '@type': 'FAQPage',
      mainEntity: service.faqs.map((f) => ({
        '@type': 'Question',
        name: f.q.ar,
        acceptedAnswer: {
          '@type': 'Answer',
          text: f.a.ar,
        },
      })),
    });
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': graph,
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
