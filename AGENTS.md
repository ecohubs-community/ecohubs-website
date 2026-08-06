# AGENTS.md — EcoHubs.community

This file orients AI coding assistants (Claude Code, Cursor, etc.) working in this repo. **Read this before making non-trivial changes.**

> **What this repo is:** the public marketing/explanation site for EcoHubs (Vision, RCOS Standard, Membership, FAQ, Blog, Contact). Membership data, governance, voting, and the RCOS Standard editor live in a **separate** product called **ecohubsOS** (`https://os.ecohubs.community`). This site posts applications into ecohubsOS and pulls public member data from it for the constellation map. Anything not user-facing on the public site does **not** belong here.

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
| `/`                         | `src/routes/(web)/+page.svelte`                 | Homepage. Long, narrative — hero, stories, wounds, manifesto moment, answers, network, "what we are already doing", vision teaser, RCOS Standard teaser, members constellation, tech, who-this-is-for, FAQ teaser, roadmap, "before you join", final CTA |
| `/vision`                   | `src/routes/(web)/vision/+page.svelte`          | Vision page with manifesto moment, six principles, three horizons, values, loop diagram                                                                                                                                                              |
| `/rcos`                | `src/routes/(web)/rcos/+page.svelte`       | RCOS Standard page — failure modes, what-it-is/isn't, seven core layers, modules, comparisons, pilot, contribute, FAQ                                                                                                                             |
| `/csi`                      | `src/routes/(web)/csi/+page.svelte`             | CSI (Community Suitability Index) page — pendant to `/rcos` for `csi.ecohubs.community`. Constraints, what-it-is/isn't, the three gates, seven domains, how to read a score, sources, personas, FAQ                                                    |
| `/votecast`                 | `src/routes/(web)/votecast/+page.svelte`        | VoteCast page — pendant to `/rcos` and `/csi` for `votecast.ecohubs.community`. Interactive consent-ballot hero demo, why decisions break, what-it-is/isn't, six voting methods, decision lifecycle, the settings that decide fairness, personas, FAQ  |
| `/seeking`                  | `src/routes/(web)/seeking/+page.svelte`         | Seeking.Community page — the one ecosystem page for people who want to **join** a community rather than build one. Example-match hero, why people look, what stops them, how it works, the ten intake questions, what comes back, FAQ                 |
| `/membership`               | `src/routes/(web)/membership/+page.svelte`      | Membership page — what it is/isn't, doorways, application process, rooms, trust-by-design, EcosystemSection, voices, FAQ                                                                                                                             |
| `/faq`                      | `src/routes/(web)/faq/+page.svelte`             | **Canonical FAQ page**. Aggregates FAQs from `(web)/data.ts`, `vision/data.ts`, `rcos/data.ts`, `csi/data.ts`, `votecast/data.ts`, `seeking/data.ts`, `membership/data.ts`. Only this route emits `FAQPage` JSON-LD                                                                                   |
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

### Discoverability files — keep these in sync

Adding a page is three edits, not one. A page missing from either file is a page search engines and AI assistants may never find.

- **New page** → add it to the `routes` array in [`sitemap.xml/+server.ts`](./src/routes/sitemap.xml/+server.ts) **and** to [`static/llms.txt`](./static/llms.txt) (one line: link plus a sentence saying what it is). Blog posts and tag archives are pulled from Ghost automatically — don't list those by hand.
- **Meaningful content change** → bump that route's `lastmod` to the date of the change. Cosmetic tweaks don't count.
- `lastmod` is the only hint here Google actually reads (`priority` and `changefreq` are ignored), and it only works while it stays truthful — never stamp it with the build date, or crawlers learn to ignore the field.
- A tag archive is `noindex` and stays out of the sitemap until it has `MIN_POSTS_FOR_INDEXABLE_TAG` posts (see [`blog.ts`](./src/lib/server/blog.ts)). One shared constant drives both, so they can't disagree — change it there, not in two places.
- **IndexNow** ([`indexnow.ts`](./src/lib/server/indexnow.ts)) pings Bing/Yandex/Seznam/Naver/Yep the moment a page changes. Ghost webhooks handle blog posts automatically. For a **static page** you added or meaningfully changed, ping it after deploy — the same trigger as bumping `lastmod`:
  ```bash
  curl -X POST "https://ecohubs.community/api/indexnow?token=$INDEXNOW_WEBHOOK_TOKEN" \
    -H 'Content-Type: application/json' \
    -d '{"urls":["https://ecohubs.community/your-page"]}'
  ```
  Submit deleted URLs too — a 404 tells them to drop it. Never bulk-submit the whole site; that is the sitemap's job, and the protocol explicitly discourages it. The key lives at `static/<key>.txt` and must match `INDEXNOW_KEY`.

