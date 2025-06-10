
import React from 'react';
import { useNavigate } from 'react-router-dom';

interface UserTypeCardProps {
  userType: 'admin' | 'coach' | 'parent';
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
  isActive?: boolean;
  fullWidth?: boolean;
}

const UserTypeCard = ({ userType, title, description, icon, href, isActive = false, fullWidth = false }: UserTypeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  const getButtonStyles = () => {
    if (userType === 'admin' || isActive) {
      return 'bg-blue-500 text-white border-blue-500';
    }
    return 'bg-gray-100 text-gray-600 border-gray-200 hover:bg-gray-200';
  };

  return (
    <button
      className={`${fullWidth ? 'w-full' : 'flex-1'} ${getButtonStyles()} 
        border-2 rounded-full py-3 px-6 font-semibold transition-all duration-200 
        flex items-center justify-center gap-2 hover:scale-105 active:scale-95`}
      onClick={handleClick}
    >
      {icon}
      <span>{title}</span>
    </button>
  );
};

export default UserTypeCard;
