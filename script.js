const storeConfig = window.STORE_CONFIG || {};
const products = storeConfig.products || [];

const cart = {};
const productGrid = document.querySelector("#productGrid");
const cartItems = document.querySelector("#cartItems");
const subtotal = document.querySelector("#subtotal");
const orderForm = document.querySelector("#orderForm");
const copyButton = document.querySelector("#copyButton");
const copyStatus = document.querySelector("#copyStatus");

function money(value) {
  return `$${value.toFixed(2)}`;
}

function selectedItems() {
  return products
    .map((product) => ({ ...product, quantity: cart[product.id] || 0 }))
    .filter((product) => product.quantity > 0);
}

function formValue(selector) {
  return document.querySelector(selector).value.trim();
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-photo">
            <img src="${product.image}" alt="${product.name}" loading="lazy" onerror="this.closest('.product-photo').classList.add('missing-image')" />
            <span>Example Picture</span>
          </div>
          <div>
            <h3>${product.name}</h3>
            <p>${product.description}</p>
          </div>
          <strong class="price">${money(product.price)}</strong>
          <div class="quantity-row">
            <button type="button" data-change="-1" data-id="${product.id}" aria-label="Remove one ${product.name}">-</button>
            <span id="qty-${product.id}">0</span>
            <button type="button" data-change="1" data-id="${product.id}" aria-label="Add one ${product.name}">+</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function orderSummary() {
  const items = selectedItems();
  const productLines =
    items.map((item) => `${item.quantity} x ${item.name} - ${money(item.price)}`).join("\n") ||
    "No products selected";
  const itemSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return [
    "New 3D Print Shop order",
    "",
    `Name: ${formValue("#customerName")}`,
    `Phone/email: ${formValue("#contact")}`,
    "",
    "Products:",
    productLines,
    "",
    `Total: ${money(itemSubtotal)}`,
    "",
    `Notes: ${formValue("#notes") || "None"}`,
  ].join("\n");
}

function canCheckout() {
  return selectedItems().length > 0 && formValue("#customerName") && formValue("#contact");
}

function renderCart() {
  const items = selectedItems();
  const itemSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  products.forEach((product) => {
    document.querySelector(`#qty-${product.id}`).textContent = cart[product.id] || 0;
  });

  cartItems.innerHTML = items.length
    ? `<ul>${items
        .map(
          (item) => `
            <li>
              <span>${item.quantity} x ${item.name}</span>
              <strong>${money(item.quantity * item.price)}</strong>
            </li>
          `,
        )
        .join("")}</ul>`
    : "<p>No products selected yet.</p>";

  subtotal.textContent = money(itemSubtotal);
  copyButton.disabled = !canCheckout();
}

renderProducts();
renderCart();

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-id]");
  if (!button) return;

  const id = button.dataset.id;
  const change = Number(button.dataset.change);
  cart[id] = Math.max(0, (cart[id] || 0) + change);
  renderCart();
});

document.querySelectorAll("input, textarea").forEach((input) => {
  input.addEventListener("input", renderCart);
});

orderForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  if (!canCheckout()) return;

  await navigator.clipboard.writeText(orderSummary());
  copyStatus.hidden = false;
  window.setTimeout(() => {
    copyStatus.hidden = true;
  }, 2500);
});
