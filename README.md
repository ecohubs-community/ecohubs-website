# EcoHubs.community 🌱

[![CI](https://github.com/ecohubs/ecohubs.community/actions/workflows/ci.yml/badge.svg)](https://github.com/ecohubs/ecohubs.community/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

The public website for EcoHubs — a growing network of people writing the open-source Blueprint (RCOS) for regenerative communities. Built with SvelteKit + Svelte 5 (runes) + Tailwind v4.

## 🌟 What this site is

- **Marketing & explanation site** for the EcoHubs project — Vision, Blueprint (RCOS), Membership, FAQ, and Blog.
- **Application form** that posts into [ecohubsOS](https://os.ecohubs.community) (the separate community platform).
- **Member constellation** that pulls real members from the ecohubsOS public API and gracefully hides itself when the API is empty.
- **Manifesto + email + newsletter** plumbing (Linkmonk, Nodemailer, Cloudflare Turnstile).

This repo is the public face. Membership, governance, voting, ECO contribution accounting, and the Blueprint editor all live in **ecohubsOS** (separate codebase).

## 🚀 Quick Start

```bash
git clone https://github.com/ecohubs/ecohubs.community.git
cd ecohubs.community
pnpm install
cp .env.example .env       # then fill in real values
pnpm dev                    # http://localhost:5173
```

### Common commands

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm preview      # preview production build
pnpm check        # svelte-check (TypeScript + Svelte diagnostics)
pnpm format       # Prettier
pnpm test         # unit + e2e
```

## 📦 Environment Variables

Required:

```bash
PUBLIC_SITE_URL=https://ecohubs.community
SMTP_HOST=...                         # for contact form / application emails
EMAIL_FROM=noreply@ecohubs.community
ADMIN_EMAIL=admin@ecohubs.community
```

Integrations (all optional unless you need that feature):

```bash
# Newsletter (Linkmonk)
LINKMONK_URL=https://newsletter.ecohubs.community
LINKMONK_USERNAME=...
LINKMONK_PASSWORD=...

# Cloudflare Turnstile (anti-bot on contact form)
PUBLIC_TURNSTILE_SITE_KEY=
TURNSTILE_SECRET_KEY=

# ecohubsOS API (members constellation + application submission)
ECOHUBSOS_API_URL=https://os.ecohubs.community
ECOHUBSOS_APPLICATIONS_API_KEY=...
ECOHUBSOS_MEMBERS_API_KEY=...

# Ghost (blog source-of-truth)
GHOST_URL=https://blog.ecohubs.community
GHOST_CONTENT_API_KEY=...

# Analytics
VITE_GA_MEASUREMENT_ID=
GA_MEASUREMENT_ID=
```

See [`.env.example`](.env.example) for the full list.

## 📁 Project Structure

```
src/
├── app.html                       # Document shell (loads Inter + JetBrains Mono)
├── lib/
│   ├── components/                # Reusable Svelte components
│   │   ├── Navbar.svelte / Footer.svelte
│   │   ├── SEO.svelte             # Meta + canonical + JSON-LD helper
│   │   ├── PersonaIcons.svelte    # Hero persona row
│   │   ├── ConstellationMap.svelte # Member network visualisation
│   │   ├── EcosystemSection.svelte # "Operating system" section
│   │   ├── ApplicationForm.svelte
│   │   ├── ContactForm.svelte
│   │   ├── CookieConsent.svelte
│   │   └── ...
│   ├── config/
│   │   ├── seo.ts                 # Per-page titles, descriptions, OG images
│   │   └── application-questions.ts
│   ├── server/                    # Server-only utilities
│   │   ├── blog.ts                # Ghost client
│   │   ├── email.ts               # Nodemailer wrapper
│   │   └── ghost.ts
│   ├── styles/theme.css           # Tailwind v4 @theme tokens
│   └── utils/                     # Animation helpers
├── routes/
│   ├── layout.css                 # Shared design-system utilities
│   ├── (web)/                     # Public site (uses Navbar + Footer)
│   │   ├── +page.svelte           # Home
│   │   ├── vision/
│   │   ├── blueprint/
│   │   ├── membership/
│   │   ├── faq/
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── join/
│   │   ├── privacy/
│   │   ├── terms/
│   │   └── data.ts                # Shared homepage content (stories, wounds, FAQ, …)
│   ├── admin/                     # (placeholder)
│   ├── auth/                      # (placeholder)
│   ├── api/                       # Newsletter, contact, application endpoints
│   ├── feed.xml/                  # RSS
│   └── sitemap.xml/
├── content/blog/                  # Local mdsvex blog posts (Ghost is the primary source)
└── design_files/                  # Source-of-truth HTML mockups & design system
```

The `(web)/` route group exists so the public site shares one navbar + footer + layout while admin/auth routes can opt out.

## 🎨 Design System

The single source of truth lives at [`design_files/design system/Design System.html`](./design_files/design%20system/Design%20System.html). Tokens are mirrored in [`src/lib/styles/theme.css`](./src/lib/styles/theme.css) (`@theme` block) and shared utility classes (`.kicker`, `.soft-shadow`, `.grain`, `.pulse-dot`, `.hairline`, `.drop-cap`) live in [`src/routes/layout.css`](./src/routes/layout.css).

Brand color tokens: `ecohubs-base`, `ecohubs-ivory`, `ecohubs-primary`, `ecohubs-dark`, `ecohubs-deep`, `ecohubs-accent`, `ecohubs-light`, `ecohubs-muted`. Use these — avoid one-off `bg-[#…]` hex.

Typography: `font-serif` = **Pridi** (display headings); `font-story` = **Fraunces** italic (emotional accents); body = **Inter**; `font-mono` = **JetBrains Mono**.

## 🚢 Deployment

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for the full guide (Vercel + self-hosted Node + email setup).

## 🛠️ Conventions

- **Pages use `<SEO>`**, not raw `<svelte:head>`, so canonical/OG/JSON-LD stay consistent.
- **External links** that open in new tabs use `target="_blank" rel="noopener noreferrer"`. Pure-CTA external links opt out of the global underline+arrow with `class="no-external-decoration"`.
- **FAQ** content lives in each page's own `data.ts` and is aggregated on `/faq` (the canonical FAQPage source for JSON-LD).
- **One `<h1>` per page**; section headers are `<h2>`.
- **Animations** use `motion` v12 and the `data-scroll-animate` / `data-scroll-stagger` / `data-hero-step` attributes — see [`src/lib/utils/scroll-animations.ts`](./src/lib/utils/scroll-animations.ts).

## 📝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

MIT — see [LICENSE](./LICENSE).

## 📧 Support

- **Issues**: [GitHub Issues](https://github.com/ecohubs/ecohubs.community/issues)
- **Email**: [hello@ecohubs.community](mailto:hello@ecohubs.community)
- **Discord**: [discord.gg/Xnh7247Nq3](https://discord.gg/Xnh7247Nq3)

---

**Built with 🌱 by the EcoHubs Community**
