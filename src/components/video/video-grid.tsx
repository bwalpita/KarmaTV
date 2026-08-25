import { getTranslations } from "next-intl/server";
import { VideoCard } from "./video-card";
import type { videos } from "@/lib/db/schema";

export async function VideoGrid({
  videos: items,
}: {
  videos: (typeof videos.$inferSelect)[];
}) {
  const t = await getTranslations("videos");

  if (items.length === 0) {
    return (
      <p className="py-16 text-center text-text-tertiary">{t("noVideos")}</p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-4">
      {items.map((video) => (
        <VideoCard key={video.id} video={video} />
      ))}
    </div>
  );
}
