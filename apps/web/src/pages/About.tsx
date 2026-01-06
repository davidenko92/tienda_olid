const About = () => {
  return (
    <section style={{ padding: '4rem 2rem', background: '#fff', minHeight: 'calc(100vh - 400px)' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 className="serif-title" style={{ fontSize: '3rem', fontWeight: '700', color: '#333', marginBottom: '1rem' }}>
            Sobre mí
          </h2>
        </div>

        {/* Main Content */}
        <div style={{ display: 'grid', gap: '3rem' }}>
          {/* Intro */}
          <div className="sans-text" style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#555' }}>
            <p style={{ marginBottom: '1.5rem' }}>
              <strong>OLID ART</strong> es un estudio donde la pintura y el trazo se convierten en una presencia
              silenciosa: piezas pensadas para aportar calma, profundidad y carácter a un espacio.
            </p>
            <p style={{ marginBottom: '0' }}>
              Trabajo desde la observación y la síntesis. Me interesa lo esencial: el equilibrio entre color,
              vacío y gesto, y esa emoción que aparece cuando una obra no necesita explicarse. Cada pieza es
              original y está creada con un proceso lento, cuidado y totalmente manual.
            </p>
          </div>

          {/* Proceso */}
          <div>
            <h3 className="serif-title" style={{ fontSize: '2rem', fontWeight: '600', color: '#e74c3c', marginBottom: '1.5rem' }}>
              Proceso
            </h3>
            <div className="sans-text" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
              <p style={{ marginBottom: '0' }}>
                Utilizo principalmente técnica mixta (acuarela, tinta y rotulador), explorando transparencias,
                contrastes y ritmo. El trabajo se construye por capas, buscando textura visual y una composición
                que respire.
              </p>
            </div>
          </div>

          {/* Calidad */}
          <div>
            <h3 className="serif-title" style={{ fontSize: '2rem', fontWeight: '600', color: '#e74c3c', marginBottom: '1.5rem' }}>
              Calidad
            </h3>
            <div className="sans-text" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
              <p style={{ marginBottom: '0' }}>
                Las obras están disponibles como originales y como láminas de alta calidad. Cada pieza se
                digitaliza a 600 DPI para preservar detalle, matices y textura. Las láminas se imprimen con
                alta fidelidad sobre papel de calidad museo, con acabados seleccionados para una presencia
                limpia y duradera.
              </p>
            </div>
          </div>

          {/* Intención */}
          <div style={{ background: '#f9f9f9', padding: '2.5rem', borderLeft: '4px solid #e74c3c' }}>
            <h3 className="serif-title" style={{ fontSize: '2rem', fontWeight: '600', color: '#333', marginBottom: '1.5rem' }}>
              Intención
            </h3>
            <div className="sans-text" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
              <p style={{ marginBottom: '0' }}>
                Crear obras que se integren con naturalidad, que eleven el ambiente sin imponerse, y que con
                el tiempo ganen significado para quien las convive.
              </p>
            </div>
          </div>

          {/* Valores */}
          <div>
            <h3 className="serif-title" style={{ fontSize: '2rem', fontWeight: '600', color: '#e74c3c', marginBottom: '1.5rem' }}>
              Valores
            </h3>
            <div className="sans-text" style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#555' }}>
              <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>Rigor y cuidado en cada detalle</li>
                <li style={{ marginBottom: '0.75rem' }}>Autenticidad y ediciones limitadas</li>
                <li style={{ marginBottom: '0' }}>Estética serena, atemporal y honesta</li>
              </ul>
            </div>
          </div>

          {/* CTA */}
          <div style={{ textAlign: 'center', marginTop: '2rem', padding: '2rem', background: '#f9f9f9', borderRadius: '8px' }}>
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
