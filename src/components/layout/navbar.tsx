import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { LiveBadge } from "@/components/ui/live-badge";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { MobileNav } from "@/components/layout/mobile-nav";

export async function Navbar() {
  const [t, tHero] = await Promise.all([
    getTranslations("nav"),
    getTranslations("hero"),
  ]);

  const links = [
    { href: "/", label: t("home") },
    { href: "/live", label: t("live") },
    { href: "/programs", label: t("programs") },
    { href: "/videos", label: t("videos") },
    { href: "/schedule", label: t("schedule") },
    { href: "/about", label: t("about") },
    { href: "/contact", label: t("contact") },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-brand-maroon/10 bg-surface-parchment/85 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-[1280px] items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/images/karma-tv-logo.png"
            alt="Karma TV"
            width={40}
            height={40}
            className="h-10 w-10 rounded-full object-cover"
            priority
          />
          <span className="font-display text-xl font-bold text-brand-maroon">
            {tHero("tagline")}
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-text-secondary transition-colors hover:bg-brand-saffron/10 hover:text-brand-maroon"
            >
              {link.label}
              {link.href === "/live" && <LiveBadge />}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <Link
            href="/donate"
            className="hidden rounded-full bg-brand-maroon px-5 py-2 text-sm font-semibold text-text-inverse transition-transform hover:-translate-y-0.5 hover:shadow-lg sm:inline-block"
          >
            {t("donate")}
          </Link>
          <MobileNav
            links={[...links, { href: "/donate", label: t("donate") }]}
            brandLabel={tHero("tagline")}
          />
        </div>
      </div>
    </header>
  );
}
