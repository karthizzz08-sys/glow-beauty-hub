// Vercel Serverless Function - OTP Verification
// This file will be automatically handled by Vercel
// No TypeScript needed for serverless functions in Vercel

const { createClient } = require('@supabase/supabase-js');

// Initialize Supabase with service role (admin access)
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('[OTP API] Missing Supabase configuration:');
  console.error('- VITE_SUPABASE_URL:', supabaseUrl ? 'OK' : 'MISSING');
  console.error('- SUPABASE_SERVICE_ROLE_KEY:', supabaseServiceRoleKey ? 'OK' : 'MISSING');
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

module.exports = async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, otp, fullName } = req.body;

    // Validate inputs
    if (!email || !otp) {
      return res.status(400).json({ error: 'Email and OTP are required' });
    }

    console.log('[OTP Verify API] Processing OTP verification for:', email);

    // ✅ STEP 1: Verify OTP from database
    console.log('[OTP Verify API] Step 1: Verifying OTP in database...');
    
    const { data: otpRecords, error: otpQueryError } = await supabase
      .from('otp_verifications')
      .select('*')
      .eq('email', email)
      .eq('otp_code', otp)
      .eq('is_verified', false)
      .order('created_at', { ascending: false })
      .limit(1);

    if (otpQueryError) {
      console.error('[OTP Verify API] Database query error:', otpQueryError.message);
      return res.status(500).json({ error: 'Failed to verify OTP' });
    }

    if (!otpRecords || otpRecords.length === 0) {
      console.error('[OTP Verify API] ❌ OTP not found or already verified');
      return res.status(401).json({ error: 'Invalid OTP' });
    }

    const otpRecord = otpRecords[0];

    // Check if OTP is expired (10 minutes)
    const otpAge = (Date.now() - new Date(otpRecord.created_at).getTime()) / 1000 / 60;
    if (otpAge > 10) {
      console.error('[OTP Verify API] ❌ OTP expired (age:', otpAge.toFixed(2), 'minutes)');
      return res.status(401).json({ error: 'OTP has expired. Please request a new one.' });
    }

    console.log('[OTP Verify API] ✓ OTP verified successfully');

    // ✅ STEP 2: Mark OTP as verified
    console.log('[OTP Verify API] Step 2: Marking OTP as verified...');
    
    const { error: markError } = await supabase
      .from('otp_verifications')
      .update({ is_verified: true, verified_at: new Date().toISOString() })
      .eq('id', otpRecord.id);

    if (markError) {
      console.error('[OTP Verify API] Failed to mark OTP as verified:', markError.message);
      return res.status(500).json({ error: 'Failed to complete OTP verification' });
    }

    console.log('[OTP Verify API] ✓ OTP marked as verified');

    // ✅ STEP 3: Create Supabase Auth user using Admin API
    console.log('[OTP Verify API] Step 3: Creating Supabase Auth user...');
    
    // First check if user already exists
    const { data: existingUsers, error: listError } = await supabase.auth.admin.listUsers();
    
    if (listError) {
      console.error('[OTP Verify API] Failed to list users:', listError.message);
      return res.status(500).json({ error: 'Authentication service error' });
    }

    const existingUser = existingUsers?.users?.find(u => u.email === email);

    let userId;
    let session;

    if (existingUser) {
      console.log('[OTP Verify API] User already exists:', email);
      userId = existingUser.id;
      
      session = {
        user: {
          id: userId,
          email: email,
          email_confirmed_at: new Date().toISOString()
        },
        access_token: null,
      };

    } else {
      // Create new user
      console.log('[OTP Verify API] Creating new Supabase Auth user for:', email);
      
      const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
        email: email,
        email_confirm: true,
        user_metadata: {
          full_name: fullName || email.split('@')[0],
        }
      });

      if (createError) {
        console.error('[OTP Verify API] Failed to create user:', createError.message);
        return res.status(500).json({ error: createError.message || 'Failed to create user' });
      }

      if (!newUser?.user?.id) {
        console.error('[OTP Verify API] User created but no ID returned');
        return res.status(500).json({ error: 'User creation failed' });
      }

      userId = newUser.user.id;
      console.log('[OTP Verify API] ✓ User created successfully:', userId);

      session = {
        user: {
          id: userId,
          email: email,
          user_metadata: {
            full_name: fullName || email.split('@')[0],
          },
          email_confirmed_at: new Date().toISOString()
        },
        access_token: null,
      };
    }

    // ✅ STEP 4: Create user profile in users table
    console.log('[OTP Verify API] Step 4: Creating user profile in database...');
    
    const { error: profileError } = await supabase
      .from('users')
      .upsert({
        id: userId,
        email: email,
        full_name: fullName || email.split('@')[0],
        verified: true,
        user_type: 'matrimony',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'id'
      });

    if (profileError) {
      console.error('[OTP Verify API] Failed to create user profile:', profileError.message);
      // Continue anyway - auth user is created
    }

    console.log('[OTP Verify API] ✅ OTP VERIFICATION COMPLETE');
    console.log('[OTP Verify API] User ID:', userId);
    console.log('[OTP Verify API] Email:', email);

    // Return success with user data and instruction to set session
    return res.status(200).json({
      success: true,
      user: {
        id: userId,
        email: email,
        full_name: fullName || email.split('@')[0],
        verified: true,
      },
      message: 'OTP verified successfully. Setting up session...'
    });

  } catch (error) {
    console.error('[OTP Verify API] Unexpected error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return res.status(500).json({ error: errorMessage });
  }
};
