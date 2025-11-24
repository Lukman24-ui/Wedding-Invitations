-- Create wedding invitation data table
CREATE TABLE IF NOT EXISTS public.wedding_invitation (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Opening page content
  bride_name TEXT NOT NULL DEFAULT 'Nama Mempelai Wanita',
  groom_name TEXT NOT NULL DEFAULT 'Nama Mempelai Pria',
  wedding_date DATE NOT NULL DEFAULT '2025-12-31',
  opening_message TEXT DEFAULT 'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami',
  
  -- Event information
  event_date_akad TEXT DEFAULT '20 Desember 2025',
  event_time_akad TEXT DEFAULT '08:00 - 10:00 WIB',
  event_location_akad TEXT DEFAULT 'Masjid Al-Ikhlas',
  event_address_akad TEXT DEFAULT 'Jl. Contoh No. 123, Jakarta',
  
  event_date_resepsi TEXT DEFAULT '20 Desember 2025',
  event_time_resepsi TEXT DEFAULT '18:00 - 21:00 WIB',
  event_location_resepsi TEXT DEFAULT 'Gedung Pernikahan Elite',
  event_address_resepsi TEXT DEFAULT 'Jl. Contoh No. 456, Jakarta',
  
  -- Story section
  story_title TEXT DEFAULT 'Kisah Cinta Kami',
  story_content TEXT DEFAULT 'Kami bertemu di tempat yang penuh kenangan...',
  
  -- Dress code
  dress_code_title TEXT DEFAULT 'Dress Code',
  dress_code_description TEXT DEFAULT 'Kami akan sangat senang jika Anda mengenakan pakaian formal dengan warna:',
  dress_code_colors TEXT[] DEFAULT ARRAY['Navy Blue', 'Gold', 'Cream'],
  
  -- Closing message
  closing_message TEXT DEFAULT 'Terima kasih atas kehadiran dan doa restu Anda. Sampai jumpa di hari bahagia kami!',
  
  -- Settings
  is_published BOOLEAN DEFAULT true
);

-- Create gallery table for photos
CREATE TABLE IF NOT EXISTS public.wedding_gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID REFERENCES public.wedding_invitation(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER DEFAULT 0,
  section TEXT DEFAULT 'gallery', -- 'gallery' or 'story'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create RSVP table
CREATE TABLE IF NOT EXISTS public.wedding_rsvp (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  wedding_id UUID REFERENCES public.wedding_invitation(id) ON DELETE CASCADE,
  guest_name TEXT NOT NULL,
  guest_count INTEGER DEFAULT 1,
  attendance_status TEXT CHECK (attendance_status IN ('hadir', 'tidak_hadir', 'ragu')) DEFAULT 'hadir',
  message TEXT,
  phone_number TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.wedding_invitation ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wedding_rsvp ENABLE ROW LEVEL SECURITY;

-- Public can read published invitations
CREATE POLICY "Anyone can view published invitations"
  ON public.wedding_invitation FOR SELECT
  USING (is_published = true);

-- Public can view gallery
CREATE POLICY "Anyone can view gallery"
  ON public.wedding_gallery FOR SELECT
  USING (true);

-- Public can submit RSVP
CREATE POLICY "Anyone can submit RSVP"
  ON public.wedding_rsvp FOR INSERT
  WITH CHECK (true);

-- Public can view RSVP
CREATE POLICY "Anyone can view RSVP"
  ON public.wedding_rsvp FOR SELECT
  USING (true);

-- Insert default wedding data
INSERT INTO public.wedding_invitation (
  bride_name,
  groom_name,
  wedding_date,
  opening_message
) VALUES (
  'Sarah',
  'Ahmad',
  '2025-12-31',
  'Dengan memohon rahmat dan ridho Allah SWT, kami mengundang Bapak/Ibu/Saudara/i untuk hadir di acara pernikahan kami'
);

-- Create function to update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for auto-updating timestamp
CREATE TRIGGER update_wedding_invitation_updated_at
  BEFORE UPDATE ON public.wedding_invitation
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();