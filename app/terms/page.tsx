import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = { title: "Terms | अटी" };
export default function Page() { return <SitePage page="terms" />; }
