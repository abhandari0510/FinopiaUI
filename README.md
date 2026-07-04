# Finopia Services website

Production-oriented corporate website for **Finopia Services** and **Yogesh Kadam CFP®**. It is built with Next.js 15, React 19, TypeScript and Tailwind CSS 4, and is structured to grow into a publishing, events, appointments and customer platform.

This document is the operating manual for developers, designers and content editors. It covers a first-time setup, media replacement, customization, validation and production deployment.

> Important: the supplied Finopia Services JPEG logo is installed at `public/media/finopia-services-logo.jpeg` and is used by the header and footer. Portrait, book-cover, certificate, gallery and testimonial images are still code-native placeholders. Copying those files into `public/media` is only step one; follow [Adding media to the website](#adding-media-to-the-website) to connect them to the UI.

## Contents

1. [What is included](#what-is-included)
2. [Technology](#technology)
3. [Prerequisites](#prerequisites)
4. [Local setup](#local-setup)
5. [Environment variables](#environment-variables)
6. [Available commands](#available-commands)
7. [Project structure](#project-structure)
8. [Adding media to the website](#adding-media-to-the-website)
9. [Editing content and branding](#editing-content-and-branding)
10. [Languages](#languages)
11. [Inquiry form and email delivery](#inquiry-form-and-email-delivery)
12. [Connecting the backend](#connecting-the-backend)
13. [Grafana Frontend Observability](#grafana-frontend-observability)
14. [SEO and social sharing](#seo-and-social-sharing)
15. [Quality checks](#quality-checks)
16. [Production deployment](#production-deployment)
17. [Updating an existing deployment](#updating-an-existing-deployment)
18. [Troubleshooting](#troubleshooting)
19. [Launch checklist](#launch-checklist)

## What is included

- Responsive corporate homepage
- About Finopia and founder pages
- Services and financial-literacy pages
- Marathi book showcase
- Testimonials and gallery foundations
- Insights/blog listing foundation
- Contact details, WhatsApp action and validated inquiry form
- Complete English/Marathi language switching across all public pages, navigation, forms and legal content
- Compliance, privacy and terms pages
- Organization, person and book structured data
- Open Graph/Twitter metadata, sitemap and robots file
- Smooth scrolling, accessible motion and reduced-motion support
- Future-safe feature folders for later commercial modules

Current routes:

| Route | Purpose |
| --- | --- |
| `/` | Homepage |
| `/about` | Finopia story, mission and values |
| `/founder` | Yogesh Kadam CFP® profile |
| `/services` | Distribution, insurance and literacy services |
| `/financial-literacy` | Learning approach and FAQs |
| `/book` | `पैशाचे शहाणपण` showcase and inquiry |
| `/testimonials` | Testimonial categories and future media |
| `/gallery` | Events, workshops and book-launch media |
| `/blogs` | Article-listing foundation |
| `/contact` | Contact information and inquiry form |
| `/privacy` | Privacy policy |
| `/terms` | Terms and conditions |
| `/disclosures` | Regulatory disclosures |
| `/sitemap.xml` | Generated search-engine sitemap |
| `/robots.txt` | Generated crawler policy |

## Technology

- Next.js `15.5.19` with App Router
- React `19.1`
- TypeScript
- Tailwind CSS 4 and semantic CSS variables
- shadcn/ui-compatible aliases and Radix primitives
- Framer Motion and Lenis
- React Hook Form and Zod
- Lucide icons

The exact dependency tree is locked in `package-lock.json`. Use `npm ci` in automated or production builds for repeatable installation.

## Prerequisites

### Developer computer

Required:

- 64-bit Windows 10/11, macOS or a modern Linux distribution
- Node.js 22 or 24; this project was verified with Node `24.13.0`
- npm 10 or newer; npm is bundled with Node.js
- Approximately 1 GB free disk space for source, dependencies and build output
- Internet access during the initial install and build because npm packages and Google-hosted font files are downloaded

Recommended:

- Git 2.40 or newer
- VS Code with ESLint, Tailwind CSS IntelliSense and Prettier extensions
- At least 4 GB available RAM for a comfortable production build
- ImageMagick, Squoosh CLI or another image optimizer when preparing media

Verify the essential tools:

```bash
node --version
npm --version
git --version
```

If Node is missing, install it from [nodejs.org](https://nodejs.org/) or through a version manager such as `nvm`, `fnm` or Volta. Do not use an unsupported or end-of-life Node release for production.

### Blank production server

For a self-hosted Linux deployment, provision:

- Ubuntu 22.04/24.04 LTS, Debian 12 or equivalent
- 1 CPU and 1 GB RAM minimum; 2 CPUs and 2 GB RAM are recommended for building on the server
- Node.js 22 or 24 and npm
- Git, or another way to upload the project
- Nginx or Caddy as a reverse proxy
- A domain with DNS access
- Ports `80` and `443` open to the internet
- Outbound HTTPS access for package and font downloads
- A non-root service user
- A TLS certificate, normally issued automatically through Certbot or Caddy

You do **not** need PHP, Apache, MySQL, PostgreSQL or a CMS for the current informational build. A database will only be necessary when dynamic modules such as accounts, orders, appointments or a CMS are introduced.

## Local setup

### 1. Open the project

PowerShell:

```powershell
cd C:\Users\aakas\Desktop\FinOpia\FinOpia_UI
```

macOS/Linux:

```bash
cd /path/to/FinOpia/FinOpia_UI
```

If the project is stored in Git instead:

```bash
git clone <repository-url> finopia-services
cd finopia-services/FinOpia_UI
```

If your Git repository contains only the UI project and not the parent `FinOpia` folder, enter the repository root instead. The correct folder is the one that contains `package.json`, `app/`, `components/` and `next.config.ts`.

### 2. Create the local environment file

PowerShell:

```powershell
Copy-Item .env.example .env.local
```

macOS/Linux:

```bash
cp .env.example .env.local
```

For local development, set:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Install dependencies

For an existing lockfile, use:

```bash
npm ci
```

Use `npm install` only when intentionally adding or updating a dependency because it may modify `package-lock.json`.

### 4. Start development mode

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The development server automatically refreshes after source changes.

To use another port:

```bash
npm run dev -- -p 3001
```

To test from a phone on the same Wi-Fi network:

```bash
npm run dev -- -H 0.0.0.0
```

Then open `http://YOUR-COMPUTER-LAN-IP:3000` on the phone. Allow Node.js through the local firewall only on trusted networks.

### 5. Test the production build locally

Development mode is more forgiving than production. Always test the optimized build before deployment:

```bash
npm run check
npm run build
npm start
```

Open [http://localhost:3000](http://localhost:3000). Stop either development or production mode with `Ctrl+C`.

## Environment variables

The committed `.env.example` documents variables without containing secrets. Never commit `.env.local`, `.env.production` or provider credentials.

| Variable | Required | Example | Purpose |
| --- | --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Yes in production | `https://finopiaservices.com` | Canonical origin used by metadata, JSON-LD, sitemap and robots |
| `NEXT_PUBLIC_FINOPIA_API_BASE_URL` | Only if backend/checkout is enabled | `https://api.finopiaservices.com` | Public origin of the Spring Boot backend |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Only if online Razorpay checkout is enabled | `rzp_live_xxxxxxxxxxxxxx` | Browser-safe Razorpay key ID; never use the secret here |
| `NEXT_PUBLIC_BOOK_SKU` | Only if book checkout/inquiry integration is enabled | `paishache-shahanpan` | Product identifier shared with the backend |

Rules:

- Use the full origin, including `https://`.
- Do not include a trailing path.
- A trailing slash is accepted and normalized.
- Rebuild after changing a `NEXT_PUBLIC_*` variable.
- Local fallback is `http://localhost:3000` when the value is absent or invalid.

Future email, CRM, CMS or payment secrets must **not** start with `NEXT_PUBLIC_`; that prefix exposes values to browser code. Keep secrets server-side, for example:

```env
# Examples only; these integrations are not implemented yet.
RESEND_API_KEY=
CONTACT_TO_EMAIL=
CRM_WEBHOOK_SECRET=
```

If you are running the informational website only, `NEXT_PUBLIC_SITE_URL` is the only required variable. The backend and checkout variables may stay in `.env.example` as documentation until those features are actively enabled.

Grafana values prefixed with `NEXT_PUBLIC_` are intentionally browser-visible because the browser must send telemetry to Faro. The source-map API key is different: keep it private in CI/CD or the production build environment only.

## Available commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts Turbopack development mode |
| `npm run check` | Runs the TypeScript compiler without emitting files |
| `npm run lint` | Currently aliases the strict TypeScript check |
| `npm run build` | Creates the optimized `.next` production output |
| `npm start` | Serves a previously built production application |
| `npm audit` | Checks installed packages against npm security advisories |

Useful maintenance commands:

```bash
npm outdated
npm audit
npm ls
```

Do not run `npm audit fix --force` blindly: it can install breaking framework versions. Review, update intentionally and rerun the full build.

## Project structure

```text
FinOpia_UI/
├── app/                     # Routes, page metadata, schemas and global styles
│   ├── layout.tsx           # Fonts, global metadata and structured data
│   ├── globals.css          # Main design tokens and responsive styles
│   ├── additions.css        # Additional homepage section styles
│   ├── sitemap.ts           # Generated sitemap
│   └── robots.ts            # Generated robots policy
├── components/              # Header, footer and reusable UI primitives
│   ├── brand-mark.tsx       # Current code-native Finopia mark
│   └── ui/                  # Button and accordion primitives
├── content/
│   └── site.ts              # Business details, navigation, services and articles
├── features/
│   ├── contact/             # Inquiry form and validation
│   └── home/                # Homepage composition
├── i18n/
│   └── translations.ts      # Homepage English and Marathi strings
├── lib/
│   ├── site-url.ts          # Canonical origin validation
│   └── utils.ts             # Shared class-name utility
├── public/
│   └── media/               # Approved public media files
├── types/                   # Shared TypeScript types
├── .env.example             # Safe environment-variable template
├── next.config.ts           # Next.js configuration
├── package.json             # Commands and dependencies
└── README.md                # This guide
```

In the full workspace, this UI folder sits beside `FinOpia_Backend/`:

```text
FinOpia/
├── FinOpia_UI/
└── FinOpia_Backend/
```

Architectural rule of thumb:

- Put editable words and business data in `content/` or `i18n/`.
- Put reusable visual building blocks in `components/`.
- Put domain-specific workflows in `features/`.
- Put route composition and route metadata in `app/`.
- Put browser-served files in `public/`.
- Never place API keys in components or content files.

## Adding media to the website

### Understand `public/` paths

Anything under `public/` is served from the site root. For example:

```text
public/media/yogesh-kadam-portrait.webp
```

is referenced in React as:

```tsx
src="/media/yogesh-kadam-portrait.webp"
```

Do not write `src="/public/media/..."`, do not import a public file with a Windows path, and do not use `file://` URLs.

### Recommended folders and names

```text
public/media/
├── finopia-services-logo.jpeg   # Current approved header/footer logo
├── logo.svg                     # Optional future transparent vector replacement
├── logo-mark.svg
├── og-image.jpg
├── yogesh-kadam-portrait.webp
├── yogesh-kadam-speaking.webp
├── book-cover-paisache-shahanpan.webp
├── book-preview/
│   ├── page-01.webp
│   └── page-02.webp
├── certificates/
│   ├── cfp.webp
│   ├── amfi-arn.webp
│   └── insurance.webp
├── gallery/
│   ├── book-launch-01.webp
│   ├── workshop-01.webp
│   └── speaking-01.webp
└── testimonials/
    ├── person-name.webp
    └── another-person.webp
```

Use lowercase, hyphenated, descriptive names. Avoid spaces, `final-final`, camera-generated names and personal identification numbers.

### Recommended media specifications

| Asset | Recommended source size | Format | Notes |
| --- | --- | --- | --- |
| Main logo | Vector | SVG | Convert text to outlines or ensure fonts are embedded |
| Founder portrait | 1600 × 2000 px | WebP/AVIF | Portrait crop with room around head and shoulders |
| Book cover | 1200 × 1800 px | WebP/AVIF | Straight front cover, no perspective distortion |
| Gallery landscape | 1800 × 1200 px | WebP/AVIF | 3:2 ratio works well |
| Gallery portrait | 1200 × 1600 px | WebP/AVIF | Keep faces away from crop edges |
| Testimonial avatar | 600 × 600 px | WebP/AVIF | Square source; UI may display it as a circle |
| Certificate | 1600–2400 px wide | WebP | Redact unnecessary personal identifiers |
| Open Graph image | 1200 × 630 px | JPG | Keep text within the central safe area |
| Favicon | 512 × 512 px | PNG | Simple mark with transparent background |

Targets rather than absolute limits:

- Logo SVG: under 100 KB
- Portrait/book cover: under 300 KB each
- Gallery image: under 250 KB each
- Avatar: under 80 KB
- Open Graph image: under 300 KB

Never upscale a small image merely to reach these dimensions. Use the best approved source, remove metadata where appropriate and check the result at mobile size.

### Optimize media before adding it

Using Squoosh CLI:

```bash
npx @squoosh/cli --webp '{"quality":82}' source.jpg
```

Using ImageMagick:

```bash
magick source.jpg -auto-orient -resize "1800x1800>" -strip -quality 82 output.webp
```

Preserve the original files outside `public/`; only optimized delivery copies belong in the website repository.

### Use `next/image`

For raster images, prefer Next.js `Image` instead of raw `<img>` tags:

```tsx
import Image from "next/image";

<Image
  src="/media/yogesh-kadam-portrait.webp"
  alt="Yogesh Kadam CFP®, founder of Finopia Services"
  width={1600}
  height={2000}
  sizes="(max-width: 780px) 100vw, 42vw"
/>
```

Use `priority` only for the most important image visible immediately on page load. Gallery images should remain lazy-loaded, which is the default.

### Replace or update the logo

The supplied JPEG is currently rendered by `components/brand-mark.tsx` from `public/media/finopia-services-logo.jpeg`. To replace it with another file while keeping the same layout, preserve the filename or update the `src` value in that component.

For the sharpest rendering and a transparent background, request an official vector export and save it as `public/media/logo.svg`. Then update the component to:

```tsx
import Image from "next/image";
import { cn } from "@/lib/utils";

export function BrandMark({ light = false, compact = false }: {
  light?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={cn("brand-lockup", light && "brand-lockup-light")}>
      <Image
        src="/media/logo.svg"
        alt="Finopia Services"
        width={compact ? 40 : 150}
        height={40}
        priority
      />
    </span>
  );
}
```

If the logo is unreadable on the dark footer, export a white version such as `logo-light.svg` and select it when `light` is true.

### Add the founder portrait

There are two placeholder locations:

- Homepage: `features/home/home-page.tsx`, search for `portrait-placeholder`
- Founder page: `app/founder/page.tsx`, search for `founder-page-portrait`

Import `Image` and place it inside the existing wrapper so badges and captions continue to work:

```tsx
import Image from "next/image";

<Reveal className="portrait-placeholder">
  <Image
    className="portrait-photo"
    src="/media/yogesh-kadam-portrait.webp"
    alt="Yogesh Kadam CFP®"
    fill
    sizes="(max-width: 780px) 100vw, 40vw"
    style={{ objectFit: "cover", objectPosition: "center top" }}
  />
  <div className="portrait-caption">
    {/* Keep the existing caption content here. */}
  </div>
  <div className="experience-badge">
    {/* Keep the existing experience content here. */}
  </div>
</Reveal>
```

The placeholder currently draws a silhouette with `.portrait-placeholder::before` and `::after`. Disable those shapes only when a real image is present:

```css
.portrait-placeholder:has(.portrait-photo)::before,
.portrait-placeholder:has(.portrait-photo)::after {
  display: none;
}

.portrait-photo {
  z-index: 1;
}
```

Add that CSS to `app/additions.css`. Test the face position at 375 px, 768 px and desktop widths.

### Add the real book cover

The book is currently drawn in CSS in:

- `features/home/home-page.tsx`
- `app/book/page.tsx`

After adding `public/media/book-cover-paisache-shahanpan.webp`, keep the existing `book-object` wrapper and replace the contents with:

```tsx
import Image from "next/image";

<div className="book-object book-object-image">
  <Image
    src="/media/book-cover-paisache-shahanpan.webp"
    alt="पैशाचे शहाणपण by Yogesh Kadam CFP®"
    fill
    sizes="(max-width: 780px) 250px, 290px"
    style={{ objectFit: "cover" }}
  />
</div>
```

Add:

```css
.book-object-image {
  overflow: hidden;
  border-radius: 3px 8px 8px 3px;
}
```

Keep `.book-shadow`, perspective and hover styles; they create the 3D presentation around the real cover.

### Add certificates

The homepage proof cards currently show verified text only. Add certificate thumbnails only if publishing them is permitted and sensitive identifiers have been reviewed.

Example inside a `.proof-card` in `features/home/home-page.tsx`:

```tsx
<Image
  src="/media/certificates/amfi-arn.webp"
  alt="Finopia Services AMFI ARN certificate"
  width={800}
  height={1100}
  sizes="(max-width: 780px) 100vw, 33vw"
/>
```

Recommended behavior for full-size viewing is a Radix Dialog/lightbox rather than opening enormous images directly in the page. Keep the textual ARN, EUIN and validity visible even when an image is shown; text is searchable and accessible.

### Add gallery images

The current gallery is a visual placeholder in `app/gallery/page.tsx`. For maintainability, first create `content/gallery.ts`:

```ts
export const galleryItems = [
  {
    src: "/media/gallery/book-launch-01.webp",
    alt: "Yogesh Kadam speaking at the पैशाचे शहाणपण book launch",
    category: "Book Launch",
    width: 1800,
    height: 1200,
  },
  {
    src: "/media/gallery/workshop-01.webp",
    alt: "Finopia Services financial literacy workshop",
    category: "Workshops",
    width: 1800,
    height: 1200,
  },
] as const;
```

Then import `Image` and `galleryItems` in `app/gallery/page.tsx` and replace the `Array.from(...)` placeholder mapping:

```tsx
<div className="gallery-grid">
  {galleryItems.map((item, index) => (
    <figure className={`gallery-item g-${index}`} key={item.src}>
      <Image
        src={item.src}
        alt={item.alt}
        width={item.width}
        height={item.height}
        sizes="(max-width: 780px) 100vw, 33vw"
      />
      <figcaption>{item.category}</figcaption>
    </figure>
  ))}
</div>
```

Do not use empty alt text for meaningful event images. Describe what is happening rather than repeating “image” or stuffing keywords.

### Add testimonials

Obtain written permission before publishing a person’s name, photograph, occupation, quote or video. Keep exact approved wording and never imply investment performance or guaranteed outcomes.

Create `content/testimonials.ts`:

```ts
export const testimonials = [
  {
    quote: "Approved testimonial text goes here.",
    name: "Full name or approved initials",
    role: "Doctor",
    image: "/media/testimonials/person-name.webp",
  },
] as const;
```

Then map this content in `app/testimonials/page.tsx`. For video testimonials, use a consented poster image and load the external player only after interaction to protect performance and privacy.

### Add favicon and social image

- Put a 512 × 512 PNG at `app/icon.png`; Next.js generates favicon metadata automatically.
- Put the social card at `public/media/og-image.jpg`.
- Add it to the `openGraph` and `twitter` objects in `app/layout.tsx`:

```ts
openGraph: {
  // Keep the existing fields.
  images: [{ url: "/media/og-image.jpg", width: 1200, height: 630 }],
},
twitter: {
  // Keep the existing fields.
  images: ["/media/og-image.jpg"],
},
```

After any media change, run `npm run build` and inspect the homepage, founder, book, gallery, testimonial and social-preview experiences on both mobile and desktop.

## Editing content and branding

### Business and compliance details

Edit `content/site.ts` for:

- Business and founder names
- Phone, WhatsApp and email
- Address
- Instagram, YouTube and Facebook URLs
- ARN, EUIN and validity
- CFP certification number
- Insurer and agency code
- Navigation
- Service cards
- Article previews

These details also feed the footer and structured data. Search the project before changing compliance wording:

```bash
rg "ARN-337302|E641374|HDF01946314" .
```

On PowerShell without `rg`:

```powershell
Get-ChildItem -Recurse -File | Select-String "ARN-337302|E641374|HDF01946314"
```

### Page copy

Most route-specific copy lives directly in each `app/<route>/page.tsx`. Homepage copy lives in `i18n/translations.ts`, while repeated collections live in `content/site.ts`.

Do not introduce claims such as:

- Guaranteed or assured returns
- Highest or risk-free returns
- Investment advisory
- Portfolio management
- Stock recommendations or tips

Keep the distinction between financial education, mutual fund distribution and insurance distribution explicit. Have final public copy and disclosures reviewed by the appropriate compliance professional.

### Colors and design tokens

Primary design variables are at the beginning of `app/globals.css`:

```css
:root {
  --ink: #0a2342;
  --ink-2: #103f70;
  --forest: #086da9;
  --teal: #0789cc;
  --mint: #bce9fa;
  --gold: #f2a93b;
  --paper: #f7fbfe;
  --line: #d8e8f2;
  --radius: 20px;
}
```

Change tokens instead of replacing colors page by page. Recheck text/background contrast after every palette adjustment; target WCAG AA.

### Typography

Fonts are configured in `app/layout.tsx` through `next/font`:

- Manrope for Latin content
- Noto Sans Devanagari for Marathi

Changing a font requires updating the import, font initialization and associated CSS variable. Keep a Devanagari-capable font for Marathi.

### Add a page

Create a folder and `page.tsx` under `app/`:

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/page-hero";

export const metadata: Metadata = { title: "New page" };

export default function NewPage() {
  return (
    <main>
      <PageHero
        eyebrow="Section"
        title="New page"
        description="A concise page description."
      />
    </main>
  );
}
```

Then add the route to `content/site.ts` if it belongs in navigation and to the routes array in `app/sitemap.ts`.

## Languages

The complete public website supports instant English/Marathi switching without a page reload. The selected locale persists in browser `localStorage` and updates the document language through `components/providers.tsx`.

- Homepage strings live in `i18n/translations.ts`.
- Secondary-page strings live in `i18n/pages.ts`.
- Shared bilingual services, articles, navigation and addresses live in `content/site.ts`.
- Form labels, options and validation messages live beside the form in `features/contact/contact-form.tsx`.

When adding new visible content, always add both English and Marathi variants, preserve route metadata in the server `page.tsx`, review Marathi line wrapping on small devices, and use professionally reviewed native translations rather than transliteration.

Example client section:

```tsx
"use client";

import { useLanguage } from "@/components/providers";

export function LocalizedIntro() {
  const { t, locale } = useLanguage();
  return <section lang={locale}>{t.heroBody}</section>;
}
```

For multilingual search indexing at scale, prefer locale routes such as `/en/...` and `/mr/...` with `hreflang` metadata. That is a future architectural enhancement; the current switch is client-side.

## Inquiry form and email delivery

The form in `features/contact/contact-form.tsx` currently:

- Validates fields with Zod
- Displays inline errors
- Simulates a short submission delay
- Writes only a redacted development message to the browser console
- Displays a success state

It does **not** email Finopia, store a record or call a CRM. Do not launch assuming inquiries are being delivered.

Before production, connect it to one approved server-side destination:

- A Next.js server action
- A Next.js route handler such as `app/api/inquiries/route.ts`
- A transactional email provider such as Resend, Postmark or SES
- An authenticated CRM webhook

Minimum production protections:

- Validate again on the server with Zod
- Rate-limit by IP/session
- Add a honeypot or managed bot protection
- Keep API keys server-side
- Escape/sanitize user-provided content in email templates
- Log delivery failure without logging sensitive form content unnecessarily
- Return a real error state instead of always showing success
- Publish a privacy notice and retention policy
- Obtain consent before marketing follow-up

The frontend `onSubmit` function is the replacement point. Search for:

```ts
const onSubmit = async (data: FormData) => {
```

## Connecting the backend

The public website can run without the backend. Use the backend only when enabling book checkout, order tracking, admin recovery workflows or durable lead/order events.

For local integration:

1. Start the backend from `FinOpia_Backend` on port `8080`.
2. In `FinOpia_UI/.env.local`, set:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_FINOPIA_API_BASE_URL=http://localhost:8080
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_xxxxxxxxxxxxxx
NEXT_PUBLIC_BOOK_SKU=paishache-shahanpan
```

3. Restart the Next.js dev server after editing `.env.local`.
4. Confirm the backend readiness endpoint:

```text
http://localhost:8080/checkout/readiness
```

For production integration:

1. Deploy the backend first, usually at `https://api.finopiaservices.com`.
2. Configure backend `CORS_ALLOWED_ORIGINS` to include the website origin.
3. Configure the Razorpay webhook to call the backend, not the frontend.
4. Set these UI variables before building:

```env
NEXT_PUBLIC_SITE_URL=https://finopiaservices.com
NEXT_PUBLIC_FINOPIA_API_BASE_URL=https://api.finopiaservices.com
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxxxx
NEXT_PUBLIC_BOOK_SKU=paishache-shahanpan
```

5. Rebuild the UI because `NEXT_PUBLIC_*` values are embedded into the browser bundle.

Never put backend-only credentials in `FinOpia_UI`. Razorpay secret, webhook secret, database credentials, SMTP password, Shiprocket password, JWT secret and admin password belong only to the backend environment.

## Telemetry removed

Grafana Faro observability and related build-time configuration have been removed from this repository. No browser telemetry dependencies or Grafana source map upload settings are required.

## SEO and social sharing

Global metadata and JSON-LD are in `app/layout.tsx`. The canonical site origin comes from `NEXT_PUBLIC_SITE_URL` via `lib/site-url.ts`.

Before launch:

1. Set the production site URL.
2. Add the Open Graph image.
3. Confirm business details in Organization and Person schemas.
4. Confirm book details before adding ISBN, publisher, offer or availability data.
5. Open `/sitemap.xml` and verify production URLs.
6. Open `/robots.txt` and verify the sitemap URL.
7. Test structured data with Google’s Rich Results Test.
8. Verify the domain in Google Search Console and Bing Webmaster Tools.
9. Submit `/sitemap.xml` after launch.

Do not add fake ratings, review counts, prices, availability or author credentials to structured data.

## Quality checks

Run before every release:

```bash
npm ci
npm run check
npm run build
npm audit
```

Manual checks:

- All navigation links work
- English/Marathi switch works and persists
- Phone, email, WhatsApp and social links are correct
- Forms work with keyboard only
- Focus indicators are visible
- Images have meaningful alt text
- Decorative images have empty alt text
- No horizontal scrolling at 320/375 px
- Layout works at 768, 1024, 1440 and 1920 px
- Reduced-motion preference is respected
- Text remains readable at 200% browser zoom
- Compliance identifiers and dates are current
- No unpublished personal data appears in certificate images
- Inquiry delivery is tested end to end
- 404s and browser console errors are absent

For Lighthouse, test the production build—not `npm run dev`:

```bash
npm run build
npm start
```

Then use Chrome/Edge DevTools → Lighthouse. Large unoptimized media is the most likely cause of degraded performance after content handoff.

## Production deployment

### Option A: Vercel

This is the simplest deployment path for Next.js.

1. Push the project to GitHub, GitLab or Bitbucket.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the repository.
4. Vercel should detect Next.js automatically.
5. Keep the build command as `npm run build`.
6. Add `NEXT_PUBLIC_SITE_URL=https://your-domain.example` under project environment variables.
7. Deploy.
8. Add the production domain in **Settings → Domains**.
9. Update DNS using the records Vercel provides.
10. Redeploy after the final domain variable is set.

Preview deployments should use their own URL where canonical preview metadata matters. Protect non-public previews from indexing.

### Option B: Linux VPS with Nginx and systemd

The following example assumes Ubuntu/Debian, a service user named `finopia`, an application path of `/var/www/finopia`, and port `3000`.

#### 1. Prepare the server

```bash
sudo apt update
sudo apt upgrade -y
sudo apt install -y git curl nginx ca-certificates
```

Install a supported Node.js 22/24 build using the official Node.js instructions or an approved distribution repository. Then verify:

```bash
node --version
npm --version
nginx -v
```

#### 2. Create a restricted service user and project directory

```bash
sudo adduser --system --group --home /var/www/finopia finopia
sudo mkdir -p /var/www/finopia
sudo chown -R finopia:finopia /var/www/finopia
```

Upload or clone the source as the `finopia` user:

```bash
sudo -u finopia git clone <repository-url> /var/www/finopia
cd /var/www/finopia
```

If the directory already contains files, upload them with `rsync`/SFTP instead of cloning into a non-empty directory.

#### 3. Configure production environment

```bash
sudo -u finopia cp .env.example .env.production
sudo -u finopia nano .env.production
```

Set:

```env
NEXT_PUBLIC_SITE_URL=https://finopiaservices.com
NODE_ENV=production
```

Restrict the file if secrets are later added:

```bash
sudo chmod 600 /var/www/finopia/.env.production
sudo chown finopia:finopia /var/www/finopia/.env.production
```

#### 4. Install and build

```bash
cd /var/www/finopia
sudo -u finopia npm ci
sudo -u finopia npm run check
sudo -u finopia npm run build
```

Do not use `npm ci --omit=dev` before building; TypeScript, Tailwind and their build tooling are development dependencies. After a successful build, `npm prune --omit=dev` is optional, but retain the lockfile and repeatable deployment process.

#### 5. Create a systemd service

First locate executables:

```bash
which node
which npm
```

Create `/etc/systemd/system/finopia.service` and adjust `ExecStart` if `npm` is in another location:

```ini
[Unit]
Description=Finopia Services Next.js website
After=network.target

[Service]
Type=simple
User=finopia
Group=finopia
WorkingDirectory=/var/www/finopia
Environment=NODE_ENV=production
EnvironmentFile=/var/www/finopia/.env.production
ExecStart=/usr/bin/npm start -- -H 127.0.0.1 -p 3000
Restart=on-failure
RestartSec=5
TimeoutStopSec=20
NoNewPrivileges=true
PrivateTmp=true

[Install]
WantedBy=multi-user.target
```

Enable and inspect it:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now finopia
sudo systemctl status finopia
curl -I http://127.0.0.1:3000
```

View logs:

```bash
sudo journalctl -u finopia -f
```

#### 6. Configure Nginx

Create `/etc/nginx/sites-available/finopia`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name finopiaservices.com www.finopiaservices.com;

    client_max_body_size 2m;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

Enable and validate:

```bash
sudo ln -s /etc/nginx/sites-available/finopia /etc/nginx/sites-enabled/finopia
sudo nginx -t
sudo systemctl reload nginx
```

Remove the default Nginx site if it conflicts with the domain.

#### 7. DNS and HTTPS

Point the domain’s `A` record to the VPS public IPv4 address and optionally its `AAAA` record to IPv6. Wait for DNS propagation, then install Certbot:

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d finopiaservices.com -d www.finopiaservices.com
sudo certbot renew --dry-run
```

Use a firewall that allows SSH, HTTP and HTTPS only:

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
```

Do not expose port `3000` publicly; Nginx should be the public entry point.

### Option C: Docker

Docker is not required and no Dockerfile is committed. If your platform requires containers, use a multi-stage Node 22/24 Alpine build, run as a non-root user and expose port `3000`. Build arguments/environment must include the production `NEXT_PUBLIC_SITE_URL` because public variables are embedded during the build.

At minimum, validate the same commands inside the image:

```bash
npm ci
npm run check
npm run build
npm start
```

Do not copy local `node_modules` or `.next` directories into a Linux image built from Windows/macOS.

## Updating an existing deployment

### Vercel

Push to the connected production branch. Review the preview deployment, then promote/merge. Confirm environment-variable changes and redeploy when necessary.

### VPS

Keep the previous release or backup available. A simple update flow is:

```bash
cd /var/www/finopia
sudo -u finopia git fetch --all --prune
sudo -u finopia git pull --ff-only
sudo -u finopia npm ci
sudo -u finopia npm run check
sudo -u finopia npm run build
sudo systemctl restart finopia
sudo systemctl status finopia
curl -I https://finopiaservices.com
```

For zero/low downtime, build in a timestamped release directory, switch a `current` symlink after success and restart the service. Never overwrite the only working release before a new build passes.

Back up before structural changes:

- `.env.production`
- Approved original media and optimized delivery files
- Content/configuration changes not yet committed
- Future database and uploaded customer data

## Troubleshooting

### `node` or `npm` is not recognized

Install a supported Node.js version, restart the terminal and verify `node --version`. On Windows, ensure the Node installation directory is on `PATH`.

### PowerShell blocks npm scripts

Use `npm.cmd` temporarily or review the local PowerShell execution policy with your administrator. Do not disable system security globally without understanding the impact.

### Port 3000 is already in use

Run another port:

```bash
npm run dev -- -p 3001
```

Or stop the process already using port 3000.

### Dependency installation behaves strangely

First use the lockfile cleanly:

```bash
npm ci
```

If the local installation is genuinely corrupted, remove only generated `node_modules` and `.next`, then rerun `npm ci`. Do not delete `package-lock.json` as a generic fix.

### Build fails while fetching fonts

`next/font/google` downloads font files during build. Ensure outbound HTTPS and DNS access are available. For isolated/offline servers, self-host approved font files and switch to `next/font/local`.

### Build is killed or reports out-of-memory

Increase RAM/swap or build in CI/Vercel and deploy the artifact. A 2 GB build machine is recommended when adding a large content pipeline.

### An image exists but does not appear

Check all of the following:

- The file is inside `public/media`, not beside it.
- The component actually references it; files are not discovered automatically.
- The path begins with `/media/`, not `/public/media/`.
- Filename casing matches exactly; Linux is case-sensitive.
- The extension in code matches the real file.
- The image is not hidden behind placeholder pseudo-elements.
- Restart/rebuild if the development cache is stale.

### Images look stretched or faces are cropped

Use correct intrinsic width/height and adjust `object-position`. Do not remove `object-fit: cover` without checking all breakpoints. Supply a more suitable crop when the same source cannot work on both portrait and landscape layouts.

### Marathi displays as boxes or wraps poorly

Confirm that `Noto_Sans_Devanagari` still loads, that the text is valid Unicode and that the element inherits the Devanagari font. Avoid legacy non-Unicode Marathi font encodings.

### Sitemap contains localhost

Set `NEXT_PUBLIC_SITE_URL` to the production HTTPS origin and rebuild. Check the environment value in the hosting provider or `.env.production`.

### The contact form says success but no email arrives

That is expected until a real server-side email/CRM integration replaces the simulated submit handler. See [Inquiry form and email delivery](#inquiry-form-and-email-delivery).

### Nginx shows `502 Bad Gateway`

Check:

```bash
sudo systemctl status finopia
sudo journalctl -u finopia -n 100 --no-pager
curl -I http://127.0.0.1:3000
sudo nginx -t
```

The common causes are a failed build, wrong working directory, incorrect npm path, missing environment file or a port mismatch.

### Changes are not visible in production

Confirm that the latest source was deployed, environment variables were applied at build time, `npm run build` completed successfully and the process was restarted. Purge CDN cache only after verifying the origin version.

## Launch checklist

### Brand and media

- [x] Supplied Finopia Services logo is connected to the header and footer
- [ ] Replace the JPEG with an official transparent SVG when available
- [ ] Founder portrait is approved and correctly cropped
- [ ] Book cover is the final print-approved version
- [ ] Certificates have publication approval and sensitive data review
- [ ] Gallery images are optimized and consented
- [ ] Testimonials use approved text, names and photographs
- [ ] Favicon and 1200 × 630 social image are installed

### Content and compliance

- [ ] Phone, office phone, email and address are verified
- [ ] WhatsApp and all social links are tested
- [ ] ARN, EUIN, validity, CFP number and insurance details are current
- [ ] Distribution/advisory role distinction is reviewed
- [ ] Mutual-fund and insurance disclaimers are approved
- [ ] Privacy, terms and disclosure pages receive final review
- [ ] Marathi copy is professionally reviewed

### Technical

- [ ] Production `NEXT_PUBLIC_SITE_URL` is set before build
- [ ] `npm ci`, `npm run check`, `npm run build` and `npm audit` pass
- [ ] Inquiry delivery works end to end and handles failure
- [ ] Sitemap, robots and structured data show production URLs
- [ ] Domain redirects consistently to one HTTPS hostname
- [ ] TLS renewal is configured
- [ ] Lighthouse and real-device tests are complete
- [ ] Keyboard, focus, reduced-motion and 200% zoom checks pass
- [ ] Monitoring, backups and rollback ownership are assigned

## Future modules

The current phase intentionally does not implement store checkout, payments, shipping, customer accounts, appointments, events, CRM, newsletter automation or administration. Introduce each as an isolated feature/route group with server-side authorization and data validation. Avoid placing future commerce logic directly inside presentational homepage components.

When a CMS or database is added, document its schema, migrations, backups, environment variables, role permissions and recovery process here before it becomes production-critical.
