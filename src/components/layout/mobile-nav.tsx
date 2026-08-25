"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Link } from "@/i18n/navigation";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav({
  links,
  brandLabel,
}: {
  links: { href: string; label: string }[];
  brandLabel: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        className="flex h-10 w-10 items-center justify-center rounded-full text-brand-maroon md:hidden"
        aria-label="Menu"
      >
        <Menu className="h-6 w-6" />
      </SheetTrigger>
      <SheetContent side="right" className="bg-surface-parchment">
        <SheetHeader>
          <SheetTitle className="font-display text-brand-maroon">
            {brandLabel}
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4 pb-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-text-primary transition-colors hover:bg-brand-saffron/10"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
