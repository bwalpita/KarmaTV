import { getLocale, getTranslations } from "next-intl/server";
import { ScheduleTimeline } from "@/components/schedule/schedule-timeline";
import { getFullWeekSchedule } from "@/lib/db/queries";
import { getColomboNow } from "@/lib/time";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.schedule"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/schedule",
    title: t("title"),
    description: t("description"),
  });
}

const DAY_KEYS = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
] as const;

export default async function SchedulePage() {
  const [t, days, locale] = await Promise.all([
    getTranslations("schedule"),
    getTranslations("schedule.days"),
    getLocale(),
  ]);
  const now = getColomboNow();
  const rows = await getFullWeekSchedule();

  const slotsByDay: Record<number, {
    id: number;
    startTime: string;
    endTime: string;
    title: string;
    isRepeat: boolean;
  }[]> = {};
  for (const { slot, program } of rows) {
    const title = program
      ? locale === "si"
        ? program.titleSi
        : program.titleEn
      : (locale === "si" ? slot.titleOverrideSi : slot.titleOverrideEn) ?? "";
    (slotsByDay[slot.dayOfWeek] ??= []).push({
      id: slot.id,
      startTime: slot.startTime,
      endTime: slot.endTime,
      title,
      isRepeat: Boolean(slot.isRepeat),
    });
  }

  const dayLabels = DAY_KEYS.map((key) => days(key));

  return (
    <main className="mx-auto max-w-[1280px] flex-1 px-4 py-16 sm:px-6">
      <div className="mb-8 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-maroon md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>

      <ScheduleTimeline
        slotsByDay={slotsByDay}
        dayLabels={dayLabels}
        todayIndex={now.dayOfWeek}
        nowMinutes={now.minutes}
        locale={locale}
        labels={{
          today: t("today"),
          nowPlaying: t("nowPlaying"),
          repeat: t("repeat"),
          noPrograms: t("noPrograms"),
        }}
      />
    </main>
  );
}
