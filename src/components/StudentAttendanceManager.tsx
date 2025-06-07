
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
        return <Badge className="bg-green-100 text-green-700 hover:bg-green-100 text-xs px-2 py-1">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-700 hover:bg-red-100 text-xs px-2 py-1">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-700 hover:bg-yellow-100 text-xs px-2 py-1">Late</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs px-2 py-1">Unknown</Badge>;
    }
  };

  return (
    <Card className="shadow-sm border-0 bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-xl">
              <Users className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Student Attendance</CardTitle>
              <CardDescription className="text-sm text-gray-500">Manage batch attendance</CardDescription>
            </div>
          </div>
          <Badge variant="secondary" className="text-xs px-2 py-1 bg-gray-100 text-gray-600">
            {filteredStudents.length} students
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-4 space-y-4">
        {/* Batch Filter */}
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-gray-400" />
          <Select value={selectedBatch} onValueChange={setSelectedBatch}>
            <SelectTrigger className="flex-1 h-10 rounded-xl border-gray-200">
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

        {/* Attendance Summary */}
        <div className="grid grid-cols-3 gap-3 p-3 bg-gray-50 rounded-xl">
          <div className="text-center">
            <div className="text-xl font-bold text-green-600">
              {filteredStudents.filter(s => s.status === 'present').length}
            </div>
            <div className="text-xs text-gray-600">Present</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-red-600">
              {filteredStudents.filter(s => s.status === 'absent').length}
            </div>
            <div className="text-xs text-gray-600">Absent</div>
          </div>
          <div className="text-center">
            <div className="text-xl font-bold text-yellow-600">
              {filteredStudents.filter(s => s.status === 'late').length}
            </div>
            <div className="text-xs text-gray-600">Late</div>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-2">
          {filteredStudents.map((student) => (
            <div key={student.id} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3">
                    <div className="bg-white rounded-lg p-2 min-w-fit">
                      <span className="text-xs font-mono text-gray-600">{student.rollNumber}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 text-sm truncate">{student.name}</div>
                      <div className="text-xs text-gray-500 truncate">{student.batch}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {editingStudent === student.id ? (
                    <Select 
                      value={student.status} 
                      onValueChange={(value) => updateStudentStatus(student.id, value as any)}
                    >
                      <SelectTrigger className="w-24 h-8 text-xs rounded-lg">
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
                        className="h-8 w-8 p-0 text-gray-400 hover:text-gray-600"
                        onClick={() => setEditingStudent(student.id)}
                      >
                        <Edit3 className="h-3 w-3" />
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentAttendanceManager;