## Learning Hub content

Content lives in `src/content/learning/**/*.md` — markdown with frontmatter, indexed at build time by [`src/lib/learning/index.ts`](./src/lib/learning/index.ts). There is no database.

- **Frontmatter is the schema.** Types in `learning/types.ts`; `learning/validate.ts` fails the build on a broken `guide:`, `terms:`, `topic:`, `related:` or path step. Fix the reference — do not weaken the validator.
- **No import block in content files.** `<Quick>`, `<Deep>`, `<Gloss>`, `<Callout>`, `<Sources>` are injected by the remark plugin in [`mdsvex.config.js`](./mdsvex.config.js). Adding a component means exporting it from `$lib/components/learning` **and** listing it in that plugin's `AUTO_IMPORT`.
- **Three depth layers.** `<Quick>` is a separate short version, the body is the standard read, `<Deep>` is additive detail. All three ship in the HTML; the switch only reduces what a *returning* reader sees.
- **Depth is strictly additive — each level only ever adds.** `quick` → short version. `standard` → short version + body. `deep` → short version + body + detail. Nothing a reader has already seen disappears when they ask for more. If a new layer is added, it must obey this.
- **Never hide content by default.** Hiding is `html[data-depth=…]` set by the pre-paint script in `app.html`, and only from an explicitly stored choice. `getDepth()` returns `null` when unset for exactly this reason — a `|| 'standard'` fallback would hide the deep layer from Googlebot, which runs JS with empty storage. Same rule as the cookie banner and the hero cascade.
- **`isIndexable()` gates the sitemap and page meta**, so thin or draft content stays reachable but unindexed. Drafts must be filtered in all four places: route, listings, sitemap, search index.
- **All `localStorage` goes through `learning/storage.ts`** — versioned keys, every access wrapped, because storage throws in private mode.
- **Search is built from source markdown, not rendered HTML** ([`learning/search.ts`](./src/lib/learning/search.ts)). That is what makes it depth-blind: `<Deep>` text is findable by a reader who has never opened deep mode. The index is emitted as `/learn/search-index.json` and fetched **only** on `/learn/search` — never import it from a page.
- **Every learning page carries the section nav**: `<LearnRail>` on `lg` and up, `<LearnTabs>` (in the `/learn` layout) below it. A page that renders its own sidebar without the rail breaks the hub's navigation — the reason `/learn`, `/learn/topics` and the detail pages each had to be fixed once already.
- **The rail and header follow `design_files/learning-hub/`.** Its colours map onto existing tokens — active nav is `bg-ecohubs-ivory` + `text-ecohubs-dark` (*not* dark-on-white), labels are `font-mono text-[10.5px] tracking-[0.18em]`, sub-lists get a left rule with an emerald accent on the current item. Header controls share `PILL` from `components/learning/pill.ts`.
- **Search lives in the rail as a field, not as a nav entry** — `LEARN_SECTIONS` deliberately omits it, and `activeSection('/learn/search')` returns `''` so nothing else lights up there. The tab row appends Search as its own tab.
- **Icons go through [`$lib/components/Icon.svelte`](./src/lib/components/Icon.svelte)**, never `@iconify/svelte` directly. It hands Iconify bundled data instead of a name, so icons render server-side and nothing is fetched from `api.iconify.design`. Only the tabler set is used. **After using a new icon, run `pnpm icons`** — `icons.spec.ts` fails the build if the bundle and the source disagree. Hand-written `<svg>` is for illustrations and diagrams, not icons.
- **Topics declare a `cluster:`** (`clusters.ts`), validated at build time — it places them on the knowledge map. The map's coordinates come from `layoutMap()` at build time, so `/learn/map` ships a finished SVG with real text and real links.
- **`CARD` sets no background on purpose.** Two background utilities in the same layer are ordered by Tailwind, not by the class attribute, so a card that asked for ivory silently rendered white. Every caller states its own `bg-*`.
- **Cards come from `components/learning/`** — `GuideCard` (featured / compact), `TopicCard`, `PathCard`, `TermCard` — and share `CARD`/`TAG`/`META` from `card.ts`. Don't hand-roll a fifth card shape.
- **Covers are motifs, not images.** A page with no `image:` gets one of six CSS motifs picked from its slug (`motif.ts`), so it always has a cover and neighbours differ. Set `image:` for real art — the validator then requires `imageAlt:` (write `imageAlt: ''` to declare it decorative).
- **`isIndexable()` gates five places now**: route, listings, sitemap, search index, and the rabbit-hole pool.
- **No invented metrics.** There is no analytics on this site, so the hub ships *Most linked to* — counted from `terms:`/`related:` — where the design says "Popular this week", and says so on the card.
- **`LEARN_SECTIONS` may only name routes that exist.** Everything is prerendered, so a link to a missing route fails the build rather than 404ing in production — which is how `/learn/search` announced itself.

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
  CaveatPanel.svelte         Dark "what we don't know" panel — /csi, /votecast, /seeking
  FaqAccordion.svelte        <details> FAQ list — /, /rcos, /csi, /votecast, /seeking, /membership
  Footer.svelte
  Logo.svelte
  Navbar.svelte
  NavigationProgress.svelte
  NetworkCanvas.svelte       Subtle background canvas
  PersonaIcons.svelte        Hero persona row
  SEO.svelte                 Meta + canonical + JSON-LD

