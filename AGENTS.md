# Project Specification: EcoHubs.community

You are an expert full-stack frontend engineer and designer who delivers production-ready Svelte apps with excellent UX, SEO, accessibility, and modern animations. Build a Svelte 5 project (a Runes app) for EcoHubs.community using SvelteKit (pre-rendered static pages), Tailwind CSS v4, and an architecture ready to deploy on Vercel or a self-hosted Node server. The project must reflect the aesthetic of Ethereum Infinite Garden + Regen.Network: organic, poetic, nature-forward visuals combined with crisp modern UI and Web3 credibility.

## High-level Goals (Must Achieve)

1. **Fast static site (SvelteKit prerender)**: Lighthouse 95+ (mobile & desktop).
2. **SEO-first architecture**: Semantic HTML, JSON-LD, sitemap.xml, robots.txt, OG + Twitter cards, canonical tags.
3. **Strong brand visual identity**: Hybrid of organic + tech (see style guidance below).
4. **Production-ready integrations**: Linkmonk newsletter, GitHub, Nodemailer SMTP or recommended self-hosted mail stack, Superforms + Formsnap for application, mdsvex blog.
5. **Clear docs for deployment**: Vercel and self-hosting instructions.

## Visual Identity & Style (Very Important)

- **Tone**: Visionary, living, scientific + soulful.
- **Theme**: Auto-switching (light/dark) with system preference and manual toggle.
- **Palette**: Forest greens, soil browns, soft blues/turquoise, warm amber accents. Define theme colors in Tailwind 4 theme and use those.
- **Typography**: Serif or semi-serif for headings (e.g., Playfair, Lora); a clean sans for body (Inter or Satoshi).
- **Shapes & motion**: Organic SVG shapes (roots, mycelium, nodes), slow breathing animations, expressive but tasteful hero animations, scroll-triggered reveals (Motion One or svelte-use-motion). Avoid heavy CPU usage.
- **UX**: Generous whitespace, legible text sizes, clear CTAs, mobile-first.

## Structure & Pages (SEO-ready)

Create these static routes (prerendered):

- `/` — Home / Landing (hero animation, vision snapshot, CTA: Join the First 500, newsletter form)
- `/vision` — Deep vision & blueprint summary (link to /blueprint)
- `/dao` — DAO overview (Snapshot links optional; explain governance + treasury)
- `/ecotoken` — EcoToken rules & economics (non-speculative, Ecuador compliance note)
- `/blueprint` — Living blueprint hub (index with sections)
- `/join` — Multi-step application (Superforms + Formsnap style, expressive transitions, progress)
- `/contact` — Contact form (Nodemailer endpoint or recommended alternative)
- `/about` — Founder + team + mission
- `/blog` — Static blog using mdsvex (markdown files compiled to static pages)
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `/feed.xml`

Each page must have: meta title, description, canonical tag, OG image, Twitter card, and JSON-LD Organization + WebSite.

## Components

Build reusable, accessible components with Tailwind utility classes and variants:

- `Hero.svelte` (animated organic shapes)
- `Navbar.svelte` (auto-hide on scroll, theme toggle)
- `Section.svelte` (consistent spacing + grid options)
- `Card.svelte`
- `NewsletterForm.svelte` (Linkmonk API integration)
- `ContactForm.svelte` (server endpoint using Nodemailer; fallback webhook to Zapier)
- `ApplicationForm.svelte` (Superforms+Formsnap powered: multi-step, one-question-per-screen, nice micro-interactions)
- `Footer.svelte`
- `SEO.svelte` helper for meta tags + JSON-LD

## Blog

- Use mdsvex for authoring in Markdown + frontmatter.
- Build an RSS feed and structured JSON-LD for articles.
- Provide a local dev workflow for writing posts and previewing.

## Newsletter (Linkmonk)

- Implement a server endpoint to POST to your self-hosted Linkmonk instance.
- Newsletter signups go directly to Linkmonk (no Airtable storage needed).
- Confirm API usage, error handling, and double opt-in recommended.

## Contact Form & Mail Recommendations

