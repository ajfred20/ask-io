import { User } from 'lucide-react';

interface UserProfileBadgeProps {
  name: string;
  isVerified: boolean;
  profilePicture?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function UserProfileBadge({ 
  name, 
  isVerified, 
  profilePicture,
  size = 'md'
}: UserProfileBadgeProps) {
  const sizeClasses = {
    sm: 'h-8 w-8 text-xs',
    md: 'h-10 w-10 text-sm',
    lg: 'h-12 w-12 text-base'
  };
  
  const nameSizeClasses = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg'
  };
  
  const verifiedBadgeSize = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  };
  
  return (
    <div className="flex items-center">
      {profilePicture ? (
        <img 
          src={profilePicture} 
          alt={name}
          className={`${sizeClasses[size]} rounded-full object-cover`}
        />
      ) : (
        <div className={`${sizeClasses[size]} rounded-full bg-blue-100 flex items-center justify-center text-blue-600`}>
          <User className="h-1/2 w-1/2" />
        </div>
      )}
      
      <div className="ml-2 flex items-center">
        <span className={`font-medium text-gray-800 ${nameSizeClasses[size]}`}>
          {name}
        </span>
        
        {isVerified && (
          <div className={`ml-1 ${verifiedBadgeSize[size]} text-blue-500 flex-shrink-0`}>
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path 
                d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" 
                fill="#3B82F6" 
              />
              <path 
                d="M8 12L10.5 14.5L16 9" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}