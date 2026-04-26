---
description: [AUTO-UPDATED] Business Requirements – Categories Master Page
status: READY
priority: P1
---

# Categories Master Page

**Story (US-CAT-01):** As a Pet Owner, I want to browse all product categories in a structured two-panel layout, so that I can quickly find the right category for my pet's needs.

---

## Pre-conditions
- `CategoryState` hydrated from Capacitor Preferences on app boot.
- Store emits categories data on `CategoryActions.loadCategories({})` dispatch.

## Out of Scope
- Deep-link filtering; search currently filters visually via `searchTerm` local variable — no store dispatch (**GAP**).

---

## Functional Requirements

### FR-CAT-01 — Load Category Tree (`CategoriesPageComponent`)
- Dispatches `CategoryActions.loadCategories({})` on `ngOnInit` and on pull-to-refresh.
- State: `CategoryState` (`ApiState<CategoryModel[]>` + `selectedParentId: string | null`).
- `CategoryModel` supports nested children via `children?: CategoryModel[]`.
- Selectors: `selectAllCategories`, `selectSelectedParentId`, `selectSelectedParent`, `selectActiveChildCategories`, `selectCategoriesLoading`.
- **Expected API:** `GET /api/products/categories?parentId=&isQuick=` → `CategoryModel[]`.
- Currently served by mock: `mockData.categories`.

### FR-CAT-02 — Left Panel — Parent Category Selection
- `selectParent(id)` dispatches `CategoryActions.selectParentCategory({ id })`.
- Reducer updates `selectedParentId`; default is first category after successful load.
- `selectedParentId$` drives the visual highlight (active state) on the left sidebar.

### FR-CAT-03 — Right Panel — Child Categories
- `selectActiveChildCategories` selector derives `parent.children` of the active parent.
- `childCategories$` observable is rendered in the right grid.
- Tapping a child category navigates to `/category-detail/:id` (**navigation logic in template, not yet confirmed in TS — verify in HTML**).

### FR-CAT-04 — Search Bar
- `IonSearchbar` binds to `(ionChange)="onSearchChange($event)"`.
- `searchTerm` is a local component property — filtering is not yet dispatched to the store (**GAP — local filter only**).

### FR-CAT-05 — Loading State
- `isLoading$` selector is available; loading spinner should be shown while `loading === true`.

---

## Acceptance Criteria

**AC1 — Two-panel layout on load**
- Given I navigate to `/categories`
- When the page loads
- Then the left panel shows all parent categories and the right panel shows children of the first parent.

**AC2 — Parent selection updates children**
- Given categories are loaded
- When I tap a different parent category
- Then `CategoryActions.selectParentCategory` is dispatched, `selectedParentId` updates, and the right panel re-renders with the new parent's children instantly.

**AC3 — Pull-to-Refresh reloads categories**
- Given I pull down on the page
- When refresh fires
- Then `CategoryActions.loadCategories({})` is dispatched and `event.target.complete()` is called.

**AC4 — Navigate to Category Detail**
- Given I tap a child category
- When navigation fires
- Then the app routes to `/category-detail/:childCategoryId`.

---

## Dev Tasks (Implemented)

| # | Task | File(s) |
|---|---|---|
| T1 | `CategoryActions` — Load, Success, Failure, SelectParent | `state/category/category.actions.ts` |
| T2 | `CategoryReducer` — handles loading, data, selectedParentId | `state/category/category.reducer.ts` |
| T3 | `CategoryEffects` — mock data switchMap | `state/category/category.effects.ts` |
| T4 | Selectors — `selectAllCategories`, `selectSelectedParent`, `selectActiveChildCategories` | `state/category/category.selectors.ts` |
| T5 | `CategoryService.getCategories()` — API-ready, accepts params | `services/category.service.ts` |
| T6 | `CategoryModel` with nested children | `models/categories.model.ts` |
| T7 | `CategoriesPageComponent` — store wiring, refresh, search | `pages/categories/categories.component.ts` |

## Gap Analysis
| # | Gap | Severity |
|---|---|---|
| G1 | `searchTerm` filters locally, not via store dispatch | Medium |
| G2 | Child category tap navigation not confirmed in TS (in HTML template only) | Medium |
| G3 | `CategoryEffects` uses mock `of(mockData.categories)` — real API call commented out | High |
| G4 | Caching strategy (load once vs. reload) not implemented — categories always refetch | Low |
