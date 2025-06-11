
import React, { useState } from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { Shield, User, Users, ChevronRight } from 'lucide-react';

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
      bgColor: 'bg-red-50',
      textColor: 'text-red-600',
      borderColor: 'border-red-200',
    },
    {
      id: 'coach' as const,
      title: 'Coach',
      subtitle: 'Train and guide students',
      icon: User,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      textColor: 'text-blue-600',
      borderColor: 'border-blue-200',
    },
    {
      id: 'parent' as const,
      title: 'Parent',
      subtitle: 'Track your child\'s progress',
      icon: Users,
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      textColor: 'text-green-600',
      borderColor: 'border-green-200',
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
        <Header />
        
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Sports School Management
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Streamline training, track progress, and connect your sports community
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Role Selection */}
            <div className="space-y-6">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Choose Your Role</h2>
                <p className="text-gray-600">Select how you want to access the system</p>
              </div>
              
              <div className="grid gap-4">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isSelected = selectedRole === role.id;
                  
                  return (
                    <div
                      key={role.id}
                      className={`relative p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 hover:shadow-lg ${
                        isSelected 
                          ? `${role.bgColor} ${role.borderColor} ring-2 ring-offset-2 ring-blue-500` 
                          : 'bg-white border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => {
                        setSelectedRole(role.id);
                        setUsername('');
                        setPassword('');
                      }}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-gradient-to-r ${role.color}`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold ${isSelected ? role.textColor : 'text-gray-900'}`}>
                            {role.title}
                          </h3>
                          <p className="text-sm text-gray-600">{role.subtitle}</p>
                        </div>
                        <ChevronRight className={`h-5 w-5 transition-transform ${
                          isSelected ? 'rotate-90 text-blue-500' : 'text-gray-400'
                        }`} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Login Form */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
                {selectedRole ? (
                  <>
                    {/* Selected Role Header */}
                    <div className="text-center mb-8">
                      <div className={`inline-flex p-4 rounded-full bg-gradient-to-r ${selectedRoleData?.color} mb-4`}>
                        {selectedRoleData && <selectedRoleData.icon className="h-8 w-8 text-white" />}
                      </div>
                      <h3 className={`text-2xl font-bold ${selectedRoleData?.textColor}`}>
                        {selectedRoleData?.title} Login
                      </h3>
                      <p className="text-gray-600 mt-2">Enter your credentials to continue</p>
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
                            required
                            className="mt-1 h-12 text-base"
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
                            required
                            className="mt-1 h-12 text-base"
                          />
                        </div>
                      </div>
                      
                      <Button 
                        type="submit" 
                        disabled={isLoading || !username || !password}
                        className={`w-full h-12 text-base font-semibold bg-gradient-to-r ${selectedRoleData?.color} hover:opacity-90 transition-opacity`}
                      >
                        {isLoading ? (
                          <div className="flex items-center space-x-2">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                            <span>Signing In...</span>
                          </div>
                        ) : (
                          `Sign In as ${selectedRoleData?.title}`
                        )}
                      </Button>
                    </form>
                  </>
                ) : (
                  /* No Role Selected */
                  <div className="text-center py-12">
                    <div className="inline-flex p-4 rounded-full bg-gray-100 mb-4">
                      <Shield className="h-8 w-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">
                      Select Your Role
                    </h3>
                    <p className="text-gray-500">
                      Choose your role from the options on the left to continue with login
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="inline-flex p-3 rounded-full bg-blue-100 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Secure Access</h4>
              <p className="text-gray-600">Role-based authentication ensures data security</p>
            </div>
            <div className="p-6">
              <div className="inline-flex p-3 rounded-full bg-green-100 mb-4">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Real-time Updates</h4>
              <p className="text-gray-600">Get instant notifications and progress tracking</p>
            </div>
            <div className="p-6">
              <div className="inline-flex p-3 rounded-full bg-purple-100 mb-4">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">Connected Community</h4>
              <p className="text-gray-600">Bridge communication between all stakeholders</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
