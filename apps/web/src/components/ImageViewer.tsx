import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Plus, Minus } from 'lucide-react';

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

// Usar URLs relativas para que funcione con cualquier dominio/IP
const IMAGES_URL = '';

// Descripciones detalladas por técnica
const TECHNIQUE_DESCRIPTIONS: Record<string, string> = {
  'Acuarela': 'Acuarela sobre papel de 300 g.',
  'Óleo': 'Óleo sobre lienzo.',
  'Acrílico': 'Acrílico sobre lienzo.',
  'Técnica mixta': 'Técnica mixta: acuarela, tinta y rotulador sobre cartulina de 300 g.',
  'Tinta china': 'Tinta china sobre papel.'
};

export default function ImageViewer({ products, currentIndex, onClose }: ImageViewerProps) {
  const [index, setIndex] = useState(currentIndex);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const product = products[index];

  // Reset image loaded state and zoom when index changes
  useEffect(() => {
    setImageLoaded(false);
    setZoom(1);
    setPosition({ x: 0, y: 0 });
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
      } else if (e.key === '+' || e.key === '=') {
        zoomIn();
      } else if (e.key === '-') {
        zoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index, zoom]);

  const goToPrevious = () => {
    setIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
  };

  const zoomIn = () => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  };

  const zoomOut = () => {
    setZoom((prev) => {
      const newZoom = Math.max(prev - 0.5, 1);
      if (newZoom === 1) {
        setPosition({ x: 0, y: 0 });
      }
      return newZoom;
    });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoom > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
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
          ref={imageContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            width: '100%',
            maxHeight: '70vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
          }}
        >
          {!imageLoaded && (
            <div style={{ color: '#999', fontSize: '1rem' }}>Cargando imagen...</div>
          )}
          <img
            src={`${IMAGES_URL}/${product.cd_image_full}`}
            alt={product.cd_name}
            draggable={false}
            style={{
              maxWidth: '100%',
              maxHeight: '70vh',
              objectFit: 'contain',
              display: imageLoaded ? 'block' : 'none',
              transform: `scale(${zoom}) translate(${position.x / zoom}px, ${position.y / zoom}px)`,
              transition: isDragging ? 'none' : 'transform 0.2s ease-out',
              userSelect: 'none'
            }}
            onLoad={() => setImageLoaded(true)}
          />
        </div>

        {/* Zoom controls */}
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            marginBottom: '0.5rem'
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={zoomOut}
            disabled={zoom <= 1}
            style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: zoom <= 1 ? 'not-allowed' : 'pointer',
              opacity: zoom <= 1 ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            <Minus size={18} color="#333" />
          </button>
          <div
            style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '20px',
              padding: '0 1rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px',
              color: '#555',
              minWidth: '55px'
            }}
          >
            {Math.round(zoom * 100)}%
          </div>
          <button
            onClick={zoomIn}
            disabled={zoom >= 4}
            style={{
              background: 'white',
              border: '1px solid #ddd',
              borderRadius: '50%',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: zoom >= 4 ? 'not-allowed' : 'pointer',
              opacity: zoom >= 4 ? 0.5 : 1,
              transition: 'all 0.2s'
            }}
          >
            <Plus size={18} color="#333" />
          </button>
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
          <div style={{ marginBottom: '0.75rem', fontSize: '19px', fontWeight: '500' }}>
            {product.cd_name}
          </div>
          <div style={{ marginBottom: '0.75rem' }}>
            {TECHNIQUE_DESCRIPTIONS[product.cd_technique] || product.cd_technique}
          </div>
          <div style={{ marginBottom: '0.75rem', textTransform: 'uppercase', fontSize: '15px' }}>
            Medidas: {product.cd_width_cm} × {product.cd_height_cm} cm
          </div>
          {/* Opciones de precio */}
          <div style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <div style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid #e74c3c',
              borderRadius: '8px',
              background: '#fff'
            }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.25rem' }}>
                Obra Original
              </div>
              <div style={{ fontSize: '20px', color: '#e74c3c', fontWeight: '600' }}>
                150 €
              </div>
            </div>
            <div style={{
              padding: '0.75rem 1.5rem',
              border: '2px solid #3498db',
              borderRadius: '8px',
              background: '#fff'
            }}>
              <div style={{ fontSize: '12px', color: '#666', marginBottom: '0.25rem' }}>
                Copia
              </div>
              <div style={{ fontSize: '20px', color: '#3498db', fontWeight: '600' }}>
                20 €
              </div>
            </div>
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
