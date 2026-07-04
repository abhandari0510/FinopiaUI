import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ light = false, compact = false }: { light?: boolean; compact?: boolean }) {
  return (
    <span className={cn("brand-lockup brand-lockup-image", light && "brand-lockup-light")}>
      <Image
        className="brand-logo"
        src="/media/finopia-header-logo.png"
        alt="Finopia Services"
        width={1865}
        height={533}
        sizes={compact ? "176px" : "262px"}
        priority
      />
    </span>
  );
}
