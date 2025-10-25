import React, { useState } from 'react';
import { Mail, Instagram, X, ShoppingCart, Heart, Search } from 'lucide-react';

const ARTWORKS = [
  {
    id: '001',
    title: 'Composición Geométrica 01',
    type: 'original',
    year: 2021,
    dimensions: '29.7 x 21 cm',
    technique: 'Acuarela sobre papel',
    price: 150,
    available: true,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    description: 'Formas orgánicas entrelazadas con paleta vibrante de rojos, azules y naranjas.'
  },
  {
    id: '002',
    title: 'Abstracción Fluida',
    type: 'original',
    year: 2024,
    dimensions: '42 x 29.7 cm',
    technique: 'Acuarela sobre papel',
    price: 220,
    available: true,
    image: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?w=800',
    description: 'Exploración de formas curvas y colores complementarios.'
  },
  {
    id: '003',
    title: 'Serie Cúbica',
    type: 'original',
    year: 2023,
    dimensions: '29.7 x 21 cm',
    technique: 'Acuarela sobre papel',
    price: 180,
    available: false,
    image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=800',
    description: 'Geometría tridimensional con patrones rayados.'
  },
  {
    id: '001-print',
    title: 'Composición Geométrica 01 - Lámina',
    type: 'print',
    dimensions: 'A4 / A3',
    price: 25,
    available: true,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800',
    description: 'Reproducción de alta calidad en papel premium.'
  }
];

