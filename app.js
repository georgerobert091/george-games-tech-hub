/* =========================================
   GEORGE GAMES & TECH HUB
   PRODUCT CATALOGUE SYSTEM
========================================= */

const WHATSAPP_NUMBER = "2349136059577";

const whatsappLink = (message) =>
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);


/* =========================================
   PAGE CATEGORY DETECTION
========================================= */

const pageName = window.location.pathname
    .split("/")
    .pop()
    .toLowerCase();

const pageCategories = {
    "games.html": "games",
    "accessories.html": "accessories",
    "storage.html": "storage",
    "software.html": "software",
    "drivers.html": "drivers"
};

const currentPage = pageCategories[pageName] || "all";


/* =========================================
   PAGE ELEMENTS
========================================= */

const container = document.getElementById("products");
const searchBox = document.getElementById("productSearch");
const productCount = document.getElementById("productCount");

let activeFilter = "all";
let allProducts = [];

const staticProducts =
    typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS)
        ? [...PRODUCTS]
        : [];


/* =========================================
   CATEGORY CONVERSION
========================================= */

function normaliseCategory(value) {
    return String(value || "")
        .toLowerCase()
        .trim();
}

function getProductCategory(product) {
    const category = normaliseCategory(
        product.sourceCategory || product.category
    );

    const name = normaliseCategory(product.name);

    if (
        category === "games" ||
        category === "game"
    ) {
        return "games";
    }

    if (
        category === "pc accessories" ||
        category === "accessories" ||
        category === "tech accessories"
    ) {
        return "accessories";
    }

    if (
        category === "storage & pc upgrades" ||
        category === "storage" ||
        category === "pc upgrades"
    ) {
        return "storage";
    }

    if (
        category === "software" ||
        category === "productivity software"
    ) {
        return "software";
    }

    if (
        category === "drivers" ||
        category === "driver"
    ) {
        return "drivers";
    }

    // Handle older static product categories.

    if (category === "tech") {
        if (
            name.includes("storage") ||
            name.includes("upgrade") ||
            name.includes("ssd") ||
            name.includes("ram")
        ) {
            return "storage";
        }

        return "accessories";
    }

    if (category === "software") return "software";
    if (category === "drivers") return "drivers";

    return "games";
}


/* =========================================
   CONVERT DATABASE PRODUCTS
========================================= */

function convertDatabaseProduct(product) {
    return {
        id: product.id,
        databaseId: product.id,

        name: product.name || "Unnamed product",

        category: getProductCategory({
            category: product.category,
            name: product.name
        }),

        sourceCategory: product.category || "",

        genre: product.genre || product.category || "General",

        icon: "🎮",

        tag: product.category || "PRODUCT",

        price: formatPrice(product.price),

        description:
            product.description ||
            "Contact us for more information about this product.",

        platforms: "Contact us for compatibility details.",

        image: product.image_url || "",

        imageAlt: product.name || "Product image"
    };
}


/* =========================================
   PRICE FORMATTING
========================================= */

function formatPrice(price) {
    if (price === null || price === undefined || price === "") {
        return "Ask for price";
    }

    const value = String(price).trim();

    if (value.includes("₦")) {
        return value;
    }

    if (isNaN(Number(value.replace(/,/g, "")))) {
        return value;
    }

    return "₦" + Number(value.replace(/,/g, "")).toLocaleString("en-NG");
}


/* =========================================
   ESCAPE HTML
========================================= */

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, character => {
        const replacements = {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#039;"
        };

        return replacements[character];
    });
}


/* =========================================
   LOAD DATABASE PRODUCTS
========================================= */

async function loadDatabaseProducts() {
    let databaseProducts = [];

    try {
        if (
            typeof supabaseClient !== "undefined" &&
            supabaseClient
        ) {
            const { data, error } = await supabaseClient
                .from("Products")
                .select("*")
                .order("id", { ascending: false });

            if (error) {
                console.error("Supabase error:", error);
            } else if (Array.isArray(data)) {
                databaseProducts = data.map(
                    convertDatabaseProduct
                );
            }
        } else {
            console.warn("Supabase client was not found.");
        }
    } catch (error) {
        console.error("Could not load database products:", error);
    }

    // Database products take priority when names match.

    const combinedProducts = [...staticProducts];

    databaseProducts.forEach(databaseProduct => {
        const existingIndex = combinedProducts.findIndex(
            item =>
                normaliseCategory(item.name) ===
                normaliseCategory(databaseProduct.name)
        );

        if (existingIndex >= 0) {
            combinedProducts[existingIndex] = databaseProduct;
        } else {
            combinedProducts.push(databaseProduct);
        }
    });

    allProducts = combinedProducts.map(product => ({
        ...product,
        category: getProductCategory(product)
    }));

    renderProducts();
}


