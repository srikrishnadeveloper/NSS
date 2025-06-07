
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Users, Check, X, Edit3, Save } from 'lucide-react';
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
        return <Badge className="bg-green-500 hover:bg-green-600">Present</Badge>;
      case 'absent':
        return <Badge variant="destructive">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-500 hover:bg-yellow-600">Late</Badge>;
      default:
        return <Badge variant="secondary">Unknown</Badge>;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Users className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          Student Attendance
        </CardTitle>
        <CardDescription className="text-sm">
          Update and manage student attendance for your batches
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        {/* Batch Selection - Mobile optimized */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4 sm:items-center sm:justify-between">
          <div className="w-full sm:w-64">
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="h-9 sm:h-10">
                <SelectValue placeholder="Select a batch" />
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
          
          <div className="text-xs sm:text-sm text-gray-500 bg-gray-50 px-2 py-1 rounded text-center sm:bg-transparent sm:px-0 sm:py-0">
            Total Students: {filteredStudents.length}
          </div>
        </div>

        {/* Students Table - Mobile responsive */}
        <div className="border rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Roll No.</TableHead>
                  <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Student</TableHead>
                  <TableHead className="hidden md:table-cell text-xs sm:text-sm px-2 sm:px-4">Batch</TableHead>
                  <TableHead className="text-xs sm:text-sm px-2 sm:px-4">Status</TableHead>
                  <TableHead className="text-xs sm:text-sm px-2 sm:px-4 w-16">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredStudents.map((student) => (
                  <TableRow key={student.id}>
                    <TableCell className="font-medium text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                      {student.rollNumber}
                    </TableCell>
                    <TableCell className="text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                      <div>
                        <div className="font-medium">{student.name}</div>
                        <div className="text-xs text-gray-500 md:hidden">{student.batch}</div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-xs sm:text-sm px-2 sm:px-4 py-2 sm:py-4">
                      {student.batch}
                    </TableCell>
                    <TableCell className="px-2 sm:px-4 py-2 sm:py-4">
                      {editingStudent === student.id ? (
                        <Select 
                          value={student.status} 
                          onValueChange={(value) => updateStudentStatus(student.id, value as any)}
                        >
                          <SelectTrigger className="w-20 sm:w-24 h-8 text-xs sm:text-sm">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="present">Present</SelectItem>
                            <SelectItem value="absent">Absent</SelectItem>
                            <SelectItem value="late">Late</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <div className="text-xs sm:text-sm">
                          {getStatusBadge(student.status)}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="px-2 sm:px-4 py-2 sm:py-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 sm:h-8 sm:w-8 p-0"
                        onClick={() => setEditingStudent(
                          editingStudent === student.id ? null : student.id
                        )}
                      >
                        <Edit3 className="h-3 w-3 sm:h-4 sm:w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Summary - Mobile optimized */}
        <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3 sm:p-4 bg-gray-50 rounded-lg">
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-green-600">
              {filteredStudents.filter(s => s.status === 'present').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Present</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-red-600">
              {filteredStudents.filter(s => s.status === 'absent').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Absent</div>
          </div>
          <div className="text-center">
            <div className="text-lg sm:text-2xl font-bold text-yellow-600">
              {filteredStudents.filter(s => s.status === 'late').length}
            </div>
            <div className="text-xs sm:text-sm text-gray-600">Late</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default StudentAttendanceManager;
