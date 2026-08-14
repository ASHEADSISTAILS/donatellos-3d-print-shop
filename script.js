const products = [
  {
    id: "dragon",
    name: "Mini Flexi Dragon",
    price: 5,
    time: "1-2 days",
    description: "A poseable desk toy with a smooth, flexible body.",
    finish: "Rainbow, blue, black, or mystery color",
  },
  {
    id: "keychain",
    name: "Custom Name Keychain",
    price: 3,
    time: "1 day",
    description: "Personalized with a first name, team name, or short word.",
    finish: "Single-color PLA",
  },
  {
    id: "bookmark",
    name: "Book Buddy Bookmark",
    price: 2,
    time: "Same or next day",
    description: "A lightweight bookmark with a fun topper for school books.",
    finish: "Bright colors available",
  },
  {
    id: "fidget",
    name: "Click Fidget Slider",
    price: 4,
    time: "1-2 days",
    description: "Pocket-size tactile slider for busy hands.",
    finish: "Matte PLA with printed texture",
  },
  {
    id: "stand",
    name: "Phone Stand",
    price: 5,
    time: "1-2 days",
    description: "Simple angled stand for a phone or small tablet.",
    finish: "Black, white, gray, or school colors",
  },
  {
    id: "token",
    name: "Bag Tag or Backpack Charm",
    price: 1,
    time: "Same or next day",
    description: "Small charm for backpacks, sports bags, or lunch boxes.",
    finish: "Ask for initials, number, or icon",
  },
];

const localZips = new Set([
  "28115",
  "28117",
  "28677",
  "28036",
  "28037",
  "28031",
  "28078",
  "28166",
  "27013",
]);

const cart = {};
const productGrid = document.querySelector("#productGrid");
const cartItems = document.querySelector("#cartItems");
const subtotal = document.querySelector("#subtotal");
const zip = document.querySelector("#zip");
const localStatus = document.querySelector("#localStatus");
const orderForm = document.querySelector("#orderForm");
const copyButton = document.querySelector("#copyButton");
const copyStatus = document.querySelector("#copyStatus");
const emailLink = document.querySelector("#emailLink");

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

function deliveryValue() {
  return document.querySelector("input[name='delivery']:checked").value;
}

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div>
            <div class="product-topline">
              <h3>${product.name}</h3>
              <span>${money(product.price)}</span>
            </div>
            <p>${product.description}</p>
          </div>
          <dl>
            <div>
              <dt>Finish</dt>
              <dd>${product.finish}</dd>
            </div>
            <div>
              <dt>Ready</dt>
              <dd>${product.time}</dd>
            </div>
          </dl>
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
    items.map((item) => `${item.quantity} x ${item.name} - $${item.price}`).join("\n") ||
    "No items selected";
  const itemSubtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryLine =
    deliveryValue() === "local"
      ? "Local porch delivery near Cottle Creek Elementary / Hampshire subdivision"
      : "USPS shipping quote needed before final payment";

  return [
    "New 3D print order",
    "",
    `Name: ${formValue("#customerName")}`,
    `Phone/email: ${formValue("#contact")}`,
    `Address: ${formValue("#address")}`,
    `ZIP: ${formValue("#zip").slice(0, 5)}`,
    `Delivery: ${deliveryLine}`,
    "",
    "Items:",
    productLines,
    "",
    `Estimated item subtotal: ${money(itemSubtotal)}`,
    "Shipping: to be confirmed if USPS is selected",
    "",
    `Notes: ${formValue("#notes") || "None"}`,
  ].join("\n");
}

function canCheckout() {
  return (
    selectedItems().length > 0 &&
    formValue("#customerName") &&
    formValue("#contact") &&
    formValue("#address") &&
    formValue("#zip").length >= 5
  );
}

function updateLocalStatus() {
  const cleanedZip = formValue("#zip").slice(0, 5);
  if (cleanedZip.length < 5) {
    localStatus.textContent = "Enter a ZIP code to check local delivery.";
  } else if (localZips.has(cleanedZip)) {
    localStatus.textContent =
      "Likely local delivery range. We will confirm the porch drop-off time.";
  } else {
    localStatus.textContent =
      "Probably outside the 30-minute delivery range. Choose USPS shipping.";
  }
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
    : "<p>No prints selected yet.</p>";

  subtotal.textContent = money(itemSubtotal);
  copyButton.disabled = !canCheckout();

  if (canCheckout()) {
    emailLink.classList.remove("disabled");
    emailLink.href = `mailto:your-email@example.com?subject=3D%20Print%20Order&body=${encodeURIComponent(orderSummary())}`;
  } else {
    emailLink.classList.add("disabled");
    emailLink.href = "#checkout";
  }
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
  input.addEventListener("input", () => {
    updateLocalStatus();
    renderCart();
  });
  input.addEventListener("change", renderCart);
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
