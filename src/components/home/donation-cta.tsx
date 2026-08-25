import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";

export async function DonationCta() {
  const home = await getTranslations("home");

  return (
    <section className="lotus-glow mx-4 mt-16 rounded-2xl px-6 py-16 text-center sm:mx-6">
      <p className="mb-2 text-sm font-bold uppercase tracking-widest text-text-inverse/80">
        {home("peoTvBadge")}
      </p>
      <h2 className="font-display text-2xl font-bold text-text-inverse md:text-3xl">
        {home("donationTitle")}
      </h2>
      <p className="mx-auto mt-4 max-w-xl text-text-inverse/90">
        {home("donationSubtitle")}
      </p>
      <Link
        href="/donate"
        className="mt-8 inline-block rounded-full bg-brand-plum px-8 py-4 font-bold text-text-inverse transition-transform hover:-translate-y-0.5 hover:shadow-xl"
      >
        {home("donateNow")}
      </Link>
    </section>
  );
}
