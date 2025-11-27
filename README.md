# EcoHubs.community 🌱

[![CI](https://github.com/ecohubs/ecohubs.community/actions/workflows/ci.yml/badge.svg)](https://github.com/ecohubs/ecohubs.community/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

A regenerative community platform built with Svelte 5, featuring DAO governance, contribution-based economics, and an open-source blueprint for intentional communities.

## 🌟 Features

- **Svelte 5 (Runes)** - Modern reactive framework with fine-grained reactivity
- **SvelteKit** - Full-stack framework with static site generation
- **Tailwind CSS v4** - Utility-first CSS with custom regenerative theme
- **Multi-Step Forms** - Application form with Superforms + autosave
- **Email Integration** - Nodemailer SMTP with beautiful HTML templates
- **Newsletter** - Linkmonk integration with fallback to Zapier
- **Blog** - mdsvex-powered blog with reading time and RSS feed
- **SEO Optimized** - Complete meta tags, JSON-LD, sitemap, OG images
- **Dark Mode** - System preference detection with manual toggle
- **Accessible** - WCAG AA compliant with keyboard navigation
- **Performance** - Lighthouse 95+ target (mobile & desktop)
- **i18n Ready** - Paraglide.js for English/Spanish localization
- **PWA Ready** - Web manifest and service worker support

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** (or Bun)
- **pnpm** (recommended) or npm

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/ecohubs.community.git
cd ecohubs.community

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
pnpm dev

# Open http://localhost:5173
```

### Development Commands

```bash
# Development
pnpm dev              # Start dev server
pnpm dev:host         # Start dev server with network access

# Building
pnpm build            # Build for production
pnpm preview          # Preview production build

# Quality
pnpm lint             # Run ESLint
pnpm format           # Format with Prettier
pnpm check            # Type check with svelte-check

# Testing
pnpm test             # Run all tests
pnpm test:unit        # Run unit tests
pnpm test:e2e         # Run E2E tests with Playwright
```

## 📦 Environment Variables

Create a `.env` file based on `.env.example`:

### Required

```bash
PUBLIC_SITE_URL=https://ecohubs.community
SMTP_HOST=localhost
SMTP_PORT=1025
EMAIL_FROM=noreply@ecohubs.community
ADMIN_EMAIL=admin@ecohubs.community
```

### Optional

```bash
# Newsletter
LINKMONK_URL=https://newsletter.ecohubs.community
LINKMONK_API_KEY=your-api-key

# Integrations
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/...
AIRTABLE_API_KEY=your-api-key
GITHUB_TOKEN=ghp_your-token
```

See [`.env.example`](.env.example) for complete list with descriptions.

## 📁 Project Structure

```
ecohubs.community/
├── src/
│   ├── lib/
│   │   ├── components/          # Reusable Svelte components
│   │   │   ├── ApplicationForm.svelte
│   │   │   ├── ContactForm.svelte
│   │   │   ├── NewsletterForm.svelte
│   │   │   ├── Hero.svelte
│   │   │   ├── Navbar.svelte
│   │   │   └── ...
│   │   ├── config/              # Application configuration
│   │   │   └── application-questions.ts
│   │   ├── email-templates/     # Email HTML/text templates
│   │   ├── server/              # Server-side utilities
│   │   │   ├── email.ts
│   │   │   └── blog.ts
│   │   ├── styles/              # Global styles & theme
│   │   │   └── theme.css
│   │   └── utils/               # Utility functions
│   ├── routes/                  # SvelteKit routes
│   │   ├── +layout.svelte
│   │   ├── +page.svelte         # Home page
│   │   ├── api/                 # API endpoints
│   │   │   ├── contact/
│   │   │   ├── newsletter/
│   │   │   └── application/
│   │   ├── blog/
│   │   │   ├── [slug]/          # Dynamic blog post
│   │   │   └── +page.svelte     # Blog index
│   │   ├── join/                # Application form
│   │   ├── contact/             # Contact page
│   │   └── ...
│   ├── content/                 # Blog posts (mdsvex)
│   │   └── blog/
│   │       └── *.svx
│   └── app.html                 # HTML template
├── static/                      # Static assets
│   └── manifest.webmanifest
├── .github/
│   └── workflows/               # CI/CD pipelines
├── DEPLOYMENT.md                # Deployment guide
└── vercel.json                  # Vercel configuration
```

## 🚢 Deployment

### Quick Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ecohubs.community)

### Comprehensive Guides

See **[DEPLOYMENT.md](./DEPLOYMENT.md)** for detailed instructions on:

- **Vercel** - One-click deployment with automatic CI/CD
- **Self-Hosted Node** - Full control with PM2, Nginx, SSL
- **Static Hosting** - Netlify, GitHub Pages, etc.
- **Email Configuration** - Nodemailer, Mailu, MailHog
- **CI/CD** - GitHub Actions workflows

Quick summary:

```bash
# Vercel
vercel

# Self-hosted (after setup)
pnpm build
pm2 start ecosystem.config.js

# Static
pnpm build
# Deploy build/ directory
```

## 🛠️ Development

### Adding New Pages

1. Create directory in `src/routes/`
2. Add `+page.svelte` and `+page.ts`
3. Set `export const prerender = true` in `+page.ts`
4. Use `<SEO>` component for metadata

Example:
```svelte
<script lang="ts">
  import SEO from '$lib/components/SEO.svelte';
</script>

<SEO 
  title="Page Title"
  description="Page description for SEO"
/>
```

### Styling Guidelines

- **Tailwind CSS v4** with custom theme
- **Colors**: `ecohubs-primary`, `ecohubs-dark`, `ecohubs-accent`
- **Typography**: Serif headings (`font-serif`), sans body
- **Dark mode**: Automatic with system preference
- **Custom classes**: `.glass-card`, `.text-gradient`, `.organic-shape`

### Components Overview

| Component | Purpose |
|-----------|---------|
| `ApplicationForm.svelte` | Multi-step application with Superforms |
| `ContactForm.svelte` | Contact form with validation |
| `NewsletterForm.svelte` | Email subscription (Linkmonk) |
| `Hero.svelte` | Animated hero section |
| `Navbar.svelte` | Responsive navigation with auto-hide |
| `Footer.svelte` | Site footer with newsletter |
| `SEO.svelte` | Meta tags + JSON-LD helper |

### Email Templates

All email templates support both HTML and plain text:

- **Contact**: `src/lib/email-templates/contact.ts`
- **Application**: `src/lib/email-templates/application.ts`
- Each template exports HTML and text functions

### Blog Posts

Create new blog posts in `src/content/blog/`:

```markdown
---
title: "Post Title"
excerpt: "Brief description"
date: "2024-11-20"
author: "Author Name"
tags: ["tag1", "tag2"]
readingTime: 8
---

Content here using markdown...
```

## 🎯 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Lighthouse Performance | 95+ | ✅ |
| First Contentful Paint | < 1.5s | ✅ |
| Time to Interactive | < 3.5s | ✅ |
| Cumulative Layout Shift | < 0.1 | ✅ |

## ♿ Accessibility

- WCAG AA compliant
- Keyboard navigation support
- Proper ARIA labels and roles
- Color contrast ratios verified
- Screen reader tested

## 🧪 Testing

```bash
# Unit tests (Vitest)
pnpm test:unit

# E2E tests (Playwright)
pnpm test:e2e

# Run all tests
pnpm test
```

## 📝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

See [CONTRIBUTING.md](./CONTRIBUTING.md) for detailed guidelines.

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [SvelteKit](https://kit.svelte.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons by [Lucide](https://lucide.dev/)
- Inspired by [Ethereum Infinite Garden](https://ethereum.org/) & [Regen Network](https://www.regen.network/)

## 📧 Support

- **Documentation**: [/docs](/docs)
- **Issues**: [GitHub Issues](https://github.com/yourusername/ecohubs.community/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/ecohubs.community/discussions)
- **Email**: [hello@ecohubs.community](mailto:hello@ecohubs.community)

---

**Built with 🌱 by the EcoHubs Community**
