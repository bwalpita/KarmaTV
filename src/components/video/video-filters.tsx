"use client";

import { useRouter, useSearchParams } from "next/navigation";

const CATEGORIES = [
  { value: "", key: "filterAll" },
  { value: "dhamma", key: "filterDhamma" },
  { value: "wellness", key: "filterWellness" },
  { value: "ayurveda", key: "filterAyurveda" },
  { value: "yoga", key: "filterYoga" },
  { value: "talkshow", key: "filterTalkShows" },
  { value: "special", key: "filterSpecial" },
] as const;

export function VideoFilters({
  labels,
  active,
}: {
  labels: Record<string, string>;
  active: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function setCategory(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("category", value);
    else params.delete("category");
    params.delete("page");
    router.push(`?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map((cat) => (
        <button
          key={cat.value}
          type="button"
          onClick={() => setCategory(cat.value)}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
            active === cat.value
              ? "bg-brand-maroon text-text-inverse"
              : "bg-surface-cream text-text-secondary hover:bg-brand-saffron/20"
          }`}
        >
          {labels[cat.key]}
        </button>
      ))}
    </div>
  );
}
