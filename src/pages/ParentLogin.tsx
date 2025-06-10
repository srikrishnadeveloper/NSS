
import React from 'react';
import Header from '@/components/Header';
import LoginCard from '@/components/LoginCard';
import { Users } from 'lucide-react';

const ParentLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <Header />
        <LoginCard
          userType="parent"
          title="Parent"
          description="Track your child's progress and school communications"
          icon={<Users className="h-10 w-10 text-green-600" />}
        />
      </div>
    </div>
  );
};

export default ParentLogin;
