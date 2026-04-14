---
description: [MANUAL] Yêu cầu nghiệp vụ cho Shopping Cart Page
---
**Title:** Shopping Cart Implementation
**Story:** As a Pet Owner, I want to view and manage my selected products in the Shopping Cart so that I can review prices, apply coupons, and proceed to checkout.

### Impact Analysis
- **UI Components:**
  - Header: Back button and Title "Shopping Cart".
  - Cart Items List: Vertical list. Each card displays product thumbnail, name, variants (weight, size, age), unit price.
  - Actions per Item: Quantity stepper (+/- and number) and delete capability (cross icon or swipe-to-delete).
  - Coupon Input: Field with placeholder "Enter coupon code", a coupon icon inside, an "Apply" button (secondary color), and space for inline validation errors.
  - Order Summary Card: Displaying breakdown (Subtotal, Shipping, Tax). The Total is styled with primary color and bold text.
  - Bottom Action: Full-width fixed "Checkout" button.
- **Behaviors:**
  - Clicking +/- instantly updates the individual item total, the Subtotal, Tax, and Final Total in the summary card without page reloads.
  - Applying a valid/invalid coupon code updates the Order Summary and displays success/error context respectively.
  - Swipe to Delete removes the item entirely and instantly recalculates totals.

### Technical Blueprint
- **Frontend Architecture:** Reusable summary and item card components.
- **Routing:** `/cart` -> `CartModule` (Lazy loaded).
- **NgRx Store:** 
  - Lưu ý kiến trúc: `CartState` đặt tại App/Core Level vì số lượng giỏ hàng cần hiển thị trên Header của toàn app. 
  - Actions `AddItem`, `UpdateQuantity`, `RemoveItem`, `ApplyCouponCode`.
- **API Strategy:** 
  - Xử lý đồng bộ lên DB qua debounce sync. Giao diện thay đổi tức thời, gọi API `PUT /api/cart` chạy ẩn.
  - Calling `POST /api/v1/cart/coupon` to validate the promo code.

### Acceptance Criteria (AC)

**AC1: Layout Rendering**
- **Given** I navigate to my shopping cart
- **When** the page fully loads
- **Then** I see the list of items I added, my coupon field, the order financial summary, and the Checkout button.

**AC2: Edit Quantities**
- **Given** I have a product in my cart
- **When** I press the + or - button
- **Then** the cart item's subtotal and the entire order summary updates immediately to match the new quantity.

**AC3: Delete Item**
- **Given** I no longer want a product
- **When** I click the remove icon or swipe left to delete the product
- **Then** the product is removed from the screen AND the total price recalculates immediately.

**AC4: Apply Coupon Code**
- **Given** I enter a coupon code into the field
- **When** I tap the "Apply" button
- **Then** if the code is invalid, an inline error appears; if valid, the discount is applied to the summary total.
