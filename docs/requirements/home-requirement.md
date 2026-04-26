---
description: [AUTO-UPDATED] Business Requirements – Home Page
status: READY
priority: P0
---

# Home Page

**Story (US-HOME-01):** As a Pet Owner, I want to access a rich Home Page so that I can browse promotional banners, quick-access categories, new arrivals, species-specific product sections, and the latest community news — all in one scroll.

**Story (US-HOME-02):** As a Pet Owner, I want to search for products from any tab using the top search bar so that I can quickly find what I need without navigating to the category screen first.

---

## Pre-conditions

- App settings (`appsettings.config.json`) are loaded by `ConfigService` before rendering.
- NgRx store is hydrated from Capacitor Preferences via `hydrationMetaReducer`.

## Out of Scope

- Cart management (handled in shopping-cart-requirement).

---

## Functional Requirements

### FR-HOME-01 — Banner Slider

- The Home Page dispatches `ProductActions.loadSliderImages()` on `ngOnInit`.
- State slice: `product.slider` (`ApiState<SlideModel[]>`).
- Selector: `selectProductSlider`.
- Component: `BannerSliderComponent` receives `[banners]` input via `AsyncPipe`.
- **Expected API:** `GET /api/products/slides` → `SlideModel[]`.
- Currently served by mock: `mockData.banners`.

### FR-HOME-02 — Quick Category Grid

- Dispatches `CategoryActions.loadCategories({ isQuick: true })` on init.
- State slice: `category` (`CategoryState`), selector `selectAllCategories`.
- Component: `QuickCategoryGridComponent` receives `[categories]` and emits `(categorySelect)`.
- The Home component sets `activeId` on selection. By default, the 1st item is active.
- Clicking a category icon navigates to `/category-detail/:parentId`.

### FR-HOME-03 — Dynamic Product Sections

- The sections displayed below the Quick Category Grid depend on the active category selected.
- **1st Section (New Arrivals):**
  - Loads 10 items for new products based on the active category selected.
  - Update API params: pass category ID to get new products based on the category. If no params are passed, default to loading 10 items for the latest time created.
  - Clicking "See all" navigates to the product-list in that category.
- **2nd Section (Deal of the Day):**
  - Displays with the same logic as New Arrivals.
- **3rd Section Onward (Child Categories):**
  - Displays up to 10 child category sections of the selected active category, with each section showing up to 10 items.
- Promo banners for Dog and Cat categories need to call an API for dynamic display, allowing users to change them.

### FR-HOME-04 — News Feed (Latest News)

- Dispatches `HomeActions.loadNewsFeed()`.
- State slice: `home.newsFeed` (`ApiState<NewsBriefModel[]>`).
- Selector: `selectNewsFeed`.
- Component: `NewsFeedComponent` with `[maxItems]="5"`.
- Clicking "See all" navigates to the list of news page.
- Clicking an article logs only — no navigation to article detail (**GAP**).

### FR-HOME-05 — Popup Banner Modal

- Implement a popup modal to display when accessing the Home Page.
- Modal includes an image, a "Close" button, a URL, and a "Shop Now" button to navigate based on the URL.

### FR-HOME-06 — Product Card Interactions

- Clicking `product-card__add-btn` quickly adds the product to the cart and updates the cart count (badge) on the `app-header`.
- Clicking `product-card__rating` button navigates to the rating page.

### FR-HOME-07 — Pull-to-Refresh

- `IonRefresher` triggers `handleRefresh()` which re-dispatches all load actions.
- Completes the refresher after 1 second (hardcoded timeout — **GAP**: should complete on loading done).

### FR-HOME-09 — Global Search Bar (App Header)

- The `AppHeaderComponent` exposes `[enableGlobalSearch]` input (`boolean`, default `false`).
- When `enableGlobalSearch = true` and the user submits a search term:
  - Calls `onGlobalSearch(term: string)` which trims the term.
  - Navigates to `/category-detail` (no `:id`) with `{ queryParams: { searchTerm: term } }`.
