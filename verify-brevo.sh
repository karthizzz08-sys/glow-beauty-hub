#!/bin/bash
# Brevo API Key Verification Script
# Run this to verify your Brevo setup

echo "🔍 Brevo Configuration Verification"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

# Check if .env.local exists
if [ ! -f ".env.local" ]; then
    echo "❌ .env.local file not found!"
    echo "   Run: cp .env.example .env.local"
    exit 1
fi

echo "✅ .env.local file found"
echo ""

# Check VITE_BREVO_API_KEY
if grep -q "VITE_BREVO_API_KEY=" .env.local; then
    API_KEY=$(grep "VITE_BREVO_API_KEY=" .env.local | cut -d'=' -f2)
    if [ -z "$API_KEY" ] || [ "$API_KEY" = "your_actual_api_key_here" ]; then
        echo "❌ VITE_BREVO_API_KEY is empty or placeholder"
        echo "   Set your actual API key from https://app.brevo.com/settings/keys"
    elif [[ $API_KEY == xkeysib-* ]]; then
        echo "✅ VITE_BREVO_API_KEY is set (${API_KEY:0:10}...)"
    else
        echo "⚠️  VITE_BREVO_API_KEY looks invalid (should start with 'xkeysib-')"
    fi
else
    echo "❌ VITE_BREVO_API_KEY not found in .env.local"
fi
echo ""

# Check VITE_BREVO_SENDER_EMAIL
if grep -q "VITE_BREVO_SENDER_EMAIL=" .env.local; then
    SENDER_EMAIL=$(grep "VITE_BREVO_SENDER_EMAIL=" .env.local | cut -d'=' -f2)
    if [ -z "$SENDER_EMAIL" ]; then
        echo "⚠️  VITE_BREVO_SENDER_EMAIL is empty (will use default)"
    else
        echo "✅ VITE_BREVO_SENDER_EMAIL is set: $SENDER_EMAIL"
    fi
else
    echo "⚠️  VITE_BREVO_SENDER_EMAIL not found (will use default)"
fi
echo ""

# Check VITE_BREVO_SENDER_NAME
if grep -q "VITE_BREVO_SENDER_NAME=" .env.local; then
    SENDER_NAME=$(grep "VITE_BREVO_SENDER_NAME=" .env.local | cut -d'=' -f2)
    if [ -z "$SENDER_NAME" ]; then
        echo "⚠️  VITE_BREVO_SENDER_NAME is empty (will use default)"
    else
        echo "✅ VITE_BREVO_SENDER_NAME is set: $SENDER_NAME"
    fi
else
    echo "⚠️  VITE_BREVO_SENDER_NAME not found (will use default)"
fi
echo ""

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📝 Next Steps:"
echo "1. Restart your dev server: npm run dev (or bun dev)"
echo "2. Open browser console (F12)"
echo "3. Look for: [Brevo Config] API Key: ✓ Loaded"
echo "4. Test registration: Navigate to /register"
echo ""
