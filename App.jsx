import React, { useState, useEffect } from 'react';

// Import shared layout and UI components
import Navbar from './components/Navbar.jsx';
import Slider from './components/Slider.jsx';
import ProductCard from './components/ProductCard.jsx';
import InfoModal from './components/InfoModal.jsx';
import './App.css';

// Import assets for products and slider
// Import images from the repository root. Vite will copy these static assets
// Note: when flattening the project structure, images live in the project root.
// Update paths to import from the current directory instead of parent folders.
import product1 from './product1.png';
import product2 from './product2.png';
import product3 from './product3.png';
import product4 from './product4.png';
import slider1 from './slider1.png';
import slider2 from './slider2.png';
import slider3 from './slider3.png';

// Data for products. Nutrient values are per 100 g as referenced from credible sources
const products = [
  {
    name: 'Millet Flour (Jowar Atta)',
    description: 'Gluten‑free millet flour perfect for rotis and baking.',
    image: product1,
    nutrients: { protein: 10.4, fiber: 2.9, minerals: 1.6, iron: 2.5, calcium: 25 }
  },
  {
    name: 'Millet Flour (Bajra Atta)',
    description: 'Rich in iron and minerals, ideal for flatbreads and parathas.',
    image: product2,
    nutrients: { protein: 10.6, fiber: 1.3, minerals: 2.3, iron: 8.0, calcium: 42 }
  },
  {
    name: 'Millet Ragi Cookies',
    description: 'Calcium‑rich millet cookies perfect for snacks.',
    image: product3,
    nutrients: { protein: 7.3, fiber: 3.6, minerals: 2.7, iron: 3.9, calcium: 364 }
  },
  {
    name: 'Foxtail Millet Pasta',
    description: 'Nutty‑flavoured foxtail millet pasta for healthy meals.',
    image: product4,
    nutrients: { protein: 12.3, fiber: 8.0, minerals: 3.3, iron: 2.8, calcium: 31 }
  },
  {
    name: 'Proso Millet Pancake Mix',
    description: 'Mild millet pancake mix for wholesome breakfasts.',
    image: product1,
    nutrients: { protein: 12.5, fiber: 0.8, minerals: 1.9, iron: 0.8, calcium: 8 }
  },
  {
    name: 'Kodo Millet Energy Bar',
    description: 'Fibre‑rich millet energy bar for on‑the‑go nutrition.',
    image: product2,
    nutrients: { protein: 8.3, fiber: 9.0, minerals: 2.6, iron: 0.5, calcium: 27 }
  },
  {
    name: 'Little Millet Breakfast Cereal',
    description: 'Quick‑cooking millet cereal to start your day.',
    image: product3,
    nutrients: { protein: 7.7, fiber: 7.6, minerals: 2.5, iron: 9.3, calcium: 17 }
  },
  {
    name: 'Barnyard Millet Noodles',
    description: 'Low‑glycaemic millet noodles for stir‑fries.',
    image: product4,
    nutrients: { protein: 6.2, fiber: 13.6, minerals: 4.4, iron: 5.0, calcium: 11 }
  },
  {
    name: 'Amaranth Granola Bars',
    description: 'Protein‑rich amaranth granola bars with crunchy texture.',
    image: product1,
    nutrients: { protein: 14.0, fiber: 7.0, minerals: 0.0, iron: 7.6, calcium: 159 }
  },
  {
    name: 'Quinoa Salad Mix',
    description: 'Pre‑cooked quinoa mix for salads and bowls.',
    image: product2,
    nutrients: { protein: 14.0, fiber: 7.0, minerals: 0.0, iron: 4.6, calcium: 47 }
  },
  {
    name: 'Rolled Oats Millet Muesli',
    description: 'Whole grain oats and millet muesli with fruits.',
    image: product3,
    nutrients: { protein: 13.15, fiber: 10.1, minerals: 0.0, iron: 4.25, calcium: 52 }
  },
  {
    name: 'Barley Millet Crackers',
    description: 'Nutty barley and millet crackers perfect for tea‑time.',
    image: product4,
    nutrients: { protein: 9.9, fiber: 16.0, minerals: 3.0, iron: 2.5, calcium: 29 }
  },
  {
    name: 'Buckwheat Soba Noodles',
    description: 'Earthy buckwheat soba noodles for soups.',
    image: product1,
    nutrients: { protein: 13.3, fiber: 10.0, minerals: 3.0, iron: 2.2, calcium: 18 }
  },
  {
    name: 'Spelt & Millet Bread',
    description: 'Ancient grain spelt bread blended with millet.',
    image: product2,
    nutrients: { protein: 12.0, fiber: 10.7, minerals: 0.0, iron: 4.4, calcium: 27 }
  },
  {
    name: 'Rye & Millet Biscuits',
    description: 'Hearty rye biscuits enriched with millet.',
    image: product3,
    nutrients: { protein: 10.0, fiber: 15.0, minerals: 0.0, iron: 2.6, calcium: 24 }
  },
  {
    name: 'Black Rice Pudding',
    description: 'Forbidden black rice pudding for dessert.',
    image: product4,
    nutrients: { protein: 9.0, fiber: 4.9, minerals: 0.0, iron: 3.5, calcium: 30 }
  },
  {
    name: 'Wild Rice Pilaf Mix',
    description: 'Chewy wild rice pilaf mix ready to cook.',
    image: product1,
    nutrients: { protein: 14.7, fiber: 6.2, minerals: 0.0, iron: 1.5, calcium: 21 }
  },
  {
    name: 'Teff Injera Wraps',
    description: 'Ethiopian teff injera wraps for healthy wraps.',
    image: product2,
    nutrients: { protein: 13.3, fiber: 8.0, minerals: 0.0, iron: 7.6, calcium: 180 }
  },
  {
    name: 'Fonio Couscous',
    description: 'Quick‑cooking fonio couscous with nutty flavour.',
    image: product3,
    nutrients: { protein: 9.0, fiber: 1.9, minerals: 0.0, iron: 2.8, calcium: 40 }
  },
  {
    name: 'Brown Top Millet Snack Mix',
    description: 'Crunchy millet snack mix for anytime munching.',
    image: product4,
    nutrients: { protein: 11.5, fiber: 12.5, minerals: 0.0, iron: 3.0, calcium: 50 }
  },
  {
    name: 'White Rice Poha',
    description: 'Flattened rice (poha) for quick breakfasts and snacks.',
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
      {/* Use the Slider component for the hero carousel */}
      <Slider
        images={sliderImages}
        currentSlide={currentSlide}
        setCurrentSlide={setCurrentSlide}
      />
      {/* Render each processed millet item using ProductCard */}
      <div className="product-grid">
        {products.map((product, idx) => (
          <ProductCard
            key={idx}
            product={product}
            addToCart={addToCart}
            openModal={openModal}
          />
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
    <div className={`app ${theme}`}>
      {/* Pass cart count, theme and handlers to Navbar */}
      <Navbar cart={cart} theme={theme} toggleTheme={toggleTheme} setPage={setPage} />
      {page === 'home' && <HomePage />}
      {page === 'cart' && <CartPage />}
      {page === 'settings' && <SettingsPage />}
      {modalData.visible && (
        <InfoModal modalData={modalData} closeModal={closeModal} />
      )}
    </div>
  );
}


export default App;