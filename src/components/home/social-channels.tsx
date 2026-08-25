import { getTranslations } from "next-intl/server";
import { SOCIAL_LINKS } from "@/lib/constants";

export async function SocialChannels() {
  const home = await getTranslations("home");

  const channels = [
    { href: SOCIAL_LINKS.youtube, label: "YouTube" },
    { href: SOCIAL_LINKS.facebook, label: "Facebook" },
    { href: SOCIAL_LINKS.whatsapp, label: "WhatsApp" },
  ];

  return (
    <section className="mx-4 my-16 text-center sm:mx-6">
      <h2 className="mb-6 font-display text-xl font-bold text-brand-maroon">
        {home("connectWithUs")}
      </h2>
      <div className="flex flex-wrap items-center justify-center gap-4">
        {channels.map((channel) => (
          <a
            key={channel.label}
            href={channel.href}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand-maroon/20 px-6 py-2 text-sm font-semibold text-brand-maroon transition-colors hover:border-brand-saffron hover:bg-brand-saffron/10"
          >
            {channel.label}
          </a>
        ))}
      </div>
    </section>
  );
}
