
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { X, Filter } from 'lucide-react';

interface FilterModalProps {
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
  currentFilters: any;
}

export function FilterModal({ onClose, onApplyFilters, currentFilters }: FilterModalProps) {
  const [filters, setFilters] = useState({
    ageRange: currentFilters.ageRange || [18, 35],
    maxDistance: currentFilters.maxDistance || 50,
    language: currentFilters.language || [],
    race: currentFilters.race || [],
    sexualPreference: currentFilters.sexualPreference || '',
    interestedIn: currentFilters.interestedIn || ''
  });

  const languages = [
    'English', 'Afrikaans', 'Zulu', 'Xhosa', 'Sotho', 'Tswana', 
    'Venda', 'Tsonga', 'Swati', 'Ndebele', 'Spanish', 'French', 'German'
  ];

  const races = [
    'African', 'White', 'Coloured', 'Indian', 'Asian', 'Mixed Race', 
    'Other', 'Prefer not to say'
  ];

  const handleMultiSelect = (category: string, value: string) => {
    const current = filters[category as keyof typeof filters] as string[] || [];
    const updated = current.includes(value) 
      ? current.filter((item: string) => item !== value)
      : [...current, value];
    
    setFilters(prev => ({
      ...prev,
      [category]: updated
    }));
  };

  const handleApply = () => {
    onApplyFilters(filters);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Filter className="w-5 h-5" />
              Match Preferences
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Age Range */}
          <div>
            <Label className="text-base font-semibold">Age Range</Label>
            <div className="mt-2">
              <Slider
                value={filters.ageRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, ageRange: value }))}
                max={65}
                min={18}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-gray-600 mt-1">
                <span>{filters.ageRange[0]} years</span>
                <span>{filters.ageRange[1]} years</span>
              </div>
            </div>
          </div>

          {/* Distance */}
          <div>
            <Label className="text-base font-semibold">Maximum Distance</Label>
            <div className="mt-2">
              <Slider
                value={[filters.maxDistance]}
                onValueChange={(value) => setFilters(prev => ({ ...prev, maxDistance: value[0] }))}
                max={200}
                min={1}
                step={1}
                className="w-full"
              />
              <div className="text-sm text-gray-600 mt-1">
                {filters.maxDistance} km away
              </div>
            </div>
          </div>

          {/* Interested In */}
          <div>
            <Label className="text-base font-semibold">Looking for</Label>
            <RadioGroup 
              value={filters.interestedIn} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, interestedIn: value }))}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="men" id="men" />
                <Label htmlFor="men">Men</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="women" id="women" />
                <Label htmlFor="women">Women</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="both" id="both" />
                <Label htmlFor="both">Both</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="non-binary" id="non-binary" />
                <Label htmlFor="non-binary">Non-binary</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Sexual Preference */}
          <div>
            <Label className="text-base font-semibold">Sexual Orientation</Label>
            <RadioGroup 
              value={filters.sexualPreference} 
              onValueChange={(value) => setFilters(prev => ({ ...prev, sexualPreference: value }))}
              className="mt-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="straight" id="straight" />
                <Label htmlFor="straight">Straight</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="gay" id="gay" />
                <Label htmlFor="gay">Gay</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="lesbian" id="lesbian" />
                <Label htmlFor="lesbian">Lesbian</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="bisexual" id="bisexual" />
                <Label htmlFor="bisexual">Bisexual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="pansexual" id="pansexual" />
                <Label htmlFor="pansexual">Pansexual</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="asexual" id="asexual" />
                <Label htmlFor="asexual">Asexual</Label>
              </div>
            </RadioGroup>
          </div>

          {/* Languages */}
          <div>
            <Label className="text-base font-semibold">Preferred Languages</Label>
            <div className="mt-2 flex flex-wrap gap-2 max-h-32 overflow-y-auto">
              {languages.map(language => (
                <Badge
                  key={language}
                  variant={filters.language.includes(language) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleMultiSelect('language', language)}
                >
                  {language}
                </Badge>
              ))}
            </div>
          </div>

          {/* Race */}
          <div>
            <Label className="text-base font-semibold">Race/Ethnicity (Optional)</Label>
            <div className="mt-2 flex flex-wrap gap-2">
              {races.map(race => (
                <Badge
                  key={race}
                  variant={filters.race.includes(race) ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleMultiSelect('race', race)}
                >
                  {race}
                </Badge>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-1">
              This helps you find people with similar backgrounds if desired
            </p>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Apply Filters
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
