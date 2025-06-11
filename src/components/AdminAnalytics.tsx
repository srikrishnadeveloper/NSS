import * as React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { TrendingUp, TrendingDown, Users, DollarSign, Activity, Calendar, Download, ArrowLeft, Clock, MapPin, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

// Mock analytics data
const revenueData = [
  { month: 'Jan', revenue: 12400, students: 45, coaches: 8 },
  { month: 'Feb', revenue: 13200, students: 52, coaches: 9 },
  { month: 'Mar', revenue: 14800, students: 58, coaches: 10 },
  { month: 'Apr', revenue: 16200, students: 64, coaches: 11 },
  { month: 'May', revenue: 17500, students: 68, coaches: 12 },
  { month: 'Jun', revenue: 18900, students: 72, coaches: 12 }
];

const sportDistribution = [
  { sport: 'Soccer', students: 28, revenue: 8400, color: '#ef4444' },
  { sport: 'Basketball', students: 22, revenue: 6600, color: '#3b82f6' },
  { sport: 'Tennis', students: 15, revenue: 4500, color: '#10b981' },
  { sport: 'Swimming', students: 18, revenue: 5400, color: '#f59e0b' }
];

const paymentTrends = [
  { month: 'Jan', successful: 85, failed: 8, pending: 7 },
  { month: 'Feb', successful: 88, failed: 6, pending: 6 },
  { month: 'Mar', successful: 92, failed: 4, pending: 4 },
  { month: 'Apr', successful: 89, failed: 7, pending: 4 },
  { month: 'May', successful: 94, failed: 3, pending: 3 },
  { month: 'Jun', successful: 96, failed: 2, pending: 2 }
];

const coachPerformance = [
  { name: 'Coach Michael', students: 28, retention: 95, rating: 4.8 },
  { name: 'Coach Sarah', students: 22, retention: 92, rating: 4.7 },
  { name: 'Coach David', students: 15, retention: 88, rating: 4.6 },
  { name: 'Coach Lisa', students: 18, retention: 94, rating: 4.9 }
];

const attendanceData = [
  { date: '2024-01-01', present: 65, absent: 8, late: 4 },
  { date: '2024-01-02', present: 68, absent: 6, late: 3 },
  { date: '2024-01-03', present: 71, absent: 4, late: 2 },
  { date: '2024-01-04', present: 69, absent: 5, late: 3 },
  { date: '2024-01-05', present: 72, absent: 3, late: 2 },
  { date: '2024-01-06', present: 70, absent: 4, late: 3 },
  { date: '2024-01-07', present: 73, absent: 2, late: 2 }
];

// Mock coach attendance data
const coachAttendanceData = [
  { date: '2024-01-01', present: 11, absent: 1, late: 0 },
  { date: '2024-01-02', present: 12, absent: 0, late: 0 },
  { date: '2024-01-03', present: 10, absent: 2, late: 1 },
  { date: '2024-01-04', present: 12, absent: 0, late: 0 },
  { date: '2024-01-05', present: 11, absent: 1, late: 0 },
  { date: '2024-01-06', present: 12, absent: 0, late: 0 },
  { date: '2024-01-07', present: 11, absent: 0, late: 1 }
];

// Mock detailed student attendance
const studentAttendanceDetails = [
  { name: 'John Smith', sport: 'Soccer', present: 6, absent: 1, late: 0, attendanceRate: 86 },
  { name: 'Sarah Johnson', sport: 'Basketball', present: 5, absent: 2, late: 0, attendanceRate: 71 },
  { name: 'Mike Davis', sport: 'Tennis', present: 7, absent: 0, late: 0, attendanceRate: 100 },
  { name: 'Emma Wilson', sport: 'Swimming', present: 6, absent: 0, late: 1, attendanceRate: 86 },
  { name: 'Alex Brown', sport: 'Soccer', present: 5, absent: 1, late: 1, attendanceRate: 71 },
  { name: 'Lisa Chen', sport: 'Basketball', present: 7, absent: 0, late: 0, attendanceRate: 100 }
];

// Mock detailed coach attendance
const coachAttendanceDetails = [
  { name: 'Coach Michael', sport: 'Soccer', present: 7, absent: 0, late: 0, attendanceRate: 100, avgHours: 8.5 },
  { name: 'Coach Sarah', sport: 'Basketball', present: 6, absent: 1, late: 0, attendanceRate: 86, avgHours: 7.8 },
  { name: 'Coach David', sport: 'Tennis', present: 7, absent: 0, late: 0, attendanceRate: 100, avgHours: 8.2 },
  { name: 'Coach Lisa', sport: 'Swimming', present: 6, absent: 0, late: 1, attendanceRate: 86, avgHours: 8.0 }
];

const chartConfig = {
  revenue: { label: 'Revenue', color: '#ef4444' },
  students: { label: 'Students', color: '#3b82f6' },
  coaches: { label: 'Coaches', color: '#10b981' },
  present: { label: 'Present', color: '#10b981' },
  absent: { label: 'Absent', color: '#ef4444' },
  late: { label: 'Late', color: '#f59e0b' },
  successful: { label: 'Successful', color: '#10b981' },
  failed: { label: 'Failed', color: '#ef4444' },
  pending: { label: 'Pending', color: '#f59e0b' }
};

interface AdminAnalyticsProps {
  onBack: () => void;
}

const AdminAnalytics = ({ onBack }: AdminAnalyticsProps) => {
  const [attendanceView, setAttendanceView] = React.useState<'student' | 'coach'>('student');
  
  const totalRevenue = revenueData.reduce((sum, item) => sum + item.revenue, 0);
  const totalStudents = Math.max(...revenueData.map(item => item.students));
  const revenueGrowth = ((revenueData[revenueData.length - 1].revenue - revenueData[0].revenue) / revenueData[0].revenue * 100).toFixed(1);
  const avgAttendance = ((attendanceData.reduce((sum, item) => sum + item.present, 0) / attendanceData.length) / (attendanceData[0].present + attendanceData[0].absent + attendanceData[0].late) * 100).toFixed(1);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="container mx-auto px-3 py-4 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onBack}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </Button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
              <p className="text-sm text-gray-600 mt-1">Comprehensive insights and performance metrics</p>
            </div>
          </div>
          <Button size="sm" className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalRevenue.toLocaleString()}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +{revenueGrowth}% from last period
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Students</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalStudents}</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +12% this month
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Attendance Rate</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{avgAttendance}%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +3.2% this week
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Payment Success</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">96%</div>
              <div className="flex items-center text-xs text-green-600">
                <TrendingUp className="h-3 w-3 mr-1" />
                +8% improvement
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Tabs */}
        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="grid w-full grid-cols-2 lg:grid-cols-5">
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="students">Students</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Revenue Analytics */}
          <TabsContent value="revenue" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>Monthly revenue growth over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="revenue" 
                          stroke="#ef4444" 
                          fill="#ef4444" 
                          fillOpacity={0.3}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Revenue by Sport</CardTitle>
                  <CardDescription>Revenue distribution across different sports</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sportDistribution}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={120}
                          paddingAngle={5}
                          dataKey="revenue"
                          label={(entry: typeof sportDistribution[0]) => `${entry.sport}: $${entry.revenue}`}
                        >
                          {sportDistribution.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip content={<ChartTooltipContent />} />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Student Analytics */}
          <TabsContent value="students" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Student Growth</CardTitle>
                  <CardDescription>Student enrollment over time</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={revenueData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line 
                          type="monotone" 
                          dataKey="students" 
                          stroke="#3b82f6" 
                          strokeWidth={3}
                          dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Students by Sport</CardTitle>
                  <CardDescription>Distribution of students across sports</CardDescription>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={sportDistribution}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="sport" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="students" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Attendance Analytics */}
          <TabsContent value="attendance" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Attendance Trends</CardTitle>
                      <CardDescription>
                        {attendanceView === 'student' ? 'Daily student attendance patterns' : 'Daily coach attendance patterns'}
                      </CardDescription>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-blue-600" />
                        <span className="text-sm font-medium">Students</span>
                        <Switch
                          checked={attendanceView === 'coach'}
                          onCheckedChange={(checked) => setAttendanceView(checked ? 'coach' : 'student')}
                        />
                        <span className="text-sm font-medium">Coaches</span>
                        <User className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ChartContainer config={chartConfig} className="h-[300px]">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={attendanceView === 'student' ? attendanceData : coachAttendanceData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Area 
                          type="monotone" 
                          dataKey="present" 
                          stackId="1"
                          stroke="#10b981" 
                          fill="#10b981" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="late" 
                          stackId="1"
                          stroke="#f59e0b" 
                          fill="#f59e0b" 
                        />
                        <Area 
                          type="monotone" 
                          dataKey="absent" 
                          stackId="1"
                          stroke="#ef4444" 
                          fill="#ef4444" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>
                    {attendanceView === 'student' ? 'Student' : 'Coach'} Attendance Summary
                  </CardTitle>
                  <CardDescription>
                    Individual attendance records and rates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 max-h-[300px] overflow-y-auto">
                    {(attendanceView === 'student' ? studentAttendanceDetails : coachAttendanceDetails).map((person, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="space-y-1">
                          <h3 className="font-semibold text-sm">{person.name}</h3>
                          <div className="flex items-center space-x-2">
                            <Badge variant="outline" className="text-xs">
                              {person.sport}
                            </Badge>
                            {attendanceView === 'coach' && 'avgHours' in person && (
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="h-3 w-3" />
                                <span>{person.avgHours}h avg</span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-right space-y-1">
                          <div className="flex items-center space-x-3 text-xs">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              <span>{person.present}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                              <span>{person.late}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                              <span>{person.absent}</span>
                            </div>
                          </div>
                          <div className="text-sm font-medium">
                            {person.attendanceRate}% attendance
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Performance Analytics */}
          <TabsContent value="performance" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Coach Performance</CardTitle>
                <CardDescription>Coach effectiveness metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {coachPerformance.map((coach, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{coach.name}</h3>
                        <p className="text-sm text-gray-600">{coach.students} students</p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-center">
                          <div className="text-sm font-medium">{coach.retention}%</div>
                          <div className="text-xs text-gray-500">Retention</div>
                        </div>
                        <div className="text-center">
                          <div className="text-sm font-medium">{coach.rating}/5</div>
                          <div className="text-xs text-gray-500">Rating</div>
                        </div>
                        <Badge variant={coach.retention > 90 ? "default" : "secondary"}>
                          {coach.retention > 90 ? "Excellent" : "Good"}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminAnalytics;
