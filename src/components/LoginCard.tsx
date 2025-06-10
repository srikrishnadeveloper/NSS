
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
    toast(`Welcome back!`);

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
        return 'text-red-500';
      case 'coach':
        return 'text-blue-500';
      case 'parent':
        return 'text-green-500';
      default:
        return 'text-gray-500';
    }
  };

  const getButtonStyles = () => {
    switch (userType) {
      case 'admin':
        return 'bg-red-500 hover:bg-red-600';
      case 'coach':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'parent':
        return 'bg-green-500 hover:bg-green-600';
      default:
        return '';
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-3xl p-8 shadow-2xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="mx-auto mb-4 p-3 rounded-full bg-white/20 w-fit">
            {icon}
          </div>
          <h1 className={`text-2xl font-bold ${getAccentColor()}`}>{title}</h1>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor={`${userType}-username`} className="text-white/90 text-sm font-medium">
              Username
            </Label>
            <Input
              id={`${userType}-username`}
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="h-12 text-base border-0 bg-white/20 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-white/30 rounded-xl"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor={`${userType}-password`} className="text-white/90 text-sm font-medium">
              Password
            </Label>
            <Input
              id={`${userType}-password`}
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-12 text-base border-0 bg-white/20 text-white placeholder:text-white/60 focus:bg-white/30 focus:ring-2 focus:ring-white/30 rounded-xl"
            />
          </div>

          <Button
            type="submit"
            className={`w-full h-12 text-base font-semibold transition-all duration-200 shadow-lg rounded-xl ${getButtonStyles()}`}
          >
            Sign In
          </Button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm text-white/70 hover:text-white transition-colors"
          >
            Forgot password?
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginCard;
