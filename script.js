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

  // Expose addToCart globally so it can be called by dynamically created elements
  window.addToCart = addToCart;
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

  // Render dynamic products and set up modal interactions on home page
  const productsContainer = document.getElementById('products');
  if (productsContainer) {
    renderProducts();
    attachProductListeners();
  }

  // Setup modal close handler
  const modalElement = document.getElementById('info-modal');
  const closeBtn = document.getElementById('close-modal');
  if (modalElement && closeBtn) {
    closeBtn.addEventListener('click', () => {
      modalElement.style.display = 'none';
    });
    window.addEventListener('click', e => {
      if (e.target === modalElement) {
        modalElement.style.display = 'none';
      }
    });
  }
});

// -----------------------------------------------
// Product catalog and modal functionality
// -----------------------------------------------

// Array of product objects with descriptions and nutrient values
const products = [
  { name: 'Sorghum (Jowar)', description: 'Gluten‑free whole grain rich in antioxidants, ideal for rotis and porridges.', image: 'assets/product1.png', nutrients: { protein: 10.4, fiber: 2.9, minerals: 1.6, iron: 2.5, calcium: 25 } },
  { name: 'Pearl Millet (Bajra)', description: 'High in iron and minerals, this millet makes hearty flatbreads and porridges.', image: 'assets/product2.png', nutrients: { protein: 10.8, fiber: 1.3, minerals: 2.3, iron: 8.0, calcium: 38 } },
  { name: 'Finger Millet (Ragi)', description: 'Calcium‑rich millet used for porridges, baked goods and baby foods.', image: 'assets/product3.png', nutrients: { protein: 7.3, fiber: 3.6, minerals: 2.7, iron: 4.6, calcium: 344 } },
  { name: 'Foxtail Millet', description: 'Low‑glycaemic millet with a nutty flavour, perfect for pilafs and salads.', image: 'assets/product4.png', nutrients: { protein: 12.3, fiber: 8.0, minerals: 3.3, iron: 2.8, calcium: 31 } },
  { name: 'Proso Millet', description: 'Mild tasting millet used in breakfast cereals and porridge bowls.', image: 'assets/product1.png', nutrients: { protein: 12.5, fiber: 5.2, minerals: 1.9, iron: 0.8, calcium: 14 } },
  { name: 'Kodo Millet', description: 'A fibre‑rich millet with earthy flavour, great for savoury rice dishes.', image: 'assets/product2.png', nutrients: { protein: 8.3, fiber: 9.0, minerals: 2.6, iron: 0.5, calcium: 27 } },
  { name: 'Little Millet', description: 'Small seeded millet that cooks quickly; ideal for upma and pilafs.', image: 'assets/product3.png', nutrients: { protein: 9.7, fiber: 7.6, minerals: 1.5, iron: 9.0, calcium: 17 } },
  { name: 'Barnyard Millet', description: 'High‑fibre, low‑glycaemic grain perfect for stir‑fries and breakfast bowls.', image: 'assets/product4.png', nutrients: { protein: 6.2, fiber: 9.8, minerals: 4.4, iron: 5.0, calcium: 11 } },
  { name: 'Teff', description: 'Tiny grain from Ethiopia rich in iron and calcium; great for injera and breads.', image: 'assets/product1.png', nutrients: { protein: 9.6, fiber: 8.0, minerals: 2.7, iron: 5.4, calcium: 180 } },
  { name: 'Fonio', description: 'West African millet with delicate texture, high in minerals and amino acids.', image: 'assets/product2.png', nutrients: { protein: 7.0, fiber: 4.0, minerals: 2.5, iron: 8.5, calcium: 40 } },
  { name: 'Brown Top Millet', description: 'Rare millet variety known for resilience and balanced nutrient profile.', image: 'assets/product3.png', nutrients: { protein: 12.0, fiber: 1.9, minerals: 2.7, iron: 5.0, calcium: 10 } },
  { name: 'Amaranth', description: 'Ancient pseudo‑cereal packed with protein and lysine, used in porridges and baking.', image: 'assets/product4.png', nutrients: { protein: 14.0, fiber: 7.0, minerals: 3.0, iron: 7.6, calcium: 159 } },
  { name: 'Quinoa', description: 'Gluten‑free seed that cooks fluffy like rice; complete protein source.', image: 'assets/product1.png', nutrients: { protein: 14.1, fiber: 7.0, minerals: 3.0, iron: 4.6, calcium: 47 } },
  { name: 'Rolled Oats', description: 'Whole grain oat flakes high in soluble fibre; ideal for oatmeal and granola.', image: 'assets/product2.png', nutrients: { protein: 13.15, fiber: 10.1, minerals: 3.0, iron: 4.25, calcium: 52 } },
  {
    name: 'Barley',
    description: 'Chewy grain used in soups and salads; provides beta‑glucan fibre.',
    image: 'assets/product3.png',
    // Nutrition facts for pearled barley per 100 g come from FoodStruct: 9.9 g protein, 16 g fibre, 29 mg calcium and 2.5 mg iron【735883871143133†L426-L455】.
    nutrients: {
      protein: 9.9,
      fiber: 16.0,
      minerals: 3.0,
      iron: 2.5,
      calcium: 29
    }
  },
  {
    name: 'Buckwheat',
    description: 'Pseudo‑cereal with nutty taste; naturally gluten‑free and versatile.',
    image: 'assets/product4.png',
    // Nutrient values based on FoodStruct: 13.3 g protein, 10 g fibre, 2.2 mg iron and 18 mg calcium per 100 g【902311409600944†L103-L107】.
    nutrients: {
      protein: 13.3,
      fiber: 10.0,
      minerals: 3.0,
      iron: 2.2,
      calcium: 18
    }
  },
  { name: 'Spelt', description: 'Ancient wheat variety with mellow flavour used in breads and pasta.', image: 'assets/product1.png', nutrients: { protein: 5.5, fiber: 3.8, minerals: 2.0, iron: 1.6, calcium: 9.5 } },
  { name: 'Rye', description: 'Hardy grain used in breads with distinctive flavour and high fibre.', image: 'assets/product2.png', nutrients: { protein: 10.0, fiber: 15.0, minerals: 3.0, iron: 2.6, calcium: 24 } },
  { name: 'Black Rice', description: 'Antioxidant‑rich rice with dark purple hue; slightly sweet and nutty.', image: 'assets/product3.png', nutrients: { protein: 8.9, fiber: 4.9, minerals: 2.0, iron: 2.4, calcium: 10 } },
  { name: 'Wild Rice', description: 'Semi‑aquatic grass seed with chewy texture and subtle smoky flavour.', image: 'assets/product4.png', nutrients: { protein: 4.0, fiber: 2.0, minerals: 2.0, iron: 0.5, calcium: 3 } }
];

