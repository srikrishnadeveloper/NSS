
import React from 'react';
import LoginCard from '@/components/LoginCard';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <LoginCard
        userType="admin"
        title="Administrator"
        description=""
        icon={<Shield className="h-8 w-8 text-red-500" />}
      />
    </div>
  );
};

export default AdminLogin;
