import { getTranslations } from "next-intl/server";
import { SOCIAL_LINKS } from "@/lib/constants";

export async function WhatsAppFab() {
  const t = await getTranslations("whatsapp");

  return (
    <a
      href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(t("prefilledMessage"))}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-6 right-6 z-50 flex h-14 items-center gap-2 overflow-hidden rounded-full bg-semantic-whatsapp px-4 text-white shadow-lg transition-[width] hover:shadow-xl"
      aria-label={t("chatLabel")}
    >
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-7 w-7 shrink-0"
        aria-hidden
      >
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.79 14.1c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.75 1.23 1.61 1.99 1.11.98 2.04 1.29 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.53.33.07.12.07.7-.17 1.37Z" />
      </svg>
      <span className="max-w-0 overflow-hidden whitespace-nowrap text-sm font-semibold opacity-0 transition-all duration-300 group-hover:max-w-xs group-hover:opacity-100">
        {t("chatLabel")}
      </span>
    </a>
  );
}
