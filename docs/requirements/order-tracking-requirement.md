---
description: [MANUAL] Yêu cầu nghiệp vụ cho Order Tracking Page
---
**Title:** Order Tracking Implementation
**Story:** As a Pet Owner, I want to track the delivery progress of my order so that I know exactly what stage it is in and when it will arrive.

### Impact Analysis
- **UI Components:**
  - Header: Back button, Title "Tracking Order".
  - Vertical Timeline (Order Journey): A graphical stepper depicting Milestones (Order Placed, Processed, Shipped, Out for Delivery, Delivered). 
    - Past milestones have a primary color checkmark icon and black bold text.
    - Current milestone has a pulsing/opacity-outlined primary circle and primary bold text.
    - Future milestones use grey circles and grey text.
  - Courier Info Card: Name of courier and a tracking number with a convenient "Copy" icon.
  - Item List: Thumbnails, names, variance info, and quantities of the products inside the package.
- **Behaviors:**
  - The UI interprets datetime data for each milestone to render appropriate past/current/future states dynamically.
  - Clicking the Copy icon drops the tracking ID string into the native system clipboard and emits a confirmation Toast.

### Technical Blueprint
- **Frontend Architecture:** Develop a reusable `TimelineStepper` component for the vertical tracking visual.
- **Routing:** `/order/:id/tracking` -> `OrderTrackingComponent`.
- **API Strategy:** 
  - Fetch live or cached checkpoint data via `GET /api/v1/orders/:id/tracking`.
  - Handle potential edge cases where an order could be marked as "Cancelled" instead of following the happy delivery path.

### Acceptance Criteria (AC)

**AC1: Displaying the Journey Timeline**
- **Given** I have an active order
- **When** I open the Order Tracking page
- **Then** I see a vertical timeline outlining the delivery stages, with the current stage highlighted distinctly from past and future stages.

**AC2: Courier and Tracking Tools**
- **Given** an order has been shipped
- **When** I view the Courier Information section
- **Then** the tracking number is clearly readable AND tapping the copy icon allows me to save it into my clipboard immediately.

**AC3: Order Contents Reference**
- **Given** I am tracking my delivery
- **When** I scroll down
- **Then** I see the exact list of products contained in that specific shipment.
