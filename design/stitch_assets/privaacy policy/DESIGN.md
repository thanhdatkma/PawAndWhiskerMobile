# Design System: The Playful Curator

## 1. Overview & Creative North Star

### Creative North Star: "The Playful Curator"
This design system moves away from the traditional, rigid e-commerce grid to embrace an editorial-first mobile experience. We aim to balance "Cute & Friendly" with "Reliable & High-End." Instead of a cluttered bargain-bin aesthetic, we treat pet care as a premium lifestyle. 

The system breaks the "template" look through:
*   **Intentional Asymmetry:** Strategic use of whitespace and overlapping product elements to create a sense of movement.
*   **Tonal Depth:** Replacing harsh lines with sophisticated, layered surfaces.
*   **Sophisticated Playfulness:** Leveraging the warmth of the Pink and Yellow palette through high-contrast typography and "Glassmorphism" rather than flat, saturated blocks.

---

## 2. Colors

The palette is rooted in the brand's vibrant heritage but refined for a premium mobile interface.

### Palette Strategy
*   **Primary (`#EB278D`):** Use for high-impact actions and brand signaling. Avoid overusing this on large surfaces; keep it as a "surgical" highlight.
*   **Secondary (`#FDD835`) & Container (`#FDD835`):** The "Sunshine" accent. Used for secondary CTAs, loyalty badges, and ratings.
*   **Tertiary (`#00AFF2`):** A calming blue for information, tracking, and utility features.
*   **Neutral (`#F2F2F2`):** A soft, foundational color for backgrounds and surfaces.

### The "No-Line" Rule
**Explicit Instruction:** Do not use 1px solid borders for sectioning. 
Boundaries must be defined solely through background color shifts. For example, a `surface-container-low` section sitting on a `surface` background provides all the separation needed. If a visual break is required, use vertical breathing room (Spacing Scale) rather than a line.

### The "Glass & Gradient" Rule
To elevate the app's tactile feel:
*   **Gradients:** Use a subtle transition from `primary` (`#EB278D`) to `primary_container` (`#EB278D`) for main Hero buttons to add "soul."
*   **Glassmorphism:** For floating headers or navigation bars, use `surface` colors with a 15-20% opacity and a `20px` backdrop-blur. This integrates the UI with the cute animal imagery underneath.

---

## 3. Typography

The typography uses a mix of **Plus Jakarta Sans** for character and **Inter** for pure functional legibility.

*   **Display & Headlines (Plus Jakarta Sans):** These are the "voice" of the brand. Use large scales and tighter tracking to feel like a modern magazine. 
    *   *Headline-LG (`2rem`):* Used for "New Arrivals" or category heroes.
*   **Titles & Body (Inter):** High legibility for product names and descriptions.
*   **Labels (Be Vietnam Pro):** Used for technical metadata like "In Stock" or "Weight" to provide a modern, technical contrast to the playful headlines.

---

## 4. Elevation & Depth

We reject the standard "Drop Shadow." Depth is achieved through **Tonal Layering**.

*   **The Layering Principle:** Stack `surface-container` tiers to create hierarchy. 
    *   **Level 0:** `surface` (The floor)
    *   **Level 1:** `surface-container-low` (Content groupings)
    *   **Level 2:** `surface-container-lowest` (The Card - white/brightest)
*   **Ambient Shadows:** If a card must "float," use a shadow with a blur of `32px`, spread of `0`, and a `6%` opacity using the `on-surface` color. It should feel like a soft glow, not a dark edge.
*   **The "Ghost Border" Fallback:** For accessibility in form fields, use `outline-variant` at **15% opacity**. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Gradient of `primary` to `primary_container`. Full roundedness (`xl`: `3rem`). Large horizontal padding.
*   **Secondary:** `secondary_container` background with `on_secondary_container` text. Use for "Add to Cart" in lists.
*   **Tertiary:** No background, `primary` text. Used for "See All" or "Terms."

### Cards & Product Blocks
*   **Style:** No borders. Background: `surface-container-lowest`.
*   **Interaction:** Subtle scale-up (1.02x) on tap.
*   **Pricing:** Price should be bold and high-contrast (`primary`). Discount tags use `error_container` with a semi-transparent blur.

### Chips (Category Filters)
*   Instead of boxes, use high-contrast text on `surface-container-high` backgrounds. When active, transition to `primary` with `on_primary` text.

### Input Fields
*   Soft-rounded (`md`: `1.5rem`). Use `surface-container-highest` as the fill. The label should float in `title-sm` (Inter) for a clean, architectural look.

### The "Pet Pulse" (Special Component)
*   A custom progress bar for loyalty points or pet health tracking, using a gradient from `secondary` to `primary` with a small paw-print icon as the thumb.

---

## 6. Do’s and Don'ts

### Do
*   **Do** use asymmetrical margins. If a product title is left-aligned, try right-aligning the price to create dynamic visual tension.
*   **Do** use "Breathing Room." When in doubt, double the padding.
*   **Do** mix high-quality product photography with the "CutePets" cartoon mascots to maintain the brand’s friendly heritage while looking professional.

### Don’t
*   **Don’t** use black (`#000000`). Use `on_surface` (`#1a1c1c`) for all "black" text to keep the interface soft.
*   **Don’t** use a standard grid for the home screen. Let cards overlap slightly or vary in height (Masonry style) to feel "curated."
*   **Don’t** use "divider lines" between list items. Use a 12px or 16px gap instead.

### Accessibility Note
Ensure that all `primary` buttons maintain at least a 4.5:1 contrast ratio against the background. Use `on_primary_container` for text on lighter pink surfaces to ensure the app is usable for all pet lovers.