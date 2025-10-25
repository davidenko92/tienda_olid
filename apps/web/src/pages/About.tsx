const About = () => {
  return (
    <section style={{ padding: '4rem 2rem', background: '#fff', minHeight: 'calc(100vh - 400px)' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="serif-title" style={{ fontSize: '3rem', fontWeight: '700', color: '#333', marginBottom: '1rem' }}>
            Sobre mí
          </h2>
          <p className="sans-text" style={{ fontSize: '1.2rem', color: '#888', fontStyle: 'italic' }}>
            Arte que sana • Creado con amor en España
          </p>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gap: '3rem' }}>
          {/* Intro */}
          <div className="sans-text" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
            <p style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: '#333' }}>
              Bienvenido a <strong>OLID ART</strong>, un espacio donde el arte se convierte en una experiencia
              sanadora y transformadora.
            </p>
            <p style={{ marginBottom: '1.5rem' }}>
              Soy un artista apasionado por crear obras que no solo decoran espacios, sino que tocan el alma
              y transmiten emociones profundas. Cada pieza que creo nace de la observación, la reflexión y
              el deseo de compartir belleza con el mundo.
            </p>
          </div>

          {/* Mi Proceso */}
          <div>
            <h3 className="serif-title" style={{ fontSize: '2rem', fontWeight: '600', color: '#e74c3c', marginBottom: '1.5rem' }}>
              Mi Proceso Creativo
            </h3>
            <div className="sans-text" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Cada obra es el resultado de horas de dedicación, experimentación y amor por el arte.
                Utilizo diversas técnicas —acuarela, óleo, técnica mixta— para explorar diferentes
                emociones, texturas y narrativas visuales.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Mi estudio es mi santuario, un lugar donde el tiempo se detiene y solo existe el diálogo
                entre el lienzo y yo. Aquí es donde la inspiración toma forma, donde los colores hablan
                y donde cada trazo cuenta una historia.
              </p>
            </div>
          </div>

          {/* Filosofía */}
          <div style={{ background: '#f9f9f9', padding: '2.5rem', borderLeft: '4px solid #e74c3c' }}>
            <h3 className="serif-title" style={{ fontSize: '2rem', fontWeight: '600', color: '#333', marginBottom: '1.5rem' }}>
              Mi Filosofía
            </h3>
            <div className="sans-text" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Creo firmemente que <strong>el arte tiene el poder de sanar</strong>. En un mundo acelerado
                y a veces caótico, una obra de arte puede ser un refugio, un espacio de calma y contemplación.
              </p>
              <p style={{ marginBottom: '0' }}>
                Mi objetivo es que cada pieza encuentre su hogar perfecto, donde pueda ser apreciada,
                valorada y, sobre todo, donde pueda transformar el espacio y el estado de ánimo de quien
                la contempla. Porque el arte no es solo para mirar, es para sentir.
              </p>
            </div>
          </div>

          {/* Técnica y Calidad */}
          <div>
            <h3 className="serif-title" style={{ fontSize: '2rem', fontWeight: '600', color: '#e74c3c', marginBottom: '1.5rem' }}>
              Técnica y Calidad
            </h3>
            <div className="sans-text" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
              <p style={{ marginBottom: '1.5rem' }}>
                Todas mis obras están disponibles tanto en <strong>formato original</strong> como en
                <strong> láminas de alta calidad</strong>. Cada pieza ha sido digitalizada profesionalmente
                a 600 DPI, preservando cada detalle, cada matiz de color y cada textura original.
              </p>
              <p style={{ marginBottom: '1.5rem' }}>
                Las láminas son impresas con tecnología de última generación en papel de museo de alta
                gramaje, garantizando durabilidad y fidelidad cromática excepcional. Así, puedes disfrutar
                de la belleza del arte original en tu hogar, sin comprometer la calidad.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎨</div>
              <h4 className="serif-title" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                Pasión
              </h4>
              <p className="sans-text" style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                Cada obra es creada con dedicación absoluta y amor por el arte
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>✨</div>
              <h4 className="serif-title" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                Autenticidad
              </h4>
              <p className="sans-text" style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                Obras únicas que reflejan visiones y emociones genuinas
              </p>
            </div>
            <div style={{ textAlign: 'center', padding: '1.5rem' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🇪🇸</div>
              <h4 className="serif-title" style={{ fontSize: '1.2rem', fontWeight: '600', color: '#333', marginBottom: '0.5rem' }}>
                Hecho en España
              </h4>
              <p className="sans-text" style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.6 }}>
                Fabricado con orgullo y calidad española
              </p>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '3rem', padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
            <p className="sans-text" style={{ fontSize: '1.1rem', color: '#555', marginBottom: '1.5rem' }}>
              ¿Quieres saber más o estás interesado en alguna obra?
            </p>
            <a
              href="/contacto"
              className="sans-text"
              style={{
                display: 'inline-block',
                padding: '0.9rem 2rem',
                fontSize: '0.95rem',
                fontWeight: '600',
                background: '#e74c3c',
                color: 'white',
                border: 'none',
                textDecoration: 'none',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                transition: 'all 0.3s'
              }}
            >
              Contactar
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
