
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Heart, Star, Zap } from 'lucide-react';

interface BottomActionsProps {
  onLike: () => void;
  onPass: () => void;
  onSuperLike?: () => void;
  onBoost?: () => void;
  disabled?: boolean;
  canSuperLike?: boolean;
  canBoost?: boolean;
}

export function BottomActions({ 
  onLike, 
  onPass, 
  onSuperLike, 
  onBoost, 
  disabled, 
  canSuperLike = false, 
  canBoost = false 
}: BottomActionsProps) {
  return (
    <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
      <Button
        variant="outline"
        size="icon"
        className="w-14 h-14 rounded-full border-2 border-passion-300 bg-white hover:bg-passion-50 disabled:opacity-50 shadow-lg hover:shadow-passion-200 transition-all duration-200"
        onClick={onPass}
        disabled={disabled}
      >
        <X className="w-6 h-6 text-passion-600" />
      </Button>
      
      {onSuperLike && canSuperLike && (
        <Button
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-blue-300 bg-white hover:bg-blue-50 disabled:opacity-50 shadow-lg hover:shadow-blue-200 transition-all duration-200"
          onClick={onSuperLike}
          disabled={disabled}
        >
          <Star className="w-7 h-7 text-blue-500" />
        </Button>
      )}
      
      {onBoost && canBoost && (
        <Button
          variant="outline"
          size="icon"
          className="w-16 h-16 rounded-full border-2 border-purple-300 bg-white hover:bg-purple-50 disabled:opacity-50 shadow-lg hover:shadow-purple-200 transition-all duration-200"
          onClick={onBoost}
          disabled={disabled}
        >
          <Zap className="w-7 h-7 text-purple-500" />
        </Button>
      )}
      
      <Button
        variant="outline"
        size="icon"
        className="w-14 h-14 rounded-full border-2 border-passion-400 bg-white hover:bg-passion-50 disabled:opacity-50 shadow-lg hover:shadow-passion-300 transition-all duration-200 animate-pulse-glow"
        onClick={onLike}
        disabled={disabled}
      >
        <Heart className="w-6 h-6 text-passion-500 hover:text-passion-600" />
      </Button>
    </div>
  );
}
