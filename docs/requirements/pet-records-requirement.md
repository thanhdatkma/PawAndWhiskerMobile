---
description: [MANUAL] Yêu cầu nghiệp vụ cho Nhóm quản lý Hồ sơ Sức khoẻ Thú cưng
---
**Title:** Pet Health & Historical Records Implementation
**Story:** As a Pet Owner, I want to review my pet's medical history, diets, and upcoming appointments so that I can easily ensure they stay healthy.

### Impact Analysis
- **UI Components:**
  - Common Header Layout (Back Button + Dynamic List Title depending on the context).
  - Reusable Card Grid (Single Column Flat list):
    - Structure features an identifying Icon on the left.
    - Title/Name, Sub-text (Doctors, clinics, descriptions) stacked in a column on the middle-right.
    - Specific contexts feature distinct graphical flair:
      - Appointments: Include status pills (Upcoming = yellow, Completed = green, Cancelled = red).
      - Medical/Vaccines/Food: Feature different primary icons (Syringe, Cross, Scissors, Dog Food).
- **Behaviors:**
  - Standard scrollable view interface with Pull-to-Refresh capabilities to sync the latest clinic entries.
  - No interactive modification actions required within the base lists (Read-only reference tool synced from core veterinary systems).

### Technical Blueprint
- **Frontend Architecture:** Develop ONE highly dynamic presentation component `app-record-card` capable of taking diverse content objects and icon identifiers.
- **Routing:** Mapped extensively under the `/profile/records/` namespace.
- **NgRx Store:** A specific chunk `MedicalRecordsState`. Maintains separate caching variables allowing background refresh without interrupting the active UI lists.
- **API Strategy:** 
  - Leverage distinct backend controller routes (e.g. `/api/v1/records/appointments` vs `/api/v1/records/prescriptions`), but return them using roughly standardized DTO structures to permit generic frontend rendering.

### Acceptance Criteria (AC)

**AC1: Layout and Identification**
- **Given** I am browsing one of the health record lists
- **When** the page builds
- **Then** the cards should distinctly utilize the correct graphical icon representing the category (Syringe for vaccines, Cross for Clinics, etc.).

**AC2: Status Identifications**
- **Given** I am in the Appointments history section
- **When** reading past and future appointment cards
- **Then** past items look visually distinct from cancelled elements and future upcoming tasks.

**AC3: Responsiveness and Pull to Refresh**
- **Given** I know a clinic just updated my profile
- **When** I scroll up and pull down on the top edge of the list
- **Then** a spinner activates, checking for fresh data and appending it to the UI automatically.
