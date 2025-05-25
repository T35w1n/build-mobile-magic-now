
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChevronLeft, ChevronRight, User, Heart, Briefcase, Music, Flag } from 'lucide-react';

interface ProfileSetupProps {
  onClose: () => void;
  onComplete: (profileData: any) => void;
}

export function ProfileSetup({ onClose, onComplete }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [profileData, setProfileData] = useState<any>({
    personality: {},
    values: {},
    lifestyle: {},
    work: {},
    relationship: {},
    interests: [],
    turnOffs: []
  });

  const steps = [
    { title: "Personality Traits", icon: <User className="w-5 h-5" /> },
    { title: "Values & Beliefs", icon: <Flag className="w-5 h-5" /> },
    { title: "Lifestyle", icon: <Heart className="w-5 h-5" /> },
    { title: "Work & Education", icon: <Briefcase className="w-5 h-5" /> },
    { title: "Relationship Goals", icon: <Heart className="w-5 h-5" /> },
    { title: "Interests & Hobbies", icon: <Music className="w-5 h-5" /> }
  ];

  const handleMultiSelect = (category: string, value: string) => {
    const current = profileData[category] || [];
    const updated = current.includes(value) 
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    
    setProfileData(prev => ({
      ...prev,
      [category]: updated
    }));
  };

  const handleSingleSelect = (category: string, field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: value
      }
    }));
  };

  const renderPersonalityStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Social Energy</Label>
        <RadioGroup 
          value={profileData.personality.socialEnergy || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'socialEnergy', value)}
          className="mt-2"
        >
          {['Introvert', 'Extrovert', 'Ambivert'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Decision Making</Label>
        <RadioGroup 
          value={profileData.personality.decisionMaking || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'decisionMaking', value)}
          className="mt-2"
        >
          {['Emotional', 'Logical', 'Balanced'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Planning Style</Label>
        <RadioGroup 
          value={profileData.personality.planningStyle || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'planningStyle', value)}
          className="mt-2"
        >
          {['Spontaneous', 'Planner', 'Flexible'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Activity Level</Label>
        <RadioGroup 
          value={profileData.personality.activityLevel || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'activityLevel', value)}
          className="mt-2"
        >
          {['Adventurous', 'Homebody', 'Balanced'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Romance Style</Label>
        <RadioGroup 
          value={profileData.personality.romanceStyle || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'romanceStyle', value)}
          className="mt-2"
        >
          {['Romantic', 'Realist', 'Balanced'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Daily Schedule</Label>
        <RadioGroup 
          value={profileData.personality.schedule || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'schedule', value)}
          className="mt-2"
        >
          {['Morning Person', 'Night Owl', 'Flexible'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Humor Style</Label>
        <RadioGroup 
          value={profileData.personality.humor || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'humor', value)}
          className="mt-2"
        >
          {['Dry', 'Sarcastic', 'Goofy', 'Witty', 'Dark'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderValuesStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Religion/Spirituality</Label>
        <Select value={profileData.values.religion || ''} onValueChange={(value) => handleSingleSelect('values', 'religion', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select your beliefs" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Christian">Christian</SelectItem>
            <SelectItem value="Muslim">Muslim</SelectItem>
            <SelectItem value="Jewish">Jewish</SelectItem>
            <SelectItem value="Hindu">Hindu</SelectItem>
            <SelectItem value="Buddhist">Buddhist</SelectItem>
            <SelectItem value="Spiritual">Spiritual but not religious</SelectItem>
            <SelectItem value="Agnostic">Agnostic</SelectItem>
            <SelectItem value="Atheist">Atheist</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
            <SelectItem value="Prefer not to say">Prefer not to say</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold">Family Values</Label>
        <RadioGroup 
          value={profileData.values.family || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'family', value)}
          className="mt-2"
        >
          {['Very Important', 'Somewhat Important', 'Not Important'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Want Children?</Label>
        <RadioGroup 
          value={profileData.values.children || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'children', value)}
          className="mt-2"
        >
          {['Definitely', 'Maybe someday', 'Not sure', 'No', 'Have kids'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Views on Marriage</Label>
        <RadioGroup 
          value={profileData.values.marriage || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'marriage', value)}
          className="mt-2"
        >
          {['Want to get married', 'Maybe someday', 'Not important', 'Already married', 'Divorced'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Relationship Style</Label>
        <RadioGroup 
          value={profileData.values.relationshipStyle || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'relationshipStyle', value)}
          className="mt-2"
        >
          {['Monogamous', 'Open relationship', 'Polyamorous', 'Still exploring'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderLifestyleStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Smoking</Label>
        <RadioGroup 
          value={profileData.lifestyle.smoking || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'smoking', value)}
          className="mt-2"
        >
          {['Never', 'Occasionally', 'Socially', 'Regularly'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Drinking</Label>
        <RadioGroup 
          value={profileData.lifestyle.drinking || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'drinking', value)}
          className="mt-2"
        >
          {['Never', 'Occasionally', 'Socially', 'Regularly'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Cannabis Use</Label>
        <RadioGroup 
          value={profileData.lifestyle.cannabis || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'cannabis', value)}
          className="mt-2"
        >
          {['Never', 'Occasionally', 'Socially', 'Regularly', 'Medicinally'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Diet</Label>
        <RadioGroup 
          value={profileData.lifestyle.diet || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'diet', value)}
          className="mt-2"
        >
          {['Omnivore', 'Vegetarian', 'Vegan', 'Pescatarian', 'Keto', 'Paleo', 'Other'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Exercise Frequency</Label>
        <RadioGroup 
          value={profileData.lifestyle.exercise || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'exercise', value)}
          className="mt-2"
        >
          {['Daily', 'Few times a week', 'Weekly', 'Occasionally', 'Rarely'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Pets</Label>
        <RadioGroup 
          value={profileData.lifestyle.pets || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'pets', value)}
          className="mt-2"
        >
          {['Have pets', 'Want pets', 'Allergic to pets', 'Not a pet person'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderWorkStep = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="occupation" className="text-base font-semibold">Occupation</Label>
        <Input 
          id="occupation"
          placeholder="What do you do for work?"
          value={profileData.work.occupation || ''}
          onChange={(e) => handleSingleSelect('work', 'occupation', e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-semibold">Education Level</Label>
        <Select value={profileData.work.education || ''} onValueChange={(value) => handleSingleSelect('work', 'education', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder="Select education level" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="High School">High School</SelectItem>
            <SelectItem value="Some College">Some College</SelectItem>
            <SelectItem value="Bachelor's">Bachelor's Degree</SelectItem>
            <SelectItem value="Master's">Master's Degree</SelectItem>
            <SelectItem value="PhD">PhD</SelectItem>
            <SelectItem value="Trade School">Trade School</SelectItem>
            <SelectItem value="Other">Other</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold">Work Schedule</Label>
        <RadioGroup 
          value={profileData.work.schedule || ''} 
          onValueChange={(value) => handleSingleSelect('work', 'schedule', value)}
          className="mt-2"
        >
          {['9-5', 'Shift work', 'Freelancer', 'Student', 'Retired', 'Entrepreneur'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">Ambition Level</Label>
        <RadioGroup 
          value={profileData.work.ambition || ''} 
          onValueChange={(value) => handleSingleSelect('work', 'ambition', value)}
          className="mt-2"
        >
          {['Very ambitious', 'Career-focused', 'Balanced', 'Chill', 'Work to live'].map(option => (
            <div key={option} className="flex items-center space-x-2">
              <RadioGroupItem value={option} id={option} />
              <Label htmlFor={option}>{option}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderRelationshipStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Looking for</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Serious Relationship', 'Casual Dating', 'Friends Only', 'Hookups', 'Marriage', 'Still Figuring It Out'].map(option => (
            <Badge
              key={option}
              variant={profileData.relationship.lookingFor?.includes(option) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleMultiSelect('relationship', option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Dealbreakers</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Smoking', 'Children', 'Religion differences', 'Politics', 'Long-Distance', 'Pets', 'Large age gap', 'Open relationships'].map(option => (
            <Badge
              key={option}
              variant={profileData.relationship.dealbreakers?.includes(option) ? "destructive" : "outline"}
              className="cursor-pointer"
              onClick={() => handleMultiSelect('relationship', option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label htmlFor="bio" className="text-base font-semibold">About You</Label>
        <Textarea 
          id="bio"
          placeholder="Tell potential matches about yourself..."
          value={profileData.relationship.bio || ''}
          onChange={(e) => handleSingleSelect('relationship', 'bio', e.target.value)}
          className="mt-2"
          rows={4}
        />
      </div>
    </div>
  );

  const renderInterestsStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">Music Genres</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Hip-Hop', 'R&B', 'EDM', 'Jazz', 'Classical', 'Rock', 'Pop', 'Country', 'Indie', 'Alternative', 'Reggae', 'Latin'].map(option => (
            <Badge
              key={option}
              variant={profileData.interests.includes(option) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleMultiSelect('interests', option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Activities & Hobbies</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Hiking', 'Gym', 'Yoga', 'Travel', 'Cooking', 'Gaming', 'Reading', 'Photography', 'Art', 'Dancing', 'Sports', 'Festivals', 'Coffee', 'Wine', 'Movies', 'TV Shows', 'Podcasts', 'Writing', 'Fashion', 'Tattoos'].map(option => (
            <Badge
              key={option}
              variant={profileData.interests.includes(option) ? "default" : "outline"}
              className="cursor-pointer"
              onClick={() => handleMultiSelect('interests', option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>

      <div>
        <Label className="text-base font-semibold">Turn-offs & Dealbreakers</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {['Bad Hygiene', 'Rudeness', 'Always Late', 'Lack of Ambition', 'Poor Communication', 'Judgmental', 'Clingy', 'Jealous', 'Social Media Obsessed', 'Constant Partying', 'Toxic Ex Talk'].map(option => (
            <Badge
              key={option}
              variant={profileData.turnOffs.includes(option) ? "destructive" : "outline"}
              className="cursor-pointer"
              onClick={() => handleMultiSelect('turnOffs', option)}
            >
              {option}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const stepComponents = [
    renderPersonalityStep,
    renderValuesStep,
    renderLifestyleStep,
    renderWorkStep,
    renderRelationshipStep,
    renderInterestsStep
  ];

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(profileData);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {steps[currentStep].icon}
              {steps[currentStep].title}
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              ✕
            </Button>
          </div>
          
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            Step {currentStep + 1} of {steps.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {stepComponents[currentStep]()}
          
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
              disabled={currentStep === 0}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Button>
            
            <Button onClick={nextStep}>
              {currentStep === steps.length - 1 ? 'Complete Profile' : 'Next'}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
