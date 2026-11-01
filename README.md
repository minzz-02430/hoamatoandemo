# Hoa Ma Toán CRM — chức năng và phân quyền

## Thành phần chạy

- `tes1.html`: trang đăng nhập và khung ứng dụng.
- `style.css`: giao diện desktop/mobile, bảng, biểu mẫu và hộp thoại.
- `portal.js`: dữ liệu demo, điều hướng theo vai trò, quy tắc hiển thị, CRUD và lưu trạng thái cục bộ.
- `db.dbml`: sơ đồ database DBML với khóa chính, khóa ngoại và các quan hệ nghiệp vụ chính.

Mở `tes1.html` bằng trình duyệt để chạy bản demo. Tài khoản được chọn từ danh sách vai trò; tên đăng nhập được điền tự động. Mật khẩu demo là `123456`. Giao diện dùng HTML/CSS/JavaScript thuần, Font Awesome cho icon và không dùng Tailwind CSS hoặc Bootstrap. Sau khi đăng nhập, bộ chọn “Vai trò demo” trên header cho phép chuyển nhanh giữa bốn dashboard để xem thử.

Dashboard Admin dùng layout nền sáng, sidebar trắng và màu cam làm điểm nhấn; có đồng hồ, nút xuất báo cáo CSV, bốn thẻ KPI, biểu đồ doanh thu/thu học phí và sĩ số lớp bằng Chart.js, bảng học phí quá hạn với thao tác ghi nhận nhắc phí, cùng lịch lớp. Biểu đồ dùng dữ liệu mẫu trong ứng dụng và hiển thị tooltip khi rê chuột; cần kết nối mạng để tải Chart.js từ CDN. Các thao tác và dữ liệu vẫn là bản demo lưu cục bộ trên trình duyệt, chưa kết nối dịch vụ gửi nhắc phí hoặc kế toán thật.

Vai trò **Quản lý cơ sở** có năm mục điều hướng chính: Vận hành ngày, Quản lý Lớp & Lịch học, Học vụ & Chăm sóc, Thu ngân và Báo cáo cơ sở. Dashboard hiển thị KPI theo dữ liệu học viên/giáo viên/lớp, cảnh báo công nợ và phát hiện lịch trùng phòng; thao tác nhanh mở biểu mẫu thêm học viên, xếp lịch bù, tạo phiếu thu và xem giáo viên cơ sở. Nhật ký hoạt động là dữ liệu minh họa; các thay đổi được lưu trong trình duyệt.

Dashboard **Quản trị viên** rút gọn sidebar còn năm mục chính; các phân hệ khác vẫn truy cập được qua menu “Mở các phân hệ khác”. Hồ sơ phụ huynh trình bày lịch học bằng ma trận Thứ 2–Chủ nhật và có thanh tiến trình chuyên cần/học phí. Bộ chọn vai trò ở header chỉ phục vụ demo phía trình duyệt, không thay thế xác thực hoặc phân quyền phía máy chủ.

Phân hệ **Tài chính - Kế toán** dành cho quản trị viên có các tab Báo cáo dòng tiền, Quản lý Thu, Quản lý Chi và Công nợ; lọc kỳ theo tháng; tổng kết thu, chi, lợi nhuận và công nợ; biểu đồ cột Thu/Chi sáu tháng có tooltip; tạo/sửa/xóa phiếu, xuất CSV; và ghi nhận thanh toán công nợ để cập nhật đồng thời hóa đơn học phí và sổ thu. Đây là dữ liệu demo cục bộ, không thay thế nghiệp vụ kế toán hoặc thanh toán ngân hàng thật.

Phân hệ **Báo cáo thống kê** có lọc tháng, KPI học viên/lớp/chuyên cần/doanh thu, biểu đồ donut theo cấp học, biểu đồ kết hợp cột/đường tăng trưởng học viên và doanh thu sáu tháng, cùng bảng sĩ số, chuyên cần và điểm trung bình theo lớp/giáo viên. Chuyên cần dưới 70% được tô đỏ; CSV tổng hợp kỳ và chức năng in trình duyệt cũng có sẵn. Dữ liệu lịch sử học viên và các lượt điểm danh/điểm mẫu được cung cấp để biểu đồ và cảnh báo có thể xem thử; các chỉ số vẫn là báo cáo demo theo dữ liệu cục bộ.

