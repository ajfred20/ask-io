import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/app/lib/mongodb';
import UserProfile from '@/app/models/UserProfile';
import { createClient } from '@supabase/supabase-js';

// Create a Supabase client to verify the user
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || ''
);

// Get user profile
export async function GET(request: NextRequest) {
  try {
    // Get the user ID from the query parameters
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    
    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Find the user profile
    const userProfile = await UserProfile.findOne({ supabaseId: userId });
    
    if (!userProfile) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ profile: userProfile });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user profile' },
      { status: 500 }
    );
  }
}

// Create or update user profile
export async function POST(request: NextRequest) {
  try {
    const { userId, email, name, bio, profilePicture } = await request.json();
    
    if (!userId || !email) {
      return NextResponse.json(
        { error: 'User ID and email are required' },
        { status: 400 }
      );
    }
    
    // Connect to MongoDB
    await connectToDatabase();
    
    // Check if profile already exists
    let userProfile = await UserProfile.findOne({ supabaseId: userId });
    
    if (userProfile) {
      // Update existing profile
      userProfile.name = name || userProfile.name;
      userProfile.bio = bio !== undefined ? bio : userProfile.bio;
      userProfile.profilePicture = profilePicture !== undefined ? profilePicture : userProfile.profilePicture;
      userProfile.updatedAt = new Date();
      
      await userProfile.save();
    } else {
      // Create new profile
      userProfile = await UserProfile.create({
        supabaseId: userId,
        email,
        name: name || 'User',
        bio,
        profilePicture,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    
    return NextResponse.json({ success: true, profile: userProfile });
  } catch (error) {
    console.error('Error creating/updating user profile:', error);
    return NextResponse.json(
      { error: 'Failed to create/update user profile' },
      { status: 500 }
    );
  }
} 