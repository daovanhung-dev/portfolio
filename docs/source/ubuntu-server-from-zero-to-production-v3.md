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

Sau khi khởi động lại, kiểm tra OS, user và kết nối mạng:

~~~bash
cat /etc/os-release
hostnamectl
whoami && id
ip -br addr
ip -4 route show default
curl -I --max-time 10 https://ubuntu.com
~~~

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

Trên laptop đã cài Tailscale và vào cùng tailnet, tạo key riêng nếu chưa có rồi chép public key lên server:

~~~bash
LINUX_USER="ubuntu"       # thay bằng user sudo trên server
TS_IP="100.x.y.z"         # lấy từ tailscale ip -4

ssh-keygen -t ed25519 -a 64 -f ~/.ssh/id_ed25519_ubuntu_server -C "ubuntu-server-admin"
ssh-copy-id -i ~/.ssh/id_ed25519_ubuntu_server.pub "$LINUX_USER@$TS_IP"
ssh -i ~/.ssh/id_ed25519_ubuntu_server "$LINUX_USER@$TS_IP"
~~~

Mở một terminal SSH mới để xác nhận key đăng nhập được; giữ Tailscale làm đường quản trị dự phòng. Không tắt xác thực hiện tại trước khi kiểm tra phiên mới.

Nguồn: [Tailscale for Linux](https://tailscale.com/docs/install/linux) · [OpenSSH trên Ubuntu](https://ubuntu.com/server/docs/how-to/security/openssh-server/).

## 03. Mở trang router admin bằng Chrome từ xa

Lấy gateway của mạng server. Dùng đúng địa chỉ hiển thị sau <code>default via</code>:

~~~bash
ip -4 route show default
~~~

Trên laptop, mở SOCKS tunnel tới server bằng Tailscale:

~~~bash
LINUX_USER="ubuntu"
TS_IP="100.x.y.z"
ROUTER_IP="192.168.1.1"   # thay bằng gateway thực tế

ssh -N -o ExitOnForwardFailure=yes -D 127.0.0.1:1080 "$LINUX_USER@$TS_IP"
~~~

Giữ terminal trên mở. Trong terminal thứ hai trên laptop, mở Chrome qua tunnel:

~~~bash
google-chrome --user-data-dir=/tmp/chrome-router-admin --proxy-server="socks5://127.0.0.1:1080" --new-window "http://$ROUTER_IP"
~~~

Đăng nhập router và cấu hình trên giao diện LAN. Không bật quản trị router từ WAN. Nếu router không dùng HTTP trong LAN, dùng đúng giao thức và địa chỉ mà router cung cấp.

## 04. DHCP Reservation, port forwarding và DNS TenTen

### Cố định IP LAN và mở đúng cổng

Trên server, tìm MAC của card Ethernet đang dùng:

~~~bash
ip -br link
ip -4 -br addr
sudo apt install -y dnsutils
~~~

Trong router:

1. Tạo **DHCP Reservation** cho MAC Ethernet của server, ví dụ <code>192.168.1.50</code>.
2. Tạo port forwarding **TCP 80 → SERVER_LAN_IP:80** và **TCP 443 → SERVER_LAN_IP:443**.
3. Không forward cổng ứng dụng <code>8010</code> hoặc PostgreSQL <code>5432</code>.
4. Chỉ mở forward TCP 22 nếu đã hoàn tất bước SSH public tùy chọn bên dưới.

Kiểm tra WAN IPv4 trên router và đối chiếu với địa chỉ Internet nhìn thấy từ server:

~~~bash
curl -4 https://ifconfig.co
~~~

Nếu WAN trên router là private/shared IP hoặc không trùng IP bên ngoài, có thể đang sau double NAT/CGNAT. Port forwarding khi đó không đủ để nhận kết nối Internet; giữ quản trị qua Tailscale và dừng phần public cho đến khi có đường vào phù hợp.

### Tạo bản ghi DNS tại TenTen

Trước tiên kiểm tra nơi đang quản lý nameserver:

~~~bash
dig NS example.com +short
~~~

Nếu nameserver không trỏ tới TenTen, hãy tạo bản ghi ở nhà cung cấp DNS có thẩm quyền hiện tại. Trong giao diện TenTen, chọn thêm bản ghi riêng:

| Type | Host | Value |
|---|---|---|
| A | <code>@</code> | WAN IPv4 công khai, website |
| A | <code>www</code> | WAN IPv4 công khai |
| A | <code>ssh</code> | WAN IPv4 công khai, chỉ dùng nếu bật SSH public |

Không dùng nút **“Cấu hình theo IP”** cho zone đang có dữ liệu: hướng dẫn TenTen cảnh báo thao tác đó xóa các bản ghi cũ. Sau khi lưu, kiểm tra phân giải:

~~~bash
dig +short example.com
dig +short www.example.com
dig NS example.com +short
~~~

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

Chỉ reload nếu lệnh kiểm tra hiển thị cấu hình mong muốn:

~~~bash
sudo systemctl reload ssh
~~~

Trong router, forward **TCP 22 → SERVER_LAN_IP:22**. Tạo A record <code>ssh</code> tại TenTen như bước 04, rồi từ laptop ở mạng ngoài kiểm tra trong terminal mới:

~~~bash
LINUX_USER="ubuntu"
ssh -i ~/.ssh/id_ed25519_ubuntu_server "$LINUX_USER@ssh.example.com"
~~~

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

Giữ source và virtual environment thuộc <code>root</code>; service account ở bước 08 chỉ cần quyền đọc/chạy. Không lưu file env hoặc password trong Git.

## 07. Cài PostgreSQL cho FastAPI demo

Cài DB, tạo role riêng bằng prompt tương tác và tạo database:

~~~bash
sudo apt install -y postgresql
sudo systemctl enable --now postgresql
sudo -u postgres createuser --pwprompt portfolio_api
sudo -u postgres createdb --owner=portfolio_api portfolio_db
~~~

Giữ PostgreSQL chỉ nghe trên loopback:

~~~bash
sudo -u postgres psql -c "ALTER SYSTEM SET listen_addresses = 'localhost';"
sudo systemctl restart postgresql
sudo pg_isready
sudo -u postgres psql -Atc "SHOW listen_addresses;"
~~~

Tạo file cấu hình chỉ root đọc được; dùng <code>sudoedit</code> để nhập URL và password đã URL-encode nếu có ký tự đặc biệt:

~~~bash
sudo install -d -o root -g root -m 0750 /etc/portfolio-api
sudo install -o root -g root -m 0600 /dev/null /etc/portfolio-api/backend.env
sudoedit /etc/portfolio-api/backend.env
~~~

Nội dung file:

~~~dotenv
DATABASE_URL=postgresql://portfolio_api:REPLACE_WITH_URL_ENCODED_PASSWORD@127.0.0.1:5432/portfolio_db
~~~

Không NAT cổng 5432 ra Internet. Nguồn: [PostgreSQL createuser](https://www.postgresql.org/docs/current/app-createuser.html) · [PostgreSQL pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html).

## 08. Tạo service account và chạy FastAPI bằng systemd

Tạo user hệ thống không cho đăng nhập shell:

~~~bash
sudo useradd --system --user-group --no-create-home --home-dir /nonexistent --shell /usr/sbin/nologin portfolio-api
~~~

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

Đổi <code>example.com</code> thành domain có A record trỏ đúng WAN IP. Kiểm tra website và API trên server:

~~~bash
curl -I -H 'Host: example.com' http://127.0.0.1/
curl -i -H 'Host: example.com' http://127.0.0.1/api/health/live
~~~

Sau khi DNS và NAT hoạt động, kiểm tra từ mạng ngoài:

~~~bash
curl -I http://example.com/
curl -i http://example.com/api/health/live
~~~

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

Tạo một bản dump PostgreSQL có timestamp và kiểm tra nội dung archive:

~~~bash
sudo install -d -o postgres -g postgres -m 0700 /var/backups/portfolio-api
BACKUP="/var/backups/portfolio-api/portfolio_db_$(date +%F_%H%M).dump"
sudo -u postgres pg_dump -Fc -f "$BACKUP" portfolio_db
sudo -u postgres pg_restore --list "$BACKUP"
~~~

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
