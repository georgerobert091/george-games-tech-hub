const WHATSAPP_NUMBER = "2349136059577";

const wa = message =>
    "https://wa.me/" + WHATSAPP_NUMBER +
    "?text=" + encodeURIComponent(message);

document.querySelectorAll("[data-wa]").forEach(a => {
    a.href = wa(a.dataset.wa || "Hello George Games and Tech Hub!");
});

const container = document.getElementById("products");
const searchBox = document.getElementById("productSearch");

let activeFilter = "all";

// Keep the existing products from products.js
let allProducts = [...PRODUCTS];

function escapeHTML(value) {
    return String(value ?? "").replace(/[&<>"']/g, char => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[char]);
}

// Convert Supabase products into the website's product format
function convertDatabaseProduct(product) {
    const categoryMap = {
        "Games": "games",
        "PC Accessories": "tech",
        "Storage & PC Upgrades": "tech",
        "Software": "software",
        "Drivers": "drivers"
    };

    return {
        id: "database-" + product.id,
        name: product.name || "Unnamed Product",
        category: categoryMap[product.category] || "tech",
        genre: product.category || "Technology",
        icon: "💻",
        tag: (product.category || "PRODUCT").toUpperCase(),
        price: "₦" + Number(product.price || 0).toLocaleString("en-NG"),
        description: product.description || "Contact us for more information.",
        platforms: "Contact us for compatibility details",
        image: product.image_url || "",
        imageAlt: product.name || "Product image"
    };
}

// Get products from Supabase
async function loadDatabaseProducts() {
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

        const databaseProducts = (data || []).map(convertDatabaseProduct);

        // Combine database products with existing products
        allProducts = [...databaseProducts, ...PRODUCTS];

        render();

    } catch (error) {
        console.error("Could not load database products:", error);
        render();
    }
}

function render() {
    const query = (searchBox?.value || "").trim().toLowerCase();

    const matches = allProducts.filter(p => {
        const categoryMatch =
            activeFilter === "all" ||
            p.category === activeFilter ||
            (p.genre || "").toLowerCase() === activeFilter;

        const textMatch =
            !query ||
            [
                p.name,
                p.description,
                p.genre,
                p.platforms,
                p.tag
            ].join(" ").toLowerCase().includes(query);

        return categoryMatch && textMatch;
    });

    container.innerHTML = matches.length
        ? matches.map(p => {
            const image = p.image
                ? `<div class="productImage">
                    <img src="${escapeHTML(p.image)}"
                    alt="${escapeHTML(p.imageAlt || p.name)}"
                    loading="lazy"
                    onerror="this.parentElement.classList.add('imageMissing');this.remove()">
                    <span class="imageFallback">
                    ${escapeHTML(p.icon || "💻")} ${escapeHTML(p.genre || "")}
                    </span>
                   </div>`
                : `<div class="productImage imageMissing">
                    <span class="imageFallback">
                    ${escapeHTML(p.icon || "💻")} ${escapeHTML(p.genre || "")}
                    </span>
                   </div>`;

            const message =
                `Hello George Games and Tech Hub! I am interested in ${p.name}. Listed price: ${p.price}. Please confirm availability, edition, platform and system requirements.`;

            return `
                <article class="card productCard">
                    ${image}

                    <div class="productInfo">
                        <div class="cardTop">
                            <span class="tag">${escapeHTML(p.tag || "")}</span>
                            <span class="genre">${escapeHTML(p.genre || "")}</span>
                        </div>

                        <h3>${escapeHTML(p.name)}</h3>

                        <p>${escapeHTML(p.description || "")}</p>

                        <div class="platforms">
                            ${escapeHTML(p.platforms || "Ask for platform details")}
                        </div>

                        <div class="cardBottom">
                            <span class="price">${escapeHTML(p.price || "")}</span>

                            <a class="ask"
                            target="_blank"
                            rel="noopener"
                            href="${escapeHTML(wa(message))}">
                            ASK ON WHATSAPP ↗
                            </a>
                        </div>
                    </div>
                </article>
            `;
        }).join("")
        : `<div class="noResults">
            No products match that search. Try another name or category.
           </div>`;

    const count = document.getElementById("productCount");

    if (count) {
        count.textContent =
            `${matches.length} item${matches.length === 1 ? "" : "s"}`;
    }
}

// Category filters
document.querySelectorAll("[data-filter]").forEach(button => {
    button.addEventListener("click", () => {
        document.querySelectorAll("[data-filter]")
            .forEach(item => item.classList.remove("active"));

        button.classList.add("active");
        activeFilter = button.dataset.filter;

        render();
    });
});

// Search
searchBox?.addEventListener("input", render);

// Mobile navigation
document.getElementById("menuBtn").addEventListener("click", () => {
    document.getElementById("nav").classList.toggle("open");
});

document.querySelectorAll("#nav a").forEach(link => {
    link.addEventListener("click", () => {
        document.getElementById("nav").classList.remove("open");
    });
});

// Current year
document.getElementById("year").textContent =
    new Date().getFullYear();

// Load products
render();
loadDatabaseProducts();
