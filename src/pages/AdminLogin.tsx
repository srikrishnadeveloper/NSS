
import React from 'react';
import Header from '@/components/Header';
import LoginCard from '@/components/LoginCard';
import { Shield } from 'lucide-react';

const AdminLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="flex justify-center max-w-md mx-auto">
          <LoginCard
            userType="admin"
            title="Administrator"
            description="Full system access and management capabilities"
            icon={<Shield className="h-8 w-8 text-red-600" />}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
