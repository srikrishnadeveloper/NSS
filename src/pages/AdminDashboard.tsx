
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, MessageSquare, Calendar, UserPlus, CreditCard } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock data
const mockStudents = [
  { id: 1, name: 'John Smith', sport: 'Soccer', feePlan: 'Monthly - $150', paymentStatus: 'paid', parentContact: '+1234567890', lastPayment: '2024-01-15' },
  { id: 2, name: 'Sarah Johnson', sport: 'Basketball', feePlan: 'Weekly - $40', paymentStatus: 'failed', parentContact: '+1234567891', lastPayment: '2024-01-10' },
  { id: 3, name: 'Mike Davis', sport: 'Tennis', feePlan: 'Monthly - $200', paymentStatus: 'upcoming', parentContact: '+1234567892', lastPayment: '2023-12-15' },
  { id: 4, name: 'Emma Wilson', sport: 'Swimming', feePlan: 'Monthly - $180', paymentStatus: 'paid', parentContact: '+1234567893', lastPayment: '2024-01-20' },
];

const mockPaymentLogs = [
  { id: 1, studentName: 'John Smith', amount: '$150', status: 'paid', date: '2024-01-15', method: 'Stripe' },
  { id: 2, studentName: 'Sarah Johnson', amount: '$40', status: 'failed', date: '2024-01-10', method: 'Stripe' },
  { id: 3, studentName: 'Mike Davis', amount: '$200', status: 'upcoming', date: '2024-02-15', method: 'Stripe' },
  { id: 4, studentName: 'Emma Wilson', amount: '$180', status: 'paid', date: '2024-01-20', method: 'Stripe' },
];

const mockWhatsAppLogs = [
  { id: 1, studentName: 'John Smith', message: 'Payment reminder sent', status: 'delivered', date: '2024-01-14' },
  { id: 2, studentName: 'Sarah Johnson', message: 'Payment failed notification', status: 'delivered', date: '2024-01-10' },
  { id: 3, studentName: 'Mike Davis', message: 'Upcoming payment reminder', status: 'pending', date: '2024-01-25' },
];

const mockAttendance = [
  { id: 1, studentName: 'John Smith', date: '2024-01-25', status: 'present' },
  { id: 2, studentName: 'Sarah Johnson', date: '2024-01-25', status: 'absent' },
  { id: 3, studentName: 'Mike Davis', date: '2024-01-25', status: 'present' },
  { id: 4, studentName: 'Emma Wilson', date: '2024-01-25', status: 'present' },
];

