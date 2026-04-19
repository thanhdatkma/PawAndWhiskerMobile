# Paws & Whiskers Application Structure & DTO Models

Tài liệu này tổng hợp cấu trúc thư mục UI theo chuẩn Clean Architecture và danh sách các DTO Models cần thiết cho mỗi module trong hệ thống Paws & Whiskers.

## 1. Cấu trúc thư mục Component (Frontend Structure)

Hệ thống được chia module theo tính năng (Feature-based Modular Architecture) chạy lồng trong thư mục `src/app/`.

```text
src/
└── app/
    ├── core/                          # [CORE] - Các module hệ thống chạy xuyên App
    │   ├── models/                    # Nơi chứa các Interface/DTOs dùng chung
    │   ├── services/                  # Các HTTP API Service
    │   └── store/                     # Core State NgRx (Auth, Cart, Settings)
    ├── shared/                        # [SHARED] - Các UI Component dùng chung (Buttons, Cards)
    │   └── components/
    │       ├── product-card/          # [DONE] ProductCardComponent — discount badge, fav, star, price, add-to-cart
    │       ├── product-section/       # [DONE] ProductSectionComponent — section header + horizontal scroll shell
    |       ├── base-components/       # [DONE] Common properties: isLoading, destroyed$ (for Unsubscribe), userProfile.
    |       |                          Common methods: back(), navigate(path), trackByFn, showAlert/Toast.
    |       |                          Requirement: All Page Components must extend BaseComponent.
    │       └── back-to-top-fab/       # [DONE] BackToTopFabComponent — animated FAB, driven by scroll threshold
    └── pages/                         # [PAGES] - Các màn hình tính năng (Feature Modules)
        ├── auth/                      # Welcome, Login, Register, OTP Verify, Password Mgt
        ├── home/                      # Home Page layout
        ├── categories/                # Danh mục cấu trúc cây & Màn Master
        ├── category-detail/           # Danh sách item theo danh mục (Infinite scroll)
        ├── product-detail/            # Chi tiết sản phẩm, variant, desc
        ├── cart/                      # Shopping Cart & Order Summary
        ├── checkout/                  # Thanh toán, Shipping, Payment selection
        ├── order/                     # Order Success & Timeline Tracking
        ├── profile/                   # Dashboard User & Thú cưng + Edit Profile
        ├── records/                   # Lịch sử y tế, Vacxin, Lịch hẹn (Dùng grid chung)
        ├── book-service/              # Màn hình đặt lịch Spa/Phòng khám (Multi-step form)
        ├── alerts/                    # Danh sách thông báo Notification theo màu sắc
        └── settings/                  # Cấu hình App, Địa chỉ, Quản lý thẻ, Static links
```

---

## 2. DTO Models Mapping cho từng Màn hình / Tính năng

Phác thảo cấu trúc Data Transfer Object cho các tương tác giữa Web-UI và Backend.

### 2.1. Nhóm Authentication & Bảo mật (AuthModule)
| DTO Name | Properties | Chức năng (Screen) |
|---|---|---|
| `LoginRequestDTO` | `email`, `password`, `faceIdToken?` | Login.html |
| `RegisterRequestDTO`| `fullName`, `email`, `phone`, `password` | Register.html |
| `AuthResponseDTO` | `accessToken`, `refreshToken`, `user: UserProfileDTO` | Cả Login và Register |
| `VerifyOtpDTO` | `targetEmailOrPhone`, `otpCode` | Xác thực OTP Account |
| `ForgotPasswordDTO` | `email` | Điền thông tin quên pass |
| `ChangePasswordDTO` | `oldPassword`, `newPassword` | Đổi mật khẩu trong App |

### 2.2. Nhóm Trang chủ (HomeModule)
| DTO Name | Properties | Mổ tả |
|---|---|---|
| `BannerDTO` | `id`, `imageUrl`, `title`, `linkTo` | Dữ liệu slider carousel quảng cáo |
| `CategoryHeaderDTO` | `id`, `title`, `iconName`, `type` | Icon lưới danh mục đầu trang Home |
| `ProductBriefDTO` | `id`, `name`, `coverImage`, `price`, `discountPrice`, `isNew`, `rating` | Dữ liệu card sản phẩm (ngang/dọc) |
| `NewsBriefDTO` | `id`, `title`, `summary`, `thumbnailImage` | Danh sách tin tức nhỏ |

