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
import { LanguageSelector } from './LanguageSelector';
import { translate } from '@/utils/translations';
import { useProfile } from '@/hooks/useProfile';
import { useToast } from '@/hooks/use-toast';

interface ProfileSetupProps {
  onClose: () => void;
  onComplete: (profileData: any) => void;
}

export function ProfileSetup({ onClose, onComplete }: ProfileSetupProps) {
  const [currentStep, setCurrentStep] = useState(-1);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(false);
  const { updateProfile } = useProfile();
  const { toast } = useToast();
  
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
    { title: translate("personalityTraits", language), icon: <User className="w-5 h-5" /> },
    { title: translate("valuesBeliefs", language), icon: <Flag className="w-5 h-5" /> },
    { title: translate("lifestyle", language), icon: <Heart className="w-5 h-5" /> },
    { title: translate("workEducation", language), icon: <Briefcase className="w-5 h-5" /> },
    { title: translate("relationshipGoals", language), icon: <Heart className="w-5 h-5" /> },
    { title: translate("interestsHobbies", language), icon: <Music className="w-5 h-5" /> }
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

  const handleComplete = async () => {
    setLoading(true);
    try {
      // Transform profile data for database
      const dbProfileData = {
        personality_traits: profileData.personality,
        values_beliefs: profileData.values,
        lifestyle_habits: profileData.lifestyle,
        interests: {
          hobbies: profileData.interests,
          turn_offs: profileData.turnOffs,
          work: profileData.work,
          relationship_preferences: profileData.relationship
        },
        job_title: profileData.work?.occupation,
        education: profileData.work?.education,
        bio: profileData.relationship?.bio,
        languages: language ? [language] : ['en']
      };

      const { error } = await updateProfile(dbProfileData);
      
      if (!error) {
        toast({
          title: "Profile completed!",
          description: "Your profile has been saved successfully."
        });
        onComplete({ ...profileData, language });
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      toast({
        title: "Error",
        description: "Failed to save profile. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const renderLanguageStep = () => (
    <div className="space-y-6 text-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-800">Welcome! / Welkom!</h2>
        <p className="text-gray-600">Choose your preferred language to continue with your profile setup.</p>
        <p className="text-gray-600">Kies jou voorkeur taal om voort te gaan met jou profiel opstelling.</p>
      </div>
      
      <div className="flex justify-center">
        <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
      </div>
      
      <div className="space-y-3 pt-4">
        <Button 
          onClick={() => {
            setLanguage('en');
            setCurrentStep(0);
          }}
          className="w-full"
          variant={language === 'en' ? 'default' : 'outline'}
        >
          🇺🇸 Continue in English
        </Button>
        <Button 
          onClick={() => {
            setLanguage('af');
            setCurrentStep(0);
          }}
          className="w-full"
          variant={language === 'af' ? 'default' : 'outline'}
        >
          🇿🇦 Gaan voort in Afrikaans
        </Button>
      </div>
    </div>
  );

  const renderPersonalityStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">{translate("socialEnergy", language)}</Label>
        <RadioGroup 
          value={profileData.personality.socialEnergy || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'socialEnergy', value)}
          className="mt-2"
        >
          {[
            { key: 'introvert', label: translate("introvert", language) },
            { key: 'extrovert', label: translate("extrovert", language) },
            { key: 'ambivert', label: translate("ambivert", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("decisionMaking", language)}</Label>
        <RadioGroup 
          value={profileData.personality.decisionMaking || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'decisionMaking', value)}
          className="mt-2"
        >
          {[
            { key: 'emotional', label: translate("emotional", language) },
            { key: 'logical', label: translate("logical", language) },
            { key: 'balanced', label: translate("balanced", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("planningStyle", language)}</Label>
        <RadioGroup 
          value={profileData.personality.planningStyle || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'planningStyle', value)}
          className="mt-2"
        >
          {[
            { key: 'spontaneous', label: translate("spontaneous", language) },
            { key: 'planner', label: translate("planner", language) },
            { key: 'flexible', label: translate("flexible", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("activityLevel", language)}</Label>
        <RadioGroup 
          value={profileData.personality.activityLevel || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'activityLevel', value)}
          className="mt-2"
        >
          {[
            { key: 'adventurous', label: translate("adventurous", language) },
            { key: 'homebody', label: translate("homebody", language) },
            { key: 'balanced', label: translate("balanced", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("romanceStyle", language)}</Label>
        <RadioGroup 
          value={profileData.personality.romanceStyle || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'romanceStyle', value)}
          className="mt-2"
        >
          {[
            { key: 'romantic', label: translate("romantic", language) },
            { key: 'realist', label: translate("realist", language) },
            { key: 'balanced', label: translate("balanced", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("dailySchedule", language)}</Label>
        <RadioGroup 
          value={profileData.personality.schedule || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'schedule', value)}
          className="mt-2"
        >
          {[
            { key: 'morningPerson', label: translate("morningPerson", language) },
            { key: 'nightOwl', label: translate("nightOwl", language) },
            { key: 'flexible', label: translate("flexible", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("humorStyle", language)}</Label>
        <RadioGroup 
          value={profileData.personality.humor || ''} 
          onValueChange={(value) => handleSingleSelect('personality', 'humor', value)}
          className="mt-2"
        >
          {[
            { key: 'dry', label: translate("dry", language) },
            { key: 'sarcastic', label: translate("sarcastic", language) },
            { key: 'goofy', label: translate("goofy", language) },
            { key: 'witty', label: translate("witty", language) },
            { key: 'dark', label: translate("dark", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderValuesStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">{translate("religionSpirituality", language)}</Label>
        <Select value={profileData.values.religion || ''} onValueChange={(value) => handleSingleSelect('values', 'religion', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder={translate("selectBeliefs", language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={translate("christian", language)}>{translate("christian", language)}</SelectItem>
            <SelectItem value={translate("muslim", language)}>{translate("muslim", language)}</SelectItem>
            <SelectItem value={translate("jewish", language)}>{translate("jewish", language)}</SelectItem>
            <SelectItem value={translate("hindu", language)}>{translate("hindu", language)}</SelectItem>
            <SelectItem value={translate("buddhist", language)}>{translate("buddhist", language)}</SelectItem>
            <SelectItem value={translate("spiritual", language)}>{translate("spiritual", language)}</SelectItem>
            <SelectItem value={translate("agnostic", language)}>{translate("agnostic", language)}</SelectItem>
            <SelectItem value={translate("atheist", language)}>{translate("atheist", language)}</SelectItem>
            <SelectItem value={translate("other", language)}>{translate("other", language)}</SelectItem>
            <SelectItem value={translate("preferNotToSay", language)}>{translate("preferNotToSay", language)}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("familyValues", language)}</Label>
        <RadioGroup 
          value={profileData.values.family || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'family', value)}
          className="mt-2"
        >
          {[
            { key: 'veryImportant', label: translate("veryImportant", language) },
            { key: 'somewhatImportant', label: translate("somewhatImportant", language) },
            { key: 'notImportant', label: translate("notImportant", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("wantChildren", language)}</Label>
        <RadioGroup 
          value={profileData.values.children || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'children', value)}
          className="mt-2"
        >
          {[
            { key: 'definitely', label: translate("definitely", language) },
            { key: 'maybeSomeday', label: translate("maybeSomeday", language) },
            { key: 'notSure', label: translate("notSure", language) },
            { key: 'no', label: translate("no", language) },
            { key: 'haveKids', label: translate("haveKids", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("viewsOnMarriage", language)}</Label>
        <RadioGroup 
          value={profileData.values.marriage || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'marriage', value)}
          className="mt-2"
        >
          {[
            { key: 'wantToGetMarried', label: translate("wantToGetMarried", language) },
            { key: 'maybeSomeday', label: translate("maybeSomeday", language) },
            { key: 'notImportant', label: translate("notImportant", language) },
            { key: 'alreadyMarried', label: translate("alreadyMarried", language) },
            { key: 'divorced', label: translate("divorced", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("relationshipStyle", language)}</Label>
        <RadioGroup 
          value={profileData.values.relationshipStyle || ''} 
          onValueChange={(value) => handleSingleSelect('values', 'relationshipStyle', value)}
          className="mt-2"
        >
          {[
            { key: 'monogamous', label: translate("monogamous", language) },
            { key: 'openRelationship', label: translate("openRelationship", language) },
            { key: 'polyamorous', label: translate("polyamorous", language) },
            { key: 'stillExploring', label: translate("stillExploring", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderLifestyleStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">{translate("smoking", language)}</Label>
        <RadioGroup 
          value={profileData.lifestyle.smoking || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'smoking', value)}
          className="mt-2"
        >
          {[
            { key: 'never', label: translate("never", language) },
            { key: 'occasionally', label: translate("occasionally", language) },
            { key: 'socially', label: translate("socially", language) },
            { key: 'regularly', label: translate("regularly", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("drinking", language)}</Label>
        <RadioGroup 
          value={profileData.lifestyle.drinking || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'drinking', value)}
          className="mt-2"
        >
          {[
            { key: 'never', label: translate("never", language) },
            { key: 'occasionally', label: translate("occasionally", language) },
            { key: 'socially', label: translate("socially", language) },
            { key: 'regularly', label: translate("regularly", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("cannabisUse", language)}</Label>
        <RadioGroup 
          value={profileData.lifestyle.cannabis || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'cannabis', value)}
          className="mt-2"
        >
          {[
            { key: 'never', label: translate("never", language) },
            { key: 'occasionally', label: translate("occasionally", language) },
            { key: 'socially', label: translate("socially", language) },
            { key: 'regularly', label: translate("regularly", language) },
            { key: 'medicinally', label: translate("medicinally", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("diet", language)}</Label>
        <RadioGroup 
          value={profileData.lifestyle.diet || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'diet', value)}
          className="mt-2"
        >
          {[
            { key: 'omnivore', label: translate("omnivore", language) },
            { key: 'vegetarian', label: translate("vegetarian", language) },
            { key: 'vegan', label: translate("vegan", language) },
            { key: 'pescatarian', label: translate("pescatarian", language) },
            { key: 'keto', label: translate("keto", language) },
            { key: 'paleo', label: translate("paleo", language) },
            { key: 'other', label: translate("other", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("exerciseFrequency", language)}</Label>
        <RadioGroup 
          value={profileData.lifestyle.exercise || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'exercise', value)}
          className="mt-2"
        >
          {[
            { key: 'daily', label: translate("daily", language) },
            { key: 'fewTimesWeek', label: translate("fewTimesWeek", language) },
            { key: 'weekly', label: translate("weekly", language) },
            { key: 'occasionally', label: translate("occasionally", language) },
            { key: 'rarely', label: translate("rarely", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("pets", language)}</Label>
        <RadioGroup 
          value={profileData.lifestyle.pets || ''} 
          onValueChange={(value) => handleSingleSelect('lifestyle', 'pets', value)}
          className="mt-2"
        >
          {[
            { key: 'havePets', label: translate("havePets", language) },
            { key: 'wantPets', label: translate("wantPets", language) },
            { key: 'allergicToPets', label: translate("allergicToPets", language) },
            { key: 'notPetPerson', label: translate("notPetPerson", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderWorkStep = () => (
    <div className="space-y-6">
      <div>
        <Label htmlFor="occupation" className="text-base font-semibold">{translate("occupation", language)}</Label>
        <Input 
          id="occupation"
          placeholder={translate("whatDoYouDo", language)}
          value={profileData.work.occupation || ''}
          onChange={(e) => handleSingleSelect('work', 'occupation', e.target.value)}
          className="mt-2"
        />
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("educationLevel", language)}</Label>
        <Select value={profileData.work.education || ''} onValueChange={(value) => handleSingleSelect('work', 'education', value)}>
          <SelectTrigger className="mt-2">
            <SelectValue placeholder={translate("selectEducation", language)} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={translate("highSchool", language)}>{translate("highSchool", language)}</SelectItem>
            <SelectItem value={translate("someCollege", language)}>{translate("someCollege", language)}</SelectItem>
            <SelectItem value={translate("bachelors", language)}>{translate("bachelors", language)}</SelectItem>
            <SelectItem value={translate("masters", language)}>{translate("masters", language)}</SelectItem>
            <SelectItem value={translate("phd", language)}>{translate("phd", language)}</SelectItem>
            <SelectItem value={translate("tradeSchool", language)}>{translate("tradeSchool", language)}</SelectItem>
            <SelectItem value={translate("other", language)}>{translate("other", language)}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("workSchedule", language)}</Label>
        <RadioGroup 
          value={profileData.work.schedule || ''} 
          onValueChange={(value) => handleSingleSelect('work', 'schedule', value)}
          className="mt-2"
        >
          {[
            { key: 'nineToFive', label: translate("nineToFive", language) },
            { key: 'shiftWork', label: translate("shiftWork", language) },
            { key: 'freelancer', label: translate("freelancer", language) },
            { key: 'student', label: translate("student", language) },
            { key: 'retired', label: translate("retired", language) },
            { key: 'entrepreneur', label: translate("entrepreneur", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <Label className="text-base font-semibold">{translate("ambitionLevel", language)}</Label>
        <RadioGroup 
          value={profileData.work.ambition || ''} 
          onValueChange={(value) => handleSingleSelect('work', 'ambition', value)}
          className="mt-2"
        >
          {[
            { key: 'veryAmbitious', label: translate("veryAmbitious", language) },
            { key: 'careerFocused', label: translate("careerFocused", language) },
            { key: 'balanced', label: translate("balanced", language) },
            { key: 'chill', label: translate("chill", language) },
            { key: 'workToLive', label: translate("workToLive", language) }
          ].map(option => (
            <div key={option.key} className="flex items-center space-x-2">
              <RadioGroupItem value={option.label} id={option.key} />
              <Label htmlFor={option.key}>{option.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );

  const renderRelationshipStep = () => (
    <div className="space-y-6">
      <div>
        <Label className="text-base font-semibold">{translate("lookingFor", language)}</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            translate("seriousRelationship", language),
            translate("casualDating", language),
            translate("friendsOnly", language),
            translate("hookups", language),
            translate("marriage", language),
            translate("stillFiguringOut", language)
          ].map(option => (
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
        <Label className="text-base font-semibold">{translate("dealbreakers", language)}</Label>
        <div className="mt-2 flex flex-wrap gap-2">
          {[
            translate("smoking", language),
            translate("haveKids", language),
            translate("religionDifferences", language),
            translate("politics", language),
            translate("longDistance", language),
            translate("pets", language),
            translate("largeAgeGap", language),
            translate("openRelationships", language)
          ].map(option => (
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
        <Label htmlFor="bio" className="text-base font-semibold">{translate("aboutYou", language)}</Label>
        <Textarea 
          id="bio"
          placeholder={translate("tellPotentialMatches", language)}
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
        <Label className="text-base font-semibold">{translate("musicGenres", language)}</Label>
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
        <Label className="text-base font-semibold">{translate("activitiesHobbies", language)}</Label>
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
        <Label className="text-base font-semibold">{translate("turnOffsAndDealbreakers", language)}</Label>
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
      handleComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    } else if (currentStep === 0) {
      setCurrentStep(-1);
    }
  };

  if (currentStep === -1) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-center">{translate("selectLanguage", language)}</CardTitle>
          </CardHeader>
          <CardContent>
            {renderLanguageStep()}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              {steps[currentStep].icon}
              {steps[currentStep].title}
            </CardTitle>
            <div className="flex items-center gap-2">
              <LanguageSelector selectedLanguage={language} onLanguageChange={setLanguage} />
              <Button variant="ghost" size="sm" onClick={onClose}>
                ✕
              </Button>
            </div>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-pink-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
            />
          </div>
          <p className="text-sm text-gray-600">
            {translate("stepOf", language)} {currentStep + 1} {translate("of", language)} {steps.length}
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {stepComponents[currentStep]()}
          
          <div className="flex justify-between pt-6 border-t">
            <Button 
              variant="outline" 
              onClick={prevStep}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              {translate("previous", language)}
            </Button>
            
            <Button onClick={nextStep} disabled={loading}>
              {loading ? 'Saving...' : (currentStep === steps.length - 1 ? translate("completeProfile", language) : translate("next", language))}
              {currentStep < steps.length - 1 && <ChevronRight className="w-4 h-4 ml-1" />}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
