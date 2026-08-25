import { asc, eq } from "drizzle-orm";
import { db } from "./index";
import { programs, scheduleSlots, siteConfig, videos } from "./schema";

export async function getActivePrograms() {
  return db
    .select()
    .from(programs)
    .where(eq(programs.isActive, true))
    .orderBy(asc(programs.sortOrder));
}

export async function getProgramById(id: string) {
  const rows = await db.select().from(programs).where(eq(programs.id, id));
  return rows[0] ?? null;
}

export async function getScheduleForDay(dayOfWeek: number) {
  const rows = await db
    .select({
      slot: scheduleSlots,
      program: programs,
    })
    .from(scheduleSlots)
    .leftJoin(programs, eq(scheduleSlots.programId, programs.id))
    .where(eq(scheduleSlots.dayOfWeek, dayOfWeek))
    .orderBy(asc(scheduleSlots.startTime));
  return rows;
}

export async function getFullWeekSchedule() {
  const rows = await db
    .select({
      slot: scheduleSlots,
      program: programs,
    })
    .from(scheduleSlots)
    .leftJoin(programs, eq(scheduleSlots.programId, programs.id))
    .orderBy(asc(scheduleSlots.dayOfWeek), asc(scheduleSlots.startTime));
  return rows;
}

export async function getLatestVideos(limit = 8) {
  return db
    .select()
    .from(videos)
    .orderBy(videos.publishedAt)
    .limit(limit);
}

export async function getVideosPage({
  category,
  page = 1,
  pageSize = 12,
}: {
  category?: string;
  page?: number;
  pageSize?: number;
}) {
  const query = db.select().from(videos);
  const rows = category
    ? await query.where(eq(videos.categoryTag, category))
    : await query;

  const sorted = rows.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));
  const start = (page - 1) * pageSize;
  return {
    items: sorted.slice(start, start + pageSize),
    total: sorted.length,
  };
}

export async function getVideoById(id: string) {
  const rows = await db.select().from(videos).where(eq(videos.id, id));
  return rows[0] ?? null;
}

export async function getScheduleForProgram(programId: string) {
  return db
    .select()
    .from(scheduleSlots)
    .where(eq(scheduleSlots.programId, programId))
    .orderBy(asc(scheduleSlots.dayOfWeek), asc(scheduleSlots.startTime));
}

export async function getVideosByProgramId(programId: string) {
  return db.select().from(videos).where(eq(videos.programId, programId));
}

export async function getRelatedVideos(categoryTag: string | null, excludeId: string, limit = 4) {
  if (!categoryTag) return [];
  const rows = await db
    .select()
    .from(videos)
    .where(eq(videos.categoryTag, categoryTag));
  return rows.filter((v) => v.id !== excludeId).slice(0, limit);
}

export async function getSiteConfig(key: string) {
  const rows = await db
    .select()
    .from(siteConfig)
    .where(eq(siteConfig.key, key));
  return rows[0]?.value ?? null;
}

export function currentSlot<T extends { slot: typeof scheduleSlots.$inferSelect }>(
  slots: T[],
  nowMinutes: number,
) {
  return slots.find(({ slot }) => {
    const [sh, sm] = slot.startTime.split(":").map(Number);
    const [eh, em] = slot.endTime.split(":").map(Number);
    const start = sh * 60 + sm;
    const end = eh * 60 + em;
    return nowMinutes >= start && nowMinutes < end;
  });
}
