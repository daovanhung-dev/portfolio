---
slug: server-connectivity-diagnostics
id: server-connectivity-diagnostics
title: "Chẩn đoán sự cố kết nối Ubuntu Server"
description: "Lab định vị lỗi mạng, SSH, firewall, NAT, Nginx và filesystem theo từng lớp, dựa trên bằng chứng và phép kiểm tra có kiểm soát."
topics:
  - Network troubleshooting
  - SSH và Tailscale
  - Firewall, NAT và DNS
  - Nginx, TLS và filesystem
evidenceIds:
  - ev-lab-server-diagnostics
state: learning
limitations:
  - "Tóm tắt sự cố do chủ sở hữu tự xác nhận; danh tính dự án và định danh máy đã được lược bỏ."
  - "Các lệnh là quy trình chẩn đoán tham khảo, không chứng minh trạng thái vận hành hiện tại."
---

# Chẩn đoán sự cố kết nối Ubuntu Server

| Thuộc tính | Thông tin |
|---|---|
| **Lĩnh vực** | Linux System Administration · Network Troubleshooting |
| **Môi trường** | Ubuntu Server 26.04 · SSH · Tailscale · Netfilter/UFW · Nginx · FastAPI |
| **Giai đoạn khảo sát** | Tháng 10–11/2026 |
| **Ngày tổng hợp** | 22/11/2026 |
| **Phạm vi** | Kết nối mạng, quản trị từ xa và khả năng truy cập dịch vụ công khai |

> **Phạm vi bằng chứng:** Các tóm tắt sự cố do chủ sở hữu tự xác nhận và đã lược bỏ tên dự án cùng định danh máy. Những lệnh bên dưới là quy trình chẩn đoán tham khảo, không phải xác nhận nghiệm thu server hiện tại.

**Cách đọc lệnh:** Mỗi khối lệnh có bảng phân tích ngay sau đó. `sudo` chạy lệnh với quyền quản trị; `|` chuyển output; `&&` nối lệnh có điều kiện; `$NAME` là biến cần thay bằng giá trị thực; `$(...)` chạy lệnh con.

## 1. Tóm tắt điều tra

“Server mất kết nối” là **triệu chứng**, chưa đủ xác định lỗi ở phần cứng, mạng, firewall hay ứng dụng. Trong quá trình triển khai, ba tình huống nổi bật đã được ghi nhận:

| Mã sự cố | Biểu hiện | Nhận định kỹ thuật | Trạng thái ghi nhận |
|---|---|---|---|
| **NET-01** | Ethernet có link nhưng `git clone` không kết nối được GitHub | Thiếu IPv4/default route được ghi nhận trong một lần kiểm tra | Kết nối được khôi phục để tiếp tục triển khai |
| **NET-02** | HTTPS công khai qua TCP 443 không truy cập được | Một rule `INPUT` của netfilter ảnh hưởng lưu lượng inbound | Kết nối hoạt động lại sau khi loại bỏ rule xung đột |
| **SYS-01** | Build/deploy gặp `EIO` và `EROFS` | Kernel/filesystem báo lỗi I/O và chuyển sang trạng thái chỉ đọc | Chưa có bằng chứng khắc phục hoàn tất |

**Kết luận tổng quát:** Định vị lỗi theo từng tầng, sử dụng log và phép thử độc lập, sau đó chỉ sửa cấu hình đã được xác định gây sự cố.

## 2. Kiến trúc hệ thống

```text
Người dùng Internet
      |
      v
DNS A → Public IPv4 → Router NAT (443 → LAN:443)
                                |
                                v
                      Ubuntu Server
                         ├─ NIC / IP / Gateway / DNS
                         ├─ Netfilter / UFW
                         ├─ Nginx :443
                         └─ FastAPI 127.0.0.1:8000

Laptop quản trị ── Tailscale ── SSH :22 ── Ubuntu Server
```

**Phân biệt các đường truy cập:** SSH qua Tailscale hoạt động không đồng nghĩa HTTPS công khai hoạt động; backend trả HTTP 200 ở `localhost` cũng không chứng minh router, NAT và firewall đã cho phép truy cập từ Internet.

