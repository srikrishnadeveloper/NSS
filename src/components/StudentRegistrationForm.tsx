
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, UserPlus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudentRegistrationFormProps {
  onBack: () => void;
  onSuccess: (parentCredentials: { username: string; password: string }) => void;
}

const StudentRegistrationForm = ({ onBack, onSuccess }: StudentRegistrationFormProps) => {
  const [formData, setFormData] = useState({
    studentName: '',
    address: '',
    dateOfBirth: '',
    parentNumber: '',
    weight: '',
    height: '',
    interestedGame: '',
    governmentSchool: '',
    schoolName: '',
    sex: '',
    nationality: '',
    groupBatch: ''
  });
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const generateCredentials = () => {
    const username = `parent_${formData.studentName.toLowerCase().replace(/\s+/g, '_')}_${Math.random().toString(36).substring(7)}`;
    const password = Math.random().toString(36).substring(2, 10);
    return { username, password };
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    const requiredFields = Object.entries(formData);
    const emptyFields = requiredFields.filter(([key, value]) => !value.trim());
    
    if (emptyFields.length > 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    const credentials = generateCredentials();
    
    toast({
      title: "Student Added Successfully",
      description: `${formData.studentName} has been registered`,
    });
    
    onSuccess(credentials);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 p-4">
      <div className="max-w-md mx-auto">
        <div className="flex items-center mb-6">
          <Button variant="ghost" size="sm" onClick={onBack} className="mr-3">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-xl font-bold text-gray-900">Add New Student</h1>
        </div>

        <Card className="mb-4">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center text-lg">
              <UserPlus className="h-5 w-5 mr-2 text-red-600" />
              Student Registration
            </CardTitle>
            <CardDescription>Fill in all student details</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="studentName">Student Name *</Label>
                <Input
                  id="studentName"
                  value={formData.studentName}
                  onChange={(e) => handleInputChange('studentName', e.target.value)}
                  placeholder="Enter student name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="address">Address *</Label>
                <Textarea
                  id="address"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Enter full address"
                  rows={3}
                  required
                />
              </div>

              <div>
                <Label htmlFor="dateOfBirth">Date of Birth *</Label>
                <Input
                  id="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>

              <div>
                <Label htmlFor="parentNumber">Parent's Number *</Label>
                <Input
                  id="parentNumber"
                  type="tel"
                  value={formData.parentNumber}
                  onChange={(e) => handleInputChange('parentNumber', e.target.value)}
                  placeholder="Enter parent's phone number"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="weight">Weight (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    value={formData.weight}
                    onChange={(e) => handleInputChange('weight', e.target.value)}
                    placeholder="Weight"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="height">Height (cm) *</Label>
                  <Input
                    id="height"
                    type="number"
                    value={formData.height}
                    onChange={(e) => handleInputChange('height', e.target.value)}
                    placeholder="Height"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="interestedGame">Interested Game *</Label>
                <Select value={formData.interestedGame} onValueChange={(value) => handleInputChange('interestedGame', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select sport/game" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="football">Football</SelectItem>
                    <SelectItem value="basketball">Basketball</SelectItem>
                    <SelectItem value="tennis">Tennis</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                    <SelectItem value="cricket">Cricket</SelectItem>
                    <SelectItem value="badminton">Badminton</SelectItem>
                    <SelectItem value="volleyball">Volleyball</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="governmentSchool">Government School *</Label>
                <Select value={formData.governmentSchool} onValueChange={(value) => handleInputChange('governmentSchool', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Yes or No" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="yes">Yes</SelectItem>
                    <SelectItem value="no">No</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="schoolName">School Name *</Label>
                <Input
                  id="schoolName"
                  value={formData.schoolName}
                  onChange={(e) => handleInputChange('schoolName', e.target.value)}
                  placeholder="Enter school name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="sex">Sex *</Label>
                <Select value={formData.sex} onValueChange={(value) => handleInputChange('sex', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="nationality">Nationality *</Label>
                <Input
                  id="nationality"
                  value={formData.nationality}
                  onChange={(e) => handleInputChange('nationality', e.target.value)}
                  placeholder="Enter nationality"
                  required
                />
              </div>

              <div>
                <Label htmlFor="groupBatch">Group/Batch *</Label>
                <Select value={formData.groupBatch} onValueChange={(value) => handleInputChange('groupBatch', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group/batch" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginners">Beginners</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="junior">Junior (Under 12)</SelectItem>
                    <SelectItem value="senior">Senior (12+)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white">
                Register Student
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentRegistrationForm;
