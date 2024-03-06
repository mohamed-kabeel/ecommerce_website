// **Product Data (Replace with actual product data)**
const productCategories = [
    {
        name: "lcd",
        products: [
            { name: "digtal_lcd", price: 20, image: "images/lcd/[HKT104ATA.C] HKT104ATA-C LCD 10.jpeg" },
            { name: "hmi", price: 30, image: "images/lcd/[HMI.jpeg" },
            {name: "kit touch", price: 40, image: "images/lcd/[KIT.TOUCH.jpeg" },
            {name: "lmt lcd", price: 15, image: "images/lcd/[LMT070DAMFWA.NFD] LMT070DAMFWA-NFD LCD 7.jpeg" },

            // Add more products
        ],
    },
    {
        name: "elctronics component",
        products: [
            { name: "capacitor", price: 1, image: "images/electonics component/[C.jpeg" },
            { name: "resistors", price: 49.99, image: "images/electonics component/[CARBON0.25W.jpeg" },
            { name: "pic", price: 49.99, image: "images/electonics component/[PIC18F87K22.jpeg" },
            // Add more products
        ],
       
    },
    {
    name: "raspberrypi boards",
    products: [
        { name: "sensors kit", price: 1, image: "images/raspberrypi boards/[KIT.SENSOR.24IN1.jpeg" },
        { name: "raspberrypi pico", price: 49.99, image: "images/raspberrypi boards/[RPI.PICO.jpeg" },
        { name: "raspberrypi 4B", price: 49.99, image: "images/raspberrypi boards/[RPI4.BOARD.jpeg" },
        // Add more products
    ],
    // Add more categories
}
];

// **DOM Elements**
const searchInput = document.getElementById("search-input");
const categoriesList = document.getElementById("product-categories-list");
const categoriesButtons = document.getElementById("categories-buttons");

// **Function to generate product list HTML**
function generateProductList(products) {
    const productsHTML = products.map(product => `
        <div class="product">
            <a href="#">
                <img src="${product.image}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>$${product.price.toFixed(2)}</p>
            </a>
        </div>
    `).join('');

    return productsHTML;
}

// **Function to generate product list HTML with rows**
function generateProductListWithRows(products) {
    let rowsHTML = '';
    for (let i = 0; i < products.length; i += 4) {
        const rowProducts = products.slice(i, i + 4);
        const rowHTML = `<div class="row">${generateProductList(rowProducts)}</div>`;
        rowsHTML += rowHTML;
    }
    return rowsHTML;
}

// **Function to display product categories**
function displayProductCategories(categories) {
    const html = categories.map(category => `
        <li>
            <h3>${category.name}</h3>
            ${generateProductList(category.products)}
        </li>
    `).join('');
    categoriesList.innerHTML = html;
}

// **Function to display product categories with rows**
function displayProductCategoriesWithRows(categories) {
    const html = categories.map(category => `
        <li>
            <h3>${category.name}</h3>
            ${generateProductListWithRows(category.products)}
        </li>
    `).join('');
    categoriesList.innerHTML = html;
}

// **Function to filter products by category**
function filterProductsByCategory(categoryName) {
    const category = productCategories.find(cat => cat.name === categoryName);
    if (category) {
        displayProductCategories([category]);
    } else {
        categoriesList.innerHTML = "<li>No products found.</li>";
    }
}

// **Function to filter products by category and display with rows**
function filterProductsByCategoryWithRows(categoryName) {
    const category = productCategories.find(cat => cat.name === categoryName);
    if (category) {
        displayProductCategoriesWithRows([category]);
    } else {
        categoriesList.innerHTML = "<li>No products found.</li>";
    }
}

// **Event listener for category buttons**
categoriesButtons.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
        const categoryName = event.target.textContent;
        filterProductsByCategoryWithRows(categoryName);
    }
});

// **Search Functionality**
function filterProducts(searchTerm) {
    const filteredCategories = productCategories.map(category => {
        return {
            name: category.name,
            products: category.products.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
        };
    }).filter(category => category.products.length > 0);

    displayProductCategories(filteredCategories);
}

searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.trim();
    filterProducts(searchTerm);
});

// Initial display of all products
displayProductCategoriesWithRows(productCategories);

// **Function to generate category buttons**
function generateCategoryButtons(categories) {
    const buttonsHTML = categories.map(category => `
        <button>${category.name}</button>
    `).join('');
    categoriesButtons.innerHTML = buttonsHTML;

    // Add event listeners to category buttons
    categoriesButtons.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', () => {
            filterProductsByCategoryWithRows(button.textContent);
        });
    });
}

// Generate category buttons on page load
generateCategoryButtons(productCategories);
