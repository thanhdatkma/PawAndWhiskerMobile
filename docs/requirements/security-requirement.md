---
description: [MANUAL] Yêu cầu nghiệp vụ cho cụm màn hình Xác thực bảo mật tài khoản
---
**Title:** Security & Verification Implementation (OTP, Forgot Password, Change Password)
**Story:** As a System User, I want to securely verify my identity and manage my password so that my pet's data and payment information stay safe.

### Impact Analysis
- **UI Components:**
  - **OTP Verify Screen:** 6 independent square input fields with separators, a 30-second countdown timer, an active "Verify" button, and a dynamic "Resend" button.
  - **Forgot Password Screen:** Shared graphical banner with Login. Clear instructions and an email input. Red inline validation if the email is unregistered.
  - **Change Password Screen:** Input forms for Current Password, New Password, and Confirm Password. Includes visibility togglers (eye icon) inside inputs.
- **Behaviors:**
  - OTP inputs automatically capture focus sequentially as the user types or deletes numbers. It should optionally auto-submit upon filling the 6th digit.
  - Verification fails instantly if the server rejects the code (flashing red outline).
  - Validation ensures the "New Password" does not strictly match the "Current Password" and that the Confirm field is identical.

### Technical Blueprint
- **Frontend Architecture:** Extract the 6-digit OTP UI into a standalone reusable Angular component `app-otp-input`.
- **Routing:** Handled safely within authenticated regions (for Change Password) or specific security recovery routes.
- **NgRx Store:** Internal Subject / Local state are preferred over global store for sensitive typing like tokens / passwords to avoid console exposure side-effects. 
- **RxJS:** Employs `timer()` for the 30-second countdown logic on OTP Resend.
- **API Strategy:** 
  - Need strict API rate limit handling (Status 429) especially regarding Resend OTP routes to prevent abuse.

### Acceptance Criteria (AC)

**AC1: Forgot Password Delivery**
- **Given** I am securely trying to recover my account
- **When** I enter a valid registered email
- **Then** the application triggers an OTP to my email and advances me to the Verify OTP screen.

**AC2: Secure OTP Interaction**
- **Given** I am on the OTP screen
- **When** I enter the 6-digit verification code correctly
- **Then** my identity is verified and I can proceed to set a new password.

**AC3: Password Change Constraints**
- **Given** I am updating my existing password
- **When** I type the new passwords into the form
- **Then** the UI mandates that the confirmation matches the targeted new password perfectly before allowing me to save.
