# Paws & Whiskers App Requirements
**App Context**: Pet health tracking, spa, clinic booking & e-commerce (dogs/cats).
**Tech Stack**: Ionic/Angular
**Config**: Single column layout, RTL: true, Dark Mode support.

## 🎨 Common UI Patterns & Components
- **Global Spacing**: 16px left/right padding on all screens.
- **Header Structure**: 
  - *Main (Home/Categories)*: Menu icon (left), `Paws & Whiskers` title (center), Cart icon (right).
  - *Sub-pages*: Back icon (left), Page Title (center).
- **Bottom Menu**: Home, Categories, Scan (FAB), Alert, Profile. (Active: Primary color, Inactive: Dark).
- **Action Buttons**: 
  - Primary Button: Full width, Primary color bg, White text.
  - Back to Top: Primary color, Up arrow icon, appears on over-scroll.
- **Forms & Inputs**: Validation for email/phone/password/address with inline errors.
- **Auth Background**: Rounded image of golden retriever puppy & cat with pink gradient overlay.
- **Lists / Cards**: Heavy use of flatlist cards and horizontal scroll UI elements (carousels).

---

## 📱 Page Specifications

### 1. Home
- **Hero Carousel**: Dot pagination, background images with 50% opacity.
- **Categories Grid**: Dog, cat, clinic, services, accessories, pharmacy (with respective icons).
- **Horizontal Scroll Lists (10 items each)**:
  - *New Arrivals*: Left label, Right "See all".
  - *Everything for Dog/Cat*: Includes a Banner (Food, toy, essentials) with white "Explore" button. Product list below.
  - *News Updates*: Flat list item (Left image, right content with title & sub-content).

### 2. Categories & Products
- **Main View**: Search bar (follows home style). Left col: Parent categories (vertical scroll). Right col: Child categories in 2 columns (thumbnail, title, 'see more').
- **Detail List**: Search bar, grid/list of all products in active category.

### 3. Alerts & Reminders
- List format: Icon (left) + Title/Content/Sub/Button (right).
- **Types**: 
  - Vaccine (Red) / Health (Blue) / Spa (Purple) / Food (Blue) / Medicine (Yellow + toggle) / Order (Green) / Birthday (Pink).

### 4. Authentication Flow
- **Intro**: Auth background, "Join the Pack" / "Welcome Back", Social logins (FB, Tiktok, Google), Links to Terms/Privacy.
- **Registration**: Full name, email, phone, pwd, confirm pwd. Check existence.
- **OTP Verification**: 6-digit separate inputs (dash in middle), Verify/Resend buttons, 30s countdown.
- **Login**: Email, Pwd, Login with FaceID toggle, Forgot password link.
- **Password Recovery**: Forgot (Input email -> OTP) -> Change (New pwd, confirm pwd).

### 5. Profile & Settings
- **Owner & Pet Info**: Avatars with edit camera icon. Profile forms (Name, email, phone, address). Pet forms (Name, breed, gender, age).
- **Records Dashboard**: Sections for Vaccination, Clinic, Grooming, Appointments, Food, Medicine, Orders, Payments, Billing.
- **Record Flatlists**: 
  - *Medical/Food*: Displays date, type, clinic, doctor.
  - *Appointments/Orders*: Displays date, details & **Status** (Upcoming/Yellow, Completed/Green, Cancelled/Red).
- **App Settings**: 
  - Account: Edit profile, Change pwd, Address, Payments, FaceID toggle.
  - Notification: Push/Email toggle.
  - Preferences: Language, Dark mode toggle, Currency.
  - Support: About us, Terms, Privacy, Contact, Version (1.0.0).
- **Payment/Billing Methods**: Flatlist cards. Active (Green), Inactive (Red).

### 6. E-Commerce (Detail, Cart, Checkout)
- **Product Detail**: Header with 'Share' icon. Image carousel (1/5) with 50% 'Sold Out' overlay if empty. Top-right discount %. Name (truncate >2 lines), brand link. Price (Strike-through original, gray discount). Rating badge. Selectors: Weight, Size, Age. Details Tabs. 2-col related products. Fixed bottom Add to Cart bar + Qty (+/-).
- **Shopping Cart**: Item list (swipe left or top-right x to remove). Coupon input + apply button. Order Summary (Subtotal, Shipping, Tax, Total: Primary bold). Checkout button.
- **Checkout**: Shipping Address card, Shipping Method (radios: Standard/Express), Payment Method (radios: Card, Momo, Zalo/VNPay, Paypal). Order Summary & Place Order button.

### 7. Order Journey Flow
- **Success Page**: 100px success icon, titles, delivery & payment summary. "Continue Shopping" button.
- **Order Detail View**: Status actions (Packed -> Cancel, Shipped -> Track, Delivered -> Rate, Cancelled -> Reorder).
- **Tracking Order**: Timeline Milestones (Passed: Primary/Check, Current: Primary/Opacity ring, Future: Gray). Courier Info, copyable tracking #, order item list.
- **Rating Product**: 5-star tap input, Text review box, Upload up to 4 photos (dashed border, delete overlay). Submit button.

### 8. Service Booking
- **Step Layout**: Right-aligned "STEP 1 of 3".
- **Selection Flow**:
  - *Service*: Horizontal scroll cards.
  - *Pet*: Circular avatar selection with check indicator.
  - *Date & Time*: Date picker + Pill-style times (8 AM - 11 PM).
  - *Clinic*: List card (Image, info, border and check on active).
  - *Professional*: List card (Experience, rating, active state).
- **Confirmation**: Special request text area, Est. Total price, Confirm Booking button.

### 9. Content Pages
- **About Us / Privacy Policy / Terms of Service**: Auto-generated text templates. Header with back icon.
