/**
 * Tipos de datos para la aplicación D4IA Gallery
 */

export interface Product {
  id_product: number;
  cd_slug: string;
  cd_name: string;
  ts_description: string;
  cd_image_thumb: string;
  cd_image_full: string;
  cd_width_cm: number;
  cd_height_cm: number;
  nu_price: number;
  cd_type: 'original' | 'print';
  cd_technique: string;
  cd_status: 'disponible' | 'reservado' | 'vendido';
  fh_created_at: string;
}
