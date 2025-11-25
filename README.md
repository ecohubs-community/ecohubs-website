# GaiaLabs.community

A SvelteKit static site for GaiaLabs.community - building intentional communities on blockchain.

## Features

- **Svelte 5 (Runes)** - Modern reactive framework
- **SvelteKit** - Full-stack framework with static site generation
- **Tailwind CSS v4** - Utility-first CSS with custom theme
- **SEO Optimized** - Meta tags, JSON-LD, sitemap, RSS feed
- **Dark Mode** - System preference detection with manual toggle
- **Accessible** - WCAG compliant with keyboard navigation
- **Performance** - Lighthouse 95+ target (mobile & desktop)
- **PWA Ready** - Web manifest included

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `PUBLIC_SITE_URL` - Your site URL (required)
- `LINKMONK_URL` - Linkmonk newsletter API endpoint
- `SMTP_*` - SMTP configuration for email (Nodemailer)
- Optional integrations: Zapier, Airtable, GitHub

See `.env.example` for all available options.

## Project Structure

```
src/
├── lib/
│   ├── components/     # Reusable components
│   ├── styles/         # Theme and global styles
│   └── utils/          # Utility functions
├── routes/             # SvelteKit routes
│   ├── +layout.svelte  # Root layout
│   ├── +page.svelte    # Home page
│   └── [route]/+page.svelte  # Other pages
└── static/             # Static assets
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project in Vercel
3. Configure environment variables
4. Deploy

Vercel will automatically detect SvelteKit and configure the build.

### Self-Hosted Node Server

1. Build the site:
   ```bash
   pnpm build
   ```

2. The output will be in `build/` directory

3. Serve with a static file server (nginx, Apache, etc.)

4. For server-side features (forms, API routes), use `@sveltejs/adapter-node`:
   ```bash
   pnpm add -D @sveltejs/adapter-node
   ```

5. Update `svelte.config.js`:
   ```js
   import adapter from '@sveltejs/adapter-node';
   ```

6. Run with Node.js:
   ```bash
   node build/index.js
   ```

### GitHub Pages / Static Hosting

The site is configured for static generation. After building:

1. Deploy the `build/` directory to your static host
2. Ensure all routes are configured (SPA fallback may be needed)

## Development

### Adding New Pages

1. Create a new directory in `src/routes/`
2. Add `+page.svelte` and `+page.ts` (with `export const prerender = true`)
3. Use the `SEO` component for meta tags

### Styling

- Tailwind CSS v4 with custom theme in `src/lib/styles/theme.css`
- Custom colors: forest greens, soil browns, blues, amber
- Typography: Playfair Display (headings), Inter (body)

### Components

- `SEO.svelte` - Meta tags and JSON-LD
- `Navbar.svelte` - Navigation with auto-hide
- `Footer.svelte` - Site footer
- `Hero.svelte` - Hero section with animations
- `Section.svelte` - Layout sections
- `Card.svelte` - Card component
- `ThemeToggle.svelte` - Dark/light mode toggle

## Performance Targets

- Lighthouse Performance: 95+ (mobile & desktop)
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- Cumulative Layout Shift: < 0.1

## SEO Checklist

- ✅ Semantic HTML
- ✅ Meta tags (title, description)
- ✅ Open Graph tags
- ✅ Twitter Cards
- ✅ JSON-LD structured data
- ✅ Sitemap.xml
- ✅ Robots.txt
- ✅ Canonical URLs
- ✅ RSS feed

## License

Private - GaiaLabs.community
