const WHATSAPP_NUMBER = "2349136059577";
const wa = message => "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message);
document.querySelectorAll("[data-wa]").forEach(a => a.href = wa(a.dataset.wa || "Hello George Games and Tech Hub!"));
const container = document.getElementById("products");
function render(filter="all"){
  container.innerHTML = PRODUCTS.filter(p=>filter==="all"||p.category===filter).map(p=>`
  <article class="card"><div class="cardTop"><div class="icon">${p.icon}</div><span class="tag">${p.tag}</span></div>
  <h3>${p.name}</h3><p>${p.description}</p><div class="cardBottom"><span class="price">${p.price}</span>
  <a class="ask" target="_blank" rel="noopener" href="${wa("Hello George Games and Tech Hub! I am interested in "+p.name+". Please tell me the current price, availability and details.")}">ASK ON WHATSAPP ↗</a></div></article>`).join("");
}
document.querySelectorAll("[data-filter]").forEach(b=>b.addEventListener("click",()=>{document.querySelectorAll("[data-filter]").forEach(x=>x.classList.remove("active"));b.classList.add("active");render(b.dataset.filter)}));
document.getElementById("menuBtn").addEventListener("click",()=>document.getElementById("nav").classList.toggle("open"));
document.querySelectorAll("#nav a").forEach(a=>a.addEventListener("click",()=>document.getElementById("nav").classList.remove("open")));
document.getElementById("year").textContent=new Date().getFullYear();render();