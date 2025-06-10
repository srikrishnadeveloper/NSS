
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Shield, User, Users } from 'lucide-react';

const Index = () => {
  const navigate = useNavigate();

  const handleRoleSelection = (role: string) => {
    navigate(`/login/${role}`);
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-blue-100 via-purple-50 to-violet-100 overflow-hidden">
      <div className="flex flex-col items-center justify-center h-full px-6 py-8">
        
        {/* Modern Logo */}
        <div className="mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-2xl">NSS</span>
          </div>
        </div>

        {/* Title Section */}
        <div className="text-center mb-2">
          <h1 className="text-3xl md:text-4xl text-gray-800 mb-2">
            <span className="font-bold">National Sports</span>{' '}
            <span className="font-light">School</span>
          </h1>
        </div>

        {/* Subheading */}
        <p className="text-gray-600 text-lg mb-12 font-medium">Select your role</p>

        {/* Role Selection Buttons */}
        <div className="space-y-6 w-full max-w-xs">
          
          {/* Admin Button */}
          <div 
            onClick={() => handleRoleSelection('admin')}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <span className="text-gray-800 font-semibold text-lg">Admin</span>
            </div>
          </div>

          {/* Coach Button */}
          <div 
            onClick={() => handleRoleSelection('coach')}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <User className="h-8 w-8 text-white" />
              </div>
              <span className="text-gray-800 font-semibold text-lg">Coach</span>
            </div>
          </div>

          {/* Parent Button */}
          <div 
            onClick={() => handleRoleSelection('parent')}
            className="bg-white/80 backdrop-blur-sm border border-white/20 rounded-2xl p-6 shadow-lg hover:shadow-xl transform hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <Users className="h-8 w-8 text-white" />
              </div>
              <span className="text-gray-800 font-semibold text-lg">Parent</span>
            </div>
          </div>

        </div>

        {/* Optional Bottom Space for Future Login Support */}
        <div className="mt-auto pt-8">
          <p className="text-gray-500 text-sm text-center">Need help? Contact support</p>
        </div>

      </div>
    </div>
  );
};

export default Index;
