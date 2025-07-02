
import React, { useState, useEffect, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, MessageCircle, Users } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';

interface Event {
  id: string;
  title: string;
}

interface Message {
  id: string;
  message: string;
  user_id: string;
  created_at: string;
  profiles?: {
    full_name: string | null;
  } | null;
}

interface EventChatModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function EventChatModal({ event, isOpen, onClose }: EventChatModalProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadingMessages, setLoadingMessages] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      fetchMessages();
      subscribeToMessages();
    }

    return () => {
      // Cleanup subscription if needed
    };
  }, [isOpen, event.id]);

  const fetchMessages = async () => {
    try {
      // First get the messages
      const { data: messagesData, error: messagesError } = await supabase
        .from('event_chats')
        .select('id, message, user_id, created_at')
        .eq('event_id', event.id)
        .order('created_at', { ascending: true });

      if (messagesError) {
        console.error('Error fetching messages:', messagesError);
        setMessages([]);
        return;
      }

      // Then get user profiles for these messages
      const userIds = [...new Set(messagesData?.map(msg => msg.user_id) || [])];
      const { data: profilesData, error: profilesError } = await supabase
        .from('profiles')
        .select('id, full_name')
        .in('id', userIds);

      if (profilesError) {
        console.error('Error fetching profiles:', profilesError);
      }

      // Combine messages with profile data
      const messagesWithProfiles = messagesData?.map(msg => ({
        ...msg,
        profiles: profilesData?.find(profile => profile.id === msg.user_id) || null
      })) || [];

      setMessages(messagesWithProfiles);
      scrollToBottom();
    } catch (error) {
      console.error('Error fetching messages:', error);
      setMessages([]);
    } finally {
      setLoadingMessages(false);
    }
  };

  const subscribeToMessages = () => {
    const channel = supabase
      .channel('event-chat')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'event_chats',
          filter: `event_id=eq.${event.id}`
        },
        (payload) => {
          // Fetch the new message with profile data
          fetchMessages();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      if (scrollAreaRef.current) {
        const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
        if (scrollContainer) {
          scrollContainer.scrollTop = scrollContainer.scrollHeight;
        }
      }
    }, 100);
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !user) return;

    setLoading(true);
    try {
      const { error } = await supabase
        .from('event_chats')
        .insert({
          event_id: event.id,
          user_id: user.id,
          message: newMessage.trim()
        });

      if (error) {
        console.error('Error sending message:', error);
        toast({
          title: "Error",
          description: "Failed to send message. You may need to purchase a ticket first.",
          variant: "destructive",
        });
      } else {
        setNewMessage('');
        scrollToBottom();
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <MessageCircle className="w-5 h-5" />
            {event.title} - Event Chat
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 flex flex-col min-h-0">
          <ScrollArea ref={scrollAreaRef} className="flex-1 pr-4">
            {loadingMessages ? (
              <div className="flex items-center justify-center h-32">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-passion-500"></div>
              </div>
            ) : messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-32 text-gray-500">
                <Users className="w-12 h-12 mb-2" />
                <p>No messages yet. Start the conversation!</p>
              </div>
            ) : (
              <div className="space-y-4 p-2">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.user_id === user?.id ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                        message.user_id === user?.id
                          ? 'bg-passion-500 text-white'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {message.user_id !== user?.id && (
                        <p className="text-xs font-semibold mb-1">
                          {message.profiles?.full_name || 'Anonymous'}
                        </p>
                      )}
                      <p className="text-sm">{message.message}</p>
                      <p className={`text-xs mt-1 ${
                        message.user_id === user?.id ? 'text-passion-100' : 'text-gray-500'
                      }`}>
                        {format(new Date(message.created_at), 'HH:mm')}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>

          <form onSubmit={handleSendMessage} className="flex gap-2 mt-4 border-t pt-4">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
              className="flex-1"
            />
            <Button
              type="submit"
              disabled={loading || !newMessage.trim()}
              className="bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600"
            >
              <Send className="w-4 h-4" />
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
