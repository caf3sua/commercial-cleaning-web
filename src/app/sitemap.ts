import { MetadataRoute } from "next";
import { getServices, getNews } from "@/services/dataService";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://vesinh247.com";

  // Base routes
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/bao-gia`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/dich-vu`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tin-tuc`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Dynamic service routes
  try {
    const services = await getServices();
    const serviceRoutes = services.map((service) => ({
      url: `${baseUrl}/dich-vu/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
    routes.push(...serviceRoutes);
  } catch (error) {
    console.error("Error generating service routes for sitemap:", error);
  }

  // Dynamic news routes
  try {
    const news = await getNews();
    const newsRoutes = news.map((item) => ({
      url: `${baseUrl}/tin-tuc/${item.slug}`,
      lastModified: new Date(item.publishDate || new Date()),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
    routes.push(...newsRoutes);
  } catch (error) {
    console.error("Error generating news routes for sitemap:", error);
  }

  return routes;
}
