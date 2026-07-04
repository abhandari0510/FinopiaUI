"use client";

import { useState } from "react";
import { ArrowRight, CheckCircle2, LockKeyhole, ShieldCheck, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";

type CheckoutForm = {
  name: string;
  email: string;
  phone: string;
  addressLine1: string;
  city: string;
  state: string;
  postalCode: string;
};

const WHATSAPP_NUMBER = "919977696796";
const PLACEHOLDER_MARKETPLACE_URL = "https://example.com/coming-soon";

const initialForm: CheckoutForm = {
  name: "",
  email: "",
  phone: "",
  addressLine1: "",
  city: "",
  state: "Maharashtra",
  postalCode: "",
};

function validateForm(form: CheckoutForm) {
  if (form.name.trim().length < 2) return "Enter the customer's full name.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) return "Enter a valid email address.";
  if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\D/g, ""))) return "Enter a valid 10-digit Indian mobile number.";
  if (form.addressLine1.trim().length < 8) return "Enter a complete delivery address.";
  if (form.city.trim().length < 2) return "Enter the delivery city.";
  if (form.state.trim().length < 2) return "Enter the delivery state.";
  if (!/^\d{6}$/.test(form.postalCode)) return "Enter a valid 6-digit PIN code.";
  return "";
}

function buildWhatsAppMessage(form: CheckoutForm) {
  const lines = [
    "Hi Finopia, I want to buy Paishache Shahanpan.",
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

function buildWhatsAppLink(form: CheckoutForm) {
  const message = encodeURIComponent(buildWhatsAppMessage(form));
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

export function BookCheckout() {
  const [form, setForm] = useState(initialForm);
  const [status, setStatus] = useState<"idle" | "redirecting" | "submitted">("idle");
  const [error, setError] = useState("");
  const disabled = status === "redirecting";

  const updateField = (field: keyof CheckoutForm, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleBuyOnAmazon = () => {
    window.open(PLACEHOLDER_MARKETPLACE_URL, "_blank", "noopener,noreferrer");
  };

  const handleOrderOnWhatsApp = () => {
    setError("");

    const validationError = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    const whatsappLink = buildWhatsAppLink(form);
    window.open(whatsappLink, "_blank", "noopener,noreferrer");
    setStatus("submitted");
  };

  if (status === "submitted") {
    return (
      <div id="buy" className="checkout-card checkout-success">
        <CheckCircle2 />
        <span>Order options opened</span>
        <h3>Your purchase page and WhatsApp chat are ready.</h3>
        <p>We opened a placeholder marketplace link and a prefilled WhatsApp chat with your order details so you can continue quickly.</p>
        <Button type="button" variant="secondary" onClick={() => setStatus("idle")} data-faro-user-action-name="checkout.success.try-again">Try again</Button>
      </div>
    );
  }

  return (
    <div id="buy" className="checkout-card">
      <div className="checkout-heading">
        <span><ShoppingBag size={15} /> Book checkout</span>
        <strong>Buy Paishache Shahanpan</strong>
        <p>Enter your delivery details if you want to order via WhatsApp or else click on the &apos;Buy on Amazon&apos; button for a purchase through the Amazon Marketplace.</p>
      </div>

      <div className="checkout-cta-card">
        <div className="checkout-cta-copy">
          <span>Quick purchase</span>
          <strong>Buy on Amazon</strong>
          <p>Open the Amazon marketplace page for this book when you are ready.</p>
        </div>
        <Button type="button" onClick={handleBuyOnAmazon} data-faro-user-action-name="checkout.buy-amazon">
          Buy on Amazon
        </Button>
      </div>

      <form onSubmit={(event) => {
        event.preventDefault();
        setError("");

        const validationError = validateForm(form);
        if (validationError) {
          setError(validationError);
          return;
        }

        const whatsappLink = buildWhatsAppLink(form);
        window.open(whatsappLink, "_blank", "noopener,noreferrer");
        setStatus("submitted");
      }}>
        <div className="checkout-grid">
        <label>Full name<input value={form.name} onChange={(event) => updateField("name", event.target.value)} autoComplete="name" /></label>
        <label>Email<input value={form.email} onChange={(event) => updateField("email", event.target.value)} type="email" autoComplete="email" /></label>
        <label>Mobile<input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} inputMode="numeric" autoComplete="tel" /></label>
        <label>PIN code<input value={form.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} inputMode="numeric" autoComplete="postal-code" /></label>
      </div>

      <label>Delivery address<textarea value={form.addressLine1} onChange={(event) => updateField("addressLine1", event.target.value)} rows={3} autoComplete="street-address" /></label>

        <div className="checkout-grid">
          <label>City<input value={form.city} onChange={(event) => updateField("city", event.target.value)} autoComplete="address-level2" /></label>
          <label>State<input value={form.state} onChange={(event) => updateField("state", event.target.value)} autoComplete="address-level1" /></label>
        </div>

        <div className="checkout-assurance"><ShieldCheck /><span>Your details will be shared with us through WhatsApp when you continue.</span></div>
        {error ? <p className="checkout-error">{error}</p> : null}

        <div className="checkout-actions">
          <Button type="submit" disabled={disabled} data-faro-user-action-name="checkout.submit.order-whatsapp">
            Order on WhatsApp <ArrowRight size={16} />
          </Button>
        </div>
      </form>
    </div>
  );
}
