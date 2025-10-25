import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3000';

interface Product {
  id_product: number;
  cd_image_full: string;
}

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroImages, setHeroImages] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch 3 random products on component mount
  useEffect(() => {
    fetch(`${API_URL}/products`)
      .then(res => res.json())
      .then(data => {
        // Shuffle and select 3 random products
        const shuffled = [...data].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 3);
        const imageUrls = selected.map((p: Product) => `${API_URL}/${p.cd_image_full}`);
        setHeroImages(imageUrls);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error loading products:', err);
        setLoading(false);
      });
  }, []);

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (heroImages.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  if (loading) {
    return (
      <section style={{ padding: '0', background: '#fff' }}>
        <div style={{
          width: '100%',
          height: '70vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#f5f5f5'
        }}>
          <p style={{ color: '#666' }}>Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ padding: '0', background: '#fff' }}>
      {/* Minimalist Image Carousel - 3 random images from database */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '70vh',
        overflow: 'hidden'
      }}>
        {heroImages.map((image, index) => (
          <div
            key={index}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: currentSlide === index ? 1 : 0,
              transition: 'opacity 1.5s ease-in-out'
            }}
          >
            <img
              src={image}
              alt=""
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'center'
              }}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default Home;
