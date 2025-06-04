
import React, { useState, useEffect } from 'react';
import { ProfileCard } from '@/components/ProfileCard';
import { MatchModal } from '@/components/MatchModal';
import { TopBar } from '@/components/TopBar';
import { BottomActions } from '@/components/BottomActions';
import { ProUpgradeModal } from '@/components/ProUpgradeModal';
import { SuperLikeModal } from '@/components/SuperLikeModal';
import { BoostModal } from '@/components/BoostModal';
import { VideoCallModal } from '@/components/VideoCallModal';
import { ReadReceiptModal } from '@/components/ReadReceiptModal';
import { IncognitoModeModal } from '@/components/IncognitoModeModal';
import { PremiumFeatures } from '@/components/PremiumFeatures';
import { ProfileOptimizer } from '@/components/ProfileOptimizer';
import { DatingCoachBot } from '@/components/DatingCoachBot';
import { SmartMatchRecommendations } from '@/components/SmartMatchRecommendations';
import { BannerAd } from '@/components/BannerAd';
import { SwipeCounter } from '@/components/SwipeCounter';
import { FilterModal } from '@/components/FilterModal';
import { LocationModal } from '@/components/LocationModal';
import { UserGuideModal } from '@/components/UserGuideModal';
import { ReportModal } from '@/components/ReportModal';
import { SafetyModal } from '@/components/SafetyModal';
import { Button } from '@/components/ui/button';
import { Filter, MapPin, HelpCircle, Shield, Star, Zap, Crown, Video, Brain, Lightbulb, EyeOff } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSwipeTracking } from '@/hooks/useSwipeTracking';
import { usePremiumFeatures } from '@/hooks/usePremiumFeatures';
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
  const [showSuperLike, setShowSuperLike] = useState(false);
  const [showBoost, setShowBoost] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showReadReceipts, setShowReadReceipts] = useState(false);
  const [showIncognito, setShowIncognito] = useState(false);
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);
  const [showProfileOptimizer, setShowProfileOptimizer] = useState(false);
  const [showDatingCoach, setShowDatingCoach] = useState(false);
  const [showSmartRecommendations, setShowSmartRecommendations] = useState(false);
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

  const {
    superLikesRemaining,
    boostsRemaining,
    isIncognito,
    hasVideoCall,
    hasReadReceipts,
    useSuperLike,
    useBoost,
    toggleIncognito,
    canUseFeature
  } = usePremiumFeatures();

  console.log('Dating component state:', {
    user: !!user,
    profilesLoading,
    swipeLoading,
    profilesCount: profiles?.length || 0,
    currentIndex
  });

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

  const handleSuperLike = async () => {
    const currentProfile = profiles[currentIndex];
    if (!currentProfile) return;

    const success = await useSuperLike();
    if (success) {
      const result = await createMatch(currentProfile.id, 'super_like');
      if (!result.error) {
        // Higher chance of match with super like
        if (Math.random() > 0.4) {
          setMatchedProfile(currentProfile);
          setShowMatch(true);
        }
        setCurrentIndex(prev => prev + 1);
        toast({
          title: "Super Like Sent! ⭐",
          description: "You'll appear at the top of their stack with a blue star.",
        });
      }
    } else {
      setShowProUpgrade(true);
    }
    setShowSuperLike(false);
  };

  const handleBoost = async (duration: number) => {
    const success = await useBoost(duration);
    if (success) {
      toast({
        title: "Profile Boosted! 🚀",
        description: `Your profile will be shown to more people for ${duration} minutes.`,
      });
    } else {
      setShowProUpgrade(true);
    }
    setShowBoost(false);
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
        setShowPremiumFeatures(false);
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
    console.log('Dating component showing loading screen, swipeLoading:', swipeLoading, 'profilesLoading:', profilesLoading);
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-4 border-passion-500 mx-auto"></div>
          <p className="mt-4 text-passion-700 font-medium">Loading your romantic journey...</p>
          <p className="mt-2 text-sm text-gray-500">
            Swipe loading: {swipeLoading ? 'Yes' : 'No'}, Profiles loading: {profilesLoading ? 'Yes' : 'No'}
          </p>
        </div>
      </div>
    );
  }

  console.log('Dating component rendering main interface');

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
          onUpgradeClick={() => setShowPremiumFeatures(true)}
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

      {/* Premium features toolbar */}
      <div className="flex justify-center gap-2 p-3 bg-white/60 backdrop-blur-sm border-b">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowSmartRecommendations(true)}
          className="flex items-center gap-1"
        >
          <Brain className="w-4 h-4" />
          AI Matches
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowProfileOptimizer(true)}
          className="flex items-center gap-1"
        >
          <Lightbulb className="w-4 h-4" />
          Optimize
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowDatingCoach(true)}
          className="flex items-center gap-1"
        >
          <Brain className="w-4 h-4" />
          Coach
        </Button>

        {isProUser && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowIncognito(true)}
              className={`flex items-center gap-1 ${isIncognito ? 'bg-gray-100' : ''}`}
            >
              <EyeOff className="w-4 h-4" />
              {isIncognito ? 'Incognito ON' : 'Incognito'}
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowVideoCall(true)}
              className="flex items-center gap-1"
            >
              <Video className="w-4 h-4" />
              Video
            </Button>
          </>
        )}
      </div>
      
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-280px)] px-4 py-4">
        {currentProfile ? (
          <ProfileCard 
            profile={currentProfile}
            onSwipe={handleSwipe}
            onReport={() => handleReport(currentProfile)}
            onSuperLike={() => setShowSuperLike(true)}
            onBoost={() => setShowBoost(true)}
            canSuperLike={canUseFeature('super_like')}
            canBoost={canUseFeature('boost')}
          />
        ) : (
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">No more profiles!</h2>
            <p className="text-gray-500 mb-4">Check back later for more potential matches.</p>
            <div className="space-y-2">
              <Button 
                onClick={() => setCurrentIndex(0)} 
                className="mr-2"
              >
                Reset Matches
              </Button>
              <Button 
                onClick={() => setShowBoost(true)}
                variant="outline"
                className="mr-2"
              >
                <Zap className="w-4 h-4 mr-2" />
                Boost Profile
              </Button>
              <Button 
                onClick={() => setShowPremiumFeatures(true)}
                variant="outline"
              >
                <Crown className="w-4 h-4 mr-2" />
                Go Premium
              </Button>
            </div>
          </div>
        )}
      </div>

      <BottomActions 
        onLike={() => handleSwipe('right')}
        onPass={() => handleSwipe('left')}
        onSuperLike={() => setShowSuperLike(true)}
        onBoost={() => setShowBoost(true)}
        disabled={!currentProfile || !canSwipe}
        canSuperLike={canUseFeature('super_like')}
        canBoost={canUseFeature('boost')}
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

      {showSuperLike && currentProfile && (
        <SuperLikeModal
          isOpen={showSuperLike}
          onClose={() => setShowSuperLike(false)}
          onSuperLike={handleSuperLike}
          profile={currentProfile}
          remainingSuperLikes={superLikesRemaining}
        />
      )}

      {showBoost && (
        <BoostModal
          isOpen={showBoost}
          onClose={() => setShowBoost(false)}
          onBoost={handleBoost}
          availableBoosts={boostsRemaining}
        />
      )}

      {showVideoCall && matchedProfile && (
        <VideoCallModal
          isOpen={showVideoCall}
          onClose={() => setShowVideoCall(false)}
          matchName={matchedProfile.full_name || matchedProfile.name}
          matchPhoto={matchedProfile.photos?.[0] || matchedProfile.images?.[0]}
        />
      )}

      {showReadReceipts && (
        <ReadReceiptModal
          isOpen={showReadReceipts}
          onClose={() => setShowReadReceipts(false)}
          onUpgrade={handleProUpgrade}
        />
      )}

      {showIncognito && (
        <IncognitoModeModal
          isOpen={showIncognito}
          onClose={() => setShowIncognito(false)}
          onActivate={toggleIncognito}
          isIncognito={isIncognito}
        />
      )}

      {showPremiumFeatures && (
        <PremiumFeatures
          onClose={() => setShowPremiumFeatures(false)}
          onUpgrade={handleProUpgrade}
        />
      )}

      {showProfileOptimizer && (
        <ProfileOptimizer
          onClose={() => setShowProfileOptimizer(false)}
        />
      )}

      {showDatingCoach && (
        <DatingCoachBot
          onClose={() => setShowDatingCoach(false)}
        />
      )}

      {showSmartRecommendations && (
        <SmartMatchRecommendations
          onClose={() => setShowSmartRecommendations(false)}
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
