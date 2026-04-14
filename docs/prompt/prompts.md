# Prompt Template: Product Owner / BA Analysis
    
Dưới đây là prompt góc (System message/Task assign) được sử dụng để đóng vai trò Product Owner và Business Analyst phân tích yêu cầu từ bản thiết kế sang User Story và Technical Blueprint. Có thể tái sử dụng cho các dự án/module mới:

```markdown
@[paws-and-whiskers/.cursor/plan/rules/base.mdc]
@[/Volumes/Data/Dat Projects/Paw and whisker/paws-and-whiskers/design/app-requirement.md] 
@[/Volumes/Data/Dat Projects/Paw and whisker/paws-and-whiskers/design/stitch_assets] 
@plan/rules/base.md 

@Plan Hãy thực hiện vai trò Product Owner/BA dựa trên quy tắc tại .cursor/plan/rules/base.mdc và .cursor/plan/rules/requirements.mdc.

Nhiệm vụ: Create user story for each screen trong stitch_assets
Yêu cầu thực hiện:

Impact Analysis: 
- liệt kê các thành phần trong trang
- mô tả các thành phần theo đúng tỷ lệ và yêu cầu
- liệt kê các hành động, logic cho từng thành phần: click action, navigation, behavior scroll

Technical Blueprint: 
- phác thảo các modules, routing theo mô hình lazyloading
- Phác thảo các DTO model, service, API Endpoints (Method, Path, Request/Response sơ bộ).
- Phác thảo dùng ngrxJS, Rxjs
- Phác thảo các thư mục cần có

Output File: Sau khi tôi confirm logic, hãy xuất file User Story chi tiết vào đường dẫn: docs/requirements/**page-name**-requirement.md (Sử dụng template @user-story.mdc).

Ràng buộc: 
> - Chỉ tập trung vào UI xử lý giao diện và behavior, không lấn sang Backend.

Tuân thủ Clean Architecture.

KHÔNG VIẾT CODE, chỉ trình bày giải pháp và AC (Acceptance Criteria)."

Khi tạo xong mỗi US cho một màn hình cần review chờ xác nhận để làm các màn hình tiếp theo.

Handoff: Sau khi hoàn tất, hãy cập nhật trạng thái [READY] vào file .cursor/shared/integration/plan-dev.mdc theo đúng giao thức bàn giao.
```
