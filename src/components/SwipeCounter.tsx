
import React from 'react';
import { Heart, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface SwipeCounterProps {
  remainingSwipes: number;
  isProUser: boolean;
  onUpgradeClick: () => void;
}

export function SwipeCounter({ remainingSwipes, isProUser, onUpgradeClick }: SwipeCounterProps) {
  if (isProUser) {
    return (
      <div className="flex items-center space-x-2 bg-yellow-50 px-3 py-2 rounded-full border border-yellow-200">
        <Crown className="w-4 h-4 text-yellow-600" />
        <span className="text-sm font-medium text-yellow-700">Pro User</span>
      </div>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="flex items-center space-x-2 bg-passion-50 px-3 py-2 rounded-full border border-passion-200">
        <Heart className="w-4 h-4 text-passion-600" />
        <span className="text-sm font-medium text-passion-700">
          {remainingSwipes} swipes left
        </span>
      </div>
      {remainingSwipes <= 3 && (
        <Button
          size="sm"
          variant="outline"
          onClick={onUpgradeClick}
          className="text-xs px-2 py-1 h-8"
        >
          <Crown className="w-3 h-3 mr-1" />
          Pro
        </Button>
      )}
    </div>
  );
}
