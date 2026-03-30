/* Main App JavaScript */
const fallbackProducts = [
  { id: 1, game: "Valorant", level: "Radiant", rank: "5000 RR", price: 99, image: "valorant.jpg" },
  { id: 2, game: "Fortnite", level: "500", rank: "Legendary", price: 79, image: "fortnite.jpg" },
  { id: 3, game: "League of Legends", level: "30", rank: "Challenger", price: 89, image: "lol.jpg" },
];

function loadProducts() {
  displayProducts(fallbackProducts);
}

function displayProducts(products) {
  const container = document.getElementById("products");
  if (!container) return;

  container.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.className = "product-card";
    card.innerHTML = `
      <img src="images/${product.image}" alt="${product.game}" class="product-image" onerror="this.src='https://via.placeholder.com/280x200?text=${encodeURIComponent(product.game)}'">
      <div class="product-content">
        <h3 class="product-game">${product.game}</h3>
        <div class="product-stats">
          <div class="stat">
            <strong>Level:</strong>
            <div>${product.level}</div>
          </div>
          <div class="stat">
            <strong>Rank:</strong>
            <div>${product.rank}</div>
          </div>
        </div>
        <div class="product-price">$${product.price}</div>
        <button class="product-btn add-to-cart" data-game="${product.game}" data-price="${product.price}" data-id="${product.id}">
          Add to Cart
        </button>
      </div>
    `;
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

  showNotification(`تم إضافة ${item.game} للسلة! ✅`);
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

document.addEventListener("DOMContentLoaded", loadProducts);
