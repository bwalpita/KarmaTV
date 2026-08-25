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
import { Link } from "@/i18n/navigation";
import { PROGRAM_CATEGORIES, type ProgramCategory } from "@/lib/constants";
import type { programs } from "@/lib/db/schema";

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

export function ProgramCard({
  program,
  locale,
}: {
  program: typeof programs.$inferSelect;
  locale: string;
}) {
  const meta = PROGRAM_CATEGORIES[program.category as ProgramCategory];
  const Icon = meta ? ICONS[meta.icon] : Sparkles;
  const title = locale === "si" ? program.titleSi : program.titleEn;
  const description =
    locale === "si" ? program.descriptionSi : program.descriptionEn;

  return (
    <Link
      href={`/programs/${program.id}`}
      className="group flex flex-col rounded-2xl border border-brand-maroon/10 bg-surface-white p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-md"
    >
      <div
        className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl"
        style={{ backgroundColor: `${meta?.color}20` }}
      >
        <Icon className="h-6 w-6" style={{ color: meta?.color }} />
      </div>
      <h3 className="font-display text-lg font-bold text-brand-maroon group-hover:text-brand-saffron">
        {title}
      </h3>
      {description && (
        <p className="mt-2 line-clamp-3 text-sm text-text-secondary">
          {description}
        </p>
      )}
    </Link>
  );
}
