# Đào Văn Hùng — Professional Portfolio

Portfolio tĩnh, responsive, không cần framework/build step. Tối ưu để deploy nhanh lên GitHub Pages.

## Chạy local

Có thể mở trực tiếp `index.html`, hoặc dùng web server tĩnh:

```bash
python3 -m http.server 8080
```

Sau đó mở `http://localhost:8080`.

## Deploy GitHub Pages

1. Tạo repo mới, ví dụ `portfolio`.
2. Copy toàn bộ file trong thư mục này vào root repo.
3. Commit + push lên `main`.
4. Vào **Settings → Pages**.
5. Chọn **Deploy from a branch → main → /(root)**.

Nếu repo tên `daovanhung-dev.github.io`, GitHub Pages có thể dùng làm trang cá nhân mặc định.

## File chính

- `index.html` — nội dung portfolio + SEO/structured data.
- `styles.css` — toàn bộ giao diện, responsive và light/dark theme.
- `script.js` — theme toggle, scroll progress, reveal animation và active nav.

## Nội dung

Portfolio hiện bao gồm:

- Giới thiệu nghề nghiệp.
- Kinh nghiệm FPT, NanoBio/NamiAI, VNUA Innovation Center, VentureX/VinUniversity, Learn2Earn.
- Project NanoBioAI, Study2Work, HVC_EDU, LabVnua, Learn2Earn, hung-quynh-our-story.
- Capability map theo mức evidence.
- Engineering case studies.
- AI-assisted Engineering.
- Cybersecurity direction.
- Education.
- Contact.

## Ghi chú nội dung

Các bullet cố ý dùng cách diễn đạt thận trọng: source/design/project exposure không tự động được gọi là production experience. Số liệu FPT mặc định giữ mốc công khai 06 REST API + 02 màn hình.
# portfolio
