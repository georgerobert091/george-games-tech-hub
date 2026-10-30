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


// Read products.js correctly
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
        console.warn("Supabase is not available.");
        render();
        return;
    }

    try {

        const { data, error } = await supabaseClient
            .from("Products")
            .select("*")
            .order("id", { ascending: false });

        if (error) {
            console.error("Supabase error:", error.message);
            render();
            return;
        }

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
// FILTER AND DISPLAY PRODUCTS
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
            category === activeFilter.toLowerCase() ||
            String(product.genre || "").toLowerCase() ===
                activeFilter.toLowerCase();

        const searchableText = [
            product.name,
            product.description,
            product.genre,
            product.platforms,
            product.tag
        ].join(" ").toLowerCase();

        const textMatch =
            !query || searchableText.includes(query);

        return pageMatch && filterMatch && textMatch;

    });


    // ======================================
    // DISPLAY PRODUCT CARDS
    // ======================================

    container.innerHTML = matches.length

        ? matches.map(product => {

            const productLink =
                "product.html?id=" +
                encodeURIComponent(product.id);

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


            return `

                <article class="card productCard">

                    <a
                        href="${escapeHTML(productLink)}"
                        class="productDetailsLink"
                        aria-label="View details for ${escapeHTML(product.name)}"
                    >
                        ${image}
                    </a>

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
                            <a
                                href="${escapeHTML(productLink)}"
                                class="productDetailsLink"
                            >
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
                                ${escapeHTML(product.price || "Ask for price")}
                            </span>

                            <a
                                class="ask"
                                target="_blank"
                                rel="noopener"
                                href="${escapeHTML(wa(message))}">
                                ASK ON WHATSAPP ↗
                            </a>

                        </div>

                        <a
                            href="${escapeHTML(productLink)}"
                            class="button"
                        >
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
