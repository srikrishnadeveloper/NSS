
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Shield, MessageSquare, Calendar, UserPlus, CreditCard, Phone, Users, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import StudentRegistrationForm from '@/components/StudentRegistrationForm';
import ParentCredentialsCard from '@/components/ParentCredentialsCard';

// Mock data
const mockStudents = [
  { id: 1, name: 'John Smith', sport: 'Soccer', feePlan: 'Monthly - $150', paymentStatus: 'paid', parentContact: '+1234567890', lastPayment: '2024-01-15', group: 'Advanced' },
  { id: 2, name: 'Sarah Johnson', sport: 'Basketball', feePlan: 'Weekly - $40', paymentStatus: 'failed', parentContact: '+1234567891', lastPayment: '2024-01-10', group: 'Intermediate' },
  { id: 3, name: 'Mike Davis', sport: 'Tennis', feePlan: 'Monthly - $200', paymentStatus: 'upcoming', parentContact: '+1234567892', lastPayment: '2023-12-15', group: 'Beginners' },
  { id: 4, name: 'Emma Wilson', sport: 'Swimming', feePlan: 'Monthly - $180', paymentStatus: 'paid', parentContact: '+1234567893', lastPayment: '2024-01-20', group: 'Advanced' },
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

const mockStudentAttendance = [
  { id: 1, studentName: 'John Smith', date: '2024-01-25', status: 'present', batch: 'Advanced Soccer', sport: 'Soccer' },
  { id: 2, studentName: 'Sarah Johnson', date: '2024-01-25', status: 'absent', batch: 'Intermediate Basketball', sport: 'Basketball' },
  { id: 3, studentName: 'Mike Davis', date: '2024-01-25', status: 'present', batch: 'Beginners Tennis', sport: 'Tennis' },
  { id: 4, studentName: 'Emma Wilson', date: '2024-01-25', status: 'present', batch: 'Advanced Swimming', sport: 'Swimming' },
  { id: 5, studentName: 'Alex Brown', date: '2024-01-25', status: 'late', batch: 'Advanced Soccer', sport: 'Soccer' },
];

const mockCoachAttendance = [
  { 
    id: 1, 
    coachName: 'Coach Michael', 
    date: '2024-01-25', 
    entryTime: '08:00 AM', 
    entryLocation: 'Main Gate', 
    exitTime: '06:00 PM', 
    exitLocation: 'Side Gate',
    sport: 'Soccer',
    batch: 'Advanced Soccer'
  },
  { 
    id: 2, 
    coachName: 'Coach Sarah', 
    date: '2024-01-25', 
    entryTime: '09:00 AM', 
    entryLocation: 'Main Gate', 
    exitTime: '05:30 PM', 
    exitLocation: 'Main Gate',
    sport: 'Basketball',
    batch: 'Intermediate Basketball'
  },
  { 
    id: 3, 
    coachName: 'Coach David', 
    date: '2024-01-25', 
    entryTime: '07:30 AM', 
    entryLocation: 'Side Gate', 
    exitTime: '04:00 PM', 
    exitLocation: 'Side Gate',
    sport: 'Tennis',
    batch: 'Beginners Tennis'
  },
  { 
    id: 4, 
    coachName: 'Coach Lisa', 
    date: '2024-01-25', 
    entryTime: '10:00 AM', 
    entryLocation: 'Pool Entrance', 
    exitTime: '07:00 PM', 
    exitLocation: 'Pool Entrance',
    sport: 'Swimming',
    batch: 'Advanced Swimming'
  },
];

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [parentCredentials, setParentCredentials] = useState(null);
  const [attendanceView, setAttendanceView] = useState('student'); // 'student' or 'coach'
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
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200">Late</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const handleAddStudent = () => {
    setCurrentView('registration');
  };

  const handleRegistrationSuccess = (credentials: { username: string; password: string }) => {
    setParentCredentials(credentials);
    setCurrentView('credentials');
  };

  const handleBackToDashboard = () => {
    setCurrentView('dashboard');
    setParentCredentials(null);
  };

  if (currentView === 'registration') {
    return (
      <StudentRegistrationForm
        onBack={handleBackToDashboard}
        onSuccess={handleRegistrationSuccess}
      />
    );
  }

  if (currentView === 'credentials' && parentCredentials) {
    return (
      <ParentCredentialsCard
        credentials={parentCredentials}
        onBack={handleBackToDashboard}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-red-600" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>

        <Tabs defaultValue="students" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 text-xs">
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
          </TabsList>

          <TabsContent value="students">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="text-lg">Student Management</CardTitle>
                  <CardDescription className="text-sm">View all students</CardDescription>
                </div>
                <Button onClick={handleAddStudent} size="sm" className="bg-red-600 hover:bg-red-700">
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add
                </Button>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockStudents.map((student) => (
                  <Card key={student.id} className="p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{student.name}</h3>
                      {getPaymentStatusBadge(student.paymentStatus)}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Sport:</span>
                        <span className="font-medium">{student.sport}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Group:</span>
                        <span className="font-medium">{student.group}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Fee Plan:</span>
                        <span className="font-medium">{student.feePlan}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Parent:</span>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium">{student.parentContact}</span>
                          <Phone className="h-3 w-3" />
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="payments">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <CreditCard className="h-5 w-5 mr-2" />
                  Payment Logs
                </CardTitle>
                <CardDescription className="text-sm">Stripe payment history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockPaymentLogs.map((log) => (
                  <Card key={log.id} className="p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{log.studentName}</h3>
                      {getPaymentStatusBadge(log.status)}
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Amount:</span>
                        <span className="font-medium text-green-600">{log.amount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{log.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Method:</span>
                        <span className="font-medium">{log.method}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="whatsapp">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center text-lg">
                  <MessageSquare className="h-5 w-5 mr-2" />
                  WhatsApp Messages
                </CardTitle>
                <CardDescription className="text-sm">View automated message logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {mockWhatsAppLogs.map((log) => (
                  <Card key={log.id} className="p-4 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900">{log.studentName}</h3>
                      <Badge variant={log.status === 'delivered' ? 'default' : 'secondary'} className="text-xs">
                        {log.status}
                      </Badge>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Message:</span>
                        <p className="mt-1">{log.message}</p>
                      </div>
                      <div className="flex justify-between">
                        <span>Date:</span>
                        <span className="font-medium">{log.date}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="attendance">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-4">
                <div>
                  <CardTitle className="flex items-center text-lg">
                    <Calendar className="h-5 w-5 mr-2" />
                    Attendance Management
                  </CardTitle>
                  <CardDescription className="text-sm">View attendance records (Jan 25, 2024)</CardDescription>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant={attendanceView === 'student' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAttendanceView('student')}
                  >
                    <Users className="h-4 w-4 mr-1" />
                    Students
                  </Button>
                  <Button 
                    variant={attendanceView === 'coach' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setAttendanceView('coach')}
                  >
                    <Clock className="h-4 w-4 mr-1" />
                    Coaches
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {attendanceView === 'student' ? (
                  <>
                    {mockStudentAttendance.map((record) => (
                      <Card key={record.id} className="p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h3 className="font-semibold text-gray-900">{record.studentName}</h3>
                            <p className="text-sm text-gray-600">{record.date}</p>
                          </div>
                          {getAttendanceStatusBadge(record.status)}
                        </div>
                        <div className="space-y-1 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Batch/Group:</span>
                            <span className="font-medium">{record.batch}</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Sport:</span>
                            <span className="font-medium">{record.sport}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </>
                ) : (
                  <>
                    {mockCoachAttendance.map((record) => (
                      <Card key={record.id} className="p-4 border border-gray-200">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{record.coachName}</h3>
                            <p className="text-sm text-gray-600">{record.date}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">{record.sport}</Badge>
                        </div>
                        <div className="space-y-2 text-sm text-gray-600">
                          <div className="flex justify-between">
                            <span>Batch:</span>
                            <span className="font-medium">{record.batch}</span>
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-green-600" />
                                <span className="text-xs font-medium text-green-600">Entry</span>
                              </div>
                              <div className="text-xs">
                                <div>Time: {record.entryTime}</div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{record.entryLocation}</span>
                                </div>
                              </div>
                            </div>
                            <div className="space-y-1">
                              <div className="flex items-center space-x-1">
                                <Clock className="h-3 w-3 text-red-600" />
                                <span className="text-xs font-medium text-red-600">Exit</span>
                              </div>
                              <div className="text-xs">
                                <div>Time: {record.exitTime}</div>
                                <div className="flex items-center space-x-1">
                                  <MapPin className="h-3 w-3" />
                                  <span>{record.exitLocation}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;
