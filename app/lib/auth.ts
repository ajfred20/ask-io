import { User, SafeUser } from './models/user';

// In a real app, this would be a database
const users: User[] = [];

// Generate a unique ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Register a new user
export const registerUser = (email: string, password: string, name: string): SafeUser | null => {
  // Check if user already exists
  if (users.find(user => user.email === email)) {
    return null;
  }

  const newUser: User = {
    id: generateId(),
    email,
    password, // In a real app, this would be hashed
    name,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  users.push(newUser);
  
  // Return safe user (without password)
  const { password: _, ...safeUser } = newUser;
  return safeUser as SafeUser;
};

// Login user
export const loginUser = (email: string, password: string): SafeUser | null => {
  const user = users.find(user => user.email === email && user.password === password);
  
  if (!user) {
    return null;
  }
  
  // Return safe user (without password)
  const { password: _, ...safeUser } = user;
  return safeUser as SafeUser;
};

// Get user by ID
export const getUserById = (id: string): SafeUser | null => {
  const user = users.find(user => user.id === id);
  
  if (!user) {
    return null;
  }
  
  // Return safe user (without password)
  const { password: _, ...safeUser } = user;
  return safeUser as SafeUser;
};

// Update user profile
export const updateUserProfile = (
  id: string, 
  updates: { name?: string; bio?: string; profilePicture?: string }
): SafeUser | null => {
  const userIndex = users.findIndex(user => user.id === id);
  
  if (userIndex === -1) {
    return null;
  }
  
  // Update user
  users[userIndex] = {
    ...users[userIndex],
    ...updates,
    updatedAt: new Date()
  };
  
  // Return safe user (without password)
  const { password: _, ...safeUser } = users[userIndex];
  return safeUser as SafeUser;
}; 