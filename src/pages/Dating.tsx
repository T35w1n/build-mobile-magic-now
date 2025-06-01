
import React, { useState, useEffect } from 'react';
import { ProfileCard } from '@/components/ProfileCard';
import { MatchModal } from '@/components/MatchModal';
import { TopBar } from '@/components/TopBar';
import { BottomActions } from '@/components/BottomActions';
import { ProUpgradeModal } from '@/components/ProUpgradeModal';
import { BannerAd } from '@/components/BannerAd';
import { SwipeCounter } from '@/components/SwipeCounter';
import { FilterModal } from '@/components/FilterModal';
import { LocationModal } from '@/components/LocationModal';
import { Button } from '@/components/ui/button';
import { Filter, MapPin, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSwipeTracking } from '@/hooks/useSwipeTracking';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

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
  const [showProUpgrade, setShowProUpgrade] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
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
  const { user } = useAuth();
  const { 
    canSwipe, 
    recordSwipe, 
    remainingSwipes, 
    isProUser, 
    loading: swipeLoading 
  } = useSwipeTracking();

  const handleSwipe = async (direction: 'left' | 'right') => {
    if (currentIndex >= profiles.length) return;

    if (!canSwipe) {
      setShowProUpgrade(true);
      return;
    }

    const swipeRecorded = await recordSwipe();
    if (!swipeRecorded) {
      setShowProUpgrade(true);
      return;
    }

    // Record the swipe in the database
    if (user) {
      await supabase.from('matches').insert({
        user_id: user.id,
        target_user_id: profiles[currentIndex].id,
        action: direction === 'right' ? 'like' : 'pass'
      });
    }

    if (direction === 'right') {
      // Simulate match (30% chance for demo)
      if (Math.random() > 0.7) {
        setMatchedProfile(profiles[currentIndex]);
        setShowMatch(true);
      }
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleProUpgrade = async () => {
    // In a real app, this would integrate with payment processing
    if (user) {
      try {
        await supabase
          .from('profiles')
          .update({ is_pro: true })
          .eq('id', user.id);
        
        toast({
          title: "Welcome to Pro!",
          description: "You now have unlimited swipes and premium features.",
        });
        
        setShowProUpgrade(false);
        window.location.reload(); // Refresh to update Pro status
      } catch (error) {
        toast({
          title: "Upgrade Failed",
          description: "Please try again later.",
          variant: "destructive"
        });
      }
    }
  };

  const closeMatchModal = () => {
    setShowMatch(false);
    setMatchedProfile(null);
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    setCurrentIndex(0);
    toast({
      title: "Filters Applied",
      description: "Your match preferences have been updated.",
    });
  };

  const handleLocationChange = (newLocation: string) => {
    setCurrentLocation(newLocation);
    setCurrentIndex(0);
    toast({
      title: "Location Changed",
      description: `Now showing matches in ${newLocation}`,
    });
  };

  const currentProfile = profiles[currentIndex];

  if (swipeLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-passion-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <TopBar />
      
      {/* Show banner ad for free users */}
      {!isProUser && <BannerAd position="top" />}
      
      {/* Simplified header with location, swipe counter, and minimal controls */}
      <div className="flex justify-between items-center px-4 py-3 bg-white/80 backdrop-blur-sm border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowLocationModal(true)}
          className="flex items-center gap-2"
        >
          <MapPin className="w-4 h-4" />
          {currentLocation}
        </Button>
        
        <SwipeCounter 
          remainingSwipes={remainingSwipes}
          isProUser={isProUser}
          onUpgradeClick={() => setShowProUpgrade(true)}
        />
        
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-4">
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
        disabled={!currentProfile || !canSwipe}
      />

      {/* Show banner ad for free users */}
      {!isProUser && <BannerAd position="bottom" />}

      {showMatch && matchedProfile && (
        <MatchModal 
          profile={matchedProfile}
          onClose={closeMatchModal}
        />
      )}

      {showProUpgrade && (
        <ProUpgradeModal
          onClose={() => setShowProUpgrade(false)}
          onUpgrade={handleProUpgrade}
          remainingSwipes={remainingSwipes}
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
