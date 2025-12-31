# Design Tokens

This document describes the design system tokens used throughout the EcoHubs.community website. All tokens are defined in `src/lib/styles/theme.css` and can be used via Tailwind CSS classes or CSS custom properties.

## Color Palette

### Forest Greens (Primary)
The primary color palette represents growth, regeneration, and nature.

| Token | Hex | Usage |
|-------|-----|-------|
| `forest-900` | `#1a3009` | Darkest green, used for text and strong accents |
| `forest-800` | `#2d5016` | Very dark green |
| `forest-700` | `#4a7c2a` | Dark green, primary buttons and links |
| `forest-600` | `#6b9f3d` | Medium-dark green, primary color |
| `forest-500` | `#7fb84a` | Medium green |
| `forest-400` | `#9ac966` | Medium-light green |
| `forest-300` | `#b5da82` | Light green |
| `forest-200` | `#d0eb9e` | Very light green |
| `forest-100` | `#ebfcba` | Lightest green |
| `forest-50` | `#f5fde5` | Almost white green tint |

**Tailwind Classes**: `bg-forest-{shade}`, `text-forest-{shade}`, `border-forest-{shade}`

### Soil Browns (Secondary)
The secondary palette represents earth, grounding, and stability.

| Token | Hex | Usage |
|-------|-----|-------|
| `soil-900` | `#4a3d2a` | Darkest brown |
| `soil-800` | `#5d4d35` | Very dark brown |
| `soil-700` | `#8b6f47` | Dark brown, secondary elements |
| `soil-600` | `#a0826d` | Medium-dark brown |
| `soil-500` | `#b8957d` | Medium brown |
| `soil-400` | `#c4a484` | Medium-light brown |
| `soil-300` | `#d1b39a` | Light brown |
| `soil-200` | `#dec2b0` | Very light brown |
| `soil-100` | `#ebd1c6` | Lightest brown |
| `soil-50` | `#f8e0dc` | Almost white brown tint |

**Tailwind Classes**: `bg-soil-{shade}`, `text-soil-{shade}`, `border-soil-{shade}`

### Soft Blues/Turquoise (Accent)
The accent palette represents water, flow, and technology.

| Token | Hex | Usage |
|-------|-----|-------|
| `blue-900` | `#1e3a47` | Darkest blue |
| `blue-800` | `#2d4f5c` | Very dark blue |
| `blue-700` | `#4a90a4` | Dark blue |
| `blue-600` | `#6bb3c7` | Medium-dark blue, accent color |
| `blue-500` | `#7cc5d9` | Medium blue |
| `blue-400` | `#8dd4e8` | Medium-light blue |
| `blue-300` | `#a3dff0` | Light blue |
| `blue-200` | `#b9eaf8` | Very light blue |
| `blue-100` | `#cff5ff` | Lightest blue |
| `blue-50` | `#e5faff` | Almost white blue tint |

**Tailwind Classes**: `bg-blue-{shade}`, `text-blue-{shade}`, `border-blue-{shade}`

### Warm Amber (Highlight)
The highlight palette represents warmth, energy, and attention.

| Token | Hex | Usage |
|-------|-----|-------|
| `amber-900` | `#8b5a2a` | Darkest amber |
| `amber-800` | `#a66b3a` | Very dark amber |
| `amber-700` | `#c47d4a` | Dark amber |
| `amber-600` | `#d4a574` | Medium-dark amber |
| `amber-500` | `#e0b586` | Medium amber, highlight color |
| `amber-400` | `#e8b886` | Medium-light amber |
| `amber-300` | `#f0c99a` | Light amber |
| `amber-200` | `#f5d4ae` | Very light amber |
| `amber-100` | `#fae0c2` | Lightest amber |
| `amber-50` | `#ffecd6` | Almost white amber tint |

**Tailwind Classes**: `bg-amber-{shade}`, `text-amber-{shade}`, `border-amber-{shade}`

## Semantic Colors

Semantic colors map to specific use cases and adapt based on light/dark mode.

