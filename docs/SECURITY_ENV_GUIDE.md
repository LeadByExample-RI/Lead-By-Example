# 🔐 Security & Environment Variables

## ⚠️ CRITICAL SECURITY REMINDERS

### NEVER Commit These Files:

- ❌ `.env`
- ❌ `.env.local`
- ❌ `.env.development.local`
- ❌ `.env.production.local`
- ❌ Any file containing actual API keys or secrets

### ✅ Safe to Commit:

- ✅ `.env.example` (template with placeholder values)
- ✅ `.gitignore` (ensures sensitive files are excluded)
- ✅ Documentation files

---

## 🔑 Stripe Keys Security

### Test Mode Keys (Development)

```bash
# These are for DEVELOPMENT only
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_SECRET_KEY=sk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**⚠️ Even test keys should not be committed to Git!**

### Live Mode Keys (Production)

```bash
# These are for PRODUCTION only - EXTRA SENSITIVE!
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

**🚨 NEVER commit production keys - use Vercel environment variables!**

---

## 📋 Setup Checklist

### Local Development

- [ ] Copy `.env.example` to `.env.local`
- [ ] Add your Stripe TEST keys to `.env.local`
- [ ] Verify `.env.local` is in `.gitignore`
- [ ] NEVER commit `.env.local` to Git

### Production Deployment

- [ ] Get Stripe LIVE keys from dashboard
- [ ] Add keys to Vercel environment variables (NOT in code)
- [ ] Set up production webhook in Stripe Dashboard
- [ ] Test with $1 real donation before announcing

---

## 🛡️ .gitignore Protection

The `.gitignore` file protects these patterns:

```gitignore
# Environment files
.env
.env*.local
.env.development.local
.env.test.local
.env.production.local

# Stripe-specific
.env.stripe
.stripe/
**/STRIPE_SECRET_KEY*
**/STRIPE_WEBHOOK_SECRET*

# Installation package (after copying to docs)
stripe_install/
```

---

## ✅ Verification Steps

### Check if .env.local is Ignored

```bash
# Run this command - should return nothing
git status | grep .env.local
```

If it shows `.env.local`, **DO NOT COMMIT IT!**

### Check Git History

```bash
# Make sure no sensitive files were committed
git log --all --full-history -- .env.local
git log --all --full-history -- .env
```

If found, you need to remove from history and rotate keys!

---

## 🚨 If Keys Were Accidentally Committed

### Immediate Actions:

1. **Rotate ALL compromised keys immediately** in Stripe Dashboard
2. Delete old keys from Stripe
3. Remove from Git history:
   ```bash
   git filter-branch --force --index-filter \
     'git rm --cached --ignore-unmatch .env.local' \
     --prune-empty --tag-name-filter cat -- --all
   ```
4. Force push (⚠️ coordinate with team):
   ```bash
   git push origin --force --all
   ```
5. Update new keys in Vercel
6. Document incident

---

## 📖 Environment Variable Management

### Local Development (.env.local)

```bash
# Copy template
cp .env.example .env.local

# Add your test keys
# Edit .env.local with your actual keys
```

### Vercel Production

```bash
# Add via Vercel Dashboard:
# Project → Settings → Environment Variables

# Or via CLI:
vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
vercel env add STRIPE_SECRET_KEY
vercel env add STRIPE_WEBHOOK_SECRET
```

### Access in Code

```typescript
// Client-side (safe - publishable key)
const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

// Server-side ONLY (secret key)
const secretKey = process.env.STRIPE_SECRET_KEY;
```

---

## 🔍 Pre-Commit Checklist

Before every commit, verify:

- [ ] No `.env*` files staged
- [ ] No API keys in code
- [ ] No secrets in comments
- [ ] `.gitignore` is up to date
- [ ] Only `.env.example` with placeholders

---

## 📞 Emergency Contacts

### If Keys Compromised:

1. **Rotate immediately** in Stripe Dashboard
2. Update Vercel environment variables
3. Notify team lead
4. Document in incident log

### Stripe Support:

- Dashboard: https://dashboard.stripe.com
- Support: https://support.stripe.com
- Security: security@stripe.com

---

## 🎓 Best Practices

### DO:

✅ Use `.env.local` for local development  
✅ Use Vercel env vars for production  
✅ Keep `.env.example` updated with placeholders  
✅ Use different keys for dev/staging/prod  
✅ Rotate keys regularly  
✅ Document key locations securely

### DON'T:

❌ Commit any `.env*` files with real values  
❌ Share keys via email/Slack/SMS  
❌ Use production keys in development  
❌ Hardcode keys in source code  
❌ Leave keys in code comments  
❌ Screenshot keys

---

## 📚 Additional Resources

- [Stripe Keys Best Practices](https://stripe.com/docs/keys)
- [Vercel Environment Variables](https://vercel.com/docs/environment-variables)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)
- [Git Secrets Tool](https://github.com/awslabs/git-secrets)

---

**🔒 Remember: When in doubt, DON'T commit. Ask first!**

_This file is safe to commit - it contains no actual secrets._
