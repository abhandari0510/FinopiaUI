"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/providers";
import { translations } from "@/i18n/translations";

type CheckoutForm = {
  bookEdition: "mr" | "en";
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
};

const WHATSAPP_NUMBER = "+919977696796";

const initialForm: CheckoutForm = {
  bookEdition: "mr",
  name: "",
  email: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "Maharashtra",
  postalCode: "",
};

function validateForm(form: CheckoutForm, messages: { name: string; email: string; phone: string; address: string; city: string; state: string; postalCode: string }) {
  if (form.name.trim().length < 2) return messages.name;
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return messages.email;
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) return messages.phone;
  if (form.addressLine1.trim().length < 8) return messages.address;
  if (form.city.trim().length < 2) return messages.city;
  if (form.state.trim().length < 2) return messages.state;
  if (!/^\d{6}$/.test(form.postalCode)) return messages.postalCode;
  return "";
}

function buildWhatsAppMessage(form: CheckoutForm, locale: "en" | "mr") {
  const bookTitle = locale === "mr"
    ? form.bookEdition === "mr" ? "पैशाचे शहाणपण (मराठी आवृत्ती)" : "Money Wisdom (इंग्रजी आवृत्ती)"
    : form.bookEdition === "mr" ? "Paishache Shahanpan (Marathi edition)" : "Money Wisdom (English edition)";
  if (locale === "mr") {
    return [
      `नमस्कार Finopia, मला ${bookTitle} पुस्तकाची ऑर्डर करायची आहे.`,
      `नाव: ${form.name.trim()}`,
      `ईमेल: ${form.email.trim()}`,
      `मोबाईल: ${form.phone.trim()}`,
      `पत्ता: ${form.addressLine1.trim()}`,
      `शहर: ${form.city.trim()}`,
      `राज्य: ${form.state.trim()}`,
      `पिन कोड: ${form.postalCode.trim()}`,
      "कृपया ऑर्डर करण्यासाठी मदत करा.",
    ].join("\n");
  }
  const lines = [
    `Hi Finopia, I want to buy ${bookTitle}.`,
    `Name: ${form.name.trim()}`,
    `Email: ${form.email.trim()}`,
    `Phone: ${form.phone.trim()}`,
    `Address: ${form.addressLine1.trim()}`,
    `City: ${form.city.trim()}`,
    `State: ${form.state.trim()}`,
    `PIN: ${form.postalCode.trim()}`,
    "Please help me place the order.",
  ];
  return lines.join("\n");
}

function buildWhatsAppLink(form: CheckoutForm, locale: "en" | "mr") {
  const message = encodeURIComponent(buildWhatsAppMessage(form, locale));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function BookCheckout({ anchorId = "buy" }: { anchorId?: string }) {
  const { locale } = useLanguage();
  const copy = translations[locale].bookOrder;
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const [error, setError] = useState("");

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  if (status === "submitted") {
    return (
      <div id={anchorId} className="checkout-card checkout-success">
        <CheckCircle2 />
        <span>{copy.successKicker}</span>
        <h3>{copy.successTitle}</h3>
        <p>{copy.successDescription}</p>
        <Button type="button" variant="secondary" onClick={() => setStatus("idle")} data-faro-user-action-name="checkout.success.try-again">{copy.tryAgain}</Button>
      </div>
    );
  }

  return (
    <div id={anchorId} className="checkout-card">
      <div className="checkout-heading">
        <span><ShoppingBag size={15} /> {copy.kicker}</span>
        <strong>{copy.title}</strong>
        <p>{copy.description}</p>
      </div>

      <form onSubmit={(event) => {
        event.preventDefault();
        setError("");

        const validationError = validateForm(form, copy.errors);
        if (validationError) {
          setError(validationError);
          return;
        }

        const whatsappLink = buildWhatsAppLink(form, locale);
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
        setStatus("submitted");
      }}>
        <div className="checkout-grid">
        <label>{copy.editionLabel}<select value={form.bookEdition} onChange={(event) => updateField("bookEdition", event.target.value as CheckoutForm["bookEdition"])}><option value="mr">{copy.marathiOption}</option><option value="en">{copy.englishOption}</option></select></label>
        <label>{copy.fullName}<input value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" /></label>
        <label>{copy.email}<input value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" autoComplete="email" /></label>
        <label>{copy.mobile}<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} inputMode="numeric" autoComplete="tel" /></label>
        <label>{copy.pin}<input value={form.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} inputMode="numeric" autoComplete="postal-code" /></label>
      </div>

      <label>{copy.address}<textarea value={form.addressLine1} onChange={(event) => updateField("addressLine1", event.target.value)} rows={3} autoComplete="street-address" /></label>

        <div className="checkout-grid">
          <label>{copy.city}<input value={form.city} onChange={(event) => updateField("city", event.target.value)} autoComplete="address-level2" /></label>
          <label>{copy.state}<input value={form.state} onChange={(event) => updateField("state", event.target.value)} autoComplete="address-level1" /></label>
        </div>

        <div className="checkout-assurance"><ShieldCheck /><span>{copy.assurance}</span></div>
        {error ? <p className="checkout-error">{error}</p> : null}

        <div className="checkout-actions">
          <Button type="submit" data-faro-user-action-name="checkout.submit.order-whatsapp">
            {copy.submit} <ArrowRight size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}
