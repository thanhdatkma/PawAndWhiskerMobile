---
description: [AUTO] Master Requirements Index – Paws & Whiskers Mobile App
generated: 2026-04-26
stack: Ionic / Angular / NgRx
source: /src (frontend only, reverse-engineered)
---

# Paws & Whiskers — Requirements Master Index

> **Scope:** Frontend-only analysis of `/src`. All User Stories are backend-agnostic — requirements describe what the frontend *expects* from any backend (REST, GraphQL, Supabase, etc.).

---

## Module Map

```
src/app/
├── pages/                   # Smart (page-level) components
│   ├── home/                → US-HOME-01
│   ├── login/               → US-AUTH-02
│   ├── register/            → US-AUTH-01
│   ├── forgot-password/     → US-AUTH-03
│   ├── verify-code/         → US-AUTH-04
│   ├── verify-successed/    → US-AUTH-04
│   ├── categories/          → US-CAT-01
│   ├── product-of-category/ → US-CATD-01, US-CATD-02
│   ├── product-details/     → US-PROD-01..03
│   ├── alerts/              → US-ALERT-01..02
│   ├── profile/             → US-PROF-01..03
│   ├── user-profile/        → US-PROF-02..03
│   ├── filter-sort/         → US-CATD-02
│   ├── terms-conditions/    (static)
│   └── privacy-policy/      (static)
├── shared/components/       # Dumb (presentational) components
│   ├── app-header/          → scroll-aware, search, cart, share, favorite
│   ├── banner-slider/       → US-HOME-01 FR-HOME-01
│   ├── quick-category-grid/ → US-HOME-01 FR-HOME-02
│   ├── product-card/        → US-PROD-02 (favorite toggle)
│   ├── product-section/     → US-HOME-01 FR-HOME-03..04
│   ├── promo-banner/        → US-HOME-01 FR-HOME-04
│   ├── news-feed/           → US-HOME-01 FR-HOME-05
│   ├── notification-card-item/ → US-ALERT-01
│   ├── community-alerts/    → US-ALERT-01
│   ├── search-bar/          → US-CATD-02 FR-CATD-03
│   └── base-component/      → BaseComponent (abstract)
├── state/                   # NgRx feature stores
│   ├── home/                actions, effects, reducer, selectors
│   ├── product/             actions, effects, reducer, selectors (8 sub-slices)
│   ├── category/            actions, effects, reducer, selectors
│   ├── order/               actions, effects, reducer, selectors
│   └── checkout/            actions, effects, reducer, selectors
├── services/
│   ├── auth.service.ts      → signals + localStorage (NOT NgRx)
│   ├── base.service.ts      → abstract HTTP base (get, post)
│   ├── category.service.ts  → getCategories, getProductByCategories, getFilterState
│   ├── checkout.service.ts  → submitCheckout
│   ├── config.service.ts    → appsettings.json loader, dark mode, currency
│   ├── favorite.service.ts  → BehaviorSubject + localStorage
│   ├── home.service.ts      → getNewsFeed
│   ├── notification.service.ts → BehaviorSubject + localStorage
│   ├── order.service.ts     → getOrders, submitOrder
│   ├── product.service.ts   → getProductDetail, getNewArrivals, getDealOfToday, getNewComment, getDogProducts, getCatProducts, getSlideImages, getPopupBanners
│   ├── storage.service.ts   → Capacitor Preferences wrapper
│   ├── tab.service.ts       → active tab BehaviorSubject
│   └── user.service.ts      → getUserProfile, updateProfile (HTTP, not used)
├── models/                  # TypeScript interfaces
│   ├── api-state.model.ts   → ApiState<T> { data, loading, error }
│   ├── app-state.model.ts   → AppState, all initial states, PERSISTED_SLICE_KEYS
│   ├── categories.model.ts  → CategoryModel (nested children)
│   ├── checkout.model.ts    → Checkout, CheckoutResponse
│   ├── news-brief.model.ts  → NewsBriefModel
│   ├── notification.model.ts → NotificationModel (4 types)
│   ├── order.model.ts       → Order
│   ├── pagination.model.ts  → PaginationModel<T>
│   ├── product-brief.model.ts → ProductBriefModel
│   ├── product-detail.model.ts → ProductDetailModel
│   ├── search-params.model.ts → SearchParamsModel
│   ├── slides.model.ts      → SlideModel
│   ├── tab.model.ts         → TabType
│   ├── user-profile.model.ts → UserProfile, Pet
│   └── ...
├── pipes/
│   ├── currency-pipe.ts     → appCurrency (reads ConfigService)
│   ├── sold-count-pipe.ts   → soldCount (1.1k format)
│   └── sort-label.pipe.ts   → sortLabel
└── enums/
    └── filter.enum.ts       → FilterTab, SortType, SORT_OPTIONS_MAP
```

