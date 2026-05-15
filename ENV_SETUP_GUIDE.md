# Environment Variables Setup Guide

## Overview
Your Glow Beauty Hub application requires Supabase environment variables to function. These must be configured both for local development and Vercel deployment.

---

## Local Development Setup

### Step 1: Create .env file
In the project root directory, create a `.env` file (copy from `.env.example`):

```bash
# SUPABASE CONFIGURATION
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# BREVO EMAIL OTP (Optional, for OTP feature)
VITE_BREVO_API_KEY=your-brevo-api-key

# APP CONFIGURATION
VITE_APP_NAME=Chettiar Connect
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173

# STORAGE
VITE_STORAGE_URL=https://your-project.supabase.co/storage/v1/object/public
```

### Step 2: Get Supabase Credentials
1. Visit: https://app.supabase.com
2. Select your project
3. Go to **Settings** → **API**
4. Copy the following values:
   - **Project URL** → Use for `VITE_SUPABASE_URL`
   - **Anon Key** → Use for `VITE_SUPABASE_ANON_KEY`

### Step 3: Restart Development Server
```bash
npm run dev
```

---

## Vercel Deployment Setup

### ⚠️ IMPORTANT: Add Environment Variables to Vercel

Your Vercel deployment needs these environment variables to work correctly.

#### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your project: **glow-beauty-hub**

#### Step 2: Add Environment Variables
1. Click **Settings** (top menu)
2. Click **Environment Variables** (left sidebar)
3. Add each variable individually:

**Variable 1:**
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://your-project.supabase.co` (replace with your actual URL)
- **Environment:** Select all (Production, Preview, Development)
- Click **Add**

**Variable 2:**
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** Your actual anon key from Supabase
- **Environment:** Select all (Production, Preview, Development)
- Click **Add**

**Variable 3:** (Optional - for OTP feature)
- **Name:** `VITE_BREVO_API_KEY`
- **Value:** Your Brevo API key
- **Environment:** Select all
- Click **Add**

#### Step 3: Redeploy Your Project
After adding environment variables:
1. Go to **Deployments** tab
2. Click the three dots (...) on your latest deployment
3. Click **Redeploy**
4. Or simply push a new commit to trigger automatic deployment

---

## Getting Your Supabase Credentials

### Find Your Supabase Project URL & Anon Key

1. Go to: https://app.supabase.com
2. Login with your account
3. Select your project (e.g., "glow-beauty-hub" or similar)
4. Click **Settings** (left sidebar, bottom)
5. Click **API** tab
6. You'll see:
   - **Project URL:** This is your `VITE_SUPABASE_URL`
   - **Anon Key:** This is your `VITE_SUPABASE_ANON_KEY` (usually labeled as "public")

**Example values (replace with yours):**
```
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## Troubleshooting

### Error: "Missing Supabase configuration"

**Problem:** You see an error like:
```
[Supabase] ERROR: VITE_SUPABASE_URL is not set
[Supabase] ERROR: VITE_SUPABASE_ANON_KEY is not set
```

**Solution:**
1. Verify `.env` file exists in project root
2. Verify environment variables are spelled exactly as shown above (case-sensitive)
3. Verify values don't have extra spaces or quotes
4. Restart your dev server: `npm run dev`
5. For Vercel: Re-add environment variables and redeploy

### Error: "Failed to initialize Supabase client"

**Problem:** Environment variables exist but Supabase client won't initialize

**Solution:**
1. Verify the URL format: `https://xxxx.supabase.co` (must include `.supabase.co`)
2. Verify the anon key is not empty and is valid
3. Check that your Supabase project is not deleted/archived
4. Check Supabase project status: https://app.supabase.com

### Features Not Working After Deployment

**Problem:** App works locally but features fail on Vercel

**Solution:**
1. Verify all environment variables are added to Vercel (not just one or two)
2. Ensure you selected "All" environments (Production, Preview, Development)
3. Redeploy after adding/changing environment variables
4. Wait 2-3 minutes for deployment to complete
5. Check browser console for specific errors (F12 → Console tab)

---

## Environment Variables Reference

| Variable | Purpose | Example |
|----------|---------|---------|
| `VITE_SUPABASE_URL` | Supabase project URL | `https://abcdefgh.supabase.co` |
| `VITE_SUPABASE_ANON_KEY` | Supabase anonymous key | JWT token starting with `eyJ...` |
| `VITE_BREVO_API_KEY` | Brevo email service key | Used for OTP emails |
| `VITE_APP_NAME` | App display name | `Chettiar Connect` |
| `VITE_APP_ENV` | Environment | `development` or `production` |
| `VITE_APP_URL` | App base URL | `http://localhost:5173` |

---

## Security Notes

⚠️ **Important Security Information:**

- The `VITE_SUPABASE_ANON_KEY` is intentionally "public" - it's visible in browser code
- Use Supabase Row Level Security (RLS) to protect sensitive data
- Never share your `.env` file or commit it to Git
- The `.env` file should be in `.gitignore` (it already is)
- For production, only use Vercel's Environment Variables feature

---

## Next Steps

After setting up environment variables:

1. ✅ Verify local development works: `npm run dev`
2. ✅ Test login/registration features
3. ✅ Test matrimony profile features
4. ✅ Push changes to GitHub
5. ✅ Verify Vercel deployment automatically triggers
6. ✅ Test deployed app at: `https://your-vercel-domain.vercel.app`

---

## Still Having Issues?

Check these files for environment variable usage:
- `src/services/supabase.ts` - Main Supabase configuration
- `src/services/brevoOTP.ts` - Email OTP service
- `vite.config.ts` - Vite build configuration

Or create an issue in your repository with:
1. Error message from console (F12 → Console tab)
2. Screenshot of your Vercel environment variables page
3. Confirmation that variables are added to all environments