const App = () => {
  const [currentSection, setCurrentSection] = useState('home');
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const filteredArtworks = filterType === 'all' ? ARTWORKS : ARTWORKS.filter(art => art.type === filterType);

  const scrollToSection = (section) => {
    setCurrentSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setFormStatus(''), 3000);
    }, 1500);
  };

  return (
    <div style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif', color: '#333' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&family=Lora:wght@400;600;700&display=swap');
        .serif-title { font-family: 'Lora', serif; }
        .sans-text { font-family: 'Open Sans', sans-serif; }
        * { box-sizing: border-box; }
      `}</style>

      <div style={{ background: '#f8f8f8', padding: '0.5rem 2rem', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: '#666' }}>
          <div>Envío GRATIS en toda España | Fabricado en España</div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            <a href="mailto:info@olid-art.com" style={{ color: '#666', textDecoration: 'none' }}>info@olid-art.com</a>
            <a href="#" style={{ color: '#666', textDecoration: 'none' }}>Mi cuenta</a>
          </div>
        </div>
      </div>

      <header style={{
        background: 'white', padding: '1.2rem 2rem', borderBottom: '1px solid #e0e0e0',
        position: 'sticky', top: 0, zIndex: 1000
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="serif-title" style={{ fontSize: '2rem', fontWeight: '700', color: '#333', letterSpacing: '0.02em' }}>
            OLID ART
          </div>
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {['home', 'galeria', 'sobre-mi', 'contacto'].map(section => (
              <button key={section} onClick={() => scrollToSection(section)} className="sans-text" style={{
                background: 'none', border: 'none', fontSize: '0.95rem', fontWeight: '400',
                color: currentSection === section ? '#e74c3c' : '#555',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
                padding: '0.5rem 0', borderBottom: currentSection === section ? '2px solid #e74c3c' : '2px solid transparent',
                transition: 'all 0.3s'
              }}>
                {section === 'home' ? 'Inicio' : section === 'galeria' ? 'Galería' : section === 'sobre-mi' ? 'Sobre mí' : 'Contacto'}
              </button>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <Search size={20} color="#555" style={{ cursor: 'pointer' }} />
            <Heart size={20} color="#555" style={{ cursor: 'pointer' }} />
            <ShoppingCart size={20} color="#555" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </header>

      <section id="home" style={{ padding: '0', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', alignItems: 'center', minHeight: '550px' }}>
          <div style={{ padding: '4rem 3rem' }}>
            <p className="sans-text" style={{ fontSize: '0.9rem', color: '#e74c3c', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '1rem' }}>
              Acuarelas originales
            </p>
            <h1 className="serif-title" style={{ fontSize: '3.5rem', fontWeight: '700', color: '#2c2c2c', lineHeight: 1.2, marginBottom: '1.5rem' }}>
              Arte que sana y transforma
            </h1>
            <p className="sans-text" style={{ fontSize: '1.1rem', color: '#666', lineHeight: 1.8, marginBottom: '2rem' }}>
              Cada trazo es parte de mi recuperación. La creatividad ha sido para mí el mejor remedio de superación. Descubre obras únicas que llenan tu hogar de color y emoción.
            </p>
            <button onClick={() => scrollToSection('galeria')} className="sans-text" style={{
              padding: '1rem 3rem', fontSize: '0.95rem', fontWeight: '600',
              background: '#e74c3c', color: 'white', border: 'none',
              cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
              transition: 'background 0.3s'
            }}>
              Ver colección
            </button>
          </div>
          <div style={{ height: '550px', overflow: 'hidden' }}>
            <img src="https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=1200" alt="Arte destacado" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </div>
        </div>
      </section>

      <section style={{ padding: '3rem 2rem', background: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', textAlign: 'center' }}>
          {[
            { title: 'Envío Gratuito', desc: 'En toda España sin mínimo' },
            { title: 'Fabricado en España', desc: 'Cada obra hecha a mano' },
            { title: 'Garantía de Calidad', desc: 'Materiales premium' }
          ].map((feature, i) => (
            <div key={i}>
              <h3 className="sans-text" style={{ fontSize: '1.1rem', fontWeight: '700', color: '#333', marginBottom: '0.5rem' }}>{feature.title}</h3>
              <p className="sans-text" style={{ fontSize: '0.9rem', color: '#777' }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="galeria" style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="serif-title" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2c2c2c', marginBottom: '1rem' }}>
              Nuestra Colección
            </h2>
            <p className="sans-text" style={{ fontSize: '1rem', color: '#666' }}>
              Obras originales y láminas de alta calidad
            </p>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '3rem' }}>
            {[{ value: 'all', label: 'Todas' }, { value: 'original', label: 'Originales' }, { value: 'print', label: 'Láminas' }].map(filter => (
              <button key={filter.value} onClick={() => setFilterType(filter.value)} className="sans-text" style={{
                padding: '0.7rem 2rem', fontSize: '0.9rem', fontWeight: '400',
                background: filterType === filter.value ? '#e74c3c' : 'white',
                color: filterType === filter.value ? 'white' : '#666',
                border: `1px solid ${filterType === filter.value ? '#e74c3c' : '#ddd'}`,
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em'
              }}>{filter.label}</button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
            {filteredArtworks.map(artwork => (
              <div key={artwork.id} onClick={() => setSelectedArtwork(artwork)} style={{
                cursor: 'pointer', background: 'white', border: '1px solid #e0e0e0',
                transition: 'transform 0.3s, box-shadow 0.3s', position: 'relative'
              }}>
                <div style={{ position: 'relative', paddingTop: '100%', background: '#f5f5f5', overflow: 'hidden' }}>
                  <img src={artwork.image} alt={artwork.title} style={{
                    position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover'
                  }} />
                  {!artwork.available && (
                    <div className="sans-text" style={{
                      position: 'absolute', top: '10px', right: '10px', background: '#e74c3c',
                      color: 'white', padding: '0.4rem 1rem', fontSize: '0.75rem',
                      fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em'
                    }}>VENDIDO</div>
                  )}
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 className="serif-title" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                    {artwork.title}
                  </h3>
                  <p className="sans-text" style={{ fontSize: '0.85rem', color: '#888', marginBottom: '1rem' }}>
                    {artwork.dimensions} • {artwork.type === 'original' ? 'Original' : 'Lámina'}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span className="serif-title" style={{ fontSize: '1.5rem', fontWeight: '700', color: '#e74c3c' }}>{artwork.price}€</span>
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
        </div>
      </section>

      <section id="sobre-mi" style={{ padding: '5rem 2rem', background: '#f9f9f9' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="serif-title" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2c2c2c', marginBottom: '2rem' }}>
            Sobre mí
          </h2>
          <div className="sans-text" style={{ fontSize: '1.1rem', lineHeight: 1.9, color: '#555', textAlign: 'left' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              Desde que tengo esta discapacidad, sigo experimentando con el arte. La depresión que sentí al recibir el diagnóstico de miastenia gravis me dejó en un profundo desasosiego.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Cada trazo es parte de mi recuperación. La creatividad ha sido para mí el mejor remedio de superación.
            </p>
            <p className="serif-title" style={{ fontSize: '1.3rem', fontWeight: '600', color: '#e74c3c', textAlign: 'center', marginTop: '2rem' }}>
              Crear es sanar. El arte es la mejor terapia.
            </p>
          </div>
        </div>
      </section>

      <section id="contacto" style={{ padding: '5rem 2rem', background: '#fff' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 className="serif-title" style={{ fontSize: '2.5rem', fontWeight: '700', color: '#2c2c2c', marginBottom: '1rem', textAlign: 'center' }}>
            Contacto
          </h2>
          <p className="sans-text" style={{ textAlign: 'center', fontSize: '1rem', color: '#666', marginBottom: '3rem' }}>
            ¿Interesado en alguna obra? Escríbeme
          </p>

          <div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="sans-text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#333' }}>Nombre</label>
              <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{
                width: '100%', padding: '0.9rem', fontSize: '0.95rem', border: '1px solid #ddd',
                fontFamily: 'Open Sans, sans-serif'
              }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="sans-text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#333' }}>Email</label>
              <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{
                width: '100%', padding: '0.9rem', fontSize: '0.95rem', border: '1px solid #ddd',
                fontFamily: 'Open Sans, sans-serif'
              }} />
            </div>
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="sans-text" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600', fontSize: '0.9rem', color: '#333' }}>Mensaje</label>
              <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows="5" style={{
                width: '100%', padding: '0.9rem', fontSize: '0.95rem', border: '1px solid #ddd', resize: 'vertical',
                fontFamily: 'Open Sans, sans-serif'
              }} />
            </div>
            <button onClick={handleSubmit} disabled={formStatus === 'sending'} className="sans-text" style={{
              width: '100%', padding: '1rem', fontSize: '0.95rem', fontWeight: '600',
              background: formStatus === 'success' ? '#27ae60' : '#e74c3c',
              color: 'white', border: 'none',
              cursor: formStatus === 'sending' ? 'not-allowed' : 'pointer',
              textTransform: 'uppercase', letterSpacing: '0.05em'
            }}>
              {formStatus === 'sending' ? 'Enviando...' : formStatus === 'success' ? '✓ Mensaje enviado' : 'Enviar mensaje'}
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid #e0e0e0' }}>
            <a href="mailto:info@olid-art.com" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
              <Mail size={18} /> info@olid-art.com
            </a>
            <a href="https://instagram.com/olid.art" target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
              <Instagram size={18} /> @olid.art
            </a>
          </div>
        </div>
      </section>

      {selectedArtwork && (
        <div onClick={() => setSelectedArtwork(null)} style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.8)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '2rem'
        }}>
          <div onClick={(e) => e.stopPropagation()} style={{
            background: 'white', maxWidth: '1000px', width: '100%',
            maxHeight: '90vh', overflow: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', position: 'relative'
          }}>
            <button onClick={() => setSelectedArtwork(null)} style={{
              position: 'absolute', top: '1rem', right: '1rem', background: 'white',
              color: '#333', border: '1px solid #ddd', width: '35px', height: '35px',
              cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}><X size={20} /></button>
            <div>
              <img src={selectedArtwork.image} alt={selectedArtwork.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            <div style={{ padding: '3rem' }}>
              <h3 className="serif-title" style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1rem', color: '#333' }}>{selectedArtwork.title}</h3>
              <div className="sans-text" style={{ marginBottom: '2rem', fontSize: '0.9rem', color: '#777' }}>
                <p style={{ marginBottom: '0.3rem' }}><strong>Dimensiones:</strong> {selectedArtwork.dimensions}</p>
                {selectedArtwork.technique && <p><strong>Técnica:</strong> {selectedArtwork.technique}</p>}
              </div>
              <p className="sans-text" style={{ fontSize: '1rem', lineHeight: 1.7, color: '#555', marginBottom: '2rem' }}>{selectedArtwork.description}</p>
              <div className="serif-title" style={{ fontSize: '2.2rem', fontWeight: '700', color: '#e74c3c', marginBottom: '2rem' }}>{selectedArtwork.price}€</div>
              <button onClick={() => { setSelectedArtwork(null); scrollToSection('contacto'); }} className="sans-text" style={{
                width: '100%', padding: '1rem', fontSize: '0.95rem', fontWeight: '600',
                background: selectedArtwork.available ? '#e74c3c' : '#999',
                color: 'white', border: 'none',
                cursor: selectedArtwork.available ? 'pointer' : 'not-allowed',
                textTransform: 'uppercase', letterSpacing: '0.05em'
              }} disabled={!selectedArtwork.available}>
                {selectedArtwork.available ? 'Contactar para comprar' : 'No disponible'}
              </button>
            </div>
          </div>
        </div>
      )}

      <footer style={{ background: '#2c2c2c', color: 'white', padding: '3rem 2rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div className="serif-title" style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '1.5rem' }}>OLID ART</div>
          <p className="sans-text" style={{ fontSize: '0.9rem', color: '#aaa', marginBottom: '2rem' }}>
            Arte que sana • Fabricado en España con amor
          </p>
          <div style={{ borderTop: '1px solid #444', paddingTop: '1.5rem', marginTop: '2rem' }}>
            <p className="sans-text" style={{ fontSize: '0.85rem', color: '#888' }}>© 2025 OLID ART. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;