
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, CheckCircle, XCircle, Play, Square } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const CoachAttendanceCard = () => {
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [checkInTime, setCheckInTime] = useState<Date | null>(null);
  const { toast } = useToast();

  const handleCheckIn = () => {
    setIsCheckedIn(true);
    setCheckInTime(new Date());
    toast({
      title: "Checked In Successfully",
      description: "Your attendance has been recorded",
    });
  };

  const handleCheckOut = () => {
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
    <div className="bg-card rounded-lg shadow-sm border border-border overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary rounded-lg">
              <Clock className="h-6 w-6 text-foreground" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-foreground">Attendance</h3>
              <p className="text-sm text-muted-foreground">Track your session</p>
            </div>
          </div>
          <Badge 
            variant={isCheckedIn ? "default" : "secondary"}
            className="px-3 py-1 text-sm font-medium rounded-lg"
          >
            {isCheckedIn ? "Active" : "Inactive"}
          </Badge>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-5 py-5 space-y-5">
        {/* Status Display */}
        <div className="bg-secondary rounded-lg p-4">
          <div className="flex items-center justify-center mb-4">
            {isCheckedIn ? (
              <CheckCircle className="h-12 w-12 text-primary" />
            ) : (
              <XCircle className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
          
          <div className="text-center">
            <p className="font-medium text-foreground">
              {isCheckedIn ? 'Currently Active' : 'Not Active'}
            </p>
            {checkInTime && (
              <p className="text-sm text-muted-foreground mt-1">
                Started: {checkInTime.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        {/* Action Button */}
        <Button
          onClick={isCheckedIn ? handleCheckOut : handleCheckIn}
          className={`w-full h-14 text-lg font-bold rounded-lg ${
            isCheckedIn 
              ? "bg-destructive hover:bg-destructive/90 text-destructive-foreground" 
              : "bg-primary hover:bg-primary/90 text-primary-foreground"
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
      </div>
    </div>
  );
};

export default CoachAttendanceCard;
