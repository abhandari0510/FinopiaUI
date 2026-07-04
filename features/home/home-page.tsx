"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, BadgeCheck, BookOpen, ChartNoAxesCombined, Check, FileCheck2, GraduationCap, HeartPulse, ImageIcon, Landmark, Quote, ShieldCheck, Sparkles, UsersRound } from "lucide-react";
import { useLanguage } from "@/components/providers";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { articles, services, site } from "@/content/site";

const icons = [ChartNoAxesCombined, ShieldCheck, HeartPulse, BookOpen, UsersRound, Landmark];
const launchPhotos = [
  { src: "/media/gallery/book-launch-01.jpeg", alt: "Book launch guests holding Paishache Shahanpan on stage" },
  { src: "/media/gallery/book-launch-02.jpeg", alt: "Finopia team members at the Paishache Shahanpan book launch" },
  { src: "/media/gallery/book-launch-03.jpeg", alt: "Yogesh Kadam signing a book for a young reader" },
  { src: "/media/gallery/book-launch-04.jpeg", alt: "Yogesh Kadam in conversation during the book launch event" },
  { src: "/media/gallery/book-launch-05.jpeg", alt: "Audience view during the Paishache Shahanpan book launch" },
];

export function HomePage() {
  const { t, locale } = useLanguage();
  const { scrollYProgress } = useScroll();
  const progress = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const sceneRotateX = useSpring(useTransform(pointerY, [-.5, .5], [7, -7]), { stiffness: 110, damping: 24 });
  const sceneRotateY = useSpring(useTransform(pointerX, [-.5, .5], [-9, 9]), { stiffness: 110, damping: 24 });

  const moveScene = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - bounds.left) / bounds.width - .5);
    pointerY.set((event.clientY - bounds.top) / bounds.height - .5);
  };

  const resetScene = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  return (
    <main id="top" className={locale === "mr" ? "lang-marathi" : ""}>
      <motion.div className="scroll-progress" style={{ scaleX: scrollYProgress }} />
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid container">
          <div className="hero-copy">
            <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }}><Sparkles size={14} />{t.eyebrow}</motion.div>
            <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .75, delay: .18 }}>
              {t.heroTitleA}<br /><em>{t.heroTitleB}</em>
            </motion.h1>
            <motion.p className="hero-body" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .65, delay: .3 }}>{t.heroBody}</motion.p>
            <motion.div className="hero-actions" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .5 }}>
              <Button asChild><Link href="/about" data-faro-user-action-name="home.hero.explore-approach">{t.explore}<ArrowRight size={17} /></Link></Button>
              <Button asChild variant="secondary"><Link href="/book" data-faro-user-action-name="home.hero.discover-book">{t.book}</Link></Button>
            </motion.div>
            <motion.div className="founder-strip" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .7 }}>
              <div className="founder-monogram" aria-hidden="true">YK</div>
              <div><span>{t.ledBy}</span><strong>{t.founderName}</strong><small>{t.founderRoles}</small></div>
            </motion.div>
          </div>
          <motion.div className="hero-visual" initial={{ opacity: 0, scale: .96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: .9, delay: .25 }} onPointerMove={moveScene} onPointerLeave={resetScene}>
            <div className="hero-floor" aria-hidden="true" />
            <motion.div className="hero-scene" style={{ rotateX: sceneRotateX, rotateY: sceneRotateY }}>
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="scene-shadow" aria-hidden="true" />
              <div className="wisdom-card">
                <div className="wisdom-card-top"><span>FINOPIA</span><BadgeCheck size={20} /></div>
                <div className="wisdom-orb"><Image className="wisdom-orb-logo" src="/media/finopia-symbol.jpg" alt="" width={160} height={160} sizes="112px" priority /></div>
                <div><small>{t.philosophy}</small><h2>{t.trustTitle}</h2><p>{t.trustBody}</p></div>
                <div className="wisdom-bars"><i /><i /><i /><i /><i /></div>
              </div>
              <div className="float-stat stat-one"><strong>13+</strong><span>{t.yearsExperience}</span></div>
              <div className="float-stat stat-two"><GraduationCap size={19} /><span><strong>CFP®</strong> {t.professional}</span></div>
              <div className="float-stat stat-three"><strong>10K</strong><span>{t.familiesMission}</span></div>
            </motion.div>
          </motion.div>
        </div>
        <div className="trust-rail container">
          <span>{t.registered}</span><strong>{site.compliance.arn}</strong><i /><strong>{site.compliance.euin}</strong><i /><strong>CFP® #{site.compliance.cfp}</strong>
        </div>
      </section>

      <section className="section founder-section">
        <div className="founder-grid container">
          <Reveal className="portrait-placeholder portrait-photo"><Image src="/media/yogesh-kadam-founder.png" alt="Yogesh Kadam CFP®" fill sizes="(max-width: 780px) 100vw, 420px" /><div className="portrait-caption"><small>{t.founderLabel}</small><strong>{t.founderName}</strong></div></Reveal>
          <Reveal className="founder-copy" delay={.1}><span className="kicker">{t.founderKicker}</span><h2>{t.founderTitle}</h2><p>{t.founderBody}</p><blockquote>“{t.founderQuote}”</blockquote><div className="credential-row"><span><BadgeCheck />CFP® {t.professional}</span><span><BookOpen />{t.author}</span><span><UsersRound />{t.educator}</span></div><Link href="/founder" className="text-link" data-faro-user-action-name="home.founder.journey">{t.journey}<ArrowRight size={16} /></Link></Reveal>
        </div>
      </section>


      <section className="section services-section">
        <div className="container">
          <Reveal className="section-heading split-heading"><div><span className="kicker">{t.servicesKicker}</span><h2>{t.servicesTitle}</h2></div><p>{t.servicesBody}</p></Reveal>
          <div className="service-grid">
            {services.map((service, index) => {
              const Icon = icons[index];
              const title = locale === "mr" ? service.titleMr : service.title;
              return <Reveal key={service.title} delay={index * .05} className="service-card"><div className="service-icon"><Icon size={22} /></div><span>0{index + 1}</span><h3>{title}</h3><p>{locale === "mr" ? service.descriptionMr : service.description}</p><Link href="/services" aria-label={`${t.learnAbout} ${title}`} data-faro-user-action-name={`home.service-card.${service.title.toLowerCase().replaceAll(" ", "-")}`}><ArrowRight size={18} /></Link></Reveal>;
            })}
          </div>
          <Reveal className="center-action"><Button asChild variant="secondary"><Link href="/services" data-faro-user-action-name="home.services.view-all">{t.viewServices}<ArrowRight size={16} /></Link></Button></Reveal>
        </div>
      </section>

      <section className="book-section section">
        <div className="book-grid container">
          <Reveal className="book-stage">
            <div className="book-shadow" />
            <div className="book-object">
              <div className="book-spine">पैशाचे शहाणपण · योगेश कदम</div>
              <div className="book-cover book-cover-real"><Image src="/media/paishache-shahanpan-book-cover.jpg" alt="पैशाचे शहाणपण book cover" fill sizes="(max-width: 780px) 210px, 290px" priority /></div>
            </div>
            <div className="book-note"><BookOpen size={18} /><span>{t.writtenMarathi}<br /><strong>{t.everyFamily}</strong></span></div>
          </Reveal>
          <Reveal className="book-copy" delay={.12}><span className="kicker light">{t.bookKicker}</span><h2>{t.bookTitle}</h2><h3>{t.bookSub}</h3><p>{t.bookBody}</p><ul>{t.bookPoints.map(point => <li key={point}><Check />{point}</li>)}</ul><Button asChild><Link href="/book#buy" data-faro-user-action-name="home.book.buy">Buy the book<ArrowRight size={17} /></Link></Button></Reveal>
        </div>
      </section>

      <section className="proof-section section">
        <div className="container">
          <Reveal className="section-heading split-heading"><div><span className="kicker">{t.proofKicker}</span><h2>{t.proofTitle}</h2></div><p>{t.proofBody}</p></Reveal>
          <div className="proof-grid">
            <Reveal className="proof-card"><BadgeCheck/><small>{t.professionalCredential}</small><h3>CFP® {t.professional}</h3><p>{t.certificationNumber} {site.compliance.cfp}</p></Reveal>
            <Reveal delay={.06} className="proof-card"><FileCheck2/><small>{t.mfDistribution}</small><h3>{site.compliance.arn}</h3><p>EUIN {site.compliance.euin}</p></Reveal>
            <Reveal delay={.12} className="proof-card"><ShieldCheck/><small>{t.insuranceDistribution}</small><h3>HDFC Life</h3><p>{t.agencyCode} {site.compliance.agency}</p></Reveal>
          </div>
        </div>
      </section>

      <section className="community-section section">
        <div className="container community-grid">
          <Reveal><span className="kicker light">{t.communityKicker}</span><Quote/><blockquote>{t.communityQuote}</blockquote><p>{t.communityBody}</p><Link href="/testimonials" className="text-link light-link" data-faro-user-action-name="home.community.testimonials">{t.exploreTestimonials} <ArrowRight/></Link></Reveal>
          <Reveal className="gallery-preview home-launch-preview" delay={.1}>{launchPhotos.slice(0, 3).map((photo, index) => <Link className={`home-launch-photo p-${index}`} href="/gallery" key={photo.src} data-faro-user-action-name={`home.gallery.preview.launch-photo.${index + 1}`}><Image src={photo.src} alt={photo.alt} fill sizes="(max-width: 780px) 45vw, 240px" /><span>{t.launch}</span></Link>)}<Link className="home-gallery-link" href="/gallery" data-faro-user-action-name="home.gallery.view">{t.viewGallery} <ArrowRight/></Link></Reveal>
        </div>
      </section>

      <section className="section insights-section">
        <div className="container">
          <Reveal className="section-heading split-heading"><div><span className="kicker">{t.insightsKicker}</span><h2>{t.insightsTitle}</h2></div><Link className="text-link" href="/blogs" data-faro-user-action-name="home.insights.view-all">{t.viewInsights} <ArrowRight size={16} /></Link></Reveal>
          <div className="article-grid">{articles.map((article, index) => <Reveal key={article.title} delay={index * .08} className="article-card"><Link className="article-card-link" href={`/blogs/${article.slug}`} data-faro-user-action-name={`home.article.${article.slug}`}><div className={`article-art ${article.tone}`}><span>0{index + 1}</span><i /><i /><i /></div><small>{locale === "mr" ? article.categoryMr : article.category} · {locale === "mr" ? article.readMr : article.read}</small><h3>{locale === "mr" ? article.titleMr : article.title}</h3><p>{locale === "mr" ? article.excerptMr : article.excerpt}</p><span className="text-link">{t.readArticle} <ArrowRight size={15} /></span></Link></Reveal>)}</div>
        </div>
      </section>

      <section className="contact-band">
        <Reveal className="contact-band-inner container"><div><span className="kicker light">{t.clarity}</span><h2>{t.contactTitle}</h2><p>{t.contactBody}</p></div><div><Button asChild><Link href="/contact" data-faro-user-action-name="home.contact.cta">{t.contact}<ArrowRight size={17} /></Link></Button><Button asChild variant="ghost"><a href={`https://wa.me/${site.whatsapp}`} target="_blank" data-faro-user-action-name="home.contact.whatsapp">{t.whatsapp}</a></Button></div></Reveal>
      </section>
    </main>
  );
}
