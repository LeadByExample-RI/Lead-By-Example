#!/bin/bash
# Lead By Example - Quick Setup Script for macOS/Linux
# This script automates the initial setup process

echo "🌟 Lead By Example - Quick Setup"
echo "================================="
echo ""

# Check if Node.js is installed
echo "📋 Checking prerequisites..."
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js $NODE_VERSION detected"
else
    echo "❌ Node.js is not installed!"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm $NPM_VERSION detected"
else
    echo "❌ npm is not installed!"
    exit 1
fi

echo ""
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Installation failed!"
    exit 1
fi

echo "✅ Dependencies installed successfully"
echo ""

# Create .env.local from .env.example
echo "🔧 Setting up environment variables..."
if [ -f ".env.example" ]; then
    if [ ! -f ".env.local" ]; then
        cp .env.example .env.local
        echo "✅ Created .env.local from .env.example"
        echo "   ⚠️  Please edit .env.local with your configuration"
    else
        echo "ℹ️  .env.local already exists, skipping..."
    fi
else
    echo "⚠️  .env.example not found, skipping..."
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "📚 Next steps:"
echo "   1. Edit .env.local with your configuration values"
echo "   2. Run 'npm run dev' to start the development server"
echo "   3. Open http://localhost:3000 in your browser"
echo ""
echo "💡 Helpful commands:"
echo "   npm run dev          - Start development server"
echo "   npm run build        - Build for production"
echo "   npm run lint         - Check code quality"
echo "   npm run format       - Format code"
echo ""
echo "🚀 Happy coding!"
