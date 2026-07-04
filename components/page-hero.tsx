import { Reveal } from "@/components/reveal";

export function PageHero({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <section className="page-hero"><div className="page-hero-orb" /><Reveal className="container"><span className="kicker">{eyebrow}</span><h1>{title}</h1><p>{description}</p></Reveal></section>;
}
