# AGENTS.md — EcoHubs.community

This file orients AI coding assistants (Claude Code, Cursor, etc.) working in this repo. **Read this before making non-trivial changes.**

> **What this repo is:** the public marketing/explanation site for EcoHubs (Vision, Blueprint/RCOS, Membership, FAQ, Blog, Contact). Membership data, governance, voting, and the Blueprint editor live in a **separate** product called **ecohubsOS** (`https://os.ecohubs.community`). This site posts applications into ecohubsOS and pulls public member data from it for the constellation map. Anything not user-facing on the public site does **not** belong here.

## Stack

- **SvelteKit** with **Svelte 5 (runes)** — `$state`, `$derived`, `$props`, `$effect`, snippets
- **Tailwind CSS v4** (configured via `@theme` in [`src/lib/styles/theme.css`](./src/lib/styles/theme.css))
- **TypeScript**
- **Adapter**: Vercel (with self-hosted Node also supported — see [`DEPLOYMENT.md`](./DEPLOYMENT.md))
- **Animations**: `motion` v12 — see [`src/lib/utils/scroll-animations.ts`](./src/lib/utils/scroll-animations.ts)
- **Forms**: `sveltekit-superforms` + Zod
- **i18n**: Paraglide (English; Spanish in progress)
- **Blog source**: Ghost (CMS) — local mdsvex content under `src/content/blog/` is legacy/fallback
- **Email**: Nodemailer (SMTP)
- **Newsletter**: Linkmonk (`/api/newsletter`)
- **Anti-bot**: Cloudflare Turnstile
- **Analytics**: GA4 (env-gated)

## Pages and routing

Public site lives under the `(web)` route group so it shares Navbar + Footer + the homepage layout. Routes:

