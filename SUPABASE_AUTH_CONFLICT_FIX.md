# Supabase Email Confirmation Conflict - Fix Guide

## Problem

Supabase Auth is sending "Confirm your signup" emails while we're using OTP (One-Time Password) via Brevo for verification.

### Current Issue:
1. User registers → OTP sent via Brevo (correct)
2. User verifies OTP → Supabase Auth user created (this triggers email confirmation)
3. Supabase sends duplicate confirmation email (unwanted)

## ✅ Solution

### Step 1: Disable Email Confirmation in Supabase Dashboard

1. Go to **https://app.supabase.com** → Select your project
2. Navigate to **Authentication** → **Policies** (left sidebar)
3. Look for "Email Confirmation" setting
4. **Disable** "Require email confirmation to sign up"
5. Save changes

### Step 2: What We've Fixed in Code

**brevoOTP.ts:**
- ✅ OTP stored in `otp_verifications` table
- ✅ 10-minute expiry verification
- ✅ Email sent via Brevo only

**supabase.ts (authService):**
- ✅ `signUpWithPassword` now explicitly disables email confirmation redirect
- ✅ Sets `email_verified: true` in user metadata
- ✅ Won't trigger Supabase's email confirmation flow

**AuthContext.tsx (verifyOTP):**
- ✅ Better error handling for existing users
- ✅ Enhanced logging for debugging
- ✅ Proper user creation only after OTP verification
- ✅ `user_type: 'matrimony'` added to profile

### Step 3: Complete Auth Flow (After Fix)

```
1. /register (User enters Name + Email)
   ↓ Call register()
   
2. OTP sent via BREVO (not Supabase)
   ↓ OTP stored in otp_verifications table
   
3. /verify-otp (User enters 6-digit OTP)
   ↓ Call verifyOTP()
   
4. OTP validated from database
   ↓ Mark OTP as verified
   
5. Supabase Auth user created
   ✓ Email confirmation DISABLED
   ✓ No confirmation email sent
   
6. User profile created in users table
   ↓ Mark user as verified=true
   
7. /signup (Multi-step profile form)
   ↓ Fill 4-step form
   
8. Save matrimony profile
   ↓ Redirect to /dashboard
   
9. Dashboard shows user info
   ✓ User fully onboarded
```

## 📊 Comparison: Before vs After

### Before (Problem):
- User receives OTP email (Brevo) ✓
- User receives Confirmation email (Supabase) ✗ DUPLICATE
- User receives Profile email (?) ✗ UNWANTED

### After (Fixed):
- User receives OTP email (Brevo) ✓
- No confirmation email (Supabase disabled) ✓
- Clean auth flow ✓

## 🔍 Verifying the Fix

### In Browser Console:

```javascript
// Check 1: OTP verification
[Auth] Verifying OTP for email: user@example.com
[Auth] OTP verified successfully
[Auth] OTP marked as verified

// Check 2: Supabase Auth creation
[Auth] Creating Supabase Auth user...
[Auth] New Supabase Auth user created: [user-id]

// Check 3: Profile creation
[Auth] Creating new user profile...
[Auth] User profile created successfully
[Auth] OTP verification flow completed successfully
```

### Email Received:
- ✅ One OTP email from Brevo
- ✗ No confirmation email from Supabase

## 🚀 Supabase Dashboard Settings

Navigate to: **Authentication** → **Settings** → **Email**

Look for these settings:

| Setting | Status | Action |
|---------|--------|--------|
| **Require email confirmation** | SHOULD BE OFF | Disable if on |
| **Email confirmation link validity** | Can be any | OTP expires in 10min instead |
| **Single email change confirmation** | Can be ON or OFF | Doesn't affect signup |
| **Email change token expiry** | Can be any | Not used for OTP flow |

## 📝 Code Changes Summary

### File: `src/services/supabase.ts`
```typescript
// BEFORE:
return supabase.auth.signUp({ email, password });

// AFTER:
return supabase.auth.signUp({ 
  email, 
  password,
  options: {
    emailRedirectTo: undefined,  // Disable confirmation redirect
    data: {
      email_verified: true,      // Mark as verified via OTP
    }
  }
});
```

### File: `src/context/AuthContext.tsx`
- Added detailed logging at each step
- Better error handling for existing users
- Added `user_type: 'matrimony'` to user profile
- Cleaner flow with explicit comments

## ✨ Why This is Better

1. **No Duplicate Emails**
   - Users only receive 1 email (OTP)
   - No confusing confirmation emails

2. **Faster Onboarding**
   - OTP validation is instant
   - No need for link confirmation
   - Better user experience

3. **Better Control**
   - We control the entire auth flow
   - Easy to customize
   - No Supabase auto-emails

4. **Secure**
   - OTP verified against database
   - 10-minute expiry
   - Rate limited (60-second wait between attempts)

## 🆘 Troubleshooting

### Still receiving confirmation emails?
1. Verify you disabled email confirmation in Supabase
2. Clear browser cache
3. Restart dev server: `npm run dev` or `bun dev`
4. Check Supabase project settings again

### User not created after OTP?
1. Check browser console for errors (F12)
2. Verify OTP is valid (6 digits, not expired)
3. Check that user isn't already in Supabase Auth
4. Look for [Auth] logs in console

### OTP not received?
1. Check spam/junk folder
2. Verify Brevo API key is set: `VITE_BREVO_API_KEY`
3. Check browser console for [Brevo] errors
4. Verify sender email is configured in Brevo

## 📚 Related Files

- `src/services/brevoOTP.ts` - Brevo OTP service
- `src/services/supabase.ts` - Auth service
- `src/context/AuthContext.tsx` - Auth context
- `src/pages/OTPVerification.tsx` - OTP verification UI
- `.env.local` - Environment variables

## 📞 More Help

- Supabase Auth docs: https://supabase.com/docs/guides/auth
- Brevo Email docs: https://brevo.com/help/
- Project README: Check SETUP_GUIDE.md