src/lib/components/sections/   Whole page sections shared between long pages.
  ClosingCta.svelte          Dark closing CTA — /rcos, /csi, /votecast, /seeking, /membership
  PositionTriptych.svelte    Three cards, middle flagged "you are here" — /rcos, /csi, /votecast, /seeking
  StanceColumns.svelte       Dark "what it is / what it isn't" — /rcos, /csi, /votecast, /seeking
  WhyWeBuiltIt.svelte        Dark purpose pull-quote + three numbered reason cards — /csi, /votecast, /seeking
```

Cross-page *content* gets the same treatment: the Purpose Charter quote that opens
`WhyWeBuiltIt` on both pages lives once in `src/lib/config/purpose-charter.ts`.

Anything not in that list is either dead or should be reviewed before reuse.

When a section appears on a second page, move it into `components/sections/` and use
it in both places — don't copy the markup. Headlines stay per-page via snippets so
each page keeps its own emphasis.

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
- [ ] All main routes (`/`, `/vision`, `/rcos`, `/csi`, `/votecast`, `/seeking`, `/membership`, `/faq`) return 200
- [ ] H1 count = 1 per page; no `<svelte:component>` introduced
- [ ] New pages emit `<SEO>` with `ogImage` + `breadcrumbs`
- [ ] New pages added to **both** `sitemap.xml/+server.ts` and `static/llms.txt`; `lastmod` bumped on any page whose content meaningfully changed
- [ ] External `target="_blank"` links carry `rel="noopener noreferrer"`
- [ ] No new `bg-[#…]` hex unless you're prototyping; otherwise use a token
- [ ] No new commented-out blocks (use git history instead)

## Reading order for new agents

1. This file
2. [`README.md`](./README.md) — project overview & how to run
3. [`design_files/design system/Design System.html`](./design_files/design%20system/Design%20System.html) — design tokens & principles
4. [`src/routes/(web)/+page.svelte`](<./src/routes/(web)/+page.svelte>) — current homepage idiom
5. [`src/lib/components/SEO.svelte`](./src/lib/components/SEO.svelte) — what every page emits
