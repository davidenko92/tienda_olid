import { useState, useEffect } from 'react';
import ImageViewer from '../components/ImageViewer';

// Usar URLs relativas para que funcione con cualquier dominio/IP
const API_URL = '/api';
const IMAGES_URL = '';

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
  cd_collection?: string;
  cd_status: 'disponible' | 'reservado' | 'vendido';
  fh_created_at: string;
}

// Componente para renderizar una tarjeta de obra
const ArtworkCard = ({ artwork, onClick }: { artwork: Product; onClick: () => void }) => (
  <div onClick={onClick} style={{
    cursor: 'pointer', background: 'white', border: '1px solid #e0e0e0',
    transition: 'transform 0.3s, box-shadow 0.3s', position: 'relative'
  }}>
    <div style={{ position: 'relative', paddingTop: '100%', background: '#f5f5f5', overflow: 'hidden' }}>
      <img
        src={`${IMAGES_URL}/${artwork.cd_image_thumb}`}
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
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <button className="sans-text" style={{
          padding: '0.5rem 1.2rem', fontSize: '0.8rem', fontWeight: '600',
          background: 'white', color: '#e74c3c', border: '1px solid #e74c3c',
          cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em'
        }}>Ver más</button>
      </div>
    </div>
  </div>
);

// Componente para tarjeta de colección
const CollectionCard = ({
  collection,
  products,
  onClick
}: {
  collection: string;
  products: Product[];
  onClick: () => void
}) => {
  const totalObras = products.length;

  return (
    <div onClick={onClick} style={{
      cursor: 'pointer',
      background: 'white',
      border: '1px solid #e0e0e0',
      transition: 'transform 0.3s, box-shadow 0.3s',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Preview con múltiples imágenes en mosaico */}
      <div style={{
        position: 'relative',
        paddingTop: '75%',
        background: '#f5f5f5',
        overflow: 'hidden'
      }}>
        {/* Mosaico de 4 imágenes */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '1fr 1fr',
          gap: '2px'
        }}>
          {products.slice(0, 4).map((p, idx) => (
            <div key={idx} style={{
              background: '#f5f5f5',
              overflow: 'hidden'
            }}>
              <img
                src={`${IMAGES_URL}/${p.cd_image_thumb}`}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover'
                }}
              />
            </div>
          ))}
        </div>
        {/* Overlay con degradado */}
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '50%',
          background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
          pointerEvents: 'none'
        }} />
        {/* Nombre de la colección sobre la imagen */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '1rem',
          right: '1rem'
        }}>
          <h3 className="serif-title" style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'white',
            marginBottom: '0.25rem',
            textShadow: '0 2px 4px rgba(0,0,0,0.3)'
          }}>
            {collection}
          </h3>
          <p className="sans-text" style={{
            fontSize: '0.9rem',
            color: 'rgba(255,255,255,0.9)',
            textShadow: '0 1px 2px rgba(0,0,0,0.3)'
          }}>
            {totalObras} {totalObras === 1 ? 'obra' : 'obras'}
          </p>
        </div>
      </div>
    </div>
  );
};

