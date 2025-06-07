
import React from 'react';
import Header from '@/components/Header';
import UserTypeCard from '@/components/UserTypeCard';
import { Shield, Users, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="flex flex-col items-center justify-center space-y-12 mt-16">
          {/* First row - Admin and Coach */}
          <div className="flex justify-center space-x-12">
            <UserTypeCard
              userType="admin"
              title="Admin"
              description=""
              icon={<Shield className="h-16 w-16 text-red-600" />}
              href="/login/admin"
            />
            
            <UserTypeCard
              userType="coach"
              title="Coach"
              description=""
              icon={<User className="h-16 w-16 text-blue-600" />}
              href="/login/coach"
            />
          </div>
          
          {/* Second row - Parent (centered) */}
          <div className="flex justify-center">
            <UserTypeCard
              userType="parent"
              title="Parent"
              description=""
              icon={<Users className="h-16 w-16 text-green-600" />}
              href="/login/parent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
