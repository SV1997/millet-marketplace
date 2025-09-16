import React, { useState, useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './App.css';

// Import assets for products and slider
import product1 from './assets/product1.png';
import product2 from './assets/product2.png';
import product3 from './assets/product3.png';
import product4 from './assets/product4.png';
import slider1 from './assets/slider1.png';
import slider2 from './assets/slider2.png';
import slider3 from './assets/slider3.png';

// Data for products. Nutrient values are per 100 g as referenced from credible sources
const products = [
  {
    name: 'Sorghum (Jowar)',
    description: 'Gluten‑free whole grain rich in antioxidants, ideal for rotis and porridges.',
    image: product1,
    nutrients: { protein: 10.4, fiber: 2.9, minerals: 1.6, iron: 2.5, calcium: 25 }
  },
  {
    name: 'Pearl Millet (Bajra)',
    description: 'High in iron and minerals, this millet makes hearty flatbreads and porridges.',
    image: product2,
    nutrients: { protein: 10.6, fiber: 1.3, minerals: 2.3, iron: 8.0, calcium: 42 }
  },
  {
    name: 'Finger Millet (Ragi)',
    description: 'Calcium‑rich millet used for porridges, baked goods and baby foods.',
    image: product3,
    nutrients: { protein: 7.3, fiber: 3.6, minerals: 2.7, iron: 3.9, calcium: 364 }
  },
  {
    name: 'Foxtail Millet',
    description: 'Low‑glycaemic millet with a nutty flavour, perfect for pilafs and salads.',
    image: product4,
    nutrients: { protein: 12.3, fiber: 8.0, minerals: 3.3, iron: 2.8, calcium: 31 }
  },
  {
    name: 'Proso Millet',
    description: 'Mild tasting millet used in breakfast cereals and porridge bowls.',
    image: product1,
    nutrients: { protein: 12.5, fiber: 0.8, minerals: 1.9, iron: 0.8, calcium: 8 }
  },
  {
    name: 'Kodo Millet',
    description: 'A fibre‑rich millet with earthy flavour, great for savoury rice dishes.',
    image: product2,
    nutrients: { protein: 8.3, fiber: 9.0, minerals: 2.6, iron: 0.5, calcium: 27 }
  },
  {
    name: 'Little Millet',
    description: 'Small seeded millet that cooks quickly; ideal for upma and pilafs.',
    image: product3,
    nutrients: { protein: 7.7, fiber: 7.6, minerals: 2.5, iron: 9.3, calcium: 17 }
  },
  {
    name: 'Barnyard Millet',
    description: 'High‑fibre, low‑glycaemic grain perfect for stir‑fries and breakfast bowls.',
    image: product4,
    nutrients: { protein: 6.2, fiber: 13.6, minerals: 4.4, iron: 5.0, calcium: 11 }
  },
  {
    name: 'Amaranth',
    description: 'Pseudo‑cereal rich in protein and calcium, used in porridge and baking.',
    image: product1,
    nutrients: { protein: 14.0, fiber: 7.0, minerals: 0.0, iron: 7.6, calcium: 159 }
  },
  {
    name: 'Quinoa',
    description: 'Gluten‑free seed high in protein and fibre; cooks like rice.',
    image: product2,
    nutrients: { protein: 14.0, fiber: 7.0, minerals: 0.0, iron: 4.6, calcium: 47 }
  },
  {
    name: 'Rolled Oats',
    description: 'Whole grain oats used for porridge with beta‑glucan fibre.',
    image: product3,
    nutrients: { protein: 13.15, fiber: 10.1, minerals: 0.0, iron: 4.25, calcium: 52 }
  },
  {
    name: 'Barley',
    description: 'Nutty grain rich in fibre; great for soups and stews.',
    image: product4,
    nutrients: { protein: 9.9, fiber: 16.0, minerals: 3.0, iron: 2.5, calcium: 29 }
  },
  {
    name: 'Buckwheat',
    description: 'Pseudo‑cereal with earthy flavour used in pancakes and soba noodles.',
    image: product1,
    nutrients: { protein: 13.3, fiber: 10.0, minerals: 3.0, iron: 2.2, calcium: 18 }
  },
  {
    name: 'Spelt',
    description: 'Ancient wheat variety with nutty taste, used in breads and salads.',
    image: product2,
    nutrients: { protein: 12.0, fiber: 10.7, minerals: 0.0, iron: 4.4, calcium: 27 }
  },
  {
    name: 'Rye',
    description: 'Hearty grain for breads and crackers, rich in fibre and nutrients.',
    image: product3,
    nutrients: { protein: 10.0, fiber: 15.0, minerals: 0.0, iron: 2.6, calcium: 24 }
  },
  {
    name: 'Black Rice',
    description: 'Forbidden rice with dark colour and rich antioxidants.',
    image: product4,
    nutrients: { protein: 9.0, fiber: 4.9, minerals: 0.0, iron: 3.5, calcium: 30 }
  },
  {
    name: 'Wild Rice',
    description: 'Aquatic grass seed with chewy texture and nutty flavour.',
    image: product1,
    nutrients: { protein: 14.7, fiber: 6.2, minerals: 0.0, iron: 1.5, calcium: 21 }
  },
  {
    name: 'Teff',
    description: 'Tiny grain native to Ethiopia used to make injera; high in calcium.',
    image: product2,
    nutrients: { protein: 13.3, fiber: 8.0, minerals: 0.0, iron: 7.6, calcium: 180 }
  },
  {
    name: 'Fonio',
    description: 'West African millet with light, nutty flavour; cooks quickly.',
    image: product3,
    nutrients: { protein: 9.0, fiber: 1.9, minerals: 0.0, iron: 2.8, calcium: 40 }
  },
  {
    name: 'Brown Top Millet',
    description: 'Drought‑tolerant millet grown in arid regions; good for porridges.',
    image: product4,
    nutrients: { protein: 11.5, fiber: 12.5, minerals: 0.0, iron: 3.0, calcium: 50 }
  },
  {
    name: 'White Rice',
    description: 'Long‑grain white rice used in daily meals across the world.',
    image: product1,
    nutrients: { protein: 7.13, fiber: 1.3, minerals: 0.0, iron: 0.8, calcium: 28 }
  }
];

const sliderImages = [slider1, slider2, slider3];

function App() {
  // Theme state (light or dark)
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');
  // Cart holds selected products
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem('cart');
    return stored ? JSON.parse(stored) : [];
  });
  // Current page: home, cart, settings
  const [page, setPage] = useState('home');
  // Slider index
  const [currentSlide, setCurrentSlide] = useState(0);
  // Modal visibility and selected product
  const [modalData, setModalData] = useState({ product: null, visible: false });

  // Persist theme to localStorage and update body class
  useEffect(() => {
    document.body.className = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Persist cart changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  // Auto‑advance slider
  useEffect(() => {
    const id = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % sliderImages.length);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  const toggleTheme = () => setTheme((prev) => (prev === 'light' ? 'dark' : 'light'));

  const addToCart = (product) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, idx) => idx !== index));
  };

  const openModal = (product) => {
    setModalData({ product, visible: true });
  };
  const closeModal = () => {
    setModalData({ product: null, visible: false });
  };

  // Components for pages
  const HomePage = () => (
    <>
      <div className="slider">
        <img src={sliderImages[currentSlide]} alt={`Slide ${currentSlide + 1}`} className="slide" />
        <div className="dots">
          {sliderImages.map((_, idx) => (
            <span
              key={idx}
              className={idx === currentSlide ? 'dot active' : 'dot'}
              onClick={() => setCurrentSlide(idx)}
            />
          ))}
        </div>
      </div>
      <div className="product-grid">
        {products.map((product, idx) => (
          <div className="product-card" key={idx}>
            <img src={product.image} alt={product.name} className="product-image" />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <button className="add-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="info-btn" onClick={() => openModal(product)}>Info</button>
          </div>
        ))}
      </div>
    </>
  );

  const CartPage = () => (
    <div className="cart-page">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item, idx) => (
              <li key={idx} className="cart-item">
                {item.name}
                <button className="remove-btn" onClick={() => removeFromCart(idx)}>Remove</button>
              </li>
            ))}
          </ul>
          <button className="clear-btn" onClick={() => setCart([])}>Clear Cart</button>
        </>
      )}
    </div>
  );

  const SettingsPage = () => (
    <div className="settings-page">
      <h2>Settings</h2>
      <label className="theme-toggle">
        <input
          type="checkbox"
          checked={theme === 'dark'}
          onChange={toggleTheme}
        />{' '}
        Enable Dark Mode
      </label>
    </div>
  );

  return (
    <div className="app">
      <Navbar page={page} setPage={setPage} cartCount={cart.length} theme={theme} toggleTheme={toggleTheme} />
      {page === 'home' && <HomePage />}
      {page === 'cart' && <CartPage />}
      {page === 'settings' && <SettingsPage />}
      {modalData.visible && <InfoModal product={modalData.product} onClose={closeModal} />}
    </div>
  );
}

