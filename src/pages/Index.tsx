
import React, { useState } from 'react';
import Header from '@/components/Header';
import UserTypeCard from '@/components/UserTypeCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Users } from 'lucide-react';

const Index = () => {
  const [selectedRole, setSelectedRole] = useState<'admin' | 'coach' | 'parent' | null>(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { toast } = useToast();

  const AdminIcon = () => (
    <Shield className="h-12 w-12 md:h-16 md:w-16 text-red-600" />
  );

  const CoachIcon = () => (
    <User className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />
  );

  const ParentIcon = () => (
    <Users className="h-12 w-12 md:h-16 md:w-16 text-green-600" />
  );

  const handleRoleSelect = (role: 'admin' | 'coach' | 'parent') => {
    setSelectedRole(role);
    setUsername('');
    setPassword('');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;

    console.log(`${selectedRole} login attempt:`, { username, password });
    
    // Mock login success
    toast({
      title: "Success",
      description: "Welcome back!",
    });

    // Redirect based on user type
    if (selectedRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (selectedRole === 'coach') {
      navigate('/coach/dashboard');
    } else if (selectedRole === 'parent') {
      navigate('/parent/dashboard');
    }
  };

  const getRoleColor = () => {
    switch (selectedRole) {
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

  const getRoleIcon = () => {
    switch (selectedRole) {
      case 'admin':
        return <AdminIcon />;
      case 'coach':
        return <CoachIcon />;
      case 'parent':
        return <ParentIcon />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 font-roboto">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="flex flex-col items-center justify-center min-h-[40vh] space-y-8 mt-16">
          {!selectedRole ? (
            <>
              {/* Select Your Role Text */}
              <div className="text-center mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 uppercase tracking-wide">
                  SELECT YOUR ROLE
                </h1>
              </div>

              {/* Role Selection */}
              <div className="flex flex-col items-center space-y-6">
                {/* First row - Admin and Coach */}
                <div className="flex justify-center items-center gap-8 md:gap-12">
                  <div 
                    className="flex flex-col items-center space-y-2 cursor-pointer"
                    onClick={() => handleRoleSelect('admin')}
                  >
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 bg-gradient-to-br from-red-100 to-red-200 border-red-300 hover:from-red-200 hover:to-red-300 hover:border-red-400 hover:shadow-red-200 flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-xl">
                      <AdminIcon />
                    </div>
                    <p className="text-base md:text-lg font-semibold text-gray-800 uppercase">ADMIN</p>
                  </div>
                  
                  <div 
                    className="flex flex-col items-center space-y-2 cursor-pointer"
                    onClick={() => handleRoleSelect('coach')}
                  >
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 bg-gradient-to-br from-blue-100 to-blue-200 border-blue-300 hover:from-blue-200 hover:to-blue-300 hover:border-blue-400 hover:shadow-blue-200 flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-xl">
                      <CoachIcon />
                    </div>
                    <p className="text-base md:text-lg font-semibold text-gray-800 uppercase">COACH</p>
                  </div>
                </div>
                
                {/* Second row - Parent (centered) */}
                <div className="flex justify-center">
                  <div 
                    className="flex flex-col items-center space-y-2 cursor-pointer"
                    onClick={() => handleRoleSelect('parent')}
                  >
                    <div className="w-28 h-28 md:w-36 md:h-36 rounded-full border-2 bg-gradient-to-br from-green-100 to-green-200 border-green-300 hover:from-green-200 hover:to-green-300 hover:border-green-400 hover:shadow-green-200 flex items-center justify-center transform hover:scale-105 active:scale-95 transition-all duration-300 hover:shadow-xl">
                      <ParentIcon />
                    </div>
                    <p className="text-base md:text-lg font-semibold text-gray-800 uppercase">PARENT</p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            /* Login Form */
            <div className="w-full max-w-sm mx-auto space-y-6">
              {/* Header Section */}
              <div className="text-center space-y-4">
                <div className="flex justify-center">
                  {getRoleIcon()}
                </div>
                <div className="space-y-2">
                  <h1 className={`text-2xl font-bold tracking-tight ${getRoleColor()} uppercase`}>
                    {selectedRole}
                  </h1>
                  <p className="text-gray-600 text-sm">National Sports School Portal</p>
                </div>
              </div>

              {/* Form Section */}
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <Label htmlFor="username" className="text-black text-sm font-medium">
                      Username
                    </Label>
                    <Input
                      id="username"
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      className="bg-gray-50 border-gray-300 text-black placeholder:text-gray-500 focus:border-gray-900 focus:ring-gray-900 h-10"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="password" className="text-black text-sm font-medium">
                      Password
                    </Label>
                    <Input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="bg-gray-50 border-gray-300 text-black placeholder:text-gray-500 focus:border-gray-900 focus:ring-gray-900 h-10"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Button 
                    type="submit" 
                    className="w-full h-10 bg-black text-white hover:bg-gray-800 font-semibold text-base"
                  >
                    Sign In
                  </Button>
                  
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => setSelectedRole(null)}
                    className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold text-base"
                  >
                    Back to Role Selection
                  </Button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
