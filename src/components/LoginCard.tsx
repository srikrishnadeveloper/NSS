import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { User, Shield, Users } from 'lucide-react';

interface LoginCardProps {
  userType: 'admin' | 'coach' | 'parent';
  title: string;
  description: string;
  icon: React.ReactNode;
}

const LoginCard = ({ userType, title, description, icon }: LoginCardProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`${userType} login attempt:`, { email, password });
    
    // Mock login success
    toast({
      title: "Login Successful",
      description: `Welcome back, ${title}!`,
    });

    // Redirect based on user type
    if (userType === 'admin') {
      navigate('/admin/dashboard');
    } else if (userType === 'coach') {
      navigate('/coach/dashboard');
    } else if (userType === 'parent') {
      navigate('/parent/dashboard');
    }
  };

  const getCardStyles = () => {
    switch (userType) {
      case 'admin':
        return 'border-red-200 hover:border-red-300 bg-gradient-to-br from-red-50 to-white hover:shadow-red-100';
      case 'coach':
        return 'border-blue-200 hover:border-blue-300 bg-gradient-to-br from-blue-50 to-white hover:shadow-blue-100';
      case 'parent':
        return 'border-green-200 hover:border-green-300 bg-gradient-to-br from-green-50 to-white hover:shadow-green-100';
      default:
        return '';
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
    <Card className={`w-full max-w-md transition-all duration-300 hover:shadow-xl ${getCardStyles()}`}>
      <CardHeader className="text-center pb-4">
        <div className="mx-auto mb-4 p-3 rounded-full bg-white shadow-md">
          {icon}
        </div>
        <CardTitle className="text-2xl font-bold">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor={`${userType}-email`}>Email Address</Label>
            <Input
              id={`${userType}-email`}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor={`${userType}-password`}>Password</Label>
            <Input
              id={`${userType}-password`}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="h-11"
            />
          </div>
          <Button
            type="submit"
            className={`w-full h-11 text-white font-semibold transition-colors duration-200 ${getButtonStyles()}`}
          >
            Sign In as {title}
          </Button>
        </form>
        <div className="mt-4 text-center">
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Forgot your password?
          </a>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginCard;
