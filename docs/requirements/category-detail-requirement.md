---
description: [MANUAL] Yêu cầu nghiệp vụ cho Category Detail List Page
---
**Title:** Category Detail List Implementation
**Story:** As a Pet Owner, I want to view a full list of products belonging to a specific category so that I can browse, search, and find items to buy.

### Impact Analysis
- **UI Components:**
  - Header & Bottom Navigation (Shared).
  - Search Bar: Stuck under the header for quick in-category searching.
  - Sorting & Filtering Bar: (Optional, UI placeholder) for sorting by price, name, etc.
  - Product Grid: 2 columns layout displaying detailed product items.
  - Product Item Card: Contains thumbnail, title, price, discount badge, and rating.
  - Scroll-to-Top FAB.
- **Behaviors:**
  - Infinite Scrolling: Downward scrolling fetches the next page of products automatically and displays a loading spinner dynamically.
  - Search Input: Debounced typing triggers a new filtered list.
  - Tapping an item navigates mapped to `/product/:id`.
  - Tapping "Back to top" smoothly scrolls to position 0.

### Technical Blueprint
- **Frontend Architecture:** Reusable `product-grid-item` presentational component.
- **Routing:** `/categories/:categoryId/products` -> `ProductListModule` (Lazy loaded).
- **NgRx Store:** `ProductListState` tracking `{ categoryId, products: [], currentPage, hasMore, isLoading }`.
- **API Strategy:** Fetch `GET /api/v1/products?categoryId={id}&page={index}`. Append array to `products` on success.

### Acceptance Criteria (AC)

**AC1: Layout and Search Bar**
- **Given** I open a specific category detail
- **When** the screen renders
- **Then** I see the header, a local search bar, the 2-column product grid, and the bottom menu.

**AC2: Infinite List Loading**
- **Given** I am browsing the products in a category
- **When** I scroll to the bottom of the grid
- **Then** a loading indicator appears AND the next batch of products is appended to the grid without reloading the page.

**AC3: Stop Fetching Extraneous Data**
- **Given** I have reached the last page of products
- **When** I scroll to the bottom
- **Then** the app does not show the loading spinner AND does not make any further API requests.

**AC4: Product Click Navigation**
- **Given** I see a product I'm interested in
- **When** I click on the product card
- **Then** I am routed to the Product Detail screen.
