# OTP Authentication Flow - Implementation Guide

## Overview
This document explains the complete Brevo OTP + Supabase authentication system after the recent refactor.

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│ FRONTEND (React + Vite)                                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. AuthRegister.tsx                                           │
│     ├─ Collects: email, full_name, phone                      │
│     └─ Calls: useAuth().register(email, fullName, phone)      │
│                                                                 │
│  2. OTPVerification.tsx                                        │
│     ├─ Input: 6-digit OTP                                     │
│     └─ Calls: useAuth().verifyOTP(otp)                        │
│                                                                 │
│  3. ProfileSetup.tsx                                           │
│     ├─ Uses: user from AuthContext (already authenticated)    │
│     └─ Creates: user profile + matrimony profile             │
│                                                                 │
│  AuthContext.tsx (State Management)                           │
│  ├─ register() → Calls Brevo via brevoOTP.ts                │
│  └─ verifyOTP() → Calls Backend API /api/verify-otp       │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BACKEND (Vercel Serverless Functions)                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  /api/verify-otp.js                                           │
│  ├─ Input: { email, otp, fullName }                          │
│  ├─ Step 1: Verify OTP in Supabase otp_verifications table   │
│  ├─ Step 2: Mark OTP as used                                 │
│  ├─ Step 3: Create/Get Supabase Auth user (Admin API)        │
│  ├─ Step 4: Create user profile in Supabase users table      │
│  └─ Output: { success, user: { id, email, full_name } }     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ EXTERNAL SERVICES                                               │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  1. Brevo (Email OTP Delivery)                               │
│     ├─ brevoOTP.ts: sendOTP(email, userName)                │
│     ├─ Generates: 6-digit code                              │
│     ├─ Sends: Email via Brevo API                           │
│     └─ Stores: OTP in Supabase otp_verifications table      │
│                                                                 │
│  2. Supabase (Database + Auth)                               │
│     ├─ Database Tables:                                       │
│     │  ├─ otp_verifications: Stores OTP codes                │
│     │  └─ users: Stores user profiles                        │
│     ├─ Auth Service:                                         │
│     │  └─ Admin API: Creates auth users                      │
│     └─ Session: Manages user sessions                        │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Flow Diagram

```
1. USER REGISTERS
   User enters email → AuthRegister.tsx
   ↓
   register(email, fullName, phone)
   ↓
   brevoOTPService.sendOTP(email, userName)
   ├─ Generate 6-digit OTP
   ├─ Store in supabase otp_verifications table
   └─ Send email via Brevo API
   ↓
   User receives OTP email

2. USER VERIFIES OTP
   User enters OTP → OTPVerification.tsx
   ↓
   verifyOTP(otp)
   ↓
   fetch('/api/verify-otp', { email, otp, fullName })
   ↓
   Backend /api/verify-otp.js:
   ├─ Query: otp_verifications table for matching OTP
   ├─ Check: OTP not expired (10 min), not already used
   ├─ Update: Mark OTP as verified (is_verified = true)
   ├─ Create: Supabase Auth user (email_confirm: true)
   ├─ Create: User profile in users table
   └─ Return: { success: true, user: { id, email, full_name } }
   ↓
   Frontend receives authenticated user data
   ↓
   AuthContext updates:
   ├─ setUser(authenticatedUser)
   ├─ Store in sessionStorage
   └─ User is NOW AUTHENTICATED

3. USER CREATES PROFILE
   User navigates to → ProfileSetup.tsx
   ↓
   Component reads: user from AuthContext (already authenticated)
   ↓
   Form submission:
   ├─ Create: User profile update
   ├─ Create: Matrimony profile
   └─ Redirect: To dashboard
   ↓
   User is now registered and logged in
```

## Key Changes from Previous Implementation

### ❌ What Was Removed
- ~~`supabase.auth.signUpWithOtp()`~~ - Replaced with Brevo
- ~~`supabase.auth.verifyOtp()`~~ - Replaced with backend API
- ~~Password-based authentication~~ - OTP only
- ~~Magic link emails~~ - Brevo OTP emails only
- ~~`getSession()` in ProfileSetup~~ - Moved to AuthContext

### ✅ What Was Added
- **Backend API** (`/api/verify-otp.js`) - Verifies OTP and creates Supabase users
- **Admin API Usage** - `supabase.auth.admin.createUser()` with `email_confirm: true`
- **Session Management** - User data stored in AuthContext after OTP verification
- **User Profile Creation** - Backend now creates initial user record

## Database Requirements

### Table: `otp_verifications`
```sql
CREATE TABLE otp_verifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL,
  otp_code TEXT NOT NULL,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  verified_at TIMESTAMP,
  expires_at TIMESTAMP DEFAULT (CURRENT_TIMESTAMP + INTERVAL '10 minutes')
);

-- Indexes for performance
CREATE INDEX idx_otp_verifications_email ON otp_verifications(email);
CREATE INDEX idx_otp_verifications_otp_code ON otp_verifications(otp_code);
```