## 3. Quy trình chẩn đoán

### 3.1. Khoanh vùng triệu chứng

| Phạm vi hỏng | Vị trí kiểm tra ưu tiên |
|---|---|
| Không truy cập được Internet từ chính server | NIC → IPv4 → gateway → DNS → outbound |
| Không SSH được nhưng console vẫn hoạt động | SSH daemon → listener → Tailscale → firewall |
| SSH được nhưng domain HTTPS không truy cập | DNS → WAN/NAT → TCP 443 → Nginx |
| Nginx trả `502`/`504` | Backend, upstream, timeout, tài nguyên |
| Lệnh Linux hoặc quá trình build báo `EIO`/`EROFS` | Đĩa, filesystem và kernel log |

Quy trình thống nhất: **ghi nhận hiện tượng → khoanh vùng → lấy bằng chứng → xác nhận nguyên nhân → chỉnh sửa có kiểm soát → nghiệm thu**. Không xem `ping` thất bại là bằng chứng duy nhất của mất mạng vì ICMP có thể bị chặn.

### 3.2. Kiểm tra NIC, địa chỉ IP và route

Thực hiện trên Ubuntu qua console hoặc phiên SSH vẫn còn hoạt động:

```bash
ip -br link             # Trạng thái interface và tín hiệu link
ip -4 -br addr         # IPv4 đã được cấp
ip -4 route            # Route và default gateway
ip route get 1.1.1.1   # Tuyến thực tế đến Internet
sudo netplan get       # Cấu hình mạng đang khai báo
```

| Lệnh | Phân tích từng phần |
|---|---|
| `ip -br link` | `ip` truy vấn mạng; `-br` viết tắt output; `link` liệt kê interface lớp liên kết và trạng thái link. |
| `ip -4 -br addr` | `-4` lọc IPv4; `-br` rút gọn; `addr` liệt kê địa chỉ trên interface. |
| `ip -4 route` | Hiển thị bảng route IPv4; tìm dòng `default` để kiểm tra gateway. |
| `ip route get 1.1.1.1` | Hỏi kernel sẽ chọn interface/gateway nào cho đích `1.1.1.1`; đây là tra cứu route, không tự gửi gói tin. |
| `sudo netplan get` | `sudo` dùng quyền quản trị; `netplan get` in cấu hình mạng Netplan đang hợp nhất. |

| Dấu hiệu | Kết luận bước đầu |
|---|---|
| `NO-CARRIER` | Kiểm tra cáp, cổng switch/router hoặc NIC |
| Interface `UP`, không có IPv4 | Kiểm tra DHCP hoặc IP tĩnh |
| Không có `default via` | Kiểm tra gateway và Netplan |
| `Network is unreachable` | Chưa có route phù hợp tới đích |

Trước khi sửa Netplan từ xa, phải có console hoặc đường khôi phục. Có thể sử dụng `netplan try` khi thích hợp thay vì thay đổi mạng không có rollback.

### 3.3. Phân biệt lỗi DNS và Internet outbound

```bash
resolvectl status
getent ahostsv4 github.com
ping -c 3 1.1.1.1
curl -4 -I --connect-timeout 5 --max-time 10 https://github.com
```

| Lệnh | Phân tích từng phần |
|---|---|
| `resolvectl status` | Xem trạng thái resolver, DNS server và cấu hình theo từng link. |
| `getent ahostsv4 github.com` | `getent` hỏi hệ thống phân giải tên của OS; `ahostsv4` lấy các địa chỉ IPv4; `github.com` là hostname kiểm tra. |
| `ping -c 3 1.1.1.1` | Gửi ICMP tới IP đích; `-c 3` giới hạn ba gói. ICMP có thể bị chặn nên thất bại không đủ kết luận mất Internet. |
| `curl -4 -I --connect-timeout 5 --max-time 10 https://github.com` | `-4` buộc IPv4; `-I` chỉ lấy HTTP headers; `--connect-timeout 5` giới hạn thời gian thiết lập kết nối; `--max-time 10` giới hạn tổng thời gian request. |

