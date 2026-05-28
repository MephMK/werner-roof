document.addEventListener("DOMContentLoaded", () => {
  setupMobileNav();
  setupDropdowns();
  markActiveNavigation();
  setupRevealAnimations();
  setupFaqAccordions();
  setupContactForm();
  loadHomepageData();
});

function setupMobileNav() {
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    nav.classList.toggle("open");
  });
}

function setupDropdowns() {
  document.querySelectorAll(".has-dropdown").forEach((item) => {
    const button = item.querySelector(".dropdown-toggle");
    const menu = item.querySelector(".dropdown-menu");
    const menuLinks = item.querySelectorAll(".dropdown-menu a");
    if (!button || !menu) return;

    const openDropdown = () => {
      item.classList.add("open");
      button.setAttribute("aria-expanded", "true");
      menu.hidden = false;
    };

    const closeDropdown = () => {
      item.classList.remove("open");
      button.setAttribute("aria-expanded", "false");
      menu.hidden = true;
    };

    closeDropdown();

    button.addEventListener("click", (event) => {
      event.stopPropagation();
      if (item.classList.contains("open")) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    item.addEventListener("mouseleave", () => {
      if (window.innerWidth > 980) {
        closeDropdown();
      }
    });

    item.addEventListener("click", (event) => {
      event.stopPropagation();
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeDropdown();
      });
    });

    document.addEventListener("click", () => {
      closeDropdown();
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        closeDropdown();
      }
    });
  });
}

function markActiveNavigation() {
  const page = document.body.dataset.page;
  if (!page) return;

  document.querySelectorAll("[data-nav]").forEach((link) => {
    if (link.dataset.nav === page) {
      link.classList.add("active");
    }
  });
}

function setupRevealAnimations() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach((item) => observer.observe(item));
}

function createFaqItem(entry) {
  const item = document.createElement("article");
  item.className = "faq-item";

  const question = document.createElement("button");
  question.className = "faq-question";
  question.type = "button";
  question.textContent = entry.frage;

  const answer = document.createElement("div");
  answer.className = "faq-answer";
  answer.innerHTML = `<p>${entry.antwort}</p>`;

  question.addEventListener("click", () => item.classList.toggle("open"));
  item.append(question, answer);
  return item;
}

function setupFaqAccordions() {
  document.querySelectorAll(".faq-item .faq-question").forEach((button) => {
    button.addEventListener("click", () => {
      button.closest(".faq-item").classList.toggle("open");
    });
  });
}

function setupContactForm() {
  const form = document.getElementById("kontaktformular");
  const status = document.getElementById("form-status");
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    status.textContent = "Dies ist ein statischer Prototyp. Ihre Nachricht wurde nicht versendet.";
  });
}

async function loadHomepageData() {
  const faqTarget = document.getElementById("faq-preview");
  const testimonialTarget = document.getElementById("testimonial-preview");
  if (!faqTarget && !testimonialTarget) return;

  try {
    const [faqResponse, testimonialResponse] = await Promise.all([
      fetch("assets/data/faq.json"),
      fetch("assets/data/testimonials.json")
    ]);

    if (faqTarget && faqResponse.ok) {
      const faqData = await faqResponse.json();
      faqData.faqs.slice(0, 4).forEach((entry) => faqTarget.appendChild(createFaqItem(entry)));
    }

    if (testimonialTarget && testimonialResponse.ok) {
      const testimonialData = await testimonialResponse.json();
      testimonialData.testimonials.slice(0, 2).forEach((entry) => {
        const card = document.createElement("article");
        card.className = "content-card reveal visible";
        card.innerHTML = `<p>"${entry.text}"</p><h3>${entry.rolle}</h3><p>${entry.label}</p>`;
        testimonialTarget.appendChild(card);
      });
    }
  } catch (error) {
    if (faqTarget) {
      faqTarget.innerHTML = "<p>Die FAQ-Vorschau konnte lokal nicht geladen werden.</p>";
    }
    if (testimonialTarget) {
      testimonialTarget.innerHTML = "<p>Die Testimonial-Vorschau konnte lokal nicht geladen werden.</p>";
    }
    console.warn("Statische Daten konnten nicht geladen werden:", error);
  }
}
