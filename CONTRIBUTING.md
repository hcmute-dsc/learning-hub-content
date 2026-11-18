# Đóng góp nội dung

Cảm ơn bạn! Nội dung ở đây được nhiều thế hệ thành viên CLB cùng viết và sửa, nên hãy giữ cho file dễ đọc và có nguồn rõ ràng.

## Quy trình

1. Có issue trước (dùng mẫu "Lỗi nội dung" hoặc "Đề xuất"), tự gán mình và chuyển Status = In progress trên [Project #1](https://github.com/orgs/hcmute-dsc/projects/1). Tìm issue có sẵn trước khi tạo mới.
2. Tạo nhánh `<loại>/<số issue>-<mô-tả-ngắn>` từ `main` mới nhất (ví dụ `fix/5-sql-day10-answer`, `feat/6-git-track`), hoặc fork. Sửa hoặc thêm file theo [đặc tả](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/product/CONTENT-SPECIFICATION.md).
3. Chạy validator (cần Node 22):

   ```bash
   git clone https://github.com/hcmute-dsc/learning-hub ../learning-hub
   cd ../learning-hub && npx -y pnpm@9.15.4 install --filter @hub/content... && npx -y pnpm@9.15.4 --filter @hub/content build && cd -
   node ../learning-hub/packages/content/dist/cli.js .
   ```

4. Commit dạng `<track>: <tóm tắt>` (ví dụ `sql-30-days: sửa đáp án bài 3 Ngày 10`), thân commit ghi lý do và `Refs #<số>`.
5. Mở Pull Request theo mẫu, dòng đầu `Closes #<số>`. CI chạy lại validator; PR đỏ thì sửa đến khi xanh.
6. Maintainer của track (trong `track.yaml`, xem `CODEOWNERS`) review (kiến thức đúng, câu lệnh chạy được, văn phong dễ hiểu), rồi **squash merge**. Không đẩy thẳng lên `main`.
7. Ban kỹ thuật sync và publish lên Learning Hub. Mỗi bản publish gắn với đúng commit SHA đã merge. Issue chỉ xong (Done) khi nội dung đã lên site.

Quy trình chung của cả dự án (vòng đời bug, review, Definition of Done): [WORKFLOW.md](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/ops/WORKFLOW.md).

## Quy tắc quan trọng

- **`uid` không bao giờ đổi.** Nó là khóa của bài trong database; đổi `uid` làm mất tiến độ của thành viên. Đổi tên, đổi `slug` hay dời thư mục thì được, giữ nguyên `uid`.
- Bài mới cần `uid` mới dạng UUID (ví dụ chạy `node -e "console.log(crypto.randomUUID())"`).
- Mỗi bài học và bài tập phải được liệt kê trong `module.yaml`; file không được liệt kê sẽ bị báo lỗi "orphan".
- Không dùng HTML có thể chạy code (`<script>`, `<iframe>`, `onclick=`…) ngoài khối code.
- Lời giải và test ẩn của bài `code` **không** đặt ở repo công khai này (xem đặc tả §3.8).
- Nội dung lấy từ nguồn khác: ghi nguồn và tác giả trong PR, và trong `track.yaml` (`source`) nếu là cả track.

## Track `sql-30-days`

Track này được nhập từ `sql-challenge`. Hiện tại **sửa trực tiếp ở đây**. Nếu chạy lại `tools/import-sql-challenge.mjs`, mọi chỉnh sửa trong `tracks/sql-30-days` sẽ bị ghi đè. Chỉ chạy lại khi Ban kỹ thuật thống nhất lấy lại từ nguồn.
