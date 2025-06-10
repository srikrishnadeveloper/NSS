
import React from 'react';
import LoginCard from '@/components/LoginCard';
import { Users } from 'lucide-react';

const ParentLogin = () => {
  return (
    <div className="min-h-screen bg-black">
      <LoginCard
        userType="parent"
        title="Parent"
        description="Track your child's progress and school communications"
        icon={<Users className="h-16 w-16 text-green-500" />}
      />
    </div>
  );
};

export default ParentLogin;
