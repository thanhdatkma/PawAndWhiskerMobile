**Role**: Senior Ionic/Angular Developer & UI/UX Specialist.
**Task**: USE THE STITCH MCP TOOLS TO BUILD THE COMPLETE mobile application UI for "Paws & Whiskers". 
**Constraint**: NO SUMMARIZATION. Generate every single page as a distinct component/file following the granular details in `app-requirement.md`.

### 1. Visual & Tech Foundation (Reference: `design-updated.md`)
- **Theme**: Luxury Pet Spa / Boutique Editorial style.
- **Layout**: Single column, RTL: true, Dark Mode support.
- **Design Rules**: 
  - "No-Line" Rule: Use background shifts (`bg-surface-container-low`) instead of 1px borders.
  - Organic Shapes: `rounded-3xl` for cards, `rounded-full` for buttons/inputs.
  - Typography: `Plus Jakarta Sans` (Headlines), `Be Vietnam Pro` (Body).
  - Glassmorphism: Apply `backdrop-blur-md` to the sticky bottom menu and header.

### 2. File Architecture & Output Format
Generate the code for each section separately. For each screen, provide the HTML template using Tailwind CSS and Ionic components. Use the following format for each file:
``

### 3. Detailed Page Execution (Strictly follow `app-requirement.md`)
Please generate code for the following modules without skipping any sub-pages:

- **Module A: Core Shell**: Main Header (with paws-icon & cart), Floating Bottom Menu (5 tabs + FAB Scan), Back-to-top FAB.
- **Module B: Home & Discovery**: 
  - Home (Carousel 0.5 opacity, Category grid, 3x Horizontal lists: New Arrivals, Dog, Cat).
  - Categories (Split-view: Left vertical parent nav, Right 2-col child grid).
  - Product Detail (Carousel 1/5, "Sold Out" overlay logic, Discount badges, Variable selectors for Weight/Size/Age).
- **Module C: Health & Records (The "Bio" System)**:
  - Generate distinct list pages for: Vaccination, Clinic, Appointments (with color-coded Status), Food, and Medicine records.
- **Module D: Auth Flow**:
  - Intro (Golden Retriever/Cat BG, Pink gradient), Register (Social icons), OTP (6-digit split inputs), Login (FaceID toggle), Forgot/Change Password.
- **Module E: E-Commerce Journey**:
  - Shopping Cart (Swipe to remove), Checkout (Address cards, Radio selection for Shipping/Payment), Order Success, Order Detail.
  - **Tracking Order**: Full timeline milestone system (Passed/Current/Future states) + Courier info.
  - **Review/Rating**: 5-star input + 4-photo upload slots (dashed borders).
- **Module F: Services & Content**:
  - Service Booking: 3-step process (Step 1 of 3), Date/Time picker (Pill style), Clinic/Professional selection cards.
  - Settings: Full list of toggles and navigation items.

### 4. Component Fidelity
- **Alerts Page**: Must include all 7 specific types (Vaccine, Health, Spa, Food, Medicine, Order, Birthday) with their unique icons and color-coded buttons (Red, Blue, Purple, Yellow, Green, Pink).
- **Forms**: Use inline validation styling as specified.

START GENERATING FROM MODULE A TO F. DO NOT MERGE SCREENS.