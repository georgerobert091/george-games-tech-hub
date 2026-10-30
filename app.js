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

// Read the global catalogue correctly.
let allProducts = typeof PRODUCTS !== "undefined" &&
    Array.isArray(PRODUCTS)
        ? [...PRODUCTS]
        : [];


// ==========================================
// HTML ESCAPING
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
        return product.sourceCategory;
    }

    const name = String(product.name || "").toLowerCase();

    if (
        name.includes("storage") ||
        name.includes("upgrade") ||
        name.includes("ssd") ||
        name.includes("ram")
    ) {
        return "storage";
    }

    if (
        product.category === "tech" ||
        product.category === "accessories"
    ) {
        return "accessories";
    }

    return product.category || "tech";
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

    const category = categoryMap[product.category] || "accessories";

    return {
        id: "database-" + product.id,
        databaseId: product.id,
        sourceCategory: category,
        category: category,
        name: product.name || "Unnamed Product",
        genre: product.genre || product.category || "Technology",
        icon: category === "games" ? "🎮" : "💻",
        tag: (product.category || "PRODUCT").toUpperCase(),
        price: product.price
            ? (String(product.price).includes("₦")
                ? String(product.price)
                : "₦" + Number(product.price).toLocaleString("en-NG"))
            : "Ask for price",
        description: product.description ||
            "Contact us for more information.",
        platforms: "Contact us for compatibility details",
        image: product.image_url || "",
        imageAlt: product.name || "Product image"
    };
}


// ==========================================
// LOAD DATABASE PRODUCTS
// ==========================================

async function loadDatabaseProducts() {

    if (typeof supabaseClient === "undefined") {
        console.warn("Supabase is not available on this page.");
        render();
        return;
    }

    try {

        const { data, error } = await supabaseClient
            .from("Products")
            .select("*")
            .order("id", { ascending: false });

        if (error) throw error;

        const databaseProducts = (data || [])
            .map(convertDatabaseProduct);

        allProducts = [
            ...databaseProducts,
            ...allProducts
        ];

        render();

    } catch (error) {

        console.error("Could not load products:", error);
        render();

    }
}


// ==========================================
// RENDER PRODUCTS
// ==========================================

function render() {

    if (!container) return;

    const query = (searchBox?.value || "")
        .trim()
        .toLowerCase();

    const matches = allProducts.filter(product => {

        const category = getProductCategory(product);

        const pageMatch =
            currentPage === "all" ||
            category === currentPage;

        const filterMatch =
            activeFilter === "all" ||
            category === activeFilter ||
            String(product.genre || "").toLowerCase() ===
                activeFilter.toLowerCase();

        const textMatch =
            !query ||
            [
                product.name,
                product.description,
                product.genre,
                product.platforms,
                product.tag
            ].join(" ").toLowerCase().includes(query);

        return pageMatch && filterMatch && textMatch;
    });


    // ======================================
    // PRODUCT CARDS
    // ======================================

    container.innerHTML = matches.length

        ? matches.map(product => {

            const image = product.image

                ? `<div class="productImage">
                    <img
                        src="${escapeHTML(product.image)}"
                        alt="${escapeHTML(product.imageAlt || product.name)}"
                        loading="lazy"
                        onerror="this.parentElement.classList.add('imageMissing');this.remove()">

                    <span class="imageFallback">
                        ${escapeHTML(product.icon || "💻")}
                        ${escapeHTML(product.genre || "")}
                    </span>
                </div>`

                : `<div class="productImage imageMissing">
                    <span class="imageFallback">
                        ${escapeHTML(product.icon || "💻")}
                        ${escapeHTML(product.genre || "")}
                    </span>
                </div>`;


            const message =
                `Hello George Games and Tech Hub! I am interested in ${product.name}. Listed price: ${product.price}. Please confirm availability, edition, platform and system requirements.`;


            const detailsLink =
                "product.html?id=" + encodeURIComponent(product.id);


            return `

                <article class="card productCard">

                    ${image}

                    <div class="productInfo">

                        <div class="cardTop">

                            <span class="tag">
                                ${escapeHTML(product.tag || "")}
                            </span>

                            <span class="genre">
                                ${escapeHTML(product.genre || "")}
                            </span>

                        </div>

                        <h3>
                            <a href="${escapeHTML(detailsLink)}">
                                ${escapeHTML(product.name)}
                            </a>
                        </h3>

                        <p>
                            ${escapeHTML(product.description || "")}
                        </p>

                        <div class="platforms">
                            ${escapeHTML(product.platforms || "Ask for compatibility details")}
                        </div>

                        <div class="cardBottom">

                            <span class="price">
                                ${escapeHTML(product.price || "")}
                            </span>

                            <a
                                class="ask"
                                href="${escapeHTML(wa(message))}"
                                target="_blank"
                                rel="noopener">
                                ASK ON WHATSAPP ↗
                            </a>

                        </div>

                        <a
                            class="button"
                            href="${escapeHTML(detailsLink)}"
                            style="display:block;text-align:center;margin-top:15px;">
                            VIEW PRODUCT DETAILS →
                        </a>

                    </div>

                </article>

            `;

        }).join("")

        : `<div class="noResults">
            No products found in this category. Try another search.
           </div>`;


    // ======================================
    // PRODUCT COUNT
    // ======================================

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
// INITIALISE
// ==========================================

render();

loadDatabaseProducts();
