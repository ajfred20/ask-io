import { authenticator } from 'otplib';
import { supabase } from './supabase';
import { sendEmail } from './email';

// Configure OTP settings
authenticator.options = {
  step: 300, // 5 minutes
  window: 1, // Allow 1 step before/after for time drift
};

export interface OTPRecord {
  id: string;
  email: string;
  otp: string;
  created_at: string;
  expires_at: string;
  verified: boolean;
}

export async function generateOTP(email: string): Promise<string | null> {
  try {
    // Generate a 6-digit OTP
    const otp = authenticator.generateToken(email + process.env.OTP_SECRET);
    
    // Store OTP in database
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes from now
    
    const { error } = await supabase
      .from('email_otps')
      .insert({
        email,
        otp,
        created_at: new Date().toISOString(),
        expires_at: expiresAt.toISOString(),
        verified: false
      });

    if (error) {
      console.error('Error storing OTP:', error);
      return null;
    }

    // Send OTP email
    const emailSent = await sendEmail({
      to: email,
      ...EMAIL_TEMPLATES.VERIFY_EMAIL(otp)
    });

    if (!emailSent) {
      console.error('Error sending OTP email');
      return null;
    }

    return otp;
  } catch (error) {
    console.error('Error generating OTP:', error);
    return null;
  }
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  try {
    // Get stored OTP
    const { data, error } = await supabase
      .from('email_otps')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      console.error('Error verifying OTP:', error);
      return false;
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from('email_otps')
      .update({ verified: true })
      .eq('id', data.id);

    if (updateError) {
      console.error('Error updating OTP status:', updateError);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
} 