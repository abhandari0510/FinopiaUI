import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = {
  title: "Contact Finopia Services | संपर्क",
  description: "Get in touch with Finopia Services in Karad for financial literacy support, mutual fund guidance, insurance solutions and workshop enquiries.",
};
export default function Page() { return <SitePage page="contact" />; }
