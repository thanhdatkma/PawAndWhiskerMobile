---
description: [AUTO-UPDATED] Business Requirements – Product Detail Page
status: READY
priority: P0
---

# Product Detail Page

**Story (US-PROD-01):** As a Pet Owner, I want to view complete product details including images, price, weight variants, and description, so that I can make an informed purchase decision.

**Story (US-PROD-02):** As a Pet Owner, I want to mark a product as a favorite, so that I can easily find it again later.

**Story (US-PROD-03):** As a Pet Owner, I want to share a product link, so that I can recommend it to other pet owners.

---

## Pre-conditions
- Route: `/product-details/:id` (route param) OR `/product-details?id=:id` (query param — inconsistency, see GAP G1).
- `FavoriteService` is initialized and has loaded favorites from `localStorage`.

## Out of Scope
- Add-to-cart actually modifying `CartState` (wired to log only — **GAP**).
- Related/Recommended products loading (code is commented out — **GAP**).
- Variant-based price/stock update (weight selection updates local `selectedWeight` only — no price change — **GAP**).

---

## Functional Requirements

### FR-PROD-01 — Load Product Detail (`ProductDetailsComponent`)
- On `ngOnInit`, reads product ID from `this.route.snapshot.queryParams['id']` (**not route param**).
- Dispatches `ProductActions.loadProductDetail({ productId: id })`.
- State slice: `product.detail` (`ApiState<ProductDetailModel>`).
- Selector: `selectProductDetail`.
- Subscribes to `productDetail$`; on data arrival sets local `productDetail` and calls `checkFavorite()`.
- Auto-selects first weight: `selectedWeight = productDetail.weights[0]` if no weight yet selected.
- Currently served by mock: `mockData.product_detail`.
- **Expected API:** `GET /api/products/:id` → `ProductDetailModel`.

### FR-PROD-02 — Image Gallery
- `ProductDetailModel.images` is an array; `mainImage` is the primary display.
- `setMainImage(image)` updates `productDetail.mainImage` to the tapped thumbnail.
- Image carousel indicator expected (not verified in TS — check HTML template).

### FR-PROD-03 — Weight Variant Selection
- `productDetail.weights: string[]` provides available options (e.g., `['1kg', '5kg']`).
- `setWeight(weight)` updates `selectedWeight` locally.
- No price change on variant switch (**GAP — variant-specific pricing not modeled**).

### FR-PROD-04 — Quantity Control
- `quantity` starts at `1`.
- `incrementQuantity()` increments; `decrementQuantity()` decrements (min = 1, floor guard applied).

### FR-PROD-05 — Detail Tabs
- `activeTab` starts as `'info'`.
- `setTab(tab)` updates `activeTab`.
- Tab labels rendered in template (verify: `info`, `ingredients`, etc.).

### FR-PROD-06 — Favorite Toggle
- `checkFavorite()` calls `favoriteService.isFavorite(productDetail.id)` and sets `productDetail.isFavorite`.
- `AppHeaderComponent` receives `[showFavorite]="true"` and `[productId]="productDetail.id"`.
- `AppHeaderComponent.onFavoriteClick()` calls `favoriteService.toggleFavorite(productId)`.
- `FavoriteService` persists IDs to `localStorage['favorites']` and emits via `BehaviorSubject<string[]>`.
- `ProductCardComponent` also subscribes to `favoriteService.favorites$` for real-time icon updates.

### FR-PROD-07 — Share Product
- `shareProduct()` uses Web Share API (`navigator.share`).
- If not supported, shows toast: `'Sharing not supported on this browser'`.
- `AppHeaderComponent` receives `[showShare]="true"` and emits `(shareClick)`.

### FR-PROD-08 — Error Handling
- `ProductActions.loadProductDetailFailure` dispatched on HTTP error.
- `ProductEffects.showError$` shows Ionic toast (danger color, 3s, bottom position).

---

## Acceptance Criteria

**AC1 — Product data loads**
- Given I navigate to `/product-details?id=123`
- When the page initializes
- Then `loadProductDetail` is dispatched, store resolves, and the product name, price, images, and weights are rendered.

**AC2 — Image gallery interaction**
- Given the product has multiple images
- When I tap a thumbnail
- Then `setMainImage()` is called and the main image updates.

**AC3 — Weight selection**
- Given a product has weights `['1kg', '5kg']`
- When the page loads
- Then `selectedWeight` defaults to `'1kg'`; tapping `'5kg'` updates the selection visually.

**AC4 — Quantity controls**
- Given the page is loaded
- When I tap `+` or `-`
- Then quantity increments or decrements; it never goes below 1.

**AC5 — Favorite toggle**
- Given I tap the heart icon in the header
- When `toggleFavorite()` fires
- Then the heart icon switches filled/outline AND the state persists across navigation.

**AC6 — Share product**
- Given the device supports the Web Share API
- When I tap the share button
- Then the native share sheet opens with product name and URL.

---

## Dev Tasks (Implemented)

| # | Task | File(s) |
|---|---|---|
| T1 | `ProductDetailModel` with `images[]`, `weights[]`, `breadcrumbs[]`, `isFavorite?` | `models/product-detail.model.ts` |
| T2 | `ProductActions.loadProductDetail` + success/failure | `state/product/product.actions.ts` |
| T3 | `productReducer` — `detail` slice | `state/product/product.reducer.ts` |
| T4 | `ProductEffects.loadProducts$` — mock return | `state/product/product.effects.ts` |
| T5 | `selectProductDetail`, `selectProductDetailLoading` | `state/product/product.selectors.ts` |
| T6 | `ProductService.getProductDetail(id)` — API-ready | `services/product.service.ts` |
| T7 | `FavoriteService` — BehaviorSubject, localStorage, toggle, isFavorite | `services/favorite.service.ts` |
| T8 | `ProductDetailsComponent` — store dispatch, subscription, quantity, tabs, weight, share | `pages/product-details/product-details.component.ts` |
| T9 | `AppHeaderComponent` — `showFavorite`, `productId`, `onFavoriteClick()`, `showShare` | `shared/components/app-header/app-header.component.ts` |
| T10 | `ProductCardComponent` — `onToggleFavorite()` wired to `FavoriteService` | `shared/components/product-card/product-card.component.ts` |

## Gap Analysis
| # | Gap | Severity |
|---|---|---|
| G1 | Route is `/product-details/:id` but component reads `queryParams['id']` — route param is never read | **Critical** |
| G2 | "Add to Cart" button (bottom bar) is in the HTML template but `onAddToCart` is not in the TS (only in HomePageComponent) | High |
| G3 | Weight variant selection does not change price/stock — `ProductDetailModel` has no per-variant pricing | High |
| G4 | `recommendedProducts` is always empty — `loadInitialRecommendations()` is a no-op | Medium |
| G5 | `BreadcrumbModel[]` is hardcoded as local array, not from `productDetail.breadcrumbs` | Low |
| G6 | `isFavorite` is set on local mutable object — not reactive to `FavoriteService.favorites$` after initial set | Medium |
