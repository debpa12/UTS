function toggleMenu() {
    const menu = document.getElementById('popup-menu');
    if (menu.style.display === 'block') {
        menu.style.display = 'none';
    } else {
        menu.style.display = 'block';
    }
}

function changeProductImage(imgElement, images) {
    let currentSrc = imgElement.src;
    imgElement.src = currentSrc.includes(images[0]) ? images[1] : images[0];
}

let cart = {}; // Menyimpan item dan jumlahnya

function addToCart(price, stockId, productId) {
    const stockElement = document.getElementById(stockId);
    let stock = parseInt(stockElement.innerText);

    // Cek apakah stok tersedia
    if (stock > 0) {
        stock -= 1;
        stockElement.innerText = stock;

        // Tambahkan ke keranjang
        if (!cart[productId]) {
            cart[productId] = { price: price, quantity: 1, stockId: stockId };
        } else {
            cart[productId].quantity += 1;
        }
        updateCartDisplay();
        updateTotalPrice();
    } else {
        alert("Stok habis untuk produk ini!");
    }
}

function removeFromCart(productId) {
    const item = cart[productId];
    if (item) {
        const stockElement = document.getElementById(item.stockId);
        let stock = parseInt(stockElement.innerText);

        // Kembalikan stok dan kurangi jumlah di keranjang
        item.quantity -= 1;
        stock += 1;
        stockElement.innerText = stock;

        if (item.quantity <= 0) {
            delete cart[productId];
        }

        updateCartDisplay();
        updateTotalPrice();
    }
}

function updateCartDisplay() {
    const cartItemsElement = document.getElementById("cart-items");
    cartItemsElement.innerHTML = ''; // Bersihkan daftar keranjang

    for (let productId in cart) {
        const item = cart[productId];
        const cartItemElement = document.createElement("div");
        cartItemElement.className = "cart-item";
        cartItemElement.innerHTML = `
            <p>${productId} - Rp ${item.price.toLocaleString('id-ID')} x ${item.quantity}</p>
            <button onclick="addToCart(${item.price}, '${item.stockId}', '${productId}')">+</button>
            <button onclick="removeFromCart('${productId}')">−</button>
        `;
        cartItemsElement.appendChild(cartItemElement);
    }
}

function updateTotalPrice() {
    const totalPriceElement = document.getElementById("total-price");
    let total = 0;

    for (let productId in cart) {
        const item = cart[productId];
        total += item.price * item.quantity;
    }

    totalPriceElement.innerText = total.toLocaleString('id-ID');
}



function validateForm() {
    const email = document.getElementById('email').value;
    if (!email) {
        alert("Silakan masukkan email yang valid.");
        return false;
    }
    alert("Pesan berhasil dikirim!");
    return true;
}

function openContactForm() {
    const contactForm = document.getElementById('contact-form-popup');
    contactForm.style.display = 'flex';
}

function closeContactForm() {
    const contactForm = document.getElementById('contact-form-popup');
    contactForm.style.display = 'none';
}

// Array berisi warna-warna yang akan digunakan untuk background
const colors = ["#FF5733", "#FFC300", "#DAF7A6", "#900C3F", "#581845", "#33FF57"];
let currentColorIndex = 0;

function changeBackgroundColor() {
    const h2Element = document.querySelector("h2");
    h2Element.style.background = `linear-gradient(45deg, ${colors[currentColorIndex]}, ${colors[(currentColorIndex + 1) % colors.length]})`;
    
    // Pindah ke warna berikutnya
    currentColorIndex = (currentColorIndex + 1) % colors.length;
}

// Panggil fungsi setiap 3 detik untuk mengubah warna
setInterval(changeBackgroundColor, 3000);
