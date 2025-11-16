# Security Verification Script
# Run this before committing to ensure no sensitive files are included

Write-Host "🔍 Checking for sensitive files..." -ForegroundColor Cyan
Write-Host ""

# Check for .env files
$envFiles = git ls-files | Select-String -Pattern "\.env$|\.env\.local$|\.env\.development\.local$|\.env\.production\.local$"
if ($envFiles) {
    Write-Host "❌ DANGER: Environment files found in Git!" -ForegroundColor Red
    Write-Host $envFiles
    Write-Host ""
    Write-Host "Run: git rm --cached <filename>" -ForegroundColor Yellow
    $hasIssues = $true
} else {
    Write-Host "✅ No .env files tracked in Git" -ForegroundColor Green
}

# Check for Stripe keys in code
Write-Host ""
Write-Host "🔍 Checking for hardcoded Stripe keys..." -ForegroundColor Cyan
$stripeKeys = git grep -n "sk_live_|pk_live_|sk_test_|pk_test_|whsec_" -- "*.ts" "*.tsx" "*.js" "*.jsx" 2>$null
if ($stripeKeys) {
    Write-Host "❌ DANGER: Possible Stripe keys found in code!" -ForegroundColor Red
    Write-Host $stripeKeys
    Write-Host ""
    Write-Host "Remove hardcoded keys immediately!" -ForegroundColor Yellow
    $hasIssues = $true
} else {
    Write-Host "✅ No hardcoded Stripe keys detected" -ForegroundColor Green
}

# Check staged files
Write-Host ""
Write-Host "🔍 Checking staged files..." -ForegroundColor Cyan
$stagedEnv = git diff --cached --name-only | Select-String -Pattern "\.env"
if ($stagedEnv) {
    Write-Host "❌ WARNING: .env files are staged for commit!" -ForegroundColor Red
    Write-Host $stagedEnv
    Write-Host ""
    Write-Host "Run: git reset HEAD <filename>" -ForegroundColor Yellow
    $hasIssues = $true
} else {
    Write-Host "✅ No sensitive files staged" -ForegroundColor Green
}

# Check .gitignore
Write-Host ""
Write-Host "🔍 Verifying .gitignore..." -ForegroundColor Cyan
if (Test-Path ".gitignore") {
    $gitignoreContent = Get-Content ".gitignore" -Raw
    $requiredPatterns = @(".env", ".env*.local", "stripe_install/")
    $allPresent = $true
    
    foreach ($pattern in $requiredPatterns) {
        if ($gitignoreContent -notmatch [regex]::Escape($pattern)) {
            Write-Host "❌ Missing pattern in .gitignore: $pattern" -ForegroundColor Red
            $allPresent = $false
            $hasIssues = $true
        }
    }
    
    if ($allPresent) {
        Write-Host "✅ .gitignore properly configured" -ForegroundColor Green
    }
} else {
    Write-Host "❌ .gitignore file not found!" -ForegroundColor Red
    $hasIssues = $true
}

# Summary
Write-Host ""
Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
if ($hasIssues) {
    Write-Host "❌ SECURITY ISSUES FOUND - FIX BEFORE COMMITTING!" -ForegroundColor Red
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "See SECURITY_ENV_GUIDE.md for detailed instructions" -ForegroundColor Yellow
    exit 1
} else {
    Write-Host "✅ ALL SECURITY CHECKS PASSED!" -ForegroundColor Green
    Write-Host "═══════════════════════════════════════" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Safe to commit! 🚀" -ForegroundColor Cyan
    exit 0
}
