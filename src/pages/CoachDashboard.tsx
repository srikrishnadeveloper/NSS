
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Camera, MapPin, CheckCircle, Bell, Menu, User } from 'lucide-react';
import Header from '@/components/Header';
import CoachAttendanceCard from '@/components/CoachAttendanceCard';
import StudentAttendanceManager from '@/components/StudentAttendanceManager';
import ActivityUpdateCard from '@/components/ActivityUpdateCard';

const CoachDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile App Header */}
      <div className="sticky top-0 z-50 bg-white shadow-sm border-b border-gray-100 px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-600 rounded-xl shadow-sm">
              <User className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Coach Portal</h1>
              <p className="text-sm text-gray-500">Monday, June 7</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-gray-100">
              <Bell className="h-5 w-5 text-gray-600" />
            </Button>
            <Button variant="ghost" size="sm" className="h-10 w-10 p-0 rounded-xl bg-gray-100">
              <Menu className="h-5 w-5 text-gray-600" />
            </Button>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 max-w-md mx-auto">
        {/* Quick Stats Bar - Boxy Design */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-green-600 mb-1">8</div>
            <div className="text-sm text-gray-600 font-medium">Present</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-blue-600 mb-1">2</div>
            <div className="text-sm text-gray-600 font-medium">Sessions</div>
          </div>
          <div className="bg-white rounded-2xl p-4 text-center shadow-sm border border-gray-100">
            <div className="text-2xl font-bold text-purple-600 mb-1">6.5h</div>
            <div className="text-sm text-gray-600 font-medium">Hours</div>
          </div>
        </div>

        {/* Main Content Stack */}
        <div className="space-y-6">
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
        <div className="h-24"></div>
      </div>
    </div>
  );
};

export default CoachDashboard;
