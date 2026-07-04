import type { MetadataRoute } from "next";
import { getSiteUrl } from "@/lib/site-url";
const routes=["","/about","/founder","/services","/financial-literacy","/book","/testimonials","/gallery","/blogs","/contact","/privacy","/terms","/disclosures"];
export default function sitemap():MetadataRoute.Sitemap{const siteUrl=getSiteUrl();return routes.map(route=>({url:`${siteUrl}${route}`,lastModified:new Date(),changeFrequency:route===""?"weekly":"monthly",priority:route===""?1:.7}))}
