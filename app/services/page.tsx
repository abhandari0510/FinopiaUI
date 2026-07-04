import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = { title: "Services | सेवा" };
export default function Page() { return <SitePage page="services" />; }
