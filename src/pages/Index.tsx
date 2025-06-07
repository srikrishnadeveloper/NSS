
import React from 'react';
import Header from '@/components/Header';
import UserTypeCard from '@/components/UserTypeCard';
import { Shield, Users, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <Header />
        
        <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-8 mt-8">
          {/* First row - Admin and Coach */}
          <div className="flex justify-center items-center gap-8 md:gap-12">
            <UserTypeCard
              userType="admin"
              title="Admin"
              description=""
              icon={<Shield className="h-12 w-12 md:h-16 md:w-16 text-red-600" />}
              href="/login/admin"
            />
            
            <UserTypeCard
              userType="coach"
              title="Coach"
              description=""
              icon={<User className="h-12 w-12 md:h-16 md:w-16 text-blue-600" />}
              href="/login/coach"
            />
          </div>
          
          {/* Second row - Parent (centered) */}
          <div className="flex justify-center">
            <UserTypeCard
              userType="parent"
              title="Parent"
              description=""
              icon={<Users className="h-12 w-12 md:h-16 md:w-16 text-green-600" />}
              href="/login/parent"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
