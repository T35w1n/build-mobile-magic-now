
-- Create enum for user roles
CREATE TYPE public.user_role AS ENUM ('attendee', 'promoter', 'admin');

-- Create enum for event status
CREATE TYPE public.event_status AS ENUM ('draft', 'published', 'featured', 'cancelled');

-- Create enum for ticket status
CREATE TYPE public.ticket_status AS ENUM ('pending', 'paid', 'cancelled', 'refunded');

-- Create enum for payment status
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- Update profiles table to include user role
ALTER TABLE public.profiles ADD COLUMN user_role public.user_role DEFAULT 'attendee';

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promoter_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  banner_image TEXT,
  location TEXT NOT NULL,
  event_date TIMESTAMPTZ NOT NULL,
  ticket_price DECIMAL(10,2) NOT NULL DEFAULT 0,
  ticket_quantity INTEGER NOT NULL DEFAULT 0,
  guest_limit INTEGER NOT NULL,
  tickets_sold INTEGER DEFAULT 0,
  status public.event_status DEFAULT 'draft',
  commission_rate DECIMAL(5,2) DEFAULT 5.00,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  CONSTRAINT valid_event_date CHECK (event_date > now()),
  CONSTRAINT valid_ticket_price CHECK (ticket_price >= 0),
  CONSTRAINT valid_guest_limit CHECK (guest_limit > 0),
  CONSTRAINT valid_commission CHECK (commission_rate >= 0 AND commission_rate <= 100)
);

-- Create tickets table
CREATE TABLE public.tickets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  attendee_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  ticket_code TEXT UNIQUE NOT NULL,
  qr_code TEXT,
  purchase_price DECIMAL(10,2) NOT NULL,
  status public.ticket_status DEFAULT 'pending',
  used_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create payments table
CREATE TABLE public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id UUID REFERENCES public.tickets(id) ON DELETE CASCADE NOT NULL,
  payer_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  commission_amount DECIMAL(10,2) NOT NULL,
  net_amount DECIMAL(10,2) NOT NULL,
  stripe_payment_intent_id TEXT,
  status public.payment_status DEFAULT 'pending',
  processed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create event chats table
CREATE TABLE public.event_chats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_id UUID REFERENCES public.events(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.event_chats ENABLE ROW LEVEL SECURITY;

-- RLS Policies for events
CREATE POLICY "Anyone can view published events" ON public.events
  FOR SELECT USING (status IN ('published', 'featured'));

CREATE POLICY "Promoters can manage their own events" ON public.events
  FOR ALL USING (promoter_id = auth.uid());

CREATE POLICY "Promoters can create events" ON public.events
  FOR INSERT WITH CHECK (promoter_id = auth.uid());

-- RLS Policies for tickets
CREATE POLICY "Users can view their own tickets" ON public.tickets
  FOR SELECT USING (attendee_id = auth.uid());

CREATE POLICY "Event promoters can view tickets for their events" ON public.tickets
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.events 
      WHERE events.id = tickets.event_id 
      AND events.promoter_id = auth.uid()
    )
  );

CREATE POLICY "Users can create tickets" ON public.tickets
  FOR INSERT WITH CHECK (attendee_id = auth.uid());

-- RLS Policies for payments
CREATE POLICY "Users can view their own payments" ON public.payments
  FOR SELECT USING (payer_id = auth.uid());

CREATE POLICY "Event promoters can view payments for their events" ON public.payments
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tickets 
      JOIN public.events ON events.id = tickets.event_id
      WHERE tickets.id = payments.ticket_id 
      AND events.promoter_id = auth.uid()
    )
  );

-- RLS Policies for event chats
CREATE POLICY "Ticket holders can view event chats" ON public.event_chats
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.tickets 
      WHERE tickets.event_id = event_chats.event_id 
      AND tickets.attendee_id = auth.uid()
      AND tickets.status = 'paid'
    )
  );

CREATE POLICY "Ticket holders can send messages" ON public.event_chats
  FOR INSERT WITH CHECK (
    user_id = auth.uid() AND
    EXISTS (
      SELECT 1 FROM public.tickets 
      WHERE tickets.event_id = event_chats.event_id 
      AND tickets.attendee_id = auth.uid()
      AND tickets.status = 'paid'
    )
  );

-- Function to generate unique ticket codes
CREATE OR REPLACE FUNCTION generate_ticket_code()
RETURNS TEXT AS $$
BEGIN
  RETURN 'TKT-' || UPPER(SUBSTRING(gen_random_uuid()::text FROM 1 FOR 8));
END;
$$ LANGUAGE plpgsql;

-- Function to update tickets_sold when ticket is purchased
CREATE OR REPLACE FUNCTION update_tickets_sold()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.status = 'paid' AND (OLD.status IS NULL OR OLD.status != 'paid') THEN
    UPDATE public.events 
    SET tickets_sold = tickets_sold + 1 
    WHERE id = NEW.event_id;
  ELSIF OLD.status = 'paid' AND NEW.status != 'paid' THEN
    UPDATE public.events 
    SET tickets_sold = GREATEST(0, tickets_sold - 1) 
    WHERE id = NEW.event_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update tickets_sold
CREATE TRIGGER trigger_update_tickets_sold
  AFTER INSERT OR UPDATE ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION update_tickets_sold();

-- Function to prevent overselling tickets
CREATE OR REPLACE FUNCTION check_ticket_availability()
RETURNS TRIGGER AS $$
DECLARE
  current_sold INTEGER;
  max_tickets INTEGER;
BEGIN
  SELECT tickets_sold, guest_limit 
  INTO current_sold, max_tickets
  FROM public.events 
  WHERE id = NEW.event_id;
  
  IF current_sold >= max_tickets THEN
    RAISE EXCEPTION 'Event is sold out';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to check availability before ticket creation
CREATE TRIGGER trigger_check_ticket_availability
  BEFORE INSERT ON public.tickets
  FOR EACH ROW
  EXECUTE FUNCTION check_ticket_availability();
