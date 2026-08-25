import {
  BookOpen,
  Heart,
  Leaf,
  Flower2,
  Home,
  Star,
  Mic,
  Sparkles,
  type LucideIcon,
} from "lucide-react";
import { getLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getActivePrograms } from "@/lib/db/queries";
import { PROGRAM_CATEGORIES, type ProgramCategory } from "@/lib/constants";

const ICONS: Record<string, LucideIcon> = {
  BookOpen,
  Heart,
  Leaf,
  Flower2,
  Home,
  Star,
  Mic,
  Sparkles,
};

export async function ProgramsShowcase() {
  const [home, locale, allPrograms] = await Promise.all([
    getTranslations("home"),
    getLocale(),
    getActivePrograms(),
  ]);

  if (allPrograms.length === 0) return null;

  return (
    <section className="mx-4 mt-16 rounded-2xl bg-surface-cream px-6 py-16 sm:mx-6">
      <div className="mb-10 text-center">
        <h2 className="font-display text-2xl font-bold text-brand-maroon md:text-3xl">
          {home("ourProgramsTitle")}
        </h2>
        <p className="mt-2 text-text-secondary">{home("ourProgramsSubtitle")}</p>
      </div>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
        {allPrograms.map((program) => {
          const meta =
            PROGRAM_CATEGORIES[program.category as ProgramCategory];
          const Icon = meta ? ICONS[meta.icon] : Sparkles;
          const title = locale === "si" ? program.titleSi : program.titleEn;

          return (
            <Link
              key={program.id}
              href={`/programs/${program.id}`}
              className="group flex flex-col items-center gap-3 rounded-xl bg-surface-white p-6 text-center shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
            >
              <Icon
                className="h-10 w-10 transition-transform group-hover:scale-110"
                style={{ color: meta?.color }}
              />
              <span className="font-bold text-brand-maroon">{title}</span>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 text-center">
        <Link
          href="/programs"
          className="inline-block rounded-full border-2 border-brand-maroon px-6 py-2 text-sm font-bold text-brand-maroon transition-colors hover:bg-brand-maroon hover:text-text-inverse"
        >
          {home("viewAllPrograms")}
        </Link>
      </div>
    </section>
  );
}
