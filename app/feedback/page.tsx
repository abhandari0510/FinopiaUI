import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";

export const metadata: Metadata = {
  title: "Feedback Finopia Services | प्रतिसाद",
  description: "Share anonymous or signed feedback about Finopia Services, our book, or the experience on our website.",
};

export default function Page() {
  return <SitePage page="feedback" />;
}