- Không phân giải được `github.com`: kiểm tra DNS/resolver.
- Phân giải được nhưng HTTPS thất bại: kiểm tra route, outbound firewall, proxy, ISP.
- Ping không thành công nhưng HTTPS thành công: không được kết luận mất Internet.

### 3.4. Kiểm tra SSH và Tailscale

Trên server:

```bash
systemctl is-active ssh tailscaled
sudo ss -lntp | grep ':22'
tailscale status
sudo journalctl -u ssh -n 50 --no-pager
```

| Lệnh | Phân tích từng phần |
|---|---|
| `systemctl is-active ssh tailscaled` | Hỏi systemd trạng thái hiện tại của hai unit SSH và Tailscale. |
| `sudo ss -lntp \| grep ':22'` | `ss` liệt kê socket; `-lntp` lọc listener TCP, dùng địa chỉ/cổng dạng số và hiện tiến trình; pipe đưa kết quả sang `grep`; `:22` lọc cổng SSH. |
| `tailscale status` | Liệt kê trạng thái tailnet và các peer nhìn thấy. |
| `sudo journalctl -u ssh -n 50 --no-pager` | Đọc log unit `ssh`; `-u` chọn unit; `-n 50` lấy 50 dòng cuối; `--no-pager` in trực tiếp ra terminal. |

Trên laptop quản trị, dùng IP Tailscale thực tế của máy:

```bash
tailscale ping 100.x.y.z
ssh -vv -o ConnectTimeout=8 admin@100.x.y.z
```

| Lệnh | Phân tích từng phần |
|---|---|
| `tailscale ping 100.x.y.z` | Kiểm tra kết nối tới peer Tailscale; thay IP mẫu bằng IP Tailscale thực tế của server. |
| `ssh -vv -o ConnectTimeout=8 admin@100.x.y.z` | `-vv` bật log SSH chi tiết; `-o ConnectTimeout=8` giới hạn thời gian thiết lập kết nối; `admin@...` là user và máy đích, cần thay bằng giá trị thật. |

| Kết quả | Ý nghĩa |
|---|---|
| `Connection refused` | Có từ chối TCP; kiểm tra listener/cổng/reject rule |
| `Connection timed out` | Kiểm tra route, ACL và lọc gói |
| `Permission denied (publickey)` | Đường tới SSH đã hoạt động, lỗi ở xác thực |

Địa chỉ `100.x.y.z` chỉ minh họa IP Tailscale; đây không phải Public IP. Không mở SSH ra Internet chỉ để chữa lỗi Tailscale.

### 3.5. Kiểm tra listener và firewall

```bash
sudo ss -lntp
sudo ufw status verbose
sudo nft list ruleset
sudo iptables -S
sudo journalctl -k -n 80 --no-pager
```

| Lệnh | Phân tích từng phần |
|---|---|
| `sudo ss -lntp` | Liệt kê TCP listener cùng cổng dạng số và tiến trình sở hữu nếu quyền cho phép. |
| `sudo ufw status verbose` | Hiển thị trạng thái UFW, policy và rule ở chế độ chi tiết. |
| `sudo nft list ruleset` | In toàn bộ ruleset Netfilter được quản lý qua nftables. |
| `sudo iptables -S` | In các chain/rule iptables theo dạng lệnh; `-S` hiển thị rule thay vì bộ đếm gói. |
| `sudo journalctl -k -n 80 --no-pager` | Đọc kernel log; `-k` lọc kernel; `-n 80` lấy 80 dòng cuối; `--no-pager` in trực tiếp. |

`ss` cho biết dịch vụ có lắng nghe hay không; UFW/Netfilter xác định lưu lượng có thể bị lọc tại các chain. `ufw status` không nhất thiết phản ánh mọi rule được tạo ngoài UFW.

**Nguyên tắc khắc phục:** Sao lưu/ghi nhận ruleset, xác định chính xác rule xung đột, thay đổi một rule và kiểm thử lại. Không sử dụng `iptables -F`, `nft flush ruleset` hoặc vô hiệu hóa toàn bộ firewall như biện pháp mặc định, đặc biệt khi đang SSH từ xa.

