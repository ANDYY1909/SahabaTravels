/*
  # Fix Security Issues

  1. Indexes
    - Drop unused `idx_contact_submissions_status` index
  
  2. Security Policies
    - Remove duplicate and insecure SELECT policies on `contact_submissions`
    - Replace with single restrictive policy for authenticated users only
  
  ## Changes Made
  
  ### Removed Unused Index
  - Dropped `idx_contact_submissions_status` as it's not being utilized in queries
  
  ### Fixed Multiple Permissive Policies
  - Removed "Authenticated users can view submissions" policy
  - Removed "Public can view own submissions" policy (this was a security risk allowing anyone to view all submissions)
  - Added single restrictive policy allowing only authenticated users to view submissions
  
  ## Important Notes
  
  The following issues require dashboard configuration changes:
  
  1. **Auth DB Connection Strategy**: Navigate to Project Settings > Database > Connection Pooling
     - Change from fixed connection count to percentage-based allocation
     - This allows better scaling with instance size changes
  
  2. **Leaked Password Protection**: Navigate to Authentication > Providers > Email
     - Enable "Check passwords against HaveIBeenPwned.org"
     - This prevents users from using compromised passwords
*/

-- Drop unused index
DROP INDEX IF EXISTS idx_contact_submissions_status;

-- Remove duplicate and insecure policies
DROP POLICY IF EXISTS "Authenticated users can view submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Public can view own submissions" ON contact_submissions;

-- Create single restrictive policy for viewing submissions
CREATE POLICY "Only authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);