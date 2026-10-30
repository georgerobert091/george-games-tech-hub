// ==========================================
// GEORGE GAMES & TECH HUB
// SHARED PRODUCT CATALOGUE SYSTEM
// ==========================================

const WHATSAPP_NUMBER = "2349136059577";

const wa = message =>
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);


// ==========================================
// PAGE DETECTION
// ==========================================

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


// ==========================================
// ELEMENTS
// ==========================================

const container = document.getElementById("products");
const searchBox = document.getElementById("productSearch");

let activeFilter = "all";


// Load products from products.js

let allProducts =
    typeof PRODUCTS !== "undefined" && Array.isArray(PRODUCTS)
        ? [...PRODUCTS]
        : [];


// ==========================================
// SECURITY: HTML ESCAPING
// ==========================================

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}


// ==========================================
// PRODUCT CATEGORY HELPERS
// ==========================================

function getProductCategory(product) {

    if (product.sourceCategory) {
        return String(product.sourceCategory).toLowerCase();
    }

    const name = String(product.name || "").toLowerCase();
    const category = String(product.category || "").toLowerCase();

    if (
        name.includes("storage") ||
        name.includes("upgrade") ||
        name.includes("ssd") ||
        name.includes("ram")
    ) {
        return "storage";
    }

    if (
        category.includes("software") ||
        name.includes("software")
    ) {
        return "software";
    }

    if (
        category.includes("driver") ||
        name.includes("driver")
    ) {
        return "drivers";
    }

    if (
        category === "tech" ||
        category === "accessories" ||
        category === "pc accessories"
    ) {
        return "accessories";
    }

    if (
        category === "games" ||
        category === "game"
    ) {
        return "games";
    }

    return category || "tech";
}


// ==========================================
// CONVERT SUPABASE PRODUCTS
// ==========================================

function convertDatabaseProduct(product) {

    const categoryMap = {
        "Games": "games",
        "PC Accessories": "accessories",
        "Storage & PC Upgrades": "storage",
        "Software": "software",
        "Drivers": "drivers"
    };

    const category =
        categoryMap[product.category] || "accessories";

    const rawPrice = product.price;

    const formattedPrice =
        rawPrice === null ||
        rawPrice === undefined ||
        rawPrice === ""
            ? "Ask for price"
            : Number.isFinite(Number(rawPrice))
                ? "₦" + Number(rawPrice).toLocaleString("en-NG")
                : String(rawPrice);

    return {
        id: "database-" + product.id,
        databaseId: product.id,
        sourceCategory: category,
        category: category,
        name: product.name || "Unnamed Product",
        genre: product.genre || product.category || "Technology",
        icon: category === "games" ? "🎮" : "💻",
        tag: (product.category || "PRODUCT").toUpperCase(),
        price: formattedPrice,
        description: product.description ||
            "Contact us for more information.",
        platforms: "Contact=======================

    const count = document.getElementById("productCount");

    if (count) {
        count.textContent =
            `${matches.length} item${matches.length === 1 ? "" : "s"}`;
    }

}


// ==========================================
// CATEGORY FILTER BUTTONS
// ==========================================

document.querySelectorAll("[data-filter]").forEach(button => {

    button.addEventListener("click", () => {

        document.querySelectorAll("[data-filter]")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");

        activeFilter = button.dataset.filter;

        render();

    });

});


// ==========================================
// SEARCH
// ==========================================

searchBox?.addEventListener("input", render);


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {
    nav?.classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {

    link.addEventListener("click", () => {
        nav?.classList.remove("open");
    });

});


// ==========================================
// CURRENT YEAR
// ==========================================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ==========================================
// INITIALISE CATALOGUE
// ==========================================

render();

loadDatabaseProducts();      button.classList.add("active");

        activeFilter = button.dataset.filter;

        render();

    });

});


// ==========================================
// SEARCH
// ==========================================

searchBox?.addEventListener("input", render);


// ==========================================
// MOBILE NAVIGATION
// ==========================================

const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");

menuBtn?.addEventListener("click", () => {

    nav?.classList.toggle("open");

});

document.querySelectorAll("#nav a").forEach(link => {

    link.addEventListener("click", () => {

        nav?.classList.remove("open");

    });

});


// ==========================================
// CURRENT YEAR
// ==========================================

const year = document.getElementById("year");

if (year) {
    year.textContent = new Date().getFullYear();
}


// ==========================================
// INITIALISE CATALOGUE
// ==========================================

render();

loadDatabaseProducts();
