import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = {
  title: "Financial Literacy | आर्थिक साक्षरता",
  description: "Build practical financial habits with educational programs, family money conversations and investor awareness support from Finopia Services.",
};
export default function Page() { return <SitePage page="literacy" />; }
