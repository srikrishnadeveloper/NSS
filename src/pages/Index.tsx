
import React from 'react';
import Header from '@/components/Header';
import LoginCard from '@/components/LoginCard';
import { Shield, Users, User } from 'lucide-react';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <LoginCard
            userType="admin"
            title="Administrator"
            description="Full system access and management capabilities"
            icon={<Shield className="h-8 w-8 text-red-600" />}
          />
          
          <LoginCard
            userType="coach"
            title="Coach"
            description="Manage teams, training sessions, and athlete progress"
            icon={<User className="h-8 w-8 text-blue-600" />}
          />
          
          <LoginCard
            userType="parent"
            title="Parent"
            description="Track your child's progress and school communications"
            icon={<Users className="h-8 w-8 text-green-600" />}
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground">
            Need help? Contact the school administration at{' '}
            <a href="mailto:admin@nationalsportsschool.edu" className="text-primary hover:underline">
              admin@nationalsportsschool.edu
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
