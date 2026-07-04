const fallbackUrl = "https://finopiaservices.com";

export function getSiteUrl() {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!configured) return fallbackUrl;

  try {
    return new URL(configured).origin;
  } catch {
    return fallbackUrl;
  }
}
