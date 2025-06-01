
import React, { useEffect, useState } from 'react';
import { Heart } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

export function SplashScreen({ onComplete }: SplashScreenProps) {
  const [showLogo, setShowLogo] = useState(false);
  const [showText, setShowText] = useState(false);
  const [showTagline, setShowTagline] = useState(false);

  useEffect(() => {
    const logoTimer = setTimeout(() => setShowLogo(true), 300);
    const textTimer = setTimeout(() => setShowText(true), 800);
    const taglineTimer = setTimeout(() => setShowTagline(true), 1300);
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(textTimer);
      clearTimeout(taglineTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-passion-500 via-desire-500 to-warmth-500 flex items-center justify-center z-50">
      <div className="text-center">
        {/* Animated Heart Icon */}
        <div className={`transform transition-all duration-1000 ${
          showLogo ? 'scale-100 opacity-100' : 'scale-50 opacity-0'
        }`}>
          <Heart className="w-24 h-24 text-white mx-auto mb-6 animate-pulse" />
        </div>

        {/* App Name */}
        <div className={`transform transition-all duration-1000 delay-500 ${
          showText ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}>
          <h1 className="text-6xl font-bold font-dancing text-white mb-2 animate-fade-in">
            Koppel
          </h1>
        </div>

        {/* Tagline */}
        <div className={`transform transition-all duration-1000 delay-1000 ${
          showTagline ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}>
          <p className="text-xl text-white/90 font-medium animate-fade-in">
            Where Hearts Connect
          </p>
        </div>

        {/* Loading Animation */}
        <div className="mt-8">
          <div className="flex justify-center space-x-1">
            <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
}
