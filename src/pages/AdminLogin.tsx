
import React from 'react';
import LoginCard from '@/components/LoginCard';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="h-screen bg-white w-full overflow-hidden">
      <LoginCard
        userType="admin"
        title="Administrator"
        description=""
        icon={<Shield className="h-16 w-16 text-red-500" />}
      />
    </div>
  );
};

export default AdminLogin;
