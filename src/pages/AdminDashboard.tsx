
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Shield, MessageSquare, Calendar as CalendarIcon, UserPlus, CreditCard, Phone, Users, MapPin, Clock, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { format, subDays, isWithinInterval } from 'date-fns';
import { cn } from '@/lib/utils';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
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

// Extended mock data for 45 days attendance
const generateMockAttendanceData = () => {
  const students = ['John Smith', 'Sarah Johnson', 'Mike Davis', 'Emma Wilson', 'Alex Brown', 'Lisa Chen', 'David Wilson', 'Sophie Taylor'];
  const sports = ['Soccer', 'Basketball', 'Tennis', 'Swimming'];
  const statuses = ['present', 'absent', 'late'];
  const data = [];
  
  for (let i = 0; i < 45; i++) {
    const date = subDays(new Date(), i);
    students.forEach((student, index) => {
      // Skip weekends for more realistic data
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        data.push({
          id: `${index}-${i}`,
          studentName: student,
          date: format(date, 'yyyy-MM-dd'),
          status: statuses[Math.floor(Math.random() * statuses.length)],
          sport: sports[index % sports.length],
          batch: `${sports[index % sports.length]} Training`
        });
      }
    });
  }
  
  return data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const mockStudentAttendanceExtended = generateMockAttendanceData();

