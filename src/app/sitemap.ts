import { MetadataRoute } from 'next';
import { getDb } from '@/lib/db';

function toAbsoluteEncodedUrl(baseUrl: string, pathOrUrl?: string): string | null {
  if (!pathOrUrl) return null;
  if (pathOrUrl.startsWith('http://') || pathOrUrl.startsWith('https://')) {
    return pathOrUrl;
  }
  const cleanPath = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  if (cleanPath.endsWith('.mp4')) return null;
  return `${baseUrl}${encodeURI(cleanPath)}`;
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    'https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app';

  const db = getDb();
  const now = new Date();

  // Core Landing & Service Pages
  const corePages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: now,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/portfolio`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/partners`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/reviews`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/calculator`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/ai-engineer`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.85,
    },
  ];

  // Dynamic Service Detail Pages (with Google Images Sitemap entries)
  const servicePages: MetadataRoute.Sitemap = (db.services || []).map((srv) => {
    const srvImages = Array.from(
      new Set(
        [
          srv.coverImage,
          ...(srv.gallery || []).map((g: any) => g.src),
        ]
          .map((src) => toAbsoluteEncodedUrl(baseUrl, src))
          .filter((x): x is string => Boolean(x))
      )
    );

    return {
      url: `${baseUrl}/services/${srv.slug}`,
      lastModified: now,
      changeFrequency: 'weekly',
      priority: 0.92,
      images: srvImages.length > 0 ? srvImages : undefined,
    };
  });

  // Dynamic Portfolio Project Pages (with Google Images Sitemap entries)
  const portfolioPages: MetadataRoute.Sitemap = (db.portfolio || []).map((proj) => {
    const projImages = Array.from(
      new Set(
        [
          proj.type === 'video' ? proj.poster : proj.src,
          ...(proj.gallery || []).map((g: any) => (g.type === 'video' ? g.poster : g.src)),
        ]
          .map((src) => toAbsoluteEncodedUrl(baseUrl, src))
          .filter((x): x is string => Boolean(x))
      )
    );

    return {
      url: `${baseUrl}/portfolio/${proj.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.85,
      images: projImages.length > 0 ? projImages : undefined,
    };
  });

  // Dynamic Blog Articles (with Google Images Sitemap entries)
  const blogPages: MetadataRoute.Sitemap = (db.blogPosts || []).map((post) => {
    const postImg = toAbsoluteEncodedUrl(baseUrl, post.image);
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: 'monthly',
      priority: 0.82,
      images: postImg ? [postImg] : undefined,
    };
  });

  return [...corePages, ...servicePages, ...portfolioPages, ...blogPages];
}
