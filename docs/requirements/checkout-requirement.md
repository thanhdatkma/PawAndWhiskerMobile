---
description: [MANUAL] Yêu cầu nghiệp vụ cho Checkout Page
---
**Title:** Checkout Implementation
**Story:** As a Pet Owner, I want to provide my shipping and payment details so that I can easily complete the purchase of my selected items.

### Impact Analysis
- **UI Components:**
  - Header: Back button, Title "Checkout".
  - Shipping Address Card: Displays User Name, full address, phone number. Includes an "Edit" badge/button in primary color.
  - Shipping Method Card: Radio buttons for Standard Delivery and Express Delivery. Selected state uses primary color outline. Shows timeframe and price.
  - Payment Method Card: Radio buttons for Credit/Debit (masking digits), Momo, ZaloPay, VNPay, Paypal.
  - Order Summary Card: Identical data style to Shopping Cart, supplemented with item count in the subtotal row. Total row highlights prominently.
  - Bottom Action: Full-width fixed "Place Order" button.
- **Behaviors:**
  - Selection of shipping/payment is mutually exclusive per block (Radio logic).
  - Toggling Shipping Method dynamically recalculates the Total on the Order Summary.
  - "Place Order" initiates backend transaction and transitions state to success or external payment gateway integration.

### Technical Blueprint
- **Frontend Architecture:** Reactive Forms for validation and selection mapping.
- **Routing:** `/checkout` -> `CheckoutModule` (Lazy loaded).
- **NgRx Store:** `CheckoutState` holds `{ customAddress, selectedShippingMethodId, selectedPaymentMethodId }`. 
- **RxJS / Logic:** Cross-calculate dynamic order total. Ensure state survives brief navigation (like jumping to Address Book and back).
- **API Strategy:** 
  - Loading methods: `GET /api/v1/checkout/prepared-data`.
  - Submitting: `POST /api/v1/checkout/place-order`. Response handles direct success transition URL or external web-gateway link.

### Acceptance Criteria (AC)

**AC1: Layout Rendering**
- **Given** I am ready to checkout
- **When** the page renders
- **Then** I see my default address, shipping methods, payment methods, and an order summary.

**AC2: Shipping Recalculation**
- **Given** I view the Order Summary
- **When** I switch my shipping method from Standard to Express
- **Then** the Shipping fee line updates AND the Final Total increases accordingly on the screen immediately.

**AC3: Placing an Order**
- **Given** all required fields and selections are valid
- **When** I tap "Place Order"
- **Then** the application triggers the checkout workflow and routes me to the Order Success screen (or Payment Gateway) smoothly.
