# Implementation Plan: Paws & Whiskers UI Modules & Components

Based on the `app-requirement.md` and the North Star design tokens from `design-updated.md`, here is the detailed technical plan for generating and structuring the screens using the Stitch MCP.

## 1. Module Architecture & File Paths
The application will be structured into 9 core modules to logically group the 30+ requested screens. The following file paths (following standard Ionic/Angular file structures) will be targeted:

### Module 1: Authentication & Onboarding
- `src/app/pages/auth/intro/intro.page.html` (Login/Register options)
- `src/app/pages/auth/register/register.page.html`
- `src/app/pages/auth/otp-verify/otp-verify.page.html`
- `src/app/pages/auth/login/login.page.html`
- `src/app/pages/auth/forgot-password/forgot-password.page.html`
- `src/app/pages/auth/change-password/change-password.page.html`

### Module 2: Main Interface & Discovery
- `src/app/pages/main/home/home.page.html`
- `src/app/pages/main/categories/categories.page.html`
- `src/app/pages/main/category-detail/category-detail.page.html`
- `src/app/pages/main/news/news.page.html`

### Module 3: Notifications & Alerts
- `src/app/pages/alerts/alerts.page.html`

### Module 4: Profiles
- `src/app/pages/profile/view/profile.page.html`
- `src/app/pages/profile/update/update-profile.page.html` (For Pet & Owner)

### Module 5: Pet Health & Medical Records
- `src/app/pages/records/vaccine-list/vaccination-list.page.html`
- `src/app/pages/records/clinic-visits/clinic-visits.page.html`
- `src/app/pages/records/appointments/appointments-list.page.html`
- `src/app/pages/records/food-records/food-records.page.html`
- `src/app/pages/records/medicine-records/medicine-records.page.html`

### Module 6: Shopping & Checkout
- `src/app/pages/shop/product-detail/product-detail.page.html`
- `src/app/pages/shop/cart/shopping-cart.page.html`
- `src/app/pages/shop/checkout/checkout.page.html`
- `src/app/pages/shop/order-success/order-success.page.html`

### Module 7: Order Management & Tracking
- `src/app/pages/orders/list/order-list.page.html`
- `src/app/pages/orders/detail/order-detail.page.html`
- `src/app/pages/orders/tracking/order-tracking.page.html`
- `src/app/pages/orders/rating/product-rating.page.html`

### Module 8: Settings & Account Assets
- `src/app/pages/settings/app-settings/app-settings.page.html`
- `src/app/pages/settings/payment-methods/payment-methods.page.html`
- `src/app/pages/settings/billing-shipping/billing-shipping-list.page.html`
- `src/app/pages/settings/billing-shipping-update/billing-shipping-update.page.html`
- `src/app/pages/settings/about/about.page.html`
- `src/app/pages/settings/privacy/privacy.page.html`
- `src/app/pages/settings/terms/terms.page.html`

### Module 9: Service Booking
- `src/app/pages/services/booking/service-booking.page.html`


## 2. Shared Base Components (The "No Lines" & "Organic Shapes" Standard)

Before generating individual pages, the following global shared components and tokens must be defined to ensure consistency with the "Curated Sanctuary" aesthetic:

- **App Header Component**:
  - *Layout*: Centered App Title ("paws-icon Paws & Whiskers"), left stack-menu/back button, right cart icon.
  - *Styling*: Floating Glassmorphism design using `bg-surface/80` with `backdrop-blur-md`. Asymmetric margins and floating overlaps where needed. No bottom border.
- **Bottom Navigation Menu**:
  - *Styling*: Fixed positioning at the bottom with a sticky glassmorphism panel (`bg-surface-container-lowest/85 backdrop-blur-md`). Dynamic states for Active items using the base primary color, casting soft `shadow-primary/10`.
- **Global Card Styles (Lists, Orders, Products)**:
  - *The "No Lines" Rule*: Remove all solid borders (no `px-1 border-solid`). Delineation is strictly controlled via background container shift (`bg-surface-container-lowest`) against the page background (`bg-surface`).
  - *Organic Corners*: Rigid use of `rounded-2xl`, `rounded-3xl` or large `rounded-[2.5rem]` overlays on card images and backgrounds. Never use sharp or `rounded-sm` corners.
  - *Elevations*: Reliance on soft ambient `.shadow-sm` spreads to simulate depth (pseudo-3D effect).
- **Form Controls & Inputs**:
  - *Pill Design*: Inputs and Buttons must use `rounded-full` (Pill format).
  - *Inputs*: Removed default borders (`border-none`), large hit area (`px-4 py-3`), utilizing `bg-surface-container-low` with a soft ring focus (`focus:ring-primary/20`).

## 3. Dynamic Color States (Alerts & Order Tracking)

We'll establish rigid semantic color palettes that dictate title/button/accent colors based on the data states documented in the requirements.

### Alert Page Color States:
| Alert Type | Icon Theme | Semantic Color Mapping |
| :--- | :--- | :--- |
| **Medical / Vaccine** (Critical) | Syringe | **Red** |
| **Health Check** (Reminder) | Stethoscope | **Blue** |
| **Service / Spa** (Special Offer)| Grooming Scissors | **Purple** |
| **Food Update** (Reminder) | Food Bag | **Blue** |
| **Medicine Schedule** (Recurring)| Pharmacy / Pill | **Yellow** |
| **Order Status** (Update) | Box / Package | **Green** |
| **Birthday** (Celebration) | Cake | **Pink** |

### Order & Appointment Status Flags:
| Status | Associated Semantic Color |
| :--- | :--- |
| **Upcoming / Packed** | **Yellow / Amber** (Warning/Pending) |
| **Completed / Delivered** | **Green** (Success) |
| **Cancelled** | **Red** (Critical/Error) |
| **Shipped** | **Primary Theme Color** (Processing/Active) |

### Real-Time Tracking Milestones (Order Journey):
- **Past Milestones:** Primary Color, bold black title, and solid check icon.
- **Active Current Milestone:** Primary Color, bold primary title, and hollow circle with 50% opacity primary outline.
- **Future/Pending Milestones:** Grey color across icon, text, and lines.

> [!NOTE]
> Review the file structure, the shared aesthetic boundaries, and the specific alert color definitions above.
> 
> **User Feedback Required**: Please confirm if this 9-module structural breakdown, the mapped component rules (especially the border-less aesthetic approach), and the specific color dictionaries correctly align with your expectations. If approved, I will sequentially invoke the Stitch MCP to begin scaffolding these screens.
