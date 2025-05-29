
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { X, MapPin, Navigation } from 'lucide-react';

interface LocationModalProps {
  onClose: () => void;
  onLocationChange: (location: string) => void;
  currentLocation: string;
}

export function LocationModal({ onClose, onLocationChange, currentLocation }: LocationModalProps) {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(currentLocation);

  const popularCities = [
    'Cape Town', 'Johannesburg', 'Durban', 'Pretoria', 'Port Elizabeth',
    'Bloemfontein', 'East London', 'Polokwane', 'Nelspruit', 'Kimberley',
    'London', 'New York', 'Paris', 'Berlin', 'Amsterdam', 'Sydney'
  ];

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
  };

  const handleCurrentLocation = () => {
    // In a real app, this would use geolocation API
    setSelectedLocation('Current Location');
  };

  const handleApply = () => {
    if (searchLocation.trim()) {
      onLocationChange(searchLocation.trim());
    } else {
      onLocationChange(selectedLocation);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Change Location
            </CardTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
          <p className="text-sm text-gray-600">
            Find matches in different cities when traveling
          </p>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Current Location */}
          <div>
            <Button
              variant="outline"
              onClick={handleCurrentLocation}
              className="w-full flex items-center gap-2"
            >
              <Navigation className="w-4 h-4" />
              Use Current Location
            </Button>
          </div>

          {/* Search Location */}
          <div>
            <Label htmlFor="location-search" className="text-base font-semibold">
              Search for a city
            </Label>
            <Input
              id="location-search"
              placeholder="Enter city name..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Popular Cities */}
          <div>
            <Label className="text-base font-semibold">Popular Cities</Label>
            <div className="mt-2 flex flex-wrap gap-2 max-h-48 overflow-y-auto">
              {popularCities.map(city => (
                <Badge
                  key={city}
                  variant={selectedLocation === city ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={() => handleLocationSelect(city)}
                >
                  {city}
                </Badge>
              ))}
            </div>
          </div>

          {/* Selected Location Display */}
          {selectedLocation && (
            <div className="p-3 bg-gray-50 rounded-lg">
              <Label className="text-sm font-medium text-gray-700">Selected Location:</Label>
              <p className="text-sm text-gray-900">{selectedLocation}</p>
            </div>
          )}

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button onClick={handleApply} className="flex-1">
              Change Location
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
