dựa vào  bản design dưới đây
- phân tích các thành phần để tạo thêm cho tôi các trang hoàn chỉnh
- cấu hình cơ bản tuân thủ theo file design.md đã upload

- Ứng dụng: Dịch vụ theo dõi sức khỏe cho thú cưng, spa, khám chữa bệnh và kết hợp bán đồ cho thú cưng - chủ yếu là chó và mèo

- Tech Stack UI: ionic/angular
- RTL: true
- dark mode: support
- App layout: single column
- Bottom menu: home, categories, scan (FAB type), alert, profile, Icon được active khi được selected và có màu primary, tối màu khi không được selected
- Header: App title: **paws-icon** Paws & Whiskers, bên phải có cart icon
- 

# Items
* Các item đều có padding-left, padding-right: 16px so với screen
# Pages
## trang home:  
*  **Tổng quan**: phân tích và giữ nguyên bố cục và các thành phần, phần header thêm stack menu icon bên trái và app-title: Paws&Whiskers giữa và cart icon bên phải
*  **slide** dạng carousel chấm tròn, nội dung fit vừa trong khung hình, mỗi slide có hình background with opacity 0.5  
*  **categories** dog (dog-icon), cat (cat-icon), clininc (clininc-icon), services (scissors-icon), accessories (accessories-icon), pharmacy (pharmacy-icon)
*  **New arrivals** label on the left side and see all button on the right side
*  **New arrivals product** display dạng list horizontal scroll with 10 items
*  **Everything for dog** label on the left side 
* **Everything for dog banner**: hình ảnh banner với nội dung: Foo, toy, and essentials, nút explore màu trắng bên dưới
*  **Everything for dog product** display dạng list horizontal scroll with 10 items
* **Everything for cat banner**: hình ảnh banner với nội dung: Foo, toy, and essentials, nút explore màu trắng bên dưới
*  **Everything for cat** label on the left side and see all button on the right side
*  **Everything for cat product** display dạng list horizontal scroll with 10 items
* **Tin tức cập nhật** label on the left side and see all button on the right side
* **Tin tức cập nhật item** display dạng flat list: left image, right content with title, subcontent
* **bottom menu** follow style of bottom menu
* **back to top button** follow style of bottom menu, color primary, icon up arrow, display when scroll down too much



## categories page: 
*  header và bottom menu giữ nguyên giống trang #home
* **nội dung bố cục top**: **search bar**: follow home page, *left side**: listout all parent categories  single col with vertical scroll, **right side**: content display list child category,
display 2 columns: category item: thumpnail, cat title, xem thêm >

## category detail list
* header và bottom menu giữ nguyên giống trang #home
* search bar: follow home page  
* hiển thị toàn bộ sản phẩm trong categories đó
* Tạo toàn bộ màn hình cho từng categories khi được active
* back to top button follow style of bottom menu, color primary, icon up arrow, display when scroll down too much


