---
description: [AUTO-UPDATED] Business Requirements – Alerts & Notifications
status: READY
priority: P1
---

# Alerts & Notifications

**Story (US-ALERT-01):** As a Pet Owner, I want to receive actionable alerts about my pet's health, orders, and promotions, so that I never miss an important event.

**Story (US-ALERT-02):** As a Pet Owner, I want to see unread notification count in the tab bar, so that I know when I have new alerts without opening the screen.

---

## Pre-conditions
- `NotificationService` is initialized with seed data on first run.
- Notifications are persisted to `localStorage['app_notifications']`.

## Out of Scope
- Push notification integration (Firebase / APNs) — not implemented.
- API-driven notification data — currently hardcoded (**GAP**).

---

## Functional Requirements

### FR-ALERT-01 — Notification List (`AlertsPageComponent`)
- Displays `notifications$` observable from `NotificationService`.
- `NotificationService` loads from `localStorage['app_notifications']`; falls back to 4 hardcoded seed items.
- `ionViewWillEnter()` calls `markAllAsRead()` — all unread notifications are marked read when the tab is entered.

### FR-ALERT-02 — Notification Types
Four types defined in `NotificationModel.type`:
- `'critical'` — urgent medical (e.g., vaccine due).
- `'confirmed'` — delivery confirmed.
- `'recurring'` — medication reminder with `isInteractive: true`.
- `'special-offer'` — promotional.

### FR-ALERT-03 — Unread Count Badge
- `NotificationService.unreadCount$` = `notifications$.pipe(map(n => n.filter(n => !n.isRead).length))`.
- `TabsPage` subscribes to `unreadCount$` and passes it to `IonBadge` in the Alerts tab button.

### FR-ALERT-04 — Mark as Read
- `markAsRead(id)` updates a single notification's `isRead` to `true` and persists to `localStorage`.
- `markAllAsRead()` marks all notifications read (called on tab entry).
- Both methods emit updated array via `notificationsSubject.next()`.

### FR-ALERT-05 — Community Alerts Section
- `CommunityAlertsComponent` is rendered below the notification list (static/community content).

---

## Acceptance Criteria

**AC1 — Notifications list displays**
- Given I navigate to the Alerts tab
- When the page enters view
- Then all notifications are displayed, categorized by type with icon and description.

**AC2 — All marked read on view**
- Given there are unread notifications
- When `ionViewWillEnter` fires
- Then all notifications are marked read and the badge count resets to 0.

**AC3 — Badge count updates**
- Given a new notification arrives (or is seeded unread)
- When the badge is visible in the tab bar
- Then it shows the correct unread count.

---

## Dev Tasks (Implemented)

| # | Task | File(s) |
|---|---|---|
| T1 | `NotificationModel` interface | `models/notification.model.ts` |
| T2 | `NotificationService` — BehaviorSubject, localStorage, markAsRead, unreadCount$ | `services/notification.service.ts` |
| T3 | `AlertsPageComponent` — subscribes to notifications$, calls markAllAsRead | `pages/alerts/alerts.component.ts` |
| T4 | `TabsPage` — `unreadCount$` → `IonBadge` | `tabs/tabs.page.ts` |
| T5 | `NotificationCardItemComponent` — renders single notification | `shared/components/notification-card-item/` |
| T6 | `CommunityAlertsComponent` | `shared/components/community-alerts/` |

## Gap Analysis
| # | Gap | Severity |
|---|---|---|
| G1 | Notification data is hardcoded seed — no API integration | High |
| G2 | No push notification (FCM/APNs) integration | High |
| G3 | `markAsRead(id)` is implemented but never called per-item — only `markAllAsRead` on view enter | Medium |
| G4 | Interactive notifications (`isInteractive: true`) have no action handler | Medium |
