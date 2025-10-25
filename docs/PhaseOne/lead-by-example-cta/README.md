# Lead By Example - Call to Action Page

A premium, modern call-to-action website for the Lead By Example nonprofit organization, dedicated to breaking the school-to-prison pipeline through mentorship and community engagement.

## ✨ Features

### Premium Design Elements

- **Glassmorphic UI** - Modern glass-card effects with backdrop blur
- **3D Depth** - Layered components with perspective transforms
- **Smooth Animations** - Framer Motion powered micro-interactions
- **Responsive Design** - Optimized for all screen sizes
- **Cape Verdean Color Palette** - Rich greens, purples, and gold accents
- **Custom Animations** - Float, glow, shimmer, and fade effects

### Key Sections

1. **Hero Section** - Prominent current fundraiser display with progress tracking
2. **Testimonials** - 3D carousel showcasing success stories
3. **Archive** - Past fundraiser milestones with achievement badges
4. **Newsletter** - Email signup with form validation
5. **Partners** - Links to like-minded organizations
6. **Footer** - Contact info and developer credits

### Technical Highlights

- ⚡ Next.js 14 with React 18
- 🎨 Tailwind CSS with custom theme
- 📱 Fully responsive and accessible
- 🔍 SEO optimized
- 🚀 Ready for Vercel deployment
- 🎭 Framer Motion animations
- 📝 React Hook Form with Zod validation
- 🎯 TypeScript for type safety

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
# Navigate to http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Start production server
npm start
```

## 📦 Project Structure

```
lead-by-example-cta/
├── src/
│   ├── components/          # React components
│   │   ├── Hero.tsx        # Main hero with fundraiser
│   │   ├── Testimonials.tsx # Success stories carousel
│   │   ├── Archive.tsx     # Past fundraiser milestones
│   │   ├── Newsletter.tsx  # Email signup form
│   │   ├── Partners.tsx    # Partner organizations
│   │   └── Footer.tsx      # Footer with credits
│   ├── pages/              # Next.js pages
│   │   ├── _app.tsx       # App wrapper
│   │   ├── _document.tsx  # HTML document
│   │   └── index.tsx      # Main page
│   ├── styles/            # Global styles
│   │   └── globals.css    # Tailwind + custom CSS
│   ├── hooks/             # Custom React hooks
│   │   └── useInView.ts   # Intersection observer
│   └── utils/             # Utility functions
│       └── helpers.ts     # Common helpers
├── public/                # Static assets
├── package.json          # Dependencies
├── tsconfig.json         # TypeScript config
├── tailwind.config.js    # Tailwind config
├── next.config.js        # Next.js config
└── postcss.config.js     # PostCSS config
```

## 🎨 Color Palette

### Cape Verdean Colors

- **Primary**: `#01514C` - Deep greenish-blue
- **Accent**: Various earth tones and coastal vibes

### Modern Palette

- **Royal Purple**: `#4B306A` (primary), `#421B5A` (deep)
- **Gold**: `#FFD700` (brilliant), `#E5C100` (rich)
- **Neutrals**: `#F6F6F6` (light), `#000000` (dark)

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_NAME=Lead By Example
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### Customization

- **Colors**: Edit `tailwind.config.js`
- **Fonts**: Modify font imports in `src/pages/index.tsx`
- **Content**: Update component data in respective files
- **Animations**: Adjust `framer-motion` variants in components

## 🚀 Deployment to Vercel

### Option 1: Git Integration (Recommended)

1. Push code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Vercel auto-detects Next.js
5. Deploy!

### Option 2: Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Deploy to production
vercel --prod
```

### Deployment Checklist

- [ ] Update environment variables in Vercel dashboard
- [ ] Configure custom domain (optional)
- [ ] Enable Vercel Analytics (optional)
- [ ] Set up error monitoring (optional)

## 🎯 Key Features Explained

### Glassmorphism

Premium glass-card effects using:

- `backdrop-blur-xl` for frosted glass
- `bg-white/10` for translucent backgrounds
- Custom shadow combinations for depth

### 3D Effects

```css
.depth-3d {
  transform-style: preserve-3d;
  transform: perspective(1000px);
}
```

### Animation System

- **Intersection Observer**: Components animate when scrolled into view
- **Framer Motion**: Smooth page transitions and micro-interactions
- **Custom Keyframes**: Tailwind config includes float, glow, shimmer

### Form Validation

- React Hook Form for performance
- Zod schema validation
- Real-time error feedback
- Accessible error messages

## 📱 Responsive Breakpoints

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

All components are mobile-first and fully responsive.

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels on interactive elements
- Keyboard navigation support
- Focus visible states
- Color contrast compliance (WCAG 2.1 AA)

## 🐛 Troubleshooting

### Port already in use

```bash
# Use different port
PORT=3001 npm run dev
```

### Module not found

```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript errors

```bash
# Regenerate types
npm run build
```

## 📄 License

This project was developed by StrayDog Syndications LLC for the Lead By Example organization.

## 🙏 Credits

### Client

**Lead By Example Organization**

- Founder: Robert McKinney Sr.
- Location: Providence, RI
- Contact: (401) 699-6544

### Development Team

**StrayDog Syndications LLC**

- Website: [straydog-syndications-llc.com](https://www.straydog-syndications-llc.com)
- Senior Developer: @StrayDogSyn
- Junior Developer: @miasmith81

### Partner Organizations

- [Open Doors RI](https://www.opendoorsri.org)
- [Reentry Campus Program](https://www.reentrycampusprogram.org)

## 📞 Support

For technical support or questions:

- Email: <contact@leadbyexample.org>
- Phone: (401) 699-6544

---

Made with ❤️ by StrayDog Syndications LLC
