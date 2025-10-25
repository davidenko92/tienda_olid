import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <section style={{ padding: '0', background: '#f9f9f9' }}>
      <div style={{ position: 'relative', height: '90vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: '800px', padding: '0 2rem' }}>
          <h1 className="serif-title" style={{ fontSize: '4rem', fontWeight: '700', color: '#333', marginBottom: '1.5rem', lineHeight: 1.2 }}>
            Arte que sana
          </h1>
          <p className="sans-text" style={{ fontSize: '1.3rem', color: '#666', marginBottom: '3rem', lineHeight: 1.6 }}>
            Descubre piezas únicas creadas con pasión y dedicación. Cada obra cuenta una historia de amor por el arte.
          </p>
          <Link to="/galeria" className="sans-text" style={{
            display: 'inline-block',
            padding: '1rem 2.5rem', fontSize: '0.95rem', fontWeight: '600',
            background: '#e74c3c', color: 'white', border: 'none',
            cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
            textDecoration: 'none',
            transition: 'all 0.3s'
          }}>
            Explorar Galería
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Home;
