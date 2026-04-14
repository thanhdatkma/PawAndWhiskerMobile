---
description: [MANUAL] Yêu cầu nghiệp vụ cho Home Page
---
**Title:** Home Page Implementation
**Story:** As a Pet Owner, I want to access the Home Page so that I can see promotional banners, quick links, new arrivals, pet-specific products, and news updates in one place.

### Impact Analysis
- **UI Components:**
  - Header: Drawer icon, App Title "Paws & Whiskers", Cart icon.
  - Banner Slider: Auto-play carousel, opacity 0.5, swift to change slide
  - Quick Categories: 6 icons (Dog, Cat, Clinic, Services, Accessories, Pharmacy).
  - New Arrivals: Horizontal scroll, 10 items.
  - Everything for Dog / Cat: Banner + Horizontal scroll product list (10 items).
  - News Feed: Vertical flat list (thumbnail, title, summary).
  - Bottom Navigation & Back to Top FAB.
- **Behaviors:**
  - Horizontal scrolling for products, vertical for page.
  - Navigate to Product Detail, Category Detail, News Detail, Cart.
  - Banner auto-scrolls, stops on interaction.

### Technical Blueprint
- **Frontend Architecture:** Clean Architecture, Smart/Dumb Components.
- **Routing:** `/home` -> `HomeModule` (Lazy loaded).
- **NgRx Store:** `HomeState` cho Banners, Categories, New Arrivals, Dog/Cat Products, News. 
- **RxJS:** Sử dụng `forkJoin` / concurrent actions để load API không block UI.

### Acceptance Criteria (AC)

**AC1: Display Header and Navigation**
- **Given** I open the app
- **When** the Home screen loads
- **Then** I should see the Header with Drawer icon, title, and Cart icon, AND the Bottom Navigation menu.

**AC2: Auto-play Banner**
- **Given** I am on the Home screen
- **When** I view the top section
- **Then** I see a banner carousel that auto-scrolls, AND pauses when I tap/hold it.

**AC3: Quick Categories List**
- **Given** I am on the Home screen
- **When** the Categories section loads
- **Then** I see 6 defined icons (Dog, Cat, etc.) AND tapping one navigates me to the Category page.

**AC4: Product Sections (New Arrivals, Dog, Cat)**
- **Given** I scroll down the Home page
- **When** I see "New Arrivals" or "Everything for Dog/Cat"
- **Then** I can swipe left/right to view up to 10 products, AND clicking "See all" takes me to the full list.

**AC5: Back to Top**
- **Given** I scroll down a long distance
- **When** I look at the bottom right
- **Then** the 'Back to top' FAB appears, AND clicking it smoothly scrolls the page to the top.
