# learning-hub-content

Nội dung học của **HCMUTE DSC Learning Hub**: lộ trình (track), chặng (module), bài học (lesson) và bài tập (exercise), viết bằng YAML + Markdown.

- Ứng dụng: [hcmute-dsc/learning-hub](https://github.com/hcmute-dsc/learning-hub)
- Đặc tả định dạng: [CONTENT-SPECIFICATION.md](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/product/CONTENT-SPECIFICATION.md)

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
