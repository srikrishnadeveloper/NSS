
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/sonner';

interface LoginCardProps {
  userType: 'admin' | 'coach' | 'parent';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const LoginCard = ({ userType, title, description, icon }: LoginCardProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${userType} login attempt:`, { username, password });
    
    // Mock login success
    toast(`Welcome back, ${title}!`);

    // Redirect based on user type
    if (userType === 'admin') {
      navigate('/admin/dashboard');
    } else if (userType === 'coach') {
      navigate('/coach/dashboard');
    } else if (userType === 'parent') {
      navigate('/parent/dashboard');
    }
  };

  const getAccentColor = () => {
    switch (userType) {
      case 'admin':
        return 'text-red-600';
      case 'coach':
        return 'text-blue-600';
      case 'parent':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  const getButtonStyles = () => {
    switch (userType) {
      case 'admin':
        return 'bg-red-600 hover:bg-red-700';
      case 'coach':
        return 'bg-blue-600 hover:bg-blue-700';
      case 'parent':
        return 'bg-green-600 hover:bg-green-700';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-md mx-auto px-6 py-8">
      {/* Header Section */}
      <div className="text-center mb-12">
        <div className="mx-auto mb-6 p-4 rounded-full bg-white shadow-lg w-fit">
          {icon}
        </div>
        <h1 className={`text-3xl font-bold mb-2 ${getAccentColor()}`}>{title}</h1>
        <p className="text-muted-foreground text-base">{description}</p>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor={`${userType}-username`} className="text-base font-medium">
            Username
          </Label>
          <Input
            id={`${userType}-username`}
            type="text"
            placeholder="Enter your username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="h-12 text-base border-0 bg-muted/50 focus:bg-background focus:ring-2 focus:ring-offset-2"
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor={`${userType}-password`} className="text-base font-medium">
            Password
          </Label>
          <Input
            id={`${userType}-password`}
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="h-12 text-base border-0 bg-muted/50 focus:bg-background focus:ring-2 focus:ring-offset-2"
          />
        </div>

        <Button
          type="submit"
          className={`w-full h-12 text-base font-semibold transition-all duration-200 shadow-lg ${getButtonStyles()}`}
        >
          Sign In as {title}
        </Button>
      </form>

      {/* Forgot Password Link */}
      <div className="mt-8 text-center">
        <a
          href="#"
          className={`text-sm ${getAccentColor()} hover:underline transition-colors`}
        >
          Forgot your password?
        </a>
      </div>
    </div>
  );
};

export default LoginCard;
