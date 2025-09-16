import React from 'react';

/**
 * Navbar component displays the site title, navigation links and theme toggle.
 * It receives the cart for showing the cart count, the current theme to
 * determine the toggle label, and handlers for toggling theme and changing
 * pages. The parent App component manages the state and passes these props.
 */
export default function Navbar({ cart, theme, toggleTheme, setPage }) {
  return (
    <header className="navbar">
      <h1 className="site-title">Millet Marketplace</h1>
      <nav className="nav-links">
        <button onClick={() => setPage('home')} className="nav-button">Home</button>
        <button onClick={() => setPage('cart')} className="nav-button">
          Cart ({cart.length})
        </button>
        <button onClick={() => setPage('settings')} className="nav-button">Settings</button>
      </nav>
      <button onClick={toggleTheme} className="theme-toggle">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </button>
    </header>
  );
}