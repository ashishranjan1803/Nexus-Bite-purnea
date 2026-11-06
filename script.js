// Nexus Bite Purnea — demo storefront.
// IMPORTANT: Replace RESTAURANT_WHATSAPP with your WhatsApp number in international format,
// digits only (India: 91 + 10-digit mobile number), before publishing.
const RESTAURANT_WHATSAPP = "918227040620"; // Example format: "919876543210"

const menuItems = [
  {id:1,name:"Nexus Smash Burger",category:"Burgers",price:189,label:"HOUSE FAVOURITE",description:"Juicy burger, crisp lettuce, cheese & our signature sauce.",image:"https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=700&q=80"},
  {id:2,name:"Classic Cheese Pizza",category:"Pizza",price:249,label:"CHEESY GOODNESS",description:"Golden crust, rich tomato sauce and loads of melted cheese.",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80"},
  {id:3,name:"Chilli Garlic Momos",category:"Momos",price:129,label:"SPICY PICK",description:"Soft dumplings tossed in a punchy chilli-garlic sauce.",image:"https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&w=700&q=80"},
  {id:4,name:"Loaded Masala Fries",category:"Sides",price:99,label:"CRUNCH TIME",description:"Crispy fries dusted with house masala and herbs.",image:"https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=700&q=80"},
  {id:5,name:"Double Cheese Burger",category:"Burgers",price:229,label:"EXTRA CHEESY",description:"Double cheese, fresh veggies and a satisfying toasted bun.",image:"https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=700&q=80"},
  {id:6,name:"Farmhouse Pizza",category:"Pizza",price:279,label:"VEGGIE LOADED",description:"A colourful mix of veggies, herbs and stretchy cheese.",image:"https://images.unsplash.com/photo-1571407970349-bc81e7e96d47?auto=format&fit=crop&w=700&q=80"},
  {id:7,name:"Golden Crispy Momos",category:"Momos",price:139,label:"CRISPY BITE",description:"Crispy golden dumplings served with a flavour-packed dip.",image:"https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=700&q=80"},
  {id:8,name:"Chilled Lemon Cooler",category:"Drinks",price:79,label:"COOL & FRESH",description:"A refreshing citrus cooler for your next food break.",image:"https://images.unsplash.com/photo-1513558161293-cdad9c2f8b6b?auto=format&fit=crop&w=700&q=80"}
];

const cart = new Map();
const menuGrid = document.getElementById("menuGrid");
const cartDrawer = document.getElementById("cartDrawer");
const cartBackdrop = document.getElementById("cartBackdrop");
const cartItems = document.getElementById("cartItems");
const cartFooter = document.getElementById("cartFooter");
const toast = document.getElementById("toast");
let toastTimer;

function money(value) {
  return new Intl.NumberFormat("en-IN", {style:"currency", currency:"INR", maximumFractionDigits:0}).format(value);
}
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2500);
}
function renderMenu(category = "All") {
  const filtered = category === "All" ? menuItems : menuItems.filter(item => item.category === category);
  menuGrid.innerHTML = filtered.map(item => `
    <article class="menu-card">
      <div class="food-photo"><img src="${item.image}" alt="${item.name}" loading="lazy" onerror="this.onerror=null;this.src='https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=700&q=80'"><span class="food-label">${item.label}</span></div>
      <div class="menu-card-content"><div class="menu-card-top"><h3>${item.name}</h3><span class="food-price">${money(item.price)}</span></div>
      <p>${item.description}</p><button class="add-button" data-add="${item.id}">Add to cart <span>＋</span></button></div>
    </article>`).join("");
}
function cartQuantity() {
  return [...cart.values()].reduce((sum, item) => sum + item.quantity, 0);
}
function cartSubtotal() {
  return [...cart.values()].reduce((sum, item) => sum + item.price * item.quantity, 0);
}
function renderCart() {
  const count = cartQuantity();
  document.getElementById("cartCount").textContent = count;
  document.getElementById("cartTitleCount").textContent = `(${count})`;
  if (!count) {
    cartItems.innerHTML = `<div class="empty-cart"><span>✳</span><h3>Your next bite awaits.</h3><p>Add something delicious from the menu.</p><button class="button button-dark" id="browseMenu">Browse menu</button></div>`;
    cartFooter.hidden = true;
    return;
  }
  cartItems.innerHTML = [...cart.values()].map(item => `
    <div class="cart-row"><div><h4>${item.name}</h4><p>${money(item.price)} each</p>
      <div class="quantity-control"><button aria-label="Remove one ${item.name}" data-change="${item.id}" data-delta="-1">−</button><span>${item.quantity}</span><button aria-label="Add one ${item.name}" data-change="${item.id}" data-delta="1">＋</button></div>
    </div><div class="cart-row-price">${money(item.price * item.quantity)}</div></div>`).join("");
  document.getElementById("cartSubtotal").textContent = money(cartSubtotal());
  document.getElementById("checkoutTotal").textContent = money(cartSubtotal());
  cartFooter.hidden = false;
}
function addToCart(id) {
  const product = menuItems.find(item => item.id === Number(id));
  if (!product) return;
  const existing = cart.get(product.id);
  cart.set(product.id, {...product, quantity: existing ? existing.quantity + 1 : 1});
  renderCart();
  showToast(`${product.name} added to cart`);
}
function changeQuantity(id, delta) {
  const item = cart.get(Number(id));
  if (!item) return;
  item.quantity += delta;
  if (item.quantity <= 0) cart.delete(Number(id));
  renderCart();
}
function openCart() {
  cartDrawer.classList.add("open");
  cartBackdrop.classList.add("open");
  cartDrawer.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeCart() {
  cartDrawer.classList.remove("open");
  cartBackdrop.classList.remove("open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
function buildOrderMessage(details = {}) {
  const lines = [...cart.values()].map(item => `• ${item.name} x ${item.quantity} — ${money(item.price * item.quantity)}`);
  lines.push("", `Subtotal: ${money(cartSubtotal())}`);
  if (details.name) lines.push("", `Name: ${details.name}`, `Phone: ${details.phone}`, `Order type: ${details.orderType}`);
  if (details.orderType === "Delivery" && details.address) lines.push(`Address: ${details.address}`);
  if (details.notes) lines.push(`Notes: ${details.notes}`);
  return `Hello Nexus Bite Purnea! I'd like to place an order:\n\n${lines.join("\n")}\n\nPlease confirm availability and final charges.`;
}
function openWhatsApp(message) {
  if (!RESTAURANT_WHATSAPP || !/^\d{10,15}$/.test(RESTAURANT_WHATSAPP)) {
    showToast("Restaurant WhatsApp number not set up yet");
    alert("To enable WhatsApp ordering, open script.js and set RESTAURANT_WHATSAPP to your restaurant number in international format, digits only (for India: 91 followed by your 10-digit number).");
    return;
  }
  window.open(`https://wa.me/${RESTAURANT_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener,noreferrer");
}
document.getElementById("categoryTabs").addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  document.querySelectorAll(".category-tab").forEach(tab => tab.classList.toggle("active", tab === button));
  renderMenu(button.dataset.category);
});
menuGrid.addEventListener("click", event => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});
cartItems.addEventListener("click", event => {
  const change = event.target.closest("[data-change]");
  if (change) changeQuantity(change.dataset.change, Number(change.dataset.delta));
  if (event.target.closest("#browseMenu")) {
    closeCart();
    document.getElementById("menu").scrollIntoView({behavior:"smooth"});
  }
});
document.getElementById("openCart").addEventListener("click", openCart);
document.getElementById("closeCart").addEventListener("click", closeCart);
cartBackdrop.addEventListener("click", closeCart);
document.addEventListener("keydown", event => { if (event.key === "Escape") closeCart(); });
document.getElementById("checkoutButton").addEventListener("click", () => {
  if (!cart.size) return;
  closeCart();
  document.getElementById("checkoutDialog").showModal();
});
document.getElementById("closeCheckout").addEventListener("click", () => document.getElementById("checkoutDialog").close());
document.getElementById("checkoutForm").addEventListener("submit", event => {
  event.preventDefault();
  if (!cart.size) return;
  const form = new FormData(event.currentTarget);
  const details = {
    name: String(form.get("customerName")).trim(),
    phone: String(form.get("customerPhone")).trim(),
    orderType: String(form.get("orderType")),
    address: String(form.get("customerAddress")).trim(),
    notes: String(form.get("orderNotes")).trim()
  };
  if (details.orderType === "Delivery" && !details.address) {
    document.getElementById("customerAddress").setCustomValidity("Please enter your delivery address.");
    document.getElementById("customerAddress").reportValidity();
    document.getElementById("customerAddress").setCustomValidity("");
    return;
  }
  document.getElementById("checkoutDialog").close();
  openWhatsApp(buildOrderMessage(details));
});
document.getElementById("cartWhatsApp").addEventListener("click", () => openWhatsApp(buildOrderMessage()));
document.getElementById("contactWhatsApp").addEventListener("click", () => {
  openWhatsApp("Hello Nexus Bite Purnea! I'd like to know more about your menu and ordering.");
});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));
document.getElementById("year").textContent = new Date().getFullYear();
renderMenu();
renderCart();