### 3.6. Kiểm tra WAN, NAT và DNS công khai

```bash
# Trên server: IP mà Internet nhìn thấy khi kết nối ra ngoài
curl -4 -sS --max-time 10 https://api.ipify.org

# Trên máy ở mạng ngoài: kiểm tra HTTPS thực tế
curl -Iv --connect-timeout 5 --max-time 12 "https://$DOMAIN/"
```

| Lệnh | Phân tích từng phần |
|---|---|
| `curl -4 -sS --max-time 10 https://api.ipify.org` | `-4` buộc IPv4; `-sS` giảm output nhưng vẫn hiện lỗi; `--max-time 10` đặt giới hạn tổng 10 giây; URL trả IP egress mà dịch vụ nhìn thấy. |
| `curl -Iv --connect-timeout 5 --max-time 12 "https://$DOMAIN/"` | `-I` chỉ yêu cầu headers; `-v` in chi tiết kết nối/TLS; `--connect-timeout 5` giới hạn bắt tay kết nối; `--max-time 12` giới hạn tổng thời gian; `$DOMAIN` cần được gán hostname thực tế. |

Ở lệnh thứ hai, `DOMAIN` là biến môi trường chứa hostname thực tế. Đối chiếu thêm bằng giao diện router và DNS:

1. **WAN IPv4 của router:** Nếu thuộc `100.64.0.0/10`, có dấu hiệu CGNAT; port forwarding trên router nhà không đủ cho IPv4 inbound.
2. **NAT:** TCP 443 ngoài WAN phải được chuyển về đúng LAN IP và cổng 443 của Ubuntu.
3. **DNS A:** Phải trỏ tới IP công khai hiện hành, tại nhà cung cấp DNS có thẩm quyền.
4. **Client kiểm thử:** Phải ở mạng ngoài (ví dụ 4G/5G) để loại trừ sai lệch do NAT loopback.

IP từ `api.ipify.org` chỉ thể hiện địa chỉ **outbound/egress**, không tự chứng minh kết nối inbound tới router đã hoạt động.

### 3.7. Kiểm tra Nginx, backend và TLS

```bash
sudo nginx -t
systemctl is-active nginx
sudo ss -lntp | grep -E ':(80|443|8000)\b'
curl -i --max-time 5 http://127.0.0.1:8000/health/live
sudo tail -n 60 /var/log/nginx/error.log
```

| Lệnh | Phân tích từng phần |
|---|---|
| `sudo nginx -t` | Kiểm tra cú pháp và khả năng mở cấu hình Nginx. |
| `systemctl is-active nginx` | Kiểm tra unit Nginx có ở trạng thái active hay không. |
| `sudo ss -lntp \| grep -E ':(80\|443\|8000)\b'` | `ss -lntp` liệt kê TCP listener; pipe chuyển output; `grep -E` dùng regex mở rộng để lọc các cổng web/API; dấu nháy giữ mẫu nguyên vẹn. |
| `curl -i --max-time 5 http://127.0.0.1:8000/health/live` | `-i` in status/headers và body; `--max-time 5` giới hạn request; loopback và path là địa chỉ/endpoint mẫu cần đối chiếu với app. |
| `sudo tail -n 60 /var/log/nginx/error.log` | Đọc 60 dòng cuối Nginx error log; `-n 60` chọn số dòng; đường dẫn là log mặc định thường dùng trên Ubuntu. |

Port `8000` và `/health/live` là giá trị ví dụ; nếu ứng dụng dùng cấu hình khác, hãy kiểm tra đúng service và endpoint hiện tại.

| Kết quả | Điều tra tiếp |
|---|---|
| Backend local không phản hồi | systemd, log ứng dụng, port, DB/dependency |
| Backend local ổn nhưng Nginx `502` | `proxy_pass`, upstream và kết nối backend |
| Nginx `404` | `server_name`, `location`, vhost, URI rewrite |
| Nginx `504` | Timeout hoặc upstream quá chậm |
| Local thành công, public timeout | Quay lại NAT, TCP 443, firewall, WAN, DNS |

