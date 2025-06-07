
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Clock, Users, Camera, MapPin, CheckCircle } from 'lucide-react';
import Header from '@/components/Header';
import CoachAttendanceCard from '@/components/CoachAttendanceCard';
import StudentAttendanceManager from '@/components/StudentAttendanceManager';
import ActivityUpdateCard from '@/components/ActivityUpdateCard';

const CoachDashboard = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6 lg:py-8">
        <Header />
        
        <div className="mt-4 sm:mt-6 lg:mt-8 mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Coach Dashboard</h1>
          <p className="text-gray-600 mt-1 sm:mt-2 text-sm sm:text-base">Manage your attendance, students, and activities</p>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {/* Mobile-first layout: Stack everything vertically on mobile */}
          
          {/* Coach Attendance Section - Full width on mobile */}
          <div className="w-full">
            <CoachAttendanceCard />
          </div>

          {/* Student Attendance Section - Full width on mobile */}
          <div className="w-full">
            <StudentAttendanceManager />
          </div>

          {/* Activity Update Section - Full width on mobile */}
          <div className="w-full">
            <ActivityUpdateCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