function Navbar({ page, setPage, cartCount, theme, toggleTheme }) {
  return (
    <nav className="navbar">
      <h1 className="logo">Millet Marketplace</h1>
      <ul className="nav-links">
        <li className={page === 'home' ? 'active' : ''} onClick={() => setPage('home')}>Home</li>
        <li className={page === 'cart' ? 'active' : ''} onClick={() => setPage('cart')}>Cart ({cartCount})</li>
        <li className={page === 'settings' ? 'active' : ''} onClick={() => setPage('settings')}>Settings</li>
      </ul>
      <button className="theme-btn" onClick={toggleTheme}>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</button>
    </nav>
  );
}

function InfoModal({ product, onClose }) {
  const canvasRef = useRef(null);
  // Render chart on mount/update
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    // Destroy existing chart if present
    if (canvas.chartInstance) {
      canvas.chartInstance.destroy();
    }
    const chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Protein (g)', 'Fibre (g)', 'Minerals (g)', 'Iron (mg)', 'Calcium (mg)'],
        datasets: [
          {
            label: product.name,
            data: [
              product.nutrients.protein,
              product.nutrients.fiber,
              product.nutrients.minerals,
              product.nutrients.iron,
              product.nutrients.calcium
            ],
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { display: false },
          title: { display: true, text: `${product.name} Nutritional Profile` },
        },
        scales: {
          x: {
            title: { display: true, text: 'Nutrients' },
          },
          y: {
            title: { display: true, text: 'Value' },
            beginAtZero: true,
          },
        },
      },
    });
    canvas.chartInstance = chart;
    // Clean up chart on unmount
    return () => chart.destroy();
  }, [product]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>×</button>
        <h2>{product.name}</h2>
        <p>{product.description}</p>
        <canvas ref={canvasRef} width={400} height={300}></canvas>
      </div>
    </div>
  );
}

export default App;