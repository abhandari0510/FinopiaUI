export const checkoutConfig = {
  apiBaseUrl: process.env.NEXT_PUBLIC_FINOPIA_API_BASE_URL?.replace(/\/$/, "") ?? "",
  razorpayKeyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID ?? "",
  bookSku: process.env.NEXT_PUBLIC_BOOK_SKU ?? "paishache-shahanpan",
};

export function isCheckoutConfigured() {
  return Boolean(checkoutConfig.apiBaseUrl && checkoutConfig.razorpayKeyId);
}

export function getOrCreateCheckoutSessionId() {
  const key = "finopia-checkout-session";
  const existing = window.sessionStorage.getItem(key);
  if (existing) return existing;

  const generated = crypto.randomUUID();
  window.sessionStorage.setItem(key, generated);
  return generated;
}
