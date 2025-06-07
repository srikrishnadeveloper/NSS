
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useNavigate } from 'react-router-dom';

interface UserTypeCardProps {
  userType: 'admin' | 'coach' | 'parent';
  title: string;
  description: string;
  icon: React.ReactNode;
  href: string;
}

const UserTypeCard = ({ userType, title, description, icon, href }: UserTypeCardProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(href);
  };

  const getCardStyles = () => {
    switch (userType) {
      case 'admin':
        return 'border-red-200 hover:border-red-400 bg-gradient-to-br from-red-50 to-white hover:shadow-red-200 cursor-pointer transform hover:scale-105';
      case 'coach':
        return 'border-blue-200 hover:border-blue-400 bg-gradient-to-br from-blue-50 to-white hover:shadow-blue-200 cursor-pointer transform hover:scale-105';
      case 'parent':
        return 'border-green-200 hover:border-green-400 bg-gradient-to-br from-green-50 to-white hover:shadow-green-200 cursor-pointer transform hover:scale-105';
      default:
        return '';
    }
  };

  return (
    <Card 
      className={`w-full max-w-md transition-all duration-300 hover:shadow-xl ${getCardStyles()}`}
      onClick={handleClick}
    >
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-4 rounded-full bg-white shadow-md">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <p className="text-sm text-muted-foreground">
          Click to access {title.toLowerCase()} portal
        </p>
      </CardContent>
    </Card>
  );
};

export default UserTypeCard;
