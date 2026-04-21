# Tech Stack: Ionic, Capacitor, Angular, Tailwind.
# Design System: Follow in @design-updated.md
# Coding Standard: Clean Code, SOLID, Enum-driven logic.- See `@dev/rules/stack/frontend.md`
# Structure: Follow in @structure.md
# Development Tasks Allocation
# Ionic Coding Standards
# Ionic Coding Standards
- No Native HTML: Cấm dùng div, button, span, img thuần. Phải dùng ion-grid, ion-button, ion-text, ion-img.

- Ionic Component Only: Sử dụng 100% ion-{component} từ https://ionicframework.com/docs/components

- Style: Cấm lạm dụng Tailwind class cho layout. Phải dùng Ionic CSS Variables (--background, --color) và SASS local -sê https://ionicframework.com/docs/theming/css-variables

- Structure: ion-header (Top), ion-content (Body), ion-tab-bar[slot="bottom"] (Nav).
- Ảnh, font, icon dùng có sẵn hoặc bổ sung vào /assets.* nếu chưa có, không dùng cdn link.
- Standard: Tuân thủ triệt để tài liệu Ionic v8.
- Không giải thích dài dòng, chỉ trả lời code.
# Based on the Sprint Planning strategy and gathered User Stories in the `docs/requirements` directory.

## 🏃 Sprint 1: Foundation & Discovery (Tuần 1 - Tuần 2)

### 1. 🛡️ Auth Flow (`auth-requirement.md`)
- [x] [Done] Implement Welcome screen UI (Slider, Graphics)
- [x] [Done] Develop Login & Validation form logic
- [x] [Done] Develop Register & Validation form logic
- [ ] [Todo] Integrate Authentication API and Token Interceptors
- [ ] [Todo] Write Unit/E2E UI tests for Auth module

### 2. 🔐 Security Verify (`security-requirement.md`)
- [x] [Done] Implement OTP Input Component and Resend logic
- [x] [Done] Develop Forgot/Reset Password flows
- [x] [Done] Create/Integrate Navigate to verify successed page after verified otp done
- [ ] [Todo] Integrate Security/Accounts API
- [ ] [Todo] Add Error Error Handling & Token expiration logic

### 3. 🏠 Home Page (`home-requirement.md`)
- [x] [Done] Create Product/Categories Slider Components — `BannerSliderComponent`, `QuickCategoryGridComponent`
- [x] [Done] Create Section Scroller Component — `ProductSectionComponent` + `ProductCardComponent`
- [ ] [Todo] Integrate Home Dashboard API — mock data in place, swap with NgRx selectors
- [x] [Done] Implement Sticky Header & Bottom Navigation bar consistency — `AppHeaderComponent` (upgraded), `BottomNavComponent`

### 4. 🗂️ Categories Master (`categories-requirement.md`)
- [x] [Done] Build responsive Category Tree Layout
- [x] [Done] Implement synchronized Left Menu & Right Grid interactions
- [ ] [Todo] Integrate Master Categories APIs
- [ ] [Todo] Caching strategy for category data


### 5. 🔍 Category Detail (`category-detail-requirement.md`)
- [x] [Done] Implement generic Product Card UI
- [x] [Done] Build Product List grid View
- [x] [Done] Develop Infinity Scroll & Pagination logic
- [x] [Done] Develop basic Filters & Sort functionalities
 ### 6. Terms & Privacy Policy
- [x] [Done] Terms & Privacy Policy
- [x] [Done] Privacy Policy
---

## 🏃 Sprint 2: E-Commerce & Core Profile (Tuần 3 - Tuần 4)

### 1. 🏷️ Product Detail (`product-detail-requirement.md`)
- [x] [Done] Implement Dynamic Image Slider & Image Zoom functions
- [x] [Done] Develop product Tabs (Description, Reviews)
- [x] [Done] Implement Complex Variants logic (Size, Color)
- [x] [Done] State management handling for the active variant

### 2. 🛒 Shopping Cart (`shopping-cart-requirement.md`)
- [ ] [Todo] Develop global Cart State Management (Services/NgRx)
- [ ] [Todo] Build Cart List UI and item counter adjustments
- [ ] [Todo] Implement Auto-calculation of subtotal, tax, and total
- [ ] [Todo] Incorporate Discount/Voucher apply functionalities

### 3. 💳 Checkout Checkout (`checkout-requirement.md`)
- [ ] [Todo] Develop Delivery Information/Address Form
- [ ] [Todo] Render Payment Methods selection logic
- [ ] [Todo] Finalize Order Summary panel
- [ ] [Todo] Checkout API integration & Data Validation

### 4. 🎉 Order Success & Tracking (`order-success-requirement.md`, `order-tracking-requirement.md`)
- [ ] [Todo] Build Order Success confirmation screen
- [ ] [Todo] Create Interactive Order Timeline Stepper UI
- [ ] [Todo] Connect real-time or polling Order Tracking APIs

### 5. 🐾 User & Pet Profile (`profile-requirement.md`)
- [x] [Done] Create User Profile Dashboard UI
- [ ] [Todo] Implement Avatar Camera & Upload functionalities
- [ ] [Todo] Build Address Book & Info Edit modal/screens
- [ ] [Todo] Support CRUD capabilities for Pet Information

---

## 🏃 Sprint 3: Core Service Booking & User Retention (Tuần 5 - Tuần 6)

### 1. 📅 Service Booking (`service-booking-requirement.md`)
- [ ] [Todo] Implement robust State Management for temporary booking sessions
- [ ] [Todo] Build Multi-step form (Service -> Pet -> Time -> Branch -> Staff)
- [ ] [Todo] Implement Calendar & Time Slots picker UI
- [ ] [Todo] Integrate Complex Service Booking API

### 2. 🏥 Pet Records (`pet-records-requirement.md`)
- [ ] [Todo] Develop highly Reusable Pet Record Card Component
- [ ] [Todo] Implement UI pages for Historical Views (Vaccines, Health, Bills)
- [ ] [Todo] Ensure proper API hydration across 5 distinct endpoints

### 3. 🔔 Alerts & Settings (`settings-alerts-requirement.md`)
- [ ] [Todo] Implement Notification Inbox Panel/Screen
- [ ] [Todo] Create unified Settings page Layout (Theme, Privacy, Account)
- [ ] [Todo] Toggle functionality configurations (Dark mode persistence)
- [ ] [Todo] Save user preference data back to API/Local Storage
