const btn = document.getElementById("toggleBtn");
const searchInput = document.getElementById("search");
const form = document.getElementById("checkoutForm");
const name = document.getElementById("name").value.trim();
const email = document.getElementById("email").value.trim();
const message = document.getElementById("message").value.trim();


// Dark Mood 
if (localStorage.getItem("mode") === "dark") {
    document.body.classList.add("dark");
}

btn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("mode", "dark");
    } else {
        localStorage.setItem("mode", "light");
    }
});



//  LOAD PAGE
document.addEventListener("DOMContentLoaded", () => {


    // SIMPLE SEARCH

    if (searchInput) {
        searchInput.addEventListener("input", function (e) {
            const value = e.target.value.toLowerCase();
            const cards = document.querySelectorAll(".card");

            cards.forEach(card => {
                const title = card.querySelector("h5")?.innerText.toLowerCase();

                if (title.includes(value)) {
                    card.parentElement.style.display = "block";
                } else {
                    card.parentElement.style.display = "none";
                }
            });
        });
    }

});




// PRODUCTS
let products = [
    // Dior
    { id: 1, name: "Dior", price: 7200, image: "./images/1.jpg" },
    { id: 2, name: "Dior", price: 7300, image: "./images/2.jpeg" },
    { id: 3, name: "Dior", price: 7100, image: "./images/3.png" },
    { id: 4, name: "Dior", price: 7400, image: "./images/4.jpg" },

    // Chanel
    { id: 5, name: "Chanel", price: 5800, image: "./images/5.jpg" },
    { id: 6, name: "Chanel", price: 5900, image: "./images/6.jpg" },
    { id: 7, name: "Chanel", price: 6400, image: "./images/7.jpg" },
    { id: 8, name: "Chanel", price: 7900, image: "./images/8.jpg" },

    // Louis Vuitton
    { id: 9, name: "Louis Vuitton", price: 6200, image: "./images/9.jpg" },
    { id: 10, name: "Louis Vuitton", price: 6700, image: "./images/10.jpeg" },
    { id: 11, name: "Louis Vuitton", price: 7300, image: "./images/11.png" },
    { id: 12, name: "Louis Vuitton", price: 6400, image: "./images/12.jpg" },

    // Gucci
    { id: 13, name: "Gucci", price: 8150, image: "./images/13.jpg" },
    { id: 14, name: "Gucci", price: 7000, image: "./images/14.jpg" },
    { id: 15, name: "Gucci", price: 6050, image: "./images/15.jpg" },
    { id: 16, name: "Gucci", price: 7200, image: "./images/16.jpg" }
];

let cart = [];

// Display Products
function displayProducts(list) {
    const container = document.getElementById("productList");
    container.innerHTML = "";

    list.forEach(p => {
        container.innerHTML += `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <img src="${p.image}" class="img-fluid">
            <h5>${p.name}</h5>
            <p>$${p.price}</p>
            <button onclick="addToCart(${p.id})">Buy</button>
        </div>
      </div>
      `;
    });
}

displayProducts(products);


// Add to CART
function addToCart(id) {
    const product = products.find(p => p.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }

    updateCart();
}

function updateCart() {
    const cartList = document.getElementById("cartList");
    const totalSpan = document.getElementById("total");

    cartList.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
        total += item.price * item.qty;

        cartList.innerHTML += `
            <li class="list-group-item">
                ${item.name} - $${item.price} × ${item.qty}

                <button onclick="increase(${item.id})">+</button>
                <button onclick="decrease(${item.id})">-</button>
                <button onclick="removeItem(${item.id})">Remove</button>
            </li>
            `;
    });

    totalSpan.innerText = total;
}

// افزایش تعداد
function increase(id) {
    const item = cart.find(i => i.id === id);
    item.qty++;
    updateCart();
}

// کاهش تعداد
function decrease(id) {
    const item = cart.find(i => i.id === id);
    if (item.qty > 1) {
        item.qty--;
    }
    updateCart();
}

// حذف
function removeItem(id) {
    cart = cart.filter(i => i.id !== id);
    updateCart();
}



// FORM VALIDATION

form.addEventListener("submit", function (e) {
    e.preventDefault();

    // ایمیل غلط/ایمیل درست
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (name === "" || email === "" || message === "") {
        alert("❌ Please fill all fields!");
        return;
    }

    if (!emailPattern.test(email)) {
        alert("❌ Invalid email address!");
        return;
    }

    alert("✅ Message sent successfully!");
    form.reset();
});


