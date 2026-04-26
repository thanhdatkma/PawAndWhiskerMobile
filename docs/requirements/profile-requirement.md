---
description: [AUTO-UPDATED] Business Requirements – Profile & User Account
status: READY
priority: P1
---

# Profile & User Account

**Story (US-PROF-01):** As a Guest User, I want to see a prompt to log in or register when I visit my Profile tab, so that I understand that I need an account to access personal features.

**Story (US-PROF-02):** As a Logged-in User, I want to view my profile with avatar, name, membership level, and my pet's details, so that I can manage my account.

**Story (US-PROF-03):** As a Logged-in User, I want to log out, so that my session is cleared from the device.

---

## Pre-conditions
- `AuthService.isLoggedIn` signal reflects the current authentication state.
- `AuthService.currentUser` signal holds `UserProfile | null`.

## Out of Scope
- Editing user profile fields (edit button rendered but no form — **GAP**).
- Order history page (icon rendered but no route — **GAP**).
- Saved addresses, payment methods (menu items rendered but no implementation — **GAP**).
- Pet health records (visible in UI — **GAP**).

---

## Functional Requirements

### FR-PROF-01 — Guest vs. Authenticated View (`ProfilePageComponent`)
- `*ngIf="authService.isLoggedIn()"` toggles between:
  - **Authenticated:** renders `UserProfileComponent` passing `authService` data.
  - **Guest:** renders CTA buttons (Login, Register) and app branding.
- `authService.isLoggedIn` is an Angular `signal<boolean>` — template uses `authService.isLoggedIn()`.

### FR-PROF-02 — User Profile Display (`UserProfileComponent`)
- Reads `authService.currentUser()` signal → `UserProfile { id, name, email, avatar, membership, pet? }`.
- `Pet` model: `{ id, name, breed, weight, age, nextVaccine, image }`.
- Displays membership badge (e.g., "Gold" with diamond icon).
- Displays pet card with breed, age, weight, next vaccine date.

### FR-PROF-03 — Logout
- `onLogout()` calls `authService.logout()`.
- `AuthService.logout()`: sets `_currentUser.set(null)`, `isLoggedIn.set(false)`, removes `localStorage['user_profile']`.
- `ProfilePageComponent` reacts to signal change and re-renders guest view.

### FR-PROF-04 — Navigation from Profile
- "Terms & Conditions" link navigates to `/terms-privacy` (via `ProfilePageComponent.goToTerms()`).
- Back navigation from `UserProfileComponent.onBack()` → `navigateRoot('/home')`.

---

## Acceptance Criteria

**AC1 — Guest prompt shown**
- Given I am not logged in
- When I tap the Profile tab
- Then I see a guest view with Login and Register buttons.

**AC2 — Authenticated profile shown**
- Given I am logged in
- When I tap the Profile tab
- Then my avatar, name, membership tier, and pet details are displayed.

**AC3 — Logout clears session**
- Given I am logged in
- When I tap "Logout"
- Then `AuthService.logout()` runs, `isLoggedIn` becomes false, and the guest view renders.

---

## Dev Tasks (Implemented)

| # | Task | File(s) |
|---|---|---|
| T1 | `UserProfile` and `Pet` models | `models/user-profile.model.ts` |
| T2 | `AuthService` — signals, localStorage, login/logout | `services/auth.service.ts` |
| T3 | `ProfilePageComponent` — conditional rendering on `isLoggedIn()` signal | `pages/profile/profile.component.ts` |
| T4 | `UserProfileComponent` — display profile, pet card, logout, menu items | `pages/user-profile/user-profile.component.ts` |
| T5 | `TermsConditionsComponent`, `PrivacyPolicyComponent` pages | `pages/terms-conditions/`, `pages/privacy-policy/` |

## Gap Analysis
| # | Gap | Severity |
|---|---|---|
| G1 | Edit profile button has no form/navigation — stub only | High |
| G2 | Order history, Saved Addresses, Payment Methods menu items not wired to routes | High |
| G3 | `UserState` in NgRx store is defined but `AuthService` uses its own signals/localStorage — dual state sources | Medium |
| G4 | `UserService.getUserProfile()` / `updateProfile()` HTTP calls are never invoked | Medium |
| G5 | Pet health data (`nextVaccine`) is static from mock — no API or editing | Low |
