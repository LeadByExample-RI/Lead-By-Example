# Lead By Example - Contributing Guidelines

Thank you for your interest in contributing to Lead By Example! This document provides guidelines and instructions for contributing to this project.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)
- [Documentation](#documentation)

## 📜 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and professional in all interactions.

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/Lead-By-Example.git
   cd Lead-By-Example
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Set up environment**
   ```bash
   cp .env.example .env.local
   ```
5. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

## 🔄 Development Workflow

1. Make your changes
2. Run linting and formatting
   ```bash
   npm run lint
   npm run format
   ```
3. Test your changes
   ```bash
   npm run dev
   ```
4. Commit your changes
5. Push to your fork
6. Open a Pull Request

## 💻 Coding Standards

### TypeScript

- Use TypeScript for all new files
- Define proper types and interfaces
- Avoid using `any` type

### React Components

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types

### File Structure

```
src/
├── components/      # Reusable UI components
├── pages/          # Next.js pages
├── styles/         # Global styles
├── utils/          # Utility functions
├── hooks/          # Custom hooks
├── context/        # Context providers
└── types/          # TypeScript types
```

### Naming Conventions

- Components: `PascalCase` (e.g., `Button.tsx`)
- Utilities: `camelCase` (e.g., `formatDate.ts`)
- Constants: `UPPER_SNAKE_CASE`
- CSS classes: `kebab-case`

## 📝 Commit Guidelines

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
type(scope): description

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```bash
feat(auth): add user authentication
fix(ui): resolve button alignment issue
docs(readme): update installation instructions
```

## 🔍 Pull Request Process

1. **Update Documentation**
   - Update README.md if needed
   - Add/update comments in code

2. **Ensure Quality**
   - All tests pass
   - Code is properly formatted
   - No linting errors

3. **Write Good PR Description**
   - Describe what changes were made
   - Link related issues
   - Include screenshots for UI changes

4. **Request Review**
   - Wait for maintainer review
   - Address feedback promptly

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update

## Testing
How was this tested?

## Screenshots (if applicable)
Add screenshots here
```

## 🧪 Testing

Before submitting a PR:

```bash
# Run linting
npm run lint

# Check types
npm run type-check

# Format code
npm run format

# Run tests (when available)
npm test
```

## 📚 Documentation

- Update documentation for any new features
- Add JSDoc comments to functions
- Update README.md if needed
- Keep code comments clear and concise

## 🎯 Areas to Contribute

- **Features**: New functionality
- **Bug Fixes**: Fix existing issues
- **Documentation**: Improve docs
- **Performance**: Optimize code
- **Accessibility**: Improve a11y
- **Testing**: Add test coverage

## 🤔 Questions?

- Open a [Discussion](https://github.com/StrayDogSyn/Lead-By-Example/discussions)
- Check existing [Issues](https://github.com/StrayDogSyn/Lead-By-Example/issues)
- Read the [Setup Guide](SETUP.md)
- Contact: <support@leadbyexample.org>

Thank you for contributing! 🎉
