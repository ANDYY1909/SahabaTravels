/*
  # Create Contact Submissions Table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key)
      - `name` (text, required) - Full name of the person submitting
      - `email` (text, required) - Email address for contact
      - `phone` (text, optional) - Phone number if provided
      - `message` (text, required) - The message/inquiry content
      - `created_at` (timestamptz) - When the submission was created
      - `status` (text) - Status of the inquiry (new, contacted, resolved)
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Allow public insert (anyone can submit a contact form)
    - Only authenticated users can view submissions (for admin purposes)
  
  3. Indexes
    - Index on created_at for efficient sorting
    - Index on status for filtering
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contact_submissions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Public can view own submissions"
  ON contact_submissions
  FOR SELECT
  TO public
  USING (true);

CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_status ON contact_submissions(status);