## Alert page
* hiển thị danh sách các loại thông báo, cảnh bó và nhắc nhở: 
- lịch tiêm vaccine: icon- ống tiêm on the left side, on the right side có nội dung: title: Medical - critical (red color), content: sắp đến lịch tiêm vaccine cho Max, subcontent: Vắc xin dại(hằng năm) cho Max cần dược tiêm trước ngày 15/05/2026 tại phòng 
khám của Paw & Whiskers Health Center, button: book now (critical color)
- lịch khám bệnh: icon- ống nghe  on the left side, on the right side có nội dung: title: Health - Reminder (blue color), content: sắp đến lịch khám bệnh cho Max, subcontent: Hãy đưa Max đến các phòng khám của Paws & Whiskers Health Center để kiểm tra sức khỏe định kỳ cho Max, button: book now (blue color)
- lịch spa: icon-kéo cắt tóc on the left side, on the right side có nội dung: title: Service - Special Offer (purple color), content: Ưu đãi đặc biệt: Gói spa 'Groom & Glow', subcontent: Giảm 15% gói spa toàn diện cho Max. Đặt ngay để nhận ưu đãi, Button: Xem Ưu đãi (purple color)
- lịch mua thức ăn: icon- túi thức ăn on the left side, on the right side có nội dung: title: Food - Reminder (blue color),, content: Khám phá các sản phẩm thức ăn mới về dành cho Max, subcontent: Các sản phẩm mới về mà Max có thể thích, button: shop now (blue color)
- lịch mua thuốc: icon-thuốc on the left side, on the right side có nội dung: title: Medicine - Recurring (yellow color), content: Nhắc nhở thuốc PawsGuard, subcontent: Xác nhận đã uống - toggle button, Button: Xem đơn thuốc (yellow color)
- tình trạng đơn hàng: icon-hộp hàng on the left side, on the right side có nội dung: title: Order - Status (green color), content: Đơn hàng #123456789 đã được giao thành công, subcontent: gói đồ chơi và pate hữu cơ 'Organi-Treats' cho Max đã được giao tới bạn, button: Xem chi tiết (green color)
- sinh nhật Pet: icon-bánh sinh nhật on the left side, on the right side có nội dung: title: Birthday - Celebration (pink color), content: Chúc mừng sinh nhật Max!, subcontent: Max tròn 3 tuổi hôm nay! Nhận ngay voucher 20% cho lần spa tiếp theo, button: Xem ưu đãi (pink color)
## Nếu chưa login thì tạo trang login or register
* hình nền chó golden con và mèo ngồi cạnh nhau, opacity hồng phần trên cùng và hơi dậm dần xuống dưới
icon-paw và title: Paws & Whiskers 
* phần dưới cùng là button login button có màu primary và text màu trắng và register button có màu primary có opacity và text màu primary trắng
note title: by continuing, you agree to our **Terms of Service** and **Privacy Policy**, hyper link to terms of service and privacy policy
## Tạo trang register 
header left icon back, title: Register
* hình nền chó golden con và mèo ngồi cạnh nhau bo tròn
title: Join the Pack - chữ đâm
subtitle: Create an account to start pampering your pet - chữ thường
* form register: Full name, email: validate email, phone number: validate phone number, password: validate password, confirm password: validate password, button register: primary color, text color trắng
* có bao gồm social login: fb, tiktok, google
* thông báo lỗi tồn tại tài khoản
## Tạo trang nhập OTP to verify phone number
* **header left icon back, title: Verify Phone Number**
* ** ô nhập số otp 6 ký tự**: dạng input number, mỗi ô 1 số, có gạch ngang giữa các số
* **button verify**: primary color, text color trắng
* **button resend code**: primary color, text color trắng
* **thông báo đếm ngược 30 giây**: Mã OTP sẽ hết hạn sau 30 giây
## tạo trang login 
* header left icon back, title: Login
* hình nền chó golden con và mèo ngồi cạnh nhau bo tròn
* Title: Welcome Back - chữ đậm
* subtitle: Login to continue pampering your pet - chữ thường
* form login: email: validate email, password: validate password, eror type: inline, button login: primary color, text color trắng
* Login with FaceID: icon-faceid, title: Login with FaceID, button primary color, text color trắng
* có bao gồm social login: fb, tiktok, google
* Thông báo lỗi:  khi login không thành công
* Quên mật khẩu: hyper link to forgot password page

