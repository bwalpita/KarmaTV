import { db } from "./db";
import { videos, siteConfig } from "./db/schema";
import { YOUTUBE_CHANNEL_ID } from "./constants";

const API_KEY = process.env.YOUTUBE_API_KEY!;
const BASE = "https://www.googleapis.com/youtube/v3";

const CATEGORY_KEYWORDS: Record<string, string[]> = {
  dhamma: ["ධර්ම", "දේශන", "dharma", "dhamma", "sermon", "භාවනා", "meditation"],
  ayurveda: ["ආයුර්වේද", "ayurveda", "herbal"],
  yoga: ["යෝග", "yoga"],
  wellness: ["සෞඛ්‍ය", "health", "wellness"],
  talkshow: ["සාකච්ඡා", "talk", "interview"],
  special: ["විශේෂ", "special", "පෝය"],
};

function guessCategory(title: string, description: string | undefined) {
  const text = `${title} ${description ?? ""}`.toLowerCase();
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some((kw) => text.includes(kw.toLowerCase()))) {
      return category;
    }
  }
  return null;
}

async function fetchJson(url: string) {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`YouTube API error ${res.status}: ${await res.text()}`);
  }
  return res.json();
}

export async function syncYouTubeVideos() {
  const channelData = await fetchJson(
    `${BASE}/channels?part=contentDetails&id=${YOUTUBE_CHANNEL_ID}&key=${API_KEY}`,
  );
  const uploadsPlaylistId =
    channelData.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;
  if (!uploadsPlaylistId) {
    throw new Error("Could not resolve uploads playlist for channel");
  }

  const playlistData = await fetchJson(
    `${BASE}/playlistItems?part=snippet&playlistId=${uploadsPlaylistId}&maxResults=20&key=${API_KEY}`,
  );
  const videoIds: string[] = (playlistData.items ?? [])
    .map((item: { snippet?: { resourceId?: { videoId?: string } } }) =>
      item.snippet?.resourceId?.videoId,
    )
    .filter(Boolean);

  if (videoIds.length === 0) {
    return { synced: 0 };
  }

  const detailsData = await fetchJson(
    `${BASE}/videos?part=snippet,contentDetails,statistics&id=${videoIds.join(",")}&key=${API_KEY}`,
  );

  const now = new Date().toISOString();
  let synced = 0;

  for (const item of detailsData.items ?? []) {
    const snippet = item.snippet;
    const stats = item.statistics;
    if (!snippet) continue;

    await db
      .insert(videos)
      .values({
        id: item.id,
        title: snippet.title,
        description: snippet.description,
        thumbnail:
          snippet.thumbnails?.maxres?.url ??
          snippet.thumbnails?.high?.url ??
          snippet.thumbnails?.medium?.url ??
          "",
        thumbnailMedium: snippet.thumbnails?.medium?.url,
        publishedAt: snippet.publishedAt,
        duration: item.contentDetails?.duration,
        viewCount: Number(stats?.viewCount ?? 0),
        categoryTag: guessCategory(snippet.title, snippet.description),
        syncedAt: now,
      })
      .onConflictDoUpdate({
        target: videos.id,
        set: {
          title: snippet.title,
          description: snippet.description,
          viewCount: Number(stats?.viewCount ?? 0),
          syncedAt: now,
        },
      });
    synced++;
  }

  await db
    .insert(siteConfig)
    .values({ key: "last_sync_at", value: now, updatedAt: now })
    .onConflictDoUpdate({
      target: siteConfig.key,
      set: { value: now, updatedAt: now },
    });

  return { synced };
}
