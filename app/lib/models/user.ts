export interface User {
  id: string;
  email: string;
  name: string;
  password: string; // In a real app, this would be hashed
  createdAt: Date;
  updatedAt: Date;
  profilePicture?: string;
  bio?: string;
}

// For client-side use (without sensitive data)
export interface SafeUser {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  profilePicture?: string;
  bio?: string;
} 