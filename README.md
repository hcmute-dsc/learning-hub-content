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

Track `sql-30-days` vẫn nằm trong repo này cho tới khi chuyển xong (#9).

## Có gì trong repo

| Track | Nội dung | Nguồn |
| --- | --- | --- |
| [`sql-30-days`](tracks/sql-30-days/README.md) | 30 ngày học SQL với PostgreSQL 16 (32 bài, 32 bài tập, dự án cuối khóa) | Nhập từ [sql-challenge](https://github.com/hcmute-dsc/sql-challenge) bằng `tools/import-sql-challenge.mjs` |

```
tracks/<track>/track.yaml
tracks/<track>/modules/<module>/module.yaml
tracks/<track>/modules/<module>/lessons/<bài>.md                # front matter + Markdown
tracks/<track>/modules/<module>/exercises/<bài-tập>/exercise.yaml
tracks/<track>/modules/<module>/exercises/<bài-tập>/statement.md
tools/                                                          # script nhập nội dung
```

## Đóng góp

Xem [CONTRIBUTING.md](CONTRIBUTING.md). Tóm tắt: sửa file → chạy validator → mở Pull Request → maintainer của track duyệt → Ban kỹ thuật sync và publish lên Learning Hub.

## Giấy phép

Mỗi track ghi giấy phép trong `track.yaml` (trường `license`). `sql-30-days` dùng **MIT** như repo gốc. Nội dung mới mặc định **CC BY-SA 4.0** cho văn bản và **MIT** cho mã mẫu.
