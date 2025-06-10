
import React from 'react';
import Header from '@/components/Header';
import LoginCard from '@/components/LoginCard';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <Header />
        <LoginCard
          userType="admin"
          title="Administrator"
          description="Full system access and management capabilities"
          icon={<Shield className="h-10 w-10 text-red-600" />}
        />
      </div>
    </div>
  );
};

export default AdminLogin;