Phân hệ **Hồ sơ học viên** hiển thị danh sách thẻ ngang có avatar, khối lớp, lớp học và cơ sở; chọn một học viên để mở hồ sơ cá nhân cùng lịch định kỳ từ Thứ 2 đến Chủ nhật. Có thể chuyển tuần trước/sau hoặc quay lại tuần hiện tại; lịch rỗng hiển thị rõ trạng thái chưa có buổi học. Admin xem toàn bộ học viên, giáo viên chỉ xem học viên thuộc lớp được giao, phụ huynh chỉ xem học sinh liên kết. Hồ sơ và lịch mẫu được lưu ở `studentProfiles` và `studentSchedules`, tự bổ sung khi nâng cấp dữ liệu localStorage cũ.

Phân hệ **Học phí phụ huynh** hiển thị tổng công nợ, trạng thái và hạn đóng từng kỳ; xem chi tiết số buổi, đơn giá, khấu trừ kỳ trước, phụ phí tài liệu và tổng tiền; đồng thời tra cứu lịch sử thanh toán. Hành động VietQR được mô phỏng và yêu cầu xác nhận trước khi đổi trạng thái; xác nhận hợp lệ cập nhật hóa đơn và tạo phiếu thu trong sổ giao dịch để quản trị viên thấy được ở phân hệ Tài chính. Dữ liệu hóa đơn demo có liên kết học viên và hỗ trợ giá trị chi tiết mặc định cho hóa đơn cũ. Chưa kết nối ngân hàng hoặc phát sinh giao dịch thật.

Phân hệ **Kết quả học tập phụ huynh** tổng hợp chuyên cần theo môn bằng biểu đồ donut, điểm bài tập trung bình theo tháng bằng biểu đồ cột có tooltip, và bảng từng buổi gồm ngày học, môn, điểm danh, điểm BTVN và nhận xét. Kết quả lấy từ dữ liệu điểm danh/chấm điểm dùng chung với vai trò giáo viên; học sinh chưa có dữ liệu hiển thị trạng thái trống thay vì tự suy diễn điểm. Lịch sử demo mới được bổ sung có phiên bản, thêm các bản ghi còn thiếu vào localStorage hiện hữu mà không ghi đè những thay đổi khác.

## Ma trận quyền đang áp dụng

| Chức năng | Quản trị viên | Quản lý cơ sở | Giáo viên | Phụ huynh |
|---|---|---|---|---|
| Vận hành ngày, giáo viên cơ sở | Quản lý toàn hệ thống | Xem dashboard và danh sách giáo viên | Không truy cập | Không truy cập |
| CRM, chiến dịch tuyển sinh | Xem, thêm, sửa, xóa | Không truy cập | Không truy cập | Không truy cập |
| Học viên | Quản lý hồ sơ | Xem, thêm, sửa tại cơ sở | Chỉ xem học viên thuộc lớp được giao | Chỉ xem học sinh liên kết |
| Khóa học, lớp, lịch học | Quản lý | Xem lớp; quản lý lịch tại cơ sở | Chỉ xem lớp/lịch được giao | Chỉ xem khóa và lịch của học sinh liên kết |
| Điểm danh, kết quả | Quản lý | Không truy cập | Thêm/sửa trong lớp được giao | Chỉ xem dữ liệu học sinh liên kết |
| Bài tập, học liệu | Quản lý | Không truy cập | Thêm/sửa/xóa trong lớp được giao | Chỉ xem học liệu của lớp liên kết |
| Học phí, giao dịch, báo cáo | Quản lý | Quản lý học phí tại cơ sở | Không truy cập | Xem khoản của học sinh liên kết, xác nhận thanh toán demo và xem lịch sử |
| Nhân sự, chấm công, KPI, lương, lịch trực | Quản lý | Chỉ xem giáo viên cơ sở | Không truy cập | Không truy cập |
| CSKH | Quản lý phản hồi, kịch bản ZNS/SMS và gia hạn | Không truy cập | Không truy cập | Gửi và theo dõi yêu cầu của chính tài khoản |
| Cài đặt | Xem ma trận quyền, quản lý danh mục demo, xem nhật ký thao tác và khôi phục dữ liệu | Không truy cập | Không truy cập | Không truy cập |

Quyền trên được kiểm tra khi dựng menu, lọc dữ liệu và xử lý thao tác. Đây là **RBAC ở giao diện demo**, không phải hàng rào bảo mật cho dữ liệu thật.

## Sơ đồ database

