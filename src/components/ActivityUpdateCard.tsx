
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, X, Eye, Calendar } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Activity {
  id: string;
  title: string;
  description: string;
  batch: string;
  date: string;
  photos: string[];
  status: 'draft' | 'shared';
}

const ActivityUpdateCard = () => {
  const [selectedBatch, setSelectedBatch] = useState<string>('');
  const [activityTitle, setActivityTitle] = useState<string>('');
  const [activityDescription, setActivityDescription] = useState<string>('');
  const [selectedPhotos, setSelectedPhotos] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // Mock data for recent activities
  const [recentActivities] = useState<Activity[]>([
    {
      id: '1',
      title: 'Football Training Session',
      description: 'Focused on dribbling and passing techniques',
      batch: 'Morning Batch A',
      date: '2024-06-07',
      photos: ['photo1.jpg', 'photo2.jpg'],
      status: 'shared'
    },
    {
      id: '2',
      title: 'Basketball Practice',
      description: 'Free throw practice and team coordination',
      batch: 'Evening Batch B',
      date: '2024-06-06',
      photos: ['photo3.jpg'],
      status: 'draft'
    }
  ]);

  const batches = ['Morning Batch A', 'Evening Batch B', 'Weekend Batch C'];

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newPhotos = Array.from(files);
      setSelectedPhotos(prev => [...prev, ...newPhotos]);
    }
  };

  const removePhoto = (index: number) => {
    setSelectedPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmitActivity = async () => {
    if (!selectedBatch || !activityTitle || !activityDescription) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Activity Shared Successfully",
        description: "Activity has been shared with parents and admin",
      });
      
      // Reset form
      setSelectedBatch('');
      setActivityTitle('');
      setActivityDescription('');
      setSelectedPhotos([]);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* New Activity Form */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-blue-600" />
            Share Activity Update
          </CardTitle>
          <CardDescription>
            Document and share activities with photos for parents and admin
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Batch Selection */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="batch">Batch *</Label>
              <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                <SelectTrigger>
                  <SelectValue placeholder="Select batch" />
                </SelectTrigger>
                <SelectContent>
                  {batches.map((batch) => (
                    <SelectItem key={batch} value={batch}>
                      {batch}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="title">Activity Title *</Label>
              <Input
                id="title"
                placeholder="e.g., Football Training Session"
                value={activityTitle}
                onChange={(e) => setActivityTitle(e.target.value)}
              />
            </div>
          </div>

          {/* Activity Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Activity Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the activities conducted, skills practiced, achievements, etc."
              value={activityDescription}
              onChange={(e) => setActivityDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Photo Upload */}
          <div className="space-y-2">
            <Label>Photos</Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handlePhotoUpload}
                className="hidden"
                id="photo-upload"
              />
              <label htmlFor="photo-upload" className="cursor-pointer">
                <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">
                  Click to upload photos or drag and drop
                </p>
                <p className="text-xs text-gray-400 mt-1">
                  PNG, JPG up to 10MB each
                </p>
              </label>
            </div>
          </div>

          {/* Selected Photos Preview */}
          {selectedPhotos.length > 0 && (
            <div className="space-y-2">
              <Label>Selected Photos ({selectedPhotos.length})</Label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {selectedPhotos.map((photo, index) => (
                  <div key={index} className="relative group">
                    <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border">
                      <Camera className="h-6 w-6 text-gray-400" />
                    </div>
                    <button
                      onClick={() => removePhoto(index)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                    <p className="text-xs text-gray-500 mt-1 truncate">
                      {photo.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Submit Button */}
          <Button
            onClick={handleSubmitActivity}
            disabled={isSubmitting}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            {isSubmitting ? "Sharing..." : "Share Activity"}
          </Button>
        </CardContent>
      </Card>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activities</CardTitle>
          <CardDescription>
            View your recently shared activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="border rounded-lg p-4 space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h4 className="font-medium">{activity.title}</h4>
                    <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-500">
                      <Calendar className="h-4 w-4" />
                      {activity.date}
                      <span>•</span>
                      <span>{activity.batch}</span>
                      <span>•</span>
                      <span>{activity.photos.length} photos</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={activity.status === 'shared' ? 'default' : 'secondary'}
                      className={activity.status === 'shared' ? 'bg-green-500 hover:bg-green-600' : ''}
                    >
                      {activity.status === 'shared' ? 'Shared' : 'Draft'}
                    </Badge>
                    <Button variant="ghost" size="sm">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ActivityUpdateCard;
