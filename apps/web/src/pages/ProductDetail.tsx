import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Product } from '../types';

const API_BASE_URL = 'http://localhost:3000';

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (slug) {
      fetchProduct(slug);
    }
  }, [slug]);

  const fetchProduct = async (productSlug: string) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_BASE_URL}/products/${productSlug}`);

      if (response.status === 404) {
        setError('Producto no encontrado');
        return;
      }

      if (!response.ok) {
        throw new Error('Error al cargar el producto');
      }

      const data = await response.json();
      setProduct(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      console.error('Error fetching product:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="container-custom py-12">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-d4ia-primary border-t-transparent"></div>
            <p className="mt-4 text-gray-600">Cargando producto...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container-custom py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center max-w-md mx-auto">
          <p className="text-red-800 font-medium text-lg mb-4">
            ⚠️ {error || 'Producto no encontrado'}
          </p>
          <Link
            to="/"
            className="inline-block px-6 py-3 bg-d4ia-primary text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            ← Volver a la galería
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      {/* Breadcrumb */}
      <nav className="mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-d4ia-primary transition-colors">
          Galería
        </Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{product.cd_name}</span>
      </nav>

      {/* Botón de volver */}
      <button
        onClick={() => navigate(-1)}
        className="mb-6 inline-flex items-center px-4 py-2 text-gray-700 hover:text-d4ia-primary transition-colors"
      >
        ← Volver
      </button>

      {/* Contenido principal */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Imagen */}
        <div className="relative">
          <div className="sticky top-6">
            <div className="bg-gray-100 rounded-lg overflow-hidden shadow-xl">
              {!imageLoaded && (
                <div className="aspect-[4/3] flex items-center justify-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-d4ia-primary border-t-transparent"></div>
                </div>
              )}
              <img
                src={`${API_BASE_URL}/${product.cd_image_full}`}
                alt={product.cd_name}
                className={`w-full h-auto ${imageLoaded ? 'block' : 'hidden'}`}
                onLoad={() => setImageLoaded(true)}
              />
            </div>

            {/* Información técnica de la imagen */}
            <div className="mt-4 bg-gray-50 rounded-lg p-4 text-sm">
              <h3 className="font-semibold text-gray-900 mb-2">Especificaciones Técnicas</h3>
              <ul className="space-y-1 text-gray-600">
                <li>
                  <span className="font-medium">Resolución:</span> 600 DPI
                </li>
                <li>
                  <span className="font-medium">Dimensiones:</span> {product.nu_width_px} × {product.nu_height_px}px
                </li>
                <li>
                  <span className="font-medium">Formato:</span> Alta calidad
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Información del producto */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            {product.cd_name}
          </h1>

          <div className="flex items-center gap-4 mb-6 text-sm text-gray-600">
            <span className="inline-flex items-center px-3 py-1 bg-d4ia-primary bg-opacity-10 text-d4ia-primary rounded-full font-medium">
              600 DPI
            </span>
            <span>
              Agregado el {new Date(product.fh_created_at).toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </div>

          <div className="prose prose-lg max-w-none">
            <h2 className="text-xl font-semibold text-gray-900 mb-3">Descripción</h2>
            <p className="text-gray-700 leading-relaxed whitespace-pre-line">
              {product.ts_description}
            </p>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Características</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Escaneado profesional en 600 dpi</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Máxima fidelidad de colores y detalles</span>
              </li>
              <li className="flex items-start">
                <svg className="w-6 h-6 text-green-500 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Ideal para impresión de alta calidad</span>
              </li>
            </ul>
          </div>

          {/* Botones de acción */}
          <div className="mt-8 flex gap-4">
            <button className="flex-1 px-6 py-3 bg-d4ia-primary text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
              Contactar
            </button>
            <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
              Compartir
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