## Tạo trang lấy lại mật khẩu
* header left icon back, title: Forgot Password
* hình nền chó golden con và mèo ngồi cạnh nhau bo tròn
* Title: Forgot Password - chữ đậm
* subtitle: Enter your email address to reset your password - chữ thường
* form: email: validate email, button reset password: primary color, text color trắng
* thông báo lỗi: email không tồn tại
* thông báo lỗi: Mã OTP không chính xác
## Tạo trang đổi mật khẩu
* header left icon back, title: Change Password
* form: current password: validate password, new password: validate password, confirm password: validate password, button change password: primary color, text color trắng
* thông báo lỗi: password không khớp
* thông báo lỗi khác: đổi mật khẩu không thành công
## Nếu đã login thì tạo trang profile 
* header left icon back, title: Profile
* bao gồm thông tin chủ pet : avatar, name, email, phone, address, button edit profile: primary color, text color trắng
* bên dưới thông tin của pet: title: Max's Bio, Avatar pet, button edit bio: primary color, text color trắng
* **Vaccination Recors section**: with icon-ống tiêm, title: Vaccination Records
* **clinnic records section**: with icon-hộp chữ thập title: Clinic Visits
* **grooming records section**: with icon-kéo cắt tóc, title: Grooming Records
* **Appointment section**: with icon-lịch, title: Appointments
* **food records section**: with icon-túi thức ăn, title: Food Records
* **medicine records section**: with icon-thuốc, title: Medicine Records
* **order records section**: with icon-hộp hàng, title: My Orders, sub content: View your order history and track current shipments
* **Payment Methods**: sub content: Manage your payment methods 
* **Billing and Shipping Information**: sub content: Manage your billing and shipping information
* ** App Setting section**: with icon-gear, title: App Settings
* **Logout**: button:LOG OUT (primary color, text color trắng) on right side + icon logout, full width

## tạo trang update profile cho chủ pet và cho pet
* header left icon back, title: Update Profile
* avatar: round with button camera icon edit avatar on the right side - primary color
* title: Pet Owner Information
* form update profile section: Full name, email: validate email, phone number: validate phone number, address: validate address, button update profile: primary color, text color trắng
* title: Pet Information
* Pet's Avatar: round with button camera icon edit avatar on the right side - primary color
* form update pet section: Pet's Name, Pet's Breed, Pet's Gender, Pet's Age, button update pet: primary color, text color trắng
## tạo trang List Vaccination Records
* Hiển thì card flatlist các vaccination records with single column
* mỗi vaccination record có: icon-ống tiêm, content list: Thông tin ngày chích ngừa, loại vắc xin, cơ sở thú y, bác sĩ thú y, các mục kèm icon
## tạo trang List Clinic Visits
* Hiển thì card flatlist các clinic visits
* mỗi clinic visit có: icon-hộp chữ thập, content list: Thông tin ngày khám, cơ sở thú y, bác sĩ thú y, chẩn đoán, đơn thuốc, 
## tạo trang List Appointments
* Hiển thì card flatlist các appointments
* mỗi appointment có: icon-lịch, content list: Thông tin ngày appointment, cơ sở thú y, bác sĩ thú y, trạng thái: upcoming, completed, cancelled 
* ghi chú: upcoming: màu vàng, completed: màu xanh lá, cancelled: màu đỏ
## tạo trang List Food Records
* Hiển thì card flatlist các food records with single column
* mỗi food record có: icon-túi thức ăn, content: Thông tin ngày mua, loại thức ăn, cơ sở thú y, bác sĩ thú y
## tạo trang List Medicine Records
* Hiển thì card flatlist các medicine records with single column
* mỗi medicine record có: icon-thuốc, content: Thông tin ngày mua, loại thuốc, cơ sở thú y, bác sĩ thú y


## tạo trang List App Settings
* Hiển thì item flatlist các setting: icon + title + sub title + icon ỏ toggle button
* **Account**:
- Edit profile: icon-user, title: Edit profile, icon >
- Change password: icon-lock, title: Change password, icon >
- save address: icon-address, title: Save Address, icon >
- Payment methods: icon-payment, title: Payment Methods, icon >
- Login with FaceID: icon-faceid, title: Login with FaceID, toggle button, color primary
* **Notification**:
- Push notification: icon-bell, title: Push notification, toggle button, color primary
- Email notification: icon-email, title: Email notification, toggle button, color primary
* **Preferences**:
- Language: icon-earth, title: Language, English, icon >
- dark mode: icon-dark, title: Dark mode, toggle button, color primary
- Currency: icon-currency, title: Currency, VND ,icon >
* **Support & About**:
- About us: icon-info, title: About us, icon >
- Terms of Service: icon-terms, title: Terms of Service, icon >
- Privacy Policy: icon-privacy, title: Privacy Policy, icon >
- Contact us: icon-contact, title: Contact us, icon >
- App version:  version 1.0.0
## Tạo trang About us
* header left icon back, title: About us
* content: auto generate text for contact
## Tạo trang Privacy Policy
* header left icon back, title: Privacy Policy
* content: auto generate text
## tạo trang Terms of Service
* header left icon back, title: Terms of Service
* content: auto generate text

