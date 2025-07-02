
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { EventCard } from '@/components/EventCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, Star, Users } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

interface Event {
  id: string;
  title: string;
  description: string;
  banner_image: string;
  location: string;
  event_date: string;
  ticket_price: number;
  guest_limit: number;
  tickets_sold: number;
  status: string;
  promoter_id: string;
}

interface EventsListProps {
  userRole: string | null;
}

export function EventsList({ userRole }: EventsListProps) {
  const [events, setEvents] = useState<Event[]>([]);
  const [myEvents, setMyEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    fetchEvents();
    if (userRole === 'promoter') {
      fetchMyEvents();
    }
  }, [userRole]);

  const fetchEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .in('status', ['published', 'featured'])
        .gte('event_date', new Date().toISOString())
        .order('event_date', { ascending: true });

      if (error) {
        console.error('Error fetching events:', error);
      } else {
        setEvents(data || []);
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMyEvents = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('events')
        .select('*')
        .eq('promoter_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching my events:', error);
      } else {
        setMyEvents(data || []);
      }
    } catch (error) {
      console.error('Error fetching my events:', error);
    }
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="bg-white rounded-2xl shadow-lg p-6 animate-pulse">
            <div className="h-48 bg-gray-200 rounded-xl mb-4"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    );
  }

  const featuredEvents = events.filter(event => event.status === 'featured');
  const regularEvents = events.filter(event => event.status === 'published');

  return (
    <div className="space-y-8">
      {userRole === 'promoter' ? (
        <Tabs defaultValue="all-events" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="all-events" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              All Events
            </TabsTrigger>
            <TabsTrigger value="my-events" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              My Events
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="all-events" className="space-y-8">
            {featuredEvents.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-6">
                  <Star className="w-6 h-6 text-yellow-500" />
                  <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {featuredEvents.map((event) => (
                    <EventCard key={event.id} event={event} userRole={userRole} />
                  ))}
                </div>
              </div>
            )}

            {regularEvents.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularEvents.map((event) => (
                    <EventCard key={event.id} event={event} userRole={userRole} />
                  ))}
                </div>
              </div>
            )}

            {events.length === 0 && (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Yet</h3>
                <p className="text-gray-500">Check back soon for exciting events!</p>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="my-events" className="space-y-8">
            {myEvents.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {myEvents.map((event) => (
                  <EventCard key={event.id} event={event} userRole={userRole} isOwnEvent />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Created</h3>
                <p className="text-gray-500">Create your first event to get started!</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      ) : (
        <>
          {featuredEvents.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-800">Featured Events</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredEvents.map((event) => (
                  <EventCard key={event.id} event={event} userRole={userRole} />
                ))}
              </div>
            </div>
          )}

          {regularEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Upcoming Events</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {regularEvents.map((event) => (
                  <EventCard key={event.id} event={event} userRole={userRole} />
                ))}
              </div>
            </div>
          )}

          {events.length === 0 && (
            <div className="text-center py-12">
              <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No Events Yet</h3>
              <p className="text-gray-500">Check back soon for exciting events!</p>
            </div>
          )}
        </>
      )}
    </div>
  );
}
