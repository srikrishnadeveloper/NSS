
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const CoachAttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(new Date());
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
