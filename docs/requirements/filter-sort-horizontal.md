**Title:** Filter & Sort Horizontal Bar
**Story:** As a User, I want to interact with a horizontal filter bar on the product listing page and a dynamic auto-height modal so that I can conveniently filter and sort products.

**AC:**

**Product Category Page (filter-bar):**
- A scrollable horizontal filter bar featuring buttons for "Brands", "Pricing", "Tags", and "Sort By" is displayed.
- The filter bar remains fixed at the top of the product list.
- The filter bar detects scroll gestures: it expands to appear on downward scrolls and collapses on upward scrolls.
- Clicking any filter button opens the Filter & Sort modal directly on the corresponding tab.

**Filter & Sort Modal:**
- The modal header clearly displays the name of the active filter/sort tab (e.g., "Brands").
- The modal size uses an auto-height configuration based on its list content, instead of static screen breakpoints.
- The UI applies a flat list style (removing card-like borders/shadows) and thoroughly supports light/dark theme variables.
- Each filter option item places its label on the left and an `ion-checkbox` (or `ion-radio` for sorting) on the right.
- **Brands:** Displays a list of brand names (e.g., Nike, Adidas) accompanied by item counts.
- **Pricing:** Displays min-max grouped price ranges (e.g., $0-$31 (800), $31-$64 (8)) equipped with checkboxes.
- **Tags:** Displays grouped product tags (e.g., New (4), On Sale (20)) equipped with checkboxes.
- **Sort By:** Displays sorting criteria (Price low to high, Price high to low, Brands A to Z, Brands Z to A) using radio buttons.
- A fixed footer is located securely at the bottom featuring a "Reset" button on the left and an "Apply" button on the right.

**Note:** Tham chiếu ràng buộc kỹ thuật tại `@dev/rules/base.md` (nếu có)
