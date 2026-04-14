---
description: [MANUAL] Yêu cầu nghiệp vụ cho Màn hình Alerts và App Settings
---
**Title:** Alerts & Preferences Settings Implementation
**Story:** As a System User, I want to receive organized notifications about my pet's schedule, and modify my global app preferences (Theme, Address, Toggles) so that I have a customized experience.

### Impact Analysis
- **UI Components:**
  - **Alerts Screen:** 
    - Vertical list of highly structured notification cards. 
    - Each card utilizes specific thematic colors based on contextual categories: Pink (Birthday), Red (Medical/Critical), Green (Order Success), Yellow (Medicine).
    - Unique Action buttons or toggles accompany cards natively (e.g. "Book Now" or a Toggle component for "Given Medicine" interactions).
  - **Settings Dashboard:** 
    - Lists categorized under: Account, Notifications, Preferences, Support.
    - Utilizes system-like switch toggles (e.g. for FaceID, Dark Mode). Includes sub-screens for Privacy Policy, Address forms, and Payment Methods CRUD operations (Add/Remove).
- **Behaviors:**
  - Form Toggles trigger an immediate backend synchronization attempt as well as a visual state update (e.g., toggling Dark Mode paints the CSS application-wide almost instantly).
  - Alert action buttons deep-link into isolated feature modules (e.g. Tapping "View Details" takes the user to `order/:id/tracking`).

### Technical Blueprint
- **Frontend Architecture:** Extract notifications into a highly dynamic component `@Input() alertConfig` mapped via conditional SCSS mixins for coloring.
- **Routing:** `/alerts` and `/settings` namespaces. Submodules `/settings/address` and `/settings/payment`.
- **NgRx Store:** App context states containing active user settings. 
- **RxJS / Logic:** The Application Root subscribes directly to the `SettingsState` logic block to switch standard visual theme properties (Dark mode toggling).

### Acceptance Criteria (AC)

**AC1: Reading Alerts System**
- **Given** I am checking my notifications
- **When** I look at the Alert List
- **Then** critical alerts strictly render in red elements, while generic reminders possess less aggressive blue styling. 

**AC2: Notification Integration**
- **Given** I have a notification suggesting "Time to book a Spa"
- **When** I tap the "Xem Ưu đãi" inline CTA
- **Then** the application jumps me perfectly into the Service Booking module without needing to traverse menus.

**AC3: App Preference Syncing**
- **Given** I toggle the Dark Mode configuration switch
- **When** I tap to enable it
- **Then** the UI elements universally react to match a dark background AND my choice saves across app restarts.
