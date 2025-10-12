import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Profile = {
  id: string;
  full_name: string;
  email: string;
  preferred_language: 'kk' | 'ru';
  created_at: string;
  updated_at: string;
};

export type MentorshipApplication = {
  id: string;
  user_id: string;
  full_name: string;
  subject: string;
  experience_level: string;
  city_region: string;
  application_type: 'mentor' | 'mentee';
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
};

export type SupportResource = {
  id: string;
  title_kk: string;
  title_ru: string;
  description_kk: string;
  description_ru: string;
  content_type: 'article' | 'video' | 'quote';
  content_url: string | null;
  author: string | null;
  created_at: string;
  is_published: boolean;
};

export type ForumPost = {
  id: string;
  user_id: string;
  title: string;
  content: string;
  is_anonymous: boolean;
  language: 'kk' | 'ru';
  created_at: string;
  updated_at: string;
};

export type ForumComment = {
  id: string;
  post_id: string;
  user_id: string;
  content: string;
  is_anonymous: boolean;
  created_at: string;
};