- The shared header in `TabsPage` sets `[enableGlobalSearch]="true"`.
- `ProductOfCategoryComponent` reads `queryParamMap.get('searchTerm')` on init.
- When `searchTerm` is present but no `categoryId`, dispatches `loadProductsByCategory({ categoryIds: [], searchTerm })`.
- A dedicated route `/category-detail` (without `:id`) is registered before `/category-detail/:id` in `app.routes.ts`.
- **Expected API:** same `GET /api/products/categories/search` endpoint, `categoryIds` omitted.

### FR-HOME-08 — Scroll-aware Header

- `handleScroll($event)` propagates `scrollTop` to `ScrollService`.
- `AppHeaderComponent` subscribes to `scrollService.scrollY$` and shrinks when `accumulatedDelta > 20`.

---

## Acceptance Criteria

**AC1 — Banner loads and displays**

- Given the Home page opens
- When `product.slider.loading` resolves
- Then the banner slider renders all slides from the store.
- Clicking a shop now" button navigates to routerLink config in slide model

**AC2 — Quick Categories appear**

- Given categories are loaded with `isQuick: true`
- When displayed in the grid
- Then only quick-flagged categories show; tapping one highlights it.
- Clicking a category navigates to category detail page.

**AC3 — Dynamic Product sections render**

- Given product data is in the store
- When the user scrolls below the categories
- Then New Arrivals, Deal of the Day, and Child Category sections display horizontally scrollable lists based on the active category.

**AC4 — Popup Modal displays on load**

- Given the user opens the Home page
- When the page finishes loading
- Then a popup modal appears with an image and a "Shop Now" button.
- Tapping the Close button dismisses the popup.

**AC5 — Product card interactions**

- Given a product card is displayed
- When `(cardClick)` fires, then the app navigates to `/product-details/:id`.
- When the add-to-cart button is tapped, then the product is quickly added to the cart and the header badge count increments.
- When the rating button is tapped, then the app navigates to the rating page.

**AC6 — Global search navigates to product list**

- Given I type a search term in the app header search bar
- When I submit the search
- Then the app navigates to `/category-detail?searchTerm=<term>` and the product list loads results matching the term without requiring a category ID.

**AC7 — Pull-to-Refresh reloads all data**

- Given the user pulls down
- When refresh completes
- Then all store slices reload their data.

---

## Dev Tasks (Implemented)

| #   | Task                                                            | File(s)                            |
| --- | --------------------------------------------------------------- | ---------------------------------- |
| T1  | Dispatch store actions on `ngOnInit`                            | `home.component.ts`                |
| T2  | Wire all observables from store via `AsyncPipe`                 | `home.component.html`              |
| T3  | Handle `onProductClick` → navigate                              | `home.component.ts`                |
| T4  | `HomeActions` / `HomeEffects` / `HomeReducer` / `HomeSelectors` | `state/home/*`                     |
| T5  | `HomeService.getNewsFeed()` (API-ready endpoint)                | `home.service.ts`                  |
| T6  | `ProductActions` for newArrivals, dogFood, catFood, slider      | `state/product/product.actions.ts` |
| T7  | Effects return mock data via `of(mockData.*)`                   | `state/product/product.effects.ts` |
| T8  | `NewsBriefModel`, `SlideModel`, `PopupBannerModel`              | `models/*`                         |
| T9  | `AppHeaderComponent.onGlobalSearch()` + `[enableGlobalSearch]` input | `app-header.component.ts`     |
| T10 | `/category-detail` route (no `:id`) registered in `app.routes.ts`   | `app.routes.ts`               |
| T11 | `ProductOfCategoryComponent` reads `queryParams.searchTerm` on init  | `product-of-category.component.ts` |

## Gap Analysis

| #   | Gap                                                                         | Severity |
| --- | --------------------------------------------------------------------------- | -------- |
| G1  | `onNewsArticleClick` has no navigation                                      | Medium   |
| G2  | Refresher completes on fixed 1s timeout, not on store loading state         | Low      |
| G3  | Empty search term in global search bar does not trigger any feedback/toast  | Low      |
