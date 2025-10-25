export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="container-custom py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Acerca de */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">D4IA Gallery</h3>
            <p className="text-sm leading-relaxed">
              Galería especializada en cuadros y láminas digitalizadas en alta resolución (600 dpi).
              Preservamos el arte con la máxima calidad digital.
            </p>
          </div>

          {/* Enlaces rápidos */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Enlaces</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/" className="hover:text-white transition-colors">
                  Inicio
                </a>
              </li>
              <li>
                <a href="/#galeria" className="hover:text-white transition-colors">
                  Galería
                </a>
              </li>
              <li>
                <a href="/#contacto" className="hover:text-white transition-colors">
                  Contacto
                </a>
              </li>
            </ul>
          </div>

          {/* Información técnica */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-3">Tecnología</h3>
            <p className="text-sm leading-relaxed">
              Imágenes escaneadas profesionalmente a 600 dpi para garantizar la máxima fidelidad
              y calidad de reproducción.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm">
          <p>&copy; {currentYear} D4IA Gallery. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
