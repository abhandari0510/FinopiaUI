import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={cn("brand-lockup brand-lockup-image", light && "brand-lockup-light")}>
      <Image
        className="brand-logo"
        src="/media/finopia-services-logo.jpeg"
        alt="Finopia Services"
        width={compact ? 48 : 174}
        height={compact ? 48 : 56}
        sizes={compact ? "48px" : "174px"}
        priority
      />
    </span>
  );
}
