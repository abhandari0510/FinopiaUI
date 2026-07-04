import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = {
  title: "About Finopia Services | आमच्याविषयी",
  description: "Learn about Finopia Services, Yogesh Kadam CFP® and our approach to family financial planning, insurance support and financial literacy in Karad.",
};
export default function Page() { return <SitePage page="about" />; }
