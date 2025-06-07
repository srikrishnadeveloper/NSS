
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
      <div className="container mx-auto px-4 py-8">
        <Header />
        
        <div className="mt-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Coach Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your attendance, students, and activities</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {/* Coach Attendance Section */}
          <div className="lg:col-span-1">
            <CoachAttendanceCard />
          </div>

          {/* Student Attendance Section */}
          <div className="lg:col-span-1 xl:col-span-2">
            <StudentAttendanceManager />
          </div>

          {/* Activity Update Section */}
          <div className="lg:col-span-2 xl:col-span-3">
            <ActivityUpdateCard />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;
