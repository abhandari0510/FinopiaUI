import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = { title: "Financial Literacy | आर्थिक साक्षरता" };
export default function Page() { return <SitePage page="literacy" />; }
