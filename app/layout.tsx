import type { Metadata } from "next";
import { Manrope, Noto_Sans_Devanagari } from "next/font/google";
import "./globals.css";
import "./additions.css";
import { Providers } from "@/components/providers";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsApp } from "@/components/whatsapp";
import { site } from "@/content/site";
import { getSiteUrl } from "@/lib/site-url";

const manrope = Manrope({ subsets: ["latin"], variable: "--font-manrope", display: "swap" });
const devanagari = Noto_Sans_Devanagari({ subsets: ["devanagari"], variable: "--font-devanagari", display: "swap" });

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Finopia Services | Financial Literacy for Families", template: "%s | Finopia Services" },
  description: "Financial literacy, mutual fund distribution and insurance solutions led by Yogesh Kadam CFP® in Karad, Maharashtra.",
  keywords: ["financial literacy", "mutual fund distributor", "insurance solutions", "Yogesh Kadam CFP", "Karad", "पैशाचे शहाणपण"],
  openGraph: { title: "Finopia Services", description: "Empowering families through financial literacy.", url: "/", siteName: "Finopia Services", locale: "en_IN", type: "website" },
  twitter: { card: "summary_large_image", title: "Finopia Services", description: "Empowering families through financial literacy." },
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": ["Organization", "FinancialService"], "@id": `${siteUrl}/#organization`, name: site.name, url: siteUrl, description: "Financial literacy, mutual fund distribution and insurance solutions.", telephone: site.phone, email: site.email, address: { "@type": "PostalAddress", streetAddress: site.address, addressLocality: "Karad", postalCode: "415110", addressRegion: "Maharashtra", addressCountry: "IN" }, sameAs: [site.instagram, site.youtube, site.facebook] },
    { "@type": "Person", "@id": `${siteUrl}/#founder`, name: site.founder, jobTitle: "Founder and Financial Literacy Educator", worksFor: { "@id": `${siteUrl}/#organization` } },
    { "@type": "Book", name: "पैशाचे शहाणपण", author: { "@id": `${siteUrl}/#founder` }, inLanguage: "mr", description: "A Marathi guide from financial literacy to financial independence." }
  ]
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`${manrope.variable} ${devanagari.variable}`}><body><Providers><Header />{children}<Footer /><WhatsApp /></Providers><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} /></body></html>;
}
