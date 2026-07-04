"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { ArrowRight, BadgeCheck, BookOpen, ChartNoAxesCombined, Check, Clock3, Eye, HeartHandshake, HeartPulse, ImageIcon, Landmark, Lightbulb, Mail, MapPin, MessageCircle, Phone, Presentation, Quote, Scale, Search, ShieldCheck, UsersRound, X } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { BookCheckout } from "@/features/checkout/book-checkout";
import { ContactForm } from "@/features/contact/contact-form";
import { articles, services, site } from "@/content/site";
import { pageCopy } from "@/i18n/pages";

export type SitePageName = "about" | "founder" | "services" | "literacy" | "book" | "blogs" | "gallery" | "testimonials" | "contact" | "privacy" | "terms" | "disclosures";
const serviceIcons = [ChartNoAxesCombined, ShieldCheck, HeartPulse, BookOpen, UsersRound, Landmark];
const valueIcons = [Lightbulb, Scale, HeartHandshake, Eye];

type GalleryItem = { category: string; categoryMr: string; src?: string; alt?: string };

const galleryItems: GalleryItem[] = [
  { category: "Book launch", categoryMr: "पुस्तक प्रकाशन" },
  { category: "Public speaking", categoryMr: "सार्वजनिक व्याख्याने" },
  { category: "Workshops", categoryMr: "कार्यशाळा" },
  { category: "Community outreach", categoryMr: "सामुदायिक उपक्रम" },
  { category: "Events", categoryMr: "कार्यक्रम" },
  { category: "Media coverage", categoryMr: "मीडिया प्रसिद्धी" },
  { category: "Workshops", categoryMr: "कार्यशाळा" },
];

const bookLaunchPhotos: GalleryItem[] = [
  { category: "Book launch", categoryMr: "Book launch", src: "/media/gallery/book-launch-01.jpeg", alt: "Book launch guests holding Paishache Shahanpan on stage" },
  { category: "Book launch", categoryMr: "Book launch", src: "/media/gallery/book-launch-02.jpeg", alt: "Finopia team members at the Paishache Shahanpan book launch" },
  { category: "Book launch", categoryMr: "Book launch", src: "/media/gallery/book-launch-03.jpeg", alt: "Yogesh Kadam signing a book for a young reader" },
  { category: "Book launch", categoryMr: "Book launch", src: "/media/gallery/book-launch-04.jpeg", alt: "Yogesh Kadam in conversation during the book launch event" },
  { category: "Book launch", categoryMr: "Book launch", src: "/media/gallery/book-launch-05.jpeg", alt: "Audience view during the Paishache Shahanpan book launch" },
];

function actionSlug(value: string) {
  return value.toLowerCase().replaceAll(" ", "-").replace(/[^a-z0-9-]/g, "");
}

function Hero({ copy }: { copy: readonly [string, string, string] }) {
  return <PageHero eyebrow={copy[0]} title={copy[1]} description={copy[2]} />;
}

function LegalPage({ copy }: { copy: { readonly hero: readonly [string, string, string]; readonly sections: readonly (readonly [string, string])[] } }) {
  return <main><Hero copy={copy.hero} /><article className="legal-copy container section">{copy.sections.map(([title, body]) => <div key={title}><h2>{title}</h2><p>{body}</p></div>)}</article></main>;
}

