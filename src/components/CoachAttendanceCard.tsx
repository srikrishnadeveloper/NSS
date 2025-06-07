
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
    <Card className="shadow-sm border-0 bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-xl">
              <Clock className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">My Attendance</CardTitle>
              <CardDescription className="text-sm text-gray-500">Track your session time</CardDescription>
            </div>
          </div>
          <Badge 
            variant={isCheckedIn ? "default" : "secondary"}
            className={`text-xs px-2 py-1 ${isCheckedIn ? "bg-green-100 text-green-700 hover:bg-green-100" : "bg-gray-100 text-gray-600"}`}
          >
            {isCheckedIn ? "Active" : "Inactive"}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-4 space-y-4">
        {/* Status Display */}
        <div className="bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-gray-700">Current Status</span>
            {isCheckedIn ? (
              <CheckCircle className="h-5 w-5 text-green-500" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-400" />
            )}
          </div>
          
          {checkInTime && (
            <div className="flex items-center gap-2 text-sm text-blue-600 mb-2">
              <Timer className="h-4 w-4" />
              <span>Started: {checkInTime.toLocaleTimeString()}</span>
            </div>
          )}
          
          {location && (
            <div className="flex items-start gap-2 text-xs text-gray-500">
              <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
              <span className="leading-relaxed break-all">{location}</span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
          className={`w-full h-12 text-base font-medium rounded-xl ${
            isCheckedIn 
              ? "bg-red-500 hover:bg-red-600 text-white" 
              : "bg-green-500 hover:bg-green-600 text-white"
          }`}
        >
          {isCheckedIn ? (
            <>
              <Square className="h-4 w-4 mr-2" />
              Check Out
            </>
          ) : (
            <>
              <Play className="h-4 w-4 mr-2" />
              Check In
            </>
          )}
        </Button>

        {/* Today's Summary */}
        <div className="bg-blue-50 rounded-xl p-3">
          <h4 className="font-medium text-blue-900 text-sm mb-2">Today's Summary</h4>
          <div className="grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="text-lg font-bold text-blue-600">2</div>
              <div className="text-xs text-blue-600">Sessions</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">6.5</div>
              <div className="text-xs text-blue-600">Hours</div>
            </div>
            <div>
              <div className="text-lg font-bold text-blue-600">2:30</div>
              <div className="text-xs text-blue-600">Last Out</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachAttendanceCard;
