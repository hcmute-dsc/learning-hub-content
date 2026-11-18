# Đóng góp nội dung

Cảm ơn bạn! Nội dung ở đây được nhiều thế hệ thành viên CLB cùng viết và sửa, nên hãy giữ cho file dễ đọc và có nguồn rõ ràng.

## Repo này chứa gì

Từ khi tách mỗi track một repo ([ADR-10](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/product/DECISIONS.md#adr-10--mỗi-track-một-repo-learning-hub-content-thành-registry)), repo này chỉ còn là **registry**: `tracks.yaml` ghi mỗi track ở repo nào và commit nào được đưa lên site.

- **Sửa hoặc thêm bài học, bài tập:** làm trong repo của track (`hcmute-dsc/learning-hub-track-<slug>`), theo CONTRIBUTING của repo đó. Ví dụ: [learning-hub-track-sql-30-days](https://github.com/hcmute-dsc/learning-hub-track-sql-30-days).
- **Đề xuất track mới:** mở issue "Đề xuất" ở repo này. Ban chủ nhiệm tạo repo từ [learning-hub-track-template](https://github.com/hcmute-dsc/learning-hub-track-template) và cấp quyền cho mentor.
- **Đưa track lên site:** PR vào repo này, theo mục dưới.

Mọi thay đổi ở repo này cũng theo quy trình chung: có issue trước, nhánh `<loại>/<số issue>-<mô-tả-ngắn>`, PR có `Closes #<số>`, CI `validate` xanh, squash merge sau khi được duyệt. Chi tiết: [WORKFLOW.md](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/ops/WORKFLOW.md).

## Đưa một track lên site (registry)

Track trong repo riêng (`learning-hub-track-<slug>`) chỉ lên site khi commit của nó được ghi vào [`tracks.yaml`](tracks.yaml):

1. Merge các PR nội dung vào `main` của repo track.
2. Lấy commit mới nhất: `git ls-remote https://github.com/hcmute-dsc/learning-hub-track-<slug> main`.
3. Mở PR vào repo này, đổi `commit` của track trong `tracks.yaml`. Tiêu đề `<slug>: publish <7 ký tự đầu của commit>`. Thân PR liệt kê các PR của repo track từ lần publish trước.
4. CI `validate` tải **mọi** track ở commit đã ghim và kiểm tra cùng nhau: slug, uid trùng giữa các track, prerequisite sang track khác.
5. Ban chủ nhiệm duyệt, squash merge, rồi sync và publish trên trang quản trị.

## Quy tắc quan trọng

- Chỉ ghim **commit đầy đủ 40 ký tự** trên `main` của repo track, không ghi tên nhánh. Nhờ vậy nội dung trên site chỉ đổi qua một PR đã được duyệt.
- Mỗi track xuất hiện **một lần** trong `tracks.yaml`; mỗi repo track chỉ có một thư mục `tracks/<slug>/`.
- **`uid` không bao giờ đổi** giữa các commit được publish. Nó là khóa của bài trong database; đổi `uid` làm mất tiến độ của thành viên.
- Không để track nào nằm trực tiếp trong `tracks/` của repo này nữa. CI sẽ báo lỗi nếu một slug vừa có ở đây vừa có trong `tracks.yaml`.
