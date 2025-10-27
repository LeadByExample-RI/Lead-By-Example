# 📋 Quick Reference Card

## 🚀 Getting Started (3 Commands)

```bash
npm install    # Install dependencies
npm run dev    # Start development
npm run build  # Build for production
```

## 📱 View Your Site

**Development:** <http://localhost:3000>
**Production:** <https://your-site.vercel.app>

## 🎯 Main Features

| Feature | Description |
|---------|-------------|
| Hero | Current fundraiser with progress |
| Testimonials | Success stories carousel |
| Archive | Past fundraiser milestones |
| Newsletter | Email signup form |
| Partners | Organization links |
| Footer | Contact + developer credit |

## 📝 Update Content

### Change Current Fundraiser

File: `src/pages/index.tsx`

```typescript
const currentFundraiser = {
  title: 'Event Name',
  goal: 10000,        // ← Change amount
  raised: 6250,       // ← Change amount
  eventDate: 'Date',  // ← Change date
  eventLocation: 'Location',
};
```

### Add Testimonial

File: `src/components/Testimonials.tsx`

```typescript
{
  id: 5,
  name: 'New Person',
  role: 'Their Role',
  content: 'Their quote...',
}
```

### Archive a Fundraiser

File: `src/components/Archive.tsx`

```typescript
{
  id: 4,
  title: 'Past Event',
  goal: 8000,
  raised: 9000,
  // ... more fields
}
```

## 🎨 Customize Colors

File: `tailwind.config.js`

```javascript
verdean: { 500: '#01514C' },  // Green-blue
royal: { 500: '#4B306A' },    // Purple
gold: { 500: '#FFD700' },     // Gold
```

## 🚀 Deploy to Vercel

### Method 1: GitHub

```bash
git push origin main
# Auto-deploys on Vercel
```

### Method 2: CLI

```bash
vercel --prod
```

## 📞 Key Contacts

**Client**

- Robert McKinney Sr.
- (401) 699-6544
- <contact@leadbyexample.org>

**Developer**

- StrayDog Syndications LLC
- <www.straydog-syndications-llc.com>

## 🔧 Troubleshooting

| Problem | Solution |
|---------|----------|
| Port in use | `npx kill-port 3000` |
| Module error | `rm -rf node_modules && npm install` |
| Build fails | `npm run build` to see errors |
| Slow load | Clear cache: `rm -rf .next` |

## 📂 Important Files

```
src/
├── pages/index.tsx          # Main page
├── components/
│   ├── Hero.tsx            # Current fundraiser
│   ├── Testimonials.tsx    # Success stories
│   └── Archive.tsx         # Past events
└── styles/globals.css      # Global styles

tailwind.config.js          # Colors & design
package.json               # Dependencies
next.config.js             # App config
```

## ✅ Pre-Launch Checklist

- [ ] Update fundraiser data
- [ ] Test all forms
- [ ] Check mobile view
- [ ] Verify contact info
- [ ] Test in multiple browsers
- [ ] Deploy to Vercel
- [ ] Test production site
- [ ] Share with team!

## 💡 Pro Tips

1. **Update regularly** - Keep fundraiser data current
2. **Test on mobile** - Most visitors use phones
3. **Back up changes** - Use Git commits
4. **Monitor analytics** - See what works
5. **Get feedback** - From real users

## 🎓 Learn More

- README.md - Full documentation
- SETUP_GUIDE.md - Detailed setup
- FEATURES.md - All features explained
- DEPLOYMENT.md - Deployment guide

## 🆘 Need Help?

1. Check documentation files
2. Contact StrayDog Syndications
3. Visit Vercel docs
4. Search Next.js docs

---

**Made with ❤️ by StrayDog Syndications LLC**
