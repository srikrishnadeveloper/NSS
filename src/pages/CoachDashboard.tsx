
import React from 'react';
import { Button } from '@/components/ui/button';
import { Bell, Menu, User } from 'lucide-react';
import CoachAttendanceCard from '@/components/CoachAttendanceCard';
import StudentAttendanceManager from '@/components/StudentAttendanceManager';
import ActivityUpdateCard from '@/components/ActivityUpdateCard';

const CoachDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-200 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-primary rounded-lg">
              <User className="h-6 w-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Coach Portal</h1>
              <p className="text-sm text-muted-foreground">Monday, June 7</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg bg-secondary">
              <Bell className="h-5 w-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-lg bg-secondary">
              <Menu className="h-5 w-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Main Content Stack */}
        <div className="space-y-6">
          {/* Coach Attendance - Simplified */}
          <div className="w-full">
            <CoachAttendanceCard />
          </div>

          {/* Student Management */}
          <div className="w-full">
            <StudentAttendanceManager />
          </div>

          {/* Activity Updates */}
          <div className="w-full">
            <ActivityUpdateCard />
          </div>
        </div>

        {/* Bottom Spacing for Mobile Navigation */}
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default CoachDashboard;
