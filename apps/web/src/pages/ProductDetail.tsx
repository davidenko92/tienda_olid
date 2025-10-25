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
      <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <p style={{ color: '#666' }}>Cargando...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div style={{ padding: '3rem 2rem', textAlign: 'center' }}>
        <p style={{ color: '#e74c3c', marginBottom: '1.5rem', fontSize: '1.1rem' }}>
          ⚠️ {error || 'Producto no encontrado'}
        </p>
        <Link
          to="/galeria"
          style={{
            display: 'inline-block',
            padding: '0.75rem 2rem',
            background: '#e74c3c',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            fontSize: '0.95rem'
          }}
        >
          ← Volver a la galería
        </Link>
      </div>
    );
  }

  return (
    <div style={{ padding: '3rem 2rem', maxWidth: '900px', margin: '0 auto' }}>
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: '3rem',
          padding: '0.5rem 1rem',
          background: 'none',
          border: '1px solid #ddd',
          borderRadius: '4px',
          color: '#555',
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        ← Volver
      </button>

      {/* Centered vertical layout */}
      <div style={{ textAlign: 'center' }}>
        {/* Image */}
        <div style={{
          marginBottom: '3rem',
          maxWidth: '100%'
        }}>
          {!imageLoaded && (
            <div style={{
              aspectRatio: '4/3',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: '#f5f5f5'
            }}>
              <p style={{ color: '#999' }}>Cargando imagen...</p>
            </div>
          )}
          <img
            src={`${API_BASE_URL}/${product.cd_image_full}`}
            alt={product.cd_name}
            style={{
              width: '100%',
              height: 'auto',
              display: imageLoaded ? 'block' : 'none'
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Artwork details */}
        <div style={{
          fontFamily: 'Georgia, serif',
          fontSize: '17px',
          lineHeight: '1.8',
          color: '#333',
          fontWeight: '400'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            {product.cd_name}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            {product.cd_technique}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>
            {product.cd_width_cm} × {product.cd_height_cm} cm
          </div>
          <div style={{ marginTop: '1.5rem', fontSize: '18px' }}>
            {product.nu_price} €
          </div>
        </div>
      </div>
    </div>
  );
}
