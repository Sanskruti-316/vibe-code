# Premium Photo Gallery - Design Guidelines

## Design Approach
**Reference-Based Approach** - Drawing inspiration from Pinterest's masonry excellence, Unsplash's photography-first aesthetic, and Behance's creative portfolio layouts.

**Key Design Principles:**
- Visual content takes center stage with minimal UI interference
- Fluid, organic layouts that feel dynamic and engaging
- Sophisticated interactions that enhance without overwhelming
- Dark mode optimized for photo presentation

---

## Core Design Elements

### A. Color Palette

**Dark Mode Primary (Default):**
- Background: 220 15% 8% (deep charcoal)
- Surface: 220 12% 12% (elevated surfaces)
- Border: 220 10% 20% (subtle dividers)
- Text Primary: 0 0% 95%
- Text Secondary: 220 8% 65%

**Light Mode:**
- Background: 0 0% 98%
- Surface: 0 0% 100%
- Border: 220 10% 90%
- Text Primary: 220 15% 15%
- Text Secondary: 220 8% 45%

**Accent Colors:**
- Primary: 260 85% 65% (vibrant purple for CTAs)
- Hover Overlay: 0 0% 0% with 20% opacity (dark mode), 0 0% 100% with 10% opacity (light mode)

### B. Typography

**Font Stack:**
- Primary: 'Inter' via Google Fonts (400, 500, 600, 700)
- Fallback: -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui

**Hierarchy:**
- Page Title: 2.5rem (40px), font-weight 700, letter-spacing -0.02em
- Category Labels: 0.875rem (14px), font-weight 500, uppercase, letter-spacing 0.05em
- Image Captions (Lightbox): 1rem (16px), font-weight 400
- Filter Buttons: 0.9375rem (15px), font-weight 500

### C. Layout System

**Spacing Primitives:**
- Primary units: 2, 4, 6, 8, 12, 16, 20, 24 (Tailwind scale)
- Container padding: px-4 (mobile), px-6 (tablet), px-8 (desktop)
- Section spacing: py-12 (mobile), py-16 (tablet), py-20 (desktop)

**Grid Structure:**
- Masonry Layout: Dynamic column count based on viewport
  - Mobile: 1 column, gap-4
  - Tablet: 2 columns, gap-6
  - Desktop: 3-4 columns, gap-8
  - Wide: 4-5 columns, gap-8
- Container: max-w-screen-2xl mx-auto

### D. Component Library

**Header:**
- Fixed/sticky navigation bar with blur backdrop
- Logo/title on left, category filters centered/right
- Height: 4rem (64px) with py-4
- Backdrop blur effect: backdrop-blur-lg bg-opacity-90

**Category Filter Bar:**
- Horizontal scrollable pill-style buttons
- Active state: filled background with primary accent color
- Inactive: transparent with border, hover effects
- Smooth transition on category change (300ms ease)

**Masonry Gallery:**
- Staggered heights for visual interest (varying aspect ratios)
- Cards with subtle border and shadow on hover
- Image covers full card with object-fit: cover
- Border radius: 0.75rem (12px) for modern, friendly feel

**Image Cards:**
- Container: relative positioning for overlay
- Hover overlay: Dark gradient from bottom (0% to 40% opacity)
- Hover effects: Scale transform (1.02), shadow elevation increase
- Transition: all 300ms cubic-bezier(0.4, 0, 0.2, 1)
- Optional caption appears on hover at bottom with p-4

**Lightbox Modal:**
- Full-screen overlay with 95% opacity dark background
- Image container: max-w-7xl, max-h-90vh, centered
- Navigation arrows: Positioned left/right, large click area (4rem)
- Close button: Top-right corner, fixed position
- Controls have blur background for readability over images
- Keyboard support: Arrow keys, Escape to close

**Loading States:**
- Skeleton screens with animated shimmer effect
- Blur-up technique: Low-res placeholder → full image
- Spinner for lazy loading: Subtle, brand-colored

**Interactive Elements:**
- Buttons: rounded-lg, px-6 py-2.5, font-medium
- Focus states: Visible ring with offset for accessibility
- Touch targets: Minimum 44x44px for mobile usability

### E. Animations

**Hover Interactions:**
- Image cards: Scale 1.02, shadow elevation, overlay fade-in (300ms)
- Filter buttons: Background color transition (200ms)
- Navigation arrows: Scale 1.1 on hover (150ms)

**Transitions:**
- Category filter: Images fade out/in with stagger effect (400ms total)
- Lightbox open/close: Backdrop fade + content scale (250ms)
- Lazy load: Opacity 0 → 1 on image load (400ms ease-out)

**Scroll Behavior:**
- Smooth scrolling for navigation jumps
- Parallax effect on hero section (optional enhancement)

---

## Images

**Gallery Content:**
- Source: Lorem Picsum (https://picsum.photos/)
- Dimensions: Varied aspect ratios (landscape, portrait, square) for masonry effect
- Categories: 6-8 categories (Nature, Architecture, People, Abstract, Urban, Animals, Food, Travel)
- Total images: 30-50 for demonstration
- Quality: High-resolution (1200px+ width) with lazy loading

**Image Specifications:**
- Thumbnail sizes: Width based on column (auto height for masonry)
- Lightbox sizes: Original or max 2400px width
- Format: JPG for photos, optimized for web

**No Hero Image** - Gallery starts immediately after header, content is the hero

---

## Responsive Breakpoints

- Mobile: < 640px (1 column)
- Tablet: 640px - 1024px (2 columns)
- Desktop: 1024px - 1536px (3-4 columns)
- Wide: > 1536px (4-5 columns)

**Mobile Optimizations:**
- Single column masonry for optimal scrolling
- Larger touch targets (48x48px minimum)
- Simplified category filter (horizontal scroll)
- Lightbox optimized for portrait orientation

---

## Accessibility

- High contrast ratios: 4.5:1 minimum for text
- Keyboard navigation: Tab through filters, arrow keys in lightbox
- Focus indicators: Visible rings on all interactive elements
- Alt text: Descriptive text for all images
- ARIA labels: For icon-only buttons (close, navigation arrows)
- Reduced motion: Respect prefers-reduced-motion setting