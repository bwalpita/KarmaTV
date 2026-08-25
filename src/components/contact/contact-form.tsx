"use client";

import { useState } from "react";
import { CONTACT } from "@/lib/constants";

export function ContactForm({
  labels,
}: {
  labels: {
    name: string;
    email: string;
    phone: string;
    message: string;
    submit: string;
    success: string;
  };
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const phone = String(form.get("phone") ?? "");
    const message = String(form.get("message") ?? "");

    const body = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\n\n${message}`;
    window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(
      `Website inquiry from ${name}`,
    )}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <p className="rounded-xl bg-semantic-success/10 p-6 text-semantic-success">
        {labels.success}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        name="name"
        required
        placeholder={labels.name}
        className="rounded-xl border border-brand-maroon/15 bg-surface-white px-4 py-3 text-sm focus:border-brand-saffron focus:outline-none"
      />
      <input
        name="email"
        type="email"
        required
        placeholder={labels.email}
        className="rounded-xl border border-brand-maroon/15 bg-surface-white px-4 py-3 text-sm focus:border-brand-saffron focus:outline-none"
      />
      <input
        name="phone"
        placeholder={labels.phone}
        className="rounded-xl border border-brand-maroon/15 bg-surface-white px-4 py-3 text-sm focus:border-brand-saffron focus:outline-none"
      />
      <textarea
        name="message"
        required
        rows={5}
        placeholder={labels.message}
        className="rounded-xl border border-brand-maroon/15 bg-surface-white px-4 py-3 text-sm focus:border-brand-saffron focus:outline-none"
      />
      <button
        type="submit"
        className="self-start rounded-full bg-brand-maroon px-8 py-3 text-sm font-bold text-text-inverse hover:opacity-90"
      >
        {labels.submit}
      </button>
    </form>
  );
}
