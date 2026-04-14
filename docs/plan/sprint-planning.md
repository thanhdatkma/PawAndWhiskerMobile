# Kế hoạch Phát triển: 3 Sprints (6 Tuần)

Dựa trên khối lượng công việc và độ phức tạp của 14 User Stories đã được phân tích, cùng với mô hình Agile/Scrum (mỗi Sprint kéo dài 2 tuần), dưới đây là lộ trình triển khai đề xuất giúp định hướng đội Dev xây dựng sản phẩm từ nền tảng cốt lõi đến các tính năng giá trị gia tăng.

---

## 🏃 Sprint 1: Foundation & Discovery (Tuần 1 - Tuần 2)
**Mục tiêu (Sprint Goal):** Thiết lập nền tảng kiến trúc ứng dụng (Core/Shared), bảo mật người dùng và luồng trải nghiệm khám phá sản phẩm (Product Discovery). Cho phép người dùng tìm kiếm thú cưng, đồ ăn mà không gặp rào cản.

**Danh sách User Story (Backlog Iteration):**
1. 🛡️ **Auth Flow** (`auth-requirement.md`): Welcome, Login, Register.
2. 🔐 **Security Verify** (`security-requirement.md`): Luồng kiểm chứng OTP, Reset & Change Password.
3. 🏠 **Home Page** (`home-requirement.md`): Giao diện trang chủ, xử lý Component Slider, Section Scroller.
4. 🗂️ **Categories Master** (`categories-requirement.md`): Hiển thị cây danh mục, Left menu - Right grid.
5. 🔍 **Category Detail** (`category-detail-requirement.md`): Luồng danh sách sản phẩm theo danh mục, Infinity Scroll / Pagination.

*» Milestone Sprint 1 Output:* Ứng dụng đã có thể đăng nhập/đăng ký. Khách hàng lướt xem được toàn bộ danh mục và danh sách sản phẩm cơ bản trên app.

---

## 🏃 Sprint 2: E-Commerce & Core Profile (Tuần 3 - Tuần 4)
**Mục tiêu (Sprint Goal):** Xây dựng luồng cốt lõi quyết định doanh thu của app: Quy trình quyết định mua hàng (Cart/Checkout) và Quản lý thông tin tối quan trọng của Chủ/Pet.

**Danh sách User Story (Backlog Iteration):**
1. 🏷️ **Product Detail** (`product-detail-requirement.md`): Slider hình ảnh động, Tabs mô tả, xử lý biến thể (Variants) phức tạp.
2. 🛒 **Shopping Cart** (`shopping-cart-requirement.md`): Quản lý local state giỏ hàng, áp mã giảm giá, tự động tính tổng tiền.
3. 💳 **Checkout Checkout** (`checkout-requirement.md`): Form giao hàng, Phương thức thanh toán, API Validation.
4. 🎉 **Order Success & Tracking** (`order-success-requirement.md`, `order-tracking-requirement.md`): Báo cáo đặt hàng, UI Order Timeline Stepper.
5. 🐾 **User & Pet Profile** (`profile-requirement.md`): Trang chủ Profile dashboard, Edit Profile form / Avatar Camera Upload.

*» Milestone Sprint 2 Output:* Một E-commerce Web/App hoạt động hoàn chỉnh từ bước xem Chi tiết tới khi Thanh toán và Theo dõi mã Vận đơn. User đã khai báo được thông tin Thú cưng.

---

## 🏃 Sprint 3: Core Service Booking & User Retention (Tuần 5 - Tuần 6)
**Mục tiêu (Sprint Goal):** Giải quyết nghiệp vụ phức tạp nhất (Đặt lịch Spa/Phòng khám), đồng thời hoàn thiện hệ sinh thái Chăm sóc Khách hàng (Lịch sử Y tế, Thông báo Cảnh báo).

**Danh sách User Story (Backlog Iteration):**
1. 📅 **Service Booking** (`service-booking-requirement.md`): UI Multi-step form khổng lồ (Chọn Dịch vụ -> Thú cưng -> Giờ -> Cơ sở -> Bác sĩ).
2. 🏥 **Pet Records** (`pet-records-requirement.md`): 5 trang giao diện Lịch sử (Vaccines, Tiêm chủng, Hoá đơn...). Tập trung xây dựng Component Card Tái sử dụng.
3. 🔔 **Alerts & Settings** (`settings-alerts-requirement.md`): Trang Thông báo động theo Theme Color và màn Cấu hình Preferences (Address, Payment Cards, Darkmode...).

*» Milestone Sprint 3 Output:* Toàn bộ User Stories đã đóng Release. App có khả năng xử lý dịch vụ thú y thay vì chỉ là App mua bán đồ ăn chăn nuôi thuần tuý. SSẵn sàng cho UAT (User Acceptance Testing) và Launch.