const AdminDashboard = () => {
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isAddingStudent, setIsAddingStudent] = useState(false);
  const [newStudent, setNewStudent] = useState({ name: '', sport: '', feePlan: '', parentContact: '' });
  const { toast } = useToast();

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Paid</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Failed</Badge>;
      case 'upcoming':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Upcoming</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Absent</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleSendWhatsApp = (studentName: string) => {
    toast({
      title: "WhatsApp Message Sent",
      description: `Payment reminder sent to ${studentName}'s parent`,
    });
  };

  const handleAddStudent = () => {
    if (newStudent.name && newStudent.sport && newStudent.feePlan && newStudent.parentContact) {
      toast({
        title: "Student Added",
        description: `${newStudent.name} has been added successfully`,
      });
      setNewStudent({ name: '', sport: '', feePlan: '', parentContact: '' });
      setIsAddingStudent(false);
    }
  };

  const handleMarkAttendance = (studentId: number, status: string) => {
    toast({
      title: "Attendance Updated",
      description: `Attendance marked as ${status}`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-3">
            <Shield className="h-8 w-8 text-red-600" />
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">Administrator</Badge>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Student Management</CardTitle>
                  <CardDescription>View and manage all students</CardDescription>
                </div>
                <Button onClick={() => setIsAddingStudent(true)} className="bg-red-600 hover:bg-red-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </CardHeader>
              <CardContent>
                {isAddingStudent && (
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="text-lg">Add New Student</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Name</Label>
                          <Input
                            id="name"
                            value={newStudent.name}
                            onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                            placeholder="Student name"
                          />
                        </div>
                        <div>
                          <Label htmlFor="sport">Sport</Label>
                          <Input
                            id="sport"
                            value={newStudent.sport}
                            onChange={(e) => setNewStudent({ ...newStudent, sport: e.target.value })}
                            placeholder="Sport"
                          />
                        </div>
                        <div>
                          <Label htmlFor="feePlan">Fee Plan</Label>
                          <Input
                            id="feePlan"
                            value={newStudent.feePlan}
                            onChange={(e) => setNewStudent({ ...newStudent, feePlan: e.target.value })}
                            placeholder="Fee plan"
                          />
                        </div>
                        <div>
                          <Label htmlFor="parentContact">Parent Contact</Label>
                          <Input
                            id="parentContact"
                            value={newStudent.parentContact}
                            onChange={(e) => setNewStudent({ ...newStudent, parentContact: e.target.value })}
                            placeholder="Phone number"
                          />
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button onClick={handleAddStudent} className="bg-red-600 hover:bg-red-700">
                          Add Student
                        </Button>
                        <Button variant="outline" onClick={() => setIsAddingStudent(false)}>
                          Cancel
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
                
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Sport</TableHead>
                      <TableHead>Fee Plan</TableHead>
                      <TableHead>Payment Status</TableHead>
                      <TableHead>Parent Contact</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell className="font-medium">{student.name}</TableCell>
                        <TableCell>{student.sport}</TableCell>
                        <TableCell>{student.feePlan}</TableCell>
                        <TableCell>{getPaymentStatusBadge(student.paymentStatus)}</TableCell>
                        <TableCell>{student.parentContact}</TableCell>
                        <TableCell>
                          <div className="flex space-x-2">
                            <Button size="sm" variant="outline">Edit</Button>
                            <Button size="sm" variant="destructive">Delete</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Logs
                </CardTitle>
                <CardDescription>Stripe payment history and status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Amount</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Method</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {mockPaymentLogs.map((log) => (
                      <TableRow key={log.id}>
                        <TableCell className="font-medium">{log.studentName}</TableCell>
                        <TableCell>{log.amount}</TableCell>
                        <TableCell>{getPaymentStatusBadge(log.status)}</TableCell>
                        <TableCell>{log.date}</TableCell>
                        <TableCell>{log.method}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  WhatsApp Messages
                </CardTitle>
                <CardDescription>Send manual messages and view automated logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Send Manual Message</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {mockStudents.map((student) => (
                      <Button
                        key={student.id}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSendWhatsApp(student.name)}
                        className="justify-start"
                      >
                        <MessageSquare className="h-4 w-4 mr-2" />
                        {student.name}
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">Message History</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Message</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockWhatsAppLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell className="font-medium">{log.studentName}</TableCell>
                          <TableCell>{log.message}</TableCell>
                          <TableCell>
                            <Badge variant={log.status === 'delivered' ? 'default' : 'secondary'}>
                              {log.status}
                            </Badge>
                          </TableCell>
                          <TableCell>{log.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  Attendance Tracking
                </CardTitle>
                <CardDescription>Mark daily attendance and view reports</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Today's Attendance (Jan 25, 2024)</h3>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Student</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {mockAttendance.map((record) => (
                        <TableRow key={record.id}>
                          <TableCell className="font-medium">{record.studentName}</TableCell>
                          <TableCell>{getAttendanceStatusBadge(record.status)}</TableCell>
                          <TableCell>
                            <div className="flex space-x-2">
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-green-600 border-green-600 hover:bg-green-50"
                                onClick={() => handleMarkAttendance(record.id, 'present')}
                              >
                                Present
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="text-red-600 border-red-600 hover:bg-red-50"
                                onClick={() => handleMarkAttendance(record.id, 'absent')}
                              >
                                Absent
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
