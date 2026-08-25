import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const programs = sqliteTable("programs", {
  id: text("id").primaryKey(),
  titleSi: text("title_si").notNull(),
  titleEn: text("title_en").notNull(),
  descriptionSi: text("description_si"),
  descriptionEn: text("description_en"),
  category: text("category").notNull(),
  thumbnail: text("thumbnail"),
  youtubePlaylistId: text("youtube_playlist_id"),
  isActive: integer("is_active", { mode: "boolean" }).default(true),
  sortOrder: integer("sort_order").default(0),
  createdAt: text("created_at").default("CURRENT_TIMESTAMP"),
});

export const videos = sqliteTable("videos", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description"),
  thumbnail: text("thumbnail").notNull(),
  thumbnailMedium: text("thumbnail_medium"),
  publishedAt: text("published_at").notNull(),
  duration: text("duration"),
  viewCount: integer("view_count").default(0),
  categoryTag: text("category_tag"),
  programId: text("program_id").references(() => programs.id),
  syncedAt: text("synced_at").notNull(),
});

export const scheduleSlots = sqliteTable("schedule_slots", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  dayOfWeek: integer("day_of_week").notNull(),
  startTime: text("start_time").notNull(),
  endTime: text("end_time").notNull(),
  programId: text("program_id").references(() => programs.id),
  titleOverrideSi: text("title_override_si"),
  titleOverrideEn: text("title_override_en"),
  isLive: integer("is_live", { mode: "boolean" }).default(false),
  isRepeat: integer("is_repeat", { mode: "boolean" }).default(false),
});

export const siteConfig = sqliteTable("site_config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at"),
});
