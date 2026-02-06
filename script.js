// ---- CONFIG (edit these) ----
const WHATSAPP_PHONE_E164 = "66XXXXXXXXX"; // ex: 66981234567 (no +)
const LINE_URL = "https://line.me/R/ti/p/~YOUR_LINE_ID";
const INSTAGRAM_URL = "https://instagram.com/YOUR_INSTAGRAM";
const FACEBOOK_URL  = "https://facebook.com/YOUR_FACEBOOK";
// ----------------------------

const $ = (s) => document.querySelector(s);
const $$ = (s) => Array.from(document.querySelectorAll(s));

function setText(sel, value){ const el = $(sel); if (el) el.textContent = value; }
function setHref(sel, value){ const el = $(sel); if (el) el.href = value; }

setText("#year", String(new Date().getFullYear()));

// Links
setHref("#lineTop", LINE_URL);
setHref("#igTop", INSTAGRAM_URL);
setHref("#fbTop", FACEBOOK_URL);
setHref("#igLink", INSTAGRAM_URL);
setHref("#fbLink", FACEBOOK_URL);

// WhatsApp (prefill message)
const waBase = `https://wa.me/${WHATSAPP_PHONE_E164}`;
const waMsgEN = encodeURIComponent("Hi Nail by Tip! I’d like to book. Date/time: __ / Service: __ / (Optional) design example photo");
const waMsgTH = encodeURIComponent("สวัสดีค่ะ Nail by Tip ขอจองคิวค่ะ วัน/เวลา: __ / บริการ: __ / (ถ้ามี) รูปตัวอย่างลาย/แบบ");

function setWhatsApp(msg){
  const url = `${waBase}?text=${msg}`;
  setHref("#waTop", url);
  setHref("#waHero", url);
}

// Language auto + toggle
let lang = (navigator.language || "en").toLowerCase().startsWith("th") ? "th" : "en";

function applyLang(){
  $$("[data-en]").forEach(el => {
    el.textContent = (lang === "th") ? el.getAttribute("data-th") : el.getAttribute("data-en");
  });
  setText("#langLabel", (lang === "th") ? "TH" : "EN");
  setWhatsApp(lang === "th" ? waMsgTH : waMsgEN);
}
applyLang();

const langBtn = $("#langBtn");
if (langBtn){
  langBtn.addEventListener("click", () => {
    lang = (lang === "en") ? "th" : "en";
    applyLang();
  });
}

// Filters
const pills = $$(".pill[data-filter]");
const cards = $$(".card[data-cat]");
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
$$(".reveal").forEach(el => obs.observe(el));

// Lightbox
const lb = $("#lightbox");
const lbImg = $("#lightboxImg");
const lbClose = $("#lightboxClose");

function openLB(src){
  if (!lb || !lbImg) return;
  lbImg.src = src;
  lb.classList.add("open");
  lb.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}
function closeLB(){
  if (!lb) return;
  lb.classList.remove("open");
  lb.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
  if (lbImg) lbImg.src = "";
}

$$(".shot[data-full]").forEach(btn => {
  btn.addEventListener("click", () => openLB(btn.getAttribute("data-full")));
});
if (lbClose) lbClose.addEventListener("click", closeLB);
if (lb) lb.addEventListener("click", (e) => { if (e.target === lb) closeLB(); });
document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeLB(); });

