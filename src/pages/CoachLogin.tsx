
import React from 'react';
import Header from '@/components/Header';
import LoginCard from '@/components/LoginCard';
import { User } from 'lucide-react';

const CoachLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="flex justify-center max-w-md mx-auto">
          <LoginCard
            userType="coach"
            title="Coach"
            description="Manage teams, training sessions, and athlete progress"
            icon={<User className="h-8 w-8 text-blue-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default CoachLogin;
