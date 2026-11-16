# Đóng góp nội dung

Cảm ơn bạn! Nội dung ở đây được nhiều thế hệ thành viên CLB cùng viết và sửa, nên hãy giữ cho file dễ đọc và có nguồn rõ ràng.

## Quy trình

1. Tạo nhánh mới (hoặc fork), sửa hoặc thêm file theo [đặc tả](https://github.com/hcmute-dsc/learning-hub-docs/blob/main/docs/product/CONTENT-SPECIFICATION.md).
2. Chạy validator (cần Node 22):

   ```bash
   git clone https://github.com/hcmute-dsc/learning-hub ../learning-hub
   cd ../learning-hub && npx -y pnpm@9.15.4 install --filter @hub/content... && npx -y pnpm@9.15.4 --filter @hub/content build && cd -
   node ../learning-hub/packages/content/dist/cli.js .
   ```

3. Mở Pull Request theo mẫu. CI chạy lại validator; PR đỏ thì sửa đến khi xanh.
4. Maintainer của track (trong `track.yaml`, xem `CODEOWNERS`) duyệt và merge.
5. Ban kỹ thuật sync và publish lên Learning Hub. Mỗi bản publish gắn với đúng commit SHA đã merge.

## Quy tắc quan trọng

- **`uid` không bao giờ đổi.** Nó là khóa của bài trong database; đổi `uid` làm mất tiến độ của thành viên. Đổi tên, đổi `slug` hay dời thư mục thì được, giữ nguyên `uid`.
- Bài mới cần `uid` mới dạng UUID (ví dụ chạy `node -e "console.log(crypto.randomUUID())"`).
- Mỗi bài học và bài tập phải được liệt kê trong `module.yaml`; file không được liệt kê sẽ bị báo lỗi "orphan".
- Không dùng HTML có thể chạy code (`<script>`, `<iframe>`, `onclick=`…) ngoài khối code.
- Lời giải và test ẩn của bài `code` **không** đặt ở repo công khai này (xem đặc tả §3.8).
- Nội dung lấy từ nguồn khác: ghi nguồn và tác giả trong PR, và trong `track.yaml` (`source`) nếu là cả track.

## Track `sql-30-days`

Track này được nhập từ `sql-challenge`. Hiện tại **sửa trực tiếp ở đây**. Nếu chạy lại `tools/import-sql-challenge.mjs`, mọi chỉnh sửa trong `tracks/sql-30-days` sẽ bị ghi đè. Chỉ chạy lại khi Ban kỹ thuật thống nhất lấy lại từ nguồn.
