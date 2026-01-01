/*
  # Create packages table

  1. New Tables
    - `packages`
      - `id` (uuid, primary key) - Unique identifier for each package
      - `name` (text) - Package name (e.g., "Kerala", "Goa")
      - `slug` (text, unique) - URL-friendly identifier (e.g., "kerala", "goa")
      - `image_url` (text) - URL to the package image in storage
      - `description` (text, optional) - Package description
      - `duration` (text, optional) - Trip duration
      - `price` (text, optional) - Package price
      - `created_at` (timestamptz) - Timestamp when package was created
      - `updated_at` (timestamptz) - Timestamp when package was last updated

  2. Security
    - Enable RLS on `packages` table
    - Add policy for public read access (anyone can view packages)
    - Add policy for authenticated users to insert/update/delete packages (admin access)
*/

CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  image_url text,
  description text,
  duration text,
  price text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view packages"
  ON packages
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert packages"
  ON packages
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update packages"
  ON packages
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete packages"
  ON packages
  FOR DELETE
  TO authenticated
  USING (true);
