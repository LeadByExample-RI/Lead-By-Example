# 🚀 Vercel Deployment Guide

## Quick Deploy

The easiest way to deploy this Next.js application is with Vercel.

### Method 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit: Lead By Example CTA page"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "Add New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment Variables** (optional)
   ```
   NEXT_PUBLIC_APP_NAME=Lead By Example
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   ```

4. **Deploy**
   - Click "Deploy"
   - Your site will be live in ~2 minutes
   - Every push to main will auto-deploy

### Method 2: Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy to preview
vercel

# Deploy to production
vercel --prod
```

## Custom Domain Setup

1. Go to your project settings on Vercel
2. Navigate to "Domains"
3. Add your custom domain
4. Follow DNS configuration instructions
5. SSL certificate is automatically provisioned

## Environment Variables

Add these in Vercel Dashboard → Settings → Environment Variables:

### Production Variables
```env
NEXT_PUBLIC_APP_NAME=Lead By Example
NEXT_PUBLIC_APP_URL=https://your-domain.com
NODE_ENV=production
```

## Performance Optimizations

Vercel automatically provides:
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Image Optimization
- ✅ Edge Functions
- ✅ Compression (Gzip/Brotli)

## Monitoring

Enable in Vercel Dashboard:
- **Analytics** - Real-time traffic insights
- **Speed Insights** - Core Web Vitals
- **Logs** - Runtime logs and errors

## Troubleshooting

### Build Fails
```bash
# Test build locally first
npm run build

# Check for TypeScript errors
npm run type-check
```

### Environment Variables Not Working
- Ensure variables start with `NEXT_PUBLIC_` for client-side access
- Redeploy after adding new variables
- Check variable scope (Production/Preview/Development)

### Domain Issues
- Wait 24-48 hours for DNS propagation
- Verify DNS records are correct
- Check SSL certificate status

## Continuous Deployment

Once connected to GitHub:
- Push to `main` → Deploys to production
- Open PR → Creates preview deployment
- All commits get unique preview URLs

## Cost

- **Hobby Plan**: FREE
  - Unlimited deployments
  - 100GB bandwidth/month
  - Automatic SSL

- **Pro Plan**: $20/month
  - Better performance
  - Analytics included
  - Team collaboration

## Post-Deployment Checklist

- [ ] Verify all pages load correctly
- [ ] Test form submissions
- [ ] Check responsive design on mobile
- [ ] Verify all links work
- [ ] Test performance with Lighthouse
- [ ] Set up custom domain (if applicable)
- [ ] Enable analytics
- [ ] Configure error monitoring

## Support

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs

---

**Need help?** Contact StrayDog Syndications LLC
