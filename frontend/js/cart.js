const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.getElementById("cartItems");
const cartSummary = document.getElementById("cartSummary");
const cartTotal = document.getElementById("cartTotal");
const emptyState = document.getElementById("emptyState");
const checkoutButton = document.getElementById("checkoutButton");
const apiBase = "http://localhost:5000";

if (cartItems) {
	renderCart();
}

async function renderCart() {
	if (cart.length === 0) {
		cartItems.style.display = "none";
		cartSummary.style.display = "none";
		emptyState.style.display = "block";
		emptyState.textContent = "Your cart is empty. Add a few products to continue shopping.";
		return;
	}

	try {
		const response = await fetch(`${apiBase}/products`);
		const products = await response.json();
		const cartProducts = cart
			.map((id) => products.find((item) => item.id === id))
			.filter(Boolean);

		let total = 0;

		cartItems.innerHTML = cartProducts
			.map((product) => {
				total += product.price;
				return `
					<article class="cart-card">
						<div class="cart-item">
							<img src="${product.image}" alt="${product.name}" />
							<div class="info">
								<h3>${product.name}</h3>
								<p>${product.category || "Electronics"}</p>
								<p>Price: ₹${product.price}</p>
							</div>
						</div>
						<div style="text-align:right;">
							<p class="price">₹${product.price}</p>
							<a class="btn secondary" href="product.html?id=${product.id}">View</a>
						</div>
					</article>
				`;
			})
			.join("");

		cartTotal.textContent = total;
		emptyState.style.display = "none";
		cartItems.style.display = "grid";
		cartSummary.style.display = "flex";

		if (checkoutButton) {
			checkoutButton.addEventListener("click", checkout);
		}
	} catch (error) {
		cartItems.innerHTML = "<p style='color:#ef4444;'>Unable to load cart content.</p>";
	}
}

function checkout() {
	fetch(`${apiBase}/orders`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ items: cart }),
	})
		.then((res) => res.json())
		.then((data) => {
			alert(data.message);
			localStorage.removeItem("cart");
			window.location.href = "index.html";
		})
		.catch(() => {
			alert("Unable to place the order right now. Please try again.");
		});
}