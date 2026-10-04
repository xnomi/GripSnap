# GridSnap Work Tools

**Authoritative, Mobile-First Wage, Timesheet, and Overtime Calculation Engine**  
Targeting Tier-1 Economies: United States, Canada, Australia, and New Zealand.  
Fully compliant with Google Publisher Policies (AdSense E-E-A-T and Core Web Vitals CLS prevention).

---

## Architecture & Technology Stack

- **Framework:** Next.js 14+ (App Router, Server Components + `'use client'` interactive calculators)
- **Language:** TypeScript (Strict Mode)
- **Styling:** Tailwind CSS (Mobile-first, responsive touch targets $\ge$ 48px, dark/light theme safe)
- **Data Persistence:** 100% Client-Side LocalStorage (zero payroll or wage data transmitted to servers)
- **Export Pipeline:** Native client-side print-to-PDF styles (`@media print`) and instant CSV export
- **SEO & AEO:** Direct extractable answer blocks, JSON-LD Structured Data (`WebApplication`, `FAQPage`, `BreadcrumbList`, `Organization`), and 1,000+ words of editorial depth per calculator

---

## Directory & Route Architecture

```text
app/
├── layout.tsx                     # Global RootLayout (Fonts, Metadata base, AdSense, Footer, Header)
├── page.tsx                       # Global Hub: "Time Card Calculator with Lunch Breaks"
├── overtime-calculator/
│   ├── page.tsx                   # Multi-Tier Overtime Calculator Hub (US, CA, ON, AU, NZ)
│   ├── california/page.tsx        # California Daily Overtime (8h / 12h / 7th day rules)
│   ├── ontario/page.tsx           # Ontario 44-Hour Weekly Overtime Threshold (ESA)
│   └── australia-fair-work/page.tsx # AU Modern Award & 25% Casual Loading Calculator
├── hours-worked-calculator/
│   └── page.tsx                   # Elapsed hours & decimal converter (punch logs)
├── sitemap.ts                     # Dynamic XML sitemap generator
├── robots.ts                      # robots.txt configuration
├── about/page.tsx                 # Real E-E-A-T company / editorial profile
├── contact/page.tsx               # Verified contact form + real communication channels
├── privacy-policy/page.tsx        # Strict CCPA/CPRA, PIPEDA, AU Privacy Act policy
└── terms/page.tsx                 # Legal terms of use & calculation disclaimer
```

---

## Statutory Calculation Engines

1. **Time Card Calculator with Lunch Breaks (`app/page.tsx`):**
   - 7-day and 14-day (biweekly) pay period support
   - Automatic overnight shift handling (crossing midnight)
   - Unpaid meal/break minute deductions (0m, 30m, 45m, 60m presets)
   - Real-time regular and overtime gross earnings calculation
   - Sticky mobile results dashboard and single-tap CSV / PDF export

2. **California Daily Overtime (`app/overtime-calculator/california/page.tsx`):**
   - CA Labor Code Section 510 and IWC Wage Orders
   - Daily overtime (1.5x after 8 hours up to 12 hours)
   - Double Time (2.0x after 12 hours in a single workday)
   - 7th consecutive workday rules (first 8h at 1.5x; hours beyond 8 at 2.0x)
   - 40 regular hours weekly cap

3. **Ontario Overtime (`app/overtime-calculator/ontario/page.tsx`):**
   - Ontario Employment Standards Act, 2000 (ESA) Section 22
   - Statutory 44-hour weekly overtime threshold (1.5x)
   - Written averaging agreements (1-week, 2-week, 4-week cycles)
   - Statutory holiday premium pay calculations

4. **Australia Fair Work (`app/overtime-calculator/australia-fair-work/page.tsx`):**
   - Fair Work Act 2009 & Modern Awards standard
   - 38-hour standard workweek
   - Statutory 25% casual loading (`Base Rate × 1.25`)
   - Escalating overtime tiers (1.5x for first 2 hours, 2.0x thereafter)
   - Saturday (1.5x), Sunday (2.0x), and Public Holiday (2.5x) penalty rates
   - Superannuation Guarantee (11.5%) estimation on ordinary time earnings

5. **Hours Worked & Decimal Converter (`app/hours-worked-calculator/page.tsx`):**
   - Elapsed hours and minutes calculator for single and multi-punch shifts
   - FLSA 7-minute rounding rule (29 CFR § 785.48(b)) reference
   - Live minute-to-decimal converter and complete 60-minute reference chart

---

## Development & Verification

```bash
npm run dev     # Launch local development server
npm run build   # Validate production TypeScript build and static page generation
npm run lint    # Run ESLint compliance checks
```
