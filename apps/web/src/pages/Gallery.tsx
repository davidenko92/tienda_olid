import { useState, useEffect } from 'react';
import ImageViewer from '../components/ImageViewer';

const API_URL = 'http://localhost:3000';

interface Product {
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

const Gallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterType, setFilterType] = useState('all');
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  const filteredArtworks = filterType === 'all' ? products : products.filter(art => art.cd_type === filterType);

  const filters = [
    { label: 'Todos', value: 'all' },
    { label: 'Originales', value: 'original' },
    { label: 'Láminas', value: 'print' }
  ];

  return (
    <section style={{ padding: '4rem 2rem', background: '#f9f9f9', minHeight: 'calc(100vh - 400px)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="serif-title" style={{ fontSize: '3rem', fontWeight: '700', color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
          Galería
        </h2>
        <p className="sans-text" style={{ fontSize: '1.1rem', color: '#666', marginBottom: '3rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 3rem' }}>
          Explora nuestra colección de obras únicas
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginBottom: '3rem', flexWrap: 'wrap' }}>
          {filters.map(filter => (
            <button key={filter.value} onClick={() => setFilterType(filter.value)} className="sans-text" style={{
              padding: '0.6rem 1.5rem', fontSize: '0.85rem', fontWeight: '500',
              background: filterType === filter.value ? '#e74c3c' : 'white',
              color: filterType === filter.value ? 'white' : '#666',
              border: `1px solid ${filterType === filter.value ? '#e74c3c' : '#ddd'}`,
              cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
              transition: 'all 0.3s'
            }}>
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="sans-text" style={{ fontSize: '1rem', color: '#666' }}>Cargando obras...</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {filteredArtworks.map((artwork, idx) => (
              <div key={artwork.id_product} onClick={() => setViewerIndex(idx)} style={{
                cursor: 'pointer', background: 'white', border: '1px solid #e0e0e0',
                transition: 'transform 0.3s, box-shadow 0.3s', position: 'relative'
              }}>
                <div style={{ position: 'relative', paddingTop: '100%', background: '#f5f5f5', overflow: 'hidden' }}>
                  <img
                    src={`${API_URL}/${artwork.cd_image_thumb}`}
                    alt={artwork.cd_name}
                    style={{
                      position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'
                    }}
                  />
                  {artwork.cd_status === 'vendido' && (
                    <div className="sans-text" style={{
                      position: 'absolute', top: '10px', right: '10px', background: '#e74c3c',
                      color: 'white', padding: '0.4rem 1rem', fontSize: '0.75rem',
                      fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em'
                    }}>VENDIDO</div>
                  )}
                  {artwork.cd_status === 'reservado' && (
                    <div className="sans-text" style={{
                      position: 'absolute', top: '10px', right: '10px', background: '#f39c12',
                      color: 'white', padding: '0.4rem 1rem', fontSize: '0.75rem',
                      fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em'
                    }}>RESERVADO</div>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 className="serif-title" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                    {artwork.cd_name}
                  </h3>
                  <p className="sans-text" style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
                    {artwork.cd_width_cm} × {artwork.cd_height_cm} cm • {artwork.cd_type === 'original' ? 'Original' : 'Lámina'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="serif-title" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e74c3c' }}>{artwork.nu_price}€</span>
                    <button className="sans-text" style={{
                      padding: '0.5rem 1.2rem', fontSize: '0.8rem', fontWeight: '600',
                      background: 'white', color: '#e74c3c', border: '1px solid #e74c3c',
                      cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em'
                    }}>Ver más</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Image Viewer */}
      {viewerIndex !== null && (
        <ImageViewer
          products={filteredArtworks}
          currentIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </section>
  );
};

export default Gallery;
