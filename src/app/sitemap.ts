import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getActivePrograms, getVideosPage } from "@/lib/db/queries";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://karmatv.lk";

const STATIC_PATHS = [
  "",
  "/live",
  "/programs",
  "/videos",
  "/schedule",
  "/about",
  "/contact",
  "/donate",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [programs, { items: videos }] = await Promise.all([
    getActivePrograms(),
    getVideosPage({ pageSize: 1000 }),
  ]);

  const dynamicPaths = [
    ...programs.map((p) => `/programs/${p.id}`),
    ...videos.map((v) => `/videos/${v.id}`),
  ];

  const allPaths = [...STATIC_PATHS, ...dynamicPaths];

  return routing.locales.flatMap((locale) =>
    allPaths.map((path) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
    })),
  );
}
