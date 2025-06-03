
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
import { UserGuideModal } from '@/components/UserGuideModal';
import { ReportModal } from '@/components/ReportModal';
import { SafetyModal } from '@/components/SafetyModal';
import { Button } from '@/components/ui/button';
import { Filter, MapPin, HelpCircle, Shield, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSwipeTracking } from '@/hooks/useSwipeTracking';
import { useAuth } from '@/hooks/useAuth';
import { useSecureMatches } from '@/hooks/useSecureMatches';
import { useDiscovery } from '@/hooks/useDiscovery';
import { useSecurity } from '@/components/SecurityProvider';
import { supabase } from '@/integrations/supabase/client';

export default function Dating() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [matchedProfile, setMatchedProfile] = useState(null);
  const [showMatch, setShowMatch] = useState(false);
  const [showProUpgrade, setShowProUpgrade] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showUserGuide, setShowUserGuide] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  const [showSafetyModal, setShowSafetyModal] = useState(false);
  const [reportingProfile, setReportingProfile] = useState(null);
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
  const { profiles, loading: profilesLoading } = useDiscovery();
  const { createMatch } = useSecureMatches();
  const { reportUser } = useSecurity();
  const { 
    canSwipe, 
    recordSwipe, 
    remainingSwipes, 
    isProUser, 
    loading: swipeLoading 
  } = useSwipeTracking();

  // Show safety modal on first visit
  useEffect(() => {
    const hasSeenSafety = localStorage.getItem('koppel-safety-shown');
    if (!hasSeenSafety && user) {
      setShowSafetyModal(true);
      localStorage.setItem('koppel-safety-shown', 'true');
    }
  }, [user]);

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

    const currentProfile = profiles[currentIndex];
    if (!currentProfile) return;

    // Use secure match creation
    const result = await createMatch(
      currentProfile.id,
      direction === 'right' ? 'like' : 'pass'
    );

    if (result.error) {
      toast({
        title: "Error",
        description: result.error,
        variant: "destructive"
      });
      return;
    }

    if (direction === 'right') {
      // Simulate match (30% chance for demo)
      if (Math.random() > 0.7) {
        setMatchedProfile(currentProfile);
        setShowMatch(true);
      }
    }

    setCurrentIndex(prev => prev + 1);
  };

  const handleReport = (profile: any) => {
    setReportingProfile(profile);
    setShowReportModal(true);
  };

  const handleReportSubmit = async (reason: string, details: string) => {
    if (!reportingProfile) return;
    
    await reportUser(reportingProfile.id, reason);
    setShowReportModal(false);
    setReportingProfile(null);
    
    toast({
      title: "Report Submitted",
      description: "Thank you for keeping our community safe.",
    });
  };

  const handleProUpgrade = async () => {
    if (user) {
      try {
        const { data, error } = await supabase
          .from('profiles')
          .update({ is_pro: true })
          .eq('id', user.id)
          .select()
          .single();
        
        if (error) throw error;
        
        toast({
          title: "Welcome to Pro!",
          description: "You now have unlimited swipes and premium features.",
        });
        
        setShowProUpgrade(false);
        window.location.reload();
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

  if (swipeLoading || profilesLoading) {
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
      
      {/* Header with location, swipe counter, and controls */}
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
            onClick={() => setShowSafetyModal(true)}
            title="Safety Guidelines"
          >
            <Shield className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilterModal(true)}
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowUserGuide(true)}
            title="Show User Guide"
          >
            <HelpCircle className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-200px)] px-4 py-4">
        {currentProfile ? (
          <ProfileCard 
            profile={currentProfile}
            onSwipe={handleSwipe}
            onReport={() => handleReport(currentProfile)}
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

      {/* Modals */}
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

      {showUserGuide && (
        <UserGuideModal
          onClose={() => setShowUserGuide(false)}
        />
      )}

      {showSafetyModal && (
        <SafetyModal
          isOpen={showSafetyModal}
          onClose={() => setShowSafetyModal(false)}
        />
      )}

      {showReportModal && reportingProfile && (
        <ReportModal
          isOpen={showReportModal}
          onClose={() => setShowReportModal(false)}
          reportedUserId={reportingProfile.id}
          reportedUserName={reportingProfile.full_name || 'User'}
        />
      )}
    </div>
  );
}
