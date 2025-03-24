import { authenticator } from 'otplib';
import { supabase } from './supabase';
import { sendEmail, EMAIL_TEMPLATES } from './email';

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
    const response = await fetch('/api/auth/generate-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error generating OTP:', data.error);
      return null;
    }
    
    return 'sent'; // We don't return the actual OTP for security
  } catch (error) {
    console.error('Error generating OTP:', error);
    return null;
  }
}

export async function verifyOTP(email: string, otp: string): Promise<boolean> {
  try {
    const response = await fetch('/api/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      console.error('Error verifying OTP:', data.error);
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return false;
  }
} 