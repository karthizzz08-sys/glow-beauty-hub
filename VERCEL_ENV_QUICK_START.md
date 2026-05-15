# QUICK VERCEL SETUP - Environment Variables

## ⚠️ Your Current Issue
```
[Supabase Config] URL: Missing
[Supabase Config] Anon Key: Missing
```

This means environment variables are NOT set in your Vercel project.

---

## 🚀 STEP-BY-STEP FIX (5 minutes)

### Step 1: Get Your Supabase Credentials
1. Go to: https://app.supabase.com
2. Login → Select your project
3. Click **Settings** → **API** (left menu)
4. Copy these values:
   ```
   Project URL → VITE_SUPABASE_URL
   Anon Key → VITE_SUPABASE_ANON_KEY
   ```

### Step 2: Open Vercel Project Settings
1. Go to: https://vercel.com/dashboard
2. Click your project: **glow-beauty-hub**
3. Click **Settings** (top menu bar)

### Step 3: Add Environment Variables
1. Click **Environment Variables** (left sidebar)
2. For each variable below, click **"Add New"**:

#### Variable #1: VITE_SUPABASE_URL
- **Name:** `VITE_SUPABASE_URL`
- **Value:** `https://xxxxx.supabase.co` (your URL from Step 1)
- **Environments:** ✓ Production ✓ Preview ✓ Development
- Click **Add**

#### Variable #2: VITE_SUPABASE_ANON_KEY
- **Name:** `VITE_SUPABASE_ANON_KEY`
- **Value:** Your anon key from Step 1 (starts with `eyJ...`)
- **Environments:** ✓ Production ✓ Preview ✓ Development
- Click **Add**

### Step 4: Redeploy
Option A (Automatic):
- Go to **Deployments** tab
- Click **Redeploy** on latest deployment

Option B (Push commit):
```bash
git add .
git commit -m "fix: Update environment configuration"
git push origin main
```

### Step 5: Verify
- Wait 2-3 minutes for deployment
- Visit your site
- Open browser DevTools (F12 → Console tab)
- Look for: `[Supabase] ✓ Client initialized successfully`

---

## ✅ VERIFICATION

After redeployment, check console messages:

### ✓ SUCCESS (what you want to see):
```
[Supabase] Configuration Status:
[Supabase] VITE_SUPABASE_URL: ✓ Loaded
[Supabase] VITE_SUPABASE_ANON_KEY: ✓ Loaded
[Supabase] ✓ Client initialized successfully
```

### ✗ FAILURE (current state):
```
[Supabase] Configuration Status:
[Supabase] VITE_SUPABASE_URL: ✗ Missing
[Supabase] VITE_SUPABASE_ANON_KEY: ✗ Missing
Error: Missing required environment variables...
```

---

## 🔍 COMMON MISTAKES TO AVOID

❌ **Wrong:** Adding quotes in value
- ❌ `"https://xxx.supabase.co"` 
- ✓ `https://xxx.supabase.co`

❌ **Wrong:** Uppercase variable names
- ❌ `VITE-SUPABASE-URL` or `vite_supabase_url`
- ✓ `VITE_SUPABASE_URL` (exact case matters!)

❌ **Wrong:** Partial URL
- ❌ `xxx.supabase` or `supabase.co`
- ✓ `https://xxx.supabase.co` (full URL needed)

❌ **Wrong:** Forgetting to select all environments
- ❌ Only selecting "Production"
- ✓ Select all: Production + Preview + Development

❌ **Wrong:** Not redeploying after adding variables
- ❌ Adding variables but assuming deployment updates automatically
- ✓ Always redeploy after adding env vars

---

## 🆘 TROUBLESHOOTING

### Still seeing "Missing" error after redeeploy?

1. **Verify variables were saved:**
   - Settings → Environment Variables
   - Check BOTH variables appear in the list

2. **Check spelling exactly:**
   - `VITE_SUPABASE_URL` (not `VITE_SUPABASE_URL_`)
   - `VITE_SUPABASE_ANON_KEY` (not `VITE_SUPABASE_ANON_KEY_`)

3. **Verify all environments selected:**
   - Should show ✓ for Production, Preview, Development

4. **Force redeploy:**
   - Deployments → Click ... on latest → Redeploy
   - Wait 3-5 minutes

5. **Check deployment logs:**
   - Deployments → Click on latest deployment
   - Look for errors in build log

### Getting "Failed to initialize Supabase client" error?

1. Verify URL format: `https://abcd1234.supabase.co` (must end in `.co`)
2. Verify it's not just a copy/paste with extra spaces
3. Verify anon key is not empty or malformed
4. Check your Supabase project status: https://app.supabase.com

### Features still not working (login, database)?

1. Ensure variables are set (see "VERIFICATION" section above)
2. Test in a new incognito/private browser window
3. Clear browser cache and reload: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
4. Open DevTools (F12) and check Console for specific errors

---

## 📋 ENVIRONMENT VARIABLES CHECKLIST

- [ ] Supabase credentials copied from app.supabase.com
- [ ] VITE_SUPABASE_URL added to Vercel with correct spelling
- [ ] VITE_SUPABASE_ANON_KEY added to Vercel with correct spelling
- [ ] Both variables set to ALL environments (Production/Preview/Development)
- [ ] Project redeployed after adding variables
- [ ] Waited 2-3 minutes for deployment to complete
- [ ] Checked browser console for success message
- [ ] Tested login functionality
- [ ] Tested database features (browse profiles, etc.)

---

## 📞 NEED MORE HELP?

See full guide: `ENV_SETUP_GUIDE.md` (in project root)

**Key files involved:**
- `src/services/supabase.ts` - Supabase configuration
- `.env.example` - Environment variable template
- `vite.config.ts` - Build configuration

**Check these if issues persist:**
1. Browser Console (F12 → Console tab) for exact error
2. Vercel Deployment logs
3. Supabase project status
