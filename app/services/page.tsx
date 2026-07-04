import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = {
  title: "Services | सेवा",
  description: "Explore mutual fund guidance, insurance solutions, financial literacy programs and investor awareness services offered by Finopia Services.",
};
export default function Page() { return <SitePage page="services" />; }
