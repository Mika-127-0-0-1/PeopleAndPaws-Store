import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/seo";
import getCategories from "@/actions/get-categories";
import getProducts from "@/actions/get-products";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: absoluteUrl("/"), changeFrequency: "weekly", priority: 1 },
    { url: absoluteUrl("/contact-us"), changeFrequency: "yearly", priority: 0.5 },
    { url: absoluteUrl("/ship"), changeFrequency: "yearly", priority: 0.3 },
    { url: absoluteUrl("/terms"), changeFrequency: "yearly", priority: 0.2 },
    { url: absoluteUrl("/privacy"), changeFrequency: "yearly", priority: 0.2 },
  ];

  try {
    const [categories, products] = await Promise.all([
      getCategories(),
      getProducts({}),
    ]);

    return [
      ...staticPages,
      ...categories.map((category) => ({
        url: absoluteUrl(`/category/${category.id}`),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
      ...products.map((product) => ({
        url: absoluteUrl(`/product/${product.id}`),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      })),
    ];
  } catch {
    return staticPages;
  }
}
