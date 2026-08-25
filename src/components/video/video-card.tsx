import { Play } from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import type { videos } from "@/lib/db/schema";

function relativeTime(iso: string, locale: string) {
  const diffMs = Date.now() - new Date(iso).getTime();
  const days = Math.floor(diffMs / 86_400_000);
  const rtf = new Intl.RelativeTimeFormat(locale === "si" ? "en" : "en", {
    numeric: "auto",
  });
  if (days < 1) return rtf.format(0, "day");
  return rtf.format(-days, "day");
}

export async function VideoCard({
  video,
}: {
  video: typeof videos.$inferSelect;
}) {
  const [t, locale] = await Promise.all([
    getTranslations("videos"),
    getLocale(),
  ]);

  return (
    <Link href={`/videos/${video.id}`} className="group block">
      <div className="relative mb-3 aspect-video overflow-hidden rounded-xl bg-brand-maroon/5">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
          <Play className="h-12 w-12 fill-white text-white" />
        </div>
      </div>
      <h4 className="mb-1 line-clamp-2 font-bold text-brand-maroon group-hover:text-brand-saffron">
        {video.title}
      </h4>
      <p className="text-xs text-text-tertiary">
        {relativeTime(video.publishedAt, locale)} · {video.viewCount ?? 0}{" "}
        {t("views")}
      </p>
    </Link>
  );
}
