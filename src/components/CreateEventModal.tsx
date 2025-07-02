
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Calendar, MapPin, Users, DollarSign } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';

interface CreateEventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateEventModal({ isOpen, onClose }: CreateEventModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    event_date: '',
    ticket_price: '',
    guest_limit: '',
    banner_image: ''
  });

  const { user } = useAuth();
  const { toast } = useToast();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    try {
      const eventData = {
        title: formData.title,
        description: formData.description || null,
        location: formData.location,
        event_date: new Date(formData.event_date).toISOString(),
        ticket_price: parseFloat(formData.ticket_price) || 0,
        guest_limit: parseInt(formData.guest_limit),
        banner_image: formData.banner_image || null,
        promoter_id: user.id,
        status: 'draft'
      };

      const { error } = await supabase
        .from('events')
        .insert(eventData);

      if (error) {
        console.error('Error creating event:', error);
        toast({
          title: "Error",
          description: "Failed to create event. Please try again.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Success",
          description: "Event created successfully!",
        });
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Error creating event:', error);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const minDateTime = new Date();
  minDateTime.setHours(minDateTime.getHours() + 1);
  const minDateTimeString = minDateTime.toISOString().slice(0, 16);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            Create New Event
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="title">Event Title *</Label>
              <Input
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Amazing Event Title"
                required
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Tell people what makes this event special..."
                rows={3}
                className="mt-1"
              />
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="location">Location *</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  placeholder="Event venue or address"
                  required
                  className="pl-10 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="event_date">Date & Time *</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="event_date"
                  name="event_date"
                  type="datetime-local"
                  value={formData.event_date}
                  onChange={handleInputChange}
                  min={minDateTimeString}
                  required
                  className="pl-10 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="guest_limit">Guest Limit *</Label>
              <div className="relative">
                <Users className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="guest_limit"
                  name="guest_limit"
                  type="number"
                  min="1"
                  value={formData.guest_limit}
                  onChange={handleInputChange}
                  placeholder="Maximum attendees"
                  required
                  className="pl-10 mt-1"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="ticket_price">Ticket Price</Label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  id="ticket_price"
                  name="ticket_price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.ticket_price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="pl-10 mt-1"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">Leave empty or set to 0 for free events</p>
            </div>

            <div className="md:col-span-2">
              <Label htmlFor="banner_image">Banner Image URL</Label>
              <Input
                id="banner_image"
                name="banner_image"
                type="url"
                value={formData.banner_image}
                onChange={handleInputChange}
                placeholder="https://example.com/banner.jpg"
                className="mt-1"
              />
              <p className="text-xs text-gray-500 mt-1">Optional: Add a banner image to make your event stand out</p>
            </div>
          </div>

          <div className="flex justify-end space-x-4 pt-4 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="bg-gradient-to-r from-passion-500 to-desire-500 hover:from-passion-600 hover:to-desire-600"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
