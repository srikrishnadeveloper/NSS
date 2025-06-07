
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, CheckCircle, XCircle, Play, Square, Timer } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CoachAttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const [location, setLocation] = useState<string>('');
  const { toast } = useToast();

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
        },
        () => {
          setLocation('Location access denied');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  };

  const handleCheckIn = () => {
    getCurrentLocation();
    setIsCheckedIn(true);
    setCheckInTime(new Date());
    toast({
      title: "Checked In Successfully",
      description: "Your attendance has been recorded",
    });
  };

  const handleCheckOut = () => {
    getCurrentLocation();
    setIsCheckedIn(false);
    const checkOutTime = new Date();
    const duration = checkInTime ? 
      Math.round((checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)) : 0;
    
    toast({
      title: "Checked Out Successfully",
      description: `Session duration: ${duration} minutes`,
    });
    
    setCheckInTime(null);
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-100 rounded-2xl">
              <Clock className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">My Attendance</h3>
              <p className="text-sm text-gray-500">Track your session time</p>
            </div>
          </div>
          <Badge 
            variant={isCheckedIn ? "default" : "secondary"}
            className={`px-3 py-1 text-sm font-medium rounded-xl ${
              isCheckedIn 
                ? "bg-green-100 text-green-700 hover:bg-green-100" 
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {isCheckedIn ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-5 py-5 space-y-5">
        {/* Status Display */}
        <div className="bg-gray-50 rounded-2xl p-4">
          <div className="flex items-center justify-between mb-4">
            <span className="font-bold text-gray-800">Current Status</span>
            {isCheckedIn ? (
              <CheckCircle className="h-6 w-6 text-green-500" />
            ) : (
              <XCircle className="h-6 w-6 text-gray-400" />
            )}
          </div>
          
          {checkInTime && (
            <div className="flex items-center gap-3 text-sm text-blue-600 mb-3 p-3 bg-blue-50 rounded-xl">
              <Timer className="h-5 w-5" />
              <span className="font-medium">Started: {checkInTime.toLocaleTimeString()}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-start gap-3 text-sm text-gray-600 p-3 bg-white rounded-xl border border-gray-100">
              <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed break-all font-mono text-xs">{location}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
          className={`w-full h-14 text-lg font-bold rounded-2xl shadow-sm ${
            isCheckedIn 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isCheckedIn ? (
            <>
              <Square className="h-5 w-5 mr-3" />
              Check Out
            </>
          ) : (
            <>
              <Play className="h-5 w-5 mr-3" />
              Check In
            </>
          )}
        </Button>

        {/* Today's Summary */}
        <div className="bg-blue-50 rounded-2xl p-4">
          <h4 className="font-bold text-blue-900 mb-4">Today's Summary</h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">2</div>
              <div className="text-sm text-blue-600 font-medium">Sessions</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">6.5</div>
              <div className="text-sm text-blue-600 font-medium">Hours</div>
            </div>
            <div className="text-center p-3 bg-white rounded-xl border border-blue-100">
              <div className="text-2xl font-bold text-blue-600">2:30</div>
              <div className="text-sm text-blue-600 font-medium">Last Out</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachAttendanceCard;
