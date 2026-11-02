import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/"],
      },
    ],
    sitemap: "https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app/sitemap.xml",
    host: "https://hmm-ghym-sa--my-saudi-node.us-east4.hosted.app",
  };
}
