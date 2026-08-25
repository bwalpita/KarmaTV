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

export function ProgramHeader({
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
    <div className="lotus-glow rounded-2xl px-6 py-16 text-center text-text-inverse">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15">
        <Icon className="h-8 w-8" />
      </div>
      <h1 className="font-display text-3xl font-bold md:text-4xl">{title}</h1>
      {description && (
        <p className="mx-auto mt-4 max-w-2xl text-text-inverse/90">
          {description}
        </p>
      )}
    </div>
  );
}
