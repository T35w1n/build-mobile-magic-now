
import React, { useState } from 'react';
import { ProfileCard } from '@/components/ProfileCard';
import { MatchModal } from '@/components/MatchModal';
import { TopBar } from '@/components/TopBar';
import { BottomActions } from '@/components/BottomActions';

// Mock profile data
const mockProfiles = [
  {
    id: 1,
    name: "Emma",
    age: 28,
    bio: "Love hiking, coffee, and good conversations. Adventure seeker looking for someone to explore the world with! 🌍",
    images: ["https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop"],
    distance: 2
  },
  {
    id: 2,
    name: "Alex",
    age: 32,
    bio: "Photographer by day, chef by night. Looking for someone who appreciates good food and great stories. 📸🍝",
    images: ["https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop"],
    distance: 5
  },
  {
    id: 3,
    name: "Sophie",
    age: 26,
    bio: "Yoga instructor and dog lover. Seeking genuine connections and someone who loves the outdoors as much as I do! 🧘‍♀️🐕",
    images: ["https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop"],
    distance: 3
  },
  {
    id: 4,
    name: "Marcus",
    age: 29,
    bio: "Software engineer with a passion for music and travel. Let's grab coffee and see where the conversation takes us! ☕✈️",
    images: ["https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=600&fit=crop"],
    distance: 7
  }
];

export default function Dating() {
  const [profiles, setProfiles] = useState(mockProfiles);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [showMatch, setShowMatch] = useState(false);

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

  const currentProfile = profiles[currentIndex];

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50">
      <TopBar />
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-140px)] px-4 py-8">
        {currentProfile ? (
          <ProfileCard 
            profile={currentProfile}
            onSwipe={handleSwipe}
          />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No more profiles!</h2>
            <p className="text-gray-500">Check back later for more potential matches.</p>
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
    </div>
  );
}
