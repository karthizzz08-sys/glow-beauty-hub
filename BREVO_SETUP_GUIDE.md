# Brevo API Key Setup Guide

## ✅ Current Status

Your `.env.local` file already contains:
- ✅ `VITE_BREVO_API_KEY` - Configured
- ✅ `VITE_BREVO_SENDER_EMAIL` - Configured  
- ✅ `VITE_BREVO_SENDER_NAME` - Configured

## 🔧 Troubleshooting

### If you're still seeing the error:

**1. Restart your development server:**
```bash
# Stop the current server (Ctrl+C)
# Then restart it
npm run dev
# or
bun dev
```

**2. Clear cache:**
```bash
# Clear node modules
npm install
# or
bun install
```

**3. Check browser console:**
- Open Developer Tools (F12)
- Look for: `[Brevo Config] API Key: ✓ Loaded (xkeys...)`
- This confirms the environment variable is loaded

**4. Verify the API key is valid:**
- Go to https://app.brevo.com/settings/keys
- Check that the key in `.env.local` matches your actual Brevo API key
- API key should start with `xkeysib-`

### For Production (Vercel):

1. Go to **Vercel Dashboard** → Your Project
2. Navigate to **Settings** → **Environment Variables**
3. Add these variables:
   ```
   VITE_BREVO_API_KEY=xkeysib-your-key
   VITE_BREVO_SENDER_EMAIL=your-email
   VITE_BREVO_SENDER_NAME=Your Name
   ```
4. Redeploy: `git push` or click "Redeploy"

### Common Issues:

| Issue | Solution |
|-------|----------|
| `API key is missing` | Check `.env.local` exists in root directory and has `VITE_BREVO_API_KEY` |
| `401 Unauthorized` | API key is invalid or expired. Get new key from Brevo dashboard |
| `429 Too Many Requests` | You've hit rate limit. Wait 60 seconds before retrying |
| `Email sent but user doesn't receive` | Check spam folder, verify sender email is verified in Brevo |

## ✨ What We Fixed

1. **Environment Variable Reading**
   - Added fallback support for both `VITE_` prefix and unprefixed vars
   - Detects empty/whitespace keys and provides helpful error

2. **Better Error Messages**
   - Clear instructions when API key is missing
   - Shows partial key in logs (first 5 chars) for debugging
   - Specific error messages for 401, 400, 429, 5xx errors

3. **Vercel Compatibility**
   - Works with Vercel's environment variable system
   - Fallback pattern for different naming conventions

4. **Detailed Logging**
   - `[Brevo Config]` logs show which vars are loaded
   - `[Brevo API]` logs show API call details
   - Errors logged with helpful context

## 🚀 Quick Start

After setting up `.env.local`:

```bash
# 1. Restart dev server
npm run dev

# 2. Open browser console and check for:
# [Brevo Config] API Key: ✓ Loaded (xkeys...)
# [Brevo Config] Sender Email: ✓ Loaded (email)
# [Brevo Config] Sender Name: ✓ Loaded (name)

# 3. Test registration flow
# Navigate to /register
# Enter email and name
# Click "Continue with OTP"
# Check email for OTP
```

## 📝 Notes

- Never commit `.env.local` to git (already in `.gitignore`)
- Keep API keys secret - don't share them
- For testing, use a test email account
- Brevo free tier allows up to 300 emails/day

Need help? Check Brevo docs: https://brevo.com/help/
