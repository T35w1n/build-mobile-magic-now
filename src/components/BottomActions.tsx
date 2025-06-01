
import React from 'react';
import { Button } from '@/components/ui/button';
import { X, Heart, Star } from 'lucide-react';

interface BottomActionsProps {
  onLike: () => void;
  onPass: () => void;
  disabled?: boolean;
}

export function BottomActions({ onLike, onPass, disabled }: BottomActionsProps) {
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
      
      <Button
        variant="outline"
        size="icon"
        className="w-16 h-16 rounded-full border-2 border-desire-300 bg-white hover:bg-desire-50 disabled:opacity-50 shadow-lg hover:shadow-desire-200 transition-all duration-200"
        disabled={disabled}
      >
        <Star className="w-7 h-7 text-desire-500" />
      </Button>
      
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
