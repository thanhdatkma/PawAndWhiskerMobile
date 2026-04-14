# Design System Specification

 

## 1. Overview & Creative North Star

The "Creative North Star" for this design system is **The Curated Sanctuary**. 

 

While many pet care apps lean into chaotic, high-density layouts, this system prioritizes a high-end editorial feel that mirrors the experience of a boutique hotel or a luxury pet spa. We achieve this by moving away from "standard" mobile grids in favor of an **Asymmetric Organic Layout**. By utilizing generous whitespace (negative space as a luxury), large-scale typography, and overlapping glassmorphism elements, we create a tactile, premium environment that feels both sophisticated and deeply approachable.

 

The goal is to break the "template" feel. Instead of rows of identical boxes, we use varied card sizes, offset images, and tonal layering to guide the user through a narrative-driven shopping and care experience.

 

---

 

## 2. Colors

Our palette is vibrant yet grounded, designed to evoke joy and reliability through high-contrast interactions.

 

### The "No-Line" Rule

**Explicit Instruction:** Use of 1px solid borders for sectioning is strictly prohibited. Boundaries must be defined exclusively through background color shifts. For example, a `surface-container-low` section should sit directly on a `surface` background to create a soft, natural distinction.

 

### Surface Hierarchy & Nesting

Treat the UI as a physical stack of premium paper or frosted glass. Use the surface tiers to create depth without visual clutter:

*   **Base Layer:** `surface` (#f6f6f8)

*   **Sectioning Layer:** `surface-container-low` (#f0f1f3)

*   **Actionable Cards:** `surface-container-lowest` (#ffffff)

*   **Interactive Overlays:** Glassmorphism using `surface-bright` with 80% opacity and 12px backdrop-blur.

 

### The "Glass & Gradient" Rule

To elevate the primary brand color (`primary`: #b7004d), avoid flat fills for large hero areas. Utilize **Signature Textures**:

*   **Hero Gradient:** Linear 135° from `primary` (#b7004d) to `primary-container` (#ff7294).

*   **CTAs:** A subtle radial gradient on `secondary` (#765600) to `secondary-container` (#ffca52) gives buttons a "sunshine" glow.

 

---

 

## 3. Typography

We use a dual-typeface system to balance editorial authority with friendly accessibility.

 

*   **Display & Headlines (Plus Jakarta Sans):** Chosen for its modern, geometric clarity with a slight organic touch. Used for large price points, category titles, and hero statements.

*   **Body & Titles (Be Vietnam Pro):** A highly legible, professional sans-serif that provides a "clean editorial" feel for product descriptions and labels.

 

**Typography Hierarchy:**

*   **Display-LG (3.5rem):** High-impact promotions (e.g., "50% Off").

*   **Headline-MD (1.75rem):** Primary section headers like "Everything For Dogs."

*   **Title-MD (1.125rem):** Product names and primary navigation links.

*   **Body-MD (0.875rem):** Product descriptions and metadata.

*   **Label-MD (0.75rem):** Micro-copy and secondary details.

 

---

 

## 4. Elevation & Depth

In this design system, depth is a feeling, not a feature.

 

### Tonal Layering

Depth is achieved by "stacking" surface tiers. Place a `surface-container-lowest` card on a `surface-container-low` background. This creates a perceived lift that feels integrated rather than "pasted on."

 

### Ambient Shadows

Traditional drop shadows are replaced with **Ambient Glows**.

*   **Shadow Value:** Blur: 24px | Spread: -4px | Color: `on-surface` at 6% opacity.

*   **Interaction Shadow:** When a user hovers or taps, the shadow color should shift to a tinted version of the `primary` color at 10% opacity to mimic light reflecting off the brand's fuchsia palette.

 

### The "Ghost Border" Fallback

If a border is required for accessibility (e.g., input fields), use the `outline-variant` token at **15% opacity**. 100% opaque borders are forbidden as they break the "soft" brand aesthetic.

 

---

 

## 5. Components

 

### Buttons (The "Pill" Standard)

*   **Primary:** Background: `secondary` (#765600) or `primary` (#b7004d). Radius: `full`. No shadow.

*   **Secondary (Ghost):** No background. `Ghost Border` (15% outline-variant). Text color: `primary`.

*   **Floating Action (FAB):** Utilize the `xl` (3rem) radius and the `primary` to `primary-container` gradient.

 

### Cards (The Editorial Canvas)

*   **Radius:** `lg` (2rem) for product cards; `xl` (3rem) for hero banners.

*   **Layout:** No dividers. Use `surface-container-lowest` white space to separate the image from the price/title text.

*   **Nesting:** Small price "chips" inside cards should use `surface-container-highest` for maximum contrast.

 

### Icons (Soft Geometry)

Incorporate the specific set for Dog, Cat, Clinic, Services, Accessories, and Pharmacy. 

*   **Style:** Thick 2pt strokes, rounded terminals.

*   **Container:** Icons should sit inside a `surface-container` circular or `md` (1.5rem) rounded square housing.

 

### Input Fields

*   **Surface:** `surface-container-low`.

*   **Shape:** `full` (pill-shaped) for search bars; `md` (1.5rem) for text areas.

*   **State:** On focus, the border transitions from 0% to 20% `primary` opacity.

 

### Navigation Bar

*   **Style:** Floating Glassmorphism.

*   **Effect:** 85% `surface-container-lowest` with a 16px backdrop-blur. 

*   **Active State:** The active icon is encased in a `primary` circular "blob" with an ambient fuchsia shadow.

 

---

 

## 6. Do's and Don'ts

 

### Do:

*   **Do** use asymmetrical margins. If a section header is left-aligned, try right-aligning the "See All" button with significantly more padding than a standard grid.

*   **Do** overlap elements. Let a product image "break" the container of a card slightly to create 3D depth.

*   **Do** use the `primary` color for emphasis in text (e.g., price points) to guide the eye.

 

### Don't:

*   **Don't** use black (#000000) for text. Always use `on-surface` (#2d2f31) for a softer, premium feel.

*   **Don't** use standard 4px or 8px corners. Only use the **Roundedness Scale** (minimum `sm` at 0.5rem for micro-elements, `lg` for main cards).

*   **Don't** use dividers or horizontal lines. If elements feel too close, increase the vertical spacing using the `1.5rem` or `2rem` tokens.