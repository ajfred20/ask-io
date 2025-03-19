export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  profile_picture?: string;
  bio?: string;
}

// For client-side use (without sensitive data)
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  created_at: string;
  updated_at: string;
  profile_picture?: string;
  bio?: string;
} 