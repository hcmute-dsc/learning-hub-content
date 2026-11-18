# learning-hub-content

Nội dung học của **HCMUTE DSC Learning Hub**: lộ trình (track), chặng (module), bài học (lesson) và bài tập (exercise), viết bằng YAML + Markdown.

- Ứng dụng: [hcmute-dsc/learning-hub](https://github.com/hcmute-dsc/learning-hub)
- Đặc tả định dạng: [CONTENT-SPECIFICATION.md](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/product/CONTENT-SPECIFICATION.md)

## Registry: mỗi track một repo

Từ 18/11/2026 mỗi track nằm trong **repo riêng** `hcmute-dsc/learning-hub-track-<slug>`, tạo từ [learning-hub-track-template](https://github.com/hcmute-dsc/learning-hub-track-template) ([ADR-10](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/product/DECISIONS.md#adr-10--mỗi-track-một-repo-learning-hub-content-thành-registry)). Repo này là **registry**: file [`tracks.yaml`](tracks.yaml) ghi mỗi track ở repo nào và **commit nào được đưa lên site**.

- **Viết hoặc sửa bài:** làm trong repo của track đó, theo CONTRIBUTING của repo track.
- **Đưa lên site:** mở PR vào repo này, đổi `commit` của track trong `tracks.yaml`. CI tải mọi track ở commit đã ghim rồi kiểm tra cùng nhau. Ban chủ nhiệm duyệt và merge, rồi publish.
- **Track mới:** mở issue "Đề xuất" ở repo này. Ban chủ nhiệm tạo repo từ template và cấp quyền cho mentor.

Kiểm tra registry trên máy (cần `../learning-hub` đã build `@hub/content`, xem CONTRIBUTING bước 3):

```bash
node tools/assemble-registry.mjs ../learning-hub .check && node ../learning-hub/packages/content/dist/cli.js .check
```

## Các track đang có

| Track | Repo | Nội dung |
| --- | --- | --- |
| `sql-30-days` | [learning-hub-track-sql-30-days](https://github.com/hcmute-dsc/learning-hub-track-sql-30-days) | 30 ngày học SQL với PostgreSQL 16 (32 bài, 32 bài tập, dự án cuối khóa) |

```
tracks.yaml                 # registry: slug, repo, commit được publish của từng track
tools/assemble-registry.mjs # tải mọi track ở commit đã ghim vào một thư mục để kiểm tra
```

## Đóng góp

Sửa bài học, bài tập: làm trong repo của track, theo CONTRIBUTING của repo đó. Đưa một track lên site: xem [CONTRIBUTING.md](CONTRIBUTING.md) của repo này.

## Giấy phép

Mỗi track ghi giấy phép trong `track.yaml` (trường `license`) và `LICENSE.md` của repo track. `sql-30-days` dùng **MIT** như repo gốc `sql-challenge`. Nội dung mới mặc định **CC BY-SA 4.0** cho văn bản và **MIT** cho mã mẫu.