export function SitePage({ page }: { page: SitePageName }) {
  const { locale } = useLanguage();
  const copy = pageCopy[locale];
  const mr = locale === "mr";
  const mainClass = mr ? "lang-marathi" : undefined;
  const [galleryCategory, setGalleryCategory] = useState("Book launch");
  const [selectedGalleryPhoto, setSelectedGalleryPhoto] = useState<GalleryItem | null>(null);

  if (page === "about") {
    const c = copy.about;
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container narrative-grid"><Reveal><span className="kicker">{c.mission}</span><h2>{c.missionTitle}</h2></Reveal><Reveal><p className="large-copy">{c.missionLead}</p><p>{c.missionBody}</p></Reveal></div></section><section className="section values-section"><div className="container"><Reveal className="section-heading"><span className="kicker">{c.valuesKicker}</span><h2>{c.valuesTitle}</h2></Reveal><div className="value-grid">{c.values.map(([title, body], i) => { const Icon = valueIcons[i]; return <Reveal className="value-card" key={title} delay={i * .06}><Icon /><h3>{title}</h3><p>{body}</p></Reveal>; })}</div></div></section><section className="section"><div className="container timeline"><Reveal><span className="kicker">{c.direction}</span><h2>{c.directionTitle}</h2></Reveal>{c.timeline.map(([title, body], i) => <Reveal className="timeline-item" key={title}><span>0{i + 1}</span><div><strong>{title}</strong><p>{body}</p></div></Reveal>)}</div></section></main>;
  }

  if (page === "founder") {
    const c = copy.founder;
    const credentialIcons = [BadgeCheck, BookOpen, Presentation, UsersRound];
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container founder-detail"><Reveal className="portrait-placeholder portrait-photo founder-page-portrait"><Image src="/media/yogesh-kadam-founder.png" alt="Yogesh Kadam CFP®" fill sizes="(max-width: 780px) 100vw, 420px" /></Reveal><Reveal><span className="kicker">{c.kicker}</span><h2>{c.title}</h2><p className="large-copy">{c.lead}</p><p>{c.body}</p><div className="credentials-list">{c.credentials.map((label, i) => { const Icon = credentialIcons[i]; return <span key={label}><Icon />{label}{i === 0 ? ` #${site.compliance.cfp}` : ""}</span>; })}</div></Reveal></div></section></main>;
  }

  if (page === "services") {
    const c = copy.services;
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container service-list">{services.map((service, i) => { const Icon = serviceIcons[i]; const title = mr ? service.titleMr : service.title; return <Reveal className="service-row" key={service.title}><span>0{i + 1}</span><Icon /><div><h2>{title}</h2><p>{mr ? service.descriptionMr : service.description}</p></div><Link href="/contact" aria-label={`${c.inquire} ${title}`} data-faro-user-action-name={`services.inquire.${service.title.toLowerCase().replaceAll(" ", "-")}`}><ArrowRight /></Link></Reveal>; })}</div></section><section className="disclosure-callout container"><ShieldCheck /><div><strong>{c.scope}</strong><p>{c.disclosure}</p></div></section></main>;
  }

  if (page === "literacy") {
    const c = copy.literacy;
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container learning-grid"><Reveal><span className="kicker">{c.kicker}</span><h2>{c.title}</h2><p className="large-copy">{c.lead}</p></Reveal><Reveal className="learning-steps">{c.steps.map((step, i) => <div key={step}><span>0{i + 1}</span><strong>{step}</strong></div>)}</Reveal></div></section><section className="section faq-section"><div className="container faq-grid"><Reveal><span className="kicker">{c.faqKicker}</span><h2>{c.faqTitle}</h2></Reveal><Reveal><Accordion type="single" collapsible>{c.faqs.map(([question, answer], i) => <AccordionItem value={`item-${i}`} key={question}><AccordionTrigger data-faro-user-action-name={`literacy.faq.toggle.${i + 1}`}>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}</Accordion></Reveal></div></section></main>;
  }

  if (page === "book") {
    const c = copy.book;
    return <main className={mainClass}><Hero copy={c.hero} /><section className="book-detail section"><div className="container book-grid"><Reveal className="book-stage"><div className="book-shadow" /><div className="book-object"><div className="book-spine">पैशाचे शहाणपण · योगेश कदम</div><div className="book-cover book-cover-real"><Image src="/media/paishache-shahanpan-book-cover.jpg" alt="पैशाचे शहाणपण book cover" fill sizes="(max-width: 780px) 210px, 290px" priority /></div></div></Reveal><Reveal className="book-copy"><span className="kicker light">{c.inside}</span><h2>{c.title}</h2><p>{c.body}</p><ul>{c.points.map(point => <li key={point}><Check />{point}</li>)}</ul><Button asChild><a href="#buy" data-faro-user-action-name="book.hero.buy-anchor">Buy the book <ArrowRight /></a></Button></Reveal></div><Reveal className="container checkout-wrap"><BookCheckout /></Reveal></section></main>;
  }

  if (page === "blogs") {
    const c = copy.blogs;
    const filterArticles = [articles[0], articles[2], articles[1]];
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container"><div className="content-toolbar"><div><Search />{c.search}</div>{c.filters.map((filter, i) => <Link href={`/blogs/${filterArticles[i]?.slug ?? articles[0].slug}`} key={filter} data-faro-user-action-name={`blogs.filter-link.${filterArticles[i]?.slug ?? "fallback"}`}>{filter}</Link>)}</div><div className="article-grid">{articles.map((article, i) => <Reveal className="article-card" key={article.slug}><Link className="article-card-link" href={`/blogs/${article.slug}`} data-faro-user-action-name={`blogs.article.${article.slug}`}><div className={`article-art ${article.tone}`}><span>0{i + 1}</span><i /><i /><i /></div><small>{mr ? article.categoryMr : article.category} · {mr ? article.readMr : article.read}</small><h3>{mr ? article.titleMr : article.title}</h3><p>{mr ? article.excerptMr : article.excerpt}</p><span className="text-link">{c.read} <ArrowRight /></span></Link></Reveal>)}</div></div></section></main>;
  }

  if (page === "gallery") {
    const c = copy.gallery;
    const activeItems = galleryCategory === "Book launch" ? bookLaunchPhotos : galleryItems.filter((item) => item.category === galleryCategory);
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container"><div className="gallery-filters">{c.categories.map((category, i) => { const categoryKey = galleryItems[i]?.category ?? category; return <button type="button" className={galleryCategory === categoryKey ? "active" : ""} key={category} onClick={() => setGalleryCategory(categoryKey)} aria-pressed={galleryCategory === categoryKey} data-faro-user-action-name={`gallery.filter.${actionSlug(categoryKey)}`}>{category}</button>; })}</div><div className="gallery-grid">{activeItems.map((item, i) => item.src ? <button type="button" className={`gallery-photo g-${i}`} key={item.src} onClick={() => setSelectedGalleryPhoto(item)} data-faro-user-action-name={`gallery.photo.open.${i + 1}`}><Image src={item.src} alt={item.alt ?? item.category} fill sizes="(max-width: 780px) 100vw, 33vw" /><span>{mr ? galleryItems[0].categoryMr : item.category}</span></button> : <button type="button" className={`gallery-placeholder g-${i}`} key={`${item.category}-${i}`} data-faro-user-action-name={`gallery.item.${actionSlug(item.category)}.${i + 1}`}><ImageIcon /><span>{mr ? item.categoryMr : item.category}</span><small>{c.waiting}</small></button>)}</div></div></section>{selectedGalleryPhoto?.src && <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label={selectedGalleryPhoto.alt ?? selectedGalleryPhoto.category} onClick={() => setSelectedGalleryPhoto(null)}><button type="button" className="gallery-lightbox-close" onClick={() => setSelectedGalleryPhoto(null)} aria-label="Close image"><X /></button><div className="gallery-lightbox-frame" onClick={(event) => event.stopPropagation()}><Image src={selectedGalleryPhoto.src} alt={selectedGalleryPhoto.alt ?? selectedGalleryPhoto.category} fill sizes="100vw" /></div></div>}</main>;
  }

  if (page === "testimonials") {
    const c = copy.testimonials;
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container testimonial-grid">{c.items.map((item) => <article className="testimonial-placeholder" key={item.name}><Quote /><p>{item.quote}</p><div><span>{item.name.slice(0, 1)}</span><strong>{item.name}<small>{item.role}</small></strong></div></article>)}</div></section></main>;
  }

  if (page === "contact") {
    const c = copy.contact;
    return <main className={mainClass}><Hero copy={c.hero} /><section className="section"><div className="container contact-grid"><div className="contact-details"><h2>{c.title}</h2><p>{c.body}</p><a href={`tel:${site.phone}`} data-faro-user-action-name="contact.details.phone"><Phone /><span><small>{c.mobile}</small>{site.phone}</span></a><a href={`mailto:${site.email}`} data-faro-user-action-name="contact.details.email"><Mail /><span><small>{c.email}</small>{site.email}</span></a><div><MapPin /><span><small>{c.visit}</small>{mr ? site.addressMr : site.address}</span></div><div><Clock3 /><span><small>{c.hours}</small>{c.hoursValue}</span></div><a className="whatsapp-card" target="_blank" href={`https://wa.me/${site.whatsapp}`} data-faro-user-action-name="contact.details.whatsapp"><MessageCircle />{c.whatsapp} →</a></div><ContactForm /></div></section></main>;
  }

  if (page === "privacy" || page === "terms") return <div className={mainClass}><LegalPage copy={copy[page]} /></div>;

  const c = copy.disclosures;
  return <main className={mainClass}><Hero copy={c.hero} /><article className="legal-copy container section"><h2>{c.mfTitle}</h2><p>{c.mfBody} ARN: {site.compliance.arn}. EUIN: {site.compliance.euin}. {mr ? "ARN वैधता" : "ARN validity"}: {site.compliance.validity}.</p><p>{c.risk}</p><h2>{c.insuranceTitle}</h2><p>{c.insurance}: {site.compliance.insurer}. {c.agency}: {site.compliance.agency}. {c.solicitation}</p><h2>{c.important}</h2><p>{c.importantBody}</p></article></main>;
}
