const apiBase = "http://localhost:5000";
const productsDiv = document.getElementById("products");
const productDiv = document.getElementById("product");

if (productsDiv) {
	loadProductList();
}

if (productDiv) {
	loadProductDetail();
}

async function loadProductList() {
	try {
		const response = await fetch(`${apiBase}/products`);
		const products = await response.json();

		productsDiv.innerHTML = products
			.map(
				(product) => `
			<article class="card">
				<img src="${product.image}" alt="${product.name}" />
				<h3>${product.name}</h3>
				<p class="price">₹${product.price}</p>
				<p>${product.description || "Premium product for your lifestyle."}</p>
				<div class="meta">
					<span>${product.category || "Electronics"}</span>
					<span>⭐ ${product.rating || 4.7}</span>
				</div>
				<div style="margin-top: 18px; display:grid; gap:12px;">
					<a class="btn" href="product.html?id=${product.id}">View Details</a>
					<button class="btn" type="button" onclick="addToCart(${product.id})">Add To Cart</button>
				</div>
			</article>
		`
			)
			.join("");
	} catch (error) {
		productsDiv.innerHTML = "<p style='color:#ef4444;'>Unable to load products. Please try again later.</p>";
	}
}

async function loadProductDetail() {
	const params = new URLSearchParams(window.location.search);
	const productId = params.get("id");

	if (!productId) {
		productDiv.innerHTML = "<p class='empty-state'>No product selected.</p>";
		return;
	}

	try {
		const response = await fetch(`${apiBase}/products/${productId}`);

		if (!response.ok) {
			productDiv.innerHTML = "<p class='empty-state'>Product not found.</p>";
			return;
		}

		const product = await response.json();

		productDiv.innerHTML = `
			<div class="product-detail">
				<img src="${product.image}" alt="${product.name}" />
				<div class="detail-info">
					<span class="meta">${product.category || "Electronics"}</span>
					<h2>${product.name}</h2>
					<p class="description">${product.description || "This is a high-quality product designed to elevate your daily experience."}</p>
					<div class="specs">
						<div class="chip">Rating: ⭐ ${product.rating || 4.7}</div>
						<div class="chip">Stock: ${product.stock || 12} units</div>
						<div class="chip">Free shipping</div>
						<div class="chip">Secure payment</div>
					</div>
					<div class="price-block">
						<p class="price">₹${product.price}</p>
						<button class="btn" type="button" onclick="addToCart(${product.id})">Add To Cart</button>
					</div>
				</div>
			</div>
		`;
	} catch (error) {
		productDiv.innerHTML = "<p class='empty-state'>Unable to load this product right now.</p>";
	}
}

function addToCart(id) {
	const cart = JSON.parse(localStorage.getItem("cart")) || [];
	cart.push(id);
	localStorage.setItem("cart", JSON.stringify(cart));
	alert("Product added to cart.");
}