---

## User Story Registry

| ID | Story | Priority | Status | Requirement File |
|---|---|---|---|---|
| US-HOME-01 | Pet Owner browses Home Page | P0 | READY | [home-requirement.md](home-requirement.md) |
| US-AUTH-01 | Guest registers an account | P0 | READY | [auth-requirement.md](auth-requirement.md) |
| US-AUTH-02 | User logs in | P0 | READY | [auth-requirement.md](auth-requirement.md) |
| US-AUTH-03 | User resets password | P1 | READY | [auth-requirement.md](auth-requirement.md) |
| US-AUTH-04 | User verifies OTP | P1 | READY | [auth-requirement.md](auth-requirement.md) |
| US-CAT-01 | User browses categories tree | P1 | READY | [categories-requirement.md](categories-requirement.md) |
| US-CATD-01 | User browses paginated product list by category | P1 | READY | [category-detail-requirement.md](category-detail-requirement.md) |
| US-CATD-02 | User searches and filters products | P1 | READY | [category-detail-requirement.md](category-detail-requirement.md) |
| US-PROD-01 | User views product detail | P0 | READY | [product-detail-requirement.md](product-detail-requirement.md) |
| US-PROD-02 | User favorites a product | P1 | READY | [product-detail-requirement.md](product-detail-requirement.md) |
| US-PROD-03 | User shares a product | P2 | READY | [product-detail-requirement.md](product-detail-requirement.md) |
| US-ALERT-01 | User views pet/order/promo alerts | P1 | READY | [settings-alerts-requirement.md](settings-alerts-requirement.md) |
| US-ALERT-02 | User sees unread badge count | P1 | READY | [settings-alerts-requirement.md](settings-alerts-requirement.md) |
| US-PROF-01 | Guest sees login/register prompt | P1 | READY | [profile-requirement.md](profile-requirement.md) |
| US-PROF-02 | Logged-in user views profile | P1 | READY | [profile-requirement.md](profile-requirement.md) |
| US-PROF-03 | Logged-in user logs out | P1 | READY | [profile-requirement.md](profile-requirement.md) |
| US-CART-01 | User manages shopping cart | P0 | ⚠️ PENDING | [shopping-cart-requirement.md](shopping-cart-requirement.md) |
| US-ORDER-01 | User views order history | P1 | ⚠️ PENDING | [order-tracking-requirement.md](order-tracking-requirement.md) |
| US-CHECKOUT-01 | User submits checkout | P0 | ⚠️ PENDING | [checkout-requirement.md](checkout-requirement.md) |

---

## NgRx State Architecture

| Store Slice | Type | Persisted | Source |
|---|---|---|---|
| `cart` | `CartState` | ✅ Yes | — (no effects implemented) |
| `favorites` | `FavoritesState` | ✅ Yes | — (managed by FavoriteService, not effects) |
| `user` | `UserState` | ✅ Yes | — (managed by AuthService signals) |
| `product` | `ProductState` (8 sub-slices) | ✅ Yes | `ProductEffects` |
| `productList` | `ProductListState` | ✅ Yes | `ProductEffects` |
| `category` | `CategoryState` | ✅ Yes | `CategoryEffects` |
| `order` | `OrderState` | — | `OrderEffects` |
| `checkout` | `CheckoutState` | — | `CheckoutEffects` |
| `home` | `HomeState` | ✅ Yes | `HomeEffects` |

### Meta-reducers (order matters)
1. `transientMetaReducer` — clears `loading`, `error`, `isSubmitting` on `@ngrx/store/init`.
2. `hydrationMetaReducer` — hydrates from Capacitor Preferences on init, persists on every action.

---

## Cross-cutting Infrastructure

