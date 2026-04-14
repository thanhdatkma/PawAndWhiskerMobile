---
description: [MANUAL] Yêu cầu nghiệp vụ cho Categories Page
---
**Title:** Categories Master Page Implementation
**Story:** As a Pet Owner, I want to view a structured list of categories so that I can easily navigate and find specific products or services for my pet.

### Impact Analysis
- **UI Components:**
  - Header & Bottom Navigation (Shared).
  - Search Bar: At the top for quick searching.
  - Left Sidebar: Single column list of Parent Categories with vertical scroll. Selected item is highlighted.
  - Right Content: Grid layout (2 columns) displaying Child Categories of the active Parent Category. 
  - Child Category Item: Includes thumbnail, name, and "Xem thêm >" button.
- **Behaviors:**
  - Independent vertical scrolling for both the Left Sidebar and Right Content.
  - Clicking a Parent Category instantly updates the Right Content without reloading the page.
  - Clicking a Child Category navigates to the Category Detail List page.

### Technical Blueprint
- **Frontend Architecture:** Split layout structure. 
- **Routing:** `/categories` -> `CategoriesModule` (Lazy loaded).
- **NgRx Store:** `CategoriesState` lưu `categoriesTree` (cây dữ liệu cha-con) và `activeParentId`. Dùng selector để map dữ liệu con tương ứng cho cột phải.
- **API Strategy:** Fetch `GET /api/v1/categories/tree` 1 lần lúc init để đảm bảo UX chuyển parent-category mượt mà tức thời, thay vì phải fetch lại mỗi lần click.

### Acceptance Criteria (AC)

**AC1: Display Layout Structure**
- **Given** I navigate to the Categories page
- **When** the page loads
- **Then** I should see the Header, Search Bar, Left Sidebar (parent categories), Right Grid (child categories), and Bottom Menu.

**AC2: Parent Category Selection**
- **Given** the Categories page is loaded with a default parent selected
- **When** I tap on another Parent Category in the Left Sidebar
- **Then** the tapped item becomes highlighted AND the Right Grid instantly updates to show the relevant child categories.

**AC3: Independent Scrolling**
- **Given** there are many parent and child categories
- **When** I scroll the Left Sidebar or the Right Grid
- **Then** they should scroll vertically independently from each other.

**AC4: Navigate to Category Details**
- **Given** I am viewing the child categories
- **When** I tap on a child category item or "Xem thêm >"
- **Then** I am navigated to the detailed product list of that child category.
