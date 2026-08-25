import { useTranslations } from "next-intl";

export function LiveBadge() {
  const t = useTranslations("schedule");

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-semantic-live/10 px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-semantic-live">
      <span
        aria-hidden
        className="h-2 w-2 rounded-full bg-semantic-live"
        style={{ animation: "live-pulse 1.6s ease-in-out infinite" }}
      />
      {t("live")}
    </span>
  );
}
