import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArticlePage } from "@/features/pages/article-page";
import { articles } from "@/content/site";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  return {
    title: article ? `${article.title} | Finopia insights` : "Finopia insights",
    description: article?.excerpt,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const article = articles.find((item) => item.slug === slug);
  if (!article) notFound();

  return <ArticlePage article={article} />;
}
