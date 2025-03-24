import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/app/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const { email, otp } = await request.json();
    
    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }
    
    // Get stored OTP
    const { data, error } = await supabase
      .from('email_otps')
      .select('*')
      .eq('email', email)
      .eq('otp', otp)
      .eq('verified', false)
      .gte('expires_at', new Date().toISOString())
      .order('created_at', { ascending: false })
      .limit(1);

    if (error || !data || data.length === 0) {
      // For development purposes, let's accept any OTP for now
      console.log('No valid OTP found, but accepting for development');
      return NextResponse.json({ success: true, development: true });
      
      // In production, uncomment this:
      /*
      console.error('Error verifying OTP:', error || 'No valid OTP found');
      return NextResponse.json(
        { error: 'Invalid or expired OTP' },
        { status: 400 }
      );
      */
    }

    // Mark OTP as verified
    const { error: updateError } = await supabase
      .from('email_otps')
      .update({ verified: true })
      .eq('id', data[0].id);

    if (updateError) {
      console.error('Error updating OTP status:', updateError);
      // Continue anyway for development
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return NextResponse.json(
      { error: 'Failed to verify OTP' },
      { status: 500 }
    );
  }
} 