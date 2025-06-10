
import React from 'react';
import LoginCard from '@/components/LoginCard';
import { User } from 'lucide-react';

const CoachLogin = () => {
  return (
    <div className="h-screen bg-white w-full overflow-hidden">
      <LoginCard
        userType="coach"
        title="Coach"
        description="Manage teams, training sessions, and athlete progress"
        icon={<User className="h-16 w-16 text-blue-500" />}
      />
    </div>
  );
};

export default CoachLogin;
