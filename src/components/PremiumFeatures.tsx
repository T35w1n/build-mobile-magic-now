
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Crown, Star, Zap, Eye, CheckCheck, EyeOff, Heart, MessageCircle, Video, Brain } from 'lucide-react';

interface PremiumFeaturesProps {
  onClose: () => void;
  onUpgrade: () => void;
}

export function PremiumFeatures({ onClose, onUpgrade }: PremiumFeaturesProps) {
  const [selectedPlan, setSelectedPlan] = useState('premium');

  const plans = [
    {
      id: 'basic',
      name: 'Basic',
      price: 'R4.99',
      period: '/month',
      popular: false,
      features: [
        'Unlimited swipes',
        '3 Super Likes per day',
        'See who liked you',
        'Ad-free experience'
      ]
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 'R9.99',
      period: '/month',
      popular: true,
      features: [
        'Everything in Basic',
        'Unlimited Super Likes',
        'Read receipts',
        'Profile boost (1 per month)',
        'Incognito mode',
        'Video calls',
        'AI match recommendations'
      ]
    },
    {
      id: 'platinum',
      name: 'Platinum',
      price: 'R19.99',
      period: '/month',
      popular: false,
      features: [
        'Everything in Premium',
        'Unlimited boosts',
        'Priority customer support',
        'Advanced filters',
        'Profile optimizer',
        'Dating coach AI',
        'Message before matching'
      ]
    }
  ];

  const featureIcons = {
    'Unlimited swipes': <Heart className="w-4 h-4" />,
    'Super Likes': <Star className="w-4 h-4" />,
    'See who liked you': <Eye className="w-4 h-4" />,
    'Read receipts': <CheckCheck className="w-4 h-4" />,
    'Profile boost': <Zap className="w-4 h-4" />,
    'Incognito mode': <EyeOff className="w-4 h-4" />,
    'Video calls': <Video className="w-4 h-4" />,
    'AI match recommendations': <Brain className="w-4 h-4" />,
    'Dating coach AI': <MessageCircle className="w-4 h-4" />
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white">
        <CardHeader className="text-center pb-6">
          <div className="flex justify-center mb-4">
            <Crown className="w-16 h-16 text-yellow-500" />
          </div>
          <CardTitle className="text-3xl font-bold text-gradient mb-2">Upgrade to Premium</CardTitle>
          <p className="text-gray-600">Unlock premium features and find love faster</p>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-4 right-4"
          >
            ✕
          </Button>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Plan Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all ${
                  selectedPlan === plan.id
                    ? 'border-passion-500 bg-passion-50 shadow-lg'
                    : 'border-gray-200 hover:border-passion-300'
                } ${plan.popular ? 'ring-2 ring-passion-200' : ''}`}
                onClick={() => setSelectedPlan(plan.id)}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-passion-500 text-white text-sm px-4 py-1 rounded-full">
                    Most Popular
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-gray-800">{plan.name}</h3>
                  <div className="flex items-baseline justify-center mt-2">
                    <span className="text-3xl font-bold text-passion-600">{plan.price}</span>
                    <span className="text-gray-500">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-2">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-sm">
                      <div className="w-5 h-5 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Feature Highlights */}
          <div className="bg-gradient-to-r from-passion-50 to-purple-50 p-6 rounded-xl">
            <h3 className="text-xl font-bold text-center mb-6">Why Users Love Premium</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="w-12 h-12 bg-passion-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Star className="w-6 h-6 text-passion-600" />
                </div>
                <h4 className="font-semibold text-gray-800">3x More Matches</h4>
                <p className="text-sm text-gray-600">Premium users get significantly more matches</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Eye className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-800">See Who Likes You</h4>
                <p className="text-sm text-gray-600">Skip the guessing game</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Zap className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-800">Profile Boosts</h4>
                <p className="text-sm text-gray-600">Get 10x more profile views</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Brain className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-800">AI Matching</h4>
                <p className="text-sm text-gray-600">Smart recommendations just for you</p>
              </div>
            </div>
          </div>

          {/* Success Stories */}
          <div className="bg-white border rounded-xl p-6">
            <h3 className="text-xl font-bold text-center mb-4">Success Stories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-green-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Sarah & Mike</p>
                    <p className="text-sm text-gray-600">Matched in Cape Town</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">"We met through Koppel Premium and got engaged after 8 months! The AI recommendations were spot-on."</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-blue-200 rounded-full"></div>
                  <div>
                    <p className="font-semibold">Alex & Jamie</p>
                    <p className="text-sm text-gray-600">Matched in Johannesburg</p>
                  </div>
                </div>
                <p className="text-sm text-gray-700">"The video call feature let us connect before meeting. We're planning our wedding next year!"</p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="space-y-4">
            <Button 
              onClick={onUpgrade}
              className="w-full gradient-desire hover:shadow-lg hover:shadow-passion-300/50 text-white font-semibold py-4 rounded-xl transform hover:scale-105 transition-all duration-200 text-lg"
            >
              <Crown className="w-6 h-6 mr-2" />
              Upgrade to {plans.find(p => p.id === selectedPlan)?.name} - {plans.find(p => p.id === selectedPlan)?.price}/month
            </Button>
            
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-600">
                🔒 Secure payment • Cancel anytime • 7-day money-back guarantee
              </p>
              <Button 
                variant="ghost" 
                onClick={onClose}
                className="text-gray-500 hover:text-gray-700"
              >
                Maybe later
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
