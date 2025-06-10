
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
  backgroundColor?: string;
}

const UserTypeCard = ({ userType, title, description, icon, href, isActive = false, fullWidth = false, backgroundColor = "bg-gray-100" }: UserTypeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <button
        className={`${backgroundColor} w-20 h-20 rounded-full flex items-center justify-center 
          shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95
          border-2 border-white/20`}
        onClick={handleClick}
      >
        {icon}
      </button>
      <span className="text-gray-800 font-semibold text-lg">{title}</span>
    </div>
  );
};

export default UserTypeCard;
