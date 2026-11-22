---
title: "Ubuntu Server — Cài đặt và triển khai backend"
description: "Runbook lệnh để cài Ubuntu Server, cấu hình truy cập từ xa và DNS, PostgreSQL, FastAPI/systemd, Nginx và HTTPS."
date: "2026-11-22"
tags: [ubuntu-server, linux, tailscale, ssh, dns, postgresql, fastapi, systemd, nginx, https]
category: "Infrastructure / Linux Operations"
status: "Technical runbook"
version: "4.0"
verified_on: "2026-11-22"
content_type: "Step-by-step command runbook"
source_policy: "official-first"
---

# Ubuntu Server — Cài đặt và triển khai backend

Runbook tập trung vào một luồng thao tác: cài Ubuntu, truy cập an toàn, cấu hình router và DNS, chạy FastAPI với PostgreSQL, rồi đưa dịch vụ qua Nginx/HTTPS.

> **Phạm vi:** Tài liệu học tập với giá trị mẫu; chưa nghiệm thu trên một server thật. Thay user, IP, domain và mật khẩu bằng giá trị của môi trường của bạn. Giữ console hoặc một phiên truy cập dự phòng trước khi sửa SSH, mạng hay firewall.

**Cách đọc:** Bảng ngay sau mỗi khối lệnh giải thích executable, tùy chọn, đối số và giá trị cấu hình. `sudo` chạy lệnh kế tiếp với quyền quản trị; dấu nháy giữ các phần có khoảng trắng thành một đối số; `&&` nối lệnh theo điều kiện thành công; `|` chuyển output; `>` chuyển hướng output; `<<'TAG'` cấp nhiều dòng nguyên văn qua heredoc. `$NAME` là biến shell và `$(...)` chạy lệnh con. Các giá trị như `example.com`, `100.x.y.z` và `REPLACE_WITH_URL_ENCODED_PASSWORD` là placeholder cần thay trước khi chạy. Lệnh trong runbook là hướng dẫn, chưa phải bằng chứng đã chạy thành công trên server.

## 01. Cài Ubuntu Server

1. Boot từ ISO Ubuntu Server; xác nhận đúng ổ đĩa trước khi cài.
2. Dùng Ethernet/DHCP, tạo user thường có quyền sudo và bật OpenSSH trong installer.
3. Đăng nhập trực tiếp vào console sau khi cài.

~~~bash
sudo apt update
sudo apt install -y curl
sudo apt upgrade -y
sudo reboot
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `sudo apt update` | `sudo` chạy với quyền quản trị; `apt` quản lý gói Ubuntu; `update` tải lại danh mục phiên bản gói, chưa nâng cấp gói đã cài. |
| `sudo apt install -y curl` | `install` cài gói; `-y` tự xác nhận các câu hỏi cài đặt; `curl` là tên gói cần cài. |
| `sudo apt upgrade -y` | `upgrade` nâng các gói hiện có theo danh mục vừa cập nhật; `-y` tự xác nhận. |
| `sudo reboot` | Khởi động lại máy; thực hiện sau khi lưu công việc và bảo đảm có thể truy cập lại console hoặc mạng. |

Sau khi khởi động lại, kiểm tra OS, user và kết nối mạng:

~~~bash
cat /etc/os-release
hostnamectl
whoami && id
ip -br addr
ip -4 route show default
curl -I --max-time 10 https://ubuntu.com
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `cat /etc/os-release` | `cat` in nội dung file; `/etc/os-release` chứa tên và phiên bản hệ điều hành. |
| `hostnamectl` | Hiển thị hostname và thông tin hệ thống liên quan. |
| `whoami && id` | `whoami` in user hiện tại; `&&` chỉ chạy lệnh sau nếu lệnh trước thành công; `id` cho biết UID, GID và các group của user. |
| `ip -br addr` | `ip` xem cấu hình mạng; `-br` viết tắt của dạng ngắn gọn; `addr` liệt kê địa chỉ gắn trên các interface. |
| `ip -4 route show default` | `-4` giới hạn IPv4; `route show default` hiển thị tuyến mặc định và gateway. |
| `curl -I --max-time 10 https://ubuntu.com` | `-I` chỉ lấy HTTP headers; `--max-time 10` giới hạn tổng thời gian 10 giây; URL là máy chủ kiểm tra kết nối HTTPS outbound. |

**Đạt khi:** Có IPv4 LAN, default route và truy cập HTTPS outbound. Nếu thiếu IP hoặc gateway, xử lý DHCP/cáp/NIC trước khi đi tiếp.

