"use client";

import Link from "next/link";
import { ArrowUpRight, Facebook, Instagram, Youtube } from "lucide-react";
import { BrandMark } from "@/components/brand-mark";
import { navItems, site } from "@/content/site";
import { useLanguage } from "@/components/providers";

export function Footer() {
  const { locale } = useLanguage();
  const mr = locale === "mr";
  return (
    <footer className="footer">
      <div className="footer-grid container">
        <div className="footer-brand"><BrandMark light /><p>{mr ? "आर्थिक साक्षरतेद्वारे कुटुंबांना सक्षम बनवणे." : "Empowering families through financial literacy."}</p><p className="regulatory">{mr ? "AMFI नोंदणीकृत म्युच्युअल फंड वितरक" : "AMFI Registered Mutual Fund Distributor"}<br />ARN: {site.compliance.arn} · EUIN: {site.compliance.euin}</p></div>
        <div><h3>{mr ? "जाणून घ्या" : "Explore"}</h3>{navItems.slice(1).map(([label, labelMr, href]) => <Link key={href} href={href} data-faro-user-action-name={`footer.nav.${label.toLowerCase().replaceAll(" ", "-")}`}>{mr ? labelMr : label}</Link>)}</div>
        <div><h3>{mr ? "संपर्क" : "Contact"}</h3><a href={`tel:${site.phone}`} data-faro-user-action-name="footer.contact.phone">{site.phone}</a><a href={`mailto:${site.email}`} data-faro-user-action-name="footer.contact.email">{site.email}</a><p>{mr ? site.addressMr : site.address}</p></div>
        <div><h3>{mr ? "अनुसरण करा" : "Follow"}</h3><a href={site.instagram} target="_blank" data-faro-user-action-name="footer.social.instagram">Instagram <Instagram size={15} /></a><a href={site.youtube} target="_blank" data-faro-user-action-name="footer.social.youtube">YouTube <Youtube size={15} /></a><a href={site.facebook} target="_blank" data-faro-user-action-name="footer.social.facebook">Facebook <Facebook size={15} /></a></div>
      </div>
      <div className="footer-bottom container"><p>© {new Date().getFullYear()} Finopia Services. {mr ? "सर्व हक्क राखीव." : "All rights reserved."}</p><div><Link href="/privacy" data-faro-user-action-name="footer.legal.privacy">{mr ? "गोपनीयता" : "Privacy"}</Link><Link href="/terms" data-faro-user-action-name="footer.legal.terms">{mr ? "अटी" : "Terms"}</Link><Link href="/disclosures" data-faro-user-action-name="footer.legal.disclosures">{mr ? "प्रकटीकरणे" : "Disclosures"}</Link></div><a href="#top" data-faro-user-action-name="footer.back-to-top">{mr ? "वर जा" : "Back to top"} <ArrowUpRight size={14} /></a></div>
      <div className="disclaimer container">{mr ? "म्युच्युअल फंडातील गुंतवणूक बाजारातील जोखमींच्या अधीन आहे. योजनेशी संबंधित सर्व कागदपत्रे काळजीपूर्वक वाचा. फिनोपिया सर्व्हिसेस म्युच्युअल फंड वितरक म्हणून कार्य करते आणि गुंतवणूक सल्ला किंवा पोर्टफोलिओ व्यवस्थापन सेवा देत नाही." : "Mutual fund investments are subject to market risks. Read all scheme related documents carefully. Finopia Services acts as a mutual fund distributor and does not provide investment advisory or portfolio management services."}</div>
    </footer>
  );
}
