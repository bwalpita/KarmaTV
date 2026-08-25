import { getLocale, getTranslations } from "next-intl/server";
import { CopyField } from "@/components/donate/copy-field";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const [t, locale] = await Promise.all([
    getTranslations("metadata.donate"),
    getLocale(),
  ]);
  return pageMetadata({
    locale,
    path: "/donate",
    title: t("title"),
    description: t("description"),
  });
}

export default async function DonatePage() {
  const t = await getTranslations("donate");

  return (
    <main className="mx-auto max-w-[800px] flex-1 px-4 py-16 sm:px-6">
      <div className="lotus-glow rounded-2xl px-6 py-14 text-center text-text-inverse">
        <h1 className="font-display text-3xl font-bold md:text-4xl">
          {t("heading")}
        </h1>
        <p className="mt-4 font-body-si text-lg text-brand-saffron">
          {t("quotePali")}
        </p>
        <p className="text-text-inverse/90">{t("quoteTranslation")}</p>
      </div>

      <p className="mt-10 text-center text-text-secondary">{t("intro")}</p>
      <p className="mt-6 text-center font-semibold text-brand-maroon">
        {t("waysToContribute")}
      </p>

      <section className="mt-8 rounded-2xl border border-brand-maroon/10 bg-surface-white p-8">
        <h2 className="mb-6 font-display text-xl font-bold text-brand-maroon">
          {t("bankTransfer.heading")}
        </h2>
        <div className="flex flex-col gap-3">
          <CopyField
            label={t("bankTransfer.accountNameLabel")}
            value={t("bankTransfer.accountName")}
            copiedLabel={t("bankTransfer.accountNameLabel")}
          />
          <CopyField
            label={t("bankTransfer.bankLabel")}
            value={t("bankTransfer.bankPlaceholder")}
            copiedLabel={t("bankTransfer.bankLabel")}
          />
          <CopyField
            label={t("bankTransfer.branchLabel")}
            value={t("bankTransfer.branch")}
            copiedLabel={t("bankTransfer.branchLabel")}
          />
          <CopyField
            label={t("bankTransfer.accountNumberLabel")}
            value={t("bankTransfer.accountNumberPlaceholder")}
            copiedLabel={t("bankTransfer.accountNumberLabel")}
          />
        </div>
      </section>

      <p className="mt-8 text-center text-sm text-text-secondary">
        {t("acknowledgement")}
        <br />
        {t("moreInfo")}
      </p>
      <p className="mt-6 text-center font-display text-lg font-bold text-brand-saffron">
        {t("thanks")}
      </p>
    </main>
  );
}
