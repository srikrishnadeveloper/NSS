import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Users, Edit3, Filter } from 'lucide-react';
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
  const {
    toast
  } = useToast();
  const [students, setStudents] = useState<Student[]>([{
    id: '1',
    name: 'John Smith',
    rollNumber: 'S001',
    batch: 'Morning Batch A',
    status: 'present'
  }, {
    id: '2',
    name: 'Emma Johnson',
    rollNumber: 'S002',
    batch: 'Morning Batch A',
    status: 'absent'
  }, {
    id: '3',
    name: 'Michael Brown',
    rollNumber: 'S003',
    batch: 'Morning Batch A',
    status: 'late'
  }, {
    id: '4',
    name: 'Sarah Davis',
    rollNumber: 'S004',
    batch: 'Evening Batch B',
    status: 'present'
  }, {
    id: '5',
    name: 'David Wilson',
    rollNumber: 'S005',
    batch: 'Evening Batch B',
    status: 'present'
  }]);
  const batches = ['Morning Batch A', 'Evening Batch B', 'Weekend Batch C'];
  const filteredStudents = selectedBatch === 'all' ? students : students.filter(student => student.batch === selectedBatch);
  const updateStudentStatus = (studentId: string, newStatus: 'present' | 'absent' | 'late') => {
    setStudents(prev => prev.map(student => student.id === studentId ? {
      ...student,
      status: newStatus
    } : student));
    setEditingStudent(null);
    toast({
      title: "Attendance Updated",
      description: "Student attendance has been successfully updated"
    });
  };
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-primary text-primary-foreground hover:bg-primary px-3 py-1 rounded-lg font-medium">Present</Badge>;
      case 'absent':
        return <Badge className="bg-destructive text-destructive-foreground hover:bg-destructive px-3 py-1 rounded-lg font-medium">Absent</Badge>;
      case 'late':
        return <Badge variant="secondary" className="px-3 py-1 rounded-lg font-medium">Late</Badge>;
      default:
        return <Badge variant="secondary" className="px-3 py-1 rounded-lg font-medium">Unknown</Badge>;
    }
  };
  return <div className="bg-card shadow-sm border border-border overflow-hidden rounded-sm">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            
            <div>
              <h3 className="text-lg font-bold text-foreground">Student Attendance</h3>
              
            </div>
          </div>
          <Badge variant="secondary" className="px-3 py-1 rounded-lg font-medium">
            {filteredStudents.length} students
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-5 py-5 space-y-5">
        {/* Batch Filter */}
        <div className="bg-secondary p-4 rounded-none">
          <div className="flex items-center gap-3">
            <Filter className="h-5 w-5 text-muted-foreground" />
            <Select value={selectedBatch} onValueChange={setSelectedBatch}>
              <SelectTrigger className="flex-1 h-12 rounded-lg border-border bg-card">
                <SelectValue placeholder="Filter by batch" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Batches</SelectItem>
                {batches.map(batch => <SelectItem key={batch} value={batch}>
                    {batch}
                  </SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Students List */}
        <div className="space-y-3">
          {filteredStudents.map(student => <div key={student.id} className="bg-secondary p-4 border border-border rounded-none">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-4">
                    
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-foreground text-base truncate">{student.name}</div>
                      <div className="text-sm text-muted-foreground truncate font-medium">{student.batch}</div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 ml-4">
                  {editingStudent === student.id ? <Select value={student.status} onValueChange={value => updateStudentStatus(student.id, value as any)}>
                      <SelectTrigger className="w-28 h-10 rounded-lg border-border bg-card">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="absent">Absent</SelectItem>
                        <SelectItem value="late">Late</SelectItem>
                      </SelectContent>
                    </Select> : <>
                      {getStatusBadge(student.status)}
                      
                    </>}
                </div>
              </div>
            </div>)}
        </div>
      </div>
    </div>;
};
export default StudentAttendanceManager;