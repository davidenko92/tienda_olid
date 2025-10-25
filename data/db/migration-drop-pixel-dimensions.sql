-- Migration: Remove pixel dimension fields from products table
-- These fields are no longer needed since we now store dimensions in cm

ALTER TABLE products
DROP COLUMN nu_width_px,
DROP COLUMN nu_height_px;
