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
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-orange-100 rounded-2xl">
              <Camera className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">Activity Updates</h3>
              <p className="text-sm text-gray-500">Share session highlights</p>
            </div>
          </div>
          <Button
            onClick={() => setShowForm(!showForm)}
            size="sm"
            className="h-10 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-medium"
          >
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>
      </div>
      
      {/* Content */}
      <div className="px-5 py-5 space-y-5">
        {/* New Activity Form */}
        {showForm && (
          <div className="bg-gray-50 rounded-2xl p-5 space-y-4 border border-gray-100">
            <div className="space-y-4">
              <div>
                <Label htmlFor="batch" className="text-sm font-bold text-gray-700 mb-2 block">Batch</Label>
                <Select value={selectedBatch} onValueChange={setSelectedBatch}>
                  <SelectTrigger className="h-12 rounded-xl border-gray-200 bg-white shadow-sm">
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
                <Label htmlFor="title" className="text-sm font-bold text-gray-700 mb-2 block">Activity Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Football Training Session"
                  value={activityTitle}
                  onChange={(e) => setActivityTitle(e.target.value)}
                  className="h-12 rounded-xl border-gray-200 bg-white shadow-sm"
                />
              </div>

              <div>
                <Label htmlFor="description" className="text-sm font-bold text-gray-700 mb-2 block">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe the activities and achievements..."
                  value={activityDescription}
                  onChange={(e) => setActivityDescription(e.target.value)}
                  rows={3}
                  className="rounded-xl resize-none border-gray-200 bg-white shadow-sm"
                />
              </div>

              {/* Photo Upload */}
              <div>
                <Label className="text-sm font-bold text-gray-700 mb-2 block">Photos</Label>
                <div className="border-2 border-dashed border-gray-300 rounded-2xl p-6 text-center bg-white">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="photo-upload"
                  />
                  <label htmlFor="photo-upload" className="cursor-pointer">
                    <Upload className="h-8 w-8 mx-auto mb-3 text-gray-400" />
                    <p className="text-sm text-gray-600 font-medium">Upload photos</p>
                  </label>
                </div>
              </div>

              {/* Selected Photos Preview */}
              {selectedPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {selectedPhotos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-gray-100 rounded-2xl flex items-center justify-center border border-gray-200">
                        <ImageIcon className="h-8 w-8 text-gray-400" />
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="flex gap-3 pt-2">
                <Button
                  onClick={handleSubmitActivity}
                  disabled={isSubmitting}
                  className="flex-1 h-12 bg-orange-500 hover:bg-orange-600 text-white rounded-xl font-bold"
                >
                  {isSubmitting ? "Sharing..." : "Share Activity"}
                </Button>
                <Button
                  onClick={() => setShowForm(false)}
                  variant="outline"
                  className="h-12 px-6 rounded-xl border-gray-200"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Recent Activities */}
        <div className="space-y-4">
          <h4 className="font-bold text-gray-800">Recent Activities</h4>
          {recentActivities.map((activity) => (
            <div key={activity.id} className="bg-gray-50 rounded-2xl p-4 border border-gray-100">
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <h5 className="font-bold text-gray-900 truncate">{activity.title}</h5>
                  <p className="text-sm text-gray-600 mt-1 line-clamp-2">{activity.description}</p>
                  <div className="flex items-center gap-3 mt-3 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      <span>{activity.date}</span>
                    </div>
                    <span>•</span>
                    <span>{activity.batch}</span>
                    <span>•</span>
                    <span>{activity.photos.length} photos</span>
                  </div>
                </div>
                <div className="flex items-center gap-3 ml-4">
                  <Badge 
                    variant={activity.status === 'shared' ? 'default' : 'secondary'}
                    className={`px-3 py-1 rounded-xl font-medium ${
                      activity.status === 'shared' 
                        ? 'bg-green-100 text-green-700 hover:bg-green-100' 
                        : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    {activity.status === 'shared' ? 'Shared' : 'Draft'}
                  </Badge>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 rounded-xl hover:bg-gray-100">
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivityUpdateCard;
