/*
  # Add highlights column to packages table

  1. Changes
    - Add `highlights` column to store package inclusions as a JSON array
    - This will store detailed inclusions/highlights for each package
  
  2. Notes
    - Using JSONB for efficient querying and storage of array data
    - Default to empty array for existing records
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'packages' AND column_name = 'highlights'
  ) THEN
    ALTER TABLE packages ADD COLUMN highlights JSONB DEFAULT '[]'::jsonb;
  END IF;
END $$;