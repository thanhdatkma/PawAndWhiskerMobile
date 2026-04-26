---
description: [AUTO-UPDATED] Business Requirements – Category Detail (Product List)
status: READY
priority: P1
---

# Category Detail — Product List Page

**Story (US-CATD-01):** As a Pet Owner, I want to browse a paginated list of products within a specific category, so that I can find and compare items before purchasing.

**Story (US-CATD-02):** As a Pet Owner, I want to search and filter products within a category, so that I can quickly narrow down to exactly what I need.

---

## Pre-conditions
- Route param `:id` (category ID) is provided via `/category-detail/:id`.
- `ProductListState` is reset via `ProductActions.resetProductList` when navigating away (not currently implemented — **GAP**).

## Out of Scope
- Multi-category selection (currently single `categoryId` from route param).
- Brand/tag filters are static mock data from `CategoryService.getFilterState()` — not fetched from API.

---

## Functional Requirements

### FR-CATD-01 — Initial Product Load (`ProductOfCategoryComponent`)
- Reads `categoryId` from `this.route.snapshot.paramMap.get('id')`.
- Dispatches `ProductActions.loadProductsByCategory({ categoryIds: [categoryId], page: 1, perPage: 10, searchTerm: '' })`.
- State slice: `productList` (`ProductListState`).
- Selectors: `selectProductList`, `selectProductListLoading`, `selectProductListHasMore`, `selectProductListCurrentPage`.
- **Expected API:** `GET /api/products/categories/search` with query params `categoryIds`, `page`, `perPage`, `searchTerm`, `sortBy`, `sortDirection`.
- Currently served by mock with category-ID prefix logic (`1-*` → dog, `2-*` → cat).

### FR-CATD-02 — Infinite Scroll Pagination
- `IonInfiniteScroll` triggers `loadData(event)`.
- Reads `currentPage` from store via `currentPage$.pipe(take(1))`.
- Dispatches next page (`page + 1`) with current `filterState` params.
- New page items are appended: reducer uses `pageIndex === 1 ? items : [...state.data, ...items]`.
- Infinite scroll completes when `hasMore$ === false`.

### FR-CATD-03 — Debounced Search
- `AppHeaderComponent` emits `(searchChange)` to `onSearchChange(value)`.
- Value is pushed to `Subject<string> searchSubject`.
- `searchSubject.pipe(debounceTime(500), distinctUntilChanged())` dispatches `loadProductsByCategory` with `page: 1` and new `searchTerm`.
- Resets page to 1 on new search; reducer clears `data` when `page === 1`.

### FR-CATD-04 — Filter & Sort Modal (`FilterSortComponent`)
- `openFilterSort(tab)` creates an `IonModal` (sheet) presenting `FilterSortComponent`.
- `FilterTab` enum: `BRANDS`, `PRICING`, `TAGS`, `SORT`.
- `SortType` enum: `DEFAULT`, `PRICE_ASC`, `PRICE_DESC`, `BRAND_ASC`, `BRAND_DESC`.
- On modal dismiss with `data.filterState`, calls `applyFilters()`.
- `applyFilters()` maps sort enum to `sortBy` (`'price'` or `'name'`) and `sortDirection` (`'asc'`/`'desc'`), then dispatches `loadProductsByCategory`.
- Filter badge count shown via `getFilterCount(type)`.
- Filter state initialized from `CategoryService.getFilterState()` (static mock — **GAP**).

### FR-CATD-05 — Pull-to-Refresh
- Resets `page` to 1 and dispatches `loadProductsByCategory`.
- Completes refresher when `isLoading$` emits `false`.

### FR-CATD-06 — Scroll-aware Filter Bar
- Subscribes to `scrollService.filterHidden$`; sets `isFilterHidden` flag.
- Filter/sort toolbar animates in/out based on scroll direction (CSS-driven).

### FR-CATD-07 — Product Card Navigation
- `viewProduct(id)` calls `this.navigate('/product-details', { id })` — passes `id` as **query param** (not route param).
- ⚠️ **GAP:** `ProductDetailsComponent` reads `this.route.snapshot.queryParams['id']` but the route is `/product-details/:id` (route param), so the product ID may be undefined.

---

## Acceptance Criteria

**AC1 — Products load on entry**
- Given I navigate to `/category-detail/1-dog-food`
- When the page initializes
- Then a paginated list of products for that category loads from the store.

**AC2 — Infinite scroll appends products**
- Given page 1 is loaded and `hasMore === true`
- When I scroll to the bottom
- Then page 2 is dispatched and products are appended without losing page 1 items.

**AC3 — Search debounces correctly**
- Given I type "organic" in the search bar
- When 500ms pass without further typing
- Then `loadProductsByCategory` is dispatched with `searchTerm: 'organic'`, page reset to 1.

**AC4 — Sort by price works**
- Given I open the sort modal and select "Price: Low to High"
- When the modal dismisses
- Then `loadProductsByCategory` is dispatched with `sortBy: 'price'`, `sortDirection: 'asc'`.

**AC5 — Filter count badge**
- Given I have selected 2 brands in the filter
- When I return to the product list
- Then the Brands filter button shows a badge with count `2`.

---

## Dev Tasks (Implemented)

| # | Task | File(s) |
|---|---|---|
| T1 | `ProductListState` — paginated state shape | `models/app-state.model.ts` |
| T2 | `ProductActions.loadProductsByCategory` + `resetProductList` | `state/product/product.actions.ts` |
| T3 | `productListReducer` — append vs. replace logic | `state/product/product.reducer.ts` |
| T4 | `ProductEffects.loadProductsByCategory$` — mock with sort/search/pagination | `state/product/product.effects.ts` |
| T5 | Selectors — `selectProductList`, `selectProductListHasMore`, `selectProductListCurrentPage` | `state/product/product.selectors.ts` |
| T6 | `SearchParamsModel`, `PaginationModel<T>` | `models/search-params.model.ts`, `models/pagination.model.ts` |
| T7 | `CategoryService.getProductByCategories()`, `getFilterState()` | `services/category.service.ts` |
| T8 | `ProductOfCategoryComponent` — full store integration, infinite scroll, search debounce | `pages/product-of-category/product-of-category.component.ts` |
| T9 | `FilterSortComponent` — modal with tabs, sort, reset, apply | `pages/filter-sort/filter-sort.component.ts` |
| T10 | `FilterTab`, `SortType`, `SORT_OPTIONS_MAP` enums | `enums/filter.enum.ts` |
| T11 | `SortLabelPipe` | `pipes/sort-label.pipe.ts` |

## Gap Analysis
| # | Gap | Severity |
|---|---|---|
| G1 | `viewProduct(id)` passes ID as query param but route expects route param → product detail page may not receive correct ID | **Critical** |
| G2 | Filter data (brands, pricing, tags) is hardcoded in `CategoryService.getFilterState()` — not from API | High |
| G3 | `ProductListState` is persisted to Capacitor Preferences (in `PERSISTED_SLICE_KEYS`) — stale paginated data may load on app restart | Medium |
| G4 | `ProductActions.resetProductList` is defined but never dispatched on page leave | Medium |
| G5 | `categoryName` is hardcoded as `'Products'` — should come from category state | Low |
| G6 | Real API call in `loadProductsByCategory$` effect is commented out | High |
