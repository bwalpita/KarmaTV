import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLatestVideos } from "@/lib/db/queries";
import { VideoGrid } from "@/components/video/video-grid";

export async function LatestVideos() {
  const [home, items] = await Promise.all([
    getTranslations("home"),
    getLatestVideos(8),
  ]);

  return (
    <section className="mx-4 mt-16 sm:mx-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-brand-maroon md:text-3xl">
          {home("latestVideosTitle")}
        </h2>
        <Link
          href="/videos"
          className="text-sm font-bold text-brand-saffron hover:text-brand-maroon"
        >
          {home("viewAllVideos")} →
        </Link>
      </div>
      <VideoGrid videos={items} />
    </section>
  );
}
