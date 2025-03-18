"use client";
import { useState, useEffect } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { useRouter } from 'next/navigation';
import { User } from 'lucide-react';

export default function Profile() {
  const { user, updateProfile, logout, loading } = useAuth();
  const router = useRouter();
  
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    
    if (user) {
      setName(user.name || '');
      setBio(user.bio || '');
    }
  }, [user, loading, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUpdateLoading(true);
    setMessage({ type: '', text: '' });
    
    try {
      const success = await updateProfile({ name, bio });
      if (success) {
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', text: 'Failed to update profile.' });
      }
    } catch (err) {
      setMessage({ type: 'error', text: 'An unexpected error occurred.' });
      console.error(err);
    } finally {
      setUpdateLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  if (loading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Your Profile</h1>
      
      {message.text && (
        <div className={`p-4 mb-6 rounded-md ${message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
          {message.text}
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="p-6 flex items-center space-x-6">
          <div className="bg-blue-100 rounded-full p-4">
            {user.profilePicture ? (
              <img 
                src={user.profilePicture} 
                alt={user.name} 
                className="h-16 w-16 rounded-full"
              />
            ) : (
              <User className="h-16 w-16 text-blue-600" />
            )}
          </div>
          
          <div>
            <h2 className="text-xl font-semibold">{user.name}</h2>
            <p className="text-gray-500">{user.email}</p>
            <p className="text-sm text-gray-400 mt-1">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
        
        <div className="border-t border-gray-100 p-6">
          {isEditing ? (
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    disabled={updateLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
                  >
                    {updateLoading ? 'Saving...' : 'Save Changes'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          ) : (
            <div>
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Bio</h3>
                <p className="text-gray-700">{user.bio || 'No bio provided yet.'}</p>
              </div>
              
              <button
                onClick={() => setIsEditing(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit Profile
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
}
