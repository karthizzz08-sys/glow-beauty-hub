# Chettiar Connect - Premium Matrimony & Community Platform

A modern full-stack matrimony and community directory platform designed specifically for the Chettiar community, built with React, Vite, Tailwind CSS, and Supabase.

## 🌟 Features

### 1. **Matrimony Module**
- Premium profile creation with verification
- Multiple photo gallery uploads
- Horoscope document upload
- Advanced profile search with filters (city, profession, education, age)
- Interest request system
- Shortlist functionality
- Profile views tracking
- Premium membership badges

### 2. **Sangam Community Directory**
- Community member directory
- Search by city, district, profession
- Contact details sharing for events
- WhatsApp integration
- Direct call functionality
- Function-specific categories (weddings, events, etc.)
- Easy community networking

### 3. **OTP Authentication**
- Email OTP verification via Brevo
- Secure authentication flow
- OTP expiry management
- Resend functionality

### 4. **Admin Dashboard**
- User and profile management
- Verification controls
- Premium subscription management
- Dashboard statistics
- Profile approval/rejection system

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui
- **Backend**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth + Brevo Email OTP
- **File Storage**: Supabase Storage
- **Deployment**: Vercel

## 📦 Installation & Setup

### Prerequisites
- Node.js 16+ and npm/bun
- Supabase account
- Brevo account

### 1. Clone and Install Dependencies

```bash
git clone <repository-url>
cd chettiar-connect
npm install
# or
bun install
```

### 2. Setup Environment Variables

Create a `.env` file in the root directory:

```env
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Brevo Email OTP
VITE_BREVO_API_KEY=your-brevo-api-key

# App Configuration
VITE_APP_NAME=Chettiar Connect
VITE_APP_ENV=development
VITE_APP_URL=http://localhost:5173
```

### 3. Setup Supabase

1. Create a new Supabase project
2. Execute the SQL schema from `SUPABASE_SCHEMA.sql`:
   - Go to SQL Editor in Supabase dashboard
   - Copy the entire schema file content
   - Execute all queries

3. Create Storage Buckets:
   - `profile-photos` (Public)
   - `horoscopes` (Private)

4. Enable Row Level Security (RLS) policies as per the schema

### 4. Setup Brevo Email OTP

1. Sign up at Brevo (https://www.brevo.com)
2. Get your API key from Settings
3. Add it to your `.env` file as `VITE_BREVO_API_KEY`

### 5. Run Development Server

```bash
npm run dev
# or
bun run dev
```

The application will be available at `http://localhost:5173`

## 📁 Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn/ui components
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navbar.tsx      # Navigation bar
│   └── Footer.tsx      # Footer component
├── pages/              # Page components
│   ├── Home.tsx        # Homepage
│   ├── AuthRegister.tsx
│   ├── OTPVerification.tsx
│   ├── BrowseMatrimony.tsx
│   ├── SangamDirectory.tsx
│   └── AdminDashboard.tsx
├── services/           # API services
│   ├── supabase.ts     # Supabase client & services
│   └── brevoOTP.ts     # Brevo OTP service
├── context/            # React context
│   └── AuthContext.tsx  # Authentication context
├── types/              # TypeScript type definitions
│   └── index.ts
├── constants/          # App constants
│   └── index.ts
├── utils/              # Utility functions
│   └── helpers.ts
├── App.tsx             # Main app component
└── main.tsx            # Entry point
```

## 🚀 Features & Routes

### Public Routes
- `/` - Homepage
- `/browse` - Browse matrimony profiles
- `/sangam-directory` - Community directory
- `/register` - User registration
- `/verify-otp` - OTP verification

### Protected Routes (Login Required)
- `/matrimony/edit` - Edit matrimony profile
- `/matrimony/dashboard` - User dashboard
- `/sangam-directory/edit` - Edit directory entry
- `/admin` - Admin dashboard

## 🎨 Design System

### Color Palette
- **Primary (Maroon)**: #a53f3a (Premium, trustworthy)
- **Secondary (Gold)**: #d4a574 (Prosperity, elegance)
- **Background**: White with subtle gradients

### Typography
- **Serif**: Cormorant Garamond (Headings, elegant feel)
- **Sans-serif**: Inter (Body text, readability)

## 🔐 Security Features

1. **Row Level Security (RLS)**: All Supabase tables protected
2. **OTP Verification**: Email-based authentication
3. **Secure File Storage**: Private horoscope bucket
4. **Profile Verification**: Admin approval system
5. **Data Encryption**: HTTPS/SSL enforced

## 📦 Deployment to Vercel

### 1. Push to Git

```bash
git add .
git commit -m "Initial commit: Chettiar Connect platform"
git push origin main
```

### 2. Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### 3. Set Environment Variables

During deployment, add your environment variables:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_BREVO_API_KEY`

### 4. Configure Vercel Settings

- Framework: Vite
- Build Command: `npm run build`
- Install Command: `npm install`
- Output Directory: `dist`

## 📱 Mobile Responsive

- Fully responsive design
- Mobile-first approach
- Touch-friendly UI elements
- Optimized performance for mobile networks

## 🎯 Premium Membership Plans

### Basic Plan (₹2,999/month)
- View 50 profiles
- Send 5 interests
- Verification badge
- Chat with matches

### Premium Plan (₹5,999/month)
- Unlimited profile views
- Unlimited interests
- Premium badge
- Priority verification
- Video call feature
- Advanced search filters

### Platinum Plan (₹9,999/month)
- All Premium features
- Dedicated matchmaker support
- 24/7 customer support
- Personality compatibility score
- Exclusive success stories
- Annual retreat invitation

## 📞 Support & Contact

For issues or feature requests:
- Email: support@chettiarconnect.com
- Phone: +91 88888 88888

## 📄 License

This project is proprietary and confidential.

## 🙏 Acknowledgments

Built with love for the Chettiar community worldwide.

---

**Version**: 1.0.0  
**Last Updated**: May 2024