| Concern | Implementation | File(s) |
|---|---|---|
| HTTP base layer | `BaseService` (abstract) with `get<T>()`, `post<T>()`, dynamic `baseUrl` from `ConfigService` | `services/base.service.ts` |
| App settings | `ConfigService` loads `assets/settings/appsettings.config.json` on app init | `services/config.service.ts` |
| State persistence | Capacitor Preferences via `hydrationMetaReducer`; `PERSISTED_SLICE_KEYS` controls what is saved | `shared/meta-reducers/hydration.metareducer.ts` |
| Storage helper | `StorageService` wraps `@capacitor/preferences` | `services/storage.service.ts` |
| Currency display | `appCurrency` pipe reads active currency from `ConfigService` | `pipes/currency-pipe.ts` |
| Sold count format | `soldCount` pipe formats e.g. `1150 → 1.1k` | `pipes/sold-count-pipe.ts` |
| Scroll sync | `ScrollService.scrollY$` (BehaviorSubject) → `AppHeaderComponent` shrinks/expands | `core/services/scroll.service.ts` |
| Tab tracking | `TabService.activeTab$` drives search bar visibility per tab | `services/tab.service.ts` |
| Error toasts | All `*Failure` effects show `IonToast` (danger, 3s, bottom) | All `*.effects.ts` |
| Base component | `BaseComponent` (abstract Directive) provides nav, loader, toast, alert, store, scroll | `shared/components/base-component/base.component.ts` |

---

## Consolidated Gap Analysis (All Modules)

| # | Gap | Module | Severity |
|---|---|---|---|
| **G-CRIT-1** | Product detail reads `queryParams['id']` but route is `/product-details/:id` (route param) | Product Detail | **Critical** |
| **G-CRIT-2** | `AuthService.login()` uses mock data — no real API call | Auth | **Critical** |
| **G-HIGH-1** | No JWT token / HTTP interceptor for authenticated API calls | Auth | High |
| **G-HIGH-2** | No `AuthGuard` protecting routes like profile, orders, checkout | Auth | High |
| **G-HIGH-3** | `CategoryEffects` & most `ProductEffects` use `of(mockData.*)` — real API commented out | All features | High |
| **G-HIGH-4** | `CartState` is defined in store but no effects, no UI to add/view cart items | Cart | High |
| **G-HIGH-5** | `onAddToCart()` in `HomePageComponent` and `ProductDetailsComponent` only logs to console | Cart | High |
| **G-HIGH-6** | Filter state (brands, pricing, tags) is hardcoded mock — not fetched from API | Category Detail | High |
| **G-HIGH-7** | Edit profile, Order History, Addresses, Payment Methods are menu items without implementation | Profile | High |
| **G-MED-1** | `FavoritesState` in NgRx is declared but `FavoriteService` manages its own `localStorage` + BehaviorSubject — dual state | Favorites | Medium |
| **G-MED-2** | `UserState` in NgRx is declared but `AuthService` uses Angular signals + `localStorage` — dual state | Auth | Medium |
| **G-MED-3** | `ProductListState` is persisted — stale paginated data loads on app restart | Category Detail | Medium |
| **G-MED-4** | `ProductActions.resetProductList` defined but never dispatched | Category Detail | Medium |
| **G-MED-5** | `onSeeAll()` in HomePageComponent logs only — no navigation | Home | Medium |
| **G-MED-6** | `onCategorySelect()` sets `activeId` but does not navigate to category detail | Home | Medium |
| **G-MED-7** | `onNewsArticleClick()` logs only — no article detail page | Home | Medium |
| **G-MED-8** | `isFavorite` on product detail is not reactive after initial `checkFavorite()` | Product Detail | Medium |
| **G-MED-9** | `recommendedProducts` is always empty — `loadInitialRecommendations()` is a no-op | Product Detail | Medium |
| **G-LOW-1** | Home refresher completes on fixed 1s timeout, not when loading finishes | Home | Low |
| **G-LOW-2** | Deal-of-Day, New-Comments, Popup-Banner actions exist but dispatches commented out | Home | Low |
| **G-LOW-3** | Category search (`searchTerm`) filters locally only — not dispatched to store | Categories | Low |
| **G-LOW-4** | `categoryName` in `ProductOfCategoryComponent` is hardcoded `'Products'` | Category Detail | Low |
