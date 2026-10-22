"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BookCheckout } from "@/features/checkout/book-checkout";
import { useLanguage } from "@/components/providers";
import { translations } from "@/i18n/translations";
import { pageCopy } from "@/i18n/pages";
import styles from "./books-page.module.css";

const marathiAmazonUrl = "https://amzn.in/d/02ss7fa0";
const englishAmazonUrl = "https://amzn.in/d/00C2MCyY";

export function BooksPage() {
  const { locale } = useLanguage();
  const copy = translations[locale].booksPage;
  const feedbackCopy = pageCopy[locale].services;

  return (
    <main className={`${styles.page} books-page`} lang={locale} data-page="books">
      <header className={styles.intro}>
        <div className={styles.container}>
          <span className={styles.eyebrow}>{copy.eyebrow}</span>
          <h1>{copy.heading}<br /><em>{copy.headingAccent}</em></h1>
          <p>{copy.intro}</p>
        </div>
      </header>

      <section className={`${styles.bookGrid} ${styles.container}`} aria-label={copy.booksLabel}>
        <article className={styles.bookCard} aria-labelledby="marathi-title">
          <div className={styles.bookArtwork}>
            <div className={styles.bookCover}>
              <Image src="/media/paishache-shahanpan-book-cover.jpg" alt={copy.marathiAlt} fill priority sizes="(max-width: 760px) 72vw, (max-width: 1100px) 34vw, 250px" />
            </div>
            <span className={styles.artworkCaption}>{copy.original}</span>
          </div>
          <div className={styles.bookCopy}>
            <h2 id="marathi-title" lang="mr">पैशाचे शहाणपण</h2>
            <p className={styles.transliteration}>Paishache Shahanpan</p>
            <p className={styles.byline}>{copy.author}</p>
            <p className={styles.description}>{copy.marathiDescription}</p>
            <Button asChild>
              <a href={marathiAmazonUrl} target="_blank" rel="noopener noreferrer" data-faro-user-action-name="book.marathi.amazon">{copy.buyAmazon} <ArrowUpRight size={17} /></a>
            </Button>
          </div>
        </article>

        <article className={styles.bookCard} aria-labelledby="english-title">
          <div className={styles.bookArtwork}>
            <div className={styles.bookCover}>
              <Image src="/media/money-wisdom-english-cover.png" alt={copy.englishAlt} fill sizes="(max-width: 760px) 72vw, (max-width: 1100px) 34vw, 250px" />
            </div>
            <span className={styles.artworkCaption}>{copy.englishEdition}</span>
          </div>
          <div className={styles.bookCopy}>
            <h2 id="english-title">{copy.englishTitle}</h2>
            <p className={styles.byline}>{copy.author}</p>
            <p className={styles.description}>{copy.englishDescription}</p>
            <Button asChild>
              <a href={englishAmazonUrl} target="_blank" rel="noopener noreferrer" data-faro-user-action-name="book.english.amazon">{copy.buyAmazon} <ArrowUpRight size={17} /></a>
            </Button>
          </div>
        </article>
      </section>

      <section className={styles.orderSection} aria-label={copy.whatsappSection}>
        <div className={styles.container}>
          <details id="buy" className={styles.orderDetails}>
            <summary id="whatsapp-order">{copy.whatsappSummary}</summary>
            <div className={styles.orderForm}><BookCheckout anchorId="whatsapp-form" /></div>
          </details>
        </div>
      </section>

      <section className={styles.closing}>
        <div className={styles.container}>
          <span className={styles.closingRule} aria-hidden="true" />
          <p>{copy.closing}</p>
        </div>
      </section>

      <section className="feedback-callout">
        <div className="container">
          <div className="feedback-copy">
            <h2>{feedbackCopy.feedbackTitle}</h2>
            <p>{feedbackCopy.feedbackBody}</p>
            <Button asChild>
              <a href="/feedback" data-faro-user-action-name="book.feedback.cta">
                {feedbackCopy.feedbackAction} <ArrowRight />
              </a>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
