
import React, { useState, useRef } from 'react';
import { Card } from '@/components/ui/card';
import { MapPin, Heart, X, AlertTriangle, Star, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Profile {
  id: string;
  full_name?: string;
  age?: number;
  bio?: string;
  photos?: string[];
  location?: string;
  verified?: boolean;
}

interface ProfileCardProps {
  profile: Profile;
  onSwipe: (direction: 'left' | 'right') => void;
  onReport?: () => void;
  onSuperLike?: () => void;
  onBoost?: () => void;
  canSuperLike?: boolean;
  canBoost?: boolean;
}

export function ProfileCard({ 
  profile, 
  onSwipe, 
  onReport, 
  onSuperLike, 
  onBoost, 
  canSuperLike = false, 
  canBoost = false 
}: ProfileCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  // Default images if no photos available
  const images = profile.photos && profile.photos.length > 0 
    ? profile.photos 
    : ['/placeholder.svg'];

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.x;
    const deltaY = e.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      onSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setStartPos({ x: touch.clientX, y: touch.clientY });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.x;
    const deltaY = touch.clientY - startPos.y;
    setDragOffset({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    const threshold = 100;
    if (Math.abs(dragOffset.x) > threshold) {
      onSwipe(dragOffset.x > 0 ? 'right' : 'left');
    }
    
    setDragOffset({ x: 0, y: 0 });
  };

  const rotation = dragOffset.x * 0.1;
  const opacity = 1 - Math.abs(dragOffset.x) * 0.002;

  return (
    <div className="relative w-full max-w-sm mx-auto">
      <Card
        ref={cardRef}
        className="relative w-full h-[600px] overflow-hidden cursor-grab active:cursor-grabbing shadow-2xl"
        style={{
          transform: `translate(${dragOffset.x}px, ${dragOffset.y}px) rotate(${rotation}deg)`,
          opacity: opacity,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out, opacity 0.3s ease-out'
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {/* Image */}
        <div className="relative h-2/3 overflow-hidden">
          <img
            src={images[currentImageIndex]}
            alt={profile.full_name || 'Profile'}
            className="w-full h-full object-cover"
          />
          
          {/* Image indicators */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 right-4 flex space-x-1">
              {images.map((_, index) => (
                <div
                  key={index}
                  className={`flex-1 h-1 rounded-full ${
                    index === currentImageIndex ? 'bg-white' : 'bg-white/30'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            {onReport && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onReport();
                }}
                className="bg-white/80 hover:bg-white"
              >
                <AlertTriangle className="w-4 h-4" />
              </Button>
            )}
            
            {onBoost && canBoost && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onBoost();
                }}
                className="bg-white/80 hover:bg-white"
              >
                <Zap className="w-4 h-4 text-purple-500" />
              </Button>
            )}
            
            {onSuperLike && canSuperLike && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  onSuperLike();
                }}
                className="bg-white/80 hover:bg-white"
              >
                <Star className="w-4 h-4 text-blue-500" />
              </Button>
            )}
          </div>

          {/* Swipe indicators */}
          {dragOffset.x > 50 && (
            <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center">
              <div className="bg-green-500 text-white p-4 rounded-full">
                <Heart className="w-8 h-8" />
              </div>
            </div>
          )}
          
          {dragOffset.x < -50 && (
            <div className="absolute inset-0 bg-red-500/20 flex items-center justify-center">
              <div className="bg-red-500 text-white p-4 rounded-full">
                <X className="w-8 h-8" />
              </div>
            </div>
          )}
        </div>

        {/* Profile info */}
        <div className="p-6 h-1/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-2xl font-bold text-gray-900">
                {profile.full_name || 'Unknown'}{profile.age ? `, ${profile.age}` : ''}
              </h2>
              {profile.location && (
                <div className="flex items-center text-gray-500 text-sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  {profile.location}
                </div>
              )}
            </div>
            <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
              {profile.bio || 'No bio available'}
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
