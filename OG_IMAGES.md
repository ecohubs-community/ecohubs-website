# OG Images Required

This document lists the OG (Open Graph) images that need to be created for social media sharing.

## Required Images

All OG images should be **1200x630 pixels** (recommended aspect ratio 1.91:1) and saved as JPG or PNG files in the `static/` directory.

### 1. `/og-home.jpg` - Homepage
- **Purpose**: Default OG image for homepage
- **Content**: Should feature EcoHubs branding, tagline "A Regenerative Future Designed Together"
- **Location**: `static/og-home.jpg`
- **Used by**: Homepage (`/`)

### 2. `/og-blog.jpg` - Blog Index
- **Purpose**: Default OG image for blog pages
- **Content**: Should feature blog/reading theme with EcoHubs branding
- **Location**: `static/og-blog.jpg`
- **Used by**: Blog index (`/blog`) and blog posts (fallback when post doesn't have image)

### 3. `/og-default.jpg` - Default Fallback
- **Purpose**: Fallback OG image for pages without specific images
- **Content**: Generic EcoHubs branding image
- **Location**: `static/og-default.jpg`
- **Used by**: All other pages (vision, dao, ecotoken, blueprint, join, contact, about)

## Design Guidelines

- Use the EcoHubs color palette (forest greens, soil browns, soft blues/turquoise, warm amber)
- Include the EcoHubs logo
- Keep text minimal and readable at small sizes
- Ensure good contrast for accessibility
- Follow the brand aesthetic: organic, poetic, nature-forward visuals combined with crisp modern UI

## Current Status

- [ ] `/og-home.jpg` - Not created
- [ ] `/og-blog.jpg` - Not created  
- [ ] `/og-default.jpg` - Not created

## Notes

- Blog posts can use their own featured image if available (from `post.image` field)
- If a blog post doesn't have a featured image, it falls back to `/og-blog.jpg`
- All images are referenced in the SEO component and individual page components

