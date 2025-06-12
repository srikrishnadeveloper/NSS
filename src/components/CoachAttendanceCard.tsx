
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CoachAttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleCheckIn = () => {
    const timestamp = new Date();
    
    // Get location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const location = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            accuracy: position.coords.accuracy
          };
          
          console.log('Check-in Location:', location);
          console.log('Check-in Timestamp:', timestamp.toISOString());
          console.log('Check-in Details:', {
            timestamp: timestamp.toISOString(),
            location: location,
            formattedTime: timestamp.toLocaleString()
          });
        },
        (error) => {
          console.log('Location access denied or failed:', error.message);
          console.log('Check-in Timestamp (without location):', timestamp.toISOString());
        }
      );
    } else {
      console.log('Geolocation not supported by this browser');
      console.log('Check-in Timestamp (without location):', timestamp.toISOString());
    }

    setIsCheckedIn(true);
    setCheckInTime(timestamp);
    toast({
      title: "Checked In",
      description: "Session started",
    });
  };

  const handleCheckOut = () => {
    setIsCheckedIn(false);
    const checkOutTime = new Date();
    const duration = checkInTime ? 
      Math.round((checkOutTime.getTime() - checkInTime.getTime()) / (1000 * 60)) : 0;
    
    console.log('Check-out Timestamp:', checkOutTime.toISOString());
    console.log('Session Duration:', duration, 'minutes');
    
    toast({
      title: "Checked Out",
      description: `Session duration: ${duration} minutes`,
    });
    
    setCheckInTime(null);
  };

  return (
    <div className="w-full">
      {isCheckedIn ? (
        <Button
          onClick={handleCheckOut}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium"
        >
          Check Out
        </Button>
      ) : (
        <Button
          onClick={handleCheckIn}
          className="w-full h-12 bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg font-medium"
        >
          Check In
        </Button>
      )}
    </div>
  );
};

export default CoachAttendanceCard;
