/*
  # Allow Public Package Management (Temporary)

  This migration temporarily allows public users to manage packages for admin functionality.
  
  IMPORTANT: In production, this should be protected with proper authentication.
  For now, this allows the admin panel to work without authentication.
  
  Changes:
  - Update RLS policies to allow public insert/update/delete on packages table
*/

-- Drop existing authenticated-only policies
DROP POLICY IF EXISTS "Authenticated users can insert packages" ON packages;
DROP POLICY IF EXISTS "Authenticated users can update packages" ON packages;
DROP POLICY IF EXISTS "Authenticated users can delete packages" ON packages;

-- Create new public policies (temporary - should be protected in production)
CREATE POLICY "Public can insert packages"
  ON packages
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Public can update packages"
  ON packages
  FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Public can delete packages"
  ON packages
  FOR DELETE
  TO public
  USING (true);