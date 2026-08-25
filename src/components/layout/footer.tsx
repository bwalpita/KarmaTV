import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { SOCIAL_LINKS, CONTACT } from "@/lib/constants";

function YoutubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M21.6 7.2s-.21-1.5-.86-2.16c-.82-.87-1.74-.87-2.16-.92C15.6 4 12 4 12 4h-.01s-3.6 0-6.58.12c-.42.05-1.34.05-2.16.92C2.6 5.7 2.4 7.2 2.4 7.2S2.18 8.96 2.18 10.72v1.55c0 1.76.22 3.52.22 3.52s.2 1.5.85 2.16c.82.87 1.9.84 2.38.94C7.4 19.06 12 19.1 12 19.1s3.6 0 6.58-.13c.42-.05 1.34-.05 2.16-.92.65-.66.86-2.16.86-2.16s.22-1.76.22-3.52v-1.55c0-1.76-.22-3.52-.22-3.52ZM9.98 14.4V8.8l5.4 2.8-5.4 2.8Z" />
    </svg>
  );
}
function FacebookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M13.5 21v-7.9h2.65l.4-3.08H13.5V8.06c0-.89.25-1.5 1.52-1.5h1.63V3.8c-.28-.04-1.25-.12-2.37-.12-2.35 0-3.95 1.43-3.95 4.06v2.26H7.68v3.08h2.65V21h3.17Z" />
    </svg>
  );
}
function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm5.79 14.1c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.13.11-1.82-.11-.42-.13-.96-.31-1.65-.6-2.9-1.25-4.8-4.17-4.94-4.36-.14-.19-1.18-1.57-1.18-3 0-1.42.75-2.12 1.02-2.41.27-.29.58-.36.78-.36.19 0 .39 0 .56.01.18.01.42-.07.66.5.24.58.83 2 .9 2.15.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.5-.15.15-.3.31-.13.6.17.29.75 1.23 1.61 1.99 1.11.98 2.04 1.29 2.34 1.44.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.64-.14.26.1 1.65.78 1.94.92.28.14.47.21.53.33.07.12.07.7-.17 1.37Z" />
    </svg>
  );
}

export async function Footer() {
  const [t, tNav] = await Promise.all([
    getTranslations("footer"),
    getTranslations("nav"),
  ]);

  const quickLinks = [
    { href: "/", label: tNav("home") },
    { href: "/live", label: tNav("live") },
    { href: "/programs", label: tNav("programs") },
    { href: "/videos", label: tNav("videos") },
    { href: "/schedule", label: tNav("schedule") },
  ] as const;

  const socials = [
    { href: SOCIAL_LINKS.youtube, icon: YoutubeIcon, label: "YouTube" },
    { href: SOCIAL_LINKS.facebook, icon: FacebookIcon, label: "Facebook" },
    { href: SOCIAL_LINKS.whatsapp, icon: WhatsAppIcon, label: "WhatsApp" },
  ] as const;

  return (
    <footer className="bg-brand-maroon-deep text-text-inverse">
      <div className="mx-auto grid max-w-[1280px] gap-10 px-6 py-16 md:grid-cols-4 md:py-24">
        <div className="md:col-span-1">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src="/images/karma-tv-logo.png"
              alt="Karma TV"
              width={44}
              height={44}
              className="h-11 w-11 rounded-full object-cover"
            />
            <span className="font-display text-lg font-bold">{t("tagline")}</span>
          </Link>
          <p className="mt-4 text-sm text-text-inverse/70">{t("description")}</p>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-saffron">
            {t("quickLinks")}
          </h3>
          <ul className="mt-4 space-y-2">
            {quickLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-text-inverse/80 transition-colors hover:text-brand-saffron"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-saffron">
            {t("contactInfo")}
          </h3>
          <ul className="mt-4 space-y-2 text-sm text-text-inverse/80">
            <li>{t("address")}</li>
            <li>{CONTACT.phone1}</li>
            <li>{CONTACT.email}</li>
          </ul>
        </div>

        <div>
          <h3 className="font-display text-sm font-bold uppercase tracking-wide text-brand-saffron">
            {t("followUs")}
          </h3>
          <div className="mt-4 flex gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-brand-saffron hover:text-brand-maroon-deep"
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
          <p className="mt-6 rounded-full bg-white/10 px-4 py-2 text-center text-xs font-semibold text-brand-saffron">
            {t("peoTvChannel")}
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 py-6">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center gap-1 px-6 text-center text-xs text-text-inverse/60 md:flex-row md:justify-between">
          <p>{t("copyright")}</p>
          <p>{t("operatedBy")}</p>
        </div>
      </div>
    </footer>
  );
}
