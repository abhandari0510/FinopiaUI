"use client";

import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/providers";
import type { articles } from "@/content/site";

type Article = (typeof articles)[number];

export function ArticlePage({ article }: { article: Article }) {
  const { locale } = useLanguage();
  const mr = locale === "mr";
  const title = mr ? article.titleMr : article.title;
  const category = mr ? article.categoryMr : article.category;
  const read = mr ? article.readMr : article.read;
  const excerpt = mr ? article.excerptMr : article.excerpt;
  const body = mr ? article.bodyMr : article.body;

  return (
    <main className={mr ? "lang-marathi" : undefined}>
      <article className="article-detail container">
        <Link className="text-link article-back-link" href="/blogs" data-faro-user-action-name="article.back-to-insights">
          <ArrowLeft size={16} /> {mr ? "सर्व लेख" : "All insights"}
        </Link>
        <div className={`article-art article-detail-art ${article.tone}`} aria-hidden="true">
          <span>{category}</span><i /><i /><i />
        </div>
        <small>{category} · {read}</small>
        <h1>{title}</h1>
        <p className="article-lead">{excerpt}</p>
        <div className="article-body">
          {body.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
        </div>
        <Link className="text-link" href="/contact" data-faro-user-action-name={`article.${article.slug}.contact`}>
          {mr ? "या विषयावर बोलूया" : "Talk about this topic"} <ArrowRight size={16} />
        </Link>
      </article>
    </main>
  );
}
