(() => {
  const roles = {
    admin: { name: 'Quản trị viên', username: 'admin', displayName: 'Quản trị trung tâm' },
    branchManager: { name: 'Quản lý cơ sở', username: 'quanly', displayName: 'Nguyễn Minh Long', branch: 'Cơ sở 1 - Nguyễn Chí Thanh', branchArea: 'Đống Đa' },
    teacher: {
      name: 'Giáo viên',
      username: 'giaovien',
      displayName: 'Trần Văn B',
      staffCode: 'GV-024',
      gender: 'Nam',
      birthDate: '12/08/1992',
      branch: 'Cơ sở 1 - Nguyễn Chí Thanh'
    },
    parent: { name: 'Phụ huynh', username: 'phuhuynh', displayName: 'Trần Minh Quân', studentId: 's1', studentIds: ['s1', 's2', 's3', 's4', 's5'] }
  };
  const passwordForDemo = '123456';
  const storageKey = 'hoa-ma-toan-portal-v1';
  const demoDataVersion = 5;
  const menuByRole = {
    admin: [
      ['dashboard', '▦', 'Tổng quan'],
      ['crm', '◇', 'CRM'],
      ['support', '♡', 'Chăm sóc khách hàng'],
      ['academics', '▤', 'Học vụ & đào tạo'],
      ['students', '♧', 'Học viên'],
      ['courses', '▤', 'Khóa học'],
      ['classes', '▦', 'Lớp học'],
      ['resources', '▣', 'Bài tập & Học liệu'],
      ['staff', '♙', 'Nhân sự'],
      ['schedule', '▣', 'Lịch học'],
      ['attendance', '✓', 'Điểm danh'],
      ['grades', '★', 'Kết quả học tập'],
      ['tuition', '$', 'Học phí'],
      ['finance', '▥', 'Tài chính - Kế toán'],
      ['news', '▧', 'Tin tức'],
      ['reports', '▥', 'Báo cáo'],
      ['settings', '⚙', 'Cài đặt']
    ],
    branchManager: [
      ['dashboard', '▦', 'Vận hành ngày'],
      ['staff', '♙', 'Giáo viên cơ sở'],
      ['students', '♧', 'Học viên cơ sở'],
      ['schedule', '▣', 'Xếp lịch học'],
      ['tuition', '$', 'Thu học phí'],
      ['branchReports', '▥', 'Báo cáo cơ sở']
    ],
    teacher: [
      ['dashboard', '▦', 'Lịch dạy của tôi'],
      ['classes', '▦', 'Lớp phụ trách'],
      ['grades', '★', 'Quản lý điểm số'],
      ['makeups', '↻', 'Đề xuất dạy bù / đổi lịch']
    ],
    parent: [
      ['dashboard', '♧', 'Danh sách con'],
      ['paymentHistory', '◷', 'Lịch sử đóng phí'],
      ['support', '♡', 'Liên hệ trung tâm']
    ]
  };
  const primaryNavigationByRole = {
    admin: [
      ['dashboard', 'fa-solid fa-chart-pie', 'Tổng quan'],
      ['academics', 'fa-solid fa-book-open', 'Quản lý Đào tạo'],
      ['finance', 'fa-solid fa-wallet', 'Tài chính & Kế toán'],
      ['staff', 'fa-solid fa-users', 'Quản lý Nhân sự'],
      ['settings', 'fa-solid fa-gear', 'Cài đặt']
    ],
    branchManager: [
      ['dashboard', 'fa-solid fa-gauge-high', 'Vận hành ngày'],
      ['schedule', 'fa-solid fa-calendar-days', 'Quản lý Lớp & Lịch học'],
      ['students', 'fa-solid fa-graduation-cap', 'Học vụ & Chăm sóc'],
      ['tuition', 'fa-solid fa-cash-register', 'Thu ngân'],
      ['branchReports', 'fa-solid fa-chart-column', 'Báo cáo cơ sở']
    ]
  };
  const moduleTitles = Object.fromEntries(
    Object.values(menuByRole).flatMap(items => items.map(([id, , label]) => [id, label]))
  );

  const seedData = {
    students: [
      { id: 's1', name: 'Nguyễn Minh Anh', grade: 'Lớp 5', className: 'Toán nâng cao 5A', parent: 'Trần Minh Quân', phone: '0901 234 567', status: 'Đang học' },
      { id: 's2', name: 'Lê Bảo Nam', grade: 'Lớp 9', className: 'Luyện thi vào 10', parent: 'Trần Minh Quân', phone: '0902 345 678', status: 'Đang học' },
      { id: 's3', name: 'Trần Thảo Chi', grade: 'Lớp 3', className: 'Toán cơ bản 3B', parent: 'Trần Minh Quân', phone: '0903 456 789', status: 'Đang học' },
      { id: 's4', name: 'Ngô Minh Khang', grade: 'Lớp 9', className: 'Toán nâng cao 9A', parent: 'Trần Minh Quân', phone: '0904 567 890', status: 'Đang học' },
      { id: 's5', name: 'Phạm Gia Huy', grade: 'Lớp 12', className: 'Luyện thi TSA', parent: 'Trần Minh Quân', phone: '0905 678 901', status: 'Đang học' }
    ],
    studentProfiles: [
      { studentId: 's1', birthDate: '2012-08-15', gender: 'Nữ', branch: 'Cơ sở 1 - Đống Đa', address: 'Số 20, ngõ 62 Nguyễn Chí Thanh, quận Đống Đa, Hà Nội', enrollmentPeriod: '12 tháng', learningMode: 'Offline' },
      { studentId: 's2', birthDate: '2011-03-22', gender: 'Nam', branch: 'Cơ sở 1 - Đống Đa', address: 'Quận Đống Đa, Hà Nội', enrollmentPeriod: '16 tháng', learningMode: 'Offline' },
      { studentId: 's3', birthDate: '2017-11-04', gender: 'Nữ', branch: 'Cơ sở 2 - Hà Đông', address: 'Quận Hà Đông, Hà Nội', enrollmentPeriod: '8 tháng', learningMode: 'Offline' },
      { studentId: 's4', birthDate: '2011-05-18', gender: 'Nam', branch: 'Cơ sở 1 - Đống Đa', address: 'Quận Đống Đa, Hà Nội', enrollmentPeriod: '6 tháng', learningMode: 'Offline' },
      { studentId: 's5', birthDate: '2008-02-11', gender: 'Nam', branch: 'Cơ sở 2 - Hà Đông', address: 'Quận Hà Đông, Hà Nội', enrollmentPeriod: '4 tháng', learningMode: 'Offline' }
    ],
    studentSchedules: [
      { id: 'ss1', studentId: 's1', className: 'Toán nâng cao 5A', dayOfWeek: 2, subject: 'Toán nâng cao 5A', teacher: 'Trần Văn B', time: '17:30 - 19:00', room: 'Phòng 201', theme: 'orange' },
      { id: 'ss2', studentId: 's1', className: 'Toán Logic', dayOfWeek: 4, subject: 'Toán Logic', teacher: 'Lê Thị C', time: '18:00 - 19:30', room: 'Phòng 202', theme: 'blue' },
      { id: 'ss3', studentId: 's1', className: 'Giải đề Toán', dayOfWeek: 7, subject: 'Giải đề Toán', teacher: 'Trần Văn B', time: '09:00 - 10:30', room: 'Phòng 201', theme: 'blue' },
      { id: 'ss4', studentId: 's2', className: 'Luyện thi vào 10', dayOfWeek: 4, subject: 'Luyện thi vào 10', teacher: 'Nguyễn Văn C', time: '18:00 - 19:30', room: 'Phòng 301', theme: 'orange' },
      { id: 'ss5', studentId: 's2', className: 'Luyện đề Toán 9', dayOfWeek: 5, subject: 'Luyện đề Toán 9', teacher: 'Nguyễn Văn C', time: '18:00 - 19:30', room: 'Phòng 301', theme: 'blue' },
      { id: 'ss6', studentId: 's2', className: 'Chuyên đề Đại số', dayOfWeek: 6, subject: 'Chuyên đề Đại số', teacher: 'Trần Văn B', time: '14:00 - 15:30', room: 'Phòng 201', theme: 'orange' },
      { id: 'ss7', studentId: 's3', className: 'Toán cơ bản 3B', dayOfWeek: 6, subject: 'Toán cơ bản 3B', teacher: 'Trần Văn B', time: '17:00 - 18:30', room: 'Phòng 102', theme: 'orange' },
      { id: 'ss8', studentId: 's3', className: 'Toán tư duy', dayOfWeek: 6, subject: 'Toán tư duy', teacher: 'Lê Thị C', time: '09:00 - 10:30', room: 'Phòng 202', theme: 'blue' },
      { id: 'ss9', studentId: 's4', className: 'Toán nâng cao 9A', dayOfWeek: 1, subject: 'Toán nâng cao 9A', teacher: 'Trần Văn B', time: '16:00 - 17:30', room: 'Phòng 203', theme: 'orange' },
      { id: 'ss10', studentId: 's5', className: 'Luyện thi TSA', dayOfWeek: 3, subject: 'Luyện thi TSA', teacher: 'Nguyễn Văn C', time: '18:00 - 19:30', room: 'Phòng 301', theme: 'blue' }
    ],
    courses: [
      { id: 'c1', title: 'Toán nâng cao', level: 'Lớp 5', duration: '12 tuần', fee: 2400000, status: 'Đang mở' },
      { id: 'c2', title: 'Luyện thi vào 10', level: 'Lớp 9', duration: '16 tuần', fee: 3200000, status: 'Đang mở' },
      { id: 'c3', title: 'Toán cơ bản', level: 'Lớp 3', duration: '12 tuần', fee: 1800000, status: 'Đang mở' },
      { id: 'c4', title: 'Toán nâng cao 9', level: 'Lớp 9', duration: '16 tuần', fee: 3500000, status: 'Đang mở' },
      { id: 'c5', title: 'Luyện thi TSA', level: 'Lớp 12', duration: '20 tuần', fee: 4200000, status: 'Đang mở' }
    ],
    classes: [
      { id: 'cl1', name: 'Toán nâng cao 5A', course: 'Toán nâng cao', teacher: 'Trần Văn B', schedule: 'Thứ 3, 17:30', room: 'Phòng 201', status: 'Đang học' },
      { id: 'cl2', name: 'Luyện thi vào 10', course: 'Luyện thi vào 10', teacher: 'Nguyễn Văn C', schedule: 'Thứ 5, 18:00', room: 'Phòng 301', status: 'Đang học' },
      { id: 'cl3', name: 'Toán cơ bản 3B', course: 'Toán cơ bản', teacher: 'Trần Văn B', schedule: 'Thứ 7, 09:00', room: 'Phòng 102', status: 'Đang học' },
      { id: 'cl4', name: 'Toán nâng cao 9A', course: 'Toán nâng cao 9', teacher: 'Trần Văn B', schedule: 'Thứ 2, 16:00', room: 'Phòng 203', status: 'Đang học' },
      { id: 'cl5', name: 'Luyện thi TSA', course: 'Luyện thi TSA', teacher: 'Nguyễn Văn C', schedule: 'Thứ 4, 18:00', room: 'Phòng 301', status: 'Đang học' }
    ],
    staff: [
      { id: 'st1', name: 'Trần Văn B', position: 'Giáo viên Toán', branch: 'Đống Đa', phone: '0912 345 678', email: 'tranb@example.test', contract: 'Toàn thời gian', status: 'Đang làm việc' },
      { id: 'st2', name: 'Nguyễn Văn C', position: 'Giáo viên Toán', branch: 'Hà Đông', phone: '0913 456 789', email: 'nguyenc@example.test', contract: 'Bán thời gian', status: 'Đang làm việc' }
    ],
    schedule: [
      { id: 'sc1', day: 'Thứ 3', time: '17:30 - 19:00', className: 'Toán nâng cao 5A', teacher: 'Trần Văn B', room: 'Phòng 201' },
      { id: 'sc2', day: 'Thứ 5', time: '18:00 - 19:30', className: 'Luyện thi vào 10', teacher: 'Nguyễn Văn C', room: 'Phòng 301' },
      { id: 'sc3', day: 'Thứ 7', time: '09:00 - 10:30', className: 'Toán cơ bản 3B', teacher: 'Trần Văn B', room: 'Phòng 102' },
      { id: 'sc4', day: 'Thứ 2', time: '16:00 - 17:30', className: 'Toán nâng cao 9A', teacher: 'Trần Văn B', room: 'Phòng 203' },
      { id: 'sc5', day: 'Thứ 4', time: '18:00 - 19:30', className: 'Luyện thi TSA', teacher: 'Nguyễn Văn C', room: 'Phòng 301' }
    ],
    attendance: [
      { id: 'a1', date: '2026-10-13', className: 'Toán nâng cao 5A', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '9.5', note: 'Tích cực phát biểu.' },
      { id: 'a2', date: '2026-10-13', className: 'Luyện thi vào 10', student: 'Lê Bảo Nam', status: 'Vắng có phép', score: '', note: 'Nghỉ ốm.' },
      { id: 'a3', date: '2026-10-10', className: 'Toán cơ bản 3B', student: 'Trần Thảo Chi', status: 'Có mặt', score: '8', note: 'Hoàn thành bài tập.' },
      { id: 'a4', date: '2026-10-06', className: 'Toán nâng cao 5A', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '9', note: 'Nắm vững nội dung.' },
      { id: 'a5', date: '2026-10-20', className: 'Toán nâng cao 5A', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '8.5', note: 'Trình bày lời giải rõ ràng.' },
      { id: 'a6', date: '2026-10-06', className: 'Luyện thi vào 10', student: 'Lê Bảo Nam', status: 'Có mặt', score: '7.5', note: 'Hoàn thành bài luyện tập.' },
      { id: 'a7', date: '2026-10-20', className: 'Luyện thi vào 10', student: 'Lê Bảo Nam', status: 'Vắng không phép', score: '', note: 'Chưa có ghi chú.' },
      { id: 'a8', date: '2026-10-17', className: 'Toán cơ bản 3B', student: 'Trần Thảo Chi', status: 'Vắng có phép', score: '', note: 'Nghỉ có phép.' },
      { id: 'a9', date: '2026-10-24', className: 'Toán cơ bản 3B', student: 'Trần Thảo Chi', status: 'Có mặt', score: '8.5', note: 'Tích cực tham gia bài học.' },
      { id: 'a10', date: '2026-09-29', className: 'Toán nâng cao 5A', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '8', note: 'Hoàn thành bài luyện tập.' },
      { id: 'a11', date: '2026-09-24', className: 'Toán Logic', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '8', note: 'Nhận diện quy luật tốt.' },
      { id: 'a12', date: '2026-10-01', className: 'Toán Logic', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '8.5', note: 'Hoàn thành bài tư duy.' },
      { id: 'a13', date: '2026-10-08', className: 'Toán Logic', student: 'Nguyễn Minh Anh', status: 'Vắng có phép', score: '', note: 'Nghỉ có phép.' },
      { id: 'a14', date: '2026-10-15', className: 'Toán Logic', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '9', note: 'Lập luận logic tiến bộ.' },
      { id: 'a15', date: '2026-10-22', className: 'Toán Logic', student: 'Nguyễn Minh Anh', status: 'Có mặt', score: '8.5', note: 'Tập trung và chủ động.' },
      { id: 'a16', date: '2026-10-26', className: 'Toán nâng cao 9A', student: 'Ngô Minh Khang', status: 'Có mặt', score: '8.5', note: 'Vận dụng tốt hệ thức Vi-ét vào bài tập.' },
      { id: 'a17', date: '2026-10-29', className: 'Luyện thi TSA', student: 'Phạm Gia Huy', status: 'Có mặt', score: '9', note: 'Tư duy định lượng tốt, trình bày lập luận rõ ràng.' }
    ],
    grades: [
      { id: 'g1', student: 'Nguyễn Minh Anh', course: 'Toán nâng cao', date: '2026-10-13', score: '9.5', feedback: 'Tiếp thu bài nhanh, tích cực phát biểu.' },
      { id: 'g2', student: 'Lê Bảo Nam', course: 'Luyện thi vào 10', date: '2026-10-10', score: '7', feedback: 'Cần làm bài tập về nhà đầy đủ hơn.' },
      { id: 'g3', student: 'Trần Thảo Chi', course: 'Toán cơ bản', date: '2026-10-10', score: '8', feedback: 'Có tiến bộ trong phép tính.' },
      { id: 'g4', student: 'Nguyễn Minh Anh', course: 'Toán nâng cao', date: '2026-10-20', score: '8.5', feedback: 'Trình bày lời giải tốt.' },
      { id: 'g5', student: 'Lê Bảo Nam', course: 'Luyện thi vào 10', date: '2026-10-20', score: '6.5', feedback: 'Cần ôn kỹ phần phương trình.' },
      { id: 'g6', student: 'Trần Thảo Chi', course: 'Toán cơ bản', date: '2026-10-24', score: '8.5', feedback: 'Có tiến bộ rõ rệt.' },
      { id: 'g7', student: 'Nguyễn Minh Anh', course: 'Toán nâng cao', date: '2026-09-29', score: '8', feedback: 'Hoàn thành bài luyện tập.' },
      { id: 'g8', student: 'Nguyễn Minh Anh', course: 'Toán Logic', date: '2026-09-24', score: '8', feedback: 'Nhận diện quy luật tốt.' },
      { id: 'g9', student: 'Nguyễn Minh Anh', course: 'Toán Logic', date: '2026-10-01', score: '8.5', feedback: 'Hoàn thành bài tư duy.' },
      { id: 'g10', student: 'Nguyễn Minh Anh', course: 'Toán Logic', date: '2026-10-15', score: '9', feedback: 'Lập luận logic tiến bộ.' },
      { id: 'g11', student: 'Nguyễn Minh Anh', course: 'Toán Logic', date: '2026-10-22', score: '8.5', feedback: 'Tập trung và chủ động.' },
      { id: 'g12', student: 'Ngô Minh Khang', course: 'Toán nâng cao 9', date: '2026-10-26', score: '8.5', feedback: 'Nắm chắc kiến thức phương trình bậc hai.' },
      { id: 'g13', student: 'Phạm Gia Huy', course: 'Luyện thi TSA', date: '2026-10-29', score: '9', feedback: 'Tư duy định lượng tốt, cần duy trì tốc độ làm bài.' }
    ],
    tuition: [
      { id: 'p1', studentId: 's1', student: 'Nguyễn Minh Anh', period: 'Tháng 10/2026', sessions: 12, unitPrice: 210000, previousMonthDeduction: 120000, materialsFee: 0, amount: 2400000, dueDate: '2026-10-25', status: 'Chưa thanh toán' },
      { id: 'p0', studentId: 's1', student: 'Nguyễn Minh Anh', period: 'Tháng 9/2026', sessions: 12, unitPrice: 200000, previousMonthDeduction: 0, materialsFee: 0, amount: 2400000, dueDate: '2026-09-25', paidDate: '2026-09-22', status: 'Đã thanh toán' },
      { id: 'p2', studentId: 's2', student: 'Lê Bảo Nam', period: 'Tháng 10/2026', sessions: 16, unitPrice: 200000, previousMonthDeduction: 0, materialsFee: 0, amount: 3200000, dueDate: '2026-10-25', paidDate: '2026-10-12', status: 'Đã thanh toán' },
      { id: 'p3', studentId: 's3', student: 'Trần Thảo Chi', period: 'Tháng 10/2026', sessions: 12, unitPrice: 150000, previousMonthDeduction: 0, materialsFee: 0, amount: 1800000, dueDate: '2026-10-25', status: 'Chưa thanh toán' },
      { id: 'p4', studentId: 's4', student: 'Ngô Minh Khang', period: 'Tháng 11/2026', sessions: 14, unitPrice: 250000, previousMonthDeduction: 0, materialsFee: 0, amount: 3500000, dueDate: '2026-11-05', status: 'Chưa thanh toán' },
      { id: 'p5', studentId: 's5', student: 'Phạm Gia Huy', period: 'Tháng 11/2026', sessions: 16, unitPrice: 262500, previousMonthDeduction: 0, materialsFee: 0, amount: 4200000, dueDate: '2026-11-05', status: 'Chưa thanh toán' }
    ],
    news: [
      { id: 'n1', title: 'Lịch nghỉ lễ và lịch học bù tháng 10', date: '2026-10-12', audience: 'Tất cả', content: 'Phụ huynh vui lòng xem lịch học bù tại mục Lịch học.' },
      { id: 'n2', title: 'Thông báo kiểm tra định kỳ', date: '2026-10-08', audience: 'Học viên', content: 'Các lớp sẽ kiểm tra định kỳ trong tuần tới.' }
    ],
    crm: [
      { id: 'crm1', name: 'Nguyễn Thu Hà', phone: '0902 345 678', source: 'Website', followUp: 'Tư vấn lớp Toán lớp 9', status: 'Đang tư vấn' },
      { id: 'crm2', name: 'Lê Minh Tú', phone: '0904 567 890', source: 'Giới thiệu', followUp: 'Hẹn kiểm tra đầu vào', status: 'Chờ liên hệ' }
    ],
    campaigns: [
      { id: 'camp1', name: 'Tuyển sinh Toán lớp 5', channel: 'Facebook', startDate: '2026-10-01', endDate: '2026-10-31', budget: 5000000, status: 'Đang chạy' },
      { id: 'camp2', name: 'Ôn thi vào 10', channel: 'Zalo', startDate: '2026-09-15', endDate: '2026-10-15', budget: 3000000, status: 'Đã kết thúc' }
    ],
    support: [
      { id: 'cs1', name: 'Trần Minh Quân', subject: 'Hỏi lịch học bù tháng 10', date: '2026-10-14', assigned: 'CSKH', status: 'Đang xử lý' },
      { id: 'cs2', name: 'Nguyễn Thu Hà', subject: 'Xác nhận học phí', date: '2026-10-13', assigned: 'Kế toán', status: 'Đã giải quyết' }
    ],
    automations: [
      { id: 'auto1', name: 'Nhắc lịch học trước 1 ngày', channel: 'ZNS', trigger: 'Trước giờ học 24 giờ', status: 'Đang bật' },
      { id: 'auto2', name: 'Nhắc học phí đến hạn', channel: 'SMS', trigger: 'Trước hạn 3 ngày', status: 'Đang bật' }
    ],
    renewals: [
      { id: 'ren1', student: 'Nguyễn Minh Anh', course: 'Toán nâng cao', endDate: '2026-10-31', status: 'Cần liên hệ' },
      { id: 'ren2', student: 'Lê Bảo Nam', course: 'Luyện thi vào 10', endDate: '2026-11-15', status: 'Đã gia hạn' }
    ],
    resources: [
      { id: 'res1', title: 'Ôn tập phân số', className: 'Toán nâng cao 5A', type: 'Bài tập', dueDate: '2026-10-21', description: 'Hoàn thành bài 1-10 trong phiếu bài tập.', status: 'Đang mở' },
      { id: 'res2', title: 'Tài liệu luyện đề số 3', className: 'Luyện thi vào 10', type: 'Tài liệu', dueDate: '2026-10-25', description: 'Tài liệu ôn luyện trước bài kiểm tra.', status: 'Đang mở' },
      { id: 'res3', title: 'Bài tập phép nhân', className: 'Toán cơ bản 3B', type: 'Bài tập', dueDate: '2026-10-22', description: 'Luyện tập phép nhân và phép chia.', status: 'Đang mở' },
      { id: 'res4', title: 'Chuyên đề hệ thức Vi-ét', className: 'Toán nâng cao 9A', type: 'Bài tập', dueDate: '2026-11-02', description: 'Luyện tập ứng dụng hệ thức Vi-ét và giải phương trình bậc hai.', status: 'Đang mở' },
      { id: 'res5', title: 'Đề luyện tư duy định lượng TSA số 2', className: 'Luyện thi TSA', type: 'Bài tập', dueDate: '2026-11-04', description: 'Hoàn thành phần toán học và tư duy logic trong 45 phút.', status: 'Đang mở' }
    ],
    staffAttendance: [
      { id: 'sa1', date: '2026-10-16', name: 'Trần Văn B', checkIn: '08:55', checkOut: '17:30', status: 'Đúng giờ', kpi: 'Đạt' },
      { id: 'sa2', date: '2026-10-16', name: 'Nguyễn Văn C', checkIn: '09:12', checkOut: '17:00', status: 'Đi muộn', kpi: 'Cần theo dõi' }
    ],
    payroll: [
      { id: 'pay1', period: 'Tháng 10/2026', name: 'Trần Văn B', basePay: 18000000, bonus: 1500000, deduction: 0, status: 'Chờ duyệt' },
      { id: 'pay2', period: 'Tháng 10/2026', name: 'Nguyễn Văn C', basePay: 12000000, bonus: 500000, deduction: 200000, status: 'Chờ duyệt' }
    ],
    shifts: [
      { id: 'sh1', date: '2026-10-17', time: '08:00 - 16:00', name: 'Trần Văn B', branch: 'Đống Đa', shift: 'Ca ngày' },
      { id: 'sh2', date: '2026-10-17', time: '13:00 - 21:00', name: 'Nguyễn Văn C', branch: 'Hà Đông', shift: 'Ca chiều' }
    ],
    transactions: [
      { id: 'tx1', date: '2026-10-09', type: 'Thu', category: 'Học phí lớp Toán 5', amount: 12000000, person: 'Nguyễn Thu Hà' },
      { id: 'tx2', date: '2026-10-08', type: 'Thu', category: 'Học phí lớp Toán 1', amount: 8500000, person: 'Lê Phương Anh' },
      { id: 'tx3', date: '2026-10-07', type: 'Chi', category: 'Tiền thuê nhà', amount: 15000000, person: 'Vũ Hoàng Nam' },
      { id: 'tx4', date: '2026-10-06', type: 'Chi', category: 'In ấn tài liệu', amount: 2800000, person: 'Phạm Ngọc Linh' },
      { id: 'tx5', date: '2026-09-28', type: 'Thu', category: 'Học phí lớp Toán 9', amount: 17800000, person: 'Nguyễn Thu Hà' },
      { id: 'tx6', date: '2026-09-18', type: 'Chi', category: 'Lương giáo viên', amount: 22600000, person: 'Trần Văn B' },
      { id: 'tx7', date: '2026-08-27', type: 'Thu', category: 'Học phí tháng 8', amount: 19200000, person: 'Lê Phương Anh' },
      { id: 'tx8', date: '2026-08-12', type: 'Chi', category: 'Thuê mặt bằng', amount: 15000000, person: 'Vũ Hoàng Nam' },
      { id: 'tx9', date: '2026-07-26', type: 'Thu', category: 'Học phí tháng 7', amount: 16400000, person: 'Nguyễn Thu Hà' },
      { id: 'tx10', date: '2026-07-15', type: 'Chi', category: 'Lương giáo viên', amount: 21500000, person: 'Trần Văn B' },
      { id: 'tx11', date: '2026-06-25', type: 'Thu', category: 'Học phí tháng 6', amount: 14800000, person: 'Lê Phương Anh' },
      { id: 'tx12', date: '2026-06-11', type: 'Chi', category: 'Điện nước', amount: 3200000, person: 'Phạm Ngọc Linh' },
      { id: 'tx13', date: '2026-05-26', type: 'Thu', category: 'Học phí tháng 5', amount: 13900000, person: 'Nguyễn Thu Hà' },
      { id: 'tx14', date: '2026-05-10', type: 'Chi', category: 'Marketing tuyển sinh', amount: 4500000, person: 'Lê Phương Anh' }
    ],
    reportHistory: [
      { month: '2026-05', activeStudents: 2 },
      { month: '2026-06', activeStudents: 2 },
      { month: '2026-07', activeStudents: 2 },
      { month: '2026-08', activeStudents: 3 },
      { month: '2026-09', activeStudents: 3 },
      { month: '2026-10', activeStudents: 5 }
    ],
    categories: [
      { id: 'cat1', group: 'Cơ sở', name: 'Đống Đa', status: 'Đang dùng' },
      { id: 'cat2', group: 'Cơ sở', name: 'Hà Đông', status: 'Đang dùng' },
      { id: 'cat3', group: 'Trạng thái học viên', name: 'Đang học', status: 'Đang dùng' },
      { id: 'cat4', group: 'Loại giao dịch', name: 'Học phí', status: 'Đang dùng' }
    ],
    activityLog: [],
    makeups: [
      { id: 'm1', date: '2026-10-24', time: '09:00 - 10:30', className: 'Toán nâng cao 5A', reason: 'Học bù buổi nghỉ lễ', room: 'Phòng 201', status: 'Đã xác nhận' }
    ],
    _version: demoDataVersion
  };

  const columns = {
    students: [['name', 'HỌC VIÊN'], ['grade', 'KHỐI'], ['className', 'LỚP'], ['parent', 'PHỤ HUYNH'], ['phone', 'LIÊN HỆ'], ['status', 'TRẠNG THÁI']],
    courses: [['title', 'KHÓA HỌC'], ['level', 'CẤP ĐỘ'], ['duration', 'THỜI LƯỢNG'], ['fee', 'HỌC PHÍ'], ['status', 'TRẠNG THÁI']],
    classes: [['name', 'TÊN LỚP'], ['course', 'KHÓA HỌC'], ['teacher', 'GIÁO VIÊN'], ['schedule', 'LỊCH HỌC'], ['room', 'PHÒNG'], ['status', 'TRẠNG THÁI']],
    staff: [['name', 'NHÂN SỰ'], ['position', 'VỊ TRÍ'], ['branch', 'CƠ SỞ'], ['phone', 'ĐIỆN THOẠI'], ['contract', 'LOẠI HỢP ĐỒNG'], ['status', 'TRẠNG THÁI']],
    staffAttendance: [['date', 'NGÀY'], ['name', 'NHÂN SỰ'], ['checkIn', 'GIỜ VÀO'], ['checkOut', 'GIỜ RA'], ['status', 'CHẤM CÔNG'], ['kpi', 'KPI']],
    payroll: [['period', 'KỲ LƯƠNG'], ['name', 'NHÂN SỰ'], ['basePay', 'LƯƠNG CƠ BẢN'], ['bonus', 'THƯỞNG'], ['deduction', 'KHẤU TRỪ'], ['status', 'TRẠNG THÁI']],
    shifts: [['date', 'NGÀY'], ['time', 'THỜI GIAN'], ['name', 'NHÂN SỰ'], ['branch', 'CƠ SỞ'], ['shift', 'CA TRỰC']],
    schedule: [['day', 'NGÀY'], ['time', 'THỜI GIAN'], ['className', 'LỚP'], ['teacher', 'GIÁO VIÊN'], ['room', 'PHÒNG']],
    attendance: [['date', 'NGÀY'], ['className', 'LỚP'], ['student', 'HỌC VIÊN'], ['status', 'ĐIỂM DANH'], ['score', 'ĐIỂM'], ['note', 'NHẬN XÉT']],
    grades: [['date', 'NGÀY'], ['student', 'HỌC VIÊN'], ['course', 'KHÓA HỌC'], ['score', 'ĐIỂM'], ['feedback', 'NHẬN XÉT']],
    tuition: [['student', 'HỌC VIÊN'], ['period', 'KỲ HỌC'], ['amount', 'SỐ TIỀN'], ['dueDate', 'HẠN THANH TOÁN'], ['status', 'TRẠNG THÁI']],
    paymentHistory: [['student', 'HỌC VIÊN'], ['period', 'KỲ THANH TOÁN'], ['amount', 'SỐ TIỀN'], ['paidDate', 'NGÀY THANH TOÁN'], ['status', 'TRẠNG THÁI']],
    news: [['title', 'TIÊU ĐỀ'], ['date', 'NGÀY ĐĂNG'], ['audience', 'ĐỐI TƯỢNG'], ['content', 'NỘI DUNG']],
    crm: [['name', 'KHÁCH HÀNG TIỀM NĂNG'], ['phone', 'LIÊN HỆ'], ['source', 'NGUỒN'], ['followUp', 'NỘI DUNG TƯ VẤN'], ['status', 'TRẠNG THÁI']],
    campaigns: [['name', 'CHIẾN DỊCH'], ['channel', 'KÊNH'], ['startDate', 'BẮT ĐẦU'], ['endDate', 'KẾT THÚC'], ['budget', 'NGÂN SÁCH'], ['status', 'TRẠNG THÁI']],
    support: [['name', 'NGƯỜI GỬI'], ['subject', 'YÊU CẦU'], ['date', 'NGÀY NHẬN'], ['assigned', 'BỘ PHẬN'], ['status', 'TRẠNG THÁI']],
    automations: [['name', 'KỊCH BẢN'], ['channel', 'KÊNH'], ['trigger', 'ĐIỀU KIỆN'], ['status', 'TRẠNG THÁI']],
    renewals: [['student', 'HỌC VIÊN'], ['course', 'KHÓA HỌC'], ['endDate', 'NGÀY KẾT THÚC'], ['status', 'TRẠNG THÁI']],
    resources: [['title', 'BÀI TẬP / HỌC LIỆU'], ['className', 'LỚP'], ['type', 'LOẠI'], ['dueDate', 'HẠN HOÀN THÀNH'], ['description', 'MÔ TẢ'], ['status', 'TRẠNG THÁI']],
    transactions: [['date', 'NGÀY GIAO DỊCH'], ['type', 'LOẠI'], ['category', 'HẠNG MỤC'], ['amount', 'SỐ TIỀN'], ['person', 'NGƯỜI PHỤ TRÁCH']],
    categories: [['group', 'NHÓM DANH MỤC'], ['name', 'TÊN DANH MỤC'], ['status', 'TRẠNG THÁI']],
    activityLog: [['date', 'THỜI GIAN'], ['actor', 'NGƯỜI THỰC HIỆN'], ['action', 'THAO TÁC'], ['module', 'PHÂN HỆ'], ['detail', 'CHI TIẾT']],
    makeups: [['date', 'NGÀY'], ['time', 'THỜI GIAN'], ['className', 'LỚP'], ['reason', 'LÝ DO'], ['room', 'PHÒNG'], ['status', 'TRẠNG THÁI']]
  };

  const fieldDefinitions = {
    students: [['name', 'Họ và tên', 'text'], ['grade', 'Khối lớp', 'text'], ['className', 'Lớp học', 'text'], ['parent', 'Phụ huynh', 'text'], ['phone', 'Số điện thoại', 'tel'], ['status', 'Trạng thái', 'select', ['Đang học', 'Tạm nghỉ', 'Đã nghỉ']]],
    courses: [['title', 'Tên khóa học', 'text'], ['level', 'Cấp độ', 'text'], ['duration', 'Thời lượng', 'text'], ['fee', 'Học phí (VNĐ)', 'number'], ['status', 'Trạng thái', 'select', ['Đang mở', 'Tạm dừng', 'Đã kết thúc']]],
    classes: [['name', 'Tên lớp', 'text'], ['course', 'Khóa học', 'text'], ['teacher', 'Giáo viên', 'text'], ['schedule', 'Lịch học', 'text'], ['room', 'Phòng học', 'text'], ['status', 'Trạng thái', 'select', ['Đang học', 'Sắp khai giảng', 'Đã kết thúc']]],
    staff: [['name', 'Họ và tên', 'text'], ['position', 'Chức vụ', 'text'], ['branch', 'Cơ sở', 'text'], ['phone', 'Số điện thoại', 'tel'], ['email', 'Email', 'email'], ['contract', 'Loại hợp đồng', 'select', ['Toàn thời gian', 'Bán thời gian', 'Cộng tác viên']], ['status', 'Trạng thái', 'select', ['Đang làm việc', 'Tạm nghỉ']]],
    schedule: [['day', 'Ngày học', 'text'], ['time', 'Thời gian', 'text'], ['className', 'Lớp học', 'text'], ['teacher', 'Giáo viên', 'text'], ['room', 'Phòng học', 'text']],
    attendance: [['date', 'Ngày học', 'date'], ['className', 'Lớp học', 'text'], ['student', 'Học viên', 'text'], ['status', 'Trạng thái điểm danh', 'select', ['Có mặt', 'Vắng có phép', 'Vắng không phép', 'Đi muộn']], ['score', 'Điểm số (0-10)', 'number'], ['note', 'Nhận xét', 'textarea']],
    grades: [['date', 'Ngày đánh giá', 'date'], ['student', 'Học viên', 'text'], ['course', 'Khóa học', 'text'], ['score', 'Điểm số (0-10)', 'number'], ['feedback', 'Nhận xét', 'textarea']],
    tuition: [['student', 'Học viên', 'text'], ['period', 'Kỳ học', 'text'], ['amount', 'Số tiền (VNĐ)', 'number'], ['dueDate', 'Hạn thanh toán', 'date'], ['status', 'Trạng thái', 'select', ['Chưa thanh toán', 'Đã thanh toán', 'Quá hạn']]],
    news: [['title', 'Tiêu đề', 'text'], ['date', 'Ngày đăng', 'date'], ['audience', 'Đối tượng', 'select', ['Tất cả', 'Phụ huynh', 'Học viên', 'Giáo viên']], ['content', 'Nội dung', 'textarea']],
    crm: [['name', 'Tên khách hàng', 'text'], ['phone', 'Số điện thoại', 'tel'], ['source', 'Nguồn liên hệ', 'text'], ['followUp', 'Nội dung tư vấn / việc cần làm', 'text'], ['status', 'Trạng thái', 'select', ['Chờ liên hệ', 'Đang tư vấn', 'Đã đăng ký', 'Không quan tâm']]],
    campaigns: [['name', 'Tên chiến dịch', 'text'], ['channel', 'Kênh', 'text'], ['startDate', 'Ngày bắt đầu', 'date'], ['endDate', 'Ngày kết thúc', 'date'], ['budget', 'Ngân sách (VNĐ)', 'number'], ['status', 'Trạng thái', 'select', ['Sắp chạy', 'Đang chạy', 'Đã kết thúc']]],
    support: [['name', 'Người gửi', 'text'], ['subject', 'Nội dung yêu cầu', 'text'], ['date', 'Ngày nhận', 'date'], ['assigned', 'Bộ phận phụ trách', 'text'], ['status', 'Trạng thái', 'select', ['Mới tiếp nhận', 'Đang xử lý', 'Đã giải quyết']]],
    automations: [['name', 'Tên kịch bản', 'text'], ['channel', 'Kênh gửi', 'select', ['ZNS', 'SMS']], ['trigger', 'Điều kiện kích hoạt', 'text'], ['status', 'Trạng thái', 'select', ['Đang bật', 'Tạm dừng']]],
    renewals: [['student', 'Học viên', 'text'], ['course', 'Khóa học', 'text'], ['endDate', 'Ngày kết thúc', 'date'], ['status', 'Trạng thái', 'select', ['Cần liên hệ', 'Đang tư vấn', 'Đã gia hạn', 'Không tiếp tục']]],
    resources: [['title', 'Tên bài tập / học liệu', 'text'], ['className', 'Lớp', 'text'], ['type', 'Loại', 'select', ['Bài tập', 'Tài liệu', 'Thông báo']], ['dueDate', 'Hạn hoàn thành', 'date'], ['description', 'Mô tả', 'textarea'], ['status', 'Trạng thái', 'select', ['Đang mở', 'Đã đóng']]],
    staffAttendance: [['date', 'Ngày chấm công', 'date'], ['name', 'Nhân sự', 'text'], ['checkIn', 'Giờ vào', 'time'], ['checkOut', 'Giờ ra', 'time'], ['status', 'Trạng thái', 'select', ['Đúng giờ', 'Đi muộn', 'Nghỉ phép']], ['kpi', 'KPI', 'select', ['Đạt', 'Cần theo dõi', 'Chưa đánh giá']]],
    payroll: [['period', 'Kỳ lương', 'text'], ['name', 'Nhân sự', 'text'], ['basePay', 'Lương cơ bản (VNĐ)', 'number'], ['bonus', 'Thưởng (VNĐ)', 'number'], ['deduction', 'Khấu trừ (VNĐ)', 'number'], ['status', 'Trạng thái', 'select', ['Chờ duyệt', 'Đã duyệt', 'Đã thanh toán']]],
    shifts: [['date', 'Ngày trực', 'date'], ['time', 'Thời gian', 'text'], ['name', 'Nhân sự', 'text'], ['branch', 'Cơ sở', 'text'], ['shift', 'Ca trực', 'select', ['Ca ngày', 'Ca chiều', 'Ca tối']]],
    transactions: [['date', 'Ngày giao dịch', 'date'], ['type', 'Loại giao dịch', 'select', ['Thu', 'Chi']], ['category', 'Hạng mục', 'text'], ['amount', 'Số tiền (VNĐ)', 'number'], ['person', 'Người phụ trách', 'text']],
    categories: [['group', 'Nhóm danh mục', 'select', ['Cơ sở', 'Khối lớp', 'Trạng thái học viên', 'Loại giao dịch', 'Loại khóa học']], ['name', 'Tên danh mục', 'text'], ['status', 'Trạng thái', 'select', ['Đang dùng', 'Tạm ẩn']]],
    makeups: [['date', 'Ngày dạy bù', 'date'], ['time', 'Thời gian', 'text'], ['className', 'Lớp học', 'text'], ['reason', 'Lý do', 'text'], ['room', 'Phòng học', 'text'], ['status', 'Trạng thái', 'select', ['Chờ xác nhận', 'Đã xác nhận', 'Đã hoàn thành']]]
  };

  let dataLoadError = '';
  let data = loadData();
  let activeRole = '';
  let activeModule = 'dashboard';
  let activeStaffTab = 'profiles';
  let activeCrmTab = 'leads';
  let activeSupportTab = 'tickets';
  let activeSettingsTab = 'rbac';
  let activeFinanceTab = 'cashflow';
  let financeSelectedMonth = financeMonthKey(new Date());
  let reportSelectedMonth = financeMonthKey(new Date());
  let selectedTuitionId = null;
  let selectedStudentId = roles.parent.studentId;
  let studentDetailOpen = false;
  let studentCalendarWeekStart = getStudentWeekStart(new Date());
  let teacherCalendarWeekStart = getStudentWeekStart(new Date());
  let modalModule = '';
  let modalRecordId = '';
  let dashboardCharts = [];
  const $ = selector => document.querySelector(selector);
  const loginForm = $('#login-form');
  const loginRole = $('#login-role');
  const loginUsername = $('#login-username');
  const loginPassword = $('#login-password');
  const loginMessage = $('#login-message');
  const portal = $('#portal-app');
  const roleSelector = $('#role-selector');
  const recoveryDialog = $('#recovery-dialog');
  const portalClock = $('#portal-clock');
  const dashboardExportButton = $('#btn-dashboard-export');
  ['#screen-students', '#screen-attendance', '.dev-switcher'].forEach(selector => {
    document.querySelector(selector)?.remove();
  });
  const notice = message => {
    const old = $('.portal-notice');
    if (old) old.remove();
    if (!message) return;
    const element = document.createElement('p');
    element.className = 'portal-notice';
    element.textContent = message;
    $('#portal-content').prepend(element);
  };

  function loadData() {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return structuredClone(seedData);
      const parsed = JSON.parse(saved);
      if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) {
        throw new Error('Dữ liệu đã lưu không có cấu trúc hợp lệ.');
      }
      const migrated = { ...seedData };
      let needsMigration = false;
      for (const key of Object.keys(seedData)) {
        if (key === '_version') continue;
        if (Array.isArray(parsed[key])) {
          if (parsed[key].some(item => !item || typeof item !== 'object' || Array.isArray(item))) {
            throw new Error(`Dữ liệu mục "${key}" chứa bản ghi không hợp lệ.`);
          }
          migrated[key] = parsed[key];
        } else {
          needsMigration = true;
        }
      }
      const storedVersion = Number.isInteger(parsed._version) ? parsed._version : 0;
      if (storedVersion < demoDataVersion) {
        if (storedVersion < 3) {
          if (storedVersion < 2) {
            const moduleSixSeedIds = {
              attendance: ['a10', 'a11', 'a12', 'a13', 'a14', 'a15'],
              grades: ['g7', 'g8', 'g9', 'g10', 'g11']
            };
            for (const [key, ids] of Object.entries(moduleSixSeedIds)) {
              const existingIds = new Set(migrated[key].map(item => item.id));
              migrated[key].push(...seedData[key].filter(item => ids.includes(item.id) && !existingIds.has(item.id)));
            }
          }
          const addedSeedIds = {
            students: ['s4', 's5'],
            studentProfiles: ['s4', 's5'],
            studentSchedules: ['ss9', 'ss10'],
            courses: ['c4', 'c5'],
            classes: ['cl4', 'cl5'],
            schedule: ['sc4', 'sc5'],
            attendance: ['a16', 'a17'],
            grades: ['g12', 'g13'],
            tuition: ['p4', 'p5'],
            resources: ['res4', 'res5']
          };
          for (const [key, ids] of Object.entries(addedSeedIds)) {
            const recordId = item => item.id ?? item.studentId;
            const existingIds = new Set(migrated[key].map(recordId));
            migrated[key].push(...seedData[key].filter(item => ids.includes(recordId(item)) && !existingIds.has(recordId(item))));
          }
        }
        if (storedVersion < 4) {
          const legacyScheduleValues = [
            { key: 'studentSchedules', id: 'ss4', isLegacy: item => item.dayOfWeek === 2, updates: { dayOfWeek: 4 } },
            { key: 'studentSchedules', id: 'ss10', isLegacy: item => item.dayOfWeek === 5, updates: { dayOfWeek: 3 } },
            { key: 'classes', id: 'cl5', isLegacy: item => item.schedule === 'Thứ 5, 18:00', updates: { schedule: 'Thứ 4, 18:00' } },
            { key: 'schedule', id: 'sc5', isLegacy: item => item.day === 'Thứ 5', updates: { day: 'Thứ 4' } }
          ];
          for (const { key, id, isLegacy, updates } of legacyScheduleValues) {
            const record = migrated[key].find(item => item.id === id);
            if (record && isLegacy(record)) Object.assign(record, updates);
          }
        }
        if (storedVersion < 5) {
          const legacyWeekdayValues = [
            { id: 'ss4', dayOfWeek: 5, correctedDay: 4 },
            { id: 'ss5', dayOfWeek: 4, correctedDay: 5 },
            { id: 'ss7', dayOfWeek: 3, correctedDay: 6 },
            { id: 'ss9', dayOfWeek: 2, correctedDay: 1 }
          ];
          for (const { id, dayOfWeek, correctedDay } of legacyWeekdayValues) {
            const record = migrated.studentSchedules.find(item => item.id === id);
            if (record?.dayOfWeek === dayOfWeek) record.dayOfWeek = correctedDay;
          }
        }
        migrated._version = demoDataVersion;
        needsMigration = true;
      } else {
        migrated._version = parsed._version;
      }
      if (needsMigration) {
        try {
          localStorage.setItem(storageKey, JSON.stringify(migrated));
        } catch (error) {
          console.error('Không thể cập nhật cấu trúc dữ liệu demo đã lưu:', error);
          dataLoadError = 'Dữ liệu cũ đã được nâng cấp trong phiên hiện tại nhưng không thể ghi lại vào trình duyệt.';
        }
      }
      return migrated;
    } catch (error) {
      console.error('Không thể đọc dữ liệu demo đã lưu:', error);
      dataLoadError = 'Không đọc được dữ liệu demo đã lưu. Hệ thống đang dùng dữ liệu mẫu; hãy kiểm tra bảng điều khiển nếu lỗi tiếp tục.';
      return structuredClone(seedData);
    }
  }

  function persistMutation(mutation, action = 'Cập nhật', module = activeModule, detail = '') {
    const previousData = structuredClone(data);
    mutation();
    data.activityLog.unshift({
      id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
      date: new Date().toISOString(),
      actor: roles[activeRole]?.displayName || 'Hệ thống demo',
      action,
      module: getModuleTitle(module),
      detail: detail || getModuleTitle(module)
    });
    data.activityLog = data.activityLog.slice(0, 500);
    if (saveData()) return true;
    data = previousData;
    return false;
  }

  function saveData() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error('Không thể lưu dữ liệu demo:', error);
      notice('Không thể lưu vào trình duyệt. Hãy kiểm tra dung lượng hoặc cài đặt quyền lưu trữ.');
      return false;
    }
  }

  function escapeHTML(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function formatValue(key, value) {
    if (['amount', 'fee', 'basePay', 'bonus', 'deduction', 'budget'].includes(key)) {
      const amount = Number(value);
      return Number.isFinite(amount) ? `${amount.toLocaleString('vi-VN')} đ` : '—';
    }
    return value === '' || value === null || value === undefined ? '—' : value;
  }

  function allowedModules() {
    return menuByRole[activeRole] || [];
  }

  function getModuleTitle(module) {
    const detailTitles = {
      campaigns: 'Chiến dịch marketing',
      automations: 'Kịch bản tự động',
      renewals: 'Gia hạn khóa học',
      staffAttendance: 'Chấm công & KPIs',
      payroll: 'Bảng lương',
      shifts: 'Lịch trực',
      transactions: 'Phiếu thu / chi',
      categories: 'Cấu hình danh mục',
      activityLog: 'Nhật ký hoạt động'
    };
    return allowedModules().find(([id]) => id === module)?.[2] || detailTitles[module] || moduleTitles[module] || module;
  }

  function isEditable(module) {
    if (activeRole === 'admin') return Boolean(fieldDefinitions[module]) || module === 'categories';
    if (activeRole === 'branchManager') return ['students', 'schedule', 'tuition', 'makeups', 'transactions'].includes(module);
    return activeRole === 'teacher' && ['attendance', 'grades', 'makeups', 'resources'].includes(module);
  }

  function canDelete(module) {
    return (activeRole === 'admin' && ['students', 'courses', 'classes', 'staff', 'schedule', 'news', 'crm', 'campaigns', 'resources', 'categories', 'transactions'].includes(module)) ||
      (activeRole === 'teacher' && module === 'resources');
  }

  function setRoleView(role) {
    if (activeRole && activeRole !== role) closeEditor();
    activeRole = role;
    activeModule = 'dashboard';
    selectedTuitionId = null;
    studentDetailOpen = false;
    selectedStudentId = role === 'parent' ? roles.parent.studentId : data.students[0]?.id || null;
    $('#screen-login').classList.add('app-hidden');
    portal.classList.remove('app-hidden');
    portal.classList.toggle('parent-portal', role === 'parent');
    roleSelector.value = role;
    $('#admin-module-switcher').classList.toggle('app-hidden', role !== 'admin');
    $('#portal-user-role').textContent = role === 'teacher'
      ? `${roles[role].name} · ${roles.teacher.staffCode}`
      : role === 'parent' ? 'Xin chào gia đình' : roles[role].name;
    $('#portal-user-name').textContent = roles[role].displayName;
    $('#portal-user-avatar').textContent = roles[role].displayName.split(/\s+/).slice(-2).map(part => part[0]).join('').toUpperCase();
    $('#portal-context').classList.toggle('app-hidden', !['branchManager', 'teacher'].includes(role));
    if (role === 'teacher') {
      $('#portal-context strong').textContent = roles.teacher.branch;
      $('#portal-context small').textContent = 'Lịch giảng dạy · Năm học 2026–2027';
    } else if (role === 'branchManager') {
      $('#portal-context strong').textContent = roles.branchManager.branch;
      $('#portal-context small').textContent = 'Năm học 2026–2027';
    }
    $('.portal-nav-heading').textContent = role === 'branchManager'
      ? 'CƠ SỞ 1 · NGUYỄN CHÍ THANH'
      : role === 'teacher'
        ? 'LỊCH DẠY & ĐÀO TẠO'
        : role === 'parent'
          ? 'KHÔNG GIAN GIA ĐÌNH'
          : 'KHÔNG GIAN QUẢN TRỊ';
    dashboardExportButton.classList.toggle('app-hidden', role !== 'admin');
    buildNavigation();
    renderModule();
    if (dataLoadError) notice(dataLoadError);
  }

  function buildNavigation() {
    const navigationItems = primaryNavigationByRole[activeRole] || allowedModules();
    $('#portal-navigation').innerHTML = navigationItems.map(([id, icon, label]) => {
      const iconMarkup = icon.startsWith('fa-')
        ? `<i class="${icon}" aria-hidden="true"></i>`
        : `<span aria-hidden="true">${icon}</span>`;
      return `<button class="portal-nav-item${id === activeModule || (activeRole === 'parent' && id === 'dashboard' && activeModule === 'students') ? ' is-active' : ''}" type="button" data-module="${id}">${iconMarkup}${escapeHTML(label)}</button>`;
    }).join('');
    const primaryAdminModules = new Set(primaryNavigationByRole.admin.map(([id]) => id));
    $('#admin-module-options').innerHTML = menuByRole.admin
      .filter(([id]) => !primaryAdminModules.has(id))
      .map(([id, icon, label]) => `<button type="button" data-module="${id}"><span aria-hidden="true">${icon}</span>${escapeHTML(label)}</button>`)
      .join('');
  }

  function getParentChildren() {
    const childIds = new Set(roles.parent.studentIds);
    return data.students.filter(student => childIds.has(student.id));
  }

  function moduleRows(module) {
    const rows = data[module] || [];
    if (activeRole === 'branchManager') {
      const branchTeacherNames = data.staff
        .filter(item => item.branch === roles.branchManager.branchArea && /giáo viên|trợ giảng/i.test(item.position))
        .map(item => item.name);
      const branchStudentIds = new Set(data.studentProfiles
        .filter(profile => String(profile.branch || '').startsWith('Cơ sở 1'))
        .map(profile => profile.studentId)
        .concat(data.students.filter(student => student.branch === roles.branchManager.branch).map(student => student.id)));
      if (module === 'staff') return rows.filter(item => branchTeacherNames.includes(item.name));
      if (module === 'students') return rows.filter(item => branchStudentIds.has(item.id));
      if (module === 'classes' || module === 'schedule') {
        return rows.filter(item => branchTeacherNames.includes(item.teacher));
      }
      if (module === 'tuition') {
        return rows.filter(item => branchStudentIds.has(item.studentId) ||
          branchStudentIds.has(data.students.find(student => student.name === item.student)?.id));
      }
    }
    if (activeRole === 'parent') {
      if (module === 'paymentHistory') {
        const children = getParentChildren();
        const childIds = new Set(children.map(child => child.id));
        const childNames = new Set(children.map(child => child.name));
        return data.tuition
          .filter(row => childIds.has(row.studentId) || childNames.has(row.student))
          .sort((left, right) => String(right.paidDate || right.dueDate || '').localeCompare(String(left.paidDate || left.dueDate || '')));
      }
      const children = getParentChildren();
      const child = children.find(item => item.id === selectedStudentId) || children[0];
      if (!child) return [];
      if (module === 'schedule') {
        return rows.filter(row => row.className === child.className);
      }
      if (module === 'resources') {
        return rows.filter(row => row.className === child.className);
      }
      if (module === 'support') {
        return rows.filter(row => row.name === roles.parent.displayName);
      }
      if (module === 'courses') {
        return rows.filter(row => child.className.includes(row.title));
      }
      if (['students', 'grades', 'tuition', 'attendance'].includes(module)) {
        return rows.filter(row => module === 'tuition'
          ? isParentTuitionRecord(row, child)
          : row.student === child.name || row.name === child.name);
      }
    }
    if (activeRole === 'teacher' && ['classes', 'schedule'].includes(module)) {
      return rows.filter(row => row.teacher === roles.teacher.displayName);
    }
    if (activeRole === 'teacher' && module === 'resources') {
      const classNames = data.classes.filter(item => item.teacher === roles.teacher.displayName).map(item => item.name);
      return rows.filter(row => classNames.includes(row.className));
    }
    if (activeRole === 'teacher' && ['attendance', 'grades'].includes(module)) {
      const classNames = data.classes.filter(item => item.teacher === roles.teacher.displayName).map(item => item.name);
      return rows.filter(row => classNames.includes(row.className) || classNames.some(name => row.course && name.includes(row.course)));
    }
    if (activeRole === 'teacher' && module === 'students') {
      const classNames = data.classes.filter(item => item.teacher === roles.teacher.displayName).map(item => item.name);
      return rows.filter(row => classNames.includes(row.className));
    }
    if (activeRole === 'parent' && module === 'news') {
      return rows.filter(row => row.audience === 'Tất cả' || row.audience === 'Phụ huynh' || row.audience === 'Học viên');
    }
    return rows;
  }

  function isParentTuitionRecord(record, child) {
    return record.studentId ? record.studentId === child.id : record.student === child.name;
  }

  function getTuitionBreakdown(record) {
    const amount = Number(record.amount);
    const sessions = Number(record.sessions);
    const validAmount = Number.isFinite(amount) && amount >= 0 ? amount : 0;
    const validSessions = Number.isInteger(sessions) && sessions > 0 ? sessions : 12;
    const unitPrice = Number(record.unitPrice);
    const validUnitPrice = Number.isFinite(unitPrice) && unitPrice >= 0 ? unitPrice : validAmount / validSessions;
    const deduction = Number(record.previousMonthDeduction);
    const materialsFee = Number(record.materialsFee);
    const validDeduction = Number.isFinite(deduction) && deduction >= 0 ? deduction : 0;
    const validMaterialsFee = Number.isFinite(materialsFee) && materialsFee >= 0 ? materialsFee : 0;
    const subtotal = validSessions * validUnitPrice;
    const total = Math.max(0, subtotal - validDeduction + validMaterialsFee);
    return {
      sessions: validSessions,
      unitPrice: validUnitPrice,
      deduction: validDeduction,
      materialsFee: validMaterialsFee,
      total,
      matchesInvoiceAmount: Math.abs(total - validAmount) < 0.01
    };
  }

  function getLocalDateKey(date = new Date()) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function isValidDateKey(value) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(value || '')) return false;
    const date = new Date(`${value}T00:00:00`);
    return !Number.isNaN(date.getTime()) && getLocalDateKey(date) === value;
  }

  function isTuitionOverdue(record, today = getLocalDateKey()) {
    return isValidDateKey(record.dueDate) && record.dueDate < today;
  }

  function getTuitionStatusLabel(record) {
    if (record.status === 'Đã thanh toán') return 'Đã thanh toán';
    if (isTuitionOverdue(record)) return 'Quá hạn';
    if (isValidDateKey(record.dueDate) && record.dueDate === getLocalDateKey()) return 'Đến hạn hôm nay';
    return 'Chưa thanh toán';
  }

  function getValidScore(value) {
    if (value === '' || value === null || value === undefined) return null;
    const score = Number(value);
    return Number.isFinite(score) && score >= 0 && score <= 10 ? score : null;
  }

  function getStudentSubjectName(className, grades) {
    const matchingGrade = grades.find(grade =>
      grade.course && (className.includes(grade.course) || grade.course.includes(className))
    );
    return matchingGrade?.course || className;
  }

  function gradeMatchesSubject(grade, subjectClassName) {
    const course = String(grade.course || '').trim();
    return Boolean(course && (subjectClassName.includes(course) || course.includes(subjectClassName)));
  }

  function getStudentLearningResults(student) {
    const grades = data.grades.filter(record => record.student === student.name && isValidDateKey(record.date));
    const schedules = data.studentSchedules.filter(record => record.studentId === student.id);
    const attendanceRecords = data.attendance.filter(record =>
      record.student === student.name && isValidDateKey(record.date)
    );
    const subjectClasses = new Map();
    for (const record of schedules) {
      const className = String(record.className || record.subject || '').trim();
      if (className) subjectClasses.set(className, className);
    }
    if (student.className) subjectClasses.set(student.className, student.className);
    for (const record of attendanceRecords) {
      if (record.className) subjectClasses.set(record.className, record.className);
    }
    for (const record of grades) {
      if (record.course && ![...subjectClasses.keys()].some(name => gradeMatchesSubject(record, name))) {
        subjectClasses.set(record.course, record.course);
      }
    }

    const subjects = [...subjectClasses.values()].map((className, index) => {
      const name = getStudentSubjectName(className, grades);
      const lessonRecords = attendanceRecords.filter(record => record.className === className);
      const lessons = lessonRecords.map(record => {
        const grade = grades.find(item => item.date === record.date && gradeMatchesSubject(item, className));
        const status = ['Có mặt', 'Đi muộn', 'Vắng có phép', 'Vắng không phép'].includes(record.status)
          ? record.status
          : 'Chưa ghi nhận';
        return {
          id: record.id,
          date: record.date,
          className,
          subject: name,
          status,
          score: getValidScore(grade?.score) ?? getValidScore(record.score),
          feedback: grade?.feedback || record.note || ''
        };
      });
      const lessonKeys = new Set(lessons.map(lesson => lesson.date));
      const unlinkedGrades = grades.filter(grade =>
        gradeMatchesSubject(grade, className) && !lessonKeys.has(grade.date)
      );
      for (const grade of unlinkedGrades) {
        lessons.push({
          id: grade.id,
          date: grade.date,
          className,
          subject: name,
          status: 'Chưa ghi nhận',
          score: getValidScore(grade.score),
          feedback: grade.feedback || ''
        });
      }
      lessons.sort((first, second) => second.date.localeCompare(first.date));
      const recordedAttendance = lessons.filter(lesson => lesson.status !== 'Chưa ghi nhận');
      const attended = recordedAttendance.filter(lesson => ['Có mặt', 'Đi muộn'].includes(lesson.status)).length;
      const missed = recordedAttendance.length - attended;
      return {
        id: `subject-${index}`,
        className,
        name,
        lessons,
        attended,
        missed,
        attendanceCount: recordedAttendance.length,
        attendancePercent: recordedAttendance.length ? Math.round(attended / recordedAttendance.length * 100) : null
      };
    });
    const allLessons = subjects.flatMap(subject => subject.lessons)
      .sort((first, second) => second.date.localeCompare(first.date));
    return { subjects, lessons: allLessons };
  }

  function getStudentScoreMonths(subject) {
    const today = new Date();
    const monthStarts = Array.from({ length: 6 }, (_, index) => {
      const date = new Date(today.getFullYear(), today.getMonth() - 5 + index, 1);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      return { key, label: new Intl.DateTimeFormat('vi-VN', { month: 'short' }).format(date) };
    });
    const scoresByMonth = new Map();
    for (const lesson of subject.lessons) {
      const score = getValidScore(lesson.score);
      if (score === null) continue;
      const key = lesson.date.slice(0, 7);
      scoresByMonth.set(key, [...(scoresByMonth.get(key) || []), score]);
    }
    return {
      labels: monthStarts.map(month => month.label),
      scores: monthStarts.map(month => {
        const scores = scoresByMonth.get(month.key) || [];
        return scores.length ? Number((scores.reduce((total, score) => total + score, 0) / scores.length).toFixed(1)) : null;
      })
    };
  }

  function renderParentGrades() {
    const child = data.students.find(student => student.id === roles.parent.studentId);
    if (!child) {
      return `<div class="portal-page-heading"><div><h1>Kết quả học tập</h1><p>Theo dõi chuyên cần, điểm bài tập và nhận xét của giáo viên.</p></div></div><section class="portal-panel"><p class="portal-empty">Chưa có học sinh liên kết với tài khoản phụ huynh.</p></section>`;
    }
    const results = getStudentLearningResults(child);
    const subjectCharts = results.subjects.map(subject => ({
      id: subject.id,
      name: subject.name,
      attended: subject.attended,
      missed: subject.missed,
      attendanceCount: subject.attendanceCount,
      attendancePercent: subject.attendancePercent,
      monthScores: getStudentScoreMonths(subject)
    }));
    const chartCards = results.subjects.map(subject => {
      const chartData = subjectCharts.find(item => item.id === subject.id);
      const attendanceContent = subject.attendanceCount
        ? `<div class="learning-donut-wrap"><canvas id="learning-attendance-${subject.id}" aria-label="Biểu đồ chuyên cần môn ${escapeHTML(subject.name)}"></canvas><strong class="learning-donut-center">${subject.attendancePercent}%</strong></div><div class="learning-chart-legend"><span><i class="is-present"></i>Có mặt / đi muộn <strong>${subject.attended}</strong></span><span><i class="is-absent"></i>Vắng <strong>${subject.missed}</strong></span><small>${subject.attendanceCount} buổi đã điểm danh</small></div>`
        : '<p class="learning-no-data">Chưa có dữ liệu điểm danh cho môn học này.</p>';
      const scoreCount = subject.lessons.filter(lesson => getValidScore(lesson.score) !== null).length;
      const scoreContent = scoreCount
        ? `<div class="learning-mini-chart-wrap"><canvas id="learning-scores-${subject.id}" aria-label="Biểu đồ điểm bài tập theo tháng môn ${escapeHTML(subject.name)}"></canvas></div><p class="learning-chart-caption">Điểm trung bình bài tập theo tháng (thang điểm 10).</p>`
        : '<p class="learning-no-data">Chưa có điểm bài tập để thống kê.</p>';
      return `<article class="learning-subject-card"><header><div><span class="learning-subject-eyebrow">MÔN HỌC</span><h3>${escapeHTML(subject.name)}</h3></div><span class="learning-session-count">${subject.lessons.length} buổi ghi nhận</span></header><div class="learning-subject-charts">
        <section class="learning-chart-section"><h4>Chuyên cần</h4>${attendanceContent}</section>
        <section class="learning-chart-section"><h4>Phổ điểm theo tháng</h4>${scoreContent}</section>
      </div></article>`;
    }).join('');
    const lessonRows = results.lessons.map(lesson => {
      const statusClasses = {
        'Có mặt': 'is-present',
        'Đi muộn': 'is-late',
        'Vắng có phép': 'is-absent',
        'Vắng không phép': 'is-absent',
        'Chưa ghi nhận': 'is-unrecorded'
      };
      const statusIcons = {
        'Có mặt': '✓',
        'Đi muộn': '◷',
        'Vắng có phép': '–',
        'Vắng không phép': '!',
        'Chưa ghi nhận': '…'
      };
      return `<tr>
        <td>${escapeHTML(formatDashboardDate(lesson.date))}</td>
        <td><strong>${escapeHTML(lesson.subject)}</strong></td>
        <td><span class="learning-attendance-status ${statusClasses[lesson.status] || 'is-unrecorded'}"><i aria-hidden="true">${statusIcons[lesson.status] || '…'}</i>${escapeHTML(lesson.status)}</span></td>
        <td>${lesson.score === null ? '<span class="learning-score-empty">—</span>' : `<span class="learning-homework-score${lesson.score < 5 ? ' is-low' : ''}">${escapeHTML(String(lesson.score))}<small>/10</small></span>`}</td>
        <td>${lesson.feedback ? escapeHTML(lesson.feedback) : '<span class="learning-score-empty">Chưa có nhận xét</span>'}</td>
      </tr>`;
    }).join('');

    return `<div class="portal-page-heading learning-results-heading"><div><p class="learning-results-eyebrow">HỌC TẬP & TIẾN BỘ</p><h1>Kết quả học tập</h1><p>Chuyên cần, điểm bài tập và nhận xét của ${escapeHTML(child.name)}.</p></div></div>
      ${results.lessons.length ? `<section class="learning-subject-grid" aria-label="Thống kê theo môn học">${chartCards}</section>
        <section class="portal-panel learning-lessons-panel"><div class="portal-panel-header"><div><h2>Chi tiết từng buổi học</h2><p>${results.lessons.length} buổi có dữ liệu điểm danh hoặc điểm số.</p></div></div>
          <div class="portal-table-wrap"><table class="portal-table learning-lessons-table"><thead><tr><th>NGÀY HỌC</th><th>MÔN HỌC</th><th>ĐIỂM DANH</th><th>ĐIỂM BTVN</th><th>NHẬN XÉT GIÁO VIÊN</th></tr></thead><tbody>${lessonRows}</tbody></table></div>
        </section><div id="learning-results-chart-data" data-charts="${escapeHTML(JSON.stringify(subjectCharts))}" hidden></div>`
        : '<section class="portal-panel learning-empty-state"><span aria-hidden="true">★</span><h2>Chưa có kết quả học tập</h2><p>Khi giáo viên cập nhật điểm danh hoặc điểm số, dữ liệu sẽ hiển thị tại đây.</p></section>'}
      <p class="learning-results-note">Kết quả được đồng bộ từ dữ liệu điểm danh và chấm điểm của lớp; dữ liệu demo chỉ lưu trên trình duyệt này.</p>`;
  }

  function renderParentTuition() {
    const child = data.students.find(student => student.id === roles.parent.studentId);
    if (!child) {
      return `<div class="portal-page-heading"><div><h1>Học phí</h1><p>Thông tin học phí của học sinh trong gia đình.</p></div></div><section class="portal-panel"><p class="portal-empty">Chưa có học sinh liên kết với tài khoản phụ huynh.</p></section>`;
    }

    const invoices = moduleRows('tuition');
    const outstanding = invoices
      .filter(record => record.status !== 'Đã thanh toán')
      .sort((first, second) => String(first.dueDate || '').localeCompare(String(second.dueDate || '')));
    const history = moduleRows('paymentHistory')
      .sort((first, second) => String(second.paidDate || '').localeCompare(String(first.paidDate || '')));
    if (!outstanding.some(record => record.id === selectedTuitionId)) {
      selectedTuitionId = outstanding[0]?.id || null;
    }
    const selectedInvoice = outstanding.find(record => record.id === selectedTuitionId) || null;
    const detailInvoice = selectedInvoice || history[0] || null;
    const breakdown = detailInvoice ? getTuitionBreakdown(detailInvoice) : null;
    const totalOutstanding = outstanding.reduce((total, record) => {
      const amount = Number(record.amount);
      return total + (Number.isFinite(amount) && amount > 0 ? amount : 0);
    }, 0);
    const outstandingCards = outstanding.map(record => {
      const overdue = isTuitionOverdue(record);
      return `<article class="tuition-due-item${record.id === selectedTuitionId ? ' is-selected' : ''}">
        <div class="tuition-due-main"><span class="tuition-period">${escapeHTML(record.period || 'Kỳ học')}</span><span class="tuition-status${overdue ? ' is-overdue' : ''}">${escapeHTML(getTuitionStatusLabel(record))}</span></div>
        <strong class="tuition-due-amount">${escapeHTML(formatValue('amount', record.amount))}</strong>
        <small>Hạn thanh toán: ${escapeHTML(formatDashboardDate(record.dueDate))}</small>
        <div class="tuition-due-actions"><button class="portal-button secondary tuition-details-button" type="button" data-tuition-details="${escapeHTML(record.id)}">Chi tiết</button><button class="portal-button tuition-pay-button" type="button" data-pay="${escapeHTML(record.id)}">Thanh toán qua VietQR</button></div>
      </article>`;
    }).join('');
    const historyRows = history.map(record => `<tr>
      <td><strong>${escapeHTML(record.period || '—')}</strong></td>
      <td>${escapeHTML(formatValue('amount', record.amount))}</td>
      <td>${escapeHTML(formatDashboardDate(record.paidDate))}</td>
      <td><span class="tuition-paid-status">Đã thanh toán</span></td>
    </tr>`).join('');
    const breakdownRows = detailInvoice && breakdown ? `
      <tr><td>Số buổi học</td><td>${breakdown.sessions} buổi</td></tr>
      <tr><td>Đơn giá mỗi buổi</td><td>${escapeHTML(formatValue('amount', breakdown.unitPrice))}</td></tr>
      <tr><td>Tạm tính</td><td>${escapeHTML(formatValue('amount', breakdown.sessions * breakdown.unitPrice))}</td></tr>
      <tr><td>Khấu trừ (tháng trước)</td><td class="tuition-deduction">− ${escapeHTML(formatValue('amount', breakdown.deduction))}</td></tr>
      <tr><td>Phụ phí tài liệu</td><td>${escapeHTML(formatValue('amount', breakdown.materialsFee))}</td></tr>
      <tr class="tuition-total-row"><th scope="row">Tổng cộng</th><td>${escapeHTML(formatValue('amount', breakdown.total))}</td></tr>` : '';

    return `<div class="portal-page-heading tuition-heading"><div><p class="tuition-eyebrow">THANH TOÁN HỌC PHÍ</p><h1>Học phí của ${escapeHTML(child.name)}</h1><p>Kiểm tra khoản cần đóng và các giao dịch đã hoàn tất.</p></div></div>
      <section class="tuition-balance-card" aria-label="Tổng học phí cần đóng">
        <div class="tuition-balance-copy"><span class="tuition-balance-label">HỌC PHÍ CẦN ĐÓNG</span><strong>${escapeHTML(formatValue('amount', totalOutstanding))}</strong><p>${outstanding.length ? `${outstanding.length} khoản chưa thanh toán · ${escapeHTML(child.className || 'Học viên')}` : 'Bạn đã hoàn tất các khoản học phí hiện tại.'}</p></div>
        <span class="tuition-balance-icon" aria-hidden="true">$</span>
      </section>
      ${outstanding.length ? `<section class="portal-panel tuition-due-panel"><div class="portal-panel-header"><div><h2>Khoản cần thanh toán</h2><p>Chọn kỳ để xem chi tiết trước khi thanh toán.</p></div></div><div class="tuition-due-list">${outstandingCards}</div></section>` : `<section class="portal-panel tuition-settled-panel"><span class="tuition-settled-icon" aria-hidden="true">✓</span><div><h2>Không có khoản học phí cần đóng</h2><p>Các khoản cần thanh toán đã được hoàn tất. Lịch sử các kỳ đã đóng được hiển thị bên dưới.</p></div></section>`}
      <div class="tuition-detail-grid">
        <section class="portal-panel tuition-breakdown-panel"><div class="portal-panel-header"><div><h2>Chi tiết học phí</h2><p>${detailInvoice ? `${escapeHTML(detailInvoice.period || 'Kỳ học')} · ${escapeHTML(getTuitionStatusLabel(detailInvoice))}` : 'Chưa có dữ liệu học phí.'}</p></div></div>
          ${detailInvoice ? `<div class="portal-table-wrap"><table class="portal-table tuition-breakdown-table"><tbody>${breakdownRows}</tbody></table></div>${!breakdown.matchesInvoiceAmount ? '<p class="tuition-data-warning">Chi tiết tính toán khác số tiền trên hóa đơn. Vui lòng liên hệ trung tâm để xác nhận.</p>' : ''}` : '<p class="portal-empty">Chưa có hóa đơn học phí.</p>'}
        </section>
        <section class="portal-panel tuition-history-panel"><div class="portal-panel-header"><div><h2>Lịch sử thanh toán</h2><p>Các kỳ đã xác nhận thanh toán</p></div></div>
          <div class="portal-table-wrap"><table class="portal-table tuition-history-table"><thead><tr><th>KỲ HỌC</th><th>SỐ TIỀN</th><th>NGÀY THANH TOÁN</th><th>TRẠNG THÁI</th></tr></thead><tbody>${historyRows || '<tr><td class="portal-empty" colspan="4">Chưa có giao dịch thanh toán.</td></tr>'}</tbody></table></div>
        </section>
      </div>
      <p class="tuition-demo-note">Thanh toán VietQR hiện là mô phỏng. Không có giao dịch ngân hàng thật được thực hiện.</p>`;
  }

  function getStudentWeekStart(date) {
    const monday = new Date(date);
    monday.setHours(0, 0, 0, 0);
    monday.setDate(monday.getDate() - ((monday.getDay() + 6) % 7));
    return monday;
  }

  function getStudentWeekDate(offset) {
    const date = new Date(studentCalendarWeekStart);
    date.setDate(date.getDate() + offset);
    return date;
  }

  function formatStudentDate(date, options) {
    return new Intl.DateTimeFormat('vi-VN', options).format(date);
  }

  function getStudentProfile(student) {
    return data.studentProfiles.find(profile => profile.studentId === student.id) || { branch: student.branch || '' };
  }

  function getStudentInitials(name) {
    return String(name || '?').trim().split(/\s+/).slice(-2).map(part => part[0]).join('').toLocaleUpperCase('vi');
  }

  function getWeekdayLabel(dayOfWeek) {
    const day = Number(dayOfWeek);
    if (!Number.isInteger(day) || day < 1 || day > 7) return 'Chưa xếp lịch';
    return day === 7 ? 'Chủ nhật' : `Thứ ${day + 1}`;
  }

  function renderStudentModule() {
    const visibleStudents = moduleRows('students');
    if (!visibleStudents.some(student => student.id === selectedStudentId)) {
      selectedStudentId = visibleStudents[0]?.id || null;
      studentDetailOpen = false;
    }
    const filteredStudents = applySearch(visibleStudents);
    const listMarkup = `<div class="student-directory-grid">${filteredStudents.map(student => `
      <button class="student-directory-card" type="button" data-student-open="${escapeHTML(student.id)}" aria-label="Xem hồ sơ ${escapeHTML(student.name)}">
        <span class="student-directory-avatar" aria-hidden="true">${escapeHTML(getStudentInitials(student.name))}</span>
        <span class="student-directory-info">
          <strong>${escapeHTML(student.name)}</strong>
          <span>${escapeHTML(student.grade || 'Chưa cập nhật khối lớp')} · ${escapeHTML(student.className || 'Chưa xếp lớp')}</span>
          <small>${escapeHTML(getStudentProfile(student).branch || 'Chưa cập nhật cơ sở')}</small>
        </span>
        <span class="student-directory-status">${escapeHTML(student.status || 'Chưa cập nhật')}</span>
        <span class="student-directory-arrow" aria-hidden="true">›</span>
      </button>`).join('') || '<p class="student-directory-empty">Không tìm thấy học viên phù hợp với từ khóa.</p>'}</div>`;

    if (!studentDetailOpen || !visibleStudents.some(student => student.id === selectedStudentId)) {
      return `<div class="portal-page-heading"><div><h1>${activeRole === 'parent' ? 'Thông tin học sinh' : 'Hồ sơ học viên'}</h1><p>${activeRole === 'parent' ? 'Hồ sơ và lịch học của học sinh trong gia đình.' : 'Chọn học viên để xem thông tin cá nhân và lịch học trong tuần.'}</p></div></div>
        <section class="portal-panel student-directory-panel"><div class="portal-panel-header"><div><h2>Danh sách học viên</h2><p>${filteredStudents.length} học viên${activeRole === 'teacher' ? ' thuộc các lớp được phân công' : ''}</p></div>${isEditable('students') ? '<button class="portal-button" type="button" data-create="students">+ Thêm học viên</button>' : ''}</div>${listMarkup}</section>`;
    }

    const student = visibleStudents.find(item => item.id === selectedStudentId);
    const profile = getStudentProfile(student);
    const studentSchedules = data.studentSchedules.filter(item => item.studentId === student.id && Number.isInteger(Number(item.dayOfWeek)) && Number(item.dayOfWeek) >= 1 && Number(item.dayOfWeek) <= 7);
    const teacherClassNames = data.classes.filter(item => item.teacher === roles.teacher.displayName).map(item => item.name);
    const schedules = activeRole === 'teacher'
      ? studentSchedules.filter(item => item.teacher === roles.teacher.displayName && teacherClassNames.includes(item.className || item.subject))
      : studentSchedules;
    const birthDate = profile.birthDate && /^\d{4}-\d{2}-\d{2}$/.test(profile.birthDate)
      ? formatStudentDate(new Date(`${profile.birthDate}T00:00:00`), { day: '2-digit', month: '2-digit', year: 'numeric' })
      : 'Chưa cập nhật';
    const weekEnd = getStudentWeekDate(6);
    const weekLabel = `${formatStudentDate(studentCalendarWeekStart, { day: '2-digit', month: '2-digit' })} - ${formatStudentDate(weekEnd, { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
    const today = new Date();
    const todayKey = `${today.getFullYear()}-${today.getMonth()}-${today.getDate()}`;
    const weekdays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    const calendarDays = weekdays.map((day, index) => {
      const date = getStudentWeekDate(index);
      const dayOfWeek = index + 1;
      const dayKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
      const daySchedules = schedules.filter(item => Number(item.dayOfWeek) === dayOfWeek);
      return `<section class="student-calendar-day${dayKey === todayKey ? ' is-today' : ''}">
        <header><strong>${day}</strong><span>${formatStudentDate(date, { day: '2-digit', month: '2-digit' })}</span></header>
        <div class="student-calendar-events">${daySchedules.length ? daySchedules.map(item => `<article class="student-calendar-event${item.theme === 'blue' ? ' is-blue' : ''}">
          <strong>${escapeHTML(item.time || 'Chưa cập nhật giờ')}</strong>
          <span>${escapeHTML(item.subject || 'Buổi học')}</span>
          <small>${escapeHTML(item.teacher || 'Chưa phân công giáo viên')}</small>
          <small>${escapeHTML(item.room || 'Chưa xếp phòng')}</small>
        </article>`).join('') : '<p class="student-calendar-empty">Không có lịch học</p>'}</div>
      </section>`;
    }).join('');

    return `<div class="portal-page-heading student-detail-heading">
        <div><button class="portal-button student-back-button" type="button" data-student-back>‹ Danh sách học viên</button><h1>${escapeHTML(student.name)}</h1><p>Hồ sơ cá nhân và lịch học tuần của học viên.</p></div>
        ${isEditable('students') || canDelete('students') ? `<div class="student-detail-actions">${isEditable('students') ? `<button class="portal-button" type="button" data-edit="students" data-id="${escapeHTML(student.id)}">Chỉnh sửa</button>` : ''}${canDelete('students') ? `<button class="portal-button danger" type="button" data-delete="students" data-id="${escapeHTML(student.id)}">Xóa hồ sơ</button>` : ''}</div>` : ''}
      </div>
      <section class="portal-panel student-profile-panel">
        <div class="student-profile-banner">
          <span class="student-profile-avatar" aria-hidden="true">${escapeHTML(getStudentInitials(student.name))}</span>
          <div><span class="student-profile-eyebrow">HỒ SƠ HỌC VIÊN</span><h2>${escapeHTML(student.name)}</h2><p>${escapeHTML(student.grade || 'Chưa cập nhật khối lớp')} · ${escapeHTML(student.className || 'Chưa xếp lớp')}</p></div>
          <span class="student-profile-status">${escapeHTML(student.status || 'Chưa cập nhật')}</span>
        </div>
        <div class="student-profile-facts">
          <div><span>Ngày sinh</span><strong>${escapeHTML(birthDate)}</strong></div>
          <div><span>Giới tính</span><strong>${escapeHTML(profile.gender || 'Chưa cập nhật')}</strong></div>
          <div><span>Phụ huynh</span><strong>${escapeHTML(student.parent || 'Chưa cập nhật')}</strong></div>
          <div><span>Số điện thoại</span><strong>${escapeHTML(student.phone || 'Chưa cập nhật')}</strong></div>
          <div><span>Cơ sở</span><strong>${escapeHTML(profile.branch || 'Chưa cập nhật')}</strong></div>
          <div><span>Thời gian theo học</span><strong>${escapeHTML(profile.enrollmentPeriod || 'Chưa cập nhật')}</strong></div>
          <div><span>Hình thức học</span><strong>${escapeHTML(profile.learningMode || 'Chưa cập nhật')}</strong></div>
          <div><span>Địa chỉ</span><strong>${escapeHTML(profile.address || 'Chưa cập nhật')}</strong></div>
        </div>
      </section>
      <section class="portal-panel student-calendar-panel">
        <div class="portal-panel-header student-calendar-header"><div><h2>Lịch học trong tuần</h2><p>Lịch định kỳ theo tuần · ${escapeHTML(weekLabel)}</p></div>
          <div class="student-calendar-controls"><button class="portal-button" type="button" data-student-week="-1" aria-label="Tuần trước">‹</button><button class="portal-button" type="button" data-student-week="0">Tuần này</button><button class="portal-button" type="button" data-student-week="1" aria-label="Tuần sau">›</button></div>
        </div>
        <div class="student-calendar-scroll"><div class="student-calendar-grid">${calendarDays}</div></div>
        ${schedules.length ? '' : '<p class="student-calendar-notice">Học viên chưa có lịch học được ghi nhận.</p>'}
      </section>`;
  }

  function getStats() {
    const students = moduleRows('students');
    const unpaid = moduleRows('tuition').filter(row => row.status !== 'Đã thanh toán');
    const lessons = moduleRows('schedule');
    if (activeRole === 'admin') {
      return [
        ['Học viên đang theo học', data.students.filter(item => item.status === 'Đang học').length],
        ['Khóa học đang mở', data.courses.filter(item => item.status === 'Đang mở').length],
        ['Lớp học', data.classes.length],
        ['Học phí cần thu', `${unpaid.length} khoản`]
      ];
    }
    if (activeRole === 'teacher') {
      return [
        ['Lớp đang phụ trách', data.classes.filter(item => item.teacher === roles.teacher.displayName).length],
        ['Học viên', students.length],
        ['Lịch dạy sắp tới', lessons.length],
        ['Bài đánh giá', moduleRows('grades').length]
      ];
    }
    return [
      ['Học sinh', students.length],
      ['Khóa học', moduleRows('courses').length],
      ['Lịch học sắp tới', lessons.length],
      ['Khoản học phí cần đóng', unpaid.length]
    ];
  }

  function formatDashboardDate(dateValue) {
    const date = new Date(`${dateValue}T00:00:00`);
    return Number.isNaN(date.getTime()) ? '—' : new Intl.DateTimeFormat('vi-VN').format(date);
  }

  function getDashboardRevenueByWeek(year, month) {
    const weeks = [
      { label: 'Tuần 1', start: 1, end: 7 },
      { label: 'Tuần 2', start: 8, end: 14 },
      { label: 'Tuần 3', start: 15, end: 21 },
      { label: 'Tuần 4', start: 22, end: new Date(year, month + 1, 0).getDate() }
    ];
    const matchesMonth = value => {
      const date = new Date(`${value}T00:00:00`);
      return date.getFullYear() === year && date.getMonth() === month ? date.getDate() : 0;
    };
    return weeks.map(week => ({
      label: week.label,
      revenue: data.transactions
        .filter(item => item.type === 'Thu' && matchesMonth(item.date) >= week.start && matchesMonth(item.date) <= week.end)
        .reduce((total, item) => total + Number(item.amount || 0), 0),
      tuition: data.tuition
        .filter(item => item.status === 'Đã thanh toán' && matchesMonth(item.paidDate) >= week.start && matchesMonth(item.paidDate) <= week.end)
        .reduce((total, item) => total + Number(item.amount || 0), 0)
    }));
  }

  function renderAdminDashboard() {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const activeStudents = data.students.filter(item => item.status === 'Đang học').length;
    const monthlyRevenue = data.transactions
      .filter(item => item.type === 'Thu' && item.date.startsWith(monthKey))
      .reduce((total, item) => total + Number(item.amount || 0), 0);
    const tuitionDue = data.tuition
      .filter(item => item.status !== 'Đã thanh toán')
      .reduce((total, item) => total + Number(item.amount || 0), 0);
    const monthlyExpense = data.transactions
      .filter(item => item.type === 'Chi' && item.date.startsWith(monthKey))
      .reduce((total, item) => total + Number(item.amount || 0), 0);
    const kpis = [
      { icon: 'fa-solid fa-user-graduate', title: 'Số học viên', value: activeStudents.toLocaleString('vi-VN'), change: 'Đang theo học', tone: 'positive', detail: 'toàn hệ thống' },
      { icon: 'fa-solid fa-arrow-trend-up', title: 'Doanh thu tháng này', value: formatValue('amount', monthlyRevenue), change: 'Tổng thu', tone: 'positive', detail: 'giao dịch trong tháng' },
      { icon: 'fa-solid fa-scale-balanced', title: 'Lợi nhuận gộp', value: formatValue('amount', monthlyRevenue - monthlyExpense), change: 'Thu − chi', tone: monthlyRevenue >= monthlyExpense ? 'positive' : 'negative', detail: 'tính theo giao dịch tháng này' },
      { icon: 'fa-solid fa-file-invoice-dollar', title: 'Công nợ cần thu', value: formatValue('amount', tuitionDue), change: 'Cần theo dõi', tone: 'negative', detail: 'các khoản chưa thanh toán' }
    ];
    const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
    const overdue = data.tuition.filter(item => item.status !== 'Đã thanh toán' && item.dueDate < today);
    const weeklyRevenue = getDashboardRevenueByWeek(now.getFullYear(), now.getMonth());
    const classEnrollment = data.classes.map(item => ({
      name: item.name,
      count: data.students.filter(student => student.className === item.name && student.status === 'Đang học').length
    }));
    const shortcuts = allowedModules().filter(([id]) => id !== 'dashboard').slice(0, 6);
    const overdueRows = overdue.map(item => {
      const student = data.students.find(record => record.name === item.student);
      return `<tr>
        <td><strong>${escapeHTML(item.student)}</strong><small class="dashboard-cell-subtitle">${escapeHTML(student?.className || 'Chưa xếp lớp')}</small></td>
        <td>${escapeHTML(item.period)}</td>
        <td>${escapeHTML(formatValue('amount', item.amount))}</td>
        <td><span class="dashboard-overdue">${escapeHTML(formatDashboardDate(item.dueDate))}</span></td>
        <td><button class="portal-action dashboard-remind" type="button" data-remind="${escapeHTML(item.id)}">${item.remindedAt ? 'Đã nhắc phí' : 'Nhắc phí'}</button></td>
      </tr>`;
    }).join('');
    const upcomingRows = data.schedule.slice(0, 4).map(item => `<tr>
      <td><strong>${escapeHTML(item.day)}</strong><small class="dashboard-cell-subtitle">${escapeHTML(item.time)}</small></td>
      <td>${escapeHTML(item.className)}</td>
      <td>${escapeHTML(item.teacher)}</td>
      <td>${escapeHTML(item.room)}</td>
    </tr>`).join('');

    return `
      <div class="portal-page-heading dashboard-heading">
        <div><p class="dashboard-eyebrow">TỔNG QUAN · ${now.toLocaleDateString('vi-VN', { month: 'long', year: 'numeric' })}</p><h1>Dashboard tổng quan</h1><p>Theo dõi sức khỏe vận hành và các chỉ số quan trọng của trung tâm.</p></div>
      </div>
      <section class="dashboard-kpis" aria-label="Chỉ số tổng quan">
        ${kpis.map(item => `<article class="portal-stat dashboard-kpi">
          <div class="dashboard-kpi-top"><span>${escapeHTML(item.title)}</span><span class="dashboard-kpi-icon" aria-hidden="true"><i class="${item.icon}"></i></span></div>
          <strong>${escapeHTML(item.value)}</strong>
          <div class="dashboard-kpi-foot"><span class="dashboard-trend ${item.tone}">${escapeHTML(item.change)}</span><span>${escapeHTML(item.detail)}</span></div>
        </article>`).join('')}
      </section>
      <section class="dashboard-chart-grid" aria-label="Biểu đồ hoạt động">
        <article class="portal-panel dashboard-chart-card">
          <div class="portal-panel-header"><div><h2>Doanh thu & thu học phí</h2><p>Theo tuần trong tháng hiện tại</p></div><span class="dashboard-chart-unit">VNĐ</span></div>
          <div class="dashboard-canvas-wrap"><canvas id="dashboard-revenue-chart" aria-label="Biểu đồ doanh thu và thu học phí theo tuần"></canvas></div>
        </article>
        <article class="portal-panel dashboard-chart-card">
          <div class="portal-panel-header"><div><h2>Học viên & lớp học</h2><p>Sĩ số học viên đang theo học</p></div></div>
          <div class="dashboard-canvas-wrap enrollment"><canvas id="dashboard-enrollment-chart" aria-label="Biểu đồ số học viên theo lớp"></canvas></div>
        </article>
      </section>
      <section class="dashboard-lists-grid">
        <article class="portal-panel dashboard-data-panel">
          <div class="portal-panel-header"><div><h2>Học phí quá hạn</h2><p>${overdue.length} khoản cần được theo dõi</p></div><button class="portal-button secondary dashboard-view-all" type="button" data-module="tuition">Xem học phí</button></div>
          <div class="portal-table-wrap"><table class="portal-table"><thead><tr><th>HỌC VIÊN</th><th>KỲ HỌC</th><th>SỐ TIỀN</th><th>HẠN ĐÓNG</th><th>THAO TÁC</th></tr></thead><tbody>${overdueRows || '<tr><td class="portal-empty" colspan="5">Không có khoản học phí quá hạn.</td></tr>'}</tbody></table></div>
        </article>
        <article class="portal-panel dashboard-data-panel">
          <div class="portal-panel-header"><div><h2>Lớp học sắp tới</h2><p>Lịch học trong tuần</p></div><button class="portal-button secondary dashboard-view-all" type="button" data-module="schedule">Xem lịch</button></div>
          <div class="portal-table-wrap"><table class="portal-table"><thead><tr><th>NGÀY / GIỜ</th><th>LỚP</th><th>GIÁO VIÊN</th><th>PHÒNG</th></tr></thead><tbody>${upcomingRows || '<tr><td class="portal-empty" colspan="4">Chưa có lịch học.</td></tr>'}</tbody></table></div>
        </article>
      </section>
      <section class="portal-panel dashboard-shortcuts-panel"><div class="portal-panel-header"><h2>Truy cập nhanh</h2></div><div class="portal-record-grid">
        ${shortcuts.map(([id, icon, label]) => `<button class="portal-record-card portal-shortcut" type="button" data-module="${id}"><span aria-hidden="true">${icon}</span><h3>${escapeHTML(label)}</h3><p>Mở khu vực ${escapeHTML(label.toLocaleLowerCase('vi'))}</p></button>`).join('')}
      </div></section>
      <div id="dashboard-chart-data" data-chart="${escapeHTML(JSON.stringify({ weeklyRevenue, classEnrollment }))}" hidden></div>
    `;
  }

  function renderBranchManagerDashboard() {
    const todayLabel = new Intl.DateTimeFormat('vi-VN', {
      weekday: 'long',
      day: 'numeric',
      month: 'long'
    }).format(new Date()).toLocaleUpperCase('vi');
    const branchStudents = data.students.filter(student =>
      student.status === 'Đang học' &&
      data.studentProfiles.some(profile => profile.studentId === student.id && String(profile.branch || '').startsWith('Cơ sở 1'))
    );
    const branchTeacherNames = data.staff
      .filter(member => member.status === 'Đang làm việc' && member.branch === roles.branchManager.branchArea && /giáo viên|trợ giảng/i.test(member.position))
      .map(member => member.name);
    const branchClasses = data.classes.filter(item => item.status === 'Đang học' && branchTeacherNames.includes(item.teacher));
    const monthKey = financeMonthKey(new Date());
    const branchStudentIds = new Set(branchStudents.map(student => student.id));
    const branchRevenue = data.tuition
      .filter(record => branchStudentIds.has(record.studentId) && record.status === 'Đã thanh toán' && String(record.paidDate || '').startsWith(monthKey))
      .reduce((total, record) => total + Number(record.amount || 0), 0);
    const kpis = [
      { icon: 'fa-solid fa-user-tie', title: 'Giáo viên cơ sở', value: branchTeacherNames.length.toLocaleString('vi-VN'), detail: 'Đang hoạt động', tone: 'orange' },
      { icon: 'fa-solid fa-chalkboard', title: 'Lớp đang chạy', value: branchClasses.length.toLocaleString('vi-VN'), detail: 'Theo lịch học hiện tại', tone: 'blue' },
      { icon: 'fa-solid fa-user-graduate', title: 'Học viên', value: branchStudents.length.toLocaleString('vi-VN'), detail: 'Đang theo học tại cơ sở', tone: 'green' },
      { icon: 'fa-solid fa-arrow-trend-up', title: 'Doanh thu tháng này', value: formatValue('amount', branchRevenue), detail: 'Học phí đã thu tại cơ sở', tone: 'purple' }
    ];
    const overdueTuition = data.tuition.filter(record =>
      branchStudentIds.has(record.studentId) && record.status !== 'Đã thanh toán' && isTuitionOverdue(record)
    );
    const overdueAmount = overdueTuition.reduce((total, record) => total + Number(record.amount || 0), 0);
    const branchSchedule = data.schedule.filter(item => branchTeacherNames.includes(item.teacher));
    const roomConflicts = [];
    for (let index = 0; index < branchSchedule.length; index += 1) {
      const current = branchSchedule[index];
      const currentTime = String(current.time || '').match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
      if (!currentTime) continue;
      const currentStart = Number(currentTime[1]) * 60 + Number(currentTime[2]);
      const currentEnd = Number(currentTime[3]) * 60 + Number(currentTime[4]);
      for (const other of branchSchedule.slice(index + 1)) {
        if (other.day !== current.day || other.room !== current.room) continue;
        const otherTime = String(other.time || '').match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
        if (!otherTime) continue;
        const otherStart = Number(otherTime[1]) * 60 + Number(otherTime[2]);
        const otherEnd = Number(otherTime[3]) * 60 + Number(otherTime[4]);
        if (currentStart < otherEnd && otherStart < currentEnd) roomConflicts.push([current, other]);
      }
    }
    const alerts = [
      ...(overdueTuition.length ? [{
        tone: 'danger',
        icon: 'fa-solid fa-triangle-exclamation',
        title: `${overdueTuition.length} khoản học phí quá hạn`,
        detail: `Tổng cần thu ${formatValue('amount', overdueAmount)}`,
        action: 'tuition',
        label: 'Xử lý ngay'
      }] : []),
      ...(roomConflicts.length ? [{
        tone: 'warning',
        icon: 'fa-solid fa-calendar-xmark',
        title: `${roomConflicts.length} lịch học trùng phòng`,
        detail: `${roomConflicts[0][0].room} · ${roomConflicts[0][0].day}`,
        action: 'schedule',
        label: 'Xử lý ngay'
      }] : [])
    ];
    const activities = [
      { initials: 'TL', color: 'orange', text: '<strong>Cô Lan</strong> vừa điểm danh lớp <strong>Toán nâng cao 9A</strong>', time: '5 phút trước' },
      { initials: 'TH', color: 'blue', text: '<strong>Thầy Hùng</strong> cập nhật kết quả bài kiểm tra Đại số', time: '18 phút trước' },
      { initials: 'NV', color: 'green', text: '<strong>Nhân viên tư vấn</strong> vừa ghi nhận học viên mới', time: '42 phút trước' }
    ];

    return `
      <div class="portal-page-heading dashboard-heading branch-dashboard-heading">
        <div><p class="dashboard-eyebrow">${escapeHTML(todayLabel)} · CƠ SỞ 1</p><h1>Chào buổi sáng, Long</h1><p>Tổng quan vận hành và những việc cần ưu tiên hôm nay.</p></div>
        <span class="branch-open-status"><span aria-hidden="true"></span> Cơ sở đang hoạt động</span>
      </div>
      <section class="dashboard-kpis" aria-label="Chỉ số vận hành cơ sở">
        ${kpis.map(item => `<article class="portal-stat dashboard-kpi branch-kpi">
          <div class="dashboard-kpi-top"><span>${escapeHTML(item.title)}</span><span class="dashboard-kpi-icon branch-kpi-icon ${item.tone}" aria-hidden="true"><i class="${item.icon}"></i></span></div>
          <strong>${escapeHTML(item.value)}</strong>
          <div class="dashboard-kpi-foot">${escapeHTML(item.detail)}</div>
        </article>`).join('')}
      </section>
      <div class="branch-dashboard-grid">
        <section class="portal-panel branch-alert-panel" aria-labelledby="branch-alert-heading">
          <div class="portal-panel-header branch-panel-heading">
            <div><h2 id="branch-alert-heading">Cần xử lý</h2><p>Các việc cần ưu tiên tại cơ sở</p></div>
            <span class="branch-alert-count">${alerts.length} việc</span>
          </div>
          <div class="branch-alert-list">
            ${alerts.map(item => `<article class="branch-alert-item ${item.tone}">
              <span class="branch-alert-icon" aria-hidden="true"><i class="${item.icon}"></i></span>
              <div class="branch-alert-copy"><h3>${item.title}</h3><p>${item.detail}</p></div>
              <button class="branch-text-action" type="button" data-module="${item.action}">${item.label}<span aria-hidden="true">→</span></button>
            </article>`).join('') || '<p class="branch-alert-clear"><i class="fa-solid fa-circle-check" aria-hidden="true"></i> Không có công nợ quá hạn hoặc lịch trùng phòng.</p>'}
          </div>
        </section>
        <section class="portal-panel branch-quick-panel" aria-labelledby="branch-quick-heading">
          <div class="portal-panel-header branch-panel-heading">
            <div><h2 id="branch-quick-heading">Thao tác nhanh</h2><p>Truy cập các công việc thường dùng</p></div>
          </div>
          <div class="branch-quick-actions">
              <button type="button" data-create="students"><span class="branch-quick-icon orange" aria-hidden="true">＋</span><span><strong>Thêm học viên</strong><small>Ghi danh học viên mới</small></span><span class="branch-action-arrow" aria-hidden="true">→</span></button>
              <button type="button" data-create="makeups"><span class="branch-quick-icon blue" aria-hidden="true">◷</span><span><strong>Xếp lịch bù</strong><small>Sắp xếp buổi học thay thế</small></span><span class="branch-action-arrow" aria-hidden="true">→</span></button>
              <button type="button" data-create="transactions"><span class="branch-quick-icon green" aria-hidden="true">₫</span><span><strong>Tạo phiếu thu</strong><small>Ghi nhận học phí tại cơ sở</small></span><span class="branch-action-arrow" aria-hidden="true">→</span></button>
              <button type="button" data-module="staff"><span class="branch-quick-icon purple" aria-hidden="true"><i class="fa-solid fa-user-tie"></i></span><span><strong>Giáo viên cơ sở</strong><small>Xem đội ngũ và phân công</small></span><span class="branch-action-arrow" aria-hidden="true">→</span></button>
          </div>
        </section>
      </div>
      <section class="portal-panel branch-activity-panel" aria-labelledby="branch-activity-heading">
        <div class="portal-panel-header branch-panel-heading">
          <div><h2 id="branch-activity-heading">Nhật ký hoạt động</h2><p>Cập nhật mới nhất tại Cơ sở 1</p></div>
          <span class="branch-live-indicator"><span aria-hidden="true"></span> Dữ liệu mẫu</span>
        </div>
        <div class="branch-activity-list">
          ${activities.map(item => `<article class="branch-activity-item">
            <span class="branch-activity-avatar ${item.color}" aria-hidden="true">${item.initials}</span>
            <p>${item.text}</p><time>${item.time}</time>
          </article>`).join('')}
        </div>
      </section>
    `;
  }

  function renderDashboard() {
    if (activeRole === 'admin') return renderAdminDashboard();
    if (activeRole === 'branchManager') return renderBranchManagerDashboard();
    if (activeRole === 'teacher') return renderTeacherDashboard();
    if (activeRole === 'parent') return renderParentDashboard();
    const stats = getStats();
    const shortcuts = allowedModules().filter(([id]) => id !== 'dashboard').slice(0, 6);
    return `
      <div class="portal-page-heading"><div><h1>${activeRole === 'parent' ? 'Chào mừng gia đình!' : `Xin chào, ${escapeHTML(roles[activeRole].displayName)}`}</h1><p>Tổng quan hoạt động và thông tin cần theo dõi.</p></div></div>
      <div class="portal-stats">${stats.map(([label, value]) => `<article class="portal-stat"><span>${escapeHTML(label)}</span><strong>${escapeHTML(value)}</strong></article>`).join('')}</div>
      <section class="portal-panel"><div class="portal-panel-header"><h2>Truy cập nhanh</h2></div><div class="portal-record-grid">
        ${shortcuts.map(([id, icon, label]) => `<button class="portal-record-card portal-shortcut" type="button" data-module="${id}"><span aria-hidden="true">${icon}</span><h3>${escapeHTML(label)}</h3><p>Mở khu vực ${escapeHTML(label.toLocaleLowerCase('vi'))}</p></button>`).join('')}
      </div></section>
      ${renderPanel('schedule', 'Lịch học gần đây', moduleRows('schedule').slice(0, 3), false)}
      ${renderPanel('news', 'Thông báo mới', moduleRows('news').slice(0, 3), false)}
    `;
  }

  function renderParentDashboard() {
    const children = getParentChildren();
    const childCards = children.map(child => {
      const profile = data.studentProfiles.find(item => item.studentId === child.id);
      const studentSchedules = data.studentSchedules
        .filter(item => item.studentId === child.id)
        .sort((left, right) => Number(left.dayOfWeek) - Number(right.dayOfWeek));
      const today = new Date();
      const todayDay = today.getDay() || 7;
      const currentMinutes = today.getHours() * 60 + today.getMinutes();
      const schedule = studentSchedules.find(item => {
        const day = Number(item.dayOfWeek);
        if (day > todayDay) return true;
        if (day < todayDay) return false;
        const start = String(item.time || '').match(/(\d{1,2}):(\d{2})/);
        return start ? Number(start[1]) * 60 + Number(start[2]) > currentMinutes : false;
      }) || studentSchedules[0];
      const latestGrade = data.grades
        .filter(item => item.student === child.name)
        .sort((left, right) => right.date.localeCompare(left.date))[0];
      const latestTuition = data.tuition
        .filter(item => isParentTuitionRecord(item, child))
        .sort((left, right) => String(right.dueDate || right.paidDate || '').localeCompare(String(left.dueDate || left.paidDate || '')))[0];
      const teacher = data.classes.find(item => item.name === child.className)?.teacher;
      const initials = getStudentInitials(child.name);
      return `<button class="parent-child-card" type="button" data-parent-child="${escapeHTML(child.id)}" aria-label="Xem hồ sơ ${escapeHTML(child.name)}">
        <span class="parent-child-avatar">${escapeHTML(initials)}</span>
        <span class="parent-child-main">
          <span class="parent-child-grade">${escapeHTML(child.grade || 'Học viên')} · ${escapeHTML(child.status || 'Đang theo học')}</span>
          <strong>${escapeHTML(child.name)}</strong>
          <span class="parent-child-course">${escapeHTML(child.className || 'Chưa xếp lớp')}</span>
          <span class="parent-child-branch">${escapeHTML(profile?.branch || 'Chưa cập nhật cơ sở')}</span>
        </span>
        <span class="parent-child-summary">
          <span><small>BUỔI HỌC TIẾP THEO</small><strong>${schedule ? `${escapeHTML(getWeekdayLabel(schedule.dayOfWeek))} · ${escapeHTML(schedule.time)}` : 'Chưa có lịch'}</strong></span>
          <span><small>GIÁO VIÊN</small><strong>${escapeHTML(teacher || schedule?.teacher || 'Đang cập nhật')}</strong></span>
          <span><small>BÀI KIỂM TRA GẦN NHẤT</small><strong>${latestGrade ? `${escapeHTML(latestGrade.score)}/10` : 'Chưa có điểm'}</strong></span>
          <span><small>HỌC PHÍ GẦN NHẤT</small><strong class="${latestTuition?.status === 'Đã thanh toán' ? 'is-paid' : 'is-due'}">${latestTuition ? `${escapeHTML(formatValue('amount', latestTuition.amount))} · ${escapeHTML(latestTuition.status)}` : 'Chưa có dữ liệu'}</strong></span>
        </span>
        <span class="parent-child-arrow" aria-hidden="true">›</span>
      </button>`;
    }).join('');

    return `<div class="portal-page-heading parent-page-heading">
        <div><p class="parent-eyebrow">KHÔNG GIAN GIA ĐÌNH</p><h1>Hành trình học tập của các con</h1><p>Chọn hồ sơ để theo dõi lịch học, kết quả và học phí của từng con.</p></div>
        <span class="parent-child-count">${children.length} học viên</span>
      </div>
      <section class="parent-children-list" aria-label="Danh sách con">
        ${childCards || '<article class="portal-panel parent-empty-state">Chưa có học sinh liên kết với tài khoản phụ huynh.</article>'}
      </section>
      <p class="parent-family-note">Thông tin học tập và học phí được hiển thị riêng theo từng học viên.</p>`;
  }

  function renderParentChildDetail() {
    const child = getParentChildren().find(item => item.id === selectedStudentId);
    if (!child) {
      return `<div class="portal-page-heading"><div><h1>Hồ sơ học viên</h1><p>Không tìm thấy học sinh liên kết với tài khoản phụ huynh này.</p></div></div>`;
    }

    const profile = data.studentProfiles.find(item => item.studentId === child.id);
    const attendance = data.attendance
      .filter(item => item.student === child.name)
      .sort((left, right) => right.date.localeCompare(left.date));
    const attendedCount = attendance.filter(item => ['Có mặt', 'Đi muộn'].includes(item.status)).length;
    const attendanceRate = attendance.length ? Math.round(attendedCount / attendance.length * 100) : null;
    const latestGrade = data.grades
      .filter(item => item.student === child.name)
      .sort((left, right) => right.date.localeCompare(left.date))[0];
    const tuition = data.tuition
      .filter(item => isParentTuitionRecord(item, child))
      .sort((left, right) => String(right.dueDate || right.paidDate || '').localeCompare(String(left.dueDate || left.paidDate || '')))[0];
    const schedule = data.studentSchedules
      .filter(item => item.studentId === child.id)
      .sort((left, right) => Number(left.dayOfWeek) - Number(right.dayOfWeek));
    const teacher = data.classes.find(item => item.name === child.className)?.teacher || schedule[0]?.teacher || 'Đang cập nhật';
    const timetableDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    const timetableCells = timetableDays.map((day, index) => {
      const lessons = schedule.filter(item => Number(item.dayOfWeek) === index + 1);
      return `<div class="parent-timetable-cell" role="cell">
        ${lessons.map(item => `<article class="parent-timetable-lesson">
          <strong>${escapeHTML(item.time || 'Chưa cập nhật giờ')}</strong>
          <span>${escapeHTML(item.subject || item.className || 'Buổi học')}</span>
          <small>${escapeHTML(item.room || 'Chưa xếp phòng')}</small>
        </article>`).join('') || '<span class="parent-timetable-empty">—</span>'}
      </div>`;
    }).join('');
    const attendanceProgress = attendanceRate ?? 0;
    const tuitionProgress = tuition?.status === 'Đã thanh toán' ? 100 : 0;
    const recentLessons = attendance.slice(0, 4).map(item => `<article class="parent-recent-lesson">
      <span>${escapeHTML(formatDashboardDate(item.date))}</span><strong>${escapeHTML(item.className)}</strong>
      <span class="parent-attendance-status${item.status === 'Có mặt' ? ' is-present' : ' is-absent'}">${escapeHTML(item.status)}</span>
      <span>${item.score ? `${escapeHTML(item.score)}/10` : '—'}</span>
    </article>`).join('');

    return `<div class="portal-page-heading parent-detail-heading">
        <div><button class="portal-button parent-back-button" type="button" data-parent-back>‹ Danh sách con</button><p class="parent-eyebrow">HỒ SƠ HỌC VIÊN</p><h1>${escapeHTML(child.name)}</h1><p>${escapeHTML(child.grade || '')} · ${escapeHTML(child.className || 'Chưa xếp lớp')}</p></div>
      </div>
      <section class="portal-panel parent-detail-profile">
        <span class="parent-child-avatar">${escapeHTML(getStudentInitials(child.name))}</span>
        <div><small>KHÓA HỌC HIỆN TẠI</small><strong>${escapeHTML(child.className || 'Chưa xếp lớp')}</strong><span>${escapeHTML(profile?.branch || 'Chưa cập nhật cơ sở')}</span></div>
        <div><small>GIÁO VIÊN PHỤ TRÁCH</small><strong>${escapeHTML(teacher)}</strong><span>${escapeHTML(child.status || 'Đang theo học')}</span></div>
        <div class="parent-progress-summary"><small>CHUYÊN CẦN</small><strong>${attendanceRate === null ? 'Chưa có dữ liệu' : `${attendanceRate}%`}</strong><span>${attendedCount}/${attendance.length} buổi có mặt</span>
          <div class="parent-progress-track" role="progressbar" aria-label="Tỷ lệ chuyên cần" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${attendanceProgress}"><span class="attendance-progress-fill" style="width: ${attendanceProgress}%"></span></div>
        </div>
      </section>
      <div class="parent-detail-grid">
        <section class="portal-panel parent-detail-card"><div class="portal-panel-header"><div><h2>Điểm danh gần đây</h2><p>Lịch sử tham gia lớp học của con.</p></div></div>
          <div class="parent-recent-list">${recentLessons || '<p class="parent-detail-empty">Chưa có dữ liệu điểm danh.</p>'}</div>
        </section>
        <section class="portal-panel parent-detail-card"><div class="portal-panel-header"><div><h2>Bài kiểm tra gần nhất</h2><p>Kết quả học tập và nhận xét giáo viên.</p></div></div>
          ${latestGrade ? `<div class="parent-grade-result"><strong>${escapeHTML(latestGrade.score)}<small>/10</small></strong><span>${escapeHTML(latestGrade.course)} · ${escapeHTML(formatDashboardDate(latestGrade.date))}</span><p>${escapeHTML(latestGrade.feedback || 'Chưa có nhận xét.')}</p></div>` : '<p class="parent-detail-empty">Chưa có kết quả kiểm tra.</p>'}
        </section>
        <section class="portal-panel parent-detail-card"><div class="portal-panel-header"><div><h2>Học phí</h2><p>Thông tin khoản thu gần nhất của con.</p></div></div>
          ${tuition ? `<div class="parent-tuition-summary"><strong>${escapeHTML(formatValue('amount', tuition.amount))}</strong><span>${escapeHTML(tuition.period)}</span><b class="${tuition.status === 'Đã thanh toán' ? 'is-paid' : 'is-due'}">${escapeHTML(getTuitionStatusLabel(tuition))}</b>
            <div class="parent-tuition-progress"><span>${tuitionProgress}% đã thanh toán</span><div class="parent-progress-track" role="progressbar" aria-label="Tiến độ thanh toán học phí" aria-valuemin="0" aria-valuemax="100" aria-valuenow="${tuitionProgress}"><span class="tuition-progress-fill${tuitionProgress < 100 ? ' is-due' : ''}" style="width: ${tuitionProgress}%"></span></div></div>
          </div>` : '<p class="parent-detail-empty">Chưa có thông tin học phí.</p>'}
        </section>
        <section class="portal-panel parent-detail-card parent-timetable-panel"><div class="portal-panel-header"><div><h2>Thời khóa biểu tuần</h2><p>Lịch học định kỳ từ Thứ 2 đến Chủ nhật.</p></div></div>
          <div class="parent-timetable-scroll"><div class="parent-timetable" role="table" aria-label="Thời khóa biểu tuần">
            <div class="parent-timetable-corner" role="columnheader">LỊCH HỌC</div>
            ${timetableDays.map(day => `<div class="parent-timetable-heading" role="columnheader">${day}</div>`).join('')}
            <div class="parent-timetable-row-label" role="rowheader">Các ca học</div>
            ${timetableCells}
          </div></div>
        </section>
      </div>`;
  }

  function renderTeacherDashboard() {
    const teacherName = roles.teacher.displayName;
    const assignedClasses = data.classes.filter(item => item.teacher === teacherName);
    const schedules = data.schedule.filter(item => item.teacher === teacherName);
    const weekDays = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
    const shifts = [
      { label: 'Ca 1', time: '08:00 – 10:00', start: 8, end: 10 },
      { label: 'Ca 2', time: '14:00 – 16:00', start: 14, end: 16 },
      { label: 'Ca 3', time: '16:00 – 18:00', start: 16, end: 18 },
      { label: 'Ca 4', time: '18:00 – 20:00', start: 18, end: 20 }
    ];
    const dateForDay = index => {
      const date = new Date(teacherCalendarWeekStart);
      date.setDate(date.getDate() + index);
      return date;
    };
    const currentWeekEnd = dateForDay(6);
    const weekLabel = `${formatStudentDate(teacherCalendarWeekStart, { day: '2-digit', month: '2-digit' })} – ${formatStudentDate(currentWeekEnd, { day: '2-digit', month: '2-digit', year: 'numeric' })}`;
    const today = new Date();
    const dayCells = weekDays.map((day, dayIndex) => {
      const date = dateForDay(dayIndex);
      const isToday = date.toDateString() === today.toDateString();
      return `<div class="teacher-calendar-day${isToday ? ' is-today' : ''}">
        <strong>${day}</strong><span>${formatStudentDate(date, { day: '2-digit', month: '2-digit' })}</span>
      </div>`;
    }).join('');
    const scheduleRows = shifts.map(shift => {
      const cells = weekDays.map((day, dayIndex) => {
        const lessons = schedules.filter(item => {
          if (item.day !== day) return false;
          const startHour = Number(String(item.time || '').match(/\d{1,2}/)?.[0]);
          return Number.isFinite(startHour) && startHour >= shift.start && startHour < shift.end;
        });
        return `<div class="teacher-calendar-cell${dateForDay(dayIndex).toDateString() === today.toDateString() ? ' is-today' : ''}">
          ${lessons.map(item => `<article class="teacher-lesson-card ${item.room === 'Phòng 201' ? 'orange' : 'blue'}">
            <strong>${escapeHTML(item.time)}</strong><span>${escapeHTML(item.className)}</span><small>${escapeHTML(item.room)}</small>
          </article>`).join('')}
        </div>`;
      }).join('');
      return `<div class="teacher-calendar-row"><div class="teacher-calendar-shift"><strong>${shift.label}</strong><span>${shift.time}</span></div>${cells}</div>`;
    }).join('');
    const classCards = assignedClasses.map(item => {
      const studentCount = data.students.filter(student => student.className === item.name).length;
      return `<article class="teacher-class-card">
        <span class="teacher-class-icon" aria-hidden="true">▦</span>
        <div class="teacher-class-main"><h3>${escapeHTML(item.name)}</h3><p>${escapeHTML(item.course || 'Chương trình Toán')}</p></div>
        <div class="teacher-class-facts"><span><strong>${studentCount}</strong> học viên</span><span>${escapeHTML(item.room || 'Chưa xếp phòng')}</span><span>${escapeHTML(item.schedule || 'Chưa cập nhật lịch')}</span></div>
      </article>`;
    }).join('');

    return `<div class="portal-page-heading teacher-page-heading">
        <div><p class="teacher-eyebrow">KHÔNG GIAN GIÁO VIÊN</p><h1>Xin chào, thầy ${escapeHTML(teacherName)}</h1><p>Lịch dạy và các lớp thầy đang phụ trách tại trung tâm.</p></div>
        <span class="teacher-status"><span aria-hidden="true"></span> Đang giảng dạy</span>
      </div>
      <section class="portal-panel teacher-profile-panel" aria-label="Thông tin giáo viên">
        <div class="teacher-profile-avatar" aria-hidden="true">${escapeHTML(getStudentInitials(teacherName))}</div>
        <div class="teacher-profile-name"><small>HỒ SƠ GIÁO VIÊN</small><h2>${escapeHTML(teacherName)}</h2><p>Giáo viên Toán · ${escapeHTML(roles.teacher.staffCode)}</p></div>
        <div class="teacher-profile-facts"><div><span>Giới tính</span><strong>${escapeHTML(roles.teacher.gender)}</strong></div><div><span>Ngày sinh</span><strong>${escapeHTML(roles.teacher.birthDate)}</strong></div><div><span>Cơ sở đang dạy</span><strong>${escapeHTML(roles.teacher.branch)}</strong></div></div>
      </section>
      <section class="portal-panel teacher-schedule-panel" aria-labelledby="teacher-schedule-heading">
        <div class="portal-panel-header teacher-schedule-heading">
          <div><span class="teacher-eyebrow">THỜI KHÓA BIỂU</span><h2 id="teacher-schedule-heading">Lịch dạy trong tuần</h2><p>Các ca dạy được phân công cho thầy.</p></div>
          <div class="teacher-week-controls"><button class="portal-button" type="button" data-teacher-week="-1" aria-label="Tuần trước">‹</button><span>${weekLabel}</span><button class="portal-button" type="button" data-teacher-week="1" aria-label="Tuần sau">›</button><button class="portal-button" type="button" data-teacher-week="0">Tuần này</button></div>
        </div>
        <div class="teacher-calendar-scroll"><div class="teacher-calendar-grid"><div class="teacher-calendar-corner">CA HỌC</div>${dayCells}${scheduleRows}</div></div>
        ${schedules.length ? '' : '<p class="teacher-schedule-empty">Chưa có lịch dạy được phân công trong tuần.</p>'}
      </section>
      <section class="teacher-classes-section"><div class="teacher-classes-heading"><div><span class="teacher-eyebrow">PHÂN CÔNG GIẢNG DẠY</span><h2>Lớp đang phụ trách</h2></div><span>${assignedClasses.length} lớp</span></div>
        <div class="teacher-classes-grid">${classCards || '<p class="teacher-schedule-empty">Chưa có lớp được phân công.</p>'}</div>
      </section>`;
  }

  function renderPanel(module, title, rows, withActions) {
    const moduleColumns = columns[module];
    if (!moduleColumns) return '';
    const limitedRows = applySearch(rows);
    const tableBody = limitedRows.map(row => renderRow(module, row, withActions)).join('');
    const headers = moduleColumns.map(([, label]) => `<th scope="col">${escapeHTML(label)}</th>`).join('');
    const hasParentActions = activeRole === 'parent' && ['students', 'courses', 'grades', 'tuition'].includes(module);
    const actionsHeader = withActions && (isEditable(module) || canDelete(module) || hasParentActions) ? '<th scope="col">THAO TÁC</th>' : '';
    return `<section class="portal-panel"><div class="portal-panel-header"><h2>${escapeHTML(title)}</h2>${withActions && isEditable(module) ? `<button class="portal-button" type="button" data-create="${module}">+ Thêm mới</button>` : ''}</div><div class="portal-table-wrap"><table class="portal-table"><thead><tr>${headers}${actionsHeader}</tr></thead><tbody>${tableBody || `<tr><td class="portal-empty" colspan="${moduleColumns.length + (actionsHeader ? 1 : 0)}">Chưa có dữ liệu phù hợp.</td></tr>`}</tbody></table></div></section>`;
  }

  function applySearch(rows) {
    const query = $('#global-search').value.trim().toLocaleLowerCase('vi');
    if (!query) return rows;
    return rows.filter(row => Object.values(row).some(value => String(value).toLocaleLowerCase('vi').includes(query)));
  }

  function renderRow(module, row, withActions) {
    const values = columns[module].map(([key]) => {
      const value = formatValue(key, row[key]);
      const safe = escapeHTML(value);
      if (key === 'status') {
        const warning = /Chưa|Quá hạn|Chờ|Vắng|Muộn/i.test(value) ? ' warning' : '';
        return `<td><span class="portal-status${warning}">${safe}</span></td>`;
      }
      return `<td>${safe}</td>`;
    }).join('');
    let actions = '';
    const hasParentAction = activeRole === 'parent' && (
      ['students', 'courses', 'grades'].includes(module) ||
      (module === 'tuition' && row.status !== 'Đã thanh toán')
    );
    if (withActions && (isEditable(module) || canDelete(module) || hasParentAction)) {
      actions = `<td><div class="portal-actions">
        ${isEditable(module) ? `<button class="portal-action" type="button" data-edit="${module}" data-id="${escapeHTML(row.id)}">Sửa</button>` : ''}
        ${canDelete(module) ? `<button class="portal-action" type="button" data-delete="${module}" data-id="${escapeHTML(row.id)}">Xóa</button>` : ''}
        ${activeRole === 'parent' && module === 'tuition' && row.status !== 'Đã thanh toán' ? `<button class="portal-action" type="button" data-pay="${escapeHTML(row.id)}">Thanh toán</button>` : ''}
        ${activeRole === 'parent' && module === 'students' ? '<button class="portal-action" type="button" data-view-teacher>Thông tin GV</button>' : ''}
        ${activeRole === 'parent' && module === 'courses' ? `<button class="portal-action" type="button" data-view-course="${escapeHTML(row.id)}">Chi tiết</button>` : ''}
        ${activeRole === 'parent' && module === 'grades' ? `<button class="portal-action" type="button" data-view-comment="${escapeHTML(row.id)}">Nhận xét</button>` : ''}
      </div></td>`;
    }
    return `<tr>${values}${actions}</tr>`;
  }

  function renderTabs(items, activeKey, attribute) {
    return `<div class="portal-tabs" role="tablist">${items.map(([key, label]) => `<button type="button" class="portal-tab${key === activeKey ? ' is-active' : ''}" role="tab" aria-selected="${key === activeKey}" ${attribute}="${key}">${escapeHTML(label)}</button>`).join('')}</div>`;
  }

  function renderStaffModule() {
    const tabs = [['profiles', 'Hồ sơ nhân sự'], ['attendance', 'Chấm công & KPIs'], ['payroll', 'Bảng lương'], ['shifts', 'Lịch trực']];
    let content = '';
    if (activeStaffTab === 'profiles') {
      content = `<div class="portal-stats"><article class="portal-stat"><span>Tổng nhân sự</span><strong>${data.staff.length}</strong></article><article class="portal-stat"><span>Giáo viên & trợ giảng</span><strong>${data.staff.filter(item => /giáo viên|trợ giảng/i.test(item.position)).length}</strong></article><article class="portal-stat"><span>Đang làm việc</span><strong>${data.staff.filter(item => item.status === 'Đang làm việc').length}</strong></article></div>${renderPanel('staff', 'Danh sách nhân sự', data.staff, true)}`;
    } else if (activeStaffTab === 'attendance') {
      content = `<div class="portal-stats"><article class="portal-stat"><span>Có chấm công</span><strong>${data.staffAttendance.length}</strong></article><article class="portal-stat"><span>Đi muộn</span><strong>${data.staffAttendance.filter(item => item.status === 'Đi muộn').length}</strong></article><article class="portal-stat"><span>KPI cần theo dõi</span><strong>${data.staffAttendance.filter(item => item.kpi === 'Cần theo dõi').length}</strong></article></div>${renderPanel('staffAttendance', 'Chấm công & KPIs', data.staffAttendance, true)}`;
    } else if (activeStaffTab === 'payroll') {
      const totalPayroll = data.payroll.reduce((sum, item) => sum + Number(item.basePay || 0) + Number(item.bonus || 0) - Number(item.deduction || 0), 0);
      content = `<div class="portal-stats"><article class="portal-stat"><span>Tổng lương kỳ này</span><strong>${escapeHTML(formatValue('amount', totalPayroll))}</strong></article><article class="portal-stat"><span>Chờ duyệt</span><strong>${data.payroll.filter(item => item.status === 'Chờ duyệt').length}</strong></article></div>${renderPanel('payroll', 'Bảng lương', data.payroll, true)}`;
    } else {
      content = renderPanel('shifts', 'Lịch trực', data.shifts, true);
    }
    return `<div class="portal-page-heading"><div><h1>Quản lý nhân sự</h1><p>Hồ sơ, chấm công, KPI, bảng lương và lịch trực.</p></div></div>${renderTabs(tabs, activeStaffTab, 'data-staff-tab')}${content}`;
  }

  function renderBranchTeachersModule() {
    const teachers = moduleRows('staff');
    const activeTeachers = teachers.filter(item => item.status === 'Đang làm việc').length;
    return `<div class="portal-page-heading"><div><h1>Giáo viên cơ sở</h1><p>Danh sách giáo viên đang công tác tại ${escapeHTML(roles.branchManager.branch)}.</p></div></div><div class="portal-stats"><article class="portal-stat"><span>Giáo viên tại cơ sở</span><strong>${teachers.length}</strong></article><article class="portal-stat"><span>Đang làm việc</span><strong>${activeTeachers}</strong></article></div>${renderPanel('staff', 'Danh sách giáo viên', teachers, false)}`;
  }

  function renderCRMModule() {
    const tabs = [['leads', 'Quản lý Lead'], ['campaigns', 'Chiến dịch marketing']];
    const module = activeCrmTab === 'campaigns' ? 'campaigns' : 'crm';
    const title = activeCrmTab === 'campaigns' ? 'Chiến dịch marketing' : 'Quản lý Lead';
    const rows = data[module];
    const statusCounts = activeCrmTab === 'campaigns'
      ? ['Sắp chạy', 'Đang chạy', 'Đã kết thúc']
      : ['Chờ liên hệ', 'Đang tư vấn', 'Đã đăng ký', 'Không quan tâm'];
    const counts = statusCounts.map(status => [status, rows.filter(item => item.status === status).length]);
    return `<div class="portal-page-heading"><div><h1>CRM & tuyển sinh</h1><p>Theo dõi khách hàng tiềm năng và chiến dịch marketing.</p></div></div>${renderTabs(tabs, activeCrmTab, 'data-crm-tab')}<div class="portal-stats">${counts.map(([label, value]) => `<article class="portal-stat"><span>${escapeHTML(label)}</span><strong>${value}</strong></article>`).join('')}</div>${renderPanel(module, title, rows, true)}`;
  }

  function financeMonthKey(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  function getFinanceMonthTransactions(monthKey = financeSelectedMonth) {
    return data.transactions
      .filter(item => item.date.startsWith(monthKey))
      .sort((left, right) => right.date.localeCompare(left.date));
  }

  function getFinanceMonthSeries() {
    const [selectedYear, selectedMonth] = financeSelectedMonth.split('-').map(Number);
    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date(selectedYear, selectedMonth - 1 - (5 - index), 1);
      const key = financeMonthKey(date);
      const transactions = data.transactions.filter(item => item.date.startsWith(key));
      return {
        key,
        label: new Intl.DateTimeFormat('vi-VN', { month: 'short' }).format(date),
        income: transactions.filter(item => item.type === 'Thu').reduce((total, item) => total + Number(item.amount || 0), 0),
        expense: transactions.filter(item => item.type === 'Chi').reduce((total, item) => total + Number(item.amount || 0), 0)
      };
    });
  }

  function renderFinanceTransactionPanel(title, rows) {
    const filteredRows = applySearch(rows);
    const body = filteredRows.map(row => renderRow('transactions', row, true)).join('');
    const headers = columns.transactions.map(([, label]) => `<th scope="col">${escapeHTML(label)}</th>`).join('');
    return `<section class="portal-panel finance-data-panel">
      <div class="portal-panel-header"><div><h2>${escapeHTML(title)}</h2><p>${filteredRows.length} giao dịch trong kỳ đã chọn</p></div></div>
      <div class="portal-table-wrap"><table class="portal-table finance-transaction-table"><thead><tr>${headers}<th scope="col">THAO TÁC</th></tr></thead>
      <tbody>${body || `<tr><td class="portal-empty" colspan="${columns.transactions.length + 1}">Chưa có giao dịch phù hợp trong kỳ này.</td></tr>`}</tbody></table></div>
    </section>`;
  }

  function renderFinanceDebtPanel() {
    const tuitionRows = data.tuition.filter(item => item.status !== 'Đã thanh toán' && item.dueDate.startsWith(financeSelectedMonth));
    const today = financeMonthKey(new Date()) + `-${String(new Date().getDate()).padStart(2, '0')}`;
    const body = tuitionRows.map(item => {
      const isOverdue = item.dueDate < today;
      const student = data.students.find(record => record.name === item.student);
      return `<tr>
        <td><strong>${escapeHTML(item.student)}</strong><small class="finance-table-subtitle">${escapeHTML(student?.className || 'Chưa xếp lớp')}</small></td>
        <td>${escapeHTML(item.period)}</td>
        <td>${escapeHTML(formatValue('amount', item.amount))}</td>
        <td>${escapeHTML(formatDashboardDate(item.dueDate))}</td>
        <td><span class="portal-status${isOverdue ? ' finance-status-overdue' : ' warning'}">${isOverdue ? 'Quá hạn' : 'Chưa thanh toán'}</span></td>
        <td><button class="portal-action finance-receive-button" type="button" data-receive-tuition="${escapeHTML(item.id)}">Ghi nhận thu</button></td>
      </tr>`;
    }).join('');
    return `<section class="portal-panel finance-data-panel">
      <div class="portal-panel-header"><div><h2>Công nợ học phí</h2><p>${tuitionRows.length} khoản chưa thanh toán có hạn trong kỳ đã chọn</p></div></div>
      <div class="portal-table-wrap"><table class="portal-table finance-debt-table"><thead><tr><th>HỌC VIÊN</th><th>KỲ HỌC</th><th>SỐ TIỀN</th><th>HẠN THANH TOÁN</th><th>TRẠNG THÁI</th><th>THAO TÁC</th></tr></thead>
      <tbody>${body || '<tr><td class="portal-empty" colspan="6">Không có công nợ trong kỳ này.</td></tr>'}</tbody></table></div>
    </section>`;
  }

  function renderFinanceModule() {
    const monthTransactions = getFinanceMonthTransactions();
    const income = monthTransactions.filter(item => item.type === 'Thu').reduce((total, item) => total + Number(item.amount || 0), 0);
    const expense = monthTransactions.filter(item => item.type === 'Chi').reduce((total, item) => total + Number(item.amount || 0), 0);
    const receivables = data.tuition.filter(item => item.status !== 'Đã thanh toán').reduce((total, item) => total + Number(item.amount || 0), 0);
    const outstandingCount = data.tuition.filter(item => item.status !== 'Đã thanh toán').length;
    const monthDate = new Date(`${financeSelectedMonth}-01T00:00:00`);
    const monthLabel = new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(monthDate);
    const tabs = [
      ['cashflow', 'Báo cáo dòng tiền'],
      ['income', 'Quản lý Thu'],
      ['expense', 'Quản lý Chi'],
      ['debt', 'Công nợ']
    ];
    const actionButtons = `<button class="portal-button finance-income-button" type="button" data-finance-create="Thu">+ Tạo phiếu thu</button><button class="portal-button finance-expense-button" type="button" data-finance-create="Chi">+ Tạo phiếu chi</button>`;
    let content = '';
    if (activeFinanceTab === 'cashflow') {
      const series = getFinanceMonthSeries();
      content = `<section class="portal-panel finance-chart-panel">
        <div class="portal-panel-header"><div><h2>Cân đối Thu - Chi 6 tháng gần nhất</h2><p>Đơn vị: đồng · biểu đồ theo 6 tháng kết thúc tại kỳ đã chọn</p></div></div>
        <div class="finance-chart-wrap"><canvas id="finance-cashflow-chart" aria-label="Biểu đồ cân đối thu chi sáu tháng gần nhất"></canvas></div>
        <div id="finance-chart-data" data-chart="${escapeHTML(JSON.stringify(series))}" hidden></div>
      </section>${renderFinanceTransactionPanel(`Giao dịch tháng ${monthLabel}`, monthTransactions)}`;
    } else if (activeFinanceTab === 'income') {
      content = renderFinanceTransactionPanel(`Các khoản thu · ${monthLabel}`, monthTransactions.filter(item => item.type === 'Thu'));
    } else if (activeFinanceTab === 'expense') {
      content = renderFinanceTransactionPanel(`Các khoản chi · ${monthLabel}`, monthTransactions.filter(item => item.type === 'Chi'));
    } else {
      content = renderFinanceDebtPanel();
    }
    return `<div class="portal-page-heading finance-heading">
      <div><p class="dashboard-eyebrow">TÀI CHÍNH TRUNG TÂM</p><h1>Tài chính - Kế toán</h1><p>Báo cáo dòng tiền, quản lý thu chi và theo dõi công nợ học phí.</p></div>
      <div class="finance-toolbar"><label class="finance-month-picker">Kỳ báo cáo<input id="finance-month-picker" type="month" value="${escapeHTML(financeSelectedMonth)}" aria-label="Chọn tháng báo cáo"></label>${actionButtons}<button class="portal-button secondary" type="button" data-finance-export>Xuất báo cáo</button></div>
    </div>
    ${renderTabs(tabs, activeFinanceTab, 'data-finance-tab')}
    <section class="finance-summary-grid" aria-label="Tổng kết tài chính">
      <article class="portal-stat finance-summary-card income"><span>Tổng Thu · ${escapeHTML(monthLabel)}</span><strong>${escapeHTML(formatValue('amount', income))}</strong><small>Tổng phiếu thu trong kỳ</small></article>
      <article class="portal-stat finance-summary-card expense"><span>Tổng Chi · ${escapeHTML(monthLabel)}</span><strong>${escapeHTML(formatValue('amount', expense))}</strong><small>Tổng phiếu chi trong kỳ</small></article>
      <article class="portal-stat finance-summary-card profit${income < expense ? ' negative' : ''}"><span>Lợi nhuận gộp</span><strong>${escapeHTML(formatValue('amount', income - expense))}</strong><small>Thu trừ chi trong kỳ</small></article>
      <article class="portal-stat finance-summary-card receivable"><span>Công nợ cần thu</span><strong>${escapeHTML(formatValue('amount', receivables))}</strong><small>${outstandingCount} khoản chưa thanh toán</small></article>
    </section>
    ${content}`;
  }

  function receiveTuitionPayment(id) {
    const record = data.tuition.find(item => item.id === id);
    if (!record || record.status === 'Đã thanh toán' || !Number.isFinite(Number(record.amount)) || Number(record.amount) <= 0) {
      notice('Khoản công nợ không còn tồn tại, đã được thanh toán hoặc có số tiền không hợp lệ.');
      return;
    }
    const now = new Date();
    const paidDate = `${financeMonthKey(now)}-${String(now.getDate()).padStart(2, '0')}`;
    if (!persistMutation(() => {
      record.status = 'Đã thanh toán';
      record.paidDate = paidDate;
      data.transactions.unshift({
        id: `tx-${Date.now()}`,
        date: paidDate,
        type: 'Thu',
        category: `Thu học phí · ${record.student} · ${record.period}`,
        amount: Number(record.amount),
        person: roles.admin.displayName
      });
    }, 'Ghi nhận thu học phí', 'tuition', `${record.student} - ${record.period}`)) return;
    renderModule();
    notice(`Đã ghi nhận thu học phí của ${record.student}; khoản thu cũng đã được thêm vào sổ giao dịch.`);
  }

  function exportFinanceCSV() {
    if (activeRole !== 'admin') return;
    const monthTransactions = getFinanceMonthTransactions();
    const tuitionRows = data.tuition.filter(item => item.dueDate.startsWith(financeSelectedMonth));
    const rows = [
      ['Loại dữ liệu', 'Ngày', 'Hạng mục / Học viên', 'Kỳ học', 'Số tiền (VNĐ)', 'Trạng thái', 'Người phụ trách'],
      ...monthTransactions.map(item => [item.type, item.date, item.category, '', item.amount, '', item.person]),
      ...tuitionRows.map(item => ['Công nợ', item.dueDate, item.student, item.period, item.amount, item.status, ''])
    ];
    const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hoa-ma-toan-tai-chinh-${financeSelectedMonth}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function classifyStudentLevel(grade) {
    const gradeNumber = Number(String(grade).match(/\d+/)?.[0]);
    if (!Number.isFinite(gradeNumber)) return 'Chưa phân loại';
    if (gradeNumber >= 1 && gradeNumber <= 5) return 'Tiểu học';
    if (gradeNumber >= 6 && gradeNumber <= 9) return 'THCS';
    if (gradeNumber >= 10 && gradeNumber <= 12) return 'THPT';
    return 'Chưa phân loại';
  }

  function getReportStudentDistribution() {
    const distribution = [
      { label: 'Tiểu học', count: 0, color: '#f18445' },
      { label: 'THCS', count: 0, color: '#e35e3f' },
      { label: 'THPT', count: 0, color: '#2eb872' },
      { label: 'Chưa phân loại', count: 0, color: '#aab3be' }
    ];
    const buckets = new Map(distribution.map(item => [item.label, item]));
    data.students.filter(item => item.status === 'Đang học').forEach(student => {
      const bucket = buckets.get(classifyStudentLevel(student.grade));
      if (bucket) bucket.count += 1;
    });
    return distribution.filter(item => item.count > 0);
  }

  function getReportGrowthSeries() {
    const activeCount = data.students.filter(item => item.status === 'Đang học').length;
    const history = new Map(data.reportHistory.map(item => [item.month, Number(item.activeStudents) || 0]));
    const [year, month] = reportSelectedMonth.split('-').map(Number);
    const currentMonth = financeMonthKey(new Date());
    return Array.from({ length: 6 }, (_, index) => {
      const date = new Date(year, month - 1 - (5 - index), 1);
      const key = financeMonthKey(date);
      const recordedCount = history.get(key);
      const studentCount = key === currentMonth ? activeCount : recordedCount ?? 0;
      const revenue = data.transactions
        .filter(item => isTuitionRevenue(item) && item.date.startsWith(key))
        .reduce((total, item) => total + Number(item.amount || 0), 0);
      return {
        key,
        label: new Intl.DateTimeFormat('vi-VN', { month: 'short' }).format(date),
        students: studentCount,
        revenue
      };
    });
  }

  function isTuitionRevenue(transaction) {
    return transaction.type === 'Thu' && /học phí/i.test(transaction.category || '');
  }

  function getReportClassRows() {
    const activeStudents = data.students.filter(item => item.status === 'Đang học');
    return data.classes.map(classRecord => {
      const students = activeStudents.filter(student => student.className === classRecord.name);
      const studentNames = new Set(students.map(student => student.name));
      const attendanceRecords = data.attendance.filter(record =>
        record.className === classRecord.name && record.date.startsWith(reportSelectedMonth)
      );
      const attendedCount = attendanceRecords.filter(record => ['Có mặt', 'Đi muộn'].includes(record.status)).length;
      const attendanceRate = attendanceRecords.length ? attendedCount / attendanceRecords.length * 100 : null;
      const classGrades = data.grades.filter(record =>
        record.date.startsWith(reportSelectedMonth) &&
        (studentNames.has(record.student) || (!students.length && record.course === classRecord.course))
      );
      const validScores = classGrades
        .filter(record => record.score !== '' && record.score !== null && record.score !== undefined)
        .map(record => Number(record.score))
        .filter(score => Number.isFinite(score) && score >= 0 && score <= 10);
      const averageScore = validScores.length
        ? validScores.reduce((total, score) => total + score, 0) / validScores.length
        : null;
      return {
        className: classRecord.name,
        course: classRecord.course,
        teacher: classRecord.teacher,
        status: classRecord.status,
        studentCount: students.length,
        attendanceRate,
        averageScore,
        attendedCount,
        attendanceRecords: attendanceRecords.length,
        gradeRecords: validScores.length
      };
    });
  }

  function renderReportQualityTable(rows) {
    const filteredRows = applySearch(rows);
    const body = filteredRows.map(row => {
      const attendanceDisplay = row.attendanceRate === null ? 'Chưa có dữ liệu' : `${row.attendanceRate.toLocaleString('vi-VN', { maximumFractionDigits: 1 })}%`;
      const attendanceWarning = row.attendanceRate !== null && row.attendanceRate < 70;
      const scoreDisplay = row.averageScore === null ? 'Chưa có dữ liệu' : row.averageScore.toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });
      return `<tr>
        <td><strong>${escapeHTML(row.course)}</strong><small class="report-table-subtitle">${escapeHTML(row.status)}</small></td>
        <td>${escapeHTML(row.className)}</td>
        <td>${escapeHTML(row.teacher)}</td>
        <td>${row.studentCount}</td>
        <td><span class="report-metric${attendanceWarning ? ' is-warning' : ''}">${escapeHTML(attendanceDisplay)}</span>${row.attendanceRecords ? `<small class="report-table-subtitle">${row.attendanceRecords} lượt ghi nhận</small>` : ''}</td>
        <td><span class="report-metric${row.averageScore !== null && row.averageScore < 5 ? ' is-warning' : ''}">${escapeHTML(scoreDisplay)}</span>${row.gradeRecords ? `<small class="report-table-subtitle">${row.gradeRecords} bài đánh giá</small>` : ''}</td>
      </tr>`;
    }).join('');
    return `<section class="portal-panel report-quality-panel">
      <div class="portal-panel-header"><div><h2>Đánh giá chất lượng Lớp học & Giáo viên</h2><p>Chuyên cần dưới 70% được đánh dấu cần theo dõi; số liệu tính trong tháng đang chọn.</p></div></div>
      <div class="portal-table-wrap"><table class="portal-table report-quality-table">
        <thead><tr><th>KHÓA HỌC</th><th>LỚP HỌC</th><th>GIÁO VIÊN PHỤ TRÁCH</th><th>SĨ SỐ</th><th>CHUYÊN CẦN</th><th>ĐIỂM THI TB</th></tr></thead>
        <tbody>${body || '<tr><td class="portal-empty" colspan="6">Không có lớp học phù hợp với từ khóa.</td></tr>'}</tbody>
      </table></div>
    </section>`;
  }

  function renderReportsModule() {
    const activeStudents = data.students.filter(item => item.status === 'Đang học').length;
    const activeClasses = data.classes.filter(item => item.status === 'Đang học').length;
    const classRows = getReportClassRows();
    const attendanceRecords = classRows.reduce((total, row) => total + row.attendanceRecords, 0);
    const presentRecords = classRows.reduce((total, row) => total + row.attendedCount, 0);
    const averageAttendance = attendanceRecords ? presentRecords / attendanceRecords * 100 : null;
    const scoreRows = classRows.filter(row => row.averageScore !== null);
    const scoreCount = scoreRows.reduce((total, row) => total + row.gradeRecords, 0);
    const averageScore = scoreCount
      ? scoreRows.reduce((total, row) => total + row.averageScore * row.gradeRecords, 0) / scoreCount
      : null;
    const selectedDate = new Date(`${reportSelectedMonth}-01T00:00:00`);
    const selectedLabel = new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(selectedDate);
    const periodRevenue = data.transactions
      .filter(item => isTuitionRevenue(item) && item.date.startsWith(reportSelectedMonth))
      .reduce((total, item) => total + Number(item.amount || 0), 0);
    const distribution = getReportStudentDistribution();
    const growth = getReportGrowthSeries();
    const distributionData = { distribution, total: activeStudents };
    const growthData = growth;
    const attendanceText = averageAttendance === null ? '—' : `${averageAttendance.toLocaleString('vi-VN', { maximumFractionDigits: 1 })}%`;
    const scoreText = averageScore === null ? '—' : averageScore.toLocaleString('vi-VN', { minimumFractionDigits: 1, maximumFractionDigits: 1 });

    return `<div class="portal-page-heading report-heading">
      <div><p class="dashboard-eyebrow">PHÂN TÍCH VẬN HÀNH</p><h1>Báo cáo thống kê</h1><p>Phân tích quy mô học viên, doanh thu và chất lượng đào tạo theo kỳ.</p></div>
      <div class="report-toolbar">
        <label class="report-period-picker">Kỳ thống kê<input id="report-month-picker" type="month" value="${escapeHTML(reportSelectedMonth)}" aria-label="Chọn kỳ thống kê"></label>
        <button class="portal-button" type="button" data-report-export>Xuất báo cáo</button>
        <button class="portal-button secondary" type="button" data-report-print>In báo cáo</button>
      </div>
    </div>
    <section class="report-kpi-grid" aria-label="Chỉ số thống kê">
      <article class="portal-stat report-kpi"><span>Học viên đang theo học</span><strong>${activeStudents}</strong><small>Học viên có trạng thái đang học</small></article>
      <article class="portal-stat report-kpi"><span>Lớp đang hoạt động</span><strong>${activeClasses}</strong><small>Tổng lớp có trạng thái đang học</small></article>
      <article class="portal-stat report-kpi"><span>Chuyên cần · ${escapeHTML(selectedLabel)}</span><strong>${escapeHTML(attendanceText)}</strong><small>${attendanceRecords} lượt điểm danh trong kỳ</small></article>
      <article class="portal-stat report-kpi"><span>Doanh thu học phí</span><strong>${escapeHTML(formatValue('amount', periodRevenue))}</strong><small>Phiếu thu trong ${escapeHTML(selectedLabel)}</small></article>
    </section>
    <section class="report-chart-grid" aria-label="Biểu đồ thống kê">
      <article class="portal-panel report-chart-panel report-growth-panel">
        <div class="portal-panel-header"><div><h2>Tương quan Tăng trưởng Học viên & Doanh thu Học phí</h2><p>Sáu tháng gần nhất, kết thúc tại ${escapeHTML(selectedLabel)}</p></div></div>
        <div class="report-growth-chart-wrap"><canvas id="report-growth-chart" aria-label="Biểu đồ tăng trưởng học viên và doanh thu học phí"></canvas></div>
      </article>
      <article class="portal-panel report-chart-panel report-distribution-panel">
        <div class="portal-panel-header"><div><h2>Phân bố Học viên theo Cấp học</h2><p>${activeStudents.toLocaleString('vi-VN')} học viên đang theo học</p></div></div>
        <div class="report-distribution-content">
          <div class="report-donut-wrap"><canvas id="report-student-donut" aria-label="Biểu đồ phân bố học viên theo cấp học"></canvas></div>
          <ul class="report-distribution-legend">${distribution.map(item => `<li><span class="report-legend-swatch" style="--legend-color:${item.color}"></span><span>${escapeHTML(item.label)}</span><strong>${item.count}</strong></li>`).join('') || '<li class="report-legend-empty">Chưa có học viên đang theo học.</li>'}</ul>
        </div>
      </article>
      <div id="report-chart-data" data-distribution="${escapeHTML(JSON.stringify(distributionData))}" data-growth="${escapeHTML(JSON.stringify(growthData))}" hidden></div>
    </section>
    <section class="report-quality-summary">
      <div><h2>Chất lượng giảng dạy</h2><p>Điểm trung bình từ các bài đánh giá trong tháng đang chọn.</p></div>
      <span class="report-summary-score">${escapeHTML(scoreText)}<small>điểm trung bình</small></span>
    </section>
    ${renderReportQualityTable(classRows)}`;
  }

  function exportReportsCSV() {
    if (activeRole !== 'admin') return;
    const selectedDate = new Date(`${reportSelectedMonth}-01T00:00:00`);
    const reportLabel = new Intl.DateTimeFormat('vi-VN', { month: 'long', year: 'numeric' }).format(selectedDate);
    const rows = [
      ['Báo cáo thống kê', reportLabel],
      [],
      ['Khóa học', 'Lớp học', 'Giáo viên phụ trách', 'Sĩ số', 'Chuyên cần (%)', 'Điểm thi trung bình', 'Số lượt điểm danh', 'Số bài đánh giá'],
      ...getReportClassRows().map(row => [
        row.course,
        row.className,
        row.teacher,
        row.studentCount,
        row.attendanceRate === null ? 'Chưa có dữ liệu' : row.attendanceRate.toFixed(1),
        row.averageScore === null ? 'Chưa có dữ liệu' : row.averageScore.toFixed(2),
        row.attendanceRecords,
        row.gradeRecords
      ]),
      [],
      ['Phân bố học viên', 'Số lượng'],
      ...getReportStudentDistribution().map(item => [item.label, item.count]),
      [],
      ['Tháng', 'Học viên đang theo học', 'Doanh thu học phí (VNĐ)'],
      ...getReportGrowthSeries().map(item => [item.key, item.students, item.revenue])
    ];
    const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hoa-ma-toan-bao-cao-thong-ke-${reportSelectedMonth}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function renderSupportModule() {
    const tabs = [['tickets', 'Quản lý phản hồi'], ['automations', 'Kịch bản tự động (ZNS/SMS)'], ['renewals', 'Gia hạn khóa học']];
    const module = activeSupportTab === 'automations' ? 'automations' : activeSupportTab === 'renewals' ? 'renewals' : 'support';
    const title = activeSupportTab === 'automations' ? 'Kịch bản tự động' : activeSupportTab === 'renewals' ? 'Gia hạn khóa học' : 'Yêu cầu hỗ trợ & phản hồi';
    return `<div class="portal-page-heading"><div><h1>Chăm sóc khách hàng</h1><p>Quản lý phản hồi, tin nhắn tự động và quy trình gia hạn.</p></div></div>${renderTabs(tabs, activeSupportTab, 'data-support-tab')}<div class="portal-stats"><article class="portal-stat"><span>Yêu cầu đang mở</span><strong>${data.support.filter(item => item.status !== 'Đã giải quyết').length}</strong></article><article class="portal-stat"><span>Kịch bản tự động</span><strong>${data.automations.filter(item => item.status === 'Đang bật').length}</strong></article><article class="portal-stat"><span>Cần liên hệ gia hạn</span><strong>${data.renewals.filter(item => item.status === 'Cần liên hệ').length}</strong></article></div>${renderPanel(module, title, data[module], true)}`;
  }

  function renderParentSupport() {
    const rows = moduleRows('support');
    const table = renderPanel('support', 'Yêu cầu đã gửi', rows, false);
    return `<div class="portal-page-heading"><div><p class="parent-eyebrow">CHÚNG TÔI LUÔN SẴN SÀNG HỖ TRỢ</p><h1>Liên hệ trung tâm</h1><p>Gửi câu hỏi đến trung tâm và theo dõi phản hồi.</p></div><button class="portal-button" type="button" data-create-support>+ Gửi yêu cầu</button></div>${table}`;
  }

  function openSupportRequest() {
    if (activeRole !== 'parent') return;
    const backdrop = document.createElement('div');
    backdrop.className = 'portal-modal-backdrop';
    backdrop.id = 'portal-modal-backdrop';
    backdrop.innerHTML = `<section class="portal-modal" role="dialog" aria-modal="true" aria-labelledby="portal-modal-title"><button class="portal-modal-close" type="button" aria-label="Đóng" data-close-modal>×</button><h2 id="portal-modal-title">Gửi yêu cầu hỗ trợ</h2><form class="portal-form" id="portal-support-form"><label>Nội dung cần hỗ trợ<textarea name="subject" required minlength="5" maxlength="500" placeholder="Mô tả câu hỏi hoặc vấn đề của bạn"></textarea></label><div class="portal-form-footer"><button class="portal-button secondary" type="button" data-close-modal>Hủy</button><button class="portal-button" type="submit">Gửi yêu cầu</button></div></form></section>`;
    document.body.append(backdrop);
    backdrop.querySelector('textarea').focus();
  }

  function saveSupportRequest(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    const subject = new FormData(form).get('subject').toString().trim();
    if (!persistMutation(() => {
      data.support.unshift({
        id: `support-${Date.now()}`,
        name: roles.parent.displayName,
        subject,
        date: new Date().toISOString().slice(0, 10),
        assigned: 'CSKH',
        status: 'Mới tiếp nhận'
      });
    }, 'Gửi yêu cầu', 'support', subject)) return;
    closeEditor();
    renderModule();
    notice('Đã gửi yêu cầu hỗ trợ.');
  }

  function renderSettingsModule() {
    const tabs = [['rbac', 'Phân quyền (RBAC)'], ['categories', 'Cấu hình danh mục'], ['activity', 'Nhật ký hoạt động']];
    let content = '';
    if (activeSettingsTab === 'categories') {
      content = renderPanel('categories', 'Danh mục dùng trong hệ thống', data.categories, true);
    } else if (activeSettingsTab === 'activity') {
      content = renderPanel('activityLog', 'Nhật ký hệ thống gần đây', data.activityLog, false);
    } else {
      const permissions = [
        ['Quản lý Lead & Tuyển sinh', 'Quản trị', 'Không có quyền', 'Không có quyền'],
        ['Hồ sơ học viên', 'Quản trị', 'Xem lớp được phân công', 'Xem học sinh liên kết'],
        ['Lịch học & lớp học', 'Quản trị', 'Xem lớp được phân công', 'Xem lịch của học sinh'],
        ['Điểm số & điểm danh', 'Quản trị', 'Cập nhật lớp được phân công', 'Chỉ xem học sinh liên kết'],
        ['Bài tập & học liệu', 'Quản trị', 'Quản lý lớp được phân công', 'Chỉ xem lớp liên kết'],
        ['Học phí & thanh toán', 'Quản trị', 'Không có quyền', 'Thanh toán / xem lịch sử'],
        ['Tài chính & báo cáo', 'Quản trị', 'Không có quyền', 'Không có quyền'],
        ['CSKH & phản hồi', 'Quản trị', 'Không có quyền', 'Gửi / xem yêu cầu của mình'],
        ['Nhân sự & KPI', 'Quản trị', 'Không có quyền', 'Không có quyền'],
        ['Cấu hình hệ thống', 'Quản trị', 'Không có quyền', 'Không có quyền']
      ];
      content = `<section class="portal-panel"><div class="portal-panel-header"><h2>Ma trận vai trò & quyền hạn</h2></div><div class="portal-table-wrap"><table class="portal-table"><thead><tr><th>MODULE</th><th>QUẢN TRỊ VIÊN</th><th>GIÁO VIÊN</th><th>PHỤ HUYNH</th></tr></thead><tbody>${permissions.map(row => `<tr>${row.map((cell, index) => `<td>${index === 0 ? `<strong>${escapeHTML(cell)}</strong>` : escapeHTML(cell)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></section>`;
    }
    return `<div class="portal-page-heading"><div><h1>Cài đặt & nhật ký hệ thống</h1><p>Quản lý danh mục và xem ma trận quyền cố định của bản demo. Thay đổi quyền cần được cấu hình và kiểm tra ở máy chủ khi triển khai thật.</p></div></div>${renderTabs(tabs, activeSettingsTab, 'data-settings-tab')}${content}<section class="portal-panel"><div class="portal-panel-header"><h2>Dữ liệu demo</h2></div><div class="portal-record-grid"><article class="portal-record-card"><h3>Lưu trữ trên trình duyệt</h3><p>Dữ liệu được giữ trong localStorage của thiết bị hiện tại.</p></article><article class="portal-record-card"><h3>Khôi phục dữ liệu mẫu</h3><p>Đưa danh sách về trạng thái ban đầu. Thao tác không thể hoàn tác.</p><button class="portal-button danger" type="button" data-reset>Khôi phục dữ liệu mẫu</button></article></div></section>`;
  }

  function renderBranchReport() {
    const branchStudentIds = new Set(data.studentProfiles
      .filter(profile => String(profile.branch || '').startsWith('Cơ sở 1'))
      .map(profile => profile.studentId));
    const branchStudents = data.students.filter(student => branchStudentIds.has(student.id));
    const branchStudentNames = new Set(branchStudents.map(student => student.name));
    const branchAttendance = data.attendance.filter(record => branchStudentNames.has(record.student));
    const presentCount = branchAttendance.filter(record => ['Có mặt', 'Đi muộn'].includes(record.status)).length;
    const attendanceRate = branchAttendance.length ? Math.round(presentCount / branchAttendance.length * 100) : 0;
    const branchTuition = data.tuition.filter(record => branchStudentIds.has(record.studentId));
    const outstanding = branchTuition.filter(record => record.status !== 'Đã thanh toán');
    const outstandingAmount = outstanding.reduce((sum, record) => sum + Number(record.amount || 0), 0);
    const branchClassNames = new Set(branchStudents.map(student => student.className).filter(Boolean));
    const branchClasses = data.classes.filter(item => branchClassNames.has(item.name));
    return `<div class="portal-page-heading"><div><p class="dashboard-eyebrow">BÁO CÁO · CƠ SỞ 1</p><h1>Báo cáo cơ sở</h1><p>Tổng hợp học viên, lớp học, chuyên cần và công nợ tại Cơ sở 1.</p></div></div>
      <section class="portal-stats">
        <article class="portal-stat"><span>Học viên</span><strong>${branchStudents.length}</strong></article>
        <article class="portal-stat"><span>Lớp học</span><strong>${branchClasses.length}</strong></article>
        <article class="portal-stat"><span>Chuyên cần</span><strong>${attendanceRate}%</strong></article>
        <article class="portal-stat"><span>Công nợ cần thu</span><strong>${escapeHTML(formatValue('amount', outstandingAmount))}</strong></article>
      </section>
      ${renderPanel('students', 'Học viên cơ sở', branchStudents, false)}
      ${renderPanel('classes', 'Lớp học tại cơ sở', branchClasses, false)}
      ${renderPanel('tuition', 'Khoản học phí cần theo dõi', outstanding, false)}`;
  }

  function renderModule() {
    const menuItem = allowedModules().find(([id]) => id === activeModule);
    const isParentChildDetail = activeRole === 'parent' && activeModule === 'students';
    if (!menuItem && !isParentChildDetail) {
      activeModule = 'dashboard';
      renderModule();
      return;
    }
    buildNavigation();
    $('#portal-breadcrumb').textContent = `Hoa Ma Toán  /  ${menuItem?.[2] || 'Thông tin học viên'}`;
    let html = '';
    if (activeModule === 'dashboard') {
      html = renderDashboard();
    } else if (activeModule === 'crm') {
      html = renderCRMModule();
    } else if (activeModule === 'support' && activeRole === 'admin') {
      html = renderSupportModule();
    } else if (activeModule === 'support' && activeRole === 'parent') {
      html = renderParentSupport();
    } else if (activeModule === 'staff' && activeRole === 'branchManager') {
      html = renderBranchTeachersModule();
    } else if (activeModule === 'staff') {
      html = renderStaffModule();
    } else if (activeModule === 'reports') {
      html = renderReportsModule();
    } else if (activeModule === 'branchReports' && activeRole === 'branchManager') {
      html = renderBranchReport();
    } else if (activeModule === 'students' && activeRole === 'parent') {
      html = renderParentChildDetail();
    } else if (activeModule === 'students') {
      html = renderStudentModule();
    } else if (activeModule === 'grades' && activeRole === 'parent') {
      html = renderParentGrades();
    } else if (activeModule === 'tuition' && activeRole === 'parent') {
      html = renderParentTuition();
    } else if (activeModule === 'academics') {
      html = `<div class="portal-page-heading"><div><h1>Học vụ & đào tạo</h1><p>Điều phối lớp học, chương trình và tiến độ đào tạo.</p></div></div>${renderPanel('classes', 'Lớp học đang vận hành', data.classes, true)}${renderPanel('schedule', 'Lịch học', data.schedule, true)}${renderPanel('courses', 'Chương trình đào tạo', data.courses, true)}`;
    } else if (activeModule === 'finance') {
      html = renderFinanceModule();
    } else if (activeModule === 'attendanceSummary') {
      const attendanceRows = moduleRows('attendance');
      const present = attendanceRows.filter(item => item.status === 'Có mặt').length;
      const absent = attendanceRows.filter(item => item.status.startsWith('Vắng')).length;
      html = `<div class="portal-page-heading"><div><h1>Tổng quan điểm danh</h1><p>Thống kê chuyên cần các lớp đang phụ trách.</p></div></div><div class="portal-stats"><article class="portal-stat"><span>Lượt có mặt</span><strong>${present}</strong></article><article class="portal-stat"><span>Lượt vắng</span><strong>${absent}</strong></article><article class="portal-stat"><span>Tổng lượt ghi nhận</span><strong>${attendanceRows.length}</strong></article></div>${renderPanel('attendance', 'Các lượt điểm danh gần đây', attendanceRows.slice(0, 5), false)}`;
    } else if (activeModule === 'attendanceHistory') {
      html = `<div class="portal-page-heading"><div><h1>Lịch sử điểm danh</h1><p>Tra cứu các buổi học đã ghi nhận.</p></div></div>${renderPanel('attendance', 'Lịch sử chuyên cần', moduleRows('attendance'), false)}`;
    } else if (activeModule === 'paymentHistory') {
      html = `<div class="portal-page-heading"><div><p class="parent-eyebrow">THANH TOÁN</p><h1>Lịch sử đóng phí</h1><p>Theo dõi học phí của các con trong gia đình.</p></div></div>${renderPanel('paymentHistory', 'Giao dịch học phí của gia đình', moduleRows('paymentHistory'), false)}`;
    } else if (activeModule === 'settings') {
      html = renderSettingsModule();
    } else if (activeModule === 'makeups') {
      html = `<div class="portal-page-heading"><div><h1>${escapeHTML(getModuleTitle(activeModule))}</h1><p>Quản lý các buổi học bù của lớp đang phụ trách.</p></div></div>${renderPanel(activeModule, getModuleTitle(activeModule), moduleRows(activeModule), true)}`;
    } else {
      const rows = moduleRows(activeModule);
      const descriptions = {
        students: activeRole === 'parent' ? 'Thông tin học tập và liên hệ của học sinh trong gia đình.' : 'Quản lý hồ sơ, lớp học và tình trạng học viên.',
        courses: 'Theo dõi chương trình, cấp độ và học phí khóa học.',
        classes: 'Danh sách lớp học và giáo viên phụ trách.',
        staff: 'Quản lý thông tin nhân sự và tình trạng làm việc.',
        schedule: 'Theo dõi lịch học, lịch dạy và phòng học.',
        attendance: 'Ghi nhận chuyên cần, điểm số và nhận xét theo buổi học.',
        attendanceHistory: 'Tra cứu các buổi học và trạng thái chuyên cần đã ghi nhận.',
        attendanceSummary: 'Theo dõi chuyên cần của các lớp đang phụ trách.',
        grades: 'Theo dõi kết quả học tập và nhận xét của giáo viên.',
        tuition: 'Theo dõi các khoản phải thu và lịch sử thanh toán.',
        paymentHistory: 'Tra cứu các khoản học phí đã thanh toán.',
        resources: 'Bài tập, tài liệu học tập và hạn hoàn thành theo lớp.',
        news: 'Thông báo và tin tức mới nhất của trung tâm.',
        crm: 'Quản lý khách hàng tiềm năng, nguồn liên hệ và hoạt động tư vấn.',
        support: 'Tiếp nhận và theo dõi yêu cầu chăm sóc khách hàng.'
      };
      html = `<div class="portal-page-heading"><div><h1>${escapeHTML(getModuleTitle(activeModule))}</h1><p>${escapeHTML(descriptions[activeModule] || '')}</p></div></div>${renderPanel(activeModule, getModuleTitle(activeModule), rows, true)}`;
    }
    dashboardCharts.forEach(chart => chart.destroy());
    dashboardCharts = [];
    const viewId = {
      admin: 'admin-view',
      branchManager: 'manager-view',
      parent: 'parent-view',
      teacher: 'teacher-view'
    }[activeRole];
    if (viewId) html = `<div id="${viewId}" class="role-view">${html}</div>`;
    $('#portal-content').innerHTML = html;
    if (activeModule === 'dashboard' && activeRole === 'admin') renderDashboardCharts();
    if (activeModule === 'finance' && activeRole === 'admin' && activeFinanceTab === 'cashflow') renderFinanceChart();
    if (activeModule === 'reports' && activeRole === 'admin') renderReportsCharts();
    if (activeModule === 'grades' && activeRole === 'parent' && $('#learning-results-chart-data')) renderLearningResultsCharts();
  }

  function renderLearningResultsCharts() {
    if (!window.Chart) {
      notice('Không tải được thư viện biểu đồ. Kiểm tra kết nối mạng rồi tải lại trang.');
      return;
    }
    const chartData = JSON.parse($('#learning-results-chart-data').dataset.charts);
    chartData.forEach(subject => {
      const attendanceCanvas = $(`#learning-attendance-${subject.id}`);
      if (attendanceCanvas && subject.attendanceCount > 0) {
        dashboardCharts.push(new Chart(attendanceCanvas, {
          type: 'doughnut',
          data: {
            labels: ['Có mặt / đi muộn', 'Vắng'],
            datasets: [{
              data: [subject.attended, subject.missed],
              backgroundColor: ['#30a565', '#e66b63'],
              borderWidth: 0,
              hoverOffset: 5
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            cutout: '74%',
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label(context) {
                    const count = Number(context.raw || 0);
                    const percent = subject.attendanceCount
                      ? Math.round(count / subject.attendanceCount * 100)
                      : 0;
                    return ` ${context.label}: ${count} buổi (${percent}%)`;
                  }
                }
              }
            }
          }
        }));
      }

      const scoreCanvas = $(`#learning-scores-${subject.id}`);
      if (scoreCanvas && subject.monthScores.scores.some(score => score !== null)) {
        dashboardCharts.push(new Chart(scoreCanvas, {
          type: 'bar',
          data: {
            labels: subject.monthScores.labels,
            datasets: [{
              label: 'Điểm BTVN trung bình',
              data: subject.monthScores.scores,
              backgroundColor: '#f2a16e',
              hoverBackgroundColor: '#e87535',
              borderRadius: 5,
              maxBarThickness: 24
            }]
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: { display: false },
              tooltip: {
                callbacks: {
                  label: context => context.raw === null ? ' Chưa có dữ liệu' : ` Điểm trung bình: ${context.raw}/10`
                }
              }
            },
            scales: {
              x: { grid: { display: false }, ticks: { color: '#8793a2', font: { size: 9 } } },
              y: {
                min: 0,
                max: 10,
                ticks: { stepSize: 5, color: '#9aa4b0', font: { size: 9 } },
                grid: { color: '#edf0f3' },
                border: { display: false }
              }
            }
          }
        }));
      }
    });
  }

  function renderReportsCharts() {
    if (!window.Chart) {
      notice('Không tải được thư viện biểu đồ. Kiểm tra kết nối mạng rồi tải lại trang.');
      return;
    }
    const reportData = $('#report-chart-data');
    const distributionData = JSON.parse(reportData.dataset.distribution);
    const growthData = JSON.parse(reportData.dataset.growth);
    const donutColors = distributionData.distribution.map(item => item.color);
    dashboardCharts.push(new Chart($('#report-student-donut'), {
      type: 'doughnut',
      data: {
        labels: distributionData.distribution.map(item => item.label),
        datasets: [{
          data: distributionData.distribution.map(item => item.count),
          backgroundColor: donutColors,
          borderColor: '#ffffff',
          borderWidth: 4,
          hoverOffset: 8
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '72%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: context => {
                const total = distributionData.total;
                const count = Number(context.parsed);
                const percent = total ? (count / total * 100).toLocaleString('vi-VN', { maximumFractionDigits: 1 }) : '0';
                return `${context.label}: ${count} học viên (${percent}%)`;
              }
            }
          }
        }
      },
      plugins: [{
        id: 'report-donut-center',
        afterDraw(chart) {
          const { ctx, chartArea } = chart;
          if (!chartArea) return;
          const centerX = (chartArea.left + chartArea.right) / 2;
          const centerY = (chartArea.top + chartArea.bottom) / 2;
          ctx.save();
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#29384a';
          ctx.font = '700 25px "Be Vietnam Pro", "Segoe UI", sans-serif';
          ctx.fillText(String(distributionData.total), centerX, centerY - 7);
          ctx.fillStyle = '#8993a1';
          ctx.font = '11px "Be Vietnam Pro", "Segoe UI", sans-serif';
          ctx.fillText('học viên', centerX, centerY + 14);
          ctx.restore();
        }
      }]
    }));
    dashboardCharts.push(new Chart($('#report-growth-chart'), {
      type: 'bar',
      data: {
        labels: growthData.map(item => item.label),
        datasets: [
          {
            type: 'bar',
            label: 'Học viên',
            data: growthData.map(item => item.students),
            backgroundColor: '#f3a629',
            borderRadius: 5,
            maxBarThickness: 28,
            yAxisID: 'yStudents'
          },
          {
            type: 'line',
            label: 'Doanh thu học phí',
            data: growthData.map(item => item.revenue),
            borderColor: '#e66743',
            backgroundColor: '#e6674320',
            pointBackgroundColor: '#e66743',
            pointBorderColor: '#fff',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            tension: .35,
            fill: true,
            yAxisID: 'yRevenue'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', align: 'end', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, padding: 16 } },
          tooltip: {
            callbacks: {
              label: context => context.dataset.yAxisID === 'yRevenue'
                ? `${context.dataset.label}: ${Number(context.parsed.y).toLocaleString('vi-VN')} đ`
                : `${context.dataset.label}: ${Number(context.parsed.y).toLocaleString('vi-VN')} học viên`
            }
          }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { color: '#8993a1' } },
          yStudents: {
            type: 'linear',
            position: 'left',
            beginAtZero: true,
            ticks: { precision: 0, color: '#8993a1' },
            grid: { color: '#f0f1f3' },
            border: { display: false },
            title: { display: true, text: 'Học viên', color: '#8993a1' }
          },
          yRevenue: {
            type: 'linear',
            position: 'right',
            beginAtZero: true,
            ticks: { color: '#8993a1', callback: value => `${(Number(value) / 1000000).toLocaleString('vi-VN')} tr` },
            grid: { drawOnChartArea: false },
            border: { display: false },
            title: { display: true, text: 'Doanh thu (VNĐ)', color: '#8993a1' }
          }
        }
      }
    }));
  }

  function renderFinanceChart() {
    if (!window.Chart) {
      notice('Không tải được thư viện biểu đồ. Kiểm tra kết nối mạng rồi tải lại trang.');
      return;
    }
    const series = JSON.parse($('#finance-chart-data').dataset.chart);
    const chart = new Chart($('#finance-cashflow-chart'), {
      type: 'bar',
      data: {
        labels: series.map(item => item.label),
        datasets: [
          { label: 'Thu', data: series.map(item => item.income), backgroundColor: '#29b765', borderRadius: 6, maxBarThickness: 38 },
          { label: 'Chi', data: series.map(item => item.expense), backgroundColor: '#d9534f', borderRadius: 6, maxBarThickness: 38 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', align: 'start', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, padding: 18 } },
          tooltip: { callbacks: { label: context => `${context.dataset.label}: ${Number(context.parsed.y).toLocaleString('vi-VN')} đ` } }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { color: '#8993a1' } },
          y: { beginAtZero: true, border: { display: false }, grid: { color: '#f0f1f3' }, ticks: { color: '#8993a1', callback: value => `${Number(value).toLocaleString('vi-VN')} đ` } }
        }
      }
    });
    dashboardCharts.push(chart);
  }

  function renderDashboardCharts() {
    if (!window.Chart) {
      notice('Không tải được thư viện biểu đồ. Kiểm tra kết nối mạng rồi tải lại trang.');
      return;
    }
    const chartData = JSON.parse($('#dashboard-chart-data').dataset.chart);
    const currencyLabel = value => `${Number(value).toLocaleString('vi-VN')} đ`;
    const revenueCanvas = $('#dashboard-revenue-chart');
    const enrollmentCanvas = $('#dashboard-enrollment-chart');
    dashboardCharts.push(new Chart(revenueCanvas, {
      type: 'bar',
      data: {
        labels: chartData.weeklyRevenue.map(item => item.label),
        datasets: [
          { label: 'Doanh thu', data: chartData.weeklyRevenue.map(item => item.revenue), backgroundColor: '#f7a366', borderRadius: 6, maxBarThickness: 34 },
          { label: 'Thu học phí', data: chartData.weeklyRevenue.map(item => item.tuition), backgroundColor: '#ed712b', borderRadius: 6, maxBarThickness: 34 }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { position: 'top', align: 'end', labels: { usePointStyle: true, pointStyle: 'circle', boxWidth: 8, padding: 16 } },
          tooltip: { callbacks: { label: context => `${context.dataset.label}: ${currencyLabel(context.parsed.y)}` } }
        },
        scales: {
          x: { grid: { display: false }, border: { display: false }, ticks: { color: '#8993a1' } },
          y: { beginAtZero: true, border: { display: false }, grid: { color: '#f0f1f3' }, ticks: { color: '#8993a1', callback: value => `${Number(value).toLocaleString('vi-VN')} đ` } }
        }
      }
    }));
    dashboardCharts.push(new Chart(enrollmentCanvas, {
      type: 'bar',
      data: {
        labels: chartData.classEnrollment.map(item => item.name),
        datasets: [{ label: 'Học viên', data: chartData.classEnrollment.map(item => item.count), backgroundColor: '#f18445', borderRadius: 6, barThickness: 17 }]
      },
      options: {
        indexAxis: 'y',
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { callbacks: { label: context => `${context.parsed.x} học viên` } }
        },
        scales: {
          x: { beginAtZero: true, ticks: { precision: 0, color: '#8993a1' }, grid: { color: '#f0f1f3' }, border: { display: false } },
          y: { grid: { display: false }, border: { display: false }, ticks: { color: '#586678' } }
        }
      }
    }));
  }

  function createField(field, record, module) {
    const [key, label, type, configuredOptions] = field;
    const value = record?.[key] ?? '';
    const required = key !== 'note' && key !== 'feedback' ? ' required' : '';
    let options = configuredOptions;
    if (key === 'className' && ['admin', 'teacher', 'branchManager'].includes(activeRole)) {
      const classes = activeRole === 'teacher'
        ? data.classes.filter(item => item.teacher === roles.teacher.displayName)
        : activeRole === 'branchManager'
          ? data.classes.filter(item => data.staff.some(staff =>
            staff.name === item.teacher && staff.branch === roles.branchManager.branchArea
          ))
          : data.classes;
      options = classes.map(item => item.name);
    } else if (key === 'name' && ['staffAttendance', 'payroll', 'shifts'].includes(module)) {
      options = data.staff.map(item => item.name);
    } else if (key === 'student' && ['admin', 'teacher', 'branchManager'].includes(activeRole)) {
      const students = activeRole === 'teacher'
        ? data.students.filter(student => data.classes.some(item => item.teacher === roles.teacher.displayName && item.name === student.className))
        : activeRole === 'branchManager'
          ? data.students.filter(student => data.studentProfiles.some(profile =>
            profile.studentId === student.id && String(profile.branch || '').startsWith('Cơ sở 1')
          ) || student.branch === roles.branchManager.branch)
          : data.students;
      options = students.map(item => item.name);
    } else if (key === 'course' && ['admin', 'teacher'].includes(activeRole)) {
      options = data.courses.map(item => item.title);
    } else if (key === 'teacher' && ['admin', 'branchManager'].includes(activeRole)) {
      options = data.staff
        .filter(item => item.position.toLocaleLowerCase('vi').includes('giáo viên') &&
          (activeRole !== 'branchManager' || item.branch === roles.branchManager.branchArea))
        .map(item => item.name);
    } else if (key === 'type' && module === 'transactions' && activeRole === 'branchManager') {
      options = ['Thu'];
    }
    if (options) {
      const selectOptions = value && !options.includes(value) ? [value, ...options] : options;
      return `<label>${escapeHTML(label)}<select name="${key}"${required}>${selectOptions.map(option => `<option value="${escapeHTML(option)}"${option === value ? ' selected' : ''}>${escapeHTML(option)}</option>`).join('')}</select></label>`;
    }
    if (type === 'textarea') {
      return `<label>${escapeHTML(label)}<textarea name="${key}">${escapeHTML(value)}</textarea></label>`;
    }
    const minMax = key === 'score' ? ' min="0" max="10" step="0.1"' : type === 'number' ? ' min="0" step="1"' : '';
    return `<label>${escapeHTML(label)}<input name="${key}" type="${type}" value="${escapeHTML(value)}"${required}${minMax}></label>`;
  }

  function openEditor(module, id = '') {
    if (!isEditable(module) || !fieldDefinitions[module]) return;
    const record = id ? data[module].find(item => item.id === id) : null;
    if (id && !record) {
      notice('Không tìm thấy dữ liệu cần chỉnh sửa. Hãy tải lại danh sách.');
      return;
    }
    modalRecordId = id;
    const backdrop = document.createElement('div');
    backdrop.className = 'portal-modal-backdrop';
    backdrop.id = 'portal-modal-backdrop';
    modalModule = module;
    const branchManagerLabels = {
      students: 'học viên',
      schedule: 'lịch học',
      tuition: 'khoản học phí',
      makeups: 'lịch dạy bù',
      transactions: 'phiếu thu'
    };
    const recordLabel = activeRole === 'branchManager'
      ? branchManagerLabels[module] || getModuleTitle(module).toLocaleLowerCase('vi')
      : getModuleTitle(module).toLocaleLowerCase('vi');
    backdrop.innerHTML = `<section class="portal-modal" role="dialog" aria-modal="true" aria-labelledby="portal-modal-title"><button class="portal-modal-close" type="button" aria-label="Đóng" data-close-modal>×</button><h2 id="portal-modal-title">${id ? 'Cập nhật' : 'Thêm'} ${escapeHTML(recordLabel)}</h2><form class="portal-form" id="portal-record-form">${fieldDefinitions[module].map(field => createField(field, record, module)).join('')}<div class="portal-form-footer"><button class="portal-button secondary" type="button" data-close-modal>Hủy</button><button class="portal-button" type="submit">Lưu</button></div></form></section>`;
    document.body.append(backdrop);
    if (module === 'transactions' && activeRole === 'branchManager') {
      backdrop.querySelector('[name="type"]').value = 'Thu';
    }
    backdrop.querySelector('[data-close-modal]').focus();
  }

  function openInformationModal(title, details) {
    closeEditor();
    const backdrop = document.createElement('div');
    backdrop.className = 'portal-modal-backdrop';
    backdrop.id = 'portal-modal-backdrop';
    backdrop.innerHTML = `<section class="portal-modal" role="dialog" aria-modal="true" aria-labelledby="portal-modal-title"><button class="portal-modal-close" type="button" aria-label="Đóng" data-close-modal>×</button><h2 id="portal-modal-title">${escapeHTML(title)}</h2><div class="portal-record-grid">${details.map(([label, value]) => `<article class="portal-record-card"><h3>${escapeHTML(label)}</h3><p>${escapeHTML(value || 'Chưa cập nhật')}</p></article>`).join('')}</div><div class="portal-form-footer"><button class="portal-button" type="button" data-close-modal>Đóng</button></div></section>`;
    document.body.append(backdrop);
    backdrop.querySelector('[data-close-modal]').focus();
  }

  function showCourseDetails(id) {
    if (activeRole !== 'parent') return;
    const course = data.courses.find(item => item.id === id);
    if (!course) return;
    openInformationModal('Chi tiết khóa học', [
      ['Khóa học', course.title],
      ['Cấp độ', course.level],
      ['Thời lượng', course.duration],
      ['Học phí', formatValue('fee', course.fee)],
      ['Tình trạng', course.status]
    ]);
  }

  function showGradeComment(id) {
    if (activeRole !== 'parent') return;
    const grade = data.grades.find(item => item.id === id);
    if (!grade) return;
    openInformationModal('Chi tiết nhận xét', [
      ['Khóa học', grade.course],
      ['Ngày đánh giá', grade.date],
      ['Điểm số', grade.score],
      ['Nhận xét của giáo viên', grade.feedback]
    ]);
  }

  function showTeacherInformation() {
    if (activeRole !== 'parent') return;
    const child = data.students.find(student => student.id === roles.parent.studentId);
    const assignedClass = data.classes.find(item => item.name === child?.className);
    const teacher = data.staff.find(item => item.name === assignedClass?.teacher);
    if (!assignedClass) {
      notice('Chưa có thông tin lớp học được liên kết với tài khoản phụ huynh.');
      return;
    }
    openInformationModal('Thông tin giảng viên', [
      ['Giáo viên', assignedClass?.teacher],
      ['Lớp phụ trách', assignedClass?.name],
      ['Chuyên môn', teacher?.position],
      ['Điện thoại', teacher?.phone],
      ['Email', teacher?.email]
    ]);
  }

  function closeEditor() {
    $('#portal-modal-backdrop')?.remove();
    modalModule = '';
    modalRecordId = '';
  }

  function saveRecord(event) {
    event.preventDefault();
    const form = event.target;
    if (!form.reportValidity()) return;
    const module = modalModule;
    const values = Object.fromEntries(new FormData(form).entries());
    if (activeRole === 'branchManager' && module === 'students') {
      values.branch = roles.branchManager.branch;
    }
    if ('score' in values && values.score !== '' && (Number(values.score) < 0 || Number(values.score) > 10)) {
      notice('Điểm số phải nằm trong khoảng từ 0 đến 10.');
      return;
    }
    if (module === 'transactions') {
      if (!['Thu', 'Chi'].includes(values.type) || !Number.isFinite(Number(values.amount)) || Number(values.amount) <= 0) {
        notice('Phiếu thu/chi cần có loại giao dịch hợp lệ và số tiền lớn hơn 0.');
        return;
      }
      if (!/^\d{4}-\d{2}-\d{2}$/.test(values.date) || Number.isNaN(new Date(`${values.date}T00:00:00`).getTime())) {
        notice('Vui lòng nhập ngày giao dịch hợp lệ.');
        return;
      }
    }
    if (modalRecordId && !data[module].some(item => item.id === modalRecordId)) {
      notice('Không tìm thấy bản ghi cần cập nhật.');
      closeEditor();
      return;
    }
    for (const key of ['amount', 'fee', 'basePay', 'bonus', 'deduction', 'budget']) {
      if (key in values) values[key] = Number(values[key]);
    }
    const wasEditing = Boolean(modalRecordId);
    const recordDetail = values.name || values.title || values.student || values.className || values.period || values.category || getModuleTitle(module);
    const saved = persistMutation(() => {
      if (modalRecordId) {
        const index = data[module].findIndex(item => item.id === modalRecordId);
        data[module][index] = { ...data[module][index], ...values };
      } else {
        data[module].unshift({ id: `${module}-${Date.now()}`, ...values });
      }
    }, wasEditing ? 'Cập nhật' : 'Thêm mới', module, recordDetail);
    if (!saved) return;
    closeEditor();
    renderModule();
    notice(wasEditing ? 'Đã cập nhật dữ liệu.' : 'Đã thêm dữ liệu.');
  }

  function deleteRecord(module, id) {
    if (!canDelete(module)) return;
    const record = data[module].find(item => item.id === id);
    if (!record) {
      notice('Bản ghi không còn tồn tại.');
      return;
    }
    if (!window.confirm(`Bạn có chắc muốn xóa "${record.name || record.title || record.id}" không?`)) return;
    if (!persistMutation(() => {
      data[module] = data[module].filter(item => item.id !== id);
      if (module === 'students') {
        data.studentProfiles = data.studentProfiles.filter(profile => profile.studentId !== id);
        data.studentSchedules = data.studentSchedules.filter(schedule => schedule.studentId !== id);
      }
    }, 'Xóa', module, record.name || record.title || record.id)) return;
    renderModule();
    notice('Đã xóa bản ghi.');
  }

  function openPayment(id) {
    if (activeRole !== 'parent') return;
    const record = data.tuition.find(item => item.id === id);
    const child = data.students.find(student => student.id === roles.parent.studentId);
    if (!record || !child || !isParentTuitionRecord(record, child)) {
      notice('Không tìm thấy khoản học phí thuộc tài khoản phụ huynh này.');
      return;
    }
    if (record.status === 'Đã thanh toán') {
      notice('Khoản học phí này đã được thanh toán.');
      return;
    }
    if (!Number.isFinite(Number(record.amount)) || Number(record.amount) <= 0) {
      notice('Số tiền học phí không hợp lệ. Vui lòng liên hệ trung tâm để được hỗ trợ.');
      return;
    }
    const backdrop = document.createElement('div');
    backdrop.className = 'portal-modal-backdrop';
    backdrop.id = 'portal-modal-backdrop';
    backdrop.innerHTML = `<section class="portal-modal tuition-payment-modal" role="dialog" aria-modal="true" aria-labelledby="portal-modal-title"><button class="portal-modal-close" type="button" aria-label="Đóng" data-close-modal>×</button><span class="tuition-modal-eyebrow">VIETQR · BẢN MÔ PHỎNG</span><h2 id="portal-modal-title">Xác nhận học phí</h2><p><strong>${escapeHTML(record.student)}</strong> · ${escapeHTML(record.period)}</p><div class="tuition-payment-amount"><span>Số tiền trên hóa đơn</span><strong>${escapeHTML(formatValue('amount', record.amount))}</strong></div><div class="tuition-qr-placeholder" aria-hidden="true"><span>QR</span><strong>DEMO</strong></div><p class="tuition-payment-disclaimer">Chưa kết nối ngân hàng hoặc cổng thanh toán. Không quét mã hay chuyển tiền thật. Nút xác nhận chỉ cập nhật dữ liệu demo trong trình duyệt này.</p><div class="portal-form-footer"><button class="portal-button secondary" type="button" data-close-modal>Đóng</button><button class="portal-button tuition-pay-button" type="button" data-confirm-payment="${escapeHTML(id)}">Xác nhận thanh toán demo</button></div></section>`;
    document.body.append(backdrop);
    backdrop.querySelector('[data-close-modal]').focus();
  }

  function exportCSV() {
    if (activeRole !== 'admin') return;
    const rows = data.students;
    const headers = columns.students;
    const csv = [
      headers.map(([, label]) => `"${label.replace(/"/g, '""')}"`).join(','),
      ...rows.map(row => headers.map(([key]) => `"${String(row[key] ?? '').replace(/"/g, '""')}"`).join(','))
    ].join('\r\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'hoa-ma-toan-hoc-vien.csv';
    link.click();
    URL.revokeObjectURL(url);
  }

  function exportDashboardCSV() {
    if (activeRole !== 'admin') return;
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const dateKey = `${monthKey}-${String(now.getDate()).padStart(2, '0')}`;
    const rows = [
      ['Chỉ số', 'Giá trị', 'Chi tiết', 'Số tiền', 'Ngày'],
      ['Học viên đang theo học', data.students.filter(item => item.status === 'Đang học').length, '', '', ''],
      ['Doanh thu tháng này', '', 'Giao dịch thu trong tháng', data.transactions
        .filter(item => item.type === 'Thu' && item.date.startsWith(monthKey))
        .reduce((total, item) => total + Number(item.amount || 0), 0), ''],
      ...data.tuition.filter(item => item.status !== 'Đã thanh toán').map(item => [
        'Học phí chưa thu', item.student, `${item.period} · ${item.status}`, item.amount, item.dueDate
      ]),
      ...data.schedule.map(item => ['Lớp học sắp tới', item.className, `${item.day} · ${item.time} · ${item.teacher} · ${item.room}`, '', ''])
    ];
    const csv = rows.map(row => row.map(value => `"${String(value ?? '').replace(/"/g, '""')}"`).join(',')).join('\r\n');
    const blob = new Blob(['\ufeff', csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hoa-ma-toan-bao-cao-${dateKey}.csv`;
    link.click();
    URL.revokeObjectURL(url);
  }

  function updatePortalClock() {
    portalClock.textContent = new Intl.DateTimeFormat('vi-VN', {
      dateStyle: 'medium',
      timeStyle: 'medium'
    }).format(new Date());
  }

  function signOut() {
    closeEditor();
    activeRole = '';
    sessionStorage.removeItem('hoa-ma-toan-role');
    portal.classList.add('app-hidden');
    $('#screen-login').classList.remove('app-hidden');
    loginPassword.value = '';
    loginMessage.textContent = '';
    loginMessage.classList.remove('is-error');
    loginRole.focus();
  }

  loginRole.addEventListener('change', () => {
    const account = roles[loginRole.value];
    loginUsername.value = account?.username || '';
    loginMessage.textContent = '';
    loginMessage.classList.remove('is-error');
  });

  roleSelector.addEventListener('change', () => {
    const role = roles[roleSelector.value];
    if (!role) return;
    sessionStorage.setItem('hoa-ma-toan-role', roleSelector.value);
    setRoleView(roleSelector.value);
  });

  loginForm.addEventListener('submit', event => {
    event.preventDefault();
    const role = roles[loginRole.value];
    const username = loginUsername.value.trim().toLocaleLowerCase('vi');
    if (!role || username !== role.username || loginPassword.value !== passwordForDemo) {
      loginMessage.textContent = 'Thông tin đăng nhập chưa đúng. Chọn vai trò để điền tài khoản demo và thử lại.';
      loginMessage.classList.add('is-error');
      return;
    }
    loginMessage.textContent = '';
    loginMessage.classList.remove('is-error');
    sessionStorage.setItem('hoa-ma-toan-role', loginRole.value);
    setRoleView(loginRole.value);
  });

  $('#toggle-password').addEventListener('click', event => {
    const visible = loginPassword.type === 'text';
    loginPassword.type = visible ? 'password' : 'text';
    event.currentTarget.textContent = visible ? 'Hiện' : 'Ẩn';
    event.currentTarget.setAttribute('aria-label', visible ? 'Hiện mật khẩu' : 'Ẩn mật khẩu');
  });

  $('#open-recovery').addEventListener('click', () => {
    recoveryDialog.classList.remove('app-hidden');
    $('#recovery-role').value = loginRole.value || 'parent';
    $('#recovery-result').textContent = 'Đây là bản demo tĩnh. Hãy dùng mật khẩu demo 123456 hoặc liên hệ quản trị viên để đặt lại mật khẩu.';
    $('#close-recovery').focus();
  });

  function closeRecovery() {
    recoveryDialog.classList.add('app-hidden');
    $('#open-recovery').focus();
  }

  $('#close-recovery').addEventListener('click', closeRecovery);
  recoveryDialog.addEventListener('click', event => {
    if (event.target === recoveryDialog) closeRecovery();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      if (!recoveryDialog.classList.contains('app-hidden')) closeRecovery();
      closeEditor();
    }
  });
  $('#show-credentials').addEventListener('click', () => {
    const account = roles[$('#recovery-role').value];
    $('#recovery-result').textContent = account
      ? `Tên đăng nhập demo: ${account.username}. Mật khẩu demo: ${passwordForDemo}.`
      : 'Vui lòng chọn một vai trò hợp lệ.';
  });

  $('#portal-navigation').addEventListener('click', event => {
    const button = event.target.closest('[data-module]');
    if (!button || !allowedModules().some(([id]) => id === button.dataset.module)) return;
    activeModule = button.dataset.module;
    if (activeModule === 'students') studentDetailOpen = false;
    renderModule();
  });

  $('#admin-module-options').addEventListener('click', event => {
    const button = event.target.closest('[data-module]');
    if (!button || activeRole !== 'admin' || !allowedModules().some(([id]) => id === button.dataset.module)) return;
    activeModule = button.dataset.module;
    if (activeModule === 'students') studentDetailOpen = false;
    $('#admin-module-switcher').open = false;
    renderModule();
  });

  $('#portal-content').addEventListener('click', event => {
    const target = event.target.closest('button');
    if (!target) return;
    if (target.dataset.parentChild && activeRole === 'parent') {
      const child = getParentChildren().find(item => item.id === target.dataset.parentChild);
      if (!child) return;
      selectedStudentId = child.id;
      activeModule = 'students';
      renderModule();
    } else if (target.hasAttribute('data-parent-back') && activeRole === 'parent') {
      activeModule = 'dashboard';
      renderModule();
    } else if (target.dataset.teacherWeek !== undefined && activeRole === 'teacher' && activeModule === 'dashboard') {
      const direction = Number(target.dataset.teacherWeek);
      if (direction === 0) {
        teacherCalendarWeekStart = getStudentWeekStart(new Date());
      } else if (direction === -1 || direction === 1) {
        teacherCalendarWeekStart.setDate(teacherCalendarWeekStart.getDate() + direction * 7);
      } else {
        return;
      }
      renderModule();
    } else if (target.dataset.studentOpen && activeModule === 'students') {
      const student = moduleRows('students').find(item => item.id === target.dataset.studentOpen);
      if (!student) return;
      selectedStudentId = student.id;
      studentDetailOpen = true;
      renderModule();
    } else if (target.dataset.tuitionDetails && activeRole === 'parent' && activeModule === 'tuition') {
      const record = moduleRows('tuition').find(item => item.id === target.dataset.tuitionDetails && item.status !== 'Đã thanh toán');
      if (!record) {
        notice('Khoản học phí này không còn cần thanh toán.');
        renderModule();
        return;
      }
      selectedTuitionId = record.id;
      renderModule();
    } else if (target.hasAttribute('data-student-back') && activeModule === 'students') {
      studentDetailOpen = false;
      renderModule();
    } else if (target.dataset.studentWeek !== undefined && activeModule === 'students') {
      if (target.dataset.studentWeek === '0') {
        studentCalendarWeekStart = getStudentWeekStart(new Date());
      } else {
        const direction = Number(target.dataset.studentWeek);
        if (direction !== -1 && direction !== 1) return;
        studentCalendarWeekStart.setDate(studentCalendarWeekStart.getDate() + direction * 7);
      }
      renderModule();
    } else if (target.dataset.financeTab) {
      activeFinanceTab = target.dataset.financeTab;
      renderModule();
    } else if (target.dataset.settingsTab) {
      activeSettingsTab = target.dataset.settingsTab;
      renderModule();
    } else if (target.dataset.staffTab) {
      activeStaffTab = target.dataset.staffTab;
      renderModule();
    } else if (target.dataset.crmTab) {
      activeCrmTab = target.dataset.crmTab;
      renderModule();
    } else if (target.dataset.supportTab) {
      activeSupportTab = target.dataset.supportTab;
      renderModule();
    } else if (target.hasAttribute('data-create-support')) {
      openSupportRequest();
    } else if (target.dataset.financeCreate && activeRole === 'admin') {
      openEditor('transactions');
      const typeField = $('#portal-record-form [name="type"]');
      if (typeField) typeField.value = target.dataset.financeCreate;
    } else if (target.hasAttribute('data-finance-export')) {
      exportFinanceCSV();
    } else if (target.hasAttribute('data-report-export') && activeRole === 'admin') {
      exportReportsCSV();
    } else if (target.hasAttribute('data-report-print') && activeRole === 'admin') {
      window.print();
    } else if (target.dataset.receiveTuition && activeRole === 'admin') {
      receiveTuitionPayment(target.dataset.receiveTuition);
    } else if (target.dataset.remind && activeRole === 'admin') {
      const tuition = data.tuition.find(item => item.id === target.dataset.remind);
      if (!tuition || tuition.status === 'Đã thanh toán') return;
      if (persistMutation(() => {
        tuition.remindedAt = new Date().toISOString();
      }, 'Nhắc học phí', 'tuition', `${tuition.student} - ${tuition.period}`)) {
        renderModule();
        notice(`Đã ghi nhận nhắc phí cho ${tuition.student}.`);
      }
    } else if (target.dataset.module && allowedModules().some(([id]) => id === target.dataset.module)) {
      activeModule = target.dataset.module;
      if (activeModule === 'students') studentDetailOpen = false;
      renderModule();
    } else if (target.dataset.create) {
      openEditor(target.dataset.create);
    } else if (target.dataset.edit) {
      openEditor(target.dataset.edit, target.dataset.id);
    } else if (target.dataset.delete) {
      deleteRecord(target.dataset.delete, target.dataset.id);
    } else if (target.dataset.pay) {
      openPayment(target.dataset.pay);
    } else if (target.dataset.viewCourse) {
      showCourseDetails(target.dataset.viewCourse);
    } else if (target.dataset.viewComment) {
      showGradeComment(target.dataset.viewComment);
    } else if (target.hasAttribute('data-view-teacher')) {
      showTeacherInformation();
    } else if (target.hasAttribute('data-export')) {
      exportCSV();
    } else if (target.hasAttribute('data-reset')) {
      if (!window.confirm('Khôi phục toàn bộ dữ liệu mẫu? Dữ liệu đã chỉnh sửa sẽ bị xóa.')) return;
      if (persistMutation(() => {
        data = structuredClone(seedData);
      }, 'Khôi phục dữ liệu', 'settings', 'Khôi phục dữ liệu mẫu')) {
        renderModule();
        notice('Đã khôi phục dữ liệu mẫu.');
      }
    }
  });

  document.body.addEventListener('click', event => {
    if (event.target.id === 'portal-modal-backdrop' || event.target.closest('[data-close-modal]')) {
      closeEditor();
    }
    if (event.target.closest('#btn-dashboard-export')) {
      exportDashboardCSV();
      return;
    }
    const confirmButton = event.target.closest('[data-confirm-payment]');
    if (confirmButton && activeRole === 'parent') {
      const record = data.tuition.find(item => item.id === confirmButton.dataset.confirmPayment);
      const child = data.students.find(student => student.id === roles.parent.studentId);
      if (!record || !child || !isParentTuitionRecord(record, child)) {
        closeEditor();
        notice('Không tìm thấy khoản học phí thuộc tài khoản phụ huynh này.');
        return;
      }
      if (record.status === 'Đã thanh toán') {
        closeEditor();
        renderModule();
        notice('Khoản học phí này đã được thanh toán, không ghi nhận giao dịch trùng.');
        return;
      }
      if (!Number.isFinite(Number(record.amount)) || Number(record.amount) <= 0) {
        closeEditor();
        notice('Số tiền học phí không hợp lệ. Vui lòng liên hệ trung tâm để được hỗ trợ.');
        return;
      }
      if (persistMutation(() => {
        record.status = 'Đã thanh toán';
        record.paidDate = getLocalDateKey();
        data.transactions.unshift({
          id: `tuition-${record.id}`,
          date: record.paidDate,
          type: 'Thu',
          category: `Học phí ${record.student} - ${record.period}`,
          amount: Number(record.amount),
          person: roles.parent.displayName
        });
      }, 'Thanh toán demo', 'tuition', `${record.student} - ${record.period}`)) {
        closeEditor();
        renderModule();
        notice('Đã cập nhật trạng thái thanh toán demo.');
      }
    }
  });

  document.body.addEventListener('submit', event => {
    if (event.target.id === 'portal-record-form') saveRecord(event);
    if (event.target.id === 'portal-support-form') saveSupportRequest(event);
  });

  $('#portal-content').addEventListener('change', event => {
    if (event.target.id === 'finance-month-picker' && /^\d{4}-\d{2}$/.test(event.target.value)) {
      financeSelectedMonth = event.target.value;
      renderModule();
    } else if (event.target.id === 'report-month-picker' && /^\d{4}-\d{2}$/.test(event.target.value)) {
      reportSelectedMonth = event.target.value;
      renderModule();
    }
  });

  $('#global-search').addEventListener('input', () => renderModule());
  $('#btn-logout').addEventListener('click', signOut);
  updatePortalClock();
  window.setInterval(updatePortalClock, 1000);

  const savedRole = sessionStorage.getItem('hoa-ma-toan-role');
  if (roles[savedRole]) setRoleView(savedRole);
})();
