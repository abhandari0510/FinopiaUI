import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = { title: "About | आमच्याविषयी" };
export default function Page() { return <SitePage page="about" />; }
