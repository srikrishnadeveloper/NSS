
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Camera, Upload, X, Eye, Calendar, Image as ImageIcon, Plus } from 'lucide-react';
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
  const [showForm, setShowForm] = useState(false);
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
      setShowForm(false);
    }, 1500);
  };

  return (
    <Card className="shadow-sm border-0 bg-white rounded-2xl overflow-hidden">
      <CardHeader className="pb-4 px-4 pt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-xl">
              <Camera className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold">Activity Updates</CardTitle>
              <CardDescription className="text-sm text-gray-500">Share session highlights</CardDescription>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            className="h-8 px-3 text-xs bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
          >
            <Plus className="h-3 w-3 mr-1" />
            New
          </Button>
        </div>
      </CardHeader>
      
      <CardContent className="px-4 pb-4 space-y-4">
        {/* New Activity Form */}
        {showForm && (
          <div className="bg-gray-50 rounded-xl p-4 space-y-4">
            <div className="space-y-3">
              <div>
                <Label htmlFor="batch" className="text-sm font-medium text-gray-700">Batch</Label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger className="mt-1 h-10 rounded-lg">
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
              
              <div>
                <Label htmlFor="title" className="text-sm font-medium text-gray-700">Activity Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Football Training Session"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="mt-1 h-10 rounded-lg"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-medium text-gray-700">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the activities and achievements..."
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  rows={3}
                  className="mt-1 rounded-lg resize-none"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <Label className="text-sm font-medium text-gray-700">Photos</Label>
                <div className="mt-1 border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="h-6 w-6 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Upload photos</p>
                  </label>
                </div>
              </div>

              {/* Selected Photos Preview */}
              {selectedPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {selectedPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center border">
                        <ImageIcon className="h-6 w-6 text-gray-400" />
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-2 pt-2">
                <Button
                  onClick={handleSubmitActivity}
                  disabled={isSubmitting}
                  className="flex-1 h-10 bg-orange-500 hover:bg-orange-600 text-white rounded-lg"
                >
                  {isSubmitting ? "Sharing..." : "Share Activity"}
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="h-10 px-4 rounded-lg"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activities */}
        <div className="space-y-3">
          <h4 className="font-medium text-gray-700 text-sm">Recent Activities</h4>
          {recentActivities.map((activity) => (
            <div key={activity.id} className="bg-gray-50 rounded-xl p-3">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h5 className="font-medium text-gray-900 text-sm truncate">{activity.title}</h5>
                  <p className="text-xs text-gray-600 mt-1 line-clamp-2">{activity.description}</p>
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Calendar className="h-3 w-3" />
                    <span>{activity.date}</span>
                    <span>•</span>
                    <span>{activity.batch}</span>
                    <span>•</span>
                    <span>{activity.photos.length} photos</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-2">
                  <Badge 
                    variant={activity.status === 'shared' ? 'default' : 'secondary'}
                    className={`text-xs px-2 py-1 ${activity.status === 'shared' ? 'bg-green-100 text-green-700 hover:bg-green-100' : 'bg-gray-100 text-gray-600'}`}
                  >
                    {activity.status === 'shared' ? 'Shared' : 'Draft'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ActivityUpdateCard;
