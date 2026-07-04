import type { Metadata } from "next";
import { SitePage } from "@/features/pages/site-page";
export const metadata: Metadata = { title: "Yogesh Kadam CFP® | योगेश कदम" };
export default function Page() { return <SitePage page="founder" />; }
