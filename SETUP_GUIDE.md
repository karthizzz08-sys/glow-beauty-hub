# Chettiar Connect - Step-by-Step Setup Guide

## Phase 1: Prerequisites Setup

### 1.1 Create Supabase Project
1. Go to https://supabase.com and sign up
2. Click "New Project"
3. Enter project name: "chettiar-connect"
4. Set a strong database password
5. Select region closest to your users
6. Wait for project to initialize (3-5 minutes)
7. Copy your project URL and anon key from the project settings

### 1.2 Create Brevo Account
1. Visit https://www.brevo.com
2. Sign up for free account
3. Go to Settings > API
4. Click "Create API key"
5. Select "API v3" for SMTP
6. Copy your API key (you'll need this for .env)

## Phase 2: Database Setup

### 2.1 Execute Database Schema
1. In Supabase dashboard, go to "SQL Editor"
2. Click "New Query"
3. Copy entire content from `SUPABASE_SCHEMA.sql`
4. Paste into the SQL editor
5. Click "Run" button
6. Wait for all queries to complete (should see green checkmarks)

### 2.2 Create Storage Buckets
1. Go to "Storage" in Supabase sidebar
2. Click "New bucket"
   - Name: `profile-photos`
   - Make public: ✓ (checked)
   - Create bucket
3. Create another bucket
   - Name: `horoscopes`
   - Make public: (unchecked) - keep private

### 2.3 Verify Tables Created
Go to "Table Editor" and confirm these tables exist:
- users
- matrimony_profiles
- sangam_directory
- otp_verifications
- premium_memberships
- profile_views
- interests
- shortlist
- success_stories

## Phase 3: Local Development Setup

### 3.1 Install Dependencies
```bash
cd chettiar-connect
npm install
# or if using bun
bun install
```

### 3.2 Create Environment File
Create `.env` file in root directory:

```env
# Copy these values from your Supabase project
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_ANON_KEY_HERE

# Copy this from Brevo API settings
VITE_BREVO_API_KEY=YOUR_BREVO_API_KEY_HERE

# App Configuration
VITE_APP_NAME=Chettiar Connect
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173
```

### 3.3 Start Development Server
```bash
npm run dev
# or
bun run dev
```

Access the app at: http://localhost:5173

## Phase 4: Test the Application

### 4.1 Test Registration Flow
1. Go to http://localhost:5173/register
2. Fill in: Name, Email, Phone
3. Check your email for OTP
4. Enter the 6-digit OTP
5. You should be logged in

### 4.2 Test Matrimony Module
1. Click "Browse Profiles"
2. Try filtering by city, profession
3. Verify search works

### 4.3 Test Sangam Directory
1. Click "Sangam Directory"
2. Verify directory entries load (if any exist)

### 4.4 Test Admin Dashboard
1. Manually set admin role in database (optional, for testing)
2. Go to http://localhost:5173/admin
3. Verify stats display correctly

## Phase 5: Deployment to Vercel

### 5.1 Prepare Git Repository
```bash
git init
git add .
git commit -m "Initial commit: Chettiar Connect platform"
```

### 5.2 Push to GitHub
1. Create GitHub repository
2. Add as remote:
```bash
git remote add origin https://github.com/USERNAME/REPO.git
git branch -M main
git push -u origin main
```

### 5.3 Import to Vercel
1. Go to https://vercel.com and sign in
2. Click "New Project"
3. Select your GitHub repository
4. Vercel will auto-detect settings (Vite)

### 5.4 Add Environment Variables
In Vercel project settings:
1. Go to Settings > Environment Variables
2. Add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_BREVO_API_KEY`
3. Deploy button will be enabled

### 5.5 Deploy
1. Click "Deploy" button
2. Wait for build to complete (2-3 minutes)
3. Your app will be live at https://YOUR-PROJECT.vercel.app

## Phase 6: Post-Deployment Tasks

### 6.1 Update Supabase Settings
1. Go to Supabase project settings
2. Add your Vercel URL to CORS whitelist:
   - Your production URL
   - Localhost (for development)

### 6.2 Test Live Application
1. Visit your deployed URL
2. Test registration flow
3. Test all major features
4. Check console for errors

### 6.3 Setup Custom Domain (Optional)
1. In Vercel, go to Settings > Domains
2. Add your custom domain
3. Follow DNS configuration steps

## Phase 7: Optional Enhancements

### 7.1 Add WhatsApp Integration
- Implement WhatsApp API for direct messaging
- Create WhatsApp button component

### 7.2 Add Payment Gateway
- Integrate Razorpay or Stripe for premium memberships
- Create subscription payment flow

### 7.3 Add Email Notifications
- Send welcome emails on registration
- Send profile verification emails
- Send interest notification emails

### 7.4 Add Analytics
- Setup Google Analytics
- Track user behavior
- Monitor performance

## Troubleshooting

### Issue: "VITE_SUPABASE_URL is not defined"
**Solution**: Check .env file exists and variables are defined correctly

### Issue: OTP emails not arriving
**Solution**: 
1. Check Brevo API key is correct
2. Check email address is valid
3. Check spam/junk folder
4. Verify Brevo account has email sending enabled

### Issue: Database queries failing
**Solution**:
1. Check Row Level Security policies are enabled
2. Verify tables were created successfully
3. Check SQL query errors in Supabase logs

### Issue: Images not uploading
**Solution**:
1. Verify storage buckets are created
2. Check bucket permissions are correct
3. Verify file size is within limits (5MB for photos, 3MB for documents)

### Issue: Deployment fails
**Solution**:
1. Check build logs in Vercel
2. Verify all environment variables are set
3. Check Node.js version compatibility
4. Try rebuilding project

## Security Checklist

- [ ] Database has Row Level Security enabled
- [ ] Sensitive data not committed to git
- [ ] .env file is in .gitignore
- [ ] API keys rotated periodically
- [ ] HTTPS enforced on domain
- [ ] Brevo API credentials are secure
- [ ] Supabase password is strong
- [ ] Custom domain has SSL certificate

## Performance Optimization

1. **Images**: Compress profile photos before upload
2. **Lazy Loading**: Images load only when needed
3. **Code Splitting**: React components split by route
4. **Caching**: Browser cache enabled for static assets
5. **CDN**: Vercel provides global CDN

## Next Steps

1. Add more features based on requirements
2. Implement payment gateway
3. Add email notifications
4. Setup analytics
5. Create mobile app (React Native)
6. Implement matching algorithm

---

**Questions?** Contact the development team.