### Table: `users`
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  full_name TEXT,
  phone_number TEXT,
  verified BOOLEAN DEFAULT false,
  user_type TEXT DEFAULT 'matrimony',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Configuration

### Frontend (.env.local or .env)
```env
# Supabase (Public)
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Brevo (Public)
VITE_BREVO_API_KEY=your-brevo-api-key

# App Configuration
VITE_APP_URL=http://localhost:5173
```

### Backend (Vercel Environment Variables)
```
VITE_SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

⚠️ **IMPORTANT**: 
- `SUPABASE_SERVICE_ROLE_KEY` should NEVER be exposed to frontend
- Only set in Vercel Project Settings → Environment Variables
- These are used only by serverless functions in `/api` directory

## Setup Instructions

### 1. Get Supabase Service Role Key
1. Go to Supabase Dashboard
2. Navigate to Settings → API
3. Copy **Service Role Key** (NOT anon key)
4. This is the `SUPABASE_SERVICE_ROLE_KEY`

### 2. Add Environment Variables to Vercel
1. Go to Project Settings
2. Go to Environment Variables
3. Add:
   - Key: `SUPABASE_SERVICE_ROLE_KEY`
   - Value: `your-service-role-key`
   - Set environments: Production, Preview, Development
4. Deploy changes

### 3. Test Locally
```bash
# Create .env.local if it doesn't exist
cp .env.example .env.local

# Add your keys:
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
VITE_BREVO_API_KEY=your-brevo-key

# Install dependencies
npm install

# Start development server
npm run dev
```

## File Structure
```
project-root/
├── src/
│   ├── context/
│   │   └── AuthContext.tsx          # State management
│   ├── pages/
│   │   ├── AuthRegister.tsx         # OTP registration
│   │   ├── OTPVerification.tsx       # OTP input
│   │   └── ProfileSetup.tsx         # Post-auth profile setup
│   └── services/
│       ├── brevoOTP.ts              # Brevo email service
│       └── supabase.ts              # Supabase services
├── api/
│   └── verify-otp.js                # Backend OTP verification
├── .env.example                     # Environment template
└── vercel.json                      # Vercel configuration
```

## Troubleshooting

### "No authenticated session found"
**Problem**: Profile setup fails because user is not authenticated
**Solution**: 
- Check that OTP verification completed successfully
- Verify `authenticated_user_id` in sessionStorage
- Check backend logs: `/api/verify-otp.js` output

### "Invalid OTP"
**Problem**: OTP verification fails in backend
**Solution**:
- Check OTP hasn't expired (10 minutes)
- Verify OTP wasn't already used
- Check `otp_verifications` table in Supabase
- Ensure email matches exactly (case-sensitive)

### "Failed to create user"
**Problem**: Backend fails to create Supabase auth user
**Solution**:
- Check `SUPABASE_SERVICE_ROLE_KEY` is set in Vercel
- Verify Supabase API is accessible
- Check user doesn't already exist
- Check Supabase database permissions

### "SUPABASE_SERVICE_ROLE_KEY is missing"
**Problem**: Backend API can't access Supabase
**Solution**:
- Add to Vercel Environment Variables
- Redeploy after adding environment variable
- Ensure it's set for correct environments

## Security Notes

1. **Service Role Key** is secret - never expose to frontend
2. **OTP expiration** is set to 10 minutes
3. **Email confirmation** is automatic - no additional email needed
4. **Password** is NOT used - OTP only authentication
5. **Session** is managed by Supabase auth service

## API Response Formats

### Success Response
```json
{
  "success": true,
  "user": {
    "id": "uuid-here",
    "email": "user@example.com",
    "full_name": "User Name",
    "verified": true
  },
  "message": "OTP verified successfully. Setting up session..."
}
```

### Error Response
```json
{
  "error": "Error message here"
}
```

## Next Steps

1. ✅ Backend API is created at `/api/verify-otp.js`
2. ✅ Frontend is updated to call backend API
3. ✅ AuthContext manages authenticated user state
4. ✅ ProfileSetup uses authenticated user
5. ⏳ Deploy to Vercel and test
6. ⏳ Monitor error logs during testing

## Testing Checklist

- [ ] User can register with email
- [ ] OTP email is received from Brevo
- [ ] OTP verification works in backend
- [ ] User is authenticated after OTP verification
- [ ] ProfileSetup can access authenticated user
- [ ] User profile is created successfully
- [ ] User can log in again (session persists)
- [ ] Expired OTP is rejected
- [ ] Used OTP is rejected
- [ ] Invalid OTP is rejected
