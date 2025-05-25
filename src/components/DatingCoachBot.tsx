
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bot, Send, Lightbulb, Heart, MessageCircle } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

interface DatingCoachBotProps {
  onClose: () => void;
}

export function DatingCoachBot({ onClose }: DatingCoachBotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your AI dating coach. I can help you with profile tips, conversation starters, and dating advice. What would you like help with?",
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const coachingTips = [
    "Ask about their hobbies and interests",
    "Share something interesting about your day",
    "Compliment something specific from their profile",
    "Ask about their favorite travel destination",
    "Share a fun fact about yourself"
  ];

  const profileTips = [
    "Add more photos showing your personality",
    "Write about your passions and interests",
    "Be specific about what you're looking for",
    "Show your sense of humor in your bio",
    "Include photos of you doing activities you love"
  ];

  const getAIResponse = (userMessage: string) => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('profile') || message.includes('bio')) {
      return `Here are some profile optimization tips: ${profileTips[Math.floor(Math.random() * profileTips.length)]}. Remember to be authentic and show your personality!`;
    } else if (message.includes('message') || message.includes('conversation')) {
      return `Try this conversation starter: "${coachingTips[Math.floor(Math.random() * coachingTips.length)]}" - this usually leads to engaging conversations!`;
    } else if (message.includes('match') || message.includes('swipe')) {
      return "Focus on profiles where you share common interests or values. Look for genuine smiles and people engaged in activities you enjoy too!";
    } else {
      return "I'm here to help with dating advice! Ask me about improving your profile, starting conversations, or finding better matches.";
    }
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse: Message = {
      id: messages.length + 2,
      text: getAIResponse(inputText),
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botResponse]);
    setInputText('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md h-[600px] flex flex-col">
        <CardHeader className="flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-500" />
            Dating Coach AI
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-4">
          <div className="flex-1 overflow-y-auto space-y-3 mb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isBot
                      ? 'bg-blue-100 text-blue-900'
                      : 'bg-red-500 text-white'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-2">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask for dating advice..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} size="icon">
              <Send className="w-4 h-4" />
            </Button>
          </div>
          
          <div className="mt-3 grid grid-cols-2 gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setInputText("How can I improve my profile?")}
            >
              <Lightbulb className="w-3 h-3 mr-1" />
              Profile Tips
            </Button>
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setInputText("What should I message them?")}
            >
              <MessageCircle className="w-3 h-3 mr-1" />
              Message Help
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
