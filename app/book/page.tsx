import type { Metadata } from "next";
import { BooksPage } from "@/features/books/books-page";

export const metadata: Metadata = {
  title: "Books by Yogesh Kadam",
  description: "Explore Paishache Shahanpan and its English edition, Money Wisdom.",
};

export default function Page() {
  return <BooksPage />;
}
