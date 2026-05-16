// Brevo Email OTP Service
import { otpService } from './supabase';

const BREVO_API_KEY = import.meta.env.VITE_BREVO_API_KEY;
const BREVO_SENDER_EMAIL = import.meta.env.VITE_BREVO_SENDER_EMAIL;
const BREVO_SENDER_NAME = import.meta.env.VITE_BREVO_SENDER_NAME;
const BREVO_API_URL = 'https://api.brevo.com/v3';

// Debug: Log Brevo configuration
console.log('[Brevo Config] API Key:', BREVO_API_KEY ? '✓ Loaded' : '✗ Missing');
console.log('[Brevo Config] Sender Email:', BREVO_SENDER_EMAIL ? '✓ Loaded' : '✗ Missing');
console.log('[Brevo Config] Sender Name:', BREVO_SENDER_NAME ? '✓ Loaded' : '✗ Missing');

// Validate Brevo configuration
if (!BREVO_API_KEY) {
  console.error('[Brevo Error] API key not configured. Please set VITE_BREVO_API_KEY in .env.local');
}
if (!BREVO_SENDER_EMAIL) {
  console.error('[Brevo Error] Sender email not configured. Please set VITE_BREVO_SENDER_EMAIL in .env.local');
}
if (!BREVO_SENDER_NAME) {
  console.error('[Brevo Error] Sender name not configured. Please set VITE_BREVO_SENDER_NAME in .env.local');
}

// Generate random 6-digit OTP
function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Send OTP via Brevo
export async function sendOTPEmail(email: string, otp: string, userName?: string): Promise<void> {
  try {
    // Validate configuration
    if (!BREVO_API_KEY) {
      const error = new Error('Brevo API key is missing. Check VITE_BREVO_API_KEY in .env.local');
      console.error('[Brevo Error]', error.message);
      throw error;
    }
    if (!BREVO_SENDER_EMAIL) {
      const error = new Error('Brevo sender email is missing. Check VITE_BREVO_SENDER_EMAIL in .env.local');
      console.error('[Brevo Error]', error.message);
      throw error;
    }
    if (!BREVO_SENDER_NAME) {
      const error = new Error('Brevo sender name is missing. Check VITE_BREVO_SENDER_NAME in .env.local');
      console.error('[Brevo Error]', error.message);
      throw error;
    }

    console.log('[Brevo API] Sending OTP email to:', email);
    console.log('[Brevo API] Sender:', `${BREVO_SENDER_NAME} <${BREVO_SENDER_EMAIL}>`);

    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        to: [{ email, name: userName || 'User' }],
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        subject: 'Your Chettiar Connect OTP',
        htmlContent: generateOTPEmailTemplate(otp, userName),
      }),
    });

    // Handle HTTP errors
    if (!response.ok) {
      const responseText = await response.text();
      let errorMessage = `Brevo API Error (${response.status})`;
      
      if (response.status === 401) {
        errorMessage = '[Brevo 401] Unauthorized - Invalid API key. Check VITE_BREVO_API_KEY in .env.local';
      } else if (response.status === 400) {
        errorMessage = `[Brevo 400] Bad Request - ${responseText}`;
      } else if (response.status === 429) {
        errorMessage = '[Brevo 429] Too Many Requests - Rate limited. Try again later';
      } else if (response.status >= 500) {
        errorMessage = `[Brevo ${response.status}] Server Error - Brevo service is unavailable`;
      }
      
      console.error(errorMessage, responseText);
      throw new Error(errorMessage);
    }

    console.log('[Brevo Success] OTP sent successfully to', email);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Brevo Error] Failed to send OTP:', errorMessage);
    throw error;
  }
}