- **Preferred**: Nodemailer connecting to an (self-hosted plesk, mailu or Postal) SMTP server. Provide clear config for both: local SMTP (for dev) and production (plesk).
- Also include optional Zapier webhook integration for non-technical admins.

## Application Form (Multi-step, Selective)

- Implement with Svelte Superforms + Formsnap-style transitions (one question per view, animated transitions, progress indicator, conditional fields).
- It would be great if the questions, order of questions, and fieldtypes would be easy manageable (in code, e.g. JSON)
- Save partial responses (autosave) and final submissions to a secure backend (endpoint) and optionally to GitHub Issues or a private Airtable.
- Application acceptance/rejection workflow happens on Snapshot (admin interface exists for managing applications).

## Web3 DAO Tools (Optional Embeds & Explanation)

- Explain Snapshot (gasless polling) and Gnosis Safe (treasury multisig). Provide optional embedded links/iframes to Snapshot spaces or Gnosis Safe transaction explorer. If embedding is not practical, create clear CTA links and instructions.

## GitHub Integration

- Link repo for deployments and CI (Vercel/GitHub Actions).
- Provide a one-click Vercel deploy configuration and ENV docs (LINKMONK_URL, SMTP creds, etc.).

## SEO & Performance Requirements (Must Pass)

- Pre-render all public pages.
- Generate sitemap.xml and robots.txt.
- Structured data (Organization, WebSite, Article).
- Image optimization and responsive srcsets.
- Preconnect / preload critical assets.
- Lighthouse 95+ (mobile) target.
- Accessibility checks (contrast, ARIA roles, keyboard nav).

## Deliverables

- Full SvelteKit (Svelte 5 Runes app) project scaffold with Tailwind v4.
- Reusable components and pages listed above with placeholder copy.
- mdsvex blog example (2 sample posts using content from /mnt/data/Blockchain_Platform_for_Intentional_Communities.pdf).
- Working Linkmonk newsletter integration endpoint and example config.
- Working contact endpoint using Nodemailer + instructions to swap to Mailu/Postal
- Application form flow with autosave + submission handler.
- SEO: sitemap, robots, JSON-LD examples, OG images.
- README: deployment instructions (Vercel & Node), environment variables, GitHub CI, and self-hosting notes.
- Design tokens: colors, type scale, spacing, iconography guidelines, motion spec (documented in DESIGN_TOKENS.md).
- Visual moodboard: **Will be added later** (not required for initial implementation).

## Notes & Constraints

- Use filesystem-based routing for content and mdsvex for easy authoring.
- Keep bundle sizes small; lazy-load heavy animations.
- Build with accessibility in mind.
- Provide tests or manual QA checklist for SEO and Lighthouse.

---

# Project Identity

## **Project Name:**  
EcoHubs.community

## **Tagline (optional):**  
Co-Creating the Blueprint for Regenerative Living

## **Core Description:**  
EcoHubs.community is a regenerative, DAO-driven ecosystem designed to research, co-create, and prototype the models for future sustainable communities. It blends ecological design, decentralized governance systems, and contribution-based local economies into a living blueprint that can be applied to real-world intentional community hubs around the world.

EcoHubs is not a single ecovillage — it is a **global community lab**, a collaborative network where innovators, creators, and pioneers work together to design and implement regenerative living systems supported by Web3 governance tools.

---

# Vision

## **High-Level Vision**
EcoHubs envisions a world where communities live in harmony with ecosystems, where governance is transparent and participatory, and where human collaboration aligns with nature’s patterns. We aim to design a new model for living — grounded, regenerative, cooperative, and technologically empowered.

Our ambition is to become the **leading open-source blueprint** for regenerative community building, enabling millions to live in environments that support emotional wellbeing, ecological regeneration, and collective flourishing.

## **Long-Term Vision**
- A global network of **EcoHubs Hubs** — ecological, self-sustaining community nodes.
- A universal **open-source blueprint** for intentional communities.
- A DAO-led governance system accessible to all members.
- A legally compliant **EcoToken** contribution economy for internal value exchange.
- Educational frameworks, permaculture methods, community governance models, and regenerative land practices accessible to all.
- A decentralized knowledge base where communities share successes, failures, and improvements.

---

# Mission

