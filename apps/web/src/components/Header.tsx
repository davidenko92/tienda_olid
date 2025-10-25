import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-d4ia-primary to-d4ia-secondary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">D4</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">D4IA Gallery</h1>
              <p className="text-xs text-gray-500">Arte Digital en Alta Resolución</p>
            </div>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className="text-gray-700 hover:text-d4ia-primary transition-colors font-medium"
            >
              Galería
            </Link>
            <a
              href="#contacto"
              className="text-gray-700 hover:text-d4ia-primary transition-colors font-medium"
            >
              Contacto
            </a>
          </div>
        </div>
      </nav>
    </header>
  );
}
