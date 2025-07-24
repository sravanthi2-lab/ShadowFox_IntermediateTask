const products = [
  { id: 1, name: "T-Shirt", price: 20, category: "clothing", image: "tshirt.jpg" },
  { id: 2, name: "Jeans", price: 50, category: "clothing", image: "jeans.jpg" },
  { id: 3, name: "Laptop", price: 400, category: "electronics", image: "laptop.jpg" },
  { id: 4, name: "Headphones", price: 100, category: "electronics", image: "headphones.jpg" },
  { id: 5, name: "Sneakers", price: 80, category: "clothing", image: "sneakers.jpg" },
  { id: 6, name: "Smartphone", price: 300, category: "electronics", image: "smartphone.jpg" }
];

const productList = document.getElementById("productList");
const priceFilter = document.getElementById("priceFilter");
const categoryFilter = document.getElementById("categoryFilter");
const sortOption = document.getElementById("sortOption");
const cartCount = document.getElementById("cartCount");
const priceValue = document.getElementById("priceValue");

function renderProducts(filteredProducts) {
  productList.innerHTML = "";
  if (filteredProducts.length === 0) {
    productList.innerHTML = "<p>No products found.</p>";
    return;
  }
  filteredProducts.forEach(product => {
    const card = document.createElement("div");
    card.className = "product";
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-img">
      <h3>${product.name}</h3>
      <p>Category: ${product.category}</p>
      <p>Price: $${product.price}</p>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
    productList.appendChild(card);
  });
}

function filterAndSortProducts() {
  let filtered = [...products];
  const maxPrice = parseInt(priceFilter.value);
  const selectedCategory = categoryFilter.value;
  const sort = sortOption.value;

  filtered = filtered.filter(p => p.price <= maxPrice);
  if (selectedCategory) filtered = filtered.filter(p => p.category === selectedCategory);
  if (sort === "priceLow") filtered.sort((a, b) => a.price - b.price);
  else if (sort === "priceHigh") filtered.sort((a, b) => b.price - a.price);

  renderProducts(filtered);
}

function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const product = products.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) existingItem.quantity += 1;
  else cart.push({ ...product, quantity: 1 });

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  alert(`${product.name} added to cart!`);
}

function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = `Cart: ${totalItems} item${totalItems !== 1 ? "s" : ""}`;
  cartCount.href = "cart.html";
}

priceFilter.addEventListener("input", () => {
  priceValue.textContent = `$${priceFilter.value}`;
  filterAndSortProducts();
});
categoryFilter.addEventListener("change", filterAndSortProducts);
sortOption.addEventListener("change", filterAndSortProducts);

filterAndSortProducts();
updateCartCount();


