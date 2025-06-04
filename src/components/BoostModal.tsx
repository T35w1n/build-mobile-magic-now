
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Zap, Clock, Users, TrendingUp, Crown } from 'lucide-react';

interface BoostModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBoost: (duration: number) => void;
  availableBoosts: number;
}

export function BoostModal({ isOpen, onClose, onBoost, availableBoosts }: BoostModalProps) {
  const [selectedDuration, setSelectedDuration] = useState(30);

  const boostOptions = [
    { duration: 30, price: 'R19.99', popular: true },
    { duration: 60, price: 'R29.99', popular: false },
    { duration: 180, price: 'R59.99', popular: false }
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white">
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Zap className="w-16 h-16 text-purple-500 fill-current" />
              <div className="absolute inset-0 animate-pulse">
                <Zap className="w-16 h-16 text-purple-300 fill-current" />
              </div>
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-purple-600">Boost Your Profile</CardTitle>
          <p className="text-gray-600">Be one of the top profiles in your area</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h4 className="font-semibold text-purple-800 mb-2">🚀 Boost Benefits:</h4>
            <ul className="text-sm text-purple-700 space-y-1">
              <li className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4" />
                10x more profile views
              </li>
              <li className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Skip to the front of the line
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Higher match probability
              </li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="font-semibold">Choose Boost Duration:</h4>
            {boostOptions.map((option) => (
              <div
                key={option.duration}
                className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                  selectedDuration === option.duration
                    ? 'border-purple-500 bg-purple-50'
                    : 'border-gray-200 hover:border-purple-300'
                } ${option.popular ? 'relative' : ''}`}
                onClick={() => setSelectedDuration(option.duration)}
              >
                {option.popular && (
                  <div className="absolute -top-2 left-4 bg-purple-500 text-white text-xs px-2 py-1 rounded">
                    Most Popular
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{option.duration} minutes</div>
                    <div className="text-sm text-gray-600">
                      {option.duration === 30 && 'Quick boost'}
                      {option.duration === 60 && 'Standard boost'}
                      {option.duration === 180 && 'Extended boost'}
                    </div>
                  </div>
                  <div className="text-purple-600 font-bold">{option.price}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              Free boosts available: <span className="font-semibold text-purple-600">{availableBoosts}</span>
            </p>
          </div>

          <div className="space-y-3">
            <Button 
              onClick={() => onBoost(selectedDuration)}
              className="w-full bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-xl font-semibold transform hover:scale-105 transition-all duration-200"
            >
              <Zap className="w-5 h-5 mr-2 fill-current" />
              Activate Boost
            </Button>
            
            <Button 
              variant="outline" 
              onClick={onClose}
              className="w-full border-2 border-gray-300 text-gray-700 hover:bg-gray-50 py-3 rounded-xl font-medium transition-all duration-200"
            >
              Maybe Later
            </Button>
          </div>

          {availableBoosts === 0 && (
            <div className="bg-yellow-50 p-3 rounded-lg text-center">
              <Crown className="w-5 h-5 text-yellow-600 mx-auto mb-1" />
              <p className="text-sm text-yellow-700">
                Upgrade to Pro for unlimited boosts!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
