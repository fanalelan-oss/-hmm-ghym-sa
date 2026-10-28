import { MetadataRoute } from "next";
import { getDb } from "@/lib/db";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://hamamghaym.com";
  const db = getDb();

  const staticPages: MetadataRoute.Sitemap = [
    "",
    "/services",
    "/portfolio",
    "/ai-engineer",
    "/calculator",
    "/reviews",
    "/partners",
    "/about",
    "/blog",
    "/contact",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "daily" : "weekly",
    priority: route === "" ? 1.0 : 0.9,
  }));

  const servicePages: MetadataRoute.Sitemap = (db.services || []).map((srv) => ({
    url: `${baseUrl}/services/${srv.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.95,
  }));

  const portfolioPages: MetadataRoute.Sitemap = (db.portfolio || []).map(
    (proj) => ({
      url: `${baseUrl}/portfolio/${proj.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.85,
    })
  );

  const blogPages: MetadataRoute.Sitemap = (db.blogPosts || []).map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...servicePages, ...portfolioPages, ...blogPages];
}
