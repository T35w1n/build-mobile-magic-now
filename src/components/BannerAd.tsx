
import React from 'react';
import { Card } from '@/components/ui/card';
import { ExternalLink } from 'lucide-react';

interface BannerAdProps {
  position?: 'top' | 'bottom';
}

export function BannerAd({ position = 'bottom' }: BannerAdProps) {
  const ads = [
    {
      title: "Find Your Style",
      description: "Shop latest fashion trends",
      cta: "Shop Now",
      color: "from-blue-500 to-purple-600"
    },
    {
      title: "Learn Something New",
      description: "Online courses at your pace", 
      cta: "Start Learning",
      color: "from-green-500 to-teal-600"
    },
    {
      title: "Stay Fit & Healthy",
      description: "Premium fitness programs",
      cta: "Get Started",
      color: "from-orange-500 to-red-600"
    }
  ];

  const randomAd = ads[Math.floor(Math.random() * ads.length)];

  return (
    <div className={`w-full px-4 ${position === 'top' ? 'pt-2' : 'pb-2'}`}>
      <Card className="w-full h-16 overflow-hidden cursor-pointer hover:shadow-md transition-shadow duration-200">
        <div className={`h-full bg-gradient-to-r ${randomAd.color} flex items-center justify-between px-4 text-white`}>
          <div className="flex-1">
            <h3 className="font-semibold text-sm">{randomAd.title}</h3>
            <p className="text-xs opacity-90">{randomAd.description}</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-medium">{randomAd.cta}</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>
      </Card>
    </div>
  );
}
