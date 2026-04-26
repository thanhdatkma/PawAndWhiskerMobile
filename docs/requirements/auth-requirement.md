---
description: [AUTO-UPDATED] Business Requirements – Authentication Flow
status: READY
priority: P0
---

# Authentication Flow

**Story (US-AUTH-01):** As a Guest User, I want to create an account, so that I can personalize my experience and purchase products.

**Story (US-AUTH-02):** As a Registered User, I want to log in with my email and password, so that I can access my profile and order history.

**Story (US-AUTH-03):** As a Registered User, I want to reset my password using my email or phone number, so that I can regain access if I forget my credentials.

**Story (US-AUTH-04):** As a Registered User, I want to verify my identity via a 6-digit OTP, so that my account is secured.

---

## Pre-conditions
- `AuthService` checks `localStorage` for a saved `user_profile` key on boot and auto-restores the session.

## Out of Scope
- Actual API integration (currently mock-only via `AuthService.login()`).
- Biometric login (placeholder `onFaceIdLogin()` — **GAP**).
- Social OAuth integration (placeholder `onSocialLogin()` — **GAP**).
- JWT token management / HTTP interceptor (**GAP**).
- Route guards protecting authenticated-only pages (**GAP**).

---

## Functional Requirements

### FR-AUTH-01 — Login Form Validation (`LoginComponent`)
- **Fields:** `email` (required, valid email format), `password` (required, min 6 chars).
- On invalid submit: `markFormGroupTouched()` triggers inline error display.
- On valid submit: calls `AuthService.login()` (mock) then `NavController.navigateRoot('/profile')`.
- Toggle password visibility via `showPassword` flag.
- **Expected API:** `POST /api/auth/login` → `{ token, user }`.

### FR-AUTH-02 — Registration Form Validation (`RegisterComponent`)
- **Fields:** `fullName` (required, min 2), `email` (required, valid email), `phone` (required, pattern `/^[0-9]{10,11}$/`), `password` (required, min 8), `confirmPassword` (required), `agreeTerms` (must be `true`).
- Cross-field validator `passwordMatchValidator` ensures password === confirmPassword; sets `passwordMismatch` error on `confirmPassword`.
- On valid submit: navigates forward to `/verify-code` passing `state.email`.
- Links to `/terms-privacy` and `/privacy-policy`.
- **Expected API:** `POST /api/auth/register` → `{ userId }`.

### FR-AUTH-03 — Forgot Password (`ForgotPasswordComponent`)
- **Field:** `identifier` (required, must match email pattern OR phone pattern `/^[0-9]{10,11}$/`).
- Custom validator `emailOrPhoneValidator` returns `{ invalidIdentifier: true }` if neither pattern matches.
- On valid submit: navigates to `/verify-code` with `state.email`.
- **Expected API:** `POST /api/auth/forgot-password` → `{ message }`.

### FR-AUTH-04 — OTP Verification (`VerifyCodeComponent`)
- Displays masked email (e.g. `j***n@gmail.com`) passed via navigation state.
- 6-digit OTP input using `IonInputOtp`; auto-advances focus between digits; auto-submits when last digit entered.
- Countdown timer (60s) using `interval(1000).pipe(take(60))`; on expiry, "Resend" button activates.
- `onVerify()` navigates to `/verify-successed` when `isOtpComplete === true`.
- **Expected API:** `POST /api/auth/verify-otp` → `{ valid: boolean }`.

### FR-AUTH-05 — Session Persistence
- `AuthService` stores `UserProfile` in `localStorage` key `user_profile`.
- On app boot, reads and restores session; invalid JSON is cleared.
- `isLoggedIn` is an Angular `signal<boolean>`.

### FR-AUTH-06 — Logout (`UserProfileComponent`)
- Calls `AuthService.logout()` which clears `localStorage` and sets signals to `false`/`null`.
- `ProfilePageComponent` switches between guest CTA and `UserProfileComponent` based on `authService.isLoggedIn()`.

---

## Acceptance Criteria

**AC1 — Login form inline validation**
- Given I enter an invalid email on the Login screen
- When I tap "Login"
- Then form controls are marked touched and error messages appear inline without calling the API.

**AC2 — Successful login**
- Given valid credentials are entered
- When I tap "Login"
- Then `AuthService.login()` is called, session is saved, and the app navigates to `/profile`.

**AC3 — Registration password mismatch**
- Given I enter different values in password and confirmPassword
- When I tap "Register"
- Then a `passwordMismatch` error is shown and submission is blocked.

**AC4 — OTP auto-advance and auto-submit**
- Given I am on the Verify Code screen
- When I type the 6th OTP digit
- Then the app automatically calls `onVerify()` without requiring a button tap.

**AC5 — OTP resend cooldown**
- Given the 60-second countdown is active
- When the countdown reaches 0
- Then the "Resend" button becomes active; tapping it restarts the 60-second timer.

**AC6 — Session restored on reload**
- Given I was previously logged in
- When I close and reopen the app
- Then `AuthService` reads `localStorage`, restores the user signal, and shows the authenticated view.

---

## Dev Tasks (Implemented)

| # | Task | File(s) |
|---|---|---|
| T1 | Reactive form with `FormBuilder`, validators | `login.component.ts`, `register.component.ts` |
| T2 | Custom `emailOrPhoneValidator` | `forgot-password.component.ts` |
| T3 | Custom `passwordMatchValidator` (cross-field) | `register.component.ts` |
| T4 | `markFormGroupTouched()` helper | Both auth components |
| T5 | Password visibility toggle | `login.component.ts`, `register.component.ts` |
| T6 | OTP timer with RxJS `interval` + `take` | `verify-code.component.ts` |
| T7 | OTP auto-focus and auto-submit | `verify-code.component.ts` |
| T8 | Email masking on verify screen | `verify-code.component.ts` |
| T9 | `AuthService` with Angular `signal`, localStorage persistence | `auth.service.ts` |
| T10 | `UserProfile`, `Pet` models | `user-profile.model.ts` |

## Gap Analysis
| # | Gap | Severity |
|---|---|---|
| G1 | `AuthService.login()` uses mock data — no real API call | Critical |
| G2 | No HTTP interceptor for JWT token injection | Critical |
| G3 | No route guard (`AuthGuard`) protecting profile/order pages | High |
| G4 | `onFaceIdLogin()` / `onSocialLogin()` are empty stubs | Medium |
| G5 | `UserState` in NgRx is declared but not used by `AuthService` (uses signals + localStorage instead) — inconsistency | Medium |
| G6 | `UserService` (HTTP-based) is separate from `AuthService` (signal-based) — dual responsibility | Medium |
