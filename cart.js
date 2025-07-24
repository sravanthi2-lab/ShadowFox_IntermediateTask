const cartContainer = document.getElementById("cartSummary");
const checkoutForm = document.getElementById("checkoutForm");

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function renderCart() {
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty. <a href='index.html'>Shop now</a>.</p>";
    checkoutForm.style.display = "none";
    return;
  }

  let total = 0;
  cartContainer.innerHTML = "<h2>Your Items</h2>";

  const list = document.createElement("ul");
  list.className = "cart-list";

  cart.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const li = document.createElement("li");
    li.innerHTML = `
      <strong>${item.name}</strong> — $${item.price} × ${item.quantity}
      <span class="item-total">= $${itemTotal}</span>
    `;
    list.appendChild(li);
  });

  cartContainer.appendChild(list);

  const totalEl = document.createElement("p");
  totalEl.className = "cart-total";
  totalEl.innerHTML = `<strong>Total: $${total}</strong>`;
  cartContainer.appendChild(totalEl);
}

checkoutForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const formData = new FormData(checkoutForm);
  const orderDetails = {
    name: formData.get("name"),
    email: formData.get("email"),
    address: formData.get("address"),
    phone: formData.get("phone"),
    items: cart,
  };

  // Simulate order processing
  console.log("Order submitted:", orderDetails);

  alert("Thank you for your order, " + orderDetails.name + "!");
  localStorage.removeItem("cart");
  window.location.href = "index.html";
});

renderCart();

