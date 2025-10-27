# 🚀 VS Code Setup Instructions

## Quick Setup for VS Code

### 1. Download and Extract

1. Download `lead-by-example-complete.zip`
2. Extract to your desired location
3. Open VS Code

### 2. Open in VS Code

**Option A: Using VS Code UI**

- File → Open Folder
- Navigate to extracted `lead-by-example-cta` folder
- Click "Select Folder"

**Option B: Using Terminal**

```bash
cd path/to/lead-by-example-cta
code .
```

### 3. Install Dependencies

Open VS Code's integrated terminal (`` Ctrl+` `` or `View → Terminal`):

```bash
npm install
```

This will take about 2-3 minutes and install all required packages.

### 4. Start Development Server

```bash
npm run dev
```

Your site will be available at: <http://localhost:3000>

---

## 📁 What's in the ZIP

```
lead-by-example-complete.zip
├── lead-by-example-cta/          # Main project folder
│   ├── src/                      # Source code
│   │   ├── components/           # 6 React components
│   │   ├── pages/               # 3 Next.js pages
│   │   ├── styles/              # Global CSS
│   │   ├── hooks/               # Custom hooks
│   │   └── utils/               # Helper functions
│   ├── package.json             # Dependencies
│   ├── tsconfig.json            # TypeScript config
│   ├── tailwind.config.js       # Styling config
│   ├── README.md                # Technical docs
│   ├── SETUP_GUIDE.md           # Setup guide
│   ├── FEATURES.md              # Features list
│   ├── DEPLOYMENT.md            # Deploy guide
│   └── QUICK_REFERENCE.md       # Quick reference
├── INDEX.md                     # Complete overview
├── START_HERE.md                # Quick start
├── PROJECT_SUMMARY.md           # Delivery summary
└── FILE_STRUCTURE.txt           # File map
```

---

## 🔧 Recommended VS Code Extensions

Install these for the best experience:

1. **ES7+ React/Redux/React-Native snippets**
   - Extension ID: `dsznajder.es7-react-js-snippets`

2. **Tailwind CSS IntelliSense**
   - Extension ID: `bradlc.vscode-tailwindcss`

3. **TypeScript Vue Plugin (Volar)**
   - Extension ID: `Vue.vscode-typescript-vue-plugin`

4. **Prettier - Code formatter**
   - Extension ID: `esbenp.prettier-vscode`

5. **ESLint**
   - Extension ID: `dbaeumer.vscode-eslint`

**Install via Command Palette:**

- Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (Mac)
- Type "Extensions: Install Extensions"
- Search and install each extension

---

## ⚙️ VS Code Workspace Settings

Create `.vscode/settings.json` in your project:

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.tsdk": "node_modules/typescript/lib",
  "tailwindCSS.experimental.classRegex": [
    ["cn\\(([^)]*)\\)", "(?:'|\"|`)([^'\"`]*)(?:'|\"|`)"]
  ]
}
```

---

## 🐛 Troubleshooting

### Node Modules Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 Already in Use

```bash
# Windows
npx kill-port 3000

# Mac/Linux
lsof -ti:3000 | xargs kill
```

### TypeScript Errors in VS Code

- Press `Ctrl+Shift+P`
- Type "TypeScript: Restart TS Server"
- Press Enter

---

## 📝 Quick Commands

```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run lint         # Check code quality
npm run type-check   # Check TypeScript
```

---

## 🎨 File Structure in VS Code

```
LEAD-BY-EXAMPLE-CTA (Workspace)
├── 📂 src
│   ├── 📂 components      ← React components here
│   │   ├── Hero.tsx
│   │   ├── Testimonials.tsx
│   │   ├── Archive.tsx
│   │   ├── Newsletter.tsx
│   │   ├── Partners.tsx
│   │   └── Footer.tsx
│   ├── 📂 pages          ← Routes here
│   │   ├── index.tsx     ← Main page
│   │   ├── _app.tsx
│   │   └── _document.tsx
│   ├── 📂 styles         ← CSS here
│   │   └── globals.css
│   ├── 📂 hooks          ← Custom hooks
│   │   └── useInView.ts
│   └── 📂 utils          ← Helpers
│       └── helpers.ts
├── 📂 public             ← Static files (create this)
├── 📄 package.json
├── 📄 tsconfig.json
├── 📄 tailwind.config.js
└── 📄 README.md
```

---

## 🔥 Hot Reload

When you run `npm run dev`, any changes you make to files will automatically reload in the browser. No need to restart the server!

**Try it:**

1. Start dev server: `npm run dev`
2. Open `src/pages/index.tsx`
3. Change the fundraiser amount
4. Save the file
5. Browser automatically updates! ✨

---

## 🚀 Git Integration

### Initialize Repository

```bash
git init
git add .
git commit -m "Initial commit: Lead By Example website"
```

### Connect to GitHub

```bash
git remote add origin YOUR_GITHUB_URL
git branch -M main
git push -u origin main
```

### Recommended .gitignore

Already included! It ignores:

- `node_modules/`
- `.next/`
- `.env*.local`
- `*.log`

---

## 📚 Documentation Files

Open these in VS Code for reference:

- **README.md** - Technical documentation
- **SETUP_GUIDE.md** - Detailed setup
- **FEATURES.md** - All features explained
- **DEPLOYMENT.md** - How to deploy
- **QUICK_REFERENCE.md** - Quick commands

---

## 🎯 Next Steps

1. ✅ Extract ZIP
2. ✅ Open in VS Code
3. ✅ Install extensions (recommended)
4. ✅ Run `npm install`
5. ✅ Run `npm run dev`
6. ✅ Open <http://localhost:3000>
7. ✅ Start customizing!

---

## 💡 Pro Tips

1. **Use the terminal in VS Code** - No need to switch windows
2. **Enable Auto Save** - File → Auto Save
3. **Split Editor** - View multiple files side by side
4. **Quick File Navigation** - `Ctrl+P` then type filename
5. **Integrated Git** - Source Control panel on the left
6. **Problems Panel** - View → Problems (shows errors)

---

## 🆘 Need Help?

1. Check the documentation files
2. Contact StrayDog Syndications LLC
3. Check Next.js docs: <https://nextjs.org/docs>
4. Check Tailwind docs: <https://tailwindcss.com/docs>

---

**Happy Coding! 🚀**

Made with ❤️ by StrayDog Syndications LLC