Đối với chứng chỉ HTTPS do Certbot quản lý:

```bash
sudo certbot certificates
sudo certbot renew --dry-run
openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN" </dev/null 2>/dev/null \
  | openssl x509 -noout -dates -issuer -subject
```

| Lệnh | Phân tích từng phần |
|---|---|
| `sudo certbot certificates` | Liệt kê certificate mà Certbot quản lý cùng hostname và hạn dùng. |
| `sudo certbot renew --dry-run` | Mô phỏng quy trình gia hạn; `--dry-run` dùng môi trường thử, không chứng minh Nginx đang phục vụ certificate hợp lệ. |
| `openssl s_client -connect "$DOMAIN:443" -servername "$DOMAIN"` | Mở kết nối TLS tới hostname và cổng 443; `-connect` chỉ đích; `-servername` gửi SNI để máy chủ chọn certificate đúng. |
| `</dev/null 2>/dev/null` | Đóng stdin tương tác sau khi kết nối; chuyển stderr sang `/dev/null` để bỏ phần chẩn đoán của `s_client`. |
| `\| openssl x509 -noout -dates -issuer -subject` | Pipe certificate nhận được sang parser X.509; `-noout` bỏ dữ liệu certificate thô; các cờ còn lại in hạn dùng, issuer và subject. |

Kết quả `renew --dry-run` không thay thế việc xác minh chứng chỉ **đang được Nginx phục vụ**.

### 3.8. Loại trừ sự cố filesystem

Khi nhiều tiến trình cùng lỗi hoặc xuất hiện `EIO`/`EROFS`, cần kiểm tra ngoài phạm vi mạng:

```bash
findmnt -no SOURCE,FSTYPE,OPTIONS /
df -hT /
lsblk -f
sudo journalctl -k -p err -b --no-pager | tail -n 80
```

| Lệnh | Phân tích từng phần |
|---|---|
| `findmnt -no SOURCE,FSTYPE,OPTIONS /` | Xem mount của `/`; `-n` bỏ header; `-o` chọn cột thiết bị nguồn, loại filesystem và tùy chọn mount. |
| `df -hT /` | Xem dung lượng filesystem của `/`; `-h` định dạng dễ đọc; `-T` hiện loại filesystem. |
| `lsblk -f` | Liệt kê block device cùng filesystem, UUID và mountpoint. |
| `sudo journalctl -k -p err -b --no-pager \| tail -n 80` | `journalctl -k` lọc kernel; `-p err` lấy mức error trở lên; `-b` giới hạn boot hiện tại; pipe đưa log cho `tail -n 80` để giữ 80 dòng cuối. |

Nếu kernel có lỗi I/O, ext4 journal abort hoặc root filesystem chuyển sang chế độ bảo vệ, dừng build/deploy và ưu tiên bảo toàn dữ liệu. Không chạy `fsck` sửa root đang mount hoặc reboot liên tục để thử khắc phục.

## 4. Kết quả phân tích các tình huống thực tế

### NET-01 — Ethernet UP nhưng không kết nối được GitHub

**Hiện tượng.** Ethernet có link nhưng tại một thời điểm server không có IPv4/default route phù hợp; `git clone` không kết nối được tới GitHub.

**Phân tích.** Link vật lý hoạt động không đồng nghĩa cấu hình Layer 3 đã hoàn chỉnh. Dữ liệu sự cố tự xác nhận ghi nhận thiếu IP/gateway; không có cơ sở quy lỗi cho GitHub.

**Xử lý và kết quả.** Kết nối được khôi phục để tiếp tục triển khai. Ghi nhận hiện có không xác định một thao tác đơn lẻ là nguyên nhân sửa lỗi.

### NET-02 — HTTPS cổng 443 không truy cập được từ Internet

**Hiện tượng.** HTTPS công khai trên TCP 443 không truy cập được trong một sự cố đã ghi nhận; quá trình điều tra phát hiện rule ở chain `INPUT` của netfilter ảnh hưởng inbound.