To develop, refine, and empower regenerative communities through:
- **DAO Governance**
- **Ecological Design**
- **Regenerative Land Use**
- **Cultural and Educational Blueprints**
- **Transparent Economics (EcoToken)**
- **Shared Resources & Open Knowledge**
- **Community Collaboration**
- **Ethical Technology**

EcoHubs aims to become the bridge between **nature-centric living** and **future-centric technology**.

---

# What EcoHubs Is

- A **living blueprint** for intentional communities.
- A **DAO-governed research lab** for regenerative living.
- A **collaborative design space** for governance models, ecological systems, and cultural structures.
- A **platform for community builders** to contribute, experiment, and pilot new models.
- A **movement toward regenerative culture**, not just a tech product.

---

# Key Components of the EcoHubs Ecosystem

## **1. The DAO**
- Snapshot-based gasless voting.  
- Gnosis Safe for multisig treasury management.  
- Proposals & governance participation for all members.  
- Transparent decision-making.

## **2. EcoToken**
A **non-speculative, local contribution currency**, designed to:
- Reward meaningful work.
- Foster collaboration.
- Support internal economies.
- Remain legally compliant (especially in Ecuador).

EcoToken is *not* a crypto asset for public trading — it is a community currency.

## **3. The Blueprint**
A modular framework covering:
- Governance  
- Ecology  
- Construction  
- Circular economy  
- Culture  
- Education  
- Decision-making  
- Conflict resolution  
- Funding models  

The blueprint evolves through collaboration, research, and real-world experimentation.

## **4. EcoHubs Community Hubs**
Physical pilot communities implement the blueprint:
- Starting in Ecuador (Andean + coastal possibilities)
- Later expanding globally
- Open-source documentation shared across hubs

---

# Foundational Principles

1. **Regeneration** – ecological, cultural, economic regeneration.
2. **Transparency** – open governance, open code, open contributions.
3. **Co-Creation** – all members participate in shaping the blueprint.
4. **Sustainability** – decisions prioritize long-term ecological and community health.
5. **Decentralization** – power is distributed; governance emerges from community.
6. **Human-Centric Design** – community wellbeing is central.
7. **Scientific + Spiritual Balance** – data-informed decisions with respect for natural patterns.
8. **Open Knowledge** – everything built is meant to be shared.

---

# Tone of Voice (for all agents)

**Overall tone:**
- Inspiring, visionary  
- Calm, grounded, ecological  
- Modern and clean  
- Clear, structured, trustworthy  
- Slightly poetic but not overly fluffy  
- Future-oriented with practical grounding  
- Low ego, collective wisdom forward  
- Emotionally warm, technically competent  

### Use **"we"** instead of "I" when speaking for EcoHubs.

### Avoid:
- Overly technical jargon unless needed.
- Buzzword-heavy crypto language (degenerate, moon, pump, etc.).
- Over-promising or grandiose claims.
- Corporate-speak or enterprise tone.

---

# Preferred Vocabulary

### Use these terms often:
- regenerative
- ecosystem
- blueprint
- DAO governance
- contribution economy
- co-creation
- transparency
- resilience
- intentional community
- collaboration
- circular economy
- ecological design
- systems thinking
- holistic
- living system
- stewardship
- regenerative culture
- open-source
- experimentation
- EcoHubs

---

# 🚫 Words to Avoid Completely
- hype language (“revolutionary”, “the best ever”, “disruption!”, “moonshot”)  
- aggressive crypto slang (“ape”, “degen”, “wen token”, “pump”, “dump”)  
- corporate jargon (“synergy”, “leverage”, “KPIs”)  
- anything sounding like financial investment promotion  

---

# 🧬 Storytelling Anchors  
Use these repeatedly, in content, descriptions, and onboarding journeys:

1. **EcoHubs as living metaphor**  
   The Earth as a self-organizing, intelligent system.

2. **Mycelium networks**  
   Inspiration for decentralized, regenerative community design.

3. **Ecosystem thinking**  
   Communities evolve like forests: resilience through diversity.

4. **Blueprint evolution**  
   The blueprint is alive, always improving.

5. **Community-first design**  
   People are the heart of the system.

