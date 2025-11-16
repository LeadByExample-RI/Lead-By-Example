#!/bin/bash
# Security Verification Script
# Run this before committing to ensure no sensitive files are included

echo "🔍 Checking for sensitive files..."
echo ""

HAS_ISSUES=false

# Check for .env files
echo "🔍 Checking for tracked .env files..."
ENV_FILES=$(git ls-files | grep -E "\.env$|\.env\.local$|\.env\.development\.local$|\.env\.production\.local$")
if [ ! -z "$ENV_FILES" ]; then
    echo "❌ DANGER: Environment files found in Git!"
    echo "$ENV_FILES"
    echo ""
    echo "Run: git rm --cached <filename>"
    HAS_ISSUES=true
else
    echo "✅ No .env files tracked in Git"
fi

# Check for Stripe keys in code
echo ""
echo "🔍 Checking for hardcoded Stripe keys..."
STRIPE_KEYS=$(git grep -n "sk_live_\|pk_live_\|sk_test_\|pk_test_\|whsec_" -- "*.ts" "*.tsx" "*.js" "*.jsx" 2>/dev/null)
if [ ! -z "$STRIPE_KEYS" ]; then
    echo "❌ DANGER: Possible Stripe keys found in code!"
    echo "$STRIPE_KEYS"
    echo ""
    echo "Remove hardcoded keys immediately!"
    HAS_ISSUES=true
else
    echo "✅ No hardcoded Stripe keys detected"
fi

# Check staged files
echo ""
echo "🔍 Checking staged files..."
STAGED_ENV=$(git diff --cached --name-only | grep "\.env")
if [ ! -z "$STAGED_ENV" ]; then
    echo "❌ WARNING: .env files are staged for commit!"
    echo "$STAGED_ENV"
    echo ""
    echo "Run: git reset HEAD <filename>"
    HAS_ISSUES=true
else
    echo "✅ No sensitive files staged"
fi

# Check .gitignore
echo ""
echo "🔍 Verifying .gitignore..."
if [ -f ".gitignore" ]; then
    REQUIRED_PATTERNS=(".env" ".env*.local" "stripe_install/")
    ALL_PRESENT=true
    
    for pattern in "${REQUIRED_PATTERNS[@]}"; do
        if ! grep -q "$pattern" .gitignore; then
            echo "❌ Missing pattern in .gitignore: $pattern"
            ALL_PRESENT=false
            HAS_ISSUES=true
        fi
    done
    
    if [ "$ALL_PRESENT" = true ]; then
        echo "✅ .gitignore properly configured"
    fi
else
    echo "❌ .gitignore file not found!"
    HAS_ISSUES=true
fi

# Summary
echo ""
echo "═══════════════════════════════════════"
if [ "$HAS_ISSUES" = true ]; then
    echo "❌ SECURITY ISSUES FOUND - FIX BEFORE COMMITTING!"
    echo "═══════════════════════════════════════"
    echo ""
    echo "See SECURITY_ENV_GUIDE.md for detailed instructions"
    exit 1
else
    echo "✅ ALL SECURITY CHECKS PASSED!"
    echo "═══════════════════════════════════════"
    echo ""
    echo "Safe to commit! 🚀"
    exit 0
fi
