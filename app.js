const WHATSAPP_NUMBER = "2349136059577";
const wa = message => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
document.querySelectorAll("[data-wa]").forEach(a => a.href = wa(a.dataset.wa || "Hello George Games and Tech Hub!"));
const container = document.getElementById("products");
const searchBox = document.getElementById("productSearch");
let activeFilter = "all";
function render(){
  const query = (searchBox?.value || "").trim().toLowerCase();
  const matches = PRODUCTS.filter(p => {
    const categoryMatch = activeFilter === "all" || p.category === activeFilter || p.genre.toLowerCase() === activeFilter;
    const textMatch = !query || [p.name,p.description,p.genre,p.platforms,p.tag].join(" ").toLowerCase().includes(query);
    return categoryMatch && textMatch;
  });
  container.innerHTML = matches.length ? matches.map(p => {
    const image = p.image ? `<div class="productImage"><img src="${p.image}" alt="${p.imageAlt || p.name}" loading="lazy" onerror="this.parentElement.classList.add('imageMissing');this.remove()"><span class="imageFallback">${p.icon} ${p.genre}</span></div>` : `<div class="productImage imageMissing"><span class="imageFallback">${p.icon} ${p.genre}</span></div>`;
    const message = `Hello George Games and Tech Hub! I am interested in ${p.name}. Listed price: ${p.price}. Please confirm availability, edition, platform and system requirements.`;
    return `<article class="card productCard">${image}<div class="productInfo"><div class="cardTop"><span class="tag">${p.tag}</span><span class="genre">${p.genre}</span></div><h3>${p.name}</h3><p>${p.description}</p><div class="platforms">${p.platforms || "Ask for platform details"}</div><div class="cardBottom"><span class="price">${p.price}</span><a class="ask" target="_blank" rel="noopener" href="${wa(message)}">ASK ON WHATSAPP ↗</a></div></div></article>`;
  }).join("") : `<div class="noResults">No products match that search. Try another name or category.</div>`;
  const count = document.getElementById("productCount"); if(count) count.textContent = `${matches.length} item${matches.length===1?"":"s"}`;
}
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");activeFilter=b.dataset.filter;render()}));
searchBox?.addEventListener("input", render);
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();render();