6. **Ecology + Technology working together**  
   The Infinite Garden metaphor (Ethereum Foundation).

---

# Target Personas (for agents generating user-facing content)

### **1. Regenerative thinkers**
Permaculture, ecology, community-building.

### **2. Intentional community seekers**
People looking for meaningful living environments.

### **3. Web3 contributors**
Builders interested in governance, DAO tools, sustainability.

### **4. Climate innovators**
Looking for systemic solutions.

### **5. Early believers in new cultural models**
Open-minded, visionary, collaborative.

---

# Founder Bio (for reference in generated content)

**Name:** Stefan Lessle  
**Background:**  
- 16+ years experience in web development and software engineering.  
- Deeply involved in decentralized technologies and blockchain ecosystem.  
- Lifelong learner with curiosity for ecology, regenerative culture, and community design.  
- Passionate about building open-source systems that empower people to live in alignment with nature.  
- Currently developing the EcoHubs vision while living and working across Ecuador, researching land, community dynamics, and regenerative practices.

**Founder Tone:**  
Warm, visionary, humble, practical, technically knowledgeable.

---

# 🏗️ Structural Guidelines for All Agent-Generated Output

### Always include:
- Clarity  
- Vision  
- Call to co-create  
- Ecological grounding  
- DAO governance elements  
- Community-centric messaging  

### Formats Agents Should Be Able to Generate:
- web pages  
- landing page copy  
- blueprint chapters  
- grant applications  
- investor messages  
- onboarding guides  
- community governance docs  
- workshops & curriculum outlines  
- economic models  
- internal DAO communication  
- project updates  
- social media posts  

### Content Should Always Support:
- recruitment of aligned members  
- clarity about the ecosystem  
- ethical, transparent practices  
- natural storytelling  
- adherence to regenerative culture  

---

# Brand / Aesthetic Notes (for agents generating visual content)

- Nature + technology fused harmoniously  
- Soft organic shapes  
- Mycelium-inspired network nodes  
- Earth-tone palette (greens, soil colors, gentle blues)  
- Clean typography (serif + sans)  
- Light + dark mode for modern accessibility  
- Avoid overly corporate or sci-fi aesthetics  
- Expressive but elegant animations  

---

# Example Phrases Agents Should Use

- “a living blueprint for regenerative communities”  
- “decentralized governance anchored in ecological principles”  
- “a collaborative ecosystem of creators, thinkers, and builders”  
- “designing resilient and harmonious community systems”  
- “blending ecology, culture, and technology”  
- “a contribution-based internal economy”  

---

# Example Phrases Agents Should Avoid

- “next-gen crypto project”  
- “pumping our token”  
- “disrupting the industry”  
- “get rich from…”  
- “blockchain hype”  

---

# Final Notes  
This file must guide ALL agent-generated content.  
It defines the **soul** and **shape** of EcoHubs.community communications.

Any generated content must align with:
- regenerative values  
- decentralization  
- clarity  
- ecological integrity  
- community-first focus  
- scientific + poetic balance  

---

# Svelte MCP Server Usage

You are able to use the Svelte MCP server, where you have access to comprehensive Svelte 5 and SvelteKit documentation. Here's how to use the available tools effectively:

## Available MCP Tools:

### 1. list-sections

Use this FIRST to discover all available documentation sections. Returns a structured list with titles, use_cases, and paths.
When asked about Svelte or SvelteKit topics, ALWAYS use this tool at the start of the chat to find relevant sections.

### 2. get-documentation

Retrieves full documentation content for specific sections. Accepts single or multiple sections.
After calling the list-sections tool, you MUST analyze the returned documentation sections (especially the use_cases field) and then use the get-documentation tool to fetch ALL documentation sections that are relevant for the user's task.

### 3. svelte-autofixer

Analyzes Svelte code and returns issues and suggestions.
You MUST use this tool whenever writing Svelte code before sending it to the user. Keep calling it until no issues or suggestions are returned.

### 4. playground-link

Generates a Svelte Playground link with the provided code.
After completing the code, ask the user if they want a playground link. Only call this tool after user confirmation and NEVER if code was written to files in their project.
