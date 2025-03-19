import { supabase } from './supabase';
import { User, SafeUser } from './models/user';

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
    });

    if (authError || !authData.user) {
      console.error('Error registering user:', authError);
      return null;
    }

    // Create user profile in the database
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .insert([
        { 
          id: authData.user.id, 
          email, 
          name,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }
      ])
      .select()
      .single();

    if (userError || !userData) {
      console.error('Error creating user profile:', userError);
      return null;
    }

    return userData as SafeUser;
  } catch (error) {
    console.error('Unexpected error during registration:', error);
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

    if (authError || !authData.user) {
      console.error('Error logging in:', authError);
      return null;
    }

    // Get user profile from database
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user profile:', userError);
      return null;
    }

    return userData as SafeUser;
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

    // Get user profile from database
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', sessionData.session.user.id)
      .single();

    if (userError || !userData) {
      console.error('Error fetching user profile:', userError);
      return null;
    }

    return userData as SafeUser;
  } catch (error) {
    console.error('Unexpected error getting current user:', error);
    return null;
  }
};

// Update user profile
export const updateUserProfile = async (
  id: string, 
  updates: { name?: string; bio?: string; profile_picture?: string }
): Promise<SafeUser | null> => {
  try {
    const { data: userData, error: userError } = await supabase
      .from('profiles')
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (userError || !userData) {
      console.error('Error updating user profile:', userError);
      return null;
    }

    return userData as SafeUser;
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