### 2.3. Nhóm Danh mục & Khám phá (CategoryModule)
| DTO Name | Properties | Mô tả |
|---|---|---|
| `CategoryTreeDTO` | `id`, `name`, `iconUrl`, `children: CategoryTreeDTO[]` | Render màn Master chứa menu cha-con |
| `PaginationMetaDTO` | `currentPage`, `totalPages`, `totalItems` | Siêu dữ liệu phân trang Load More API |

### 2.4. Nhóm Chi tiết Sản phẩm (ProductDetailModule)
| DTO Name | Properties | Mô tả |
|---|---|---|
| `ProductDetailDTO` | `id`, `name`, `brandInfo`, `images[]`, `descriptionTabs`, `variants[]` | Load toàn bộ trang chi tiết |
| `ProductVariantDTO`| `id`, `optionCombination` (e.g. `1kg|L`), `price`, `stockStatus` | Dùng để render Dynamic Dropdown |

### 2.5. Nhóm Cửa hàng & Thanh toán (Cart/Checkout)
| DTO Name | Properties | Mô tả |
|---|---|---|
| `CartItemDTO` | `id`, `productId`, `variantId`, `qty`, `unitPrice` | Sản phẩm trên một dòng giỏ hàng |
| `CartSummaryDTO`| `subtotal`, `tax`, `shipping`, `discount`, `total` | Khu vực tính tiền |
| `CheckoutDataDTO`| `defaultAddress`, `defaultPaymentId`, `shippingMethods[]` | Render trước UI màn Checking Out |
| `ShippingMethodDTO`| `id`, `name`, `description`, `flatFee` | Option giao hàng |
| `PaymentMethodDTO`| `id`, `name`, `providerCode`, `iconUrl` | Lựa chọn Momo, VNPay, Card |

### 2.6. Nhóm After-sales (OrderModule)
| DTO Name | Properties | Mô tả |
|---|---|---|
| `OrderSummaryDTO` | `id`, `orderNumber`, `estimateDeliveryDate`, `totalPaid`, `addressStr` | Trả về màn Yay! Order Success |
| `OrderTrackingDTO`| `id`, `trackingNumber`, `courierName`, `milestones[]`, `products[]` | Render Tracking Timeline |
| `TrackingMilestoneDTO`| `statusText`, `dateStr`, `timeStr`, `isCurrentStep` | Trạng thái nút check/vòng tròn |

### 2.7. Nhóm User/Pet Profile & Records
| DTO Name | Properties | Mô tả |
|---|---|---|
| `UserProfile` | `id`, `name`, `email`, `avatar`, `membership`, `pet?` | Dashboard Profile |
| `Pet` | `id`, `name`, `breed`, `weight`, `age`, `nextVaccine`, `image` | Dashboard Thú cưng |
| `HealthRecordDTO`| `id`, `recordType` (vaccine/clinic/food), `date`, `providerName`, `doctor`, `notes` | Base class cho mọi Flat list Y tế |

### 2.8. Nhóm Đặt Lịch Dịch Vụ (BookingModule)
| DTO Name | Properties | Mô tả |
|---|---|---|
| `BookingPayloadDTO` | `serviceId`, `petId`, `clinicId`, `professionalId`, `date`, `timeSlot`, `remark` | Push Request API khi Submit |
| `ClinicBranchDTO` | `id`, `name`, `addressText`, `phone`, `lat`, `lng` | Dropdown địa điểm |
| `ProfessionalDTO` | `id`, `name`, `title`, `avatar`, `major`, `experienceYears`, `rating` | Bác sĩ / Nhân viên Grooming |

### 2.9. Nhóm Cấu hình & Thông báo (Settings & Alerts)
| DTO Name | Properties | Mô tả |
|---|---|---|
| `SystemSettingsDTO`| `isDarkMode`, `languageCode`, `notificationEnabled`, `currency` | Bật/tắt switch |
| `AlertNotificationDTO`| `id`, `typeCode`, `title`, `contentStr`, `actionUrl`, `themeColor` | Card nhắc nhở/ thông báo lịch hẹn |
