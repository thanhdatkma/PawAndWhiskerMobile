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
- Ảnh, font, icon dùng có sẵn hoặc bổ sung vào /assets.\* nếu chưa có, không dùng cdn link.
- Standard: Tuân thủ triệt để tài liệu Ionic v8.
- Không giải thích dài dòng, chỉ trả lời code.

# Based on the Sprint Planning strategy and gathered User Stories in the `docs/requirements` directory.

## 🏃 Sprint 1: Foundation & Discovery (Tuần 1 - Tuần 2)

### 1. 🛡️ Auth Flow (`auth-requirement.md`)

- [x] [Done] Implement Welcome screen UI
- [x] [Done] Develop Login & Validation form logic
- [x] [Done] Develop Register & Validation form logic
- [ ] [Todo] [CRITICAL] Replace `AuthService` mock with real API integration (G-CRIT-2)
- [ ] [Todo] [HIGH] Implement HTTP Interceptor for JWT injection (G-HIGH-1)
- [ ] [Todo] [HIGH] Implement AuthGuard for protected routes (G-HIGH-2)
- [ ] [Todo] [HIGH] Sync `AuthService` signals with `UserState` in NgRx (G-MED-2)

### 2. 🔐 Security Verify (`security-requirement.md`)

- [x] [Done] Implement OTP Input Component and Resend logic
- [x] [Done] Develop Forgot/Reset Password flows
- [x] [Done] Navigate to verify success page
- [ ] [Todo] [HIGH] Integrate Security/Accounts API (Replace mocks in Effects)

### 3. 🏠 Home Page (`home-requirement.md`)

- [x] [Done] Create Product/Categories Slider Components
- [x] [Done] Create Section Scroller Component
- [x] [Done] Implement Sticky Header & Bottom Navigation
- [x] [Done] Add `[enableGlobalSearch]` input to `AppHeaderComponent` (FR-HOME-09)
- [x] [Done] Implement `onGlobalSearch()` — navigate to `/category-detail?searchTerm=` (FR-HOME-09)
- [x] [Done] Register parameterless `/category-detail` route in `app.routes.ts` (FR-HOME-09)
- [x] [Done] `ProductOfCategoryComponent` reads `queryParams.searchTerm` and dispatches without categoryId (FR-HOME-09)
- [x] [Done] [HIGH] Implement dynamic product sections (New Arrivals, Deal of Day, Child Categories) linked to Quick Category selection
- [x] [Done] [HIGH] Implement Popup Modal on app load with Image and Shop Now button
- [ ] [Todo] [MED] Wire up "Quick Add to Cart" button to update header badge count
- [ ] [Todo] [MED] Implement Product Card "Rating" button navigation
- [ ] [Todo] [MED] Implement "See All" navigations for Product sections and Latest News
- [ ] [Todo] [LOW] Show toast/feedback when global search is submitted with empty term (G3)
- [x] [Done] [HIGH] Swap all Home Effects from `of(mockData)` to `BaseService` calls (G-HIGH-3)
- [ ] [Todo] [LOW] Fix Refresher logic to complete based on Store state (G-LOW-1)

### 4. 🗂️ Categories Master (`categories-requirement.md`)

- [x] [Done] Build responsive Category Tree Layout
- [x] [Done] Implement synchronized Left Menu & Right Grid interactions
- [ ] [Todo] [HIGH] Swap Category Effects from mock to real API (G-HIGH-3)

### 5. 🔍 Category Detail (`category-detail-requirement.md`)

- [x] [Done] Build Product List grid View
- [x] [Done] Develop Infinity Scroll & Pagination logic
- [x] [Done] Develop basic Filters & Sort functionalities
- [ ] [Todo] [HIGH] Swap ProductList Effects from mock to real API (G-HIGH-3)
- [ ] [Todo] [MED] Configure `hydrationMetaReducer` to skip `productList` persistence (G-MED-3)

---

## 🏃 Sprint 2: E-Commerce & Core Profile (Tuần 3 - Tuần 4)

### 1. 🏷️ Product Detail (`product-detail-requirement.md`)

- [x] [Done] Implement Dynamic Image Slider
- [x] [Done] Develop product Tabs (Description, Reviews)
- [x] [Done] State management handling for the active variant
- [ ] [Todo] [CRITICAL] Fix route mismatch: Change `queryParams['id']` to `params['id']` (G-CRIT-1)
- [ ] [Todo] [HIGH] Swap ProductDetail Effects from mock to real API (G-HIGH-3)
- [ ] [Todo] [HIGH] Implement real API for variant-specific pricing/stock (G-HIGH-6)

### 2. 🛒 Shopping Cart (`shopping-cart-requirement.md`)

- [ ] [Todo] [HIGH] Enable logic to add items to `CartState` (G-HIGH-4/5)
- [ ] [Todo] Develop global Cart State Management UI
- [ ] [Todo] Implement Auto-calculation of subtotal, tax, and total

### 3. 💳 Checkout Checkout (`checkout-requirement.md`)

- [ ] [Todo] Develop Delivery Information/Address Form
- [ ] [Todo] Render Payment Methods selection logic
- [ ] [Todo] Checkout API integration & Data Validation

### 4. 🎉 Order Success & Tracking (`order-success-requirement.md`, `order-tracking-requirement.md`)

- [ ] [Todo] Build Order Success confirmation screen
- [ ] [Todo] Create Interactive Order Timeline Stepper UI
- [ ] [Todo] Connect real-time Order Tracking APIs

