---
description: [MANUAL] Yêu cầu nghiệp vụ cho cụm màn hình Authentication
---
**Title:** Authentication Flow Implementation (Welcome, Login, Register)
**Story:** As a Guest/Unauthenticated User, I want to create an account or log in so that I can personalize my pet's profile, save shipping addresses, and buy products.

### Impact Analysis
- **UI Components:**
  - **Welcome Screen:** Full-screen gradient backdrop with a golden retriever puppy and a kitten. Features primary Login and secondary Register buttons. Contains legal terms footer.
  - **Login Screen:** Returns the image backdrop as a rounded top banner. "Welcome Back" greeting. Email/Password inputs with inline validation. Options to login via FaceID and Social Integrations (FB, Tiktok, Google). Includes a "Forgot Password" link.
  - **Register Screen:** Greeting "Join the Pack". Extended form inputs (Name, Email, Phone, Pass, Confirm Pass). Social Registration links as secondary options.
- **Behaviors:**
  - Form validations trigger instantly inline as the user types (e.g. valid email syntax checking).
  - Tapping "Login" or "Register" submits data and, upon success, transitions the entire app stack seamlessly to the authenticated Home screen area.
  - Social icons initiate native OAuth2 workflows or web popups.

### Technical Blueprint
- **Frontend Architecture:** Reusable Auth layout component structure for Login/Register to share common brand aesthetics.
- **Routing:** `/welcome`, `/auth/login`, `/auth/register` encapsulated in an `AuthModule` via lazy loading without requiring route guards.
- **NgRx Store:** App-wide `AuthState` maintaining the `UserToken`. Interceptors automatically apply token injection to secured API routes.
- **API Strategy:** 
  - `POST /api/v1/auth/register`
  - `POST /api/v1/auth/login`
  - Biometrics utilize device-specific Capacitor plugins instead of HTTP where appropriate.

### Acceptance Criteria (AC)

**AC1: Loading Welcome Screen**
- **Given** I am an unauthenticated user opening the app
- **When** the app completes loading
- **Then** I am presented with the Welcome Screen featuring the pet image backdrop and clear options to either log in or register.

**AC2: Login Validation**
- **Given** I am on the Login screen
- **When** I enter a poorly formatted email or mismatched credentials
- **Then** an inline red error text warns me of the issue without attempting to submit.

**AC3: Successful Registration Workflow**
- **Given** I am on the Register screen with complete and valid details
- **When** I tap the register button
- **Then** my account is securely created and I am transitioned directly to my default landing experience (Home/Profile).
