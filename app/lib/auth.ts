import { supabase } from './supabase';

export interface SafeUser {
  id: string;
  email: string;
  name: string;
  bio?: string;
  profilePicture?: string;
  createdAt: string;
  updatedAt: string;
}

// Register a new user
export const registerUser = async (
  email: string, 
  password: string, 
  name: string
): Promise<SafeUser | null> => {
  try {
    // Register with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          name: name, // Store name in user metadata
        },
      },
    });

    if (authError || !authData.user) {
      console.error('Error registering user:', authError);
      return null;
    }

    // Create user profile in MongoDB
    const response = await fetch('/api/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: authData.user.id,
        email,
        name,
      }),
    });

    if (!response.ok) {
      console.error('Error creating user profile in MongoDB');
      return null;
    }

    const { profile } = await response.json();
    
    return {
      id: profile.supabaseId,
      email: profile.email,
      name: profile.name,
      bio: profile.bio,
      profilePicture: profile.profilePicture,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    };
  } catch (error) {
    console.error('Unexpected error registering user:', error);
    return null;
  }
};

// Login user
export const loginUser = async (
  email: string, 
  password: string
): Promise<SafeUser | null> => {
  try {
    // Sign in with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      if (authError.message.includes('Email not confirmed')) {
        console.error('Email not confirmed. Please check your email for a confirmation link.');
        // For development, let's try to sign up again to trigger email confirmation
        await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/login`
          }
        });
      }
      console.error('Error logging in:', authError);
      return null;
    }

    if (!authData.user) {
      return null;
    }

    // Get user profile from MongoDB
    const response = await fetch(`/api/user/profile?userId=${authData.user.id}`);
    
    if (!response.ok) {
      // If profile doesn't exist, create it
      if (response.status === 404) {
        const createResponse = await fetch('/api/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: authData.user.id,
            email: authData.user.email,
            name: authData.user.user_metadata?.name || 'User',
          }),
        });
        
        if (!createResponse.ok) {
          console.error('Error creating user profile in MongoDB');
          return null;
        }
        
        const { profile } = await createResponse.json();
        
        return {
          id: profile.supabaseId,
          email: profile.email,
          name: profile.name,
          bio: profile.bio,
          profilePicture: profile.profilePicture,
          createdAt: profile.createdAt,
          updatedAt: profile.updatedAt
        };
      }
      
      console.error('Error fetching user profile from MongoDB');
      return null;
    }

    const { profile } = await response.json();
    
    return {
      id: profile.supabaseId,
      email: profile.email,
      name: profile.name,
      bio: profile.bio,
      profilePicture: profile.profilePicture,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    };
  } catch (error) {
    console.error('Unexpected error during login:', error);
    return null;
  }
};

// Get current user
export const getCurrentUser = async (): Promise<SafeUser | null> => {
  try {
    // Get current session
    const { data: sessionData } = await supabase.auth.getSession();
    
    if (!sessionData.session?.user) {
      return null;
    }

    // Get user profile from MongoDB
    const response = await fetch(`/api/user/profile?userId=${sessionData.session.user.id}`);
    
    if (!response.ok) {
      // If profile doesn't exist, create it
      if (response.status === 404) {
        const createResponse = await fetch('/api/user/profile', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId: sessionData.session.user.id,
            email: sessionData.session.user.email,
            name: sessionData.session.user.user_metadata?.name || 'User',
          }),
        });
        
        if (!createResponse.ok) {
          console.error('Error creating user profile in MongoDB');
          return null;
        }
        
        const { profile } = await createResponse.json();
        
        return {
          id: profile.supabaseId,
          email: profile.email,
          name: profile.name,
          bio: profile.bio,
          profilePicture: profile.profilePicture,
          createdAt: profile.createdAt,
          updatedAt: profile.updatedAt
        };
      }
      
      console.error('Error fetching user profile from MongoDB');
      return null;
    }

    const { profile } = await response.json();
    
    return {
      id: profile.supabaseId,
      email: profile.email,
      name: profile.name,
      bio: profile.bio,
      profilePicture: profile.profilePicture,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    };
  } catch (error) {
    console.error('Unexpected error getting current user:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (
  id: string, 
  updates: { name?: string; bio?: string; profilePicture?: string }
): Promise<SafeUser | null> => {
  try {
    const response = await fetch('/api/user/profile', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userId: id,
        ...updates,
      }),
    });

    if (!response.ok) {
      console.error('Error updating user profile in MongoDB');
      return null;
    }

    const { profile } = await response.json();
    
    return {
      id: profile.supabaseId,
      email: profile.email,
      name: profile.name,
      bio: profile.bio,
      profilePicture: profile.profilePicture,
      createdAt: profile.createdAt,
      updatedAt: profile.updatedAt
    };
  } catch (error) {
    console.error('Unexpected error updating profile:', error);
    return null;
  }
};

// Sign out
export const signOut = async (): Promise<boolean> => {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
      return false;
    }
    return true;
  } catch (error) {
    console.error('Unexpected error signing out:', error);
    return false;
  }
}; 