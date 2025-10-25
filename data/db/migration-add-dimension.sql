-- Migration: Add dimension fields to products table
-- cd_width_cm: Width in centimeters
-- cd_height_cm: Height in centimeters

ALTER TABLE products
ADD COLUMN cd_width_cm DECIMAL(10,1),
ADD COLUMN cd_height_cm DECIMAL(10,1);

-- Update existing records with calculated dimensions from pixel values
-- Conversion: pixels ÷ 236.22 = cm (at 600 DPI)
UPDATE products
SET
  cd_width_cm = 28.5,
  cd_height_cm = 40.5;

-- Make the fields NOT NULL after populating existing records
ALTER TABLE products
ALTER COLUMN cd_width_cm SET NOT NULL,
ALTER COLUMN cd_height_cm SET NOT NULL;
