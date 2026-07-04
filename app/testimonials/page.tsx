import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = { title: "Testimonials | अभिप्राय" };
export default function Page() { return <SitePage page="testimonials" />; }
