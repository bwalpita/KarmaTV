import { getLocale, getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact/contact-form";
import { CONTACT, SOCIAL_LINKS } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.contact"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/contact",
    title: t("title"),
    description: t("description"),
  });
}

export default async function ContactPage() {
  const t = await getTranslations("contact");
  const mapSrc = `https://maps.google.com/maps?q=${CONTACT.mapLat},${CONTACT.mapLng}&z=15&output=embed`;

  return (
    <main className="mx-auto max-w-[1280px] flex-1 px-4 py-16 sm:px-6">
      <div className="mb-10 text-center">
        <h1 className="font-display text-3xl font-bold text-brand-maroon md:text-4xl">
          {t("title")}
        </h1>
        <p className="mt-2 text-text-secondary">{t("subtitle")}</p>
      </div>

      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <ContactForm
            labels={{
              name: t("formName"),
              email: t("formEmail"),
              phone: t("formPhone"),
              message: t("formMessage"),
              submit: t("formSubmit"),
              success: t("formSuccess"),
            }}
          />
          <a
            href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(t("whatsAppMessage"))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full bg-semantic-whatsapp px-6 py-3 text-sm font-bold text-white hover:opacity-90"
          >
            {t("orWhatsApp")}
          </a>
        </div>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-xl bg-surface-cream p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-brand-saffron">
                {t("addressTitle")}
              </h3>
              <p className="mt-2 text-sm text-text-primary">{t("address")}</p>
            </div>
            <div className="rounded-xl bg-surface-cream p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-brand-saffron">
                {t("phoneTitle")}
              </h3>
              <p className="mt-2 text-sm text-text-primary">{t("phone1")}</p>
              <p className="text-sm text-text-primary">{t("phone2")}</p>
            </div>
            <div className="rounded-xl bg-surface-cream p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-brand-saffron">
                {t("emailTitle")}
              </h3>
              <p className="mt-2 text-sm text-text-primary">{t("email")}</p>
            </div>
            <div className="rounded-xl bg-surface-cream p-5">
              <h3 className="text-xs font-bold uppercase tracking-wide text-brand-saffron">
                {t("hoursTitle")}
              </h3>
              <p className="mt-2 text-sm text-text-primary">{t("hours")}</p>
            </div>
          </div>

          <iframe
            title="Karma TV location"
            src={mapSrc}
            className="h-64 w-full rounded-2xl border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </main>
  );
}
