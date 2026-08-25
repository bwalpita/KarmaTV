"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export function CopyField({
  label,
  value,
  copiedLabel,
}: {
  label: string;
  value: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  return (
    <div className="flex items-center justify-between gap-4 rounded-xl bg-surface-cream px-5 py-4">
      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-brand-saffron">
          {label}
        </p>
        <p className="mt-1 font-semibold text-text-primary">{value}</p>
      </div>
      <button
        type="button"
        onClick={async () => {
          await navigator.clipboard.writeText(value);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-brand-maroon hover:bg-brand-saffron/20"
        aria-label={copiedLabel}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