### Light Mode

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#6b9f3d` (forest-600) | Primary actions, links, brand elements |
| `primary-dark` | `#4a7c2a` (forest-700) | Hover states, emphasis |
| `primary-light` | `#7fb84a` (forest-500) | Light backgrounds |
| `secondary` | `#8b6f47` (soil-700) | Secondary actions, supporting elements |
| `accent` | `#6bb3c7` (blue-600) | Accent elements, highlights |
| `highlight` | `#e0b586` (amber-500) | Call-to-action highlights |

### Dark Mode

| Token | Value | Usage |
|-------|-------|-------|
| `primary` | `#9ac966` (forest-400) | Primary actions, links |
| `primary-dark` | `#7fb84a` (forest-500) | Hover states |
| `primary-light` | `#b5da82` (forest-300) | Light backgrounds |
| `secondary` | `#b8957d` (soil-500) | Secondary elements |
| `accent` | `#7cc5d9` (blue-500) | Accent elements |
| `highlight` | `#e8b886` (amber-400) | Highlights |

**Tailwind Classes**: `bg-primary`, `text-primary`, `bg-accent`, `text-accent`, etc.

## EcoHubs Brand Colors

Specific brand colors used throughout the site.

| Token | Hex | Usage |
|-------|-----|-------|
| `ecohubs-base` | `#fbfbf9` | Base background color |
| `ecohubs-text` | `#1c1917` | Primary text color |
| `ecohubs-primary` | `#059669` | Primary brand color (emerald-600) |
| `ecohubs-dark` | `#064e3b` | Dark brand color (emerald-900) |
| `ecohubs-accent` | `#d97706` | Accent color (amber-600) |
| `ecohubs-light` | `#a7f3d0` | Light brand color (emerald-200) |

**Tailwind Classes**: `bg-ecohubs-primary`, `text-ecohubs-dark`, `bg-ecohubs-accent`, etc.

## Typography

### Font Families

| Token | Value | Usage |
|-------|-------|-------|
| `font-serif` | `'Pridi', serif` | Headings, display text |
| `font-sans` | `'Stack Sans Headline', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif` | Body text, UI elements |

**Tailwind Classes**: `font-serif`, `font-sans`

### Font Sizes

Use Tailwind's default type scale:
- `text-xs` - 0.75rem (12px)
- `text-sm` - 0.875rem (14px)
- `text-base` - 1rem (16px)
- `text-lg` - 1.125rem (18px)
- `text-xl` - 1.25rem (20px)
- `text-2xl` - 1.5rem (24px)
- `text-3xl` - 1.875rem (30px)
- `text-4xl` - 2.25rem (36px)
- `text-5xl` - 3rem (48px)
- `text-6xl` - 3.75rem (60px)
- `text-7xl` - 4.5rem (72px)

### Line Height

Default line height: `1.6` (160%)

## Spacing Scale

Consistent spacing values for margins, padding, and gaps.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `spacing-xs` | `0.5rem` | 8px | Tight spacing |
| `spacing-sm` | `0.75rem` | 12px | Small spacing |
| `spacing-md` | `1rem` | 16px | Default spacing |
| `spacing-lg` | `1.5rem` | 24px | Large spacing |
| `spacing-xl` | `2rem` | 32px | Extra large spacing |
| `spacing-2xl` | `3rem` | 48px | Section spacing |
| `spacing-3xl` | `4rem` | 64px | Large section spacing |
| `spacing-4xl` | `6rem` | 96px | Extra large section spacing |

**Tailwind Classes**: Use standard Tailwind spacing scale (`p-4`, `m-8`, `gap-6`, etc.)

## Border Radius

Rounded corners for organic, modern feel.

| Token | Value | Usage |
|-------|-------|-------|
| `radius-sm` | `0.25rem` (4px) | Small elements, badges |
| `radius-md` | `0.5rem` (8px) | Buttons, inputs |
| `radius-lg` | `0.75rem` (12px) | Cards, containers |
| `radius-xl` | `1rem` (16px) | Large cards |
| `radius-2xl` | `1.5rem` (24px) | Extra large containers |
| `radius-full` | `9999px` | Pills, circles |

**Tailwind Classes**: `rounded-sm`, `rounded-md`, `rounded-lg`, `rounded-xl`, `rounded-2xl`, `rounded-full`

## Shadows

Elevation and depth through shadows.