const Gallery = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewerIndex, setViewerIndex] = useState<number | null>(null);
  const [viewerTechnique, setViewerTechnique] = useState<string>('');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);

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

  // Agrupar productos directamente por cd_technique
  const productsByTechnique = products.reduce((acc, product) => {
    const technique = product.cd_technique;
    if (!acc[technique]) {
      acc[technique] = [];
    }
    acc[technique].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Convertir a array y ordenar por técnica
  const techniqueOrder = ['Acuarela', 'Óleo', 'Acrílico', 'Técnica mixta'];
  const sortedTechniques = Object.entries(productsByTechnique).sort((a, b) => {
    const indexA = techniqueOrder.indexOf(a[0]);
    const indexB = techniqueOrder.indexOf(b[0]);
    if (indexA === -1 && indexB === -1) return a[0].localeCompare(b[0]);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Obtener colecciones de Técnica mixta
  const tecnicaMixtaProducts = productsByTechnique['Técnica mixta'] || [];
  const collectionGroups = tecnicaMixtaProducts.reduce((acc, product) => {
    const collection = product.cd_collection || 'Sin colección';
    if (!acc[collection]) {
      acc[collection] = [];
    }
    acc[collection].push(product);
    return acc;
  }, {} as Record<string, Product[]>);

  // Orden de colecciones
  const collectionOrder = ['Colección A', 'Colección B', 'Colección C', 'Sin colección'];
  const sortedCollections = Object.entries(collectionGroups).sort((a, b) => {
    const indexA = collectionOrder.indexOf(a[0]);
    const indexB = collectionOrder.indexOf(b[0]);
    if (indexA === -1 && indexB === -1) return a[0].localeCompare(b[0]);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  // Productos de la colección seleccionada
  const selectedCollectionProducts = selectedCollection
    ? collectionGroups[selectedCollection] || []
    : [];

  return (
    <section style={{ padding: '4rem 2rem', background: '#f9f9f9', minHeight: 'calc(100vh - 400px)' }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        <h2 className="serif-title" style={{ fontSize: '3rem', fontWeight: '700', color: '#333', marginBottom: '1rem', textAlign: 'center' }}>
          Galería
        </h2>
        <p className="sans-text" style={{ fontSize: '1.1rem', color: '#666', marginBottom: '4rem', textAlign: 'center', maxWidth: '600px', margin: '0 auto 4rem' }}>
          Explora nuestra colección de obras únicas
        </p>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p className="sans-text" style={{ fontSize: '1rem', color: '#666' }}>Cargando obras...</p>
          </div>
        ) : (
          <>
            {/* Secciones por técnica */}
            {sortedTechniques.map(([technique, techniqueProducts]) => {
              const isTecnicaMixta = technique === 'Técnica mixta';

              return (
                <div key={technique} style={{ marginBottom: '5rem' }}>
                  {/* Título de la técnica */}
                  <h3 className="serif-title" style={{
                    fontSize: '2rem',
                    fontWeight: '600',
                    color: '#333',
                    marginBottom: '2rem',
                    borderBottom: '2px solid #e74c3c',
                    paddingBottom: '0.5rem'
                  }}>
                    {technique}
                  </h3>

                  {isTecnicaMixta ? (
                    /* Vista de Técnica mixta con navegación por colecciones */
                    selectedCollection ? (
                      /* Vista de obras de la colección seleccionada */
                      <div>
                        {/* Botón volver y título de colección */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '1rem',
                          marginBottom: '2rem'
                        }}>
                          <button
                            onClick={() => setSelectedCollection(null)}
                            className="sans-text"
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.75rem 1.5rem',
                              fontSize: '0.9rem',
                              fontWeight: '600',
                              background: '#e74c3c',
                              color: 'white',
                              border: 'none',
                              cursor: 'pointer',
                              textTransform: 'uppercase',
                              letterSpacing: '0.05em'
                            }}
                          >
                            ← Volver a colecciones
                          </button>
                          <h4 className="serif-title" style={{
                            fontSize: '1.5rem',
                            fontWeight: '500',
                            color: '#555',
                            margin: 0
                          }}>
                            {selectedCollection}
                          </h4>
                          <span className="sans-text" style={{
                            fontSize: '0.9rem',
                            color: '#888'
                          }}>
                            ({selectedCollectionProducts.length} obras)
                          </span>
                        </div>

                        {/* Grid de obras de la colección */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                          {selectedCollectionProducts.map((artwork) => (
                            <ArtworkCard
                              key={artwork.id_product}
                              artwork={artwork}
                              onClick={() => {
                                const idx = selectedCollectionProducts.findIndex(p => p.id_product === artwork.id_product);
                                setViewerIndex(idx);
                                setViewerTechnique(`${technique}-${selectedCollection}`);
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    ) : (
                      /* Vista de tarjetas de colecciones */
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: '2rem' }}>
                        {sortedCollections.map(([collection, collectionProducts]) => (
                          <CollectionCard
                            key={collection}
                            collection={collection}
                            products={collectionProducts}
                            onClick={() => setSelectedCollection(collection)}
                          />
                        ))}
                      </div>
                    )
                  ) : (
                    /* Para otras técnicas, mostrar grid normal */
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                      {techniqueProducts.map((artwork) => (
                        <ArtworkCard
                          key={artwork.id_product}
                          artwork={artwork}
                          onClick={() => {
                            const idx = techniqueProducts.findIndex(p => p.id_product === artwork.id_product);
                            setViewerIndex(idx);
                            setViewerTechnique(technique);
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </>
        )}
      </div>

      {/* Image Viewer */}
      {viewerIndex !== null && viewerTechnique && (
        <ImageViewer
          products={
            viewerTechnique.startsWith('Técnica mixta-')
              ? selectedCollectionProducts
              : productsByTechnique[viewerTechnique] || []
          }
          currentIndex={viewerIndex}
          onClose={() => {
            setViewerIndex(null);
            setViewerTechnique('');
          }}
        />
      )}
    </section>
  );
};

export default Gallery;
