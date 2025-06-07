
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, MapPin, CheckCircle, XCircle, Play, Square } from 'lucide-react';
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
    <Card className="h-fit">
      <CardHeader className="pb-3 sm:pb-6">
        <CardTitle className="flex items-center gap-2 text-lg sm:text-xl">
          <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
          My Attendance
        </CardTitle>
        <CardDescription className="text-sm">
          Record your check-in and check-out times with location
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3 sm:space-y-4 px-3 sm:px-6">
        {/* Current Status - Mobile optimized */}
        <div className="flex items-center justify-between p-2 sm:p-3 bg-gray-50 rounded-lg">
          <span className="font-medium text-sm sm:text-base">Status:</span>
          <Badge 
            variant={isCheckedIn ? "default" : "secondary"}
            className={`text-xs sm:text-sm ${isCheckedIn ? "bg-green-500 hover:bg-green-600" : ""}`}
          >
            {isCheckedIn ? (
              <>
                <CheckCircle className="h-3 w-3 mr-1" />
                Checked In
              </>
            ) : (
              <>
                <XCircle className="h-3 w-3 mr-1" />
                Not Checked In
              </>
            )}
          </Badge>
        </div>

        {/* Check-in Time - Mobile optimized */}
        {checkInTime && (
          <div className="p-2 sm:p-3 bg-blue-50 rounded-lg">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-blue-700">
              <Play className="h-3 w-3 sm:h-4 sm:w-4 flex-shrink-0" />
              <span>Check-in: {checkInTime.toLocaleTimeString()}</span>
            </div>
          </div>
        )}

        {/* Location - Mobile optimized */}
        {location && (
          <div className="p-2 sm:p-3 bg-gray-50 rounded-lg">
            <div className="flex items-start gap-2 text-xs sm:text-sm text-gray-600">
              <MapPin className="h-3 w-3 sm:h-4 sm:w-4 mt-0.5 flex-shrink-0" />
              <span className="break-all leading-relaxed">{location}</span>
            </div>
          </div>
        )}

        {/* Action Button - Mobile optimized */}
        <Button
          onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
          className={`w-full h-10 sm:h-11 text-sm sm:text-base ${
            isCheckedIn 
              ? "bg-red-600 hover:bg-red-700" 
              : "bg-green-600 hover:bg-green-700"
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

        {/* Today's Summary - Mobile optimized */}
        <div className="pt-3 sm:pt-4 border-t">
          <h4 className="font-medium text-sm mb-2">Today's Summary</h4>
          <div className="text-xs text-gray-500 space-y-1 leading-relaxed">
            <div>Total Sessions: 2</div>
            <div>Total Hours: 6.5</div>
            <div>Last Check-out: 2:30 PM</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CoachAttendanceCard;
