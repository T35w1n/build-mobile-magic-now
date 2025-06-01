
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ChevronLeft, ChevronRight, Heart, Filter, MessageCircle, Star, Shield, Zap } from 'lucide-react';

interface UserGuideModalProps {
  onClose: () => void;
}

const guideSteps = [
  {
    title: "Welcome to Koppel!",
    icon: Heart,
    content: (
      <div className="text-center space-y-4">
        <div className="w-16 h-16 bg-gradient-to-br from-passion-500 to-desire-500 rounded-full flex items-center justify-center mx-auto">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <p className="text-gray-600">
          Koppel is where meaningful connections begin. Let's get you started on your journey to find your perfect match!
        </p>
        <div className="bg-passion-50 p-4 rounded-lg">
          <p className="text-sm text-passion-700 font-medium">
            💡 Tip: Complete your profile to get better matches
          </p>
        </div>
      </div>
    )
  },
  {
    title: "Create Your Account",
    icon: Shield,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Getting started is easy:</p>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-passion-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div>
              <p className="font-medium">Sign up with your email</p>
              <p className="text-sm text-gray-500">We'll keep your information secure</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-passion-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div>
              <p className="font-medium">Verify your email</p>
              <p className="text-sm text-gray-500">Check your inbox for a verification link</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-passion-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div>
              <p className="font-medium">Complete your profile</p>
              <p className="text-sm text-gray-500">Add photos and tell us about yourself</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Discover Matches",
    icon: Star,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Find your perfect match:</p>
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <p className="font-medium text-green-700">Swipe Right</p>
            <p className="text-sm text-green-600">To like someone</p>
          </div>
          <div className="text-center p-4 bg-red-50 rounded-lg">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-2">
              <X className="w-6 h-6 text-white" />
            </div>
            <p className="font-medium text-red-700">Swipe Left</p>
            <p className="text-sm text-red-600">To pass</p>
          </div>
        </div>
        <div className="bg-blue-50 p-4 rounded-lg">
          <p className="text-sm text-blue-700">
            💫 When someone you liked also likes you back, it's a match!
          </p>
        </div>
      </div>
    )
  },
  {
    title: "Use Filters",
    icon: Filter,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Customize your preferences:</p>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Filter className="w-5 h-5 text-passion-500" />
            <div>
              <p className="font-medium">Age Range</p>
              <p className="text-sm text-gray-500">Set your preferred age range</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Filter className="w-5 h-5 text-passion-500" />
            <div>
              <p className="font-medium">Distance</p>
              <p className="text-sm text-gray-500">How far you're willing to travel</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
            <Filter className="w-5 h-5 text-passion-500" />
            <div>
              <p className="font-medium">Languages & More</p>
              <p className="text-sm text-gray-500">Filter by language, interests, and values</p>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Start Conversations",
    icon: MessageCircle,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">When you match with someone:</p>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <MessageCircle className="w-6 h-6 text-passion-500 mt-1" />
            <div>
              <p className="font-medium">Send a message</p>
              <p className="text-sm text-gray-500">Break the ice with a friendly greeting</p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-passion-50 to-desire-50 p-4 rounded-lg border border-passion-200">
            <p className="text-sm text-passion-700 font-medium mb-2">Great conversation starters:</p>
            <ul className="text-sm text-passion-600 space-y-1">
              <li>• "Hi! I noticed we both love hiking 🏔️"</li>
              <li>• "Your profile made me smile! How's your day going?"</li>
              <li>• "I see you're into photography - what's your favorite subject?"</li>
            </ul>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Upgrade to Pro",
    icon: Zap,
    content: (
      <div className="space-y-4">
        <p className="text-gray-600">Get the most out of Koppel:</p>
        <div className="space-y-3">
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gold-50 to-yellow-50 rounded-lg border border-gold-200">
            <Zap className="w-5 h-5 text-gold-500" />
            <div>
              <p className="font-medium text-gold-700">Unlimited Swipes</p>
              <p className="text-sm text-gold-600">No daily limits</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gold-50 to-yellow-50 rounded-lg border border-gold-200">
            <Zap className="w-5 h-5 text-gold-500" />
            <div>
              <p className="font-medium text-gold-700">Premium Features</p>
              <p className="text-sm text-gold-600">Advanced filters and priority matching</p>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-gold-50 to-yellow-50 rounded-lg border border-gold-200">
            <Zap className="w-5 h-5 text-gold-500" />
            <div>
              <p className="font-medium text-gold-700">Ad-Free Experience</p>
              <p className="text-sm text-gold-600">Focus on what matters most</p>
            </div>
          </div>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-500">Free users get 10 swipes per day</p>
        </div>
      </div>
    )
  }
];

export function UserGuideModal({ onClose }: UserGuideModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < guideSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const currentGuideStep = guideSteps[currentStep];
  const IconComponent = currentGuideStep.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute right-2 top-2"
          >
            <X className="w-4 h-4" />
          </Button>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-passion-500 to-desire-500 rounded-full flex items-center justify-center">
              <IconComponent className="w-5 h-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-xl">{currentGuideStep.title}</CardTitle>
              <p className="text-sm text-gray-500">
                Step {currentStep + 1} of {guideSteps.length}
              </p>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="min-h-[300px]">
            {currentGuideStep.content}
          </div>

          {/* Progress Bar */}
          <div className="space-y-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-passion-500 to-desire-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${((currentStep + 1) / guideSteps.length) * 100}%` }}
              />
            </div>

            {/* Navigation */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center space-x-2"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </Button>

              {currentStep === guideSteps.length - 1 ? (
                <Button
                  onClick={onClose}
                  className="bg-gradient-to-r from-passion-500 to-desire-500 text-white"
                >
                  Get Started!
                </Button>
              ) : (
                <Button
                  onClick={nextStep}
                  className="bg-gradient-to-r from-passion-500 to-desire-500 text-white flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
