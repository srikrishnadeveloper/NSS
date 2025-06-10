
import React from 'react';
import Header from '@/components/Header';
import UserTypeCard from '@/components/UserTypeCard';
import { Shield, Users, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Logo */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <img 
              src="/lovable-uploads/759b44af-ccb8-4cf0-a32f-ce1580c02622.png" 
              alt="National Sports School Logo" 
              className="h-16 w-auto object-contain"
            />
          </div>
        </div>
        
        <div className="flex flex-col items-center justify-center">
          {/* User Type Selection */}
          <div className="space-y-8 flex flex-col items-center">
            {/* Top row - Admin and Coach */}
            <div className="flex gap-12">
              <UserTypeCard
                userType="admin"
                title="Admin"
                description=""
                icon={<Shield className="h-8 w-8 text-red-500" />}
                href="/login/admin"
                isActive={false}
                backgroundColor="bg-red-100"
              />
              
              <UserTypeCard
                userType="coach"
                title="Coach"
                description=""
                icon={<User className="h-8 w-8 text-blue-500" />}
                href="/login/coach"
                isActive={false}
                backgroundColor="bg-blue-100"
              />
            </div>
            
            {/* Bottom row - Parent */}
            <UserTypeCard
              userType="parent"
              title="Parent"
              description=""
              icon={<Users className="h-8 w-8 text-green-500" />}
              href="/login/parent"
              isActive={false}
              backgroundColor="bg-green-100"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
