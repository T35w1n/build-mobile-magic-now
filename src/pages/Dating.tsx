
import React, { useState } from 'react';
import { ProfileCard } from '@/components/ProfileCard';
import { MatchModal } from '@/components/MatchModal';
import { TopBar } from '@/components/TopBar';
import { BottomActions } from '@/components/BottomActions';
import { DatingCoachBot } from '@/components/DatingCoachBot';
import { ProfileOptimizer } from '@/components/ProfileOptimizer';
import { SmartMatchRecommendations } from '@/components/SmartMatchRecommendations';
import { ProfileSetup } from '@/components/ProfileSetup';
import { FilterModal } from '@/components/FilterModal';
import { LocationModal } from '@/components/LocationModal';
import { Button } from '@/components/ui/button';
import { Bot, Lightbulb, Brain, Settings, Filter, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Mock profile data
const mockProfiles = [
  {
    id: 1,
    name: "Emma",
    age: 28,
    bio: "Love hiking, coffee, and good conversations. Adventure seeker looking for someone to explore the world with! 🌍",
    images: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop"],
    distance: 2,
    languages: ["English", "Afrikaans"],
    race: "White",
    sexualPreference: "straight"
  },
  {
    id: 2,
    name: "Alex",
    age: 32,
    bio: "Photographer by day, chef by night. Looking for someone who appreciates good food and great stories. 📸🍝",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"],
    distance: 5,
    languages: ["English"],
    race: "Mixed Race",
    sexualPreference: "bisexual"
  },
  {
    id: 3,
    name: "Sophie",
    age: 26,
    bio: "Yoga instructor and dog lover. Seeking genuine connections and someone who loves the outdoors as much as I do! 🧘‍♀️🐕",
    images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"],
    distance: 3,
    languages: ["English", "French"],
    race: "African",
    sexualPreference: "straight"
  },
  {
    id: 4,
    name: "Marcus",
    age: 29,
    bio: "Software engineer with a passion for music and travel. Let's grab coffee and see where the conversation takes us! ☕✈️",
    images: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop"],
    distance: 7,
    languages: ["English", "Zulu"],
    race: "African",
    sexualPreference: "straight"
  }
];

export default function Dating() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [showCoachBot, setShowCoachBot] = useState(false);
  const [showProfileOptimizer, setShowProfileOptimizer] = useState(false);
  const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);
  const [showProfileSetup, setShowProfileSetup] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [userProfile, setUserProfile] = useState(null);
  const [currentLocation, setCurrentLocation] = useState('Cape Town');
  const [filters, setFilters] = useState({
    ageRange: [18, 35],
    maxDistance: 50,
    language: [],
    race: [],
    sexualPreference: '',
    interestedIn: ''
  });
  const { toast } = useToast();

  const handleSwipe = (direction: 'left' | 'right') => {
    if (currentIndex >= profiles.length) return;

    if (direction === 'right') {
      // Simulate match (50% chance for demo)
      if (Math.random() > 0.5) {
        setMatchedProfile(profiles[currentIndex]);
        setShowMatch(true);
      }
    }

    setCurrentIndex(prev => prev + 1);
  };

  const closeMatchModal = () => {
    setShowMatch(false);
    setMatchedProfile(null);
  };

  const handleProfileComplete = (profileData: any) => {
    console.log('Profile completed:', profileData);
    setUserProfile(profileData);
    setShowProfileSetup(false);
    toast({
      title: "Profile Created!",
      description: "Your profile has been set up successfully.",
    });
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentIndex(0); // Reset to first profile
    toast({
      title: "Filters Applied",
      description: "Your match preferences have been updated.",
    });
  };

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
    setCurrentIndex(0); // Reset to first profile
    toast({
      title: "Location Changed",
      description: `Now showing matches in ${newLocation}`,
    });
  };

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <TopBar />
      
      {/* Location and Filter Bar */}
      <div className="flex justify-between items-center px-4 py-2 bg-white/80 backdrop-blur-sm border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLocationModal(true)}
          className="flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          {currentLocation}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowFilterModal(true)}
          className="flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filters
        </Button>
      </div>
      
      {/* AI Features Panel */}
      <div className="fixed top-32 right-4 z-40 space-y-2">
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => setShowProfileSetup(true)}
        >
          <Settings className="w-4 h-4 mr-1" />
          Setup Profile
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => setShowCoachBot(true)}
        >
          <Bot className="w-4 h-4 mr-1" />
          AI Coach
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => setShowProfileOptimizer(true)}
        >
          <Lightbulb className="w-4 h-4 mr-1" />
          Optimize
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="bg-white/90 backdrop-blur-sm"
          onClick={() => setShowSmartRecommendations(true)}
        >
          <Brain className="w-4 h-4 mr-1" />
          Smart Matches
        </Button>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-180px)] px-4 py-8">
        {currentProfile ? (
          <ProfileCard 
            profile={currentProfile}
            onSwipe={handleSwipe}
          />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No more profiles!</h2>
            <p className="text-gray-500">Check back later for more potential matches.</p>
            <Button 
              onClick={() => setCurrentIndex(0)} 
              className="mt-4"
            >
              Reset Matches
            </Button>
          </div>
        )}
      </div>

      <BottomActions 
        onLike={() => handleSwipe('right')}
        onPass={() => handleSwipe('left')}
        disabled={!currentProfile}
      />

      {showMatch && matchedProfile && (
        <MatchModal 
          profile={matchedProfile}
          onClose={closeMatchModal}
        />
      )}

      {showCoachBot && (
        <DatingCoachBot onClose={() => setShowCoachBot(false)} />
      )}

      {showProfileOptimizer && (
        <ProfileOptimizer onClose={() => setShowProfileOptimizer(false)} />
      )}

      {showSmartRecommendations && (
        <SmartMatchRecommendations onClose={() => setShowSmartRecommendations(false)} />
      )}

      {showProfileSetup && (
        <ProfileSetup 
          onClose={() => setShowProfileSetup(false)}
          onComplete={handleProfileComplete}
        />
      )}

      {showFilterModal && (
        <FilterModal
          onClose={() => setShowFilterModal(false)}
          onApplyFilters={handleApplyFilters}
          currentFilters={filters}
        />
      )}

      {showLocationModal && (
        <LocationModal
          onClose={() => setShowLocationModal(false)}
          onLocationChange={handleLocationChange}
          currentLocation={currentLocation}
        />
      )}
    </div>
  );
}
