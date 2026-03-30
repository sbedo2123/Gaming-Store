/* Cart Page JavaScript */

function getCart() {
  return JSON.parse(localStorage.getItem("cart")) || [];
}

function saveCart(cart) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

function loadCart() {
  const cart = getCart();
  const cartList = document.getElementById("cartList");
  if (!cartList) return;

  if (cart.length === 0) {
    cartList.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: #94a3b8;">
        <p style="font-size: 1.1rem; margin-bottom: 1rem;">Cart is empty 🛒</p>
        <p style="margin-bottom: 1rem;">It looks like you haven't added any products yet</p>
        <a href="shop.html" class="btn-secondary" style="display: inline-block; padding: 0.75rem 1.5rem;">Go to Shop</a>
      </div>
    `;
    updateSummary([]);
    return;
  }

  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
      <div class="cart-item-info" style="flex: 1;">
        <h3>${item.game}</h3>
        <p>السعر: <span style="color: var(--secondary);">$${item.price}</span></p>
        <p style="color: #64748b; font-size: 0.9rem;">معرّف: ${item.id}</p>
      </div>
      <button class="product-btn" onclick="removeFromCart(${index})" style="background-color: #ef4444; padding: 0.5rem 1rem;">Delete</button>
    `;
    cartList.appendChild(cartItem);
  });

  updateSummary(cart);
}

function removeFromCart(index) {
  const cart = getCart();
  cart.splice(index, 1);
  saveCart(cart);
  loadCart();
  showNotification("Product removed from cart!");
}

function updateSummary(cart) {
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const tax = subtotal * 0.15;
  const total = subtotal + tax;

  document.getElementById("subtotal").innerText = `$${subtotal.toFixed(2)}`;
  document.getElementById("tax").innerText = `$${tax.toFixed(2)}`;
  document.getElementById("total").innerText = `$${total.toFixed(2)}`;
}

function checkout() {
  const cart = getCart();
  if (cart.length === 0) {
    showNotification("Cart is empty!");
    return;
  }

  showNotification("Processing your order... You will be redirected to payment page ✅");

  setTimeout(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    orders.push({
      id: Math.random().toString(36).substr(2, 9),
      items: cart,
      total: cart.reduce((sum, item) => sum + item.price, 0),
      date: new Date().toISOString(),
    });

    localStorage.setItem("orders", JSON.stringify(orders));
    saveCart([]);
    loadCart();

    setTimeout(() => {
      showNotification("Order completed successfully! Thank you 🎉");
      setTimeout(() => {
        window.location.href = "index.html";
      }, 2000);
    }, 1000);
  }, 1500);
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

document.addEventListener("DOMContentLoaded", loadCart);

