"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X, Languages } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { BrandMark } from "@/components/brand-mark";
import { Button } from "@/components/ui/button";
import { navItems } from "@/content/site";
import { useLanguage } from "@/components/providers";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { locale, toggle, t } = useLanguage();
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={scrolled ? "site-header is-scrolled" : "site-header"}>
      <div className="header-inner">
        <Link href="/" aria-label="Finopia Services home" data-faro-user-action-name="header.logo.home"><BrandMark /></Link>
        <nav className="desktop-nav" aria-label="Primary navigation">
          {navItems.map(([label, labelMr, href]) => <Link key={href} href={href} data-faro-user-action-name={`header.nav.${label.toLowerCase().replaceAll(" ", "-")}`}>{locale === "mr" ? labelMr : label}</Link>)}
        </nav>
        <div className="header-actions">
          <button className="language-button" onClick={toggle} aria-label={`Switch language to ${t.language}`} data-faro-user-action-name="header.language.toggle"><Languages size={15} /><span>{t.language}</span></button>
          <Button asChild size="sm" className="desktop-cta"><Link href="/contact" data-faro-user-action-name="header.cta.contact">{locale === "mr" ? "बोलूया" : "Let’s talk"} <span aria-hidden>↗</span></Link></Button>
          <button className="menu-button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={locale === "mr" ? "मुख्य मेनू उघडा" : "Open navigation"} data-faro-user-action-name={open ? "header.mobile-menu.close" : "header.mobile-menu.open"}>{open ? <X /> : <Menu />}</button>
        </div>
      </div>
      <AnimatePresence>
        {open && <motion.nav className="mobile-nav" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
          {navItems.map(([label, labelMr, href]) => <Link key={href} href={href} onClick={() => setOpen(false)} data-faro-user-action-name={`header.mobile-nav.${label.toLowerCase().replaceAll(" ", "-")}`}>{locale === "mr" ? labelMr : label}</Link>)}
        </motion.nav>}
      </AnimatePresence>
    </header>
  );
}
