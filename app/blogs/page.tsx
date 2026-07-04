import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = {
  title: "Insights | लेख",
  description: "Read practical articles on family money conversations, financial discipline, insurance literacy and smart financial planning from Finopia Services.",
};
export default function Page() { return <SitePage page="blogs" />; }