Nguồn: [Ubuntu Server installation](https://ubuntu.com/server/docs/how-to/installation/).

## 02. Tailscale và SSH key

Cài Tailscale trên server, đăng nhập tailnet và lấy IP riêng:

~~~bash
curl -fsSL https://tailscale.com/install.sh | sh
sudo systemctl enable --now tailscaled
sudo tailscale up
tailscale status
tailscale ip -4
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `curl -fsSL https://tailscale.com/install.sh \| sh` | `-f` báo lỗi với HTTP status lỗi; `-sS` giảm output nhưng vẫn hiện lỗi; `-L` theo redirect; `\| sh` chuyển nội dung script cho shell chạy. Chỉ chạy installer từ nguồn chính thức đã kiểm tra. |
| `systemctl enable --now tailscaled` | `enable` bật tự khởi động; `--now` đồng thời khởi động ngay service; `tailscaled` là daemon Tailscale. |
| `tailscale up` | Kết nối máy vào tailnet; làm theo URL xác thực mà lệnh in ra. |
| `tailscale status` | Liệt kê trạng thái và peer nhìn thấy trong tailnet. |
| `tailscale ip -4` | In địa chỉ Tailscale IPv4 của máy để dùng làm `TS_IP`. |

Trên laptop đã cài Tailscale và vào cùng tailnet, tạo key riêng nếu chưa có rồi chép public key lên server:

~~~bash
LINUX_USER="ubuntu"       # thay bằng user sudo trên server
TS_IP="100.x.y.z"         # lấy từ tailscale ip -4

ssh-keygen -t ed25519 -a 64 -f ~/.ssh/id_ed25519_ubuntu_server -C "ubuntu-server-admin"
ssh-copy-id -i ~/.ssh/id_ed25519_ubuntu_server.pub "$LINUX_USER@$TS_IP"
ssh -i ~/.ssh/id_ed25519_ubuntu_server "$LINUX_USER@$TS_IP"
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `LINUX_USER="ubuntu"` | Gán tên user sudo trên Ubuntu; thay `ubuntu` bằng user đã tạo khi cài máy. |
| `TS_IP="100.x.y.z"` | Gán IPv4 Tailscale của server; thay bằng kết quả `tailscale ip -4`. |
| `ssh-keygen -t ed25519 -a 64 -f ~/.ssh/id_ed25519_ubuntu_server -C "ubuntu-server-admin"` | `-t ed25519` chọn loại key; `-a 64` đặt số vòng KDF bảo vệ private key; `-f` chọn đường dẫn lưu; `-C` thêm nhãn nhận diện key. Khi được hỏi, đặt passphrase cho private key nếu phù hợp. |
| `ssh-copy-id -i ~/.ssh/id_ed25519_ubuntu_server.pub "$LINUX_USER@$TS_IP"` | `-i` chọn public key `.pub`; đối số cuối ghép `user@IP` làm đích; công cụ thêm public key vào `authorized_keys` của user đó. |
| `ssh -i ~/.ssh/id_ed25519_ubuntu_server "$LINUX_USER@$TS_IP"` | `-i` chỉ private key tương ứng (không chia sẻ file này); `user@IP` là tài khoản và server đích để mở phiên SSH. |

Mở một terminal SSH mới để xác nhận key đăng nhập được; giữ Tailscale làm đường quản trị dự phòng. Không tắt xác thực hiện tại trước khi kiểm tra phiên mới.

Nguồn: [Tailscale for Linux](https://tailscale.com/docs/install/linux) · [OpenSSH trên Ubuntu](https://ubuntu.com/server/docs/how-to/security/openssh-server/).

## 03. Mở trang router admin bằng Chrome từ xa

Lấy gateway của mạng server. Dùng đúng địa chỉ hiển thị sau <code>default via</code>:

~~~bash
ip -4 route show default
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `ip -4 route show default` | `ip` truy vấn mạng; `-4` lọc IPv4; `route show default` in tuyến ra ngoài mặc định. Lấy địa chỉ ngay sau `default via` làm `ROUTER_IP`. |

Trên laptop, mở SOCKS tunnel tới server bằng Tailscale:

~~~bash
LINUX_USER="ubuntu"
TS_IP="100.x.y.z"
ROUTER_IP="192.168.1.1"   # thay bằng gateway thực tế

ssh -N -o ExitOnForwardFailure=yes -D 127.0.0.1:1080 "$LINUX_USER@$TS_IP"
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `LINUX_USER="ubuntu"` / `TS_IP="100.x.y.z"` | Tài khoản SSH và IP Tailscale của Ubuntu; thay bằng giá trị thực đã kiểm tra. |
| `ROUTER_IP="192.168.1.1"` | Gateway/router trong LAN; thay bằng IP sau `default via` ở bước trước. |
| `ssh -N -o ExitOnForwardFailure=yes -D 127.0.0.1:1080 "$LINUX_USER@$TS_IP"` | Kết nối SSH tới server qua Tailscale; `-N` không chạy shell/command từ xa mà chỉ giữ tunnel; `-o` đặt tùy chọn SSH; `-D` mở SOCKS proxy ở loopback cổng `1080`; đối số cuối là user và IP server. |
| `-o ExitOnForwardFailure=yes` | Thiết lập SSH: thoát ngay nếu không tạo được port forward, thay vì để tunnel tưởng như đang hoạt động. |
| `-D 127.0.0.1:1080` | Tạo SOCKS proxy động trên loopback của laptop, cổng `1080`; chỉ ứng dụng trên laptop truy cập được endpoint này. |
| `"$LINUX_USER@$TS_IP"` | Ghép user và địa chỉ server thành đích SSH; dấu nháy giữ biến thành một đối số. |

Giữ terminal trên mở. Trong terminal thứ hai trên laptop, mở Chrome qua tunnel:

~~~bash
google-chrome --user-data-dir=/tmp/chrome-router-admin --proxy-server="socks5://127.0.0.1:1080" --new-window "http://$ROUTER_IP"
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `google-chrome` | Khởi chạy Chrome trên laptop; tên executable có thể khác tùy bản phân phối. |
| `--user-data-dir=/tmp/chrome-router-admin` | Dùng profile tạm riêng để cấu hình proxy không ảnh hưởng profile cá nhân; thư mục được tạo khi Chrome chạy. |
| `--proxy-server="socks5://127.0.0.1:1080"` | Chuyển lưu lượng Chrome qua SOCKS5 tunnel đã mở trên loopback, cổng `1080`. |
| `--new-window` | Mở cửa sổ Chrome mới với profile và proxy vừa chỉ định. |
| `"http://$ROUTER_IP"` | URL trang quản trị router trong LAN; biến phải chứa đúng gateway. |

Đăng nhập router và cấu hình trên giao diện LAN. Không bật quản trị router từ WAN. Nếu router không dùng HTTP trong LAN, dùng đúng giao thức và địa chỉ mà router cung cấp.

## 04. DHCP Reservation, port forwarding và DNS TenTen

### Cố định IP LAN và mở đúng cổng

Trên server, tìm MAC của card Ethernet đang dùng:

~~~bash
ip -br link
ip -4 -br addr
sudo apt install -y dnsutils
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `ip -br link` | `link` liệt kê interface và trạng thái lớp liên kết; `-br` rút gọn output. Đối chiếu tên interface và MAC. |
| `ip -4 -br addr` | Liệt kê địa chỉ IPv4 trên từng interface ở dạng ngắn; giúp xác định IP LAN đang dùng. |
| `sudo apt install -y dnsutils` | Cài gói `dnsutils` có các công cụ truy vấn DNS như `dig`; `-y` xác nhận cài đặt. |

Trong router:

1. Tạo **DHCP Reservation** cho MAC Ethernet của server, ví dụ <code>192.168.1.50</code>.
2. Tạo port forwarding **TCP 80 → SERVER_LAN_IP:80** và **TCP 443 → SERVER_LAN_IP:443**.
3. Không forward cổng ứng dụng <code>8010</code> hoặc PostgreSQL <code>5432</code>.
4. Chỉ mở forward TCP 22 nếu đã hoàn tất bước SSH public tùy chọn bên dưới.

Kiểm tra WAN IPv4 trên router và đối chiếu với địa chỉ Internet nhìn thấy từ server:

~~~bash
curl -4 https://ifconfig.co
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `curl -4 https://ifconfig.co` | `curl` gửi HTTP request; `-4` buộc kết nối IPv4; URL trả về địa chỉ IP công khai mà dịch vụ bên ngoài nhìn thấy. So sánh với WAN IPv4 trong router. |

Nếu WAN trên router là private/shared IP hoặc không trùng IP bên ngoài, có thể đang sau double NAT/CGNAT. Port forwarding khi đó không đủ để nhận kết nối Internet; giữ quản trị qua Tailscale và dừng phần public cho đến khi có đường vào phù hợp.

### Tạo bản ghi DNS tại TenTen

Trước tiên kiểm tra nơi đang quản lý nameserver:

~~~bash
dig NS example.com +short
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `dig` | Công cụ gửi truy vấn DNS. |
| `NS` | Loại bản ghi được hỏi là nameserver có thẩm quyền của zone. |
| `example.com` | Tên miền mẫu; thay bằng domain đang cấu hình. |
| `+short` | Chỉ in phần trả lời ngắn gọn, bỏ phần header và thống kê. |

Nếu nameserver không trỏ tới TenTen, hãy tạo bản ghi ở nhà cung cấp DNS có thẩm quyền hiện tại. Trong giao diện TenTen, chọn thêm bản ghi riêng:

| Type | Host | Value | Ý nghĩa |
|---|---|---|---|
| `A` | `@` | WAN IPv4 công khai | Ánh xạ domain gốc tới IP public để phục vụ website. |
| `A` | `www` | WAN IPv4 công khai | Ánh xạ hostname `www` tới cùng IP. |
| `A` | `ssh` | WAN IPv4 công khai | Tùy chọn; chỉ tạo nếu bật SSH public ở bước 05. |

Không dùng nút **“Cấu hình theo IP”** cho zone đang có dữ liệu: hướng dẫn TenTen cảnh báo thao tác đó xóa các bản ghi cũ. Sau khi lưu, kiểm tra phân giải:

~~~bash
dig +short example.com
dig +short www.example.com
dig NS example.com +short
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `dig +short example.com` | Truy vấn bản ghi A mặc định cho domain gốc và chỉ in IP trả về. |
| `dig +short www.example.com` | Truy vấn IP của hostname `www` để xác nhận bản ghi đã cập nhật. |
| `dig NS example.com +short` | Truy vấn nameserver đang công bố; xác nhận DNS được chỉnh tại nhà cung cấp có thẩm quyền. |

Thay <code>example.com</code> và IP mẫu bằng domain cùng WAN IPv4 thực tế. Host <code>@</code> là domain gốc; nếu giao diện TenTen dùng cách ghi khác, chọn đúng mục domain gốc. Nguồn: [Cấu hình DNS tại TenTen](https://help.tenten.vn/huong-dan-cau-hinh-dns-tai-tenten/) · [Kiểm tra DNS và nameserver](https://help.tenten.vn/huong-dan-kiem-tra-dns-va-ns-cua-ten-mien/).

## 05. SSH qua DNS/IP public (tùy chọn)

Tailscale vẫn là đường quản trị chính. Chỉ bật SSH public khi SSH key đã hoạt động qua Tailscale, WAN có IPv4 public trực tiếp và bạn chấp nhận mở cổng quản trị ra Internet.

Trên server, đặt cấu hình SSH ưu tiên xác thực bằng key:

~~~bash
sudo tee /etc/ssh/sshd_config.d/00-portfolio.conf >/dev/null <<'SSH'
PermitRootLogin no
PasswordAuthentication no
KbdInteractiveAuthentication no
PubkeyAuthentication yes
SSH

sudo sshd -t
sudo sshd -T | grep -E '^(permitrootlogin|passwordauthentication|kbdinteractiveauthentication|pubkeyauthentication) '
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `sudo tee /etc/ssh/sshd_config.d/00-portfolio.conf` | `tee` ghi nội dung nhận từ stdin vào file cấu hình SSH; file nằm trong thư mục cấu hình bổ sung. |
| `>/dev/null` | Chuyển output mà `tee` thường in ra vào `/dev/null`; nội dung vẫn được ghi vào file đích. |
| `<<'SSH'` và dòng `SSH` cuối | Heredoc cấp nhiều dòng cho `tee`; dấu nháy quanh dấu kết thúc ngăn shell nội suy biến hoặc ký tự trong nội dung. |
| `PermitRootLogin no` | Không cho phép tài khoản `root` đăng nhập SSH trực tiếp. |
| `PasswordAuthentication no` | Tắt xác thực SSH bằng mật khẩu. |
| `KbdInteractiveAuthentication no` | Tắt xác thực tương tác qua keyboard/PAM trong SSH. |
| `PubkeyAuthentication yes` | Cho phép xác thực bằng public key. |
| `sudo sshd -t` | `sshd` là OpenSSH daemon; `-t` kiểm tra cú pháp cấu hình và thoát với lỗi nếu không hợp lệ. |
| `sudo sshd -T` | `-T` in cấu hình SSH hiệu lực sau khi đọc file và áp dụng mặc định. |
| `\| grep -E '^(...) '` | Pipe chuyển cấu hình sang `grep`; `-E` bật regex mở rộng; mẫu neo `^` lọc đúng bốn khóa và dấu cách sau tên khóa. |

Chỉ reload nếu lệnh kiểm tra hiển thị cấu hình mong muốn:

~~~bash
sudo systemctl reload ssh
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `systemctl reload ssh` | `systemctl` quản lý unit; `reload` yêu cầu nạp cấu hình lại; `ssh` là tên service OpenSSH trên Ubuntu. Chỉ chạy sau khi `sshd -t` thành công và đã xác nhận session key mới. |

Trong router, forward **TCP 22 → SERVER_LAN_IP:22**. Tạo A record <code>ssh</code> tại TenTen như bước 04, rồi từ laptop ở mạng ngoài kiểm tra trong terminal mới:

~~~bash
LINUX_USER="ubuntu"
ssh -i ~/.ssh/id_ed25519_ubuntu_server "$LINUX_USER@ssh.example.com"
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `LINUX_USER="ubuntu"` | User sudo trên server; thay bằng user thật. |
| `ssh` | Mở phiên SSH từ laptop đang ở mạng ngoài tới domain public. |
| `-i ~/.ssh/id_ed25519_ubuntu_server` | Chọn private key đã cài public key ở bước 02; không đưa file private key lên server. |
| `"$LINUX_USER@ssh.example.com"` | Đích SSH gồm user và hostname `ssh`; thay domain mẫu bằng domain của bạn. |

Không đóng phiên Tailscale đang hoạt động cho đến khi SSH public đã được xác nhận. Nếu không có public IPv4 trực tiếp hoặc kết nối mới thất bại, bỏ forward cổng 22 và tiếp tục dùng Tailscale.

## 06. Chuẩn bị môi trường Python

Ví dụ dùng thư mục riêng cho một FastAPI demo:

~~~bash
sudo apt install -y python3-venv python3-pip
sudo install -d -o root -g root -m 0755 /opt/portfolio-api
sudo python3 -m venv /opt/portfolio-api/.venv
sudo /opt/portfolio-api/.venv/bin/pip install --upgrade pip
sudo /opt/portfolio-api/.venv/bin/pip install fastapi 'uvicorn[standard]' 'psycopg[binary]'
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `apt install -y python3-venv python3-pip` | Cài module tạo virtual environment và trình cài package Python; `-y` xác nhận. |
| `install -d -o root -g root -m 0755 /opt/portfolio-api` | `install -d` tạo thư mục; `-o` đặt chủ sở hữu, `-g` đặt group, `-m` đặt quyền đọc/ghi/chạy; đường dẫn là nơi đặt app. |
| `python3 -m venv /opt/portfolio-api/.venv` | Chạy module `venv` để tạo môi trường package Python riêng trong `.venv`. |
| `.venv/bin/pip install --upgrade pip` | Dùng đúng pip trong virtualenv; `--upgrade` nâng pip trong môi trường đó. |
| `.venv/bin/pip install fastapi 'uvicorn[standard]' 'psycopg[binary]'` | Cài framework FastAPI, Uvicorn cùng nhóm phụ thuộc `standard`, và driver Psycopg cùng extra binary; dấu nháy ngăn shell diễn giải ngoặc vuông. |

Giữ source và virtual environment thuộc <code>root</code>; service account ở bước 08 chỉ cần quyền đọc/chạy. Không lưu file env hoặc password trong Git.

## 07. Cài PostgreSQL cho FastAPI demo

Cài DB, tạo role riêng bằng prompt tương tác và tạo database:

~~~bash
sudo apt install -y postgresql
sudo systemctl enable --now postgresql
sudo -u postgres createuser --pwprompt portfolio_api
sudo -u postgres createdb --owner=portfolio_api portfolio_db
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `apt install -y postgresql` | Cài PostgreSQL server và công cụ quản trị; `-y` xác nhận. |
| `systemctl enable --now postgresql` | Bật service khi boot và khởi động ngay. |
| `sudo -u postgres createuser --pwprompt portfolio_api` | Chạy dưới role hệ điều hành `postgres`; `createuser` tạo role DB; `--pwprompt` hỏi password tương tác; `portfolio_api` là tên role. |
| `sudo -u postgres createdb --owner=portfolio_api portfolio_db` | `createdb` tạo database; `--owner` gán owner là role ứng dụng; `portfolio_db` là tên database. |

Giữ PostgreSQL chỉ nghe trên loopback:

~~~bash
sudo -u postgres psql -c "ALTER SYSTEM SET listen_addresses = 'localhost';"
sudo systemctl restart postgresql
sudo pg_isready
sudo -u postgres psql -Atc "SHOW listen_addresses;"
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `sudo -u postgres psql -c "ALTER SYSTEM ..."` | Mở `psql` dưới OS user `postgres`; `-c` chạy SQL được truyền trong dấu nháy; câu SQL lưu `listen_addresses=localhost` vào cấu hình hệ thống. |
| `systemctl restart postgresql` | Khởi động lại PostgreSQL để áp dụng thay đổi listener. |
| `pg_isready` | Kiểm tra PostgreSQL có chấp nhận kết nối hay chưa. |
| `psql -Atc "SHOW listen_addresses;"` | `-A` xuất dạng không căn cột; `-t` bỏ header/footer; `-c` chạy câu SQL chỉ đọc giá trị listener hiện hành. |

Tạo file cấu hình chỉ root đọc được; dùng <code>sudoedit</code> để nhập URL và password đã URL-encode nếu có ký tự đặc biệt:

~~~bash
sudo install -d -o root -g root -m 0750 /etc/portfolio-api
sudo install -o root -g root -m 0600 /dev/null /etc/portfolio-api/backend.env
sudoedit /etc/portfolio-api/backend.env
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `install -d -o root -g root -m 0750 /etc/portfolio-api` | Tạo thư mục env; owner/group là root; mode `0750` cho root toàn quyền và group đọc/truy cập. |
| `install -o root -g root -m 0600 /dev/null /etc/portfolio-api/backend.env` | Tạo file rỗng từ `/dev/null`; owner root; mode `0600` chỉ root đọc/ghi, bảo vệ password DB. |
| `sudoedit /etc/portfolio-api/backend.env` | Mở editor qua cơ chế an toàn của `sudo` để nhập nội dung file với quyền quản trị. |

Nội dung file:

~~~dotenv
DATABASE_URL=postgresql://portfolio_api:REPLACE_WITH_URL_ENCODED_PASSWORD@127.0.0.1:5432/portfolio_db
~~~

| Thành phần | Giải thích |
|---|---|
| `DATABASE_URL=` | Tên biến môi trường mà ứng dụng đọc để kết nối database. |
| `postgresql://` | Scheme báo đây là URI kết nối PostgreSQL. |
| `portfolio_api:` | Tên role DB; dấu `:` phân cách role và password. |
| `REPLACE_WITH_URL_ENCODED_PASSWORD` | Placeholder password; thay bằng password thật đã URL-encode, không commit hoặc chia sẻ file này. |
| `@127.0.0.1` | Host là loopback; DB chỉ được truy cập từ chính server. |
| `:5432/portfolio_db` | Cổng PostgreSQL mặc định `5432` và tên database đích. |

Không NAT cổng 5432 ra Internet. Nguồn: [PostgreSQL createuser](https://www.postgresql.org/docs/current/app-createuser.html) · [PostgreSQL pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html).

## 08. Tạo service account và chạy FastAPI bằng systemd

Tạo user hệ thống không cho đăng nhập shell:

~~~bash
sudo useradd --system --user-group --no-create-home --home-dir /nonexistent --shell /usr/sbin/nologin portfolio-api
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `useradd` | Tạo tài khoản hệ điều hành cho service. |
| `--system` | Tạo system account với UID thuộc dải dành cho tài khoản dịch vụ. |
| `--user-group` | Tạo group cùng tên và đặt làm group chính. |
| `--no-create-home --home-dir /nonexistent` | Không tạo thư mục home thật và đặt home trỏ vào đường dẫn không tồn tại. |
| `--shell /usr/sbin/nologin` | Không cho tài khoản mở shell tương tác. |
| `portfolio-api` | Tên user/group mà unit systemd sẽ dùng để chạy ứng dụng. |

Tạo demo có liveness và kiểm tra kết nối DB khi readiness:

~~~bash
sudo tee /opt/portfolio-api/main.py >/dev/null <<'PY'
import os

import psycopg
from fastapi import FastAPI, HTTPException

app = FastAPI()


@app.get("/health/live")
def health_live():
    return {"status": "ok"}


@app.get("/health/ready")
def health_ready():
    try:
        with psycopg.connect(os.environ["DATABASE_URL"], connect_timeout=3) as connection:
            connection.execute("SELECT 1").fetchone()
    except Exception:
        raise HTTPException(status_code=503, detail="database unavailable") from None
    return {"status": "ready"}
PY

sudo chown root:root /opt/portfolio-api/main.py
sudo chmod 0644 /opt/portfolio-api/main.py
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `tee /opt/portfolio-api/main.py >/dev/null <<'PY'` | Ghi nội dung heredoc vào file Python; `>/dev/null` bỏ output echo của `tee`; `'PY'` ngăn shell nội suy nội dung. |
| `import os` | Nạp API môi trường của Python để lấy biến môi trường. |
| `import psycopg` | Nạp PostgreSQL driver đã cài trong virtualenv. |
| `from fastapi import FastAPI, HTTPException` | Nạp lớp tạo ứng dụng và ngoại lệ HTTP dùng khi readiness lỗi. |
| `app = FastAPI()` | Tạo đối tượng ASGI mà Uvicorn sẽ tải theo tên `main:app`. |
| `@app.get("/health/live")` và `health_live` | Đăng ký GET endpoint liveness; endpoint trả JSON `status=ok`, không phụ thuộc DB. |
| `@app.get("/health/ready")` và `health_ready` | Đăng ký GET endpoint readiness để kiểm tra ứng dụng có dùng được database không. |
| `os.environ["DATABASE_URL"]` | Đọc URI DB từ environment; nếu biến thiếu, ứng dụng sẽ vào nhánh lỗi. |
| `with psycopg.connect(... ) as connection` | Mở kết nối PostgreSQL; context manager đóng kết nối khi thoát khỏi khối `with`. |
| `connect_timeout=3` | Giới hạn thời gian chờ kết nối DB tối đa 3 giây. |
| `connection.execute("SELECT 1").fetchone()` | Gửi truy vấn không thay đổi dữ liệu để xác nhận DB phản hồi và đọc một hàng kết quả. |
| `except Exception` → `HTTPException(status_code=503, detail=...) from None` | Nếu kết nối/truy vấn lỗi, trả HTTP 503 với thông báo tổng quát; `from None` ẩn chuỗi ngoại lệ gốc khỏi traceback gắn với lỗi này. |
| `return {"status": "ready"}` | Chỉ trả trạng thái sẵn sàng sau khi truy vấn DB thành công. |
| `chown root:root .../main.py` | Đặt owner và group của source thành root. |
| `chmod 0644 .../main.py` | Đặt quyền đọc cho mọi user và chỉ root được ghi; service account đọc được source. |

Tạo unit systemd chạy dưới service account, bind loopback và bật tự khởi động:

~~~bash
sudo tee /etc/systemd/system/portfolio-api.service >/dev/null <<'UNIT'
[Unit]
Description=Portfolio FastAPI demo
After=network.target postgresql.service
Wants=postgresql.service

[Service]
Type=simple
User=portfolio-api
Group=portfolio-api
WorkingDirectory=/opt/portfolio-api
EnvironmentFile=/etc/portfolio-api/backend.env
ExecStart=/opt/portfolio-api/.venv/bin/uvicorn main:app --host 127.0.0.1 --port 8010
Restart=on-failure
RestartSec=3
NoNewPrivileges=true
PrivateTmp=true
ProtectSystem=strict
ProtectHome=true

[Install]
WantedBy=multi-user.target
UNIT

sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-api
sudo systemctl status portfolio-api --no-pager
curl -i http://127.0.0.1:8010/health/live
curl -i http://127.0.0.1:8010/health/ready
~~~

| Lệnh / cấu hình | Giải thích |
|---|---|
| `tee /etc/systemd/system/portfolio-api.service >/dev/null <<'UNIT'` | Ghi unit file; heredoc kết thúc tại `UNIT`; nội dung được lưu nguyên văn và output của `tee` bị bỏ. |
| `[Unit]` | Bắt đầu phần metadata và quan hệ khởi động. |
| `Description=...` | Tên dễ đọc hiển thị trong công cụ quản lý service. |
| `After=network.target postgresql.service` | Sắp thứ tự khởi động sau network target và PostgreSQL; chỉ định thứ tự, không tự kéo dependency vào. |
| `Wants=postgresql.service` | Yêu cầu khởi động PostgreSQL cùng unit nhưng mức phụ thuộc mềm. |
| `[Service]` / `Type=simple` | Phần cấu hình tiến trình; `simple` nghĩa tiến trình `ExecStart` chính là service. |
| `User=` / `Group=` | Chạy service dưới user/group hạn chế quyền đã tạo ở bước này. |
| `WorkingDirectory=/opt/portfolio-api` | Đặt thư mục làm việc cho tiến trình. |
| `EnvironmentFile=.../backend.env` | Nạp biến môi trường từ file chứa URI và password DB. |
| `ExecStart=.../uvicorn main:app --host 127.0.0.1 --port 8010` | Chạy Uvicorn trong venv; `main:app` trỏ tới đối tượng ứng dụng; `--host 127.0.0.1` chỉ bind loopback; `--port 8010` chọn cổng nội bộ. |
| `Restart=on-failure` / `RestartSec=3` | Tự khởi động lại khi tiến trình lỗi, chờ 3 giây trước lần thử tiếp theo. |
| `NoNewPrivileges=true` | Ngăn tiến trình nâng thêm quyền qua exec. |
| `PrivateTmp=true` | Cấp `/tmp` riêng cho service. |
| `ProtectSystem=strict` | Gắn phần lớn filesystem hệ thống ở chế độ chỉ đọc trong sandbox service. |
| `ProtectHome=true` | Hạn chế service truy cập các thư mục home. |
| `[Install]` / `WantedBy=multi-user.target` | Cho phép `enable` service để khởi động cùng target hệ thống đa người dùng. |
| `systemctl daemon-reload` | Đọc lại unit file sau khi tạo/sửa. |
| `systemctl enable --now portfolio-api` | Bật tự khởi động và khởi động service ngay. |
| `systemctl status ... --no-pager` | Hiển thị trạng thái một lần; `--no-pager` không mở trình xem phân trang. |
| `curl -i http://127.0.0.1:8010/health/...` | Gọi endpoint qua loopback; `-i` in cả HTTP status/headers lẫn body để kiểm tra liveness/readiness. |
| `sudo journalctl -u portfolio-api -n 50 --no-pager` | Lệnh log được nhắc trong phần xử lý lỗi; `-u` chọn unit, `-n 50` lấy 50 dòng gần nhất, `--no-pager` in trực tiếp. |

Nếu readiness trả <code>503</code>, kiểm tra file env, role/password và PostgreSQL trước khi đi tiếp. Xem log bằng <code>sudo journalctl -u portfolio-api -n 50 --no-pager</code>.

Nguồn: [FastAPI: chạy ứng dụng server](https://fastapi.tiangolo.com/deployment/manually/) · [systemd service unit](https://www.freedesktop.org/software/systemd/man/latest/systemd.service.html).

## 09. Nginx, firewall và HTTPS

Tạo web root rồi chép bản build tĩnh từ laptop. Chạy lệnh thứ hai từ thư mục dự án, thay <code>dist/</code> nếu framework xuất build ở đường dẫn khác:

~~~bash
# [SERVER]
sudo install -d -o root -g root -m 0755 /var/www/portfolio

# [LAPTOP — tại thư mục dự án]
LINUX_USER="ubuntu"
TS_IP="100.x.y.z"
npm run build
ssh "$LINUX_USER@$TS_IP" 'mkdir -p /tmp/portfolio-dist'
scp -r ./dist/. "$LINUX_USER@$TS_IP:/tmp/portfolio-dist/"

# [SERVER]
sudo cp -a /tmp/portfolio-dist/. /var/www/portfolio/
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `# [SERVER]` / `# [LAPTOP — tại thư mục dự án]` | Chú thích vị trí thực thi; các dòng laptop phải chạy từ máy phát triển, các dòng server chạy trên Ubuntu. |
| `install -d -o root -g root -m 0755 /var/www/portfolio` | Trên server, tạo web root thuộc root với quyền thư mục `0755`. |
| `LINUX_USER` / `TS_IP` | User và IP Tailscale của server đích; thay bằng giá trị thực. |
| `npm run build` | Trên laptop, chạy script `build` của dự án để sinh thư mục artifact tĩnh. |
| `ssh "$LINUX_USER@$TS_IP" 'mkdir -p /tmp/portfolio-dist'` | Chạy từ xa lệnh `mkdir` qua SSH; `-p` tạo thư mục trung gian nếu cần và không lỗi nếu đã tồn tại. |
| `scp -r ./dist/. "$LINUX_USER@$TS_IP:/tmp/portfolio-dist/"` | Sao chép đệ quy nội dung `dist` (kể cả file ẩn nhờ `/.`) tới thư mục tạm trên server. |
| `cp -a /tmp/portfolio-dist/. /var/www/portfolio/` | Trên server, sao chép toàn bộ artifact và giữ thuộc tính file cơ bản; nguồn là thư mục tạm, đích là web root. |

Tạo vhost phục vụ website tĩnh ở <code>/</code> và chuyển request <code>/api/</code> tới FastAPI. Dấu slash cuối của <code>proxy_pass</code> bỏ tiền tố <code>/api/</code>, nên <code>/api/health/live</code> tới backend thành <code>/health/live</code>:

~~~bash
sudo apt install -y nginx

sudo tee /etc/nginx/sites-available/portfolio.conf >/dev/null <<'NGINX'
server {
    listen 80;
    server_name example.com www.example.com;

    root /var/www/portfolio;
    index index.html;

    location /api/ {
        proxy_pass http://127.0.0.1:8010/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
NGINX

sudo ln -s /etc/nginx/sites-available/portfolio.conf /etc/nginx/sites-enabled/portfolio.conf
sudo nginx -t
sudo systemctl enable --now nginx
sudo systemctl reload nginx
~~~

| Lệnh / cấu hình | Giải thích |
|---|---|
| `apt install -y nginx` | Cài web server Nginx; `-y` xác nhận. |
| `tee /etc/nginx/sites-available/portfolio.conf >/dev/null <<'NGINX'` | Ghi cấu hình vhost; heredoc kết thúc bằng `NGINX`; output của `tee` bị bỏ. |
| `server { ... }` | Khối virtual server xử lý request khớp cổng và hostname. |
| `listen 80;` | Nhận HTTP trên cổng 80. |
| `server_name example.com www.example.com;` | Khai báo các hostname áp dụng; thay bằng domain có DNS trỏ tới server. |
| `root /var/www/portfolio;` / `index index.html;` | Đặt thư mục file tĩnh và file index mặc định. |
| `location /api/` | Chọn các URL bắt đầu `/api/` để chuyển tới ứng dụng backend. |
| `proxy_pass http://127.0.0.1:8010/;` | Chuyển request tới FastAPI trên loopback; dấu `/` cuối khiến Nginx bỏ prefix `/api/` khi tạo URI backend. |
| `proxy_set_header Host $host;` | Gửi hostname gốc trong header `Host`. |
| `X-Real-IP $remote_addr` | Gửi địa chỉ client mà Nginx nhận được. |
| `X-Forwarded-For $proxy_add_x_forwarded_for` | Giữ/ghi chuỗi IP proxy để backend biết nguồn request qua proxy. |
| `X-Forwarded-Proto $scheme` | Truyền scheme phía Nginx (`http` hoặc `https`) cho backend. |
| `location /` / `try_files $uri $uri/ /index.html;` | Phục vụ file/thư mục tĩnh tồn tại; nếu không tìm thấy, trả `index.html` cho client-side routing. |
| `ln -s ...sites-available/... ...sites-enabled/...` | Tạo symbolic link để kích hoạt vhost; nguồn là file cấu hình, đích nằm trong thư mục enabled. |
| `nginx -t` | Kiểm tra cú pháp và khả năng mở cấu hình trước khi reload. |
| `systemctl enable --now nginx` | Bật Nginx cùng hệ thống và khởi động ngay. |
| `systemctl reload nginx` | Nạp cấu hình mới mà không chủ động dừng worker đang phục vụ. |

Đổi <code>example.com</code> thành domain có A record trỏ đúng WAN IP. Kiểm tra website và API trên server:

~~~bash
curl -I -H 'Host: example.com' http://127.0.0.1/
curl -i -H 'Host: example.com' http://127.0.0.1/api/health/live
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `curl -I ... http://127.0.0.1/` | Gửi HEAD tới Nginx trên loopback; `-I` chỉ in headers để xem HTTP status và vhost/file index. |
| `curl -i ... /api/health/live` | `-i` in status, headers và body; đường dẫn `/api/` xác nhận proxy tới backend. |
| `-H 'Host: example.com'` | Gửi Host header giả lập domain thật để Nginx chọn đúng `server_name`. |
| `127.0.0.1` | Kiểm tra ngay trên server, không chứng minh router/NAT/DNS từ Internet đã hoạt động. |

Sau khi DNS và NAT hoạt động, kiểm tra từ mạng ngoài:

~~~bash
curl -I http://example.com/
curl -i http://example.com/api/health/live
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `curl -I http://example.com/` | Kiểm tra response headers của trang HTTP domain từ mạng ngoài; `-I` chỉ dùng HEAD. |
| `curl -i http://example.com/api/health/live` | Gọi API qua domain public; `-i` giúp xem status/headers/body và xác nhận đường proxy ngoài LAN. |
| `example.com` và `/api/health/live` | Thay domain mẫu; endpoint phải khớp route FastAPI đã khai báo. |

Trên server mới, chuẩn bị firewall trước khi bật; giữ rule SSH qua Tailscale. Chỉ thêm rule 22 public nếu chọn bước 05:

~~~bash
sudo ufw allow in on tailscale0 to any port 22 proto tcp
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
# Chỉ khi bật SSH public: sudo ufw limit 22/tcp
sudo ufw default deny incoming
sudo ufw default allow outgoing
sudo ufw status verbose
sudo ufw enable
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `ufw allow in on tailscale0 to any port 22 proto tcp` | Cho phép kết nối SSH TCP vào qua interface Tailscale; giữ đường quản trị riêng. |
| `ufw allow 80/tcp` / `443/tcp` | Cho phép HTTP và HTTPS TCP từ Internet tới Nginx. |
| `ufw limit 22/tcp` | Rule tùy chọn: giới hạn tần suất kết nối SSH public TCP 22; chỉ dùng nếu đã chọn SSH public. |
| `ufw default deny incoming` | Mặc định từ chối kết nối đến chưa có rule cho phép. |
| `ufw default allow outgoing` | Mặc định cho phép kết nối đi từ server. |
| `ufw status verbose` | Hiển thị trạng thái, policy mặc định và rule hiện có. |
| `sudo ufw status numbered` | Hiển thị rule hiện có kèm số thứ tự; dùng để tra cứu trước khi sửa/xóa rule. |
| `ufw enable` | Bật firewall; có thể làm mất truy cập nếu thiếu rule đúng, nên xác nhận rule Tailscale/console trước. |

Nếu UFW đang hoạt động hoặc server có rule sẵn, đọc <code>sudo ufw status numbered</code> trước khi sửa policy. Giữ console/phiên dự phòng trong lúc bật firewall. Nguồn: [Ubuntu firewall](https://ubuntu.com/server/docs/how-to/security/firewalls/).

Cấp HTTPS sau khi DNS và kết nối HTTP từ Internet đã hoạt động:

~~~bash
sudo apt install -y snapd
sudo snap install --classic certbot
sudo /snap/bin/certbot --nginx -d example.com -d www.example.com --redirect
sudo nginx -t
sudo /snap/bin/certbot renew --dry-run
curl -Iv https://example.com/
curl -i https://example.com/api/health/live
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `apt install -y snapd` | Cài Snap package manager cần cho cách cài Certbot bên dưới. |
| `snap install --classic certbot` | Cài gói Certbot ở chế độ classic; quyền classic rộng hơn sandbox Snap thông thường. |
| `certbot --nginx -d example.com -d www.example.com --redirect` | Dùng plugin Nginx để lấy và cấu hình chứng chỉ; mỗi `-d` thêm một hostname; `--redirect` thiết lập chuyển HTTP sang HTTPS. Thay domain trước khi chạy. |
| `nginx -t` | Kiểm tra cấu hình Nginx sau khi Certbot chỉnh sửa. |
| `certbot renew --dry-run` | Mô phỏng quy trình gia hạn chứng chỉ, không dùng để khẳng định cron/timer sản xuất ngoài lần kiểm tra này. |
| `curl -Iv https://example.com/` | `-I` chỉ lấy headers; `-v` in chi tiết bắt tay/kết nối TLS để chẩn đoán. |
| `curl -i https://example.com/api/health/live` | Kiểm tra endpoint API qua HTTPS, bao gồm status và body. |

Thay domain trước khi chạy Certbot. Nếu domain chưa phân giải đúng hoặc router/ISP chưa cho kết nối vào TCP 80, bước cấp chứng chỉ sẽ không hoàn tất. Nguồn: [Certbot với Nginx](https://certbot.eff.org/instructions?os=snap&ws=nginx) · [NGINX reverse proxy](https://nginx.org/en/docs/http/ngx_http_proxy_module.html).

## 10. Kiểm tra và backup

Chạy các lệnh sau để khoanh vùng lỗi theo service, listener, HTTP và DB:

~~~bash
sudo systemctl --failed
sudo systemctl status tailscaled ssh postgresql portfolio-api nginx --no-pager
sudo journalctl -u portfolio-api -n 80 --no-pager
sudo nginx -t
sudo ss -lntp
sudo ufw status verbose
sudo pg_isready
curl -i http://127.0.0.1:8010/health/live
curl -i http://127.0.0.1:8010/health/ready
dig +short example.com
curl -I https://example.com/
curl -i https://example.com/api/health/live
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `systemctl --failed` | Liệt kê unit đang ở trạng thái failed. |
| `systemctl status tailscaled ssh postgresql portfolio-api nginx --no-pager` | Xem trạng thái từng service hạ tầng/app; `--no-pager` in thẳng vào terminal. |
| `journalctl -u portfolio-api -n 80 --no-pager` | Đọc log của unit app; `-u` chọn unit, `-n 80` lấy 80 dòng gần nhất. |
| `nginx -t` | Kiểm tra cú pháp Nginx hiện tại. |
| `ss -lntp` | Liệt kê socket TCP đang listen; `-l` chỉ listener, `-n` giữ địa chỉ/cổng dạng số, `-t` TCP, `-p` tiến trình sở hữu nếu có quyền. |
| `ufw status verbose` | Kiểm tra firewall và các rule/policy. |
| `pg_isready` | Kiểm tra PostgreSQL đang chấp nhận kết nối. |
| `curl -i http://127.0.0.1:8010/health/live` / `/health/ready` | Kiểm tra trực tiếp app trên loopback; readiness còn yêu cầu DB truy vấn thành công. |
| `dig +short example.com` | Xem IP domain phân giải hiện tại từ resolver được máy sử dụng. |
| `curl -I https://example.com/` | Kiểm tra HTTP status/headers qua HTTPS. |
| `curl -i https://example.com/api/health/live` | Kiểm tra luồng công khai Nginx → FastAPI qua HTTPS. |

Tạo một bản dump PostgreSQL có timestamp và kiểm tra nội dung archive:

~~~bash
sudo install -d -o postgres -g postgres -m 0700 /var/backups/portfolio-api
BACKUP="/var/backups/portfolio-api/portfolio_db_$(date +%F_%H%M).dump"
sudo -u postgres pg_dump -Fc -f "$BACKUP" portfolio_db
sudo -u postgres pg_restore --list "$BACKUP"
~~~

| Lệnh / thành phần | Giải thích |
|---|---|
| `install -d -o postgres -g postgres -m 0700 /var/backups/portfolio-api` | Tạo thư mục backup thuộc user/group PostgreSQL; `0700` chỉ owner truy cập để bảo vệ dữ liệu. |
| `BACKUP="...$(date +%F_%H%M).dump"` | Tạo tên file có timestamp; `$(...)` chạy lệnh con, `%F` là ngày `YYYY-MM-DD`, `%H%M` là giờ/phút. |
| `sudo -u postgres pg_dump -Fc -f "$BACKUP" portfolio_db` | Chạy dump dưới OS user `postgres`; `-F c` tạo custom archive; `-f` chỉ định file đầu ra; `portfolio_db` là database nguồn. |
| `sudo -u postgres pg_restore --list "$BACKUP"` | Liệt kê mục trong archive để kiểm tra file đọc được; `--list` chưa restore dữ liệu. |

Thử restore vào database thử nghiệm riêng trước khi dựa vào backup. Dump này chỉ gồm database được chọn; cần lưu bản sao ở nơi khác và kiểm tra restore theo lịch.

**Kết quả cần tự xác nhận:** SSH qua Tailscale; DNS A đúng; HTTP/HTTPS từ mạng ngoài; FastAPI chạy dưới <code>portfolio-api</code>; PostgreSQL không public; unit được bật cùng hệ thống; backup đọc được. Runbook không ghi nhận các phép thử trên là kết quả đã đạt.

## Nguồn chính

- [Ubuntu Server](https://ubuntu.com/server/docs/)
- [Tailscale Linux install](https://tailscale.com/docs/install/linux)
- [TenTen: cấu hình DNS](https://help.tenten.vn/huong-dan-cau-hinh-dns-tai-tenten/)
- [PostgreSQL documentation](https://www.postgresql.org/docs/current/)
- [FastAPI deployment](https://fastapi.tiangolo.com/deployment/)
- [Nginx documentation](https://nginx.org/en/docs/)
- [Certbot instructions](https://certbot.eff.org/instructions?os=snap&ws=nginx)