/** Render product cards dynamically into the products container. */
function renderProducts() {
  const container = document.getElementById('products');
  if (!container) return;
  container.innerHTML = '';
  products.forEach((product, index) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <h3>${product.name}</h3>
      <p>${product.description}</p>
      <button class="add-cart" data-title="${product.name}">Add to Cart</button>
      <button class="info-btn" data-index="${index}">Info</button>
    `;
    container.appendChild(card);
  });
}

/** Attach click listeners to Add to Cart and Info buttons. */
function attachProductListeners() {
  const addBtns = document.querySelectorAll('.add-cart');
  addBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const title = btn.dataset.title;
      addToCart(title);
      alert(`${title} added to cart`);
    });
  });
  const infoBtns = document.querySelectorAll('.info-btn');
  infoBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const idx = parseInt(btn.dataset.index);
      openModal(idx);
    });
  });
}

/** Show the modal with nutritional chart for a given product index. */
function openModal(index) {
  const modalEl = document.getElementById('info-modal');
  const titleEl = document.getElementById('modal-title');
  const descEl = document.getElementById('modal-description');
  const canvas = document.getElementById('nutrition-chart');
  if (!modalEl || !titleEl || !descEl || !canvas) return;
  const product = products[index];
  titleEl.textContent = product.name;
  descEl.textContent = product.description;
  modalEl.style.display = 'block';
  const ctx = canvas.getContext('2d');
  if (window.currentNutritionChart) {
    window.currentNutritionChart.destroy();
  }
  window.currentNutritionChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: ['Protein (g)', 'Fibre (g)', 'Minerals (g)', 'Iron (mg)', 'Calcium (mg)'],
      datasets: [
        {
          label: 'Per 100 g',
          data: [
            product.nutrients.protein,
            product.nutrients.fiber,
            product.nutrients.minerals,
            product.nutrients.iron,
            product.nutrients.calcium
          ],
          backgroundColor: ['#795548', '#a1887f', '#bcaaa4', '#8d6e63', '#d7ccc8']
        }
      ]
    },
    options: {
      responsive: true,
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Quantity'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Nutrients'
          }
        }
      },
      plugins: {
        legend: { display: false },
        title: { display: true, text: 'Nutritional Composition (per 100 g)' }
      }
    }
  });
}