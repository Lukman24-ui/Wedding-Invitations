import { supabase } from "@/integrations/supabase/client";

export interface WeddingInvitation {
  id: string;
  bride_name: string;
  groom_name: string;
  wedding_date: string;
  opening_message: string;
  event_date_akad: string;
  event_time_akad: string;
  event_location_akad: string;
  event_address_akad: string;
  event_date_resepsi: string;
  event_time_resepsi: string;
  event_location_resepsi: string;
  event_address_resepsi: string;
  story_title: string;
  story_content: string;
  dress_code_title: string;
  dress_code_description: string;
  dress_code_colors: string[];
  closing_message: string;
}

export interface WeddingGallery {
  id: string;
  wedding_id: string;
  image_url: string;
  caption: string | null;
  story_text: string | null;
  display_order: number;
  section: string;
}

export interface WeddingRSVP {
  guest_name: string;
  guest_count: number;
  attendance_status: 'hadir' | 'tidak_hadir' | 'ragu';
  message?: string;
  phone_number?: string;
}

export async function getWeddingInvitation(): Promise<WeddingInvitation | null> {
  const { data, error } = await supabase
    .from('wedding_invitation')
    .select('*')
    .eq('is_published', true)
    .single();

  if (error) {
    console.error('Error fetching wedding invitation:', error);
    return null;
  }

  return data;
}

export async function getWeddingGallery(section?: string): Promise<WeddingGallery[]> {
  let query = supabase
    .from('wedding_gallery')
    .select('*')
    .order('display_order', { ascending: true });

  if (section) {
    query = query.eq('section', section);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching gallery:', error);
    return [];
  }

  return data || [];
}

export async function submitRSVP(rsvp: WeddingRSVP) {
  // Get the first wedding invitation
  const { data: wedding } = await supabase
    .from('wedding_invitation')
    .select('id')
    .single();

  if (!wedding) {
    throw new Error('Wedding invitation not found');
  }

  const { data, error } = await supabase
    .from('wedding_rsvp')
    .insert({
      wedding_id: wedding.id,
      ...rsvp,
    })
    .select()
    .single();

  if (error) {
    console.error('Error submitting RSVP:', error);
    throw error;
  }

  return data;
}
