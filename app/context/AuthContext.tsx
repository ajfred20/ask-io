"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';
import { SafeUser } from '../lib/models/user';
import { registerUser, loginUser, getUserById, updateUserProfile } from '../lib/auth';

interface AuthContextType {
  user: SafeUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProfile: (updates: { name?: string; bio?: string; profilePicture?: string }) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<SafeUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    const loggedInUser = loginUser(email, password);
    if (loggedInUser) {
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      return true;
    }
    return false;
  };

  const signup = async (email: string, password: string, name: string): Promise<boolean> => {
    const newUser = registerUser(email, password, name);
    if (newUser) {
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const updateProfile = async (updates: { name?: string; bio?: string; profilePicture?: string }): Promise<boolean> => {
    if (!user) return false;
    
    const updatedUser = updateUserProfile(user.id, updates);
    if (updatedUser) {
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return true;
    }
    return false;
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