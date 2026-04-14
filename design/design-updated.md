# Creative North Star: The Curated Sanctuary
A high-end editorial feel that mirrors a boutique hotel or a luxury pet spa. Use an **Asymmetric Organic Layout** with generous whitespace, large-scale typography, and overlapping glassmorphism elements.

## 1. Global Layout & Spacing
- **Screen Padding**: All main layouts and items must have horizontal padding (`px-4` / 16px).
- **Single Column**: Mobile-first single column layout.
- **The "No-Line" Rule**: Strictly avoid 1px solid borders for sectioning. Define boundaries through background color shifts.
- **Ghost Borders**: If borders are strictly necessary (e.g., input fields), use `border-outline-variant/15`. NO opaque borders.
- **Asymmetric Margins**: Break standard grids. Right-align "See All" buttons. Overlap elements to create pseudo-3D depth.

## 2. Color System & Surfaces
- **Text**: NEVER use `#000000`. Always use `text-on-surface` for primary text and `text-on-surface-variant` for secondary.
- **Surfaces**:
  - Base Background: `bg-surface`
  - Sectioning Background: `bg-surface-container-low`
  - Cards & Actions: `bg-surface-container-lowest`
- **Glass & Gradients**: Avoid flat fills for large hero areas.
  - Hero Overlays: Linear gradient from `primary` to `primary-container`.
  - Floating/Sticky Bars: Glassmorphism using `bg-surface/80 backdrop-blur-md` or `bg-surface-container-lowest/85 backdrop-blur-md`.
  - Buttons: Use radial or linear overlays on `secondary` to give a "sunshine" glow.

## 3. Typography
- **Headlines (Plus Jakarta Sans)**: Use `font-headline`. Large price points, category titles, hero statements.
- **Body & Titles (Be Vietnam Pro)**: Use `font-body` and `font-label`. Product descriptions, inputs, micro-copy.
- **Hierarchy**:
  - Hero Promotions: `text-5xl font-extrabold` (Display)
  - Section Headers: `text-2xl font-bold` (Headline)
  - Titles/Nav: `text-lg font-semibold` (Title)
  - Body/Metadata: `text-sm` (Body)
  - Micro-copy: `text-xs font-medium` (Label)

## 4. Components & Shapes
- **Corner Radius (Shape)**: Standardize on Pill (`rounded-full`) or large organic curves. Never use sharp 4px corners. Cards use `rounded-3xl` or `rounded-2xl`. Buttons/Inputs use `rounded-full`.
- **Shadows (Ambient Glow)**: Avoid harsh drop shadows. Use `shadow-sm` or custom ambient tints (e.g. `shadow-primary/10`).
- **Buttons**:
  - Primary: `bg-primary text-white rounded-full`.
  - Secondary/Ghost: Transparent with `border border-outline-variant/15 text-primary rounded-full`.
- **Inputs**: `bg-surface-container-low rounded-full px-4 py-3 border-none focus:ring-1 focus:ring-primary/20`. Inline error styling when needed.
- **Images**: Combine images with offset pill badges or opacity masks.

## 5. Standardized Page Elements (Derived from App Requirements)
- **Header**: Centered app title/logo, left stack menu (or back button), right cart icon.
- **Bottom Menu**: Sticky fixed bottom bar, glassmorphism style. Active icon highlights with `text-primary`.
- **Back to Top**: Floating action button (FAB) `bg-primary text-white rounded-full`, icon up arrow.
- **Carousels**: Horizontal scroll with `snap-x snap-mandatory scrollbar-hide`. 
- **Product Cards**: Vertical card (`bg-surface-container-lowest`), overlapping top-left discount badge, top-right favorite icon, square image, title, star rating, price, and floating add button.
- **List Items (Flat List)**: Horizontal tile with left thumbnail, right stacked title/subtitle.
- **Alerts/Notifications**: Card styling corresponding to type. Critical = red, Reminder = blue, Special Offer = purple, Order = green. Apply tinted icons and matching button block.
- **Forms (Login/Register/Checkout)**: Top hero illustration with soft fading gradient. Bold "Join the Pack" / "Welcome Back" titles. Full-width sticky bottom CTA button.
- **Details (Product/Order)**: Full-width hero carousel at the top, overlapping content container (`-mt-6 rounded-t-[2.5rem] bg-surface`), inline attributes (weight/size pills). Fixed bottom sticky CTA for cart action.
