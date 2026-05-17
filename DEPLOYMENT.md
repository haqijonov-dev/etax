# Etax — Server deployment

Next.js 15 (App Router) + next-intl. Configured for **standalone** output so it can run on any Node.js 18+ server (VPS, dedicated, Docker) without Vercel.

---

## 1. Server requirements

- Ubuntu 22.04 / 24.04 LTS (or any Linux with systemd)
- Node.js **20 LTS**
- npm 10+
- nginx (reverse proxy + TLS)
- PM2 (process manager) — recommended
- Git
- Open ports: 80, 443 (public), 3000 (loopback only)

Install on a fresh server:

```bash
# Node 20
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs git nginx

# PM2 globally
sudo npm install -g pm2

# Verify
node -v && npm -v && nginx -v && pm2 -v
```

---

## 2. First-time deploy

```bash
# Choose a path
sudo mkdir -p /var/www/etax
sudo chown -R $USER:$USER /var/www/etax

# Clone
git clone git@github.com:haqijonov-dev/etax.git /var/www/etax
cd /var/www/etax

# Install + build
npm ci --legacy-peer-deps || npm install --legacy-peer-deps
npm run build

# Stage standalone bundle (Next 15 standalone needs static + public copied in)
mkdir -p .next/standalone/.next
cp -r .next/static .next/standalone/.next/static
cp -r public .next/standalone/public

# Start with PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup systemd        # follow the printed instruction once
```

App now listens on **127.0.0.1:3000**.

---

## 3. Nginx reverse proxy

Copy and edit:

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/etax
sudo ln -s /etc/nginx/sites-available/etax /etc/nginx/sites-enabled/etax
sudo nginx -t && sudo systemctl reload nginx
```

Edit `server_name` and the `ssl_certificate` paths to match your domain.

### TLS (Let's Encrypt)

```bash
sudo apt-get install -y certbot python3-certbot-nginx
sudo certbot --nginx -d etax.uz -d www.etax.uz
```

Certbot auto-renews via systemd timer.

---

## 4. Updating (subsequent deploys)

From your laptop, push to `main`. On the server:

```bash
cd /var/www/etax
bash deploy/deploy.sh
```

`deploy.sh` does:
- `git reset --hard origin/main`
- `npm ci` + `npm run build`
- copy `static/` and `public/` into the standalone bundle
- `pm2 reload` (zero-downtime restart)

---

## 5. Docker alternative

```bash
docker build -t etax .
docker run -d --name etax --restart unless-stopped -p 3000:3000 etax
```

Then point nginx at `http://127.0.0.1:3000` the same way.

---

## 6. Environment variables

Copy `.env.example` to `.env` if you need to override defaults. By default the app reads:

| Variable                | Default  |
|-------------------------|----------|
| `NODE_ENV`              | `production` |
| `PORT`                  | `3000`   |
| `HOSTNAME`              | `0.0.0.0` |
| `NEXT_TELEMETRY_DISABLED` | `1`    |

---

## 7. Useful PM2 commands

```bash
pm2 status               # list processes
pm2 logs etax            # tail logs
pm2 restart etax         # full restart
pm2 reload etax          # zero-downtime reload
pm2 monit                # live dashboard
```

---

## 8. Project structure relevant to deployment

```
.
├── Dockerfile
├── ecosystem.config.js          # PM2 config
├── next.config.ts               # output: "standalone"
├── deploy/
│   ├── deploy.sh                # one-command deploy script
│   └── nginx.conf.example       # nginx reverse-proxy template
└── .env.example
```
