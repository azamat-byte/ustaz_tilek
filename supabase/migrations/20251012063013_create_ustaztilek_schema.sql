/*
  # UstazTilek Database Schema

  1. New Tables
    - `profiles`
      - `id` (uuid, primary key, references auth.users)
      - `full_name` (text)
      - `email` (text)
      - `preferred_language` (text, 'kk' or 'ru')
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `mentorship_applications`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `full_name` (text)
      - `subject` (text)
      - `experience_level` (text)
      - `city_region` (text)
      - `application_type` (text, 'mentor' or 'mentee')
      - `status` (text, default 'pending')
      - `created_at` (timestamptz)
    
    - `support_resources`
      - `id` (uuid, primary key)
      - `title_kk` (text)
      - `title_ru` (text)
      - `description_kk` (text)
      - `description_ru` (text)
      - `content_type` (text, 'article', 'video', 'quote')
      - `content_url` (text)
      - `author` (text)
      - `created_at` (timestamptz)
      - `is_published` (boolean, default true)
    
    - `forum_posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles)
      - `title` (text)
      - `content` (text)
      - `is_anonymous` (boolean, default false)
      - `language` (text)
      - `created_at` (timestamptz)
      - `updated_at` (timestamptz)
    
    - `forum_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references forum_posts)
      - `user_id` (uuid, references profiles)
      - `content` (text)
      - `is_anonymous` (boolean, default false)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
    - Public read access for published support resources
    - Authenticated read/write for forum posts and comments
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  email text UNIQUE NOT NULL,
  preferred_language text DEFAULT 'ru' CHECK (preferred_language IN ('kk', 'ru')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create mentorship_applications table
CREATE TABLE IF NOT EXISTS mentorship_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  full_name text NOT NULL,
  subject text NOT NULL,
  experience_level text NOT NULL,
  city_region text NOT NULL,
  application_type text NOT NULL CHECK (application_type IN ('mentor', 'mentee')),
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at timestamptz DEFAULT now()
);

ALTER TABLE mentorship_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON mentorship_applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create applications"
  ON mentorship_applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Authenticated users can view approved applications"
  ON mentorship_applications FOR SELECT
  TO authenticated
  USING (status = 'approved');

-- Create support_resources table
CREATE TABLE IF NOT EXISTS support_resources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title_kk text NOT NULL,
  title_ru text NOT NULL,
  description_kk text NOT NULL,
  description_ru text NOT NULL,
  content_type text NOT NULL CHECK (content_type IN ('article', 'video', 'quote')),
  content_url text,
  author text,
  created_at timestamptz DEFAULT now(),
  is_published boolean DEFAULT true
);

ALTER TABLE support_resources ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view published resources"
  ON support_resources FOR SELECT
  TO anon, authenticated
  USING (is_published = true);

-- Create forum_posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  is_anonymous boolean DEFAULT false,
  language text DEFAULT 'ru' CHECK (language IN ('kk', 'ru')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view forum posts"
  ON forum_posts FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create forum posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own posts"
  ON forum_posts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create forum_comments table
CREATE TABLE IF NOT EXISTS forum_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE,
  content text NOT NULL,
  is_anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can view comments"
  ON forum_comments FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can create comments"
  ON forum_comments FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own comments"
  ON forum_comments FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);