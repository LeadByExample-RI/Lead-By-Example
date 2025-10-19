# 🚀 Quick Start Guide

Welcome! This guide will help you get started with the Lead By Example project quickly.

## ⚡ Fast Setup (Recommended)

### Windows (PowerShell)

```powershell
# Run the automated setup script
.\scripts\setup.ps1
```

### macOS/Linux

```bash
# Make script executable and run
chmod +x scripts/setup.sh
./scripts/setup.sh
```

## 📋 Prerequisites

Make sure you have these installed:

- **Node.js** v18 or higher - [Download](https://nodejs.org/)
- **npm** v9 or higher (comes with Node.js)
- **Git** - [Download](https://git-scm.com/)

Check your versions:

```bash
node --version
npm --version
git --version
```

## 📖 Project Structure Overview

```text
Lead-By-Example/
├── docs/           # All documentation is here
├── scripts/        # Setup scripts
├── src/            # Source code (you'll work here)
├── public/         # Static assets
└── client_assets/  # Client-provided assets
```

## 🎯 Common Tasks

### Start Development Server

```bash
npm run dev
```

Then open <http://localhost:3000>

### Check Your Code

```bash
npm run lint        # Find issues
npm run lint:fix    # Auto-fix issues
npm run format      # Format code
npm run type-check  # TypeScript checks
```

### Build for Production

```bash
npm run build       # Create production build
npm start           # Test production build
```

## 🔧 Environment Setup

1. Copy the environment template:

   ```bash
   # Windows
   Copy-Item .env.example .env.local

   # macOS/Linux
   cp .env.example .env.local
   ```

2. Edit `.env.local` with your settings (ask senior dev for values)

## 📚 Important Documentation

- **[README.md](../README.md)** - Project overview
- **[docs/SETUP.md](docs/SETUP.md)** - Detailed setup instructions
- **[docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)** - How to contribute
- **[docs/VERCEL_DEPLOYMENT.md](docs/VERCEL_DEPLOYMENT.md)** - Deployment guide

## 💡 Tips for Junior Developers

### Before You Start Coding

1. ✅ Pull latest changes: `git pull`
2. ✅ Install dependencies: `npm install`
3. ✅ Create a new branch: `git checkout -b feature/your-feature`

### Before You Commit

1. ✅ Format your code: `npm run format`
2. ✅ Fix linting issues: `npm run lint:fix`
3. ✅ Check TypeScript: `npm run type-check`
4. ✅ Test locally: `npm run dev`

### Git Workflow

```bash
# 1. Create a branch for your work
git checkout -b feature/add-new-button

# 2. Make your changes

# 3. Stage and commit
git add .
git commit -m "feat: add new button component"

# 4. Push to GitHub
git push origin feature/add-new-button

# 5. Open a Pull Request on GitHub
```

### Commit Message Format

Use this format:

```text
type(scope): description

Examples:
feat(ui): add new button component
fix(auth): resolve login issue
docs(readme): update setup instructions
style(header): fix alignment
```

Types:

- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation
- `style` - Code style (not CSS)
- `refactor` - Code refactoring
- `test` - Tests
- `chore` - Maintenance

## 🆘 Common Issues & Solutions

### Port 3000 Already in Use

```bash
# Windows
$env:PORT=3001; npm run dev

# macOS/Linux
PORT=3001 npm run dev
```

### Module Not Found

```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Environment Variables Not Working

- Restart dev server after changing `.env.local`
- Use `NEXT_PUBLIC_` prefix for client-side variables
- Ask senior dev if you're not sure what values to use

### TypeScript Errors

```bash
npm run type-check
```

Look at the errors and fix them one by one. Ask for help if stuck!

## 📞 Getting Help

1. **Check the docs** - Read [docs/SETUP.md](docs/SETUP.md) and [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md)
2. **Ask the team** - Contact [@StrayDogSyn](https://github.com/StrayDogSyn) or [@miasmith81](https://github.com/miasmith81)
3. **Search issues** - [GitHub Issues](https://github.com/StrayDogSyn/Lead-By-Example/issues)
4. **Create an issue** - If you find a bug or have questions

## 🎓 Learning Resources

### React & Next.js

- [React Official Tutorial](https://react.dev/learn)
- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Learn Course](https://nextjs.org/learn)

### TypeScript

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript in 5 Minutes](https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html)

### Tailwind CSS

- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Tailwind UI Components](https://tailwindui.com/)

## ✅ Next Steps

1. ✅ Run the setup script
2. ✅ Start the dev server
3. ✅ Explore the codebase in `src/`
4. ✅ Read the component examples
5. ✅ Ask questions when stuck
6. ✅ Start building!

**Remember**: Everyone starts somewhere. Don't hesitate to ask questions! 🚀

---

**Development Team:**

- Senior Developer: [@StrayDogSyn](https://github.com/StrayDogSyn)
- Junior Developer: [@miasmith81](https://github.com/miasmith81)
