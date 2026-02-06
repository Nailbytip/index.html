// ---- CONFIG (edit these) ----
const WHATSAPP_PHONE_E164 = "66XXXXXXXXX"; // ex: 66981234567 (no +)
const LINE_URL = "https://line.me/R/ti/p/~YOUR_LINE_ID";
// (optional) keep these updated if you prefer JS to set them too
const INSTAGRAM_URL = "https://instagram.com/YOUR_INSTAGRAM";
const FACEBOOK_URL  = "https://facebook.com/YOUR_FACEBOOK";
// -----------------------------

const qs = (s) => document.querySelector(s);

function safeSetText(selector, text){
  const el = qs(selector);
  if (el) el.textContent = text;
}
function safeSetHref(selector, href){
  const el = qs(selector);
  if (el) el.href = href;
}

// Year
safeSetText("#year", new Date().getFullYear());

// Social links (in case you want to manage via JS)
safeSetHref("#igTop", INSTAGRAM_URL);
safeSetHref("#fbTop", FACEBOOK_URL);
safeSetHref("#igLink", INSTAGRAM_URL);
safeSetHref("#fbLink", FACEBOOK_URL);

// LINE
safeSetHref("#lineTop", LINE_URL);

// WhatsApp (prefill message)
const waBase = `https://wa.me/${WHATSAPP_PHONE_E164}`;
const waMsgEN = encodeURIComponent("Hi Nail by Tip! I’d like to book. Date/time: __ / Service: __ / (Optional) design example photo");
const waMsgTH = encodeURIComponent("สวัสดีค่ะ Nail by Tip ขอจองคิวค่ะ วัน/เวลา: __ / บริการ: __ / (ถ้ามี) รูปตัวอย่างลาย/แบบ");

function setWhatsAppLinks(msg){
  const url = `${waBase}?text=${msg}`;
  safeSetHref("#waTop", url);
  safeSetHref("#waHero", url);
}

// Language auto (Thai locale) + toggle
let lang = (navigator.language || "en").toLowerCase().startsWith("th") ? "th" : "en";

function applyLang(){
  document.querySelectorAll("[data-en]").forEach(el => {
    el.textContent = (lang === "th") ? el.getAttribute("data-th") : el.getAttribute("data-en");
  });
  safeSetText("#langLabel", (lang === "th") ? "TH" : "EN");
  setWhatsAppLinks(lang === "th" ? waMsgTH : waMsgEN);
}
applyLang();

const langBtn = qs("#langBtn");
if (langBtn){
  langBtn.addEventListener("click", (e) => {
    e.preventDefault();
    lang = (lang === "en") ? "th" : "en";
    applyLang();
  });
}

// Category filter
const pills = Array.from(document.querySelectorAll(".pill[data-filter]"));
const cards = Array.from(document.querySelectorAll(".card[data-cat]"));

pills.forEach(p => {
  p.addEventListener("click", () => {
    pills.forEach(x => x.classList.remove("active"));
    p.classList.add("active");

    const filter = p.getAttribute("data-filter");
    cards.forEach(c => {
      c.style.display = (filter === "all" || c.getAttribute("data-cat") === filter) ? "" : "none";
    });
  });
});

// Reveal animation
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("in"); });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => obs.observe(el));

// Lightbox for photos
const lb = document.getElementById("lightbox");
const lbImg = document.getElementById("lightboxImg");
const lbClose = document.getElementById("lightboxClose");

function openLightbox(src){
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLightbox(){
  if (!lb) return;
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lbImg) lbImg.src = "";
}

document.querySelectorAll(".shot[data-full]").forEach(btn => {
  btn.addEventListener("click", () => openLightbox(btn.getAttribute("data-full")));
});

if (lbClose) lbClose.addEventListener("click", closeLightbox);
if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLightbox(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLightbox(); });

  text-align:center;
  color:var(--muted);
  font-size:12px;
  padding: 18px 0 30px;
}
