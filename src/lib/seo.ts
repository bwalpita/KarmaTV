import type { Metadata } from "next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://karmatv.lk";

export function pageMetadata({
  locale,
  path,
  title,
  description,
}: {
  locale: string;
  path: string;
  title: string;
  description: string;
}): Metadata {
  const canonical = `${SITE_URL}/${locale}${path}`;

  return {
    title,
    description,
    alternates: {
      canonical,
      languages: {
        si: `${SITE_URL}/si${path}`,
        en: `${SITE_URL}/en${path}`,
      },
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Karma TV",
      locale: locale === "si" ? "si_LK" : "en_LK",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