// HTML Template for OTP Email
function generateOTPEmailTemplate(otp: string, name?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4a574 0%, #a53f3a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: #f9f9f9; padding: 30px; }
        .otp-box { background: white; border: 2px solid #d4a574; padding: 20px; text-align: center; border-radius: 8px; margin: 20px 0; }
        .otp-code { font-size: 36px; font-weight: bold; color: #a53f3a; letter-spacing: 2px; font-family: 'Courier New', monospace; }
        .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
        .warning { color: #a53f3a; font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🌟 Chettiar Connect</h1>
          <p>Premium Matrimony & Community Platform</p>
        </div>
        <div class="content">
          <p>Dear ${name || 'User'},</p>
          <p>Thank you for joining Chettiar Connect! Your One-Time Password (OTP) for verification is:</p>
          <div class="otp-box">
            <div class="otp-code">${otp}</div>
          </div>
          <p>This OTP is valid for <span class="warning">10 minutes</span> only. Please do not share this code with anyone.</p>
          <p>If you didn't request this OTP, please ignore this email.</p>
          <p>
            <strong>Need help?</strong> Contact us at support@chettiarconnect.com
          </p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Chettiar Connect. All rights reserved.</p>
          <p>This is a system-generated email. Please do not reply.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Send Password Reset Email
export async function sendPasswordResetEmail(email: string, resetLink: string, userName?: string): Promise<void> {
  try {
    // Validate configuration
    if (!BREVO_API_KEY) {
      const error = new Error('Brevo API key is missing. Check VITE_BREVO_API_KEY in .env.local');
      console.error('[Brevo Error]', error.message);
      throw error;
    }
    if (!BREVO_SENDER_EMAIL) {
      const error = new Error('Brevo sender email is missing. Check VITE_BREVO_SENDER_EMAIL in .env.local');
      console.error('[Brevo Error]', error.message);
      throw error;
    }

    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'api-key': BREVO_API_KEY,
      },
      body: JSON.stringify({
        to: [{ email, name: userName || 'User' }],
        sender: { name: BREVO_SENDER_NAME, email: BREVO_SENDER_EMAIL },
        subject: 'Password Reset Request - Chettiar Connect',
        htmlContent: generatePasswordResetEmailTemplate(resetLink, userName),
      }),
    });

    if (!response.ok) {
      const responseText = await response.text();
      let errorMessage = `Brevo API Error (${response.status})`;
      
      if (response.status === 401) {
        errorMessage = '[Brevo 401] Unauthorized - Invalid API key';
      } else if (response.status === 400) {
        errorMessage = `[Brevo 400] Bad Request - ${responseText}`;
      }
      
      console.error(errorMessage);
      throw new Error(errorMessage);
    }

    console.log('[Brevo Success] Password reset email sent to', email);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error('[Brevo Error] Failed to send password reset email:', errorMessage);
    throw error;
  }
}

function generatePasswordResetEmailTemplate(resetLink: string, name?: string): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #d4a574 0%, #a53f3a 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .header h1 { margin: 0; font-size: 28px; }
        .content { background: #f9f9f9; padding: 30px; }
        .button { display: inline-block; background: #a53f3a; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
        .footer { background: #f0f0f0; padding: 20px; text-align: center; font-size: 12px; color: #666; border-radius: 0 0 10px 10px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🔐 Password Reset</h1>
        </div>
        <div class="content">
          <p>Dear ${name || 'User'},</p>
          <p>We received a request to reset your password for your Chettiar Connect account.</p>
          <p>Click the button below to reset your password:</p>
          <a href="${resetLink}" class="button">Reset Password</a>
          <p>This link is valid for <strong>24 hours</strong>.</p>
          <p>If you didn't request this, you can ignore this email.</p>
        </div>
        <div class="footer">
          <p>&copy; 2024 Chettiar Connect. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

// Service to manage OTP
export const brevoOTPService = {
  generateOTP,

  /**
   * Generate OTP, send via Brevo email, and store in database
   * @param email - User email
   * @param userName - User name for email template
   * @returns The generated OTP code
   */
  async sendOTP(email: string, userName?: string): Promise<string> {
    try {
      // Step 1: Generate 6-digit OTP
      const otp = generateOTP();
      console.log('[OTP Flow] Generated OTP:', otp, 'for email:', email);

      // Step 2: Send OTP via Brevo email
      await sendOTPEmail(email, otp, userName);
      console.log('[OTP Flow] Email sent successfully to:', email);

      // Step 3: Store OTP in Supabase database
      console.log('[OTP Flow] Storing OTP in database...');
      const { data, error } = await otpService.createOTP(email, otp);

      // ✅ FIXED: Proper error checking
      if (error) {
        console.error('[OTP Storage Error] Supabase error:', error);
        throw new Error(`Database error: ${error.message || 'Failed to store OTP'}`);
      }

      if (!data) {
        console.error('[OTP Storage Error] No data returned from insert');
        throw new Error('OTP was not stored in database');
      }

      console.log('[OTP Stored Successfully]', {
        id: data.id,
        email: data.email,
        expires_at: data.expires_at,
        created_at: data.created_at,
      });

      return otp;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err);
      console.error('[OTP Flow Error]', errorMessage);
      throw err;
    }
  },

  async sendPasswordReset(email: string, resetLink: string, userName?: string): Promise<void> {
    await sendPasswordResetEmail(email, resetLink, userName);
  },

  validateOTP(otp: string): boolean {
    return /^\d{6}$/.test(otp);
  },

  isOTPExpired(createdAt: Date, expiryMinutes: number = 10): boolean {
    const now = new Date();
    const diffInMinutes = (now.getTime() - createdAt.getTime()) / (1000 * 60);
    return diffInMinutes > expiryMinutes;
  },
};

export default brevoOTPService;