## tạo trang List Billing and Shipping Information
* Hiển thì card flatlist các billing and shipping information with single column
* thêm, sửa, xóa billing and shipping information
## tạo trang update Billing and Shipping Information
* tạo form update billing and shipping information: name: required, address 1: required, address 2: optional, phone: required, email: required, button update: primary color, text color trắng
* eror type: inline
## tạo trang List My Orders
* Hiển thì card flatlist các my orders with single column
* thông tin order: icon-hộp hàng, content: mã order, ngày order, trạng thái: upcoming, completed, cancelled 
* ghi chú: upcoming: màu vàng, completed: màu xanh lá, cancelled: màu đỏ
## tạo trang List Payment Methods
* Hiển thì card flatlist các payment methods with single column
* mỗi payment method có: icon-thẻ, content: thông tin payment method, trạng thái: active, inactive 
* ghi chú: active: màu xanh lá, inactive: màu đỏ
* Button thêm payment method: primary color, text color trắng
* button Xóa payment method: secondary color, text color trắng

## product detail: tạo trang product detail khi click vào product ở mọi nơi
* header left icon back, title: Product Detail, right icon share
* content: 
- product image: full width, carousel slide with count 1/5, display Sold Out if product is sold out: Sold Out (primary color) at center of image with opacity 50%
- on top-right display discount percentage -20% (primary color)
- category: title
- product name: title: display on 2 line, display ... if more than 2 lines
- brand: title: hyper link to brand page-underline + primary color
- product status: còn hàng (primary color) or hết hàng (primary color)
- product price: original price: title + currency (strikethrough) + primary color, discount price: title + currency (grey color)
- product rating: badge with icon-star, title + (number of reviews): underline
- select variable weight: 1kg, 2kg, 3kg, 4kg, 5kg, size: S, M, L, XL, age: 1-3 months, 3-6 months, 6-12 months, 12+ months
- product description: tab: description, ingredients, nutritional information, feeding guide, storage instructions
- product related: Grid reponsive 2 columns
- button: Add to Cart (icon cart + primary color, text color trắng) at bottom right, Quantity: button + - and number, default 1, fixed position on bottom, background color white follow style of bottom menu
- back to top button follow style of bottom menu, color primary, icon up arrow, display when scroll down too much

## tạo trang shopping cart
* header left icon back, title: Shopping Cart
* content:
- list product in cart: image, product name, product price, variable product (weight, size, age), product quantity can increase or decrease, product total, icon remove on top-right or swipe left to remove
- apply coupon: text input, icon coupon, placeholder: Enter coupon code, button apply (secondary color, text color trắng), error type: inline
- Order Summary: card with subtotal, shipping, tax, total
- subtotal: title + currency + price
- shipping: title + currency + price
- tax: title + currency + price
- total: title + currency + price: Primary color, bold
- button: Checkout (primary color, text color trắng) full width at bottom

## Tạo trang checkout
* header left icon back, title: Checkout
* content: 
- Shipping Address: card with name, address, phone, button edit: badge with icon edit + text edit (primary color)
- shipping method: card with shipping method label, radio button: color primary, outline selected: color primary,title: Standard Delivery/ Express Delivery,sub title: 3-5 business days/ 1-2 business days, price: free/ 10000 VND: color primary
- payment method: card with payment method label, radio button: color primary, outline selected: color primary,title: Credit/Debit Card Card ***4242, exp: 12/2026/ / Momo/ ZaloPay, VNPay, Paypal
- section Ỏder Summary
- Order Summary: card with subtotal, shipping, tax, total
- subtotal: title (item count) + currency + price
- shipping: title + currency + price
- tax: title + currency + price
- total: title + currency + price: Primary color, bold
- button: Place Order (primary color, text color trắng) full width at bottom

