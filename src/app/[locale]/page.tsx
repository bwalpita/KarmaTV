import { getLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { HeroSection } from "@/components/home/hero-section";
import { NowPlayingBar } from "@/components/home/now-playing-bar";
import { LatestVideos } from "@/components/home/latest-videos";
import { TodaySchedule } from "@/components/home/today-schedule";
import { ProgramsShowcase } from "@/components/home/programs-showcase";
import { DonationCta } from "@/components/home/donation-cta";
import { SocialChannels } from "@/components/home/social-channels";

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.home"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/",
    title: t("title"),
    description: t("description"),
  });
}

export default function Home() {
  return (
    <main className="flex-1 pb-16">
      <HeroSection />
      <NowPlayingBar />
      <LatestVideos />
      <TodaySchedule />
      <ProgramsShowcase />
      <DonationCta />
      <SocialChannels />
    </main>
  );
}
