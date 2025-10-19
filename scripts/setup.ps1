#!/usr/bin/env pwsh
# Lead By Example - Quick Setup Script for Windows (PowerShell)
# This script automates the initial setup process

Write-Host "🌟 Lead By Example - Quick Setup" -ForegroundColor Cyan
Write-Host "=================================" -ForegroundColor Cyan
Write-Host ""

# Check if Node.js is installed
Write-Host "📋 Checking prerequisites..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js is not installed!" -ForegroundColor Red
    Write-Host "   Please install Node.js from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check if npm is installed
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion detected" -ForegroundColor Green
} catch {
    Write-Host "❌ npm is not installed!" -ForegroundColor Red
    exit 1
}

Write-Host ""
Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
npm install

if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Installation failed!" -ForegroundColor Red
    exit 1
}

Write-Host "✅ Dependencies installed successfully" -ForegroundColor Green
Write-Host ""

# Create .env.local from .env.example
Write-Host "🔧 Setting up environment variables..." -ForegroundColor Yellow
if (Test-Path ".env.example") {
    if (!(Test-Path ".env.local")) {
        Copy-Item ".env.example" ".env.local"
        Write-Host "✅ Created .env.local from .env.example" -ForegroundColor Green
        Write-Host "   ⚠️  Please edit .env.local with your configuration" -ForegroundColor Yellow
    } else {
        Write-Host "ℹ️  .env.local already exists, skipping..." -ForegroundColor Blue
    }
} else {
    Write-Host "⚠️  .env.example not found, skipping..." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "✅ Setup complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📚 Next steps:" -ForegroundColor Cyan
Write-Host "   1. Edit .env.local with your configuration values" -ForegroundColor White
Write-Host "   2. Run 'npm run dev' to start the development server" -ForegroundColor White
Write-Host "   3. Open http://localhost:3000 in your browser" -ForegroundColor White
Write-Host ""
Write-Host "💡 Helpful commands:" -ForegroundColor Cyan
Write-Host "   npm run dev          - Start development server" -ForegroundColor White
Write-Host "   npm run build        - Build for production" -ForegroundColor White
Write-Host "   npm run lint         - Check code quality" -ForegroundColor White
Write-Host "   npm run format       - Format code" -ForegroundColor White
Write-Host ""
Write-Host "🚀 Happy coding!" -ForegroundColor Green
