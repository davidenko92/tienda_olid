import { Link } from 'react-router-dom';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

const IMAGES_BASE_URL = import.meta.env.VITE_IMAGES_URL || 'http://localhost:3000';

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      to={`/product/${product.cd_slug}`}
      className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Contenedor de imagen con aspect ratio */}
      <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
        <img
          src={`${IMAGES_BASE_URL}/${product.cd_image_thumb}`}
          alt={product.cd_name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Overlay con información de dimensiones */}
        <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
          {product.cd_width_cm} × {product.cd_height_cm} cm
        </div>
      </div>

      {/* Información del producto */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-d4ia-primary transition-colors">
          {product.cd_name}
        </h3>

        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
          {product.ts_description}
        </p>

        <div className="mt-3 flex items-center justify-between text-xs text-gray-500">
          <span>600 DPI</span>
          <span className="text-d4ia-primary font-medium">Ver detalles →</span>
        </div>
      </div>
    </Link>
  );
}
