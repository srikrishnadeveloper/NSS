
import React from 'react';
import Header from '@/components/Header';
import UserTypeCard from '@/components/UserTypeCard';
import { Shield, Users, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-8">
          {/* Login Card Container */}
          <div className="bg-white rounded-3xl shadow-xl w-full max-w-md mx-4 p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Log in</h1>
              <p className="text-gray-500">Hello! Welcome Back</p>
            </div>

            {/* User Type Selection */}
            <div className="space-y-4 mb-8">
              <div className="flex gap-3">
                <UserTypeCard
                  userType="admin"
                  title="Admin"
                  description=""
                  icon={<Shield className="h-6 w-6 text-white" />}
                  href="/login/admin"
                  isActive={false}
                />
                
                <UserTypeCard
                  userType="coach"
                  title="Coach"
                  description=""
                  icon={<User className="h-6 w-6 text-gray-600" />}
                  href="/login/coach"
                  isActive={false}
                />
              </div>
              
              <UserTypeCard
                userType="parent"
                title="Parent"
                description=""
                icon={<Users className="h-6 w-6 text-gray-600" />}
                href="/login/parent"
                isActive={false}
                fullWidth={true}
              />
            </div>

            {/* Login Button */}
            <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-4 px-6 rounded-full transition-colors">
              Log in
            </button>

            {/* Footer Text */}
            <div className="text-center mt-6">
              <p className="text-gray-600 text-sm">
                Don't have an account? 
                <span className="text-blue-500 font-medium ml-1">Create One</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
