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
  const post =
    (db.blogPosts || []).find((p) => p.slug === slug || p.id === slug) ||
    db.blogPosts[0];

  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const title = `${post.title.ar} | الموسوعة الهندسية لشركة همم غيم`;
  const description = post.excerpt.ar || post.content.ar.slice(0, 180);

  const ogUrl = new URL(`${siteUrl}/api/og`);
  ogUrl.searchParams.set('category', 'الموسوعة الهندسية ومقالات الخبراء');
  ogUrl.searchParams.set('title', post.title.ar);
  ogUrl.searchParams.set('subtitle', post.excerpt.ar.slice(0, 90));
  if (post.image) {
    ogUrl.searchParams.set('image', post.image);
  }

  return {
    title,
    description,
    keywords: (post.hashtags || []).map((h) => h.replace(/^#/, '').replace(/_/g, ' ')),
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      type: 'article',
      url: canonicalUrl,
      title,
      description,
      publishedTime: post.date,
      siteName: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: post.title.ar,
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

export default async function BlogSlugLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const db = getDb();
  const { slug: rawSlug } = await params;
  const slug = decodeURIComponent(rawSlug);
  const post =
    (db.blogPosts || []).find((p) => p.slug === slug || p.id === slug) ||
    db.blogPosts[0];

  const canonicalUrl = `${siteUrl}/blog/${post.slug}`;
  const fullImgUrl = post.image?.startsWith('http')
    ? post.image
    : `${siteUrl}${encodeURI(post.image?.startsWith('/') ? post.image : `/${post.image || ''}`)}`;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'TechArticle',
        '@id': `${canonicalUrl}#article`,
        headline: post.title.ar,
        alternativeHeadline: post.title.en,
        description: post.excerpt.ar,
        datePublished: post.date,
        dateModified: post.date,
        url: canonicalUrl,
        image: [fullImgUrl],
        author: {
          '@type': 'Organization',
          name: 'شركة همم غيم للدعاية والإعلان والمقاولات العامة',
          url: siteUrl,
        },
        publisher: {
          '@id': `${siteUrl}/#organization`,
        },
        keywords: (post.hashtags || []).join(', '),
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
            name: 'المدونة الهندسية',
            item: `${siteUrl}/blog`,
          },
          {
            '@type': 'ListItem',
            position: 3,
            name: post.title.ar,
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
