---
description: [MANUAL] Yêu cầu nghiệp vụ cho Cụm User Profile và Update Profile
---
**Title:** Profile Dashboard & Profile Management Implementation
**Story:** As a System User, I want to view and edit my personal details alongside my pet's biography so that the application has accurate information for service bookings or orders.

### Impact Analysis
- **UI Components:**
  - **Profile Dashboard Screen:** 
    - Render Owner's Header (Avatar, Name, Contact, Address).
    - Render Pet's Bio snippet (Avatar, Name/details). 
    - A comprehensive navigation list detailing sections available to the user (Vaccinations, Appointments, Orders, App Settings, etc.).
    - A distinct, wide LOG OUT button at the bottom.
  - **Update Profile Screen:**
    - Forms specifically separating Owner fields (Full Name, Address, etc.) from Pet fields (Breed, Gender, Age).
    - Camera icon indicators overlaying avatars to signal upload capability.
- **Behaviors:**
  - Tapping avatar edit icons triggers native mobile image pickers or file browser dialogs.
  - Form validation on Update Profile demands structured data checks before submission payload generation.
  - Tapping Logout requires a secondary prompt/modal confirmation before expelling the user.

### Technical Blueprint
- **Frontend Architecture:** Split components logically into `ProfileHeader`, `PetBioCard`, and `ShortcutNavigationList`.
- **Routing:** `/profile` (Main Dashboard) and `/profile/edit` module mapping.
- **NgRx Store:** App-wide `UserState` containing the loaded credentials. Optimistic UI update logic: Display changes immediately post-submission, reverting gracefully if the API errors out.
- **API Strategy:** 
  - `GET /api/v1/profile`
  - `PUT /api/v1/profile`
  - Requires multipart parsing for the distinct Avatar picture upload API endpoints (`/api/v1/profile/upload-avatar`).

### Acceptance Criteria (AC)

**AC1: Loading Dashboard**
- **Given** I am securely logged in
- **When** I navigate to the Profile Tab
- **Then** my personal details and pet details accurately render alongside a menu of accessible app settings and histories.

**AC2: Updating Details**
- **Given** I am on the Edit Profile layout
- **When** I correct a typo in my Name and submit the form
- **Then** the application confirms the change and reflects my new name correctly on the Dashboard.

**AC3: Secure Logout**
- **Given** my intent to close a session
- **When** I tap the "Log Out" button
- **Then** the system asks for confirmation, purges stored credentials completely, and redirects me to the Welcome login experience.
