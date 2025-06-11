
import React from 'react';

const ParentDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Parent Dashboard</h1>
          <p className="text-gray-600 mt-2">Track your child's progress and school communications</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Child's Progress</h2>
            <p className="text-gray-600">View academic and athletic performance</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Communications</h2>
            <p className="text-gray-600">Messages from teachers and coaches</p>
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Schedule</h2>
            <p className="text-gray-600">Upcoming events and activities</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
