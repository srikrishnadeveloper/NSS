
import React, { useState } from 'react';
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const roles = [
    {
      id: 'admin' as const,
      title: 'Administrator',
      subtitle: 'Manage the entire school system',
      icon: Shield,
      color: 'from-red-500 to-red-600',
      hoverColor: 'hover:from-red-600 hover:to-red-700',
      textColor: 'text-red-600',
      borderColor: 'border-red-500',
    },
    {
      id: 'coach' as const,
      title: 'Coach',
      subtitle: 'Train and guide students',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      hoverColor: 'hover:from-blue-600 hover:to-blue-700',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-500',
    },
    {
      id: 'parent' as const,
      title: 'Parent',
      subtitle: 'Track your child\'s progress',
      icon: Users,
      color: 'from-green-500 to-green-600',
      hoverColor: 'hover:from-green-600 hover:to-green-700',
      textColor: 'text-green-600',
      borderColor: 'border-green-500',
    },
  ];

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole || !username || !password) return;

    setIsLoading(true);
    
    // Simulate login process
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log(`${selectedRole} login attempt:`, { username, password });
    
    toast({
      title: "Login Successful",
      description: `Welcome back, ${username}!`,
    });

    // Redirect based on user type
    if (selectedRole === 'admin') {
      navigate('/admin/dashboard');
    } else if (selectedRole === 'coach') {
      navigate('/coach/dashboard');
    } else if (selectedRole === 'parent') {
      navigate('/parent/dashboard');
    }
    
    setIsLoading(false);
  };

  const selectedRoleData = roles.find(role => role.id === selectedRole);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        
        {/* Logo Section */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <img 
              src="/lovable-uploads/33900580-8f8e-4c8d-b6d6-511af21db8ca.png" 
              alt="National Sports School Logo" 
              className="h-20 w-auto md:h-24 object-contain"
            />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
            Sports School Management
          </h1>
          <p className="text-lg text-gray-600">
            Sign in to access your dashboard
          </p>
        </div>

        {/* Main Login Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
            
            {/* Role Selection */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 text-center">Select Your Role</h2>
              <div className="space-y-3">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <div
                      key={role.id}
                      className={`relative p-4 rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? `${role.borderColor} bg-gray-50 ring-2 ring-offset-2 ring-opacity-20` 
                          : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                      }`}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setUsername('');
                        setPassword('');
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${role.color}`}>
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`font-semibold ${isSelected ? role.textColor : 'text-gray-900'}`}>
                            {role.title}
                          </h3>
                          <p className="text-sm text-gray-600">{role.subtitle}</p>
                        </div>
                        {isSelected && (
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${role.color}`}></div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-sm font-medium text-gray-700">
                    Username
                  </Label>
                  <Input
                    id="username"
                    type="text"
                    placeholder="Enter your username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    disabled={!selectedRole}
                    required
                    className={`mt-1 h-12 text-base transition-all duration-200 ${
                      !selectedRole 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white'
                    }`}
                  />
                </div>
                <div>
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!selectedRole}
                    required
                    className={`mt-1 h-12 text-base transition-all duration-200 ${
                      !selectedRole 
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                        : 'bg-white'
                    }`}
                  />
                </div>
              </div>
              
              <Button 
                type="submit" 
                disabled={isLoading || !selectedRole || !username || !password}
                className={`w-full h-12 text-base font-semibold transition-all duration-300 ${
                  selectedRoleData
                    ? `bg-gradient-to-r ${selectedRoleData.color} ${selectedRoleData.hoverColor} text-white`
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center space-x-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>Signing In...</span>
                  </div>
                ) : selectedRoleData ? (
                  `Sign In as ${selectedRoleData.title}`
                ) : (
                  'Select Role to Continue'
                )}
              </Button>
            </form>

            {/* Helper Text */}
            {!selectedRole && (
              <p className="text-center text-sm text-gray-500 mt-4">
                Please select your role above to enable the login form
              </p>
            )}
          </div>
        </div>

        {/* Footer Features */}
        <div className="mt-12 grid md:grid-cols-3 gap-8 text-center max-w-4xl mx-auto">
          <div className="p-4">
            <div className="inline-flex p-3 rounded-full bg-blue-100 mb-3">
              <Shield className="h-5 w-5 text-blue-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Secure Access</h4>
            <p className="text-sm text-gray-600">Role-based authentication ensures data security</p>
          </div>
          <div className="p-4">
            <div className="inline-flex p-3 rounded-full bg-green-100 mb-3">
              <User className="h-5 w-5 text-green-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Real-time Updates</h4>
            <p className="text-sm text-gray-600">Get instant notifications and progress tracking</p>
          </div>
          <div className="p-4">
            <div className="inline-flex p-3 rounded-full bg-purple-100 mb-3">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <h4 className="font-semibold text-gray-900 mb-1">Connected Community</h4>
            <p className="text-sm text-gray-600">Bridge communication between all stakeholders</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
