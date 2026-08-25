import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { VideoPlayer } from "@/components/video/video-player";
import { VideoGrid } from "@/components/video/video-grid";
import { ShareButtons } from "@/components/video/share-buttons";
import { getVideoById, getRelatedVideos } from "@/lib/db/queries";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; locale: string }>;
}) {
  const { id, locale } = await params;
  const video = await getVideoById(id);
  if (!video) return {};
  return pageMetadata({
    locale,
    path: `/videos/${id}`,
    title: video.title,
    description: video.description ?? "",
  });
}

export default async function VideoDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const video = await getVideoById(id);
  if (!video) notFound();

  const [t, related] = await Promise.all([
    getTranslations("videoDetail"),
    getRelatedVideos(video.categoryTag, video.id),
  ]);

  const url = `${process.env.NEXT_PUBLIC_SITE_URL ?? ""}/videos/${video.id}`;

  return (
    <main className="mx-auto max-w-[1280px] flex-1 px-4 py-16 sm:px-6">
      <VideoPlayer videoId={video.id} title={video.title} />

      <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="font-display text-2xl font-bold text-brand-maroon">
            {video.title}
          </h1>
          <p className="mt-1 text-sm text-text-tertiary">
            {video.publishedAt} · {video.viewCount ?? 0} views
          </p>
        </div>
        <ShareButtons
          url={url}
          title={video.title}
          labels={{
            whatsapp: t("shareWhatsApp"),
            facebook: t("shareFacebook"),
            copy: t("copyLink"),
            copied: t("linkCopied"),
          }}
        />
      </div>

      {video.description && (
        <p className="mt-6 max-w-3xl whitespace-pre-line text-text-secondary">
          {video.description}
        </p>
      )}

      <a
        href={`https://www.youtube.com/watch?v=${video.id}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-block text-sm font-bold text-brand-saffron hover:text-brand-maroon"
      >
        {t("watchOnYouTube")} →
      </a>

      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-bold text-brand-maroon">
            {t("relatedVideos")}
          </h2>
          <VideoGrid videos={related} />
        </section>
      )}
    </main>
  );
}