**Phân tích.** Nginx hoặc backend chạy bình thường chưa chứng minh request vượt qua firewall. Rule lọc gói có thể chặn kết nối trước khi tới web server.

**Xử lý và kết quả.** Kết nối hoạt động lại sau khi loại bỏ rule xung đột. Ghi nhận này chỉ áp dụng cho tình huống đã nêu; timeout TCP 443 có thể có nguyên nhân khác.

### SYS-01 — Lỗi filesystem làm gián đoạn triển khai

**Hiện tượng.** Một đợt build/deploy gặp `EACCES`, sau đó `EROFS` và `EIO`; ghi nhận kernel/ext4 có lỗi I/O và filesystem chuyển sang chế độ chỉ đọc.

**Phân tích.** Các dấu hiệu vượt khỏi phạm vi npm hoặc quyền thư mục và đòi hỏi kiểm tra thiết bị lưu trữ cùng filesystem. Không có đủ bằng chứng để kết luận phần cứng hỏng vật lý.

**Trạng thái.** Chưa có bằng chứng phục hồi hoàn tất. Hướng xử lý là hạn chế ghi, ưu tiên bảo toàn dữ liệu và đánh giá filesystem từ môi trường phù hợp trước khi triển khai tiếp.

## 5. Đánh giá khả năng phục hồi và phòng ngừa

| Tầng | Bằng chứng nghiệm thu cần thu thập |
|---|---|
| Mạng nội bộ | NIC có IP hợp lệ, route/gateway đúng, dịch vụ LAN kết nối được |
| Internet outbound | DNS phân giải đúng và HTTPS tới đích thử nghiệm hoạt động |
| Quản trị | SSH qua kênh quản trị được phép; đường phục hồi còn sẵn sàng |
| Truy cập công khai | Client mạng ngoài truy cập đúng domain và TCP 443 |
| Ứng dụng | Nginx và backend trả response đúng cho yêu cầu thực tế |
| TLS | Chứng chỉ hiện hành hợp lệ theo hostname và thời gian |
| Hệ điều hành | Không còn lỗi I/O/filesystem nghiêm trọng chưa được xử lý |

Các tiêu chí trên là **yêu cầu nghiệm thu**, không phải xác nhận server hiện tại đã đạt.

Biện pháp giảm tái diễn: duy trì Tailscale và console dự phòng; đặt DHCP reservation cho server; quản lý thay đổi ruleset; giám sát HTTP/TCP cùng kernel logs; sao lưu ngoài máy và thử restore; kiểm tra dịch vụ từ một mạng ngoài LAN sau mỗi lần thay đổi NAT/firewall.

## 6. Kết luận

Quá trình chẩn đoán cho thấy **không thể đồng nhất “mất kết nối” với “server mất Internet”**. Sự cố có thể xảy ra tại tầng liên kết, IP/route, DNS, quản trị SSH, netfilter, router NAT, TLS, reverse proxy hoặc hạ tầng lưu trữ.

Ba nguyên tắc vận hành được rút ra là: **chứng minh nguyên nhân trước khi sửa**, **không đánh đổi kênh quản trị và an toàn dữ liệu để khôi phục nhanh**, và **nghiệm thu từ đúng vị trí client gặp lỗi**. Đây là nền tảng để triển khai quy trình ứng cứu sự cố Linux Server có thể tái sử dụng trong System Administration và Blue Team.

## 7. Tài liệu tham khảo

1. Canonical — [Ubuntu Server: Configuring networks](https://ubuntu.com/server/docs/explanation/networking/configuring-networks/).
2. Canonical — [Ubuntu Server: Firewalls](https://ubuntu.com/server/docs/how-to/security/firewalls/).
3. Canonical — [Ubuntu Server: OpenSSH server](https://ubuntu.com/server/docs/how-to/security/openssh-server/).
4. Tailscale — [Troubleshoot device connectivity](https://tailscale.com/docs/reference/troubleshooting/connectivity).
5. Nginx — [HTTP Proxy Module](https://nginx.org/en/docs/http/ngx_http_proxy_module.html).
6. Certbot — [User Guide](https://eff-certbot.readthedocs.io/en/stable/using.html).
