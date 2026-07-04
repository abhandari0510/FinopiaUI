import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = { title: "Gallery | छायाचित्रे" };
export default function Page() { return <SitePage page="gallery" />; }
