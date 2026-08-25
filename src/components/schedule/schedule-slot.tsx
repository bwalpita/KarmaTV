import { formatTime } from "@/lib/time";

export function ScheduleSlot({
  startTime,
  title,
  isNow,
  isRepeat,
  locale,
  nowLabel,
  repeatLabel,
}: {
  startTime: string;
  title: string;
  isNow: boolean;
  isRepeat: boolean;
  locale: string;
  nowLabel: string;
  repeatLabel: string;
}) {
  return (
    <div
      className={`flex items-center gap-6 border-b border-brand-maroon/5 p-5 last:border-b-0 ${
        isNow ? "border-l-4 border-l-brand-saffron bg-brand-saffron/10" : ""
      }`}
    >
      <span className="min-w-[90px] font-bold text-brand-maroon">
        {formatTime(startTime, locale)}
      </span>
      <span className="text-text-primary">{title}</span>
      <div className="ml-auto flex gap-2">
        {isRepeat && (
          <span className="rounded bg-text-tertiary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-text-tertiary">
            {repeatLabel}
          </span>
        )}
        {isNow && (
          <span className="rounded bg-brand-saffron px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-brand-plum">
            {nowLabel}
          </span>
        )}
      </div>
    </div>
  );
}
