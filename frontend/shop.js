/* Shop Page JavaScript */
const STORE_API_URL = "backend/getAccounts.php";

const fallbackProducts = [
  { id: 1, game: "Valorant", level: "Radiant", rank: "5000 RR", price: 99, image: "valorant.jpg" },
  { id: 2, game: "Fortnite", level: "500", rank: "Legendary", price: 79, image: "fortnite.jpg" },
  { id: 3, game: "League of Legends", level: "30", rank: "Challenger", price: 89, image: "lol.jpg" },
  { id: 4, game: "CSGO", level: "1000 ELO", rank: "Global Elite", price: 69, image: "csgo.jpg" },
  { id: 5, game: "Apex Legends", level: "500", rank: "Predator", price: 75, image: "apex.jpg" },
  { id: 6, game: "Dota 2", level: "Divine", rank: "10K MMR", price: 85, image: "dota2.jpg" },
];

let allProducts = [];

function loadAllProducts() {
  fetch(STORE_API_URL)
    .then(response => response.json())
    .then(data => {
      allProducts = data;
      displayProducts(allProducts);
    })
    .catch(() => {
      allProducts = fallbackProducts;
      displayProducts(allProducts);
    });
}

function displayProducts(products) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 2rem; color: #94a3b8;">No products found</div>';
    return;
  }

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="images/${product.image}" alt="${product.game}" class="product-image" onerror="this.src='https://via.placeholder.com/280x200?text=${encodeURIComponent(product.game)}'">
      <div class="product-content">
        <h3 class="product-game">${product.game}</h3>
        <div class="product-stats">
          <div class="stat">
            <strong>Rank:</strong>
            <div>${product.rank}</div>
          </div>
          <div class="stat">
            <strong>Level:</strong>
            <div>${product.level}</div>
          </div>
        </div>
        <div class="product-price">$${product.price}</div>
        <button class="product-btn add-to-cart" data-game="${product.game}" data-price="${product.price}" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;

    card.addEventListener("click", event => {
      if (!event.target.classList.contains("product-btn")) {
        showProductDetails(product);
      }
    });

    container.appendChild(card);
  });

  attachCartButtons();
}

function attachCartButtons() {
  document.querySelectorAll(".add-to-cart").forEach(button => {
    button.addEventListener("click", addToCart);
  });
}

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function addToCart(event) {
  event.stopPropagation();
  const button = event.target;

  const item = {
    id: button.dataset.id,
    game: button.dataset.game,
    price: parseFloat(button.dataset.price),
    timestamp: Date.now(),
  };

  const cart = getCart();
  cart.push(item);
  saveCart(cart);

  showNotification(`Added ${item.game} to cart! ✅`);
  hideModal();
}

function showProductDetails(product) {
  const modal = document.getElementById("modalBackdrop");
  const content = document.getElementById("modalContent");
  if (!modal || !content) return;

  content.innerHTML = `
    <h2 style="color: var(--primary); margin-bottom: 1rem; font-size: 1.8rem;">${product.game}</h2>
    <img src="images/${product.image}" alt="${product.game}" style="width: 100%; border-radius: 0.5rem; margin-bottom: 1rem;" onerror="this.src='https://via.placeholder.com/400x300?text=${encodeURIComponent(product.game)}'">
    <div style="margin-bottom: 1rem;">
      <h3 style="color: var(--primary); margin-bottom: 0.5rem;">Information</h3>
      <p><strong>Level:</strong> ${product.level}</p>
      <p><strong>Rank:</strong> ${product.rank}</p>
      <p><strong>Price:</strong> <span style="color: var(--secondary); font-size: 1.3rem;">$${product.price}</span></p>
    </div>
    <div style="margin-bottom: 1rem;">
      <h3 style="color: var(--primary); margin-bottom: 0.5rem;">Description</h3>
      <p>${product.description || 'High-level account guaranteed and 100% safe'}</p>
    </div>
    <button class="product-btn add-to-cart" data-game="${product.game}" data-price="${product.price}" data-id="${product.id}" style="width: 100%; padding: 1rem; margin-bottom: 1rem;">
      Add to Cart
    </button>
  `;

  modal.style.display = "flex";
  attachModalHandlers();
  attachCartButtons();
}

function attachModalHandlers() {
  const modal = document.getElementById("modalBackdrop");
  const closeBtn = modal?.querySelector(".modal-close");

  if (!modal) return;

  closeBtn?.addEventListener("click", hideModal);
  modal.addEventListener("click", event => {
    if (event.target === modal) {
      hideModal();
    }
  });
}

function hideModal() {
  const modal = document.getElementById("modalBackdrop");
  if (modal) modal.style.display = "none";
}

function filterProducts() {
  const game = document.getElementById("gameFilter").value;
  const priceSort = document.getElementById("priceFilter").value;

  let filtered = [...allProducts];

  if (game) {
    filtered = filtered.filter(product => product.game === game);
  }

  if (priceSort === "low") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (priceSort === "high") {
    filtered.sort((a, b) => b.price - a.price);
  }

  displayProducts(filtered);
}

function showNotification(message) {
  const notification = document.getElementById("notification");
  if (!notification) return;

  notification.textContent = message;
  notification.classList.add("show");

  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

function initShop() {
  loadAllProducts();

  const filterBtn = document.getElementById("filterBtn");
  if (filterBtn) {
    filterBtn.addEventListener("click", filterProducts);
  }
}

document.addEventListener("DOMContentLoaded", initShop);

