const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

if (menuToggle && mainNav) {
  menuToggle.addEventListener("click", () => {
    mainNav.classList.toggle("open");
    menuToggle.textContent =
      mainNav.classList.contains("open") ? "✕" : "☰";
  });

  document.querySelectorAll("#mainNav a").forEach(link => {
    link.addEventListener("click", () => {
      mainNav.classList.remove("open");
      menuToggle.textContent = "☰";
    });
  });
}


// Highlight navigation item while scrolling
const sections = [...document.querySelectorAll("main section[id]")];
const navLinks = [...document.querySelectorAll("#mainNav a")];

window.addEventListener("scroll", () => {
  const current = sections.reduce((active, section) => {
    const top = section.getBoundingClientRect().top;
    return top <= 130 ? section.id : active;
  }, "home");

  navLinks.forEach(link => {
    link.classList.toggle(
      "active",
      link.getAttribute("href") === "#" + current
    );
  });
});


// Search
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");

function doSearch() {

  if (!searchInput) return;

  const query = searchInput.value.trim().toLowerCase();

  if (!query) {
    searchInput.focus();
    return;
  }

  const searchable = [
    ...document.querySelectorAll(
      "main h2, main h3, main p, main a"
    )
  ];

  const match = searchable.find(el =>
    el.textContent.toLowerCase().includes(query)
  );

  if (match) {

    match.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    match.classList.remove("search-hit");
    void match.offsetWidth;
    match.classList.add("search-hit");

    setTimeout(() => {
      match.classList.remove("search-hit");
    }, 1300);

  } else {

    alert(
      "No matching content found. Please try another search."
    );

  }
}


if (searchBtn) {
  searchBtn.addEventListener("click", doSearch);
}


if (searchInput) {
  searchInput.addEventListener("keydown", e => {

    if (e.key === "Enter") {
      doSearch();
    }

  });
}



// =====================================================
// GOOGLE SHEETS CONTACT FORM
// =====================================================

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwSe1PCr9VQhaTHbXKGKM7HNsjxogzs7WF8QuarLxqK3I0FELh7JZqQE0ffQopWdmwMXw/exec";


const contactForm =
  document.getElementById("collegeContactForm");


if (contactForm) {

  contactForm.addEventListener("submit", async function(event) {

    event.preventDefault();


    const submitButton =
      contactForm.querySelector(".contact-submit");


    const originalText =
      submitButton
        ? submitButton.innerHTML
        : "Send Message";


    if (submitButton) {

      submitButton.disabled = true;
      submitButton.innerHTML = "Sending...";

    }


    // Get form data
    const formData = new URLSearchParams();


    formData.append(
      "name",
      document.getElementById("contactName")?.value.trim() || ""
    );


    formData.append(
      "phone",
      document.getElementById("contactPhone")?.value.trim() || ""
    );


    formData.append(
      "email",
      document.getElementById("contactEmail")?.value.trim() || ""
    );


    formData.append(
      "course",
      document.getElementById("courseInterest")?.value || ""
    );


    formData.append(
      "message",
      document.getElementById("contactMessage")?.value.trim() || ""
    );


    try {

      await fetch(GOOGLE_SCRIPT_URL, {

        method: "POST",

        mode: "no-cors",

        body: formData

      });


      alert(
        "✅ your enquiry has been successfully submitted"
      );


      contactForm.reset();


    } catch (error) {

      console.error(
        "Google Sheets submission error:",
        error
      );


      alert(
        "❌ There is an error please try again!"
      );

    }


    if (submitButton) {

      submitButton.disabled = false;

      submitButton.innerHTML = originalText;

    }

  });

}



// Footer Year
const yearElement =
  document.getElementById("year");


if (yearElement) {

  yearElement.textContent =
    new Date().getFullYear();

}
/* =====================================================
   MODERN INTERACTIONS UPGRADE v2
===================================================== */
(function () {
  const progress = document.getElementById("scrollProgress");
  const header = document.querySelector(".site-header");
  const backTop = document.getElementById("backToTop");

  function updateScrollUI() {
    const doc = document.documentElement;
    const max = doc.scrollHeight - window.innerHeight;
    const percent = max > 0 ? (window.scrollY / max) * 100 : 0;

    if (progress) progress.style.width = percent + "%";
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
    if (backTop) backTop.classList.toggle("show", window.scrollY > 500);
  }

  window.addEventListener("scroll", updateScrollUI, { passive: true });
  updateScrollUI();

  if (backTop) {
    backTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // Reveal sections/cards as they enter the viewport.
  const revealTargets = document.querySelectorAll(
    "main section, .feature, .course-card, .notice-box, .about-facility-card, .facility-grid > div, .principal-photo-area, .principal-message-content, .principal-side, .dean-photo-area, .dean-message-content, .dean-side, .contact-information, .contact-form-card"
  );

  revealTargets.forEach((el, index) => {
    if (!el.classList.contains("hero")) {
      el.classList.add("reveal");
      el.style.transitionDelay = Math.min((index % 5) * 70, 280) + "ms";
    }
  });

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-visible"));
  }

  // Better search feedback than the old permanent background highlight.
  window.addEventListener("load", () => {
    const oldSearch = window.doSearch;
    // Keep the existing search behavior intact; only improve matching highlight.
    if (typeof oldSearch === "function") return;
  });

  // Add keyboard accessibility for the mobile menu.
  const menu = document.getElementById("menuToggle");
  const nav = document.getElementById("mainNav");
  if (menu && nav) {
    menu.addEventListener("keydown", event => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        menu.click();
      }
    });
  }
})();