const AdminDashboard = () => {
  const [currentView, setCurrentView] = useState('dashboard');
  const [parentCredentials, setParentCredentials] = useState(null);
  const [attendanceView, setAttendanceView] = useState('student');
  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: subDays(new Date(), 45),
    to: new Date()
  });
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const { toast } = useToast();

  // Filter attendance data based on date range
  const filteredAttendanceData = useMemo(() => {
    return mockStudentAttendanceExtended.filter(record => {
      const recordDate = new Date(record.date);
      return isWithinInterval(recordDate, { start: dateRange.from, end: dateRange.to });
    });
  }, [dateRange]);

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">Paid</Badge>;
      case 'failed':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-xs">Failed</Badge>;
      case 'upcoming':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs">Upcoming</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const getAttendanceStatusBadge = (status: string) => {
    switch (status) {
      case 'present':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200 text-xs">Present</Badge>;
      case 'absent':
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-200 text-xs">Absent</Badge>;
      case 'late':
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-200 text-xs">Late</Badge>;
      default:
        return <Badge variant="secondary" className="text-xs">{status}</Badge>;
    }
  };

  const downloadAttendancePDF = () => {
    const pdf = new jsPDF();
    
    // Add title
    pdf.setFontSize(16);
    pdf.text('Student Attendance Report', 20, 20);
    
    // Add date range
    pdf.setFontSize(12);
    pdf.text(`Period: ${format(dateRange.from, 'MMM dd, yyyy')} - ${format(dateRange.to, 'MMM dd, yyyy')}`, 20, 35);
    
    // Prepare data for table
    const tableData = filteredAttendanceData.map(record => [
      record.studentName,
      format(new Date(record.date), 'MMM dd, yyyy'),
      record.status,
      record.sport,
      record.batch
    ]);
    
    // Add table using autoTable
    autoTable(pdf, {
      head: [['Student Name', 'Date', 'Status', 'Sport', 'Batch']],
      body: tableData,
      startY: 45,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [220, 53, 69] },
      alternateRowStyles: { fillColor: [245, 245, 245] }
    });
    
    // Add summary
    const totalRecords = filteredAttendanceData.length;
    const presentCount = filteredAttendanceData.filter(r => r.status === 'present').length;
    const absentCount = filteredAttendanceData.filter(r => r.status === 'absent').length;
    const lateCount = filteredAttendanceData.filter(r => r.status === 'late').length;
    
    const finalY = (pdf as any).lastAutoTable.finalY + 10;
    pdf.text('Summary:', 20, finalY);
    pdf.text(`Total Records: ${totalRecords}`, 20, finalY + 10);
    pdf.text(`Present: ${presentCount}`, 20, finalY + 20);
    pdf.text(`Absent: ${absentCount}`, 20, finalY + 30);
    pdf.text(`Late: ${lateCount}`, 20, finalY + 40);
    
    // Save the PDF
    pdf.save(`attendance-report-${format(new Date(), 'yyyy-MM-dd')}.pdf`);
    
    toast({
      title: "PDF Downloaded",
      description: "Attendance report has been downloaded successfully.",
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setDateRange({
        from: subDays(date, 45),
        to: date
      });
      setSelectedDate(date);
      setIsDatePickerOpen(false);
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
      <div className="container mx-auto px-3 py-4 max-w-md sm:max-w-2xl md:max-w-4xl lg:max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-4 px-1">
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5 text-red-600 flex-shrink-0" />
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
        </div>

        {/* Mobile-optimized Tabs */}
        <Tabs defaultValue="students" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 gap-1 h-auto p-1 sm:grid-cols-4">
            <TabsTrigger value="students" className="text-xs px-2 py-2.5 data-[state=active]:bg-white">
              <Users className="h-3 w-3 mr-1" />
              Students
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs px-2 py-2.5 data-[state=active]:bg-white">
              <CreditCard className="h-3 w-3 mr-1" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="whatsapp" className="text-xs px-2 py-2.5 data-[state=active]:bg-white">
              <MessageSquare className="h-3 w-3 mr-1" />
              WhatsApp
            </TabsTrigger>
            <TabsTrigger value="attendance" className="text-xs px-2 py-2.5 data-[state=active]:bg-white">
              <CalendarIcon className="h-3 w-3 mr-1" />
              Attendance
            </TabsTrigger>
          </TabsList>

          {/* Students Tab */}
          <TabsContent value="students" className="space-y-3">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="flex flex-col space-y-3 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                  <div>
                    <CardTitle className="text-base sm:text-lg">Student Management</CardTitle>
                    <CardDescription className="text-xs sm:text-sm">View all students</CardDescription>
                  </div>
                  <Button onClick={handleAddStudent} size="sm" className="bg-red-600 hover:bg-red-700 w-full sm:w-auto">
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Student
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 px-3 sm:px-6">
                {mockStudents.map((student) => (
                  <Card key={student.id} className="p-3 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm pr-2">{student.name}</h3>
                      {getPaymentStatusBadge(student.paymentStatus)}
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between items-center">
                        <span>Sport:</span>
                        <span className="font-medium">{student.sport}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Group:</span>
                        <span className="font-medium">{student.group}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Fee Plan:</span>
                        <span className="font-medium text-right">{student.feePlan}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Parent:</span>
                        <div className="flex items-center space-x-1">
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

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-3">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Payment Logs
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Stripe payment history</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 px-3 sm:px-6">
                {mockPaymentLogs.map((log) => (
                  <Card key={log.id} className="p-3 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm pr-2">{log.studentName}</h3>
                      {getPaymentStatusBadge(log.status)}
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div className="flex justify-between items-center">
                        <span>Amount:</span>
                        <span className="font-medium text-green-600">{log.amount}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Date:</span>
                        <span className="font-medium">{log.date}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Method:</span>
                        <span className="font-medium">{log.method}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* WhatsApp Tab */}
          <TabsContent value="whatsapp" className="space-y-3">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-base sm:text-lg">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  WhatsApp Messages
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">View automated message logs</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3 px-3 sm:px-6">
                {mockWhatsAppLogs.map((log) => (
                  <Card key={log.id} className="p-3 border border-gray-200 shadow-sm">
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="font-semibold text-gray-900 text-sm pr-2">{log.studentName}</h3>
                      <Badge variant={log.status === 'delivered' ? 'default' : 'secondary'} className="text-xs">
                        {log.status}
                      </Badge>
                    </div>
                    <div className="space-y-2 text-xs text-gray-600">
                      <div>
                        <span className="font-medium">Message:</span>
                        <p className="mt-1 leading-relaxed">{log.message}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Date:</span>
                        <span className="font-medium">{log.date}</span>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Attendance Tab */}
          <TabsContent value="attendance" className="space-y-3">
            <Card className="shadow-sm">
              <CardHeader className="pb-3">
                <div className="space-y-3">
                  <div>
                    <CardTitle className="flex items-center text-base sm:text-lg">
                      <CalendarIcon className="h-4 w-4 mr-2" />
                      Attendance Management
                    </CardTitle>
                    <CardDescription className="text-xs sm:text-sm">
                      View attendance records for the last 45 days
                    </CardDescription>
                  </div>
                  
                  {/* Date Range Picker and Download Controls */}
                  <div className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
                    <div className="flex items-center space-x-2">
                      <Popover open={isDatePickerOpen} onOpenChange={setIsDatePickerOpen}>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-xs"
                          >
                            <CalendarIcon className="h-3 w-3 mr-1" />
                            {selectedDate ? format(selectedDate, 'MMM dd, yyyy') : 'Select End Date'}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={selectedDate}
                            onSelect={handleDateSelect}
                            initialFocus
                            className={cn("p-3 pointer-events-auto")}
                          />
                        </PopoverContent>
                      </Popover>
                      <span className="text-xs text-gray-500">
                        ({filteredAttendanceData.length} records)
                      </span>
                    </div>
                    
                    <Button 
                      onClick={downloadAttendancePDF}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700 text-xs"
                    >
                      <Download className="h-3 w-3 mr-1" />
                      Download PDF
                    </Button>
                  </div>

                  <div className="flex space-x-2">
                    <Button 
                      variant={attendanceView === 'student' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAttendanceView('student')}
                      className="flex-1 text-xs"
                    >
                      <Users className="h-3 w-3 mr-1" />
                      Students
                    </Button>
                    <Button 
                      variant={attendanceView === 'coach' ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setAttendanceView('coach')}
                      className="flex-1 text-xs"
                    >
                      <Clock className="h-3 w-3 mr-1" />
                      Coaches
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 px-3 sm:px-6">
                {attendanceView === 'student' ? (
                  <>
                    {filteredAttendanceData.slice(0, 20).map((record) => (
                      <Card key={record.id} className="p-3 border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{record.studentName}</h3>
                            <p className="text-xs text-gray-600">{format(new Date(record.date), 'MMM dd, yyyy')}</p>
                          </div>
                          {getAttendanceStatusBadge(record.status)}
                        </div>
                        <div className="space-y-2 text-xs text-gray-600">
                          <div className="flex justify-between items-center">
                            <span>Batch/Group:</span>
                            <span className="font-medium text-right">{record.batch}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span>Sport:</span>
                            <span className="font-medium">{record.sport}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                    {filteredAttendanceData.length > 20 && (
                      <div className="text-center text-xs text-gray-500 py-2">
                        Showing 20 of {filteredAttendanceData.length} records. Download PDF for full report.
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {mockCoachAttendance.map((record) => (
                      <Card key={record.id} className="p-3 border border-gray-200 shadow-sm">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 text-sm">{record.coachName}</h3>
                            <p className="text-xs text-gray-600">{record.date}</p>
                          </div>
                          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200 text-xs">{record.sport}</Badge>
                        </div>
                        <div className="space-y-3 text-xs text-gray-600">
                          <div className="flex justify-between items-center">
                            <span>Batch:</span>
                            <span className="font-medium text-right">{record.batch}</span>
                          </div>
                          <div className="space-y-2">
                            <div className="bg-gray-50 p-2 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3 text-green-600" />
                                  <span className="font-medium text-green-600">Entry</span>
                                </div>
                                <span className="font-medium">{record.entryTime}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span>{record.entryLocation}</span>
                              </div>
                            </div>
                            <div className="bg-gray-50 p-2 rounded">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-1">
                                  <Clock className="h-3 w-3 text-red-600" />
                                  <span className="font-medium text-red-600">Exit</span>
                                </div>
                                <span className="font-medium">{record.exitTime}</span>
                              </div>
                              <div className="flex items-center space-x-1 text-gray-500">
                                <MapPin className="h-3 w-3" />
                                <span>{record.exitLocation}</span>
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
