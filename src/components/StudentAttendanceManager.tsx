
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Check, X, Edit3, ChevronDown, Filter } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Student {
  id: string;
  name: string;
  rollNumber: string;
  batch: string;
  status: 'present' | 'absent' | 'late';
}

const StudentAttendanceManager = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>('all');
  const [editingStudent, setEditingStudent] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock data for students
  const [students, setStudents] = useState<Student[]>([
    { id: '1', name: 'John Smith', rollNumber: 'S001', batch: 'Morning Batch A', status: 'present' },
    { id: '2', name: 'Emma Johnson', rollNumber: 'S002', batch: 'Morning Batch A', status: 'absent' },
    { id: '3', name: 'Michael Brown', rollNumber: 'S003', batch: 'Morning Batch A', status: 'late' },
    { id: '4', name: 'Sarah Davis', rollNumber: 'S004', batch: 'Evening Batch B', status: 'present' },
    { id: '5', name: 'David Wilson', rollNumber: 'S005', batch: 'Evening Batch B', status: 'present' },
  ]);

  const batches = ['Morning Batch A', 'Evening Batch B', 'Weekend Batch C'];

  const filteredStudents = selectedBatch === 'all'
    ? students
    : students.filter(student => student.batch === selectedBatch);

  const updateStudentStatus = (studentId: string, newStatus: 'present' | 'absent' | 'late') => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { ...student, status: newStatus }
          : student
      )
    );
    setEditingStudent(null);
    
    toast({
      title: "Attendance Updated",
      description: "Student attendance has been successfully updated",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 px-3 py-1 rounded-xl font-medium">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 px-3 py-1 rounded-xl font-medium">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 px-3 py-1 rounded-xl font-medium">Late</Badge>;
      default:
        return <Badge variant="secondary" className="px-3 py-1 rounded-xl font-medium">Unknown</Badge>;
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-100 rounded-2xl">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Student Attendance</h3>
              <p className="text-sm text-gray-500">Manage batch attendance</p>
            </div>
          </div>
          <Badge variant="secondary" className="px-3 py-1 rounded-xl font-medium bg-gray-100 text-gray-600">
            {filteredStudents.length} students
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-5 py-5 space-y-5">
        {/* Batch Filter */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-gray-400" />
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="flex-1 h-12 rounded-xl border-gray-200 bg-white shadow-sm">
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map((batch) => (
                  <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Attendance Summary */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-2xl border border-green-100">
            <div className="text-2xl font-bold text-green-600">
              {filteredStudents.filter(s => s.status === 'present').length}
            </div>
            <div className="text-sm text-green-600 font-medium">Present</div>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-2xl border border-red-100">
            <div className="text-2xl font-bold text-red-600">
              {filteredStudents.filter(s => s.status === 'absent').length}
            </div>
            <div className="text-sm text-red-600 font-medium">Absent</div>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-2xl border border-yellow-100">
            <div className="text-2xl font-bold text-yellow-600">
              {filteredStudents.filter(s => s.status === 'late').length}
            </div>
            <div className="text-sm text-yellow-600 font-medium">Late</div>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-3">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4">
                    <div className="bg-white rounded-xl p-3 border border-gray-200">
                      <span className="text-sm font-bold text-gray-700">{student.rollNumber}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-gray-900 text-base truncate">{student.name}</div>
                      <div className="text-sm text-gray-500 truncate font-medium">{student.batch}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  {editingStudent === student.id ? (
                    <Select 
                      value={student.status} 
                      onValueChange={(value) => updateStudentStatus(student.id, value as any)}
                    >
                      <SelectTrigger className="w-28 h-10 rounded-xl border-gray-200 bg-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <>
                      {getStatusBadge(student.status)}
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-10 w-10 p-0 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl"
                        onClick={() => setEditingStudent(student.id)}
                      >
                        <Edit3 className="h-4 w-4" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentAttendanceManager;
