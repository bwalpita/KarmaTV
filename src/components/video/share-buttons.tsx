"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export function ShareButtons({
  url,
  title,
  labels,
}: {
  url: string;
  title: string;
  labels: { whatsapp: string; facebook: string; copy: string; copied: string };
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-semantic-whatsapp px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        {labels.whatsapp}
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="rounded-full bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white hover:opacity-90"
      >
        {labels.facebook}
      </a>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(url);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex items-center gap-1.5 rounded-full bg-surface-cream px-4 py-2 text-sm font-semibold text-text-primary hover:bg-brand-saffron/20"
      >
        {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
        {copied ? labels.copied : labels.copy}
      </button>
    </div>
  );
}
