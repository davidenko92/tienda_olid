import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Product {
  id_product: number;
  cd_slug: string;
  cd_name: string;
  ts_description: string;
  cd_image_full: string;
  cd_width_cm: number;
  cd_height_cm: number;
  nu_price: number;
  cd_technique: string;
  cd_status: 'disponible' | 'reservado' | 'vendido';
}

interface ImageViewerProps {
  products: Product[];
  currentIndex: number;
  onClose: () => void;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export default function ImageViewer({ products, currentIndex, onClose }: ImageViewerProps) {
  const [index, setIndex] = useState(currentIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const product = products[index];

  // Reset image loaded state when index changes
  useEffect(() => {
    setImageLoaded(false);
  }, [index]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  const goToPrevious = () => {
    setIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(255, 255, 255, 0.98)',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem'
      }}
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        style={{
          position: 'absolute',
          top: '2rem',
          right: '2rem',
          background: 'white',
          border: '1px solid #ddd',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'all 0.2s',
          zIndex: 10000
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f5f5f5';
          e.currentTarget.style.transform = 'scale(1.1)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'white';
          e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        <X size={24} color="#333" />
      </button>

      {/* Navigation arrows */}
      {products.length > 1 && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            style={{
              position: 'absolute',
              left: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              zIndex: 10000
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronLeft size={32} color="#333" />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '50%',
              width: '56px',
              height: '56px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s',
              zIndex: 10000
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#f5f5f5';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'white';
              e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
            }}
          >
            <ChevronRight size={32} color="#333" />
          </button>
        </>
      )}

      {/* Main content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          maxWidth: '1200px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '2rem'
        }}
      >
        {/* Image */}
        <div
          style={{
            width: '100%',
            maxHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {!imageLoaded && (
            <div style={{ color: '#999', fontSize: '1rem' }}>Cargando imagen...</div>
          )}
          <img
            src={`${API_URL}/${product.cd_image_full}`}
            alt={product.cd_name}
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              display: imageLoaded ? 'block' : 'none'
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Artwork details */}
        <div
          style={{
            textAlign: 'center',
            fontFamily: 'Georgia, serif',
            fontSize: '17px',
            lineHeight: '1.8',
            color: '#333',
            fontWeight: '400'
          }}
        >
          <div style={{ marginBottom: '0.5rem', fontSize: '19px', fontWeight: '500' }}>
            {product.cd_name}
          </div>
          <div style={{ marginBottom: '0.5rem' }}>{product.cd_technique}</div>
          <div style={{ marginBottom: '0.5rem' }}>
            {product.cd_width_cm} × {product.cd_height_cm} cm
          </div>
          <div style={{ marginTop: '1rem', fontSize: '20px', color: '#e74c3c' }}>
            {product.nu_price} €
          </div>
          {product.cd_status !== 'disponible' && (
            <div
              style={{
                marginTop: '1rem',
                fontSize: '14px',
                textTransform: 'uppercase',
                fontWeight: '600',
                color: product.cd_status === 'vendido' ? '#e74c3c' : '#f39c12'
              }}
            >
              {product.cd_status}
            </div>
          )}
        </div>

        {/* Counter */}
        {products.length > 1 && (
          <div
            style={{
              fontSize: '14px',
              color: '#999',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            {index + 1} / {products.length}
          </div>
        )}
      </div>
    </div>
  );
}
