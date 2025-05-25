
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, Star, Camera, Edit3, Target } from 'lucide-react';

interface ProfileOptimizerProps {
  onClose: () => void;
}

export function ProfileOptimizer({ onClose }: ProfileOptimizerProps) {
  const suggestions = [
    {
      icon: <Camera className="w-5 h-5 text-blue-500" />,
      title: "Photo Quality",
      score: 7,
      suggestion: "Add 2 more high-quality photos showing your face clearly. Natural lighting works best!",
      priority: "high"
    },
    {
      icon: <Edit3 className="w-5 h-5 text-green-500" />,
      title: "Bio Content",
      score: 8,
      suggestion: "Your bio is engaging! Consider adding your favorite hobby to spark conversations.",
      priority: "medium"
    },
    {
      icon: <Target className="w-5 h-5 text-purple-500" />,
      title: "Interest Tags",
      score: 6,
      suggestion: "Add 3 more interests to increase your match potential by 40%.",
      priority: "high"
    },
    {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      title: "Profile Completeness",
      score: 9,
      suggestion: "Great job! Your profile is 90% complete. Add your music preferences to reach 100%.",
      priority: "low"
    }
  ];

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    return "text-red-600";
  };

  const getPriorityColor = (priority: string) => {
    if (priority === "high") return "bg-red-100 text-red-800";
    if (priority === "medium") return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-lg max-h-[80vh] overflow-y-auto">
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle className="flex items-center gap-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            Profile Optimizer
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg">
            <h3 className="font-semibold text-gray-800 mb-2">Overall Score: 7.5/10</h3>
            <p className="text-sm text-gray-600">
              Your profile is performing well! Follow these AI suggestions to increase your match rate.
            </p>
          </div>
          
          {suggestions.map((item, index) => (
            <div key={index} className="border rounded-lg p-4 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {item.icon}
                  <h4 className="font-medium">{item.title}</h4>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-lg font-bold ${getScoreColor(item.score)}`}>
                    {item.score}/10
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
              </div>
              
              <p className="text-sm text-gray-600">{item.suggestion}</p>
              
              <Button variant="outline" size="sm" className="w-full">
                Apply Suggestion
              </Button>
            </div>
          ))}
          
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-blue-800 mb-2">💡 Pro Tip</h4>
            <p className="text-sm text-blue-700">
              Profiles with 5+ photos and complete bios get 3x more matches. Keep optimizing!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