| Route                       | File                                            | Notes                                                                                                                                                                                                                                                |
| --------------------------- | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`                         | `src/routes/(web)/+page.svelte`                 | Homepage. Long, narrative — hero, stories, wounds, manifesto moment, answers, network, "what we are already doing", vision teaser, blueprint teaser, members constellation, tech, who-this-is-for, FAQ teaser, roadmap, "before you join", final CTA |
| `/vision`                   | `src/routes/(web)/vision/+page.svelte`          | Vision page with manifesto moment, six principles, three horizons, values, loop diagram                                                                                                                                                              |
| `/blueprint`                | `src/routes/(web)/blueprint/+page.svelte`       | Blueprint (RCOS) page — failure modes, what-it-is/isn't, seven core layers, modules, comparisons, pilot, contribute, FAQ                                                                                                                             |
| `/membership`               | `src/routes/(web)/membership/+page.svelte`      | Membership page — what it is/isn't, doorways, application process, rooms, trust-by-design, EcosystemSection, voices, FAQ                                                                                                                             |
| `/faq`                      | `src/routes/(web)/faq/+page.svelte`             | **Canonical FAQ page**. Aggregates FAQs from `(web)/data.ts`, `vision/data.ts`, `blueprint/data.ts`, `membership/data.ts`. Only this route emits `FAQPage` JSON-LD                                                                                   |
| `/blog`, `/blog/[slug]`     | `src/routes/(web)/blog/...`                     | Ghost-backed blog                                                                                                                                                                                                                                    |
| `/join`                     | `src/routes/(web)/join/+page.svelte`            | Multi-step application form (`ApplicationForm.svelte`)                                                                                                                                                                                               |
| `/contact`                  | `src/routes/(web)/contact/+page.svelte`         | Channels + `ContactForm.svelte`                                                                                                                                                                                                                      |
| `/privacy`, `/terms`        | `src/routes/(web)/{privacy,terms}/+page.svelte` | Legal                                                                                                                                                                                                                                                |
| `/sitemap.xml`, `/feed.xml` | `src/routes/{sitemap,feed}.xml/+server.ts`      | Generated                                                                                                                                                                                                                                            |

Per-page data (lists, FAQs, copy that's repeated or templated) lives in a sibling `data.ts`. Keep it that way — the Svelte file should stay focused on layout and reactive state.

## Design system

**Source of truth**: [`design_files/design system/Design System.html`](./design_files/design%20system/Design%20System.html). All token names, button shapes, type pairings, and the principles ("warm not bright", "pills not rectangles", "italics carry the feeling", "honest placeholders") come from there.

### Colors

Use the brand tokens — **never** ad-hoc `bg-[#…]` hex unless prototyping a one-off. The brand layer:

```
ecohubs-base   #fbfbf9   page bg
ecohubs-ivory  #f5f2ea   warm card / dark-text inverse
ecohubs-text   #1c1917   body text
ecohubs-primary #059669  emerald (links, active state, CTAs accents)
ecohubs-dark   #064e3b   primary button bg
ecohubs-deep   #0b2e24   dark sections, primary button :hover
ecohubs-accent #d97706   amber highlight (sparingly)
ecohubs-light  #a7f3d0
ecohubs-muted  #6b7265
```

Forest / Soil / Tide / Ember 50–900 ramps are also defined in `theme.css` for non-brand surfaces.

### Typography

```
font-serif    Pridi          display headings
font-story    Fraunces italic emotional accents inside Pridi headlines
body / sans   Inter          body, labels, body links
font-mono     JetBrains Mono kicker codes, RCOS layer cards, captions
```

Inter and JetBrains Mono are loaded once in [`src/app.html`](./src/app.html). Pridi/Fraunces come in via `theme.css`'s `@import`. **Don't add per-page `<link>` tags** for any of these.

### Buttons

- **Primary**: `px-7 py-3.5 bg-ecohubs-dark text-white rounded-full hover:bg-ecohubs-deep`
- **Secondary**: `px-7 py-3.5 bg-transparent border border-stone-300 text-stone-800 rounded-full hover:border-ecohubs-dark`
- **Tertiary** (in-line link): `text-ecohubs-dark border-b border-ecohubs-dark/40 hover:border-ecohubs-dark pb-1`

Always pill-shape (`rounded-full`). No `shadow-lg`, no hover lifts on buttons.

### Cards

`rounded-2xl` or `rounded-3xl`, `border border-stone-200/70` or `/80`, `bg-white` (foreground) or `bg-ecohubs-ivory` (warm). Shadow utility: `.soft-shadow` (defined in `layout.css`). Hover state: `hover:border-ecohubs-primary/50` — not shadow.

### Shared utility classes

All defined once in [`src/routes/layout.css`](./src/routes/layout.css):

`.kicker` · `.soft-shadow` · `.grain` · `.pulse-dot` · `.hairline` · `.drop-cap` · `.font-story` · `.font-mono`

Plus the FOUC guard for `[data-scroll-animate]`, `[data-scroll-stagger] > *`, `[data-hero-step]`. Don't redefine these in per-page `<style>` blocks.

### Animations

Three attribute-driven animation patterns:

- `data-hero-step="0.30"` — initial-load cascade (delay in seconds)
- `data-scroll-animate[="fade-up|fade-down|fade-left|fade-right|fade|scale|rotate"]` — fires once when in view
- `data-scroll-stagger` — staggers direct children when the parent enters

Each page calls `initScrollAnimations()` and `initStaggeredScrollAnimations()` in `onMount` after a `prefersReducedMotion()` short-circuit. Reuse this pattern; don't import `motion` directly in pages.

## SEO

Every page **must** use the [`SEO.svelte`](./src/lib/components/SEO.svelte) component (not raw `<svelte:head>`) so canonical, Open Graph, Twitter Card, Organization, WebSite, and BreadcrumbList JSON-LD all stay consistent.

```svelte
<SEO
	title="Page Title — EcoHubs"
	description="≤155 chars."
	ogImage="/og-{page}.jpg"
	breadcrumbs={[
		{ name: 'Home', url: 'https://ecohubs.community/' },
		{ name: '…', url: 'https://ecohubs.community/…' }
	]}
/>
```

`FAQPage` JSON-LD lives **only** on `/faq`. Per-page FAQ sections elsewhere are visible to humans but don't emit duplicate schema. Per-page FAQ sections link out via "See all questions →" → `/faq#…`.

## External links

External `target="_blank"` links use `rel="noopener noreferrer"`. CTA-style external links (pill buttons, card links) opt out of the global underline+arrow with `class="no-external-decoration"` — see the rule in `theme.css`.

## ecohubsOS integration

- **Members**: `src/routes/(web)/+page.server.ts` fetches `${ECOHUBSOS_API_URL}/api/public/members` with `x-api-key`, dedupes by handle, sorts by XP, caches for 12h. When the API is unreachable or returns nothing, the constellation section on `/` is hidden via `{#if data.members?.length}`. **Don't reintroduce hard-coded placeholder members.**
- **Applications**: posted to `${ECOHUBSOS_API_URL}/api/public/applications` with `ECOHUBSOS_APPLICATIONS_API_KEY` from the `/join` form.

## What lives where

```
src/lib/components/
  Analytics.svelte           GA4 wrapper (env-gated)
  ApplicationForm.svelte     Multi-step Superforms application
  ConstellationMap.svelte    Member network visualisation
  ContactForm.svelte         Contact form (Turnstile + SMTP)
  CookieConsent.svelte
  EcosystemSection.svelte    "Operating system" section (used on /membership)
  Footer.svelte
  Logo.svelte
  Navbar.svelte
  NavigationProgress.svelte
  NetworkCanvas.svelte       Subtle background canvas
  PersonaIcons.svelte        Hero persona row
  SEO.svelte                 Meta + canonical + JSON-LD
```

Anything not in that list is either dead or should be reviewed before reuse.

## Conventions

- **Don't add new top-level components** unless three+ pages will use them. Inline first.
- **One `<h1>` per page**. Subsequent headers are `<h2>`/`<h3>`.
- **Image alt text** must describe the image, not its file name. Decorative images use `alt=""`.
- **Time-bound copy** ("week six in Ecuador", "Pilot active now", "since March 2026") should ideally live in `data.ts` — not in markup — so it can be rotated in one place.
- **Editing existing files > creating new files.** Prefer `Edit` over `Write`. Don't create README/docs unless asked.
- **No emojis in committed code or copy** unless the design explicitly calls for them.
- **Keep `data-*` content in `data.ts`**, not inline in markup, for any list of more than ~3 items.

## Things to avoid

- Don't add **DAO**, **EcoToken**, **Snapshot**, **Gnosis Safe**, or **on-chain governance** UI to this site. Those concerns live in ecohubsOS, not here.
- Don't add **placeholder/fake testimonials** or **invented members** to data files. The constellation gracefully hides when empty — that's the correct behavior.
- Don't introduce **`hover:shadow-lg`** or **`hover:-translate-y-1`** on cards. Use `soft-shadow` static + border-color hover.
- Don't reintroduce **per-page `<svelte:head>` font links** — they're loaded once globally.
- Don't use **`<svelte:component>`** — it's deprecated in Svelte 5. Use `{@const Foo = thing.Component}` then `<Foo />`.

## Pre-merge checklist

Before opening a PR for non-trivial UI work:

- [ ] `pnpm check` passes (no new TS errors)
- [ ] All five main routes (`/`, `/vision`, `/blueprint`, `/membership`, `/faq`) return 200
- [ ] H1 count = 1 per page; no `<svelte:component>` introduced
- [ ] New pages emit `<SEO>` with `ogImage` + `breadcrumbs`
- [ ] External `target="_blank"` links carry `rel="noopener noreferrer"`
- [ ] No new `bg-[#…]` hex unless you're prototyping; otherwise use a token
- [ ] No new commented-out blocks (use git history instead)

## Reading order for new agents

1. This file
2. [`README.md`](./README.md) — project overview & how to run
3. [`design_files/design system/Design System.html`](./design_files/design%20system/Design%20System.html) — design tokens & principles
4. [`src/routes/(web)/+page.svelte`](<./src/routes/(web)/+page.svelte>) — current homepage idiom
5. [`src/lib/components/SEO.svelte`](./src/lib/components/SEO.svelte) — what every page emits
