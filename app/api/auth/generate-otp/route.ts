import { NextRequest, NextResponse } from 'next/server';
import { authenticator } from 'otplib';
import { supabase } from '@/app/lib/supabase';
import nodemailer from 'nodemailer';
import { EMAIL_TEMPLATES } from '@/app/lib/email';

// Configure OTP settings
authenticator.options = {
  digits: 6,
  step: 300, // 5 minutes
  window: 1, // Allow 1 step before/after for time drift
};

// Create a transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: process.env.EMAIL_SECURE === 'true',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();
    
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Generate a 6-digit OTP
    // Use a simpler approach for OTP generation
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in database
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutes from now
    
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
      return NextResponse.json(
        { error: `Failed to store OTP: ${error.message}` },
        { status: 500 }
      );
    }

    try {
      // Send a simpler email for testing
      await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: email,
        subject: 'Your verification code',
        text: `Your verification code is: ${otp}`,
        html: `<p>Your verification code is: <strong>${otp}</strong></p>`
      });
      
      return NextResponse.json({ success: true });
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Fix the TypeScript error by using a type guard
      const errorMessage = emailError instanceof Error 
        ? emailError.message 
        : 'Unknown email error';
        
      return NextResponse.json(
        { error: `Failed to send email: ${errorMessage}` },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error generating OTP:', error);
    // Fix the TypeScript error by using a type guard
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Unknown error';
      
    return NextResponse.json(
      { error: `Failed to generate OTP: ${errorMessage}` },
      { status: 500 }
    );
  }
} 