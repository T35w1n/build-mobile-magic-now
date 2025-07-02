
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Calendar, MapPin, Users, Ticket, CreditCard } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface Event {
  id: string;
  title: string;
  description: string;
  location: string;
  event_date: string;
  ticket_price: number;
  guest_limit: number;
  tickets_sold: number;
}

interface TicketPurchaseModalProps {
  event: Event;
  isOpen: boolean;
  onClose: () => void;
}

export function TicketPurchaseModal({ event, isOpen, onClose }: TicketPurchaseModalProps) {
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handlePurchase = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Generate ticket code
      const { data: ticketCodeResult } = await supabase.rpc('generate_ticket_code');
      
      const ticketData = {
        event_id: event.id,
        attendee_id: user.id,
        ticket_code: ticketCodeResult,
        purchase_price: event.ticket_price,
        status: event.ticket_price === 0 ? 'paid' : 'pending'
      };

      const { data: ticket, error: ticketError } = await supabase
        .from('tickets')
        .insert(ticketData)
        .select()
        .single();

      if (ticketError) {
        console.error('Error creating ticket:', ticketError);
        if (ticketError.message.includes('sold out')) {
          toast({
            title: "Sold Out",
            description: "This event is now sold out.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: "Failed to purchase ticket. Please try again.",
            variant: "destructive",
          });
        }
        return;
      }

      // For free events, mark as paid immediately
      if (event.ticket_price === 0) {
        toast({
          title: "Success!",
          description: "Your free ticket has been confirmed!",
        });
        onClose();
        return;
      }

      // For paid events, create payment record
      const commission = event.ticket_price * 0.05; // 5% commission
      const netAmount = event.ticket_price - commission;

      const paymentData = {
        ticket_id: ticket.id,
        payer_id: user.id,
        amount: event.ticket_price,
        commission_amount: commission,
        net_amount: netAmount,
        status: 'pending'
      };

      const { error: paymentError } = await supabase
        .from('payments')
        .insert(paymentData);

      if (paymentError) {
        console.error('Error creating payment:', paymentError);
        // Clean up ticket if payment creation failed
        await supabase.from('tickets').delete().eq('id', ticket.id);
        toast({
          title: "Error",
          description: "Payment processing failed. Please try again.",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Ticket Reserved",
        description: "Your ticket is reserved. Payment processing would happen here in a real app.",
      });
      
      // In a real app, you would integrate with Stripe here
      // For now, we'll simulate successful payment
      setTimeout(async () => {
        await supabase
          .from('tickets')
          .update({ status: 'paid' })
          .eq('id', ticket.id);
        
        await supabase
          .from('payments')
          .update({ status: 'completed', processed_at: new Date().toISOString() })
          .eq('ticket_id', ticket.id);
      }, 2000);

      onClose();
    } catch (error) {
      console.error('Error purchasing ticket:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const availableTickets = event.guest_limit - event.tickets_sold;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-gray-800">
            Purchase Ticket
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-bold text-lg mb-4">{event.title}</h3>
            
            <div className="space-y-3 mb-6">
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
                {availableTickets} tickets remaining
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-2xl font-bold text-passion-600">
                  {event.ticket_price === 0 ? 'Free' : `$${event.ticket_price.toFixed(2)}`}
                </span>
              </div>

              <div className="space-y-3">
                <Button
                  onClick={handlePurchase}
                  disabled={loading || availableTickets === 0}
                  className="w-full bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600"
                >
                  {loading ? (
                    'Processing...'
                  ) : event.ticket_price === 0 ? (
                    <>
                      <Ticket className="w-4 h-4 mr-2" />
                      Get Free Ticket
                    </>
                  ) : (
                    <>
                      <CreditCard className="w-4 h-4 mr-2" />
                      Purchase Ticket
                    </>
                  )}
                </Button>

                <Button
                  variant="outline"
                  onClick={onClose}
                  disabled={loading}
                  className="w-full"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {event.ticket_price > 0 && (
          <p className="text-xs text-gray-500 text-center">
            Note: This is a demo. Real payment integration would be handled by Stripe.
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
}
