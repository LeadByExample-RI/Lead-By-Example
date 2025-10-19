# Lead By Example - Quick Setup Guide

This guide will help collaborators get started with the project quickly.

## Prerequisites

Ensure you have the following installed on your system:

- **Node.js** v18.0.0 or higher ([Download](https://nodejs.org/))
- **npm** v9.0.0 or higher (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))

Verify your installations:

```bash
node --version
npm --version
git --version
```

## Quick Installation (One Command)

For a fast setup, run this single command in your terminal:

**Windows (PowerShell):**

```powershell
git clone https://github.com/StrayDogSyn/Lead-By-Example.git; cd Lead-By-Example; npm install; Copy-Item .env.example .env.local; Write-Host "Setup complete! Run 'npm run dev' to start."
```

**macOS/Linux:**

```bash
git clone https://github.com/StrayDogSyn/Lead-By-Example.git && cd Lead-By-Example && npm install && cp .env.example .env.local && echo "Setup complete! Run 'npm run dev' to start."
```

**Or use the automated setup script:**

```powershell
# Windows
.\scripts\setup.ps1

# macOS/Linux
chmod +x scripts/setup.sh
./scripts/setup.sh
```

## Step-by-Step Installation

### 1. Clone the Repository

```bash
git clone https://github.com/StrayDogSyn/Lead-By-Example.git
cd Lead-By-Example
```

### 2. Install Dependencies

Choose your preferred package manager:

```bash
# Using npm (recommended)
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

This will install all dependencies listed in `package.json`.

### 3. Configure Environment Variables

Copy the environment template:

```bash
# On macOS/Linux
cp .env.example .env.local

# On Windows (PowerShell)
Copy-Item .env.example .env.local

# On Windows (Command Prompt)
copy .env.example .env.local
```

Then edit `.env.local` with your specific configuration values.

### 4. Start Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000)

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm start` | Start production server (after build) |
| `npm run lint` | Run ESLint to check code quality |
| `npm run lint:fix` | Auto-fix ESLint issues |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check code formatting |
| `npm run type-check` | Run TypeScript type checking |
| `npm test` | Run tests |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |

## Project Structure Overview

```text
Lead-By-Example/
├── .env.example          # Environment variables template
├── .env.local           # Local environment (create this, gitignored)
├── package.json         # Dependencies and scripts
├── vercel.json          # Vercel deployment configuration
├── next.config.js       # Next.js configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
├── client_assets/       # Project assets and resources
├── public/              # Static files (images, fonts, etc.)
└── src/
    ├── components/      # Reusable React components
    ├── pages/          # Next.js pages/routes
    ├── styles/         # Global styles and themes
    ├── utils/          # Utility functions
    ├── hooks/          # Custom React hooks
    ├── context/        # React Context providers
    └── types/          # TypeScript type definitions
```

## Common Issues & Solutions

### Port 3000 Already in Use

If port 3000 is already in use, you can:

```bash
# Specify a different port
PORT=3001 npm run dev
```

### Module Not Found Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### TypeScript Errors

```bash
# Regenerate TypeScript definitions
npm run type-check
```

## Environment Variables

Key environment variables you may need to configure:

- `NEXT_PUBLIC_APP_URL` - Your application URL
- `NEXT_PUBLIC_APP_NAME` - Application name
- `NODE_ENV` - Environment (development/production)

See `.env.example` for a complete list of available variables.

## Deployment to Vercel

### Option 1: Using Vercel CLI

```bash
# Install Vercel CLI globally
npm install -g vercel

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

### Option 2: Using Git Integration

1. Push your code to GitHub
2. Visit [vercel.com](https://vercel.com)
3. Import your repository
4. Configure environment variables
5. Deploy!

Vercel will automatically detect your Next.js project and configure optimal settings.

## Contributing

Before submitting a pull request:

1. Ensure code passes linting: `npm run lint`
2. Format your code: `npm run format`
3. Run type checking: `npm run type-check`
4. Test your changes thoroughly
5. Update documentation if needed

See [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

## Need Help?

- Check [Issues](https://github.com/StrayDogSyn/Lead-By-Example/issues)
- Start a [Discussion](https://github.com/StrayDogSyn/Lead-By-Example/discussions)
- Contact: <support@leadbyexample.org>

## Next Steps

1. ✅ Install dependencies
2. ✅ Configure environment variables
3. ✅ Start development server
4. 📚 Read the [README.md](README.md) for project overview
5. 🎨 Explore the components in `src/components/`
6. 🚀 Start building!

Happy coding! 🎉
