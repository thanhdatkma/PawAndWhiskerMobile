---
description: [MANUAL] Yêu cầu nghiệp vụ cho Màn hình Service Booking (Đặt Lịch Hẹn)
---
**Title:** Service Booking Implementation
**Story:** As a Pet Owner, I want to seamlessly book spa or clinic services for my specific pet, choose my preferred professional, and pick a time slot so that the process is completely frictionless.

### Impact Analysis
- **UI Components:**
  - Header: Back button, Title "Book Service", Step indicator (e.g. STEP 1 of 3).
  - Selection Sections (Stackable):
    - **Service Types:** Horizontal scrolling cards for Services (Checkup, Spa, etc.).
    - **Who is it for?:** Horizontal scrolling of pet avatars with an active checkmark state.
    - **Date & Time Layout:** Interactive Date Picker combined with pill-shaped discrete Time slot buttons (e.g., 8:00 AM, 9:00 AM) that use primary colors when active.
    - **Clinics / Branches:** Vertical list cards of available clinics displaying name, address, and phone details.
    - **Professionals:** Cards detailing Doctor/Specialist avatar, title, major, experience, and rating.
  - Form Fields: A "Special Requests" input text area.
  - Sticky Layout: Bottom bar highlighting the calculated "Est Total" on the left and a "Confirm Booking" action button on the right.
- **Behaviors:**
  - Clicking on options visually toggles them into an active state. Changing a higher-level dependency (like Clinic branch) cascades and dynamically filters downstream options (like Professionals and Time spots available).

### Technical Blueprint
- **Frontend Architecture:** Develop as a robust multi-step smart component utilizing Reactive Forms.
- **Routing:** `/book-service` -> `BookingModule`.
- **NgRx Store:** Maintain a `BookingState` to preserve selections locally even if the user temporarily navigates away. State must wipe only upon a successful submission.
- **API Strategy:** 
  - Dynamic re-fetching APIs (`GET /api/v1/booking/doctors?clinicId={id}`) trigger conditionally using `switchMap` attached to the Reactive Form `valueChanges` observables.

### Acceptance Criteria (AC)

**AC1: Dynamic Form Population**
- **Given** I am filling out my booking details
- **When** I switch the Clinic location
- **Then** the list of available Professionals immediately changes to only depict those working at the new location.

**AC2: Live Price Estimations**
- **Given** I am selecting the type of Service
- **When** I choose an option with a specific base price
- **Then** the "Est Total" indicator at the bottom visually recalculates the price before I submit.

**AC3: Form Submission Validation**
- **Given** I am missing certain key inputs (e.g., I did not select a time)
- **When** I forcibly click the "Confirm Booking" button
- **Then** the app rejects the submission, scrolls me toward the missing field, and paints the border red.
