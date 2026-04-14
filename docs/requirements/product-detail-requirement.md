---
description: [MANUAL] Yêu cầu nghiệp vụ cho Product Detail Page
---
**Title:** Product Detail Implementation
**Story:** As a Pet Owner, I want to view the details of a product so that I can see the price, variants, ingredients, and decide whether to add it to my cart.

### Impact Analysis
- **UI Components:**
  - Header: Back button, Title "Product Detail", Share icon. (No bottom menu).
  - Hero Image Carousel: Indicator page (1/5), Discount percentage badge, "Sold Out" overlay if out of stock.
  - Meta Info: Category, multiline truncating Name, Brand link, Status (In-stock/Out-of-stock), Strike-through Original Price, Bold Discount Price.
  - Review Badge: Star icon with review count.
  - Variable Options: Multi-select pill buttons for Weight, Size, Age.
  - Detail Tabs: Description, Ingredients, Nutritional Information, Feeding Guide, Storage Instructions.
  - Related Products: 2-column component.
  - Bottom Action Bar (Fixed): Quantity increment/decrement (+/-) and full-width "Add to Cart" button.
- **Behaviors:**
  - Selecting a different Variable Option dynamically updates price, status, and related UI components immediately.
  - Switching Detail Tabs shows new specific content without refreshing the page.
  - "Add to Cart" triggers toast/snackbar success message.
  - Share connects to device native share menu.

### Technical Blueprint
- **Frontend Architecture:** Component state handles variant selection before saving to Cart.
- **Routing:** `/product/:id` -> `ProductDetailModule` (Lazy loaded).
- **NgRx Store:** `ProductDetailState` holds `{ productDetail, selectedVariant, loading }`. Active calculation selectors dynamically yield correct UI values depending on `selectedVariant`.
- **API Strategy:** 
  - `GET /api/v1/products/:id` 
  - `GET /api/v1/products/:id/related`

### Acceptance Criteria (AC)

**AC1: Loading and Displaying Detail**
- **Given** I am on a product list
- **When** I tap a product
- **Then** the Product Detail page loads, displaying its images, full title, price, variables, and description.

**AC2: Dynamic Variables Selection**
- **Given** I am viewing a product with multiple sizes (e.g., 1kg and 5kg)
- **When** I switch my selection from 1kg to 5kg
- **Then** the displayed price and stock status update immediately to reflect the 5kg variant.

**AC3: Add to Cart interaction**
- **Given** I have selected my desired quantity and options
- **When** I tap the "Add to Cart" button
- **Then** the item is added to my cart, AND I see a brief success notification confirming the action.

**AC4: Product Out of Stock**
- **Given** a product is completely out of stock
- **When** I load the product page
- **Then** the hero image displays a "Sold Out" overlay AND the "Add to Cart" button is either disabled or replaced by "Notify Me".
