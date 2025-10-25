import { useState } from 'react';
import { Mail, Instagram } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formStatus, setFormStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría la lógica de envío del formulario
    setFormStatus('¡Mensaje enviado! Te responderé pronto.');
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section style={{ padding: '4rem 2rem', background: '#f9f9f9', minHeight: 'calc(100vh - 400px)' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <h2 className="serif-title" style={{ fontSize: '3rem', fontWeight: '700', color: '#333', marginBottom: '2rem', textAlign: 'center' }}>
          Contacto
        </h2>
        <p className="sans-text" style={{ fontSize: '1.1rem', color: '#666', marginBottom: '3rem', textAlign: 'center' }}>
          ¿Tienes alguna pregunta o estás interesado en alguna obra? ¡Escríbeme!
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Contact Info */}
          <div>
            <h3 className="serif-title" style={{ fontSize: '1.5rem', fontWeight: '600', color: '#333', marginBottom: '1.5rem' }}>
              Información de Contacto
            </h3>
            <div className="sans-text" style={{ fontSize: '1rem', color: '#555', lineHeight: 2 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <Mail size={20} color="#e74c3c" />
                <span>contacto@olidart.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <Instagram size={20} color="#e74c3c" />
                <span>@olid.art</span>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
              <div>
                <label className="sans-text" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '0.5rem' }}>
                  Nombre
                </label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} style={{
                  width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px'
                }} required />
              </div>
              <div>
                <label className="sans-text" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '0.5rem' }}>
                  Email
                </label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} style={{
                  width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px'
                }} required />
              </div>
              <div>
                <label className="sans-text" style={{ display: 'block', fontSize: '0.9rem', fontWeight: '500', color: '#333', marginBottom: '0.5rem' }}>
                  Mensaje
                </label>
                <textarea value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} rows={5} style={{
                  width: '100%', padding: '0.75rem', fontSize: '1rem', border: '1px solid #ddd', borderRadius: '4px', resize: 'vertical'
                }} required />
              </div>
              <button type="submit" className="sans-text" style={{
                padding: '0.9rem 2rem', fontSize: '0.95rem', fontWeight: '600',
                background: '#e74c3c', color: 'white', border: 'none',
                cursor: 'pointer', textTransform: 'uppercase', letterSpacing: '0.05em',
                transition: 'all 0.3s'
              }}>
                Enviar Mensaje
              </button>
              {formStatus && (
                <p className="sans-text" style={{ fontSize: '0.9rem', color: '#27ae60', textAlign: 'center' }}>
                  {formStatus}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