Mở `db.dbml` bằng [dbdiagram.io](https://dbdiagram.io) hoặc công cụ hỗ trợ DBML để xem ERD. Sơ đồ đã được thu gọn về các bảng cốt lõi:

- **Tài khoản:** `users` lưu vai trò quản trị viên/giáo viên/phụ huynh; `student_guardians` liên kết phụ huynh với học sinh.
- **Đào tạo:** `courses` → `classes` → `enrollments`, nối tiếp tới giáo viên, điểm danh, kết quả và học liệu.
- **CRM & vận hành:** Lead/chiến dịch, yêu cầu hỗ trợ, thông báo, nhân sự/chấm công/bảng lương và nhật ký.
- **Tài chính:** `students` → `tuition_invoices` → `payments`, cùng các giao dịch thu/chi.

Các bảng cấu hình phụ và chi tiết ít dùng đã lược bỏ để ERD dễ đọc; có thể bổ sung khi triển khai backend.

## Đối chiếu các file thiết kế

### `Hòa Ma Toán CRM/`

- `Dashboard tổng quan.svg`: tổng quan học viên, doanh thu, học phí, lương, chuyên cần và lớp sắp tới.
- `CRM.svg`: quản lý Lead, lọc/trạng thái, chiến dịch marketing, thêm/xuất danh sách.
- `CSKH.svg`: quản lý phản hồi, kịch bản tự động ZNS/SMS và gia hạn khóa học.
- `Học vụ & đào tạo.svg`: nghiệp vụ đào tạo, lớp và lịch học.
- `Quản lý nhân sự.svg`: hồ sơ, chấm công/KPI, bảng lương và lịch trực.
- `Tài Chính - Kế Toán.svg`: báo cáo dòng tiền, thu/chi, công nợ học phí và phiếu thu/chi.
- `Báo Cáo.svg`: báo cáo học viên, lớp/khóa học, đánh giá giáo viên và học phí; có xuất/in báo cáo.
- `Setting.svg`: ma trận quyền, cấu hình danh mục và nhật ký hoạt động.
- `Admin đăng nhập.svg`, `Giáo viên đăng nhập.svg`, `Phụ huynh đăng nhập.svg`: ba biến thể đăng nhập theo vai trò.
- `Đăng nhập (Layout ngang) - iClass.svg` và `Đăng nhập (Layout ngang) - iClass-1.svg`: biến thể bố cục đăng nhập, không xác định vai trò riêng chỉ từ tên.
- `Building Blocks/state-layer/3. focused.svg` và `3. focused-1.svg`: trạng thái UI của component, hai file trùng nội dung; không phải màn hình nghiệp vụ.

### `Hòa Ma Toán CRM (2)/`

- `HỌC VIÊN.svg`, `GIÁO VIÊN.svg`, `KHÓA HỌC.svg`, `LỊCH HỌC.svg`, `HỌC PHÍ.svg`: danh sách/quản lý hồ sơ học viên, giáo viên, khóa học, lịch học và học phí.
- `02 - Danh sách học viên + Modal Thêm học viên.svg` và `...-1.svg`: danh sách học viên và biến thể modal thêm học viên.
- `06-giao-vien-modal-overlay.svg`, `Modal - Thêm nhân viên.svg`: hồ sơ giáo viên/nhân sự và modal thêm nhân viên.
- `09 - Khóa học danh sách + Modal Tạo khóa học.svg`, `10-khoa-hoc-lop-hoc-with-modal.svg`: danh sách/khởi tạo khóa học và lớp học.
- `Modal - Thêm lịch học.svg`: tạo lịch học.
- `Quản lý điểm danh - iClass (Giảng viên).svg`, `Tổng quan điểm danh.svg`, `Lịch sử điểm danh.svg`: giáo viên ghi nhận, xem thống kê và tra cứu lịch sử chuyên cần.
- `Lớp học đang phụ trách.svg`, `trang-chu-tra-cuu-nhanh.svg`: lớp được giao và trang tra cứu nhanh; gán vai trò giáo viên theo ngữ cảnh bộ thiết kế.
- `Quản lý kết quả học tập.svg`: quản lý điểm số và nhận xét.
- `Lịch Dạy bù.svg`: quản lý buổi dạy bù.
- `Trang chủ.svg`: trang chủ ứng dụng trong bộ màn hình quản lý.
- `chi tiết thông tin.svg`: màn hình chi tiết, tên file không đủ để xác định đối tượng cụ thể.
- `MODALS.svg`, `Modal Overlay.svg`, `div.modal.svg`, `div.modal-1.svg` đến `div.modal-4.svg`: trạng thái/họp thoại; tên file không thể hiện đầy đủ hành động nếu không có ngữ cảnh màn hình.
- `Frame.svg`, `Frame-1.svg` đến `Frame-16.svg`: 17 artboard tên chung; không thể kết luận đây là màn hình độc lập hay biến thể chỉ từ tên.
- `Admin đăng nhập.svg`, `Giáo viên đăng nhập.svg` và hai file đăng nhập layout ngang: các biến thể/điểm vào đăng nhập.

### `Hòa Ma Toán CRM (1)/`

- `Trang chủ Phụ Huynh.svg`: trang chủ phụ huynh.
- `Trang chủ học sinh + Thông tin giảng viên (Modal Overlay).svg`: trang chủ học sinh và hộp thoại thông tin giáo viên.
- `Khoá học - iClass (Cập nhật Navigation).svg`, `chi tiết khóa học.svg`: danh sách và chi tiết khóa học.
- `Kết quả học tập - iClass (Cập nhật Navigation).svg`, `Kết quả học tập - Chi tiết nhận xét (Popup).svg`: kết quả và xem nhận xét chi tiết.
- `Học phí - iClass (Cập nhật Navigation).svg`, `Thanh toán học phí (VietQR Popup) - iClass.svg`, `Lịch sử thanh toán học phí (Popup) - iClass (Sửa Background).svg`: công nợ, popup QR và lịch sử thanh toán.
- `Tin tức - iClass.svg`: tin tức dành cho gia đình/học sinh.
- `Danh sách học sinh - iClass (Cập nhật Navigation).svg`: danh sách học sinh; vai trò sử dụng không rõ hoàn toàn chỉ từ tên.
- `Điều hướng chính.svg`: thành phần điều hướng.
- `Phụ huynh đăng nhập.svg` và hai file đăng nhập layout ngang: biến thể đăng nhập.

### Hai gói ZIP trong `Hòa Ma Toán CRM (1)/`

- `Hòa Ma Toán CRM (2).zip`: chứa 50 entry, phần lớn lặp lại các màn hình/biến thể trong `Hòa Ma Toán CRM (2)/`, cùng các artboard `Frame*` và modal.
- `Hòa Ma Toán CRM (3).zip`: chứa 15 PNG gồm các màn hình quản trị chính (Dashboard, CRM, CSKH, Học vụ, Nhân sự, Tài chính, Báo cáo, Setting), ba loại đăng nhập và hai component focus. Các ảnh này là bản minh họa/biến thể của nhóm admin, không phải chức năng riêng mới.

Các chữ trong một số SVG được chuyển thành vector nên không trích xuất được nhãn/chữ một cách tin cậy. Các file `Frame*`, modal tổng quát và tên màn hình chi tiết mơ hồ cần được đối chiếu trực quan với prototype gốc trước khi kết luận thêm quy tắc nghiệp vụ.

## Luồng có thể thao tác trong bản demo

- Đăng nhập/đăng xuất theo ba vai trò, hiện/ẩn mật khẩu và khôi phục thông tin demo.
- Tìm kiếm trong danh sách hiện tại; thêm/sửa/xóa các hồ sơ được phép; xác nhận xóa và thông báo kết quả.
- Giáo viên thêm/sửa điểm danh, điểm/nhận xét, bài tập/học liệu và lịch dạy bù trong phạm vi lớp được giao.
- Phụ huynh xem thông tin học sinh, lịch, điểm, nhận xét, học liệu, giáo viên; gửi yêu cầu CSKH và theo dõi học phí/lịch sử.
- Xác nhận thanh toán chỉ đổi trạng thái demo; không tạo mã QR ngân hàng hoặc chuyển tiền thật.
- Quản trị viên xem tổng quan, quản lý Lead/chiến dịch, CSKH, đào tạo, nhân sự, dòng tiền, báo cáo, cài đặt; có thể xuất CSV danh sách học viên.
- Cài đặt có các tab ma trận RBAC, CRUD danh mục và nhật ký 500 thao tác gần nhất; thao tác khôi phục dữ liệu cũng được ghi vào nhật ký.
- Dữ liệu và nhật ký demo được giữ trong `localStorage` trên trình duyệt hiện tại; mục Cài đặt có thể khôi phục dữ liệu mẫu.

## Giới hạn trước khi dùng thực tế

Ứng dụng hiện là prototype HTML/CSS/JavaScript tĩnh, chưa có API, cơ sở dữ liệu máy chủ, xác thực thật, phân quyền server-side, nhật ký kiểm toán tập trung, VietQR/thanh toán thật hay gửi ZNS/SMS. Nhật ký trong demo chỉ lưu cục bộ và có thể bị sửa/xóa cùng dữ liệu trình duyệt. Tài khoản, dữ liệu và kiểm tra quyền phía trình duyệt chỉ phục vụ demo; không nhập dữ liệu cá nhân thật. Bản production cần backend, đăng nhập an toàn, API có kiểm tra quyền ở từng thao tác, lưu trữ tập trung, kiểm thử và tích hợp cổng thanh toán/nhắn tin.
