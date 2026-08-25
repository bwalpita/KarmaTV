import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";
import { ProgramHeader } from "@/components/program/program-header";
import { VideoGrid } from "@/components/video/video-grid";
import {
  getProgramById,
  getScheduleForProgram,
  getVideosByProgramId,
  getActivePrograms,
} from "@/lib/db/queries";
import { formatTime } from "@/lib/time";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const program = await getProgramById(slug);
  if (!program) return {};
  return pageMetadata({
    locale,
    path: `/programs/${slug}`,
    title: locale === "si" ? program.titleSi : program.titleEn,
    description:
      (locale === "si" ? program.descriptionSi : program.descriptionEn) ?? "",
  });
}

export async function generateStaticParams() {
  const allPrograms = await getActivePrograms();
  return allPrograms.map((p) => ({ slug: p.id }));
}

const DAY_LABELS_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const DAY_LABELS_SI = [
  "ඉරිදා",
  "සඳුදා",
  "අඟහරුවාදා",
  "බදාදා",
  "බ්‍රහස්පතින්දා",
  "සිකුරාදා",
  "සෙනසුරාදා",
];

export default async function ProgramDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const program = await getProgramById(slug);
  if (!program) notFound();

  const [t, locale, schedule, episodes] = await Promise.all([
    getTranslations("programs"),
    getLocale(),
    getScheduleForProgram(slug),
    getVideosByProgramId(slug),
  ]);

  const dayLabels = locale === "si" ? DAY_LABELS_SI : DAY_LABELS_EN;

  return (
    <main className="mx-auto max-w-[1280px] flex-1 px-4 py-16 sm:px-6">
      <ProgramHeader program={program} locale={locale} />

      {schedule.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 font-display text-xl font-bold text-brand-maroon">
            {t("scheduleLabel")}
          </h2>
          <div className="flex flex-wrap gap-3">
            {schedule.map((slot) => (
              <span
                key={slot.id}
                className="rounded-full bg-surface-cream px-4 py-2 text-sm font-semibold text-text-primary"
              >
                {dayLabels[slot.dayOfWeek]} {formatTime(slot.startTime, locale)}–
                {formatTime(slot.endTime, locale)}
              </span>
            ))}
          </div>
        </section>
      )}

      {episodes.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-6 font-display text-xl font-bold text-brand-maroon">
            {t("episodesLabel")}
          </h2>
          <VideoGrid videos={episodes} />
        </section>
      )}
    </main>
  );
}
