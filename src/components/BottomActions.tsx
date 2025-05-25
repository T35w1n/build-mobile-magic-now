
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
        className="w-14 h-14 rounded-full border-2 border-gray-300 bg-white hover:bg-gray-50 disabled:opacity-50"
        onClick={onPass}
        disabled={disabled}
      >
        <X className="w-6 h-6 text-gray-600" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="w-16 h-16 rounded-full border-2 border-blue-300 bg-white hover:bg-blue-50 disabled:opacity-50"
        disabled={disabled}
      >
        <Star className="w-7 h-7 text-blue-500" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="w-14 h-14 rounded-full border-2 border-red-300 bg-white hover:bg-red-50 disabled:opacity-50"
        onClick={onLike}
        disabled={disabled}
      >
        <Heart className="w-6 h-6 text-red-500" />
      </Button>
    </div>
  );
}