/* =========================================
   FILTER PRODUCTS
========================================= */

function getFilteredProducts() {
    const searchTerm = searchBox
        ? searchBox.value.toLowerCase().trim()
        : "";

    return allProducts.filter(product => {
        const categoryMatches =
            currentPage === "all" ||
            product.category === currentPage;

        const filterMatches =
            activeFilter === "all" ||
            normaliseCategory(product.genre) ===
                normaliseCategory(activeFilter);

        const searchMatches =
            !searchTerm ||
            [
                product.name,
                product.description,
                product.genre,
                product.category,
                product.tag
            ]
            .join(" ")
            .toLowerCase()
            .includes(searchTerm);

        return (
            categoryMatches &&
            filterMatches &&
            searchMatches
        );
    });
}


/* =========================================
   DISPLAY PRODUCT CARDS
========================================= */

function createProductCard(product) {
    const name = escapeHTML(product.name);
    const description = escapeHTML(product.description);
    const price = escapeHTML(product.price);
    const genre = escapeHTML(product.genre);
    const tag = escapeHTML(product.tag);
    const platforms = escapeHTML(product.platforms);
    const icon = escapeHTML(product.icon || "🎮");
    const image = escapeHTML(product.image || "");
    const imageAlt = escapeHTML(product.imageAlt || product.name);

    const message =
        "Hello George Games & Tech Hub! I am interested in: " +
        product.name +
        ". Please provide more information.";

    const orderLink = whatsappLink(message);

    const imageHTML = image
        ? `
            <div class="productImage">
                <img
                    src="${image}"
                    alt="${imageAlt}"
                    loading="lazy"
                    onerror="
                        this.style.display='none';
                        this.parentElement.classList.add('imageMissing');
                    "
                >
                <div class="imageFallback">${icon}</div>
            </div>
        `
        : `
            <div class="productImage imageMissing">
                <div class="imageFallback">${icon}</div>
            </div>
        `;

    return `
        <article class="card productCard">

            ${imageHTML}

            <div class="productInfo">

                <div class="cardTop">
                    <span class="icon">${icon}</span>
                    <span class="tag">${tag}</span>
                </div>

                <h3>${name}</h3>

                <span class="genre">${genre}</span>

                <p>${description}</p>

                <div class="platforms">
                    ${platforms}
                </div>

                <div class="cardBottom">
                    <span class="price">${price}</span>

                    <a
                        class="ask"
                        href="${orderLink}"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        ENQUIRE ON WHATSAPP
                    </a>
                </div>

            </div>
        </article>
    `;
}


/* =========================================
   RENDER PRODUCTS
========================================= */

function renderProducts() {
    if (!container) return;

    const products = getFilteredProducts();

    if (productCount) {
        productCount.textContent =
            `${products.length} item${products.length === 1 ? "" : "s"}`;
    }

    if (products.length === 0) {
        container.innerHTML = `
            <div class="noResults">
                No products found. Try another search or filter.
            </div>
        `;

        return;
    }

    container.innerHTML = products
        .map(createProductCard)
        .join("");
}


/* =========================================
   FILTER BUTTONS
========================================= */

document.querySelectorAll(".filters button").forEach(button => {
    button.addEventListener("click", () => {

        document.querySelectorAll(".filters button")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        activeFilter = button.dataset.filter || "all";

        renderProducts();
    });
});


/* =========================================
   SEARCH
========================================= */

if (searchBox) {
    searchBox.addEventListener("input", renderProducts);
}


/* =========================================
   MOBILE NAVIGATION
========================================= */

const menuButton = document.getElementById("menuBtn");
const navigation = document.querySelector(".header nav");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        navigation.classList.toggle("open");
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("open");
        });
    });
}


/* =========================================
   FOOTER YEAR
========================================= */

document.querySelectorAll(".year").forEach(element => {
    element.textContent = new Date().getFullYear();
});


/* =========================================
   START CATALOGUE
========================================= */

if (container) {
    container.innerHTML = `
        <div class="noResults">
            Loading catalogue...
        </div>
    `;

    loadDatabaseProducts();
}
