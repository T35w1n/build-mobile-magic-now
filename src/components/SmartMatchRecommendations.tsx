
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Brain, Heart, Star, MapPin, Music, Coffee } from 'lucide-react';

interface SmartMatchRecommendationsProps {
  onClose: () => void;
}

export function SmartMatchRecommendations({ onClose }: SmartMatchRecommendationsProps) {
  const recommendations = [
    {
      name: "Emma",
      age: 28,
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=600&fit=crop",
      compatibilityScore: 92,
      reasons: [
        "Both love hiking and outdoor activities",
        "Similar music taste (Indie Rock)",
        "Both are coffee enthusiasts",
        "Live 2 km apart"
      ],
      sharedInterests: ["Hiking", "Coffee", "Photography", "Travel"],
      whyRecommended: "AI detected high compatibility based on lifestyle preferences and communication patterns."
    },
    {
      name: "Sophie",
      age: 26,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=600&fit=crop",
      compatibilityScore: 88,
      reasons: [
        "Both practice yoga and meditation",
        "Love dogs (she has a Golden Retriever)",
        "Enjoy cooking and healthy eating",
        "Similar personality type (ENFP)"
      ],
      sharedInterests: ["Yoga", "Dogs", "Cooking", "Wellness"],
      whyRecommended: "Personality match and shared wellness interests suggest strong long-term compatibility."
    },
    {
      name: "Alex",
      age: 32,
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      compatibilityScore: 85,
      reasons: [
        "Both are creative professionals",
        "Love trying new restaurants",
        "Enjoy weekend art gallery visits",
        "Similar humor style detected in bios"
      ],
      sharedInterests: ["Art", "Food", "Photography", "Museums"],
      whyRecommended: "Creative compatibility and shared cultural interests make for engaging conversations."
    }
  ];

  const getCompatibilityColor = (score: number) => {
    if (score >= 90) return "bg-green-500";
    if (score >= 80) return "bg-yellow-500";
    return "bg-blue-500";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-500" />
            Smart Match Recommendations
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">🎯 AI-Curated Matches</h3>
            <p className="text-sm text-gray-600">
              Based on your preferences, behavior patterns, and compatibility algorithms.
            </p>
          </div>
          
          {recommendations.map((match, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-4">
              <div className="flex items-start gap-4">
                <img
                  src={match.image}
                  alt={match.name}
                  className="w-20 h-20 rounded-full object-cover"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-lg">{match.name}, {match.age}</h4>
                    <div className="flex items-center gap-1">
                      <div className={`w-3 h-3 rounded-full ${getCompatibilityColor(match.compatibilityScore)}`}></div>
                      <span className="text-sm font-medium">{match.compatibilityScore}% match</span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1 mb-3">
                    {match.sharedInterests.map((interest, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="space-y-1">
                    {match.reasons.map((reason, i) => (
                      <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                        <Star className="w-3 h-3 text-yellow-500" />
                        {reason}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-blue-50 p-3 rounded-lg">
                <h5 className="font-medium text-blue-800 mb-1">Why AI recommends this match:</h5>
                <p className="text-sm text-blue-700">{match.whyRecommended}</p>
              </div>
              
              <div className="flex gap-2">
                <Button className="flex-1 bg-red-500 hover:bg-red-600">
                  <Heart className="w-4 h-4 mr-2" />
                  Super Like
                </Button>
                <Button variant="outline" className="flex-1">
                  View Full Profile
                </Button>
              </div>
            </div>
          ))}
          
          <div className="bg-purple-50 p-4 rounded-lg text-center">
            <h4 className="font-medium text-purple-800 mb-2">🤖 AI Learning</h4>
            <p className="text-sm text-purple-700">
              The more you use the app, the better our AI gets at finding your perfect matches!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