### 5. 🐾 User & Pet Profile (`profile-requirement.md`)

- [x] [Done] Create User Profile Dashboard UI
- [ ] [Todo] [HIGH] Implement real API calls for profile updates in `UserService` (G-HIGH-7)
- [ ] [Todo] Build Address Book & Info Edit modal/screens
- [ ] [Todo] Support CRUD capabilities for Pet Information

---

## 🏃 Sprint 3: Core Service Booking & User Retention (Tuần 5 - Tuần 6)

### 1. 📅 Service Booking (`service-booking-requirement.md`)

- [ ] [Todo] Implement State Management for booking sessions
- [ ] [Todo] Build Multi-step form (Service -> Pet -> Time -> Branch -> Staff)
- [ ] [Todo] Integrate Complex Service Booking API

### 2. 🏥 Pet Records (`pet-records-requirement.md`)

- [ ] [Todo] Develop Reusable Pet Record Card Component
- [ ] [Todo] Implement UI pages for Historical Views (Vaccines, Health, Bills)

### 3. 🔔 Alerts & Settings (`settings-alerts-requirement.md`)

- [ ] [Todo] [MED] Merge `FavoriteService` into `FavoritesState` in NgRx (G-MED-1)
- [ ] [Todo] [MED] Ensure `isFavorite` in Product Detail is reactive (G-MED-8)
- [ ] [Todo] Implement Notification Inbox Panel (API-driven)
- [ ] [Todo] Dark mode persistence & Settings page Layout

---

## 🏃 Sprint 4: Backlog, Out of Scope & Gap Integrations (Tuần 7 - Tuần 8)

### 1. 🛡️ Auth & Security Enhancements
**Story (US-GAP-01):** As a User, I want to use modern login methods and have my session securely managed so that my account is safe.
- [ ] [Todo] Implement Biometric login (`onFaceIdLogin`) via Capacitor Biometrics API.
- [ ] [Todo] Implement Social OAuth integration (`onSocialLogin`) (Google, Apple).
- [ ] [Todo] Resolve `AuthService` vs `UserState` dual state source and consolidate.
- [ ] [Todo] Integrate real API for `UserService.getUserProfile()` and `updateProfile()`.
- [ ] [Todo] Implement JWT token management and HTTP interceptor.
- [ ] [Todo] Implement Route guards protecting authenticated-only pages.

### 2. 🗂️ Categories & Search Improvements
**Story (US-GAP-02):** As a Pet Owner, I want accurate search and caching so that my browsing is fast and relevant.
- [ ] [Todo] Fix local `searchTerm` in `CategoriesPageComponent` to dispatch to store.
- [ ] [Todo] Confirm and implement child category tap navigation in component TS.
- [ ] [Todo] Implement caching strategy in `CategoryEffects` (load once vs. reload).

### 3. 🔍 Category Detail & Filters (Dynamic API Integration)
**Story (US-GAP-03):** As a Pet Owner, I want dynamic and accurate filters based on real inventory so that I find exact products.
- [ ] [Todo] Integrate real API for Filter data using `SearchParamsModel` and return `PaginationModel` instead of hardcoded `CategoryService.getFilterState()`.
- [ ] [Todo] Fix multi-category selection capability in product search.
- [ ] [Todo] Dispatch `ProductActions.resetProductList` when navigating away from category details.
- [ ] [Todo] Update `categoryName` to bind dynamically from `CategoryState` instead of hardcoded 'Products'.

### 4. 🏠 Home Page Enhancements
**Story (US-GAP-04):** As a Pet Owner, I want news articles and global search to behave correctly so that I get a smooth experience.
- [ ] [Todo] Implement navigation to article detail on `onNewsArticleClick`.
- [ ] [Todo] Update Home Refresher to complete based on store loading state rather than 1s timeout.
- [ ] [Todo] Show toast/feedback when global search is submitted with an empty term.

### 5. 🏷️ Product Detail Enhancements
**Story (US-GAP-05):** As a Pet Owner, I want accurate product interactions (add to cart, variants) so that my purchase is precise.
- [ ] [Todo] Implement real Add-to-Cart logic in `ProductDetailsComponent` to modify `CartState`.
- [ ] [Todo] Implement variant-based price/stock updates from API when weight variant changes.
- [ ] [Todo] Fetch and display Related/Recommended products dynamically via API.
- [ ] [Todo] Make `BreadcrumbModel[]` dynamic based on `productDetail.breadcrumbs`.
- [ ] [Todo] Ensure `isFavorite` is fully reactive to `FavoriteService.favorites$` state.

### 6. 🐾 Profile Completeness
**Story (US-GAP-06):** As a User, I want to edit my profile, view order history, and manage addresses so that my account is up to date.
- [ ] [Todo] Build Profile Edit form and connect to `updateProfile` API.
- [ ] [Todo] Wire up Order history, Saved Addresses, and Payment Methods to their respective routes.
- [ ] [Todo] Fetch real Pet health data (`nextVaccine`, etc.) from API instead of mock data.

### 7. 🔔 Notifications & Alerts (Dynamic API Integration)
**Story (US-GAP-07):** As a User, I want real-time, actionable notifications so that I don't miss important pet health or order updates.
- [ ] [Todo] Integrate real API for `NotificationService` to fetch dynamic alerts.
- [ ] [Todo] Implement Push notification integration (Firebase Cloud Messaging / APNs).
- [ ] [Todo] Implement per-item `markAsRead(id)` trigger on interaction.
- [ ] [Todo] Add action handlers for interactive notifications (`isInteractive: true`).
