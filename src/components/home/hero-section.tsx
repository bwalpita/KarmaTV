import { Calendar, Play } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function HeroSection() {
  const t = await getTranslations("hero");

  return (
    <section className="lotus-glow relative mx-4 mt-6 flex min-h-[500px] items-center justify-center overflow-hidden rounded-2xl px-6 py-20 text-center sm:mx-6 md:mt-8 md:min-h-[600px]">
      <div className="absolute inset-0 bg-brand-plum/20" aria-hidden />
      <div className="relative z-10 flex max-w-3xl flex-col items-center">
        <h1 className="font-display text-4xl font-extrabold leading-tight text-text-inverse md:text-6xl">
          {t("subtitle")}
        </h1>
        <p className="mt-6 max-w-2xl font-body-si text-lg text-text-inverse/90">
          {t("description")}
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/live"
            className="flex items-center gap-2 rounded-full bg-brand-saffron px-8 py-4 font-bold text-brand-plum transition-transform hover:-translate-y-0.5 hover:shadow-xl"
          >
            <Play className="h-5 w-5 fill-current" />
            {t("watchLive")}
          </Link>
          <Link
            href="/schedule"
            className="flex items-center gap-2 rounded-full border-2 border-white/80 px-8 py-4 font-bold text-white transition-colors hover:bg-white/10"
          >
            <Calendar className="h-5 w-5" />
            {t("viewSchedule")}
          </Link>
        </div>
      </div>
    </section>
  );
}
