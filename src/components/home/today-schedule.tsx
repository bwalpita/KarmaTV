import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getScheduleForDay } from "@/lib/db/queries";
import { getColomboNow, formatTime } from "@/lib/time";

export async function TodaySchedule() {
  const [t, home, locale] = await Promise.all([
    getTranslations("schedule"),
    getTranslations("home"),
    getLocale(),
  ]);
  const now = getColomboNow();
  const slots = await getScheduleForDay(now.dayOfWeek);

  if (slots.length === 0) return null;

  return (
    <section className="mx-4 mt-16 sm:mx-6">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold text-brand-maroon md:text-3xl">
          {home("todayScheduleTitle")}
        </h2>
        <Link
          href="/schedule"
          className="text-sm font-bold text-brand-saffron hover:text-brand-maroon"
        >
          {home("viewFullSchedule")} →
        </Link>
      </div>
      <div className="overflow-hidden rounded-2xl border border-brand-maroon/10 bg-surface-white shadow-sm">
        {slots.map(({ slot, program }) => {
          const isNow =
            now.minutes >=
              Number(slot.startTime.split(":")[0]) * 60 +
                Number(slot.startTime.split(":")[1]) &&
            now.minutes <
              Number(slot.endTime.split(":")[0]) * 60 +
                Number(slot.endTime.split(":")[1]);
          const title = program
            ? locale === "si"
              ? program.titleSi
              : program.titleEn
            : (locale === "si" ? slot.titleOverrideSi : slot.titleOverrideEn) ??
              "";

          return (
            <div
              key={slot.id}
              className={`flex items-center gap-6 border-b border-brand-maroon/5 p-5 last:border-b-0 ${
                isNow ? "border-l-4 border-l-brand-saffron bg-brand-saffron/10" : ""
              }`}
            >
              <span className="min-w-[90px] font-bold text-brand-maroon">
                {formatTime(slot.startTime, locale)}
              </span>
              <span className="text-text-primary">{title}</span>
              {isNow && (
                <span className="ml-auto rounded bg-brand-saffron px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-plum">
                  {t("nowPlaying")}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