## tạo trang  order success
* header left icon back, title: Order Success
* content: 
- icon success: primary color, size 100px
- title: Yay! Your Pet is Going to Love This!: bold
- sub title: Thank you for shopping with us. We're currently preparing your treats with extra love and paws.
- order number: Order Number: #12345: bold, color primary
- estimated delivery: Estimated Delivery: 12/12/2022: bold
- Delivery Address: title: Delivery Address, content: post code, address
- Payment Summary: title: Payment Summary, content: subtotal: price, shipping: price/free, tax: price, Total Paid: price: bold, color primary
- button: Continue Shopping (primary color, text color trắng) full width at bottom
## Tạo trang order detail
* header left icon back, title: Order Detail
* content: 
-  status: packed, shipped, delivered, cancelled
-  estimate delivery: 12/12/2022: bold
-  if status is packed: button: Cancel Order (primary color, text color trắng)
- if status is shipped: button: Track Order (primary color, text color trắng)
- if status is delivered: button: Rate Order (primary color, text color trắng)
- if status is cancelled: button: Reorder (primary color, text color trắng)
## Tạo trang tracking order
* header left icon back, title: Tracking Order
* Order Journey: Milestones: Mỗi vòng tròn (Order Placed: date, time, Processed: date, time, Shipped: date, time, Out for Delivery: date, time, Delivered: date, time) được gọi là một "mốc quan trọng"
* passed milestone: color primary, icon checked, title bold, black color
* current milestone: color primary, icon circle with outline color primary opacity 50%, title bold, primary color
* future milestone: color grey, icon circle, title bold, grey color
* courier: title: Courier Information, content: name: bold
* If not cancel: display tracking number:#PL-8293-111: bold, color primary, icon-copy
* list product in order: image, product name, product price, variable product (weight, size, age), product quantity, product total
## Tạo trang rating product
* header left icon back, title: Write a Review
* content:
- card with product image, product name, product price: color primary, variable product (weight, size, age)
- rating: Title: How Would You Rate This Product? 5 stars, color primary, tap to rate
- share your thoughts: text input, border color primary, placeholder: Write your review...
- Add Photo: line 1: title: Add Photo left, Max 4 photos right, line 2: button icon camera + text Add (primary color, text color primary), outline border color primary, border radius 10px, border dashed 1px:color primary,
added photos: image, icon delete on top-right
- button: Submit Review (primary color, text color trắng) full width at bottom, navigate to login if not logged in
## Tạo trang tin tức
* header left icon back, title: Tin tức
* content: auto generate text for contact
## Tạo trang Service booking
* header left icon back, title: Book Service
* Label: Selectc Service left - STEP 1 of 3 right
* List of services card with image, service tittle, horizontal scroll
* Label: Who í it for? left
* list of pets card with image round, pet name, checked icon on top-bottom, color primary, border color primary
* Label: Select Date and Time
* Date picker: color primary, text color trắng
* Time: Pill select, color primary, text color trắng: 8:00 AM, 9:00 AM, 10:00 AM, 11:00 AM, 12:00 PM, 1:00 PM, 2:00 PM, 3:00 PM, 4:00 PM, 5:00 PM, 6:00 PM, 7:00 PM, 8:00 PM, 9:00 PM, 10:00 PM, 11:00 PM
* select clinic: List of clinic card with image, clinic name, address, phone, border color selected primary, icon check on top-bottom
* Select Professional: List of professional card with image, professional name, professional title, Major, experience, rating border color selected primary, icon check on top-bottom
* Special Requests: text input, border color primary, placeholder: Tell us About your pet's condition or any specific needs...
* button: Confirm Booking (primary color, text color trắng) at bottom right
* Est Total: currency + price (primary color)






