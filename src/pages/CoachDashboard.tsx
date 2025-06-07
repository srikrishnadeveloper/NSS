
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Camera, MapPin, CheckCircle, Bell, Menu } from 'lucide-react';
import Header from '@/components/Header';
import CoachAttendanceCard from '@/components/CoachAttendanceCard';
import StudentAttendanceManager from '@/components/StudentAttendanceManager';
import ActivityUpdateCard from '@/components/ActivityUpdateCard';

const CoachDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Mobile App Header */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Users className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">Coach Portal</h1>
              <p className="text-xs text-gray-500">Monday, June 7</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 sm:px-6 max-w-md sm:max-w-2xl lg:max-w-4xl">
        {/* Quick Stats Bar - Mobile optimized */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border">
            <div className="text-xl font-bold text-green-600">8</div>
            <div className="text-xs text-gray-600">Present</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border">
            <div className="text-xl font-bold text-blue-600">2</div>
            <div className="text-xs text-gray-600">Sessions</div>
          </div>
          <div className="bg-white rounded-xl p-3 text-center shadow-sm border">
            <div className="text-xl font-bold text-purple-600">6.5h</div>
            <div className="text-xs text-gray-600">Hours</div>
          </div>
        </div>

        {/* Main Content Stack */}
        <div className="space-y-4">
          {/* Coach Attendance - Priority Section */}
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
        <div className="h-20 sm:h-8"></div>
      </div>
    </div>
  );
};

export default CoachDashboard;
