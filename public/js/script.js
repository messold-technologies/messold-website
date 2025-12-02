// ================ Header menu ================
(function () {
  const menuToggle  = document.getElementById("headerMenuToggle");
  const menuOverlay = document.getElementById("headerMenuOverlay");
  if (!menuToggle || !menuOverlay) return;
  menuToggle.addEventListener("click", () => {
    menuToggle.classList.toggle("active");
    menuOverlay.classList.toggle("active");
  });
})();

// ================ Hero video autoplay ================
(function ensureAutoplay() {
  const vid = document.querySelector(".hero-video");
  if (!vid) return;
  const tryPlay = () => vid.play().catch(() => {});
  if (vid.readyState >= 2) tryPlay();
  else vid.addEventListener("canplay", tryPlay, { once: true });
})();

// ================ Counters on view ================
(function () {
  const counters = document.querySelectorAll(".counter");
  if (!counters.length) return;

  function animateCounters() {
    const duration = 5000, frameRate = 30, totalFrames = Math.floor(duration / frameRate);
    counters.forEach((counter) => {
      const rect = counter.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0 && !counter.classList.contains("counted")) {
        counter.classList.add("counted");
        const target = +counter.getAttribute("data-count") || 0;
        let current = 0;
        const increment = target / totalFrames;
        const update = () => {
          current += increment;
          if (current >= target) counter.innerText = target;
          else { counter.innerText = Math.ceil(current); setTimeout(update, frameRate); }
        };
        update();
      }
    });
  }
  window.addEventListener("scroll", animateCounters, { passive: true });
  window.addEventListener("load", animateCounters);
})();

// ================ Four-column dots & scroll (only if that section exists) ================
(function () {
  const layout = document.querySelector(".four-column-layout");
  const imgWrapper = document.querySelector(".four-image-wrapper");
  if (!layout || !imgWrapper) return;

  const blocks = layout.querySelectorAll(".column-block");
  if (!blocks.length) return;

  const dotContainer = document.createElement("div");
  dotContainer.classList.add("carousel-dots");
  imgWrapper.appendChild(dotContainer);

  blocks.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    if (index === 0) dot.classList.add("active");
    dotContainer.appendChild(dot);
  });

  const dots = dotContainer.querySelectorAll(".dot");

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      if (window.innerWidth > 768) return;
      const first = layout.firstElementChild;
      if (!first) return;
      const gap = parseInt(getComputedStyle(layout).columnGap || getComputedStyle(layout).gap || "20", 10);
      const cardWidth = first.offsetWidth + (isNaN(gap) ? 20 : gap);
      layout.scrollTo({ left: index * cardWidth, behavior: "smooth" });
    });
  });

  layout.addEventListener("scroll", () => {
    if (window.innerWidth > 768) return;
    const first = layout.firstElementChild;
    if (!first) return;
    const gap = parseInt(getComputedStyle(layout).columnGap || getComputedStyle(layout).gap || "20", 10);
    const cardWidth = first.offsetWidth + (isNaN(gap) ? 20 : gap);
    const index = Math.round(layout.scrollLeft / cardWidth);
    dots.forEach((d) => d.classList.remove("active"));
    if (dots[index]) dots[index].classList.add("active");
  });

  // Expose showImage only if needed
  window.showImage = function (index) {
    if (window.innerWidth <= 768) return;
    blocks.forEach((block, i) => block.classList.toggle("active", i === index));
  };
})();

// ================ Carousel prev/next (only if present) ================
(function () {
  const wrapper = document.getElementById("carousel");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const cards = document.querySelectorAll(".carousel-card");
  if (!wrapper || !prevBtn || !nextBtn || !cards.length) return;

  let currentIndex = 0;
  const totalCards = cards.length;

  function updateCarousel() {
    const isMobile = window.innerWidth < 768;
    const cardsPerView = isMobile ? 1 : 3;
    const maxIndex = Math.ceil(totalCards / cardsPerView) - 1;

    currentIndex = Math.max(0, Math.min(currentIndex, maxIndex));
    const translateX = -(currentIndex * 100);
    wrapper.style.transform = `translateX(${translateX}%)`;

    prevBtn.style.display = currentIndex > 0 ? "block" : "none";
    nextBtn.style.display = currentIndex < maxIndex ? "block" : "none";

    if (totalCards <= cardsPerView) {
      prevBtn.style.display = "none";
      nextBtn.style.display = "none";
    }
  }

  prevBtn.addEventListener("click", () => { currentIndex--; updateCarousel(); });
  nextBtn.addEventListener("click", () => { currentIndex++; updateCarousel(); });
  window.addEventListener("resize", updateCarousel);
  updateCarousel();
})();

// ================ FAQ toggles ================
(function () {
  const toggles = document.querySelectorAll(".faq-question");
  if (!toggles.length) return;
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const item = toggle.closest(".faq-item") || toggle.parentElement;
      if (item) item.classList.toggle("open");
    });
  });
})();

// ================ Pricing tabs (mobile) ================
(function () {
  const root = document.getElementById("wdsv-pricing-section");
  if (!root) return;

  const tabs  = Array.from(root.querySelectorAll(".wdsv-pricing-tab"));
  const cards = Array.from(root.querySelectorAll(".wdsv-pricing-wrapper .wdsv-pricing-card"));
  if (!tabs.length || !cards.length) return;

  // Make sure buttons don't submit forms (Shopify)
  tabs.forEach((b,i) => { if (!b.hasAttribute("type")) b.setAttribute("type","button"); if (!b.dataset.index) b.dataset.index = String(i); });

  // ARIA
  cards.forEach((card, i) => { if (!card.id) card.id = `wdsv-pricing-card-${i}`; });
  tabs.forEach((tab, i) => {
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", cards[i].id);
    tab.setAttribute("aria-selected", tab.classList.contains("active") ? "true" : "false");
  });

  function activate(i){
    const idx = Math.max(0, Math.min(i, cards.length - 1));
    tabs.forEach((t, j) => {
      const on = j === idx;
      t.classList.toggle("active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
    });
    const mobile = window.matchMedia("(max-width: 768px)").matches;
    cards.forEach((c, j) => {
      const on = j === idx;
      c.classList.toggle("active", on);
      c.hidden = mobile ? !on : false;
    });
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", (e) => {
      e.preventDefault();
      const idx = parseInt(tab.dataset.index, 10) || 0;
      activate(idx);
    });
  });

  // Keep behavior correct on resize
  const mq = window.matchMedia("(max-width: 768px)");
  function onMQ(e){ 
    if (e.matches) { // mobile
      const current = tabs.findIndex(t => t.classList.contains("active"));
      activate(current >= 0 ? current : 0);
    } else { // desktop: show all
      cards.forEach(c => { c.hidden = false; });
    }
  }
  if (mq.addEventListener) mq.addEventListener("change", onMQ); else mq.addListener(onMQ);
  onMQ(mq);

  // Initial sync
  const initial = tabs.findIndex(t => t.classList.contains("active"));
  activate(initial >= 0 ? initial : 0);
})();

$(function () {
      $(".mainHeader2").load("https://messold.com/header2");
      console.log('Header');
})

$(function () {
      $(".mainFooter2").load("https://messold.com/footer2");
      // console.log('Footer')
})






