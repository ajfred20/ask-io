"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SafeUser } from '../lib/models/user';
import { registerUser, loginUser, getCurrentUser, updateUserProfile, signOut } from '../lib/auth';
import { supabase } from '../lib/supabase';

interface AuthContextType {
  user: SafeUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => Promise<void>;
  updateProfile: (updates: { name?: string; bio?: string; profile_picture?: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setLoading(true);
        if (session) {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
        } else {
          setUser(null);
        }
        setLoading(false);
      }
    );

    // Initial session check
    const initializeAuth = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    initializeAuth();

    // Cleanup subscription
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const loggedInUser = await loginUser(email, password);
      if (loggedInUser) {
        setUser(loggedInUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      setLoading(true);
      
      // Add a delay to avoid rate limiting
      const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
      
      const success = await registerUser(email, password, name);
      
      if (success) {
        // Fetch the user after registration
        await delay(1000); // Wait 1 second
        const currentUser = await getCurrentUser();
        setUser(currentUser);
        return true;
      }
      
      // If the regular registration failed, try using the service role API
      try {
        await delay(1000); // Wait 1 second to avoid rate limiting
        
        const { data: authData } = await supabase.auth.signUp({
          email,
          password,
        });
        
        if (authData.user) {
          await delay(1000); // Wait 1 second
          
          // Create profile using service role API
          const response = await fetch('/api/auth/create-profile', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: authData.user.id,
              email,
              name
            }),
          });
          
          if (response.ok) {
            await delay(1000); // Wait 1 second
            // Fetch the user after profile creation
            const currentUser = await getCurrentUser();
            setUser(currentUser);
            return true;
          }
        }
      } catch (serviceError) {
        console.error('Error using service role for profile creation:', serviceError);
      }
      
      return false;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async (): Promise<void> => {
    setLoading(true);
    try {
      await signOut();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (
    updates: { name?: string; bio?: string; profile_picture?: string }
  ): Promise<boolean> => {
    if (!user) return false;
    
    setLoading(true);
    try {
      const updatedUser = await updateUserProfile(user.id, updates);
      if (updatedUser) {
        setUser(updatedUser);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Update profile error:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout, updateProfile }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
} 