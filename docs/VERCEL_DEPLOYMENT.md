# Vercel Deployment Guide

This guide will walk you through deploying the Lead By Example project to Vercel.

## 🚀 Quick Deploy

Click the button below for instant deployment:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/StrayDogSyn/Lead-By-Example)

## 📋 Prerequisites

- A [Vercel account](https://vercel.com/signup) (free tier available)
- Your project pushed to a Git provider (GitHub, GitLab, or Bitbucket)
- Environment variables ready (see `.env.example`)

## 🔧 Deployment Methods

### Method 1: Vercel Dashboard (Recommended for First-Time)

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with your Git provider

2. **Import Project**
   - Click "Add New..." → "Project"
   - Select your Git repository
   - Vercel will auto-detect Next.js configuration

3. **Configure Project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (leave as default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - **Install Command**: `npm install` (auto-detected)

4. **Add Environment Variables**

   Click "Environment Variables" and add the following (copy from `.env.example`):

   ```
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_APP_NAME=Lead By Example
   NODE_ENV=production
   NEXT_PUBLIC_ENABLE_ANALYTICS=true
   ```

   Add any additional variables your project needs.

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (usually 1-2 minutes)
   - Your site will be live at `https://your-project.vercel.app`

### Method 2: Vercel CLI

1. **Install Vercel CLI**

   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel**

   ```bash
   vercel login
   ```

3. **Deploy to Preview**

   ```bash
   # From project root
   vercel
   ```

   This creates a preview deployment for testing.

4. **Deploy to Production**

   ```bash
   vercel --prod
   ```

5. **Add Environment Variables via CLI**

   ```bash
   # Add a single variable
   vercel env add NEXT_PUBLIC_APP_URL production
   
   # Pull environment variables
   vercel env pull .env.local
   ```

### Method 3: Git Integration (Auto-Deploy)

Once connected via Method 1 or 2:

1. **Automatic Deployments**
   - Push to `main` branch → Production deployment
   - Push to other branches → Preview deployment
   - Pull requests → Preview deployment with unique URL

2. **Deployment Workflow**

   ```bash
   git add .
   git commit -m "Your commit message"
   git push origin main
   ```

   Vercel automatically builds and deploys!

## 🔐 Environment Variables Setup

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Your production URL | `https://leadbyexample.org` |
| `NEXT_PUBLIC_APP_NAME` | Application name | `Lead By Example` |
| `NODE_ENV` | Environment | `production` |

### Optional Variables

See `.env.example` for complete list including:

- Analytics (Google Analytics, etc.)
- Authentication (OAuth providers)
- CMS integration
- Email services
- File storage

### Adding Variables in Vercel Dashboard

1. Go to your project settings
2. Click "Environment Variables"
3. Add variable name and value
4. Select environments: Production, Preview, Development
5. Click "Save"

### Adding Variables via CLI

```bash
# Add to production
vercel env add VARIABLE_NAME production

# Add to all environments
vercel env add VARIABLE_NAME

# Import from .env file
vercel env pull .env.local
```

## 🌍 Custom Domain Setup

### Add a Custom Domain

1. **In Vercel Dashboard**
   - Go to Project Settings → Domains
   - Click "Add Domain"
   - Enter your domain name
   - Follow DNS configuration instructions

2. **DNS Configuration**

   Add these records to your DNS provider:

   ```
   Type: A
   Name: @
   Value: 76.76.21.21
   
   Type: CNAME
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **Wait for Propagation**
   - Usually takes 5-30 minutes
   - Vercel auto-provisions SSL certificate

### Via CLI

```bash
vercel domains add yourdomain.com
vercel domains add www.yourdomain.com
```

## ⚙️ Advanced Configuration

### Custom Build Settings

Edit `vercel.json`:

```json
{
  "framework": "nextjs",
  "regions": ["iad1"],
  "headers": [...],
  "redirects": [...],
  "rewrites": [...]
}
```

### Build & Development Settings

In Vercel Dashboard under Project Settings:

- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`
- **Development Command**: `npm run dev`
- **Node Version**: 18.x (recommended)

### Performance Optimizations

Vercel automatically provides:

- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image Optimization
- ✅ Edge Functions
- ✅ Analytics
- ✅ Web Vitals monitoring

## 🔍 Monitoring & Analytics

### Enable Vercel Analytics

1. Go to Project → Analytics tab
2. Enable Analytics (free on Pro plan)
3. View real-time metrics and Web Vitals

### View Deployment Logs

```bash
# Via CLI
vercel logs [deployment-url]

# Or view in Dashboard
# Go to Deployments → Click deployment → View Logs
```

## 🐛 Troubleshooting

### Build Failures

**Check build logs:**

```bash
vercel logs
```

**Common issues:**

- Missing environment variables
- TypeScript errors
- Dependency issues

**Solutions:**

```bash
# Locally test build
npm run build

# Check for TypeScript errors
npm run type-check

# Update dependencies
npm update
```

### Environment Variable Issues

```bash
# Pull latest env vars
vercel env pull

# Check which vars are set
vercel env ls
```

### Domain Issues

- **DNS not propagating**: Wait 24-48 hours
- **SSL errors**: Vercel auto-provisions, wait a few minutes
- **CNAME conflicts**: Remove conflicting DNS records

## 🔄 Redeployment

### Redeploy via Dashboard

1. Go to Deployments
2. Click "..." on a deployment
3. Select "Redeploy"

### Redeploy via CLI

```bash
# Redeploy latest
vercel --prod

# Rollback to previous deployment
vercel rollback [deployment-url]
```

### Trigger Redeployment via Git

```bash
git commit --allow-empty -m "Trigger redeploy"
git push
```

## 📊 Performance Tips

1. **Enable Vercel Analytics** - Monitor Web Vitals
2. **Use Image Optimization** - Next.js Image component
3. **Enable Edge Functions** - For API routes
4. **Set Proper Cache Headers** - In `next.config.js`
5. **Monitor Bundle Size** - Use `@next/bundle-analyzer`

## 🔗 Useful Commands

```bash
# View all deployments
vercel ls

# View deployment details
vercel inspect [deployment-url]

# View domains
vercel domains ls

# Remove deployment
vercel remove [deployment-name]

# Open project in browser
vercel open

# Pull environment variables
vercel env pull

# Link local project to Vercel
vercel link
```

## 📚 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Next.js Deployment](https://nextjs.org/docs/deployment)
- [Vercel CLI Reference](https://vercel.com/docs/cli)
- [Environment Variables Guide](https://vercel.com/docs/concepts/projects/environment-variables)

## 🆘 Support

- **Vercel Support**: [vercel.com/support](https://vercel.com/support)
- **Project Issues**: [GitHub Issues](https://github.com/StrayDogSyn/Lead-By-Example/issues)
- **Email**: <support@leadbyexample.org>

---

**Happy Deploying! 🚀**
