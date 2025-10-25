import { Link, useLocation } from 'react-router-dom';
import { Search, Heart, ShoppingCart } from 'lucide-react';

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  const getSection = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    return path.slice(1); // Remove leading slash
  };

  const currentSection = getSection();

  return (
    <div style={{ fontFamily: 'system-ui, -apple-system, sans-serif', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        background: 'white', padding: '1.2rem 2rem', borderBottom: '1px solid #e0e0e0',
        position: 'sticky', top: 0, zIndex: 1000
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <img src="/olid_art.png" alt="OLID ART" style={{ height: '180px', width: 'auto' }} />
            </div>
          </Link>
          <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
            {[
              { path: '/', label: 'Inicio', section: 'home' },
              { path: '/galeria', label: 'Galería', section: 'galeria' },
              { path: '/sobre-mi', label: 'Sobre mí', section: 'sobre-mi' },
              { path: '/contacto', label: 'Contacto', section: 'contacto' }
            ].map(item => (
              <Link key={item.path} to={item.path} className="sans-text" style={{
                textDecoration: 'none',
                fontSize: '0.95rem', fontWeight: '400',
                color: currentSection === item.section ? '#e74c3c' : '#555',
                textTransform: 'uppercase', letterSpacing: '0.05em',
                padding: '0.5rem 0', borderBottom: currentSection === item.section ? '2px solid #e74c3c' : '2px solid transparent',
                transition: 'all 0.3s'
              }}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div style={{ display: 'flex', gap: '1.2rem', alignItems: 'center' }}>
            <Search size={20} color="#555" style={{ cursor: 'pointer' }} />
            <Heart size={20} color="#555" style={{ cursor: 'pointer' }} />
            <ShoppingCart size={20} color="#555" style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1 }}>
        {children}
      </main>

      {/* Footer */}
      <footer style={{ background: '#2c2c2c', color: 'white', padding: '3rem 2rem 2rem', textAlign: 'center' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <img src="/olid_art.png" alt="OLID ART" style={{ height: '90px', width: 'auto', filter: 'brightness(0) invert(1)' }} />
          </div>
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

export default Layout;