| Token | Value | Usage |
|-------|-------|-------|
| `shadow-sm` | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Subtle elevation |
| `shadow-md` | `0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)` | Medium elevation |
| `shadow-lg` | `0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)` | Large elevation |
| `shadow-xl` | `0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)` | Extra large elevation |

**Tailwind Classes**: `shadow-sm`, `shadow-md`, `shadow-lg`, `shadow-xl`

## Max Widths

Container width constraints for readability and layout.

| Token | Value | Pixels | Usage |
|-------|-------|--------|-------|
| `max-width-sm` | `24rem` | 384px | Small containers |
| `max-width-md` | `28rem` | 448px | Medium containers |
| `max-width-lg` | `32rem` | 512px | Large containers |
| `max-width-xl` | `36rem` | 576px | Extra large containers |
| `max-width-2xl` | `42rem` | 672px | 2XL containers |
| `max-width-3xl` | `48rem` | 768px | 3XL containers |
| `max-width-4xl` | `56rem` | 896px | 4XL containers |
| `max-width-5xl` | `64rem` | 1024px | 5XL containers |
| `max-width-6xl` | `72rem` | 1152px | 6XL containers |
| `max-width-7xl` | `80rem` | 1280px | 7XL containers |
| `max-width-full` | `100%` | - | Full width |

**Tailwind Classes**: `max-w-sm`, `max-w-md`, `max-w-lg`, `max-w-xl`, `max-w-2xl`, `max-w-3xl`, `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, `max-w-7xl`, `max-w-full`

## Motion & Animation

### Animation Guidelines

- **Duration**: Use short durations (0.3s - 0.6s) for interactions, longer (1s+) for ambient animations
- **Easing**: Use `cubic-bezier(0.4, 0, 0.2, 1)` for smooth, natural motion
- **Reduced Motion**: Always respect `prefers-reduced-motion` media query

### Custom Animations

#### Floating Leaf
```css
.floating-leaf {
  animation: float 6s ease-in-out infinite;
}
```
Gentle floating motion for decorative elements.

#### Slow Spin
```css
.animate-spin-slow-80 {
  animation: spin-slow 80s linear infinite;
}
```
Very slow rotation for background decorative elements.

### Transition Utilities

| Class | Value | Usage |
|-------|-------|-------|
| `transition-all-smooth` | `all 0.4s cubic-bezier(0.4, 0, 0.2, 1)` | Smooth transitions for all properties |

## Custom Utility Classes

### Glass Effects

| Class | Description |
|-------|-------------|
| `glass-panel` | Glassmorphism effect for navigation panels |
| `glass-card` | Glassmorphism effect for cards with hover states |

### Organic Shapes

| Class | Description |
|-------|-------------|
| `organic-shape` | Organic, fluid border radius that animates on hover |
| `text-gradient` | Gradient text effect using brand colors |

## Dark Mode

Dark mode is automatically applied based on:
1. System preference (`prefers-color-scheme: dark`)
2. Manual toggle (`.dark` class on `html`)

All semantic colors automatically adapt in dark mode. Use Tailwind's `dark:` variant to apply dark-mode-specific styles:

```html
<div class="bg-white dark:bg-surface">
  <p class="text-gray-900 dark:text-text-primary">Content</p>
</div>
```

## Usage Examples

### Button
```html
<button class="px-6 py-3 bg-primary text-white rounded-lg shadow-md hover:bg-primary-dark transition-all-smooth">
  Click Me
</button>
```

### Card
```html
<div class="bg-white dark:bg-surface rounded-xl shadow-lg p-6 border border-border">
  <h3 class="font-serif text-2xl text-ecohubs-dark mb-4">Title</h3>
  <p class="text-text-secondary">Content</p>
</div>
```

### Text Gradient
```html
<h1 class="text-5xl font-serif text-gradient">
  Regenerative Future
</h1>
```

## Implementation Reference

All design tokens are implemented in `src/lib/styles/theme.css` using Tailwind CSS v4's `@theme` directive. The tokens are available as:

1. **CSS Custom Properties**: `var(--color-primary)`, `var(--spacing-md)`, etc.
2. **Tailwind Classes**: `bg-primary`, `p-4`, `rounded-lg`, etc.

For more details, see the theme.css file.


