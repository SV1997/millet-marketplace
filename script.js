/*
 * Global JavaScript for Millet Marketplace
 *
 * This script powers the theme toggle (light/dark mode), image slider on the
 * home page, and a simple client‑side cart stored in localStorage. The cart
 * allows users to add products from the home page and view or clear them on
 * the cart page. Theme preference is persisted across pages by saving the
 * selected mode in localStorage.
 */

document.addEventListener('DOMContentLoaded', () => {
  const body = document.body;
  const themeToggleButtons = document.querySelectorAll('#theme-toggle, #theme-toggle-settings');
  const cartCountSpan = document.getElementById('cart-count');
  const cartItemsList = document.getElementById('cart-items');
  const emptyMessage = document.getElementById('empty-message');
  const clearCartBtn = document.getElementById('clear-cart');

  // Apply saved theme or default to light
  let savedTheme = localStorage.getItem('theme') || 'light';
  setTheme(savedTheme);

  // Attach event listeners to all theme toggle buttons
  themeToggleButtons.forEach(btn => {
    if (!btn) return;
    btn.addEventListener('click', () => {
      const newTheme = body.classList.contains('light') ? 'dark' : 'light';
      setTheme(newTheme);
    });
  });

  function setTheme(mode) {
    body.classList.remove('light', 'dark');
    body.classList.add(mode);
    // Update button text appropriately
    const label = mode === 'light' ? 'Dark Mode' : 'Light Mode';
    themeToggleButtons.forEach(btn => {
      if (btn) btn.textContent = label;
    });
    localStorage.setItem('theme', mode);
  }

  // Slider functionality (only applies on the home page)
  const slidesContainer = document.querySelector('.slides');
  const dots = document.querySelectorAll('.dot');
  if (slidesContainer && dots.length) {
    let currentSlide = 0;
    function showSlide(index) {
      currentSlide = index;
      const offset = -index * 100;
      slidesContainer.style.transform = `translateX(${offset}%)`;
      dots.forEach(dot => dot.classList.remove('active'));
      dots[index].classList.add('active');
    }
    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        const idx = parseInt(dot.dataset.index);
        showSlide(idx);
      });
    });
    // Auto‑advance slides every 5 seconds
    setInterval(() => {
      const next = (currentSlide + 1) % slidesContainer.children.length;
      showSlide(next);
    }, 5000);
  }

  // Cart handling functions
  function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    if (cartCountSpan) {
      cartCountSpan.textContent = cart.length;
    }
  }
  function addToCart(title) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.push(title);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
  }
  function renderCart() {
    if (!cartItemsList) return;
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cartItemsList.innerHTML = '';
    if (cart.length === 0) {
      if (emptyMessage) emptyMessage.style.display = 'block';
      cartItemsList.style.display = 'none';
    } else {
      if (emptyMessage) emptyMessage.style.display = 'none';
      cartItemsList.style.display = 'block';
      cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.className = 'remove-item';
        removeBtn.addEventListener('click', () => {
          removeFromCart(index);
        });
        li.appendChild(removeBtn);
        cartItemsList.appendChild(li);
      });
    }
  }
  function removeFromCart(index) {
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    renderCart();
  }
  function clearCart() {
    localStorage.setItem('cart', JSON.stringify([]));
    updateCartCount();
    renderCart();
  }

  // Attach event listeners to add‑to‑cart buttons
  const addButtons = document.querySelectorAll('.add-cart');
  addButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title;
      addToCart(title);
      alert(`${title} added to cart`);
    });
  });

  // If on cart page, render items and set up clear button
  if (cartItemsList) {
    renderCart();
    updateCartCount();
  }
  if (clearCartBtn) {
    clearCartBtn.addEventListener('click', clearCart);
  }
  // Always update cart count on load
  updateCartCount();
});