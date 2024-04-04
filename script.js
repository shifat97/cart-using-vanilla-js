const data = [
    {
        id: 1,
        name: "Beanie Hat",
        image: "./images/cap1.jpg",
        price: 19.99
    },
    {
        id: 2,
        name: "Baseball Cap",
        image: "./images/cap2.jpg",
        price: 24.99
    },
    {
        id: 3,
        name: "Sun Hat",
        image: "./images/cap3.jpg",
        price: 29.99
    },
    {
        id: 4,
        name: "Headband",
        image: "./images/cap4.jpg",
        price: 14.99
    },
    {
        id: 5,
        name: "Fedora Hat",
        image: "./images/cap5.jpg",
        price: 39.99
    },
    {
        id: 6,
        name: "Visor",
        image: "./images/cap6.jpg",
        price: 17.99
    },
    {
        id: 7,
        name: "Bucket Hat",
        image: "./images/cap7.jpg",
        price: 34.99
    },
    {
        id: 8,
        name: "Cowboy Hat",
        image: "./images/cap8.jpg",
        price: 44.99
    },
    {
        id: 9,
        name: "Fascinator",
        image: "./images/cap9.jpg",
        price: 49.99
    },
    {
        id: 10,
        name: "Pork Pie Hat",
        image: "./images/cap10.jpg",
        price: 54.99
    }
]

const cartButton = document.querySelector('.cart');
const asideCart = document.querySelector('aside');
const cartCloseButton = document.querySelector('.btn-close');
const cardsContainer = document.getElementById('cards-container');
const cartItem = document.getElementById('cart-items');
let addedItems = [];

cartButton.addEventListener('click', function () {
    asideCart.classList.add('show-aside')
})

cartCloseButton.addEventListener('click', function () {
    asideCart.classList.remove('show-aside');
})

for (let product of data) {
    let card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
    <div class="card-image">
        <img height="350" src="${product.image}" alt="">
    </div>
    <h3 class="card-title">${product.name}</h3>
    <p class="card-price">${product.price}</p>
    <button class="add-cart">Add To Cart</button>
    `
    cardsContainer.appendChild(card);

    const addCartButton = card.querySelector('.add-cart');
    addCartButton.addEventListener('click', function () {
        addToCart(product);
    })
}

function addToCart(product) {
    // Check if the product is already in the cart
    const alreadyInCart = addedItems.find(item => item.id === product.id);

    if (alreadyInCart) {
        const priceElement = document.querySelector(`.cart-cards-container[data-id="${product.id}"] .product-price`);
        const currentPrice = parseFloat(priceElement.textContent);
        priceElement.textContent = currentPrice + parseFloat(product.price);

        // If the item is already in the cart, increment the quantity
        const quantityElement = document.querySelector(`.cart-cards-container[data-id="${product.id}"] .quantity`);
        const currentQuantity = parseInt(quantityElement.textContent);
        quantityElement.textContent = currentQuantity + 1;
        alert('Quantity updated in cart');
        return;
    }

    // Add the product to the cart with quantity 1
    addedItems.push(product);

    // Create HTML for the cart item
    const cartItemHTML = `
        <div class="cart-cards-container" data-id="${product.id}">
            <img height="60" width="60" src="${product.image}" alt="">
            <p>${product.name}</p>
            <p class="product-price">${product.price}</p>
            <div class="add-more">
                <button class="decrease" onclick="decreaseItem(${product.id})">-</button>
                <span class="quantity">1</span>
                <button class="increase" onclick="increaseItem(${product.id})">+</button>
            </div>
        </div>
    `;

    // Append the cart item HTML to the cart
    cartItem.insertAdjacentHTML('beforeend', cartItemHTML);

    // Display a success message
    alert('Item added to cart');
}

function increaseItem(productId) {
    for (let product of addedItems) {
        if (product.id === productId) {
            // If the item is already in the cart, increment the quantity
            const quantityElement = document.querySelector(`.cart-cards-container[data-id="${productId}"] .quantity`);
            const currentQuantity = parseInt(quantityElement.textContent);
            const updateQuantity = currentQuantity + 1;
            if (updateQuantity > 5) {
                alert('Can not add more than 5 item.');
                return
            }
            quantityElement.textContent = updateQuantity;

            const priceElement = document.querySelector(`.cart-cards-container[data-id="${productId}"] .product-price`);
            const currentPrice = parseFloat(priceElement.textContent);
            priceElement.textContent = (currentPrice + parseFloat(product.price)).toFixed(2);
            return;
        }
    }
}

function decreaseItem(productId) {
    for (let product of addedItems) {
        if (product.id === productId) {
            // If the item is already in the cart, increment the quantity
            const quantityElement = document.querySelector(`.cart-cards-container[data-id="${productId}"] .quantity`);
            const currentQuantity = parseInt(quantityElement.textContent);
            const updateQuantity = currentQuantity - 1;
            if (updateQuantity == 0) {
                return;
            }
            quantityElement.textContent = updateQuantity;

            const priceElement = document.querySelector(`.cart-cards-container[data-id="${productId}"] .product-price`);
            const currentPrice = parseFloat(priceElement.textContent);
            priceElement.textContent = (currentPrice - parseFloat(product.price)).toFixed(2);
            return;
        }
    }
}