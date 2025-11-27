# Deployment Guide

This guide covers deploying EcoHubs.community to various platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Environment Variables](#environment-variables)
- [Vercel Deployment](#vercel-deployment)
- [Self-Hosted Node Server](#self-hosted-node-server)
- [Static Hosting](#static-hosting)
- [Email Configuration](#email-configuration)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before deploying, ensure you have:

- Node.js 18+ installed
- pnpm package manager (`npm install -g pnpm`)
- Git repository set up
- Environment variables configured

## Environment Variables

### Required Variables

```bash
# Site Configuration
PUBLIC_SITE_URL=https://your-domain.com

# SMTP Email Configuration (for contact forms and notifications)
SMTP_HOST=mail.your-domain.com
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=noreply@your-domain.com
SMTP_PASSWORD=your-secure-password

EMAIL_FROM=noreply@your-domain.com
EMAIL_FROM_NAME=EcoHubs Community
EMAIL_REPLY_TO=hello@your-domain.com
ADMIN_EMAIL=admin@your-domain.com
```

### Optional Variables

```bash
# Newsletter Integration (Linkmonk)
LINKMONK_URL=https://newsletter.your-domain.com
LINKMONK_API_KEY=your-api-key

# Fallback Webhook (Zapier)
ZAPIER_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/...

# Application Storage (Airtable)
AIRTABLE_API_KEY=your-api-key
AIRTABLE_BASE_ID=your-base-id
AIRTABLE_APPLICATIONS_TABLE=Applications

# Application Tracking (GitHub)
GITHUB_TOKEN=ghp_your-token
GITHUB_REPO=owner/repo
GITHUB_OWNER=owner

# Rate Limiting
RATE_LIMIT_WINDOW=60000
RATE_LIMIT_MAX_REQUESTS=5
```

See [`.env.example`](.env.example) for the complete list.

---

## Vercel Deployment

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/ecohubs.community&env=PUBLIC_SITE_URL,SMTP_HOST,SMTP_PORT,SMTP_USER,SMTP_PASSWORD,EMAIL_FROM,ADMIN_EMAIL)

### Manual Deployment

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy:**
   ```bash
   vercel
   ```

4. **Configure Environment Variables:**
   - Go to your project in Vercel Dashboard
   - Navigate to Settings → Environment Variables
   - Add all required variables from `.env.example`
   - Separate variables for Production, Preview, and Development

5. **Deploy to Production:**
   ```bash
   vercel --prod
   ```

### Vercel-Specific Configuration

The project includes `vercel.json` with optimized settings. Vercel automatically:
- Detects SvelteKit
- Sets up proper routing
- Handles serverless functions for API routes
- Configures edge caching

### GitHub Integration

1. Connect your GitHub repository in Vercel Dashboard
2. Enable automatic deployments:
   - Production: Deploy on push to `main`
   - Preview: Deploy on pull requests
3. All commits will trigger preview deployments

---

## Self-Hosted Node Server

For full control, deploy on your own server (VPS, dedicated server, etc.).

### Requirements

- Linux server (Ubuntu 22.04 LTS recommended)
- Node.js 18+
- pnpm
- Nginx or Apache (reverse proxy)
- PM2 (process manager)
- SSL certificate (Let's Encrypt)

### Step 1: Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install pnpm
npm install -g pnpm

# Install PM2
npm install -g pm2
```

### Step 2: Clone and Build

```bash
# Clone repository
git clone https://github.com/yourusername/ecohubs.community.git
cd ecohubs.community

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env
# Edit .env with your configuration
nano .env

# Build for production
pnpm build
```

### Step 3: Configure Adapter

The project uses `@sveltejs/adapter-static` by default. For Node.js deployment:

```bash
# Install Node adapter
pnpm add -D @sveltejs/adapter-node
```

Update `svelte.config.js`:

```javascript
import adapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { mdsvex } from 'mdsvex';

const config = {
	preprocess: [vitePreprocess(), mdsvex()],
	kit: {
		adapter: adapter({
			out: 'build',
			precompress: true,
			envPrefix: ''
		})
	},
	extensions: ['.svelte', '.svx']
};

export default config;
```

Rebuild:

```bash
pnpm build
```

### Step 4: Start with PM2

Create `ecosystem.config.js`:

```javascript
module.exports = {
	apps: [{
		name: 'ecohubs',
		script: 'build/index.js',
		instances: 'max',
		exec_mode: 'cluster',
		env: {
			NODE_ENV: 'production',
			PORT: 3000
		}
	}]
};
```

Start application:

```bash
# Start with PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Enable PM2 on system startup
pm2 startup
# Follow the command it provides
```

### Step 5: Configure Nginx

Create `/etc/nginx/sites-available/ecohubs`:

```nginx
server {
    listen 80;
    server_name ecohubs.community www.ecohubs.community;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:

```bash
sudo ln -s /etc/nginx/sites-available/ecohubs /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl reload nginx
```

### Step 6: SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d ecohubs.community -d www.ecohubs.community

# Auto-renewal is configured automatically
# Test renewal:
sudo certbot renew --dry-run
```

### Step 7: Automatic Deployments

Create deployment script `deploy.sh`:

```bash
#!/bin/bash
cd /var/www/ecohubs.community
git pull origin main
pnpm install
pnpm build
pm2 reload ecosystem.config.js
echo "Deployment complete!"
```

Make executable:

```bash
chmod +x deploy.sh
```

For GitHub Actions integration, see [CI/CD Section](#cicd-with-github-actions).

---

## Static Hosting

For purely static deployment (without server-side features):

### Build

```bash
pnpm build
```

The `build/` directory contains static files.

### Deploy to:

**Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=build
```

**GitHub Pages:**
```bash
# Install gh-pages
pnpm add -D gh-pages

# Add to package.json scripts:
"deploy": "pnpm build && gh-pages -d build"

# Deploy
pnpm deploy
```

**Note:** Some features (forms, API routes) won't work with static hosting. Use Vercel or Node server for full functionality.

---

## Email Configuration

### Development (Local)

Use a local SMTP server for testing:

**Option 1: MailHog (Recommended)**
```bash
# macOS
brew install mailhog
mailhog

# Linux
wget https://github.com/mailhog/MailHog/releases/download/v1.0.1/MailHog_linux_amd64
chmod +x MailHog_linux_amd64
./MailHog_linux_amd64
```

Access web UI at `http://localhost:8025`

`.env` configuration:
```bash
SMTP_HOST=localhost
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASSWORD=
```

**Option 2: Mailpit**
```bash
# macOS
brew install mailpit
mailpit

# Docker
docker run -d -p 1025:1025 -p 8025:8025 axllent/mailpit
```

### Production

#### Option 1: Self-Hosted (Mailu)

[Mailu](https://mailu.io) is a full-featured, self-hosted email server.

```bash
# Install Docker and Docker Compose
# Follow Mailu setup wizard: https://setup.mailu.io

# Configuration example:
SMTP_HOST=mail.ecohubs.community
SMTP_PORT=587
SMTP_SECURE=true
SMTP_USER=noreply@ecohubs.community
SMTP_PASSWORD=your-secure-password
```

#### Option 2: Plesk Mail

If using Plesk:
1. Create email account in Plesk
2. Note SMTP settings (usually mail.yourdomain.com:587)
3. Configure in `.env`

#### Option 3: Transactional Email Service

For easier setup, use a service like:
- **SendGrid** (12,000 emails/month free)
- **Mailgun** (5,000 emails/month free)
- **Postmark** (100 emails/month free)

Configuration is the same, just use their SMTP settings.

---

## CI/CD with GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  build:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'

      - name: Setup pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install

      - name: Run linting
        run: pnpm lint

      - name: Run type check
        run: pnpm check

      - name: Build
        run: pnpm build
        env:
          PUBLIC_SITE_URL: ${{ secrets.PUBLIC_SITE_URL }}

      - name: Deploy to Vercel
        if: github.ref == 'refs/heads/main'
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

Configure secrets in GitHub repository settings.

---

## Troubleshooting

### Build Failures

**Error: `Cannot find module '@sveltejs/adapter-static'`**
```bash
pnpm install
```

**Error: Memory issues during build**
```bash
NODE_OPTIONS=--max-old-space-size=4096 pnpm build
```

### Email Not Sending

1. Check SMTP credentials
2. Verify firewall allows port 587/465
3. Test SMTP connection:
   ```bash
   telnet mail.yourdomain.com 587
   ```
4. Check logs for detailed errors

### Form Submissions Failing

1. Verify API routes are working (not static deployment)
2. Check browser console for errors
3. Verify rate limiting isn't blocking requests
4. Check server logs

### Performance Issues

1. Enable precompression:
   ```javascript
   // svelte.config.js
   adapter: adapter({
       precompress: true
   })
   ```

2. Configure caching in Nginx:
   ```nginx
   location /_app/ {
       expires 1y;
       add_header Cache-Control "public, immutable";
   }
   ```

3. Use CDN for static assets

---

## Monitoring and Maintenance

### Log Viewing

**PM2 logs:**
```bash
pm2 logs ecohubs
```

**Nginx logs:**
```bash
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log
```

### Updates

```bash
cd /var/www/ecohubs.community
git pull origin main
pnpm install
pnpm build
pm2 reload ecosystem.config.js
```

### Backups

Regular backups of:
- Database (if using)
- Uploaded files
- Environment variables
- SSL certificates

---

## Support

For deployment issues:
- Check [GitHub Issues](https://github.com/yourusername/ecohubs.community/issues)
- Join our [Community Forum](https://github.com/yourusername/ecohubs.community/discussions)
- Email: [tech@ecohubs.community](mailto:tech@ecohubs.community)

