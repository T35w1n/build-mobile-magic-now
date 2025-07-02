
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, MapPin, Users, Ticket, Edit, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';
import { TicketPurchaseModal } from '@/components/TicketPurchaseModal';
import { EventChatModal } from '@/components/EventChatModal';

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

interface EventCardProps {
  event: Event;
  userRole: string | null;
  isOwnEvent?: boolean;
}

export function EventCard({ event, userRole, isOwnEvent = false }: EventCardProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  const isSoldOut = event.tickets_sold >= event.guest_limit;
  const availableTickets = event.guest_limit - event.tickets_sold;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'featured': return 'bg-yellow-100 text-yellow-800';
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <div className="relative">
          <div 
            className="h-48 bg-gradient-to-r from-passion-400 to-desire-400 flex items-center justify-center"
            style={{
              backgroundImage: event.banner_image ? `url(${event.banner_image})` : undefined,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          >
            {!event.banner_image && (
              <Calendar className="w-16 h-16 text-white opacity-50" />
            )}
          </div>
          
          <div className="absolute top-4 right-4">
            <Badge className={getStatusColor(event.status)}>
              {event.status === 'featured' ? 'Featured' : event.status}
            </Badge>
          </div>

          {isSoldOut && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <Badge variant="destructive" className="text-lg px-4 py-2">
                SOLD OUT
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
            {event.title}
          </h3>
          
          {event.description && (
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {event.description}
            </p>
          )}

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <Calendar className="w-4 h-4 mr-2" />
              {format(new Date(event.event_date), 'PPP p')}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-2" />
              {event.location}
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Users className="w-4 h-4 mr-2" />
              {availableTickets} of {event.guest_limit} tickets available
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-passion-600">
              {event.ticket_price === 0 ? 'Free' : `$${event.ticket_price}`}
            </div>

            <div className="flex gap-2">
              {isOwnEvent ? (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowChatModal(true)}
                    className="flex items-center gap-1"
                  >
                    <MessageCircle className="w-4 h-4" />
                    Chat
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-1"
                  >
                    <Edit className="w-4 h-4" />
                    Edit
                  </Button>
                </>
              ) : (
                <>
                  {userRole === 'attendee' && (
                    <Button
                      onClick={() => setShowPurchaseModal(true)}
                      disabled={isSoldOut}
                      className="bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600 disabled:opacity-50"
                      size="sm"
                    >
                      <Ticket className="w-4 h-4 mr-1" />
                      {isSoldOut ? 'Sold Out' : 'Get Ticket'}
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {showPurchaseModal && (
        <TicketPurchaseModal
          event={event}
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
        />
      )}

      {showChatModal && (
        <EventChatModal
          event={event}
          isOpen={showChatModal}
          onClose={() => setShowChatModal(false)}
        />
      )}
    </>
  );
}
